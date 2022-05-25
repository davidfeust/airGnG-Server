"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connections = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const websocket_1 = require("websocket");
const handleOrders_1 = __importDefault(require("./handleOrders"));
const handleStations_1 = __importDefault(require("./handleStations"));
const handleUsers_1 = __importDefault(require("./handleUsers"));
const app = (0, express_1.default)();
const server = http_1.default.createServer();
app.use((0, cors_1.default)());
exports.connections = [];
const port = process.env.PORT || 5000; // default port to listen
const webSocketPort = 8080;
server.listen(webSocketPort);
const wsServer = new websocket_1.server({ httpServer: server });
wsServer.on('request', (req) => {
    // tslint:disable-next-line:no-console
    console.log(`web socket got request`);
    const theConnection = req.accept(null, req.origin);
    // tslint:disable-next-line:no-console
    console.log('connection:' + theConnection.state);
    exports.connections.push(theConnection);
});
// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('רביד יא חרא!');
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/stations', handleStations_1.default);
app.use('/users', handleUsers_1.default);
app.use('/orders', handleOrders_1.default);
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map