import {test} from 'ava';

import ItermcolorsParserDefault, {
  ItermcolorsParser,
  rgbaFloatToStandard,
  rgbaStandardToFloat,
  itermToRGBA,
  rgbaToIterm,
  hex8Component,
  rgbaToHex8,
} from './index';

test('public exports', t => {
  // Should be able to load the parser by default
  // or by its name (along with other exports)
  t.is(ItermcolorsParserDefault, ItermcolorsParser);
  // At this level we only need to check if they exist
  t.truthy(rgbaFloatToStandard);
  t.truthy(rgbaStandardToFloat);
  t.truthy(itermToRGBA);
  t.truthy(rgbaToIterm);
  t.truthy(hex8Component);
  t.truthy(rgbaToHex8);
});
