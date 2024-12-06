import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('pix_transactions')
export class PixTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  merchantName: string;

  @Column()
  merchantCity: string;

  @Column()
  pixKey: string;

  @Column({ nullable: true })
  infoAdicional?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  transactionAmount: number;

  @Column()
  brCode: string;

  @Column()
  qrCodeImage: string;

  @CreateDateColumn()
  createdAt: Date;
}