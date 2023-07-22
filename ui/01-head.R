tagList(
  # Load CSS files
  purrr::map(
    dir("./www/css/"),
    ~ includeCSS(path = paste0("./www/css/", .x))
  ),
  

  # Load Meyda.js
  # tags$script(
    # src = "https://unpkg.com/meyda/dist/web/meyda.min.js"
    # src = "https://cdn.jsdelivr.net/npm/meyda@5.6.2/dist/web/meyda.min.js"
    # src = "./www/js-main-or-modules/meyda-utils.js"
  # ),
  # tags$script(src = "./www/js-main-or-modules/Meyda.js"),


  # Load ml5.js to use live note recognition
  tags$script(
    src = "https://unpkg.com/ml5@latest/dist/ml5.min.js"
  ),
  # # Connect ml5.js to this application
  tags$script(src="./www/js-main-or-modules/embed-ml5.js"),
  
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
