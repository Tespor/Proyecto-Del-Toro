import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

/*Interfaz to students data*/
export interface Teachers {
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
export class TeachersService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/profesores/';

  public getList(): Observable<Teachers[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map(data =>
        data.map(item => ({
          id: item.id,
          name: item.nombre,
          lastname: item.apellidoP,
          slastname: item.apellidoM,
          email: item.correo_electronico,
          phone: item.telefono
        })))
    ) as Observable<Teachers[]>;
  }

  public getSearch(): Observable<Teachers[]> {
    return this.http.get<any[]>(`${this.url}ver`).pipe(
      map(data =>
        data.map(item => ({
          id: item.id,
          name: item.nombre,
          lastname: item.apellidoP,
          slastname: item.apellidoM,
          email: item.correo_electronico,
          phone: item.telefono
        })))
    ) as Observable<Teachers[]>;
  }

  public delete(id: String): Observable<any> {
    return this.http.delete(`${this.url}eliminar/${id}`);
  }

  public add(data: Teachers): Observable<any> {
    const dataClean = this.convertData(data);
    return this.http.post(`${this.url}ingresar`, dataClean);
  }

 public update(id: string, data: Teachers): Observable<any> {
  return this.http.put(`${this.url}editar/${id}`, data);
}


  private convertData(data: Teachers) {
    return {
      nombre: data.name,
      apellidoP: data.lastname,
      apellidoM: data.slastname,
      correo_electronico: data.email,
      telefono: data.phone
    }
  }

}
