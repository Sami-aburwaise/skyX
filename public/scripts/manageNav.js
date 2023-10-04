const editProfileLink = document.querySelector('#editProfileLink')
console.log(window.location.pathname)
if (window.location.pathname == '/user/profile') {
  editProfileLink.style.display = 'block'
}
