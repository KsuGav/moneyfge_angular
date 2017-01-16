export class Account {

  id: number;
  user: number;
  currency: string;
  sum: number;
  locked: boolean;
  deleted: boolean;
  active: boolean;

  constructor(id, user, currency, sum, locked, deleted, active
  ) {
    this.id = id;
    this.user = user;
    this.currency = currency;
    this.sum = sum.toFixed(2);
    this.locked = locked;
    this.deleted = deleted;
    this.active = active;
  }

}
