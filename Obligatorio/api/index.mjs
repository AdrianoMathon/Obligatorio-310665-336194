// TEST BÁSICO - Función simple para Vercel
export default async function handler(req, res) {
    res.status(200).json({
        message: "Función básica de Vercel funcionando",
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
    });
}