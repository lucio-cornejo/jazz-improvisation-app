tagList(box(width = 12, collapsible = TRUE,
  column(4, 
    numericInput("add-row-of-notes",
      label = "Set the number of rows (chords)",
      value = 1, min = 1, max = Inf, step = 1
    ),
    div(id = "play-chords",
      onclick = "startScheduler()",
      tags$i(
        tabIndex = 0,
        class = c("fa", "fa-play")
      )
    ),
    div(id = "stop-chords",
      onclick = "stopScheduler()",
      tags$i(
        tabIndex = 0,
        class = c("fa", "fa-stop")
      )
    )
  ),
  column(8, 
    HTML('
      <textarea
        id = "code-text"
        spellcheck="false"
      >
      </textarea>'
    )
  )
)) -> 
  ui_notes_rows_controls