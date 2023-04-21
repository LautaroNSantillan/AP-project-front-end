export class Registerdto {
    name: string;
    lastName: string;
    username: string;
    email: string;
    pwd: string;

    constructor(name: string, lastName: string, username: string, email:string, pwd: string){
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.pwd = pwd;
    }
}
