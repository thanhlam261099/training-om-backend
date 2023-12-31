import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty } from 'class-validator';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ type: 'boolean', default: true })
  isPending?: boolean;

  @Column({ type: 'boolean', default: true })
  isDisable?: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: RoleEntity[];
}
