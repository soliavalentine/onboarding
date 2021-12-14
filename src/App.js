// eslint-disable no-var
import React from 'react';
import PostsDisplay from './PostsDisplay';
import './App.css';

// airtable configuration
const Airtable = require('airtable');

const airtableConfig = {
  apiKey: process.env.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: process.env.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      topicBox: null,
      payloadBox: null,
    };

    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  publish() {
    const { topicBox } = this.state;
    const { payloadBox } = this.state;
    console.log({ topicBox }, { payloadBox });
    base('Posts').create([
      {
        fields: {
          Body: topicBox,
          Author: payloadBox,
        },
      },

    ], (err, records) => {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => {
        console.log(record.getId());
      });
    });
  }

  render() {
    const { topicBox } = this.state;
    const { payloadBox } = this.state;
    return (
      <div>
        <input
          type="text"
          name="topicBox"
          value={topicBox}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="payloadBox"
          value={payloadBox}
          onChange={this.handleChange}
        />

        <button button type="button" value="Send" onClick={this.publish}>Publish</button>
        <PostsDisplay />
      </div>
    );
  }
}
export default App;
