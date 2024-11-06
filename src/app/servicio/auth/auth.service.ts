import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogueado } from 'src/app/interfaces/UsuarioLogueado';
import { CuerpoLogin } from 'src/app/interfaces/CuerpoLogin';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login'
  public usuarioLogueado: UsuarioLogueado | null = null;
  public accessToken: string | null = null;
  // Observador 
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public iniciarSesion(nombre_usuario: string, contrasenia: string){
    this.$cargando.next(true);
    const cuerpo: CuerpoLogin = {
      username: nombre_usuario,
      password: contrasenia
    }
    this.http.post<UsuarioLogueado>(this.URL_LOGIN, JSON.stringify(cuerpo),{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .subscribe({
      next: (resultado) => {
        this.usuarioLogueado = resultado;
        this.accessToken = resultado.accessToken;
        this.$cargando.next(false);
        console.log(resultado);
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.$cargando.next(false);
        console.error("Error al iniciar sesión:", err);
        // Muestra un mensaje de error
        alert("Usuario o contraseña incorrectos. Por favor, intenta de nuevo.");
      }
    });
  }
  
  public cerrarSesion(){
    if(this.usuarioLogueado){
      this.usuarioLogueado = null;
      this.accessToken = null;
      this.router.navigate([''])
    }
  }
}
