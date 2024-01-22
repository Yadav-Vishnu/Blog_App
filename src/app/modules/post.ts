export interface Post {
    title:string,
    permlink:string,
    catogory:{
        categoryId:string,
        category:string
    },
    postImgPath:string,
    excert:string,
    content:string,
    isFeatured:boolean,
    view:number,
    status:string,
    created:Date
}
