import useD3 from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";


let data;
let songData = [];
let count = 0;

function Fetch() {
    return new Promise((resolve) => {
function getData(){
    d3.json("https://genius.p.rapidapi.com/artists/1177/songs?sort=popularity&per_page=50", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "genius.p.rapidapi.com",
            "x-rapidapi-key": "0825494c1bmsh1828917831cd0c7p18e3e7jsn3a9c6a86182c"
        }
    }).then((json) => {
    
      data = json.response.songs;
      console.log(data)
        getAlbums(data);
    })};
        console.log("test")
    getData();

    //Get all song data
function getAlbums(data){
	data.forEach( function(result, index, array) {
  
		//Get albums from api with url
		d3.json("https://genius.p.rapidapi.com/" + result.api_path, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "genius.p.rapidapi.com",
				"x-rapidapi-key": "0825494c1bmsh1828917831cd0c7p18e3e7jsn3a9c6a86182c"
			}
		}).then((json) => {
      //Replace zero width space
      let title;
      title = json.response.song.title.replace(/\u200B/g,'');
      //Add name, artist, album and views in array
      songData.push({
        "name": title,
        "artist": json.response.song.artist_names,
        "album": json.response.song.album.name,
        "views": json.response.song.stats.pageviews
      })  
          if(count == array.length - 1){
            // circlePack(songData);
            resolve(songData)
          }
          console.log(songData)
          count++
		})
	})  
}
})
}

export default Fetch;
