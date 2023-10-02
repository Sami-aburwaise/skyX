const comments = document.querySelectorAll('.editable')

const editField = (c) => {
  c.innerHTML = `
  <form action="/comment/update?id=${
    c.querySelector('p').dataset.id
  }" method="post">
    <input type="text" name="content" value=${c.innerText}>
    <button>update</button>
  </form>
  <button type="button" onclick='location.reload()'>cancel</button>
  <button type="button" onclick='window.location="/comment/delete?id=${
    c.querySelector('p').dataset.id
  }"'>delete</button>
  `
}

comments.forEach((comment) => {
  comment.querySelector('p').addEventListener('click', () => editField(comment))
})
