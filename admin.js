document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".admin-add-button");
  const scheduleSection = addButton?.closest(".admin-section");
  const firstActivity = scheduleSection?.querySelector(".admin-activity");

  if (!addButton || !scheduleSection || !firstActivity) {
    return;
  }

  let activityCount = scheduleSection.querySelectorAll(".admin-activity").length;

  function updateActivityNumbers() {
    const activities = scheduleSection.querySelectorAll(".admin-activity");

    activities.forEach((activity, index) => {
      const numberLabel = activity.querySelector(
        ".admin-activity-top span:first-child"
      );

      if (numberLabel) {
        numberLabel.textContent = `Activity ${String(index + 1).padStart(2, "0")}`;
      }

      const removeButton = activity.querySelector(".admin-remove-activity");

      if (removeButton) {
        removeButton.hidden = activities.length === 1;
      }
    });
  }

  function resetActivityFields(activity) {
    const fields = activity.querySelectorAll("input, textarea, select");

    fields.forEach((field) => {
      if (field.tagName === "SELECT") {
        field.selectedIndex = 0;
        return;
      }

      field.value = "";
    });
  }

  function addRemoveButton(activity) {
    const top = activity.querySelector(".admin-activity-top");

    if (!top) {
      return;
    }

    let removeButton = activity.querySelector(".admin-remove-activity");

    if (!removeButton) {
      removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.className = "admin-remove-activity";
      removeButton.setAttribute("aria-label", "Remove activity");
      removeButton.textContent = "Remove";

      top.appendChild(removeButton);
    }

    removeButton.addEventListener("click", () => {
      const activities = scheduleSection.querySelectorAll(".admin-activity");

      if (activities.length <= 1) {
        return;
      }

      activity.remove();

      updateActivityNumbers();
    });
  }

  addRemoveButton(firstActivity);
  updateActivityNumbers();

  addButton.addEventListener("click", () => {
    activityCount += 1;

    const newActivity = firstActivity.cloneNode(true);

    resetActivityFields(newActivity);

    const activityTop = newActivity.querySelector(".admin-activity-top");

    if (activityTop) {
      activityTop.innerHTML = `
        <span>Activity ${String(activityCount).padStart(2, "0")}</span>
        <span>Rehearsal</span>
      `;
    }

    addRemoveButton(newActivity);

    scheduleSection.insertBefore(newActivity, addButton);

    updateActivityNumbers();

    newActivity.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  scheduleSection.addEventListener("change", (event) => {
    const target = event.target;

    if (
      target.tagName !== "SELECT" ||
      !target.closest(".admin-activity")
    ) {
      return;
    }

    const activity = target.closest(".admin-activity");
    const selects = activity.querySelectorAll("select");

    const typeSelect = selects[0];

    if (target !== typeSelect) {
      return;
    }

    const typeLabel = activity.querySelector(
      ".admin-activity-top span:nth-child(2)"
    );

    if (typeLabel) {
      typeLabel.textContent = target.value;
    }
  });
});
