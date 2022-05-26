// (/stations)
import express, { Request, Response } from "express";
import { deleteDoc, doc, getDoc, WhereFilterOp } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { Station } from "./index.d";
import { getFromCol, getFromColWhere } from "./utils/GlobalFunctions";
const router = express.Router();

router.get("/", async (req, res) => {
  // tslint:disable-next-line:no-console
  console.log("got request for stations");
  let stations: Station[];
  await getFromCol("stations", (val) => {
    stations = val;
  });
  res.json(stations);
});

router.delete("/:id", async (req: Request<{ id: string }>, res) => {
  // tslint:disable-next-line:no-console
  console.log("got request for DELETE stations/" + req.params.id);
  const docRef = doc(db, "stations", req.params.id);

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

router.get("/:id", async (req: Request<{ id: string }>, res) => {
  // tslint:disable-next-line:no-console
  console.log("got request for station:" + req.params.id);
  const docResponse = await getDoc(doc(db, `stations/${req.params.id}`));
  if (docResponse.exists()) {
    res.json(docResponse.data());
  } else {
    res.sendStatus(404);
  }
});

router.get(
  "/:x/:condition/:y",
  async (
    req: Request<{
      x: string;
      condition: WhereFilterOp;
      y: string | any[];
    }>,
    res: Response<Station[]>
  ) => {
    // tslint:disable-next-line:no-console
    console.log("got request for station where:" + Object.values(req.params));

    const { x, condition, y } = req.params;
    let stations: Station[];
    stations = (await getFromColWhere(
      "stations",
      x,
      condition,
      y
    )) as Station[];

    res.json(stations);
  }
);

// TODO: Add post station with WS station-posted
export default router;
