import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ItemModel} from '../models/item.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemsService {
  private apiUrl = '//localhost:3000/items';
  constructor(private http: Http) { }

  public get(id: number): Observable<ItemModel[]> {
    return this.http
      .get(`${this.apiUrl}?list_id=${id}`)
      .map((response) => response.json());
  }

  public create(data: ItemModel): Observable<ItemModel> {
    return this.http
      .post(this.apiUrl, data)
      .map((response) => response.json());
  }

  public update(data: ItemModel): Observable<ItemModel> {
    return this.http
      .put(`${this.apiUrl}/${data.id}`, data)
      .map((response) => response.json());
  }

  public remove(id: number): Observable<ItemsService> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .map((response) => response.json());
  }
}
