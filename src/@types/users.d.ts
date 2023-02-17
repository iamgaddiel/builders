export type CreateUserType = {
    email: string
    password: string
    passwordConfirm: string
    name: string,
    mat_no?: string,
    staff_id?: string
    avatar?: string
    skill: string
    phone: string
}

export type UserCollectionType = {
    id: string
    collectionId: string
    collectionName: string
    created; string
    updated: string
    username?: string
    verified: boolean
    emailVisibility: boolean,
    email: string
    name: string
    avatar: string
    skill: string
    phone: string
}

interface StoredUser {
    record: UserCollectionType
    token: string
}