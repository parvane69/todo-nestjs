import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './infrastructure/controllers/users.module';
import { TodosModule } from './infrastructure/controllers/todos.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo'),
    EventEmitterModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    TodosModule,
    //SeedsModule,
    //CategoriesModule,
    //AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
