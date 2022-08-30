import { Goal } from "./goal.model";

export class User {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    password: string;
    goals?: Goal[];

    constructor(email: string, firstName: string, lastName: string, dateOfBirth: Date, password: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }
}
