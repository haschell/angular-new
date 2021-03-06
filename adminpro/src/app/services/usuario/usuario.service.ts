import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import Swal from 'sweetalert2';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    console.log('Servicio de usuario listo!!');
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5)? true: false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).map((resp: any) => {
      localStorage.setItem('id', resp.id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      return true;
    });
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario ).map((resp: any)=>{
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' +this.token;
    return this.http.put(url, usuario).map((resp: any) => {
      let usuarioDB: Usuario = resp.usuario;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      return true;
    })
  }

  cambiarImagen(archivo: File, id: string) {
this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
  .then((resp: any) => {
    this.usuario.img = resp.usuario.img;
    Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
    this.guardarStorage(id, this.token, this.usuario);
  })
  .catch(resp => {
    console.log(resp);
  })
  }
}
