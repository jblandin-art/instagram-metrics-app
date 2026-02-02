import { useState, useEffect, useRef, use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [haveFollowing, setHaveFollowing] = useState(false);
  const [haveFollowers, setHaveFollowers] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowersData, setIsFollowersData] = useState(false);
  const [notFollowingBack, setNotFollowingBack] = useState([]);

    const containerRef = useRef(null);
  
    function handleDataImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        setIsFollowersData(false);

        const reader = new FileReader();

        reader.onload = (e) => {
            const json = JSON.parse(e.target.result);
            if (Array.isArray(json)) {
                //console.log("Array detected");
                setIsFollowersData(true);
                const tempFollowers = []
                json.forEach(obj => {
                    tempFollowers.push(obj['string_list_data'][0]['value'])
                })
                //console.log(tempFollowers);
                setFollowers(tempFollowers);
                setHaveFollowers(true);
            }
            else if (json.hasOwnProperty('relationships_following')) {
                setIsFollowersData(false);
                const tempFollowing = []
                json['relationships_following'].forEach(obj => {
                    const str = obj['title'];
                    tempFollowing.push(str);
                })
                //console.log(tempFollowing);
                setFollowing(tempFollowing);
                setHaveFollowing(true);
            }
            else {
                alert("Invalid file format. Please provide a valid Instagram data export JSON file.");
            }
        }
    reader.readAsText(file);
    //console.log(followers);
    }

    const getNonFollowingBack = () => {
        if (!following || !followers) return [];

        const tempNotFollowingBack = following.filter(user => !followers.includes(user));
        return tempNotFollowingBack;
    }

        const getImNonFollowingBack = () => {
        if (!following || !followers) return [];

        const tempImNotFollowingBack = followers.filter(user => !following.includes(user));
        return tempImNotFollowingBack;
    }

  return (
    <>
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
    {haveFollowers && haveFollowing ? (
        <>
        <div className="top-section">
            <div className="data-section">
                <div>
                    <h2>Connection Metrics</h2>
                    <img className="line-break" src="../line.png"/>
                    <p>{(100 - ((getNonFollowingBack().length / following.length * 100))).toFixed(0)}% of the people you follow, are following you back. ✅</p>
                    <p className="secondary-p">You are following back {(100 - ((getImNonFollowingBack().length / followers.length * 100))).toFixed(0)}% of the people that follow you.</p>
                </div> 
            </div>
            <div className="data-section">
                <div>
                    <h2>Overall Metrics</h2>
                    <img className="line-break" src="../line.png"/>
                    <p>{followers.length} Followers</p>
                    <p>{following.length} Following</p>
                    <p className='disclaimer'><strong>Deactivated</strong> accounts are included, so your following count may be slightly inflated.</p>
                </div> 
            </div>
            <div className="data-section">
                <div>
                    <h2>Standing</h2>
                    <img className="line-break" src="../line.png"/>
                    <div id="standing-container">
                    <img src="../thumbs-up.png" id="standing-picture"/>
                    </div>
                </div> 
            </div>
        </div>
        <div className="bottom-section">
                <div>
                    <h2>Not Following Back</h2>
                    <p className='disclaimer second'>Deactivated accounts are included.</p>
                    <img className="line-break" src="../line.png"/>
                    <div className="vertical-flow" ref={containerRef} onWheel={(e) => {
        containerRef.current.scrollLeft += e.deltaY;
    }}>
                        {
                            getNonFollowingBack().map((user, index) => (
                                //index == 24 ? <a href="null" className="and-more">and more... </a> : 
                                <span key={user}>{user} <br/></span>
                            ))
                        }
                    </div>
                </div>
            </div>
    <footer>
        <p>&copy; 2026 IG Metrics</p>
    </footer>
    </>
    ) : (
        <>
        <div className="button-container">
            <p>Make sure your date range is set to <strong>"All Time"</strong> when exporting your data.</p>
            <button className="import-button" onClick={() => document.getElementById("follower-input").click()}>Insert your data.</button>
            {haveFollowers || (!haveFollowers && !haveFollowing) ? null : <p className="provide-prompt">Please provide follower data.</p>}
            {haveFollowing || (!haveFollowers && !haveFollowing) ? null : <p className="provide-prompt">Please provide following data.</p>}
        </div>
        <input type="file" id="follower-input" accept=".json" style={{display: "none"}} onChange={handleDataImport}></input>
        </>
    )}
    </>
)}

export default App
