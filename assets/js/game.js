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
    this.currentTrack = 'menu'; // 'none' | 'menu' | 'dungeon'
    this.isPaused = false;

    // Menu music audio element (RoccoW - Party's Cancelled)
    this.menuAudio = null;
    this.initMenuAudio();

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

  initMenuAudio() {
    try {
      if (!this.menuAudio) {
        this.menuAudio = new Audio('assets/audio/menu-theme.mp3');
        this.menuAudio.loop = true;
        this.menuAudio.volume = 0.35;
        this.menuAudio.preload = 'auto';
      }
    } catch (e) {
      console.warn('Audio element error:', e);
    }
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
    if (!this.enabled) return;

    this.initMenuAudio();
    if (!this.menuAudio) return;

    this.menuAudio.volume = 0.35;
    const playPromise = this.menuAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        // Autoplay policy prevented playback, will retry on any user interaction
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
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (game.state === GameState.TITLE || this.currentTrack === 'menu') {
        this.playMenuMusic();
      } else if (game.state === GameState.PLAYING || this.currentTrack === 'dungeon') {
        this.startDungeonMusic();
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

  footstep() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(110 + Math.random() * 35, 0.025, 'triangle', 0.025);
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

  // ── 8-bit / 16-bit Screen Transition Sounds ──
  transitionWipeIn() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Fast descending 8-bit pitch glissando (covers screen)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(840, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.32);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);

      // Fast staggered chiptune pixel blips
      const sweep = [740, 580, 440, 320, 220, 150];
      sweep.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.035, 'square', 0.04);
        }, idx * 45);
      });
    } catch (e) {}
  }

  transitionWipeOut() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Ascending 16-bit reveal sweep (reveals new screen)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.28);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);

      // Bright retro resolution chord
      const chords = [261.6, 329.6, 392.0, 523.2];
      chords.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.08, 'square', 0.035);
        }, idx * 40);
      });
    } catch (e) {}
  }

  loadingComplete() {
    if (!this.enabled || !this.ctx) return;
    // Classic 16-bit stage-ready chime (triad arpeggio)
    const triad = [523.2, 659.3, 784.0, 1046.5];
    triad.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.12, 'square', 0.05);
      }, idx * 60);
    });
  }
}

// ─── Phase Definitions ───
const PHASES = [
  {
    id: 1,
    title: 'O Despertar',
    subtitle: 'Base64 Decode',
    terminalTitle: 'cadeado_01 // base64_decode.exe',
    description: 'O cadeado da porta da cela exibe uma mensagem codificada em Base64. Decodifique-a para revelar a senha e destrancar a porta.',
    type: 'base64',
    encoded: btoa('escapar'),  // "ZXNjYXBhcg=="
    answer: 'escapar',
    hints: [
      'Base64 usa os caracteres A-Z, a-z, 0-9, + e /. O "=" no final é padding.',
      'Cada grupo de 4 caracteres Base64 representa 3 bytes do texto original.',
      'A palavra decodificada é um verbo que significa "fugir de um lugar".'
    ],
    points: 200,
    successMsg: 'O cadeado se abre! Atravesse a porta da cela para continuar...'
  },
  {
    id: 2,
    title: 'O Corredor de César',
    subtitle: 'Cifra de César',
    terminalTitle: 'cadeado_02 // caesar_cipher.exe',
    description: 'O cadeado desta porta está protegido pela Cifra de César com letras deslocadas. Ajuste o controle de deslocamento para descobrir a senha da porta.',
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
    successMsg: 'Cadeado destrancado! A porta se abre para a próxima sala...'
  },
  {
    id: 3,
    title: 'A Sala Hexadecimal',
    subtitle: 'Hex → ASCII',
    terminalTitle: 'cadeado_03 // hex_decode.exe',
    description: 'O cadeado da porta exibe pares de dígitos hexadecimais. Cada par representa um caractere ASCII. Converta o código para abrir a porta.',
    type: 'hex',
    encoded: stringToHex('portal'),  // "706f7274616c"
    answer: 'portal',
    hints: [
      'Em hexadecimal, cada par de dígitos (00-FF) representa um byte / caractere ASCII.',
      'Por exemplo: 41 = "A", 61 = "a", 30 = "0". Letras minúsculas vão de 61 a 7a.',
      'A palavra tem 6 letras e é um tipo de passagem ou entrada.'
    ],
    points: 300,
    successMsg: 'Cadeado decifrado! Atravesse a porta para avançar!'
  },
  {
    id: 4,
    title: 'O Laboratório do John',
    subtitle: 'MD5 Hash Crack',
    terminalTitle: 'cadeado_04 // john_the_ripper.exe',
    description: 'O cadeado blindado da porta do laboratório usa um hash MD5! Use a wordlist para descobrir qual senha gera o hash do cadeado.',
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
    successMsg: 'Cadeado hackeado! O John subestimou você...'
  },
  {
    id: 5,
    title: 'A Porta Final',
    subtitle: 'ROT13 + Análise',
    terminalTitle: 'cadeado_05 // final_gate.exe',
    description: 'O cadeado da última porta usa ROT13, uma variação especial da Cifra de César. Decodifique a mensagem final para abrir a porta da liberdade!',
    type: 'rot13',
    encoded: rot13('livre'),  // "yvier"
    answer: 'livre',
    hints: [
      'ROT13 é uma Cifra de César com deslocamento fixo de 13 posições.',
      'Uma propriedade especial: aplicar ROT13 duas vezes retorna ao texto original.',
      'A palavra que você procura significa "sem amarras, solto".'
    ],
    points: 500,
    successMsg: 'O último cadeado se abre... Atravesse a porta para a liberdade!'
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

// ─── Character Customization Catalog (Stardew Valley 16x32 Multi-Tone Pixel Art) ───
const CHARACTER_CATALOG = {
  skin: [
    { name: 'Clara Rosada', light: '#ffe0c8', main: '#f7c19e', shadow: '#d9896c', deep: '#b5654d', outline: '#421820' },
    { name: 'Pêssego',      light: '#fbd3b0', main: '#f2b68a', shadow: '#d48163', deep: '#ad5e45', outline: '#3d161e' },
    { name: 'Bronzeada',    light: '#e0a679', main: '#c98859', shadow: '#9e5d38', deep: '#7a4224', outline: '#331217' },
    { name: 'Morena Escura', light: '#a86b43', main: '#8d532f', shadow: '#69381c', deep: '#4d2510', outline: '#260d11' },
    { name: 'Ébano',        light: '#704328', main: '#57311b', shadow: '#3b1e0e', deep: '#291206', outline: '#1a080a' }
  ],
  hairStyle: [
    { id: 'parted',   name: 'Repartido Clássico' },
    { id: 'swept',    name: 'Franja Lateral' },
    { id: 'sleek',    name: 'Social Alinhado' },
    { id: 'crop',     name: 'Curto Moderno' },
    { id: 'wavy',     name: 'Médio Ondulado' },
    { id: 'long',     name: 'Longo Alinhado' },
    { id: 'ponytail', name: 'Rabo de Cavalo' },
    { id: 'topbun',   name: 'Coque Samurai' }
  ],
  hairColor: [
    { name: 'Loiro Sol',    outline: '#4a1c24', dark: '#c7651a', main: '#f09b29', high: '#fce26b' },
    { name: 'Castanho',     outline: '#2b1117', dark: '#3d1e12', main: '#5c311e', high: '#854c32' },
    { name: 'Ruivo Cobre',  outline: '#3b1219', dark: '#872612', main: '#c44521', high: '#f2784b' },
    { name: 'Preto Ônix',   outline: '#120d1c', dark: '#1c1d2e', main: '#2c304a', high: '#4f567d' },
    { name: 'Azul Cyber',   outline: '#121b38', dark: '#14498f', main: '#247be0', high: '#6bc2ff' },
    { name: 'Rosa Neon',    outline: '#331029', dark: '#821c61', main: '#cf3c9e', high: '#ff85d8' }
  ],
  top: [
    { name: 'Jaqueta Azul & Rubro', style: 'jacket', outline: '#231429', dark: '#1e326e', main: '#3054ad', high: '#4e79d9', inner: '#c94022', innerDark: '#8c2411' },
    { name: 'Jaqueta Prisional',    style: 'jacket', outline: '#2b1216', dark: '#9e3a00', main: '#e85d04', high: '#ff8533', inner: '#1f2438', innerDark: '#121521' },
    { name: 'Moletom Hacker',       style: 'hoodie', outline: '#112426', dark: '#12594a', main: '#1e8c74', high: '#35b89b', inner: '#e6ecf2', innerDark: '#9aa8b8' },
    { name: 'Colete Rubro',         style: 'vest',   outline: '#2b0f18', dark: '#75121e', main: '#ba2536', high: '#e34254', inner: '#252336', innerDark: '#161421' },
    { name: 'Túnica Violeta',       style: 'tunic',  outline: '#211030', dark: '#461b73', main: '#6f34ad', high: '#9455d6', inner: '#f5c542', innerDark: '#b88914' }
  ],
  pants: [
    { name: 'Calça Couro Café', outline: '#38151e', shadow: '#592918', main: '#824326', high: '#a35b37' },
    { name: 'Jeans Clássico',   outline: '#171c30', shadow: '#1e315c', main: '#31508f', high: '#4b71bd' },
    { name: 'Cargo Tática',     outline: '#12131c', shadow: '#1c1f2e', main: '#2b3045', high: '#414866' },
    { name: 'Calça Cáqui',      outline: '#332118', shadow: '#785a34', main: '#a68253', high: '#c49f6e' },
    { name: 'Vinho Street',     outline: '#290d1b', shadow: '#45152b', main: '#6b2545', high: '#8f3860' }
  ],
  shoes: [
    { name: 'Bota Marinho',     outline: '#0c111c', sole: '#102130', main: '#1b3f57', accent: '#367594' },
    { name: 'Coturno Preto',    outline: '#090a10', sole: '#12131c', main: '#232638', accent: '#474d6b' },
    { name: 'Tênis Street',     outline: '#26141c', sole: '#b82525', main: '#e8edf5', accent: '#d93636' },
    { name: 'Bota de Couro',    outline: '#241008', sole: '#381b0c', main: '#69391c', accent: '#945630' },
    { name: 'Sneaker Cyber',    outline: '#0d1829', sole: '#00d9ff', main: '#1c2f4a', accent: '#00f0ff' }
  ],
  accessory: [
    { id: 'none',    name: 'Nenhum' },
    { id: 'glasses', name: 'Óculos Retrô' },
    { id: 'visor',   name: 'Visor Cyber' },
    { id: 'headset', name: 'Headset Hacker' },
    { id: 'cap',     name: 'Boné / Presilha' }
  ]
};

function defaultCharacter() {
  return {
    name: 'Hacker',
    gender: 'male',
    skin: 1,
    hairStyle: 0,
    hairColor: 0,
    top: 0,
    pants: 0,
    shoes: 0,
    accessory: 0
  };
}

// ─── Local Database System (IndexedDB + LocalStorage Mirror) ───
class SaveDatabase {
  constructor() {
    this.dbName = 'RipperSplitDB';
    this.storeName = 'saves';
    this.storageKey = 'rippersplit_saves_v1';
    this.db = null;
    this.maxSlots = 3;
    this.slots = this.loadFromLocalStorage();
  }

  defaultSlot(slotId) {
    return {
      slotId,
      empty: true,
      character: defaultCharacter(),
      currentPhase: 0,
      score: 0,
      totalHintsUsed: 0,
      phaseHintsUsed: 0,
      doorUnlocked: false,
      completed: false,
      storySeen: false,
      createdAt: null,
      updatedAt: null
    };
  }

  loadFromLocalStorage() {
    const map = {};
    for (let i = 1; i <= this.maxSlots; i++) {
      map[i] = this.defaultSlot(i);
    }
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        for (let i = 1; i <= this.maxSlots; i++) {
          if (parsed[i] && typeof parsed[i] === 'object') {
            map[i] = {
              ...this.defaultSlot(i),
              ...parsed[i],
              character: { ...defaultCharacter(), ...(parsed[i].character || {}) },
              slotId: i
            };
          }
        }
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
    return map;
  }

  persistToLocalStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.slots));
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }

  async init() {
    if (!window.indexedDB) {
      return this.slots;
    }
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(this.dbName, 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: 'slotId' });
          }
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
          this.syncFromIndexedDB().then(() => resolve(this.slots));
        };
        req.onerror = () => {
          resolve(this.slots);
        };
      } catch (e) {
        resolve(this.slots);
      }
    });
  }

  async syncFromIndexedDB() {
    if (!this.db) return;
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => {
          const records = req.result || [];
          if (records.length > 0) {
            records.forEach(rec => {
              if (rec && rec.slotId >= 1 && rec.slotId <= this.maxSlots) {
                this.slots[rec.slotId] = {
                  ...this.defaultSlot(rec.slotId),
                  ...rec,
                  character: { ...defaultCharacter(), ...(rec.character || {}) }
                };
              }
            });
            this.persistToLocalStorage();
          } else {
            // Seed IndexedDB with current slots
            for (let i = 1; i <= this.maxSlots; i++) {
              this.writeSlotToIndexedDB(this.slots[i]);
            }
          }
          resolve();
        };
        req.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  writeSlotToIndexedDB(slotData) {
    if (!this.db) return;
    try {
      const tx = this.db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      store.put(slotData);
    } catch (e) {}
  }

  getSlot(slotId) {
    return this.slots[slotId] || this.defaultSlot(slotId);
  }

  getAllSlots() {
    return [this.getSlot(1), this.getSlot(2), this.getSlot(3)];
  }

  createNewSave(slotId, characterData = null) {
    const now = new Date().toISOString();
    const data = {
      slotId,
      empty: false,
      character: characterData ? { ...defaultCharacter(), ...characterData } : defaultCharacter(),
      currentPhase: 0,
      score: 0,
      totalHintsUsed: 0,
      phaseHintsUsed: 0,
      doorUnlocked: false,
      completed: false,
      storySeen: false,
      createdAt: now,
      updatedAt: now
    };
    this.slots[slotId] = data;
    this.persistToLocalStorage();
    this.writeSlotToIndexedDB(data);
    return data;
  }

  saveProgress(slotId, progress) {
    const existing = this.getSlot(slotId);
    const now = new Date().toISOString();
    const updated = {
      ...existing,
      ...progress,
      character: progress.character
        ? { ...defaultCharacter(), ...progress.character }
        : (existing.character || defaultCharacter()),
      slotId,
      empty: false,
      createdAt: existing.createdAt || now,
      updatedAt: now
    };
    this.slots[slotId] = updated;
    this.persistToLocalStorage();
    this.writeSlotToIndexedDB(updated);
    return updated;
  }

  deleteSlot(slotId) {
    const reset = this.defaultSlot(slotId);
    this.slots[slotId] = reset;
    this.persistToLocalStorage();
    this.writeSlotToIndexedDB(reset);
    return reset;
  }
}

const saveDB = new SaveDatabase();

// ─── Game State ───
const GameState = {
  TITLE: 'title',
  SAVE_SELECT: 'save_select',
  CHAR_CREATE: 'char_create',
  STORY: 'story',
  PHASE_INTRO: 'phase_intro',
  PLAYING: 'playing',
  PAUSED: 'paused',
  SUCCESS: 'success',
  VICTORY: 'victory'
};

