function ImportScreen({
    haveFollowing,
    haveFollowers,
    setHaveFollowing,
    setHaveFollowers,
    setFollowers,
    setFollowing,
    isLoading,
    setIsLoading
}) {
    function handleDataImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            setIsLoading(true);
            let json = null;
            try {
            json = JSON.parse(e.target.result);
            } catch (err) {
            alert("Invalid JSON file.");
            return;
            }
            if (Array.isArray(json)) {
                //console.log("Array detected");
                const tempFollowers = []
                json.forEach(obj => {
                    tempFollowers.push(obj['string_list_data'][0]['value'])
                })
                //console.log(tempFollowers);
                setFollowers(tempFollowers);
                setHaveFollowers(true);
            }
            else if (json.hasOwnProperty('relationships_following')) {
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
            setIsLoading(false);
        }
    reader.readAsText(file);
    //console.log(followers);
    }

    return (
        <>
        <div>
        <div className="button-container">
            <p>Make sure your date range is set to <strong>"All Time"</strong> when exporting your data.</p>
            <button className="import-button" onClick={() => document.getElementById("follower-input").click()}>Insert your data.</button>
            {haveFollowers || (!haveFollowers && !haveFollowing) ? null : <p className="provide-prompt">Please provide follower data.</p>}
            {haveFollowing || (!haveFollowers && !haveFollowing) ? null : <p className="provide-prompt">Please provide following data.</p>}
            {(!haveFollowers && !haveFollowing) ? <p className="provide-prompt">Please provide either a followers or following JSON file.</p> : null}
        </div>
        <input type="file" id="follower-input" accept=".json" style={{display: "none"}} onChange={handleDataImport}></input>
        </div>
        </>
    )
}

export default ImportScreen;