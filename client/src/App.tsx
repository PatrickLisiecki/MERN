import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import Deck from "./Deck";
import "./App.css";

function App() {
    //Array of type TDeck
    const [decks, setDecks] = useState<TDeck[]>([]);

    const [title, setTitle] = useState("");

    //const [stateValue, dispatcher] = [1, () => {}];

    async function handleCreateDeck(e: React.FormEvent) {
        //Prevent default stops the browser from refreshing
        e.preventDefault();

        //Add new decks to the UI as they are added
        const deck = await createDeck(title);

        //Create a new array of decks using the old deck array and append the new deck
        setDecks([...decks, deck]);

        setTitle("");
    }

    async function handleDeckDelete(deckId: string) {
        await deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck._id !== deckId));
    }

    //When the component mounts fetch data from endpoint
    useEffect(() => {
        async function fetchDecks() {
            const userDecks = await getDecks();
            setDecks(userDecks);
        }
        fetchDecks();
    }, []);

    return (
        <div className="App">
            <h1>Your Flashcards</h1>
            <ul className="decks">
                {decks.map((deck) => (
                    <li key={deck._id}>
                        <button onClick={() => handleDeckDelete(deck._id)}>
                            <img src="../images/x.svg"></img>
                        </button>
                        <Link to={`decks/${deck._id}`}>{deck.title}</Link>
                        <Routes>
                            <Route path="/deck/:deckId" element={<Deck />} />
                        </Routes>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor="deck-title">Create a New Deck</label>
                <input
                    type="text"
                    id="deck-title"
                    placeholder="Deck Title"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        //Save what the user types
                        setTitle(e.target.value);
                    }}
                />
                <button className="create-btn">Create Deck</button>
            </form>
        </div>
    );
}

export default App;
