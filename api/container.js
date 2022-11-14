const fs = require('fs')

    class Container{
    constructor(object = {}){
     this.name = object?.name || ''
     this.price = object?.price || ''
     this.db = [];
     this.readData()
     this.readMessages()
    }

    readData() {
        fs.readFile('./api/dataBase.json', 'utf-8', (err, content) =>{
            if (err) {
                console.log('Hay un error', err)
            }else{
                return this.readJson = JSON.parse(content)
            }
     })
    }
    
    saveFile(obj){
        let db = [];
        
        db.push(...this.readJson, obj)
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(db))
        }

    getById(myId){
        this.readJson === '' ? {error: 'Producto no encontrado'} : ''
        
        const matchId = this.readJson.find((product)=> product.id === myId)
        return matchId == undefined ? {error: 'Producto no encontrado'} : matchId
        
    }
    deleteById(myId){
            const matchId = this.readJson.filter((product)=> product.id != myId)
            this.db.push(...matchId)

            fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
        }

    editById(myId, name, price, thumbnail){ 
        const matchId = this.readJson.filter((product)=> product.id != myId)
        this.db.push(...matchId)
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
        
        const data = {
             id: myId,
             name: name,
             price: price,
             thumbnail: thumbnail
        }
        this.db.push(data)
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
    }

    deleteAll(){
        fs.writeFileSync('./api/dataBase.json', JSON.stringify(this.db))
    }

    getAll(){
        this.readData()
        return this.readJson
    }

    sendMessage(data){
        let db = [];
        
        db.push(...this.readJsonMsg, data)
        fs.writeFileSync('./api/messages.json', JSON.stringify(db))
    }

    readMessages(){
         fs.readFile('./api/messages.json', 'utf-8', (err, content) =>{
            if (err) {
                console.log('Hay un error', err)
            }else{
                return this.readJsonMsg = JSON.parse(content)
            }
        })
    }
    getMessages(){
        return this.readJsonMsg
    }
}

module.exports = Container