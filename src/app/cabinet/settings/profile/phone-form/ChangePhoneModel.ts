export class ChangePhoneModel {

  constructor(
    public smsId: number = 0,
    public history: number = 0,
    public smsCode: number = 0,
    public oldNumber: string = '',
    public newNumber: string = '',
    public password: string = ''
  ) {}

}
