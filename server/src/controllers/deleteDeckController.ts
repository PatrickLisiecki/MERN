import { Request, Response } from "express";
//Gives access to the deck model
import Deck from "../models/deck";

export async function deleteDeckController(req: Request, res: Response) {
    //Get deck Id from URL 
    const deckId = req.params.deckId;

    //Delete deck from MongoDB
    const deletedDeck = await Deck.findByIdAndDelete(deckId);

    //Return the deleted deck to the user
    /*res.json({
        body: "Deck deleted successfully!",
    })*/
    res.json(deletedDeck);
}