# jquery-template-egine
jQuery simple template engine with support for loops and conditional data

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
$("body").xTemplate({
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
