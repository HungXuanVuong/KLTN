export class Candidate{

    id: Object;
    username: String;
    sex: String;
    email: String;
    phone: String;
    school: String;
    faculty: String;
    cvFile: String;
    create_date:  Date;

    constructor(){
        this.id = 0;
        this.username = "";
        this.sex = "";
        this.email = "";
        this.phone = "";
        this.school = "";
        this.faculty = "";
        this.cvFile = "";
        this.create_date = new Date();
    }
}