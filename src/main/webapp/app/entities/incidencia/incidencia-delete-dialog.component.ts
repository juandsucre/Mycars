import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIncidencia } from 'app/shared/model/incidencia.model';
import { IncidenciaService } from './incidencia.service';

@Component({
  templateUrl: './incidencia-delete-dialog.component.html'
})
export class IncidenciaDeleteDialogComponent {
  incidencia?: IIncidencia;

  constructor(
    protected incidenciaService: IncidenciaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.incidenciaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('incidenciaListModification');
      this.activeModal.close();
    });
  }
}
