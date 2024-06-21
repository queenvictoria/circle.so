# [circle](https://circle.so/) community API client

Create an API token here:
`https://circle.example.com/settings/api/new`

## Installation
```bash
$ npm install --save @circle/user
$ npm install --save-dev @circle/types
```

## Using user

See `tests/user.test.ts` and `@cidle/types` for more options.

```ts
import { User } from '@circle/user'
// Pass your API key to the constructor
const api = new User({ api_key: process.env.CIRCLE_API_KEY })
```

## Contributing

Uses patterns for a typescript monorepo found here:
https://blog.frankdejonge.nl/setting-up-a-typescript-mono-repo-for-scoped-packages/

### Tests

```bash
$ npm install --dev
$ cp env.sample .env
# Update .env with a Circle API key.
$ source .env
$ npm run tests
```

### Add a new package
_Following this pattern:_
https://www.yieldcode.blog/post/npm-workspaces/
https://stackoverflow.com/questions/72055371/npm-workspaces-typescript-unable-to-find-local-modules

```bash
$ npm init --workspace packages/types --scope @circle -y
$ ls -la node_modules/@circle/
```

### Require a new package

```bash
$ npm install @circle/types --workspace ./packages/spaces
$ cat packages/spaces/package.json | grep -C1 circle
$ npm ls
```

### Publishing

```bash
$ npm run build -ws
$ npm version patch -ws --verbose
# git commit and push
$ npm publish --access public -ws --verbose
```

### @TODO
- `npm run build` creates artefacts in `package/*/src` files that prevent
  interim package builds to not run which causes confusion.
- Why do we need to build while developing anyway? Shouldn't jest be able to
  run without building packages?

### Troubleshooting
* If VSCode doesn't recognise the imports: reopen the project.
* If VSCode or build complains about types build the `types` package first
  `npm run build:types`
* If other packages aren't seeming to build while developing remove the
  additional artefacts in `./src` and run the build script. We should fix this.
