const {Router} = require("express")

// const productos = require('../daos/productos/ProductosDaoArchivo')
// const carritos = require('../daos/carritos/CarritosDaoArchivo')

const productos = require('../daos/productos/ProductosDaoMongoDB')
const carritos = require('../daos/carritos/CarritosDaoMongoDB')

// const productos = require('../daos/productos/ProductosDaoFirebase')
// const carritos = require('../daos/carritos/CarritosDaoFirebase')

const rutaCarrito = Router();

//carrito

rutaCarrito.get("/", (req, res) => {
    carritos.getAllCarts().then((resp) => res.send(resp));
});

rutaCarrito.get("/:id", (req, res) =>{
    const id = req.params.id;
    console.log(id);
    carritos.getById(id).then((resp) => res.send(resp));
})

rutaCarrito.post('/', (req, res) => {
    let object = req.body
    carritos.save(object).then(resp => res.send(resp))
})

rutaCarrito.delete('/:id', (req, res) => {
    const id = req.params.id
    carritos.deleteById(id).then(resp => res.send(resp))
})

rutaCarrito.post('/:id/productos', async (req, res) => {
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