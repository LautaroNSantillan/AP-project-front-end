export class Skill {
    id?: number;
    skillName: string;
    percentage: number;
    imgURL: string;

    constructor(skillName: string,skillPercentage: number, imgURL: string){
        this.skillName =skillName;
        this.percentage =skillPercentage;
        this.imgURL= imgURL;
    }
}
