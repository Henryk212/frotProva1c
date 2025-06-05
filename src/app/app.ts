import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './infrastructure/compoenents/header/header';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ControleDeFuncionariosFront';
}
