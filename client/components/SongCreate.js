import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        title: this.state.title
      },
      update: (store, { data: { addSong } }) => {
        // Read the data from the cache for this query.
        const data = store.readQuery({query: fetchSongs });
        // Add our channel from the mutation to the end.
        data.songs.push(addSong);
        // Write the data back to the cache.
        store.writeQuery({ query: fetchSongs, data });
      },
    }).then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">
          Back
        </Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            value={this.state.title}
            onChange={event => this.setState({ title: event.target.value })}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title) {
      id,
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
