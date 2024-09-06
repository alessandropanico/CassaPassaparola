import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';  // Importa HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pagine/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { VenditaComponent } from './pagine/vendita/vendita/vendita.component';
import { TouchScreenComponent } from './pagine/vendita/touch-screen/touch-screen.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    VenditaComponent,
    TouchScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule  // Aggiungi qui

  ],
  providers: [
    provideClientHydration(),
    [provideHttpClient()]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
