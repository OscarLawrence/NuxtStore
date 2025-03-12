

import { useStorage } from 'nitropack/runtime'




export default () => {
    const { prefix } = useRuntimeConfig().public.stores
    // console.log(config)
    const store = useStorage(prefix)

    const get = async (key: string) => {
        return await store.getItem(key)
    }

    const set = async (key: string, value: any) => {
        return await store.setItem(key, value)
    }


    const getStores = async (userID: string) => {
        const allStores = await store.keys()
        // console.log(allStores)
        const stores = allStores.filter((key: string) => key.startsWith(prefix)).map((key: string) => key.replace(prefix + ':', ''))
        const userStores = stores.filter((store: string) => store.startsWith(userID))
        const globalStores = stores.filter((store: string) => store.startsWith('GLOBAL'))
        return { userStores, globalStores }
    }

    return {
        getStores,
        get,
        set
    }

}