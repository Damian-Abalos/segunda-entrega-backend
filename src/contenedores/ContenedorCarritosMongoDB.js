const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const {model} = require('mongoose');

class ContenedorCarritosMongoDB{
    constructor(url, collection) {
        this.url = url


        this.carritoSchema = new Schema({
            id:{type: Number, required: true},
            timestamp:{type: String, required: true},
            productos:{type: Array, required: true},
        })

        this.CarritoModel = model(collection, this.carritoSchema)
    }

    async getAllCarts() {
        try {
            await mongoose.connect(this.url)
            console.log('mongoose conected');
            return await this.CarritoModel.find()            
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
            return await this.CarritoModel.find({id: id})            
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async getProductsById(id) {
        try {
            await mongoose.connect(this.url)
            const productos = await this.CarritoModel.find({id:id},{productos:1,_id:0})
            console.log(productos);
            return productos


        } catch (error) {
            throw new Error(`Error al buscar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async saveCart(object) {
        try {
            const data = await this.getAllCarts()
            let ultimoId;
            let ultimoCarrito = await data[data.length - 1];

            if (data.length == 0) { ultimoId = 0 } else { ultimoId = ultimoCarrito.id }

            const nId = await ultimoId + 1
            console.log(nId);
            const time = Date(Date.now()).toString()
            const nuevoCarrito = await new this.CarritoModel({ ...object, timestamp: time, id:nId})
            await mongoose.connect(this.url)
            const toSave = await nuevoCarrito.save()
            console.log(`carrito cargado: ${toSave}`);
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }
    async saveById(object, id) {
        try {
                await mongoose.connect(this.url)
                console.log(`Producto a cargar: ${object}`);
                let resultado = await this.CarritoModel.updateOne({id: id},{$push: {productos:object}})
                console.log(`Producto cargado: ${resultado}`);
                
                return `producto: ${object.nombre} cargado en carrito con id: ${id}`
            
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async updateCartById(id, id_prod) {
        try {
            await mongoose.connect(this.url)
            // const prodToDelete = await this.CarritoModel.updateOne({id:id}, {productos:{id:id_prod}})
            // const prodToDelete = await this.CarritoModel.findOneAndDelete({id:id}, {productos:{id:id_prod}})
            // console.log(prodToDelete);
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async deleteById(id) {
        try {
            await mongoose.connect(this.url)
            let resultado = await this.CarritoModel.deleteOne({ id: id})
            console.log(`carrito eliminado: ${resultado}`);
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

}

module.exports = ContenedorCarritosMongoDB