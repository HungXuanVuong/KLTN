export class Order{
    
        id: Object;
        codeOrder: String;
        productName: String;
        point_qd: Number;
        orderDay: Date;
        receivedDay: Date;
        placeOfReceipt: String;
        status: String;
        product_id: Object;
        employee: Object;
    
        constructor(){
            this.id = 0;
            this.codeOrder = "";
            this.productName = "";
            this.point_qd = 0;
            this.orderDay = new Date();
            this.receivedDay = new Date();
            this.status = "";
            this.product_id = "";
            this.employee = "";
        }
    }