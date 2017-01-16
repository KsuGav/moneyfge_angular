export class User {

    constructor(
        public id: number,
        public email: string,
        public telephone: string,
        public first_name: string,
        public second_name: string,
        public birthday: string,
        public paspotr: string,
        public country: string,
        public city: string,
        public manager_id: string,
        public reference: string,
        public is_check_sms: boolean,
        public avatar: string,
        public create_date: string,
    ) {  }
}

