import { Request, Response } from "express";
// Gives access to the deck model
import Deck from "../models/deck";

export async function deleteCardController(req: Request, res: Response) {
    // Get the deck Id from the request paramaters
    const deckId = req.params.deckId;

    // Get the card Id from the paramaters
    const cardIndex = req.params.cardIndex;

    try {
        // Find the deck in DB by searching the deck Id
        const deck = await Deck.findById(deckId);

        // If the deck doesn't exist
        if (!deck) return res.status(400).send("Deck does not exist!");

        deck.cards.splice(parseInt(cardIndex), 1);

        await deck.save();

        res.status(201).json(deck);
    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
