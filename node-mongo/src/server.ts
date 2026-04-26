import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import mongoose, { Error as MongooseError } from "mongoose";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://mongo:27017/clients")
  .then(() => console.log("MongoDB connected"))
  .catch((err: MongooseError) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Defining Mongoose schema and model
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
});

const Client = mongoose.model("Cliente", clientSchema);

// Routes
app.get("/clients", async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

app.post("/clients", async (req: Request, res: Response) => {
  try {
    const newClient = new Client(req.body);
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(500).json({ error: "Failed to create client" });
  }
});

app.get("/clients/:id", async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (err) {
    console.error("Error fetching client:", err);
    res.status(500).json({ error: "Failed to fetch client" });
  }
});

app.put("/clients/:id", async (req: Request, res: Response) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(updatedClient);
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({ error: "Failed to update client" });
  }
});

app.delete("/clients/:id", async (req: Request, res: Response) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(deletedClient);
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ error: "Failed to delete client" });
  }
});

app.get("/clients/search", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.query;
    const query: any = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (email) {
      query.email = { $regex: email, $options: "i" };
    }
    const clients = await Client.find(query);
    res.json(clients);
  } catch (err) {
    console.error("Error searching clients:", err);
    res.status(500).json({ error: "Failed to search clients" });
  }
});

// Global error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
