import { UserRecord } from "firebase-admin/auth";
import { db } from "./db";

const userCollection = db.collection("users")

export const createUserIfNotExist = async (user: UserRecord) => {
    const existingUser = await userCollection.doc(user.uid).get()

    if (existingUser.exists) {
        return existingUser.data()
    }

    const createUser = await userCollection.doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        imageUrl: user.photoURL
    })

    return createUser
}

export const getUserByUid = async (uid: string) => {
    const existingUser = await userCollection.doc(uid).get()

    if (existingUser.exists) {
        return existingUser.data()
    }

    return null
}
