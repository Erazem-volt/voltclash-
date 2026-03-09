// ╔══════════════════════════════════════════════════════════╗
// ║  2. LANGUE / TRADUCTION (FR / EN)                       ║
// ╚══════════════════════════════════════════════════════════╝
let currentLang = localStorage.getItem('voltclash_lang') || 'fr';

const LANG = {
  fr: {
    title: "VOLT CLASH",
    play2: "2 JOUEURS",
    play4: "4 JOUEURS",
    ranking: "CLASSEMENT",
    back: "RETOUR",
    player: "Joueur",
    human: "Humain",
    ai: "IA",
    startGame: "COMMENCER",
    enterName: "Pseudo...",
    reset: "Réinitialiser",
    bgBlack: "Fond: Noir",
    bgWhite: "Fond: Blanc",
    aiNormal: "IA: Normal",
    aiExpert: "IA: Expert",
    menu: "Menu",
    options: "Options",
    optionsTitle: "⚙️ OPTIONS",
    musicSection: "🎵 MUSIQUE",
    soundSection: "🔊 SONS",
    shortcutsSection: "⌨️ RACCOURCIS",
    langLabel: "Langue",
    langValue: "FRANÇAIS",
    langFlag: "🌐",
    close: "FERMER",
    rankingTitle: "CLASSEMENT",
    scoreBoard: "TABLEAU DES SCORES",
    pts: "pts",
    wins: "V",
    games: "P",
    clear: "EFFACER",
    noStats: "Aucune statistique enregistrée",
    victory: "VICTOIRE",
    winner: "REMPORTE LA PARTIE !",
    backToMenu: "MENU",
    turnOf: "Tour de",
    eliminated: "éliminé par",
    yourTurn: "À toi de jouer.",
    aiPlays: "joue…",
    enterPseudos: "SAISIR LES PSEUDOS",
    enterPseudos4: "SAISIR LES PSEUDOS — 4 JOUEURS",
    enterHint: "Entrez votre nom ou laissez vide pour l'IA",
    nbPlayers: "NOMBRE DE JOUEURS",
    musicLabel: "MUSIQUE",
    musicOn: "🎵 MUSIQUE ON",
    musicOff: "🎵 MUSIQUE OFF",
    soundsOn: "🔊 SONS ON",
    soundsOff: "🔊 SONS OFF",
    volume: "Volume :",
    shortcutUpDown: "Haut/Bas",
    shortcutLeftRight: "Gauche/Droite",
    shortcutPlace: "Placer croix",
    shortcutMusic: "Musique ON/OFF",
    shortcutVolume: "Volume musique",
    shortcutReset: "Réinitialiser",
    shortcutMenu: "Menu",
    shortcutBg: "Changer le fond",
    shortcutExpert: "Mode expert",
    shortcutPause: "Pause",
    confirmClear: "Êtes-vous sûr de vouloir effacer toutes les statistiques ?",
    elimination: "ÉLIMINATION",
    playerCount: "JOUEURS",
    rulesTitle: "RÈGLES",
    rulesObjective: "OBJECTIF",
    rulesObjectiveText: "Détruisez la ou les bases adverses en étendant votre circuit électrique à travers la grille.",
    rulesHowTo: "COMMENT JOUER",
    rulesHowToText1: "Placez jusqu'à 5 croix par tour pour faire progresser votre circuit depuis votre base.",
    rulesHowToText2: "Vos croix doivent rester connectées entre elles et à votre base pour être alimentées.",
    rulesHowToText3: "Atteignez une base adverse avec votre circuit pour la détruire et éliminer son propriétaire.",
    rulesAttack: "ATTAQUE",
    rulesAttackText: "Mangez les croix adverses pour les transformer en murs et déconnecter leur circuit. Un circuit coupé perd toutes les croix non reliées à sa base.",
    rulesVictory: "VICTOIRE",
    rulesVictoryText: "Le dernier joueur en vie remporte la partie !",
    rulesTips: "ASTUCES",
    rulesTip1: "⚡ Progressez en diagonale : les croix placées en zigzag sont plus difficiles à capturer et offrent moins de prises à l'adversaire pour créer des murs permanents.",
    rulesTip2: "🔀 Construisez des circuits parallèles : si l'ennemi coupe une branche, vos croix pourront se reconnecter par un chemin alternatif.",
    rulesTip3: "✂️ Coupez le circuit ennemi au point le plus étroit pour un maximum de dégâts.",
    linePlaced: "coup(s) posé(s).",
    lineInvalid: "Ligne invalide.",
    lineNoConnection: "Ligne invalide (pas de connexion possible).",
    moveForbiddenBase: "Interdit : pas de croix dans ta base.",
    moveForbiddenConnection: "Coup refusé : doit rester alimenté (connecté à ta base).",
    circleBlocked: "Rond interdit : adjacence base/pièce + rester alimenté.",
    actionImpossible: "Action impossible ici.",
    endTurn: "Fin de tour",
    movesLeft: "coups restants",
    // Multijoueur en ligne
    playOnline: "JOUER EN LIGNE",
    onlineCreate: "CRÉER UNE PARTIE",
    onlineJoin: "REJOINDRE",
    privateGame: "PARTIE PRIVÉE",
    privateGameStatus: "Partie privée — partagez le code",
    rejoinTitle: "TU AS UNE PARTIE EN COURS ?",
    rejoinBtn: "🔄 REPRENDRE",
    openGamesTitle: "PARTIES EN ATTENTE",
    openGamesLoading: "Chargement...",
    openGamesNone: "Aucune partie en attente",
    refresh: "🔄",
    onlineYourPseudo: "TON PSEUDO",
    onlinePlayerCount: "NOMBRE DE JOUEURS",
    onlineEnterCode: "CODE DE LA PARTIE",
    onlineCreateBtn: "CRÉER",
    onlineJoinBtn: "REJOINDRE",
    onlineLobby: "SALLE D'ATTENTE",
    onlineShareCode: "PARTAGE CE CODE",
    onlineCopied: "Copié !",
    onlineWaiting: "En attente de joueurs...",
    onlineWaitingSlot: "En attente...",
    onlineLeave: "QUITTER",
    lobbyMenu: "📋 MENU",
    onlineLeaveGame: "QUITTER LA PARTIE",
    notifTitle: "⚡ PARTIE PRÊTE",
    notifMessage: "Vos adversaires vous attendent !",
    notifAction: "▶ LET'S PLAY",
    onlineInvalidCode: "Code invalide (4-6 caractères).",
    onlineReady: "Tous les joueurs sont là !",
    onlinePseudoRequired: "Pseudo requis",
    onlineCodeRequired: "Entre un code de partie valide",
    onlineGameStarting: "La partie commence !",
  },
  en: {
    title: "VOLT CLASH",
    play2: "2 PLAYERS",
    play4: "4 PLAYERS",
    ranking: "RANKING",
    back: "BACK",
    player: "Player",
    human: "Human",
    ai: "AI",
    startGame: "START",
    enterName: "Name...",
    reset: "Reset",
    bgBlack: "BG: Black",
    bgWhite: "BG: White",
    aiNormal: "AI: Normal",
    aiExpert: "AI: Expert",
    menu: "Menu",
    options: "Options",
    optionsTitle: "⚙️ OPTIONS",
    musicSection: "🎵 MUSIC",
    soundSection: "🔊 SOUNDS",
    shortcutsSection: "⌨️ SHORTCUTS",
    langLabel: "Language",
    langValue: "ENGLISH",
    langFlag: "🌐",
    close: "CLOSE",
    rankingTitle: "RANKING",
    scoreBoard: "SCOREBOARD",
    pts: "pts",
    wins: "W",
    games: "G",
    clear: "CLEAR",
    noStats: "No stats recorded",
    victory: "VICTORY",
    winner: "WINS THE GAME!",
    backToMenu: "MENU",
    turnOf: "Turn of",
    eliminated: "eliminated by",
    yourTurn: "Your turn.",
    aiPlays: "playing…",
    enterPseudos: "ENTER NAMES",
    enterPseudos4: "ENTER NAMES — 4 PLAYERS",
    enterHint: "Enter your name or leave empty for AI",
    nbPlayers: "NUMBER OF PLAYERS",
    musicLabel: "MUSIC",
    musicOn: "🎵 MUSIC ON",
    musicOff: "🎵 MUSIC OFF",
    soundsOn: "🔊 SOUNDS ON",
    soundsOff: "🔊 SOUNDS OFF",
    volume: "Volume:",
    shortcutUpDown: "Up/Down",
    shortcutLeftRight: "Left/Right",
    shortcutPlace: "Place cross",
    shortcutMusic: "Music ON/OFF",
    shortcutVolume: "Music volume",
    shortcutReset: "Reset",
    shortcutMenu: "Menu",
    shortcutBg: "Toggle background",
    shortcutExpert: "Expert mode",
    shortcutPause: "Pause",
    confirmClear: "Are you sure you want to clear all stats?",
    elimination: "ELIMINATION",
    playerCount: "PLAYERS",
    rulesTitle: "RULES",
    rulesObjective: "OBJECTIVE",
    rulesObjectiveText: "Destroy enemy base(s) by extending your electric circuit across the grid.",
    rulesHowTo: "HOW TO PLAY",
    rulesHowToText1: "Place up to 5 crosses per turn to extend your circuit from your base.",
    rulesHowToText2: "Your crosses must stay connected to each other and to your base to remain powered.",
    rulesHowToText3: "Reach an enemy base with your circuit to destroy it and eliminate its owner.",
    rulesAttack: "ATTACK",
    rulesAttackText: "Eat enemy crosses to turn them into walls and disconnect their circuit. A severed circuit loses all crosses not linked to its base.",
    rulesVictory: "VICTORY",
    rulesVictoryText: "Last player standing wins the game!",
    rulesTips: "TIPS",
    rulesTip1: "⚡ Move diagonally: zigzag crosses are harder to capture and give your opponent fewer opportunities to create permanent walls.",
    rulesTip2: "🔀 Build parallel circuits: if the enemy cuts one branch, your crosses can reconnect through an alternate path.",
    rulesTip3: "✂️ Cut the enemy circuit at its narrowest point for maximum damage.",
    linePlaced: "move(s) placed.",
    lineInvalid: "Invalid line.",
    lineNoConnection: "Invalid line (no connection possible).",
    moveForbiddenBase: "Forbidden: no cross in your base.",
    moveForbiddenConnection: "Move refused: must stay powered (connected to your base).",
    circleBlocked: "Circle blocked: need adjacent base/piece + stay powered.",
    actionImpossible: "Impossible action here.",
    endTurn: "End turn",
    movesLeft: "moves left",
    // Online multiplayer
    playOnline: "PLAY ONLINE",
    onlineCreate: "CREATE A GAME",
    onlineJoin: "JOIN",
    privateGame: "PRIVATE GAME",
    privateGameStatus: "Private game — share the code",
    rejoinTitle: "HAVE A PENDING GAME?",
    rejoinBtn: "🔄 REJOIN",
    openGamesTitle: "OPEN GAMES",
    openGamesLoading: "Loading...",
    openGamesNone: "No open games",
    refresh: "🔄",
    onlineYourPseudo: "YOUR PSEUDO",
    onlinePlayerCount: "NUMBER OF PLAYERS",
    onlineEnterCode: "GAME CODE",
    onlineCreateBtn: "CREATE",
    onlineJoinBtn: "JOIN",
    onlineLobby: "WAITING ROOM",
    onlineShareCode: "SHARE THIS CODE",
    onlineCopied: "Copied!",
    onlineWaiting: "Waiting for players...",
    onlineWaitingSlot: "Waiting...",
    onlineLeave: "LEAVE",
    lobbyMenu: "📋 MENU",
    onlineLeaveGame: "LEAVE GAME",
    notifTitle: "⚡ GAME READY",
    notifMessage: "Your opponents are waiting!",
    notifAction: "▶ LET'S PLAY",
    onlineInvalidCode: "Invalid code (4-6 characters).",
    onlineReady: "All players are here!",
    onlinePseudoRequired: "Pseudo required",
    onlineCodeRequired: "Enter a valid game code",
    onlineGameStarting: "Game is starting!",
  }
};

