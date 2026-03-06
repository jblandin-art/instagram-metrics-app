import { useState, useEffect, useRef } from 'react'
import './App.css'
import Header from "./components/Header.jsx"
import ImportScreen from "./components/ImportScreen.jsx"
import MetricsOverview from "./components/MetricsOverview.jsx"
import Chart from "./components/Chart.jsx"

function App() {

  const [haveFollowing, setHaveFollowing] = useState(false);
  const [haveFollowers, setHaveFollowers] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChart, setIsChart] = useState(false);

    const containerRef = useRef(null);

    

    const getNonFollowingBack = () => {
        if (!following || !followers) return [];

        const followersSet = new Set(followers);
        const tempNotFollowingBack = following.filter(user => !followersSet.has(user));
        return tempNotFollowingBack;
    }

    const getImNonFollowingBack = () => {
        if (!following || !followers) return [];

        const followingSet = new Set(following);
        const tempImNonFollowingBack = followers.filter(user => !followingSet.has(user));
        return tempImNonFollowingBack;
    }

    function copyToClipboard() {
        const textToCopy = getNonFollowingBack().join('\n');

        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    async function exportAsCSV() {
    
            const notFollowingBack = getNonFollowingBack();
            const followersList = followers;
            const followingList = following;
    
            let csvContent = "";
    
            csvContent += "People not following you back\n";
            csvContent += notFollowingBack.join("\n");
    
            csvContent += "\n\n\n\n\n\n\n\n\n\nFollowers\n";
            csvContent += followersList.join("\n");
    
            csvContent += "\n\n\n\n\n\n\n\n\n\nFollowing\n";
            csvContent += followingList.join("\n");
    
            await window.electronAPI.saveCSV(csvContent);
        }

    const getIsOverview = () => haveFollowers && haveFollowing && !isChart;

  return (
    <div className="app">
    <Header 
    haveFollowing={haveFollowing}
    haveFollowers={haveFollowers}
    isChart={isChart}
    setIsChart={setIsChart}
    />
    {haveFollowers && haveFollowing && !isChart ? (
        <MetricsOverview 
        followers={followers}
        following={following}
        getNonFollowingBack={getNonFollowingBack}
        getImNonFollowingBack={getImNonFollowingBack}
        containerRef={containerRef}
        isChart={isChart}
        setIsChart={setIsChart}
        copyToClipboard={copyToClipboard}
        exportAsCSV={exportAsCSV}
        />
    ) : null }
    { !haveFollowers || !haveFollowing ? (
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
    ) : null }

    {   haveFollowers && haveFollowing && isChart ? (
        <Chart 
        haveFollowers={haveFollowers}
        haveFollowing={haveFollowing}
        followers={followers}
        following={following}
        getNonFollowingBack={getNonFollowingBack}
        containerRef={containerRef}
        exportAsCSV={exportAsCSV}
        copyToClipboard={copyToClipboard}
        getImNonFollowingBack={getImNonFollowingBack}
        />
    ) : null
    }


    {isLoading && (
    <div className="loading-overlay">
        <div className="loading-box">
            <div className="spinner"></div>
            <p>Processing Instagram data...</p>
        </div>
    </div>
    )}
    </div>
)}

export default App
