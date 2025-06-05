import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCargos } from './cadastro-cargos';

describe('CadastroCargos', () => {
  let component: CadastroCargos;
  let fixture: ComponentFixture<CadastroCargos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCargos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCargos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
