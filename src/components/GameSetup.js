import React from "react";
import AssetList from "./AssetList";

const GameSetup = ( {
                    rollActors, 
                    startingThree, onClickSetStartingActor,
                    targetThree, onClickSetTargetActor } ) => {
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