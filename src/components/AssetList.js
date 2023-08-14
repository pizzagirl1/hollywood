import React from 'react';
import Asset from './Asset';
import './AssetList.css'
import PropTypes from 'prop-types';


const AssetList = ( {assets, onClick, goalActors} ) => {
    const getAssetListJSX = (assets) => {
        return assets.map( (asset) => {
            const keyRandomizer = Math.floor(Math.random() * 100000)
            const randomKey = String("ID: " + asset.id + "-" + keyRandomizer)
                return (
                    <Asset
                        id={asset.id}
                        name= {asset.name}
                        imagePath={asset.imagePath}
                        type={asset.type}
                        onClick={onClick}
                        goalActors={goalActors}
                        key={randomKey}
                    />
                )
            }
        )
    }

    return (
        <div className="container">
            <ul>{getAssetListJSX(assets)}</ul>
        </div>
    )
}

AssetList.propTypes = {
    assets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    ),
    onClick: PropTypes.func.isRequired,
    goalActors: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            imagePath: PropTypes.string,
            type: PropTypes.string, 
        })
    ),
}

export default AssetList;