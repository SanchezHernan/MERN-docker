const { Router } = require('express')
//const router = Router()

const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://mongodb/mydatabase"

const cors = require('cors')

// router.get('/:id', async (req, res) => {
//     const task = await Task.findById( req.params.id )
//     res.json(task)
// })

// router.post('/', async (req, res) => {
//     const { title, description } = req.body
//     const task = new Task({ title, description })
//     await task.save()
//     res.json({status: "Task Saved"})
// })

// router.put('/:id', async (req, res) => {
//     const { title, description } = req.body
//     const newTask = {title, description}
//     await Task.findByIdAndUpdate(req.params.id, newTask)
//     res.json({status: "Task Updated"})
// })

// router.delete('/:id', async (req, res) => {
//     Task.findByIdAndRemove(req.params.id)
//     res.json({status: 'Task Deleted'})
// })





router.get('/createCollection/:name', async (req, res) => {
    const { name } = req.params
    const db = await MongoClient.connect(uri) 
    try {
        let dbo  = db.db("mydb")
        await dbo.createCollection(name)
        console.log("Colleccion created")
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})




router.get('/insertOne/:name/:description', async (req, res) => {
    const { name, description } = req.params
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb")
        var myobj = { name: name, description: description }
        await dbo.collection("tareas").insertOne(myobj)
        res.json("1 document inserted")
    } catch (e) { 
        console.error(e) 
    } finally {
        db.close()
    }
})


router.get('/', async (req, res) => {
    const db = await MongoClient.connect(uri)
    try {
        var dbo = db.db("mydb");
        const result = await dbo.collection("tareas").find({}).toArray()
        res.json(result)
    } catch (e) {
        console.error(e)
    } finally {
        db.close()
    }
})



module.exports = router