import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "socket.io";
const app = express()
const port = 5000
config();
app.use(helmet())
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

const io = new Server(port, {
	cors: {
    origin: '*',
  }
});
const history=[]

io.on("connection", (socket) => {
	socket.on("username",(name)=>{
		history.push(name)		
		socket.emit("broad",[name])
	});
	
	socket.emit("message","init message")

});
