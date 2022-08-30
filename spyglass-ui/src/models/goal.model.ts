import { User } from "./user.model";

export class Goal {
    id: number;
    name: string;
    description: string;
    imageSrc: string;
    targetDate: Date;
    targetAmount: number;
    currentAmount: number;
    userId: string;
    user: User;

    constructor(id: number, name: string, description: string, imageSrc: string, targetDate: Date, targetAmount: number, currentAmount: number, userId: string, user: User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageSrc = imageSrc;
        this.targetDate = targetDate;
        this.targetAmount = targetAmount;
        this.currentAmount = currentAmount;
        this.userId = userId;
        this.user = user;
    }
}
