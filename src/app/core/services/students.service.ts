import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, pipe, map } from 'rxjs';

/*Interfaz to students data*/
export interface Students {
  id: number;
  name: string;
  lastname: string;
  slastname: string;
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

  public getList() : Observable<Students[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map(data =>
        data.map(item => ({
          id: item.matricula,
          name: item.nombre,
          lastname: item.apellidoP,
          slastname: item.apellidoM,
          email: item.correo_electronico,
          phone: item.telefono
        }))
      )
    ) as Observable<Students[]>;
  }

  public getSearch(palabra: string) : Observable<Students[]> {
    return this.http.get<any[]>(`${this.url}buscar/${palabra}`).pipe(
      map(data =>
        data.map(item => ({
          id: item.matricula,
          name: item.nombre,
          lastname: item.apellidoP,
          slastname: item.apellidoM,
          email: item.correo_electronico,
          phone: item.telefono
        }))
      )
    ) as Observable<Students[]>;
  }
  
  public add(data: Students) : Observable<any> {
    const dataClean = this.convertData(data);
    return this.http.post(`${this.url}ingresar`, dataClean);
  }
  
  public update(id: string, data: Students): Observable<any> {
    return this.http.put(`${this.url}editar/${id}`, data);
  }
  
  public delete(id: String): Observable<any> {
    return this.http.delete(`${this.url}eliminar/${id}`);
  }


  private convertData(data: Students){
    return {
      nombre: data.name,
      apellidoP: data.lastname,
      apellidoM: data.slastname,
      correo_electronico: data.email,
      telefono: data.phone    
    }
  }

}
