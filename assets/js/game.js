/* ═══════════════════════════════════════════════════
   RipperSplit — Game Engine
   Hash-Cracking Dungeon Escape Indie Game
   ═══════════════════════════════════════════════════ */

// ─── MD5 Implementation (compact) ───
const MD5 = (() => {
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) { return md5cmn((b & c) | (~b & d), a, b, x, s, t); }
  function md5gg(a, b, c, d, x, s, t) { return md5cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function md5hh(a, b, c, d, x, s, t) { return md5cmn(b ^ c ^ d, a, b, x, s, t); }
  function md5ii(a, b, c, d, x, s, t) { return md5cmn(c ^ (b | ~d), a, b, x, s, t); }

  function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const oa = a, ob = b, oc = c, od = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);     d = md5ff(d, a, b, c, x[i+1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i+2], 17, 606105819);    b = md5ff(b, c, d, a, x[i+3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i+4], 7, -176418897);    d = md5ff(d, a, b, c, x[i+5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i+6], 17, -1473231341);  b = md5ff(b, c, d, a, x[i+7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i+8], 7, 1770035416);    d = md5ff(d, a, b, c, x[i+9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i+10], 17, -42063);       b = md5ff(b, c, d, a, x[i+11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i+12], 7, 1804603682);   d = md5ff(d, a, b, c, x[i+13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i+14], 17, -1502002290); b = md5ff(b, c, d, a, x[i+15], 22, 1236535329);

      a = md5gg(a, b, c, d, x[i+1], 5, -165796510);    d = md5gg(d, a, b, c, x[i+6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i+11], 14, 643717713);   b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i+5], 5, -701558691);    d = md5gg(d, a, b, c, x[i+10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i+15], 14, -660478335);  b = md5gg(b, c, d, a, x[i+4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i+9], 5, 568446438);     d = md5gg(d, a, b, c, x[i+14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i+3], 14, -187363961);   b = md5gg(b, c, d, a, x[i+8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i+13], 5, -1444681467);  d = md5gg(d, a, b, c, x[i+2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i+7], 14, 1735328473);   b = md5gg(b, c, d, a, x[i+12], 20, -1926607734);

      a = md5hh(a, b, c, d, x[i+5], 4, -378558);       d = md5hh(d, a, b, c, x[i+8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i+11], 16, 1839030562);  b = md5hh(b, c, d, a, x[i+14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i+1], 4, -1530992060);   d = md5hh(d, a, b, c, x[i+4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i+7], 16, -155497632);   b = md5hh(b, c, d, a, x[i+10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i+13], 4, 681279174);    d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i+3], 16, -722521979);   b = md5hh(b, c, d, a, x[i+6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i+9], 4, -640364487);    d = md5hh(d, a, b, c, x[i+12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i+15], 16, 530742520);   b = md5hh(b, c, d, a, x[i+2], 23, -995338651);

      a = md5ii(a, b, c, d, x[i], 6, -198630844);       d = md5ii(d, a, b, c, x[i+7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i+14], 15, -1416354905); b = md5ii(b, c, d, a, x[i+5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i+12], 6, 1700485571);   d = md5ii(d, a, b, c, x[i+3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i+10], 15, -1051523);     b = md5ii(b, c, d, a, x[i+1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i+8], 6, 1873313359);    d = md5ii(d, a, b, c, x[i+15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i+6], 15, -1560198380);  b = md5ii(b, c, d, a, x[i+13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i+4], 6, -145523070);    d = md5ii(d, a, b, c, x[i+11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i+2], 15, 718787259);    b = md5ii(b, c, d, a, x[i+9], 21, -343485551);

      a = safeAdd(a, oa); b = safeAdd(b, ob); c = safeAdd(c, oc); d = safeAdd(d, od);
    }
    return [a, b, c, d];
  }

  function rstrMD5(s) {
    const x = [];
    for (let i = 0; i < s.length * 8; i += 8)
      x[i >> 5] |= (s.charCodeAt(i / 8) & 0xff) << i % 32;
    const bin = binlMD5(x, s.length * 8);
    let rstr = '';
    for (let i = 0; i < bin.length * 32; i += 8)
      rstr += String.fromCharCode((bin[i >> 5] >>> i % 32) & 0xff);
    return rstr;
  }

  function hexMD5(s) {
    const hexTab = '0123456789abcdef';
    const rstr = rstrMD5(s);
    let hex = '';
    for (let i = 0; i < rstr.length; i++) {
      const x = rstr.charCodeAt(i);
      hex += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return hex;
  }

  return { hash: hexMD5 };
})();

