import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn({ comment: 'ID' })
  id: number;
  @Column({ name: 'username', comment: 'user name' })
  name: string;
}
