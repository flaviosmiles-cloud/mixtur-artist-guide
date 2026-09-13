document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".admin-add-button");
  const scheduleSection = addButton?.closest(".admin-section");
  const firstActivity = scheduleSection?.querySelector(".admin-activity");
  const generateButton = document.querySelector(".admin-generate-button");

  const previewSection = document.getElementById("artist-preview");
  const previewArtistName = document.getElementById("preview-artist-name");
  const previewArtistSlug = document.getElementById("preview-artist-slug");
  const previewJSON = document.getElementById("preview-json");

  if (!addButton || !scheduleSection || !firstActivity) {
    return;
  }

  const venueOptions = `
    <option>Fabra i Coats</option>
    <option>ESMUC</option>
    <option>PHONOS</option>
    <option>Museu de la Música</option>
    <option>TDM</option>
    <option>CMMB</option>
    <option>Santa Mònica</option>
    <option>L'Auditori</option>
    <option>Espai Bota</option>
    <option>ALMO2BAR</option>
    <option>Other</option>
  `;

  function slugify(text) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getFieldByLabel(section, labelText) {
    if (!section) return null;

    const fields = Array.from(
      section.querySelectorAll(".admin-field")
    );

    const field = fields.find((item) => {
      const label = item.querySelector(":scope > span");

      return (
        label &&
        label.textContent.trim().toLowerCase() ===
          labelText.toLowerCase()
      );
    });

    if (!field) return null;

    return field.querySelector("input, textarea, select");
  }

  function getSectionByTitle(title) {
    const sections = Array.from(
      document.querySelectorAll(".admin-section")
    );

    return sections.find((section) => {
      const heading = section.querySelector(
        ".admin-section-heading h2"
      );

      return (
        heading &&
        heading.textContent.trim().toLowerCase() ===
          title.toLowerCase()
      );
    });
  }

  function getActivityType(activity) {
    const typeField = getFieldByLabel(activity, "Type");

    return typeField?.value || "Rehearsal";
  }

  function buildExtraFields(type) {
    if (
      type === "Rehearsal" ||
      type === "Performance" ||
      type === "Reading Session"
    ) {
      return `
        <label class="admin-field">
          <span>Venue</span>

          <select class="activity-venue">
            ${venueOptions}
          </select>
        </label>

        <label class="admin-field">
          <span>Room / Space</span>

          <input
            class="activity-room"
            type="text"
            placeholder="Sala / room"
          >
        </label>

        <label class="admin-field">
          <span>Call time</span>

          <input
            class="activity-call-time"
            type="time"
          >
        </label>
      `;
    }

    if (type === "Hotel") {
      return `
        <label class="admin-field">
          <span>Hotel</span>

          <input
            class="activity-hotel"
            type="text"
            placeholder="Hotel name"
          >
        </label>
      `;
    }

    if (type === "Meal") {
      return `
        <label class="admin-field">
          <span>Place / Restaurant</span>

          <input
            class="activity-place"
            type="text"
            placeholder="Restaurant or meeting point"
          >
        </label>
      `;
    }

    if (type === "Travel") {
      return `
        <label class="admin-field">
          <span>From</span>

          <input
            class="activity-from"
            type="text"
            placeholder="Barcelona Airport"
          >
        </label>

        <label class="admin-field">
          <span>To</span>

          <input
            class="activity-to"
            type="text"
            placeholder="Hotel"
          >
        </label>

        <label class="admin-field">
          <span>Transport</span>

          <input
            class="activity-transport"
            type="text"
            placeholder="Taxi, transfer, train..."
          >
        </label>
      `;
    }

    return `
      <label class="admin-field">
        <span>Place</span>

        <input
          class="activity-place"
          type="text"
          placeholder="Venue, meeting point or location"
        >
      </label>
    `;
  }

  function updateActivityFields(activity) {
    const type = getActivityType(activity);

    const typeLabel = activity.querySelector(
      ".admin-activity-top span:nth-child(2)"
    );

    if (typeLabel) {
      typeLabel.textContent = type;
    }

    const dynamicFields = activity.querySelector(
      ".admin-dynamic-fields"
    );

    if (dynamicFields) {
      dynamicFields.innerHTML = buildExtraFields(type);
    }
  }

  function addRemoveButton(activity) {
    const top = activity.querySelector(".admin-activity-top");

    if (!top) {
      return;
    }

    let removeButton = activity.querySelector(
      ".admin-remove-activity"
    );

    if (!removeButton) {
      removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.className = "admin-remove-activity";
      removeButton.setAttribute(
        "aria-label",
        "Remove activity"
      );

      removeButton.textContent = "Remove";

      top.appendChild(removeButton);
    }

    removeButton.addEventListener("click", () => {
      const activities = scheduleSection.querySelectorAll(
        ".admin-activity"
      );

      if (activities.length <= 1) {
        return;
      }

      activity.remove();

      updateActivityNumbers();
    });
  }

  function updateActivityNumbers() {
    const activities = scheduleSection.querySelectorAll(
      ".admin-activity"
    );

    activities.forEach((activity, index) => {
      const numberLabel = activity.querySelector(
        ".admin-activity-top span:first-child"
      );

      if (numberLabel) {
        numberLabel.textContent =
          `Activity ${String(index + 1).padStart(2, "0")}`;
      }

      const removeButton = activity.querySelector(
        ".admin-remove-activity"
      );

      if (removeButton) {
        removeButton.hidden =
          activities.length === 1;
      }
    });
  }

  function prepareActivity(activity) {
    let dynamicFields = activity.querySelector(
      ".admin-dynamic-fields"
    );

    if (!dynamicFields) {
      dynamicFields = document.createElement("div");

      dynamicFields.className =
        "admin-fields admin-dynamic-fields";

      const notesField = Array.from(
        activity.querySelectorAll(".admin-field")
      ).find((field) =>
        field.textContent.trim().startsWith("Notes")
      );

      const venueField = Array.from(
        activity.querySelectorAll(".admin-field")
      ).find((field) =>
        field.textContent.trim().startsWith("Venue")
      );

      const roomField = Array.from(
        activity.querySelectorAll(".admin-field")
      ).find((field) =>
        field.textContent.trim().startsWith("Room")
      );

      const callTimeField = Array.from(
        activity.querySelectorAll(".admin-field")
      ).find((field) =>
        field.textContent.trim().startsWith("Call time")
      );

      venueField?.remove();
      roomField?.remove();
      callTimeField?.remove();

      if (notesField) {
        notesField.parentElement.insertBefore(
          dynamicFields,
          notesField
        );
      } else {
        activity.appendChild(dynamicFields);
      }
    }

    updateActivityFields(activity);
    addRemoveButton(activity);
  }

  function resetActivityFields(activity) {
    const fields = activity.querySelectorAll(
      "input, textarea, select"
    );

    fields.forEach((field) => {
      if (field.tagName === "SELECT") {
        field.selectedIndex = 0;
      } else {
        field.value = "";
      }
    });
  }

  function getActivityData(activity) {
    const type = getActivityType(activity);

    const data = {
      date: getFieldByLabel(activity, "Date")?.value || "",
      time: getFieldByLabel(activity, "Time")?.value || "",
      type,
      title: getFieldByLabel(activity, "Title")?.value || "",
      notes: getFieldByLabel(activity, "Notes")?.value || ""
    };

    if (
      type === "Rehearsal" ||
      type === "Performance" ||
      type === "Reading Session"
    ) {
      data.venue =
        getFieldByLabel(activity, "Venue")?.value || "";

      data.room =
        getFieldByLabel(activity, "Room / Space")?.value || "";

      data.callTime =
        getFieldByLabel(activity, "Call time")?.value || "";
    }

    if (type === "Hotel") {
      data.hotel =
        getFieldByLabel(activity, "Hotel")?.value || "";
    }

    if (type === "Meal") {
      data.place =
        getFieldByLabel(activity, "Place / Restaurant")?.value || "";
    }

    if (type === "Travel") {
      data.from =
        getFieldByLabel(activity, "From")?.value || "";

      data.to =
        getFieldByLabel(activity, "To")?.value || "";

      data.transport =
        getFieldByLabel(activity, "Transport")?.value || "";
    }

    if (type === "Other") {
      data.place =
        getFieldByLabel(activity, "Place")?.value || "";
    }

    return data;
  }

  function generateArtistData() {
    const artistSection = getSectionByTitle("Artist");
    const staySection = getSectionByTitle("Stay");
    const hotelSection = getSectionByTitle("Hotel");
    const contactSection = getSectionByTitle("Main contact");

    const artistName =
      getFieldByLabel(artistSection, "Artist name")?.value.trim() || "";

    const slug = slugify(artistName || "artist");

    const activities = Array.from(
      scheduleSection.querySelectorAll(".admin-activity")
    ).map(getActivityData);

    const artistData = {
      id: slug,

      artist: {
        name: artistName,

        category:
          getFieldByLabel(
            artistSection,
            "Artist / Ensemble"
          )?.value.trim() || "",

        email:
          getFieldByLabel(
            artistSection,
            "Email"
          )?.value.trim() || ""
      },

      stay: {
        arrivalDate:
          getFieldByLabel(
            staySection,
            "Arrival date"
          )?.value || "",

        arrivalTime:
          getFieldByLabel(
            staySection,
            "Arrival time"
          )?.value || "",

        arrivalPlace:
          getFieldByLabel(
            staySection,
            "Arrival place"
          )?.value.trim() || "",

        departureDate:
          getFieldByLabel(
            staySection,
            "Departure date"
          )?.value || "",

        departureTime:
          getFieldByLabel(
            staySection,
            "Departure time"
          )?.value || "",

        departurePlace:
          getFieldByLabel(
            staySection,
            "Departure place"
          )?.value.trim() || ""
      },

      hotel: {
        name:
          getFieldByLabel(
            hotelSection,
            "Hotel name"
          )?.value.trim() || "",

        address:
          getFieldByLabel(
            hotelSection,
            "Address"
          )?.value.trim() || "",

        checkIn:
          getFieldByLabel(
            hotelSection,
            "Check-in"
          )?.value || "",

        checkOut:
          getFieldByLabel(
            hotelSection,
            "Check-out"
          )?.value || ""
      },

      mainContact: {
        name:
          getFieldByLabel(
            contactSection,
            "Assigned contact"
          )?.value || "",

        role:
          getFieldByLabel(
            contactSection,
            "Role"
          )?.value.trim() || ""
      },

      schedule: activities
    };

    return artistData;
  }

  prepareActivity(firstActivity);
  updateActivityNumbers();

  addButton.addEventListener("click", () => {
    const newActivity = firstActivity.cloneNode(true);

    resetActivityFields(newActivity);

    const oldRemoveButton = newActivity.querySelector(
      ".admin-remove-activity"
    );

    oldRemoveButton?.remove();

    prepareActivity(newActivity);

    scheduleSection.insertBefore(
      newActivity,
      addButton
    );

    updateActivityNumbers();

    newActivity.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  scheduleSection.addEventListener(
    "change",
    (event) => {
      const activity = event.target.closest(
        ".admin-activity"
      );

      if (!activity) {
        return;
      }

      const typeField = getFieldByLabel(
        activity,
        "Type"
      );

      if (event.target === typeField) {
        updateActivityFields(activity);
      }
    }
  );

  generateButton?.addEventListener("click", () => {
    const artistData = generateArtistData();

    if (previewArtistName) {
      previewArtistName.textContent =
        artistData.artist.name || "Unnamed artist";
    }

    if (previewArtistSlug) {
      previewArtistSlug.textContent =
        artistData.id;
    }

    if (previewJSON) {
      previewJSON.textContent =
        JSON.stringify(
          artistData,
          null,
          2
        );
    }

    if (previewSection) {
      previewSection.hidden = false;

      previewSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