// ─── Audio System (Web Audio API + Chiptune Sequencer + Menu Music) ───
class AudioSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.currentTrack = 'none'; // 'none' | 'menu' | 'dungeon'
    this.isPaused = false;

    // Menu music audio element (RoccoW - Party's Cancelled)
    this.menuAudio = null;
    try {
      this.menuAudio = new Audio('assets/audio/menu-theme.mp3');
      this.menuAudio.loop = true;
      this.menuAudio.volume = 0.28;
      this.menuAudio.preload = 'auto';
    } catch (e) {
      this.menuAudio = null;
    }

    // Dungeon 2D chiptune tracker nodes
    this.bgmGain = null;
    this.bgmFilter = null;
    this.seqTimer = null;
    this.seqStep = 0;
    this.nextStepTime = 0;
    this.tempo = 124; // BPM
    this.stepInterval = 60 / (this.tempo * 4); // 16th note ~0.121s
    this.noiseBuffer = null;
  }

  init() {
    if (this.ctx && this.ctx.state !== 'closed') {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();

      // Dungeon BGM master bus (Filter -> Gain -> Destination)
      this.bgmFilter = this.ctx.createBiquadFilter();
      this.bgmFilter.type = 'lowpass';
      this.bgmFilter.frequency.setValueAtTime(3600, this.ctx.currentTime);
      this.bgmFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);

      this.bgmFilter.connect(this.bgmGain);
      this.bgmGain.connect(this.ctx.destination);

      // Create white noise buffer for 8-bit drum hits
      this.initNoiseBuffer();
    } catch (e) {
      this.enabled = false;
    }
  }

  initNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 1; // 1 second of noise
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  playMenuMusic() {
    this.currentTrack = 'menu';
    this.stopDungeonMusic();
    if (!this.enabled || !this.menuAudio) return;

    this.menuAudio.volume = 0.28;
    const playPromise = this.menuAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Will retry automatically on first user click/touch
      });
    }
  }

  stopMenuMusic() {
    if (this.menuAudio) {
      try {
        this.menuAudio.pause();
      } catch (e) {}
    }
  }

  // ── 2D Chiptune Dungeon Sequencer ──
  startDungeonMusic() {
    this.init();
    this.stopMenuMusic();
    this.currentTrack = 'dungeon';
    this.isPaused = false;

    if (!this.enabled || !this.ctx) return;

    // Reset filter and gain
    this.bgmFilter.frequency.setValueAtTime(3600, this.ctx.currentTime);
    this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);

    if (this.seqTimer) {
      clearInterval(this.seqTimer);
      this.seqTimer = null;
    }

    this.seqStep = 0;
    this.nextStepTime = this.ctx.currentTime + 0.05;

    // Lookahead scheduler loop (every 25ms, schedule notes for the next 100ms)
    this.seqTimer = setInterval(() => {
      if (this.isPaused || !this.enabled || !this.ctx) return;
      while (this.nextStepTime < this.ctx.currentTime + 0.1) {
        this.scheduleSeqStep(this.seqStep, this.nextStepTime);
        this.nextStepTime += this.stepInterval;
        this.seqStep = (this.seqStep + 1) % 32;
      }
    }, 25);
  }

  stopDungeonMusic() {
    if (this.seqTimer) {
      clearInterval(this.seqTimer);
      this.seqTimer = null;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  pauseDungeonMusic() {
    this.isPaused = true;
    if (this.bgmFilter && this.ctx && this.bgmGain) {
      // Muffle lowpass + dim volume for authentic retro pause feeling
      this.bgmFilter.frequency.setTargetAtTime(350, this.ctx.currentTime, 0.08);
      this.bgmGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.08);
    }
  }

  resumeDungeonMusic() {
    this.isPaused = false;
    if (this.bgmFilter && this.ctx && this.bgmGain && this.enabled) {
      this.bgmFilter.frequency.setTargetAtTime(3600, this.ctx.currentTime, 0.12);
      this.bgmGain.gain.setTargetAtTime(0.14, this.ctx.currentTime, 0.12);
    }
  }

  scheduleSeqStep(step, time) {
    if (!this.ctx || !this.bgmFilter) return;

    // Note frequencies (D minor / cyber dungeon scale)
    const N = {
      D2: 73.42, F2: 87.31, G2: 98.00, A2: 110.00, C3: 130.81,
      D3: 146.83, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, C4: 261.63,
      D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, C5: 523.25, D5: 587.33
    };

    // 1) Bass Voice (Triangle wave, deep 8-bit dungeon groove)
    const bassSeq = [
      N.D2, 0, N.D2, 0,  N.F2, 0, N.D2, 0,  N.G2, 0, N.D2, 0,  N.A2, 0, N.C3, 0,
      N.D2, 0, N.D2, 0,  N.F2, 0, N.G2, 0,  N.A2, 0, N.Bb3, 0, N.A2, 0, N.F2, 0
    ];
    const bassNote = bassSeq[step];
    if (bassNote) {
      this.playBassNote(bassNote, time, this.stepInterval * 1.5);
    }

    // 2) Arpeggio Voice (Square wave, fast 16th-note retro chiptune arps)
    const arpChords = [
      [N.D3, N.F3, N.A3, N.D4],
      [N.Bb3, N.D4, N.F4, N.Bb4],
      [N.C4, N.E4, N.G4, N.C5],
      [N.A3, N.C4, N.E4, N.A4]
    ];
    const chordIdx = Math.floor(step / 8);
    const chord = arpChords[chordIdx];
    const arpNote = chord[step % 4];
    this.playArpNote(arpNote, time, this.stepInterval * 0.7);

    // 3) Lead Melody Voice (Crisp square wave, expressive phrasing)
    const leadSeq = [
      // Bar 1 (0-7): D4, -, F4, G4, A4, -, -, C5
      N.D4, 0, N.F4, N.G4, N.A4, 0, 0, N.C5,
      // Bar 2 (8-15): A4, -, G4, -, F4, -, E4, -
      N.A4, 0, N.G4, 0, N.F4, 0, N.E4, 0,
      // Bar 3 (16-23): D4, -, F4, G4, A4, -, C5, D5
      N.D4, 0, N.F4, N.G4, N.A4, 0, N.C5, N.D5,
      // Bar 4 (24-31): C5, -, A4, -, G4, F4, E4, -
      N.C5, 0, N.A4, 0, N.G4, N.F4, N.E4, 0
    ];
    const leadNote = leadSeq[step];
    if (leadNote) {
      this.playLeadNote(leadNote, time, this.stepInterval * 1.7);
    }

    // 4) 8-Bit Percussion: Hi-Hat & Snare
    if (step % 2 === 1) {
      this.playHiHat(time);
    }
    if (step % 8 === 4) {
      this.playSnare(time);
    }
  }

  playBassNote(freq, time, dur) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.bgmFilter);
      osc.start(time);
      osc.stop(time + dur);
    } catch (e) {}
  }

  playArpNote(freq, time, dur) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.bgmFilter);
      osc.start(time);
      osc.stop(time + dur);
    } catch (e) {}
  }

  playLeadNote(freq, time, dur) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.setValueAtTime(0.16, time + dur * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.bgmFilter);
      osc.start(time);
      osc.stop(time + dur);
    } catch (e) {}
  }

  playHiHat(time) {
    if (!this.noiseBuffer) return;
    try {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, time);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmFilter);
      noise.start(time);
      noise.stop(time + 0.04);
    } catch (e) {}
  }

  playSnare(time) {
    if (!this.noiseBuffer) return;
    try {
      // Noise burst
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.Q.setValueAtTime(1.2, time);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmFilter);
      noise.start(time);
      noise.stop(time + 0.13);

      // Low thump
      const osc = this.ctx.createOscillator();
      const oGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, time);
      osc.frequency.exponentialRampToValueAtTime(45, time + 0.09);
      oGain.gain.setValueAtTime(0.2, time);
      oGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
      osc.connect(oGain);
      oGain.connect(this.bgmFilter);
      osc.start(time);
      osc.stop(time + 0.1);
    } catch (e) {}
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopMenuMusic();
      if (this.bgmGain && this.ctx) {
        this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
    } else {
      if (this.currentTrack === 'menu') {
        this.playMenuMusic();
      } else if (this.currentTrack === 'dungeon') {
        if (this.bgmGain && this.ctx) {
          this.bgmGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
        }
      }
    }
    return this.enabled;
  }

  // ── Sound Effects ──
  playTone(freq, duration, type = 'square', volume = 0.1) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  keyPress() {
    this.playTone(800 + Math.random() * 400, 0.05, 'square', 0.03);
  }

  success() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.1), i * 100);
    });
  }

  error() {
    this.playTone(200, 0.3, 'sawtooth', 0.08);
    setTimeout(() => this.playTone(150, 0.4, 'sawtooth', 0.06), 150);
  }

  doorOpen() {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => this.playTone(100 + i * 30, 0.2, 'sine', 0.05), i * 80);
    }
  }

  victory() {
    const melody = [523, 587, 659, 698, 784, 880, 988, 1047];
    melody.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.4, 'sine', 0.1), i * 120);
    });
  }

  typewriter() {
    this.playTone(600 + Math.random() * 200, 0.02, 'square', 0.02);
  }

  pause() {
    // Two descending tones — classic retro "pause" sound
    this.playTone(660, 0.12, 'square', 0.07);
    setTimeout(() => this.playTone(440, 0.18, 'square', 0.05), 90);
  }

  resume() {
    // Two ascending tones — "resume" feeling
    this.playTone(440, 0.10, 'square', 0.05);
    setTimeout(() => this.playTone(660, 0.15, 'square', 0.07), 80);
  }
}

