import { Injectable } from '@nestjs/common';

@Injectable()

export class EmailServicio {

  async enviarNotificacion(email: string, mensaje: string) {

    console.log(`Enviando email a ${email}: ${mensaje}`);

  }

}