import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { StateService } from '../../shared/state.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side.menu.component.html',
  styleUrl: './side.menu.component.css'
})
export class SideMenuComponent {

  constructor(private authServ: AuthService, private router: Router, private state: StateService) { }

  //   hrefTabla(){
  //   this.router.navigate(['/tabla'], {
  //     state: { datos: this.datosDelFormulario }
  //   });
  // }

  hrefHome(){
    this.router.navigate(['/home'], {
      state: {}
    });
  }
  hrefStudets(){
    this.router.navigate(['/students'], {
      state: {}
    });
  }
  hrefTeachers(){
    this.router.navigate(['/teachers'], {
      state: {}
    });
  }hrefCours(){
    this.router.navigate(['/courses'], {
      state: {}
    });
  }

  selectOption(option: string) {
    this.state.setSelectedOption(option);
  }
}
