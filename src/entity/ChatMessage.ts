import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

interface Option {
  id: string;
  text: string;
  response: string;
  points: number;
}

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionId: string;

  @Column()
  selectedOptionId: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  points: number;

  @Column("jsonb", { nullable: true })
  options: Option[];

  @CreateDateColumn()
  createdAt: Date;
} 