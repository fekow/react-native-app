import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { Keyboard, ActivityIndicator } from 'react-native';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    users: [],
    newUser: '',
    loading: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;
    this.setState({ loading: true });
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });
    Keyboard.dismiss(); // faz teclado sumir
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate('User', { user }); // passo dados do user como parametro
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            onChangeText={text => this.setState({ newUser: text })}
            value={newUser}
            returnKeyType="send" // tipo de botao que aparece no teclado
            onSubmitEditing={this.handleAddUser} // oque acontece quando da return no teclado
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {!loading ? (
              <Icon name="add" size={20} color="#FFF" />
            ) : (
              <ActivityIndicator color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users} // dados que vao pra lista
          keyExtractor={user => user.login} // preciso de um key unico
          renderItem={({ item }) => (
            // renderizo cada item nessa FlatList
            // o source precisa ser chamado assim pra entender URL.
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText> Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
