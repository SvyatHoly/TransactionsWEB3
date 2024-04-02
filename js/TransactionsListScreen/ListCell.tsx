import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';

import {Transaction} from '../types';
import styled from 'styled-components/native';

interface Props {
  item: Transaction;
}

export const ListCell: React.FC<Props> = memo(({item}) => {
  const navigation = useNavigation<any>();

  return (
    <ItemContainer
      onPress={() => navigation.navigate('DetailsScreen', {transaction: item})}>
      <Section>
        <Label>ID: </Label>
        <Text>{item.id}</Text>
      </Section>

      <Section>
        <Label>Status: </Label>
        <ExecutionStatus status={item.executionStatus}>
          {item.executionStatus}
        </ExecutionStatus>
      </Section>
      <Separator />
    </ItemContainer>
  );
});

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  align-items: flex-start;
`;

const Label = styled.Text`
  font-weight: bold;
  color: #444;
`;

const ItemContainer = styled.TouchableOpacity`
  padding: 10px;
  height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const Text = styled.Text``;

const Separator = styled.View`
  height: 1px;
  background-color: black;
  margin: 10px;
`;

const ExecutionStatus = styled(Text)<{status: string}>`
  flex: 2;
  color: ${({status}) => (status === 'failed' ? '#d9534f' : '#5cb85c')};
`;
