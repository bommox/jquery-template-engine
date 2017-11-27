# jquery-template-egine
jQuery simple template engine with support for loops and conditional data

## Installation
Import this JS in your HTML
```html
<script src="https://cdn.jsdelivr.net/npm/jquery-template-engine@1.0.1"></script>
```

or install it via npm
```bash
npm i --save jquery-template-engine
```

## Usage
In your HTML, use the `data-te` attributes for preparing the templates:

```html
<h1 data-te-v="selection.country"></h1>
<p data-te-v="selection.city"></p>
<p>Other cities...</p>
<ul data-te-for="city of cities">
  <li data-te-v="city.name"></li>
</ul>
```
And then you can use:

```js
$("body").templateEngine({
    selection : {
      country: 'Spain',
      city: 'Valencia'
    },
    cities : [
      {name : 'Barcelona'},
      {name : 'Madrid'},
      {name : 'Sevilla'},
      {name : 'Valencia'}
    ]
  })
```

## Features
