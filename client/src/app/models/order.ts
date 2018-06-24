export class Order{
    
        id: Object;
        codeOrder: String;
        orderDay: Date;
        receivedDay: Date;
        placeOfReceipt: String;
        status: String;
        employee: Object;
        employeeSetStatus: Object;
        product_id: Object;
    
        constructor(){
            this.id = 0;
            this.codeOrder = "";
            this.orderDay = new Date();
            this.receivedDay = new Date();
            this.status = "";
            this.employee = "";
            this.employeeSetStatus = "";
            this.product_id = "";
        }
    }