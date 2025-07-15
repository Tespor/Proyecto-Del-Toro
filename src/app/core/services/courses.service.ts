import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface Courses {
  id: number,
  course: string,
  teacher: string,
  id_teacher: number
}

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000/cursos/";
  private url2 = "http://localhost:3000/alumCurso/";

  public getList() : Observable<Courses[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map( data => 
        data.map(item => ({
          id: item.id,
          course: item.nombre_curso,
          teacher: item.nombre_profesor,
          id_teacher: item.profesor_id,
        }))
      )
    );
  }

  public getNoStudentsCourse(id_course: string) : Observable<Courses[]> {
    return this.http.get<any[]>(`${this.url}alumnos-no-inscritos/${id_course}`);
  }

  public getListStudentsCourses(idCourse: string) : Observable<Courses[]>{
      return this.http.get<any[]>(`${this.url}ver/${idCourse}/alumnos`);
  }

  public getSearch() : Observable<Courses[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map( data => 
        data.map(item => ({
          id: item.id,
          course: item.nombre_curso,
          teacher: item.nombre_profesor,
          id_teacher: item.profesor_id,
        }))
      )
    );
  }
  
  public delete(id: String): Observable<any> {
    return this.http.delete(`${this.url}eliminar/${id}`);
  }

  public update(id: string, data: Courses): Observable<any> {
    return this.http.put(`${this.url}editar/${id}`, data);
  }



  public add(data: Courses): Observable<any> {
    const cleanData = {
          nombre_curso: data.course,
          profesor_id: data.id_teacher
    }
    return this.http.post(`${this.url}ingresar`, cleanData);
  }
  //alumCurso
  public addStudentintoCourse(data: any): Observable<any>{
    return this.http.post(`${this.url2}ingresar`, data);
  }
  public deleteStudentintoCourse(id: String): Observable<any> {
    return this.http.delete(`${this.url2}eliminar/${id}`);
  }

}
