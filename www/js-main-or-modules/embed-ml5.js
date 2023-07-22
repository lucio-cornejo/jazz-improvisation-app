// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection

Based on:
https://editor.p5js.org/AndreasRef/sketches/XJKg1XLI
=== */

const modelURL = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
let stream;
let pitch;



async function ml5Setup(audioContext) {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  startPitch(stream, audioContext);
}
// ml5Setup();

function startPitch(stream, audioContext) {
  // pitch = ml5.pitchDetection('./../model/', audioContext, stream, getPitch);
  pitch = ml5.pitchDetection(modelURL, audioContext, stream, getPitch);
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      window.freqHistory.push(frequency);
      
      try {
        colorNotePlayed();
      } catch(error) {
        console.log(error);
      }


    } else {
      // console.log('No pitch detected');
    }
    getPitch();
  })
}
