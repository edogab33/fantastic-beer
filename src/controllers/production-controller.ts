import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import * as productionService from '../services/production-service'

const router = express.Router();

router.use(bodyParser.json());

router.get('/productions', (req: Request, res: Response) => {
    productionService.getProductions().then(
        (productions) => {
            res.setHeader("Content-Type", "application/json")
            res.status(200).send({
                "success": true,
                "data": productions
            });
        }
    ).catch(err => {
        res.status(500).send({
            "success": false,
            "data": err.detail
        });
    });
})

router.post('/productions', (req: Request, res: Response) => {
    productionService.insertProduction(req.body).then(
        (newProduction) => {
            res.status(201).send({
                "success": true,
                "data": newProduction
            });
        }
    ).catch(err => {
        res.status(500).send({
            "success": false,
            "data": err.detail
        });
    });
})

router.get('/productions/quantity/name/:name?/date/:start_day?/:end_day?', (req: Request, res: Response) => {
    if (!req.params.start_day && !req.params.end_day) {
        res.status(400).send({
            "success": false,
            "data": "You should provide at least one day as parameter."
        })
    } else {
        productionService.getProductionsQuantity(req.params.start_day, req.params.end_day, req.params.name).then(
            (quantity) => {
                res.status(200).send(quantity);
            }).catch((err) => {
                res.status(500).send({
                    "success": false,
                    "data": err.detail
            });
        });
    }
});

router.get('/productions/laudable/name/:name?/date/:start_day?/:end_day?', (req: Request, res: Response) => {
    if (!req.params.start_day && !req.params.end_day) {
        res.status(400).send({
            "success": false,
            "data": "You should provide a starting and ending days as parameters."
        })
    } else {
        productionService.getLaudableDays(req.params.start_day, req.params.end_day, req.params.name).then(
            (days) => {
                res.status(200).send(days);
            }).catch((err) => {
                res.status(500).send({
                    "success": false,
                    "data": err.detail
            });
        });
    }
});

export default router