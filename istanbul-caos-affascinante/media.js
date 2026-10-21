(() => {
  'use strict';
  const translations = {
  "it": {
    "head": "Ascolta e accompagna il viaggio",
    "music": "Musica di sottofondo",
    "pending": "La musica sarà aggiunta dopo la scelta del brano.",
    "listen": "Ascolta il racconto",
    "pause": "Pausa",
    "resume": "Riprendi",
    "stop": "Ferma",
    "voice": "Voce",
    "auto": "Automatica",
    "ready": "Lettura pronta.",
    "reading": "Lettura in corso…",
    "paused": "Lettura in pausa.",
    "finished": "Lettura terminata.",
    "unsupported": "La lettura vocale non è disponibile in questo browser.",
    "error": "Non riesco ad avviare la voce. Prova un’altra voce o il lettore del browser.",
    "rights": "© 2026 Lorella · Il Tappeto Volante. Tutti i diritti riservati sui testi e sulle fotografie originali. Le immagini di altri autori restano attribuite ai rispettivi titolari.",
    "author": "Fotografia di Lorella",
    "external": "Immagine da fonte esterna"
  },
  "en": {
    "head": "Listen and travel",
    "music": "Background music",
    "pending": "Music will be added once the track has been chosen.",
    "listen": "Listen to the story",
    "pause": "Pause",
    "resume": "Resume",
    "stop": "Stop",
    "voice": "Voice",
    "auto": "Automatic",
    "ready": "Ready to read.",
    "reading": "Reading…",
    "paused": "Reading paused.",
    "finished": "Reading finished.",
    "unsupported": "Speech playback is unavailable in this browser.",
    "error": "The voice could not start. Try another voice or your browser’s reading feature.",
    "rights": "© 2026 Lorella · Il Tappeto Volante. All rights reserved for original text and photographs. Images by other authors remain credited to their respective owners.",
    "author": "Photograph by Lorella",
    "external": "Image from an external source"
  },
  "es": {
    "head": "Escucha y acompaña el viaje",
    "music": "Música de fondo",
    "pending": "La música se añadirá cuando se haya elegido la pieza.",
    "listen": "Escuchar el relato",
    "pause": "Pausa",
    "resume": "Reanudar",
    "stop": "Detener",
    "voice": "Voz",
    "auto": "Automática",
    "ready": "Lectura lista.",
    "reading": "Leyendo…",
    "paused": "Lectura en pausa.",
    "finished": "Lectura terminada.",
    "unsupported": "La lectura en voz alta no está disponible en este navegador.",
    "error": "No se ha podido iniciar la voz. Prueba otra voz o el lector del navegador.",
    "rights": "© 2026 Lorella · Il Tappeto Volante. Todos los derechos reservados sobre los textos y las fotografías originales. Las imágenes de otros autores conservan sus respectivas atribuciones.",
    "author": "Fotografía de Lorella",
    "external": "Imagen de una fuente externa"
  }
};
  const panel = document.querySelector('.media-panel');
  if (!panel) return;
  const language = panel.dataset.readingLang || document.documentElement.lang || 'it';
  const t = translations[language] || translations.it;
  const music = document.getElementById('travel-music');
  // Set this once the free music track has been selected.
  const soundtrack = {src: '../audio/hitslab-turkish-middle-eastern-background-music-326270.mp3', credit: 'Turkish Middle Eastern Background Music · HitsLab', url: ''};
  const source = music.dataset.musicSrc || soundtrack.src;
  if (source) {
    music.src = source;
    const note = document.getElementById('music-note');
    note.textContent = soundtrack.credit;
    if (soundtrack.url) {
      const link = document.createElement('a');
      link.href = soundtrack.url;
      link.textContent = soundtrack.credit;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      note.replaceChildren(link);
    }
  }
  const play = document.getElementById('reader-play');
  const pause = document.getElementById('reader-pause');
  const stop = document.getElementById('reader-stop');
  const voiceSelect = document.getElementById('reader-voice');
  const status = document.getElementById('reader-status');
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    play.disabled = true;
    voiceSelect.disabled = true;
    status.textContent = t.unsupported;
    return;
  }
  const synth = window.speechSynthesis;
  let voices = [], chunks = [], index = 0, offset = 0, current = null;
  let state = 'idle', generation = 0, resumeMusic = false;
  function setState(next, message) {
    state = next;
    play.disabled = next === 'playing';
    pause.disabled = next === 'idle';
    stop.disabled = next === 'idle';
    voiceSelect.disabled = next !== 'idle';
    pause.textContent = next === 'paused' ? '▶ ' + t.resume : '⏸ ' + t.pause;
    status.textContent = message;
  }
  function refreshVoices() {
    const selected = voiceSelect.value;
    voices = synth.getVoices().filter(v => v.lang.toLowerCase().split('-')[0] === language);
    voiceSelect.replaceChildren(new Option(t.auto, ''));
    voices.forEach(v => voiceSelect.add(new Option(v.name + ' · ' + v.lang, v.voiceURI)));
    if (voices.some(v => v.voiceURI === selected)) voiceSelect.value = selected;
  }
  refreshVoices();
  synth.addEventListener('voiceschanged', refreshVoices);
  function splitText(text) {
    const result = [];
    for (let sentence of text.match(/[^.!?…]+[.!?…]*\s*/gu) || [text]) {
      sentence = sentence.trim();
      while (sentence.length > 220) {
        const space = sentence.lastIndexOf(' ', 220);
        const cut = space > 60 ? space : 220;
        result.push(sentence.slice(0, cut));
        sentence = sentence.slice(cut).trim();
      }
      if (sentence) result.push(sentence);
    }
    return result;
  }
  function restoreMusic() {
    if (resumeMusic) music.play().catch(() => {});
    resumeMusic = false;
  }
  function finish(message) {
    generation++;
    synth.cancel();
    current = null;
    setState('idle', message);
    restoreMusic();
  }
  function speakChunk() {
    if (index >= chunks.length) { finish(t.finished); return; }
    const token = ++generation;
    const utterance = new SpeechSynthesisUtterance(chunks[index].slice(offset));
    current = utterance; // Retain the utterance while the browser is speaking.
    utterance.lang = {it:'it-IT', en:'en-GB', es:'es-ES'}[language] || language;
    const voice = voices.find(v => v.voiceURI === voiceSelect.value) || voices.find(v => v.default) || voices[0];
    if (voice) utterance.voice = voice;
    const startOffset = offset;
    utterance.onboundary = event => {
      if (token === generation && event.name === 'word') offset = startOffset + event.charIndex;
    };
    utterance.onend = () => {
      if (token !== generation || state !== 'playing') return;
      index++; offset = 0; speakChunk();
    };
    utterance.onerror = event => {
      if (token !== generation || event.error === 'canceled' || event.error === 'interrupted') return;
      finish(t.error);
    };
    synth.speak(utterance);
  }
  function start() {
    if (state === 'playing') return;
    if (state !== 'paused') {
      const nodes = document.querySelectorAll('h1, #racconto h2, #racconto h3, #racconto summary, #racconto p:not(.signature-rights)');
      chunks = Array.from(nodes).flatMap(node => splitText(node.textContent.replace(/\s+/g, ' ').trim()));
      index = 0; offset = 0;
      resumeMusic = !music.paused;
      music.pause();
    }
    synth.cancel();
    setState('playing', t.reading);
    speakChunk();
  }
  play.addEventListener('click', start);
  pause.addEventListener('click', () => {
    if (state === 'paused') { start(); return; }
    if (state !== 'playing') return;
    // Cancel and retain the word offset; this also works on mobile engines
    // whose native pause/resume implementation is incomplete.
    generation++;
    synth.cancel();
    current = null;
    setState('paused', t.paused);
  });
  stop.addEventListener('click', () => finish(t.ready));
  window.addEventListener('pagehide', () => {
    generation++;
    synth.cancel();
    music.pause();
    resumeMusic = false;
    setState('idle', t.ready);
  });
})();
