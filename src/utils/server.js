const express = require("express")
const rutaProductos = require("../routers/productos.js")
const rutaCarrito = require("../routers/carrito.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/api/productos", rutaProductos);
app.use('/api/carrito', rutaCarrito)

app.listen(8080, () => {
    console.log("server on");
});