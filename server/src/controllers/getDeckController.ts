import { Request, Response } from "express";
//Gives access to the deck model
import Deck from "../models/deck";

export async function getDecksController(req: Request, res: Response) {
    //Fetch the decks from MongoDB
    const userDecks = await Deck.find();
    //Send back array to the UI
    res.json(userDecks);
}
