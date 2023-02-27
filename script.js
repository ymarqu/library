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
    updateDisplay();

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
    <div class="read" <p>read:</p>`
    lib += b.read ? `<i class="fa-solid fa-check status check"></i> </div></div>` : `<i class="fa-solid fa-x status ex"></i></div></div>`
    return lib;
})
display.innerHTML = books.join("");
}


document.addEventListener("click", (e) =>{

    if(e.target.classList.contains('trash')){
        deleteBook(e.target);
    }
    if(e.target.classList.contains('status')){
        updateStatus(e.target);
    }
  });


function deleteBook(elem){
    console.log(elem)
    let index = parseInt(elem.parentNode.dataset.id);
    myLibrary.splice(index, 1);
    console.log(myLibrary);
    updateDisplay();

}

function updateStatus(elem){
    console.log(elem);
        elem.classList.toggle('fa-x');
        elem.classList.toggle('fa-check');
        elem.classList.toggle('ex');
        elem.classList.toggle('check');

    }
