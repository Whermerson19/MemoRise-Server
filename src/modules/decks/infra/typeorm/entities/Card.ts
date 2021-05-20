import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("cards")
export default class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  

  @Column()
  deck_id: string;

  @Column()
  front: string;

  @Column()
  versus: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
