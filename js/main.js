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
const creatorIcons = document.querySelector(".creator__icons");
//Activity
const activitiesTitle = document.querySelector(".activities__title");
const activityList = document.querySelector(".activities");
const actTitle = document.getElementById("actTitle");
const actRepTime = document.getElementById("actRepTime");
const actBreakTime = document.getElementById("actBreakTime");
const actSets = document.getElementById("actSets");
const actReps = document.getElementById("actReps");
const activMain = document.querySelector(".activities__main");
const sectionDisplay = document.querySelector(".section__display");

//Sidebar Code
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
//Open/Close Creator
const openCreator = function () {
  creator.classList.remove("hidden__creator");
};

const closeCreator = function () {
  creator.classList.add("hidden__creator");
};

//Event Listeners

sideBtnOpen.addEventListener("click", openSide);
sideBtnClose.addEventListener("click", closeSide);

sideBtnNew.addEventListener("click", openCreator);
sideBtnNew.addEventListener("click", openCreator);

createBtnClose.addEventListener("click", closeCreator);

//Activities
///////////////////////////////////////////////////////////////

class Activity {
  constructor(title, repTime, breakTime, sets, reps, id, logo) {
    this.title = title;
    this.repTime = repTime;
    this.breakTime = breakTime;
    this.sets = sets;
    this.reps = reps;
    this.id = id;
    this.logo = logo;
  }
}

//App
///////////////////////////////////////////////////////////////
class App {
  #activities = [];
  creatorIcon;
  startBtn;

  constructor() {
    //Event Listeners
    creatorForm.addEventListener("submit", this._createNewAct.bind(this));
    activityList.addEventListener(
      "click",
      this._displayCurrentActivity.bind(this)
    );
    creatorIcons.addEventListener("click", this._setLogo.bind(this));
    creatorIcons.addEventListener("click", this._activityInCreation.bind(this));
    actTitle.addEventListener("change", this._activityInCreation);
    actRepTime.addEventListener("change", this._activityInCreation);
    actBreakTime.addEventListener("change", this._activityInCreation);
    actSets.addEventListener("change", this._activityInCreation);
    actReps.addEventListener("change", this._activityInCreation);
    //Function Calls
    this._getLocalStorage();

    this.startBtn = document.querySelector(".display__btn--start");
    this.startBtn.addEventListener("click", this._timer);
  }
  //Validate Inputs
  _validateInputs(...inputs) {
    //Needs Work
    const validInputs = inputs.every((inp) => Number.isFinite(inp));
    const positiveNumbers = inputs.every((inp) => inp > 0);

    if (!validInputs || !positiveNumbers) return false;
    if (validInputs && positiveNumbers) return true;
  }

  _setLogo(e) {
    const icon = e.target;
    const selectedIcon = icon.closest(".creator__icon").dataset.logo;
    this.creatorIcon = selectedIcon;
    console.log(this.creatorIcon);
  }

  //Create a new activity
  _createNewAct(e) {
    e.preventDefault();
    const title = actTitle.value;
    const repTime = +actRepTime.value * 60;
    const breakTime = +actBreakTime.value * 60;
    const sets = +actSets.value;
    const reps = +actReps.value;
    const id = title.slice(-2) + (Date.now() + "").slice(5);
    const logo = this.creatorIcon;

    if (
      !this._validateInputs(repTime, breakTime, sets, reps) ||
      title.length === 0 ||
      this.creatorIcon.length <= 0
    ) {
      actTitle.classList.contains("wrongInput")
        ? actTitle.classList.remove("wrongInput")
        : actTitle.classList.add("wrongInput");
    } else {
      let activity = new Activity(
        title,
        repTime,
        breakTime,
        sets,
        reps,
        id,
        logo
      );

      this.#activities.push(activity);
      this._displayActivities(activity);
      this._clearForm();
      this._displayNoActivities();
      this._setLocalStorage();

      //Reset the selected icon to none
      this.creatorIcon = "";
    }
  }
  _activityInCreation(e) {
    console.log(e.target);
    const example = document.querySelector(".example__activity");
    example.classList.add("example__activity-visible");

    const title = document.querySelector(".example__activity-title");
    const icon = document.querySelector(".example__activity-icon");
    const reps = document.querySelector(".example__activity-reps");
    const sets = document.querySelector(".example__activity-sets");

    const items = [title, icon, reps, sets];

    items.forEach((item) => {
      if (item.dataset.input === e.target.dataset.input) {
        if (e.target.dataset.input === "example_logo") {
          const src = e.target.getAttribute("src");
          item.setAttribute("src", src);
        } else if (e.target.name === "reps" || e.target.name === "sets") {
          item.textContent = `${e.target.value}x`;

          e.target.name === "reps"
            ? (item.textContent = `Reps: ${e.target.value}x`)
            : (item.textContent = `${e.target.value}x`);
        } else {
          item.textContent = e.target.value;
        }
      }
    });
  }
  _LastActivity(activity) {
    const min = String(Math.trunc(activity.repTime / 60)).padStart(2, 0);
    const sec = String(activity.repTime % 60).padStart(2, 0);
    let html = `
    <div class="display__title">${activity.title}</div>
    <div class="display__timer">${min}:${sec}</div>
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
 `;

    sectionDisplay.insertAdjacentHTML("beforeend", html);
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
      class="creator__icon-img"
      src="/img/creatorIcon-${activity.logo}.svg"
      alt="sports logo"
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

    if (!currAct) return;
    //if found

    //temporary timer setting
    currActTimer.textContent = currAct.repTime;
    currActTitle.textContent = currAct.title;
    currActReps.textContent = `Reps: 0/${currAct.reps}`;
    currActSets.textContent = `Sets: 0/${currAct.sets}`;

    //Timer
  }

  _timer() {
    const start = document.querySelector(".display__btn--start");
    start.classList.contains("stopBtn")
      ? start.classList.remove("stopBtn")
      : start.classList.add("stopBtn");

    start.textContent === "stop"
      ? (start.textContent = "start")
      : (start.textContent = "stop");
    //Setting the time to given amount
    let timer = document.querySelector(".display__timer");
    let timerValue = document.querySelector(".display__timer").textContent;
    let time = timerValue.slice(0, 2) * 60;

    //Call Timer every second
    const timeInterval = setInterval(function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
      //In each callback call print the remaining time to the UI
      timer.textContent = `${min}:${sec}`;
      //Decrease by 1 s
      time--;
      console.log(timer);
      // When the time is at 0 secs, stop the timer and do other stuff
      if (time < 0) clearInterval(timeInterval);
    }, 1000);
  }

  _setLocalStorage() {
    localStorage.setItem("activities", JSON.stringify(this.#activities));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("activities"));

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
