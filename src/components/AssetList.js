import React from 'react';
import Actor from './Actor';
import Movie from './Movie';
import Asset from './Asset';
// import noPhoto from '../images/noPhoto.png'
import './AssetList.css'


const AssetList = ( {assets, onClick, goalActors} ) => {
    const getAssetListJSX = (assets) => {
        return assets.map( (asset) => {
                return (
                    <Asset
                        id={asset.id}
                        key={asset.id ? asset.id : Math.floor(Math.random() * 10000)}
                        name= {asset.name}
                        imagePath={asset.imagePath}
                        type={asset.type}
                        onClick={onClick}
                        goalActors={goalActors}
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