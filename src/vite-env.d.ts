/// <reference types="vite/client" />
  interface ImportMetaEnv {
    readonly VITE_APP_RPC1_ENDPOINT: string
    readonly VITE_APP_API_ENDPOINT_SIX_FIVENET: string
    readonly VITE_APP_RPC1_ENDPOINT_SIX_FIVENET: string
    readonly VITE_APP_RPC2_ENDPOINT_SIX_FIVENET: string
    readonly VITE_APP_SIGN_MESSAGE: string
    readonly VITE_APP_SECRET_KEY: string
    readonly VITE_TEST: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }