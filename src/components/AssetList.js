import React from 'react';
import Asset from './Asset';
import './AssetList.css'


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

export default AssetList;