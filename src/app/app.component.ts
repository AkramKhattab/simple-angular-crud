import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <h1>User Management System</h1>
      <app-user></app-user>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'angular-crud';
} 