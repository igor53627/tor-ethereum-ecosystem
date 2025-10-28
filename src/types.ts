export interface BaseItem {
  id: string;
  name: string;
  description: string;
  website?: string;
  github?: string;
  tags: string[];
  category: string;
}

export interface Wallet extends BaseItem {
  category: 'wallet';
}

export interface RPCProvider extends BaseItem {
  category: 'rpc-provider';
  onionUrl?: string;
  types?: string[];
}

export interface LoadBalancer extends BaseItem {
  category: 'loadbalancer';
}

export interface WalletSDK extends BaseItem {
  category: 'wallet-sdk';
}

export type Item = Wallet | RPCProvider | LoadBalancer | WalletSDK;
