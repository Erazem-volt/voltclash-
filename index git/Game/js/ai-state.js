// ╔══════════════════════════════════════════════════════════╗
// ║  17. IA — COPIES D'ÉTAT (BEAM SEARCH)                   ║
// ╚══════════════════════════════════════════════════════════╝
// Dépendances exposées par le script principal via window :
//   parseKey, keyOf, edgeKey, neigh4, dirs8, NODES, PLAYERS,
//   inBase, baseRectFor, isOwnBase,
//   opponentTargetPoint, baseCenter, dist2,
//   AI_BEAM, SHIELD_RADIUS2

function rebuildWallsFromCircles_state(st) {
  st.walls.clear();
  for (const [k, m] of st.marks.entries()) {
    if (m.kind !== "O") continue;
    const a = parseKey(k);
    for (const d of neigh4) {
      const b = { ix: a.ix + d.dx, iy: a.iy + d.dy };
      if (b.ix < 0 || b.iy < 0 || b.ix >= NODES || b.iy >= NODES) continue;
      const mb = st.marks.get(keyOf(b.ix, b.iy));
      if (mb && mb.kind === "O" && mb.owner === m.owner) {
        const ek = edgeKey(a, b);
        st.walls.set(ek, m.owner);
      }
    }
  }
}

function isBlockedByEnemyWall_state(st, from, to, pid, dx, dy) {
  const isOrth = (Math.abs(dx) + Math.abs(dy)) === 1;
  if (!isOrth) return false;
  const ek = edgeKey(from, to);
  const owner = st.walls.get(ek);
  if (!owner) return false;
  return owner !== pid;
}

function conductiveForPlayer_state(st, ix, iy, pid) {
  const k = keyOf(ix, iy);
  const m = st.marks.get(k);
  if (m && m.owner === pid) return true;
  if (!st.alive.get(pid)) return false;
  return inBase(ix, iy, baseRectFor(pid));
}

function computePoweredSet_state(st, pid) {
  const powered = new Set();
  const q = [];
  if (!st.alive.get(pid)) return powered;

  const base = baseRectFor(pid);
  for (let y = base.iy; y <= base.iy + base.cells; y++) {
    for (let x = base.ix; x <= base.ix + base.cells; x++) {
      const k = keyOf(x, y);
      powered.add(k);
      q.push({ix:x, iy:y});
    }
  }

  let qi = 0;
  while (qi < q.length) {
    const cur = q[qi++];
    for (const d of dirs8) {
      const nx = cur.ix + d.dx, ny = cur.iy + d.dy;
      if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
      if (!conductiveForPlayer_state(st, nx, ny, pid)) continue;
      if (isBlockedByEnemyWall_state(st, cur, {ix:nx, iy:ny}, pid, d.dx, d.dy)) continue;
      const nk = keyOf(nx, ny);
      if (powered.has(nk)) continue;
      powered.add(nk);
      q.push({ix:nx, iy:ny});
    }
  }
  return powered;
}

function hasAdjacentFriendlyOrBase_state(st, pid, ix, iy) {
  if (!st.alive.get(pid)) return false;
  const base = baseRectFor(pid);
  for (const d of dirs8) {
    const nx = ix + d.dx, ny = iy + d.dy;
    if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
    if (inBase(nx, ny, base)) return true;
    const m = st.marks.get(keyOf(nx, ny));
    if (m && m.owner === pid) return true;
  }
  return false;
}

function canPlaceCross_state(st, pid, ix, iy) {
  if (st.gameOver || !st.alive.get(pid)) return false;
  const k = keyOf(ix, iy);
  if (st.marks.has(k)) return false;
  if (isOwnBase(pid, ix, iy)) return false;

  // test connectivité
  st.marks.set(k, { owner: pid, kind:"X" });
  rebuildWallsFromCircles_state(st);
  const powered = computePoweredSet_state(st, pid);
  const ok = powered.has(k);
  st.marks.delete(k);
  rebuildWallsFromCircles_state(st);
  return ok;
}

function canCircle_state(st, pid, key) {
  if (st.gameOver || !st.alive.get(pid)) return false;
  const t = st.marks.get(key);
  if (!t || t.owner === pid || t.kind !== "X") return false;
  const {ix, iy} = parseKey(key);
  if (!hasAdjacentFriendlyOrBase_state(st, pid, ix, iy)) return false;

  st.marks.set(key, { owner: pid, kind:"O" });
  rebuildWallsFromCircles_state(st);
  const powered = computePoweredSet_state(st, pid);
  const ok = powered.has(key);
  st.marks.set(key, t);
  rebuildWallsFromCircles_state(st);
  return ok;
}

function baseOwnerAt_state(st, ix, iy) {
  for (const p of PLAYERS) {
    if (!st.alive.get(p.id)) continue;
    if (inBase(ix, iy, baseRectFor(p.id))) return p.id;
  }
  return null;
}

function applyMove_state(st, pid, mv) {
  if (mv.type === "CROSS") {
    const k = keyOf(mv.ix, mv.iy);
    st.marks.set(k, { owner: pid, kind:"X" });
    st.started.set(pid, true);
    // capture base
    const owner = baseOwnerAt_state(st, mv.ix, mv.iy);
    if (owner && owner !== pid) {
      st.alive.set(owner, false);
      // si 1 seul survivant => gameOver
      const aliveIds = PLAYERS.filter(p => st.alive.get(p.id)).map(p=>p.id);
      if (aliveIds.length <= 1) st.gameOver = true;
    }
  } else {
    st.marks.set(mv.key, { owner: pid, kind:"O" });
    st.started.set(pid, true);
  }
  rebuildWallsFromCircles_state(st);
}

