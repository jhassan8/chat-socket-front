export class Message {

    message: string;
    date: Date;
    username: string;
    type: string;

    constructor(message?: Message) {

        this.message = '';
        this.date = null;
        this.username = '';
        this.type = '';

        if (message) {
            Object.assign(this, message);
        }
    }
}
