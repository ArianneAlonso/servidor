const express = require("express")

const app = express()

app.use(express.json())

let libros = []

app.get("/books")
app.get("/books/:id")

app.post("/books", (req, res) => {
    const { title, author, year } = req.body;

    const id = new Date().getTime();
//elimina espacios antes y despues el trim
    if (!title.trim || !author.trim || !year.trim) {
        return res.status(400).send("Faltan valores");
    }

    const newBook = {
        "id": id,
        "title": title,
        "author": author,
        "year": parseInt(year)
    };

    libros.push(newBook);

    res.send("Libro creado");
});
//
app.put("/books/:id", (req, res) => {
    const  id = parseInt(req.params.id);
    const { title, author, year } = req.body;

    const getBook = db.find((e)=> e.id === id);

    getBook.title = title
    getBook.author = author
    getBook.year = year
    
    console.log(getBook)
    res.json("Libro actualizado");
});

app.listen(3000, console.log("server en puerto 3000"))
///////////////////////////////////////////////////////
const express = require("express");

const app = express();

app.use(express.json());

let libros = [];

app.get("/books", (req, res) => {
    res.json(libros);
});

app.get("/books/:id", (req, res) => {
    const { id } = req.params;
    const libro = libros.find(l => l.id === parseInt(id));

    if (!libro) {
        return res.status(404).send("Libro no encontrado");
    }

    res.json(libro);
});

app.post("/books", (req, res) => {
    const { title, author, year } = req.body;

    const id = new Date().getTime();
    // elimina espacios antes y después con trim()
    if (!title.trim() || !author.trim() || !year.trim()) {
        return res.status(400).send("Faltan valores");
    }

    const newBook = {
        id: id,
        title: title,
        author: author,
        year: parseInt(year)
    };

    libros.push(newBook);

    res.send("Libro creado");
});

app.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;

    const libro = libros.find(l => l.id === parseInt(id));

    if (!libro) {
        return res.status(404).send("Libro no encontrado");
    }

    // Actualizar los valores del libro existente
    if (title) libro.title = title.trim();
    if (author) libro.author = author.trim();
    if (year) libro.year = parseInt(year);

    res.send("Libro actualizado");
});

app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    const index = libros.findIndex(l => l.id === parseInt(id));

    if (index === -1) {
        return res.status(404).send("Libro no encontrado");
    }

    libros.splice(index, 1);

    res.send("Libro eliminado");
});

app.listen(3000, () => console.log("Servidor en puerto 3000"));
