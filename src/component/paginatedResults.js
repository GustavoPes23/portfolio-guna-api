
module.exports ={
    paginate(data, page, limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = {};
        if(!data){
            result.result = [];
            return result;
        }

        if(endIndex < data.length){
            result.next = {
                page: page + 1,
                limit: limit,
                result:  (limit * page) % data.length > limit ? limit : (limit * page) % data.length
            }
            result.QtdNextPages = ((Math.ceil(data.length / limit)) - page)
        }
        
        if(startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit,
                result: limit
            }
        }

        result.result = data.slice(startIndex, endIndex);

        return result;
    }
}