
export function isPresentInStorage(state, productId) {
    return state.some(s => s.id === productId);
}

export function addToLocalStorage(setterFunction, productId, quantity = 1) {
    setterFunction(prev => {
        const existingProduct = prev.find(p => p.id === productId);
        if (existingProduct) {
            return prev.map(p => p.id === productId ? { ...p, quantity: p.quantity + quantity } : p);
        }
        return [...prev, { id: productId, quantity }]
    })
}

export function removeFromLocalStorage(setterFunction, productId, quantity = 1) {
    setterFunction(prev => {
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

export function addFilterToStorage(value) {
    let stored = localStorage.getItem('filters');
    if (!stored) {
        localStorage.setItem('filters', JSON.stringify(value))
        console.log('STORED INEXISTENT VALUE')
    }
    console.log('VALUE EXISTS')

}