+ Amount of unique songs in scraped data base,
that is, ignoring the musician in the song title:

```r
jsonlite::fromJSON("./data/web-scraped-chord-progressions.json") |>
  names() |>
  stringr::str_split(" - ") |>
  purrr::map(~ .x[1]) |>
  purrr::map(~ gsub('\\(', '', .x)) |>
  purrr::map(~ gsub('\\)', '', .x)) |>
  purrr::map(~ gsub('[[:digit:]]+', '', .x)) |>
  purrr::map(~ gsub(' ', '', .x)) |>
  unlist() |> unique() |> length()
```

+ Amount of songs in scraped data base which
have "N" as a chord, due to "NC" conversion error:

```js
let counter = 0;

for (const song of Object.keys(scrapedProgressions)) {
  for (const key of Object.keys(scrapedProgressions[song])) {
    if (key.slice(0, 7) === "chords-") {
      if (scrapedProgressions[song][key].includes("N")) {
        counter += 1;
        break;
      }
    }
  }
}
counter
```
