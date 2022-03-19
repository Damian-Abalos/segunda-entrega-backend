const {Router} = require("express")

const productos = require('../daos/productos/ProductosDaoArchivo')
const carritos = require('../daos/carritos/CarritosDaoArchivo')

const rutaCarrito = Router();

//carrito

rutaCarrito.get("/", (req, res) => {
    carritos.getAll().then((resp) => res.send(resp));
});

rutaCarrito.get("/:id", (req, res) =>{
    const id = req.params.id;
    console.log(id);
    carritos.getById(id).then((resp) => res.send(resp));
})

rutaCarrito.post('/', (req, res) => {
    carritos.save().then(resp => res.send(resp))
})

rutaCarrito.delete('/:id', (req, res) => {
    const id = req.params.id
    carritos.deleteByID(id).then(resp => res.send(resp))
})

rutaCarrito.post('/:id/productos', (req, res) => {
    const id = req.params.id
    const id_prod = req.body.id_prod
    productos.getById(id_prod)
        .then(resp => {
            carritos.saveById(resp, id).then(respo => res.send(respo))
        })
})

rutaCarrito.get('/:id/productos', (req, res) => {
    const id = req.params.id
    carritos.getProductsById(id).then(resp => res.send(resp))
})

rutaCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    carritos.updateCartById(id, id_prod).then(resp => res.send(resp))
})

module.exports = rutaCarrito