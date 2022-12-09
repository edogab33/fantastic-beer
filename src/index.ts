import http from 'http'
import express, {Express, Response, Request} from 'express'
import * as productionController from './controllers/production-controller'

const app: Express = express();

app.use('',
    productionController.default
)

app.use((req: Request, res: Response) => {
    res.statusMessage = "I'm a mead producer"
    res.status(419).send({
        "success": false,
        "data": "Nothing to show here!"
    });
});

const httpServer = http.createServer(app)

httpServer.listen(6060, ()=>{
    console.log("Welcome to Fantastic Beer!");
})