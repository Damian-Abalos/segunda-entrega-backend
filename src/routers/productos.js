const {Router} = require("express")

// const productos = require('../daos/productos/ProductosDaoArchivo')
const productos = require('../daos/productos/ProductosDaoMongoDB')

const rutaProductos = Router();

const administrador = true;

//productos

rutaProductos.get("/", (req, res) => {
    productos.getAll().then((resp) => res.send(resp));
});

rutaProductos.get("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    productos.getById(id).then((resp) => res.send(resp));
});

rutaProductos.post("/", (req, res) => {
    const newData = req.body;
    if (administrador) {
        productos.save(newData).then((resp) => res.send(resp));
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '${req.url}' método ${req.method}, no autorizada`,
        });
    }
});

rutaProductos.put("/:id", (req, res) => {
    let id = req.params.id;
    if (administrador) {
        productos.updateById(req.body, id).then((resp) => res.send(resp));
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '${req.url}' método ${req.method}, no autorizada`,
        });
    }
});

rutaProductos.delete("/:id", (req, res) => {
    let id = req.params.id;
    if (administrador) {
        productos.deleteById(id).then((resp) => res.send(resp));
    } else {
        res.send({
            error: -1,
            descripcion: `ruta '${req.url}' método ${req.method}, no autorizada`,
        });
    }
});

module.exports = rutaProductos