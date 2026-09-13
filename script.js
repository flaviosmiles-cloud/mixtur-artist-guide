/* =========================================
   SLIDE-UP PANELS
   ========================================= */

const panelTriggers =
  document.querySelectorAll(
    ".nearby-trigger, .info-panel-trigger"
  );

const panels =
  document.querySelectorAll(
    ".place-panel"
  );


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
    panel.querySelector(
      ".panel-close"
    );

  const backdrop =
    panel.querySelector(
      ".panel-backdrop"
    );


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


        if (selectedFilter === "all") {
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


        card.style.display =
          shouldShow ? "" : "none";

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


mainMenu.className =
  "main-menu";

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
      aria-label="Main navigation"
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


    <div class="main-menu-section">

      <div class="main-menu-section-label">
        Discover
      </div>


      <button
        class="main-menu-small-link"
        type="button"
        data-editorial="welcome"
      >
        <span>
          Welcome
        </span>

        <span class="main-menu-arrow">
          →
        </span>
      </button>


      <button
        class="main-menu-small-link"
        type="button"
        data-editorial="mixtur"
      >
        <span>
          About Mixtur
        </span>

        <span class="main-menu-arrow">
          →
        </span>
      </button>

    </div>


    <div class="main-menu-section">

      <div class="main-menu-section-label">
        Quick access
      </div>


      <a
        class="main-menu-small-link"
        href="places.html#my-hotel"
      >
        <span>
          My hotel
        </span>

        <span class="main-menu-arrow">
          →
        </span>
      </a>


      <a
        class="main-menu-small-link"
        href="info.html#my-contact"
      >
        <span>
          My contact
        </span>

        <span class="main-menu-arrow">
          →
        </span>
      </a>


      <a
        class="main-menu-small-link"
        href="info.html#getting-around"
      >
        <span>
          Getting around
        </span>

        <span class="main-menu-arrow">
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



/* ACTIVE PAGE */

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
   EDITORIAL CONTENT
   ========================================= */

const editorialPanel =
  document.createElement("div");


editorialPanel.className =
  "editorial-panel";

editorialPanel.setAttribute(
  "aria-hidden",
  "true"
);


document.body.appendChild(
  editorialPanel
);


const editorialContent = {

  welcome: `

    <div class="editorial-panel-inner">

      <div class="editorial-panel-header">

        <button
          class="editorial-back"
          type="button"
        >
          ← Menu
        </button>

        <button
          class="editorial-close"
          type="button"
          aria-label="Close"
        >
          ×
        </button>

      </div>


      <div class="editorial-content">

        <div class="editorial-kicker">
          Mixtur · Barcelona
        </div>

        <h1 class="editorial-title">
          Welcome
        </h1>


        <p class="editorial-lead">
          We are very happy to welcome
          you to Barcelona for Mixtur.
        </p>


        <p class="editorial-copy">
          This Artist Guide has been
          prepared to accompany you
          throughout your stay and bring
          together everything you may
          need during the festival:
          your schedule, venues, travel
          information and the people
          you may need to contact.
        </p>


        <p class="editorial-copy">
          We hope you enjoy the festival,
          the music, the encounters and
          your time in Barcelona.
        </p>


        <div class="editorial-signature">
          — Mixtur
        </div>

      </div>

    </div>

  `,


  mixtur: `

    <div class="editorial-panel-inner">

      <div class="editorial-panel-header">

        <button
          class="editorial-back"
          type="button"
        >
          ← Menu
        </button>

        <button
          class="editorial-close"
          type="button"
          aria-label="Close"
        >
          ×
        </button>

      </div>


      <div class="editorial-content">

        <div class="editorial-kicker">
          About the festival
        </div>

        <h1 class="editorial-title">
          Mixtur
        </h1>


        <div class="mixtur-statement">

          <span>
            Contemporary
          </span>

          <span>
            Sound Creation
          </span>

          <span>
            Barcelona
          </span>

        </div>


        <p class="editorial-lead">
          At its core is new creation:
          bringing composers, performers
          and artists together to develop,
          explore and present new work.
        </p>


        <p class="editorial-copy">
          Mixtur is a festival dedicated
          to contemporary sound creation
          and a meeting point for the
          international contemporary
          music community.
        </p>


        <p class="editorial-copy">
          Through concerts, commissions,
          workshops, calls for scores and
          educational projects, Mixtur
          creates a space for
          experimentation, exchange and
          discovery between emerging and
          established artists.
        </p>


        <div class="mixtur-keywords">

          <span>
            Compose
          </span>

          <span>
            Create
          </span>

          <span>
            Perform
          </span>

          <span>
            Exchange
          </span>

        </div>


        <a
          href="https://mixturbcn.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="editorial-web-link"
        >
          <span>
            Visit Mixtur
          </span>

          <span>
            ↗
          </span>
        </a>

      </div>

    </div>

  `

};



/* =========================================
   OPEN / CLOSE MAIN MENU
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



/* =========================================
   EDITORIAL PANELS
   ========================================= */

const editorialTriggers =
  mainMenu.querySelectorAll(
    "[data-editorial]"
  );


function openEditorial(
  editorialName
) {

  const content =
    editorialContent[
      editorialName
    ];


  if (!content) {
    return;
  }


  editorialPanel.innerHTML =
    content;


  editorialPanel.classList.add(
    "open"
  );


  editorialPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  const backButton =
    editorialPanel.querySelector(
      ".editorial-back"
    );


  const closeButton =
    editorialPanel.querySelector(
      ".editorial-close"
    );


  if (backButton) {

    backButton.addEventListener(
      "click",
      closeEditorial
    );

  }


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      () => {

        closeEditorial();
        closeMainMenu();

      }
    );

  }

}


function closeEditorial() {

  editorialPanel.classList.remove(
    "open"
  );

  editorialPanel.setAttribute(
    "aria-hidden",
    "true"
  );

}


editorialTriggers.forEach(
  (trigger) => {

    trigger.addEventListener(
      "click",
      () => {

        openEditorial(
          trigger.dataset.editorial
        );

      }
    );

  }
);



/* =========================================
   ESCAPE KEY
   ========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }


    if (
      editorialPanel.classList.contains(
        "open"
      )
    ) {

      closeEditorial();
      return;

    }


    const openPlacePanel =
      document.querySelector(
        ".place-panel.open"
      );


    if (openPlacePanel) {

      closePanel(
        openPlacePanel
      );

      return;

    }


    if (
      mainMenu.classList.contains(
        "open"
      )
    ) {

      closeMainMenu();

    }

  }
);



/* =========================================
   QUICK ACCESS
   ========================================= */

function handleQuickAccess() {

  const hash =
    window.location.hash;


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

      infoSections.forEach(
        (section) => {

          section.classList.remove(
            "open"
          );

        }
      );


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


  if (
    hash === "#getting-around"
  ) {

    const practicalSection =
      document.querySelector(
        ".info-section"
      );


    if (practicalSection) {

      infoSections.forEach(
        (section) => {

          section.classList.remove(
            "open"
          );

        }
      );


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
