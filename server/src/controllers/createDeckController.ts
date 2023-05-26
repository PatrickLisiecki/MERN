import { Request, Response } from "express";
//Gives access to the deck model
import Deck from "../models/deck";

export async function createDeckController(req: Request, res: Response) {
    //Create a new deck object
    const newDeck = new Deck({ title: req.body.title }); //Passes in the title from the req body

    //Save the deck to the database
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
}
