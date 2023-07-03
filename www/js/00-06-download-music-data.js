$(function() {
  /* Download window.musicData into json file */
  document.getElementById("download-music-data")
    .addEventListener("click", 
      function () {
        // Convert app's relevant settings
        const downloadData = JSON.stringify(window.musicData);
        const a = document.createElement('a');
        document.body.appendChild(a);
        try {
          a.download = 'musicData.json';
          const blob = new Blob( [downloadData] , {
            type: 'application/json'
          });
          a.href = window.URL.createObjectURL( blob );
        } catch (error) {
          a.innerHTML += ' (' + error + ')';
        }
        a.click();
        document.body.removeChild(a);
      }
    );
});
