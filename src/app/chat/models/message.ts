export class Message {

    message: string;
    date: Date;
    username: string;
    type: string;
    color: string;

    constructor(message?: Message) {

        this.message = '';
        this.date = null;
        this.username = '';
        this.type = '';
        this.color = '';

        if (message) {
            Object.assign(this, message);
        }
    }
}
