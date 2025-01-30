import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { WalletSummaryComponent } from './wallet-summary/wallet-summary.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home-view',
  imports: [
    CurrencyPipe,
    NgIf,
    StocksComponent,
    WalletSummaryComponent,
    HeaderComponent,
  ],
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css'],
})
export class HomeViewComponent {
  @ViewChild('stockChart', { static: false })
  stockChartRef!: ElementRef<HTMLCanvasElement>;
  selectedStock: any = null;
  isModalOpen: boolean = false;
  priceChange = this.generateRandomChange();
  chart: Chart | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  openModal(stock: any) {
    this.selectedStock = stock;
    this.isModalOpen = true;
    this.priceChange = this.generateRandomChange();

    setTimeout(() => {
      this.renderStockChart();
    }, 100);
  }

  closeModal() {
    this.isModalOpen = false;
    if (this.chart) {
      this.chart.destroy();
    }
  }

  generateRandomChange() {
    const change = (Math.random() * 5 - 2.5).toFixed(2);
    const percentage = ((parseFloat(change) / 100) * 10).toFixed(2);
    return { value: parseFloat(change), percentage: parseFloat(percentage) };
  }

  renderStockChart() {
    if (!this.selectedStock || !this.stockChartRef) return;

    const ctx = this.stockChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.selectedStock.values
      .slice(0, 10)
      .map((entry: any) => entry.datetime)
      .reverse();

    const prices = this.selectedStock.values
      .slice(0, 10)
      .map((entry: any) => entry.close)
      .reverse();

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: `${this.selectedStock.meta.symbol} Price`,
            data: prices,
            borderColor: 'rgba(0, 123, 255, 1)',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#007bff',
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#ff5722',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
              font: { size: 14, weight: 'bold' },
              color: '#555',
            },
            grid: { color: 'rgba(200, 200, 200, 0.2)' },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Closing Price ($)',
              font: { size: 14, weight: 'bold' },
              color: '#555',
            },
            grid: { color: 'rgba(200, 200, 200, 0.2)' },
            ticks: {
              callback: (value: any) => `$${Number(value).toFixed(2)}`, // ✅ FIXED ERROR
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#333',
              font: { size: 12 },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            borderColor: '#007bff',
            borderWidth: 1,
          },
        },
      },
    });
  }
}
