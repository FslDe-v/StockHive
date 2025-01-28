import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StocksService } from './stocks.service';

@Component({
  selector: 'app-stocks',
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css',
})
export class StocksComponent {
  private stocksService = inject(StocksService);

  stocks = this.stocksService.allStocks;
  stockData: any[] = []; // Store fetched stocks data
  errorMessage: string = '';
  // Emit the stock to the parent component
  @Output() viewInfo = new EventEmitter<any>();

  showMoreInfo(stock: any) {
    this.viewInfo.emit(stock); // Emit the stock data to the parent component
  }

  ngOnInit(): void {
    // Fetch stock data from the service
    this.stocksService.getTimeSeries('GOOGL,MSFT', '1min').subscribe({
      next: (stocks) => {
        console.log('Stocks Array:', stocks);
        this.stockData = stocks.map((stock) => ({
          ...stock,
          bought: false, // Add a default `bought` property
        }));
      },
      error: (error) => {
        console.error('Error:', error);
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
}
