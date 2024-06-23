import { Injectable, Logger } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { UserSignUpEvent } from './user-signup.event';
import { CreateUserCommand } from './create-user-command';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class UserSaga {
  @Saga()
  productWasAdded = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserSignUpEvent),
      delay(1000),
      map((event) => {
        Logger.log('saga call CreateUserCommand');
        return new CreateUserCommand(event.userName, event.password);
      }),
    );
  };
}
