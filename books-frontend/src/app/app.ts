import { Component, ChangeDetectorRef} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './Login/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink
  ]
})
export class App {
  isDarkMode = true;

  constructor(private auth: AuthService, private cd: ChangeDetectorRef) {
    this.setBodyClass();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get username() {
    return this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
    this.cd.detectChanges();
  }

    toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.setBodyClass();
  }

  private setBodyClass() {
    if (this.isDarkMode) {
      document.body.classList.add('bg-dark', 'text-white');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-white');
    }
  }
}
