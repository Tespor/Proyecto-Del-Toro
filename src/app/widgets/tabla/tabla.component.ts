import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import StudentsService, { Students } from '../../core/services/students.service';
import { CommonModule } from '@angular/common';
import { TeachersService } from '../../core/services/teachers.service';
import { CoursesService } from '../../core/services/courses.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
  @Input() tableType: string = '';
  @Input() addData: boolean = true;
  data: object[] = [];
  headers: string[] = [];
  idDelete: String = '';

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
      case 'Courses': this.getDataTable(this.coursesServ);
        break;
    }
  }

  getDataTable(Servicios: any) {
    Servicios.getList().subscribe({
      next: (data: any) => {
        this.data = data;
        this.headers = Object.keys(data[0]);
      },
      error: (error: any) => {
        console.error('Error al obtener alumnos:', error);
      }
    })
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
}
