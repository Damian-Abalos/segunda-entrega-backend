const express = require("express")
const rutaProductos = require("./src/routers/productos.js")
const rutaCarrito = require("./src/routers/carrito.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/api/productos", rutaProductos);
app.use("/api/carrito", rutaCarrito)

app.listen(8080, () => {
    console.log("server on");
});