import React, { useEffect, useState } from "react";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { TDeck } from "./api/getDecks";
import { useParams } from "react-router-dom";
import "./App.css";

export default function Deck() {
    const [cards, setCards] = useState<string[]>([]);
    const [deck, setDeck] = useState<TDeck>();
    const [text, setText] = useState("");
    const { deckId } = useParams();

    useEffect(() => {
        async function fetchDeck() {
            const targetDeck = await getDeck(deckId!);
            setDeck(targetDeck);
        }
        fetchDeck();
    }, []);

    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault();

        if (text.length === 0) {
            return;
        }

        const returnDeck = await createCard(deckId!, text);
        setDeck(returnDeck);

        setText("");
    }

    return (
        <div className="App">
            <ul className="decks">
                {deck &&
                    deck.cards &&
                    deck.cards.map((card, i) => (
                        <li key={i}>
                            {/*<button onClick = {() => handleDeckDelete(deck._id)}>X</button>*/}
                            {card}
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor="card-text">Card Text</label>
                <input
                    id="card-text"
                    type="text"
                    placeholder="Card Text"
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        // Save what the user types
                        setText(e.target.value);
                    }}
                />
                <button className="create-btn">Create Card</button>
            </form>
        </div>
    );
}
