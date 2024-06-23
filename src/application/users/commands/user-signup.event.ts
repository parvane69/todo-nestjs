export class UserSignUpEvent {
  constructor(
    public readonly userName: string,
    public readonly password: string,
  ) {}
}
