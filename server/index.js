import cors from "cors";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Server } from "socket.io";
import { userRoutes } from "./router/userRoute.js";
const app = express()
const port = 5000
const chatPort=5500
config();
app.use(helmet())
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())
app.use("/user",userRoutes);

const io = new Server(chatPort, {
	cors: {
    origin: '*',
  }
});
const history=[]
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
io.on("connection", (socket) => {
	socket.on("username",(name)=>{
		history.push(name)
		console.log(socket.handshake);
		io.emit("broad",[name])
	});
	
});
 
