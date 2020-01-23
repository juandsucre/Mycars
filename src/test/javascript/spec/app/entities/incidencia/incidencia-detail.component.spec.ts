import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MycarsTestModule } from '../../../test.module';
import { IncidenciaDetailComponent } from 'app/entities/incidencia/incidencia-detail.component';
import { Incidencia } from 'app/shared/model/incidencia.model';

describe('Component Tests', () => {
  describe('Incidencia Management Detail Component', () => {
    let comp: IncidenciaDetailComponent;
    let fixture: ComponentFixture<IncidenciaDetailComponent>;
    const route = ({ data: of({ incidencia: new Incidencia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MycarsTestModule],
        declarations: [IncidenciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IncidenciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IncidenciaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load incidencia on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.incidencia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
