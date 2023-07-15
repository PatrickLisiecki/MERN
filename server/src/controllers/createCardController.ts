import { Request, Response } from "express";
// Gives access to the deck model
import Deck from "../models/deck";

export async function createCardController(req: Request, res: Response) {
    // Get the deck Id from the request paramaters
    const deckId = parseInt(req.params.deckId, 10);

    try {
        // Find the deck in MongoDB by searching the deck Id
        const deck = await Deck.findById(deckId);

        // If the deck doesn't exist
        if (!deck) return res.status(400).send("Deck does not exist!");

        const { text } = req.body;
        deck.cards.push(text);

        await deck.save();

        res.json(deck);
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
