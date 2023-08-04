import React from 'react';
import Actor from './Actor';
import Movie from './Movie';
// import noPhoto from '../images/noPhoto.png'
import './AssetList.css'


const AssetList = ( {assets, onClick, goalActors} ) => {
    const getAssetListJSX = (assets) => {
        // console.log("accessing assets: ", assets)
        return assets.map( (asset) => {
            if (asset.type === 'Actor'){ 
                return (
                    <Actor
                        id={asset.id}
                        key={asset.id ? asset.id : Math.floor(Math.random() * 10000)}
                        name= {asset.name}
                        imagePath={asset.imagePath}
                        onClick={onClick}
                        goalActors={goalActors}
                    />)
            } else if (asset.type === 'Movie'){
                return (
                    <Movie
                        id={asset.id}
                        key={asset.id}
                        title= {asset.title}
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