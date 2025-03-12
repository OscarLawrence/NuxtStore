import { useNuxtApp, useCookie, useRequestEvent, useHydration } from "nuxt/app";
import { reactive, watch } from "vue";
import { updateServerStore } from './updateServerStore'
import { uniqueID } from './uniqueID'

/**
 * Interface for store options.
 */
interface StoreOptionsI {
    global: boolean;
    type: 'hybrid' | 'client' | 'server';
}

/**
 * Default options for the store.
 */
const DEFAULT_OPTIONS: StoreOptionsI = {
    global: false,
    type: 'hybrid'
}

/**
 * Interface for the state object.
 */
interface StateI {
    ___unresolved?: boolean;
    [key: string]: any;
}

/**
 * Type for the factory function.
 */
type FactoryI = () => object | Promise<object>;

/**
 * Type for the Nuxt store function.
 */
type NuxtStoreT = () => Promise<StateI> | StateI;

/**
 * Defines a Nuxt store with the given key, factory function, and options.
 * 
 * @param key - The key for the store.
 * @param factory - The factory function to create the initial state.
 * @param options - Optional store options.
 * @returns A function that returns the state.
 */
export const defineStore = (
    key: string,
    factory: FactoryI = () => ({}),
    options: Partial<StoreOptionsI> = {}
): NuxtStoreT => {
    const option = {
        ...DEFAULT_OPTIONS,
        ...options
    };

    let prefix = 'GLOBAL';
    const state = reactive<StateI>({ ___unresolved: true });

    /**
     * Sets the state with the given value.
     * 
     * @param value - The value to set in the state.
     */
    const setState = (value: object) => {
        Object.assign(state, value);
        delete state.___unresolved;
    };

    /**
     * Helper function to handle hydration and state management.
     */
    const helperFn = () => {
        /**
         * Handles the hydration process.
         * 
         * @param initVal - The initial value for hydration.
         */
        const hydrationFunction = (initVal: object) => {
            if (!option.global && prefix === 'GLOBAL') {
                const { clientID_key } = useRuntimeConfig().public.stores
                const userID = useCookie(clientID_key, { default: () => uniqueID(), maxAge: 60 * 60 * 24 * 365 });
                prefix = userID.value;
            }
            if (!key.startsWith(prefix)) {
                key = `${prefix}_${key}`;
            }

            if (['hybrid', 'server'].includes(option.type) && import.meta.server) {
                const event = useRequestEvent();
                const serverValue = event?.context[key];

                setState(serverValue || initVal);
                useHydration(key, () => event?.context[key], (_) => { });
            }

            if (!import.meta.server && state.___unresolved) {
                let val: any = null;

                if (['hybrid', 'server'].includes(option.type)) {
                    const nuxtApp = useNuxtApp();
                    val = nuxtApp.payload[key];

                }



                if (!val && ['hybrid', 'client'].includes(option.type)) {
                    const localValue = localStorage.getItem(key);
                    if (localValue) {
                        try {
                            val = JSON.parse(localValue);
                            if (val && option.type === 'hybrid') {
                                updateServerStore(key, val);
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }

                if (val) {
                    setState(val);
                }
                watch(state, (state) => {
                    localStorage.setItem(key, JSON.stringify(state));
                    updateServerStore(key, state);
                });
            }
            if (state.___unresolved) {
                setState(initVal);
            }
        };

        if (factory.constructor.name === 'AsyncFunction') {
            return async () => {
                const resolved = await factory();
                hydrationFunction(resolved);
                return state;
            };
        }

        return () => {
            hydrationFunction(factory());
            return state;
        };
    };

    return helperFn();
};