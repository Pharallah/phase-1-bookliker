// When the page loads, get a list of books from http://localhost:3000/books and display their titles by creating a li for each book and adding each li to the ul#list element.

// When a user clicks the title of a book, display the book's thumbnail, description, and a list of users who have liked the book. This information should be displayed in the div#show-panel element.


document.addEventListener("DOMContentLoaded", listBooks);


function listBooks() {
    const booksURL = "http://localhost:3000/books"
    fetch(booksURL)
    .then(res => res.json())
    .then(bookList => {
        bookList.forEach(book => {
            const ul = document.querySelector('#list')
            const li = document.createElement('li')
            
            li.innerText = book.title

            ul.appendChild(li)

            // EL for Titles
            li.addEventListener("click", () => {
                const showPanel = document.querySelector('#show-panel')
                showPanel.innerText = ""
                
                const img = document.createElement('img')
                const p = document.createElement('p')
                img.src = book.img_url
                p.innerText = book.description
                
                showPanel.append(img, p)
                
                const userList = book.users
                const ul2 = document.createElement('ul')
                ul2.id = "usersLiked"
                
                userList.forEach(user => { 
                    const li2 = document.createElement('li')
                    li2.innerText = user.username
                    ul2.appendChild(li2)
                    showPanel.append(ul2)
                })

                const likeBtn = document.createElement('button')
                likeBtn.innerText = "LIKE"
                showPanel.append(likeBtn)   
                
                //EL for Like Button
                likeBtn.addEventListener('click', () => {
                    const usersLiked = document.querySelector('#usersLiked')
                    usersLiked.innerHTML = ""
                    
                    const imUser = {
                        id: 100,
                        username: "Harry"
                    }
                   
                    book.users.push(imUser)
                    updateUsers(book)

                    userList.forEach(user => {
                    const li2 = document.createElement('li')
                    li2.innerText = user.username
                    ul2.appendChild(li2)
                    })
                   }
                )
            })
        })
    })
}


function updateUsers(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then(data => console.log(data))

}

