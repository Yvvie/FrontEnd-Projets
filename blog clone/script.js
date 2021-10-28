const toogleMenu = document.querySelector(".main-menu-container");
const menu = document.querySelector(".menu-toggle");

menu.addEventListener('click', (e) =>{
    toogleMenu.classList.toggle("nav-menu")
});

const category = document.querySelector(".search-first");
const innerItems = document.querySelector(".inner-menu");

category.addEventListener('click', (e) => {
    innerItems.classList.toggle('inner-menu-open')
})