function generateAICandidates_state(st, pid) {
  const powered = computePoweredSet_state(st, pid);
  const circles = [];
  for (const [k, m] of st.marks.entries()) {
    if (!st.alive.get(m.owner)) continue;
    if (m.kind === "X" && m.owner !== pid) {
      if (canCircle_state(st, pid, k)) circles.push({ type:"CIRCLE", key:k });
    }
  }
  const crosses = [];
  const seen = new Set();
  for (const pk of powered) {
    const a = parseKey(pk);
    for (const d of dirs8) {
      const nx = a.ix + d.dx, ny = a.iy + d.dy;
      if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
      const kk = keyOf(nx, ny);
      if (seen.has(kk)) continue;
      seen.add(kk);
      if (st.marks.has(kk)) continue;
      if (!canPlaceCross_state(st, pid, nx, ny)) continue;
      crosses.push({ type:"CROSS", ix:nx, iy:ny });
    }
  }
  return { circles, crosses };
}

function countNeighborFriendly8_state(st, pid, ix, iy) {
  let c = 0;
  for (const d of dirs8) {
    const nx = ix + d.dx, ny = iy + d.dy;
    if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
    const m = st.marks.get(keyOf(nx, ny));
    if (m && m.owner === pid) c++;
  }
  return c;
}

function networkShapeBonus_state(st, pid, ix, iy) {
  const n8 = countNeighborFriendly8_state(st, pid, ix, iy);
  if (n8 === 1) return 15000;
  if (n8 === 2) return 8000;
  if (n8 === 3) return -12000;
  if (n8 >= 4) return -25000;
  return 0;
}

function clusterDensityPenalty_state(st, pid, ix, iy) {
  let count = 0;
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = ix + dx, ny = iy + dy;
      if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
      const m = st.marks.get(keyOf(nx, ny));
      if (m && m.owner === pid) count++;
    }
  }
  if (count <= 2) return 5000;
  if (count <= 4) return 0;
  return -(count - 4) * 6000;
}

function zigzagBonus_state(st, pid, ix, iy) {
  let hasDiag = false, hasOrth = false;
  for (const d of dirs8) {
    const nx = ix + d.dx, ny = iy + d.dy;
    if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
    const m = st.marks.get(keyOf(nx, ny));
    if (m && m.owner === pid) {
      if (Math.abs(d.dx) + Math.abs(d.dy) === 2) hasDiag = true;
      else hasOrth = true;
    }
  }
  if (hasDiag && !hasOrth) return 10000;
  if (hasDiag && hasOrth) return 3000;
  if (hasOrth && !hasDiag) return -5000;
  return 0;
}

function circuitCutValue_state(st, pid, targetKey) {
  const target = st.marks.get(targetKey);
  if (!target) return 0;
  const enemyPid = target.owner;
  if (!st.alive.get(enemyPid)) return 0;

  const {ix, iy} = parseKey(targetKey);
  let enemyNeighbors = 0;
  for (const d of dirs8) {
    const nx = ix + d.dx, ny = iy + d.dy;
    if (nx < 0 || ny < 0 || nx >= NODES || ny >= NODES) continue;
    const m = st.marks.get(keyOf(nx, ny));
    if (m && m.owner === enemyPid) enemyNeighbors++;
  }
  return enemyNeighbors;
}

function evalMove_state(st, pid, mv, prof) {
  if (mv.type === "CROSS") {
    const owner = baseOwnerAt_state(st, mv.ix, mv.iy);
    if (owner && owner !== pid) return 1_000_000_000;
  }

  const tgt = opponentTargetPoint(pid, prof);
  const pos = (mv.type === "CROSS") ? {ix: mv.ix, iy: mv.iy} : parseKey(mv.key);
  const d = Math.max(Math.abs(pos.ix - tgt.ix), Math.abs(pos.iy - tgt.iy));
  let sAttack = 120_000 - d * 2400;

  if (mv.type === "CIRCLE") {
    const d2 = dist2(pos, tgt);
    sAttack += 25_000 - d2 * 35;

    // BONUS : si ce vol coupe le circuit ennemi
    const cutCount = circuitCutValue_state(st, pid, mv.key);
    if (cutCount >= 5) sAttack += 250_000;
    else if (cutCount >= 3) sAttack += 180_000;
    else if (cutCount >= 1) sAttack += 100_000;
    else sAttack -= 20_000;
  } else {
    sAttack += networkShapeBonus_state(st, pid, mv.ix, mv.iy);
    sAttack += clusterDensityPenalty_state(st, pid, mv.ix, mv.iy);
    sAttack += zigzagBonus_state(st, pid, mv.ix, mv.iy);
  }

  const myC = baseCenter(pid);
  const nearBase = dist2(pos, myC);
  let sDefense = 0;
  if (nearBase <= SHIELD_RADIUS2 && mv.type === "CROSS") sDefense -= 18_000;

  const noise = (Math.random() - 0.5) * (AI_BEAM.tieNoise * 100_000);
  return AI_BEAM.wAttack * sAttack + AI_BEAM.wDefense * sDefense + noise;
}
