import React, { useEffect, useState } from "react";
import { createCard } from "./api/createCard";
import { getCards } from "./api/getCards";
import { useParams } from "react-router-dom";
import "./App.css";

export default function Deck() {
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState("");
    const { deckId } = useParams();

    //const [stateValue, dispatcher] = [1, () => {}];

    async function handleCreateDeck(e: React.FormEvent) {
        //Prevent default stops the browser from refreshing
        e.preventDefault();

        const { cards: serverCards } = await createCard(deckId!, text);
        setCards(serverCards);

        setText("");
    }

    useEffect(() => {
        async function fetchCards() {
            const userCards = await getCards(deckId!);
            setCards(userCards);
        }
        fetchCards();
    }, []);


    //When the component mounts fetch data from endpoint
    /*useEffect(() => {
        async function fetchCards() {
            const { cards: deckCards } = await getCards(deckId!);
            setCards(deckCards);
        }
        fetchCards();
    }, []);*/

    return (
        <div className="App">
            <ul className="decks">
                {cards.map((card) => (
                    <li key={card}>
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
                        //Save what the user types
                        setText(e.target.value);
                    }}
                />
                <button className="create-btn">Create Card</button>
            </form>
        </div>
    );
}
