// Import MongoDB URL from .env
require("dotenv").config();
import express, { Request, Response } from "express";
const app = express();
const PORT = 7000;
app.use(express.json());

// Import mongoose for connecting to MongoDB
import mongoose from "mongoose";

// This allows access to a different URL even if the origin does not match
// Allows the request to happen
import cors from "cors";
app.use(
    cors({
        origin: "*",
    })
);

// Import controllers
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardController } from "./controllers/createCardController";
import { getDeckController } from "./controllers/getDeckController";

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        // the 'finish' event will be emitted when the response is handed over to the OS
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});

// Get all decks
app.get("/decks", getDecksController);

// Create a new deck
app.post("/decks", createDeckController);

// Delete a deck
app.delete("/decks/:deckId", deleteDeckController);

// Create a new card
app.post("/decks/:deckId", createCardController);

app.get("/decks/:deckId", getDeckController);

// Connect to my MongoDB database
mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`Listening on port ${PORT}`);
    // Only listen for API requests after MongoDB is connected
    app.listen(PORT);
});
