/*
  Source: https://github.com/cwilso/volume-meter/tree/main
*/

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.98;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping = function() {
    if (!this.clipping)
      return false;
    
    if ((this.lastClip + this.clipLag) < window.performance.now())
      this.clipping = false;

    return this.clipping;
  }

	processor.shutdown = function() {
    this.disconnect();
    this.onaudioprocess = null;
  }

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
  var bufLength = buf.length;
	var sum = 0;
  var x;

	// Do a root-mean-square on the samples: sum up the squares...
  for (var i=0; i<bufLength; i++) {
    x = buf[i];
    if (Math.abs(x)>=this.clipLevel) {
      this.clipping = true;
      this.lastClip = window.performance.now();
    }
    sum += x * x;
  }

  // ... then take the square root of the sum.
  var rms =  Math.sqrt(sum / bufLength);

  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume*this.averaging);
}

/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var audioContext = null;
var meter = null;
var mediaStreamSource = null;




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

let pitch;
const modelURL = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

async function ml5Setup(audioContext) {
  // Attempt to get audio input
  navigator.mediaDevices.getUserMedia(
  {
    "audio": {
      "mandatory": {
        "googEchoCancellation": "false",
        "googAutoGainControl": "false",
        "googNoiseSuppression": "false",
        "googHighpassFilter": "false"
      },
      "optional": []
    }
  }).then((stream) => {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the updating
    console.log("uwu");
    startPitch(audioContext, stream);

  }).catch((err) => {
    // always check for errors at the end.
    console.error(`${err.name}: ${err.message}`);
    alert('Stream generation failed.');
  });


  // const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  // mic = new p5.AudioIn();
  // mic.start(startPitch(audioContext, mic.stream));
  // startPitch(audioContext, stream);
}

function startPitch(audioContext, stream) {
  pitch = ml5.pitchDetection(modelURL, audioContext, stream, getPitch);
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      window.freqHistory.push(frequency);
      window.freqVolumes.push(meter.volume);
      
      try {
        colorNotePlayed();
      } catch(error) {
        console.log(error);
      }
    } 
    getPitch();
  })
}
