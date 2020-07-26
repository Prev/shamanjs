[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Prev/shamanjs/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Prev/shamanjs.svg)](https://travis-ci.org/Prev/shamanjs)
[![npm version](https://badge.fury.io/js/shamanld.svg)](https://www.npmjs.com/package/shamanld)

# ShamanJS

Programming Language Detector implemented in JavaScript.
Based on the repository [shaman](https://github.com/Prev/shaman), which is written in Python.

Languages supported:
`ASP`, `Bash`, `C`, `C#`, `CSS`, `HTML`, `Java`, `JavaScript`,
`Objective-c`, `PHP`, `Python`, `Ruby`, `SQL`, `Swift`, and `XML`.

Pre-trained model is included in this library, where the size of the model is **617KB**.
The accuracy of the model is **78%**, where the model is trained with 120K codes and tested with 40K codes.

Note that the included model consists of many raw texts, so enabling compression (e.g., gzip) on the CDN when serving the JS file greatly affects the time and cost to download the file.

See demo on [RunKit](https://runkit.com/prev/runkit-npm-shamanld).

## Getting Started

### Installation

In a browser:

```html
<script src="dist/shaman.js"></script>
```

Using npm:

```bash
$ npm i --save shamanld
```


### How to use

```javascript

const code = `
#include <stdio.h>
int main() {
	printf("Hello world");
}`;

const r = Shaman.detect(code);
// r = [['c', 44.28, 'java', 6.3, ...]]

const detectedLanguage = r[0][0];
assert(detectedLanguage == 'c');

```
