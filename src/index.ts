import { config } from 'dotenv'
import { Server } from "./Server";
config()

const port = process.env.PORT || 4000

const server = new Server()

server.listen(port, () => {
    console.log(`Server start: ${port}`)
})
