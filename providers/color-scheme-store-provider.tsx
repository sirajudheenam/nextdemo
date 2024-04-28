// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
    type ColorSchemeStore,
    createColorSchemeStore,
    initColorSchemeStore,
} from '@/stores/color-scheme-store'

export const ColorSchemeStoreContext = createContext<StoreApi<ColorSchemeStore> | null>(
    null,
)

export interface ColorSchemeStoreProviderProps {
    children: ReactNode
}

export const ColorSchemeStoreProvider = ({
    children,
}: ColorSchemeStoreProviderProps) => {
    const storeRef = useRef<StoreApi<ColorSchemeStore>>()
    if (!storeRef.current) {
        storeRef.current = createColorSchemeStore(initColorSchemeStore())
    }

    return (
        <ColorSchemeStoreContext.Provider value={storeRef.current}>
            {children}
        </ColorSchemeStoreContext.Provider>
    )
}

export const useColorSchemeStore = <T,>(selector: (store: ColorSchemeStore) => T,): T => {
    const colorSchemeStoreContext = useContext(ColorSchemeStoreContext)

    if (!colorSchemeStoreContext) {
        throw new Error(`useColorSchemeStore must be use within ColorSchemeStoreProvider`)
    }

    return useStore(colorSchemeStoreContext, selector)
}
