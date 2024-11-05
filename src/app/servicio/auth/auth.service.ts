import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogueado } from 'src/app/interfaces/UsuarioLogueado';
import { CuerpoLogin } from 'src/app/interfaces/CuerpoLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login'
  public usuarioLogueado: UsuarioLogueado | null = null;
  public accessToken: string | null = null;
  constructor(
    private http: HttpClient
  ) { }

  public iniciarSesion(nombre_usuario: string, contrasenia: string){
    const cuerpo: CuerpoLogin = {
      username: nombre_usuario,
      password: contrasenia
    }
    this.http.post<UsuarioLogueado>(this.URL_LOGIN, JSON.stringify(cuerpo),{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .subscribe(resultado=>{
      this.usuarioLogueado = resultado;
      this.accessToken = resultado.accessToken;
      console.log(resultado);
      
    });
  }
  
  public cerrarSesion(){
    if(this.usuarioLogueado){
      this.usuarioLogueado = null;
      this.accessToken = null;
    }
  }
}
