let form = document.querySelector("form");
let display = document.querySelector(".display");
let booksRead = document.querySelector(".books-read");
let pagesRead = document.querySelector(".pages-read");
let pagesLeft = document.querySelector(".pages-left");
let overLay = document.querySelector('.modal-overlay');
let myLibrary = [];
let deleteAll = document.querySelector(".delete-btn");
let bookCount = 0;
let pageCount = 0;

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
    if(myBook.read){
    bookCount += 1
    pageCount += parseInt(myBook.pages);
    }

    addBookToLibrary(myBook);
    form.reset();

});
deleteAll.addEventListener('click', () => {
    overLay.classList.add('open-modal');
})

function updateDisplay(){
let index = 0;
let books = myLibrary.map(b => {
    lib = `<div class="book" data-id=${index}>
    <i class="fa-solid fa-trash trash"></i>
    <h4>${b.title}</h4>
    <p class="author">${b.author}</p>
    <div class="bottom">
    <p class="page">Page count: ${b.pages}</p>
    <div class="read" <p>Read:</p>`
    lib += b.read ? `<i class="fa-solid fa-check status check" data-pages=${b.pages}></i> </div></div></div>` : `<i class="fa-solid fa-x status ex " data-pages=${b.pages}></i></div></div></div>`
    index++;
    return lib;
})
updateStatus();
display.innerHTML = books.join("");
}


document.addEventListener("click", (e) =>{

    if(e.target.classList.contains('trash')){
        deleteBook(e.target);
    }
    if(e.target.classList.contains('status')){
        updateRead(e.target);
    }
  });

document.querySelectorAll('.selc-btn').forEach( option => {
    option.addEventListener('click', () => {
        if(option.dataset.response === 'yes'){
           myLibrary = [];
           bookCount =0;
           pageCount =0;
           updateDisplay();
        }
        overLay.classList.remove('open-modal')
    })
});

function deleteBook(elem){
    let index = parseInt(elem.parentNode.dataset.id);

    if(myLibrary[index].read){
        bookCount -= 1;
        pageCount -= parseInt(myLibrary[index].pages)

    }
    myLibrary.splice(index, 1);
    updateDisplay();
}

function updateRead(elem){
    let idx = parseInt(elem.parentNode.parentNode.parentNode.dataset.id);
    myLibrary[idx].read = !myLibrary[idx].read;
    let bookPages = parseInt(elem.dataset.pages);
    if(!elem.classList.contains('fa-x')){
        pageCount -= bookPages;
        bookCount -= 1;
    }else{
        pageCount += bookPages;
        bookCount += 1;
    }
        elem.classList.toggle('fa-x');
        elem.classList.toggle('fa-check');
        updateDisplay();
    }

function updateStatus(){
 booksRead.innerHTML = bookCount;
 pagesRead.innerHTML = pageCount;
 let leftOver = 1000 - pageCount;
 if(leftOver <= 0){
    pagesLeft.innerHTML = 0;
    pagesLeft.style.color = "#40513B";
 }else{
 pagesLeft.innerHTML =leftOver;
 pagesLeft.style.color = "#FF0303";
 }
}
