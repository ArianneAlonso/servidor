const express = require("express")

const app = express()

app.use(express.json())

let libros = []

app.get("/books", (req, res)=>{

    res.json(libros)
})
app.get("/books/:id", (req, res)=>{

    const { id }= req.params

    const book = libros.find(elemento => elemento.id === id)

    if (!book) return res.sendstatus(204)

    res.json(book)
})

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

app.put("/books/:id", (req, res) => {
    const  id = parseInt(req.params.id);
    const { title, author, year } = req.body;

    //const getBook = db.find((e)=> e.id === id);
    //getBook.title = title
    //getBook.author = author
    //getBook.year = year
    //console.log(getBook)
    //res.json("Libro actualizado");

    const index = libros.findIndex( elemento => elemento.id === +id )
    libros[index] = {
        title,
        author,
        year
    }
});

app.delete("/books/:id", (req, res)=>{

})

app.listen(3000, console.log("server en puerto 3000"))
///////////////////////////chat gpt////////////////////////////

// Importa el módulo express
const express = require("express");

// Crea una instancia de una aplicación express
const app = express();

// Middleware para analizar cuerpos de solicitudes JSON
app.use(express.json());

// Array para almacenar libros
let libros = [];

// Ruta GET para obtener todos los libros
app.get("/books", (req, res) => {
    // Devuelve el array de libros en formato JSON
    res.json(libros);
});

// Ruta GET para obtener un libro por su id
app.get("/books/:id", (req, res) => {
    // Extrae el parámetro id de la solicitud
    const { id } = req.params;

    // Busca el libro con el id proporcionado
    const book = libros.find(elemento => elemento.id === parseInt(id));

    // Si no se encuentra el libro, devuelve el estado 204 (sin contenido)
    if (!book) return res.sendStatus(204);

    // Devuelve el libro encontrado en formato JSON
    res.json(book);
});

// Ruta POST para agregar un nuevo libro
app.post("/books", (req, res) => {
    // Extrae el título, autor y año del cuerpo de la solicitud
    const { title, author, year } = req.body;

    // Genera un id único basado en la marca de tiempo actual
    const id = new Date().getTime();

    // Verifica que los campos no estén vacíos después de eliminar espacios en blanco
    if (!title.trim() || !author.trim() || !year.trim()) {
        return res.status(400).send("Faltan valores");
    }

    // Crea un nuevo objeto libro
    const newBook = {
        id,
        title,
        author,
        year: parseInt(year) // Convierte el año a un número entero
    };

    // Agrega el nuevo libro al array de libros
    libros.push(newBook);

    // Envía una respuesta indicando que el libro fue creado
    res.send("Libro creado");
});

// Ruta PUT para actualizar un libro por su id
app.put("/books/:id", (req, res) => {
    // Convierte el parámetro id a un número entero
    const id = parseInt(req.params.id);
    // Extrae el título, autor y año del cuerpo de la solicitud
    const { title, author, year } = req.body;

    // Encuentra el índice del libro con el id proporcionado
    const index = libros.findIndex(elemento => elemento.id === id);

    // Si no se encuentra el libro, devuelve el estado 404 (no encontrado)
    if (index === -1) {
        return res.status(404).send("Libro no encontrado");
    }

    // Actualiza el libro con los nuevos datos
    libros[index] = {
        id,
        title,
        author,
        year: parseInt(year) // Convierte el año a un número entero
    };

    // Envía una respuesta indicando que el libro fue actualizado
    res.send("Libro actualizado");
});

// Ruta DELETE para eliminar un libro por su id
app.delete("/books/:id", (req, res) => {
    // Convierte el parámetro id a un número entero
    const id = parseInt(req.params.id);
    // Encuentra el índice del libro con el id proporcionado
    const index = libros.findIndex(elemento => elemento.id === id);

    // Si no se encuentra el libro, devuelve el estado 404 (no encontrado)
    if (index === -1) {
        return res.status(404).send("Libro no encontrado");
    }

    // Elimina el libro del array de libros
    libros.splice(index, 1);
    // Envía una respuesta indicando que el libro fue eliminado
    res.send("Libro eliminado");
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor en puerto 3000"));

////////////felix////////////
//importar express
const express = require("express");
const app = express();
const database = require("./database")
const { v4: uuidv4 } = require('uuid');

const generateId = () => {
    return new Date().getTime()
}

// middlewares
app.use(express.json());
app.use(express.text());
//mostrar la base de datos en el servidor 
app.get("/products", (req, res) => {
    res.json(database)

});
// mostrar el producto por id
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);  // Convertir el id a un número entero
    const condicion = product => product.id === id
    const result = database.find(condicion);  // Buscar el producto por su id

    if (result) {
        res.json(result);  // Enviar el producto encontrado como respuesta
    } else {
        res.status(404).json({ message: "Producto no encontrado" });  // Enviar un mensaje de error si no se encuentra el producto
    }
});


// agregamos un producto
app.post("/products", (req, res) => {
    const id = generateId();
    const { name, quantity, price } = req.body
    database.push({
        id,
        name,
        quantity,
        price
    });
    res.send("producto agregado")
})

//editar un producto
app.put("/products/:id", (req, res) => {
    const id = +req.params.id;  // Corrección aquí
    const { name, quantity, price } = req.body;

    const condicion = (producto) => producto.id == id;
    const resultado = database.findIndex(condicion);  // Corrección aquí

    if (resultado !== -1) {
        // Actualizar el producto si se encuentra
        database[resultado] = { id, name, quantity, price };
        res.json({ message: "Producto actualizado correctamente"});
    } else {
        // Si el producto no se encuentra
        res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log(resultado);  // Corrección aquí
});


//eliminar un producto
app.delete("/products/:id", (req, res) => {
    const idProducts = req.params
    database.splice(idProducts, 1)
})


// se escucha el servidor 
app.listen(4000, () => {
    console.log("servidor funcionando en puerto ", 4000);
});

