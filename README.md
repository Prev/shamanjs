# ShamanJS

Programming Language Detector implemented by `JavaScript`.
Based on the repository [shaman](https://github.com/Prev/shaman), written by Python.


Implemented with Naïve Bayes Classification, and the library includes 1MB trained-set made from 100K code data set with [shaman](https://github.com/Prev/shaman) library.


## Installation

In a browser:

```html
<script src="lodash.js"></script>
```


## Usage

```javascript

var code = '\
#include <stdio.h>\
int main() {\
	printf("Hello world");\
}\
';

var r = Shaman.detect(code);
// r = [['c', 44.28, 'java', 6.3, ...]]

var detectedLanguage = r[0][0];
assert(detectedLanguage == 'c');

```