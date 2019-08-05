

var opener = document.querySelector('.menu-opener')
var menu = document.querySelectorAll('.main-nav')[0]
console.log(opener)
console.log(menu)
console.log(document.querySelectorAll('a'))
var openMenu = function(){
  menu.classList.toggle('is-opened')
}
opener.addEventListener('click', openMenu)