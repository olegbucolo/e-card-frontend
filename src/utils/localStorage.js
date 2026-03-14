
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
    // value = { price: "low-to-high" } for example
    let stored = JSON.parse(localStorage.getItem('filters')) || [];

    const filterName = Object.keys(value)[0]; // e.g., "price"
    const filterValue = value[filterName];

    // Check if filterName already exists in stored array
    const index = stored.findIndex(obj => obj.hasOwnProperty(filterName));

    if (index >= 0) {
        // update existing object
        stored[index][filterName] = filterValue;
    } else {
        // push new object
        stored.push(value);
    }

    localStorage.setItem('filters', JSON.stringify(stored));
    console.log('FILTER STORED:', stored);
}