// ─── Phase Definitions ───
const PHASES = [
  {
    id: 1,
    title: 'O Despertar',
    subtitle: 'Base64 Decode',
    terminalTitle: 'base64_decode.exe',
    description: 'Você encontra um terminal na parede da cela. Uma mensagem codificada em Base64 brilha na tela. Decodifique-a para revelar a senha da porta.',
    type: 'base64',
    encoded: btoa('escapar'),  // "ZXNjYXBhcg=="
    answer: 'escapar',
    hints: [
      'Base64 usa os caracteres A-Z, a-z, 0-9, + e /. O "=" no final é padding.',
      'Cada grupo de 4 caracteres Base64 representa 3 bytes do texto original.',
      'A palavra decodificada é um verbo que significa "fugir de um lugar".'
    ],
    points: 200,
    successMsg: 'A porta da cela se abre com um rangido...'
  },
  {
    id: 2,
    title: 'O Corredor de César',
    subtitle: 'Cifra de César',
    terminalTitle: 'caesar_cipher.exe',
    description: 'As paredes do corredor estão cobertas de letras deslocadas. Use o controle para encontrar o deslocamento correto e revelar a mensagem oculta.',
    type: 'caesar',
    encrypted: caesarEncrypt('chave', 7),
    answer: 'chave',
    shift: 7,
    hints: [
      'A Cifra de César desloca cada letra do alfabeto por um número fixo de posições.',
      'O deslocamento está entre 1 e 25. Tente valores diferentes no slider.',
      'A palavra original é algo que abre fechaduras.'
    ],
    points: 300,
    successMsg: 'O corredor se ilumina! Você encontra a próxima sala...'
  },
  {
    id: 3,
    title: 'A Sala Hexadecimal',
    subtitle: 'Hex → ASCII',
    terminalTitle: 'hex_decode.exe',
    description: 'Números hexadecimais cobrem as paredes. Cada par de dígitos hex representa um caractere ASCII. Converta o código para texto legível.',
    type: 'hex',
    encoded: stringToHex('portal'),  // "706f7274616c"
    answer: 'portal',
    hints: [
      'Em hexadecimal, cada par de dígitos (00-FF) representa um byte / caractere ASCII.',
      'Por exemplo: 41 = "A", 61 = "a", 30 = "0". Letras minúsculas vão de 61 a 7a.',
      'A palavra tem 6 letras e é um tipo de passagem ou entrada.'
    ],
    points: 300,
    successMsg: 'Os símbolos se reorganizam revelando a passagem!'
  },
  {
    id: 4,
    title: 'O Laboratório do John',
    subtitle: 'MD5 Hash Crack',
    terminalTitle: 'john_the_ripper.exe',
    description: 'Você invadiu o laboratório de hacking do John! Um hash MD5 protege o sistema. Use a wordlist para encontrar a senha que gera esse hash.',
    type: 'md5',
    targetHash: null, // computed at init
    answer: 'segredo',
    wordlist: ['admin', 'password', 'john', 'hacker', 'segredo', 'masmorra', 'ripper', 'crypto', 'senha', 'root', 'linux', 'hash'],
    hints: [
      'MD5 é uma função hash de mão única — você não pode "decodificar", mas pode comparar.',
      'Clique em cada palavra da lista para calcular seu hash MD5 e comparar com o alvo.',
      'A resposta é algo que você guarda e não conta para ninguém.'
    ],
    points: 400,
    successMsg: 'Sistema hackeado! O John subestimou você...'
  },
  {
    id: 5,
    title: 'A Porta Final',
    subtitle: 'ROT13 + Análise',
    terminalTitle: 'final_gate.exe',
    description: 'A última porta usa ROT13, uma variação especial da Cifra de César. Decodifique a mensagem final para conquistar sua liberdade!',
    type: 'rot13',
    encoded: rot13('livre'),  // "yvier"
    answer: 'livre',
    hints: [
      'ROT13 é uma Cifra de César com deslocamento fixo de 13 posições.',
      'Uma propriedade especial: aplicar ROT13 duas vezes retorna ao texto original.',
      'A palavra que você procura significa "sem amarras, solto".'
    ],
    points: 500,
    successMsg: 'A porta se abre... A luz do sol invade a masmorra!'
  }
];

// ─── Crypto Helper Functions ───
function caesarEncrypt(text, shift) {
  return text.split('').map(c => {
    if (c >= 'a' && c <= 'z') {
      return String.fromCharCode(((c.charCodeAt(0) - 97 + shift) % 26) + 97);
    }
    if (c >= 'A' && c <= 'Z') {
      return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
    }
    return c;
  }).join('');
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - (shift % 26));
}

