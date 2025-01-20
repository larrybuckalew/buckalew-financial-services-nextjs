"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/has-flag";
exports.ids = ["vendor-chunks/has-flag"];
exports.modules = {

/***/ "(instrument)/./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = (flag, argv = process.argv) => {\n  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';\n  const position = argv.indexOf(prefix + flag);\n  const terminatorPosition = argv.indexOf('--');\n  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vbm9kZV9tb2R1bGVzL2hhcy1mbGFnL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxDQUFDQyxJQUFJLEVBQUVDLElBQUksR0FBR0MsT0FBTyxDQUFDRCxJQUFJLEtBQUs7RUFDL0MsTUFBTUUsTUFBTSxHQUFHSCxJQUFJLENBQUNJLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUlKLElBQUksQ0FBQ0ssTUFBTSxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSztFQUMzRSxNQUFNQyxRQUFRLEdBQUdMLElBQUksQ0FBQ00sT0FBTyxDQUFDSixNQUFNLEdBQUdILElBQUksQ0FBQztFQUM1QyxNQUFNUSxrQkFBa0IsR0FBR1AsSUFBSSxDQUFDTSxPQUFPLENBQUMsSUFBSSxDQUFDO0VBQzdDLE9BQU9ELFFBQVEsS0FBSyxDQUFDLENBQUMsS0FBS0Usa0JBQWtCLEtBQUssQ0FBQyxDQUFDLElBQUlGLFFBQVEsR0FBR0Usa0JBQWtCLENBQUM7QUFDdkYsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1Y2thbGV3LWZpbmFuY2lhbC1zZXJ2aWNlcy8uL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcz9mM2Y2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoZmxhZywgYXJndiA9IHByb2Nlc3MuYXJndikgPT4ge1xuXHRjb25zdCBwcmVmaXggPSBmbGFnLnN0YXJ0c1dpdGgoJy0nKSA/ICcnIDogKGZsYWcubGVuZ3RoID09PSAxID8gJy0nIDogJy0tJyk7XG5cdGNvbnN0IHBvc2l0aW9uID0gYXJndi5pbmRleE9mKHByZWZpeCArIGZsYWcpO1xuXHRjb25zdCB0ZXJtaW5hdG9yUG9zaXRpb24gPSBhcmd2LmluZGV4T2YoJy0tJyk7XG5cdHJldHVybiBwb3NpdGlvbiAhPT0gLTEgJiYgKHRlcm1pbmF0b3JQb3NpdGlvbiA9PT0gLTEgfHwgcG9zaXRpb24gPCB0ZXJtaW5hdG9yUG9zaXRpb24pO1xufTtcbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZmxhZyIsImFyZ3YiLCJwcm9jZXNzIiwicHJlZml4Iiwic3RhcnRzV2l0aCIsImxlbmd0aCIsInBvc2l0aW9uIiwiaW5kZXhPZiIsInRlcm1pbmF0b3JQb3NpdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./node_modules/has-flag/index.js\n");

/***/ })

};
;