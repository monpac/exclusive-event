import React, { Component } from 'react';

export default class Link extends Component {
  render() {
    const { link } = this.props;

    if (link.user !== "") {
      return (
        <p><a style={{cursor: 'pointer', color: 'red'}} onClick={this.copyToClipboard}>https://casperhalloweenparty.com/{link.id}</a></p>
      )
    } else {
      return (
        <p><a style={{cursor: 'pointer'}} onClick={this.copyToClipboard}>https://casperhalloweenparty.com/{link.id}</a></p>
      )
    }
  }

}