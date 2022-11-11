const sideBtnOpen = document.querySelector(".sidebar__btn--open");
const sideBtnClose = document.querySelector(".sidebar__btn--close");
const sideBtnNew = document.querySelector(".sidebar__btn--new");
const createBtnClose = document.querySelector(".creator__btn-close");
const sidebar = document.querySelector(".sidebar__content");
const creator = document.querySelector(".section__creator");

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
