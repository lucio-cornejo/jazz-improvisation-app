async function MeydaSetup (ctx) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  const source = ctx.createMediaStreamSource(stream);
  
  console.log(stream, source);

  if (typeof Meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
  } else {
    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: ctx,
      source: source,
      bufferSize: 512,
      featureExtractors: ["rms"],
      callback: (features) => {
        console.log(features);
      },
    });
    analyzer.start();
  }
}