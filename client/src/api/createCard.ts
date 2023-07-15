import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function createCard(deckId: string, text: string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        body: JSON.stringify({
            text,
        }),
        // This header allows us to send json files as the content type rather than plain text
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}
