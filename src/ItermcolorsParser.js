import fs from 'fs';
import parser from 'plist';
import {
  itermToRGBA,
  rgbaToIterm
} from './color-conversion';

export default class ItermcolorsParser {
  /**
   * @param {String} source - path (or plist xml string) 
   * @param {String} type (optional) set to 'string' if passing a plist string
   */
  constructor(source, type = 'path') {
    let contents = type === 'string' ? source : null;

    if (type === 'path') {
      contents = fs.readFileSync(source, 'utf8');
    }

    this.plist = parser.parse(contents);
  }

  /**
   * @returns {String} plist
   */
  toString() {
    return parser.build(this.plist);
  }

  /**
   * @param {String} name - valid color name as per supplied plist
   * @returns {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)]
   */
  getColor(name) {
    if (!this.plist[name]) {
      throw new Error(`No such color name: ${name}`);
    }
    return itermToRGBA(this.plist[name]);
  }
  
  /**
   * @param {String} name - valid color name as per supplied plist
   * @param {Array} rgba - array where [r(0-255), g(0-255), b(0-255), a(0-1)] - a (optional)
   */
  setColor(name, value) {
    if (!this.plist[name] && !this.allowNewColors) {
      throw new Error(`No such color name: ${name}`);
    }
    this.plist[name] = rgbaToIterm(value);
  }
}
