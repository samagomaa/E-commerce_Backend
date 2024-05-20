

export class ApiFeaturs {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
    }

    //paggination
    paggination() {
        if (this.searchQuery.pages <= 0) this.searchQuery.pages = 1
        let pageNum = this.searchQuery.pages || 1
        let pageLimit = 8
        let pageSkip = (pageNum - 1) * pageLimit
        this.pageNum = pageNum
        this.mongooseQuery.skip(pageSkip).limit(pageLimit)
        return this
    }

    //filteration
    filteration() {
        let filterObj = { ...this.searchQuery }
        let excludedFields = ['page', 'sort', 'fields', 'keyword']
        excludedFields.forEach(val => delete filterObj[val])
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, match => '$' + match)
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }

    //sort
    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }

    //selectedFeilds
    feilds() {
        if(this.searchQuery.feilds) {
            let feilds = this.searchQuery.feilds.split(',').join(' ')
            this.mongooseQuery.select(feilds)
        }
        return this
    }
    
    //search
    search(){
        if(this.searchQuery.keyword) {
            this.mongooseQuery.find()
        }
        return this
    }
    

}