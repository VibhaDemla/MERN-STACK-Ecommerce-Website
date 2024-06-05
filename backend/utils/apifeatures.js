class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    //Searching product
    search(){
        const keyword = this.queryStr.keyword? {
            name:{
                //Operator of mongoDB that is regex(regular expression) and options(for case insensitive)
                $regex : this.queryStr.keyword,
                $options : "i",
            },
        } 
        : {};
        
        //console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    //Filtering
    //In javascript ,all objects are passed through refrence only so if we modify the queryCopy then queryStr will also get modified so thats why we are using spread operator instaed of  const queryCopy = this.queryStr
    filter(){
        const queryCopy = {...this.queryStr};

        //console.log(queryCopy)

        //Removing some fields for category because they are used for searching the product
        const removeFields = ["keyword","page","limit"];

        //If queryCopy has this element then it gets deleted
        removeFields.forEach((el) => delete queryCopy[el]);

        //console.log(queryCopy)

        //Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        //console.log(queryStr)

        return this;

    }

    //Pagination
    pagination(resultperpage){
        const currentPage = Number(this.queryStr.page) || 1

        const skip = resultperpage * (currentPage -1)

        this.query = this.query.limit(resultperpage).skip(skip);
        return this;
 
    }
}
module.exports = ApiFeatures