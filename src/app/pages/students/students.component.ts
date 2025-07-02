import { Component } from '@angular/core';
import { SideMenuComponent } from '../../widgets/side.menu/side.menu.component';
import { TablaComponent } from '../../widgets/tabla/tabla.component';
import { ButtonLogOutComponent } from "../../widgets/button-log-out/button-log-out.component";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [SideMenuComponent, TablaComponent, ButtonLogOutComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

}
