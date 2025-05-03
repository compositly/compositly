# Compositly

[![npm](https://img.shields.io/npm/v/compositly-lib-react.svg)](https://www.npmjs.com/package/compositly)
[![GitHub issues](https://img.shields.io/github/issues/compositly/compositly.svg)](

This is a LIB-react for the Compositly project. It is a React component library

# How to use?

Use the official documentation at [compositly.com](https://docs.compositly.com/) to learn how to use the SDK.

## Development

Install dependencies

```bash
  npm install
```

CI/CD

```bash
  npm run ci
```

Start the development server

```bash
  npm run dev
```

After making changes to the code, run the following command to format the code, run the linter, and start the development server:

```bash
  npm run css && npm run lint && npm run format && npm ci:compile
```

**WARNING** : Don't forget to remove unused css classes from the `public/output.css` file becase tailwind.css generates a lot of unused css classes.

## NPM Scripts

| Script          | Description                                                                                      |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| `dev`           | Starts the development server                                                                    |
| `css`           | Builds the CSS                                                                                   |
| `css:dev`       | Builds the CSS in development mode                                                               |
| `test`          | Runs the tests and generates a coverage report                                                   |
| `lint`          | Runs the linter                                                                                  |
| `lint:fix`      | Runs the linter and fixes the errors                                                             |
| `format`        | Formats the code                                                                                 |
| `build`         | Builds the app for production                                                                    |
| `preview`       | Builds the app for production and previews it locally                                            |
| `ci`            | Runs the tests, linter, and code formatter                                                       |
| `stories`       | Starts the Storybook server                                                                      |
| `stories:build` | Builds the Storybook app for production                                                          |
| `docs`          | Starts the documentation server                                                                  |
| `docs:build`    | Builds the documentation app for production                                                      |
| `clean`         | Removes `dist`, `dist-stories`, `dist-docs`, `package-lock.json`, `.coverage` and `node_modules` |

## Usage/Examples

```javascript
import 'compositly/public/output.css' // Import Tailwind CSS
import {
  // components
  // helpers
  // hooks
  // services
  // stores
} from 'compositly'
import { useState } from 'react'

export default function App() {
  return (
    <div>
      {/* Your components go here */}
    </div>
  )
}
```

## Authors

compositly.com Team
