import { Component, OnInit } from '@angular/core';


interface Articolo {
  nome: string;
  tipologia: string;
  prezzo: number;
}

interface Categoria {
  nome: string;
  articoli: Articolo[];
}
interface ProdottoSelezionato {
  articolo: Articolo;
  quantita: number;
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
  tipologiaSelezionata: string | null = null;

  espressione: string = '';
  risultato: number = 0;
  iva: number = 22; // IVA al 22%
  sconto: number = 0;
  importoPagamento: number = 0;
  resto: number = 0;

  numero: number = 1;


  quantita: number = 1; // Quantità predefinita
  articoloSelezionato: Articolo | null = null;

  prodottiSelezionati: ProdottoSelezionato[] = [];


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
    this.currentDate = now.toISOString().split('T')[0];
  }

  setCurrentTime(): void {
    const now = new Date();
    this.currentTime = now.toTimeString().split(':').slice(0, 2).join(':');
  }

  // Funzione per selezionare una categoria
  selezionaCategoria(categoria: Categoria): void {
    this.categoriaSelezionata = categoria;
    this.tipologie = Array.from(
      new Set(categoria.articoli.map((articolo) => articolo.tipologia))
    );
    this.articoliFiltrati = this.tipologie.reduce((acc, tipologia) => {
      acc[tipologia] = categoria.articoli.filter(
        (articolo) => articolo.tipologia === tipologia
      );
      return acc;
    }, {} as { [key: string]: Articolo[] });
    this.tipologiaSelezionata = null;
  }

  // Funzione per selezionare una tipologia
  selezionaTipologia(tipologia: string): void {
    this.tipologiaSelezionata = tipologia;
  }

  // Funzione per selezionare un articolo
  selezionaArticolo(articolo: Articolo): void {
    this.articoloSelezionato = articolo;
    const prodottoEsistente = this.prodottiSelezionati.find(p => p.articolo.nome === articolo.nome);
    if (prodottoEsistente) {
      prodottoEsistente.quantita += this.quantita;
    } else {
      this.prodottiSelezionati.push({ articolo, quantita: this.quantita });
    }
    // Mostra il totale dei prodotti selezionati nel display
    this.espressione = this.calcolaTotaleProdotti().toString();
  }


  calcolaTotaleProdotti(): number {
    return this.prodottiSelezionati.reduce((totale, prodotto) => totale + (prodotto.articolo.prezzo * prodotto.quantita), 0);
  }


  // Aggiunge il prezzo dell'articolo selezionato al display della calcolatrice
  aggiungiPrezzoAllaCalcolatrice(prezzo: number): void {
    this.espressione += prezzo.toString();  // Aggiunge il prezzo all'espressione
  }

  resetInput(): void {
    const inputElement = document.getElementById('inputCodice') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  aggiungiNumero(numero: string): void {
    if (this.espressione === '0') {
      this.espressione = numero;
    } else {
      this.espressione += numero;
    }
  }

  aggiungiOperazione(operazione: string): void {
    if (this.espressione) {
      this.espressione += ` ${operazione} `;
    }
  }

  calcola(): void {
    try {
      this.risultato = this.calcolaEspressione(this.espressione);
      this.espressione = this.risultato.toString();
    } catch (error) {
      console.error('Errore nel calcolo:', error);
      this.risultato = 0;
      this.espressione = '';
    }
  }


  reset(): void {
    this.espressione = '';
    this.risultato = 0;
    this.prodottiSelezionati = [];
  }


  aggiungiIva(): void {
    this.risultato += (this.risultato * this.iva) / 100;
    this.espressione = this.risultato.toString();
  }

  rimuoviIva(): void {
    this.risultato /= (1 + this.iva / 100);
    this.espressione = this.risultato.toString();
  }

  applicaSconto(): void {
    this.risultato -= (this.risultato * this.sconto) / 100;
    this.espressione = this.risultato.toString();
  }

  totale(): void {
    this.espressione = this.risultato.toString();
  }

  calcolaResto(): void {
    this.resto = this.importoPagamento - this.risultato;
  }

  calcolaTotale(): number {
    return this.articoloSelezionato ? (this.articoloSelezionato.prezzo * this.quantita) : 0;
  }

  calcolaEspressione(espressione: string): number {
    try {
      // Rimuovi spazi all'inizio e alla fine dell'espressione
      espressione = espressione.trim();

      // Converte l'espressione in un array di parti, separando per gli spazi
      const parti = espressione.split(' ').filter(p => p !== '');

      if (parti.length < 3) {
        throw new Error('Espressione non valida');
      }

      // Inizializza il risultato con il primo valore
      let risultato: number = parseFloat(parti[0]);

      // Itera attraverso le parti dell'espressione
      for (let i = 1; i < parti.length; i += 2) {
        const operatore = parti[i];
        const valore = parseFloat(parti[i + 1]);

        if (isNaN(valore)) {
          throw new Error('Valore non valido');
        }

        switch (operatore) {
          case '+':
            risultato += valore;
            break;
          case '-':
            risultato -= valore;
            break;
          case '*':
            risultato *= valore;
            break;
          case '/':
            if (valore === 0) {
              throw new Error('Divisione per zero');
            }
            risultato /= valore;
            break;
          default:
            throw new Error('Operatore non valido');
        }
      }

      return risultato;
    } catch (error) {
      console.error('Errore nel calcolo dell\'espressione:', error);
      return 0;
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
  ];
}
