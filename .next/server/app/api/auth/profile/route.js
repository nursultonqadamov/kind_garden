/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/profile/route";
exports.ids = ["app/api/auth/profile/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/profile/route.ts":
/*!***************************************!*\
  !*** ./app/api/auth/profile/route.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\nconst BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? \"http://127.0.0.1:8000\";\n/**\n * Proxy GET /api/auth/profile/ →  <BACKEND_URL>/api/auth/profile/\n */ async function GET(req) {\n    const token = req.headers.get(\"authorization\") ?? \"\";\n    const upstream = await fetch(`${BACKEND_URL}/api/auth/profile/`, {\n        headers: {\n            Authorization: token,\n            \"Content-Type\": \"application/json\"\n        }\n    });\n    const text = await upstream.text();\n    return new Response(text, {\n        status: upstream.status,\n        headers: {\n            \"Content-Type\": \"application/json\"\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvcHJvZmlsZS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTUEsY0FBY0MsUUFBUUMsR0FBRyxDQUFDQyx1QkFBdUIsSUFBSTtBQUUzRDs7Q0FFQyxHQUNNLGVBQWVDLElBQUlDLEdBQWdCO0lBQ3hDLE1BQU1DLFFBQVFELElBQUlFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG9CQUFvQjtJQUVsRCxNQUFNQyxXQUFXLE1BQU1DLE1BQU0sR0FBR1YsWUFBWSxrQkFBa0IsQ0FBQyxFQUFFO1FBQy9ETyxTQUFTO1lBQ1BJLGVBQWVMO1lBQ2YsZ0JBQWdCO1FBQ2xCO0lBQ0Y7SUFFQSxNQUFNTSxPQUFPLE1BQU1ILFNBQVNHLElBQUk7SUFFaEMsT0FBTyxJQUFJQyxTQUFTRCxNQUFNO1FBQ3hCRSxRQUFRTCxTQUFTSyxNQUFNO1FBQ3ZCUCxTQUFTO1lBQUUsZ0JBQWdCO1FBQW1CO0lBQ2hEO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9xYWRhbW92bnVyc3VsdG9uL1B5Y2hhcm1Qcm9qZWN0cy9raW5kX2dhcmRlbi9hcHAvYXBpL2F1dGgvcHJvZmlsZS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCJcblxuY29uc3QgQkFDS0VORF9VUkwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQUNLRU5EX1VSTCA/PyBcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMFwiXG5cbi8qKlxuICogUHJveHkgR0VUIC9hcGkvYXV0aC9wcm9maWxlLyDihpIgIDxCQUNLRU5EX1VSTD4vYXBpL2F1dGgvcHJvZmlsZS9cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHRva2VuID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKSA/PyBcIlwiXG5cbiAgY29uc3QgdXBzdHJlYW0gPSBhd2FpdCBmZXRjaChgJHtCQUNLRU5EX1VSTH0vYXBpL2F1dGgvcHJvZmlsZS9gLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogdG9rZW4sXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICB9KVxuXG4gIGNvbnN0IHRleHQgPSBhd2FpdCB1cHN0cmVhbS50ZXh0KClcblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKHRleHQsIHtcbiAgICBzdGF0dXM6IHVwc3RyZWFtLnN0YXR1cyxcbiAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gIH0pXG59XG4iXSwibmFtZXMiOlsiQkFDS0VORF9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQkFDS0VORF9VUkwiLCJHRVQiLCJyZXEiLCJ0b2tlbiIsImhlYWRlcnMiLCJnZXQiLCJ1cHN0cmVhbSIsImZldGNoIiwiQXV0aG9yaXphdGlvbiIsInRleHQiLCJSZXNwb25zZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/profile/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fprofile%2Froute&page=%2Fapi%2Fauth%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fprofile%2Froute&page=%2Fapi%2Fauth%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_qadamovnursulton_PycharmProjects_kind_garden_app_api_auth_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/profile/route.ts */ \"(rsc)/./app/api/auth/profile/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/profile/route\",\n        pathname: \"/api/auth/profile\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/profile/route\"\n    },\n    resolvedPagePath: \"/Users/qadamovnursulton/PycharmProjects/kind_garden/app/api/auth/profile/route.ts\",\n    nextConfigOutput,\n    userland: _Users_qadamovnursulton_PycharmProjects_kind_garden_app_api_auth_profile_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGcHJvZmlsZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRnByb2ZpbGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhdXRoJTJGcHJvZmlsZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnFhZGFtb3ZudXJzdWx0b24lMkZQeWNoYXJtUHJvamVjdHMlMkZraW5kX2dhcmRlbiUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZxYWRhbW92bnVyc3VsdG9uJTJGUHljaGFybVByb2plY3RzJTJGa2luZF9nYXJkZW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2lDO0FBQzlHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvcWFkYW1vdm51cnN1bHRvbi9QeWNoYXJtUHJvamVjdHMva2luZF9nYXJkZW4vYXBwL2FwaS9hdXRoL3Byb2ZpbGUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvcHJvZmlsZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvcHJvZmlsZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9wcm9maWxlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3FhZGFtb3ZudXJzdWx0b24vUHljaGFybVByb2plY3RzL2tpbmRfZ2FyZGVuL2FwcC9hcGkvYXV0aC9wcm9maWxlL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fprofile%2Froute&page=%2Fapi%2Fauth%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fprofile%2Froute&page=%2Fapi%2Fauth%2Fprofile%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fprofile%2Froute.ts&appDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fqadamovnursulton%2FPycharmProjects%2Fkind_garden&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();