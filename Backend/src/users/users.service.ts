import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db/db.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from '../DTOs/CreateUser.dto.js';
import { UpdateUserDto } from '../DTOs/UpdateUser.dto.js';

@Injectable()
export class UsersService {
  async findAll() {
    return await db.select().from(users);
  }

  async find(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const [user] = await db
      .insert(users)
      .values({ ...createUserDto })
      .returning();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [user] = await db
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id))
      .returning();
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async delete(id: number) {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }
}
