/// <reference types="react-scripts" />

interface ISrpApiEndpoints {
  FOODAPI_URI: string;
}
declare namespace NodeJS {
  interface ProcessEnv extends ISrpApiEndpoints {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
  }
}
