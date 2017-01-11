export class AccountHistoryRecord{

    constructor(
        public id: number,
        public date: string,
        public type: string,
        public sum: number,
        public currency: string,
        public znak_sum: string,
        public info: string,
        public file: string
    ) {
    }
}
