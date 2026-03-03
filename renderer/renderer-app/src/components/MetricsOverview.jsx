import Footer from "./Footer";

function MetricsOverview({
    followers,
    following,
    getNonFollowingBack,
    getImNonFollowingBack,
    containerRef
}) {
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
                    <p>{(100 - ((getNonFollowingBack().length / following.length * 100))).toFixed(0)}% of the people you follow, are following you back. ✅</p>
                    <p className="secondary-p">You are following back {(100 - ((getImNonFollowingBack().length / followers.length * 100))).toFixed(0)}% of the people that follow you.</p>
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
                                //index == 24 ? <a href="null" className="and-more">and more... </a>: 
                                <span key={user}>{user} <br/></span>
                            ))
                        }
                    </div>
                </div>
            </div>
    <Footer />
    </>
    )
}

export default MetricsOverview;