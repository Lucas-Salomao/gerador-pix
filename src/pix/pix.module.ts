import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixService } from './pix.service';
import { PixController } from './pix.controller';
import { PixTransaction } from './pix.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixTransaction])
  ],
  controllers: [PixController],
  providers: [PixService],
})
export class PixModule {}