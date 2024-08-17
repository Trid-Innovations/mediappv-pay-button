# React + TypeScript + Vite

`MEDIAPPV`

## RUN THE PROJECT

- Install `pnpm`

```
npm install -g pnpm
```

- Install dependencies

```
pnmp i
```

- Start wiremock

  - Make sure docker is installed and running
  - Stubs are defined as json under the directory `./mocks/mappings`
  - The following command will start the wiremock container and start watching the directory `./mocks/mappings`, so every change made will be updated in wiremock

    ```
    pnpm run mockserver:start
    ```

  - Mocked API will be available here `http://localhost:9000/api/v1`
  - To see all registred mappings you can visit http://localhost:9000/\_\_admin/mappings

- Start the app in dev mode

```
pnpm run dev
```

- You can now start coding and you can access the app here https://local.mediappv.tech:3000/?mediappvSession=validMediappvSessionJWT
  - To trigger an invalid session you can just remove the `mediappvSession` query param or provide a token with the keyword `invalid` like https://local.mediappv.tech:3000/?mediappvSession=invalidMediappvSessionJWT
