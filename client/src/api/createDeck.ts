import { API_URL } from "./config";

export async function createDeck(title: string) {
    const response = await fetch(`${API_URL}/decks`, {
        method: "POST",
        body: JSON.stringify({
            title,
        }),
        // This header allows us to send json files as the content type rather than plain text
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}
