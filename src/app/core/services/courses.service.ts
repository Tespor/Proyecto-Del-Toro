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

  public update(id: string, datos: Courses): Observable<any> {
    return this.http.put(`${this.url}editar/${id}`, datos);
  }

  public add(data: Courses): Observable<any> {
    const cleanData = {
          nombre_curso: data.course,
          profesor_id: data.id_teacher
    }
    return this.http.post(`${this.url}ingresar`, cleanData);
  }
}
