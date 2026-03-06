
function Header({ haveFollowers, haveFollowing, isChart, setIsChart }) {

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
        <button style={{ display: !(haveFollowers && haveFollowing) ? 'none' : 'block' }} className="chart-button" onClick={() => setIsChart(!isChart)}>{isChart ? 'Overview' : 'Chart'}</button>
        <button style={{ display: !(haveFollowers && haveFollowing) ? 'none' : 'block' }} className="reset-button" onClick={() => window.location.reload()}>Reset Data</button>
    </header>
)
}

export default Header;