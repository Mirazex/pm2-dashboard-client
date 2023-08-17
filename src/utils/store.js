import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export function createStore(name, initializer) {
    const state = devtools(initializer, {
        name
    });

    return create()(state);
}

export function createPersistStore(name, initializer) {
    const state = devtools(initializer, {
        name
    });

    const persistStore = persist(state, {
        name: `${name}-storage`,
        storage: createJSONStorage(() => localStorage),
    })

    return create()(persistStore);
}

