import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { listPokemons } from '../../services/Pokemon';
import { useQuery } from 'react-query';
import { PokemonDetail } from '../../types/Pokemon';
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Icon,
  Input,
  Spacer,
  VStack,
  Button,
  Flex,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { CardPokedex } from '../../components';
import { Search } from './components';

// import { Container } from './styles';
interface Props {
  navigation: any;
}

const Pokedex: React.FC<Props> = ({ navigation }) => {
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');

  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);

  const { isFetching, isLoading, data } = useQuery({
    queryKey: ['listPokemons', page],
    queryFn: () => listPokemons(page),
    keepPreviousData: true,
    onSuccess: (data) => setPokemons([...pokemons, ...data.results]),
  });

  const isSearching = filter !== '';
  const loading = isFetching || isLoading;

  return (
    <Box safeAreaTop={8} bg='#b20320' flex={1} paddingX='10px'>
      <FlatList
        ListFooterComponent={
          loading ? <ActivityIndicator color={'#FFF'} size='large' /> : <View />
        }
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: 'center',
          borderRadius: 12,
        }}
        numColumns={2}
        ListHeaderComponent={
          <>
            <Heading fontSize='xl' color='#FFF' mb={5}>
              Pokedex
            </Heading>
            <Flex flexDirection='row' flexGrow={1} mb={5}>
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name='search' />}
                    size={5}
                    ml='2'
                    color='#b20320'
                  />
                }
                mr='5px'
                flex={1}
                placeholder='Search'
                variant='rounded'
                placeholderTextColor='#000'
                bgColor='#FFF'
                focusOutlineColor={'#FFF'}
                value={filter}
                onChangeText={(text) => setFilter(text)}
              />
              <Button size='xs' rounded='full' bgColor={'#FFF'} padding='20px'>
                <MaterialIcons name='tag' color='#b20320' />
              </Button>
            </Flex>
            {isSearching && <Search filter={filter} />}
          </>
        }
        data={pokemons}
        renderItem={({ item }) => <CardPokedex data={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => setPage(page + 1)}
      />
    </Box>
  );
};

export default Pokedex;
