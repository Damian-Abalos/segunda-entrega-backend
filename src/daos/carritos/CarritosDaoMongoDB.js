const config = require ('../../utils/config.js')
const ContenedorCarritosMongoDB = require("../../contenedores/ContenedorCarritosMongoDB")

const carritos = new ContenedorCarritosMongoDB(config.mongoLocal.cnxStr, 'carrito')

module.exports = carritos