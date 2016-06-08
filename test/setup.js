import co from 'co';
import { assert } from 'chai';

global.assert = assert;

// convert a generator to a function who take a callback
global.coCb = function (gen) {
    return function (done) {
        co(gen).then(done, done);
    };
};
