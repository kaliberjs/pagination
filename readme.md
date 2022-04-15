# Pagination
Generate an array with page numbers, with null values to indicate gaps.

## Motivation
Whenever you need this, there's probably a deeper issue with the design you're implementing. Nevertheless: when you have to add pagination, it's nice to have something off the shelft. 

## Installation

```
yarn add @kaliber/pagination
```

## Usage
Be sure to checkout the /example folder, it has an accessible example. `getPagination` only provides the bare bones data needed to render a pagination. It's up to you to make sure it's accessible. If you're not sure how, check out this article: [Accessible Pagination
](https://www.a11ymatters.com/pattern/pagination/).

```jsx
import { getPagination } from '@kaliber/pagination'

const RESULTS_PER_PAGE = 10

function Component({ page, pageCount }) {
  const pagination = getPagination({ 
    current: page, 
    max: Math.floor(pageCount / RESULTS_PER_PAGE), 
    padding: 2 
  })
  
  return (
    <nav>
      {pagination.map(x => x
        ? <a href={`?page=${x}`}>{x}</a>
        : <span>…</span>
      )}
    </nav>
  )
}
```

# Reference
`getPagination` accepts 1 option object as argument, with 3 required properties:

| Argument   | Type | Description |
|---|---|---|
| `current` | `number` | The current page |
| `max` | `number` | The maximum number of pages |
| `padding` | `number` | A positive integer, which states at least how many numbers there  should be next to the current number. There could be shown more numbers, if any gaps can be swapped with numbers to continue the number sequence |

_Example: a padding of 1_
```
1 ... 4 5 6 ... 12
^     ^   ^     ^
|     |   |     |
|     |   |     Always shown
|     Padding of 1
Always shown
```

The function returns an array with gaps denoted by a `null` value:

```js
console.log(getPagination({ current: 5, max: 11, padding: 2 })) 
// => [1, null, 3, 4, 5, 6, 7, null, 11]
```

```js
console.log(getPagination({ current: 2, max: 11, padding: 2 })) 
// => [1, 2, 3, 4, 5, 6, 7, null, 11]
```

```js
console.log(getPagination({ current: 2, max: 5, padding: 1 })) 
// => [1, 2, 3, 4, 5]
```

---

![](https://media.giphy.com/media/3o6MbdZPdSUE0FE4zC/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.
