import cors from 'cors';
import express from 'express';
import handleStations from './handleStations';
import handleUsers from './handleUsers';
import handleOrders from './handleOrders';
import { connection, server as webSocketServer } from 'websocket';
import http from 'http';

const app = express();
const server = http.createServer();
app.use(cors());

export const connections: connection[] = [];

const port = process.env.PORT || 5000; // default port to listen
const webSocketPort = 8080;
server.listen(webSocketPort);
const wsServer = new webSocketServer({ httpServer: server });
wsServer.on('request', (req) => {
    // tslint:disable-next-line:no-console
    console.log(`web socket got request`);
    const connection = req.accept(null, req.origin);
    // tslint:disable-next-line:no-console
    console.log('connection:' + connection.state);
    connections.push(connection);
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
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
