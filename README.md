## `ItermcolorsParser(source, type = 'path')`

The main utility - parses iTerm's `.itermcolors` plist file to js object.

```
import 'path' from 'path';
import ItermcolorsParser from 'itermcolors-parser';

const pathToFile = path.resolve(__dirname, './path-from-here-to/target-file.itermcolors');
const itermColors = new ItermcolorsParser(pathToFile);

console.log(itermColors.getColor('Background Color');
```

you can change colors...

```
const blue = [0, 0, 200, 0.9];
itermColors.setColor('Ansi 1 Color', blue);
```

if you want to write the file out somewhere...

```
const plistString = itermColors.getString();
fs.writeFile(targetPath, plistString, err => {
  if(err) {
    throw err;
  }
  console.log('file written');
});
```

## `rgbaToHex8(rgba)`

Function that converts a rgba array into a 8 digit hex string.

```
import {rgbaToHex8} from 'itermcolors-parser';
const rgba = [255,0,0,1];
const hex8 = rgbaToHex8(rgba);
console.log(hex8); // '#ff0000ff'
```

## `itermToRGBA(obj)`

> Used by `ItermcolorsParser` to convert a iterm color object into a rgba array

example iterm color object

```
{
  'Red Component': 0.789775550365448,
  'Green Component': 0.10676553100347519,
  'Blue Component': 0.0,
  'Alpha Component': 0.5245,
  'Color Space': 'sRGB'
}
```

## `rgbaToIterm(rgba)`

> Used by `ItermcolorsParser` to convert a rgba array into a iterm color object

## `rgbaFloatToStandard(rgba)` _(float array - values 0-1)_

> Used by `itermToRGBA`

Converts float style rgba array into a standard rgba array.

Example: `[1,1,1,0.5]` into `[255,255,255,0.5]`

## `rgbaStandardToFloat`

> Used by `rgbaToIterm`

Converts standard rgba array into a float style rgba array.

Example: `[255,255,255,0.5]` into `[1,1,1,0.5]`

## `hex8Component`

> Used by `rgbaToHex8` to convert each number into a 2 digit hex string

Example: `0` into `'00'` and `255` into `'ff'`

* _values are rounded_
* _`rgbaToHex8` first converts alpha (`a *= 255`)_
