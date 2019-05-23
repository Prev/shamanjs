const assert = require('assert');
const shaman = require('../src');

describe('Test Keyword Fetcher', function () {
    it('should fetch correct keywords', function () {
        let keywords = shaman.KeywordFetcher.fetch('var a = 100;\nconst bb = "foo"; bb = a+1;');
        assert(keywords['var'] === 1);
        assert(keywords['const'] === 1);
        assert(keywords['bb'] === 2);
        assert(!keywords.hasOwnProperty('foo'));
    });
});

describe('Test Code Detection', function () {
    it('should detect as java', function () {
        const code = `
            public static void main(){
                System.out.println("Hello")
            }
        `;
        assert(shaman.detect(code)[0][0] === 'java');
    });

    it('should detect as c', function () {
        const code = `
            #include <stdio.h>
            printf("Hello World\n");
        `;
        assert(shaman.detect(code)[0][0] === 'c');
    });

    it('should detect as html', function () {
        const code = `
            <!doctype html>
            <html>
                <head>
                    <title>Welcome</title>
                    <meta charset="utf-8">
                    <script></script>
                    <link rel="something.css" type="text/css">
                </head>
                <body></body>
            </html>
        `;
        console.log(shaman.detect(code));
        assert(shaman.detect(code)[0][0] === 'html');
    });

    it('should detect as python', function () {
        const code = `
            from flask import Flask
            import os

            app = Flask(__name__)

            @app.route('/')
            def index():
                return 'hello world'
        `;
        console.log(shaman.detect(code));
        assert(shaman.detect(code)[0][0] === 'python');
    });
});

describe('Test edge cases', function () {
    it('empty string exception', function () {
        shaman.detect('');
    });
});
