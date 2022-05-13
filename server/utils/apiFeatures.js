class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }

    search() {
        const search = this.queryStr.search ? {
            name: {
                $regex: this.queryStr.search,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find(search)
        return this
    }

    filter() {
        let queryCopy = { ...this.queryStr }
        const removeFields = ["search", "page", "limit"]
        removeFields.forEach(key => delete queryCopy[key])
        
        // Filter for price, rating and category
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace("price", "priceSpecs.0.offerPrice")
        queryCopy = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
        
        this.query = this.query.find(JSON.parse(queryCopy))
        return this
    }

    pagination(resultPerPage) {
        let currentPage = Number(this.queryStr.page) > 1 ? Number(this.queryStr.page) : 1
        let skip = resultPerPage * (currentPage - 1)

        this.query = this.query.find().limit(resultPerPage).skip(skip)
        return this
    }
}

module.exports = ApiFeatures
