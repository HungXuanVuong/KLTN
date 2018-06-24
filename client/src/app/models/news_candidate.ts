export class News_Candidate{
    
    _id: Object;
    newsId: Object;
    candidateId: Object;
    userId: Object;
    status: String;
    point;

    constructor(){
        this._id = 0;
        this.newsId = 0;
        this.candidateId = 0;
        this.userId = 0;
        this.status = "";
        this.point = 0;
    }
}