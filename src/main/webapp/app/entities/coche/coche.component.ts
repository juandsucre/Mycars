import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoche } from 'app/shared/model/coche.model';
import { CocheService } from './coche.service';
import { CocheDeleteDialogComponent } from './coche-delete-dialog.component';

@Component({
  selector: 'jhi-coche',
  templateUrl: './coche.component.html'
})
export class CocheComponent implements OnInit, OnDestroy {
  coches: ICoche[] = []; //he incializado el array
  eventSubscriber?: Subscription;

  constructor(protected cocheService: CocheService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cocheService.query().subscribe((res: HttpResponse<ICoche[]>) => {
      this.coches = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCoches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICoche): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCoches() {
    this.eventSubscriber = this.eventManager.subscribe('cocheListModification', () => this.loadAll());
  }

  delete(coche: ICoche) {
    const modalRef = this.modalService.open(CocheDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coche = coche;
  }

  venderCoche(idcoche: number) {
    const cocheComprado = this.coches[idcoche];
    cocheComprado.vendido = true;
    //cocheComprado.owner='Eduardo';
  }
}
