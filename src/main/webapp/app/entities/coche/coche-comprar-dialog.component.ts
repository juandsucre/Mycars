import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoche } from 'app/shared/model/coche.model';
import { CocheService } from './coche.service';

@Component({
  templateUrl: './coche-comprar-dialog.component.html'
})
export class CocheActualizarDialogComponent {
  coches: ICoche[] = [];

  constructor(protected cocheService: CocheService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmVenta(coche: ICoche): void {
    // this.cocheService.delete(id).subscribe(() => {
    const cocheComprado = this.coches[coche];
    cocheComprado.vendido = true;
    this.activeModal.close();
    // });
  }
}
