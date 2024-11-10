import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { AtividadeESG } from "./Atividade";

export enum TipoUsuario {
  COLABORADOR = "colaborador",
  ADMINISTRADOR = "administrador",
}

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column({
    type: "enum",
    enum: TipoUsuario,
    default: TipoUsuario.COLABORADOR,
  })
  tipo_usuario: TipoUsuario;

  @Column()
  data_registro: Date;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => AtividadeESG, (atividade) => atividade.usuario)
  atividades: AtividadeESG[];

  @Column({ default: 0 })
  pontuacao: number;
}
