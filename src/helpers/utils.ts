import { UserCollectionType } from "../@types/users";

export function getRandomString(length: number) {
    return (Math.random() + 1).toString(36).substring(length);
}




