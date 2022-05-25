// (/stations)
import express, { Request } from 'express';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Station } from './index.d';
import { getFromCol } from './utils/GlobalFunctions';
import { connections } from './index';
const router = express.Router();

router.use((req, res, next) => {
    // console.log('Time: ', Date.now());
    next();
});

router.get('/', async (req, res) => {
    // tslint:disable-next-line:no-console
    console.log('got request for stations');
    let stations: Station[];
    await getFromCol('stations', (map) => {
        stations = map;
    });
    res.json(stations);
});

router.delete('/:id', async (req: Request<{ id: string }>, res) => {
    // tslint:disable-next-line:no-console
    console.log('got request for DELETE stations/' + req.params.id);
    const docRef = doc(db, 'stations', req.params.id);

    deleteDoc(docRef).catch((err) => {
        res.status(500).send(err);
    });

    deleteObject(
        ref(
            storage,
            `gs://airgng-dfc98.appspot.com/images_stations/${req.params.id}.jpg`
        )
    )
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.status(500).send(err);
        });
});

router.get('/:id', async (req: Request<{ id: string }>, res) => {
    // tslint:disable-next-line:no-console
    console.log('got request for station:' + req.params.id);
    const docResponse = await getDoc(doc(db, `stations/${req.params.id}`));
    if (docResponse.exists()) {
        res.json(docResponse.data());
    } else {
        res.sendStatus(404);
    }
});
export default router;
