import React from "react";
import AssetList from "./AssetList";
// import { useEffect } from "react";


const GameSetup = ( {
                    rollActors, 
                    startingThree, onClickSetStartingActor,
                    targetThree, onClickSetTargetActor } ) => {

    // // eslint-disable-next-line
    // useEffect(() => rollActors(), [])

    return (       
        <div>
            <button onClick={rollActors}>Mulligan</button>   
            <div>
                <h3>Start With</h3> 
                <AssetList 
                assets={startingThree}
                onClick={onClickSetStartingActor}
                />
            </div>
            <div>
                <h3>End With</h3> 
                <AssetList 
                assets={targetThree}
                onClick={onClickSetTargetActor}
                />
            </div>
        </div>
    )
}

export default GameSetup;