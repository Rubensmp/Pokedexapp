import React from 'react';
import { useQuery } from 'react-query';
import { getPokemonDetails } from '../../../../services/Pokemon';
import { CardPokedex } from '../../../../components';
import { Center } from 'native-base';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import useDebounce from '../../../../hooks/useDebounce';

interface SearchProps {
  filter: string;
}

const Search: React.FC<SearchProps> = ({ filter }) => {
  const debouncedValue = useDebounce<string>(filter, 1000);

  const { data, isLoading } = useQuery(
    `getPokemonDetails_${debouncedValue.toLowerCase()}`,
    () => getPokemonDetails(debouncedValue.toLowerCase())
  );

  if (isLoading) {
    return (
      <Center>
        <ActivityIndicator color={'#FFF'} size='large' />
      </Center>
    );
  }

  return (
    <>
      {data ? (
        <View
          style={{
            paddingHorizontal: 5,
            paddingBottom: 20,
            marginBottom: 20,
            borderBottomColor: '#FFF',
            borderBottomWidth: 2,
          }}
        >
          <CardPokedex data={data} search />
        </View>
      ) : (
        <Text style={{ marginTop: 20, color: '#FFF' }}>
          Não foi encontrado nenhum pokemon com esse nome ou identificação
        </Text>
      )}
    </>
  );
};

export default Search;
