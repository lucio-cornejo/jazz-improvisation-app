tagList(
  # Load CSS files
  purrr::map(
    dir("./www/css/"),
    ~ includeCSS(path = paste0("./www/css/", .x))
  ),
  # Load ml5.js to use live note recognition
  tags$script(
    src = "https://unpkg.com/ml5@latest/dist/ml5.min.js"
  ),
  # Connect ml5.js to this application
  tags$script(
    # type="module", 
    src="./www/js-main-or-modules/embed-ml5.js"
  ),
  # Load Strudel necessary dependencies
  tags$script(
    type = "module", src = "./www/js-main-or-modules/embed-Strudel.js"
  ),
  # Load non module JavaScript files
  purrr::map(
    dir("./www/js/"),
    ~ includeScript(path = paste0("./www/js/", .x))
  )
) -> 
  ui_head