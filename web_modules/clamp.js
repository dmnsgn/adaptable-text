import { g as getDefaultExportFromCjs } from './_chunks/_commonjsHelpers-jjO7Zipk.js';

var clamp_1 = clamp;
function clamp(value, min, max) {
    return min < max ? value < min ? min : value > max ? max : value : value < max ? max : value > min ? min : value;
}
var index = /*@__PURE__*/ getDefaultExportFromCjs(clamp_1);

export { index as default };
