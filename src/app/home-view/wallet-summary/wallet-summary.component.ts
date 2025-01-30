import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-wallet-summary',
  imports: [],
  templateUrl: './wallet-summary.component.html',
  styleUrl: './wallet-summary.component.css',
})
export class WalletSummaryComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  @ViewChild('walletChart') chartRef!: ElementRef;
  chart!: Chart;

  userName: string | undefined = this.userService.user()?.name;
  walletBalance: number = Math.floor(Math.random() * (20000 - 2000 + 1)) + 2000;
  benefits: number = Math.floor(Math.random() * (10000 - 10 + 1)) + 2000;
  losses: number = Math.floor(Math.random() * (10000 - 10 + 1)) + 2000;

  ngOnInit(): void {
    if (!this.userService.user()) this.router.navigate(['']);
  }

  viewMoreInfo(stock: any) {
    alert(`Viewing more information about ${stock.meta.symbol}`);
  }
  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Wallet Balance Over Time',
            data: [8000, 8500, 8700, 9200, 9700, this.walletBalance],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
