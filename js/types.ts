export type DetailsScreenRouteParams = {
  transaction: Transaction;
};

export type DetailsScreenProps = {
  route: DetailsScreenRouteParams;
};

export interface Error {
  message: string;
}

export interface Block {
  id: string;
  height: number;
  timestamp: number;
  isFinal: boolean;
}

export interface Sender {
  address: string;
  publicKey: string;
  name: string;
}

export interface Params {
  tokenID: string;
  amount: string;
  recipientAddress: string;
  data: string;
}

export interface MetaRecipient {
  address: string;
  publicKey: string | null;
  name: string | null;
}

export interface Transaction {
  id: string;
  moduleCommand: string;
  nonce: string;
  fee: string;
  minFee: string;
  size: number;
  block: Block | undefined;
  sender: Sender;
  params: Params;
  signatures: string[];
  executionStatus: string;
  index: number;
  meta: {
    recipient: MetaRecipient;
  };
}

export type EtherTransaction = {
  blockHash: string;
  blockNumber: bigint;
  chainId: bigint;
  data: string;
  from: string;
  gas: bigint;
  gasPrice: bigint;
  hash: string;
  input: string;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  nonce: bigint;
  r: string;
  s: string;
  to: string;
  transactionIndex: bigint;
  type: bigint;
  v: bigint;
  value: bigint;
};
