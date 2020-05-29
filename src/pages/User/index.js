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
  WebButton,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: false,
    page: 1,
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({}),
      }),
    }).isRequired,

    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  loadStarred = async () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    const { page, stars } = this.state;
    const { user } = this.props.route.params;
    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      stars: [...stars, ...response.data],
      loading: false,
      page: page + 1,
    });
  };

  async componentDidMount() {
    this.loadStarred();
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return <ActivityIndicator color="#3949ab" size={30} />;
  };

  handleNavigate = star => {
    const { navigation } = this.props;
    navigation.navigate('Web', { star }); // passo dados do user como parametro
  };

  render() {
    const { stars } = this.state;
    const { user } = this.props.route.params;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <Stars
          onEndReached={this.loadStarred}
          onEndReachedThreshold={0.1}
          data={stars}
          keyExtractor={star => String(star.id)} // preciso de um key unico
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <WebButton onPress={() => this.handleNavigate(item)}>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </WebButton>
              </Info>
            </Starred>
          )}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    );
  }
}
