export class News{

    id: Object;
    title: String;
    urlHinh: String;
    place: String;
    salary: String;
    position: String;
    create_date: Date;
    exp_date: Date;
    point_uv: Number;
    // title: {type: String, required: true},
    // urlHinh: {type: String, required: true},
    // place: {type: String, required: true},
    // salary: {type: String, required: true},
    // position: {type: String, required: true},
    // create_date: {type: Date, default: Date.now},
    // exp_date: {type: Date},
    // point_uv: {type: Number}
    constructor(){
        this.id = 0;
        this.title = "";
        this.urlHinh = "";
        this.place = "";
        this.salary = "";
        this.position = "";
        this.create_date = new Date();
        this.exp_date = new Date();
        this.point_uv = 0;
    }
}