

const init = () => ({cont : 0})

const asyncInit = async () => ({cont : 0})


const defineStore = (init) => {
    
    const returnFn = () => {

        let result = null
        let isSync = true

        const promise = Promise.resolve(init()).then(val => {
            result = val
            isSync = false
        })

        return Promise.resolve().then(() => {
            if (isSync) return result
            return promise
        })


    }

    return returnFn()
}

const store = defineStore(init)
console.log(store)
const asyncStore = defineStore(asyncInit)
console.log(asyncStore)