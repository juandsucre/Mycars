import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MycarsTestModule } from '../../../test.module';
import { IncidenciaComponent } from 'app/entities/incidencia/incidencia.component';
import { IncidenciaService } from 'app/entities/incidencia/incidencia.service';
import { Incidencia } from 'app/shared/model/incidencia.model';

describe('Component Tests', () => {
  describe('Incidencia Management Component', () => {
    let comp: IncidenciaComponent;
    let fixture: ComponentFixture<IncidenciaComponent>;
    let service: IncidenciaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MycarsTestModule],
        declarations: [IncidenciaComponent],
        providers: []
      })
        .overrideTemplate(IncidenciaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IncidenciaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IncidenciaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Incidencia(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.incidencias && comp.incidencias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
