document.addEventListener('DOMContentLoaded',() =>{
 getPictures()
 submitform()
 getComments() 
})

 function getPictures(){
    fetch('https://anime-facts-rest-api.herokuapp.com/api/v1')
    .then(resp => resp.json())
    .then(info => {info.data.forEach(element => {
        displayData(element)
    });});
}

 function displayData(pic){
    let option = document.createElement('li')
    option.innerHTML = pic.anime_name
    let name = document.getElementById('breed') 
    name.appendChild(option)
    option.addEventListener('click',() =>{
        picDislpay(pic)
        console.log(pic.anime_img)
    })
    console.log(option)
}
 
function picDislpay(pict){
    document.querySelector('img').src = pict.anime_img
    console.log(pict.anime_img);
}

function getComments(){
    fetch("http://localhost:3000/posts")
    .then(resp => resp.json())
    .then(data => data.forEach(element => inputComment(element))
    )
}

function inputComment(comment){
    const li = document.createElement('li')
      li.className = "quote-card"
    li.innerHTML=`
    <blockquote class="blockquote">
      <p class="mb-0">${comment.comment}</p>
      <footer class="blockquote-footer">${comment.name}</footer>
      <br>
      <button id="like-${comment.id}">Likes: <span>0</span></button>
      <button id= "${comment.id}">Delete</button>
    </blockquote>
    `
    document.getElementById('quote-list').appendChild(li)
     const deleBtn = document.getElementById(comment.id)
     deleBtn.addEventListener('click',() =>{
        deletecomment(li)
     })
     const likBtn = document.getElementById(`like-${comment.id}`)
     let likes = 0
     likBtn.addEventListener('click',() => {
        likes +=1
        likBtn.innerHTML = `likes: <span>${likes}</span>`
       incrementLikes(comment.id);
     })
}

function submitform(){
    const form = document.querySelector('form')
    form.addEventListener('submit',(e) => {
        e.preventDefault()
        const comment = form.comment.value
        const name = form.name.value
        
        const dataObjct = {
            comment: comment,
            name: name
        }
        displayComment(dataObjct)
    })
}

function displayComment(comment){
    fetch("http://localhost:3000/posts",{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    .then(resp => resp.json())
    .then(data => inputComment(data))
     
    
}

function deletecomment(post){
    post.remove()
}

function incrementLikes(likes){
    fetch("http://localhost:3000/likes",{
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
             quoteId : likes.id,
             like : 1558524356
        })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
     

}


