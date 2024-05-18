import { auth } from "firebase-admin";
import { customInitApp } from "@/utils/backend/firebaseAdmin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserByUid } from "@/utils/backend/users";

customInitApp();

export async function GET(request: NextRequest) {
    const session = cookies().get("session")?.value ?? "";
  
    if (!session) {
      return NextResponse.json({ }, { status: 401 });
    }
  
    const decodedClaims = await auth().verifySessionCookie(session, true);
  
    if (!decodedClaims) {
      return NextResponse.json({ }, { status: 401 });
    }

    const user = await auth().getUser(decodedClaims.uid)    
    const userData = await getUserByUid(decodedClaims.uid)
  
    return NextResponse.json({
      session: user,
      data: userData
    }, { status: 200 });
  }
  