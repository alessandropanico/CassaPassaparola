import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  private jsonUrl = 'assets/prodotti.json';

  constructor(private http: HttpClient) { }

  getProdotti(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
