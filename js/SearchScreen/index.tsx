import React, {useState} from 'react';
import {Alert, Button, Text} from 'react-native';
import styled from 'styled-components/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {EtherTransaction} from '../types';
import {Loader} from '../shared/Loader';
import {isValidError} from '../utils/isValidError';
const Web3 = require('web3');
const web3 = new Web3(
  'https://mainnet.infura.io/v3/2ecb34b9b11c456e8d3945320b16dd01',
);

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transaction, setTransaction] = useState<EtherTransaction | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    setTransaction(undefined);
    const handleWeb3 = async () => {
      let receipt;
      try {
        receipt = await web3.eth.getTransaction(searchQuery);
        setTransaction(receipt);
      } catch (error) {
        const errorMessage = isValidError(error)
          ? error.message
          : 'An unknown error occurred';
        Alert.alert('Error', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    handleWeb3();
  };

  const copyToClipboard = () => {
    if (transaction === undefined) {
      return;
    }
    Clipboard.setString(transaction?.blockHash);
    Alert.alert('Copied to Clipboard', transaction?.blockHash);
  };

  const renderTransactionInfo = () => {
    if (transaction === undefined) {
      return;
    }
    return (
      <>
        <IdSection>
          <IdLabel>blockHash:</IdLabel>
          <ValueContainer onPress={copyToClipboard}>
            <IdValue testID="blockHashValue">{transaction?.blockHash}</IdValue>
          </ValueContainer>
        </IdSection>
        <Section>
          <Label>blockNumber:</Label>
          <Value>{String(transaction?.blockNumber)}</Value>
        </Section>

        <Section>
          <Label>chainId:</Label>
          <Value>{String(transaction?.chainId)}</Value>
        </Section>

        <Section>
          <Label>gas:</Label>
          <Value>{String(transaction?.gas)}</Value>
        </Section>

        <Section>
          <Label>gasPrice:</Label>
          <Value>{String(transaction?.gasPrice)}</Value>
        </Section>
      </>
    );
  };
  return (
    <Container>
      <StyledInput
        testID="input"
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Enter transaction hash"
      />
      {!isLoading ? (
        <Button
          testID="searchButton"
          onPress={handleSearch}
          title="Search"
          disabled={!searchQuery.trim()}
        />
      ) : (
        <Loader loading={isLoading} />
      )}
      {transaction ? renderTransactionInfo() : null}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding-horizontal: 10px;
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
