import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../../shared/state.service';

@Component({
  selector: 'app-button-log-out',
  standalone: true,
  imports: [],
  templateUrl: './button-log-out.component.html',
  styleUrl: './button-log-out.component.css'
})
export class ButtonLogOutComponent {

  constructor(private authServ: AuthService, private router: Router, private stateServ: StateService){}


  logout(): void{
    this.authServ.logout();
    this.router.navigate(['/login']);
  }
}
