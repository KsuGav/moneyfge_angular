export class Account {

  constructor(
    public id: number,
    public user: number,
    public currency: string,
    public sum: number,
    public locked: boolean,
    public deleted: boolean,
    public active: boolean
  ) {  }

}
