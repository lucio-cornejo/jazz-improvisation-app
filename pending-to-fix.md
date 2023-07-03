# Pending to fix

## Issues when exporting jazz standards scraped data

1. The relevant JSON file seems to have issue when
the jazz standard chord progression included a 
"NC" (no chord) element.

* Sometimes, a "chord-n" key in **scrapedProgressions**
includes a string instead of an array.  
    *Solution:* 
        Converted such strings into single element arrays.

1. Jazz Standards (in dataset) with wrong chord progressions:
    - "26-2 - John Coltrane"

## Rows of notes

* When the container of rows of notes has vertical scrolling,
whenever the screen makes sure to show the highlited (in black)
note, it sometimes leaves the row of notes **playing** as
the last one (furthest down its scrollable cotainer) of the rows
visible. 
This makes the app kinda useless, because the current
and next (if it exists) rows of notes should 
**always be visible to the user**. 
That ideal scenario helps the user connect melodies when playing
over chord (and scale) changes.
  *Solution:*
      Changed use of `notePlaying.scrollIntoViewIfNeeded()`
      to `notePlaying.scrollIntoView( {block: "center"} )` .

## Chords for the progression in `window.musicData` 

1. For every row of notes, the notes in its respective scale
**should** include the notes in its respective chord.
Therefore, create a function that inserts (if needed) the notes
in the progression's chords, to its respective scales.
This will be very useful for when the user selects a 
web scraped jazz standard progression.

# Strudel Version: Needs fixing

## Strudel

- Load the samples when the document is ready,
instead of when the play buttons is clicked for
the first time. 
This due to sometimes Strudel not producing sound
after the initial play button was clicked, due to
the samples having not finished loading.

### Important

- Fix that, after clicking play,
the row of notes wich class "playing"
is always visible.
