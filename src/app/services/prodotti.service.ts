import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Articolo {
  nome: string;
  tipologia: string;
  prezzo: number;
}

interface Categoria {
  nome: string;
  articoli: Articolo[];
}

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  private apiUrl = 'assets/prodotti.json'; // Percorso corretto per il file JSON

  constructor(private http: HttpClient) {}

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
