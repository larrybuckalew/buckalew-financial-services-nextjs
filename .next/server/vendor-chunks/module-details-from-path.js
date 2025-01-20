"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/module-details-from-path";
exports.ids = ["vendor-chunks/module-details-from-path"];
exports.modules = {

/***/ "(instrument)/./node_modules/module-details-from-path/index.js":
/*!********************************************************!*\
  !*** ./node_modules/module-details-from-path/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar path = __webpack_require__(/*! path */ \"path\");\nmodule.exports = function (file) {\n  var segments = file.split(path.sep);\n  var index = segments.lastIndexOf('node_modules');\n  if (index === -1) return;\n  if (!segments[index + 1]) return;\n  var scoped = segments[index + 1][0] === '@';\n  var name = scoped ? segments[index + 1] + '/' + segments[index + 2] : segments[index + 1];\n  var offset = scoped ? 3 : 2;\n  return {\n    name: name,\n    basedir: segments.slice(0, index + offset).join(path.sep),\n    path: segments.slice(index + offset).join(path.sep)\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vbm9kZV9tb2R1bGVzL21vZHVsZS1kZXRhaWxzLWZyb20tcGF0aC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBWTs7QUFFWixJQUFJQSxJQUFJLEdBQUdDLG1CQUFPLENBQUMsa0JBQU0sQ0FBQztBQUUxQkMsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBVUMsSUFBSSxFQUFFO0VBQy9CLElBQUlDLFFBQVEsR0FBR0QsSUFBSSxDQUFDRSxLQUFLLENBQUNOLElBQUksQ0FBQ08sR0FBRyxDQUFDO0VBQ25DLElBQUlDLEtBQUssR0FBR0gsUUFBUSxDQUFDSSxXQUFXLENBQUMsY0FBYyxDQUFDO0VBQ2hELElBQUlELEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNsQixJQUFJLENBQUNILFFBQVEsQ0FBQ0csS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQzFCLElBQUlFLE1BQU0sR0FBR0wsUUFBUSxDQUFDRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztFQUMzQyxJQUFJRyxJQUFJLEdBQUdELE1BQU0sR0FBR0wsUUFBUSxDQUFDRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHSCxRQUFRLENBQUNHLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBR0gsUUFBUSxDQUFDRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQ3pGLElBQUlJLE1BQU0sR0FBR0YsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDO0VBQzNCLE9BQU87SUFDTEMsSUFBSSxFQUFFQSxJQUFJO0lBQ1ZFLE9BQU8sRUFBRVIsUUFBUSxDQUFDUyxLQUFLLENBQUMsQ0FBQyxFQUFFTixLQUFLLEdBQUdJLE1BQU0sQ0FBQyxDQUFDRyxJQUFJLENBQUNmLElBQUksQ0FBQ08sR0FBRyxDQUFDO0lBQ3pEUCxJQUFJLEVBQUVLLFFBQVEsQ0FBQ1MsS0FBSyxDQUFDTixLQUFLLEdBQUdJLE1BQU0sQ0FBQyxDQUFDRyxJQUFJLENBQUNmLElBQUksQ0FBQ08sR0FBRztFQUNwRCxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2J1Y2thbGV3LWZpbmFuY2lhbC1zZXJ2aWNlcy8uL25vZGVfbW9kdWxlcy9tb2R1bGUtZGV0YWlscy1mcm9tLXBhdGgvaW5kZXguanM/MWY5NSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZmlsZSkge1xuICB2YXIgc2VnbWVudHMgPSBmaWxlLnNwbGl0KHBhdGguc2VwKVxuICB2YXIgaW5kZXggPSBzZWdtZW50cy5sYXN0SW5kZXhPZignbm9kZV9tb2R1bGVzJylcbiAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuXG4gIGlmICghc2VnbWVudHNbaW5kZXggKyAxXSkgcmV0dXJuXG4gIHZhciBzY29wZWQgPSBzZWdtZW50c1tpbmRleCArIDFdWzBdID09PSAnQCdcbiAgdmFyIG5hbWUgPSBzY29wZWQgPyBzZWdtZW50c1tpbmRleCArIDFdICsgJy8nICsgc2VnbWVudHNbaW5kZXggKyAyXSA6IHNlZ21lbnRzW2luZGV4ICsgMV1cbiAgdmFyIG9mZnNldCA9IHNjb3BlZCA/IDMgOiAyXG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBiYXNlZGlyOiBzZWdtZW50cy5zbGljZSgwLCBpbmRleCArIG9mZnNldCkuam9pbihwYXRoLnNlcCksXG4gICAgcGF0aDogc2VnbWVudHMuc2xpY2UoaW5kZXggKyBvZmZzZXQpLmpvaW4ocGF0aC5zZXApXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJmaWxlIiwic2VnbWVudHMiLCJzcGxpdCIsInNlcCIsImluZGV4IiwibGFzdEluZGV4T2YiLCJzY29wZWQiLCJuYW1lIiwib2Zmc2V0IiwiYmFzZWRpciIsInNsaWNlIiwiam9pbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./node_modules/module-details-from-path/index.js\n");

/***/ })

};
;