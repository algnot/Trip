import { firestore } from "firebase-admin"
import { customInitApp } from "./firebaseAdmin"

const app = customInitApp()

export const db = firestore(app)
