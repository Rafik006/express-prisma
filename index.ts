const express=require("express")
const port =3000
const cors=require("cors")
import routes from './routes/routes';
const app =express()
app.use(cors())
app.use(express.json())
//npm install prisma typescript ts-node @types/node --save-dev

app.use("/api",routes)
app.listen(port,()=>{
    console.log("server listening at port " + port )
})