import {
  Entity,
  ObjectId,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(auth?: Partial<AuthEntity>) {
    Object.assign(this, auth);
  }
}
