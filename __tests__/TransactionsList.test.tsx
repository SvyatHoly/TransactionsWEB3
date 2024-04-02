import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import {TransactionsListScreen} from '../js/TransactionsListScreen';

jest.mock('../js/shared/Loader', () => ({
  Loader: () => 'Loading...',
}));

jest.mock('../js/TransactionsListScreen/ListCell', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    ListCell: () => <View testID="mock-list-cell">Mocked ListCell</View>,
  };
});

jest.mock('axios');

describe('TransactionsList', () => {
  it('fetches transactions on component mount and renders them', async () => {
    const transactionsMock = [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
    ];
    const meta = {
      total: 3,
      offset: 0,
      count: 3,
    };

    axios.get.mockResolvedValue({
      data: {data: transactionsMock, meta: meta},
    });

    const {getAllByTestId} = render(<TransactionsListScreen />);

    await waitFor(() => {
      const listCells = getAllByTestId('mock-list-cell');
      expect(listCells.length).toBe(transactionsMock.length);
    });
  });
});