function t(key) {
  return LANG[currentLang][key] || LANG['fr'][key] || key;
}

function toggleLanguage() {
  currentLang = (currentLang === 'fr') ? 'en' : 'fr';
  localStorage.setItem('voltclash_lang', currentLang);
  applyLanguage();
}

function applyLanguage() {
  // Sauvegarder l'état ON/OFF des boutons avant que data-lang ne les écrase
  const musicBtn = document.getElementById('btn-music-toggle');
  const musicIsOn = !musicBtn || !musicBtn.textContent.includes('OFF');

  // Appliquer data-lang à tous les éléments
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });

  // Bouton langue dans le menu principal
  const langMenuText = document.getElementById('lang-menu-text');
  if (langMenuText) langMenuText.textContent = t('langValue');

  // Boutons langue dans le panel options
  const langBtn = document.getElementById('btn-lang');
  if (langBtn) langBtn.textContent = t('langLabel') + ': ' + t('langValue');
  const langBtnPanel = document.getElementById('btn-lang-panel');
  if (langBtnPanel) langBtnPanel.textContent = t('langLabel') + ': ' + t('langValue');

  // Boutons de jeu (in-game)
  const bgBtn = document.getElementById('togglebg');
  if (bgBtn) {
    const isBlack = document.body.style.backgroundColor === 'black' ||
                   getComputedStyle(document.body).backgroundColor === 'rgb(0, 0, 0)' ||
                   !document.body.style.backgroundColor;
    bgBtn.textContent = isBlack ? t('bgBlack') : t('bgWhite');
  }

  const aiBtn = document.getElementById('toggleExpert');
  if (aiBtn) {
    const isExpert = aiBtn.textContent.includes('Expert') || aiBtn.textContent.includes('EXPERT');
    aiBtn.textContent = isExpert ? t('aiExpert') : t('aiNormal');
  }

  const resetBtn = document.getElementById('reset');
  if (resetBtn) resetBtn.textContent = t('reset');

  const menuBtn = document.getElementById('menu');
  if (menuBtn) menuBtn.textContent = t('menu');

  const optionsBtn = document.getElementById('options-btn');
  if (optionsBtn) optionsBtn.textContent = '⚙️ ' + t('options');

  // Bouton musique du menu principal (restaurer l'état ON/OFF après data-lang)
  if (musicBtn) musicBtn.textContent = musicIsOn ? t('musicOn') : t('musicOff');

  // Boutons musique/sons du panel options (sans data-lang, vérifier l'état)
  const panelMusicToggle = document.getElementById('panel-music-toggle');
  if (panelMusicToggle) {
    const isOn = !panelMusicToggle.textContent.includes('OFF');
    panelMusicToggle.textContent = isOn ? t('musicOn') : t('musicOff');
  }

  const panelSoundsToggle = document.getElementById('panel-sounds-toggle');
  if (panelSoundsToggle) {
    const isOn = !panelSoundsToggle.textContent.includes('OFF');
    panelSoundsToggle.textContent = isOn ? t('soundsOn') : t('soundsOff');
  }
}
