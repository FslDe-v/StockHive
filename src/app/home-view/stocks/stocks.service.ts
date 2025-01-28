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
  private apiKey = '54054e81c1d547f8aa9dcbe4809b7e1b';

  constructor(private http: HttpClient) {}

  // Icon map for stock symbols
  private stockIcons: { [key: string]: string } = {
    AAPL: 'apple.png',
    GOOGL: 'google.png',
    TSLA: 'tesla.png',
    MSFT: 'microsoft.png', // Microsoft
    AMZN: 'amazon.png', // Amazon
    FB: 'meta.png', // Facebook (Meta)
    NVDA: 'nvidia.png', // Nvidia
    JNJ: 'johnson.png', // Johnson & Johnson
    V: 'visa.png', // Visa
  };

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
          .filter((stock) => stock !== null); // Filter out null values
      }),
      catchError((error) => {
        console.error('Error fetching stocks:', error);
        return throwError(() => new Error('Failed to fetch stocks.'));
      })
    );
  }
}
