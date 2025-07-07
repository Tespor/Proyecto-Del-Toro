import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-button-log-out',
  standalone: true,
  imports: [],
  templateUrl: './button-log-out.component.html',
  styleUrl: './button-log-out.component.css'
})
export class ButtonLogOutComponent {

  constructor(private authServ: AuthService, private router: Router){}

  logout(): void{
    this.authServ.logout();
    this.router.navigate(['/login']);
  }
}
