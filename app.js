const express = require("express")

const app = express()

app.use(express.json())

let libros = []

app.get("/books")
app.get("/books/:id")

app.post("/books", (req, res) => {
    const { title, author, year } = req.body;

    const id = new Date().getTime();

    if (!title || !author || !year) {
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


app.put("/books/:id")

app.listen(3000, console.log("server en puerto 3000"))