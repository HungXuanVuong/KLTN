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
    // email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    // password: { type: String, required: true, validate: passwordValidators },
    // username: {type: String},
    // dateOfBirth: {type: Date},
    // sex: {type: String},
    // address: {type: String},
    // phone: {type: String},
    // urlHinh: {type: String, default: '2.png'},
    // cvFile: {type: String},
    // point: {type: Number},
    // uvNumber: {type: Number, default: 0},
    // role: {type: String, default: 'user'},
    // register_date: {type: Date, default: Date.now}
    
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