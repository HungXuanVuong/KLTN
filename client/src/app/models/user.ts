export class User{
    id: Object;
    email: String;
    username: String;
    password: String;
    dateOfBirth: Date;
    sex: String;
    address: String;
    phone: String;
    urlHinh: String;
    cvFile: String;
    point: Number;
    uvNumber: Number;
    role: String;
    register_date: Date;
    
    constructor(){
        this.id = 0;
        this.email = "";
        this.password = "";
        this.username = "";
        this.dateOfBirth = new Date();
        this.sex = "";
        this.address = "";
        this.phone = "";
        this.urlHinh = "";
        this.cvFile = "";
        this.point = 0;
        this.uvNumber = 0;
        this.role = "user";
        this.register_date = new Date();
    }
}