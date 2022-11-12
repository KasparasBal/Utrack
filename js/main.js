//Selections
///////////////////////////////////////////////////////////////

//Sidebar
const sideBtnOpen = document.querySelector(".sidebar__btn--open");
const sideBtnClose = document.querySelector(".sidebar__btn--close");
const sidebar = document.querySelector(".sidebar__content");
//Creator
const sideBtnNew = document.querySelector(".sidebar__btn--new");
const createBtnClose = document.querySelector(".creator__btn-close");
const createBtnSubmit = document.querySelector(".creator__btn-submit");
const creator = document.querySelector(".section__creator");
const creatorForm = document.querySelector(".creator__form");
//Activity
const activitiesTitle = document.querySelector(".activities__title");
const activityList = document.querySelector(".activities");
const actTitle = document.getElementById("actTitle");
const actRepTime = document.getElementById("actRepTime");
const actBreakTime = document.getElementById("actBreakTime");
const actSets = document.getElementById("actSets");
const actReps = document.getElementById("actReps");

//Activities Display

const activMain = document.querySelector(".activities__main");

//Sidebar
///////////////////////////////////////////////////////////////

//Open/Close Sidebar Menu
const openSide = function () {
  sidebar.classList.contains("hidden-sidebar")
    ? sidebar.classList.remove("hidden-sidebar")
    : sidebar.classList.add("hidden-sidebar");
};
const closeSide = function () {
  sidebar.classList.add("hidden-sidebar");
};

//Open Activity Creator
const openCreator = function () {
  creator.classList.remove("hidden__creator");
};

const closeCreator = function () {
  creator.classList.add("hidden__creator");
};

sideBtnOpen.addEventListener("click", openSide);
sideBtnClose.addEventListener("click", closeSide);

sideBtnNew.addEventListener("click", openCreator);
sideBtnNew.addEventListener("click", openCreator);

createBtnClose.addEventListener("click", closeCreator);

//Activities
///////////////////////////////////////////////////////////////

class Activity {
  constructor(title, repTime, breakTime, sets, reps, id) {
    this.title = title;
    this.repTime = repTime;
    this.breakTime = breakTime;
    this.sets = sets;
    this.reps = reps;
    this.id = id;
  }
}

//App
///////////////////////////////////////////////////////////////
class App {
  #activities = [];
  constructor() {
    creatorForm.addEventListener("submit", this._createNewAct.bind(this));
    activityList.addEventListener(
      "click",
      this._displayCurrentActivity.bind(this)
    );
    this._getLocalStorage();
  }
  //Validate Inputs
  _validateInputs(...inputs) {
    //Needs Work
    const validInputs = inputs.every((inp) => Number.isFinite(inp));
    const positiveNumbers = inputs.every((inp) => inp > 0);

    if (!validInputs || !positiveNumbers) return false;
    if (validInputs && positiveNumbers) return true;
  }

  //Create a new activity
  _createNewAct(e) {
    //Create activity
    e.preventDefault();
    const title = actTitle.value;
    const repTime = +actRepTime.value;
    const breakTime = +actBreakTime.value;
    const sets = +actSets.value;
    const reps = +actReps.value;
    const id = title.slice(-2) + (Date.now() + "").slice(5);
    console.log(id);

    if (
      !this._validateInputs(repTime, breakTime, sets, reps) ||
      title.length === 0
    ) {
      actTitle.classList.contains("wrongInput")
        ? actTitle.classList.remove("wrongInput")
        : actTitle.classList.add("wrongInput");
    } else {
      let activity = new Activity(title, repTime, breakTime, sets, reps, id);
      this.#activities.push(activity);
      this._displayActivities(activity);
      this._clearForm();
      this._displayNoActivities();
      this._LastActivity(activity);
      this._setLocalStorage();
    }
  }
  _LastActivity(activity) {
    let html = `
    <section class="section__display">
    <div class="display__title">${activity.title}</div>
    <div class="display__timer">${activity.repTime}</div>
    <div class="display__buttons">
      <div class="display__btn display__btn--start">Start</div>
      <div class="display__btn display__btn--skip">Skip</div>
      <div class="display__btn display__btn--add">+5 min</div>
      <div class="display__btn display__btn--end">End</div>
    </div>
    <div class="display__stats">
      <div class="display__reps">Reps: 0/${activity.reps}</div>
      <p class="seperator">|</p>
      <div class="display__sets">Sets: 0/${activity.sets}</div>
    </div>
  </section>`;

    activMain.insertAdjacentHTML("beforeend", html);
  }

  //Clear form
  _clearForm() {
    actTitle.value =
      actRepTime.value =
      actBreakTime.value =
      actSets.value =
      actReps.value =
        "";
  }

  //Display that no activities are present
  _displayNoActivities() {
    if (this.#activities.length === 0) {
      let html =
        "<h3 class='activities__none'>Currently you have no activities created.</h3>";
      activitiesTitle.insertAdjacentHTML("afterend", html);
    }
  }

  //Display Activities
  _displayActivities(activity) {
    let html = `
      <li class="activity" data-id="${activity.id}">
      <div class="activity__logo">
        <img
          src="/img/barbell.svg"
          alt="activity logo"
          class="activity__logo"
        />
      </div>
      <aside class="activity__aside">
        <div class="activity__title">${activity.title}</div>
        <div class="activity__reps">Reps:${activity.reps}x</div>
        <div class="activity__sets">
          <h4 class="activity__sets-text">${activity.sets}x</h4>
        </div>
        <div class="activity__meter"></div>
      </aside>
    </li>
      `;

    activitiesTitle.insertAdjacentHTML("afterend", html);
  }

  //Display Current Activity
  _displayCurrentActivity(e) {
    const currActTitle = document.querySelector(".display__title");
    const currActTimer = document.querySelector(".display__timer");
    const currActReps = document.querySelector(".display__reps");
    const currActSets = document.querySelector(".display__sets");
    //find clicked activity in the activities array.
    const activity = e.target;
    const currAct = this.#activities.find((act) => {
      return act.id === activity.closest(".activity").dataset.id;
    });
    //if not found
    console.log(currAct);
    if (!currAct) return;
    //if found
    console.log(currActTitle);
    console.log(currActReps);
    console.log(currActSets);
    currActTitle.textContent = currAct.title;
    currActReps.textContent = currAct.reps;
    currActSets.textContent = currAct.sets;
  }

  _setLocalStorage() {
    localStorage.setItem("activities", JSON.stringify(this.#activities));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("activities"));
    console.log(data);
    if (!data) return;
    this.#activities = data;
    this._LastActivity(this.#activities[this.#activities.length - 1]);
    data.forEach((activity) => this._displayActivities(activity));
  }

  //Getters
  //Get Activities
  get activities() {
    return this.#activities;
  }
}

const app = new App();
