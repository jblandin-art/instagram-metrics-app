import React, { useState } from "react";
import Footer from "./Footer";
import BottomSection from "./BottomSection";

function MetricsOverview({
    followers,
    following,
    getNonFollowingBack,
    getImNonFollowingBack,
    containerRef,
    isChart,
    setIsChart,
    copyToClipboard,
    exportAsCSV
}) {

    const [copied, setCopied] = useState(false);
    
    return (
        <>
        <div className="top-section">
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
                    <h2>Connection Metrics</h2>
                    <img className="line-break" src="../line.png"/>
                    <p>{getNonFollowingBack().length} users aren't following you back.</p>
                    <p className="secondary-p">{(((getNonFollowingBack().length / following.length * 100))).toFixed(0)}% of the people you follow.</p>
                    <p>You have {followers.length - getImNonFollowingBack().length} mutual connections.</p>
                </div> 
            </div>
        </div>
        <BottomSection 
        copyToClipboard={copyToClipboard}
        exportAsCSV={exportAsCSV}
        getNonFollowingBack={getNonFollowingBack}
        containerRef={containerRef}
        copied={copied}
        />
            
        <Footer />
        </>
    )
}

export default MetricsOverview;