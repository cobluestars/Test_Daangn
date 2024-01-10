"use strict";
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
exports.id = "pages/api/save-event-data";
exports.ids = ["pages/api/save-event-data"];
exports.modules = {

/***/ "@google-cloud/pubsub":
/*!***************************************!*\
  !*** external "@google-cloud/pubsub" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@google-cloud/pubsub");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "(api)/./src/pages/api/save-event-data.ts":
/*!******************************************!*\
  !*** ./src/pages/api/save-event-data.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _google_cloud_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @google-cloud/pubsub */ \"@google-cloud/pubsub\");\n/* harmony import */ var _google_cloud_pubsub__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_google_cloud_pubsub__WEBPACK_IMPORTED_MODULE_2__);\n// /src/pages/api/save-event-data.ts\n\n\n\nconst pubSubClient = new _google_cloud_pubsub__WEBPACK_IMPORTED_MODULE_2__.PubSub();\nconst topicName = \"dataherd-step1\"; // Google Cloud Pub/Sub 토픽(주제) 이름\nfunction handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            message: \"Only POST requests are allowed\"\n        });\n    }\n    const eventData = req.body;\n    const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"db.json\");\n    //db.json에 데이터 저장\n    fs__WEBPACK_IMPORTED_MODULE_0___default().readFile(filePath, \"utf8\", (err, data)=>{\n        if (err) {\n            console.error(\"Error reading file:\", err);\n            return res.status(500).json({\n                message: \"Error reading data\"\n            });\n        }\n        // 기존 데이터를 객체 형태로 처리\n        const existingData = data ? JSON.parse(data) : {};\n        const eventId = eventData.timestamp; // 고유 식별자로 timestamp 사용 (변경 가능)\n        // 새로운 이벤트 데이터 추가\n        existingData[eventId] = eventData;\n        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFile(filePath, JSON.stringify(existingData, null, 2), (err)=>{\n            if (err) {\n                console.error(\"Error writing file:\", err);\n                return res.status(500).json({\n                    message: \"Error saving data\"\n                });\n            }\n        });\n    });\n    //db.json과 동시에, Google Cloud Pub/Sub에 데이터 전송\n    const dataBuffer = Buffer.from(JSON.stringify(eventData));\n    pubSubClient.topic(topicName).publish(dataBuffer).then((messageId)=>{\n        console.log(`Message ${messageId} published.`);\n        res.status(200).json({\n            message: \"Data saved and published sucessfully.\"\n        });\n    }).catch((err)=>{\n        console.error(\"Error publishing to Pub/Sub:\", err);\n        res.status(500).json({\n            message: \"Error publishing data\"\n        });\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3NhdmUtZXZlbnQtZGF0YS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0NBQW9DO0FBRWhCO0FBQ0k7QUFDc0I7QUFVOUMsTUFBTUcsWUFBWSxHQUFHLElBQUlELHdEQUFNLEVBQUU7QUFDakMsTUFBTUUsU0FBUyxHQUFHLGdCQUFnQixFQUFDLGlDQUFpQztBQUVyRCxTQUFTQyxPQUFPLENBQzNCQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDdEI7SUFDRSxJQUFJRCxHQUFHLENBQUNFLE1BQU0sS0FBSyxNQUFNLEVBQUU7UUFDdkIsT0FBT0QsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxPQUFPLEVBQUUsZ0NBQWdDO1NBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxNQUFNQyxTQUFTLEdBQWNOLEdBQUcsQ0FBQ08sSUFBSTtJQUNyQyxNQUFNQyxRQUFRLEdBQUdiLGdEQUFTLENBQUNlLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBRXBELGlCQUFpQjtJQUNqQmpCLGtEQUFXLENBQUNjLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQ0ssR0FBRyxFQUFFQyxJQUFJLEdBQUs7UUFDekMsSUFBSUQsR0FBRyxFQUFFO1lBQ0xFLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLHFCQUFxQixFQUFFSCxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPWixHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFQyxPQUFPLEVBQUUsb0JBQW9CO2FBQUUsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRCxvQkFBb0I7UUFDcEIsTUFBTVksWUFBWSxHQUFHSCxJQUFJLEdBQUdJLElBQUksQ0FBQ0MsS0FBSyxDQUFDTCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2pELE1BQU1NLE9BQU8sR0FBR2QsU0FBUyxDQUFDZSxTQUFTLEVBQUcsK0JBQStCO1FBRXJFLGlCQUFpQjtRQUNqQkosWUFBWSxDQUFDRyxPQUFPLENBQUMsR0FBR2QsU0FBUyxDQUFDO1FBRWxDWixtREFBWSxDQUFDYyxRQUFRLEVBQUVVLElBQUksQ0FBQ0ssU0FBUyxDQUFDTixZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUNKLEdBQUcsR0FBSztZQUNuRSxJQUFJQSxHQUFHLEVBQUU7Z0JBQ0xFLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLHFCQUFxQixFQUFFSCxHQUFHLENBQUMsQ0FBQztnQkFDMUMsT0FBT1osR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztvQkFBRUMsT0FBTyxFQUFFLG1CQUFtQjtpQkFBRSxDQUFDLENBQUM7WUFDbEUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCw0Q0FBNEM7SUFDNUMsTUFBTW1CLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxJQUFJLENBQUNSLElBQUksQ0FBQ0ssU0FBUyxDQUFDakIsU0FBUyxDQUFDLENBQUM7SUFDekRULFlBQVksQ0FBQzhCLEtBQUssQ0FBQzdCLFNBQVMsQ0FBQyxDQUFDOEIsT0FBTyxDQUFDSixVQUFVLENBQUMsQ0FDNUNLLElBQUksQ0FBQ0MsQ0FBQUEsU0FBUyxHQUFJO1FBQ2ZmLE9BQU8sQ0FBQ2dCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRUQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDL0M3QixHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE9BQU8sRUFBRSx1Q0FBdUM7U0FBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQyxDQUFDLENBQ0QyQixLQUFLLENBQUNuQixDQUFBQSxHQUFHLEdBQUk7UUFDVkUsT0FBTyxDQUFDQyxLQUFLLENBQUMsOEJBQThCLEVBQUVILEdBQUcsQ0FBQyxDQUFDO1FBQ25EWixHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE9BQU8sRUFBRSx1QkFBdUI7U0FBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdF9kYWFuZ24vLi9zcmMvcGFnZXMvYXBpL3NhdmUtZXZlbnQtZGF0YS50cz9iMDQwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC9zcmMvcGFnZXMvYXBpL3NhdmUtZXZlbnQtZGF0YS50c1xyXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gJ0Bnb29nbGUtY2xvdWQvcHVic3ViJztcclxuXHJcbnR5cGUgRXZlbnREYXRhID0ge1xyXG4gICAgZXZlbnRUeXBlOiBzdHJpbmc7XHJcbiAgICB0aW1lc3RhbXA6IHN0cmluZztcclxuICAgIGNsaWNrQ291bnQ6IG51bWJlcjtcclxuICAgIGtleXdvcmRDb3VudDogbnVtYmVyO1xyXG4gICAgcmVwZWF0Q291bnQ6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IHB1YlN1YkNsaWVudCA9IG5ldyBQdWJTdWIoKTtcclxuY29uc3QgdG9waWNOYW1lID0gJ2RhdGFoZXJkLXN0ZXAxJzsvLyBHb29nbGUgQ2xvdWQgUHViL1N1YiDthqDtlL0o7KO87KCcKSDsnbTrpoRcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIoXHJcbiAgICByZXE6IE5leHRBcGlSZXF1ZXN0LFxyXG4gICAgcmVzOiBOZXh0QXBpUmVzcG9uc2VcclxuKSB7XHJcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHsgbWVzc2FnZTogJ09ubHkgUE9TVCByZXF1ZXN0cyBhcmUgYWxsb3dlZCcgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXZlbnREYXRhOiBFdmVudERhdGEgPSByZXEuYm9keTtcclxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkYi5qc29uJyk7XHJcblxyXG4gICAgLy9kYi5qc29u7JeQIOuNsOydtO2EsCDsoIDsnqVcclxuICAgIGZzLnJlYWRGaWxlKGZpbGVQYXRoLCAndXRmOCcsIChlcnIsIGRhdGEpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHJlYWRpbmcgZmlsZTonLCBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiAnRXJyb3IgcmVhZGluZyBkYXRhJyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOq4sOyhtCDrjbDsnbTthLDrpbwg6rCd7LK0IO2Yle2DnOuhnCDsspjrpqxcclxuICAgICAgICBjb25zdCBleGlzdGluZ0RhdGEgPSBkYXRhID8gSlNPTi5wYXJzZShkYXRhKSA6IHt9O1xyXG4gICAgICAgIGNvbnN0IGV2ZW50SWQgPSBldmVudERhdGEudGltZXN0YW1wOyAgLy8g6rOg7JygIOyLneuzhOyekOuhnCB0aW1lc3RhbXAg7IKs7JqpICjrs4Dqsr0g6rCA64qlKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOyDiOuhnOyatCDsnbTrsqTtirgg642w7J207YSwIOy2lOqwgFxyXG4gICAgICAgIGV4aXN0aW5nRGF0YVtldmVudElkXSA9IGV2ZW50RGF0YTtcclxuXHJcbiAgICAgICAgZnMud3JpdGVGaWxlKGZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeShleGlzdGluZ0RhdGEsIG51bGwsIDIpLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdyaXRpbmcgZmlsZTonLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogJ0Vycm9yIHNhdmluZyBkYXRhJyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9kYi5qc29u6rO8IOuPmeyLnOyXkCwgR29vZ2xlIENsb3VkIFB1Yi9TdWLsl5Ag642w7J207YSwIOyghOyGoVxyXG4gICAgY29uc3QgZGF0YUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKEpTT04uc3RyaW5naWZ5KGV2ZW50RGF0YSkpO1xyXG4gICAgcHViU3ViQ2xpZW50LnRvcGljKHRvcGljTmFtZSkucHVibGlzaChkYXRhQnVmZmVyKVxyXG4gICAgICAgIC50aGVuKG1lc3NhZ2VJZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBNZXNzYWdlICR7bWVzc2FnZUlkfSBwdWJsaXNoZWQuYCk7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogJ0RhdGEgc2F2ZWQgYW5kIHB1Ymxpc2hlZCBzdWNlc3NmdWxseS4nIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHB1Ymxpc2hpbmcgdG8gUHViL1N1YjonLCBlcnIpO1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6ICdFcnJvciBwdWJsaXNoaW5nIGRhdGEnIH0pO1xyXG4gICAgICAgIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJmcyIsInBhdGgiLCJQdWJTdWIiLCJwdWJTdWJDbGllbnQiLCJ0b3BpY05hbWUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJldmVudERhdGEiLCJib2R5IiwiZmlsZVBhdGgiLCJqb2luIiwicHJvY2VzcyIsImN3ZCIsInJlYWRGaWxlIiwiZXJyIiwiZGF0YSIsImNvbnNvbGUiLCJlcnJvciIsImV4aXN0aW5nRGF0YSIsIkpTT04iLCJwYXJzZSIsImV2ZW50SWQiLCJ0aW1lc3RhbXAiLCJ3cml0ZUZpbGUiLCJzdHJpbmdpZnkiLCJkYXRhQnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsInRvcGljIiwicHVibGlzaCIsInRoZW4iLCJtZXNzYWdlSWQiLCJsb2ciLCJjYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/save-event-data.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/save-event-data.ts"));
module.exports = __webpack_exports__;

})();