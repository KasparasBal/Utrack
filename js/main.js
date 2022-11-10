const sideBtnOpen = document.querySelector(".sidebar__btn--open");
const sideBtnClose = document.querySelector(".sidebar__btn--close");
const sideBtnNew = document.querySelector(".sidebar__btn--new");
const sidebar = document.querySelector(".sidebar__content");

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
const openCreator = function () {};

sideBtnOpen.addEventListener("click", openSide);
sideBtnClose.addEventListener("click", closeSide);

sideBtnNew.addEventListener("click", openCreator);
