// Book Constructor

function Book (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;    
}

// UI Constuctor

function UI(){}


// Add book to list

UI.prototype.addBookToList = function(book){
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

// Show Alert
UI.prototype.showAlert  = function(message, className){
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

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


// Celear Fields
UI.prototype.clearfields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}




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

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearfields();
    }


    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){

    // Instatiate a UI obj
    const ui = new UI();

    ui.deleteBook(e.target);

    if(e.target.className === 'delete'){
        // Show message
        ui.showAlert('Book Removed.', 'success');
    }

    e.preventDefault();
})