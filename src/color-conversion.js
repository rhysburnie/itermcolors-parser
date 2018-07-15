export const TYPE_ERROR_STANDARD_RGBA_ARRAY = 
'Expects rgba array: ex. (white) [255,255,255,0.5] or rgb [255,255,255]';
export const TYPE_ERROR_FLOAT_RGBA_ARRAY = 
'Expects rgba (float) array: ex. (white) [1,1,1,0.5] or rgb [1,1,1]';
export const ERROR_MESSAGE_HEX_8_COMPONENT = 'Expected number between 0 and 255';
export const ERROR_MESSAGE_RGBA_TO_HEX_8 = TYPE_ERROR_STANDARD_RGBA_ARRAY;

const rgbaFloatArrayValid = rgba => (
  Array.isArray(rgba) &&
  rgba.length > 2 &&
  rgba.every(x => x >= 0 && x <= 1)
);

const rgbaStandardValid = rgba => (
  Array.isArray(rgba) &&
  rgba.length > 2 &&
  rgba.every(x => x >= 0 && x <= 255)
);

/**
 * @param {Array} rgba - array where [r(0-1), g(0-1), b(0-1), a(0-1)] - a (optional)
 * @returns {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)]
 */
export const rgbaFloatToStandard = rgba => {
  if (!rgbaFloatArrayValid(rgba)) {
    throw new TypeError(TYPE_ERROR_FLOAT_RGBA_ARRAY);
  }
  let [r,g,b,a] = rgba;
  return [
    r * 255,
    g * 255,
    b * 255,
   isNaN(a) ? 1 : a
  ];
}

/**
 * @param {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)] - a (optional)
 * @returns {Array} rgba - array where [r(0-1), g(0-1), b(0-1), a(0-1)]
 */
export const rgbaStandardToFloat = rgba => {
  if (!rgbaStandardValid(rgba)) {
    throw new TypeError(TYPE_ERROR_STANDARD_RGBA_ARRAY);
  }
  let [r,g,b,a] = rgba;
  return [
    r / 255,
    g / 255,
    b / 255,
   isNaN(a) ? 1 : a
  ];
}

/**
 * @param {Object} colorObject - an iTerm plist color object
 * @returns {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)]
 */
export const itermToRGBA = colorObject => {
  const r = colorObject['Red Component'];
  const g = colorObject['Green Component'];
  const b = colorObject['Blue Component'];
  const a = colorObject['Alpha Component'];
  return rgbaFloatToStandard([
    r, g, b,
    isNaN(a) ? 1 : a
  ]);
};

/**
 * @param {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)] - a (optional)
 * @returns colorObject - an iTerm plist color object (with `'Color Space': 'sRGB'`)
 */
export const rgbaToIterm = rgba => {
  if (!rgbaStandardValid(rgba)) {
    throw new TypeError(TYPE_ERROR_STANDARD_RGBA_ARRAY);
  }
  const [r,g,b,a] = rgbaStandardToFloat(rgba);
  const colorObject = {
    'Red Component': r,
    'Green Component': g,
    'Blue Component': b,
    'Alpha Component': isNaN(a) ? 1 : a,
    'Color Space': 'sRGB'
  }
  return colorObject;
};

/**
 * @param {Number} x - (0-255)
 * @returns {String} two character hex representation
 */
export const hex8Component = x => {
  if (
    typeof x !== 'number' ||
    x < 0 ||
    x > 255
  ) {
    throw new TypeError(ERROR_MESSAGE_HEX_8_COMPONENT);
  }
  const hex = Math.round(x).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * @param {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)] - a (optional)
 * @returns {String} 8 digit hex string, ex: '#000000ff` (black)
 */
export const rgbaToHex8 = rgba => {
  if (!Array.isArray(rgba)) {
    throw new TypeError(ERROR_MESSAGE_RGBA_TO_HEX_8);
  }
  let [r,g,b,a] = rgba;
  if (isNaN(a)) a = 1;
  r = hex8Component(r);
  g = hex8Component(g);
  b = hex8Component(b);
  a = hex8Component(a * 255);
  return '#' + r + g + b + a;
}
