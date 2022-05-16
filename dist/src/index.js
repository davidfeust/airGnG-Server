"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const handleStations_1 = __importDefault(require("./handleStations"));
const handleUsers_1 = __importDefault(require("./handleUsers"));
const handleOrders_1 = __importDefault(require("./handleOrders"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 5000; // default port to listen
// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('רביד יא חרא');
});
app.use('/stations', handleStations_1.default);
app.use('/users', handleUsers_1.default);
app.use('/orders', handleOrders_1.default);
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map