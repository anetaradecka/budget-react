export const burgerMenuToggle = () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("#secondary-menu");

  const openBurgerMenu = (event) => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  };

  openBurgerMenu();

  document.querySelectorAll("#secondary-menu .nav-item").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
};
