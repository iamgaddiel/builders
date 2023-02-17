export type ProjectType = {
    id: string
    collectionId: string
    collectionName: string
    created; string
    updated: string
    name: string
    location: string
    professionals_needed: string[]
    type_of_building: string
    project_duration: number
    project_time_frame: "days" | "weeks" | "month(s)" | "year(s)"
}


export type ProjectList = {
    page: numeer,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: ProjectList[]
}


