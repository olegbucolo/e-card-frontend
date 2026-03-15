
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

export function addFilterToLocalStorage(data) {
    let stored = JSON.parse(localStorage.getItem('filters')) || [];

    const filterName = Object.keys(data)[0];
    const filterValue = data[filterName];

    const index = stored.findIndex(obj => obj.hasOwnProperty(filterName));

    if (index >= 0) {
        stored[index][filterName] = filterValue;
    } else {
        stored.push(data);
    }

    localStorage.setItem('filters', JSON.stringify(stored));
}

export function getFilterFromLocalStorage(name) {
    const stored = JSON.parse(localStorage.getItem('filters'))
    if (!stored) {
        return ''
    }

    const found = stored.find(obj => obj.hasOwnProperty(name))
    return found ? found[name] : ''
}

export function resetFiltersInLocalStorage() {
    console.log('running reset')
    const stored = localStorage.getItem('filters')
    if(!stored) return 
    localStorage.setItem('filters', '[]')
}