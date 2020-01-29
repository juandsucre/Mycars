import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoche } from 'app/shared/model/coche.model';
import { CocheService } from './coche.service';
import { CocheDeleteDialogComponent } from './coche-delete-dialog.component';
import { CocheActualizarDialogComponent } from './coche-comprar-dialog.component';

@Component({
  selector: 'jhi-coche',
  templateUrl: './coche.component.html'
})
export class CocheComponent implements OnInit, OnDestroy {
  coches: ICoche[] = []; // he incializado el array
  eventSubscriber?: Subscription;
  filtroNombre?: string = undefined;
  filtroPropietario?: string = undefined;
  filtroFechaInicio?: Date = undefined;
  filtroFechaFinal?: Date = undefined;
  constructor(protected cocheService: CocheService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cocheService.query().subscribe((res: HttpResponse<ICoche[]>) => {
      this.coches = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCoches();
    //this.filtrarVendidos();
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

  registerChangeInCoches(): void {
    this.eventSubscriber = this.eventManager.subscribe('cocheListModification', () => this.loadAll());
  }

  delete(coches: ICoche): void {
    const modalRef = this.modalService.open(CocheDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coche = coches;
  }

  venderCoche(coches: ICoche): void {
    const modalRef = this.modalService.open(CocheActualizarDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coche = coches;

    // const cocheComprado = this.coches[coche];
    // cocheComprado.vendido = true;
    // cocheComprado.owner='Eduardo';
  }

  filtrarNombre(): void {
    this.cocheService.findByNombre(this.filtroNombre!).subscribe((res: HttpResponse<ICoche[]>) => {
      this.coches = res.body ? res.body : [];
    });
    if (this.filtroNombre === '' || this.filtroNombre === null || this.filtroNombre === undefined) {
      this.loadAll();
    }
  }

  filtrarPropietario(): void {
    this.cocheService.findByPropietario(this.filtroPropietario!).subscribe((res: HttpResponse<ICoche[]>) => {
      this.coches = res.body ? res.body : [];
    });
    if (this.filtroPropietario === '' || this.filtroPropietario === null || this.filtroPropietario === undefined) {
      this.loadAll();
    }
  }

  filtrarFechas(): void {
    this.cocheService.findByFechaVenta(this.filtroFechaInicio!, this.filtroFechaFinal!).subscribe((res: HttpResponse<ICoche[]>) => {
      this.coches = res.body ? res.body : [];
    });
    /*if(this.filtroPropietario ==="" || this.filtroPropietario ===null || this.filtroPropietario === undefined)
    {
      this.loadAll();
    }*/
  }

  filtrarVendidos(): void {
    this.cocheService.findByVendido().subscribe((res: HttpResponse<ICoche[]>) => {
      this.coches = res.body ? res.body : [];
    });
    /*if(this.filtroPropietario ==="" || this.filtroPropietario ===null || this.filtroPropietario === undefined)
    {
      this.loadAll();
    }*/
  }
}
