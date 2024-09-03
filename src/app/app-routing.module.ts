import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pagine/home/home.component';
import { VenditaComponent } from './pagine/vendita/vendita/vendita.component';
import { TouchScreenComponent } from './pagine/vendita/touch-screen/touch-screen.component';

const routes: Routes = [

{
  path:'home',component:HomeComponent,
},

{
  path:'',component:HomeComponent
},

{
  path:'vendita',component:VenditaComponent
},

{
  path:'touchscreen',component:TouchScreenComponent
}


];

@NgModule({
  //permette di iniziare da inizio pagina quando si cambia rotta
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
