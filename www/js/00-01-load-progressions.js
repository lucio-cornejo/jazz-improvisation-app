// Load scales for scale dropdown menu
fetch("./data/scalesIntervals.json")
  .then(response => { return response.json() })
  .then(jsondata => {
    globalThis.scalesIntervals = jsondata;
    fillScalesDropdown();
  });

// Load chords for chords dropdown menu
fetch("./data/chordsIntervals.json")
  .then(response => { return response.json() })
  .then(jsondata => { 
    globalThis.chordsIntervals = jsondata;
    fillChordsDropdown();
  });

// Load web scrapped chord progressions
fetch("./data/translated-scrapped-chord-progressions.json")
  .then(response => { return response.json() })
  .then(jsondata => { 
    // Save JSON data into a global variable
    globalThis.scrappedProgressions = jsondata;

    /*
    // Transform chords in string form to numeric arrays
    Object.keys(globalThis.scrappedProgressions).forEach(
      pseudoTitle => {
        // Create new property where all the chords'
        // pitch classes of each progression are stored
        globalThis.scrappedProgressions[pseudoTitle]
          .chordsPitchClasses = [];
        
        // Create new property where to store 
        // the full chord progression
        globalThis.scrappedProgressions[pseudoTitle]
          .chordProgression = [];

        Object.keys(globalThis.scrappedProgressions[pseudoTitle])
          .forEach(key => {
            try {
              // Convert any string into a single element
              // array that contains such string
              if (
                typeof globalThis.scrappedProgressions[pseudoTitle][key]
                !== 'object'
              ) {
                globalThis.scrappedProgressions[pseudoTitle][key] =
                  [globalThis.scrappedProgressions[pseudoTitle][key]];
              }

              // Update full chord progression
              if (key.slice(0, 7) === "chords-") {
                globalThis.scrappedProgressions[pseudoTitle].chordProgression = 
                  globalThis.scrappedProgressions[pseudoTitle].chordProgression
                    .concat(globalThis.scrappedProgressions[pseudoTitle][key]);
              }

              // Only modify strings of chord's pitch classes
              if (key.slice(0, 7) === "pitches") {
                // Convert each pitch classes collection in
                // string form, into an array of numbers
                globalThis.scrappedProgressions[pseudoTitle][key] = 
                  globalThis.scrappedProgressions[pseudoTitle][key]
                    .map( (pitchClasses) => {
                      // Split string via "-" character
                      let transform = pitchClasses.split("-");
                      // Convert strings to numbers
                      transform = transform.map( (pitchClass) => {
                        return parseInt(pitchClass);
                        // Assign a frquency to the pitch class
                        // return 130.8 * (2 ^ (pitchClass/12));
                      });

                      return transform;
                    });
              
                // Concatenate all the chords' pitch classes
                globalThis.scrappedProgressions[pseudoTitle].chordsPitchClasses = 
                  globalThis.scrappedProgressions[pseudoTitle].chordsPitchClasses
                    .concat(globalThis.scrappedProgressions[pseudoTitle][key]);
              }
            } catch (error) {
              console.error(error);
            }
          });
      });
    */
  });
