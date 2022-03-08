const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const { log } = require('console')


const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://mongodb/mydatabase"



const port = 4000
const app = express()


// Settings
app.set('port', process.env.PORT || port)


// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


// Routes

app.get('/obtenerHeroes', async (req, res) => {
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("personajes").find({}).toArray()
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})

app.get('/buscarHeroes/:busqueda', async (req, res) => {
    const { busqueda } = req.params
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("personajes").find( { $or: [{"name": new RegExp(busqueda, 'i')}, {"realname": new RegExp(busqueda, 'i')} ] }).toArray()
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})

app.get('/buscarUno/:name', async (req, res) => {
    const { name } = req.params
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("personajes").find({"name": new RegExp(name, 'i')}).toArray()
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})


app.get('/obtenerHeroes/marvel', async (req, res) => {
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("personajes").find({"house": "Marvel"}).toArray()
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})

app.get('/obtenerHeroes/dc', async (req, res) => {
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("personajes").find({"house": "DC"}).toArray()
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})

app.get('/obtener/heroe/:name', async (req, res) => {
    const { name } = req.params
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        // const result = await dbo.collection("personajes").findOne({"name": new RegExp(name, 'i')})
        const result = await dbo.collection("personajes").findOne({"name": name})
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})

app.post('/agregarHeroe/:house/:name/:realname/:year/:equipment/:biography', async (req, res) => {
    const { house, name, realname, year, equipment, biography } = req.params
    const images = req.body
    const db = await MongoClient.connect(uri)
    try {
        let dbo = db.db("mydb")
        let myobj
        if (realname != 'null' && equipment != 'null')
            myobj = { house: house, name: name, realname: realname, year: year, equipment: equipment, biography: biography, images: images }
        else {
            if (realname === 'null') {
                if (equipment === 'null')
                    myobj = { house: house, name: name, year: year, biography: biography, images: images }
                else
                    myobj = { house: house, name: name, year: year, equipment: equipment, biography: biography, images: images }
            } else   
                    myobj = { house: house, name: name, realname: realname, year: year, biography: biography, images: images }
                
        }
        await dbo.collection("personajes").insertOne(myobj)
        res.json("1 document inserted")
    } catch (e) { 
        console.error(e) 
    } finally {
        db.close()
    }
})

app.put('/updateCharacter/:house/:name/:realname/:year/:equipment/:biography', async (req, res) => {
    console.log('HOLA');
    const { house, name, realname, year, equipment, biography } = req.params
    const images = req.body
    console.log('imagenes: ', images);
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        let myquery = { name: name };
        let newvalues
        if (realname != 'null' && equipment != 'null')
            newvalues = { $set:  {house: house, name: name, realname: realname, year: year, equipment: equipment, biography: biography, images: images }}
        else {
            if (realname === 'null') {
                if (equipment === 'null')
                    newvalues = { $set: { house: house, name: name, year: year, biography: biography, images: images }}
                else
                    newvalues = { $set: { house: house, name: name, year: year, equipment: equipment, biography: biography, images: images }}
            } else   
                    newvalues = { $set: { house: house, name: name, realname: realname, year: year, biography: biography, images: images }}
        }
        const result = await dbo.collection("personajes").updateOne(myquery, newvalues)
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})

app.get('/delete/character/:name', async (req, res) => {
    const { name } = req.params
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("personajes").deleteOne({"name": new RegExp(name, 'i')})
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})








//Static files
app.use(express.static(path.join(__dirname, 'public')))



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
