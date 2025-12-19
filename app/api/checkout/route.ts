import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
    try {
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        const body = await request.json();

        if (!body.userId) {
            return NextResponse.json({ error: "Falta userId" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            // 2. USAR LA VARIABLE 'origin' AQUÍ
            // Si sale bien, volvemos a la Home con una marca (?success=true)
            success_url: `${origin}/?success=true`,
            // Si cancela, volvemos a la Home normal
            cancel_url: `${origin}/?canceled=true`,

            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: { name: "Plan Coach Premium" },
                    unit_amount: 1,
                    recurring: { interval: "month" },
                },
                quantity: 1,
            }],
            mode: "subscription",
            metadata: { userId: body.userId },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Error server" }, { status: 500 });
    }
}