import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla.product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.product.component.html',
  styleUrl: './tabla.product.component.css'
})
export default class TablaProductComponent {
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
    this.router.navigate(['/home'], {
      state: { datos: this.datosDelFormulario }
    });
  }

}
