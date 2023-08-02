import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Deck from "./components/Deck/Deck";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Header from "./components/Header/Header";

//Whenever a user accesses the slash URL, it will display our React App
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/decks/:deckId",
        element: <Deck />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Header />
        <RouterProvider router={router} />
    </React.StrictMode>
);
