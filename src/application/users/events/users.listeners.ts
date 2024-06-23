import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from '../../../domain/schemas/users.schema';
// entity

@Injectable()
export class UsersListeners {
  @OnEvent('user.registered')
  async handleRegisteredEvent(event: User) {
    console.log('events', event);
    // send email
  }
}
