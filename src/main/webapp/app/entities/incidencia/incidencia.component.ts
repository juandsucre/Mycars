import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIncidencia } from 'app/shared/model/incidencia.model';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaDeleteDialogComponent } from './incidencia-delete-dialog.component';

@Component({
  selector: 'jhi-incidencia',
  templateUrl: './incidencia.component.html'
})
export class IncidenciaComponent implements OnInit, OnDestroy {
  incidencias?: IIncidencia[];
  eventSubscriber?: Subscription;

  constructor(protected incidenciaService: IncidenciaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.incidenciaService.query().subscribe((res: HttpResponse<IIncidencia[]>) => {
      this.incidencias = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInIncidencias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IIncidencia): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInIncidencias(): void {
    this.eventSubscriber = this.eventManager.subscribe('incidenciaListModification', () => this.loadAll());
  }

  delete(incidencia: IIncidencia): void {
    const modalRef = this.modalService.open(IncidenciaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.incidencia = incidencia;
  }
}
