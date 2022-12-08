import express, {query, Request, Response} from 'express';
import bodyParser from 'body-parser';
import * as productionService from '../services/production-service'

const router = express.Router();

router.use(bodyParser.json());

router.post('/productions', (req: Request, res: Response) => {
    /**
     * Insert a beer production.
     */
    productionService.insertProduction(req.body).then(
        () => {
            res.status(201).send({
                "success": true,
                "data": []
            });
        }
    ).catch(err => {
        res.status(500).send({
            "success": false,
            "data": err.detail
        });
    });
})

router.delete('/productions', (req: Request, res: Response) => {
    /**
     * Delete a production from the database.
     * 
     * @param name - Name of the beer
     * @param day - Day of the production
     */
    const name = req.query.name as string
    const day = req.query.day as string

    productionService.deleteProduction(name, day).then(
        () => {
            res.status(200).send({
                "success": true,
                "data": []
            })
        }).catch((err) => {
            res.status(500).send({
                "success": false,
                data: err.detail
            })
        })
})

router.get('/productions/quantity', (req: Request, res: Response) => {
    /**
     * Get overall quantity of beer produced.
     * 
     * @param name - Name of the beer
     * @param start_day - Start day
     * @param end_day - End day
     */
    const name: string = req.query.name as string
    const start_day: string = req.query.start_day as string
    const end_day: string = req.query.end_day as string

    if (!start_day) {
        res.status(400).send({
            "success": false,
            "data": "You should provide the start day as parameter."
        })
    } else {
        productionService.getProductionsQuantity(start_day, end_day, name).then(
            (quantity) => {
                res.status(200).send({
                    "success": true,
                    "data": quantity
                });
            }).catch((err) => {
                res.status(500).send({
                    "success": false,
                    "data": err.detail
            });
        });
    }
});

router.get('/productions/laudable', (req: Request, res: Response) => {
    /**
     * Get laudable days.
     * 
     * @param name - Name of the beer
     * @param start_day - Start day
     * @param end_day - End day
     */
    const name: string = req.query.name as string
    const start_day: string = req.query.start_day as string
    const end_day: string = req.query.end_day as string

    if (!start_day) {
        res.status(400).send({
            "success": false,
            "data": "You should provide the start day as parameter."
        })
    } else {
        productionService.getNumberLaudableDays(start_day, end_day, name).then(
            (numLaudableDays) => {
                res.status(200).send({
                    "success": true,
                    "data": numLaudableDays});
            }).catch((err) => {
                res.status(500).send({
                    "success": false,
                    "data": err.detail
            });
        });
    }
});
export default router