/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /* should actually be a boolean, but Vite doesn't seem to convert env variables */
  readonly VITE_HIDE_BILLBOARD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
