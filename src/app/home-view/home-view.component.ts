import { Component } from '@angular/core';
import { WalletSummaryComponent } from './wallet-summary/wallet-summary.component';
import { StocksComponent } from './stocks/stocks.component';
import { CurrencyPipe, DecimalPipe, NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
  imports: [
    WalletSummaryComponent,
    StocksComponent,
    NgIf,
    CurrencyPipe,
    HeaderComponent,
  ],
})
export class HomeViewComponent {
  selectedStock: any = null; // Store selected stock
  isModalOpen: boolean = false; // Track modal visibility
  priceChange = this.generateRandomChange(); // Store a random value

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  openModal(stock: any) {
    this.selectedStock = stock;
    this.isModalOpen = true;
    this.priceChange = this.generateRandomChange(); // Generate new change
  }

  closeModal() {
    this.isModalOpen = false;
  }
  generateRandomChange() {
    const change = (Math.random() * 5 - 2.5).toFixed(2); // Generates a number between -2.5 and +2.5
    const percentage = ((parseFloat(change) / 100) * 10).toFixed(2); // Convert to percentage
    return { value: parseFloat(change), percentage: parseFloat(percentage) }; // Convert strings to numbers
  }
}
