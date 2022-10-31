//books - main container holding all the books
const books = document.querySelector('.books');

//an array of book objects
let myLibrary = [];

function addLocalStorage () {
    localStorage.setItem('library', JSON.stringify([
    {
        title: "Book1",
        author: "Me",
        pages: 500,
        read: true,
    }, 
    {
        title: "Book12",
        author: "Me",
        pages: 100,
        read: false,
    },
    ])
    );
    // myLibrary = JSON.parse(localStorage.getItem('library')) || [];
    renderBooks(); 
}

//Helper function to create html elements with text content and classes
function createBookElement (el, content, className) {
    const element = document.createElement(el);
    element.textContent = content;
    element.setAttribute('class', className);
    return element;
}

//Helper function that has a checkbox input and an event listener to determine if a book has been read or not read
function createReadElement(bookItem, book) {
    let read = document.createElement('div');
    read.setAttribute('class', 'book-read');
    read.appendChild(createBookElement('h1', 'Read?', 'book-read-title'));
    let input = document.createElement('input');
    input.type = 'checkbox';
    read.appendChild(input);
    input.addEventListener('click', (e) => {
        if(e.target.checked) {
            bookItem.setAttribute('class', 'card book read-checked');
            book.read = true;
            renderBooks();
        } else {
            bookItem.setAttribute('class', 'card book read-unchecked');
            book.read = false;
            renderBooks();
        }   
    });
    if(book.read){
        input.checked = true
        bookItem.setAttribute('class', 'card book read-checked')
    }
    return read;
}

//Create the edit icon with event listener
function createEditIcon(book) {
    const editIcon = document.createElement('img');
    editIcon.src = '/assets/pencil.svg';
    editIcon.setAttribute('class', 'edit-icon');
    editIcon.addEventListener('click', (e) => console.log(book));
    return editIcon;
}

//Create non-functional icons for aesthetic purposes
function createIcon() {
    const div = createBookElement('div', null, 'icons');
    const icon1 = document.createElement('img');
    icon1.src = '/assets/star-plus-outline.svg';
    const icon2 = document.createElement('img');
    icon2.src = '/assets/source-branch.svg';
    const icon3 = document.createElement('img');
    icon3.src = '/assets/eye-plus-outline.svg';
    div.appendChild(icon1);
    div.appendChild(icon2);
    div.appendChild(icon3);
    return div;
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderBooks();
}

//Function to create a dom card for each book containing a book's details
function createBookItem (book, index) {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('id', index);
    bookItem.setAttribute('key', index);
    bookItem.setAttribute('class', 'card book');
    bookItem.appendChild(createBookElement('h1', `Title: ${book.title}`, 'book-title'));
    bookItem.appendChild(createBookElement('h1', `Author: ${book.author}`, 'book-author'));
    bookItem.appendChild(createBookElement('h1', `Pages: ${book.pages}`, 'book-pages'));
    bookItem.appendChild(createReadElement(bookItem, book));
    bookItem.appendChild(createBookElement('button', 'X', 'delete'));
    bookItem.appendChild(createIcon());
    bookItem.appendChild(createEditIcon(book));

    bookItem.querySelector('.delete').addEventListener('click', () => 
        deleteBook(index));

    books.insertAdjacentElement('afterbegin', bookItem);
}

//Function to render all the books to the dom
function renderBooks () {
    books.textContent = "";
    myLibrary.map((book, index) => createBookItem(book, index));
}

//Render on page load
addLocalStorage()