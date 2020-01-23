import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoche } from 'app/shared/model/coche.model';
import { CocheService } from './coche.service';
import { CocheDeleteDialogComponent } from './coche-delete-dialog.component';

@Component({
  selector: 'jhi-minigame',
  templateUrl: './minigame.component.html'
})
export class MiniGameComponent {
  eleccionJ = ' ';
  AssetPiedra = '../../../content/images/piedra.png';
  AssetPapel = '../../../content/images/papel.png';
  AssetTijera = '../../../content/images/tijeras.png';
  constructor() {}

  getMaquinaEleccion(): string {
    const nunMaquinaEleccion = Math.floor(Math.random() * 3);
    let maquinaEleccion = '';
    switch (nunMaquinaEleccion) {
      case 0:
        return 'piedra';
      case 1:
        return 'papel';
      case 2:
        return 'tijera';
      default:
        maquinaEleccion = 'Error';
        break;
    }
    return maquinaEleccion;
  }

  getJugadorEleccion(): string {
    return this.eleccionJ;
  }

  setJugadorEleccion(eleP: number): void {
    switch (eleP) {
      case 0:
        this.eleccionJ = 'piedra';
        break;
      case 1:
        this.eleccionJ = 'papel';
        break;
      case 2:
        this.eleccionJ = 'tijera';
        break;
    }
    alert('Has elegido: ' + this.eleccionJ);
  }

  btnJugar(): void {
    const eleM: string = this.getMaquinaEleccion();
    const eleJ: string = this.getJugadorEleccion();
    const cadena: string = 'Maquina: ' + eleM + '\n' + 'Jugador: ' + eleJ + '\n' + 'Resultado: ';
    if (eleM === eleJ) {
      alert(cadena + '¡Es un empate!');
    } else {
      if (eleM === 'piedra') {
        if (eleJ === 'tijera') {
          alert(cadena + 'Piedra gana');
        } else {
          alert(cadena + 'Papel gana');
        }
      } else if (eleM === 'papel') {
        if (eleJ === 'piedra') {
          alert(cadena + 'gana papel');
        } else {
          alert(cadena + 'tijera gana');
        }
      } else {
        if (eleM === 'tijera') {
          if (eleJ === 'piedra') {
            alert(cadena + 'piedra gana');
          } else {
            alert(cadena + 'tijera gana');
          }
        }
      }
    }
  }
}
