import React from "react";
import AssetList from "./AssetList";
// import { useEffect } from "react";

import './GameSetup.css'


const GameSetup = ( {
                    goalActors,
                    startingThree, onClickSetGoalActor0,
                    targetThree, onClickSetGoalActor1 } ) => {

    return (       
        <div>   
            <div className="container">
                <ul>
                    <h3>Start With</h3> 
                    <AssetList 
                        assets={startingThree}
                        onClick={onClickSetGoalActor0}
                        goalActors={goalActors}
                    />
                </ul>
                <ul>
                    <h3>End With</h3> 
                    <AssetList 
                        assets={targetThree}
                        onClick={onClickSetGoalActor1}
                        goalActors={goalActors}
                    />
                </ul>
            </div>
        </div>
    )
}

export default GameSetup;