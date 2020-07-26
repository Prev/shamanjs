const _ = require('lodash');
const model = require('./model.json');

class KeywordFetcher {

    static fetch(code) {
        const ret = {};

        const prog = /([a-zA-Z0-9$*#@_-]+)/g;
        const matchedTokens = this._removeStrings(code).match(prog);

        if (matchedTokens) {
            for (const token of matchedTokens) {
                if (token.length <= 1) continue;
                if (this._isNumeric(token)) continue;

                if (token[0] === '-' || token[0] === '*')
                    token = token.substr(1);
                if (token[token.length - 1] === '-' || token[token.length - 1] === '*')
                    token = token.substr(0, token.length - 1);

                if (token.length <= 1)
                    continue;
                if (!ret[token])
                    ret[token] = 0;

                ++ret[token];
            }
        }
        return ret;
    }

    static _isNumeric(s) {
        return !isNaN(s - parseFloat(s));
    }

    static _removeStrings(code) {
        let ret = "";
        let isStringNow = null;

        for (let i = 0; i < code.length; i++) {
            let appendThisTurn = false;

            if (code[i] === "'" && (i === 0 || code[i-1] !== '\\')) {
                if (isStringNow === "'")
                    isStringNow = null;

                else if (isStringNow === null) {
                    isStringNow = "'";
                    appendThisTurn = true;
                }

            }else if (code[i] === '"' && (i === 0 || code[i-1] !== '\\')) {
                if (isStringNow === '"')
                    isStringNow = null;

                else if (isStringNow === null) {
                    isStringNow = '"';
                    appendThisTurn = true;
                }
            }

            if (isStringNow === null || appendThisTurn === true)
                ret += code[i];
        }
        return ret;
    }
}

class PatternMatcher {
    // PATTERNS = [
    //     /(<.+>[^<]*<\/.+>)|<\\?.+>/, // markup
    //     /([a-zA-Z0-9-_]+)\s*:\s*.*\s*;/, // css
    //     /def\s+([^(]+)\s*\([^)]*\)\s*:/, // python
    //     /function\s+\([^)]*\)\s*{[^}]*}/, // js-style function
    //     /var\s+[a-zA-Z0-9_$]+/, // js-style var
    //     /\$[a-zA-Z0-9_$]+/, // sigil style var
    //     /\([^)]*\)\s*{[^}]*}/, // c-style block
    // ];

    static getratio(pattern, code) {
        if (code.length === 0)
            return 0;

        const re = new RegExp(pattern, 'g');
        const replacedCode = code.replace(re, '');
        return (code.length - replacedCode.length) / code.length;
    }

}

/**
 * Detect Programming Language from Code
 * @param code: Code Text
 * @returns Array of Pair (Language, Probability) sorted by Probability DESC
 */
function detect(code) {
    const probabilities = {};
    const keywords = KeywordFetcher.fetch(code);
    const languagesSupported = model['languages'];

    for (const keyword of _.keys(keywords)) {
        if (!model['keywords'][keyword])
            continue;

        const data = model['keywords'][keyword];
        const p_avg = _.sum(data) / data.length; // Average probability of all languages

        data.forEach((prob, langId) => {
            const p = prob / p_avg;
            const language = languagesSupported[langId];
            probabilities[language] = _.get(probabilities, language, 0) + Math.log(1 + p);
        });
    }

    for (const pattern in model['patterns']) {
        const data = model['patterns'][pattern];
        const p0 = PatternMatcher.getratio(pattern, code);

        data.forEach((p_avg, langId) => {
            const language = languagesSupported[langId];
            if (!probabilities[language])
                return;

            const p = 1 - Math.abs(p_avg - p0);
            probabilities[language] *= p;
        });
    }

    // Convert `log` operated probability to percentile
    const sum_val = _.sumBy(_.values(probabilities), p => Math.pow(Math.E / 2, p));

    _.forIn(probabilities, (p, language) => {
        probabilities[language] = Math.pow(Math.E / 2, p) / sum_val * 100
    });

    return _.sortBy(_.toPairs(probabilities), o=>o[1]).reverse();
}

module.exports = {
    'detect': detect,
    'KeywordFetcher': KeywordFetcher,
};
