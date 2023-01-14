import { Server } from './Server';
import { Balancer } from './Balancer'
import { config } from 'dotenv'
import cluster from 'cluster'
config()

const port = process.env.PORT || 4000

if (cluster.isPrimary) {
    const balancer = new Balancer()

    balancer.listen(+port, () => {
        console.log(`Balancer: ${port}`)
    })
} else {
    const worker = new Server()

    worker.listen(+port + cluster.worker!.id, () => {
        console.log(`Listen Port: ${+port + cluster.worker!.id}`)
    })
}
