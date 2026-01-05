import { Injectable } from '@nestjs/common';

@Injectable()

export class PoliticasServicio {

  private maxDuracionHoras = 8;

  private minAntelacionHoras = 24;

  obtenerMaxDuracion(): number {

    return this.maxDuracionHoras;

  }

  obtenerMinAntelacion(): number {

    return this.minAntelacionHoras;

  }

}