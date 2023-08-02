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

// Import controllers for Deck(s)
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";

// Import controllers for Card(s)
import { createCardController } from "./controllers/createCardController";
import { deleteCardController } from "./controllers/deleteCardController";

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        // the 'finish' event will be emitted when the response is handed over to the OS
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});

// Create, read, and delete Deck(s)
app.post("/decks", createDeckController);
app.get("/decks", getDecksController);
app.get("/decks/:deckId", getDeckController);
app.delete("/decks/:deckId", deleteDeckController);

// Create and delete Card(s)
app.post("/decks/:deckId/cards", createCardController);
app.delete("/decks/:deckId/cards/:cardIndex", deleteCardController);

// Connect to my MongoDB database
mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`Listening on port ${PORT}`);
    // Only listen for API requests after MongoDB is connected
    app.listen(PORT);
});
