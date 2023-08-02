import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import Deck from "./components/Deck/Deck";
import "./App.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTrashCan } from "@fortawesome/free-regular-svg-icons";

function App() {
    //Array of type TDeck
    const [decks, setDecks] = useState<TDeck[]>([]);

    const [title, setTitle] = useState("");

    async function handleCreateDeck(e: React.FormEvent) {
        //Prevent default stops the browser from refreshing
        e.preventDefault();

        //Add new decks to the UI as they are added
        const deck = await createDeck(title);

        //Create a new array of decks using the old deck array and append the new deck
        setDecks([...decks, deck]);

        setTitle("");
    }

    // Delete a deck and update the state
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
        <section className="main">
            <div className="container">
                {/* Header */}
                <div className="header-container">
                    <span className="header-title">Your Flashcards</span>
                </div>

                {/* Flashcard decks */}
                <div className="decks-container">
                    <ul className="decks">
                        {decks.map((deck) => (
                            <li key={deck._id}>
                                {/* Delete button */}
                                <button onClick={() => handleDeckDelete(deck._id)}>
                                    <FontAwesomeIcon icon={faTrashCan} size="xl" />
                                </button>

                                {/* Link to deck */}
                                <Link to={`decks/${deck._id}`}>{deck.title}</Link>
                                <Routes>
                                    <Route path="/deck/:deckId" element={<Deck />} />
                                </Routes>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Creating a new deck */}
                <div className="form-container">
                    <form onSubmit={handleCreateDeck}>
                        <label htmlFor="deck-title">Create a New Deck </label>
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
            </div>
        </section>
    );
}

export default App;
