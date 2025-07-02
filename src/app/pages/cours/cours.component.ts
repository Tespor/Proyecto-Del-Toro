import { Component } from '@angular/core';
import { SideMenuComponent } from '../../widgets/side.menu/side.menu.component';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { TablaComponent } from '../../widgets/tabla/tabla.component';
import { ButtonLogOutComponent } from "../../widgets/button-log-out/button-log-out.component";
import { InputSearchComponent } from "../../widgets/input-search/input-search.component";

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [SideMenuComponent, TablaComponent, ButtonLogOutComponent, InputSearchComponent],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {
}
