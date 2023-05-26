import { Request, Response } from "express";
//Gives access to the deck model
import Deck from "../models/deck";

export async function createCardController(req: Request, res: Response) {
    //Get the deck Id from the request paramaters
    const deckId = req.params.deckId;

    //Find the deck in MongoDB by searching the deck Id
    const deck = await Deck.findById(deckId);

    //If the deck Id doesn't exist
    if (!deck) return res.status(400).send("Deck does not exist!");

    const { text } = req.body;
    deck.cards.push(text);

    await deck.save();

    res.json(deck);
}
