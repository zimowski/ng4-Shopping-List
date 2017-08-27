import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ListModel} from '../models/list.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {
  private apiUrl = '//localhost:3000/list';
  constructor(private http: Http) { }

  public getAll(): Observable<ListModel[]> {
    return this.http
      .get(`${this.apiUrl}?_sort=date&_order=desc`)
      .map((response) => response.json());
  }

  public getActive(): Observable<ListModel[]> {
    return this.http
      .get(`${this.apiUrl}?is_active=false&_sort=date&_order=desc`)
      .map((response) => response.json());
  }

  public get(id: number): Observable<ListModel> {
    return this.http
      .get(`${this.apiUrl}/${id}`)
      .map((response) => response.json());
  }

  public create(data: ListModel): Observable<ListModel> {
    return this.http
      .post(this.apiUrl, data)
      .map((response) => response.json());
  }

  public update(id: number, data: ListModel): Observable<ListModel> {
    return this.http
      .put(`${this.apiUrl}/${id}`, data)
      .map((response) => response.json());
  }

  public remove(id: number): Observable<ListService> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .map((response) => response.json());
  }
}
