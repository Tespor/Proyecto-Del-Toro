import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from '../students/students.component';
import { CoursComponent } from '../cours/cours.component';
import { TeachersComponent } from '../teachers/teachers.component';
import { SideMenuComponent } from '../../widgets/side.menu/side.menu.component';
import { ButtonLogOutComponent } from "../../widgets/button-log-out/button-log-out.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SideMenuComponent, ButtonLogOutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  estado:boolean = true;
  datosDelFormulario: any;

  constructor(private authServ: AuthService, private router: Router) { }

  
}
