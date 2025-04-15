const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

//require mthod override
const methodOverride = require('method-override');
app.use(methodOverride("_method"));

//require unique id

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//set public folder use

app.use(express.static(path.join(__dirname, "public")))

//set view path 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//use post data parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let arBooks = [
    {
        id: uuidv4(),
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
    },
    {
        id: uuidv4(),
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
    },
    {
        id: uuidv4(),
        title: "You Don't Know JS Yet",
        author: "Kyle Simpson",
    },
    {
        id: uuidv4(),
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
    },
    {
        id: uuidv4(),
        title: "Bhagavad Gita: As It Is",
        author: "A.C. Bhaktivedanta Swami Prabhupada",
    },
    {
        id: uuidv4(),
        title: "The Essence of the Bhagavad Gita",
        author: "Paramhansa Yogananda",
    }
];

app.listen(port, () => {
    console.log(`listining on port ${port}`);
})


// to all book and main page

app.get("/books", (req, res) => {
    res.render("index.ejs", { arBooks });
});

// to add new book 

app.get("/books/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/books", (req, res) => {
    let { title, author } = req.body;
    let newBook = { id: uuidv4(), title, author };
    arBooks.push(newBook);
    res.redirect("/books");
});

//To show only on one Book data

app.get("/books/:id", (req, res) => {
    let { id } = req.params;
    let book = arBooks.find((b) => id === b.id);
    res.render("show.ejs", { book });
})

//Update data

app.patch("/books/:id", (req, res) => {
    let { id } = req.params;
    let newTitle = req.body.title;
    let newAuthor = req.body.author;
    let book = arBooks.find((b) => id === b.id);
    book.title = newTitle;
    book.author = newAuthor;
    res.redirect("/books");
});

app.get("/books/:id/edit", (req, res) => {
    let { id } = req.params;
    let book = arBooks.find((b) => id === b.id);
    res.render("edit.ejs", { book });
});

app.delete("/books/:id", (req, res) => {
    let { id } = req.params;
    arBooks = arBooks.filter((b) => id !== b.id);
    res.redirect("/books");
});