import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  datosDelFormulario: any;
  
  constructor(private router: Router) {}
  
  hrefTabla(){
    this.router.navigate(['/tabla'], {
      state: { datos: this.datosDelFormulario }
    });
  }

  hrefProducto(){
    this.router.navigate(['/'], {
      state: { datos: this.datosDelFormulario }
    });
  }
}
