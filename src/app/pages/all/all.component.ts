import { Component, EventEmitter, Output } from '@angular/core';
import { SideMenuComponent } from "../../widgets/side.menu/side.menu.component";
import { ButtonLogOutComponent } from "../../widgets/button-log-out/button-log-out.component";
import { InputSearchComponent } from "../../widgets/input-search/input-search.component";
import { TablaComponent } from "../../widgets/tabla/tabla.component";
import { StateService } from '../../shared/state.service';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [SideMenuComponent, ButtonLogOutComponent, InputSearchComponent, TablaComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css'
})
export class AllComponent {
  selectedTable = '';
  showRow = false;

  constructor(private state: StateService) {}

  onToggle() {
    this.showRow = !this.showRow;
  }

  ngOnInit(): void {
    this.state.selectedOption$.subscribe(value => {
      this.selectedTable = value;
      console.log('Recibido en Home:', value);
    });
  }
}
