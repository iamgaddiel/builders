export type BidType = {
    id: string
    collectionId: string
    collectionName: string
    created; string
    updated: string
    user: string
    project: string
    profession: string
    application_doc: string
    approved: boolean
}


export type BidList = {
    page: numeer,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: BidType[]
}


export type BidFilterd = {
    
}


