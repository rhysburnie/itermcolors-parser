import fs from 'fs';
import parser from 'plist';
import {
  itermToRGBA,
  rgbaToIterm,
  rgbaToHex8
} from './color-conversion';

export default class ItermcolorsParser {
  constructor(source, type = 'path') {
    let contents = type === 'string' ? source : null;

    if (type === 'path') {
      contents = fs.readFileSync(source, 'utf8');
    }

    this.plist = parser.parse(contents);
  }

  toString() {
    return parser.build(this.plist);
  }

  getColor(name) {
    if (!this.plist[name]) {
      throw new Error(`No such color name: ${name}`);
    }
    return itermToRGBA(this.plist[name]);
  }
  
  setColor(name, value) {
    if (!this.plist[name] && !this.allowNewColors) {
      throw new Error(`No such color name: ${name}`);
    }
    this.plist[name] = rgbaToIterm(value);
  }
}
