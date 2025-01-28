import { Component, OnInit, inject } from '@angular/core';
import { StocksService } from '../stocks/stocks.service';
import { NgFor } from '@angular/common';
import { StockData } from '../stocks/stock.model';

@Component({
  selector: 'app-wallet-summary',
  imports: [NgFor],
  templateUrl: './wallet-summary.component.html',
  styleUrl: './wallet-summary.component.css',
})
export class WalletSummaryComponent implements OnInit {
  userName: string = 'John Doe'; // Replace with dynamic user data
  walletBalance: number = 10000;
  benefits: number = 2000;
  losses: number = 500;

  lastPaidStocks: any[] = []; // Initialize as empty

  private stocksService = inject(StocksService);

  ngOnInit(): void {
    // // Fetch stocks data
    // this.stocksService.getTimeSeries('AAPL,GOOGL,MSFT', '1min').subscribe({
    //   next: (stocks) => {
    //     console.log('Fetched and enriched stocks:', stocks);
    //     this.lastPaidStocks = stocks as StockData[]; // Ensure correct typing
    //   },
    //   error: (error) => {
    //     console.error('Error fetching stocks:', error);
    //   },
    // });
  }

  viewMoreInfo(stock: any) {
    alert(`Viewing more information about ${stock.meta.symbol}`);
  }
}
