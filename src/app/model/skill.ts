export class Skill {
    id?: number;
    skillName: string;
    percentage: number;

    constructor(skillName: string,skillPercentage: number){
        this.skillName =skillName;
        this.percentage =skillPercentage;
    }
}
