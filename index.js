require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT
const fruits = require("./fruits.json")
const logger = require("./logger")
// middleware goes here above all routes
app.use(express.json())
app.use(logger)

//our routes go here
app.get("/", (req, res) => { //welcome page
    res.send("Welcome to the Fruit API")

})

app.get("/fruits", (req, res) => { // return all fruits
    res.send(fruits)
    
})

app.get("/fruits/:name", (req, res) => { //return one fruit
    const name = req.params.name.toLowerCase() //brackets because it's a method
    const ff = fruits.filter((f) => f.name.toLowerCase() == name)
    
    // if (ff.length === 0) {
    //     res.status(404).send("The fruit does not exist")
    // } else {
    //     res.send(ff[0])
    // }
    

    // condition ? true : false (how to layout a ternary operator) - cannot have multiple lines of code
ff.length === 0 
? res.status(404).send("The fruit does not exist") 
: res.send(ff[0])

})

app.post("/fruits", (req, res) => {
    if (!req.body || !req.body.name) {
       return res.status(400).send("Fruit name is required")
    }

    try{
        const fruit = fruits.find((f) => f.name.toLowerCase() === req.body.name.toLowerCase())
        if (fruit != undefined) {
            res.status(409).send("That fruit exists")
    
        } 

        const ids = fruits.map((f) => f.id) //gives us an array of all the ids
        let maxId = Math.max(...ids)

            req.body.id = maxId + 1

            fruits.push(req.body) 
            res.status(201).send("fruit created")
    }catch (e) {
        console.error(e)
        res.status(500).send("An error has occurred")
    }

})

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase()
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() === name)
    if ( fruitIndex === -1) {
        res.status(404).send("No fruit by that name")
    } else {
        fruits.splice(fruitIndex, 1)
        res.sendStatus(204) //sendStatus because it's not followed by any text
    }
})

app.patch("/fruits/:name", (req, res) => {
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() === req.params.name.toLowerCase())
    const newFruitName = req.body.name

    if ( fruit == undefined) {
        res.status(404).send("No fruit by that name")
    } else {
        fruit.name = newFruitName
        res.status(200).send(fruit)
    }
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`)
})