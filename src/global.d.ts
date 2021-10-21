declare module NodeJS {
    interface ProcessEnv {
        HOST: string;
        ACCESS_KEY: string;
        SECRET_KEY: string;
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
