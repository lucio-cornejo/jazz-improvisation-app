$(function () {
  document.addEventListener(
    "click",
    () => Shiny.setInputValue("pitchOffsets", []),
    { once: true }
  );
});
