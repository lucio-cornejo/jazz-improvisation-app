tagList(
  div(id = "one-panel",  # probably change id
    # p(
    #   "Row by row, select the scale and chord to be played",
    #   style = "
    #     margin: 0;
    #     font-size: 120%;
    #     text-align: center;
    #     white-space: break-spaces; 
    #     font-family: ui-monosapce;
    #   "
    # ),
        # Select a jazz standard
    selectizeInput(
      inputId = "jazzStandards",
      label = "Jazz standards, per player version",
      choices = standards_names,
      options = list(
        placeholder = "Select a song",
        onInitialize = I('function() { this.setValue("63"); }')
      )
    ),
    numericInput("row-of-notes",
      label = "Row of notes to modify",
      value = 1, min = 1, max = 1, step = 1
    ),
    selectInput("scale-root",
      label = "Root of the scale",
      selected = 0,
      choices = c(
        "C" = 0, "Db" = 1, "D" = 2,
        "Eb" = 3, "E" = 4, "F" = 5,
        "Gb" = 6, "G" = 7, "Ab" = 8,
        "A" = 9, "Bb" = 10, "B" = 11
      )
    ),
    withTags({
      div(class = "dropdown",
        "Select",
        span(
          id = "scales",
          class = "dropdown-toggle",
          `data-toggle` = "dropdown",
          tabIndex = 0,
          "scales"
        ),
        ul(class = "dropdown-menu")
      )
    }),
    withTags({
      div(class = "dropdown",
        "Select",
        span(
          id = "chords",
          class = "dropdown-toggle",
          `data-toggle` = "dropdown",
          tabIndex = 0,
          "chords"
        ),
        ul(class = "dropdown-menu")
      )
    }),
    numericInput("tempo",  # this should be tempo
      label = "Tempo",
      value = 120, min = 20, max = 400, step = 1
      # oninput="window.chordsDelay = this.value * 1000"
    )
    # Select the notes for the chord to be played
  )
) ->
  ui_set_chords_and_scales
