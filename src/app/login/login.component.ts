import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { FormArray, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateService } from '../shared/state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit{
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router, private state: StateService) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.seveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }

  ngOnInit(){
    //localStorage.removeItem('');
    this.state.deleteSelectedOtion();
  }
}
