function fillScalesDropdown() {
  fillNestedDropdown(
    "scalesIntervals", "#scales"
  )
}

function fillChordsDropdown() {
  fillNestedDropdown(
    "chordsIntervals", "#chords"
  )
}

function fillNestedDropdown(jsonName, id) {
  Object.keys(window[jsonName]).forEach(
    key => {
      const subMenu = document.createElement("li");
      subMenu.classList.add("dropdown");
      subMenu.classList.add("dropdown-submenu");

      const subMenuTitle = document.createElement("span");
      subMenuTitle.className = "dropdown-toggle";
      subMenuTitle.dataset.toggle = "dropdown";
      subMenuTitle.innerHTML = key + '<b class="caret"></b>';
      subMenu.appendChild(subMenuTitle);

      const subMenuItemsContainer  = document.createElement("ul");
      subMenuItemsContainer.className = "dropdown-menu";

      Object.keys(window[jsonName][key]).forEach(
        subMenuItem => {
          const item = document.createElement("li");
          item.innerText = 
            subMenuItem.charAt(0).toUpperCase() + subMenuItem.slice(1);
          
          subMenuItemsContainer.appendChild(item);
        }
      );

      subMenu.appendChild(subMenuItemsContainer);
      document.querySelector(id + " + ul.dropdown-menu")
        .appendChild(subMenu);
    }
  )

}
