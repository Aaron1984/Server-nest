import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'Id',
  })
  id: number;

  @Column({
    name: 'Name',
    unique: true,
    nullable: false,
  })
  name?: string;

  @Column({
    name: 'Email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'Password',
    unique: false,
    nullable: false
  })
  @Exclude()
  password: string;
  
  @Column({
    nullable: true,
    length: 500,
  })
  @Exclude()
  refreshToken: string;

}
