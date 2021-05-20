import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "../../../../accounts/infra/typeorm/entities/User";
import Deck from "./Deck";

@Entity("cards")
export default class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  deck_id: string;

  @ManyToOne(() => Deck)
  @JoinColumn({ name: "deck_id" })
  deck: Deck;

  @Column()
  front: string;

  @Column()
  versus: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
