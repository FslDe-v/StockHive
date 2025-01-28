export interface StockMeta {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  type: string;
}

export interface StockValue {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface StockData {
  meta: StockMeta;
  values: StockValue[];
  status: string;
}

export interface StocksResponse {
  [symbol: string]: StockData;
}
