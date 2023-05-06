export class Education {
    id?: number;
    eduName: string;
    eduDescription: string;
    imgURL: string;

    constructor(eduName: string,eduDescription: string, imgURL: string) {
        this.eduName =eduName;
        this.eduDescription =eduDescription;
        this.imgURL=imgURL;
    }
}
