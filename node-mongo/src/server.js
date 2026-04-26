"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// MongoDB connection
mongoose_1.default
    .connect("mongodb://mongo:27017/clients")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// Defining Mongoose schema and model
const clientSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    address: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
});
const Client = mongoose_1.default.model("Cliente", clientSchema);
// Routes
app.get("/clients", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    }
    catch (err) {
        console.error("Error fetching clients:", err);
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});
app.post("/clients", async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    }
    catch (err) {
        console.error("Error creating client:", err);
        res.status(500).json({ error: "Failed to create client" });
    }
});
app.get("/clients/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json(client);
    }
    catch (err) {
        console.error("Error fetching client:", err);
        res.status(500).json({ error: "Failed to fetch client" });
    }
});
app.put("/clients/:id", async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json(updatedClient);
    }
    catch (err) {
        console.error("Error updating client:", err);
        res.status(500).json({ error: "Failed to update client" });
    }
});
app.delete("/clients/:id", async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json(deletedClient);
    }
    catch (err) {
        console.error("Error deleting client:", err);
        res.status(500).json({ error: "Failed to delete client" });
    }
});
app.get("/clients/search", async (req, res) => {
    try {
        const { name, email } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: "i" };
        }
        if (email) {
            query.email = { $regex: email, $options: "i" };
        }
        const clients = await Client.find(query);
        res.json(clients);
    }
    catch (err) {
        console.error("Error searching clients:", err);
        res.status(500).json({ error: "Failed to search clients" });
    }
});
// Global error handler
app.use((err, req, res) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
});
// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map