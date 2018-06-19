import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchSong from '../queries/fetchSong';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { lyric: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.lyric,
        songId: this.props.songId
      }
    }).then(() => this.setState({ lyric: '' }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.lyric}
          onChange={event => this.setState({ lyric: event.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