const game = {
  state: GameState.TITLE,
  currentSlot: 1,
  character: defaultCharacter(),
  currentPhase: 0,
  score: 0,
  totalHintsUsed: 0,
  phaseHintsUsed: 0,
  maxHintsPerPhase: 3,
  testedWords: new Set(),
  paused: false,
  terminalOpen: false,
  doorUnlocked: false,
  transitioningPhase: false,
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
      saveSelect: document.getElementById('save-select-screen'),
      charCreate: document.getElementById('char-create-screen'),
      story: document.getElementById('story-screen'),
      game: document.getElementById('game-screen'),
      victory: document.getElementById('victory-screen')
    };
    this.hud = {
      slotNumber: document.getElementById('slot-number-hud'),
      phaseNumber: document.getElementById('phase-number'),
      phaseName: document.getElementById('phase-name-hud'),
      hintsCount: document.getElementById('hints-count'),
      scoreValue: document.getElementById('score-value')
    };
    this.room = {
      canvas: document.getElementById('room-canvas'),
      door: document.getElementById('dungeon-door'),
      doorPromptIcon: document.getElementById('door-prompt-icon'),
      doorPromptText: document.getElementById('door-prompt-text'),
      characterCanvas: document.getElementById('character-canvas'),
      terminalBackdrop: document.getElementById('puzzle-terminal-backdrop'),
      terminalCloseBtn: document.getElementById('terminal-close-btn'),
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

// ─── Top-Down 8-Bit / 16-Bit Room & Playable Character System (Stardew Valley Style) ───
class TopDownRoomSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.width = 384;
    this.height = 256;
    this.tileSize = 16;

    // Player state (feet position on the 384x256 floor)
    this.player = {
      x: 192,
      y: 212,
      dir: 'up',       // 'down' | 'up' | 'left' | 'right'
      moving: false,
      speed: 96,       // pixels per second
      walkTime: 0,
      walkFrame: 0,
      lastStepFrame: -1,
      halfW: 6,
      halfH: 4,
      autoTarget: null // { x, y, interactOnArrive }
    };

    this.keys = new Set();
    this.nearDoor = false;
    this.doorOpenProgress = 0; // 0 = locked/closed, 1 = wide open
    this.frame = 0;
    this.lastTime = performance.now();
    this.animId = null;

    // Dust motes floating in torchlight
    this.motes = [];
    for (let i = 0; i < 18; i++) {
      this.motes.push({
        x: 32 + Math.random() * 320,
        y: 48 + Math.random() * 180,
        vx: (Math.random() - 0.5) * 6,
        vy: -3 - Math.random() * 5,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Room furniture / props with 2.5D collision boxes and Y-sorting depth
    this.props = [
      { id: 'bed',       x: 24,  y: 50,  w: 36, h: 44, col: { x: 24,  y: 54,  w: 34, h: 38 }, ySort: 92 },
      { id: 'table',     x: 294, y: 54,  w: 52, h: 34, col: { x: 296, y: 60,  w: 48, h: 26 }, ySort: 86 },
      { id: 'brazierL',  x: 92,  y: 62,  w: 20, h: 28, col: { x: 94,  y: 74,  w: 16, h: 14 }, ySort: 88 },
      { id: 'brazierR',  x: 272, y: 62,  w: 20, h: 28, col: { x: 274, y: 74,  w: 16, h: 14 }, ySort: 88 },
      { id: 'barrels',   x: 24,  y: 162, w: 42, h: 38, col: { x: 24,  y: 170, w: 40, h: 28 }, ySort: 198 },
      { id: 'bookshelf', x: 296, y: 154, w: 54, h: 44, col: { x: 296, y: 168, w: 52, h: 28 }, ySort: 196 }
    ];

    this.bindInput();
  }

  bindInput() {
    window.addEventListener('keydown', (e) => {
      if (game.state !== GameState.PLAYING || game.paused) return;

      // If terminal is open, only allow ESC to close it; do not capture typing keys
      if (game.terminalOpen) return;

      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault();
        this.keys.add(k);
        this.player.autoTarget = null;
      } else if (k === 'e' || k === ' ' || k === 'enter') {
        if (this.nearDoor) {
          e.preventDefault();
          triggerDoorInteraction();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      const k = e.key.toLowerCase();
      this.keys.delete(k);
    });

    window.addEventListener('blur', () => {
      this.keys.clear();
    });

    // Click on room canvas to walk (or interact if clicking near the door)
    if (this.canvas) {
      this.canvas.addEventListener('pointerdown', (e) => {
        if (game.state !== GameState.PLAYING || game.paused || game.terminalOpen) return;
        const rect = this.canvas.getBoundingClientRect();
        const cx = ((e.clientX - rect.left) / rect.width) * this.width;
        const cy = ((e.clientY - rect.top) / rect.height) * this.height;

        // Check if clicked on the North Door area
        if (cx >= 152 && cx <= 232 && cy >= 4 && cy <= 64) {
          if (this.nearDoor) {
            triggerDoorInteraction();
          } else {
            this.walkToDoorAndInteract();
          }
          return;
        }

        // Otherwise walk toward clicked floor spot
        const clampedX = Math.max(24, Math.min(360, cx));
        const clampedY = Math.max(54, Math.min(230, cy));
        this.player.autoTarget = { x: clampedX, y: clampedY, interactOnArrive: false };
      });
    }
  }

  walkToDoorAndInteract() {
    this.player.autoTarget = { x: 192, y: 56, interactOnArrive: true };
  }

  resetForPhase(phaseIndex) {
    this.keys.clear();
    this.player.x = 192;
    this.player.y = 212;
    this.player.dir = 'up';
    this.player.moving = false;
    this.player.walkTime = 0;
    this.player.walkFrame = 0;
    this.player.autoTarget = null;
    this.nearDoor = false;
    this.doorOpenProgress = 0;
    if (dom.room.door) {
      dom.room.door.classList.remove('near', 'door-unlocked');
      dom.room.door.classList.add('door-locked');
    }
    if (dom.room.doorPromptIcon) {
      dom.room.doorPromptIcon.innerHTML = `<svg class="pixel-icon"><use href="#px-lock"></use></svg>`;
    }
    if (dom.room.doorPromptText) {
      dom.room.doorPromptText.textContent = '[E] DECIFRAR CADEADO';
    }
  }

  collidesAt(px, py) {
    const hw = this.player.halfW;
    const hh = this.player.halfH;
    const left = px - hw;
    const right = px + hw;
    const top = py - hh;
    const bottom = py + hh;

    // Outer room walls
    const inDoorwayX = px >= 170 && px <= 214;
    const minY = (game.doorUnlocked && inDoorwayX) ? 30 : 52;
    if (left < 18 || right > 366 || top < minY || bottom > 236) {
      return true;
    }

    // Furniture / props collision boxes
    for (const p of this.props) {
      const c = p.col;
      if (right > c.x && left < c.x + c.w && bottom > c.y && top < c.y + c.h) {
        return true;
      }
    }
    return false;
  }

  update(dt) {
    this.frame++;

    // Smoothly animate door opening when unlocked
    if (game.doorUnlocked && this.doorOpenProgress < 1) {
      this.doorOpenProgress = Math.min(1, this.doorOpenProgress + dt * 1.8);
    }

    // Update floating dust motes
    for (const m of this.motes) {
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      if (m.y < 44) {
        m.y = 228;
        m.x = 32 + Math.random() * 320;
      }
    }

    if (game.state !== GameState.PLAYING || game.paused || game.terminalOpen || game.transitioningPhase) {
      this.player.moving = false;
      this.player.walkFrame = 0;
      return;
    }

    let dx = 0;
    let dy = 0;

    if (this.keys.has('w') || this.keys.has('arrowup'))    dy -= 1;
    if (this.keys.has('s') || this.keys.has('arrowdown'))  dy += 1;
    if (this.keys.has('a') || this.keys.has('arrowleft'))  dx -= 1;
    if (this.keys.has('d') || this.keys.has('arrowright')) dx += 1;

    // Handle click-to-walk autoTarget if no keys pressed
    if (dx === 0 && dy === 0 && this.player.autoTarget) {
      const tx = this.player.autoTarget.x - this.player.x;
      const ty = this.player.autoTarget.y - this.player.y;
      const dist = Math.hypot(tx, ty);
      if (dist <= 3) {
        const shouldInteract = this.player.autoTarget.interactOnArrive;
        this.player.autoTarget = null;
        if (shouldInteract) {
          this.updateDoorProximity();
          triggerDoorInteraction();
        }
      } else {
        dx = tx / dist;
        dy = ty / dist;
      }
    } else if (dx !== 0 && dy !== 0) {
      const inv = 1 / Math.hypot(dx, dy);
      dx *= inv;
      dy *= inv;
    }

    if (dx !== 0 || dy !== 0) {
      this.player.moving = true;

      // Update facing direction (prefer cardinal axis with larger magnitude)
      if (Math.abs(dx) > Math.abs(dy)) {
        this.player.dir = dx < 0 ? 'left' : 'right';
      } else {
        this.player.dir = dy < 0 ? 'up' : 'down';
      }

      const stepX = dx * this.player.speed * dt;
      const stepY = dy * this.player.speed * dt;

      // Slide along X then Y
      if (!this.collidesAt(this.player.x + stepX, this.player.y)) {
        this.player.x += stepX;
      } else if (this.player.autoTarget) {
        // If blocked on X while auto-walking, stop autoTarget if also blocked on Y
        if (this.collidesAt(this.player.x, this.player.y + stepY)) {
          this.player.autoTarget = null;
        }
      }

      if (!this.collidesAt(this.player.x, this.player.y + stepY)) {
        this.player.y += stepY;
      }

      // Walk cycle animation (4 frames)
      this.player.walkTime += dt * 8.5;
      this.player.walkFrame = Math.floor(this.player.walkTime) % 4;

      if ((this.player.walkFrame === 1 || this.player.walkFrame === 3) &&
          this.player.lastStepFrame !== this.player.walkFrame) {
        this.player.lastStepFrame = this.player.walkFrame;
        game.audio.footstep();
      }
    } else {
      this.player.moving = false;
      this.player.walkFrame = 0;
      this.player.lastStepFrame = -1;
    }

    this.updateDoorProximity();

    // If door is unlocked and player walks into the open doorway threshold, advance!
    if (game.doorUnlocked && !game.transitioningPhase &&
        this.player.y <= 47 && Math.abs(this.player.x - 192) <= 20) {
      advanceToNextPhase();
    }
  }

  updateDoorProximity() {
    const distToDoor = Math.hypot(this.player.x - 192, this.player.y - 54);
    const isNear = distToDoor <= 32;
    if (isNear !== this.nearDoor) {
      this.nearDoor = isNear;
      if (dom.room.door) {
        dom.room.door.classList.toggle('near', isNear);
      }
    }
  }

  // ── 16-Bit Top-Down Room Rendering ──
  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const themes = [
      { floorA: '#1c2030', floorB: '#171a28', mortar: '#0e101a', rugMain: '#5a1e28', rugBorder: '#c8963e', wallA: '#272c42', wallB: '#1d2133' },
      { floorA: '#221f2e', floorB: '#1b1826', mortar: '#100e18', rugMain: '#631d32', rugBorder: '#e0b044', wallA: '#302b44', wallB: '#231f33' },
      { floorA: '#162230', floorB: '#121c28', mortar: '#0a111a', rugMain: '#123d4f', rugBorder: '#00d8ff', wallA: '#203247', wallB: '#172536' },
      { floorA: '#1d192b', floorB: '#161322', mortar: '#0c0a14', rugMain: '#381954', rugBorder: '#00ff66', wallA: '#2b2440', wallB: '#201a30' },
      { floorA: '#211d24', floorB: '#19161c', mortar: '#0e0c10', rugMain: '#6b1824', rugBorder: '#ffd700', wallA: '#332c38', wallB: '#251f29' }
    ];
    const theme = themes[game.currentPhase % themes.length];

    // 1. Floor Tiles (Rows 3..14, Cols 1..22)
    this.drawFloor(ctx, theme);

    // 2. North Wall & Side/Bottom Walls
    this.drawWalls(ctx, theme);

    // 3. The Door with Padlock on the North Wall
    this.drawNorthDoor(ctx);

    // 4. Y-Sorted Entities (Furniture Props + Playable Character)
    const renderList = [
      ...this.props.map(p => ({ type: 'prop', ySort: p.ySort, prop: p })),
      { type: 'player', ySort: this.player.y }
    ];
    renderList.sort((a, b) => a.ySort - b.ySort);

    for (const item of renderList) {
      if (item.type === 'prop') {
        this.drawProp(ctx, item.prop);
      } else {
        this.drawPlayer(ctx);
      }
    }

    // 5. Dynamic 16-Bit Torch Lighting, Dust Motes & Vignette
    this.drawLighting(ctx);

    // 6. Floating Pixel Interaction Indicator near Door
    if (this.nearDoor && !game.terminalOpen && game.state === GameState.PLAYING) {
      this.drawInteractionBubble(ctx);
    }
  }

  drawFloor(ctx, theme) {
    const ts = this.tileSize;
    for (let ty = 3; ty <= 14; ty++) {
      for (let tx = 1; tx <= 22; tx++) {
        const x = tx * ts;
        const y = ty * ts;
        const hash = ((tx * 37 + ty * 17 + game.currentPhase * 13) % 7);

        // Base stone slab
        ctx.fillStyle = ((tx + ty) % 2 === 0) ? theme.floorA : theme.floorB;
        ctx.fillRect(x, y, ts, ts);

        // Stone bevel highlight (top & left)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(x + 1, y + 1, ts - 2, 1);
        ctx.fillRect(x + 1, y + 1, 1, ts - 2);

        // Stone mortar (bottom & right)
        ctx.fillStyle = theme.mortar;
        ctx.fillRect(x, y + ts - 1, ts, 1);
        ctx.fillRect(x + ts - 1, y, 1, ts);

        // Subtle stone crack or moss detail
        if (hash === 0) {
          ctx.fillStyle = theme.mortar;
          ctx.fillRect(x + 5, y + 6, 4, 1);
          ctx.fillRect(x + 8, y + 7, 1, 3);
        } else if (hash === 1 && (tx <= 3 || tx >= 20 || ty === 3)) {
          ctx.fillStyle = '#1e4628';
          ctx.fillRect(x + 2, y + 2, 2, 2);
          ctx.fillRect(x + 4, y + 3, 1, 1);
        }
      }
    }

    // Floor shadow directly below North Wall
    ctx.fillStyle = 'rgba(0, 0, 0, 0.38)';
    ctx.fillRect(16, 48, 352, 6);

    // Iron floor drainage grate (left-center floor detail)
    const gx = 128, gy = 144;
    ctx.fillStyle = '#090a10';
    ctx.fillRect(gx, gy, 16, 16);
    ctx.fillStyle = '#383e54';
    ctx.fillRect(gx, gy, 16, 2);
    ctx.fillRect(gx, gy + 14, 16, 2);
    for (let i = 0; i <= 15; i += 3) {
      ctx.fillRect(gx + i, gy, 2, 16);
    }

    // Center Ornate Dungeon Carpet / Rug (x = 128..256, y = 92..172)
    const rx = 128, ry = 92, rw = 128, rh = 80;
    // Rug drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(rx + 2, ry + 2, rw, rh);
    // Rug main fabric
    ctx.fillStyle = theme.rugMain;
    ctx.fillRect(rx, ry, rw, rh);
    // Outer trim
    ctx.fillStyle = theme.rugBorder;
    ctx.fillRect(rx + 2, ry + 2, rw - 4, 2);
    ctx.fillRect(rx + 2, ry + rh - 4, rw - 4, 2);
    ctx.fillRect(rx + 2, ry + 2, 2, rh - 4);
    ctx.fillRect(rx + rw - 4, ry + 2, 2, rh - 4);
    // Inner geometric pixel pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.fillRect(rx + 8, ry + 8, rw - 16, rh - 16);
    ctx.fillStyle = theme.rugMain;
    ctx.fillRect(rx + 10, ry + 10, rw - 20, rh - 20);
    // Center emblem on rug
    ctx.fillStyle = theme.rugBorder;
    ctx.fillRect(192 - 12, 132 - 8, 24, 16);
    ctx.fillStyle = theme.rugMain;
    ctx.fillRect(192 - 10, 132 - 6, 20, 12);
    ctx.fillStyle = theme.rugBorder;
    ctx.fillRect(192 - 4, 132 - 2, 8, 4);
    // Rug tassels on left & right edges
    for (let y = ry + 2; y < ry + rh - 2; y += 4) {
      ctx.fillRect(rx - 2, y, 2, 2);
      ctx.fillRect(rx + rw, y, 2, 2);
    }

    // Stone threshold slab in front of North Door
    ctx.fillStyle = '#2d324a';
    ctx.fillRect(160, 48, 64, 12);
    ctx.fillStyle = '#3f4666';
    ctx.fillRect(162, 49, 60, 2);
    ctx.fillStyle = '#141724';
    ctx.fillRect(160, 59, 64, 1);

    // South entrance doormat / stone step
    ctx.fillStyle = '#282c40';
    ctx.fillRect(168, 228, 48, 12);
    ctx.fillStyle = '#383e58';
    ctx.fillRect(170, 229, 44, 2);
  }

  drawWalls(ctx, theme) {
    // North Wall Vertical Face (y = 12..48, x = 16..368)
    ctx.fillStyle = theme.wallA;
    ctx.fillRect(16, 12, 352, 36);

    // Staggered 16-bit stone brick pattern on North Wall
    for (let row = 0; row < 4; row++) {
      const by = 12 + row * 9;
      ctx.fillStyle = '#111420';
      ctx.fillRect(16, by + 8, 352, 1);
      const offset = (row % 2) * 12;
      for (let bx = 16 + offset; bx < 368; bx += 24) {
        ctx.fillStyle = '#111420';
        ctx.fillRect(bx, by, 1, 8);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(bx + 1, by + 1, 10, 1);
      }
    }

    // North Wall baseboard trim
    ctx.fillStyle = '#151826';
    ctx.fillRect(16, 44, 352, 4);
    ctx.fillStyle = '#343a56';
    ctx.fillRect(16, 43, 352, 1);

    // Iron barred prison window on left North Wall (x = 64..84, y = 18..34)
    ctx.fillStyle = '#07080d';
    ctx.fillRect(64, 18, 20, 16);
    ctx.fillStyle = '#48506e';
    ctx.fillRect(63, 17, 22, 2);
    ctx.fillRect(63, 33, 22, 2);
    for (let vx = 67; vx <= 80; vx += 4) {
      ctx.fillRect(vx, 18, 2, 16);
    }

    // Hanging pixel chains on North Wall (x = 300, 308)
    ctx.fillStyle = '#4e5675';
    for (let cy = 14; cy < 38; cy += 4) {
      ctx.fillRect(298, cy, 3, 3);
      ctx.fillRect(306, cy + 2, 3, 3);
    }

    // Wall Torches on North Wall (x = 124 and x = 260)
    this.drawWallTorch(ctx, 124, 26);
    this.drawWallTorch(ctx, 260, 26);

    // Outer 3D Top-Down Wall Crown Borders (Top, Left, Right, Bottom)
    const drawWallCrown = (x, y, w, h) => {
      ctx.fillStyle = '#1a1e30';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = '#373e5e';
      ctx.fillRect(x + 1, y + 1, w - 2, 2);
      ctx.fillStyle = '#0c0e17';
      ctx.fillRect(x, y + h - 2, w, 2);
      // Brick joints along wall crown
      ctx.fillStyle = '#10131f';
      if (w > h) {
        for (let bx = x + 16; bx < x + w; bx += 16) ctx.fillRect(bx, y, 1, h);
      } else {
        for (let by = y + 16; by < y + h; by += 16) ctx.fillRect(x, by, w, 1);
      }
    };

    // Top wall crown
    drawWallCrown(0, 0, 384, 12);
    // Left wall crown
    drawWallCrown(0, 0, 16, 256);
    // Right wall crown
    drawWallCrown(368, 0, 16, 256);
    // Bottom wall crown (split by south entrance doorway at 168..216)
    drawWallCrown(0, 240, 168, 16);
    drawWallCrown(216, 240, 168, 16);

    // Locked iron bars across the South entrance (where the prisoner came from)
    ctx.fillStyle = '#10121c';
    ctx.fillRect(168, 240, 48, 16);
    ctx.fillStyle = '#454c68';
    ctx.fillRect(168, 244, 48, 2);
    for (let bx = 172; bx < 214; bx += 6) {
      ctx.fillRect(bx, 240, 2, 14);
    }
  }

  drawWallTorch(ctx, x, y) {
    // Iron bracket
    ctx.fillStyle = '#363b52';
    ctx.fillRect(x - 2, y + 4, 4, 6);
    // Wooden handle
    ctx.fillStyle = '#6b4226';
    ctx.fillRect(x - 1, y, 2, 8);
    // Animated 16-bit pixel flame
    const flicker = Math.floor(this.frame / 6) % 3;
    ctx.fillStyle = '#ff4800';
    ctx.fillRect(x - 3, y - 5, 6, 5);
    ctx.fillStyle = '#ff9900';
    ctx.fillRect(x - 2, y - 6 - (flicker === 1 ? 1 : 0), 4, 5);
    ctx.fillStyle = '#ffffaa';
    ctx.fillRect(x - 1, y - 4, 2, 3);
  }

  drawNorthDoor(ctx) {
    const dx = 160, dy = 6, dw = 64, dh = 42;

    // Heavy Stone Archway Frame
    ctx.fillStyle = '#363c58';
    ctx.fillRect(dx - 4, dy, dw + 8, dh + 2);
    ctx.fillStyle = '#4e567a';
    ctx.fillRect(dx - 3, dy + 1, dw + 6, 2);
    // Keystone at top center
    ctx.fillStyle = '#5c668f';
    ctx.fillRect(186, dy - 1, 12, 5);

    // Doorway interior (dark corridor or glowing exit when unlocked)
    if (game.doorUnlocked) {
      ctx.fillStyle = '#0c2618';
      ctx.fillRect(dx, dy + 4, dw, dh - 2);
      // Glowing exit light inside open doorway
      const pulse = 0.7 + Math.sin(this.frame * 0.08) * 0.2;
      ctx.fillStyle = `rgba(0, 255, 100, ${0.35 * pulse})`;
      ctx.fillRect(dx + 4, dy + 6, dw - 8, dh - 4);
      ctx.fillStyle = `rgba(200, 255, 220, ${0.5 * pulse})`;
      ctx.fillRect(dx + 14, dy + 10, dw - 28, dh - 8);
    } else {
      ctx.fillStyle = '#090a10';
      ctx.fillRect(dx, dy + 4, dw, dh - 2);
    }

    // Left and Right Wooden Door Panels (swing inward as doorOpenProgress goes 0 -> 1)
    const panelFullW = (dw - 4) / 2; // 30px each
    const panelW = Math.max(4, Math.round(panelFullW * (1 - this.doorOpenProgress * 0.82)));

    // Left panel
    this.drawDoorPanel(ctx, dx + 2, dy + 4, panelW, dh - 2, true);
    // Right panel
    this.drawDoorPanel(ctx, dx + dw - 2 - panelW, dy + 4, panelW, dh - 2, false);

    // If locked, draw crossed chains and the iconic Padlock (Cadeado)!
    if (!game.doorUnlocked) {
      // Iron chains crossing the door
      ctx.fillStyle = '#6c7696';
      for (let i = 0; i < 26; i += 3) {
        ctx.fillRect(dx + 8 + i * 1.8, dy + 12 + i, 3, 2);
        ctx.fillRect(dx + dw - 11 - i * 1.8, dy + 12 + i, 3, 2);
      }

      // Padlock (Cadeado) in the center of the door (x = 185..199, y = 20..38)
      const lx = 185, ly = 20;
      const highlight = this.nearDoor || (Math.floor(this.frame / 25) % 2 === 0);

      // Glow behind padlock when player is near
      if (this.nearDoor) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.35)';
        ctx.fillRect(lx - 3, ly - 3, 20, 22);
      }

      // Steel Shackle
      ctx.fillStyle = highlight ? '#ffffff' : '#b8c4d8';
      ctx.fillRect(lx + 3, ly, 8, 2);
      ctx.fillRect(lx + 2, ly + 2, 2, 5);
      ctx.fillRect(lx + 10, ly + 2, 2, 5);

      // Golden Padlock Body
      ctx.fillStyle = '#996600';
      ctx.fillRect(lx, ly + 6, 14, 11);
      ctx.fillStyle = highlight ? '#ffe033' : '#ebb400';
      ctx.fillRect(lx + 1, ly + 7, 12, 9);
      // Padlock bevel shine
      ctx.fillStyle = '#fff5aa';
      ctx.fillRect(lx + 1, ly + 7, 12, 1);
      ctx.fillRect(lx + 1, ly + 7, 1, 9);

      // Keyhole in center of padlock
      ctx.fillStyle = '#14141c';
      ctx.fillRect(lx + 6, ly + 10, 2, 2);
      ctx.fillRect(lx + 6, ly + 12, 2, 3);
    } else {
      // Light beam spilling onto the floor when unlocked
      const grad = ctx.createLinearGradient(192, 48, 192, 105);
      grad.addColorStop(0, 'rgba(0, 255, 110, 0.28)');
      grad.addColorStop(1, 'rgba(0, 255, 110, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(164, 48);
      ctx.lineTo(220, 48);
      ctx.lineTo(244, 105);
      ctx.lineTo(140, 105);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawDoorPanel(ctx, x, y, w, h, isLeft) {
    // Base dark oak wood
    ctx.fillStyle = '#3b2416';
    ctx.fillRect(x, y, w, h);
    // Plank lines
    ctx.fillStyle = '#26160c';
    for (let px = x + 6; px < x + w - 2; px += 6) {
      ctx.fillRect(px, y, 1, h);
    }
    // Wood highlight
    ctx.fillStyle = '#4f3220';
    ctx.fillRect(x + 1, y + 1, Math.max(1, w - 2), 2);

    // Iron reinforcement straps
    ctx.fillStyle = '#2b3042';
    ctx.fillRect(x, y + 7, w, 4);
    ctx.fillRect(x, y + h - 11, w, 4);
    // Iron rivets
    ctx.fillStyle = '#7b84a3';
    if (w >= 12) {
      ctx.fillRect(x + 3, y + 8, 2, 2);
      ctx.fillRect(x + w - 5, y + 8, 2, 2);
      ctx.fillRect(x + 3, y + h - 10, 2, 2);
      ctx.fillRect(x + w - 5, y + h - 10, 2, 2);
    }
    // Seam border
    ctx.fillStyle = '#140b06';
    if (isLeft) {
      ctx.fillRect(x + w - 1, y, 1, h);
    } else {
      ctx.fillRect(x, y, 1, h);
    }
  }

  drawProp(ctx, prop) {
    const { id, x, y, w, h } = prop;

    // Soft ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x + 2, y + 4, w, h - 2);

    if (id === 'bed') {
      // 3/4 Top-Down Prison Cot / Bed
      // Iron/wood frame
      ctx.fillStyle = '#382417';
      ctx.fillRect(x, y, w, h);
      // Headboard (top)
      ctx.fillStyle = '#4f3321';
      ctx.fillRect(x, y, w, 6);
      ctx.fillStyle = '#24150c';
      ctx.fillRect(x, y + 6, w, 2);
      // Mattress
      ctx.fillStyle = '#9e9589';
      ctx.fillRect(x + 3, y + 8, w - 6, h - 12);
      // Pillow
      ctx.fillStyle = '#d9d2c7';
      ctx.fillRect(x + 6, y + 10, w - 12, 8);
      // Blanket (worn prison orange/brown)
      ctx.fillStyle = '#8c3b19';
      ctx.fillRect(x + 3, y + 20, w - 6, h - 24);
      ctx.fillStyle = '#a84a22';
      ctx.fillRect(x + 4, y + 20, w - 8, 3);
    } else if (id === 'table') {
      // 3/4 Top-Down Study Table with Parchment & Candle
      // Table legs
      ctx.fillStyle = '#29170c';
      ctx.fillRect(x + 2, y + h - 6, 4, 6);
      ctx.fillRect(x + w - 6, y + h - 6, 4, 6);
      // Tabletop
      ctx.fillStyle = '#5c3820';
      ctx.fillRect(x, y, w, h - 6);
      ctx.fillStyle = '#73482b';
      ctx.fillRect(x + 1, y + 1, w - 2, 2);
      // Front edge of tabletop
      ctx.fillStyle = '#3d2414';
      ctx.fillRect(x, y + h - 9, w, 3);
      // Parchment scroll on table
      ctx.fillStyle = '#e0cfa9';
      ctx.fillRect(x + 8, y + 6, 14, 11);
      ctx.fillStyle = '#705c42';
      ctx.fillRect(x + 10, y + 9, 10, 1);
      ctx.fillRect(x + 10, y + 12, 8, 1);
      // Stack of cipher books
      ctx.fillStyle = '#225588';
      ctx.fillRect(x + 28, y + 5, 10, 8);
      ctx.fillStyle = '#d9ccb8';
      ctx.fillRect(x + 29, y + 12, 8, 2);
      // Candle on table
      ctx.fillStyle = '#f0ead8';
      ctx.fillRect(x + 42, y + 6, 3, 6);
      const fl = Math.floor(this.frame / 7) % 2;
      ctx.fillStyle = '#ffaa00';
      ctx.fillRect(x + 42, y + 3 - fl, 3, 3);
      ctx.fillStyle = '#ffffcc';
      ctx.fillRect(x + 43, y + 4, 1, 2);
    } else if (id === 'brazierL' || id === 'brazierR') {
      // Stone Pedestal + Flaming Iron Brazier
      ctx.fillStyle = '#323850';
      ctx.fillRect(x + 2, y + 10, w - 4, h - 10);
      ctx.fillStyle = '#485070';
      ctx.fillRect(x + 3, y + 10, w - 6, 3);
      // Iron bowl
      ctx.fillStyle = '#222533';
      ctx.fillRect(x, y + 5, w, 7);
      ctx.fillStyle = '#505878';
      ctx.fillRect(x + 1, y + 5, w - 2, 2);
      // Glowing embers & animated pixel fire
      const f = (Math.floor(this.frame / 5) + (id === 'brazierL' ? 0 : 1)) % 3;
      ctx.fillStyle = '#ff3b00';
      ctx.fillRect(x + 3, y + 1, w - 6, 5);
      ctx.fillStyle = '#ff9d00';
      ctx.fillRect(x + 5, y - 2 - (f === 0 ? 1 : 0), w - 10, 6);
      ctx.fillStyle = '#ffffaa';
      ctx.fillRect(x + 7, y + 1, w - 14, 3);
    } else if (id === 'barrels') {
      // Two Oak Barrels + Wooden Crate
      const drawBarrel = (bx, by) => {
        ctx.fillStyle = '#52321b';
        ctx.fillRect(bx + 1, by, 16, 20);
        ctx.fillRect(bx, by + 2, 18, 16);
        // Barrel top rim
        ctx.fillStyle = '#6e4527';
        ctx.fillRect(bx + 2, by + 1, 14, 6);
        ctx.fillStyle = '#3d2412';
        ctx.fillRect(bx + 3, by + 2, 12, 4);
        // Iron hoops
        ctx.fillStyle = '#363c52';
        ctx.fillRect(bx, by + 8, 18, 2);
        ctx.fillRect(bx, by + 14, 18, 2);
      };
      drawBarrel(x, y + 2);
      drawBarrel(x + 20, y + 14);
      // Wooden crate at top-right of cluster
      const cx = x + 20, cy = y - 2;
      ctx.fillStyle = '#664124';
      ctx.fillRect(cx, cy, 18, 16);
      ctx.fillStyle = '#805330';
      ctx.fillRect(cx + 1, cy + 1, 16, 14);
      ctx.fillStyle = '#472c17';
      ctx.fillRect(cx + 3, cy + 3, 12, 10);
      ctx.fillStyle = '#6e4728';
      ctx.fillRect(cx + 4, cy + 4, 10, 8);
    } else if (id === 'bookshelf') {
      // Tall Wooden Shelf + Iron-Bound Chest
      // Bookshelf (left 32px)
      ctx.fillStyle = '#3d2313';
      ctx.fillRect(x, y, 32, h - 6);
      ctx.fillStyle = '#59341d';
      ctx.fillRect(x + 1, y + 1, 30, 3);
      // Shelves
      for (let sy = y + 8; sy < y + h - 10; sy += 9) {
        ctx.fillStyle = '#24140a';
        ctx.fillRect(x + 3, sy - 5, 26, 5);
        ctx.fillStyle = '#4f2e19';
        ctx.fillRect(x + 2, sy, 28, 2);
        // Colorful books/bottles on shelf
        const bookColors = ['#b83232', '#2e7d5b', '#365f9c', '#c9972c', '#7c3f9c'];
        for (let bx = x + 4; bx < x + 26; bx += 4) {
          ctx.fillStyle = bookColors[(bx + sy) % bookColors.length];
          ctx.fillRect(bx, sy - 4, 3, 4);
        }
      }
      // Iron-bound Chest beside shelf (right 20px)
      const chX = x + 34, chY = y + h - 22;
      ctx.fillStyle = '#4a2c18';
      ctx.fillRect(chX, chY, 20, 16);
      ctx.fillStyle = '#633c22';
      ctx.fillRect(chX + 1, chY + 1, 18, 5);
      // Iron bands & gold clasp
      ctx.fillStyle = '#343a50';
      ctx.fillRect(chX + 2, chY, 2, 16);
      ctx.fillRect(chX + 16, chY, 2, 16);
      ctx.fillStyle = '#e0a82e';
      ctx.fillRect(chX + 8, chY + 5, 4, 4);
    }
  }

  // ── 4-Directional 16x32 Stardew-Style Playable Character Sprite ──
  drawPlayer(ctx) {
    const px = Math.round(this.player.x);
    const py = Math.round(this.player.y);
    const dir = this.player.dir;
    const wf = this.player.walkFrame;
    const isMoving = this.player.moving;

    // Bounce 1px ONLY on walk step frames (1 & 3); completely still when idle (only eyes blink)
    const bounceY = isMoving ? ((wf === 1 || wf === 3) ? -1 : 0) : 0;

    // Ground shadow under feet
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(px - 6, py - 2, 12, 4);
    ctx.fillRect(px - 5, py - 3, 10, 6);

    // Base top-left of 16x32 character sprite (feet land at sy + 31 = py)
    const sx = px - 8;
    const sy = py - 31 + bounceY;

    drawCustomCharacter(ctx, sx, sy, game.character || defaultCharacter(), dir, wf, isMoving, true);
  }

  drawLighting(ctx) {
    const flicker = Math.sin(this.frame * 0.15) * 2;
    const lights = [
      { x: 124, y: 34, r: 58 + flicker, color: 'rgba(255, 145, 30, 0.14)' },
      { x: 260, y: 34, r: 58 - flicker, color: 'rgba(255, 145, 30, 0.14)' },
      { x: 102, y: 68, r: 46 + flicker, color: 'rgba(255, 120, 20, 0.12)' },
      { x: 282, y: 68, r: 46 - flicker, color: 'rgba(255, 120, 20, 0.12)' },
      { x: 336, y: 58, r: 28,           color: 'rgba(255, 200, 80, 0.10)' }
    ];

    for (const l of lights) {
      const grad = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.r);
      grad.addColorStop(0, l.color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Floating dust motes in the room
    for (const m of this.motes) {
      const alpha = 0.2 + 0.15 * Math.sin(this.frame * 0.05 + m.phase);
      ctx.fillStyle = `rgba(255, 230, 150, ${alpha})`;
      ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
    }

    // Subtle corner vignette inside the room
    const vig = ctx.createRadialGradient(192, 136, 95, 192, 136, 230);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(2, 3, 8, 0.45)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawInteractionBubble(ctx) {
    // Small pixel indicator above character when in range of the padlock
    const bob = Math.floor(this.frame / 15) % 2;
    const bx = Math.round(this.player.x) - 6;
    const by = Math.round(this.player.y) - 41 - bob;

    ctx.fillStyle = '#080a12';
    ctx.fillRect(bx, by, 12, 9);
    ctx.fillStyle = game.doorUnlocked ? '#00ff41' : '#ffd700';
    ctx.fillRect(bx, by, 12, 1);
    ctx.fillRect(bx, by + 8, 12, 1);
    ctx.fillRect(bx, by, 1, 9);
    ctx.fillRect(bx + 11, by, 1, 9);

    // Pixel 'E' inside bubble
    ctx.fillRect(bx + 4, by + 2, 4, 1);
    ctx.fillRect(bx + 4, by + 4, 3, 1);
    ctx.fillRect(bx + 4, by + 6, 4, 1);
    ctx.fillRect(bx + 4, by + 2, 1, 5);
  }

  startAnimation() {
    this.lastTime = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;
      this.update(dt);
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stopAnimation() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

let topDownRoom = null;

// ─── Complete 16x32 Stardew Valley Style Pixel Art Character Renderer ───
function drawCustomCharacter(ctx, sx, sy, charData, dir = 'down', wf = 0, isMoving = false, canBlink = true) {
  const cfg = { ...defaultCharacter(), ...(charData || {}) };
  const isFemale = cfg.gender === 'female';

  // Male is 1px taller with broad shoulders & wide stance;
  // Female is 1px shorter with slimmer shoulders, cinched waist, curved hips & narrower legs/boots
  const gOff = isFemale ? 1 : 0;

  // Natural eye blink when standing still (~150ms blink every ~3.4 seconds)
  const nowMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const blinkPhase = nowMs % 3400;
  const isBlinking = Boolean(canBlink && !isMoving && blinkPhase > 3240);

  const skinObj = CHARACTER_CATALOG.skin[cfg.skin % CHARACTER_CATALOG.skin.length] || CHARACTER_CATALOG.skin[1];
  const hairStyleObj = CHARACTER_CATALOG.hairStyle[cfg.hairStyle % CHARACTER_CATALOG.hairStyle.length] || CHARACTER_CATALOG.hairStyle[0];
  const hairCol = CHARACTER_CATALOG.hairColor[cfg.hairColor % CHARACTER_CATALOG.hairColor.length] || CHARACTER_CATALOG.hairColor[0];
  const topObj = CHARACTER_CATALOG.top[cfg.top % CHARACTER_CATALOG.top.length] || CHARACTER_CATALOG.top[0];
  const pantsObj = CHARACTER_CATALOG.pants[cfg.pants % CHARACTER_CATALOG.pants.length] || CHARACTER_CATALOG.pants[0];
  const shoesObj = CHARACTER_CATALOG.shoes[cfg.shoes % CHARACTER_CATALOG.shoes.length] || CHARACTER_CATALOG.shoes[0];
  const accObj = CHARACTER_CATALOG.accessory[cfg.accessory % CHARACTER_CATALOG.accessory.length] || CHARACTER_CATALOG.accessory[0];

  // Multi-tone Stardew Palette
  const sO = skinObj.outline || '#3d161e';
  const sL = skinObj.light   || '#fbd3b0';
  const sM = skinObj.main    || '#f2b68a';
  const sS = skinObj.shadow  || '#d48163';
  const sD = skinObj.deep    || '#ad5e45';

  const hO = hairCol.outline || '#4a1c24';
  const hD = hairCol.dark    || '#c7651a';
  const hM = hairCol.main    || '#f09b29';
  const hH = hairCol.high    || '#fce26b';

  const tO = topObj.outline   || '#231429';
  const tD = topObj.dark      || '#1e326e';
  const tM = topObj.main      || '#3054ad';
  const tH = topObj.high      || '#4e79d9';
  const iM = topObj.inner     || '#c94022';
  const iD = topObj.innerDark || '#8c2411';

  const pO = pantsObj.outline || '#38151e';
  const pD = pantsObj.shadow  || '#592918';
  const pM = pantsObj.main    || '#824326';
  const pH = pantsObj.high    || '#a35b37';

  const bO = shoesObj.outline || '#0c111c';
  const bD = shoesObj.sole    || '#102130';
  const bM = shoesObj.main    || '#1b3f57';
  const bH = shoesObj.accent  || '#367594';

  const eW = '#ffffff';
  const eC = '#b8d8eb';
  const eI = '#1ca64c';
  const eD = '#0d692b';

  // Helper to paint a single pixel or horizontal span on the 16x32 grid
  const dot = (x, y, c) => {
    if (!c) return;
    ctx.fillStyle = c;
    ctx.fillRect(sx + x, sy + y, 1, 1);
  };
  const hline = (x, y, w, c) => {
    if (!c || w <= 0) return;
    ctx.fillStyle = c;
    ctx.fillRect(sx + x, sy + y, w, 1);
  };
  const rect = (x, y, w, h, c) => {
    if (!c || w <= 0 || h <= 0) return;
    ctx.fillStyle = c;
    ctx.fillRect(sx + x, sy + y, w, h);
  };

  // Walk cycle offsets (completely still when !isMoving)
  const leftLegY  = isMoving ? (wf === 1 ? -1 : (wf === 3 ? 1 : 0)) : 0;
  const rightLegY = isMoving ? (wf === 3 ? -1 : (wf === 1 ? 1 : 0)) : 0;
  const leftArmY  = isMoving ? (wf === 3 ? -1 : (wf === 1 ? 1 : 0)) : 0;
  const rightArmY = isMoving ? (wf === 1 ? -1 : (wf === 3 ? 1 : 0)) : 0;

  if (dir === 'down' || dir === 'up') {
    const hy = gOff; // +1px downward head/shoulder shift for female

    // ── 0. LONG / SWEPT HAIR BACK LAYER (visible behind shoulders when facing down) ──
    if (dir === 'down' && hairStyleObj.id === 'long') {
      rect(3, hy + 11, 10, 9, hO);
      rect(4, hy + 11, 8, 8, hD);
      rect(5, hy + 12, 6, 6, hM);
    }

    // ── 1 & 2. LOWER BODY, HIPS, LEGS & BOOTS (Male vs Female Stardew Farmer Body Model) ──
    const lShoeY = 29 + leftLegY;
    const rShoeY = 29 + rightLegY;

    if (!isFemale) {
      // ── MALE LOWER BODY: Straight waist (x=4..11), wide-stance legs & sturdy outward boots ──
      // Belt & Buckle at row 23
      dot(4, 23, pO); dot(5, 23, '#3b2014'); dot(6, 23, '#3b2014');
      dot(7, 23, '#e0a938'); dot(8, 23, '#b8811c');
      dot(9, 23, '#3b2014'); dot(10, 23, '#3b2014'); dot(11, 23, pO);

      // Pelvis row 24
      dot(4, 24, pO); dot(5, 24, pH); dot(6, 24, pM); dot(7, 24, pD);
      dot(8, 24, pD); dot(9, 24, pM); dot(10, 24, pD); dot(11, 24, pO);

      // Left Leg (x = 4..7)
      for (let y = 25; y <= 28 + leftLegY; y++) {
        dot(4, y, pO);
        dot(5, y, y === 25 ? pH : pM);
        dot(6, y, pD);
        dot(7, y, pO);
      }
      // Right Leg (x = 8..11)
      for (let y = 25; y <= 28 + rightLegY; y++) {
        dot(8, y, pO);
        dot(9, y, y === 25 ? pM : pD);
        dot(10, y, pD);
        dot(11, y, pO);
      }

      // Left Male Boot (x = 3..7, flares outward at toe)
      dot(4, lShoeY, bO);     dot(5, lShoeY, bH);     dot(6, lShoeY, bM);     dot(7, lShoeY, bO);
      dot(3, lShoeY + 1, bO); dot(4, lShoeY + 1, bH); dot(5, lShoeY + 1, bM); dot(6, lShoeY + 1, bD); dot(7, lShoeY + 1, bO);
      dot(3, lShoeY + 2, bO); dot(4, lShoeY + 2, bD); dot(5, lShoeY + 2, bD); dot(6, lShoeY + 2, bO);

      // Right Male Boot (x = 8..12, flares outward at toe)
      dot(8, rShoeY, bO);     dot(9, rShoeY, bM);     dot(10, rShoeY, bH);    dot(11, rShoeY, bO);
      dot(8, rShoeY + 1, bO); dot(9, rShoeY + 1, bD); dot(10, rShoeY + 1, bM); dot(11, rShoeY + 1, bH); dot(12, rShoeY + 1, bO);
      dot(9, rShoeY + 2, bO); dot(10, rShoeY + 2, bD); dot(11, rShoeY + 2, bD); dot(12, rShoeY + 2, bO);
    } else {
      // ── FEMALE LOWER BODY: Cinched waist (row 22), flared feminine hips (rows 23..26) & narrow legs/boots (x=5..10) ──
      // Cinched Waist Belt at row 22 (x = 5..10)
      dot(5, 22, tO); dot(6, 22, '#452216');
      dot(7, 22, '#f5c242'); dot(8, 22, '#c9911e');
      dot(9, 22, '#452216'); dot(10, 22, tO);

      // Flared Feminine Hips / Pelvis (rows 23..26, curving out to x=3..12 like the Female Farmer model)
      dot(4, 23, pO); dot(5, 23, pH); dot(6, 23, pM); dot(7, 23, pM); dot(8, 23, pM); dot(9, 23, pD); dot(10, 23, pD); dot(11, 23, pO);
      dot(3, 24, pO); dot(4, 24, pH); dot(5, 24, pH); dot(6, 24, pM); dot(7, 24, pM); dot(8, 24, pM); dot(9, 24, pD); dot(10, 24, pD); dot(11, 24, pD); dot(12, 24, pO);
      dot(3, 25, pO); dot(4, 25, pM); dot(5, 25, pM); dot(6, 25, pD); dot(7, 25, pD); dot(8, 25, pD); dot(9, 25, pD); dot(10, 25, pD); dot(11, 25, pO); dot(12, 25, pO);
      dot(4, 26, pO); dot(5, 26, pO); dot(6, 26, pD); dot(7, 26, pO); dot(8, 26, pO); dot(9, 26, pD); dot(10, 26, pO); dot(11, 26, pO);

      // Slimmer, Closer-Together Female Legs (x = 5..7 Left, x = 8..10 Right)
      for (let y = 27; y <= 28 + leftLegY; y++) {
        dot(5, y, pO); dot(6, y, dir === 'down' ? sM : pM); dot(7, y, pO);
      }
      for (let y = 27; y <= 28 + rightLegY; y++) {
        dot(8, y, pO); dot(9, y, dir === 'down' ? sS : pD); dot(10, y, pO);
      }

      // Dainty Female Boots (x = 5..7 Left, x = 8..10 Right)
      dot(5, lShoeY, bO);     dot(6, lShoeY, bH);     dot(7, lShoeY, bO);
      dot(5, lShoeY + 1, bO); dot(6, lShoeY + 1, bM); dot(7, lShoeY + 1, bD);
      dot(5, lShoeY + 2, bO); dot(6, lShoeY + 2, bD); dot(7, lShoeY + 2, bO);

      dot(8, rShoeY, bO);     dot(9, rShoeY, bH);     dot(10, rShoeY, bO);
      dot(8, rShoeY + 1, bD); dot(9, rShoeY + 1, bM); dot(10, rShoeY + 1, bO);
      dot(8, rShoeY + 2, bO); dot(9, rShoeY + 2, bD); dot(10, rShoeY + 2, bO);
    }

    // ── 3 & 4. TORSO, SHOULDERS, SLEEVES & HANDS (Male Broad vs Female Slimmer Contoured) ──
    const ty = 16 + hy;
    const sColMain = topObj.style === 'vest' ? iM : tM;
    const sColHigh = topObj.style === 'vest' ? iM : tH;
    const sColDark = topObj.style === 'vest' ? iD : tD;

    if (!isFemale) {
      // ── MALE TORSO (rows 16..22, x = 4..11) ──
      hline(4, 16, 8, tO);
      if (dir === 'down') {
        dot(6, 16, tM); dot(7, 16, sD); dot(8, 16, sS); dot(9, 16, tM);
      } else {
        hline(5, 16, 6, tD);
      }

      for (let r = 1; r <= 6; r++) {
        const y = 16 + r;
        dot(4, y, tO);
        dot(11, y, tO);
        if (dir === 'down') {
          if (topObj.style === 'jacket') {
            dot(5, y, r <= 2 ? tH : tM);
            dot(6, y, (r === 2 || r === 4) ? tO : tD);
            dot(7, y, r === 1 ? sS : iM);
            dot(8, y, r === 1 ? sD : iD);
            dot(9, y, (r === 2 || r === 4) ? tO : tD);
            dot(10, y, r <= 2 ? tM : tD);
          } else if (topObj.style === 'hoodie') {
            dot(5, y, r <= 2 ? tH : tM);
            dot(6, y, r <= 3 ? iM : tD);
            dot(7, y, r >= 4 ? tD : tM);
            dot(8, y, r >= 4 ? tD : tM);
            dot(9, y, r <= 3 ? iD : tD);
            dot(10, y, tD);
          } else if (topObj.style === 'vest') {
            dot(5, y, tH);
            dot(6, y, r === 3 ? '#f5c542' : tM);
            dot(7, y, iM);
            dot(8, y, iD);
            dot(9, y, r === 3 ? '#f5c542' : tD);
            dot(10, y, tD);
          } else {
            dot(5, y, r <= 2 ? tH : tM);
            dot(6, y, tM);
            dot(7, y, r === 1 ? iM : tM);
            dot(8, y, r === 1 ? iD : tM);
            dot(9, y, tD);
            dot(10, y, tD);
          }
        } else {
          dot(5, y, tM);
          dot(6, y, r === 1 ? tH : tM);
          dot(7, y, r === 1 ? tH : tM);
          dot(8, y, tM);
          dot(9, y, tD);
          dot(10, y, tD);
        }
      }

      // Male Broad Arms & Hands (x = 2..4 Left, x = 11..13 Right)
      const lay = 17 + leftArmY;
      dot(3, lay, tO);     dot(4, lay, sColHigh);
      dot(2, lay + 1, tO); dot(3, lay + 1, sColHigh); dot(4, lay + 1, tO);
      dot(2, lay + 2, tO); dot(3, lay + 2, sColMain); dot(4, lay + 2, tO);
      dot(2, lay + 3, tO); dot(3, lay + 3, sColDark); dot(4, lay + 3, tO);
      dot(2, lay + 4, sO); dot(3, lay + 4, sL);       dot(4, lay + 4, sM);
      dot(2, lay + 5, sO); dot(3, lay + 5, sS);       dot(4, lay + 5, sO);

      const ray = 17 + rightArmY;
      dot(11, ray, sColMain); dot(12, ray, tO);
      dot(11, ray + 1, tO);   dot(12, ray + 1, sColHigh); dot(13, ray + 1, tO);
      dot(11, ray + 2, tO);   dot(12, ray + 2, sColMain); dot(13, ray + 2, tO);
      dot(11, ray + 3, tO);   dot(12, ray + 3, sColDark); dot(13, ray + 3, tO);
      dot(11, ray + 4, sM);   dot(12, ray + 4, sL);       dot(13, ray + 4, sO);
      dot(11, ray + 5, sO);   dot(12, ray + 5, sS);       dot(13, ray + 5, sO);
    } else {
      // ── FEMALE TORSO: Narrower shoulders, contoured bust & cinched waist (rows 17..21) ──
      hline(5, 17, 6, tO);
      if (dir === 'down') {
        dot(6, 17, sS); dot(7, 17, sM); dot(8, 17, sM); dot(9, 17, sS);
      } else {
        hline(6, 17, 4, tD);
      }

      for (let r = 1; r <= 4; r++) {
        const y = 17 + r; // rows 18..21
        dot(4, y, tO);
        dot(11, y, tO);
        if (dir === 'down') {
          if (topObj.style === 'jacket') {
            dot(5, y, r <= 2 ? tH : tM);
            dot(6, y, r === 2 ? tH : tD);
            dot(7, y, r === 1 ? sL : iM);
            dot(8, y, r === 1 ? sM : iD);
            dot(9, y, r === 2 ? tM : tD);
            dot(10, y, tD);
          } else if (topObj.style === 'hoodie') {
            dot(5, y, r <= 2 ? tH : tM);
            dot(6, y, r <= 2 ? iM : tM);
            dot(7, y, tM);
            dot(8, y, tM);
            dot(9, y, r <= 2 ? iD : tD);
            dot(10, y, tD);
          } else {
            // Contoured feminine top (like the Female Farmer's fitted shirt)
            dot(5, y, r <= 2 ? tH : tM);
            dot(6, y, r === 2 ? tH : tM);
            dot(7, y, r === 1 ? iM : tM);
            dot(8, y, r === 1 ? iD : tD);
            dot(9, y, r === 2 ? tM : tD);
            dot(10, y, tD);
          }
        } else {
          dot(5, y, tM);
          dot(6, y, r === 1 ? tH : tM);
          dot(7, y, r === 1 ? tH : tM);
          dot(8, y, tM);
          dot(9, y, tD);
          dot(10, y, tD);
        }
      }

      // Female Delicate Arms & Hands (tucked closer to torso at x = 3..4 and x = 11..12)
      const lay = 18 + leftArmY;
      dot(3, lay, tO);     dot(4, lay, sColHigh);
      dot(3, lay + 1, tO); dot(4, lay + 1, sColMain);
      dot(3, lay + 2, sO); dot(4, lay + 2, sL);
      dot(3, lay + 3, sO); dot(4, lay + 3, sS);

      const ray = 18 + rightArmY;
      dot(11, ray, sColHigh); dot(12, ray, tO);
      dot(11, ray + 1, sColDark); dot(12, ray + 1, tO);
      dot(11, ray + 2, sL);   dot(12, ray + 2, sO);
      dot(11, ray + 3, sS);   dot(12, ray + 3, sO);
    }

    // ── 5. HEAD, FACE, BLINKING EYES & HEAD-ALIGNED HAIR (rows hy+2 .. hy+15) ──
    if (dir === 'down') {
      // Head & Face base (rows hy+8 .. hy+15, strictly x=3..12 symmetrical cranium)
      dot(3, hy + 8, sO); hline(4, hy + 8, 8, sS); dot(12, hy + 8, sO);
      dot(3, hy + 9, sO); hline(4, hy + 9, 8, sM); dot(6, hy + 9, sL); dot(7, hy + 9, sL); dot(12, hy + 9, sO);
      dot(3, hy + 10, sO); dot(4, hy + 10, sS); hline(5, hy + 10, 6, sL); dot(11, hy + 10, sS); dot(12, hy + 10, sO);

      // Row 11: Eyebrows & Symmetrical Upper Ears (ears at x=2..3 and x=12..13)
      dot(2, hy + 11, sO); dot(3, hy + 11, sS); dot(4, hy + 11, sM);
      dot(5, hy + 11, isBlinking ? sS : hO); dot(6, hy + 11, isBlinking ? sM : hD);
      dot(7, hy + 11, sL); dot(8, hy + 11, sM);
      dot(9, hy + 11, isBlinking ? sM : hD); dot(10, hy + 11, isBlinking ? sS : hO);
      dot(11, hy + 11, sM); dot(12, hy + 11, sS); dot(13, hy + 11, sO);

      if (isBlinking) {
        // ── CLOSED BLINKING EYES (only eyelids & horizontal lash line move!) ──
        dot(2, hy + 12, sO); dot(3, hy + 12, sD); dot(4, hy + 12, sM);
        dot(5, hy + 12, sM); dot(6, hy + 12, sL);
        dot(7, hy + 12, sL); dot(8, hy + 12, sM);
        dot(9, hy + 12, sL); dot(10, hy + 12, sM);
        dot(11, hy + 12, sM); dot(12, hy + 12, sD); dot(13, hy + 12, sO);

        dot(3, hy + 13, sO); dot(4, hy + 13, isFemale ? hO : sS);
        dot(5, hy + 13, sO); dot(6, hy + 13, hO); // Left closed lash line
        dot(7, hy + 13, sM); dot(8, hy + 13, sM);
        dot(9, hy + 13, hO); dot(10, hy + 13, sO); // Right closed lash line
        dot(11, hy + 13, isFemale ? hO : sS); dot(12, hy + 13, sO);
      } else {
        // ── OPEN EXPRESSIVE 2x2 STARDEW EYES ──
        dot(2, hy + 12, sO); dot(3, hy + 12, sD); dot(4, hy + 12, isFemale ? hO : sM);
        dot(5, hy + 12, eW); dot(6, hy + 12, eI); // Left Eye top (sclera + iris)
        dot(7, hy + 12, sL); dot(8, hy + 12, sM);
        dot(9, hy + 12, eI); dot(10, hy + 12, eW); // Right Eye top (iris + sclera)
        dot(11, hy + 12, isFemale ? hO : sM); dot(12, hy + 12, sD); dot(13, hy + 12, sO);

        dot(3, hy + 13, sO); dot(4, hy + 13, sS);
        dot(5, hy + 13, eC); dot(6, hy + 13, eD); // Left Eye bottom
        dot(7, hy + 13, sM); dot(8, hy + 13, sM);
        dot(9, hy + 13, eD); dot(10, hy + 13, eC); // Right Eye bottom
        dot(11, hy + 13, sS); dot(12, hy + 13, sO);
      }

      // Row 14: Lower Cheeks & Soft Blush
      dot(3, hy + 14, sO);
      dot(4, hy + 14, isFemale ? '#e88496' : sS);
      hline(5, hy + 14, 6, sM);
      dot(7, hy + 14, sL); dot(8, hy + 14, sL);
      dot(11, hy + 14, isFemale ? '#e88496' : sS);
      dot(12, hy + 14, sO);

      // Row 15: Rounded Chin & Jawline
      dot(4, hy + 15, sO); dot(5, hy + 15, sO);
      dot(6, hy + 15, sS); dot(7, hy + 15, sM); dot(8, hy + 15, sM); dot(9, hy + 15, sS);
      dot(10, hy + 15, sO); dot(11, hy + 15, sO);

      // ── 8 SNUGLY ALIGNED HAIRSTYLES (FRONT, strictly hugging the x=3..12 cranium!) ──
      if (hairStyleObj.id === 'parted' || hairStyleObj.id === 'spiky') {
        // 1. Repartido Clássico: Hugs x=3..12 cranium, clean side part at x=8, neat diagonal bangs
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hM); dot(6, hy + 5, hH); dot(7, hy + 5, hH); dot(8, hy + 5, hD); dot(9, hy + 5, hH); dot(10, hy + 5, hM); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hM); dot(5, hy + 6, hH); dot(6, hy + 6, hM); dot(7, hy + 6, hM); dot(8, hy + 6, hD); dot(9, hy + 6, hH); dot(10, hy + 6, hM); dot(11, hy + 6, hD); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hM); dot(5, hy + 7, hM); dot(6, hy + 7, hD); dot(7, hy + 7, hD); dot(8, hy + 7, hO); dot(9, hy + 7, hD); dot(10, hy + 7, hM); dot(11, hy + 7, hD); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hM); dot(5, hy + 8, hD); dot(6, hy + 8, hO); dot(9, hy + 8, hO); dot(10, hy + 8, hD); dot(11, hy + 8, hM); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hD); dot(5, hy + 9, hO); dot(10, hy + 9, hO); dot(11, hy + 9, hD); dot(12, hy + 9, hO);
        dot(3, hy + 10, hO); dot(4, hy + 10, hO); dot(11, hy + 10, hO); dot(12, hy + 10, hO);
      } else if (hairStyleObj.id === 'swept' || hairStyleObj.id === 'messy') {
        // 2. Franja Lateral: Smooth side-swept fringe inside x=3..12, soft temples without sticking out
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hH); dot(6, hy + 5, hH); dot(7, hy + 5, hM); dot(8, hy + 5, hM); dot(9, hy + 5, hH); dot(10, hy + 5, hM); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hM); dot(5, hy + 6, hH); dot(6, hy + 6, hM); dot(7, hy + 6, hM); dot(8, hy + 6, hM); dot(9, hy + 6, hH); dot(10, hy + 6, hM); dot(11, hy + 6, hD); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hM); dot(5, hy + 7, hD); dot(6, hy + 7, hD); dot(7, hy + 7, hM); dot(8, hy + 7, hM); dot(9, hy + 7, hM); dot(10, hy + 7, hD); dot(11, hy + 7, hM); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hD); dot(5, hy + 8, hO); dot(7, hy + 8, hO); dot(8, hy + 8, hD); dot(9, hy + 8, hD); dot(10, hy + 8, hD); dot(11, hy + 8, hM); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hO); dot(9, hy + 9, hO); dot(10, hy + 9, hO); dot(11, hy + 9, hD); dot(12, hy + 9, hO);
        dot(3, hy + 10, hO); dot(11, hy + 10, hO); dot(12, hy + 10, hO);
      } else if (hairStyleObj.id === 'sleek' || hairStyleObj.id === 'mohawk') {
        // 3. Social Alinhado: Clean combed-back executive cut, hugs x=3..12 with open forehead
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hH); dot(6, hy + 5, hH); dot(7, hy + 5, hM); dot(8, hy + 5, hM); dot(9, hy + 5, hH); dot(10, hy + 5, hD); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hD); dot(5, hy + 6, hM); dot(6, hy + 6, hH); dot(7, hy + 6, hM); dot(8, hy + 6, hD); dot(9, hy + 6, hM); dot(10, hy + 6, hM); dot(11, hy + 6, hD); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hM); dot(5, hy + 7, hD); dot(6, hy + 7, hD); dot(7, hy + 7, hD); dot(8, hy + 7, hD); dot(9, hy + 7, hD); dot(10, hy + 7, hD); dot(11, hy + 7, hM); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hD); hline(5, hy + 8, 6, hO); dot(11, hy + 8, hD); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hO); dot(11, hy + 9, hO); dot(12, hy + 9, hO);
      } else if (hairStyleObj.id === 'crop') {
        // 4. Curto Moderno: Low-profile textured crop with neat straight fringe across row 8
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hM); dot(6, hy + 5, hH); dot(7, hy + 5, hM); dot(8, hy + 5, hH); dot(9, hy + 5, hM); dot(10, hy + 5, hD); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hD); dot(5, hy + 6, hH); dot(6, hy + 6, hM); dot(7, hy + 6, hD); dot(8, hy + 6, hM); dot(9, hy + 6, hH); dot(10, hy + 6, hM); dot(11, hy + 6, hD); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hM); dot(5, hy + 7, hM); dot(6, hy + 7, hD); dot(7, hy + 7, hM); dot(8, hy + 7, hD); dot(9, hy + 7, hM); dot(10, hy + 7, hD); dot(11, hy + 7, hM); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hD); dot(5, hy + 8, hO); dot(6, hy + 8, hD); dot(7, hy + 8, hO); dot(8, hy + 8, hD); dot(9, hy + 8, hO); dot(10, hy + 8, hD); dot(11, hy + 8, hD); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hO); dot(6, hy + 9, hO); dot(8, hy + 9, hO); dot(10, hy + 9, hO); dot(11, hy + 9, hO); dot(12, hy + 9, hO);
      } else if (hairStyleObj.id === 'wavy') {
        // 5. Médio Ondulado: Soft chin-length bob/waves hugging the cheeks & jawline (x=2..13 at jaw)
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hH); dot(6, hy + 5, hH); dot(7, hy + 5, hM); dot(8, hy + 5, hD); dot(9, hy + 5, hH); dot(10, hy + 5, hM); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hM); dot(5, hy + 6, hH); dot(6, hy + 6, hM); dot(7, hy + 6, hD); dot(8, hy + 6, hD); dot(9, hy + 6, hM); dot(10, hy + 6, hH); dot(11, hy + 6, hM); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hH); dot(5, hy + 7, hM); dot(6, hy + 7, hD); dot(7, hy + 7, hO); dot(8, hy + 7, hO); dot(9, hy + 7, hD); dot(10, hy + 7, hM); dot(11, hy + 7, hH); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hM); dot(5, hy + 8, hD); dot(6, hy + 8, hO); dot(9, hy + 8, hO); dot(10, hy + 8, hD); dot(11, hy + 8, hM); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hD); dot(5, hy + 9, hO); dot(10, hy + 9, hO); dot(11, hy + 9, hD); dot(12, hy + 9, hO);
        dot(3, hy + 10, hO); dot(4, hy + 10, hM); dot(11, hy + 10, hM); dot(12, hy + 10, hO);
        // Wavy side locks hugging the ears/jawline (rows 11..15, never wider than x=2..13)
        for (let y = 11; y <= 14; y++) {
          dot(2, hy + y, hO); dot(3, hy + y, y === 12 ? hH : hM); dot(4, hy + y, hO);
          dot(11, hy + y, hO); dot(12, hy + y, y === 12 ? hH : hM); dot(13, hy + y, hO);
        }
        dot(3, hy + 15, hO); dot(4, hy + 15, hO); dot(11, hy + 15, hO); dot(12, hy + 15, hO);
      } else if (hairStyleObj.id === 'long') {
        // 6. Longo Alinhado: Hugs x=3..12 crown, drapes smoothly over shoulders at x=2..4 & 11..13
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hH); dot(6, hy + 5, hH); dot(7, hy + 5, hD); dot(8, hy + 5, hD); dot(9, hy + 5, hH); dot(10, hy + 5, hH); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hM); dot(5, hy + 6, hH); dot(6, hy + 6, hM); dot(7, hy + 6, hD); dot(8, hy + 6, hD); dot(9, hy + 6, hM); dot(10, hy + 6, hH); dot(11, hy + 6, hM); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hH); dot(5, hy + 7, hM); dot(6, hy + 7, hD); dot(7, hy + 7, hO); dot(8, hy + 7, hO); dot(9, hy + 7, hD); dot(10, hy + 7, hM); dot(11, hy + 7, hH); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hM); dot(5, hy + 8, hO); dot(10, hy + 8, hO); dot(11, hy + 8, hM); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hD); dot(11, hy + 9, hD); dot(12, hy + 9, hO);
        dot(3, hy + 10, hO); dot(4, hy + 10, hM); dot(11, hy + 10, hM); dot(12, hy + 10, hO);
        // Smooth shoulder-hugging locks (x=2..4 and x=11..13, rows 11..17)
        for (let y = 11; y <= 17; y++) {
          dot(2, hy + y, hO);
          dot(3, hy + y, (y >= 11 && y <= 13) ? hH : hM);
          dot(4, hy + y, y <= 14 ? hO : hD);
          dot(11, hy + y, y <= 14 ? hO : hD);
          dot(12, hy + y, (y >= 11 && y <= 13) ? hH : hM);
          dot(13, hy + y, hO);
        }
        dot(3, hy + 18, hO); dot(4, hy + 18, hO);
        dot(11, hy + 18, hO); dot(12, hy + 18, hO);
      } else if (hairStyleObj.id === 'ponytail') {
        // 7. Rabo de Cavalo: Snug crown with curtain bangs + neat ponytail tail resting over right shoulder
        hline(5, hy + 4, 6, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hH); dot(6, hy + 5, hM); dot(7, hy + 5, hM); dot(8, hy + 5, hM); dot(9, hy + 5, hH); dot(10, hy + 5, hM); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hM); dot(5, hy + 6, hH); dot(6, hy + 6, hM); dot(7, hy + 6, hD); dot(8, hy + 6, hD); dot(9, hy + 6, hM); dot(10, hy + 6, hH); dot(11, hy + 6, hM); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hM); dot(5, hy + 7, hD); dot(6, hy + 7, hO); dot(9, hy + 7, hO); dot(10, hy + 7, hD); dot(11, hy + 7, hM); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hD); dot(5, hy + 8, hO); dot(10, hy + 8, hO); dot(11, hy + 8, hD); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hO); dot(11, hy + 9, hO); dot(12, hy + 9, hO);
        // Ponytail tip draped neatly on one shoulder (rows 13..16, x=11..13)
        dot(12, hy + 13, hD); dot(13, hy + 13, hO);
        dot(11, hy + 14, hO); dot(12, hy + 14, hH); dot(13, hy + 14, hO);
        dot(11, hy + 15, hO); dot(12, hy + 15, hM); dot(13, hy + 15, hO);
        dot(11, hy + 16, hO); dot(12, hy + 16, hO);
      } else if (hairStyleObj.id === 'topbun') {
        // 8. Coque Samurai: Compact knot seated right on the crown (rows 2..4) + snug aligned hairline
        hline(6, hy + 2, 4, hO);
        dot(5, hy + 3, hO); dot(6, hy + 3, hM); dot(7, hy + 3, hH); dot(8, hy + 3, hM); dot(9, hy + 3, hD); dot(10, hy + 3, hO);
        dot(4, hy + 4, hO); dot(5, hy + 4, hO); hline(6, hy + 4, 4, hD); dot(10, hy + 4, hO); dot(11, hy + 4, hO);
        dot(4, hy + 5, hO); dot(5, hy + 5, hH); dot(6, hy + 5, hM); dot(7, hy + 5, hM); dot(8, hy + 5, hM); dot(9, hy + 5, hH); dot(10, hy + 5, hM); dot(11, hy + 5, hO);
        dot(3, hy + 6, hO); dot(4, hy + 6, hM); dot(5, hy + 6, hH); dot(6, hy + 6, hD); dot(7, hy + 6, hD); dot(8, hy + 6, hD); dot(9, hy + 6, hM); dot(10, hy + 6, hH); dot(11, hy + 6, hM); dot(12, hy + 6, hO);
        dot(3, hy + 7, hO); dot(4, hy + 7, hM); dot(5, hy + 7, hD); dot(6, hy + 7, hO); dot(9, hy + 7, hO); dot(10, hy + 7, hD); dot(11, hy + 7, hM); dot(12, hy + 7, hO);
        dot(3, hy + 8, hO); dot(4, hy + 8, hD); dot(5, hy + 8, hO); dot(10, hy + 8, hO); dot(11, hy + 8, hD); dot(12, hy + 8, hO);
        dot(3, hy + 9, hO); dot(4, hy + 9, hO); dot(11, hy + 9, hO); dot(12, hy + 9, hO);
      }

      // ── ACCESSORIES (FRONT, scaled for 16x32 head) ──
      if (accObj.id === 'glasses') {
        hline(3, hy + 11, 10, '#141622');
        rect(4, hy + 12, 3, 2, '#7ce8ff');
        rect(9, hy + 12, 3, 2, '#7ce8ff');
        dot(4, hy + 12, '#ffffff');
        dot(9, hy + 12, '#ffffff');
        hline(4, hy + 14, 3, '#141622');
        hline(9, hy + 14, 3, '#141622');
        dot(3, hy + 12, '#141622'); dot(7, hy + 12, '#141622'); dot(8, hy + 12, '#141622'); dot(12, hy + 12, '#141622');
      } else if (accObj.id === 'visor') {
        rect(3, hy + 11, 10, 3, '#0b1c2c');
        hline(4, hy + 12, 8, '#00ff41');
        hline(5, hy + 12, 3, '#b8ffcb');
        hline(4, hy + 13, 8, '#00b894');
      } else if (accObj.id === 'headset') {
        hline(4, hy + 4, 8, '#222638');
        rect(1, hy + 10, 2, 4, '#222638');
        rect(13, hy + 10, 2, 4, '#222638');
        dot(1, hy + 11, '#00f0ff'); dot(1, hy + 12, '#00f0ff');
        dot(14, hy + 11, '#00f0ff'); dot(14, hy + 12, '#00f0ff');
      } else if (accObj.id === 'cap') {
        if (isFemale) {
          rect(10, hy + 6, 3, 3, '#ff4da6');
          dot(11, hy + 7, '#fff275');
        } else {
          hline(4, hy + 4, 8, '#141829');
          rect(3, hy + 5, 10, 3, '#1f2842');
          hline(3, hy + 8, 11, '#00f0ff');
        }
      }
    } else {
      // ── FACING UP (SNUGLY ALIGNED BACK OF HEAD & HAIR, x=3..12) ──
      if (hairStyleObj.id === 'topbun') {
        hline(6, hy + 2, 4, hO);
        dot(5, hy + 3, hO); dot(6, hy + 3, hM); dot(7, hy + 3, hH); dot(8, hy + 3, hM); dot(9, hy + 3, hD); dot(10, hy + 3, hO);
        dot(5, hy + 4, hO); hline(6, hy + 4, 4, hD); dot(10, hy + 4, hO);
      }
      const backBottom = hairStyleObj.id === 'long' ? 18 : (hairStyleObj.id === 'wavy' ? 15 : 13);
      hline(5, hy + 4, 6, hO);
      dot(4, hy + 5, hO); hline(5, hy + 5, 6, hM); dot(6, hy + 5, hH); dot(9, hy + 5, hH); dot(11, hy + 5, hO);
      for (let y = 6; y <= backBottom; y++) {
        dot(3, hy + y, hO);
        dot(4, hy + y, hD);
        for (let x = 5; x <= 10; x++) {
          const isHighlight = (y >= 6 && y <= 9) && (x === 6 || x === 9);
          dot(x, hy + y, isHighlight ? hH : (y >= backBottom - 1 ? hD : hM));
        }
        dot(11, hy + y, hD);
        dot(12, hy + y, hO);
      }
      hline(4, hy + backBottom + 1, 8, hO);
      if (hairStyleObj.id === 'ponytail') {
        // Centered ponytail tied at back of head (rows 10..16, x=6..9)
        hline(6, hy + 10, 4, '#e0a938'); // Hair tie
        for (let y = 11; y <= 15; y++) {
          dot(5, hy + y, hO); dot(6, hy + y, hM); dot(7, hy + y, hH); dot(8, hy + y, hM); dot(9, hy + y, hD); dot(10, hy + y, hO);
        }
        hline(6, hy + 16, 4, hO);
      }
      if (hairStyleObj.id !== 'long' && hairStyleObj.id !== 'wavy') {
        hline(6, hy + 15, 4, sD);
      }
    }
  } else {
    // ── SIDE PROFILE (LEFT or RIGHT) WITH MALE & FEMALE STARDEW FARMER BODY MODELS ──
    const isRight = dir === 'right';
    const hy = gOff;
    const stride = isMoving ? (wf === 1 ? 2 : (wf === 3 ? -2 : 0)) : 0;
    const armSwing = isMoving ? (wf === 1 ? -1 : (wf === 3 ? 1 : 0)) : 0;
    const mx = (x) => isRight ? x : (15 - x);
    const sdot = (x, y, c) => dot(mx(x), y, c);

    if (!isFemale) {
      // ── MALE SIDE LOWER BODY & BOOTS ──
      // Back Leg & Boot
      for (let y = 24; y <= 28; y++) {
        sdot(6 - stride, y, pO);
        sdot(7 - stride, y, pD);
        sdot(8 - stride, y, pO);
      }
      sdot(6 - stride, 29, bO); sdot(7 - stride, 29, bD); sdot(8 - stride, 29, bO);
      sdot(6 - stride, 30, bO); sdot(7 - stride, 30, bM); sdot(8 - stride, 30, bD);
      sdot(6 - stride, 31, bO); sdot(7 - stride, 31, bD); sdot(8 - stride, 31, bD); sdot(9 - stride, 31, bO);

      // Front Leg & Boot
      for (let y = 24; y <= 28; y++) {
        sdot(6 + stride, y, pO);
        sdot(7 + stride, y, y === 24 ? pH : pM);
        sdot(8 + stride, y, pD);
        sdot(9 + stride, y, pO);
      }
      sdot(6 + stride, 29, bO); sdot(7 + stride, 29, bH); sdot(8 + stride, 29, bM); sdot(9 + stride, 29, bO);
      sdot(6 + stride, 30, bO); sdot(7 + stride, 30, bM); sdot(8 + stride, 30, bM); sdot(9 + stride, 30, bH); sdot(10 + stride, 30, bO);
      sdot(6 + stride, 31, bO); sdot(7 + stride, 31, bD); sdot(8 + stride, 31, bD); sdot(9 + stride, 31, bD); sdot(10 + stride, 31, bO);

      // Male Side Belt (row 23)
      sdot(5, 23, pO); sdot(6, 23, '#3b2014'); sdot(7, 23, '#3b2014'); sdot(8, 23, '#3b2014'); sdot(9, 23, '#e0a938'); sdot(10, 23, pO);

      // Male Side Torso (rows 16..22)
      for (let r = 0; r <= 6; r++) {
        const y = 16 + r;
        sdot(4, y, tO);
        sdot(5, y, tD);
        sdot(6, y, tM);
        sdot(7, y, r <= 2 ? tH : tM);
        sdot(8, y, tM);
        sdot(9, y, r >= 1 ? iM : tD);
        sdot(10, y, tO);
      }
    } else {
      // ── FEMALE SIDE LOWER BODY: Flared hip silhouette (rows 23..26) & dainty boots ──
      // Back Leg & Dainty Boot (rows 27..31)
      const fStride = isMoving ? (wf === 1 ? 1 : (wf === 3 ? -1 : 0)) : 0;
      for (let y = 27; y <= 28; y++) {
        sdot(6 - fStride, y, pO); sdot(7 - fStride, y, sS); sdot(8 - fStride, y, pO);
      }
      sdot(6 - fStride, 29, bO); sdot(7 - fStride, 29, bD); sdot(8 - fStride, 29, bO);
      sdot(6 - fStride, 30, bO); sdot(7 - fStride, 30, bM); sdot(8 - fStride, 30, bO);
      sdot(6 - fStride, 31, bO); sdot(7 - fStride, 31, bD); sdot(8 - fStride, 31, bO);

      // Front Leg & Dainty Boot (rows 27..31)
      for (let y = 27; y <= 28; y++) {
        sdot(7 + fStride, y, pO); sdot(8 + fStride, y, sM); sdot(9 + fStride, y, pO);
      }
      sdot(7 + fStride, 29, bO); sdot(8 + fStride, 29, bH); sdot(9 + fStride, 29, bO);
      sdot(7 + fStride, 30, bO); sdot(8 + fStride, 30, bM); sdot(9 + fStride, 30, bH); sdot(10 + fStride, 30, bO);
      sdot(7 + fStride, 31, bO); sdot(8 + fStride, 31, bD); sdot(9 + fStride, 31, bD); sdot(10 + fStride, 31, bO);

      // Flared Feminine Hip Profile (rows 23..26, matching Female Farmer side view)
      sdot(5, 22, tO); sdot(6, 22, '#452216'); sdot(7, 22, '#452216'); sdot(8, 22, '#f5c242'); sdot(9, 22, tO);
      sdot(4, 23, pO); sdot(5, 23, pD); sdot(6, 23, pM); sdot(7, 23, pH); sdot(8, 23, pM); sdot(9, 23, pD); sdot(10, 23, pO);
      sdot(3, 24, pO); sdot(4, 24, pD); sdot(5, 24, pM); sdot(6, 24, pH); sdot(7, 24, pH); sdot(8, 24, pM); sdot(9, 24, pM); sdot(10, 24, pD); sdot(11, 24, pO);
      sdot(3, 25, pO); sdot(4, 25, pD); sdot(5, 25, pD); sdot(6, 25, pM); sdot(7, 25, pM); sdot(8, 25, pD); sdot(9, 25, pD); sdot(10, 25, pD); sdot(11, 25, pO);
      for (let x = 4; x <= 10; x++) sdot(x, 26, pO);

      // Female Slimmer Side Torso (rows 17..21)
      for (let r = 0; r <= 4; r++) {
        const y = 17 + r;
        sdot(5, y, tO);
        sdot(6, y, tD);
        sdot(7, y, r <= 2 ? tH : tM);
        sdot(8, y, tM);
        sdot(9, y, r === 1 || r === 2 ? tH : tD); // Feminine bust contour
        if (r === 1 || r === 2) sdot(10, y, tO);
        else sdot(9, y, tO);
      }
    }

    // ── SIDE FACE, HEAD & BLINKING SIDE EYE (rows hy+8 .. hy+15) ──
    for (let y = 8; y <= 14; y++) {
      sdot(4, hy + y, sO);
      for (let x = 5; x <= 10; x++) {
        sdot(x, hy + y, x >= 9 ? sL : (x <= 6 ? sS : sM));
      }
      sdot(11, hy + y, (y === 12 || y === 13) ? sM : sO);
      if (y === 12 || y === 13) sdot(12, hy + y, sO); // Crisp Stardew side nose tip
    }
    for (let x = 5; x <= 10; x++) sdot(x, hy + 15, sO);

    // Side Eye (2x2) with Idle Blink
    sdot(9, hy + 11, isBlinking ? sS : hO); sdot(10, hy + 11, isBlinking ? sM : hD);
    if (isBlinking) {
      sdot(9, hy + 12, sM); sdot(10, hy + 12, sL);
      sdot(9, hy + 13, sO); sdot(10, hy + 13, hO);
    } else {
      sdot(9, hy + 12, eW); sdot(10, hy + 12, eI);
      sdot(9, hy + 13, eC); sdot(10, hy + 13, eD);
    }

    // ── SNUGLY ALIGNED SIDE HAIR (hugs x=4..11 cranium) ──
    if (hairStyleObj.id === 'topbun') {
      for (let x = 4; x <= 7; x++) sdot(x, hy + 2, hO);
      sdot(3, hy + 3, hO); sdot(4, hy + 3, hD); sdot(5, hy + 3, hH); sdot(6, hy + 3, hM); sdot(7, hy + 3, hO);
      sdot(4, hy + 4, hO); sdot(5, hy + 4, hD); sdot(6, hy + 4, hD);
    }
    const sideLen = hairStyleObj.id === 'long' ? 17 : (hairStyleObj.id === 'wavy' ? 15 : 13);
    for (let x = 5; x <= 10; x++) sdot(x, hy + 4, hO);
    for (let y = 5; y <= 8; y++) {
      sdot(4, hy + y, hO);
      const maxFrontX = (y === 5) ? 10 : (hairStyleObj.id === 'sleek' || hairStyleObj.id === 'topbun' ? 10 : 11);
      for (let x = 5; x <= maxFrontX; x++) {
        sdot(x, hy + y, (x === 6 || x === 9) ? hH : (x <= 5 ? hD : hM));
      }
      sdot(maxFrontX + 1, hy + y, y <= 7 ? hO : null);
    }
    for (let y = 9; y <= sideLen; y++) {
      sdot(3, hy + y, hO);
      sdot(4, hy + y, hD);
      sdot(5, hy + y, (y >= 9 && y <= 11) ? hH : hM);
      sdot(6, hy + y, hD);
      sdot(7, hy + y, hO);
    }
    for (let x = 4; x <= 6; x++) sdot(x, hy + sideLen + 1, hO);

    if (hairStyleObj.id === 'ponytail') {
      // Arched ponytail extending from the back of the head in profile (x=1..3, rows 9..15)
      sdot(2, hy + 9, hO); sdot(3, hy + 9, '#e0a938');
      sdot(1, hy + 10, hO); sdot(2, hy + 10, hH); sdot(3, hy + 10, hM);
      sdot(1, hy + 11, hO); sdot(2, hy + 11, hM); sdot(3, hy + 11, hD);
      sdot(1, hy + 12, hO); sdot(2, hy + 12, hM); sdot(3, hy + 12, hO);
      sdot(1, hy + 13, hO); sdot(2, hy + 13, hD); sdot(3, hy + 13, hO);
      sdot(2, hy + 14, hO);
    }

    // Side Accessories
    if (accObj.id === 'visor') {
      for (let x = 7; x <= 12; x++) {
        sdot(x, hy + 11, '#0b1c2c');
        sdot(x, hy + 12, '#00ff41');
        sdot(x, hy + 13, '#00b894');
      }
    } else if (accObj.id === 'glasses') {
      for (let x = 6; x <= 11; x++) sdot(x, hy + 11, '#141622');
      sdot(9, hy + 12, '#7ce8ff'); sdot(10, hy + 12, '#7ce8ff');
    } else if (accObj.id === 'headset') {
      for (let y = 5; y <= 13; y++) {
        sdot(6, hy + y, '#222638');
        sdot(7, hy + y, y >= 10 ? '#00f0ff' : '#222638');
      }
    }

    // Side Arm & Hand (resting straight when idle, swinging smoothly when walking)
    const ay = (isFemale ? 18 : 17) + armSwing;
    const armLen = isFemale ? 2 : 3;
    for (let r = 0; r <= armLen; r++) {
      sdot(6, ay + r, tO);
      sdot(7, ay + r, r === 0 ? tH : tM);
      sdot(8, ay + r, tO);
    }
    sdot(6, ay + armLen + 1, sO); sdot(7, ay + armLen + 1, sL); sdot(8, ay + armLen + 1, sO);
    sdot(6, ay + armLen + 2, sO); sdot(7, ay + armLen + 2, sS); sdot(8, ay + armLen + 2, sO);
  }
}
// ─── Pixel Wipe Transition System ───
class PixelWipeTransition {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pixelSize = 20; // 20px pixel block gives authentic retro aesthetic
    this.isAnimating = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cols = Math.ceil(this.canvas.width / this.pixelSize);
    this.rows = Math.ceil(this.canvas.height / this.pixelSize);
    this.generateGrid();
  }

  generateGrid() {
    this.cells = [];
    const maxDist = this.cols + this.rows;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        // Diagonal progression [0, 1]
        const diag = (c + r) / maxDist;
        // Deterministic organic jitter [0, 1]
        const jitter = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
        // Combine wave with pixel dither
        const order = diag * 0.75 + jitter * 0.25;
        this.cells.push({ c, r, order });
      }
    }
    // Pre-sort cells chronologically
    this.cells.sort((a, b) => a.order - b.order);
  }

  // Wipe IN: fills screen with pixel blocks (covers screen)
  wipeIn(color = '#05060a', duration = 450) {
    return new Promise(resolve => {
      if (this.isAnimating) { resolve(); return; }
      this.isAnimating = true;

      // Trigger 8-bit transition wipe sound
      if (typeof game !== 'undefined' && game.audio) {
        game.audio.transitionWipeIn();
      }

      this.canvas.classList.add('active');
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const totalCells = this.cells.length;
      let drawnIndex = 0;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease-out
        const eased = 1 - Math.pow(1 - progress, 2);
        const targetIndex = Math.floor(eased * totalCells);

        this.ctx.fillStyle = color;
        while (drawnIndex < targetIndex && drawnIndex < totalCells) {
          const cell = this.cells[drawnIndex];
          this.ctx.fillRect(
            cell.c * this.pixelSize,
            cell.r * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          );
          drawnIndex++;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Fill entirely to ensure 100% solid coverage
          this.ctx.fillStyle = color;
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          this.isAnimating = false;
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  // Wipe OUT: removes pixel blocks (reveals screen underneath)
  wipeOut(duration = 450) {
    return new Promise(resolve => {
      if (this.isAnimating) { resolve(); return; }
      this.isAnimating = true;

      // Trigger 16-bit transition reveal sound
      if (typeof game !== 'undefined' && game.audio) {
        game.audio.transitionWipeOut();
      }

      const totalCells = this.cells.length;
      let clearedIndex = 0;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease-in-out
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        const targetIndex = Math.floor(eased * totalCells);

        while (clearedIndex < targetIndex && clearedIndex < totalCells) {
          const cell = this.cells[clearedIndex];
          this.ctx.clearRect(
            cell.c * this.pixelSize,
            cell.r * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          );
          clearedIndex++;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.canvas.classList.remove('active');
          this.isAnimating = false;
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }
}

// ─── Loading Screen System ───
class LoadingScreenSystem {
  constructor() {
    this.screen = document.getElementById('loading-screen');
    this.barFill = document.getElementById('loading-bar-fill');
    this.barLabel = document.getElementById('loading-bar-label');
    this.tipText = document.getElementById('loading-tip-text');
    this.tipInterval = null;
    this.progressInterval = null;

    this.tips = [
      'Base64 usa os caracteres A-Z, a-z, 0-9, + e / para codificar dados em blocos de 6 bits.',
      'A cifra de César desloca cada letra um número fixo de posições no alfabeto.',
      'MD5 sempre gera uma sequência hexadecimal de 32 caracteres. Hoje é vulnerável a colisões.',
      'ROT13 é simétrico: aplicar ROT13 duas vezes restaura exatamente o texto original!',
      'Hexadecimal usa base 16 (0-9 e A-F). Cada par de dígitos hex representa 1 byte (0 a 255).',
      'John the Ripper é um dos crackers de senha em linha de comando mais lendários da história.',
      'Usar dicas auxilia na quebra do código, mas deduz pontos valiosos do seu score final.',
      'O caractere "=" no final de uma mensagem codificada é um preenchimento (padding) do Base64.',
      'A tabela ASCII mapeia caracteres em números: "A" equivale a 65 em decimal (0x41 em hex).',
      'Ataques de força bruta e dicionário são muito mais rápidos quando as senhas são fracas.',
      'Pressione [ESC] durante a masmorra a qualquer momento para pausar a fuga.',
      'Senhas fortes combinam maiúsculas, minúsculas, números e símbolos sem padrões previsíveis.',
    ];

    this.tipIndex = 0;
  }

  prepare() {
    this.screen.classList.add('active');
    this.barFill.style.width = '0%';
    this.barLabel.textContent = 'INICIALIZANDO SISTEMA...';
    this.tipIndex = Math.floor(Math.random() * this.tips.length);
    this.tipText.textContent = this.tips[this.tipIndex];
    this.tipText.classList.remove('fading-out', 'fading-in');
  }

  async changeTip() {
    this.tipText.classList.add('fading-out');
    await sleep(220);
    this.tipIndex = (this.tipIndex + 1) % this.tips.length;
    this.tipText.textContent = this.tips[this.tipIndex];
    this.tipText.classList.remove('fading-out');
    this.tipText.classList.add('fading-in');
    if (game.audio && game.audio.enabled) {
      game.audio.playTone(840, 0.02, 'square', 0.02);
    }
    setTimeout(() => {
      this.tipText.classList.remove('fading-in');
    }, 250);
  }

  run(durationMs = 2600) {
    return new Promise(resolve => {
      if (this.tipInterval) clearInterval(this.tipInterval);
      if (this.progressInterval) clearInterval(this.progressInterval);

      // Cycle tips smoothly every 1200ms
      this.tipInterval = setInterval(() => {
        this.changeTip();
      }, 1200);

      // Stepped progress simulation with retro status messages
      let progress = 0;
      const stepInterval = Math.max(25, Math.floor(durationMs / 32));

      const statusStages = [
        { at: 0, text: 'CARREGANDO DADOS DA CELA...' },
        { at: 25, text: 'COMPILANDO CIFRAS...' },
        { at: 50, text: 'GERANDO HASHES DE SEGURANÇA...' },
        { at: 75, text: 'INICIALIZANDO TERMINAL...' },
        { at: 95, text: 'ACESSO AUTORIZADO!' },
      ];

      this.progressInterval = setInterval(() => {
        progress += 3 + Math.random() * 5;
        if (progress >= 100) {
          progress = 100;
          this.barFill.style.width = '100%';
          this.barLabel.textContent = 'PRONTO!';
          if (typeof game !== 'undefined' && game.audio) {
            game.audio.loadingComplete();
          }
          clearInterval(this.progressInterval);
        } else {
          this.barFill.style.width = `${progress}%`;
          const stage = statusStages.filter(s => progress >= s.at).pop();
          if (stage) this.barLabel.textContent = stage.text;
        }
      }, stepInterval);

      setTimeout(() => {
        if (this.tipInterval) clearInterval(this.tipInterval);
        if (this.progressInterval) clearInterval(this.progressInterval);
        this.barFill.style.width = '100%';
        this.barLabel.textContent = 'PRONTO!';
        resolve();
      }, durationMs);
    });
  }

  hide() {
    if (this.tipInterval) clearInterval(this.tipInterval);
    if (this.progressInterval) clearInterval(this.progressInterval);
    this.screen.classList.remove('active');
  }
}

// Transition instances (initialized later in init())
let pixelWipe = null;
let loadingScreen = null;

// ─── Screen Management ───
function showScreenDirect(screenName) {
  Object.values(dom.screens).forEach(s => s.classList.remove('active'));
  if (dom.screens[screenName]) {
    dom.screens[screenName].classList.add('active');
  }
}

async function showScreenWithTransition(screenName, options = {}) {
  const {
    showLoading = true,
    loadingDuration = 2600,
    wipeDuration = 450,
    wipeColor = '#05060a',
    onScreenSwitch = null
  } = options;

  if (!pixelWipe || !loadingScreen) {
    if (onScreenSwitch) onScreenSwitch();
    showScreenDirect(screenName);
    return;
  }

  if (showLoading) {
    // 1. Wipe in to cover current screen
    await pixelWipe.wipeIn(wipeColor, wipeDuration);

    // 2. Prepare loading screen and wipe out to reveal it
    loadingScreen.prepare();
    await pixelWipe.wipeOut(wipeDuration);

    // 3. Animate loading screen (progress bar + cycling tips)
    await loadingScreen.run(loadingDuration);

    // 4. Wipe in to cover loading screen
    await pixelWipe.wipeIn(wipeColor, wipeDuration);

    // 5. Hide loading screen and switch target screen underneath
    loadingScreen.hide();
    if (onScreenSwitch) onScreenSwitch();
    showScreenDirect(screenName);

    // 6. Wipe out to reveal destination screen
    await pixelWipe.wipeOut(wipeDuration);
  } else {
    // Fast wipe transition without loading screen
    await pixelWipe.wipeIn(wipeColor, wipeDuration);
    if (onScreenSwitch) onScreenSwitch();
    showScreenDirect(screenName);
    await pixelWipe.wipeOut(wipeDuration);
  }
}

function showScreen(screenName) {
  showScreenDirect(screenName);
}

function showOverlay(overlayName) {
  dom.overlays[overlayName]?.classList.add('active');
}

function hideOverlay(overlayName) {
  dom.overlays[overlayName]?.classList.remove('active');
}

// ─── HUD Update & Auto-Save Toast ───
let saveToastTimer = null;

function showSaveToast(text = `SALVO NO SLOT 0${game.currentSlot}`) {
  const toast = document.getElementById('save-toast');
  const toastText = document.getElementById('save-toast-text');
  if (!toast || !toastText) return;
  toastText.textContent = text;
  toast.classList.add('active');
  if (saveToastTimer) clearTimeout(saveToastTimer);
  saveToastTimer = setTimeout(() => {
    toast.classList.remove('active');
  }, 1800);
}

function autoSaveCurrentSlot(extra = {}, showToast = true) {
  if (!game.currentSlot) return;
  saveDB.saveProgress(game.currentSlot, {
    character: game.character || defaultCharacter(),
    currentPhase: game.currentPhase,
    score: game.score,
    totalHintsUsed: game.totalHintsUsed,
    phaseHintsUsed: game.phaseHintsUsed,
    doorUnlocked: game.doorUnlocked,
    storySeen: true,
    ...extra
  });
  if (showToast) {
    showSaveToast(`SALVO · SLOT 0${game.currentSlot}`);
  }
}

function formatSaveDate(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month} às ${hours}:${mins}`;
  } catch (e) {
    return '';
  }
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

function renderSaveSlots() {
  const grid = document.getElementById('save-slots-grid');
  if (!grid) return;

  const slots = saveDB.getAllSlots();
  grid.innerHTML = slots.map(slot => {
    const slotNumStr = String(slot.slotId).padStart(2, '0');

    if (slot.empty) {
      return `
        <div class="save-slot-card is-empty" data-slot="${slot.slotId}">
          <div class="save-slot-top">
            <span class="save-slot-id">
              <svg class="pixel-icon"><use href="#px-credits"></use></svg>
              SLOT ${slotNumStr}
            </span>
            <span class="save-slot-badge badge-empty">NOVO</span>
          </div>

          <div class="save-slot-monitor">
            <div class="save-monitor-empty">
              <div class="save-empty-icon-box">
                <svg class="pixel-icon"><use href="#px-plus"></use></svg>
              </div>
              <div class="save-empty-title">NOVO</div>
              <p class="save-empty-desc">Slot vazio.<br>Clique para criar um novo save.</p>
            </div>
          </div>

          <div class="save-slot-actions">
            <button class="save-action-btn btn-new" data-action="new" data-slot="${slot.slotId}">
              <svg class="pixel-icon"><use href="#px-play"></use></svg>
              <span>INICIAR NOVO SAVE</span>
            </button>
          </div>
        </div>
      `;
    }

    const phaseIdx = Math.min(Math.max(slot.currentPhase || 0, 0), PHASES.length - 1);
    const phaseObj = PHASES[phaseIdx];
    const isCompleted = Boolean(slot.completed);
    const charCfg = { ...defaultCharacter(), ...(slot.character || {}) };
    const charName = escapeHtml(charCfg.name || 'Hacker');
    const genderLabel = charCfg.gender === 'female' ? '♀ Feminino' : '♂ Masculino';

    // Calculate progress percentage
    let progressPct = Math.round((phaseIdx / PHASES.length) * 100);
    if (slot.doorUnlocked) {
      progressPct = Math.round(((phaseIdx + 1) / PHASES.length) * 100);
    }
    if (isCompleted) {
      progressPct = 100;
    }

    const statusBadge = isCompleted
      ? `<span class="save-slot-badge badge-completed">CONCLUÍDO ★</span>`
      : `<span class="save-slot-badge badge-active">EM JOGO</span>`;

    const phaseLabel = isCompleted
      ? `5/5 · MASMORRA COMPLETA`
      : `FASE ${phaseObj.id}/5 · ${phaseObj.subtitle}`;

    const phaseTitle = isCompleted
      ? `Liberdade Conquistada!`
      : phaseObj.title;

    return `
      <div class="save-slot-card is-saved ${isCompleted ? 'is-completed' : ''}" data-slot="${slot.slotId}">
        <div class="save-slot-top">
          <span class="save-slot-id">
            <svg class="pixel-icon"><use href="#px-credits"></use></svg>
            SLOT ${slotNumStr}
          </span>
          ${statusBadge}
        </div>

        <div class="save-slot-monitor">
          <div class="save-monitor-data">
            <div class="save-char-row">
              <canvas class="save-char-avatar" width="20" height="34" data-slot-avatar="${slot.slotId}"></canvas>
              <div class="save-char-meta">
                <span class="save-char-name">${charName}</span>
                <span class="save-char-sub">${genderLabel} · ${phaseLabel}</span>
              </div>
            </div>

            <div class="save-data-phase">
              <span class="save-data-phase-title">${phaseTitle}</span>
            </div>

            <div class="save-progress-wrap">
              <div class="save-progress-top">
                <span>PROGRESSO</span>
                <span>${progressPct}%</span>
              </div>
              <div class="save-progress-bar">
                <div class="save-progress-fill" style="width: ${progressPct}%;"></div>
              </div>
            </div>

            <div class="save-data-stats">
              <div class="save-stat-col">
                <span class="save-stat-lbl">SCORE</span>
                <span class="save-stat-val">${slot.score || 0}</span>
              </div>
              <div class="save-stat-col">
                <span class="save-stat-lbl">DICAS</span>
                <span class="save-stat-val">${slot.totalHintsUsed || 0}</span>
              </div>
              <div class="save-data-timestamp">
                ${formatSaveDate(slot.updatedAt)}
              </div>
            </div>
          </div>
        </div>

        <div class="save-slot-actions">
          <button class="save-action-btn btn-continue" data-action="continue" data-slot="${slot.slotId}">
            <svg class="pixel-icon"><use href="#px-play"></use></svg>
            <span>${isCompleted ? 'JOGAR NOVAMENTE' : 'CONTINUAR SAVE'}</span>
          </button>
          <button class="save-delete-btn" data-action="delete" data-slot="${slot.slotId}" title="Apagar Save do Slot ${slotNumStr}">
            <svg class="pixel-icon"><use href="#px-trash"></use></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Render mini pixel-art character portrait on each occupied slot card
  grid.querySelectorAll('canvas[data-slot-avatar]').forEach(canvas => {
    const slotId = parseInt(canvas.dataset.slotAvatar, 10);
    const slotData = saveDB.getSlot(slotId);
    const ctx = canvas.getContext('2d');
    if (ctx && slotData && !slotData.empty) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCustomCharacter(ctx, 2, 1, slotData.character || defaultCharacter(), 'down', 0, false, false);
    }
  });

  // Bind click events on cards and buttons
  grid.querySelectorAll('.save-slot-card').forEach(card => {
    const slotId = parseInt(card.dataset.slot, 10);
    card.addEventListener('click', (e) => {
      // Ignore if clicked delete button
      if (e.target.closest('[data-action="delete"]')) return;
      const slotData = saveDB.getSlot(slotId);
      if (slotData.empty) {
        startNewSaveSlot(slotId);
      } else {
        continueSaveSlot(slotId);
      }
    });
  });

  grid.querySelectorAll('[data-action="delete"]').forEach(delBtn => {
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const slotId = parseInt(delBtn.dataset.slot, 10);
      promptDeleteSaveSlot(slotId);
    });
  });
}

let pendingDeleteSlotId = null;

function promptDeleteSaveSlot(slotId) {
  pendingDeleteSlotId = slotId;
  game.audio.playTone(300, 0.08, 'sawtooth', 0.05);
  const modal = document.getElementById('delete-save-modal');
  const textEl = document.getElementById('delete-modal-text');
  if (textEl) {
    textEl.innerHTML = `Tem certeza que deseja apagar o save do <strong>SLOT 0${slotId}</strong>? Todo o progresso deste slot será perdido.`;
  }
  if (modal) modal.classList.add('active');
}

// ─── Character Creation System ───
const charCreator = {
  draft: defaultCharacter(),
  dirIndex: 0, // 0: down, 1: right, 2: up, 3: left
  dirs: ['down', 'right', 'up', 'left'],
  walking: false,
  walkFrame: 0,
  tick: 0,
  animId: null
};

function updateCharCreatorUI() {
  const d = charCreator.draft;
  const slotBadge = document.getElementById('char-create-slot-text');
  if (slotBadge) {
    slotBadge.textContent = `NOVO SAVE · SLOT 0${game.currentSlot}`;
  }

  // Gender tag & buttons
  const isFem = d.gender === 'female';
  const genderTag = document.getElementById('char-gender-tag');
  if (genderTag) {
    genderTag.textContent = isFem ? 'FEMININO (♀)' : 'MASCULINO (♂)';
    genderTag.style.borderColor = isFem ? 'rgba(255, 107, 214, 0.55)' : 'rgba(0, 240, 255, 0.45)';
    genderTag.style.color = isFem ? '#ff6bd6' : 'var(--neon-cyan)';
  }
  const maleBtn = document.getElementById('gender-male-btn');
  const femBtn = document.getElementById('gender-female-btn');
  if (maleBtn) maleBtn.classList.toggle('active', !isFem);
  if (femBtn) femBtn.classList.toggle('active', isFem);

  // Stepper labels
  const categories = ['skin', 'hairStyle', 'hairColor', 'top', 'pants', 'shoes', 'accessory'];
  categories.forEach(cat => {
    const list = CHARACTER_CATALOG[cat];
    const idx = ((d[cat] || 0) % list.length + list.length) % list.length;
    const item = list[idx];
    const el = document.getElementById(`val-${cat}`);
    if (el && item) {
      el.textContent = `${idx + 1}/${list.length} · ${item.name}`;
    }
  });

  const walkBtn = document.getElementById('char-walk-toggle');
  if (walkBtn) {
    walkBtn.classList.toggle('active', charCreator.walking);
    walkBtn.textContent = charCreator.walking ? '🚶 ANDANDO' : '🧍 PARADO';
  }
}

function startCharPreviewLoop() {
  stopCharPreviewLoop();
  const canvas = document.getElementById('char-preview-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const loop = () => {
    charCreator.tick++;
    if (charCreator.tick % 12 === 0) {
      charCreator.walkFrame = (charCreator.walkFrame + 1) % 4;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle floor grid inside stage canvas
    ctx.fillStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.fillRect(8, 42, 32, 6);

    const isMoving = charCreator.walking;
    const wf = charCreator.walkFrame;
    const bounceY = isMoving ? ((wf === 1 || wf === 3) ? -1 : 0) : 0;

    // Ground shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(17, 43, 14, 4);
    ctx.fillRect(18, 42, 12, 6);

    const dir = charCreator.dirs[charCreator.dirIndex] || 'down';
    drawCustomCharacter(ctx, 16, 13 + bounceY, charCreator.draft, dir, wf, isMoving, true);

    charCreator.animId = requestAnimationFrame(loop);
  };
  charCreator.animId = requestAnimationFrame(loop);
}

function stopCharPreviewLoop() {
  if (charCreator.animId) {
    cancelAnimationFrame(charCreator.animId);
    charCreator.animId = null;
  }
}

function randomizeCharacterDraft() {
  const randIdx = (arr) => Math.floor(Math.random() * arr.length);
  charCreator.draft = {
    ...charCreator.draft,
    gender: Math.random() < 0.5 ? 'male' : 'female',
    skin: randIdx(CHARACTER_CATALOG.skin),
    hairStyle: randIdx(CHARACTER_CATALOG.hairStyle),
    hairColor: randIdx(CHARACTER_CATALOG.hairColor),
    top: randIdx(CHARACTER_CATALOG.top),
    pants: randIdx(CHARACTER_CATALOG.pants),
    shoes: randIdx(CHARACTER_CATALOG.shoes),
    accessory: randIdx(CHARACTER_CATALOG.accessory)
  };
  updateCharCreatorUI();
}

async function startNewSaveSlot(slotId) {
  game.audio.init();
  game.audio.playTone(523.2, 0.14, 'square', 0.06);

  game.currentSlot = slotId;

  // Prepare fresh character draft for this new save
  charCreator.draft = defaultCharacter();
  charCreator.draft.name = '';
  charCreator.dirIndex = 0;
  charCreator.walking = false;

  const nameInput = document.getElementById('char-name-input');
  if (nameInput) {
    nameInput.value = '';
  }
  updateCharCreatorUI();

  await showScreenWithTransition('charCreate', {
    showLoading: false,
    wipeDuration: 360,
    onScreenSwitch: () => {
      game.state = GameState.CHAR_CREATE;
      startCharPreviewLoop();
    }
  });

  setTimeout(() => {
    if (nameInput) nameInput.focus();
  }, 100);
}

async function confirmCharacterAndStartGame() {
  game.audio.init();
  game.audio.stopMenuMusic();
  game.audio.playTone(587.3, 0.18, 'square', 0.07);

  stopCharPreviewLoop();

  const nameInput = document.getElementById('char-name-input');
  const rawName = nameInput ? nameInput.value.trim() : '';
  charCreator.draft.name = rawName || (charCreator.draft.gender === 'female' ? 'Trinity' : 'Elliot');

  game.character = { ...charCreator.draft };

  // Create fresh save in local DB with custom character
  saveDB.createNewSave(game.currentSlot, game.character);

  game.currentPhase = 0;
  game.score = 0;
  game.totalHintsUsed = 0;
  game.phaseHintsUsed = 0;
  game.testedWords = new Set();
  game.terminalOpen = false;
  game.doorUnlocked = false;
  game.transitioningPhase = false;

  await showScreenWithTransition('story', {
    showLoading: true,
    loadingDuration: 2600,
    wipeDuration: 450,
    onScreenSwitch: () => {
      dom.storyText.textContent = '';
    }
  });

  playStory();
}

async function continueSaveSlot(slotId) {
  const slotData = saveDB.getSlot(slotId);
  if (slotData.empty) {
    return startNewSaveSlot(slotId);
  }

  game.audio.init();
  game.audio.stopMenuMusic();
  game.audio.playTone(587.3, 0.18, 'square', 0.07);

  game.currentSlot = slotId;
  game.character = { ...defaultCharacter(), ...(slotData.character || {}) };

  // If the save was already completed, restart from Phase 1 on this slot keeping the character
  if (slotData.completed) {
    saveDB.createNewSave(slotId, game.character);
    game.currentPhase = 0;
    game.score = 0;
    game.totalHintsUsed = 0;
    game.phaseHintsUsed = 0;
    game.doorUnlocked = false;

    await showScreenWithTransition('game', {
      showLoading: true,
      loadingDuration: 2200,
      wipeDuration: 450
    });
    startPhase(0);
    return;
  }

  // Restore saved progress
  const targetPhase = Math.min(Math.max(slotData.currentPhase || 0, 0), PHASES.length - 1);
  game.currentPhase = targetPhase;
  game.score = slotData.score || 0;
  game.totalHintsUsed = slotData.totalHintsUsed || 0;
  game.phaseHintsUsed = slotData.phaseHintsUsed || 0;
  game.doorUnlocked = Boolean(slotData.doorUnlocked);

  await showScreenWithTransition('game', {
    showLoading: true,
    loadingDuration: 2200,
    wipeDuration: 450,
    onScreenSwitch: () => {
      if (topDownRoom) topDownRoom.resetForPhase(targetPhase);
    }
  });

  startPhase(targetPhase, {
    restoreFromSave: true,
    phaseHintsUsed: slotData.phaseHintsUsed || 0,
    doorUnlocked: Boolean(slotData.doorUnlocked)
  });
}

function updateHUD() {
  const phase = PHASES[game.currentPhase];
  if (dom.hud.slotNumber) {
    const charName = (game.character && game.character.name) ? game.character.name.toUpperCase() : `SLOT ${game.currentSlot}`;
    dom.hud.slotNumber.textContent = `${charName} · S0${game.currentSlot}`;
  }
  dom.hud.phaseNumber.textContent = `${phase.id}/5`;
  dom.hud.phaseName.textContent = phase.title.toUpperCase();
  dom.hud.hintsCount.textContent = game.maxHintsPerPhase - game.phaseHintsUsed;
  dom.hud.scoreValue.textContent = game.score;
}

// ─── Story Typewriter ───
async function playStory() {
  game.state = GameState.STORY;
  showScreen('story');

  const playerName = (game.character && game.character.name) ? game.character.name : 'hacker';

  const storyLines = [
    `> Inicializando terminal de ${playerName}...\n`,
    '> Carregando memórias...\n\n',
    'Você acorda em uma cela escura e úmida.\n',
    'Ao norte do quarto, uma porta pesada está trancada com um cadeado criptográfico.\n\n',
    'Gravada no metal da porta, uma mensagem:\n',
    `"Bem-vindo à minha masmorra, ${playerName}.\n`,
    ' Eu sou JOHN, o Ripper.\n',
    ' Você foi pego tentando invadir meu sistema."\n\n',
    '"Para sair, terá que caminhar até cada porta e provar seu valor.\n',
    ' 5 quartos. 5 cadeados com hashes. 5 chances."\n\n',
    '"Decifre o cadeado de cada porta para destrancá-la.\n',
    ' Falhe... e ficará trancado aqui para sempre."\n\n',
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

  await showScreenWithTransition('game', {
    showLoading: false,
    wipeDuration: 420
  });

  startPhase(0);
}

// ─── Padlock Terminal & Door Interaction ───
function openPadlockTerminal() {
  if (game.state !== GameState.PLAYING || game.paused || game.doorUnlocked) return;
  game.terminalOpen = true;
  if (topDownRoom) {
    topDownRoom.keys.clear();
    topDownRoom.player.autoTarget = null;
  }
  if (dom.room.terminalBackdrop) {
    dom.room.terminalBackdrop.classList.add('active');
  }
  game.audio.playTone(540, 0.08, 'square', 0.05);
  setTimeout(() => {
    const answerInput = document.getElementById('puzzle-answer');
    if (answerInput) answerInput.focus();
  }, 80);
}

function closePadlockTerminal(playSound = true) {
  game.terminalOpen = false;
  if (dom.room.terminalBackdrop) {
    dom.room.terminalBackdrop.classList.remove('active');
  }
  const answerInput = document.getElementById('puzzle-answer');
  if (answerInput) answerInput.blur();
  if (playSound && game.audio) {
    game.audio.playTone(300, 0.06, 'square', 0.04);
  }
}

function triggerDoorInteraction() {
  if (game.state !== GameState.PLAYING || game.paused || game.transitioningPhase) return;

  if (game.doorUnlocked) {
    advanceToNextPhase();
    return;
  }

  if (topDownRoom && !topDownRoom.nearDoor) {
    topDownRoom.walkToDoorAndInteract();
    return;
  }

  openPadlockTerminal();
}

async function advanceToNextPhase() {
  if (game.transitioningPhase) return;
  game.transitioningPhase = true;
  closePadlockTerminal(false);

  if (game.currentPhase < PHASES.length - 1) {
    const nextPhase = game.currentPhase + 1;
    await showScreenWithTransition('game', {
      showLoading: false,
      wipeDuration: 380,
      onScreenSwitch: () => {
        if (topDownRoom) topDownRoom.resetForPhase(nextPhase);
      }
    });
    startPhase(nextPhase);
  } else {
    await showScreenWithTransition('victory', {
      showLoading: false,
      wipeDuration: 500
    });
    showVictory();
  }
}

// ─── Phase Management ───
async function startPhase(phaseIndex, options = {}) {
  const { restoreFromSave = false, phaseHintsUsed = 0, doorUnlocked = false } = options;

  game.currentPhase = phaseIndex;
  game.state = GameState.PHASE_INTRO;
  game.phaseHintsUsed = restoreFromSave ? phaseHintsUsed : 0;
  game.testedWords = new Set();
  game.terminalOpen = false;
  game.doorUnlocked = restoreFromSave ? doorUnlocked : false;
  game.transitioningPhase = false;

  closePadlockTerminal(false);
  if (topDownRoom) {
    topDownRoom.resetForPhase(phaseIndex);
  }

  game.audio.stopMenuMusic();
  game.audio.startDungeonMusic();

  const phase = PHASES[phaseIndex];

  // Compute MD5 hash if needed
  if (phase.type === 'md5' && !phase.targetHash) {
    phase.targetHash = MD5.hash(phase.answer);
  }

  showScreen('game');
  updateHUD();
  renderPuzzle(phase);

  // If restoring a save that had hints already revealed on this phase, render them
  if (restoreFromSave && game.phaseHintsUsed > 0) {
    const container = document.getElementById('hints-container');
    if (container) {
      for (let i = 0; i < game.phaseHintsUsed && i < phase.hints.length; i++) {
        const hintEl = document.createElement('div');
        hintEl.className = 'hint-item';
        hintEl.innerHTML = `<span class="hint-icon"><svg class="pixel-icon"><use href="#px-hint"></use></svg></span> ${phase.hints[i]}`;
        container.appendChild(hintEl);
      }
    }
  }

  // If restoring a save where the door in this room was already unlocked, reflect that on the door UI
  if (restoreFromSave && game.doorUnlocked) {
    if (dom.room.door) {
      dom.room.door.classList.remove('door-locked');
      dom.room.door.classList.add('door-unlocked');
    }
    if (dom.room.doorPromptIcon) {
      dom.room.doorPromptIcon.innerHTML = `<svg class="pixel-icon"><use href="#px-unlock"></use></svg>`;
    }
    if (dom.room.doorPromptText) {
      dom.room.doorPromptText.textContent = '[E / ↑] ATRAVESSAR PORTA';
    }
  }

  // Auto-save current slot state
  autoSaveCurrentSlot({ completed: false }, !restoreFromSave);

  // Show phase intro
  dom.overlays.phaseNumBig.textContent = String(phase.id).padStart(2, '0');
  dom.overlays.phaseTitle.textContent = phase.title;
  dom.overlays.phaseSubtitle.textContent = phase.subtitle;
  showOverlay('phaseIntro');
  game.audio.playTone(440, 0.3, 'sine', 0.06);

  await sleep(2200);
  hideOverlay('phaseIntro');

  await sleep(250);
  game.state = GameState.PLAYING;
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
      <svg class="pixel-icon"><use href="#px-hint"></use></svg> USAR DICA (${game.maxHintsPerPhase - game.phaseHintsUsed} restantes)
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
    if (game.terminalOpen) {
      setTimeout(() => answerInput.focus(), 100);
    }
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

  // Close the padlock terminal so the player sees the room and door unlocking
  closePadlockTerminal(false);

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

  await sleep(1500);
  hideOverlay('success');

  // Unlock and open the door in the top-down room
  await sleep(200);
  game.doorUnlocked = true;
  if (dom.room.door) {
    dom.room.door.classList.remove('door-locked');
    dom.room.door.classList.add('door-unlocked');
    if (topDownRoom && topDownRoom.nearDoor) {
      dom.room.door.classList.add('near');
    }
  }
  if (dom.room.doorPromptIcon) {
    dom.room.doorPromptIcon.innerHTML = `<svg class="pixel-icon"><use href="#px-unlock"></use></svg>`;
  }
  if (dom.room.doorPromptText) {
    dom.room.doorPromptText.textContent = '[E / ↑] ATRAVESSAR PORTA';
  }
  game.audio.doorOpen();

  // Auto-save unlocked door & score in current slot
  autoSaveCurrentSlot({ doorUnlocked: true });

  // Return control to the player so they can walk through the unlocked door (or press E)
  game.state = GameState.PLAYING;
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
  hintEl.innerHTML = `<span class="hint-icon"><svg class="pixel-icon"><use href="#px-hint"></use></svg></span> ${hint}`;
  container.appendChild(hintEl);

  // Update hint button
  const hintBtn = document.getElementById('hint-btn');
  const remaining = game.maxHintsPerPhase - game.phaseHintsUsed;
  hintBtn.innerHTML = `<svg class="pixel-icon"><use href="#px-hint"></use></svg> USAR DICA (${remaining} restantes)`;
  if (remaining <= 0) hintBtn.disabled = true;

  updateHUD();
  autoSaveCurrentSlot({}, false);
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

  // Mark save slot as completed in local database
  autoSaveCurrentSlot({
    currentPhase: PHASES.length - 1,
    doorUnlocked: true,
    completed: true
  }, true);

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
  game.terminalOpen = false;
  game.doorUnlocked = false;
  game.transitioningPhase = false;
  closePadlockTerminal(false);
  if (topDownRoom) {
    topDownRoom.resetForPhase(0);
  }

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

  // Initialize Local Database (IndexedDB + LocalStorage)
  saveDB.init().then(() => {
    renderSaveSlots();
  });
  renderSaveSlots();

  // Transition & Loading Systems
  const wipeCanvas = document.getElementById('pixel-wipe-canvas');
  if (wipeCanvas) {
    pixelWipe = new PixelWipeTransition(wipeCanvas);
  }
  loadingScreen = new LoadingScreenSystem();

  // Reliable audio unlocking on user interaction
  const tryStartMenuMusic = () => {
    game.audio.init();
    if (game.audio.enabled && (game.state === GameState.TITLE || game.state === GameState.SAVE_SELECT || game.state === GameState.CHAR_CREATE)) {
      if (!game.audio.menuAudio || game.audio.menuAudio.paused) {
        game.audio.playMenuMusic();
      }
    }
  };
  ['pointerdown', 'click', 'keydown'].forEach(evt => {
    document.addEventListener(evt, tryStartMenuMusic);
  });

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
    if (pauseSoundIcon) {
      pauseSoundIcon.innerHTML = `<svg class="pixel-icon"><use href="#px-${on ? 'sound' : 'sound-mute'}"></use></svg>`;
    }
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
        if (titleAudioIcon) {
          titleAudioIcon.innerHTML = `<svg class="pixel-icon"><use href="#px-sound"></use></svg>`;
        }
        if (titleAudioLbl)  titleAudioLbl.textContent  = "MÚSICA: ROCCOW · PARTY'S CANCELLED";
      } else {
        titleAudioBtn.classList.add('muted');
        if (titleAudioIcon) {
          titleAudioIcon.innerHTML = `<svg class="pixel-icon"><use href="#px-sound-mute"></use></svg>`;
        }
        if (titleAudioLbl)  titleAudioLbl.textContent  = "SOM: MUTADO (CLIQUE P/ ATIVAR)";
      }
    }
  }

  // Title audio pill click
  const titleAudioPill = document.getElementById('title-audio-btn');
  if (titleAudioPill) {
    titleAudioPill.addEventListener('click', (e) => {
      e.stopPropagation();
      game.audio.init();
      // If audio is enabled but was not playing (e.g. autoplay blocked initially), start it!
      if (game.audio.enabled && game.audio.menuAudio && game.audio.menuAudio.paused) {
        game.audio.playMenuMusic();
      } else {
        game.audio.toggleSound();
      }
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

  // 16-bit Top-Down Room & Playable Character System
  if (dom.room.canvas) {
    topDownRoom = new TopDownRoomSystem(dom.room.canvas);
    topDownRoom.startAnimation();
  }

  // Interactive Door & Padlock Terminal bindings
  if (dom.room.door) {
    dom.room.door.addEventListener('click', (e) => {
      e.stopPropagation();
      if (game.state !== GameState.PLAYING || game.paused || game.terminalOpen) return;
      if (topDownRoom && topDownRoom.nearDoor) {
        triggerDoorInteraction();
      } else if (topDownRoom) {
        game.audio.playTone(460, 0.04, 'square', 0.03);
        topDownRoom.walkToDoorAndInteract();
      }
    });
  }

  if (dom.room.terminalCloseBtn) {
    dom.room.terminalCloseBtn.addEventListener('click', () => {
      closePadlockTerminal(true);
    });
  }

  if (dom.room.terminalBackdrop) {
    dom.room.terminalBackdrop.addEventListener('click', (e) => {
      if (e.target === dom.room.terminalBackdrop) {
        closePadlockTerminal(true);
      }
    });
  }

  // Start button (Menu -> Save Select Screen with 3 Save Slots)
  document.getElementById('start-btn').addEventListener('click', async () => {
    game.audio.init();
    game.audio.playTone(440, 0.15, 'square', 0.06);
    renderSaveSlots();

    await showScreenWithTransition('saveSelect', {
      showLoading: false,
      wipeDuration: 360,
      onScreenSwitch: () => {
        game.state = GameState.SAVE_SELECT;
      }
    });
  });

  // Back button on Save Select Screen (Save Select -> Title Screen)
  const saveBackBtn = document.getElementById('save-back-btn');
  if (saveBackBtn) {
    saveBackBtn.addEventListener('click', async () => {
      game.audio.playTone(330, 0.12, 'square', 0.05);
      await showScreenWithTransition('title', {
        showLoading: false,
        wipeDuration: 340,
        onScreenSwitch: () => {
          game.state = GameState.TITLE;
        }
      });
    });
  }

  // ── Character Creation Screen Bindings ─────────────────────
  const genderMaleBtn = document.getElementById('gender-male-btn');
  const genderFemaleBtn = document.getElementById('gender-female-btn');
  if (genderMaleBtn) {
    genderMaleBtn.addEventListener('click', () => {
      charCreator.draft.gender = 'male';
      game.audio.playTone(420, 0.07, 'square', 0.05);
      updateCharCreatorUI();
    });
  }
  if (genderFemaleBtn) {
    genderFemaleBtn.addEventListener('click', () => {
      charCreator.draft.gender = 'female';
      game.audio.playTone(540, 0.07, 'square', 0.05);
      updateCharCreatorUI();
    });
  }

  document.querySelectorAll('.stepper-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      const dir = parseInt(btn.dataset.dir, 10) || 1;
      const list = CHARACTER_CATALOG[cat];
      if (!list) return;
      const len = list.length;
      charCreator.draft[cat] = ((charCreator.draft[cat] || 0) + dir + len) % len;
      game.audio.playTone(dir > 0 ? 500 : 380, 0.05, 'square', 0.04);
      updateCharCreatorUI();
    });
  });

  const rotLeftBtn = document.getElementById('char-rotate-left');
  const rotRightBtn = document.getElementById('char-rotate-right');
  const walkToggleBtn = document.getElementById('char-walk-toggle');
  const randomCharBtn = document.getElementById('char-random-btn');

  if (rotLeftBtn) {
    rotLeftBtn.addEventListener('click', () => {
      charCreator.dirIndex = (charCreator.dirIndex + 3) % 4;
      game.audio.playTone(360, 0.05, 'triangle', 0.05);
    });
  }
  if (rotRightBtn) {
    rotRightBtn.addEventListener('click', () => {
      charCreator.dirIndex = (charCreator.dirIndex + 1) % 4;
      game.audio.playTone(460, 0.05, 'triangle', 0.05);
    });
  }
  if (walkToggleBtn) {
    walkToggleBtn.addEventListener('click', () => {
      charCreator.walking = !charCreator.walking;
      game.audio.playTone(440, 0.06, 'square', 0.04);
      updateCharCreatorUI();
    });
  }
  if (randomCharBtn) {
    randomCharBtn.addEventListener('click', () => {
      game.audio.playTone(620, 0.1, 'square', 0.06);
      randomizeCharacterDraft();
    });
  }

  const charNameInput = document.getElementById('char-name-input');
  if (charNameInput) {
    charNameInput.addEventListener('keydown', (e) => {
      game.audio.keyPress();
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmCharacterAndStartGame();
      }
    });
  }

  const charBackBtn = document.getElementById('char-back-btn');
  if (charBackBtn) {
    charBackBtn.addEventListener('click', async () => {
      game.audio.playTone(330, 0.12, 'square', 0.05);
      stopCharPreviewLoop();
      renderSaveSlots();
      await showScreenWithTransition('saveSelect', {
        showLoading: false,
        wipeDuration: 340,
        onScreenSwitch: () => {
          game.state = GameState.SAVE_SELECT;
        }
      });
    });
  }

  const charConfirmBtn = document.getElementById('char-confirm-btn');
  if (charConfirmBtn) {
    charConfirmBtn.addEventListener('click', () => {
      confirmCharacterAndStartGame();
    });
  }

  // Delete Save Confirmation Modal events
  const deleteSaveModal = document.getElementById('delete-save-modal');
  const closeDeleteModal = () => {
    pendingDeleteSlotId = null;
    if (deleteSaveModal) deleteSaveModal.classList.remove('active');
  };

  const deleteCloseBtn = document.getElementById('delete-save-close');
  const deleteCancelBtn = document.getElementById('delete-cancel-btn');
  const deleteConfirmBtn = document.getElementById('delete-confirm-btn');

  if (deleteCloseBtn) deleteCloseBtn.addEventListener('click', closeDeleteModal);
  if (deleteCancelBtn) deleteCancelBtn.addEventListener('click', closeDeleteModal);
  if (deleteSaveModal) {
    deleteSaveModal.addEventListener('click', (e) => {
      if (e.target === deleteSaveModal) closeDeleteModal();
    });
  }
  if (deleteConfirmBtn) {
    deleteConfirmBtn.addEventListener('click', () => {
      if (pendingDeleteSlotId) {
        saveDB.deleteSlot(pendingDeleteSlotId);
        game.audio.playTone(220, 0.18, 'sawtooth', 0.07);
        renderSaveSlots();
      }
      closeDeleteModal();
    });
  }

  // Helper for returning to menu with transition (Game/Victory -> Loading Screen -> Menu)
  async function returnToMenuWithTransition() {
    game.audio.stopDungeonMusic();
    await showScreenWithTransition('title', {
      showLoading: true,
      loadingDuration: 2200,
      wipeDuration: 450,
      onScreenSwitch: () => {
        restartGame();
      }
    });
  }

  // Restart button (Victory screen)
  document.getElementById('restart-btn').addEventListener('click', () => {
    returnToMenuWithTransition();
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

  // Back to main menu (Pause overlay)
  document.getElementById('pause-menu-btn').addEventListener('click', () => {
    pauseOverlay.classList.remove('active');
    game.paused = false;
    returnToMenuWithTransition();
  });

  // Keyboard shortcut: ESC to close padlock terminal / modals / pause
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // ESC closes modals or padlock terminal first if open
      const settingsOpen = document.getElementById('settings-modal').classList.contains('active');
      const creditsOpen  = document.getElementById('credits-modal').classList.contains('active');
      const deleteOpen   = deleteSaveModal && deleteSaveModal.classList.contains('active');
      if (settingsOpen) { document.getElementById('settings-modal').classList.remove('active'); return; }
      if (creditsOpen)  { document.getElementById('credits-modal').classList.remove('active');  return; }
      if (deleteOpen)   { closeDeleteModal(); return; }
      if (game.state === GameState.CHAR_CREATE && charBackBtn) {
        charBackBtn.click();
        return;
      }
      if (game.state === GameState.SAVE_SELECT && saveBackBtn) {
        saveBackBtn.click();
        return;
      }
      if (game.terminalOpen) { closePadlockTerminal(true); return; }
      togglePause();
    }
  });
}

// Boot!
document.addEventListener('DOMContentLoaded', init);


