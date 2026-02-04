// ================================
// SYSTÈME DE PARTICULES - VOLT CLASH
// ================================

class ElectricParticle {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    
    // Vélocité aléatoire
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2; // 2-6 pixels par frame
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Propriétés visuelles
    this.size = Math.random() * 3 + 1; // 1-4 pixels
    this.maxSize = this.size;
    this.life = 1.0; // 100% de vie
    this.maxLife = Math.random() * 30 + 20; // 20-50 frames
    
    // Couleur électrique (cyan/bleu/vert)
    const colors = [
      { r: 0, g: 255, b: 255 },    // Cyan
      { r: 100, g: 200, b: 255 },  // Bleu clair
      { r: 0, g: 200, b: 255 },    // Bleu
      { r: 0, g: 255, b: 200 }     // Vert cyan
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Effet de traînée
    this.trail = [];
    this.maxTrailLength = Math.floor(Math.random() * 5 + 3);
  }
  
  update() {
    // Sauvegarder la position précédente pour la traînée
    this.trail.push({ x: this.x, y: this.y, life: this.life });
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
    
    // Mettre à jour la position
    this.x += this.vx;
    this.y += this.vy;
    
    // Appliquer la gravité légère et la friction
    this.vy += 0.1; // Gravité
    this.vx *= 0.98; // Friction
    this.vy *= 0.98;
    
    // Diminuer la vie
    this.life -= 1.0 / this.maxLife;
    
    // Diminuer la taille
    this.size = this.maxSize * this.life;
    
    return this.life > 0; // Retourne true si encore en vie
  }
  
  draw(ctx) {
    // Dessiner la traînée
    ctx.save();
    for (let i = 0; i < this.trail.length; i++) {
      const point = this.trail[i];
      const trailLife = (i / this.trail.length) * this.life;
      
      ctx.globalAlpha = trailLife * 0.3;
      ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, this.size * (i / this.trail.length), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    
    // Dessiner la particule principale avec effet de glow
    ctx.save();
    
    // Glow extérieur
    ctx.globalAlpha = this.life * 0.4;
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Glow moyen
    ctx.globalAlpha = this.life * 0.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Noyau brillant
    ctx.globalAlpha = this.life;
    ctx.fillStyle = `rgb(255, 255, 255)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class ElectricExplosion {
  constructor(canvas) {
    this.canvas = canvas;
    this.particles = [];
    this.isActive = false;
  }
  
  explode(x, y, particleCount = 50) {
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new ElectricParticle(x, y, this.canvas));
    }
    
    this.isActive = true;
    
    // Effet sonore simulé (vibration visuelle)
    this.createShockwave(x, y);
  }
  
  createShockwave(x, y) {
    // Créer un effet d'onde de choc
    this.shockwave = {
      x: x,
      y: y,
      radius: 0,
      maxRadius: 100,
      life: 1.0
    };
  }
  
  update() {
    // Mettre à jour les particules
    this.particles = this.particles.filter(particle => particle.update());
    
    // Mettre à jour l'onde de choc
    if (this.shockwave) {
      this.shockwave.radius += 5;
      this.shockwave.life -= 0.05;
      
      if (this.shockwave.life <= 0) {
        this.shockwave = null;
      }
    }
    
    // Vérifier si l'explosion est terminée
    this.isActive = this.particles.length > 0 || this.shockwave !== null;
  }
  
  draw(ctx) {
    // Dessiner l'onde de choc
    if (this.shockwave) {
      ctx.save();
      ctx.globalAlpha = this.shockwave.life * 0.3;
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.shockwave.x, this.shockwave.y, this.shockwave.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    
    // Dessiner les particules
    this.particles.forEach(particle => particle.draw(ctx));
  }
  
  // Explosion avec différentes configurations
  explodeSmall(x, y) {
    this.explode(x, y, 20);
  }
  
  explodeMedium(x, y) {
    this.explode(x, y, 50);
  }
  
  explodeLarge(x, y) {
    this.explode(x, y, 100);
  }
  
  // Explosion de couleur spécifique
  explodeColored(x, y, color, particleCount = 50) {
    for (let i = 0; i < particleCount; i++) {
      const particle = new ElectricParticle(x, y, this.canvas);
      particle.color = color;
      this.particles.push(particle);
    }
    this.isActive = true;
    this.createShockwave(x, y);
  }
}

// ================================
// INTÉGRATION AVEC VOLT CLASH
// ================================

// Fonction pour créer une explosion électrique à des coordonnées de grille
function createElectricExplosion(gridX, gridY, size = 'medium') {
  const canvas = document.getElementById('c');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const cellPx = 22; // CELL_PX
  const marginPx = 24; // MARGIN_PX
  
  // Convertir les coordonnées de grille en pixels
  const pixelX = marginPx + gridX * cellPx;
  const pixelY = marginPx + gridY * cellPx;
  
  // Créer l'explosion
  if (!window.electricExplosion) {
    window.electricExplosion = new ElectricExplosion(canvas);
  }
  
  switch(size) {
    case 'small':
      window.electricExplosion.explodeSmall(pixelX, pixelY);
      break;
    case 'medium':
      window.electricExplosion.explodeMedium(pixelX, pixelY);
      break;
    case 'large':
      window.electricExplosion.explodeLarge(pixelX, pixelY);
      break;
  }
}

// Fonction pour créer une explosion de victoire
function createVictoryExplosion(winnerColor) {
  const canvas = document.getElementById('c');
  if (!canvas) return;
  
  const centerX = canvas.width / (2 * window.devicePixelRatio || 1);
  const centerY = canvas.height / (2 * window.devicePixelRatio || 1);
  
  if (!window.electricExplosion) {
    window.electricExplosion = new ElectricExplosion(canvas);
  }
  
  // Convertir la couleur du joueur en RGB
  const colorMap = {
    '#ff0000': { r: 255, g: 0, b: 0 },     // Rouge
    '#0000ff': { r: 0, g: 0, b: 255 },     // Bleu  
    '#ffff00': { r: 255, g: 255, b: 0 },   // Jaune
    '#00ff00': { r: 0, g: 255, b: 0 }      // Vert
  };
  
  const color = colorMap[winnerColor] || { r: 0, g: 255, b: 255 };
  
  window.electricExplosion.explodeColored(centerX, centerY, color, 150);
}

// ================================
// BOUCLE D'ANIMATION
// ================================

function animateElectricExplosions() {
  const canvas = document.getElementById('c');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Mettre à jour et dessiner les explosions
  if (window.electricExplosion && window.electricExplosion.isActive) {
    window.electricExplosion.update();
    window.electricExplosion.draw(ctx);
  }
  
  requestAnimationFrame(animateElectricExplosions);
}

// Démarrer la boucle d'animation
animateElectricExplosions();
