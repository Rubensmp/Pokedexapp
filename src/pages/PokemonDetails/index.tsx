import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  Flex,
  IconButton,
  ArrowBackIcon,
  Heading,
  Box,
  VStack,
  HStack,
  Icon,
  Progress,
  Image,
} from 'native-base';
import { useQuery } from 'react-query';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { getPokemonDetails } from '../../services/Pokemon';
import { Type, Ability, Stat } from '../../types/Pokemon';

import formatStats from '../../utils/formatStats';
import typeColors from '../../utils/typeColors';
import {
  useNavigation,
  useRoute,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import {
  DescriptionText,
  DescriptionTitle,
  StatusText,
  TypeLabel,
} from './styles';

import { RootRouteProps } from '../../types/Route';

// import { Container } from './styles';

const Pokedex: React.FC = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route = useRoute<RootRouteProps<'PokemonDetails'>>();

  const { data, isLoading } = useQuery(
    `getPokemonDetails_${route.params?.name}`,
    () => getPokemonDetails(route.params?.name)
  );

  const primaryColor = typeColors(data?.types[0].type.name);
  const height = data && data?.height / 10;
  const weight = data && data?.weight / 10;

  return (
    <Box flex='1' safeAreaTop>
      <ScrollView style={{ padding: 10, backgroundColor: primaryColor }}>
        <VStack paddingBottom={10}>
          <Flex
            alignItems='center'
            flexDirection='row'
            justifyContent='space-between'
          >
            <IconButton
              aria-label='Go back'
              icon={<ArrowBackIcon color='#FFF' />}
              bg='transparent'
              onPress={() => navigation.goBack()}
            />
            <Heading color='#FFF' style={{ textTransform: 'capitalize' }}>
              {route.params?.name}
            </Heading>
            <Text>{`# ${data?.id}`}</Text>
          </Flex>
          <Box
            boxSize='xs'
            zIndex={10}
            alignSelf={'center'}
            alignItems={'center'}
          >
            <Image
              source={{
                uri: data?.sprites.other?.['official-artwork'].front_default,
              }}
              alt='Pokemon image'
              w={'300px'}
              h={'300px'}
            />
          </Box>
          <VStack
            bg='#FFF'
            borderRadius='12px'
            marginTop='-150px'
            paddingX={5}
            paddingTop={40}
            paddingBottom={10}
          >
            <Flex justifyContent='center' flexDirection='row'>
              {data?.types.map((type: Type) => (
                <TypeLabel
                  style={{ backgroundColor: typeColors(type.type.name) }}
                >
                  {type.type.name}
                </TypeLabel>
              ))}
            </Flex>

            <Heading color={primaryColor} mt={10} textAlign='center'>
              About
            </Heading>

            <HStack
              space={10}
              justifyContent='center'
              alignItems='flex-end'
              mt={5}
            >
              <Flex alignItems='center'>
                <Flex alignItems='center' flexDirection='row'>
                  <Icon
                    as={MaterialCommunityIcons}
                    name='weight'
                    color='#707070'
                  />
                  <Text>{weight} kg</Text>
                </Flex>
                <DescriptionTitle>Weight</DescriptionTitle>
              </Flex>

              <Flex alignItems='center'>
                <Flex alignItems='center' flexDirection='row'>
                  <Icon
                    as={FontAwesome5}
                    name='ruler-vertical'
                    color='#707070'
                  />
                  <Text>{height} m</Text>
                </Flex>
                <DescriptionTitle>Height</DescriptionTitle>
              </Flex>

              <Flex alignItems='center'>
                {data?.abilities.map((ability: Ability) => {
                  return (
                    <DescriptionText key={ability.slot}>
                      {ability.ability.name.replace('-', ' ')}
                    </DescriptionText>
                  );
                })}
                <DescriptionTitle>Moves</DescriptionTitle>
              </Flex>
            </HStack>

            <Heading color={primaryColor} my={10} textAlign='center'>
              Base Stats
            </Heading>

            <HStack
              padding='0 10px'
              flex={1}
              alignItems='center'
              divider={
                <View
                  style={{
                    width: 1,
                    height: '100%',
                    backgroundColor: '#707070',
                    marginHorizontal: 10,
                  }}
                />
              }
            >
              <Flex alignItems='flex-end' style={{ alignItems: 'flex-end' }}>
                {data?.stats.map((stat: Stat) => {
                  return <StatusText>{formatStats(stat.stat.name)}</StatusText>;
                })}
              </Flex>

              <Flex flex={1} justifyContent={'space-between'}>
                {data?.stats.map((stat: Stat) => {
                  return (
                    <Flex flexDirection={'row'} alignItems={'center'}>
                      <StatusText>{stat.base_stat}</StatusText>
                      <Progress
                        value={stat.base_stat}
                        max={255}
                        borderRadius='20px'
                        flex={1}
                        color={primaryColor}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Pokedex;
