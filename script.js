/* =========================================
   SLIDE-UP PANELS
   ========================================= */

const panelTriggers =
  document.querySelectorAll(
    ".nearby-trigger, .info-panel-trigger"
  );

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


panelTriggers.forEach((trigger) => {

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
    panel.querySelector(".panel-close");

  const backdrop =
    panel.querySelector(".panel-backdrop");


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      () => {
        closePanel(panel);
      }
    );

  }


  if (backdrop) {

    backdrop.addEventListener(
      "click",
      () => {
        closePanel(panel);
      }
    );

  }

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
  document.querySelectorAll(
    ".place-filter"
  );

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



/* =========================================
   INFO ACCORDION
   ========================================= */

const infoSections =
  document.querySelectorAll(
    ".info-section"
  );


infoSections.forEach((section) => {

  const toggle =
    section.querySelector(
      ".info-toggle"
    );


  if (!toggle) {
    return;
  }


  toggle.addEventListener(
    "click",
    () => {

      const isOpen =
        section.classList.contains(
          "open"
        );


      infoSections.forEach(
        (otherSection) => {

          otherSection.classList.remove(
            "open"
          );


          const otherToggle =
            otherSection.querySelector(
              ".info-toggle"
            );


          if (otherToggle) {

            otherToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }
      );


      if (!isOpen) {

        section.classList.add(
          "open"
        );

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    }
  );

});
