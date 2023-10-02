//  select what media type
const selectMedia = document.querySelector('select')
const mediaSource = document.querySelector('#mediaSource')

selectMedia.addEventListener('click', () => {
  console.log(selectMedia.value)
  if (selectMedia.value == 'video') {
    mediaSource.innerHTML = `  
    <label> Video link : </label>
    <input type="text" name="path">`
  } else if (selectMedia.value == 'image') {
    mediaSource.innerHTML = `  
      <label id="uploadButton" 
      name="path"> upload image </label>
      <input type='file' id="file" name="path" accept='image/*' onchange="loadFile(event)" style="opacity: 0;"/>

      <img alt="uploaded image" width="200" id="uploadedImage"/> 
    `
  } else if (selectMedia.value == 'noMedia') {
    mediaSource.innerHTML = ``
  }
})

//
let loadFile = function (event) {
  let image = document.getElementById('uploadedImage')
  image.src = URL.createObjectURL(event.target.files[0])
  image.style.display = 'inline'
  mediaSource.appendChild(image)
}
