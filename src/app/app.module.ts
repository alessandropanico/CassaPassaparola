import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pagine/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { VenditaComponent } from './pagine/vendita/vendita/vendita.component';
import { TouchScreenComponent } from './pagine/vendita/touch-screen/touch-screen.component';

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
    RouterModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
