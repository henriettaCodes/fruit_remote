// const http = require("http")

// const server = http.createServer((req, res) => {
//     res.statusCode = 500
//     res.end()
// })

// server.listen(3000, () => {console.log("Server ready")})

//above is using the http method from node. However we will focus on using express


const express = require("express")
const app = express()
const port = 3000
// forward slash means root of web page
app.get('/', (req, res) => {
    res.send("I am express")
})

app.get('/chickens', (req, res) => {
    res.send("I have chickens")
})

app.get("/chickens/:name", (req, res) => {
    // res.send(req.params)
    res.send(req.query) // getting a query (where you have a question mark in the url)
})

app.listen(port, () => {
    console.log(`Server Listening on port ${port}`)
})