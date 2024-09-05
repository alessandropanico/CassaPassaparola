import { Component, OnInit } from '@angular/core';

interface Articolo {
  nome: string;
  tipologia: string;
  prezzo: number; // Aggiunta della proprietà 'prezzo'
}

interface Categoria {
  nome: string;
  articoli: Articolo[];
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
  articoliFiltrati: { [key: string]: Articolo[] } = {};
  tipologie: string[] = [];
  tipologiaSelezionata: string | null = null; // Variabile per tracciare la tipologia selezionata

  ngOnInit(): void {
    this.setCurrentDate();
    this.setCurrentTime();
    const categoriaPredefinita = this.categorie.find(
      (cat) => cat.nome === 'Espositori'
    );
    if (categoriaPredefinita) {
      this.selezionaCategoria(categoriaPredefinita);
    }
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
      this.articoliFiltrati[articolo.tipologia].push(articolo);
    });

    // Estrai le tipologie
    this.tipologie = Object.keys(this.articoliFiltrati);

    // Imposta tipologia selezionata su null per visualizzare tutto all'inizio
    this.tipologiaSelezionata = null;
  }

  selezionaTipologia(tipologia: string | null): void {
    // Aggiorna la variabile tipologiaSelezionata con la tipologia cliccata
    this.tipologiaSelezionata = tipologia;
  }

  resetInput(): void {
    const inputElement = document.getElementById('inputCodice') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  categorie: Categoria[] = [
    {
      nome: 'Espositori',
      articoli: [
        { nome: 'Lavandino in Ferro', tipologia: 'Aer4mi', prezzo: 150 },
        { nome: 'Lavandino in Ferro', tipologia: 'Arrr4mi', prezzo: 200 },
        { nome: 'Lavandino in Ferro', tipologia: 'Arvg4mi', prezzo: 180 },
        { nome: 'Lavandino inss Ferro', tipologia: 'Arvg4mi', prezzo: 220 },
        { nome: 'Lavandidno in Ferro', tipologia: 'Arvg4mi', prezzo: 160 },
        { nome: 'Lavandddino in Ferro', tipologia: 'Arvg4mi', prezzo: 140 },
        { nome: 'Lavandino in Ferro', tipologia: 'Arrr4mi', prezzo: 240 },
        { nome: 'Lavandino in Ferro', tipologia: 'Arg4mi', prezzo: 170 },
        { nome: 'Lavandino in Ferro', tipologia: 'Ar4mi', prezzo: 180 },
        { nome: 'Lavandino in Ferro', tipologia: 'Ar5mi', prezzo: 190 },
        { nome: 'Lavandino in Ferro', tipologia: 'A3rmi', prezzo: 130 },
        { nome: 'Lavandino in Ferro', tipologia: 'Aremi', prezzo: 210 },
        { nome: 'Lavandino in Ferro', tipologia: 'A324rmi', prezzo: 160 },
        { nome: 'Lavandino in Ferro', tipologia: 'Artmi', prezzo: 150 },
        { nome: 'Lavandino in Ferro', tipologia: 'Arggmi', prezzo: 220 },
        { nome: 'Lavandino in Ferro', tipologia: 'Arefmi', prezzo: 140 },
        { nome: 'Lavandino in Ferro', tipologia: 'Armvti', prezzo: 180 },
        { nome: 'Lavandino in Ferro', tipologia: 'Awwrmi', prezzo: 230 },
        { nome: 'Lavandino in Ferro', tipologia: 'Ar6mi', prezzo: 170 },
        { nome: 'Lavandino in Ferro', tipologia: 'Ar55mi', prezzo: 210 },
        { nome: 'Poppice', tipologia: 'Lavandini', prezzo: 100 },
        { nome: 'Specchio mimmo', tipologia: 'Specchi', prezzo: 80 },
      ],
    },
    {
      nome: 'Mobili',
      articoli: [
        { nome: 'Sedia in legno', tipologia: 'Sedie', prezzo: 50 },
        { nome: 'Tavolo in vetro', tipologia: 'Tavoli', prezzo: 300 },
        { nome: 'Armadio in noce', tipologia: 'Armadi', prezzo: 450 },
        { nome: 'Divano in pelle', tipologia: 'Divani', prezzo: 700 },
        { nome: 'Comodino moderno', tipologia: 'Comodini', prezzo: 120 },
        { nome: 'Letto matrimoniale', tipologia: 'Letti', prezzo: 500 },
        { nome: 'Scrivania in quercia', tipologia: 'Scrivanie', prezzo: 250 },
      ],
    },
    {
      nome: 'Illuminazione',
      articoli: [
        { nome: 'Lampadario a sospensione', tipologia: 'Lampadari', prezzo: 150 },
        { nome: 'Lampada da tavolo', tipologia: 'Lampade', prezzo: 80 },
        { nome: 'Applique da parete', tipologia: 'Appliques', prezzo: 90 },
        { nome: 'Faretto LED', tipologia: 'Faretti', prezzo: 60 },
        { nome: 'Lampada da terra', tipologia: 'Lampade', prezzo: 130 },
      ],
    },
    {
      nome: 'Decorazioni',
      articoli: [
        { nome: 'Quadro moderno', tipologia: 'Quadri', prezzo: 200 },
        { nome: 'Vaso in ceramica', tipologia: 'Vasi', prezzo: 40 },
        { nome: 'Tappeto persiano', tipologia: 'Tappeti', prezzo: 300 },
        { nome: 'Specchio antico', tipologia: 'Specchi', prezzo: 250 },
        { nome: 'Cuscino decorativo', tipologia: 'Cuscini', prezzo: 30 },
      ],
    },
    {
      nome: 'Elettrodomestici',
      articoli: [
        { nome: 'Frigorifero', tipologia: 'Frigoriferi', prezzo: 900 },
        { nome: 'Lavatrice', tipologia: 'Lavatrici', prezzo: 400 },
        { nome: 'Forno a microonde', tipologia: 'Microonde', prezzo: 150 },
        { nome: 'Aspirapolvere', tipologia: 'Aspirapolveri', prezzo: 200 },
        { nome: 'Condizionatore', tipologia: 'Climatizzatori', prezzo: 600 },
      ],
    },
    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },


    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },


    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },


    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },



    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },



    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },



    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },



    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },




    {
      nome: 'Accessori da cucina',
      articoli: [
        { nome: 'Pentola in acciaio', tipologia: 'Pentole', prezzo: 80 },
        { nome: 'Set di coltelli', tipologia: 'Coltelli', prezzo: 120 },
        { nome: 'Tagliere in legno', tipologia: 'Taglieri', prezzo: 30 },
        { nome: 'Bollitore elettrico', tipologia: 'Elettrodomestici', prezzo: 50 },
        { nome: 'Tostapane', tipologia: 'Elettrodomestici', prezzo: 40 },
      ],
    },


  ];
}
