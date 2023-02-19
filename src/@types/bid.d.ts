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
    expand?: {}
}


export type BidList = {
    page: numeer,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: BidType[]
}


export type BidFilterd = {
    application_doc: string
    approved: string
    collectionId: string
    collectionName: string
    created: string
    expand: {}
    id: string
    profession: string
    project: "j4iqtofimg8bgn5"
    updated: string
    user: string
}


