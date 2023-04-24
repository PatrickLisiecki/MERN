import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCard } from './api/createCard';
import { createDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';
import { useParams } from 'react-router-dom';
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

    //setDecks([...decks, deck]);
    setText("");
  }

  /* async function handleDeckDelete(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  } */

  //When the component mounts fetch data from endpoint
  /*useEffect(() => {
     async function fetchDecks() {
       const userDecks = await getDecks();
       setDecks(userDecks);
     }
     fetchDecks();
   }, []); */

  return (
    <div className="App">
        <ul className="decks">
            {
            cards.map((card) => (
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
              value={text}
              onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
                  //Save what the user types
                  setText(e.target.value);
                  }}
            />
            <button className="create-btn">Create Card</button>
        </form>
    </div>
  )
}