import { mongoose, Schema, model } from "mongoose";

class ContenedorMongoDB{

    constructor(url, collection) {
        this.url = url

        this.productSchema = new Schema({
            name:{type: String, required: true},
            description:{type: String, required: true},
            price:{type: Number, required: true},
        })

        this.ProductModel = model(collection, this.productSchema)
    }

    async getAll() {
        try {
            await mongoose.connect(this.url)
            return await ProductModel.find()            
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
            return await ProductModel.find({id: id})            
        } catch (err) {
            throw new Error(`Error al buscar: ${err}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
    }

    async save(object) {
        try {
            const data = await this.getAll()
            let ultimoId;
            let ultimoProducto = data[data.length - 1];

            if (data.length == 0) { ultimoId = 0 } else { ultimoId = ultimoProducto.id }

            const nId = ultimoId + 1
            const time = Date(Date.now()).toString()
            const nuevoProducto = new this.ProductModel({ ...object, timestamp: time, id: nId })

            const toSave = await nuevoProducto.save()
            console.log(`producto cargado: ${toSave}`);
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        } finally {
            mongoose.disconnect()
            .catch((err)=>{console.error(err)})
        }
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

    async deleteById(id) {
        try {
            await mongoose.connect(this.url)
            let resultado = await ProductModel.deleteOne({ id: id})
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

export default ContenedorMongoDB