import { Request, Response } from "express";
// Gives access to the deck model
import Deck from "../models/deck";

export async function getDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    // Fetch the decks from MongoDB
    const deck = await Deck.find({ id: deckId });

    // Send back array to the UI
    res.status(200).json(deck);
}
