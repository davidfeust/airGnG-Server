import cors from 'cors';
import express from 'express';
import http from 'http';
import { connection, server as webSocketServer } from 'websocket';
import handleOrders from './handleOrders';
import handleStations from './handleStations';
import handleUsers from './handleUsers';

const app = express();
const server = http.createServer(app);
app.use(cors());

export const connections: connection[] = [];

const port = process.env.PORT || 5000; // default port to listen
const wsServer = new webSocketServer({ httpServer: server });
wsServer.on('request', (req) => {
    // tslint:disable-next-line:no-console
    console.log(`web socket got request`);
    const theConnection = req.accept(null, req.origin);
    // tslint:disable-next-line:no-console
    console.log('connection:' + theConnection.state);
    connections.push(theConnection);
});

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('רביד יא חרא!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/stations', handleStations);
app.use('/users', handleUsers);
app.use('/orders', handleOrders);

// start the Express server
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
