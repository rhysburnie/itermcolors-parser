import {test} from 'ava';

import ItermcolorsParserDefault, {
  ItermcolorsParser
} from './index';

test('public exports', t => {
  // Should be able to load the parser by default
  // or by its name (along with other exports)
  t.is(ItermcolorsParserDefault, ItermcolorsParser);
});
