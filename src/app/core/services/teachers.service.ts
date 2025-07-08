import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

/*Interfaz to students data*/
export interface Teachers {
  matricula: number;
  name: string;
  email: string;
  phone: number;
}


@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/profesores/';

  public getList(): Observable<Teachers[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map(data =>
        data.map(item => ({
          matricula: item.matricula,
          name: `${item.nombre} ${item.apellidoP} ${item.apellidoM}`,
          email: item.correo_electronico,
          phone: item.telefono
        })))
    ) as Observable<Teachers[]>;
  }

  public getSearch(): Observable<Teachers[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map(data =>
        data.map(item => ({
          matricula: item.matricula,
          name: `${item.nombre} ${item.apellidoP} ${item.apellidoM}`,
          email: item.correo_electronico,
          phone: item.telefono
        })))
    ) as Observable<Teachers[]>;
  }

  public delete(id: String): Observable<any> {
    return this.http.delete(`${this.url}eliminar/${id}`);
  }

  public add(datos: Teachers): Observable<any> {
    return this.http.post(`${this.url}ingresar`, datos);
  }

  public update(id: string, datos: Teachers): Observable<any> {
    return this.http.put(`${this.url}editar/${id}`, datos);
  }

}
