import React, { Component } from 'react';
import axios from 'axios';

export default class CollectionList extends Component {
  constructor(){
    super();

    this.state = {
      latest: []
    }
  };

  componentDidMount = () => {
    axios.get('https://api.discogs.com/users/ChunkoHead/collection/folders/0/releases?sort=added')
    .then((response) => {
      axios.get(response.data.pagination.urls.last)
      .then((latestUpdates) => {
        if (latestUpdates.data.releases.length < 10){
          this.setState({
            latest: latestUpdates.data.releases
          });
        }
        else{
          this.setState({
            latest: latestUpdates.data.releases.slice(-10)
          });
        }
      })}
    );
  };

  // may have multiple labels, so need to include whole list
  renderLabels = (labelList) => {
    var uniqueLabels = new Set();
    labelList.forEach(name => uniqueLabels.add(this.stripUniqueNumber(name.name)));
    return <div>{[...uniqueLabels].join(', ')}</div>
  }

  // to get the Discogs page for the specific album
  renderLinkToDiscogs = (basicInfo) => {
    console.log('basic Info')
    console.log(basicInfo)
    return <div></div>
  }

  // Discogs like to put numbers to differenciate artists with same name -> remove that part
  renderArtists = (artist) => {
    var uniqueArtist = new Set();
    artist.forEach(name => uniqueArtist.add(this.stripUniqueNumber(name.name)));
    return <h1>{[...uniqueArtist].join(', ')}</h1>
  }

  // Discogs numbers different artists/labels to differntiate ones with the same name, this
  // is to strip that since it's not necessary here
  stripUniqueNumber(aristOrLabel){
    // eslint-disable-next-line
    return aristOrLabel.replace(/\(([^\)]+)\)/, '');
  }

  render = () => {
    return (
      <div className="row">
        {
          this.state.latest.map(album => 
            <div className="album">
              {this.renderArtists(album.basic_information.artists)}
              {this.renderLinkToDiscogs(album.basic_information)}
              {album.basic_information.year === 0 ? 'Unknown' : album.basic_information.year}
              {this.renderLabels(album.basic_information.labels)}
            </div>
          )
        }
      </div>
    )
  }
}