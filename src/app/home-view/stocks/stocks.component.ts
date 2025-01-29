import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StocksService } from './stocks.service';

@Component({
  selector: 'app-stocks',
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe, NgClass],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent {
  private stocksService = inject(StocksService);

  stocks = this.stocksService.allStocks;
  stockData: any[] = []; // Store fetched stocks data
  errorMessage: string = '';
  // Event emitter to send stock details to the parent component
  @Output() stockSelected = new EventEmitter<any>();

  showMoreInfo(stock: any) {
    this.stockSelected.emit(stock); // Emit selected stock data
  }

  ngOnInit(): void {
    this.stocksService
      .getTimeSeries('AAPL,GOOGL,MSFT,AMZN,V,TSLA,NVDA,JNJ', '1min')
      .subscribe({
        next: (stocks) => {
          this.stockData = stocks.map((stock: any) => ({
            ...stock,
            marketCap: this.generateRandomMarketCap(),
            dayRange: this.generateRandomDayRange(),
            weekRange: this.generateRandomWeekRange(),
          }));
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
  }

  toggleBuyStock(stock: any) {
    stock.bought = !stock.bought; // Toggle the bought status
    if (stock.bought) {
      alert(`You have bought ${stock.meta.symbol}`);
    } else {
      alert(`You have unbought ${stock.meta.symbol}`);
    }
  }

  filterStocks() {
    // Example: Filter stocks based on exchange
    this.stockData = this.stockData.filter(
      (stock: any) => stock.meta.exchange === 'NASDAQ'
    );
  }

  sortStocks() {
    // Example: Sort stocks by price
    this.stockData = this.stockData.sort(
      (a: any, b: any) =>
        parseFloat(a.values[0]?.close) - parseFloat(b.values[0]?.close)
    );
  }

  private generateRandomMarketCap(): string {
    const values = ['1.88T', '2.45T', '3.12T', '1.50T', '1.70T'];
    return values[Math.floor(Math.random() * values.length)];
  }

  private generateRandomDayRange(): string {
    const low = (100 + Math.random() * 50).toFixed(2);
    const high = (parseFloat(low) + Math.random() * 10).toFixed(2);
    return `${low} - ${high}`;
  }

  private generateRandomWeekRange(): string {
    const low = (50 + Math.random() * 100).toFixed(2);
    const high = (parseFloat(low) + Math.random() * 50).toFixed(2);
    return `${low} - ${high}`;
  }
}
