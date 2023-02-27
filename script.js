let btn = document.querySelector("button");
let form = document.querySelector("form");
let display = document.querySelector(".display");
let booksRead = document.querySelector(".books-read");
let pagesRead = document.querySelector(".pages-read");
let pagesLeft = document.querySelector(".pages-left");
let myLibrary = [];


function Book(title, author, pages, read){
    this.id = myLibrary.length
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(newBook){
    myLibrary.push(newBook);
    display.innerHTML = updateDisplay();

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const myBook = new Book(form["title"].value, form["author"].value, form["pages"].value, form["read"].checked);
    addBookToLibrary(myBook);
    form.reset();

});

function updateDisplay(){
let books = myLibrary.map(b => {
    lib = `<div class="book" data-id=${b.id}>
    <i class="fa-solid fa-trash trash"></i>
    <h4>${b.title}</h4>
    <p>${b.author}</p>
    <p>Page count: ${b.pages}</p>
    <div class="read">`
    lib += b.read ? `<i class="fa-solid fa-check status check"></i> </div></div>` : `<i class="fa-solid fa-x status ex"></i></div></div>`
    return lib;
})
return books.join("");
}

// document.querySelectorAll(".trash").forEach(t => {
//     t.addEventListener('click', () => {
//     console.log('click');
//     let deleteBook = t.parentNode;
//     console.log(deleteBook.dataset.id)
// })})

// document.querySelectorAll(".status").forEach(stat => {
//     stat.addEventListener('click', () =>{
//         console.log(click);
//         console.log(stat.innerHTML)
//     })
// })
display.addEventListener('click', (e) => {
    console.log(e.target)
    console.log('click')
})

document.addEventListener("click", (e) =>{
    // const target = e.target.closest("h4"); // Or any other selector.
    // console.log(target);
    console.log(e.target)
    console.log(e)

    // if(target){
    //   // Do something with `target`.
    // }
  });
