
export function addToCart(setCartProducts, productId, quantity = 1) {
    setCartProducts(prev => {
        const existingProduct = prev.find(p => p.id === productId);
        if (existingProduct) {
            return prev.map(p => p.id === productId ? { ...p, quantity: p.quantity + quantity } : p);
        }
        return [...prev, { id: productId, quantity }]
    })
}

export function removeFromCart(setCartProducts, productId, quantity = 1) {
    setCartProducts(prev => {
        const existingProduct = prev.find(p => p.id === productId);

        if (!existingProduct) return prev;

        if (existingProduct.quantity <= quantity) {
            return prev.filter(p => p.id !== productId);
        }

        return prev.map(p =>
            p.id === productId
                ? { ...p, quantity: p.quantity - quantity }
                : p
        );
    });
}