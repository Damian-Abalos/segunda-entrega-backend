const config = require ('../../utils/config.js')
const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB")

const productos = new ContenedorMongoDB(config.mongoLocal.cnxStr, 'productos')

module.exports = productos