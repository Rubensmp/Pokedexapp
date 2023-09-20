import { RouteProp } from '@react-navigation/native';

export type ParamList = {
  Pokedex: undefined;
  PokemonDetails: {name: string} | undefined;
};

export type RootRouteProps<RouteName extends keyof ParamList> = RouteProp<
  ParamList,
  RouteName
>;