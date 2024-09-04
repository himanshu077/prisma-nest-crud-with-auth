import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import {UsersService} from "./users.service"
import {userCreateDto , UpdateUserDto } from "./dto/create-user.dto"
import { JwtGuard } from '../auth/jwt.guard';
@Controller('users')
export class UsersController {
    constructor(private readonly appService: UsersService) {}



    @Post()
    create(@Body() data:userCreateDto){
        return this.appService.createUser(data)
    }
    @Get() // Return all data
    async findAll(
      @Query() query: { name?: string; email?: string; page?: string; limit?: string }
    ) {
      const page = query.page ? parseInt(query.page, 10) : 1;
      const limit = query.limit ? parseInt(query.limit, 10) : 10;
  
      const modifiedQuery = {
        ...query,
        page,
        limit,
      };
  
      return this.appService.findMany(modifiedQuery);
    }
    @Delete() // delete user data
    @UseGuards(JwtGuard)
    async deleteUser(@Req() req): Promise<string> {
      const { id } = req.user;
      return this.appService.deleteUser(id);
    }

    @Patch(':id')
    async updateUser(
      @Param('id') id: string, 
      @Body() updateUserDto: UpdateUserDto
    ) {
      try {
        const numericId = parseInt(id, 10); 
        const updatedUser = await this.appService.updateUser(numericId, updateUserDto);
  
        if (!updatedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    }    
}

