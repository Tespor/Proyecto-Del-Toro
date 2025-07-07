import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';

/*Interfaz to students data*/
export interface Students {
  id: number,
  nombre: string,
  apellidoP: string,
  apellidoM: string,
  correo_electronico: string,
  telefono: number,
  password: string,
  permissions: number
}

export interface PublicStudent {
  id: number;
  name: string;
  email: string;
  phone: number;
}

@Injectable({
  providedIn: 'root'
})


/*Services to studetns*/
export default class StudentsService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000/alumnos/";

  public getList() : Observable<PublicStudent[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map(data =>
        data.map(item => ({
          id: item.matricula,
          name: `${item.nombre} ${item.apellidoP} ${item.apellidoM}`,
          email: item.correo_electronico,
          phone: item.telefono
        }))
      )
    ) as Observable<PublicStudent[]>;
  }
  //Aqui van las demas apis

  public getSearch(palabra: string) : Observable<PublicStudent[]> {
    return this.http.get<any[]>(`${this.url}buscar/${palabra}`).pipe(
      map(data =>
        data.map(item => ({
          id: item.matricula,
          name: `${item.nombre} ${item.apellidoP} ${item.apellidoM}`,
          email: item.correo_electronico,
          phone: item.telefono
        }))
      )
    ) as Observable<PublicStudent[]>;
  }

  public addStudent(datos: Students) : Observable<any> {
     return this.http.post(`${this.url}ingresar`, datos);
  }
  
  public updateStudent(datos: Students) : Observable<any>{
    return this.http.put(`${this.url}editar/${datos.id}`, datos)
  }

  
  public deleteStudent(id: String): Observable<any> {
     return this.http.delete(`${this.url}eliminar/${id}`);
  }

}
