"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("config"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.get("corsOrigin"),
}));
var port = config_1.default.get("port");
// parse application/json
app.use(body_parser_1.default.json());
app.listen(port, "0.0.0.0", function () {
    console.log("Application listening at http://localhost:".concat(port));
    (0, db_1.default)();
    (0, routes_1.default)(app);
});
