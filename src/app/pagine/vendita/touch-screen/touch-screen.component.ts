import { Component, OnInit } from '@angular/core';

interface Categoria {
  nome: string;
  articoli: { nome: string; tipologia: string }[];
}

@Component({
  selector: 'app-touch-screen',
  templateUrl: './touch-screen.component.html',
  styleUrls: ['./touch-screen.component.css'],
})
export class TouchScreenComponent implements OnInit {
  
  currentTime: string = '';
  currentDate: string = '';
  categoriaSelezionata: Categoria | null = null;
  articoliFiltrati: { [key: string]: string[] } = {};
  tipologie: string[] = [];

  ngOnInit(): void {
    this.setCurrentDate();
    this.setCurrentTime();
  }

  setCurrentDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }

  setCurrentTime(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  selezionaCategoria(categoria: Categoria): void {
    this.categoriaSelezionata = categoria;
    this.articoliFiltrati = {};

    // Raggruppa gli articoli per tipologia
    categoria.articoli.forEach((articolo) => {
      if (!this.articoliFiltrati[articolo.tipologia]) {
        this.articoliFiltrati[articolo.tipologia] = [];
      }
      this.articoliFiltrati[articolo.tipologia].push(articolo.nome);
    });

    // Estrai le tipologie
    this.tipologie = Object.keys(this.articoliFiltrati);
  }

  resetInput(): void {
    const inputElement = document.getElementById('inputCodice') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = ''; // Reset the value of the input
    }
  }
  categorie: Categoria[] = [

    {
      nome: 'Espositori',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Armi' },
        { nome: 'Poppice', tipologia: 'Lavandini' },
        { nome: 'Specchio mimmo', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'Ginnanzio',
      articoli: [
        { nome: 'Lavandino in Ferro2', tipologia: 'Giochi' },
        { nome: 'La nasita di Alberto', tipologia: 'Giochi' },
        { nome: 'Specchio Grande', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'Mollotras',
      articoli: [
        { nome: 'Lavanda in Ferro', tipologia: 'Lavanda' },
        { nome: 'Lavanda di Nero', tipologia: 'Lavanda' },
        { nome: 'Specchio Grande bho', tipologia: 'Specchi' },
      ],
    },
    {
      nome: ' Ismael',
      articoli: [
        { nome: 'Ferro', tipologia: 'Nomi' },
        { nome: 'Nero', tipologia: 'Nomi' },
        { nome: 'Specchietto per le allodole', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'Shalashaska',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Lavandini' },
        { nome: 'Lavandino Nero', tipologia: 'Lavandini' },
        { nome: 'Specchio Grande', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'The fear',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Lavandini' },
        { nome: 'Lavandino Nero', tipologia: 'Lavandini' },
        { nome: 'Specchio Grande', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'The pain',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Lavandini' },
        { nome: 'Lavandino Nero', tipologia: 'Lavandini' },
        { nome: 'Specchio Grande', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'Solid',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Lavandini' },
        { nome: 'Lavandino Nero', tipologia: 'Lavandini' },
        { nome: 'Specchio Grande', tipologia: 'Specchi' },
      ],
    },

    {
      nome: 'Solidus',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Lavandini' },
        { nome: 'Lavandino Nero', tipologia: 'Lavandini' },
        { nome: 'Specchio Grande', tipologia: 'Specchi' },
      ],
    },
    {
      nome: 'Liquid',
      articoli: [
        { nome: 'Tavolo Famiglia', tipologia: 'Tavoli' },
        { nome: 'Tavolo Singolo', tipologia: 'Tavoli' },
        { nome: 'Lavello Acciaio', tipologia: 'Lavandini' },
      ],
    },
    {
      nome: 'Mobili Salotto',
      articoli: [
        { nome: 'Divano Letto', tipologia: 'Divani' },
        { nome: 'Poltrona Relax', tipologia: 'Poltrone' },
      ],
    },
  ];

}
