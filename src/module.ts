import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addServerHandler, addImports } from '@nuxt/kit'

type ServerDriverT = 'fs'

// Module options TypeScript interface definition
export interface ModuleOptions {
  clientID_key: string
  prefix: string
  clientDriver: string
  serverDriver: {
    driver: string
    base?: string;
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'NuxtStore',
    configKey: 'store',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    clientID_key: 'client_id',
    prefix: 'stores',
    clientDriver: 'localStorage',

  },
  hooks: {

  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public = {
      ...nuxt.options.runtimeConfig.public,
      stores: options
    }

    if (options.serverDriver) {
      nuxt.options.nitro.storage = {
        ...nuxt.options.nitro.storage,
        stores: {
          base: './.StoreData',
          ...options.serverDriver
        }
      }
    }

    const stores = resolver.resolve(nuxt.options.srcDir + '/stores')


    addImportsDir(stores)
    addImports({
      name: 'defineStore',
      as: 'defineStore',
      from: resolver.resolve('./runtime/utils/defineStore')
    })
    addImportsDir(resolver.resolve('runtime/middleware'))

    addServerHandler({
      handler: resolver.resolve('./runtime/server/middleware/store')
    })
    addServerHandler({
      route: '/update_store',
      handler: resolver.resolve('./runtime/server/routes/update_store.post')
    })

  },
})
