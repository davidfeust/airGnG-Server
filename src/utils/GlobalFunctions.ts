import { collection, DocumentData, getDocs, query, where, WhereFilterOp } from 'firebase/firestore';
import { Station } from '../index.d';
import { db, storage } from '../../config/firebase';

export const getFromCol = async (
    colName: string,
    setFun: (map: any[]) => void
) => {
    const col = collection(db, colName);
    const cardsCol = await getDocs(col);
    const map = cardsCol.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data };
    });
    setFun(map);
    return map;
};

export const getFromColWhere = async (
    colName: string,
    x: string, condition: WhereFilterOp, y: string | any[]
): Promise<DocumentData[]> => {
    const q = query(
        collection(db, colName),
        where(x, condition, y)
    );
    const cardsCol = await getDocs(q);
    const map = cardsCol.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });
    return map;
};
