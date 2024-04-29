// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type GlobalState = {
    darkMode: boolean
    notification: string
}

export type GlobalActions = {
    activateDarkMode: () => void
    setNotification: () => void
}

export type GlobalStore = GlobalState & GlobalActions

export const initGlobalStore = (): GlobalState => {
    return { darkMode: false, notification: '' }
}

export const defaultInitState: GlobalState = {
    darkMode: false,
    notification: ''
}

export const createGlobalStore = (
    initState: GlobalState = defaultInitState,
) => {
    return createStore<GlobalStore>()((set) => ({
        ...initState,
        activateDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        setNotification: () => set((state) => ({ notification: state.notification })),
    }))
}
