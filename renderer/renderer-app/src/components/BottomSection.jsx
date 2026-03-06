function BottomSection({ copyToClipboard, exportAsCSV, getNonFollowingBack, containerRef, copied }) {
    return (
        <>
        <div className="bottom-section">
                <div>
                    <div className="bottom-section-header">
                    <div className="flex-container">
                    <h2>Not Following Back</h2>
                    <button className="copy-button" onClick={copyToClipboard}>Copy List</button>
                    <button className="export-button" onClick={exportAsCSV}>Save as CSV</button> 
                    </div>
                    <img className="line-break" src="../line.png"/>
                    </div>
                    <p className='disclaimer second'>Deactivated accounts are included.</p>
                    <div className="vertical-flow" ref={containerRef} onWheel={(e) => {
        containerRef.current.scrollLeft += e.deltaY;
    }}>
                        {
                            getNonFollowingBack().map((user, index) => (
                                <span key={user}>{user} <br/></span>
                            ))
                        }
                    </div>
                </div>
            </div>
            {copied && (
            <div className="toast">
                Not following back list copied!
            </div>
            )}
            </>
    )
}

export default BottomSection;