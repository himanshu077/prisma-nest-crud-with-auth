import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule if JwtGuard is used here
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY, // Use a more secure way to manage secrets
      signOptions: { expiresIn: '60m' }, // Adjust expiration as needed
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService to be used in other modules
})
export class UsersModule {}
