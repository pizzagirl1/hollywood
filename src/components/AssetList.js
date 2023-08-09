import React from 'react';
import Asset from './Asset';
import './AssetList.css'


const AssetList = ( {assets, onClick, goalActors} ) => {
    const getAssetListJSX = (assets) => {
        return assets.map( (asset) => {
            const keyRandomizer = Math.floor(Math.random() * 10000)
                return (
                    <Asset
                        id={asset.id}
                        name= {asset.name}
                        imagePath={asset.imagePath}
                        type={asset.type}
                        onClick={onClick}
                        goalActors={goalActors}
                        key={asset.id ? asset.id + keyRandomizer: keyRandomizer}
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