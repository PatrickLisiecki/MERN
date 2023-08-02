import React, { useEffect, useState } from "react";
import { createCard } from "../../api/createCard";
import { deleteCard } from "../../api/deleteCard";
import { getDeck } from "../../api/getDeck";
import { TDeck } from "../../api/getDecks";
import { useParams } from "react-router-dom";
import "./Deck.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function Deck() {
    const [cards, setCards] = useState<string[]>([]);
    const [deck, setDeck] = useState<TDeck | undefined>();
    const [text, setText] = useState("");
    const { deckId } = useParams();

    // Fetch all cards for a deck whenever deckId changes
    useEffect(() => {
        async function fetchDeck() {
            if (!deckId) {
                return;
            }

            const targetDeck = await getDeck(deckId);

            setDeck(targetDeck);
            setCards(targetDeck.cards);
        }
        fetchDeck();
    }, [deckId]);

    // Handle adding a new card to the deck
    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();

        if (text.length === 0) {
            return;
        }

        const { cards: returnCards } = await createCard(deckId!, text);

        setCards(returnCards);
        setText("");
    }

    // Handle deleting a card from the deck
    async function handleDeleteCard(cardIndex: number) {
        if (!deckId) {
            return;
        }
        const updatedDeck = await deleteCard(deckId, cardIndex);
        setCards(updatedDeck.cards);
    }

    return (
        <div className="main">
            <div className="container">
                {/* Header */}
                <div className="header-container">
                    {deck && <span className="header-title">{deck.title}</span>}
                </div>

                {/* Cards */}
                <div className="cards-container">
                    <ul className="cards">
                        {cards.map((card, index) => (
                            <li key={index}>
                                <button onClick={() => handleDeleteCard(index)}>
                                    <FontAwesomeIcon icon={faTrashCan} size="xl" />
                                </button>
                                {card}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Create a card */}
                <div className="form-container">
                    <form onSubmit={handleCreateCard}>
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
            </div>
        </div>
    );
}
