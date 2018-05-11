export class News{

    _id: Object;
    title: String;
    urlHinh: String;
    place: String;
    salary: String;
    position: String;
    create_date: Date;
    exp_date: Date;
    point_uv: Number;
    content: String;
    numberOf: Number;
    status: String;
    newsPolicy: Object;
    employee: Object;

    constructor(){
        this._id = 0;
        this.title = "";
        this.urlHinh = "";
        this.place = "";
        this.salary = "";
        this.position = "";
        this.create_date = new Date();
        this.exp_date = new Date();
        this.point_uv = 0;
        this.content = "";
        this.numberOf = 0;
        this.status = "";
        this.newsPolicy = "";
        this.employee = "";

    }
}