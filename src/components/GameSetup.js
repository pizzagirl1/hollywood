import React from "react";
import AssetList from "./AssetList";

import './GameSetup.css'


const GameSetup = ( {
                    goalActors,
                    optionsGoalActor0, onClickSetGoalActor0,
                    optionsGoalActor1, onClickSetGoalActor1 } ) => {

    return (       
        <div>   
            <div className="container">
                <ul>
                    <h3>Start With</h3> 
                    <AssetList 
                        assets={optionsGoalActor0}
                        onClick={onClickSetGoalActor0}
                        goalActors={goalActors}
                    />
                </ul>
                <ul>
                    <h3>End With</h3> 
                    <AssetList 
                        assets={optionsGoalActor1}
                        onClick={onClickSetGoalActor1}
                        goalActors={goalActors}
                    />
                </ul>
            </div>
        </div>
    )
}

export default GameSetup;