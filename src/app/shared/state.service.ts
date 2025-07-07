import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly storageKey = 'selectedOption';

  // Inicializa con el valor guardado o vacío
  private selectedOptionSubject = new BehaviorSubject<string>(
    localStorage.getItem(this.storageKey) || ''
  );

  selectedOption$ = this.selectedOptionSubject.asObservable();

  setSelectedOption(value: string) {
    this.selectedOptionSubject.next(value);
    localStorage.setItem(this.storageKey, value); // se guarda en localStorage
  }

  getSelectedOption(): string {
    return this.selectedOptionSubject.value;
  }
}
