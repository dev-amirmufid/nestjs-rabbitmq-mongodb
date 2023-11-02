import {
  Entity,
  ObjectId,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  authId: string;
  @Column()
  name: string;
  @Column()
  birthday: string;
  @Column()
  height: number;
  @Column()
  weight: number;
  @Column()
  interests: string[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(users?: Partial<UsersEntity>) {
    Object.assign(this, users);
  }
}
