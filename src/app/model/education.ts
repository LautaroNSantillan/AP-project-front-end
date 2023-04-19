export class Education {
    id?: number;
    eduName: string;
    eduDescription: string;

    constructor(eduName: string,eduDescription: string){
        this.eduName =eduName;
        this.eduDescription =eduDescription;
    }
}
