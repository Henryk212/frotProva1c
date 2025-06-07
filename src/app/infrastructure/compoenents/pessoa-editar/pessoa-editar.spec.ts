import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaEditar } from './pessoa-editar';

describe('PessoaEditar', () => {
  let component: PessoaEditar;
  let fixture: ComponentFixture<PessoaEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
