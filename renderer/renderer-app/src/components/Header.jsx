
function Header() {

return (
    <header>
        <nav>
            <ul>
                <li>
                    <button onClick={() => window.windowControls.close()}>
                    <div className="circle red"></div>
                    </button>
                </li>
                <li>
                    <button onClick={() => window.windowControls.minimize()}>
                    <div className="circle yellow"></div>
                    </button>
                </li>
                <li>
                    <button onClick={() => window.windowControls.maximize()}>
                    <div className="circle green"></div>
                    </button>
                </li>
            </ul>
        </nav>
        <h1>Instagram Metrics</h1>
    </header>
)
}

export default Header;