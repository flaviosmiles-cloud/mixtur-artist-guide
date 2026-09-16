document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     CONTACTS
     ========================================= */

  const MIXTUR_CONTACTS = {
    "Susana Bautista": {
      name: "Susana Bautista",
      role: "Production Manager",
      email: "susana.bautista@mixturbcn.com",
      phone: "+34654752209"
    },

    "Ánxe Faraldo": {
      name: "Ánxe Faraldo",
      role: "Technical Manager",
      email: "anxefaraldo@gmail.com",
      phone: "+34617456373"
    },

    "Jaume Cortacans": {
      name: "Jaume Cortacans",
      role: "Production Coordinator",
      email: "produccio@mixturbcn.com",
      phone: "+34600608016"
    },

    "Catalina Riutort": {
      name: "Catalina Riutort",
      role: "Production Assistant",
      email: "produccio@mixturbcn.com",
      phone: "+34680266911"
    },

    "Flavio de Sa": {
      name: "Flavio de Sa",
      role: "Production Assistant",
      email: "produccio@mixturbcn.com",
      phone: "+34689211975"
    }
  };


  /* =========================================
     DOM
     ========================================= */

  const addButton =
    document.querySelector(".admin-add-button");

  const scheduleSection =
    document.querySelector(
      '[data-admin-section="schedule"]'
    ) ||
    addButton?.closest(".admin-section");

  const firstActivity =
    scheduleSection?.querySelector(
      ".admin-activity"
    );

  const generateButton =
    document.querySelector(
      ".admin-generate-button"
    );

  const previewSection =
    document.getElementById(
      "artist-preview"
    );

  const previewArtistName =
    document.getElementById(
      "preview-artist-name"
    );

  const previewArtistSlug =
    document.getElementById(
      "preview-artist-slug"
    );

  const previewJSON =
    document.getElementById(
      "preview-json"
    );

  const downloadArtistButton =
    document.getElementById(
      "download-artist-file"
    );

  const artistLinkInput =
    document.getElementById(
      "artist-link"
    );

  const copyArtistLinkButton =
    document.getElementById(
      "copy-artist-link"
    );

  const hotelStatus =
    document.getElementById(
      "admin-hotel-status"
    );

  const hotelFields =
    document.getElementById(
      "admin-hotel-fields"
    );

  const contactPreview =
    document.getElementById(
      "admin-contact-preview"
    );

  const validationMessage =
    document.getElementById(
      "admin-validation-message"
    );


  let currentArtistData = null;


  if (
    !addButton ||
    !scheduleSection ||
    !firstActivity
  ) {
    return;
  }


  /* =========================================
     VENUES
     ========================================= */

  const venueOptions = `
    <option>Fabra i Coats</option>
    <option>ESMUC</option>
    <option>PHONOS</option>
    <option>Museu de la Música</option>
    <option>Taller de Músics</option>
    <option>CMMB</option>
    <option>Santa Mònica</option>
    <option>L'Auditori</option>
    <option>Espai Bota</option>
    <option>ALMO2BAR</option>
    <option>Sala Taro</option>
    <option>Other</option>
  `;


  /* =========================================
     HELPERS
     ========================================= */

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


  function getFieldByLabel(
    section,
    labelText
  ) {
    if (!section) {
      return null;
    }

    const fields =
      Array.from(
        section.querySelectorAll(
          ".admin-field"
        )
      );

    const field =
      fields.find((item) => {
        const label =
          item.querySelector(
            ":scope > span"
          );

        return (
          label &&
          label.textContent
            .trim()
            .toLowerCase() ===
            labelText.toLowerCase()
        );
      });

    if (!field) {
      return null;
    }

    return field.querySelector(
      "input, textarea, select"
    );
  }


  function getSectionByTitle(title) {
    const sections =
      Array.from(
        document.querySelectorAll(
          ".admin-section"
        )
      );

    return sections.find(
      (section) => {
        const heading =
          section.querySelector(
            ".admin-section-heading h2"
          );

        return (
          heading &&
          heading.textContent
            .trim()
            .toLowerCase() ===
            title.toLowerCase()
        );
      }
    );
  }


  function removeEmptyValues(value) {

    if (Array.isArray(value)) {
      return value
        .map(removeEmptyValues)
        .filter((item) => {

          if (
            item === null ||
            item === undefined ||
            item === ""
          ) {
            return false;
          }

          if (
            typeof item === "object" &&
            !Array.isArray(item) &&
            Object.keys(item).length === 0
          ) {
            return false;
          }

          return true;
        });
    }


    if (
      value &&
      typeof value === "object"
    ) {
      const cleanedObject = {};

      Object.entries(value).forEach(
        ([key, item]) => {

          const cleanedValue =
            removeEmptyValues(item);

          if (
            cleanedValue === "" ||
            cleanedValue === null ||
            cleanedValue === undefined
          ) {
            return;
          }

          if (
            typeof cleanedValue === "object" &&
            !Array.isArray(cleanedValue) &&
            Object.keys(cleanedValue).length === 0
          ) {
            return;
          }

          cleanedObject[key] =
            cleanedValue;
        }
      );

      return cleanedObject;
    }

    return value;
  }


  function sortActivities(activities) {
    return [...activities].sort(
      (a, b) => {

        const dateA =
          `${a.date || "9999-12-31"}T${a.time || "23:59"}`;

        const dateB =
          `${b.date || "9999-12-31"}T${b.time || "23:59"}`;

        return dateA.localeCompare(
          dateB
        );
      }
    );
  }


  function formatPhone(phone) {
    if (!phone) {
      return "";
    }

    const digits =
      phone.replace(/\D/g, "");

    const national =
      digits.startsWith("34")
        ? digits.slice(2)
        : digits;

    if (national.length !== 9) {
      return phone;
    }

    return `+34 ${national.slice(
      0,
      3
    )} ${national.slice(
      3,
      6
    )} ${national.slice(6)}`;
  }


  /* =========================================
     ACCOMMODATION
     ========================================= */

  function updateHotelVisibility() {
    if (
      !hotelStatus ||
      !hotelFields
    ) {
      return;
    }

    const hasHotel =
      hotelStatus.value === "yes";

    hotelFields.hidden =
      !hasHotel;
  }


  hotelStatus?.addEventListener(
    "change",
    updateHotelVisibility
  );


  updateHotelVisibility();


  /* =========================================
     MAIN CONTACT
     ========================================= */

  function getSelectedContact() {
    const contactSection =
      document.querySelector(
        '[data-admin-section="contact"]'
      ) ||
      getSectionByTitle(
        "Main contact"
      );

    const select =
      getFieldByLabel(
        contactSection,
        "Assigned contact"
      );

    if (!select) {
      return null;
    }

    return (
      MIXTUR_CONTACTS[
        select.value
      ] || null
    );
  }


  function renderContactPreview() {
    if (!contactPreview) {
      return;
    }

    const contact =
      getSelectedContact();

    if (!contact) {
      contactPreview.innerHTML = "";
      return;
    }

    contactPreview.innerHTML = `
      <div class="admin-eyebrow">
        Assigned contact details
      </div>

      <p>
        <strong>${contact.name}</strong><br>
        ${contact.role}<br>
        ${formatPhone(contact.phone)}<br>
        ${contact.email}
      </p>
    `;
  }


  const contactSection =
    document.querySelector(
      '[data-admin-section="contact"]'
    ) ||
    getSectionByTitle(
      "Main contact"
    );

  const contactSelect =
    getFieldByLabel(
      contactSection,
      "Assigned contact"
    );


  contactSelect?.addEventListener(
    "change",
    renderContactPreview
  );


  renderContactPreview();


  /* =========================================
     ACTIVITY TYPES
     ========================================= */

  function getActivityType(activity) {
    const typeField =
      getFieldByLabel(
        activity,
        "Type"
      );

    return (
      typeField?.value ||
      "Rehearsal"
    );
  }


  function buildExtraFields(type) {

    if (
      type === "Rehearsal" ||
      type === "Performance" ||
      type === "Reading Session"
    ) {
      return `
        <label class="admin-field">

          <span>
            Venue
          </span>

          <select>
            ${venueOptions}
          </select>

        </label>


        <div
          class="admin-other-venue"
          hidden
        >

          <label class="admin-field">

            <span>
              Other venue
            </span>

            <input
              type="text"
              placeholder="Venue name"
              autocomplete="off"
            >

          </label>

        </div>


        <label class="admin-field">

          <span>
            Room / Space
          </span>

          <input
            type="text"
            placeholder="Sala / room"
            autocomplete="off"
          >

        </label>


        <label class="admin-field">

          <span>
            Call time
          </span>

          <input type="time">

        </label>
      `;
    }


    if (type === "Hotel") {
      return `
        <label class="admin-field">

          <span>
            Hotel
          </span>

          <input
            type="text"
            placeholder="Hotel name"
            autocomplete="off"
          >

        </label>
      `;
    }


    if (type === "Meal") {
      return `
        <label class="admin-field">

          <span>
            Place / Restaurant
          </span>

          <input
            type="text"
            placeholder="Restaurant or meeting point"
            autocomplete="off"
          >

        </label>
      `;
    }


    if (type === "Travel") {
      return `
        <label class="admin-field">

          <span>
            From
          </span>

          <input
            type="text"
            placeholder="Barcelona Airport"
            autocomplete="off"
          >

        </label>


        <label class="admin-field">

          <span>
            To
          </span>

          <input
            type="text"
            placeholder="Hotel, venue..."
            autocomplete="off"
          >

        </label>


        <label class="admin-field">

          <span>
            Transport
          </span>

          <input
            type="text"
            placeholder="Taxi, transfer, train..."
            autocomplete="off"
          >

        </label>
      `;
    }


    return `
      <label class="admin-field">

        <span>
          Place
        </span>

        <input
          type="text"
          placeholder="Venue, meeting point or location"
          autocomplete="off"
        >

      </label>
    `;
  }


  function updateOtherVenueVisibility(
    activity
  ) {
    const venueField =
      getFieldByLabel(
        activity,
        "Venue"
      );

    const otherContainer =
      activity.querySelector(
        ".admin-other-venue"
      );

    if (
      !venueField ||
      !otherContainer
    ) {
      return;
    }

    otherContainer.hidden =
      venueField.value !== "Other";
  }


  function updateActivityFields(
    activity
  ) {
    const type =
      getActivityType(activity);

    const topLabels =
      activity.querySelectorAll(
        ".admin-activity-top > span"
      );

    if (topLabels[1]) {
      topLabels[1].textContent =
        type;
    }


    const dynamicFields =
      activity.querySelector(
        ".admin-dynamic-fields"
      );

    if (dynamicFields) {
      dynamicFields.innerHTML =
        buildExtraFields(type);
    }


    updateOtherVenueVisibility(
      activity
    );
  }


  /* =========================================
     REMOVE / NUMBER
     ========================================= */

  function addRemoveButton(activity) {
    const top =
      activity.querySelector(
        ".admin-activity-top"
      );

    if (!top) {
      return;
    }


    let removeButton =
      activity.querySelector(
        ".admin-remove-activity"
      );


    if (!removeButton) {
      removeButton =
        document.createElement(
          "button"
        );

      removeButton.type =
        "button";

      removeButton.className =
        "admin-remove-activity";

      removeButton.setAttribute(
        "aria-label",
        "Remove activity"
      );

      removeButton.textContent =
        "Remove";

      top.appendChild(
        removeButton
      );
    }


    removeButton.addEventListener(
      "click",
      () => {

        const activities =
          scheduleSection.querySelectorAll(
            ".admin-activity"
          );

        if (
          activities.length <= 1
        ) {
          return;
        }

        activity.remove();

        updateActivityNumbers();
        clearValidation();
      }
    );
  }


  function updateActivityNumbers() {
    const activities =
      scheduleSection.querySelectorAll(
        ".admin-activity"
      );

    activities.forEach(
      (activity, index) => {

        const numberLabel =
          activity.querySelector(
            ".admin-activity-top span:first-child"
          );

        if (numberLabel) {
          numberLabel.textContent =
            `Activity ${String(
              index + 1
            ).padStart(2, "0")}`;
        }


        const removeButton =
          activity.querySelector(
            ".admin-remove-activity"
          );

        if (removeButton) {
          removeButton.hidden =
            activities.length === 1;
        }
      }
    );
  }


  /* =========================================
     PREPARE ACTIVITY
     ========================================= */

  function prepareActivity(activity) {

    let dynamicFields =
      activity.querySelector(
        ".admin-dynamic-fields"
      );


    if (!dynamicFields) {
      dynamicFields =
        document.createElement(
          "div"
        );

      dynamicFields.className =
        "admin-fields admin-dynamic-fields";


      const fields =
        Array.from(
          activity.querySelectorAll(
            ".admin-field"
          )
        );


      const notesField =
        fields.find((field) =>
          field.textContent
            .trim()
            .startsWith("Notes")
        );


      const venueField =
        fields.find((field) =>
          field.textContent
            .trim()
            .startsWith("Venue")
        );


      const roomField =
        fields.find((field) =>
          field.textContent
            .trim()
            .startsWith("Room")
        );


      const callTimeField =
        fields.find((field) =>
          field.textContent
            .trim()
            .startsWith("Call time")
        );


      venueField?.remove();
      roomField?.remove();
      callTimeField?.remove();


      if (notesField) {
        notesField.parentElement
          .insertBefore(
            dynamicFields,
            notesField
          );
      } else {
        activity.appendChild(
          dynamicFields
        );
      }
    }


    updateActivityFields(
      activity
    );

    addRemoveButton(
      activity
    );
  }


  function resetActivityFields(
    activity
  ) {
    const fields =
      activity.querySelectorAll(
        "input, textarea, select"
      );


    fields.forEach((field) => {

      if (
        field.tagName === "SELECT"
      ) {
        field.selectedIndex =
          0;
      } else {
        field.value =
          "";
      }
    });
  }


  /* =========================================
     READ ACTIVITY
     ========================================= */

  function getActivityData(activity) {

    const type =
      getActivityType(activity);


    const data = {

      date:
        getFieldByLabel(
          activity,
          "Date"
        )?.value || "",

      time:
        getFieldByLabel(
          activity,
          "Time"
        )?.value || "",

      type,

      title:
        getFieldByLabel(
          activity,
          "Title"
        )?.value.trim() || "",

      notes:
        getFieldByLabel(
          activity,
          "Notes"
        )?.value.trim() || ""
    };


    if (
      type === "Rehearsal" ||
      type === "Performance" ||
      type === "Reading Session"
    ) {

      const selectedVenue =
        getFieldByLabel(
          activity,
          "Venue"
        )?.value || "";


      if (
        selectedVenue === "Other"
      ) {
        data.venue =
          getFieldByLabel(
            activity,
            "Other venue"
          )?.value.trim() || "";
      } else {
        data.venue =
          selectedVenue;
      }


      data.room =
        getFieldByLabel(
          activity,
          "Room / Space"
        )?.value.trim() || "";


      data.callTime =
        getFieldByLabel(
          activity,
          "Call time"
        )?.value || "";
    }


    if (type === "Hotel") {
      data.hotel =
        getFieldByLabel(
          activity,
          "Hotel"
        )?.value.trim() || "";
    }


    if (type === "Meal") {
      data.place =
        getFieldByLabel(
          activity,
          "Place / Restaurant"
        )?.value.trim() || "";
    }


    if (type === "Travel") {

      data.from =
        getFieldByLabel(
          activity,
          "From"
        )?.value.trim() || "";

      data.to =
        getFieldByLabel(
          activity,
          "To"
        )?.value.trim() || "";

      data.transport =
        getFieldByLabel(
          activity,
          "Transport"
        )?.value.trim() || "";
    }


    if (type === "Other") {
      data.place =
        getFieldByLabel(
          activity,
          "Place"
        )?.value.trim() || "";
    }


    return removeEmptyValues(
      data
    );
  }


  /* =========================================
     VALIDATION
     ========================================= */

  function clearValidation() {

    if (validationMessage) {
      validationMessage.hidden =
        true;

      validationMessage.innerHTML =
        "";
    }


    document
      .querySelectorAll(
        ".admin-field-error"
      )
      .forEach((field) => {
        field.classList.remove(
          "admin-field-error"
        );
      });
  }


  function markFieldError(field) {
    const container =
      field?.closest(
        ".admin-field"
      );

    container?.classList.add(
      "admin-field-error"
    );
  }


  function showValidation(errors) {

    if (!validationMessage) {
      return;
    }


    validationMessage.innerHTML = `
      <strong>
        Please review the following:
      </strong>

      <ul>
        ${errors
          .map(
            (error) =>
              `<li>${error}</li>`
          )
          .join("")}
      </ul>
    `;

    validationMessage.hidden =
      false;


    validationMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }


  function validateForm() {

    clearValidation();

    const errors = [];


    const artistSection =
      document.querySelector(
        '[data-admin-section="artist"]'
      ) ||
      getSectionByTitle(
        "Artist"
      );


    const artistNameField =
      getFieldByLabel(
        artistSection,
        "Artist name"
      );


    if (
      !artistNameField?.value.trim()
    ) {
      errors.push(
        "Artist name is required."
      );

      markFieldError(
        artistNameField
      );
    }


    const activities =
      Array.from(
        scheduleSection.querySelectorAll(
          ".admin-activity"
        )
      );


    activities.forEach(
      (activity, index) => {

        const number =
          String(
            index + 1
          ).padStart(2, "0");


        const dateField =
          getFieldByLabel(
            activity,
            "Date"
          );

        const timeField =
          getFieldByLabel(
            activity,
            "Time"
          );

        const typeField =
          getFieldByLabel(
            activity,
            "Type"
          );


        if (!dateField?.value) {
          errors.push(
            `Activity ${number} needs a date.`
          );

          markFieldError(
            dateField
          );
        }


        if (!timeField?.value) {
          errors.push(
            `Activity ${number} needs a time.`
          );

          markFieldError(
            timeField
          );
        }


        if (!typeField?.value) {
          errors.push(
            `Activity ${number} needs a type.`
          );

          markFieldError(
            typeField
          );
        }


        if (
          (
            typeField?.value ===
              "Rehearsal" ||
            typeField?.value ===
              "Performance" ||
            typeField?.value ===
              "Reading Session"
          ) &&
          getFieldByLabel(
            activity,
            "Venue"
          )?.value === "Other"
        ) {

          const otherVenueField =
            getFieldByLabel(
              activity,
              "Other venue"
            );


          if (
            !otherVenueField
              ?.value.trim()
          ) {
            errors.push(
              `Activity ${number}: write the venue name or select another venue.`
            );

            markFieldError(
              otherVenueField
            );
          }
        }
      }
    );


    if (errors.length) {
      showValidation(
        errors
      );

      return false;
    }


    return true;
  }


  /* =========================================
     GENERATE DATA
     ========================================= */

  function generateArtistData() {

    const artistSection =
      document.querySelector(
        '[data-admin-section="artist"]'
      ) ||
      getSectionByTitle(
        "Artist"
      );


    const staySection =
      document.querySelector(
        '[data-admin-section="stay"]'
      ) ||
      getSectionByTitle(
        "Stay"
      );


    const hotelSection =
      document.querySelector(
        '[data-admin-section="hotel"]'
      ) ||
      getSectionByTitle(
        "Accommodation"
      );


    const artistName =
      getFieldByLabel(
        artistSection,
        "Artist name"
      )?.value.trim() || "";


    const slug =
      slugify(
        artistName
      );


    const activities =
      sortActivities(
        Array.from(
          scheduleSection.querySelectorAll(
            ".admin-activity"
          )
        ).map(
          getActivityData
        )
      );


    const selectedContact =
      getSelectedContact();


    const artistData = {

      id:
        slug,

      artist: {

        name:
          artistName,

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


      mainContact:
        selectedContact
          ? {
              name:
                selectedContact.name,

              role:
                selectedContact.role,

              email:
                selectedContact.email,

              phone:
                selectedContact.phone
            }
          : {},


      schedule:
        activities
    };


    /* HOTEL ONLY WHEN ENABLED */

    if (
      hotelStatus?.value === "yes"
    ) {

      artistData.hotel = {

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

  checkInDate:
    getFieldByLabel(
      hotelSection,
      "Check-in date"
    )?.value || "",

  checkInTime:
    getFieldByLabel(
      hotelSection,
      "Check-in time"
    )?.value || "",

  checkOutDate:
    getFieldByLabel(
      hotelSection,
      "Check-out date"
    )?.value || "",

  checkOutTime:
    getFieldByLabel(
      hotelSection,
      "Check-out time"
    )?.value || ""
};
    }


    return removeEmptyValues(
      artistData
    );
  }


  /* =========================================
     INITIAL ACTIVITY
     ========================================= */

  prepareActivity(
    firstActivity
  );

  updateActivityNumbers();


  /* =========================================
     ADD ACTIVITY
     ========================================= */

  addButton.addEventListener(
    "click",
    () => {

      const newActivity =
        firstActivity.cloneNode(
          true
        );


      resetActivityFields(
        newActivity
      );


      newActivity
        .querySelector(
          ".admin-remove-activity"
        )
        ?.remove();


      newActivity
        .querySelector(
          ".admin-dynamic-fields"
        )
        ?.remove();


      prepareActivity(
        newActivity
      );


      scheduleSection.insertBefore(
        newActivity,
        addButton
      );


      updateActivityNumbers();
      clearValidation();


      newActivity.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  );


  /* =========================================
     ACTIVITY CHANGES
     ========================================= */

  scheduleSection.addEventListener(
    "change",
    (event) => {

      const activity =
        event.target.closest(
          ".admin-activity"
        );

      if (!activity) {
        return;
      }


      const typeField =
        getFieldByLabel(
          activity,
          "Type"
        );


      if (
        event.target ===
        typeField
      ) {
        updateActivityFields(
          activity
        );

        clearValidation();

        return;
      }


      const venueField =
        getFieldByLabel(
          activity,
          "Venue"
        );


      if (
        event.target ===
        venueField
      ) {
        updateOtherVenueVisibility(
          activity
        );

        clearValidation();
      }
    }
  );


  /* =========================================
     GENERATE
     ========================================= */

  generateButton?.addEventListener(
    "click",
    () => {

      if (!validateForm()) {
        return;
      }


      const artistData =
        generateArtistData();


      currentArtistData =
        artistData;


      if (previewArtistName) {
        previewArtistName.textContent =
          artistData.artist?.name ||
          "Unnamed artist";
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


      if (artistLinkInput) {

        const guidePath =
          window.location.pathname.replace(
            /admin\.html$/,
            ""
          );


        artistLinkInput.value =
          `${window.location.origin}${guidePath}?artist=${encodeURIComponent(
            artistData.id
          )}`;
      }


      if (previewSection) {

        previewSection.hidden =
          false;


        previewSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  );


  /* =========================================
     DOWNLOAD JSON
     ========================================= */

  downloadArtistButton?.addEventListener(
    "click",
    () => {

      if (!currentArtistData) {
        return;
      }


      const json =
        JSON.stringify(
          currentArtistData,
          null,
          2
        );


      const blob =
        new Blob(
          [json],
          {
            type: "application/json"
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      link.href =
        url;

      link.download =
        `${currentArtistData.id}.json`;


      document.body.appendChild(
        link
      );


      link.click();
      link.remove();


      URL.revokeObjectURL(
        url
      );
    }
  );


  /* =========================================
     COPY LINK
     ========================================= */

  copyArtistLinkButton?.addEventListener(
    "click",
    async () => {

      if (
        !artistLinkInput?.value
      ) {
        return;
      }


      try {

        await navigator.clipboard
          .writeText(
            artistLinkInput.value
          );

      } catch {

        artistLinkInput.select();

        document.execCommand(
          "copy"
        );
      }


      copyArtistLinkButton.textContent =
        "Copied";


      setTimeout(
        () => {
          copyArtistLinkButton.textContent =
            "Copy link";
        },
        1400
      );
    }
  );

});