function rot13(text) {
  return caesarEncrypt(text, 13);
}

function stringToHex(str) {
  return str.split('').map(c =>
    c.charCodeAt(0).toString(16).padStart(2, '0')
  ).join('');
}

function hexToString(hex) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

// ─── Game State ───
const GameState = {
  TITLE: 'title',
  STORY: 'story',
  PHASE_INTRO: 'phase_intro',
  PLAYING: 'playing',
  PAUSED: 'paused',
  SUCCESS: 'success',
  VICTORY: 'victory'
};

const game = {
  state: GameState.TITLE,
  currentPhase: 0,
  score: 0,
  totalHintsUsed: 0,
  phaseHintsUsed: 0,
  maxHintsPerPhase: 3,
  testedWords: new Set(),
  paused: false,
  audio: new AudioSystem()
};

// ─── DOM References ───
const dom = {
  container: null,
  screens: {},
  hud: {},
  room: {},
  puzzle: {},
  overlays: {},
  victory: {},
  init() {
    this.container = document.getElementById('game-container');
    this.screens = {
      title: document.getElementById('title-screen'),
      story: document.getElementById('story-screen'),
      game: document.getElementById('game-screen'),
      victory: document.getElementById('victory-screen')
    };
    this.hud = {
      phaseNumber: document.getElementById('phase-number'),
      phaseName: document.getElementById('phase-name-hud'),
      hintsCount: document.getElementById('hints-count'),
      scoreValue: document.getElementById('score-value')
    };
    this.room = {
      door: document.getElementById('dungeon-door'),
      characterCanvas: document.getElementById('character-canvas'),
      puzzleContent: document.getElementById('puzzle-content'),
      terminalTitle: document.getElementById('terminal-title')
    };
    this.overlays = {
      phaseIntro: document.getElementById('phase-intro'),
      success: document.getElementById('success-overlay'),
      wrong: document.getElementById('wrong-overlay'),
      phaseNumBig: document.getElementById('phase-num-big'),
      phaseTitle: document.getElementById('phase-title-intro'),
      phaseSubtitle: document.getElementById('phase-subtitle-intro'),
      successMessage: document.getElementById('success-message'),
      successScore: document.getElementById('success-score-add')
    };
    this.victory = {
      finalScore: document.getElementById('final-score'),
      finalHints: document.getElementById('final-hints'),
      finalHashes: document.getElementById('final-hashes')
    };
    this.storyText = document.getElementById('story-text');
    this.storyCursor = document.getElementById('story-cursor');
  }
};

// ─── Matrix Rain Effect ───
class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.columns = [];
    this.fontSize = 14;
    this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン#$%&@';
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const cols = Math.floor(this.canvas.width / this.fontSize);
    this.columns = new Array(cols).fill(1);
  }

  draw() {
    this.ctx.fillStyle = 'rgba(5, 6, 10, 0.08)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#00ff4120';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)];
      this.ctx.fillText(char, i * this.fontSize, this.columns[i] * this.fontSize);

      if (this.columns[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.columns[i] = 0;
      }
      this.columns[i]++;
    }
  }

  start() {
    const loop = () => {
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

// ─── Confetti Effect ───
class ConfettiSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles(count = 150) {
    const colors = ['#00ff41', '#00f0ff', '#ffd700', '#ff6b2b', '#b44dff', '#ff2244'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -Math.random() * this.canvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.vy += 0.05;
      if (p.y > this.canvas.height + 20) p.opacity = 0;
    }
    this.particles = this.particles.filter(p => p.opacity > 0);
  }

  start() {
    this.createParticles();
    const loop = () => {
      this.draw();
      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(loop);
      }
    };
    loop();
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.particles = [];
  }
}

