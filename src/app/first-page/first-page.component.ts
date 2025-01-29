import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-first-page',
  imports: [HeaderComponent],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css',
})
export class FirstPageComponent {}
