const triggers =
  document.querySelectorAll(".nearby-trigger");

const panels =
  document.querySelectorAll(".place-panel");


function openPanel(panel) {

  panel.classList.add("open");

  panel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "panel-open"
  );

}


function closePanel(panel) {

  panel.classList.remove("open");

  panel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "panel-open"
  );

}


triggers.forEach((trigger) => {

  trigger.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

      const panel =
        document.getElementById(
          trigger.dataset.panel
        );

      if (panel) {
        openPanel(panel);
      }

    }
  );

});


panels.forEach((panel) => {

  const closeButton =
    panel.querySelector(
      ".panel-close"
    );

  const backdrop =
    panel.querySelector(
      ".panel-backdrop"
    );


  closeButton.addEventListener(
    "click",
    () => {
      closePanel(panel);
    }
  );


  backdrop.addEventListener(
    "click",
    () => {
      closePanel(panel);
    }
  );

});


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      const openPanelElement =
        document.querySelector(
          ".place-panel.open"
        );

      if (openPanelElement) {
        closePanel(
          openPanelElement
        );
      }

    }

  }
);


/* =========================================
   PLACES FILTERS
   ========================================= */

const filterButtons =
  document.querySelectorAll(".place-filter");

const placeCards =
  document.querySelectorAll(
    ".featured-place"
  );


filterButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const selectedFilter =
        button.dataset.filter;


      /* Active button */

      filterButtons.forEach(
        (filterButton) => {

          filterButton.classList.remove(
            "active"
          );

        }
      );

      button.classList.add(
        "active"
      );


      /* Filter cards */

      placeCards.forEach((card) => {

        const category =
          card.dataset.category;

        const hasFood =
          card.dataset.food === "true";


        let shouldShow = false;


        if (
          selectedFilter === "all"
        ) {

          shouldShow = true;

        }


        if (
          selectedFilter === "venues"
          &&
          category === "venues"
        ) {

          shouldShow = true;

        }


        if (
          selectedFilter === "food"
          &&
          hasFood
        ) {

          shouldShow = true;

        }


        if (
          selectedFilter === "other"
          &&
          category === "other"
        ) {

          shouldShow = true;

        }


        if (shouldShow) {

          card.style.display = "";

        } else {

          card.style.display = "none";

        }

      });

    }
  );

});
