import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import StudentsService from '../../core/services/students.service';
import { CommonModule } from '@angular/common';
import { TeachersService } from '../../core/services/teachers.service';
import { CoursesService } from '../../core/services/courses.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
  @Input() tableType: string = '';
  @Input() showRow = false;

  addData: any = {};
  data: object[] = [];
  dataTeachers: object[] = [];
  headers: string[] = [];

  editIndex: number | null = null;
  editData: any = {};

  constructor(
    private studentServ: StudentsService, 
    private teacherServ: TeachersService, 
    private coursesServ: CoursesService
  ) { }

  getValues(obj: any): any[] {
    return Object.values(obj);
  }

  ngOnChanges() {
    switch (this.tableType){
      case 'Students': this.getDataTable(this.studentServ);
        break;
      case 'Teachers': this.getDataTable(this.teacherServ);
        break;
      case 'Courses': 
        this.getDataTable(this.coursesServ);
        this.getProfesores();
        break;
    }
  }

  getDataTable(Servicios: any) {
    Servicios.getList().subscribe({
      next: (data: any) => {
        this.data = data;
        this.headers = Object.keys(data[0]);
        this.headers = this.headers.filter(h => h !== 'id_teacher');
      },
      error: (error: any) => {
        console.error('Error al obtener datos:', error);
      }
    });
  }

  setDelete(id: String){
    switch (this.tableType){
      case 'Students': this.deleteData(id, this.studentServ);
        break;
      case 'Teachers': this.deleteData(id, this.teacherServ);
        break;
      case 'Courses': this.deleteData(id, this.coursesServ);
        break;
    }
  }

  deleteData(id: String, service: any) {
    if (confirm(`Estas Seguro de Eliminar Este Dato: ${id}?`)) {
      service.delete(id).subscribe(() => {
        this.getDataTable(service);
      });
    }
  }

  setAdd(data: any){
    switch (this.tableType){
      case 'Students': this.addDataa(data, this.studentServ);
        break;
      case 'Teachers': this.addDataa(data, this.teacherServ);
        break;
      case 'Courses': this.addDataa(data, this.coursesServ);
        break;
    }
  }

  addDataa(data: any, service: any) {
    console.log(data);
    if (confirm(`Estas a punto de agregar: ${data.name || data.course}, deseas continuar?`)) {
      service.add(data).subscribe(() => {
        this.getDataTable(service);
        this.showRow = false;
      });
    }
  }

  editRow(index: number, info: any) {
    this.editIndex = index;
    this.editData = { ...info };
  }

  cancelEdit() {
    this.editIndex = null;
    this.editData = {};
  }

  saveEdit(index: number) {
    const originalData = this.data[index]; // <-- guardamos la fila original
    const id = this.getValues(originalData)[0];
    let service: any;

    switch (this.tableType) {
      case 'Students': service = this.studentServ; break;
      case 'Teachers': service = this.teacherServ; break;
      case 'Courses':
        service = this.coursesServ;
        // Mantengo editData intacto para no perder otras propiedades
        break;
    }

    if (!service) {
      console.error('Servicio no definido para tableType:', this.tableType);
      return;
    }

    if (confirm('¿Deseas guardar los cambios realizados?')) {
      if (this.tableType === 'Courses') {
        // Enviar solo lo que espera backend
        const dataToSend = {
          nombre_curso: this.editData.course || this.editData.nombre_curso,
          profesor_id: this.editData.id_teacher || this.editData.profesor_id
        };
        service.update(id, dataToSend).subscribe(() => {
          // Actualizo la data con las propiedades que espera la UI
          this.data[index] = {
            ...originalData,
            course: dataToSend.nombre_curso,
            id_teacher: dataToSend.profesor_id
          };
          this.cancelEdit();
        });
      } else {
        service.update(id, this.editData).subscribe(() => {
          this.data[index] = { ...this.editData };
          this.cancelEdit();
        });
      }
    }
  }

  getProfesores() {
    this.teacherServ.getList().subscribe({
      next: (data: any) => {
        this.dataTeachers = data;
      },
      error: (error: any) => {
        console.error('Error al obtener Profesores:', error);
      }
    });
  }
}
