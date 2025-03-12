


export const updateServerStore = async (key: string, data: any) => {
    return await $fetch('/update_store', {
        method: 'POST',
        query: { key },
        body: JSON.stringify(data)
    })
}