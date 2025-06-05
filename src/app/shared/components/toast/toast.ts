import { CommonModule } from '@angular/common';
import { Component, Injectable, Input, signal } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
@Injectable({
  providedIn: 'root'
})
export class Toast {

  @Input() mensagem: string = '';
  @Input() titulo: string = '';
  @Input() tipo: string = ''
  visible = signal(false);


  showMessage(titulo: string, mensagem: string, tipo: string = 'bg-success') {
    this.titulo = titulo;
    this.mensagem = mensagem;
    this.tipo = tipo as 'success' | 'error' | 'info';
    this.visible.set(true);

    setTimeout(() => this.hide(), 3000);
  }

   hide() {
    this.visible.set(false);
  }

}
