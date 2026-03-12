
export function addToCart(setCartProducts, productId, quantity = 1) {
    setCartProducts(prev => {
        const existingProduct = prev.find(p => p.id === productId);
        if (existingProduct) {
            return prev.map(p => p.id === productId ? { ...p, quantity: p.quantity + quantity } : p);
        }
        return [...prev, { id: productId, quantity }]
    })
}