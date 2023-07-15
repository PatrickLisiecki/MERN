// Import MongoDB URL from .env
require("dotenv").config();
import express, { Request, Response } from "express";
const app = express();
const PORT = 7000;
app.use(express.json());

// Import mongoose for connecting to MongoDB
import mongoose from "mongoose";

// Gives access to the deck model
import Deck from "./models/deck";

// This allows access to a different URL even if the origin does not match
// Allows the request to happen
import cors from "cors";
app.use(
    cors({
        origin: "*",
    })
);

// Import controllers
import { getDecksController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardController } from "./controllers/createCardController";

// Fetching data use GET
app.get("/decks", getDecksController);

// Pushing data use POST
app.post("/decks", createDeckController);

// Deleting data using DELETE
app.delete("/decks/:deckId", deleteDeckController);

// Creating a card using POST
app.post("/decks/:deckId/cards", createCardController);

// Connect to my MongoDB database
mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
    console.log(`Listening on port ${PORT}`);
    // Only listen for API requests after MongoDB is connected
    app.listen(PORT);
});
