library(shiny)
library(shinydashboard)

shiny::addResourcePath("www", "www")
shiny::addResourcePath("data", "data")

# Load data from scraped chord progressions
scraped_standards <- jsonlite::read_json(
  path = "data/translated-scrapped-chord-progressions.json"
)
standards_names <- as.list(1:length(scraped_standards))
names(standards_names) <- names(scraped_standards)

# ------------------------------------ #
#            USER INTERFACE            #
# ------------------------------------ #
# Source ui files
for (ui_section in dir("./ui/")) {
  source(paste0("./ui/", ui_section), local = TRUE)
}

ui <- dashboardPage(
  dashboardHeader(
    title = "Jazz improvisation",
    disable = FALSE
  ),
  dashboardSidebar(
    sidebarMenu(id = "sidebar",
      menuItem(
        text = "Basic buttons",
        tabName = "basic_buttons",
        startExpanded = FALSE,
        ui_header_buttons
      ),
      menuItem(
        text = "Set chords, scales and song",
        tabName = "chord_scale_selection",
        startExpanded = TRUE,
        ui_set_chords_and_scales
      )
    )
  ),
  dashboardBody(
    tags$head(
      ui_head
    ),
    tags$body(
      ui_degree_colors,
      ui_notes_rows_controls,
      ui_notes_rows,
      box(width = 12,
        collapsible = TRUE, collapsed = FALSE,
        tags$script("
        $(function() {
          $('ul.dropdown-menu [data-toggle=dropdown]')
            .on('click', function(event) {
              event.preventDefault();
              event.stopPropagation();
              $(this).parent().siblings().removeClass('open');
              $(this).parent().toggleClass('open');
            });
        })")
      )
    )
  )
)

server <- function(input, output, session) {
  observeEvent(input$jazzStandards, {
    session$sendCustomMessage(
      type = "selectJazzStandard",
      message = input$jazzStandards
    )
  })

  observeEvent(input[["scale-root"]], {
    session$sendCustomMessage(
      type = "scale-root",
      message = input[["scale-root"]]
    )
  })
}

shinyApp(ui, server)
