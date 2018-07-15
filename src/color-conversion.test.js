import {test} from 'ava';

import {
  rgbaFloatToStandard,
  rgbaStandardToFloat,
  itermToRGBA,
  rgbaToIterm,
  hex8Component,
  rgbaToHex8,
  TYPE_ERROR_STANDARD_RGBA_ARRAY,
  TYPE_ERROR_FLOAT_RGBA_ARRAY,
  ERROR_MESSAGE_HEX_8_COMPONENT,
  ERROR_MESSAGE_RGBA_TO_HEX_8,
 } from './color-conversion';

const iTermSampleColor = {
  'Red Component': 0.789775550365448,
  'Green Component': 0.10676553100347519,
  'Blue Component': 0.0,
  'Alpha Component': 0.5245,
  'Color Space': 'sRGB'
};

const rgbaSampleColor = [
  iTermSampleColor['Red Component'] * 255,
  iTermSampleColor['Green Component'] * 255,
  iTermSampleColor['Blue Component'] * 255,
  iTermSampleColor['Alpha Component'],
];

test('rgbaFloatToStandard', t => {
  t.is(typeof rgbaFloatToStandard, 'function');

  let error;
  // Accepts: 4 digit arrays
  t.notThrows(() => {
    rgbaFloatToStandard([1,1,1,1]);
  });

  // Accepts: 3 digit arrays and basic number strings
  t.notThrows(() => {
    rgbaFloatToStandard(['1','1','1']);
  });

  // Rejects: numbers < 0
  error = t.throws(() => {
    rgbaFloatToStandard([-1,0,1,1]);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_FLOAT_RGBA_ARRAY);

  // Rejects: numbers > 1
  error = t.throws(() => {
    rgbaFloatToStandard([255,0,1,1]);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_FLOAT_RGBA_ARRAY);

  // Rejects: < 3 item arrays
  error = t.throws(() => {
    rgbaFloatToStandard([1,2]);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_FLOAT_RGBA_ARRAY);

  // Rejects: non number strings
  t.throws(() => {
    rgbaFloatToStandard([1,2,'FF']);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_FLOAT_RGBA_ARRAY);

  // Rejects: other color formats
  t.throws(() => {
    rgbaFloatToStandard('rgba(0,0,0,0)');
  }, TypeError);
  t.is(error.message, TYPE_ERROR_FLOAT_RGBA_ARRAY);

  const floatColor = [1,0.768,0.04,0.5];
  const expected = [
    floatColor[0] * 255,
    floatColor[1] * 255,
    floatColor[2] * 255,
    floatColor[3]
  ];
  const result = rgbaFloatToStandard(floatColor);
  t.deepEqual(expected, result);
});

test('rgbaStandardToFloat', t => {
  t.is(typeof rgbaStandardToFloat, 'function');

  let error;
  // Accepts: 4 digit arrays
  t.notThrows(() => {
    rgbaStandardToFloat([1,1,1,1]);
  });

  // Accepts: 3 digit arrays and basic number strings
  t.notThrows(() => {
    rgbaStandardToFloat(['1','1','1']);
  });

  // Rejects: numbers < 0
  error = t.throws(() => {
    rgbaStandardToFloat([-1,10,255,0]);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_STANDARD_RGBA_ARRAY);

  // Rejects: numbers > 255
  error = t.throws(() => {
    rgbaStandardToFloat([256,200,100,1]);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_STANDARD_RGBA_ARRAY);

  // Rejects: < 3 item arrays
  error = t.throws(() => {
    rgbaStandardToFloat([1,2]);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_STANDARD_RGBA_ARRAY);

  // Rejects: non number strings
  t.throws(() => {
    rgbaStandardToFloat([1,2,'FF']);
  }, TypeError);
  t.is(error.message, TYPE_ERROR_STANDARD_RGBA_ARRAY);

  // Rejects: other color formats
  t.throws(() => {
    rgbaStandardToFloat('rgba(0,0,0,0)');
  }, TypeError);
  t.is(error.message, TYPE_ERROR_STANDARD_RGBA_ARRAY);

  const standardColor = [0, 231, 127.5, .5];
  const expected = [
    standardColor[0] / 255,
    standardColor[1] / 255,
    standardColor[2] / 255,
    standardColor[3]
  ];
  const result = rgbaStandardToFloat(standardColor);
  t.deepEqual(result, expected);
});

test('itermToRGBA', t => {
  t.is(typeof itermToRGBA, 'function');
  const result = itermToRGBA(iTermSampleColor);
  t.deepEqual(result, rgbaSampleColor);
});

test('rgbaToIterm', t => {
  t.is(typeof rgbaToIterm, 'function');

  // As per `rgbaStandardToFloat`
  // must be supplied valid rgba standard array
  const error = t.throws(() => {
    rgbaToIterm();
  });
  t.is(error.message, TYPE_ERROR_STANDARD_RGBA_ARRAY);
  
  t.notThrows(() => {
    rgbaToIterm([255,255,255,0.5]);
  });

  const result = rgbaToIterm(rgbaSampleColor);
  t.deepEqual(result, iTermSampleColor);
});

test('hex8Component', t => {
  t.is(typeof hex8Component, 'function');
  let error = t.throws(() => {
    hex8Component('100');
  });
  t.is(error.message, ERROR_MESSAGE_HEX_8_COMPONENT);
  error = t.throws(() => {
    hex8Component(-1);
  });
  t.is(error.message, ERROR_MESSAGE_HEX_8_COMPONENT);
  error = t.throws(() => {
    hex8Component(256);
  });
  t.is(error.message, ERROR_MESSAGE_HEX_8_COMPONENT);
  t.is(typeof hex8Component(0), 'string');
  t.is(hex8Component(0), '00');
  t.is(hex8Component(255).toUpperCase(), 'FF');
});

test('rgbaToHex8', t => {
  t.is(typeof rgbaToHex8, 'function');
  let error = t.throws(() => {
    rgbaToHex8('rgba(0,0,0,0)');
  }, TypeError);
  t.is(error.message, ERROR_MESSAGE_RGBA_TO_HEX_8);
  error = t.throws(() => {
    rgbaToHex8(0,0,0,0);
  }, TypeError);
  t.is(error.message, ERROR_MESSAGE_RGBA_TO_HEX_8);
  t.notThrows(() => {
    rgbaToHex8([0,0,0,0]);
  }, TypeError);
  const result = rgbaToHex8([255,255,255,0]);
  t.is(typeof result, 'string');
  t.is(result.toUpperCase(), '#FFFFFF00');
});
