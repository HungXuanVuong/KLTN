export class Order{
    
        id: Object;
        codeOrder: String;
        productName: String;
        point_qd: Number;
        orderDate: Date;
        receivedDate: Date;
        placeOfReceipt: String;
        status: String;
        employee: Object;
    
        constructor(){
            this.id = 0;
            this.codeOrder = "";
            this.productName = "";
            this.point_qd = 0;
            this.orderDate = new Date();
            this.receivedDate = new Date();
            this.status = "";
            this.employee = "";
        }
    }