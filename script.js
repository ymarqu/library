let form = document.querySelector("form");
let display = document.querySelector(".display");
let booksRead = document.querySelector(".books-read");
let pagesRead = document.querySelector(".pages-read");
let pagesLeft = document.querySelector(".pages-left");
let overLay = document.querySelector('.modal-overlay');

let deleteAll = document.querySelector(".delete-btn");

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

class Library{
    constructor(){
        this.myLibrary = [];
        this.bookCount = 0;
        this.pageCount = 0;
    }
    addBookToLibrary(newBook){
        this.myLibrary.push(newBook);
        if(newBook.read){
        this.updateBookCount();
        let newPages = parseInt(newBook.pages)
        console.log(newPages)
        this.updatePageCount(newPages);
        }
    }

    deleteBook(elem){
        let index = parseInt(elem.parentNode.dataset.id);

        if(this.myLibrary[index].read){
            this.bookCount -= 1;
            this.pageCount -= parseInt(this.myLibrary[index].pages)

        }
        this.myLibrary.splice(index, 1);
    }
    updateRead(elem){
    let idx = parseInt(elem.parentNode.parentNode.parentNode.dataset.id);
    this.myLibrary[idx].read = !this.myLibrary[idx].read;
    let bookPages = parseInt(elem.dataset.pages);
    if(!elem.classList.contains('fa-x')){
        this.pageCount -= bookPages;
        this.bookCount -= 1;
    }else{
        this.pageCount += bookPages;
        this.bookCount += 1;
    }
        elem.classList.toggle('fa-x');
        elem.classList.toggle('fa-check');
    }
    updateBookCount(){
        this.bookCount += 1;
    }
    updatePageCount(pages){
        this.pageCount += pages
    }
    deleteAll(){
        this.myLibrary = [];
        this.bookCount =0;
        this.pageCount =0;
    }


    get getPageCount(){
        return this.pageCount;
    }
    get getBookCount(){
        return this.bookCount;
    }


}
class screenUpdates {
    updateStatus(pages, books){
        booksRead.innerHTML = books;
        pagesRead.innerHTML = pages;
        let leftOver = 1000 - pages;
        if(leftOver <= 0){
           pagesLeft.innerHTML = 0;
           pagesLeft.style.color = "#40513B";
        }else{
        pagesLeft.innerHTML = leftOver;
        pagesLeft.style.color = "#FF0303";
        }

       }
    updateDisplay(library){
        console.log(library)
        let index = 0;
        let books = library.myLibrary.map(b => {
           let lib = `<div class="book" data-id=${index}>
            <i class="fa-solid fa-trash trash"></i>
            <h4>${b.title}</h4>
            <p class="author">${b.author}</p>
            <div class="bottom">
            <p class="page">Page count: ${b.pages}</p>
            <div class="read" <p>Read:</p>`
            lib += b.read ? `<i class="fa-solid fa-check status check" data-pages=${b.pages}></i> </div></div></div>` : `<i class="fa-solid fa-x status ex " data-pages=${b.pages}></i></div></div></div>`
            index++;
            return lib;
        });

        this.updateStatus(library.pageCount, library.bookCount);
        display.innerHTML = books.join("");
        }

}



const library = new Library();
const screenController = new screenUpdates();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const myBook = new Book(form["title"].value, form["author"].value, form["pages"].value, form["read"].checked);
    library.addBookToLibrary(myBook);
    screenController.updateDisplay(library);
    form.reset();

});

deleteAll.addEventListener('click', () => {
    overLay.classList.add('open-modal');
})

document.addEventListener("click", (e) =>{

    if(e.target.classList.contains('trash')){
        library.deleteBook(e.target);
        screenController.updateDisplay(library);
    }
    if(e.target.classList.contains('status')){
        library.updateRead(e.target);
        screenController.updateDisplay(library);
    }

  });

document.querySelectorAll('.selc-btn').forEach( option => {
    option.addEventListener('click', () => {
        if(option.dataset.response === 'yes'){
           myLibrary.deleteAll()
           screenController.updateDisplay(library);
        }
        overLay.classList.remove('open-modal')
    })
});
