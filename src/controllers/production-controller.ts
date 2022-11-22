import express, {Request, Response} from 'express';
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

router.delete('/productions/name/:name/date/:day', (req: Request, res: Response) => {
    /**
     * Delete a production from the database.
     * 
     * @param name - Name of the beer
     * @param day - Day of the production
     */
    productionService.deleteProduction(req.params.name, req.params.day).then(
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

router.get('/productions/quantity/name/:name?/date/:start_day?/:end_day?', (req: Request, res: Response) => {
    /**
     * Get overall quantity of beer produced.
     * 
     * @param name - Name of the beer
     * @param start_day - Start day
     * @param end_day - End day
     */
    if (!req.params.start_day && !req.params.end_day) {
        res.status(400).send({
            "success": false,
            "data": "You should provide at least one day as parameter."
        })
    } else {
        productionService.getProductionsQuantity(req.params.start_day, req.params.end_day, req.params.name).then(
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

router.get('/productions/laudable/count/name/:name?/date/:start_day?/:end_day?', (req: Request, res: Response) => {
    /**
     * Get laudable days.
     * 
     * @param name - Name of the beer
     * @param start_day - Start day
     * @param end_day - End day
     */
    if (!req.params.start_day && !req.params.end_day) {
        res.status(400).send({
            "success": false,
            "data": "You should provide a starting and ending day as parameters."
        })
    } else {
        productionService.getNumberLaudableDays(req.params.start_day, req.params.end_day, req.params.name).then(
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