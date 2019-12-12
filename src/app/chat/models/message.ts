export class Message {

    message: string;
    date: Date;

    constructor(message?: Message) {

        this.message = '';
        this.date = null;

        if (message) {
            Object.assign(this, message);
        }
    }
}
