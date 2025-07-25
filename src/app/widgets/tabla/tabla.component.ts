

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TeachersService } from '../../core/services/teachers.service';
import { StudentsService } from '../../core/services/students.service';
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
  courseSelected: string = '';
  courseSelectedId: string = '';

  selectedMatriculas: string[] = [];

  addData: any = {};
  data: object[] = [];
  dataTeachers: object[] = [];
  dataStudentsPerCourse: any[] = [];
  dataStudentsNoCourse: any[] = [];
  headers: string[] = [];
  @Output() CursoSeleccionado = new EventEmitter<any>();

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
    switch (this.tableType) {
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

  setDelete(id: String) {
    switch (this.tableType) {
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

  setAdd(data: any) {
    switch (this.tableType) {
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
    const originalData = this.data[index];
    const id = this.getValues(originalData)[0];
    let service: any;

    switch (this.tableType) {
      case 'Students': service = this.studentServ; break;
      case 'Teachers': service = this.teacherServ; break;
      case 'Courses': service = this.coursesServ; break;
      default:
        console.error('Servicio no definido para tableType:', this.tableType);
        return;
    }

    if (!confirm('¿Deseas guardar los cambios realizados?')) return;

    let dataToSend: any;
    let updatedFrontData: any;

    if (this.tableType === 'Courses') {
      dataToSend = {
        nombre_curso: this.editData.course || this.editData.nombre_curso,
        profesor_id: this.editData.id_teacher || this.editData.profesor_id
      };
      updatedFrontData = {
        ...originalData,
        course: dataToSend.nombre_curso,
        id_teacher: dataToSend.profesor_id
      };
    }
    else if (this.tableType === 'Students') {
      dataToSend = {
        nombre: this.editData.name,
        apellidoP: this.editData.lastname,
        apellidoM: this.editData.slastname,
        correo_electronico: this.editData.email,
        telefono: this.editData.phone
      };
      updatedFrontData = {
        ...originalData,
        name: dataToSend.nombre,
        lastname: dataToSend.apellidoP,
        slastname: dataToSend.apellidoM,
        email: dataToSend.correo_electronico,
        phone: dataToSend.telefono
      };
    }
    else if (this.tableType === 'Teachers') {
      dataToSend = {
        nombre: this.editData.name,
        apellidoP: this.editData.lastname,
        apellidoM: this.editData.slastname,
        correo_electronico: this.editData.email,
        telefono: this.editData.phone
      };
      updatedFrontData = {
        ...originalData,
        name: dataToSend.nombre,
        lastname: dataToSend.apellidoP,
        slastname: dataToSend.apellidoM,
        email: dataToSend.correo_electronico,
        phone: dataToSend.telefono
      };
    }

    service.update(id, dataToSend).subscribe(() => {
      this.data[index] = updatedFrontData;
      this.cancelEdit();
      this.ngOnChanges();
    });
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

  //Cuando le den clic al curso, muestra todos los alumnos de ese curso
  getStudentCourses(id: string, course: string) {
    this.courseSelected = course;
    this.courseSelectedId = id;
    this.selectedMatriculas = [];

    this.coursesServ.getListStudentsCourses(id).subscribe({
      next: (data: any) => {
        console.log("Esta data es de ver: ", data)
        if (!Array.isArray(data)) {
          this.dataStudentsPerCourse = [];
          return;
        }

        this.dataStudentsPerCourse = data
          .filter((a: any) => a != null)
          .map((a: any) => ({
            id: a.matricula,
            name: a.nombre,
            lastname: a.apellidoP,
            slastname: a.apellidoM,
            idCourseStudent: a.id
          }));
      },
      error: () => {
        // Error silencioso (no mostrar en consola si no quieres)
        this.dataStudentsPerCourse = [];
      }
    });
  }




  //Cuando se vaya a agregar nuevos estudiantes 
  // y quieres ver la lista de los que no estan en ese curso 
  onCheckStudent(event: any, matricula: string) {
    if (event.target.checked) {
      this.selectedMatriculas.push(matricula);
    } else {
      this.selectedMatriculas = this.selectedMatriculas.filter(id => id !== matricula);
    }
  }

  getDataStudentNoCourse(id_course: string) {
    this.coursesServ.getNoStudentsCourse(id_course).subscribe({
      next: (data: any) => {

        this.dataStudentsNoCourse = (data || [])
          .filter((a: any) => a != null)
          .map((a: any) => ({
            id: a.matricula,
            name: a.nombre,
            lastname: a.apellidoP,
            slastname: a.apellidoM,
          }));
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al obtener Estudiantes:', error);
      }
    });
  }


  //For add a new student
  addStudentsToCourse(id_curso: string): void {
    if (this.selectedMatriculas.length === 0) {
      console.warn('No hay alumnos seleccionados');
      return;
    }

    const data = {
      id_curso,
      matriculas: this.selectedMatriculas
    };
    console.log(data);

    this.coursesServ.addStudentintoCourse(data).subscribe({
      next: (res) => {
        console.log('Estudiantes inscritos correctamente:', res);
        this.selectedMatriculas = [];
        this.getDataStudentNoCourse(this.courseSelectedId);
        this.getStudentCourses(this.courseSelectedId, this.courseSelected);
      },
      error: (err) => {
        console.error('Error al inscribir estudiantes:', err);
      }
    });
  }

  setDeleteStudentIntoCourse(id: string) {
    this.coursesServ.deleteStudentintoCourse(id).subscribe({
      next: (res) => {
        console.log('Estudiantes eliminado correctamente:', res);
        this.getDataStudentNoCourse(this.courseSelectedId);
        this.getStudentCourses(this.courseSelectedId, this.courseSelected);
      },
      error: (err) => {
        console.error('Error al eliminar estudiantes:', err);
      }
    });
  }
}
