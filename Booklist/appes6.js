class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book){
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert col
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.autho}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className){
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const Jcontainer = document.querySelector('.container');
        // Get form
        const Jform = document.querySelector('#book-form');
        // Insert Alert
        Jcontainer.insertBefore(div, Jform);

        // Timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

}

// Local storage class
class Store {
    
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listeners for add book
document.getElementById('book-form').addEventListener('submit',  function(e){
   
    // Get form values
    const Jtitle = document.getElementById('title').value,
          Jauthor = document.getElementById('author').value,
          Jisbn = document.getElementById('isbn').value;
    
    // Instantiate a book
    const book = new Book(Jtitle, Jauthor, Jisbn);

    // Instatiate a UI obj
    const ui = new UI();

    // Validate 
    if(Jtitle === '' || Jauthor === '' || Jisbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to locaal storage
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }


    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

    // Instatiate a UI obj
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    if(e.target.className === 'delete'){
        // Show message
        ui.showAlert('Book Removed.', 'success');
    }

    e.preventDefault();
})