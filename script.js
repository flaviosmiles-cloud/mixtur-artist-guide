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

/* =========================================
   MAIN MENU
   ========================================= */

const currentPage =
  window.location.pathname
    .split("/")
    .pop() || "index.html";


const mainMenu =
  document.createElement("div");


mainMenu.className = "main-menu";

mainMenu.setAttribute(
  "aria-hidden",
  "true"
);


mainMenu.innerHTML = `

  <div class="main-menu-inner">


    <div class="main-menu-header">

      <img
        src="logo-mixtur.png"
        alt="Mixtur"
        class="main-menu-logo"
      >


      <button
        class="main-menu-close"
        type="button"
        aria-label="Close menu"
      >
        ×
      </button>

    </div>


    <div class="main-menu-meta">

      <div class="main-menu-eyebrow">
        Artist Guide
      </div>

      <div class="main-menu-city">
        Barcelona · Mixtur
      </div>

    </div>



    <nav
      class="main-menu-nav"
      aria-label="Menu navigation"
    >

      <a
        href="index.html"
        data-page="index.html"
      >

        <span class="main-menu-nav-title">
          Today
        </span>

        <span class="main-menu-nav-number">
          01
        </span>

      </a>


      <a
        href="schedule.html"
        data-page="schedule.html"
      >

        <span class="main-menu-nav-title">
          Schedule
        </span>

        <span class="main-menu-nav-number">
          02
        </span>

      </a>


      <a
        href="places.html"
        data-page="places.html"
      >

        <span class="main-menu-nav-title">
          Places
        </span>

        <span class="main-menu-nav-number">
          03
        </span>

      </a>


      <a
        href="info.html"
        data-page="info.html"
      >

        <span class="main-menu-nav-title">
          Info
        </span>

        <span class="main-menu-nav-number">
          04
        </span>

      </a>

    </nav>



    <div class="main-menu-quick">

      <div class="main-menu-section-label">
        Quick access
      </div>


      <a href="places.html#my-hotel">

        <span>
          My hotel
        </span>

        <span class="main-menu-quick-arrow">
          →
        </span>

      </a>


      <a href="info.html#my-contact">

        <span>
          My contact
        </span>

        <span class="main-menu-quick-arrow">
          →
        </span>

      </a>


      <a href="info.html#getting-around">

        <span>
          Getting around
        </span>

        <span class="main-menu-quick-arrow">
          →
        </span>

      </a>

    </div>



    <div class="main-menu-footer">

      <a
        href="https://mixturbcn.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="main-menu-external"
      >

        <span>
          Mixtur Festival
        </span>

        <span>
          ↗
        </span>

      </a>

    </div>


  </div>

`;


document.body.appendChild(
  mainMenu
);



/* =========================================
   ACTIVE MENU PAGE
   ========================================= */

const menuPageLinks =
  mainMenu.querySelectorAll(
    "[data-page]"
  );


menuPageLinks.forEach((link) => {

  if (
    link.dataset.page === currentPage
  ) {

    link.classList.add(
      "active"
    );

  }

});



/* =========================================
   OPEN / CLOSE MENU
   ========================================= */

const menuButtons =
  document.querySelectorAll(
    ".menu-button"
  );

const menuClose =
  mainMenu.querySelector(
    ".main-menu-close"
  );


function openMainMenu() {

  mainMenu.classList.add(
    "open"
  );

  mainMenu.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "menu-open"
  );

}


function closeMainMenu() {

  mainMenu.classList.remove(
    "open"
  );

  mainMenu.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "menu-open"
  );

}


menuButtons.forEach((button) => {

  button.addEventListener(
    "click",
    openMainMenu
  );

});


menuClose.addEventListener(
  "click",
  closeMainMenu
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
      &&
      mainMenu.classList.contains(
        "open"
      )
    ) {

      closeMainMenu();

    }

  }
);



/* =========================================
   QUICK ACCESS TARGETS
   ========================================= */

function handleQuickAccess() {

  const hash =
    window.location.hash;


  /* MY HOTEL */

  if (
    hash === "#my-hotel"
  ) {

    const hotel =
      document.querySelector(
        ".featured-place"
      );


    if (hotel) {

      setTimeout(() => {

        hotel.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 200);

    }

  }


  /* MY CONTACT */

  if (
    hash === "#my-contact"
  ) {

    const sections =
      document.querySelectorAll(
        ".info-section"
      );

    const contactSection =
      sections[2];


    if (contactSection) {

      contactSection.classList.add(
        "open"
      );


      const toggle =
        contactSection.querySelector(
          ".info-toggle"
        );


      if (toggle) {

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

      }


      setTimeout(() => {

        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 200);

    }

  }


  /* GETTING AROUND */

  if (
    hash === "#getting-around"
  ) {

    const practicalSection =
      document.querySelector(
        ".info-section"
      );


    if (practicalSection) {

      practicalSection.classList.add(
        "open"
      );


      const toggle =
        practicalSection.querySelector(
          ".info-toggle"
        );


      if (toggle) {

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

      }


      setTimeout(() => {

        practicalSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 200);

    }

  }

}


handleQuickAccess();
