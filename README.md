# ShamanJS
[![Build Status](https://travis-ci.org/Prev/shamanjs.svg)](https://travis-ci.org/Prev/shamanjs)
[![npm version](https://badge.fury.io/js/shamanld.svg)](https://www.npmjs.com/package/shamanld)

Programming Language Detector implemented by JavaScript.  
Based on the repository [shaman](https://github.com/Prev/shaman), written in Python.


Implemented with Naïve Bayes Classification, and the library includes 1MB trained-set made from 100K code data set with [shaman](https://github.com/Prev/shaman) library.


See demo on [RunKit](https://runkit.com/prev/runkit-npm-shamanld)

## Installation

In a browser:

```html
<script src="dist/shaman.js"></script>
```

Using npm:

```bash
$ npm i --save shamanld
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
