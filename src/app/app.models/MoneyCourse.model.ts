export class MoneyCourse {

    constructor(
        public id: number,
        public name: string,
        public ask: number,
        public bid: number,
        public enable: boolean,
    ) {
    }
}
