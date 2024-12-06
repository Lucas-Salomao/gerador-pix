import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus
  } from '@nestjs/common';
  import { PixService } from './pix.service';
  import { CreatePixDTO } from './dto/create-pix.dto';
  import { PixTransaction } from './pix.entity';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; 
  
  @ApiTags('pix') 
  @Controller('pix')
  export class PixController {
    constructor(private readonly pixService: PixService) { }
  
    @Post()
    @HttpCode(HttpStatus.CREATED) 
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Criar uma nova transação Pix' }) 
    @ApiBody({
      type: CreatePixDTO,
      examples: {
        'Exemplo de transação Pix': {
          value: {
            "merchantName": "Thales Ogliari",
            "merchantCity": "Sao Paulo", 
            "pixKey": "nubank@thalesog.com",
            "transactionAmount": 1.00,
            "infoAdicional": "Gerado por Pix-Utils"
          },
        },
      },
    }) 
    @ApiResponse({ status: 201, description: 'Transação Pix criada com sucesso', type: PixTransaction }) 
    @ApiResponse({ status: 400, description: 'Dados inválidos' }) 
    async createPixTransaction(
      @Body() createPixDTO: CreatePixDTO
    ): Promise<PixTransaction> {
      return this.pixService.createPixTransaction(createPixDTO);
    }
  
    @Get()
    @ApiOperation({ summary: 'Listar todas as transações Pix' })
    @ApiResponse({ status: 200, description: 'Lista de transações Pix', type: [PixTransaction] })
    async findAllPixTransactions(): Promise<PixTransaction[]> {
      return this.pixService.findAllPixTransactions();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Buscar uma transação Pix por ID' })
    @ApiResponse({ status: 200, description: 'Transação Pix encontrada', type: PixTransaction })
    @ApiResponse({ status: 404, description: 'Transação Pix não encontrada' })
    async findPixTransactionById(
      @Param('id') id: string
    ): Promise<PixTransaction | null> {
      return this.pixService.findPixTransactionById(id);
    }
  }