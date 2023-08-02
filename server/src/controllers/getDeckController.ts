import { Request, Response } from "express";
// Gives access to the deck model
import Deck from "../models/deck";

export async function getDeckController(req: Request, res: Response) {
    // Get deck Id from URL
    const { deckId } = req.params;

    // Fetch the deck from DB
    const deck = await Deck.findById(deckId);

    // Send back array to the UI
    res.status(200).json(deck);
}
