export class Experience {
    id? : number;
    expName: string;
    expDescription: string;

    constructor(expName:string, expDescription:string){
        this.expName = expName;
        this.expDescription = expDescription;
    }
}
