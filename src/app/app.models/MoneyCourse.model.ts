export class MoneyCourse {

    public display: string;
    constructor(
        public id: number,
        public name: string,
        public ask: number,
        public bid: number,
        public enable: boolean,
    ) {
        //display =  this.name + ": " + this.ask + " / " + this.bid;
        this.display = "qwe'";
    }
}
