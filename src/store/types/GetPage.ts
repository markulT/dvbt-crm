

export interface GetPageRequest {
    pageNumber:number,
    pageSize:number,
}
export interface GetPageResponse<T> {
    page:T[],
    length:number
}