// ─── Character Renderer (Pixel Art) ───
class CharacterRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.frame = 0;
    this.animId = null;
  }

  drawPixel(x, y, color, size = 4) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * size, y * size, size, size);
  }

  draw() {
    this.ctx.clearRect(0, 0, 64, 64);
    const s = 4; // pixel size
    const bobY = Math.sin(this.frame * 0.08) * 0.5;

    // Shadow
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.beginPath();
    this.ctx.ellipse(32, 62, 10, 3, 0, 0, Math.PI * 2);
    this.ctx.fill();

    const oY = Math.round(bobY);

    // Hair (dark)
    const hair = '#2a1a0a';
    this.drawPixel(6, 1 + oY, hair); this.drawPixel(7, 1 + oY, hair); this.drawPixel(8, 1 + oY, hair); this.drawPixel(9, 1 + oY, hair);
    this.drawPixel(5, 2 + oY, hair); this.drawPixel(6, 2 + oY, hair); this.drawPixel(7, 2 + oY, hair); this.drawPixel(8, 2 + oY, hair); this.drawPixel(9, 2 + oY, hair); this.drawPixel(10, 2 + oY, hair);

    // Head (skin)
    const skin = '#e8b88a';
    this.drawPixel(6, 3 + oY, skin); this.drawPixel(7, 3 + oY, skin); this.drawPixel(8, 3 + oY, skin); this.drawPixel(9, 3 + oY, skin);
    this.drawPixel(6, 4 + oY, skin); this.drawPixel(7, 4 + oY, skin); this.drawPixel(8, 4 + oY, skin); this.drawPixel(9, 4 + oY, skin);

    // Eyes
    const eye = '#1a1a2e';
    this.drawPixel(7, 3 + oY, eye); this.drawPixel(9, 3 + oY, eye);

    // Body (orange prison suit)
    const suit = '#cc5500';
    const suitDark = '#993300';
    this.drawPixel(6, 5 + oY, suit); this.drawPixel(7, 5 + oY, suit); this.drawPixel(8, 5 + oY, suit); this.drawPixel(9, 5 + oY, suit);
    this.drawPixel(5, 6 + oY, suit); this.drawPixel(6, 6 + oY, suitDark); this.drawPixel(7, 6 + oY, suit); this.drawPixel(8, 6 + oY, suit); this.drawPixel(9, 6 + oY, suitDark); this.drawPixel(10, 6 + oY, suit);
    this.drawPixel(5, 7 + oY, suit); this.drawPixel(6, 7 + oY, suit); this.drawPixel(7, 7 + oY, suitDark); this.drawPixel(8, 7 + oY, suitDark); this.drawPixel(9, 7 + oY, suit); this.drawPixel(10, 7 + oY, suit);
    this.drawPixel(6, 8 + oY, suit); this.drawPixel(7, 8 + oY, suit); this.drawPixel(8, 8 + oY, suit); this.drawPixel(9, 8 + oY, suit);

    // Arms (skin)
    this.drawPixel(4, 6 + oY, skin); this.drawPixel(11, 6 + oY, skin);
    this.drawPixel(4, 7 + oY, skin); this.drawPixel(11, 7 + oY, skin);

    // Legs (dark pants)
    const pants = '#333355';
    this.drawPixel(6, 9 + oY, pants); this.drawPixel(7, 9 + oY, pants); this.drawPixel(8, 9 + oY, pants); this.drawPixel(9, 9 + oY, pants);
    this.drawPixel(6, 10 + oY, pants); this.drawPixel(7, 10 + oY, pants); this.drawPixel(8, 10 + oY, pants); this.drawPixel(9, 10 + oY, pants);
    this.drawPixel(6, 11 + oY, pants); this.drawPixel(7, 11 + oY, pants); this.drawPixel(8, 11 + oY, pants); this.drawPixel(9, 11 + oY, pants);

    // Feet
    const shoe = '#1a1a1a';
    this.drawPixel(5, 12 + oY, shoe); this.drawPixel(6, 12 + oY, shoe); this.drawPixel(7, 12 + oY, shoe);
    this.drawPixel(8, 12 + oY, shoe); this.drawPixel(9, 12 + oY, shoe); this.drawPixel(10, 12 + oY, shoe);

    this.frame++;
  }

  startAnimation() {
    const loop = () => {
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  stopAnimation() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

// ─── Screen Management ───
function showScreen(screenName) {
  Object.values(dom.screens).forEach(s => s.classList.remove('active'));
  dom.screens[screenName].classList.add('active');
}

function showOverlay(overlayName) {
  dom.overlays[overlayName]?.classList.add('active');
}

function hideOverlay(overlayName) {
  dom.overlays[overlayName]?.classList.remove('active');
}

// ─── HUD Update ───
function updateHUD() {
  const phase = PHASES[game.currentPhase];
  dom.hud.phaseNumber.textContent = `${phase.id}/5`;
  dom.hud.phaseName.textContent = phase.title.toUpperCase();
  dom.hud.hintsCount.textContent = game.maxHintsPerPhase - game.phaseHintsUsed;
  dom.hud.scoreValue.textContent = game.score;
}

// ─── Story Typewriter ───
async function playStory() {
  game.state = GameState.STORY;
  showScreen('story');

  const storyLines = [
    '> Inicializando terminal...\n',
    '> Carregando memórias...\n\n',
    'Você acorda em uma cela escura e úmida.\n',
    'Correntes enferrujadas pendem das paredes.\n',
    'Um terminal antigo brilha em verde no canto.\n\n',
    'Na tela, uma mensagem:\n',
    '"Bem-vindo à minha masmorra, hacker.\n',
    ' Eu sou JOHN, o Ripper.\n',
    ' Você foi pego tentando invadir meu sistema."\n\n',
    '"Para sair, terá que provar seu valor.\n',
    ' 5 portas. 5 hashes. 5 chances."\n\n',
    '"Quebre cada hash para abrir a próxima porta.\n',
    ' Falhe... e ficará aqui para sempre."\n\n',
    '> Pressione qualquer tecla para começar a fuga...\n'
  ];

  let fullText = '';
  let skipped = false;

  const skipHandler = () => {
    skipped = true;
  };

  document.getElementById('skip-story').addEventListener('click', skipHandler);

  for (const line of storyLines) {
    if (skipped) break;
    for (const char of line) {
      if (skipped) break;
      fullText += char;
      dom.storyText.textContent = fullText;
      game.audio.typewriter();
      // Scroll terminal body to bottom
      dom.storyText.parentElement.scrollTop = dom.storyText.parentElement.scrollHeight;
      await sleep(char === '\n' ? 80 : 28);
    }
  }

  if (skipped) {
    fullText = storyLines.join('');
    dom.storyText.textContent = fullText;
  }

  // Wait for click/key to continue
  await new Promise(resolve => {
    const handler = () => {
      document.removeEventListener('keydown', handler);
      document.removeEventListener('click', handler);
      resolve();
    };
    document.addEventListener('keydown', handler);
    document.addEventListener('click', handler);
  });

  startPhase(0);
}

// ─── Phase Management ───
async function startPhase(phaseIndex) {
  game.currentPhase = phaseIndex;
  game.state = GameState.PHASE_INTRO;
  game.phaseHintsUsed = 0;
  game.testedWords = new Set();

  game.audio.stopMenuMusic();
  game.audio.startDungeonMusic();

  const phase = PHASES[phaseIndex];

  // Compute MD5 hash if needed
  if (phase.type === 'md5' && !phase.targetHash) {
    phase.targetHash = MD5.hash(phase.answer);
  }

  showScreen('game');
  updateHUD();

  // Reset door
  dom.room.door.className = 'door-locked';

  // Show phase intro
  dom.overlays.phaseNumBig.textContent = String(phase.id).padStart(2, '0');
  dom.overlays.phaseTitle.textContent = phase.title;
  dom.overlays.phaseSubtitle.textContent = phase.subtitle;
  showOverlay('phaseIntro');
  game.audio.playTone(440, 0.3, 'sine', 0.06);

  await sleep(2500);
  hideOverlay('phaseIntro');

  await sleep(400);
  game.state = GameState.PLAYING;
  renderPuzzle(phase);
}

// ─── Puzzle Rendering ───
function renderPuzzle(phase) {
  dom.room.terminalTitle.textContent = phase.terminalTitle;

  let html = `<p class="puzzle-description">${phase.description}</p>`;

  switch (phase.type) {
    case 'base64':
      html += renderBase64Puzzle(phase);
      break;
    case 'caesar':
      html += renderCaesarPuzzle(phase);
      break;
    case 'hex':
      html += renderHexPuzzle(phase);
      break;
    case 'md5':
      html += renderMD5Puzzle(phase);
      break;
    case 'rot13':
      html += renderROT13Puzzle(phase);
      break;
  }

  // Hint button & container
  html += `
    <button class="puzzle-hint-btn" id="hint-btn" ${game.phaseHintsUsed >= game.maxHintsPerPhase ? 'disabled' : ''}>
      💡 USAR DICA (${game.maxHintsPerPhase - game.phaseHintsUsed} restantes)
    </button>
    <div class="puzzle-hints" id="hints-container"></div>
  `;

  dom.room.puzzleContent.innerHTML = html;
  bindPuzzleEvents(phase);
}

function renderBase64Puzzle(phase) {
  return `
    <div class="puzzle-hash-display">${phase.encoded}</div>
    <div class="puzzle-input-group">
      <input type="text" class="puzzle-input" id="puzzle-answer" 
             placeholder="Digite o texto decodificado..." autocomplete="off" spellcheck="false">
      <button class="puzzle-submit" id="submit-btn">ENVIAR</button>
    </div>
  `;
}

function renderCaesarPuzzle(phase) {
  return `
    <div class="puzzle-hash-display">${phase.encrypted}</div>
    <div class="caesar-slider-container">
      <div class="caesar-slider-label">
        <span>Deslocamento (shift):</span>
        <span class="caesar-shift-value" id="shift-value">0</span>
      </div>
      <input type="range" class="caesar-slider" id="caesar-slider" min="0" max="25" value="0">
      <div class="caesar-preview" id="caesar-preview">${phase.encrypted}</div>
    </div>
    <div class="puzzle-input-group">
      <input type="text" class="puzzle-input" id="puzzle-answer" 
             placeholder="Digite a palavra decifrada..." autocomplete="off" spellcheck="false">
      <button class="puzzle-submit" id="submit-btn">ENVIAR</button>
    </div>
  `;
}

function renderHexPuzzle(phase) {
  // Format hex in pairs for readability
  const formatted = phase.encoded.match(/.{2}/g).join(' ');
  return `
    <div class="puzzle-hash-display">${formatted}</div>
    <p style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">
      Tabela rápida: 61=a, 62=b, 63=c ... 6c=l, 6d=m, 6e=n, 6f=o, 70=p ... 74=t, 75=u
    </p>
    <div class="puzzle-input-group">
      <input type="text" class="puzzle-input" id="puzzle-answer" 
             placeholder="Digite o texto convertido..." autocomplete="off" spellcheck="false">
      <button class="puzzle-submit" id="submit-btn">ENVIAR</button>
    </div>
  `;
}

function renderMD5Puzzle(phase) {
  const shuffled = [...phase.wordlist].sort(() => Math.random() - 0.5);
  const items = shuffled.map(w =>
    `<div class="wordlist-item" data-word="${w}">${w}</div>`
  ).join('');

  return `
    <div class="puzzle-hash-display">${phase.targetHash}</div>
    <div class="hash-comparison" id="hash-comparison">
      <div class="hash-row">
        <span class="hash-label">ALVO:</span>
        <span class="hash-value target">${phase.targetHash}</span>
      </div>
      <div class="hash-row" id="test-hash-row" style="display:none">
        <span class="hash-label">TESTE:</span>
        <span class="hash-value" id="test-hash-value">-</span>
      </div>
    </div>
    <p style="font-size: 11px; color: var(--text-muted); margin: 8px 0;">
      Clique em uma palavra para calcular seu hash MD5:
    </p>
    <div class="wordlist-grid" id="wordlist-grid">${items}</div>
  `;
}

function renderROT13Puzzle(phase) {
  return `
    <div class="puzzle-hash-display">${phase.encoded}</div>
    <p style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">
      ROT13: A↔N, B↔O, C↔P, D↔Q, E↔R, F↔S, G↔T, H↔U, I↔V, J↔W, K↔X, L↔Y, M↔Z
    </p>
    <div class="puzzle-input-group">
      <input type="text" class="puzzle-input" id="puzzle-answer" 
             placeholder="Digite o texto decodificado..." autocomplete="off" spellcheck="false">
      <button class="puzzle-submit" id="submit-btn">ENVIAR</button>
    </div>
  `;
}

// ─── Puzzle Event Binding ───
function bindPuzzleEvents(phase) {
  // Submit button
  const submitBtn = document.getElementById('submit-btn');
  const answerInput = document.getElementById('puzzle-answer');

  if (submitBtn && answerInput) {
    submitBtn.addEventListener('click', () => checkAnswer(phase, answerInput.value));
    answerInput.addEventListener('keydown', (e) => {
      game.audio.keyPress();
      if (e.key === 'Enter') checkAnswer(phase, answerInput.value);
    });
    // Auto-focus
    setTimeout(() => answerInput.focus(), 100);
  }

  // Caesar slider
  if (phase.type === 'caesar') {
    const slider = document.getElementById('caesar-slider');
    const shiftValue = document.getElementById('shift-value');
    const preview = document.getElementById('caesar-preview');

    slider.addEventListener('input', () => {
      const shift = parseInt(slider.value);
      shiftValue.textContent = shift;
      const decrypted = caesarDecrypt(phase.encrypted, shift);
      preview.textContent = decrypted;
      game.audio.playTone(200 + shift * 30, 0.05, 'sine', 0.03);
    });
  }

  // MD5 wordlist
  if (phase.type === 'md5') {
    document.querySelectorAll('.wordlist-item').forEach(item => {
      item.addEventListener('click', () => {
        const word = item.dataset.word;
        if (game.testedWords.has(word)) return;
        game.testedWords.add(word);

        const hash = MD5.hash(word);
        const testRow = document.getElementById('test-hash-row');
        const testValue = document.getElementById('test-hash-value');
        testRow.style.display = 'flex';
        testValue.textContent = hash;
        testValue.className = 'hash-value';

        if (hash === phase.targetHash) {
          testValue.classList.add('match');
          item.classList.add('correct');
          game.audio.success();
          setTimeout(() => handleSuccess(phase), 800);
        } else {
          item.classList.add('tested');
          game.audio.error();
          // Brief shake
          testValue.style.color = 'var(--neon-red)';
          setTimeout(() => {
            testValue.style.color = '';
          }, 300);
        }
      });
    });
  }

  // Hint button
  const hintBtn = document.getElementById('hint-btn');
  if (hintBtn) {
    hintBtn.addEventListener('click', () => useHint(phase));
  }
}

// ─── Answer Checking ───
function checkAnswer(phase, userAnswer) {
  const normalized = userAnswer.trim().toLowerCase();
  if (!normalized) return;

  if (normalized === phase.answer.toLowerCase()) {
    game.audio.success();
    handleSuccess(phase);
  } else {
    game.audio.error();
    handleWrongAnswer();
  }
}

async function handleSuccess(phase) {
  game.state = GameState.SUCCESS;

  // Calculate score
  const hintPenalty = game.phaseHintsUsed * 50;
  const earned = Math.max(phase.points - hintPenalty, 50);
  game.score += earned;

  // Update HUD
  updateHUD();

  // Show success overlay
  dom.overlays.successMessage.textContent = phase.successMsg;
  dom.overlays.successScore.textContent = `+${earned} pts`;
  showOverlay('success');

  await sleep(1800);
  hideOverlay('success');

  // Open door animation
  await sleep(300);
  dom.room.door.className = 'door-unlocked';
  game.audio.doorOpen();

  await sleep(2000);

  // Next phase or victory
  if (game.currentPhase < PHASES.length - 1) {
    startPhase(game.currentPhase + 1);
  } else {
    showVictory();
  }
}

async function handleWrongAnswer() {
  showOverlay('wrong');
  dom.container.classList.add('shake');

  await sleep(600);
  hideOverlay('wrong');
  dom.container.classList.remove('shake');

  // Re-focus input
  const input = document.getElementById('puzzle-answer');
  if (input) {
    input.value = '';
    input.focus();
  }
}

// ─── Hints ───
function useHint(phase) {
  if (game.phaseHintsUsed >= game.maxHintsPerPhase) return;

  const hint = phase.hints[game.phaseHintsUsed];
  game.phaseHintsUsed++;
  game.totalHintsUsed++;

  const container = document.getElementById('hints-container');
  const hintEl = document.createElement('div');
  hintEl.className = 'hint-item';
  hintEl.textContent = `💡 ${hint}`;
  container.appendChild(hintEl);

  // Update hint button
  const hintBtn = document.getElementById('hint-btn');
  const remaining = game.maxHintsPerPhase - game.phaseHintsUsed;
  hintBtn.textContent = `💡 USAR DICA (${remaining} restantes)`;
  if (remaining <= 0) hintBtn.disabled = true;

  updateHUD();
  game.audio.playTone(660, 0.15, 'sine', 0.05);
}

// ─── Victory Screen ───
function showVictory() {
  game.state = GameState.VICTORY;
  game.audio.stopDungeonMusic();
  showScreen('victory');

  dom.victory.finalScore.textContent = game.score;
  dom.victory.finalHints.textContent = game.totalHintsUsed;
  dom.victory.finalHashes.textContent = '5';

  game.audio.victory();

  // Start confetti
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confetti = new ConfettiSystem(confettiCanvas);
  confetti.start();

  // More confetti bursts
  setTimeout(() => confetti.createParticles(80), 1000);
  setTimeout(() => confetti.createParticles(60), 2500);
}

// ─── Restart ───
function restartGame() {
  game.audio.stopDungeonMusic();
  game.audio.playMenuMusic();
  game.state = GameState.TITLE;
  game.currentPhase = 0;
  game.score = 0;
  game.totalHintsUsed = 0;
  game.phaseHintsUsed = 0;
  game.testedWords = new Set();

  // Reset MD5 hash (recompute next time)
  PHASES.forEach(p => {
    if (p.type === 'md5') p.targetHash = null;
  });

  // Reset story
  dom.storyText.textContent = '';

  showScreen('title');
}

// ─── Utility ───
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Initialize Game ───
function init() {
  dom.init();

  // Initialize audio on first interaction
  const initAudio = () => {
    game.audio.init();
    if (game.state === GameState.TITLE && game.audio.enabled) {
      game.audio.playMenuMusic();
    }
    document.removeEventListener('click', initAudio);
    document.removeEventListener('keydown', initAudio);
  };
  document.addEventListener('click', initAudio);
  document.addEventListener('keydown', initAudio);

  // Matrix rain
  const matrixCanvas = document.getElementById('matrix-canvas');
  const matrix = new MatrixRain(matrixCanvas);
  matrix.start();

  // ── Particles canvas ──────────────────────────────────────
  const pCanvas = document.getElementById('particles-canvas');
  if (pCanvas) {
    const pCtx = pCanvas.getContext('2d');
    const particles = [];
    const PARTICLE_COUNT = 60;

    function resizePC() {
      pCanvas.width  = window.innerWidth;
      pCanvas.height = window.innerHeight;
    }
    resizePC();
    window.addEventListener('resize', resizePC);

    const COLORS = ['rgba(0,255,65,', 'rgba(0,240,255,', 'rgba(180,77,255,'];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.3,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    (function animateParticles() {
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = pCanvas.width;
        if (p.x > pCanvas.width) p.x = 0;
        if (p.y < 0) p.y = pCanvas.height;
        if (p.y > pCanvas.height) p.y = 0;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = p.color + p.alpha + ')';
        pCtx.fill();
      });
      requestAnimationFrame(animateParticles);
    })();
  }

  // ── Floating hex strings ──────────────────────────────────
  const hexContainer = document.getElementById('hex-deco-container');
  if (hexContainer) {
    const hexSamples = [
      '5f4dcc3b5aa765d61d8327deb882cf99',
      'a665a45920422f9d417e4867efdc4fb8',
      '2bb80d537b1da3e38bd30361aa855686',
      'e10adc3949ba59abbe56e057f20f883e',
      '25f9e794323b453885f5181f1b624d0b',
    ];
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.className = 'hex-item';
      el.textContent = hexSamples[Math.floor(Math.random() * hexSamples.length)];
      el.style.left   = Math.random() * 90 + '%';
      el.style.bottom = '-20px';
      const dur  = 18 + Math.random() * 16;
      const del  = Math.random() * -20;
      el.style.animationDuration = dur + 's';
      el.style.animationDelay    = del + 's';
      hexContainer.appendChild(el);
    }
  }

  // ── Modals ────────────────────────────────────────────────
  function openModal(id) {
    document.getElementById(id).classList.add('active');
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('active');
  }

  const settingsBtn = document.getElementById('settings-btn');
  const creditsBtn  = document.getElementById('credits-btn');
  if (settingsBtn) settingsBtn.addEventListener('click', () => openModal('settings-modal'));
  if (creditsBtn)  creditsBtn.addEventListener('click',  () => openModal('credits-modal'));

  document.getElementById('settings-close').addEventListener('click', () => closeModal('settings-modal'));
  document.getElementById('credits-close').addEventListener('click',  () => closeModal('credits-modal'));

  // Close modal on overlay click
  ['settings-modal','credits-modal'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) closeModal(id);
    });
  });

  // ── Unified Audio UI Sync ────────────────────────────────
  function syncAudioUI() {
    const on = game.audio.enabled;

    // Pause UI
    if (pauseSoundIcon) pauseSoundIcon.textContent = on ? '🔊' : '🔇';
    if (pauseSoundLbl)  pauseSoundLbl.textContent  = on ? 'SOM: LIGADO' : 'SOM: DESLIGADO';

    // Settings modal toggle
    const mainToggle = document.getElementById('sound-toggle');
    if (mainToggle) {
      mainToggle.dataset.on = on.toString();
      const lbl = mainToggle.querySelector('.toggle-label');
      if (lbl) lbl.textContent = on ? 'LIGADO' : 'DESLIGADO';
    }

    // Title screen audio pill
    const titleAudioBtn = document.getElementById('title-audio-btn');
    const titleAudioIcon = document.getElementById('title-audio-icon');
    const titleAudioLbl = document.getElementById('title-audio-label');
    if (titleAudioBtn) {
      if (on) {
        titleAudioBtn.classList.remove('muted');
        if (titleAudioIcon) titleAudioIcon.textContent = '🔊';
        if (titleAudioLbl)  titleAudioLbl.textContent  = "MÚSICA: ROCCOW · PARTY'S CANCELLED";
      } else {
        titleAudioBtn.classList.add('muted');
        if (titleAudioIcon) titleAudioIcon.textContent = '🔇';
        if (titleAudioLbl)  titleAudioLbl.textContent  = "SOM: MUTADO (CLIQUE P/ ATIVAR)";
      }
    }
  }

  // Title audio pill click
  const titleAudioPill = document.getElementById('title-audio-btn');
  if (titleAudioPill) {
    titleAudioPill.addEventListener('click', () => {
      game.audio.init();
      game.audio.toggleSound();
      syncAudioUI();
    });
  }

  // ── Toggle switches ────────────────────────────────────────
  document.querySelectorAll('.setting-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isOn = toggle.dataset.on === 'true';
      toggle.dataset.on = (!isOn).toString();
      toggle.querySelector('.toggle-label').textContent = !isOn ? 'LIGADO' : 'DESLIGADO';

      // Sound toggle effect
      if (toggle.id === 'sound-toggle') {
        game.audio.init();
        game.audio.toggleSound();
        syncAudioUI();
      }
      // CRT toggle effect
      if (toggle.id === 'crt-toggle') {
        const crt = document.getElementById('crt-overlay');
        if (crt) crt.style.display = !isOn ? '' : 'none';
      }
      // Particles toggle
      if (toggle.id === 'particles-toggle' && pCanvas) {
        pCanvas.style.display = !isOn ? '' : 'none';
      }
    });
  });

  // ── Difficulty buttons ─────────────────────────────────────
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Character renderer
  const character = new CharacterRenderer(dom.room.characterCanvas);
  character.startAnimation();

  // Start button
  document.getElementById('start-btn').addEventListener('click', () => {
    game.audio.init();
    game.audio.stopMenuMusic();
    game.audio.playTone(440, 0.2, 'sine', 0.08);
    playStory();
  });

  // Restart button
  document.getElementById('restart-btn').addEventListener('click', () => {
    restartGame();
  });

  // ── Pause System ───────────────────────────────────────────
  const pauseOverlay   = document.getElementById('pause-overlay');
  const pausePhaseEl   = document.getElementById('pause-phase');
  const pauseScoreEl   = document.getElementById('pause-score');
  const pauseSoundIcon = document.getElementById('pause-sound-icon');
  const pauseSoundLbl  = document.getElementById('pause-sound-label');

  function togglePause() {
    // Only allow pause when actively playing
    if (game.state !== GameState.PLAYING && !game.paused) return;

    game.paused = !game.paused;

    if (game.paused) {
      game.state = GameState.PAUSED;
      game.audio.pause();
      game.audio.pauseDungeonMusic();

      // Sync stats in pause screen
      const phase = PHASES[game.currentPhase];
      if (pausePhaseEl) pausePhaseEl.textContent = `${game.currentPhase + 1}/5`;
      if (pauseScoreEl) pauseScoreEl.textContent = game.score;

      // Sync sound icon
      syncAudioUI();

      pauseOverlay.classList.add('active');
    } else {
      game.state = GameState.PLAYING;
      game.audio.resume();
      game.audio.resumeDungeonMusic();
      pauseOverlay.classList.remove('active');
    }
  }

  // Pause button in HUD
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) pauseBtn.addEventListener('click', () => togglePause());

  // Resume button
  document.getElementById('pause-resume-btn').addEventListener('click', () => {
    if (game.paused) togglePause();
  });

  // Sound toggle inside pause
  document.getElementById('pause-sound-btn').addEventListener('click', () => {
    game.audio.toggleSound();
    syncAudioUI();
  });

  // Back to main menu
  document.getElementById('pause-menu-btn').addEventListener('click', () => {
    pauseOverlay.classList.remove('active');
    game.paused = false;
    restartGame();
  });

  // Keyboard shortcut: ESC to pause / resume
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // ESC closes modals first if open
      const settingsOpen = document.getElementById('settings-modal').classList.contains('active');
      const creditsOpen  = document.getElementById('credits-modal').classList.contains('active');
      if (settingsOpen) { document.getElementById('settings-modal').classList.remove('active'); return; }
      if (creditsOpen)  { document.getElementById('credits-modal').classList.remove('active');  return; }
      togglePause();
    }
  });
}

// Boot!
document.addEventListener('DOMContentLoaded', init);


