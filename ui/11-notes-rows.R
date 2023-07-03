tagList(box(width = 12,
  div(id = "rows-container",
    div(class = c("notes-row", "playing"),
      div(class = "chord"),
      HTML(
        purrr::map_chr(
          c(
            "C", "Db", "D", "Eb", 
            "E", "F", "Gb", "G", 
            "Ab", "A", "Bb", "B"
          ),
          ~ glue::glue('<div class="note">{.x}</div>')
        ) |>
          rep(times = 5) |>
          paste0(collapse = "")
      )
    )
  )
)) ->
  ui_notes_rows
