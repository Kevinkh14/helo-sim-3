require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require("express-session")
const {register,login, logout, addPost, getPost, getOnePost, getPostByTitle} = require("./controller")

const app = express()

app.use(express.json())

const serverPort = 5050

const{CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(dbInstance =>{
    app.set('db', dbInstance)
    console.log('Database Connected')
})
.catch(err =>{console.log(err)})

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret: process.env.SESSION_SECRET,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}))


app.post("/auth/register", register)
app.post("/auth/login",login)
app.get("/auth/logout",logout)

app.post("/api/post",addPost)
app.get("/api/post",getPost)
// app.get("/api/post/:postid",getOnePost)
app.get("/api/post/content",getPostByTitle)



app.listen(serverPort, ()=>{ console.log(`listening on port ${serverPort}`)})