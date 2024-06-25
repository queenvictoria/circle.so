# [circle](https://circle.so/) community API client

Create an API token here:
`https://circle.example.com/settings/api/new`

## Installation
```bash
$ npm install --save @circle/posts
$ npm install --save @circle/spaces
$ npm install --save-dev @circle/types
```

## Using spaces

See `spaces/spaces.test.ts`, `posts/posts.test.ts`, and `@circle/types` for
more options.

```ts
import { Spaces } from '@circle/spaces'
// Pass your API key to the constructor
const api = new Spaces({ api_key: process.env.CIRCLE_API_KEY })
const space = await api.add({ community_id: 1, name: "New space" })
console.log(space.name)
// "New space"
```

## Current support
- Spaces CRUD
- Posts CRUD

## @TODO
- Invite members
- Add members to spaces

### Debug
- Can't deliver email to Valorise.ai?

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
- Types other than Spaces and Posts

### Troubleshooting
* If VSCode doesn't recognise the imports: reopen the project.
* If VSCode or build complains about types build the `types` package first
  `npm run build:types`
* If other packages aren't seeming to build while developing remove the
  additional artefacts in `./src` and run the build script. We should fix this.
* Until we overrode the `paths` and `exclude` in `tsconfig.json` at the root level
  we had all sorts of errors with resolving packages.
