/*
  Motivation: https://stackblitz.com/edit/react-mwldei?file=src%2FApp.js
  The author of Strudel shared such project with me,
  and I converted that React application into vanilla
  JavaScript in order to use it in this Shiny app.
*/
  import { cat, controls, repl, setStringParser } from 'https://cdn.skypack.dev/@strudel.cycles/core@0.6.8';
  import { mini } from 'https://cdn.skypack.dev/@strudel.cycles/mini@0.6.0';
  import { addVoicings } from 'https://cdn.skypack.dev/@strudel.cycles/tonal@0.6.0';
  import {
    initAudioOnFirstClick,
    webaudioOutput,
    samples,
    getAudioContext
  } from 'https://cdn.skypack.dev/@strudel.cycles/webaudio@0.6.0';

  setStringParser(mini);
  const { n } = controls;

  // Load scales for scale dropdown menu
  fetch("./data/chord-types-translator.json")
    .then(response => { return response.json() })
    .then(jsondata => {
      // globalThis.translatedVoicings = new Map();
      globalThis.translatedVoicings = {};
      Object.values(jsondata).forEach(value => {
        // globalThis.translatedVoicings.set(value[0], value[1]);
        globalThis.translatedVoicings[value[0]] = value[1];
      });
    });
  
  // Voicing dictionaries from: https://github.com/felixroos/chord-voicings/blob/main/src/dictionaryVoicing.ts
  addVoicings('testing', globalThis.translatedVoicings, ['C3', 'C6']);

  function swing(chords, bpm) {
    return cat(`<${chords}>`)
      .layer(
        (x) => x.voicings('lefthand').note().s('stage73').lpf(1000).lpq(12).gain(2.5),
        // (x) => x.voicings('testing').note().s('piano').lpf(1000).lpq(12).gain(0.5),
        (x) => x.rootNotes(2).note().struct('x*2').s('jazzbass')
      )
      .clip(1)
      .stack(
        n('[19 [~@1.9 19]]*2,[~ 4]*2 ,~@3 <~@3 [2@1.9 2]>')
          .s('gretsch')
          .gain('[.9 .6]*3')
      )
      /* 
        Start almost half a bar early, so that
        the loop starts with the drum pattern
      */ 
      // .late(0.49)  
      /* 
        Start from the last bar 
      */
      .late(1)
      .slow(4)
      .cpm(bpm);
  }

  const initAudio = initAudioOnFirstClick();
  const ctx = getAudioContext();

  // MeydaSetup(ctx);
  ml5Setup(ctx);

  const loadSamples = Promise.all([
    samples('github:felixroos/samples/main'),
    samples('github:tidalcycles/Dirt-Samples/master'),
    samples(
      'https://strudel.tidalcycles.org/piano.json',
      'https://strudel.tidalcycles.org/piano/'
    ),
  ]);

  const { scheduler } = repl({
    interval: 0.5,
    defaultOutput: webaudioOutput,
    getTime: () => ctx.currentTime,
  });

  async function update(chords) {
    await initAudio;
    await loadSamples;

    const tempo = globalThis['tempo'].valueAsNumber;
    const pat = swing(chords, tempo);
    scheduler.setPattern(pat);
  }

  /*
   // Try to play silence when app starts,
   // so that sample loading gets started.
  document.addEventListener(
    "DOMContentLoaded", async function() {
      update("~ ~")
        .then(async () => {
          scheduler.start();
          await new Promise(r => setTimeout(r, 5000));
          scheduler.stop();
        });
    }
  )
  */

  globalThis["startScheduler"] = function() {
    const progression = 
      globalThis["code-text"]
        .value
        .replaceAll(/[^\S\r\n]+/g, " ");

    globalThis["code-text"].value = progression;

    update(progression)
      .then(() => scheduler.start());
  }
  globalThis["stopScheduler"] = () => scheduler.stop();
