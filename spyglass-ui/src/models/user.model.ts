import { Goal } from "./goal.model";

export class User {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    goals?: Goal[];

    constructor(email: string, firstName: string, lastName: string, dateOfBirth: Date) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }
}
