import React from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

interface LoaderProps {
  loading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({loading}) => {
  if (!loading) {
    return null;
  }

  return (
    <LoaderContainer>
      <ActivityIndicator size="large" />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.View`
  padding: 20px;
  border-top-width: 1px;
  border-color: #ced0ce;
`;
