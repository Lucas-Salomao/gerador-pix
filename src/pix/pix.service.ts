import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePixDTO } from './dto/create-pix.dto';
import { PixTransaction } from './pix.entity';
import { createStaticPix, hasError } from 'pix-utils';

@Injectable()
export class PixService {
  constructor(
    @InjectRepository(PixTransaction)
    private pixRepository: Repository<PixTransaction>,
  ) {}

  async createPixTransaction(createPixDTO: CreatePixDTO): Promise<PixTransaction> {
    // Gera o QR Code Pix estático
    const pix = createStaticPix({
      merchantName: createPixDTO.merchantName,
      merchantCity: createPixDTO.merchantCity,
      pixKey: createPixDTO.pixKey,
      infoAdicional: createPixDTO.infoAdicional || '',
      transactionAmount: createPixDTO.transactionAmount,
    });

    // Verifica se não há erros na geração do Pix
    if (hasError(pix)) {
      throw new Error('Erro ao gerar transação Pix');
    }

    // Obtém o BR Code
    const brCode = pix.toBRCode();
    const qrCodeImage = await pix.toImage();

    // Cria a entidade Pix para persistência
    const pixTransaction = this.pixRepository.create({
      ...createPixDTO,
      brCode,
      qrCodeImage,
    });

    // Salva no banco de dados
    return this.pixRepository.save(pixTransaction);
  }

  async findAllPixTransactions(): Promise<PixTransaction[]> {
    return this.pixRepository.find();
  }

  async findPixTransactionById(id: string): Promise<PixTransaction | null> {
    return this.pixRepository.findOne({ where: { id } });
  }
}