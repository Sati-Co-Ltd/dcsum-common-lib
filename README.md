# dcsum-common-lib

A collection of reusable TypeScript libraries including DTOs and utils shared between DCSUM services.

## Consuming this lib

Consumer projects typically import the **source** via a TypeScript `paths` mapping:

```json
// tsconfig.json (consumer)
{
    "compilerOptions": {
        "paths": { "@common-lib/*": ["lib/dcsum-common-lib/src/*"] }
    }
}
```

Because the source is consumed directly (not the built `dist`), **the consumer must install this lib's `peerDependencies` in its own `package.json`** — otherwise the build will fail with `Cannot find module ...`.

## Peer dependencies

The following packages must be installed by the consumer:

| Package  | Why                                                 |
| -------- | --------------------------------------------------- |
| `zxcvbn` | Used by `utils/isPasswordComplexityValid` (runtime) |

Install at the consumer root:

```bash
npm install zxcvbn
npm install -D @types/zxcvbn
```

Whenever a new runtime dependency is added to this lib, add it to `peerDependencies` here and update consumers accordingly. The consumer CI runs an automated `npm ls` check against every entry in `peerDependencies` to catch missing peers before build.

## Working on the lib

```bash
cd src/lib/dcsum-common-lib
npm ci
npm run build   # tsc -p tsconfig.json → dist/
```

CI: `.github/workflows/lib.yml` runs the build on any change under `src/lib/dcsum-common-lib/**`.
