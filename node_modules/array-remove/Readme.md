# array-remove

  Remove a range of elements in an array for both node.js and the browser.

## Installation

Component:

    $ component install staygrimm/array-remove

npm:

    $ npm install array-remove

## API

#### remove(array, from, [to])

Remove a range of elements from given `array`, beginning at index `from` and ending at optional index `to`.  If `to` is omitted, only the element located at index `from` will be removed.

Both `from` and `to` allow negative numbers for locating indices from the end of the array, e.g., `remove(array, -2, -1)` will remove the last and second-to-last elements from the array.

## Example

```javascript
var remove = require('remove-array');
var array = [1, 2, 3, 4];

remove(array, 0, 1); //=> [3, 4]
```

This code was originally written by John Resig: http://ejohn.org/blog/javascript-array-remove/

## License

The MIT License (MIT)

Copyright (c) 2014, River Grimm <river.grimm@gmail.com>
              2007, John Resig <jeresig@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
