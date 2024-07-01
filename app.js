const express = require("express")

const app = express()

let id = 1

app.get("/books")
app.get("/books/:id")
app.post("/books")
app.put("/books/:id")

app.listen(3000, console.log("server en puerto 3000"))