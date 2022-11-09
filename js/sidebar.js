const sideBtnOpen = document.querySelector("sidebar__btn--open");
const sideBtnClose = document.querySelector("sidebar__btn--close");
const sidebar = document.querySelector("sidebar__content");

const openSide = function () {
  sidebar.classList.remove("hidden");
};

sideBtnOpen.addEventListener("click", openSide);
