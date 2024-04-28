// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type ColorSchemeState = {
    darkMode: boolean
}

export type ColorSchemeActions = {
    activateDarkMode: () => void

}

export type ColorSchemeStore = ColorSchemeState & ColorSchemeActions

export const initColorSchemeStore = (): ColorSchemeState => {
    return { darkMode: false }
}

export const defaultInitState: ColorSchemeState = {
    darkMode: false,
}

export const createColorSchemeStore = (
    initState: ColorSchemeState = defaultInitState,
) => {
    return createStore<ColorSchemeStore>()((set) => ({
        ...initState,
        activateDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
    }))
}
