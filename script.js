/* =========================================
   ARTIST DATA TEST
   ========================================= */

(async function loadArtistDataTest() {
  const params = new URLSearchParams(
    window.location.search
  );

  const artistId =
    params.get("artist");

  if (!artistId) {
    console.log(
      "Mixtur Artist Guide: no artist selected."
    );

    return;
  }

  try {
    const response = await fetch(
      `artists/${encodeURIComponent(
        artistId
      )}.json`
    );

    if (!response.ok) {
      throw new Error(
        `Artist file not found: ${response.status}`
      );
    }

    const artistData =
      await response.json();

    console.log(
      "Mixtur Artist Guide: artist loaded successfully"
    );

    console.log(
      artistData
    );

    window.mixturArtistData =
      artistData;

           const welcomeTitle =
        document.querySelector(".welcome");
      
      if (
        welcomeTitle &&
        artistData.artist?.name
      ) {
        welcomeTitle.textContent =
          `WELCOME, ${artistData.artist.name}`;
      }

  } catch (error) {
    console.error(
      "Mixtur Artist Guide: could not load artist",
      error
    );
  }
})();

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SLIDE-UP PANELS
     ========================================= */

  const panelTriggers = document.querySelectorAll(
    ".nearby-trigger, .info-panel-trigger"
  );

  const panels = document.querySelectorAll(".place-panel");

  function openPanel(panel) {
    if (!panel) return;

    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");

    document.body.classList.add("panel-open");
  }

  function closePanel(panel) {
    if (!panel) return;

    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");

    document.body.classList.remove("panel-open");
  }

  panelTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panelId = trigger.dataset.panel;

      if (!panelId) return;

      const panel = document.getElementById(panelId);

      openPanel(panel);
    });

    trigger.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();

        const panelId = trigger.dataset.panel;

        if (!panelId) return;

        const panel = document.getElementById(panelId);

        openPanel(panel);
      }
    });
  });

  panels.forEach((panel) => {
    const backdrop =
      panel.querySelector(".panel-backdrop");

    const closeButton =
      panel.querySelector(".panel-close");

    backdrop?.addEventListener("click", () => {
      closePanel(panel);
    });

    closeButton?.addEventListener("click", () => {
      closePanel(panel);
    });
  });


  /* =========================================
     PLACES FILTERS
     ========================================= */

  const filterButtons =
    document.querySelectorAll(".filter-button");

  const placeCards =
    document.querySelectorAll(".place-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      placeCards.forEach((card) => {
        const category =
          card.dataset.category;

        const hasFood =
          card.dataset.food === "true";

        let visible = false;

        if (filter === "all") {
          visible = true;
        }

        if (filter === "venues") {
          visible =
            category === "venues";
        }

        if (filter === "food") {
          visible = hasFood;
        }

        if (filter === "other") {
          visible =
            category === "other";
        }

        card.style.display =
          visible ? "" : "none";
      });
    });
  });


  /* =========================================
     INFO ACCORDION
     ========================================= */

  const infoSections =
    document.querySelectorAll(".info-section");

  infoSections.forEach((section) => {
    const button =
      section.querySelector(".info-section-toggle");

    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen =
        section.classList.contains("open");

      infoSections.forEach((item) => {
        item.classList.remove("open");

        const itemButton =
          item.querySelector(".info-section-toggle");

        itemButton?.setAttribute(
          "aria-expanded",
          "false"
        );
      });

      if (!isOpen) {
        section.classList.add("open");

        button.setAttribute(
          "aria-expanded",
          "true"
        );
      }
    });
  });


  /* =========================================
     MAIN MENU
     ========================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() || "index.html";

  const menuHTML = `
    <div
      class="main-menu"
      aria-hidden="true"
    >

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
          Artist Guide · Barcelona
        </div>


        <nav
          class="main-menu-primary"
          aria-label="Main navigation"
        >

          <a
            href="index.html"
            data-page="index.html"
          >
            Today
          </a>

          <a
            href="schedule.html"
            data-page="schedule.html"
          >
            Schedule
          </a>

          <a
            href="places.html"
            data-page="places.html"
          >
            Places
          </a>

          <a
            href="info.html"
            data-page="info.html"
          >
            Info
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
            Welcome →
          </button>

          <button
            class="main-menu-small-link"
            type="button"
            data-editorial="mixtur"
          >
            About Mixtur →
          </button>

        </div>


        <div class="main-menu-section">

          <div class="main-menu-section-label">
            Quick Access
          </div>

          <a
            class="main-menu-small-link"
            href="places.html#my-hotel"
          >
            My Hotel →
          </a>

          <a
            class="main-menu-small-link"
            href="info.html#my-contact"
          >
            My Contact →
          </a>

          <a
            class="main-menu-small-link"
            href="info.html#getting-around"
          >
            Getting Around →
          </a>

        </div>


        <div class="main-menu-footer">

          <a
            href="https://mixturbcn.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mixtur Festival ↗
          </a>

        </div>

      </div>

    </div>
  `;

  document.body.insertAdjacentHTML(
    "beforeend",
    menuHTML
  );

  const mainMenu =
    document.querySelector(".main-menu");

  const menuButtons =
    document.querySelectorAll(".menu-button");

  const menuClose =
    document.querySelector(".main-menu-close");

  const menuLinks =
    document.querySelectorAll(
      ".main-menu-primary a"
    );

  menuLinks.forEach((link) => {
    if (
      link.dataset.page === currentPage
    ) {
      link.classList.add("active");
    }
  });

  function openMenu() {
    if (!mainMenu) return;

    mainMenu.classList.add("open");

    mainMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "menu-open"
    );
  }

  function closeMenu() {
    if (!mainMenu) return;

    mainMenu.classList.remove("open");

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
      openMenu
    );
  });

  menuClose?.addEventListener(
    "click",
    closeMenu
  );


  /* =========================================
     EDITORIAL PANELS
     ========================================= */

  const editorialHTML = `
    <div
      class="editorial-panel"
      aria-hidden="true"
    >

      <div class="editorial-panel-inner">

        <div class="editorial-panel-header">

          <button
            class="editorial-back"
            type="button"
          >
            ← Back
          </button>

          <button
            class="editorial-close"
            type="button"
            aria-label="Close"
          >
            ×
          </button>

        </div>


        <div
          class="editorial-content"
          data-editorial-content="welcome"
        >

          <div class="editorial-label">
            Welcome
          </div>

          <h1 class="editorial-title">
            Welcome<br>
            to Mixtur
          </h1>

          <p class="editorial-lead">
            We are very happy to welcome
            you to Barcelona for Mixtur.
          </p>

          <div class="editorial-copy">

            <p>
              This Artist Guide has been
              prepared to accompany you
              throughout your stay and bring
              together everything you may
              need during the festival:
              your schedule, venues, travel
              information and the people you
              may need to contact.
            </p>

            <p>
              We hope you enjoy the festival,
              the music, the encounters and
              your time in Barcelona.
            </p>

          </div>

          <div class="editorial-signature">
            — Mixtur
          </div>

        </div>


        <div
          class="editorial-content"
          data-editorial-content="mixtur"
          hidden
        >

          <div class="editorial-label">
            About Mixtur
          </div>

          <h1 class="editorial-title">
            New creation<br>
            at the centre
          </h1>

          <p class="editorial-lead">
            Mixtur is a festival for
            contemporary sound creation
            based in Barcelona.
          </p>

          <div class="editorial-copy">

            <p>
              At its core is
              <strong>new creation</strong>:
              bringing composers, performers
              and artists together to develop,
              explore and present new work.
            </p>

            <p>
              Through concerts, commissions,
              workshops, calls for scores and
              educational projects, Mixtur
              creates a space for
              experimentation, exchange and
              discovery between emerging and
              established artists.
            </p>

            <p>
              More than a festival, Mixtur
              is a meeting point for the
              international contemporary
              music community.
            </p>

          </div>


          <div class="editorial-keywords">

            <span>
              Creation
            </span>

            <span>
              Experimentation
            </span>

            <span>
              Exchange
            </span>

          </div>


          <a
            class="editorial-web-link"
            href="https://mixturbcn.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Mixtur Festival ↗
          </a>

        </div>

      </div>

    </div>
  `;

  document.body.insertAdjacentHTML(
    "beforeend",
    editorialHTML
  );

  const editorialPanel =
    document.querySelector(
      ".editorial-panel"
    );

  const editorialTriggers =
    document.querySelectorAll(
      "[data-editorial]"
    );

  const editorialContents =
    document.querySelectorAll(
      "[data-editorial-content]"
    );

  const editorialBack =
    document.querySelector(
      ".editorial-back"
    );

  const editorialClose =
    document.querySelector(
      ".editorial-close"
    );

  function openEditorial(name) {
    if (!editorialPanel) return;

    editorialContents.forEach(
      (content) => {
        content.hidden =
          content.dataset.editorialContent !==
          name;
      }
    );

    closeMenu();

    editorialPanel.classList.add(
      "open"
    );

    editorialPanel.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "editorial-open"
    );

    editorialPanel.scrollTop = 0;
  }

  function closeEditorial() {
    if (!editorialPanel) return;

    editorialPanel.classList.remove(
      "open"
    );

    editorialPanel.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "editorial-open"
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

  editorialBack?.addEventListener(
    "click",
    () => {
      closeEditorial();
      openMenu();
    }
  );

  editorialClose?.addEventListener(
    "click",
    closeEditorial
  );


  /* =========================================
     QUICK ACCESS
     ========================================= */

  function openInfoSection(section) {
    if (!section) return;

    infoSections.forEach((item) => {
      item.classList.remove("open");

      const button =
        item.querySelector(
          ".info-section-toggle"
        );

      button?.setAttribute(
        "aria-expanded",
        "false"
      );
    });

    section.classList.add("open");

    const button =
      section.querySelector(
        ".info-section-toggle"
      );

    button?.setAttribute(
      "aria-expanded",
      "true"
    );

    setTimeout(() => {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }

  function handleQuickAccess() {
    const hash =
      window.location.hash;

    if (
      currentPage === "places.html" &&
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
        }, 100);
      }
    }

    if (
      currentPage === "info.html" &&
      hash === "#my-contact"
    ) {
      const sections =
        document.querySelectorAll(
          ".info-section"
        );

      if (sections[2]) {
        openInfoSection(
          sections[2]
        );
      }
    }

    if (
      currentPage === "info.html" &&
      hash === "#getting-around"
    ) {
      const sections =
        document.querySelectorAll(
          ".info-section"
        );

      if (sections[0]) {
        openInfoSection(
          sections[0]
        );
      }
    }
  }

  handleQuickAccess();


  /* =========================================
     ESCAPE KEY
     ========================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") {
        return;
      }

      panels.forEach((panel) => {
        if (
          panel.classList.contains("open")
        ) {
          closePanel(panel);
        }
      });

      if (
        editorialPanel?.classList.contains(
          "open"
        )
      ) {
        closeEditorial();
        return;
      }

      if (
        mainMenu?.classList.contains(
          "open"
        )
      ) {
        closeMenu();
      }
    }
  );

});
