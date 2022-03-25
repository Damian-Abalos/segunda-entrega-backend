const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { model } = require('mongoose');

class ContenedorMongoDB {

    constructor(url, collection, schema) {
        this.url = url

        this.collection = model(collection, schema)
    }

    async getAll() {
        try {
            await mongoose.connect(this.url)
            console.log('mongoose conected');
            return await this.collection.find()
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async getAllCarts() {
        try {
            await mongoose.connect(this.url)
            console.log('mongoose conected');
            return await this.collection.find()
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async getById(id) {
        try {
            await mongoose.connect(this.url)
            return await this.collection.find({ id: id })
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async getProductsById(id) {
        try {
            await mongoose.connect(this.url)
            const productos = await this.collection.find({ id: id }, { productos: 1, _id: 0 })
            console.log(productos);
            return productos


        } catch (error) {
            throw new Error(`Error al buscar: ${error}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async save(object) {
        try {
            const data = await this.getAll()
            let ultimoId;
            let ultimoProducto = await data[data.length - 1];

            if (data.length == 0) { ultimoId = 0 } else { ultimoId = ultimoProducto.id }

            const nId = await ultimoId + 1
            console.log(nId);
            const time = Date(Date.now()).toString()
            const nuevoProducto = await new this.collection({ ...object, timestamp: time, id: nId })
            await mongoose.connect(this.url)
            const toSave = await nuevoProducto.save()
            console.log(`producto cargado: ${toSave}`);
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async saveById(object, id) {
        try {
            await mongoose.connect(this.url)
            console.log(`Producto a cargar: ${object}`);
            let resultado = await this.collection.updateOne({ id: id }, { $push: { productos: object } })
            console.log(`Producto cargado: ${resultado}`);

            return `producto: ${object.nombre} cargado en carrito con id: ${id}`

        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async updateById(object, id) {
        try {
            await mongoose.connect(this.url)
            let resultado = await this.collection.updateOne({ id: id }, { $set: object })
            console.log(`producto actualizado: ${resultado}`)
            return resultado
        } catch (error) {
            throw new Error(`Error al modificar: ${error}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async updateCartById(id, id_prod) {
        try {
            await mongoose.connect(this.url)
            const prodToDelete = await this.collection.updateOne({ id: id }, { $set: { id: id_prod } })
            return prodToDelete
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }

    async deleteById(id) {
        try {
            await mongoose.connect(this.url)
            let resultado = await this.collection.deleteOne({ id: id })
            console.log(`producto eliminado: ${resultado}`);
            return resultado
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`)
        } finally {
            mongoose.disconnect()
                .catch((err) => { console.error(err) })
        }
    }
}

module.exports = ContenedorMongoDB