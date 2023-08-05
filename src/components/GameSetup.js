import React from "react";
import AssetList from "./AssetList";
// import { useEffect } from "react";

import './GameSetup.css'


const GameSetup = ( {
                    goalActors,
                    startingThree, onClickSetStartingActor,
                    targetThree, onClickSetTargetActor } ) => {

    // eslint-disable-next-line
    // useEffect(() => rollActors(), [])

    return (       
        <div>   
            <div className="container">
                <ul>
                    <h3>Start With</h3> 
                    <AssetList 
                    assets={startingThree}
                    onClick={onClickSetStartingActor}
                    goalActors={goalActors}
                    />
                </ul>
                <ul>
                    <h3>End With</h3> 
                    <AssetList 
                    assets={targetThree}
                    onClick={onClickSetTargetActor}
                    goalActors={goalActors}
                    />
                </ul>
            </div>
        </div>
    )
}

export default GameSetup;