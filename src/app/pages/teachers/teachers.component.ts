import { Component } from '@angular/core';
import { SideMenuComponent } from '../../widgets/side.menu/side.menu.component';
import { TablaComponent } from '../../widgets/tabla/tabla.component';
import { ButtonLogOutComponent } from "../../widgets/button-log-out/button-log-out.component";

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [SideMenuComponent, TablaComponent, ButtonLogOutComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {

}
