import {test} from 'ava';
import fs from 'fs';
import path from 'path';
import parser from 'plist';
import ItermcolorsParser from './ItermcolorsParser';

const samplePath = path.resolve(__dirname, '../fixtures/iterm-dark.itermcolors');
const sampleContent = fs.readFileSync(samplePath, 'utf8');

test(t => {
  t.is(typeof parser.parse, 'function');
  t.is(typeof ItermcolorsParser, 'function');
  const sample = parser.parse(sampleContent);
  const parsed = new ItermcolorsParser(samplePath);
  t.is(typeof sample, 'object');
  t.is(typeof parsed, 'object');
  t.is(typeof parsed.plist, 'object');
  t.deepEqual(sample['Ansi 1 Color'], parsed.plist['Ansi 1 Color']);
});

test('.toString()', t => {
  const parsed = new ItermcolorsParser(samplePath);
  t.is(typeof parsed.toString, 'function');
  const content = parsed.toString();
  /**
   * Note: the string won't be the same
   * because the `plist.build()` will convert
   * <real> numbers like 0 or 1 to <integer>
   * so need to parse result to compare same keys
   */
  t.is(typeof content, 'string');
  const parsed2 = new ItermcolorsParser(content, 'string');
  t.deepEqual(Object.keys(parsed.plist), Object.keys(parsed2.plist));
});

test('.getColor', t => {
  const parsed = new ItermcolorsParser(samplePath);
  t.is(typeof parsed.getColor, 'function');
  const color = parsed.getColor('Ansi 1 Color');
  const rawColor = parsed.plist['Ansi 1 Color'];
  t.true(Array.isArray(color));
  const [r,g,b,a] = color;
  t.is(g, rawColor['Green Component'] * 255);
  t.is(r, rawColor['Red Component'] * 255)
  t.is(b, rawColor['Blue Component'] * 255);
  t.is(a, rawColor['Alpha Component']);
  const error = t.throws(() => {
    parsed.getColor('Nope');
  }, Error);
  t.is(error.message, 'No such color name: Nope');
});

test('.setColor', t => {
  const parsed = new ItermcolorsParser(samplePath);
  t.is(typeof parsed.setColor, 'function');
  const original = parsed.getColor('Ansi 1 Color');
  parsed.setColor('Ansi 1 Color', [0,0,0,0]);
  const now = parsed.getColor('Ansi 1 Color');
  t.not(original, now);
});
