export class Gift{
    
        id: Object;
        product_name: String;
        urlHinh: String;
        trademark: String;
        amount: Number;
        create_date: Date;
        point_sp: Number;
        product_infor: String;
        status: String;
        type_giftID:Object;
        employee: Object;
       
        constructor(){
            this.id = 0;
            this.product_name = "";
            this.urlHinh = "";
            this.trademark = "";
            this.amount = 0;
            this.create_date= new Date();
            this.point_sp = 0;
            this.product_infor = "";
            this.status = "";
            this.type_giftID="";
            this.employee="";
        }
    }