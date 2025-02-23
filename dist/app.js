"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_routes_1 = __importDefault(require("./App/features/products/products.routes"));
const GlobalErrorHandlers_1 = __importDefault(require("./App/Error/GlobalErrorHandlers"));
const orders_routes_1 = __importDefault(require("./App/features/orders/orders.routes"));
const NotFound_1 = __importDefault(require("./App/Error/NotFound"));
const auth_routes_1 = __importDefault(require("./App/features/Auth/auth.routes"));
const admin_routes_1 = __importDefault(require("./App/features/admin/admin.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/products', products_routes_1.default);
app.use('/api/orders', orders_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.get('/', (req, res) => {
    res.send('The Pencil Palace apiiiii is working at shei level');
});
app.use(GlobalErrorHandlers_1.default);
app.use(NotFound_1.default);
exports.default = app;
