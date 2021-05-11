import React, { Component } from 'react';
import axios from 'axios';

export default class CollectionList extends Component {
  constructor(){
    super();

    this.state = {
      latest: []
    }
  };

  getAlbums = () => {
    var lastUrl = await axios.get('https://api.discogs.com/users/ChunkoHead/collection/folders/0/releases?sort=added');
    var latestUpdates = await axios.get(lastUrl.pagination.urls.last);
    if (latestUpdates.releases.length < 10){
      var len = latestUpdates.releases.length
      this.setState({
        latest: latestUpdates.releases.slice(-len)
      });
    }
    else{
      this.setState({
        latest: latestUpdates.releases.slice(-10)
      });
    }
  };

  // may have multiple labels, so need to include whole list
  renderLabels = (labelList) => {
    return <div></div>
  }

  // to get the Discogs page for the specific album
  renderLinkToDiscogs = (basicInfo) => {
    return <div></div>
  }

  // Discogs like to put numbers to differenciate artists with same name -> remove that part
  renderArtists = (artist) => {
    return <div></div>
  }

  render = () => {
    return (
      <div className="table">
        {
          this.state.latest.map(album => 
            <div className="row">
              {this.renderLinkToDiscogs(album.basic_information)}
              {album.basic_information.year}
              {this.renderLabels(album.basic_information.labels)}
              {this.renderArtists(album.basic_information.artists)}
            </div>
          )
        }
      </div>
    )
  }
}