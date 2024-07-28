class ApiFeatures{
    // HERE API CONSTRUCTOR -> EX -> PRODUCTNAME = queryStr , Find-> query
    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search(){
        const keyword = this.queryStr.keyword 
        ? {
            itemName:{

                
                
                $regex: this.queryStr.keyword,
                $options: "i" ,
            },
        } 
        : {};

        // console.log(keyword);

        // this.query -> find method of getproducts
        this.query = this.query.find({ ...keyword }); 
        return this;
    }


    // Filter Functionality
filter() {
    
    // object contains refrence -> Can not directly assign -> Used Spread Operator for copy of object 
    const queryCopy = {...this.queryStr};

const removeFields = ["keyword" , "page" , "limit"];

removeFields.forEach((key) => delete queryCopy[key]);

// console.log(queryCopy); ->  { category: 'laptop' }


let queryStr = JSON.stringify(queryCopy);


queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , (key) => `$${key}`);


// this.query->Find method && queryCopy -> { category: 'laptop' }
this.query = this.query.find(JSON.parse(queryStr));
// console.log(queryStr);

return this;

}

pagination(resultPerPage){

    const currentPage = Number(this.queryStr.page) || 1;  
    // Database 50 product -> Per Page 10 Product -> total page 5  -> At fist page skipped 0 -> 2nd Page Skipped 10 ..

    const skip = resultPerPage * (currentPage-1);

    // Assign to  Query
    this.query = this.query.limit(resultPerPage).skip(skip); 

    return this;
}

};

module.exports = ApiFeatures;