import { useState, useRef } from 'react'
import './App.css'
import Header from "./components/Header.jsx"
import ImportScreen from "./components/ImportScreen.jsx"
import MetricsOverview from "./components/MetricsOverview.jsx"

function App() {
  const [haveFollowing, setHaveFollowing] = useState(false);
  const [haveFollowers, setHaveFollowers] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef(null);

    const getNonFollowingBack = () => {
        if (!following || !followers) return [];

        const followersSet = new Set(followers);
        const tempNotFollowingBack = following.filter(user => !followersSet.has(user));
        return tempNotFollowingBack;
    }

        const getImNonFollowingBack = () => {
        if (!following || !followers) return [];

        const tempImNotFollowingBack = followers.filter(user => !following.includes(user));
        return tempImNotFollowingBack;
    }

  return (
    <>
    <Header />
    {haveFollowers && haveFollowing ? (
        <MetricsOverview 
        followers={followers}
        following={following}
        getNonFollowingBack={getNonFollowingBack}
        getImNonFollowingBack={getImNonFollowingBack}
        containerRef={containerRef}
        />
    ) : (
        <ImportScreen 
        haveFollowing={haveFollowing}
        haveFollowers={haveFollowers}
        setHaveFollowing={setHaveFollowing}
        setHaveFollowers={setHaveFollowers}
        followers={followers}
        setFollowers={setFollowers}
        following={following}
        setFollowing={setFollowing}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        />
    )}
    {isLoading && (
    <div className="loading-overlay">
        <div className="loading-box">
            <div className="spinner"></div>
            <p>Processing Instagram data...</p>
        </div>
    </div>
    )}
    </>
)}

export default App
