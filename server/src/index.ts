//Import MongoDB URL from .env
import { config } from "dotenv";
config();

import express, { Request, Response } from "express";

//Import mongoose for connecting to MongoDB
import mongoose from "mongoose";

//Gives access to the deck model
import Deck from "./models/deck";

import cors from "cors";

import { getDecksController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardController } from "./controllers/createCardController";

const PORT = 7000;
const app = express();

//Allows support for json post requests
app.use(express.json());

//This allows access to a different URL even if the origin does not match
//Allows the request to happen
app.use(cors({
    origin: '*',
}));

//Fetching data use GET
app.get("/decks", getDecksController);

//Pushing data use POST
app.post("/decks", createDeckController);

//Deleting data using DELETE
app.delete("/decks/:deckId", deleteDeckController);

app.post("/decks/:deckId/cards", createCardController)

//Connect to my MongoDB database
mongoose.connect(process.env.MONGO_URL ?? "")
.then(() => {
    //Use backticks to print PORT var
    console.log(`Listening on port ${PORT}`);
    //Only listen for API requests after MongoDB is connected
    app.listen(PORT);
});