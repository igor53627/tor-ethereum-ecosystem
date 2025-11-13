export interface DocLink {
  label: string;
  url: string;
}

export interface BaseItem {
  id: string;
  name: string;
  description: string;
  website?: string;
  github?: string;
  docs?: string;
  docsLinks?: DocLink[];
  tags: string[];
  category: string;
  memo?: string;
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

export interface Explorer extends BaseItem {
  category: 'explorer';
  onionUrl?: string;
}

export interface Frontend extends BaseItem {
  category: 'frontend';
  onionUrl?: string;
}

export interface Node extends BaseItem {
  category: 'node';
}

export type Item = Wallet | RPCProvider | LoadBalancer | WalletSDK | Explorer | Frontend | Node;
