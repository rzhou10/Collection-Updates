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
        // to do, need to get the last elements of the 2nd to last page if there are less than 10
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
    return <span>{[...uniqueLabels].join(', ')}</span>;
  }

  renderArtists = (artist) => {
    var uniqueArtist = new Set();
    artist.forEach(name => uniqueArtist.add(this.stripUniqueNumber(name.name)));
    return <h1>{[...uniqueArtist].join(', ')}</h1>;
  }

  // Discogs numbers different artists/labels to differntiate ones with the same name, this
  // is to strip that since it's not necessary here
  stripUniqueNumber(aristOrLabel){
    // eslint-disable-next-line
    return aristOrLabel.replace(/\(([^\)]+)\)/, '').trim();
  }

  render = () => {
    return (
      <div className="row">
        {
          this.state.latest.map(album => 
            <div key={album.id} className='album'>
              {this.renderArtists(album.basic_information.artists)}
              <h3>{album.basic_information.title}</h3>
              <div>{album.basic_information.year === 0 ? 'Unknown' : album.basic_information.year}</div>
              <div><span id='labelSpan'>Label</span>: {this.renderLabels(album.basic_information.labels)}</div>
            </div>
          )
        }
      </div>
    )
  }
}