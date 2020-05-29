import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default class StarredWeb extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        star: PropTypes.shape({}),
      }),
    }).isRequired,
  };

  render() {
    const { star } = this.props.route.params;
    return <WebView source={{ uri: `${star.html_url}` }} />;
  }
}
