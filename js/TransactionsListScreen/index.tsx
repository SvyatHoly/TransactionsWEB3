import React, {useEffect, useState, useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import axios from 'axios';
import {Loader} from '../shared/Loader';
import {ListCell} from './ListCell';
import {Transaction} from '../types';
import styled from 'styled-components/native';
import {ListRenderItemInfo} from '@shopify/flash-list';
import {Alert} from 'react-native';
import {isValidError} from '../utils/isValidError';

const keyExtractor = (item: Transaction) => item.id;

export const TransactionsListScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const fetchTransactions = useCallback(async (nextPage: number) => {
    setLoading(true);

    try {
      const response = await axios.get(
        'https://testnet-service.lisk.com/api/v3/transactions',
        {
          params: {limit, offset: nextPage * limit},
          headers: {id: 'lsk6u3fwtbbcauvaupgdq5q9v6h4bvjp86sq7aesu'},
        },
      );

      if (response.data && response.data.data && response.data.meta) {
        setTransactions(prev => [...prev, ...response.data.data]);
        const {total, offset, count} = response.data.meta;
        setHasMore(total >= offset + count);
        setPage(nextPage);
      }
    } catch (error) {
      const errorMessage = isValidError(error)
        ? error.message
        : 'An unknown error occurred';
      Alert.alert('Error', errorMessage);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(0);
  }, [fetchTransactions]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Transaction>) => <ListCell item={item} />,
    [],
  );

  const loadMoreTransactions = () => {
    if (!loading && hasMore) {
      fetchTransactions(page + 1);
    }
  };

  return (
    <Container>
      <FlashList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={100}
        onEndReached={loadMoreTransactions}
        onEndReachedThreshold={0.3}
        ListFooterComponent={<Loader loading={loading} />}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;
