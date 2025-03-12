import useServerStore from "../composables/ServerStore"

export default defineEventHandler(async (event) => {

    const { key } = getQuery(event)
    const data = await readBody(event)

    const { set } = await useServerStore()

    set(key, data)


})