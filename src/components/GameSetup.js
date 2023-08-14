import React from "react";
import AssetList from "./AssetList";
import PropTypes from "prop-types"

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

GameSetup.propTypes = {
    goalActors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    ),
    optionsGoalActor0: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    ), 
    onClickSetGoalActor0: PropTypes.func.isRequired,
    optionsGoalActor1: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    ),
    onClickSetGoalActor1: PropTypes.func.isRequired
}

export default GameSetup;