# eslint-plugin-unimport-components

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Insert Components imports automatically in ESLint.

## Usages

### With Nuxt

You can use the [nuxt-eslint-auto-components-import](https://github.com/ilyaliao/nuxt-eslint-auto-components-import) module directly, which integrates this plugin.

> Suggested to use with [nuxt-eslint-auto-explicit-import](https://github.com/antfu/nuxt-eslint-auto-explicit-import)

### With `unplugin-vue-components`

> [!IMPORTANT]
> Only supports `unplugin-vue-components` v28.5.0 or above

In your `vite.config.ts`:

```ts
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Components({
      // other options...
      dumpComponentsInfo: true // <---
    })
  ]
})
```

And in your `eslint.config.js`:

```js
import fs from 'node:fs'
import { createAutoComponentsInsert } from 'eslint-plugin-unimport-components'

export default [
  // your other configs...
  createAutoComponentsInsert({
    imports: JSON.parse(fs.readFileSync('.components-info.json', 'utf-8'))
  }),
]
```

### Setup Manually

Refer to [this file](./eslint.config.ts), where you can setup file paths and use it to insert imports.

## Credits

- This project is heavily inspired by [eslint-plugin-unimport](https://github.com/antfu/eslint-plugin-unimport)

## License

[MIT](./LICENSE) License © [IlyaL](https://github.com/ilyaliao)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/eslint-plugin-unimport-components?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-plugin-unimport-components
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-plugin-unimport-components?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-plugin-unimport-components
[bundle-src]: https://img.shields.io/bundlephobia/minzip/eslint-plugin-unimport-components?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=eslint-plugin-unimport-components
[license-src]: https://img.shields.io/github/license/ilyaliao/eslint-plugin-unimport-components.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/ilyaliao/eslint-plugin-unimport-components/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/eslint-plugin-unimport-components
