const sideBtnOpen = document.querySelector(".sidebar__btn--open");
const sideBtnClose = document.querySelector(".sidebar__btn--close");
const sidebar = document.querySelector(".sidebar__content");

const openSide = function () {
  sidebar.classList.remove("hidden-sidebar");
};
const closeSide = function () {
  sidebar.classList.add("hidden-sidebar");
};

sideBtnOpen.addEventListener("click", openSide);
sideBtnClose.addEventListener("click", closeSide);
