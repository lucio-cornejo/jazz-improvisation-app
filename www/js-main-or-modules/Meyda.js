async function MeydaSetup (ctx) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  const source = ctx.createMediaStreamSource(stream);
  
  if (typeof Meyda === "undefined") {
    console.log("Meyda could not be found! Have you included it?");
  } else {
    Shiny.shinyapp.$inputValues.notesMaxChroma = [];

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: ctx,
      source: source,
      bufferSize: 512 * 8,
      featureExtractors: ["rms", "energy", "chroma"],
      callback: (features) => {
        const chroma = features.chroma;
        const index = chroma.reduce((accumulator, current, index) => {
          return current > chroma[accumulator] ? index : accumulator;
        }, 0);
        
        const temp = Shiny.shinyapp.$inputValues.notesMaxChroma;
        temp.push(index);
        Shiny.setInputValue("notesMaxChroma", temp)
      },
    });
    analyzer.start();
  }
}
