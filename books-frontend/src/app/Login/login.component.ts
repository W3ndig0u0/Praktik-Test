import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) {}

  login() {
    const data = { username: this.username, password: this.password };
    this.auth.login(data).subscribe({
      next: (res: any) => {
        this.message = 'Inloggad som ' + this.username;
        this.cd.detectChanges();
        this.router.navigate(['/']);
      },
      error: () => {
        this.message = 'Felaktigt användarnamn eller lösenord';
      },
    });
  }
}
