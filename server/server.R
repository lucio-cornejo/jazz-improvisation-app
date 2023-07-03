server <- function(input, output, session) {
  observeEvent(input$jazzStandards, {
    req(input$jazzStandards)
    session$sendCustomMessage(
      type = "selectJazzStandard",
      message = input$jazzStandards
    )
  })
}
