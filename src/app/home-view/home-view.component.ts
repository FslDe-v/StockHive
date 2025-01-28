import { Component } from '@angular/core';
import { StockData } from './stocks/stock.model';
import { HeaderComponent } from '../header/header.component';
import { WalletSummaryComponent } from './wallet-summary/wallet-summary.component';
import { StocksComponent } from './stocks/stocks.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
  imports: [HeaderComponent, WalletSummaryComponent, StocksComponent, NgIf],
})
export class HomeViewComponent {
  showModal: boolean = false;
  selectedStock: StockData | null = null;

  openModal(stock: StockData) {
    this.selectedStock = stock;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedStock = null;
  }
}
