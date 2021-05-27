import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users_tokens")
export default class UsersTokens {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Generated("uuid")
  @Column()
  token: string;

  @CreateDateColumn()
  created_at: Date;
}
