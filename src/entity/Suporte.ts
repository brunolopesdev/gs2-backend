import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Suporte {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: "colaboradorId" })
  usuario: Usuario;

  @Column()
  data_solicitacao: Date;

  @Column()
  tipo_problema: string;

  @Column()
  descricao: string;

  @Column()
  status: string;
}
