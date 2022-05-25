// (/orders)
import express, { Request } from 'express';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { connections } from './index';
import { Order } from './index.d';
import { getFromCol } from './utils/GlobalFunctions';
const router = express.Router();

router.use((req, res, next) => {
    // console.log('Time: ', Date.now());
    next();
});

router.get('/', async (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('got request for orders');
    let orders: Order[];
    await getFromCol('orders', (map) => {
        orders = map;
    });
    res.json(orders);
});

router.post('/', async (req: Request, res) => {
    // tslint:disable-next-line:no-console
    console.log('got request for POST orders/');
    const order = req.body;
    order.order_date = new Date(order.order_date);
    order.reservation = {
        date_finish: new Date(order.reservation.date_finish),
        date_start: new Date(order.reservation.date_start),
    };
    addDoc(collection(db, 'orders'), order)
        .then((doc) => {
            res.send(doc.id);
            connections.forEach((connection) => {
                connection.send('order-added');
            });
        })
        .catch((reason) => {
            // tslint:disable-next-line:no-console
            console.error(reason);
        });
});

router.get('/:id', async (req: Request<{ id: string }>, res) => {
    // tslint:disable-next-line:no-console
    console.log('got request for orders:' + req.params.id);
    const docResponse = await getDoc(doc(db, `orders/${req.params.id}`));
    if (docResponse.exists()) {
        res.json(docResponse.data());
    } else {
        res.sendStatus(404);
    }
});
export default router;
