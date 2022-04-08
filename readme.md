# BEFORE YOU PUBLISH
- Read [Libraries van Kaliber](https://docs.google.com/document/d/1FrJi-xWtKkbocyMVK5A5_hupjl5E4gD4rDvATDlxWyc/edit#heading=h.bb3md3gyf493).
- Make sure your example works.
- Make sure your package.json is correct. Have you change the library title?
- Update the bin/postInstall script. It should refer to your library.
- Update the `<title>` tag in `index.html.js`.
- Remove 'BEFORE YOU PUBLISH' and 'PUBLISHING' from this document.

# PUBLISHING
- Make sure you are added to the kaliber organization on NPM
- run `yarn publish`
- Enter a correct version, we adhere to semantic versioning (semver)
- run `git push`
- run `git push --tags`
- Send everybody an email to introduce them to your library!

# Pagination
Generate a pagination array, with null values to indicate gaps.

## Motivation
Whenever you need this, there's probably a deeper issue with the design you're implementing. Nevertheless: when you have to add pagination, it's nice to have something off the shelft. 

## Installation

```
yarn add @kaliber/pagination
```

## Usage
Short example. If your library has multiple ways to use it, show the most used one and refer to `/example` for further examples.

```jsx
import { hello } from 'library'

function Component() {
  return <div>{hello()}</div>
}
```

# Reference
Optionally add a reference, if your library needs it.

![](https://giphy.com/clips/joolstv-jools-tv-1-2-3-song-counting-Cnj6KKwag9FshBuJK5)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.