tagList(
  div(id = "main-buttons",
    actionButton("reset-audio-context", 
      label = "Restart pitch detection"
    ),
    actionButton("unselect-rows", 
      label = "Undo row selections",
      title = "Unselect all rows of notes",
      onclick = "$('.chord.selected').removeClass('selected')"
    ),
    actionButton("toggle-scale-degrees", 
      label = "Note/degree toggle",
      title = "Toggle between musical note or scale degree",
      toggle = "0"
    ),
    actionButton("toggle-degree-colors-palette",
      label = "Scale degree colors",
      title = "Change the color of each scale degree",
      toggle = "0",
    ),
    downloadButton("download-music-data",
      label = "Download app settings",
      title = "Save the app's current music settings",
    ),
    fileInput("upload-music-data", 
      label = "",
      buttonLabel = "Upload app settings"
    )
  )
) ->
  ui_header_buttons
