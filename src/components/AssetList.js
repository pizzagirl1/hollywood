import React from 'react';
import Actor from './Actor';
import Movie from './Movie';
import './AssetList.css'


const AssetList = ( {assets} ) => {
    const getAssetListJSX = (assets) => {
        return assets.map( (asset) => {
            if (asset.type === 'Actor'){ 
                return (
                    <Actor
                        id={asset.id}
                        key={asset.id}
                        name= {asset.name}
                        imagePath={asset.imagePath}
                    />)
            } else if (asset.type === 'Movie'){
                return (
                    <Movie
                        id={asset.id}
                        key={asset.id}
                        name= {asset.name}
                        imagePath={asset.imagePath}
                    />
                )
            } else { return null };

    })
    }

    return (
        <div className="container">
            <ul>{getAssetListJSX(assets)}</ul>
        </div>
    )
}

export default AssetList;