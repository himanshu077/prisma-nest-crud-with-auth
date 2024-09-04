import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UpdateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createUser(data: { name: string; email: string ; password:string}): Promise<User | string> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return `User with email ${data.email} already exists.`;
    }
  data.password = await bcrypt.hash(data.password,10)
    return this.prisma.user.create({ data });
  }


  async deleteUser(id: number): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
  
      if (!user) {
        return `User with ID ${id} does not exist.`;
      }
  
      await this.prisma.user.delete({ where: { id } });
  
      return `User with ID ${id} deleted successfully.`;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
  

  async updateUser(id: number, data: Partial<UpdateUserDto>): Promise<User | null> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return null;
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data, 
      });

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findMany(query: {
    name?: string;
    email?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    totalRecords: number;
    page: number;
    limit: number;
    data: User[];
  }> {
    const { name, email, page = 1, limit = 10 } = query;

    const skip = (Number(page) - 1) * Number(limit);

    try {
      const totalRecords = await this.prisma.user.count({
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(email && { email: { contains: email, mode: 'insensitive' } }),
        },
      });

      const data = await this.prisma.user.findMany({
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(email && { email: { contains: email, mode: 'insensitive' } }),
        },
        skip,
        take: limit,
      });

      return {
        totalRecords,
        page,
        limit,
        data,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}
