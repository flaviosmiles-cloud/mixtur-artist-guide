document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".admin-add-button");
  const scheduleSection = addButton?.closest(".admin-section");
  const firstActivity = scheduleSection?.querySelector(".admin-activity");

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

  function getActivityType(activity) {
    const selects = activity.querySelectorAll("select");
    return selects[0]?.value || "Rehearsal";
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

          <select class="activity-venue">
            ${venueOptions}
          </select>

        </label>


        <label class="admin-field">

          <span>
            Room / Space
          </span>

          <input
            class="activity-room"
            type="text"
            placeholder="Sala 2"
          >

        </label>


        <label class="admin-field">

          <span>
            Call time
          </span>

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

          <span>
            Hotel
          </span>

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

          <span>
            Place / Restaurant
          </span>

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

          <span>
            From
          </span>

          <input
            class="activity-from"
            type="text"
            placeholder="Barcelona Airport"
          >

        </label>


        <label class="admin-field">

          <span>
            To
          </span>

          <input
            class="activity-to"
            type="text"
            placeholder="Hotel"
          >

        </label>


        <label class="admin-field">

          <span>
            Transport
          </span>

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

        <span>
          Place
        </span>

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
      const activities =
        scheduleSection.querySelectorAll(
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
    const activities =
      scheduleSection.querySelectorAll(
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
    const fieldsContainer =
      activity.querySelector(".admin-fields");

    if (!fieldsContainer) {
      return;
    }

    let dynamicFields =
      activity.querySelector(
        ".admin-dynamic-fields"
      );

    if (!dynamicFields) {
      dynamicFields =
        document.createElement("div");

      dynamicFields.className =
        "admin-fields admin-dynamic-fields";

      const notesField =
        Array.from(
          activity.querySelectorAll(
            ".admin-field"
          )
        ).find((field) =>
          field.textContent
            .trim()
            .startsWith("Notes")
        );

      const venueField =
        Array.from(
          activity.querySelectorAll(
            ".admin-field"
          )
        ).find((field) =>
          field.textContent
            .trim()
            .startsWith("Venue")
        );

      const roomField =
        Array.from(
          activity.querySelectorAll(
            ".admin-field"
          )
        ).find((field) =>
          field.textContent
            .trim()
            .startsWith("Room")
        );

      const callTimeField =
        Array.from(
          activity.querySelectorAll(
            ".admin-field"
          )
        ).find((field) =>
          field.textContent
            .trim()
            .startsWith("Call time")
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
    const fields =
      activity.querySelectorAll(
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

  prepareActivity(firstActivity);
  updateActivityNumbers();

  addButton.addEventListener("click", () => {
    const newActivity =
      firstActivity.cloneNode(true);

    resetActivityFields(newActivity);

    const oldRemoveButton =
      newActivity.querySelector(
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
      const activity =
        event.target.closest(
          ".admin-activity"
        );

      if (!activity) {
        return;
      }

      const selects =
        activity.querySelectorAll("select");

      const typeSelect = selects[0];

      if (event.target === typeSelect) {
        updateActivityFields(activity);
      }
    }
  );
});
