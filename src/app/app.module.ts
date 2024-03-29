import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketService } from './services/chat/socket.service';
import { StoreUserService } from './services/chat/store-user.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ChatComponent } from './components/chat/chat.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { PublicacionComponent } from './components/publicacion/publicacion.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    InicioComponent,
    ChatComponent,
    MenuComponent,
    ListaUsuariosComponent,
    PublicacionComponent,
    MenuInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SocketService,
    StoreUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
