import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface Courses {
  id: number,
  course: string,//nombre_curso
  teacher: string,//profesor_id
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
          teacher: item.profesor_id,
        }))
      )
    );
  }
  //Aqui van las demas apis
  public delete(id: String): Observable<any> {
     return this.http.delete(`${this.url}eliminar/${id}`);
  }
}
