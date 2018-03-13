# Boilerplate

Compact Boilerplate powered by [webpack][webpack] and [browser-sync][browser-sync].

Requires nodejs v8.0.0 & npm v5.1.0.

## Starting up

```sh
npm install
npm start
```

## Tasks

```sh
npm run -
        start  # gives you a list of choices what to run
        serve  # starts up a dev-server
        build  # builds the source files into _build
        bundle # builds the source files and merge them with public into _dist
        test   # runs the unit tests with jest
```

[webpack]: https://webpack.js.org/
[browser-sync]: https://www.browsersync.io/

## import resolves

all imports made by the extensions `.js`, `.jsx`, `.scss`, `.css` are resolved to the `./source` folder. So you can import everything both relative to the file location and the source directory. Example:

`.js`, `.jsx`

```javascript
// from `./node_modules`
import { merge } from 'lodash'
// alias source from `./source`
import { Button } from 'source/view/components'
// relative from file
import something from '../../something'
```

`.scss`, `.css`

```scss
// with ~ from `./node_modules/normalize.css/normalize.css`
@import '~normalize.css/normalize.css';
// resolves in order from relative to `./source` to error
@import 'styles/variables';
```