// ╔══════════════════════════════════════════════════════════╗
// ║  32. SYSTÈME AUDIO — VOLT CLASH                         ║
// ╚══════════════════════════════════════════════════════════╝
// Dépendances globales attendues (définies dans le script principal) :
//   log(), musicEnabled, soundsEnabled

class SoundSystem {
  constructor() {
    this.initialized = false;
    this.audioContext = null;
    this.musicSource = null;
    this.musicGainNode = null;
    this.musicPlaying = false;
    this.musicVolume = 0.3; // Volume par défaut
  }

  init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      log("Audio non disponible");
    }
  }

  // Créer un son d'explosion
  playExplosion() {
    // Vérifier si les sons sont activés
    if (!soundsEnabled) {
      log("Sons désactivés - explosion ignorée");
      return;
    }

    // Utiliser le fichier MP3 d'explosion
    log("Tentative de lecture du MP3 d'explosion: sound explosion.mp3");

    try {
      // Encoder l'URL pour gérer les espaces
      const mp3Path = encodeURIComponent('sound explosion.mp3');
      log("URL encodée:", mp3Path);

      const audio = new Audio(mp3Path);
      audio.volume = 0.3; // Volume plus bas pour l'explosion

      // Écouter les événements pour le debug
      audio.addEventListener('canplaythrough', () => {
        log("MP3 explosion prêt à jouer");
      });

      audio.addEventListener('error', (e) => {
        log("ERREUR chargement MP3 explosion:", e);
        log("Fallback vers son synthétique");
        this.playExplosionSynthetic();
      });

      audio.addEventListener('loadstart', () => {
        log("Début chargement MP3 explosion");
      });

      audio.play().then(() => {
        log("MP3 explosion en cours de lecture - SUCCÈS");
      }).catch(e => {
        log("ERREUR lecture MP3 explosion:", e);
        this.playExplosionSynthetic();
      });
    } catch (e) {
      log("ERREUR création audio MP3 explosion:", e);
      this.playExplosionSynthetic();
    }
  }

  // Musique de fond avec Web Audio API
  async playBackgroundMusic() {
    if (!musicEnabled) return;
    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    // Arrêter immédiatement toute source existante avant d'en créer une nouvelle
    if (this.musicSource) {
      try { this.musicSource.stop(); } catch(e) {}
      this.musicSource = null;
      this.musicGainNode = null;
      this.musicPlaying = false;
    }

    try {
      log("Chargement de la musique de fond: theme-volt-clash.ogg");

      // Charger le fichier audio
      const response = await fetch('theme-volt-clash.ogg');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      // Créer la source audio
      this.musicSource = this.audioContext.createBufferSource();
      this.musicSource.buffer = audioBuffer;
      this.musicSource.loop = true; // Boucle infinie

      // Créer un gain node pour le contrôle du volume et fade-in
      this.musicGainNode = this.audioContext.createGain();
      this.musicGainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Commence à 0

      // Connecter les noeuds
      this.musicSource.connect(this.musicGainNode);
      this.musicGainNode.connect(this.audioContext.destination);

      // Démarrer la musique
      this.musicSource.start(0);

      // Fade-in progressif sur 3 secondes avec le volume actuel
      this.musicGainNode.gain.linearRampToValueAtTime(this.musicVolume, this.audioContext.currentTime + 3);

      log("Musique de fond démarrée avec fade-in");

      // Sauvegarder pour pouvoir l'arrêter plus tard
      this.musicPlaying = true;

    } catch (e) {
      log("ERREUR chargement musique de fond:", e);
    }
  }

  // Mettre à jour le volume de la musique
  updateVolume(newVolume) {
    this.musicVolume = newVolume / 100; // Convertir le pourcentage en 0-1

    if (this.musicGainNode && this.audioContext) {
      // Appliquer le nouveau volume avec une transition douce
      this.musicGainNode.gain.linearRampToValueAtTime(this.musicVolume, this.audioContext.currentTime + 0.5);
      log("Volume musique mis à jour:", Math.round(this.musicVolume * 100) + "%");
    }
  }

  // Arrêter la musique de fond
  stopBackgroundMusic() {
    if (this.musicSource && this.musicGainNode && this.audioContext) {
      // Fade-out progressif
      this.musicGainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1);

      // Arrêter après le fade-out
      setTimeout(() => {
        if (this.musicSource) {
          try {
            this.musicSource.stop();
            this.musicSource = null;
            this.musicGainNode = null;
            this.musicPlaying = false;
            log("Musique de fond arrêtée");
          } catch (e) {
            log("Musique déjà arrêtée");
          }
        }
      }, 1000);
    }
  }

  // Vérifier si la musique joue
  isMusicPlaying() {
    return this.musicPlaying || false;
  }

  async playVictoryJingle() {
    if (!soundsEnabled) return;
    try {
      log("Tentative lecture victory.ogg");
      const audio = new Audio('victory.ogg');
      audio.volume = 0.20;
      audio.addEventListener('error', (e) => {
        log("ERREUR fichier victory.ogg:", audio.error);
      });
      await audio.play();
      log("victory.ogg en lecture OK");
    } catch (e) {
      log("ERREUR play victory.ogg:", e);
    }
  }

  restartBackgroundMusic() {
    if (!musicEnabled) return;
    // Arrêt immédiat puis relance après un court délai
    if (this.musicSource) {
      try { this.musicSource.stop(); } catch(e) {}
      this.musicSource = null;
      this.musicGainNode = null;
      this.musicPlaying = false;
    }
    setTimeout(() => {
      if (musicEnabled) this.playBackgroundMusic();
    }, 500);
  }

  // Son synthétique de secours pour explosion
  playExplosionSynthetic() {
    // Vérifier si les sons sont activés
    if (!soundsEnabled) {
      log("Sons désactivés - explosion synthétique ignorée");
      return;
    }

    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Son d'explosion : bruit blanc filtré
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(20, this.audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Créer un son de déconnexion de circuit
  playCircuitDisconnect() {
    // Vérifier si les sons sont activés
    if (!soundsEnabled) {
      log("Sons désactivés - déconnexion ignorée");
      return;
    }

    // Utiliser le fichier MP3 personnalisé avec URL encodée
    log("Tentative de lecture du MP3: Power_Down_#4-1769878521457.mp3");

    try {
      // Encoder l'URL pour gérer les caractères spéciaux
      const mp3Path = encodeURIComponent('Power_Down_#4-1769878521457.mp3');
      log("URL encodée:", mp3Path);

      const audio = new Audio(mp3Path);
      audio.volume = 0.4; // Volume modéré

      // Écouter les événements pour le debug
      audio.addEventListener('canplaythrough', () => {
        log("MP3 prêt à jouer");
      });

      audio.addEventListener('error', (e) => {
        log("ERREUR chargement MP3:", e);
        log("Fallback vers son synthétique");
        this.playCircuitDisconnectSynthetic();
      });

      audio.addEventListener('loadstart', () => {
        log("Début chargement MP3");
      });

      audio.play().then(() => {
        log("MP3 en cours de lecture - SUCCÈS");
      }).catch(e => {
        log("ERREUR lecture MP3:", e);
        this.playCircuitDisconnectSynthetic();
      });
    } catch (e) {
      log("ERREUR création audio MP3:", e);
      this.playCircuitDisconnectSynthetic();
    }
  }

  // Son synthétique de secours
  playCircuitDisconnectSynthetic() {
    // Vérifier si les sons sont activés
    if (!soundsEnabled) {
      log("Sons désactivés - déconnexion synthétique ignorée");
      return;
    }

    if (!this.initialized) this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Son de déconnexion : baisse de fréquence
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }
}

const soundSystem = new SoundSystem();
