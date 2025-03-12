import { useNuxt } from "@nuxt/kit"

import useServerStores from '../composables/ServerStore'


export default defineEventHandler(async (event) => {
    const { getStores, get } = useServerStores()

    const { clientID_key } = useRuntimeConfig().public.stores

    const userID = await getCookie(event, clientID_key)

    const { userStores, globalStores } = await getStores(userID)
    for (const store of userStores) {
        event.context[store] = await get(store)
    }
    for (const store of globalStores) {
        event.context[store] = await get(store)
    }


})