import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { StocksResponse, StockData } from './stock.model';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  stocks = signal<StockData[]>([]);
  allStocks = this.stocks.asReadonly();
  private baseUrl = 'https://api.twelvedata.com';
  private apiKey = 'YOUR KEY ;)';

  constructor(private http: HttpClient) {}

  // private stockIcons: { [key: string]: string } = {
  //   AAPL: 'apple.png',
  //   GOOGL: 'google.png',
  //   TSLA: 'tesla.png',
  //   MSFT: 'microsoft.png',
  //   AMZN: 'amazon.png',
  //   FB: 'meta.png',
  //   NVDA: 'nvidia.png',
  //   JNJ: 'johnson.png',
  //   V: 'visa.png',
  // };

  getTimeSeries(symbols: string, interval: string) {
    const url = `${this.baseUrl}/time_series?symbol=${symbols}&interval=${interval}&apikey=${this.apiKey}`;
    return this.http.get<StocksResponse>(url).pipe(
      map((response: StocksResponse) => {
        return Object.entries(response)
          .map(([symbol, stockData]) => {
            if (!stockData.meta || !stockData.values) {
              console.warn(
                `Invalid stock data format for symbol: ${symbol}`,
                stockData
              );
              return null;
            }
            return {
              meta: stockData.meta,
              values: stockData.values,
              status: stockData.status,
            };
          })
          .filter((stock) => stock !== null);
      }),
      catchError((error) => {
        console.error('Error fetching stocks:', error);
        return throwError(() => new Error('Failed to fetch stocks.'));
      })
    );
  }
}
