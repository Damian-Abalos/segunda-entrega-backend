const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {model} = require('mongoose');

class ContenedorMongoDB{

    constructor(url, collection) {
        this.url = url

        this.productSchema = new Schema({
            nombre:{type: String, required: true},
            descripcion:{type: String, required: true},
            codigo:{type: String, required: true},
            foto:{type: String, required: true},
            precio:{type: Number, required: true},
            stock:{type: Number, required: true},
            timestamp:{type: String, required: true},
            id:{type: Number, required: true},
        })

        this.ProductModel = model(collection, this.productSchema)
    }

    async getAll() {
        try {
            await mongoose.connect(this.url)
            console.log('mongoose conected');
            return await this.ProductModel.find()            
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async getById(id) {
        try {
            await mongoose.connect(this.url)
            return await this.ProductModel.find({id: id})            
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async getProductsById(id) {

    }

    async save(object) {
        try {
            // await mongoose.connect(this.url)
            const data = await this.getAll()
            let ultimoId;
            let ultimoProducto = await data[data.length - 1];

            if (data.length == 0) { ultimoId = 0 } else { ultimoId = ultimoProducto.id }

            const nId = await ultimoId + 1
            // const nId = await this.getLastId()
            console.log(nId);
            const time = Date(Date.now()).toString()
            const nuevoProducto = await new this.ProductModel({ ...object, timestamp: time, id:nId})
            await mongoose.connect(this.url)
            const toSave = await nuevoProducto.save()
            // return toSave
            console.log(`producto cargado: ${toSave}`);
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async saveById(object, id) {

    }


    async updateById(object, id) {
        try {
            await mongoose.connect(this.url)
            let resultado = await this.ProductModel.updateOne({ id: id}, {$set: object})
            console.log(`producto actualizado: ${resultado}`)
            return resultado
        } catch (error) {
            throw new Error(`Error al modificar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }   
    }

    async updateCartById(id, id_prod) {

    }

    async deleteById(id) {
        try {
            await mongoose.connect(this.url)
            let resultado = await this.ProductModel.deleteOne({ id: id})
            console.log(`producto eliminado: ${resultado}`);
            return resultado
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }
}

module.exports = ContenedorMongoDB