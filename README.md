<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: NuxtStore
- Package name: nuxt-store
- Description: A powerful store module for Nuxt
-->

# NuxtStore

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A powerful store module for Nuxt, providing seamless state management.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-store?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Hybrid state management
- 🚠 &nbsp;Client and server synchronization
- 🌲 &nbsp;Easy integration with Nuxt
- 🔒 &nbsp;Secure and scalable storage solutions

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-store
```

That's it! You can now use NuxtStore in your Nuxt app ✨

## Usage

### Defining a Store

To define a store, use the auto-imported `defineStore` function provided by NuxtStore. Here is an example:

```typescript
// filepath: /path/to/your/store/UserStore.ts

export const useUserStore = defineStore('user', () => ({ name: 'John Doe' }), {
  type: 'hybrid' // 'hybrid', 'client', or 'server'
})
```

### Accessing the Store

You can access the store in your components as follows:

```vue
<template>
  <div>
    <pre>{{ user }}</pre>
    <input type="text" v-model="user.name" />
  </div>
</template>

<script setup>
const user = useUserStore();
</script>
```

### Benefits Over Pinia or useState

- **Hybrid State Management**: NuxtStore allows you to manage state both on the client and server side seamlessly.
- **Client and Server Synchronization**: Automatically syncs state between client and server, ensuring consistency.
- **Easy Integration**: Designed to integrate easily with Nuxt, leveraging its powerful features.
- **Secure Storage**: Provides secure and scalable storage solutions, making it suitable for large applications.

## Documentation

For detailed documentation, please refer to the following sections:

### Configuration

You can configure the module in your `nuxt.config.ts` file:

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-store'],
  store: {
    clientID_key: 'client_id',
    prefix: 'stores',
    clientDriver: 'localStorage',
    serverDriver: {
      driver: 'fs',
      base: './.StoreData'
    }
  }
})
```

### API

#### `defineStore`

Defines a Nuxt store with the given key, factory function, and options.

- `key`: The key for the store.
- `factory`: The factory function to create the initial state.
- `options`: Optional store options.

#### Options

- `global`: Whether the store is global.
- `type`: The type of store (`'hybrid'`, `'client'`, or `'server'`).

### Example

Here is a complete example of using NuxtStore in a Nuxt application:

```typescript
// filepath: /path/to/your/store/UserStore.ts

export const useUserStore = defineStore('user', () => ({ name: 'John Doe' }), {
  type: 'hybrid'
})
```

```vue
<template>
  <div>
    <pre>{{ user }}</pre>
    <input type="text" v-model="user.name" />
  </div>
</template>

<script setup>
const user = await useUserStore();
</script>
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-store/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-store

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-store.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-store

[license-src]: https://img.shields.io/npm/l/nuxt-store.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-store

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com