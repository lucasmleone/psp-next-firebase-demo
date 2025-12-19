export const createCheckoutSession = async (userId: string) => {
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (data.url) return data.url;
        throw new Error("No se recibió URL de pago");

    } catch (error) {
        console.error("Error en servicio de pago:", error);
        throw error;
    }
};