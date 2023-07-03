$(function() {
  /* Upload json file */
  document.getElementById("upload-music-data")
    .addEventListener("input", 
      function(event) {
        var reader = new FileReader();
        
        reader.readAsText(event.target.files[0]);

        reader.onload = function(event) {
          // Update window.musicData to the uploaded settings
          window.musicData = JSON.parse(event.target.result);

          window.updateNotesRowsFromMusicData();

          // Reset file uploaded, to allow for upload
          // of same file, again, in order to update settings.
          setTimeout(() => {
            document.getElementById("upload-music-data").value = '';
          }, 3000);
        }
      }
    );
});
