export class Experience {
    id? : number;
    expName: string;
    expDescription: string;
    imgURL: string;

    constructor(expName:string, expDescription:string, imgURL: string) {
        this.expName = expName;
        this.expDescription = expDescription;
        this.imgURL = imgURL;
    }
}
