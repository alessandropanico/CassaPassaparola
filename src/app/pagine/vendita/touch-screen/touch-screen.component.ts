import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-touch-screen',
  templateUrl: './touch-screen.component.html',
  styleUrls: ['./touch-screen.component.css']
})
export class TouchScreenComponent implements OnInit {
  currentTime: string = '';
  currentDate: string = '';

  ngOnInit(): void {
    this.setCurrentDate();
    this.setCurrentTime();
  }

  setCurrentDate(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = now.getDate().toString().padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;
  }

  setCurrentTime(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }


  resetInput():void {
    let codice =document.getElementById("inputCodice") as HTMLInputElement
    if (codice) {
      codice.value = ''; // Reset the value of the input
    }
  }
}
