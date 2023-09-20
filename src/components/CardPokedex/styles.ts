import { Box } from 'native-base';
import styled from 'styled-components/native';



export const Container = styled(Box)`
  background: #FFF;
  margin: 5px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  min-width: 180px;
  width: 180px;
`;

export const Content = styled.View`
  padding: 10px;

position: relative;
  display: flex;
  flex-direction: column;
  z-index: 100;
`

export const Id = styled.Text`
  align-self: flex-end;
  font-size: 12px;
  color: #A3A3A3;
`

export const Sprite = styled.Image`
  align-self: center;
  width: 120px;
  height: 120px;
`

export const Name = styled.Text`
  text-transform: capitalize;
  align-self: center;
  font-weight: 500;
`

export const Overlay = styled.View`
  position: absolute;
  top: 60%;
  left: 0;
  height: 100%;
  width:  100%;
  border-radius: 20px;
  background: #EFEFEF;
`
