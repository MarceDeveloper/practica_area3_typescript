import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SreoModule } from './presentation/modules/sreo.module';

@Module({
  imports: [SreoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
