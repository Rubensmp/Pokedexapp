import React from 'react';
import { Container, Id, Sprite, Name, Content, Overlay } from './styles';
import { PokemonDetail } from '../../types/Pokemon';
import { TouchableWithoutFeedback } from 'react-native';
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';

interface CardPokedexProps {
  data: PokemonDetail;
  search?: boolean;
}

const CardPokedex: React.FC<CardPokedexProps> = ({ data }) => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('PokemonDetails', { name: data.name })}
    >
      <Container shadow={8}>
        <Content>
          <Id>{`# ${data.id}`}</Id>
          <Sprite
            source={{
              uri: data?.sprites.other?.['official-artwork'].front_default,
            }}
          />
          <Name>{data.name}</Name>
        </Content>
        <Overlay />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default CardPokedex;
