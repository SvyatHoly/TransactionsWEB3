import React from 'react';
import {Alert, Text} from 'react-native';
import styled from 'styled-components/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DetailsScreenRouteParams} from '../types';

type RootStackParamList = {
  Details: DetailsScreenRouteParams;
};

export const TransactionsDetails: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const {transaction} = route.params;

  const copyToClipboard = () => {
    Clipboard.setString(transaction.id);
    Alert.alert('Copied to Clipboard', transaction.id);
  };

  return (
    <Container>
      <Header>Transaction Details</Header>

      <IdSection>
        <IdLabel>ID:</IdLabel>
        <ValueContainer onPress={copyToClipboard}>
          <IdValue>{transaction.id}</IdValue>
        </ValueContainer>
      </IdSection>

      <Section>
        <Label>Module Command:</Label>
        <Value>{transaction.moduleCommand}</Value>
      </Section>

      <Section>
        <Label>Nonce:</Label>
        <Value>{transaction.nonce}</Value>
      </Section>

      <Section>
        <Label>Fee:</Label>
        <Value>{transaction.fee}</Value>
      </Section>

      <Section>
        <Label>Min Fee:</Label>
        <Value>{transaction.minFee}</Value>
      </Section>

      <Section>
        <Label>Size:</Label>
        <Value>{transaction.size}</Value>
      </Section>

      {transaction.block ? (
        <>
          <Section>
            <Label>Block ID:</Label>
            <Value>{transaction.block.id}</Value>
          </Section>

          <Section>
            <Label>Block Height:</Label>
            <Value>{transaction.block.height}</Value>
          </Section>
        </>
      ) : null}

      <Section>
        <Label>Sender Address:</Label>
        <Value>{transaction.sender.address}</Value>
      </Section>

      <Section>
        <Label>Recipient Address:</Label>
        <Value>{transaction.params.recipientAddress}</Value>
      </Section>

      <Section>
        <Label>Amount:</Label>
        <Value>{transaction.params.amount}</Value>
      </Section>

      <Section>
        <Label>Status:</Label>
        <ExecutionStatus status={transaction.executionStatus}>
          {transaction.executionStatus}
        </ExecutionStatus>
      </Section>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  align-items: flex-start;
`;

const IdSection = styled(Section)`
  flex-direction: column;
`;

const Label = styled.Text`
  font-weight: bold;
  margin-right: 10px;
  flex: 1;
  color: #444;
`;

const Value = styled(Label)`
  flex: 2;
  color: #666;
`;

const IdLabel = styled(Label)`
  margin-bottom: 20px;
  flex: none;
`;

const IdValue = styled(Text)`
  color: #666;
`;

const ValueContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 10px;
  height: 100px;
  padding: 20px;
`;

const ExecutionStatus = styled(Text)<{status: string}>`
  flex: 2;
  color: ${({status}) => (status === 'failed' ? '#d9534f' : '#5cb85c')};
`;
