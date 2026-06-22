export class GenerateId {
    id: string

    constructor() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const first = letters[Math.floor(Math.random() * letters.length)];
        const second = letters[Math.floor(Math.random() * letters.length)];

        const number = Math.floor(Math.random() * 1_000_000)
            .toString()
            .padStart(6, '0');

        this.id = `${first}${second}${number}`;
    }
}