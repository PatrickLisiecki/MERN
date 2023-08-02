import "./Header.css";

export default function Header() {
    return (
        <header className="header">
            <div className="header-links">
                <a href="/" className="title">
                    Card Genius
                </a>
                <ul className="links">
                    <li>
                        <a href="/">Decks</a>
                    </li>
                    <li>Login</li>
                </ul>
            </div>
        </header>
    );
}
