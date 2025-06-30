import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  datosDelFormulario: any;

  constructor(private authServ: AuthService, private router: Router) { }

  logout(): void{
    this.authServ.logout();
    this.router.navigate(['/login'])
  }

  
  hrefTabla(){
    this.router.navigate(['/tabla'], {
      state: { datos: this.datosDelFormulario }
    });
  }

  hrefProducto(){
    this.router.navigate(['/product'], {
      state: { datos: this.datosDelFormulario }
    });
  }

}
