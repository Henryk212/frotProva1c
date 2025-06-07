import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFuncionarios } from './cadastro-funcionarios';

describe('CadastroFuncionarios', () => {
  let component: CadastroFuncionarios;
  let fixture: ComponentFixture<CadastroFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroFuncionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
