import { auth } from "firebase-admin";
import { customInitApp } from "@/utils/backend/firebaseAdmin";
import { cookies  } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { addPayment } from "@/utils/backend/users";

customInitApp();

export async function POST(request: NextRequest, response: NextResponse) {  
    const session = cookies().get("session")?.value ?? "";
    
    if (!session) {
      return NextResponse.json({ }, { status: 401 });
    }
  
    const decodedClaims = await auth().verifySessionCookie(session, true);
    const body = await request.json();

    if(!body.paymentNumber) {
      return NextResponse.json({
        message: "paymentNumber is require"
      }, { status: 400 });
    }
    const result = await addPayment(decodedClaims.uid, body.paymentNumber)

    return NextResponse.json(result, { status: 200 });
}
