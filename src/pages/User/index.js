import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: false,
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({}),
      }),
    }).isRequired,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const { user } = this.props.route.params;
    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  render() {
    const { stars, loading } = this.state;
    const { user } = this.props.route.params;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {!loading ? (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)} // preciso de um key unico
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        ) : (
          <ActivityIndicator color="#3949ab" size={70} />
        )}
      </Container>
    );
  }
}