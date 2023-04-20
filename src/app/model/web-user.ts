export class WebUser {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    about: string;
    img: string;

    constructor( name: string, lastName: string, email: string,about: string, img: string ) {
            this.name = name;
            this.lastName = lastName;
            this.email = email;
            this.about = about;
            this.img = img;
    }
}
