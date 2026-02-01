import React from "react";
import ReactDOM from "react-dom/client";


function importData() {
//Dev data. 


}

function getFollowers() {

}

function App() {
    return (
        <div className="container">
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
        <div className="top-section">
            <div className="data-section">
                <div>
                    <h2>Connection Metrics</h2>
                    <img className="line-break" src="./line.png"/>
                    <p>90% of the people you follow, are following you back. ✅</p>
                    <p className="secondary-p">You are following back 50% of the people that follow you.</p>
                </div> 
            </div>
            <div className="data-section">
                <div>
                    <h2>Overall Metrics</h2>
                    <img className="line-break" src="./line.png"/>
                    <p>2595 Followers</p>
                    <p>736 Following</p>
                </div> 
            </div>
            <div className="data-section">
                <div>
                    <h2>Standing</h2>
                    <img className="line-break" src="./line.png"/>
                    <div id="standing-container">
                    <img src="thumbs-up.png" id="standing-picture"/>
                    </div>
                </div> 
            </div>
        </div>
        <div className="bottom-section">
                <div>
                    <h2>Not Following Back</h2>
                    <img className="line-break" src="./line.png"/>
                    <p>
                        - user_one
                        - user_two
                        - user_three
                        - user_four
                        - user_five
                    </p>
                </div>
            </div>
    <footer>
        <p>&copy; 2026 IG Metrics</p>
    </footer>
</div>
    );
}

