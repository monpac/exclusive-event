import React, { Component } from 'react';

export default class Link extends Component {
  render() {
    const { link, uid } = this.props;

    if(link.owner === uid) {
      if (link.user !== "") {
        return (
          <p><a style={{cursor: 'pointer', color: 'red'}} onClick={this.copyToClipboard}>https://casperhalloweenparty.com/{link.id}</a></p>
        )
      } else {
        return (
          <p><a style={{cursor: 'pointer'}} onClick={this.copyToClipboard}>https://casperhalloweenparty.com/{link.id}</a></p>
        )
      }

    } else {
      return (null);
    }
  }

}