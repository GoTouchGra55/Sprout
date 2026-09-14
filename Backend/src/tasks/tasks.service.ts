import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db/db.js';
import { tasks } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { CreateTaskDto } from '../DTOs/CreateTask.dto.js';
import { UpdateTaskDto } from '../DTOs/UpdateTask.dto.js';

@Injectable()
export class TasksService {
  async findAll() {
    return await db.select().from(tasks);
  }

  async findOne(id: number) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    if (!task) throw new NotFoundException('Task not found!');
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const [task] = await db
      .insert(tasks)
      .values({ ...createTaskDto })
      .returning();
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const [task] = await db
      .update(tasks)
      .set(updateTaskDto)
      .where(eq(tasks.id, id))
      .returning();
    if (!task) throw new NotFoundException('Task not found!');
    return task;
  }

  async delete(id: number) {
    const [task] = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    if (!task) throw new NotFoundException('Task not found!');
    return task;
  }
}
