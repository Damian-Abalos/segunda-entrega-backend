const config = require ('../../utils/config.js')
const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB")
// import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB'

const productos = new ContenedorMongoDB(config.mongoLocal.cnxStr, 'productos')

module.exports = productos
// export default ProductosMongoDB