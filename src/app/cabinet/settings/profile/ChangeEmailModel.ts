export class ChangeEmailModel {

  constructor(
    public password: string = '',
    public email: string = '',
    public smsId: number = 0,
    public history: number = 0,
    public code: number = 0
  ) {}

}
