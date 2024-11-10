import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class AtividadeESG {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: "usuarioId" })
  usuario: Usuario;

  @Column()
  data_envio: Date;

  @Column()
  tipo_atividade: string;

  @Column({ type: "text" })
  descricao: string;

  @Column({ nullable: true })
  impacto: string;

  @Column({ default: "pendente" })
  status: string;

  @Column({ type: "float", nullable: true })
  pontuacao?: number;
}
