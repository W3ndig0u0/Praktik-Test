import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';

  constructor(private auth: AuthService, private router: Router, private cd: ChangeDetectorRef) {}

  register() {
    const data = { username: this.username, password: this.password };
    this.auth.register(data).subscribe({
      next: (res: any) => {
        this.message = 'Registrering klar och inloggad!';
        this.cd.detectChanges();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Registrering misslyckades';
      },
    });
  }
}
