tagList(box(width = 12,
  div(id ="degree-colors",
    HTML(
      paste0(collapse = "",
        sapply(
          list(
            c("1", "#008000"),
            c("b2", "#787878"),
            c("2", "#ff0000"),
            c("b3", "#3232c8"),
            c("3", "#648000"),
            c("4", "#3232c8"),
            c("b5", "#787878"),
            c("5", "#806400"),
            c("b6", "#787878"),
            c("6", "#ff0000"),
            c("b7", "#3232c8"),
            c("7", "#965000")
          ),
          function (degree_color) {
            return(glue::glue(
              '<div>
                <input 
                  type="color" 
                  id="degree-{degree_color[1]}" 
                  name="degree-{degree_color[1]}" 
                  value="{degree_color[2]}"
                >
                <label for="degree-{degree_color[1]}">
                  {degree_color[1]}
                </label>
              </div>'
            ))
          }
        )
      )
    )    
  )
)) ->
  ui_degree_colors
