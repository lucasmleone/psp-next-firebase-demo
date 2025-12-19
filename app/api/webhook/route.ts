import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebaseAdmin";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();

    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        if (!signature) throw new Error("No signature found");

        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error("Webhook Error:", error.message);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    // Si el evento es "Pago Completado"
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const stripeCustomerId = session.customer as string;

        if (userId) {
            console.log(`💰 Pago de ${userId}. Activando Premium...`);

            await adminDb.collection("users").doc(userId).update({
                isPremium: true,
                stripeCustomerId: stripeCustomerId,
            });
        }
    }

    return NextResponse.json({ received: true });
}