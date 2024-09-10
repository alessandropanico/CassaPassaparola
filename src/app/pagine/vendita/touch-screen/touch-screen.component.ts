import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../../services/prodotti.service';

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
  importoPagamento: number | null = null; // Imposta inizialmente a null
  resto: number | null = null; // Imposta inizialmente a null;

  numero: number = 1;
  quantita: number = 1; // Quantità predefinita
  articoloSelezionato: Articolo | null = null;
  prodottiSelezionati: ProdottoSelezionato[] = [];

  categorie: Categoria[] = [];
  messaggioErrore: string | null = null; // Aggiungi questa variabile
  importoPagamentoStr: string = '';
  showingKeyboard: boolean = false;

  showKeyboard(): void {
    this.showingKeyboard = true;
  }

  hideKeyboard(): void {
    this.showingKeyboard = false;
  }

  addCharacter(char: string): void {
    if (char === 'C') {
      this.importoPagamentoStr = '';
    } else {
      this.importoPagamentoStr += char;
    }
  }

  confirmInput(): void {
    this.hideKeyboard();
    // Converti l'importo inserito in numero e assegnalo a importoPagamento
    this.importoPagamento = parseFloat(this.importoPagamentoStr) || null;
  }


  constructor(private prodottiService: ProdottiService) { }

  ngOnInit(): void {
    this.setCurrentDate();
    this.setCurrentTime();
    this.prodottiService.getCategorie().subscribe({
      next: (data) => {
        this.categorie = data;
        const categoriaPredefinita = this.categorie.find(
          (cat) => cat.nome === 'Espositori'
        );
        if (categoriaPredefinita) {
          this.selezionaCategoria(categoriaPredefinita);
        }
      },
      error: (err) => {
        console.error('Errore nel caricamento delle categorie:', err);
      }
    });
  }


  setCurrentDate(): void {
    const now = new Date();
    this.currentDate = now.toISOString().split('T')[0];
  }

  setCurrentTime(): void {
    const now = new Date();
    this.currentTime = now.toTimeString().split(':').slice(0, 2).join(':');
  }

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

  selezionaTipologia(tipologia: string): void {
    this.tipologiaSelezionata = tipologia;
  }

  selezionaArticolo(articolo: Articolo): void {
    this.articoloSelezionato = articolo;
    const prodottoEsistente = this.prodottiSelezionati.find(
      (p) => p.articolo.nome === articolo.nome
    );
    if (prodottoEsistente) {
      prodottoEsistente.quantita += this.quantita;
    } else {
      this.prodottiSelezionati.push({ articolo, quantita: this.quantita });
    }
    console.log('Prodotti Selezionati:', this.prodottiSelezionati);
  }

  calcolaTotaleProdotti(): number {
    return this.prodottiSelezionati.reduce(
      (totale, prodotto) =>
        totale + prodotto.articolo.prezzo * prodotto.quantita,
      0
    );
  }

  resetInput(): void {
    const inputElement = document.getElementById(
      'inputCodice'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }

  rimuoviProdotto(indice: number): void {
    this.prodottiSelezionati.splice(indice, 1);
    this.resto = null;
  }

  aggiungiNumero(numero: string): void {
    if (numero === '.' && this.espressione.includes('.')) {
      return; // Evita di aggiungere più di un punto decimale in un numero
    }

    if (this.espressione === '' && numero === '.') {
      this.espressione = '0.';
    } else if (this.espressione.endsWith(' ') && numero === '.') {
      this.espressione += '0.';
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
    this.risultato=0;
  }

  aggiungiIva(): void {
    this.risultato += (this.risultato * this.iva) / 100;
    this.espressione = this.risultato.toString();
  }

  rimuoviIva(): void {
    this.risultato /= 1 + this.iva / 100;
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
    this.messaggioErrore = null; // Resetta il messaggio di errore

    if (this.importoPagamento !== null && this.importoPagamento >= 0) {
      const totaleProdotti = this.calcolaTotaleProdotti();
      let totale = totaleProdotti;

      // Se esiste un'espressione valida, usa il valore come totale
      if (this.espressione && this.espressione.trim() !== '') {
        const valoreInserito = parseFloat(this.espressione);

        if (isNaN(valoreInserito)) {
          this.messaggioErrore = "L'espressione inserita non è un numero valido.";
          return;
        } else {
          totale = valoreInserito;
        }
      }

      // Calcolo del resto
      if (this.importoPagamento >= totale) {
        this.resto = this.importoPagamento - totale;
      } else {
        this.resto = null;
        this.messaggioErrore = "L'importo di pagamento è insufficiente.";
      }
    } else {
      this.resto = null;
      this.messaggioErrore = "Importo di pagamento non valido.";
    }

    // Resetta l'importo di pagamento dopo il calcolo
    this.importoPagamento = null;
    this.espressione = '';
  }


  calcolaEspressione(espressione: string): number {
    try {
      espressione = espressione.trim();

      if (!espressione) {
        throw new Error('Espressione vuota');
      }

      const parti = espressione.split(' ').filter((p) => p !== '');

      if (parti.length < 3) {
        throw new Error('Espressione non valida, mancano elementi');
      }

      let risultato: number = parseFloat(parti[0]);

      if (isNaN(risultato)) {
        throw new Error('Il primo numero è non valido');
      }

      for (let i = 1; i < parti.length; i += 2) {
        const operatore = parti[i];
        const valore = parseFloat(parti[i + 1]);

        if (isNaN(valore)) {
          throw new Error(`Valore non valido per l'operatore ${operatore}`);
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
            throw new Error(`Operatore non valido: ${operatore}`);
        }
      }

      return risultato;
    } catch (error) {
      console.error("Errore nel calcolo dell'espressione:", error);
      throw error; // Continua a lanciare l'errore affinché possa essere gestito nella chiamata superiore
    }
  }


  selezionaQuantita(quantita: number): void {
    this.quantita = quantita;
  }

  aggiungiProdotto(articolo: Articolo): void {
    this.selezionaArticolo(articolo);
  }

  clearInput(){
    console.log("Pulisco")
  }
}
