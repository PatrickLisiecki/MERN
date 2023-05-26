import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function getCards(deckId: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`);
    return response.json();
}
