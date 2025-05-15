const myLibrary = [];

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
    
    addBook(){
        myLibrary.push(this);
    }

    toggleRead(){
        if(this.read == 1){
            this.read = 0;
        }
        else{
            this.read = 1;
        }
    }
}


const container = document.getElementById("container");

function display(){
    container.textContent = "";
    console.log("I am running");
    for(let i = 0; i < myLibrary.length; i++){
        let card = document.createElement("div");
        if(myLibrary[i].read == 1){
            card.textContent = myLibrary[i].title + " by " + myLibrary[i].author + ", with " + myLibrary[i].pages + " pages, " + "you have read" + ", ID is " + myLibrary[i].id;
        }
        else {
            card.textContent = myLibrary[i].title + " by " + myLibrary[i].author + ", with " + myLibrary[i].pages + " pages, " + "you have not read" + ", ID is " + myLibrary[i].id;
        }
        card.style.backgroundColor = "rgb(155,70,70)";
        /*card.setAttribute("id", myLibrary[i].id)*/
        card.setAttribute("class", "card");
        card.style.color = "rgb(250,200,45)";

        let myButton = document.createElement("button");
        myButton.setAttribute("class", "remove");
        myButton.setAttribute("id", myLibrary[i].id);
        myButton.textContent = "REMOVE FROM LIBRARY";
        card.appendChild(myButton);

        let readButton = document.createElement("button");
        readButton.setAttribute("class", "read");
        readButton.setAttribute("data-id", myLibrary[i].id);
        readButton.textContent = "TOGGLE READ";
        card.appendChild(readButton);

        container.appendChild(card);
    }

    let rmButtons = Array.from(document.getElementsByClassName("remove"));
    rmButtons.forEach(button => {
    button.addEventListener("click", () => {
        let id = button.id;
        let index = myLibrary.findIndex(book => book.id === id);
        myLibrary.splice(index,1);
        display();
        console.log(this.read);
        });
    });

    let readButtons = Array.from(document.getElementsByClassName("read"));
    readButtons.forEach((button)=>{
        button.addEventListener("click", () =>{
            let id = (button.dataset.id);
            console.log(id);
            let thisBook = myLibrary.find(book => book.id == id);
            console.log(thisBook.id);
            thisBook.toggleRead();
            display();
        });
    });

}


const addButton = document.getElementById("addButton");
const dialog = document.getElementById("dialog");

addButton.addEventListener("click",()=>{
    dialog.showModal();
    let title = document.getElementById("title");
    title.addEventListener("input", ()=>{
        title.setCustomValidity("");
        if(!title.validity.valid){
            return;
        }
        const hasNumbers = /\d/.test(title.value); 
        if(hasNumbers){
            title.setCustomValidity("No numbers please");
            title.reportValidity();
        }
    });
});

const close = document.getElementById("close");
close.addEventListener("click",()=>{
    dialog.close();
});

const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    let book = new Book(title, author, pages, read);
    book.addBook();
    display();
    dialog.close();
});



