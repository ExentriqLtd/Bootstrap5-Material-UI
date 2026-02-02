(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/fastclick/lib/fastclick.js
  var require_fastclick = __commonJS({
    "node_modules/fastclick/lib/fastclick.js"(exports2, module2) {
      (function() {
        "use strict";
        function FastClick2(layer, options) {
          var oldOnClick;
          options = options || {};
          this.trackingClick = false;
          this.trackingClickStart = 0;
          this.targetElement = null;
          this.touchStartX = 0;
          this.touchStartY = 0;
          this.lastTouchIdentifier = 0;
          this.touchBoundary = options.touchBoundary || 10;
          this.layer = layer;
          this.tapDelay = options.tapDelay || 200;
          this.tapTimeout = options.tapTimeout || 700;
          if (FastClick2.notNeeded(layer)) {
            return;
          }
          function bind(method, context2) {
            return function() {
              return method.apply(context2, arguments);
            };
          }
          var methods = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"];
          var context = this;
          for (var i2 = 0, l = methods.length; i2 < l; i2++) {
            context[methods[i2]] = bind(context[methods[i2]], context);
          }
          if (deviceIsAndroid) {
            layer.addEventListener("mouseover", this.onMouse, true);
            layer.addEventListener("mousedown", this.onMouse, true);
            layer.addEventListener("mouseup", this.onMouse, true);
          }
          layer.addEventListener("click", this.onClick, true);
          layer.addEventListener("touchstart", this.onTouchStart, false);
          layer.addEventListener("touchmove", this.onTouchMove, false);
          layer.addEventListener("touchend", this.onTouchEnd, false);
          layer.addEventListener("touchcancel", this.onTouchCancel, false);
          if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function(type, callback, capture) {
              var rmv = Node.prototype.removeEventListener;
              if (type === "click") {
                rmv.call(layer, type, callback.hijacked || callback, capture);
              } else {
                rmv.call(layer, type, callback, capture);
              }
            };
            layer.addEventListener = function(type, callback, capture) {
              var adv = Node.prototype.addEventListener;
              if (type === "click") {
                adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                  if (!event.propagationStopped) {
                    callback(event);
                  }
                }), capture);
              } else {
                adv.call(layer, type, callback, capture);
              }
            };
          }
          if (typeof layer.onclick === "function") {
            oldOnClick = layer.onclick;
            layer.addEventListener("click", function(event) {
              oldOnClick(event);
            }, false);
            layer.onclick = null;
          }
        }
        var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
        var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0 && !deviceIsWindowsPhone;
        var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
        var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
        var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);
        var deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
        FastClick2.prototype.needsClick = function(target) {
          switch (target.nodeName.toLowerCase()) {
            // Don't send a synthetic click to disabled inputs (issue #62)
            case "button":
            case "select":
            case "textarea":
              if (target.disabled) {
                return true;
              }
              break;
            case "input":
              if (deviceIsIOS && target.type === "file" || target.disabled) {
                return true;
              }
              break;
            case "label":
            case "iframe":
            // iOS8 homescreen apps can prevent events bubbling into frames
            case "video":
              return true;
          }
          return /\bneedsclick\b/.test(target.className);
        };
        FastClick2.prototype.needsFocus = function(target) {
          switch (target.nodeName.toLowerCase()) {
            case "textarea":
              return true;
            case "select":
              return !deviceIsAndroid;
            case "input":
              switch (target.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                  return false;
              }
              return !target.disabled && !target.readOnly;
            default:
              return /\bneedsfocus\b/.test(target.className);
          }
        };
        FastClick2.prototype.sendClick = function(targetElement, event) {
          var clickEvent, touch;
          if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
          }
          touch = event.changedTouches[0];
          clickEvent = document.createEvent("MouseEvents");
          clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
          clickEvent.forwardedTouchEvent = true;
          targetElement.dispatchEvent(clickEvent);
        };
        FastClick2.prototype.determineEventType = function(targetElement) {
          if (deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
            return "mousedown";
          }
          return "click";
        };
        FastClick2.prototype.focus = function(targetElement) {
          var length;
          if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time" && targetElement.type !== "month") {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
          } else {
            targetElement.focus();
          }
        };
        FastClick2.prototype.updateScrollParent = function(targetElement) {
          var scrollParent, parentElement;
          scrollParent = targetElement.fastClickScrollParent;
          if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
              if (parentElement.scrollHeight > parentElement.offsetHeight) {
                scrollParent = parentElement;
                targetElement.fastClickScrollParent = parentElement;
                break;
              }
              parentElement = parentElement.parentElement;
            } while (parentElement);
          }
          if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
          }
        };
        FastClick2.prototype.getTargetElementFromEventTarget = function(eventTarget) {
          if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
          }
          return eventTarget;
        };
        FastClick2.prototype.onTouchStart = function(event) {
          var targetElement, touch, selection;
          if (event.targetTouches.length > 1) {
            return true;
          }
          targetElement = this.getTargetElementFromEventTarget(event.target);
          touch = event.targetTouches[0];
          if (deviceIsIOS) {
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
              return true;
            }
            if (!deviceIsIOS4) {
              if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                event.preventDefault();
                return false;
              }
              this.lastTouchIdentifier = touch.identifier;
              this.updateScrollParent(targetElement);
            }
          }
          this.trackingClick = true;
          this.trackingClickStart = event.timeStamp;
          this.targetElement = targetElement;
          this.touchStartX = touch.pageX;
          this.touchStartY = touch.pageY;
          if (event.timeStamp - this.lastClickTime < this.tapDelay) {
            event.preventDefault();
          }
          return true;
        };
        FastClick2.prototype.touchHasMoved = function(event) {
          var touch = event.changedTouches[0], boundary = this.touchBoundary;
          if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
          }
          return false;
        };
        FastClick2.prototype.onTouchMove = function(event) {
          if (!this.trackingClick) {
            return true;
          }
          if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
          }
          return true;
        };
        FastClick2.prototype.findControl = function(labelElement) {
          if (labelElement.control !== void 0) {
            return labelElement.control;
          }
          if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
          }
          return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea");
        };
        FastClick2.prototype.onTouchEnd = function(event) {
          var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
          if (!this.trackingClick) {
            return true;
          }
          if (event.timeStamp - this.lastClickTime < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
          }
          if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
            return true;
          }
          this.cancelNextClick = false;
          this.lastClickTime = event.timeStamp;
          trackingClickStart = this.trackingClickStart;
          this.trackingClick = false;
          this.trackingClickStart = 0;
          if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
          }
          targetTagName = targetElement.tagName.toLowerCase();
          if (targetTagName === "label") {
            forElement = this.findControl(targetElement);
            if (forElement) {
              this.focus(targetElement);
              if (deviceIsAndroid) {
                return false;
              }
              targetElement = forElement;
            }
          } else if (this.needsFocus(targetElement)) {
            if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === "input") {
              this.targetElement = null;
              return false;
            }
            this.focus(targetElement);
            this.sendClick(targetElement, event);
            if (!deviceIsIOS || targetTagName !== "select") {
              this.targetElement = null;
              event.preventDefault();
            }
            return false;
          }
          if (deviceIsIOS && !deviceIsIOS4) {
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
              return true;
            }
          }
          if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
          }
          return false;
        };
        FastClick2.prototype.onTouchCancel = function() {
          this.trackingClick = false;
          this.targetElement = null;
        };
        FastClick2.prototype.onMouse = function(event) {
          if (!this.targetElement) {
            return true;
          }
          if (event.forwardedTouchEvent) {
            return true;
          }
          if (!event.cancelable) {
            return true;
          }
          if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
            if (event.stopImmediatePropagation) {
              event.stopImmediatePropagation();
            } else {
              event.propagationStopped = true;
            }
            event.stopPropagation();
            event.preventDefault();
            return false;
          }
          return true;
        };
        FastClick2.prototype.onClick = function(event) {
          var permitted;
          if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
          }
          if (event.target.type === "submit" && event.detail === 0) {
            return true;
          }
          permitted = this.onMouse(event);
          if (!permitted) {
            this.targetElement = null;
          }
          return permitted;
        };
        FastClick2.prototype.destroy = function() {
          var layer = this.layer;
          if (deviceIsAndroid) {
            layer.removeEventListener("mouseover", this.onMouse, true);
            layer.removeEventListener("mousedown", this.onMouse, true);
            layer.removeEventListener("mouseup", this.onMouse, true);
          }
          layer.removeEventListener("click", this.onClick, true);
          layer.removeEventListener("touchstart", this.onTouchStart, false);
          layer.removeEventListener("touchmove", this.onTouchMove, false);
          layer.removeEventListener("touchend", this.onTouchEnd, false);
          layer.removeEventListener("touchcancel", this.onTouchCancel, false);
        };
        FastClick2.notNeeded = function(layer) {
          var metaViewport;
          var chromeVersion;
          var blackberryVersion;
          var firefoxVersion;
          if (typeof window.ontouchstart === "undefined") {
            return true;
          }
          chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
          if (chromeVersion) {
            if (deviceIsAndroid) {
              metaViewport = document.querySelector("meta[name=viewport]");
              if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                  return true;
                }
                if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                  return true;
                }
              }
            } else {
              return true;
            }
          }
          if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
              metaViewport = document.querySelector("meta[name=viewport]");
              if (metaViewport) {
                if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                  return true;
                }
                if (document.documentElement.scrollWidth <= window.outerWidth) {
                  return true;
                }
              }
            }
          }
          if (layer.style.msTouchAction === "none" || layer.style.touchAction === "manipulation") {
            return true;
          }
          firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
          if (firefoxVersion >= 27) {
            metaViewport = document.querySelector("meta[name=viewport]");
            if (metaViewport && (metaViewport.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
              return true;
            }
          }
          if (layer.style.touchAction === "none" || layer.style.touchAction === "manipulation") {
            return true;
          }
          return false;
        };
        FastClick2.attach = function(layer, options) {
          return new FastClick2(layer, options);
        };
        if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define(function() {
            return FastClick2;
          });
        } else if (typeof module2 !== "undefined" && module2.exports) {
          module2.exports = FastClick2.attach;
          module2.exports.FastClick = FastClick2;
        } else {
          window.FastClick = FastClick2;
        }
      })();
    }
  });

  // node_modules/exif-js/exif.js
  var require_exif = __commonJS({
    "node_modules/exif-js/exif.js"(exports2, module2) {
      (function() {
        var debug = false;
        var root = this;
        var EXIF = function(obj2) {
          if (obj2 instanceof EXIF) return obj2;
          if (!(this instanceof EXIF)) return new EXIF(obj2);
          this.EXIFwrapped = obj2;
        };
        if (typeof exports2 !== "undefined") {
          if (typeof module2 !== "undefined" && module2.exports) {
            exports2 = module2.exports = EXIF;
          }
          exports2.EXIF = EXIF;
        } else {
          root.EXIF = EXIF;
        }
        var ExifTags = EXIF.Tags = {
          // version tags
          36864: "ExifVersion",
          // EXIF version
          40960: "FlashpixVersion",
          // Flashpix format version
          // colorspace tags
          40961: "ColorSpace",
          // Color space information tag
          // image configuration
          40962: "PixelXDimension",
          // Valid width of meaningful image
          40963: "PixelYDimension",
          // Valid height of meaningful image
          37121: "ComponentsConfiguration",
          // Information about channels
          37122: "CompressedBitsPerPixel",
          // Compressed bits per pixel
          // user information
          37500: "MakerNote",
          // Any desired information written by the manufacturer
          37510: "UserComment",
          // Comments by user
          // related file
          40964: "RelatedSoundFile",
          // Name of related sound file
          // date and time
          36867: "DateTimeOriginal",
          // Date and time when the original image was generated
          36868: "DateTimeDigitized",
          // Date and time when the image was stored digitally
          37520: "SubsecTime",
          // Fractions of seconds for DateTime
          37521: "SubsecTimeOriginal",
          // Fractions of seconds for DateTimeOriginal
          37522: "SubsecTimeDigitized",
          // Fractions of seconds for DateTimeDigitized
          // picture-taking conditions
          33434: "ExposureTime",
          // Exposure time (in seconds)
          33437: "FNumber",
          // F number
          34850: "ExposureProgram",
          // Exposure program
          34852: "SpectralSensitivity",
          // Spectral sensitivity
          34855: "ISOSpeedRatings",
          // ISO speed rating
          34856: "OECF",
          // Optoelectric conversion factor
          37377: "ShutterSpeedValue",
          // Shutter speed
          37378: "ApertureValue",
          // Lens aperture
          37379: "BrightnessValue",
          // Value of brightness
          37380: "ExposureBias",
          // Exposure bias
          37381: "MaxApertureValue",
          // Smallest F number of lens
          37382: "SubjectDistance",
          // Distance to subject in meters
          37383: "MeteringMode",
          // Metering mode
          37384: "LightSource",
          // Kind of light source
          37385: "Flash",
          // Flash status
          37396: "SubjectArea",
          // Location and area of main subject
          37386: "FocalLength",
          // Focal length of the lens in mm
          41483: "FlashEnergy",
          // Strobe energy in BCPS
          41484: "SpatialFrequencyResponse",
          //
          41486: "FocalPlaneXResolution",
          // Number of pixels in width direction per FocalPlaneResolutionUnit
          41487: "FocalPlaneYResolution",
          // Number of pixels in height direction per FocalPlaneResolutionUnit
          41488: "FocalPlaneResolutionUnit",
          // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
          41492: "SubjectLocation",
          // Location of subject in image
          41493: "ExposureIndex",
          // Exposure index selected on camera
          41495: "SensingMethod",
          // Image sensor type
          41728: "FileSource",
          // Image source (3 == DSC)
          41729: "SceneType",
          // Scene type (1 == directly photographed)
          41730: "CFAPattern",
          // Color filter array geometric pattern
          41985: "CustomRendered",
          // Special processing
          41986: "ExposureMode",
          // Exposure mode
          41987: "WhiteBalance",
          // 1 = auto white balance, 2 = manual
          41988: "DigitalZoomRation",
          // Digital zoom ratio
          41989: "FocalLengthIn35mmFilm",
          // Equivalent foacl length assuming 35mm film camera (in mm)
          41990: "SceneCaptureType",
          // Type of scene
          41991: "GainControl",
          // Degree of overall image gain adjustment
          41992: "Contrast",
          // Direction of contrast processing applied by camera
          41993: "Saturation",
          // Direction of saturation processing applied by camera
          41994: "Sharpness",
          // Direction of sharpness processing applied by camera
          41995: "DeviceSettingDescription",
          //
          41996: "SubjectDistanceRange",
          // Distance to subject
          // other tags
          40965: "InteroperabilityIFDPointer",
          42016: "ImageUniqueID"
          // Identifier assigned uniquely to each image
        };
        var TiffTags = EXIF.TiffTags = {
          256: "ImageWidth",
          257: "ImageHeight",
          34665: "ExifIFDPointer",
          34853: "GPSInfoIFDPointer",
          40965: "InteroperabilityIFDPointer",
          258: "BitsPerSample",
          259: "Compression",
          262: "PhotometricInterpretation",
          274: "Orientation",
          277: "SamplesPerPixel",
          284: "PlanarConfiguration",
          530: "YCbCrSubSampling",
          531: "YCbCrPositioning",
          282: "XResolution",
          283: "YResolution",
          296: "ResolutionUnit",
          273: "StripOffsets",
          278: "RowsPerStrip",
          279: "StripByteCounts",
          513: "JPEGInterchangeFormat",
          514: "JPEGInterchangeFormatLength",
          301: "TransferFunction",
          318: "WhitePoint",
          319: "PrimaryChromaticities",
          529: "YCbCrCoefficients",
          532: "ReferenceBlackWhite",
          306: "DateTime",
          270: "ImageDescription",
          271: "Make",
          272: "Model",
          305: "Software",
          315: "Artist",
          33432: "Copyright"
        };
        var GPSTags = EXIF.GPSTags = {
          0: "GPSVersionID",
          1: "GPSLatitudeRef",
          2: "GPSLatitude",
          3: "GPSLongitudeRef",
          4: "GPSLongitude",
          5: "GPSAltitudeRef",
          6: "GPSAltitude",
          7: "GPSTimeStamp",
          8: "GPSSatellites",
          9: "GPSStatus",
          10: "GPSMeasureMode",
          11: "GPSDOP",
          12: "GPSSpeedRef",
          13: "GPSSpeed",
          14: "GPSTrackRef",
          15: "GPSTrack",
          16: "GPSImgDirectionRef",
          17: "GPSImgDirection",
          18: "GPSMapDatum",
          19: "GPSDestLatitudeRef",
          20: "GPSDestLatitude",
          21: "GPSDestLongitudeRef",
          22: "GPSDestLongitude",
          23: "GPSDestBearingRef",
          24: "GPSDestBearing",
          25: "GPSDestDistanceRef",
          26: "GPSDestDistance",
          27: "GPSProcessingMethod",
          28: "GPSAreaInformation",
          29: "GPSDateStamp",
          30: "GPSDifferential"
        };
        var IFD1Tags = EXIF.IFD1Tags = {
          256: "ImageWidth",
          257: "ImageHeight",
          258: "BitsPerSample",
          259: "Compression",
          262: "PhotometricInterpretation",
          273: "StripOffsets",
          274: "Orientation",
          277: "SamplesPerPixel",
          278: "RowsPerStrip",
          279: "StripByteCounts",
          282: "XResolution",
          283: "YResolution",
          284: "PlanarConfiguration",
          296: "ResolutionUnit",
          513: "JpegIFOffset",
          // When image format is JPEG, this value show offset to JPEG data stored.(aka "ThumbnailOffset" or "JPEGInterchangeFormat")
          514: "JpegIFByteCount",
          // When image format is JPEG, this value shows data size of JPEG image (aka "ThumbnailLength" or "JPEGInterchangeFormatLength")
          529: "YCbCrCoefficients",
          530: "YCbCrSubSampling",
          531: "YCbCrPositioning",
          532: "ReferenceBlackWhite"
        };
        var StringValues = EXIF.StringValues = {
          ExposureProgram: {
            0: "Not defined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
          },
          MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
          },
          LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
          },
          Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
          },
          SensingMethod: {
            1: "Not defined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
          },
          SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
          },
          SceneType: {
            1: "Directly photographed"
          },
          CustomRendered: {
            0: "Normal process",
            1: "Custom process"
          },
          WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
          },
          GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
          },
          Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
          },
          Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
          },
          Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
          },
          SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
          },
          FileSource: {
            3: "DSC"
          },
          Components: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
          }
        };
        function addEvent(element, event, handler) {
          if (element.addEventListener) {
            element.addEventListener(event, handler, false);
          } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
          }
        }
        function imageHasData(img) {
          return !!img.exifdata;
        }
        function base64ToArrayBuffer(base64, contentType) {
          contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || "";
          base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, "");
          var binary = atob(base64);
          var len = binary.length;
          var buffer = new ArrayBuffer(len);
          var view = new Uint8Array(buffer);
          for (var i2 = 0; i2 < len; i2++) {
            view[i2] = binary.charCodeAt(i2);
          }
          return buffer;
        }
        function objectURLToBlob(url, callback) {
          var http2 = new XMLHttpRequest();
          http2.open("GET", url, true);
          http2.responseType = "blob";
          http2.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
              callback(this.response);
            }
          };
          http2.send();
        }
        function getImageData(img, callback) {
          function handleBinaryFile(binFile) {
            var data2 = findEXIFinJPEG(binFile);
            img.exifdata = data2 || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
              var xmpdata = findXMPinJPEG(binFile);
              img.xmpdata = xmpdata || {};
            }
            if (callback) {
              callback.call(img);
            }
          }
          if (img.src) {
            if (/^data\:/i.test(img.src)) {
              var arrayBuffer = base64ToArrayBuffer(img.src);
              handleBinaryFile(arrayBuffer);
            } else if (/^blob\:/i.test(img.src)) {
              var fileReader = new FileReader();
              fileReader.onload = function(e) {
                handleBinaryFile(e.target.result);
              };
              objectURLToBlob(img.src, function(blob) {
                fileReader.readAsArrayBuffer(blob);
              });
            } else {
              var http2 = new XMLHttpRequest();
              http2.onload = function() {
                if (this.status == 200 || this.status === 0) {
                  handleBinaryFile(http2.response);
                } else {
                  throw "Could not load image";
                }
                http2 = null;
              };
              http2.open("GET", img.src, true);
              http2.responseType = "arraybuffer";
              http2.send(null);
            }
          } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
              if (debug) console.log("Got file of length " + e.target.result.byteLength);
              handleBinaryFile(e.target.result);
            };
            fileReader.readAsArrayBuffer(img);
          }
        }
        function findEXIFinJPEG(file) {
          var dataView = new DataView(file);
          if (debug) console.log("Got file of length " + file.byteLength);
          if (dataView.getUint8(0) != 255 || dataView.getUint8(1) != 216) {
            if (debug) console.log("Not a valid JPEG");
            return false;
          }
          var offset = 2, length = file.byteLength, marker;
          while (offset < length) {
            if (dataView.getUint8(offset) != 255) {
              if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
              return false;
            }
            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);
            if (marker == 225) {
              if (debug) console.log("Found 0xFFE1 marker");
              return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);
            } else {
              offset += 2 + dataView.getUint16(offset + 2);
            }
          }
        }
        function findIPTCinJPEG(file) {
          var dataView = new DataView(file);
          if (debug) console.log("Got file of length " + file.byteLength);
          if (dataView.getUint8(0) != 255 || dataView.getUint8(1) != 216) {
            if (debug) console.log("Not a valid JPEG");
            return false;
          }
          var offset = 2, length = file.byteLength;
          var isFieldSegmentStart = function(dataView2, offset2) {
            return dataView2.getUint8(offset2) === 56 && dataView2.getUint8(offset2 + 1) === 66 && dataView2.getUint8(offset2 + 2) === 73 && dataView2.getUint8(offset2 + 3) === 77 && dataView2.getUint8(offset2 + 4) === 4 && dataView2.getUint8(offset2 + 5) === 4;
          };
          while (offset < length) {
            if (isFieldSegmentStart(dataView, offset)) {
              var nameHeaderLength = dataView.getUint8(offset + 7);
              if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
              if (nameHeaderLength === 0) {
                nameHeaderLength = 4;
              }
              var startOffset = offset + 8 + nameHeaderLength;
              var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);
              return readIPTCData(file, startOffset, sectionLength);
              break;
            }
            offset++;
          }
        }
        var IptcFieldMap = {
          120: "caption",
          110: "credit",
          25: "keywords",
          55: "dateCreated",
          80: "byline",
          85: "bylineTitle",
          122: "captionWriter",
          105: "headline",
          116: "copyright",
          15: "category"
        };
        function readIPTCData(file, startOffset, sectionLength) {
          var dataView = new DataView(file);
          var data2 = {};
          var fieldValue, fieldName, dataSize, segmentType, segmentSize;
          var segmentStartPos = startOffset;
          while (segmentStartPos < startOffset + sectionLength) {
            if (dataView.getUint8(segmentStartPos) === 28 && dataView.getUint8(segmentStartPos + 1) === 2) {
              segmentType = dataView.getUint8(segmentStartPos + 2);
              if (segmentType in IptcFieldMap) {
                dataSize = dataView.getInt16(segmentStartPos + 3);
                segmentSize = dataSize + 5;
                fieldName = IptcFieldMap[segmentType];
                fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize);
                if (data2.hasOwnProperty(fieldName)) {
                  if (data2[fieldName] instanceof Array) {
                    data2[fieldName].push(fieldValue);
                  } else {
                    data2[fieldName] = [data2[fieldName], fieldValue];
                  }
                } else {
                  data2[fieldName] = fieldValue;
                }
              }
            }
            segmentStartPos++;
          }
          return data2;
        }
        function readTags(file, tiffStart, dirStart, strings, bigEnd) {
          var entries = file.getUint16(dirStart, !bigEnd), tags = {}, entryOffset, tag, i2;
          for (i2 = 0; i2 < entries; i2++) {
            entryOffset = dirStart + i2 * 12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
          }
          return tags;
        }
        function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
          var type = file.getUint16(entryOffset + 2, !bigEnd), numValues = file.getUint32(entryOffset + 4, !bigEnd), valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart, offset, vals, val, n2, numerator, denominator;
          switch (type) {
            case 1:
            // byte, 8-bit unsigned int
            case 7:
              if (numValues == 1) {
                return file.getUint8(entryOffset + 8, !bigEnd);
              } else {
                offset = numValues > 4 ? valueOffset : entryOffset + 8;
                vals = [];
                for (n2 = 0; n2 < numValues; n2++) {
                  vals[n2] = file.getUint8(offset + n2);
                }
                return vals;
              }
            case 2:
              offset = numValues > 4 ? valueOffset : entryOffset + 8;
              return getStringFromDB(file, offset, numValues - 1);
            case 3:
              if (numValues == 1) {
                return file.getUint16(entryOffset + 8, !bigEnd);
              } else {
                offset = numValues > 2 ? valueOffset : entryOffset + 8;
                vals = [];
                for (n2 = 0; n2 < numValues; n2++) {
                  vals[n2] = file.getUint16(offset + 2 * n2, !bigEnd);
                }
                return vals;
              }
            case 4:
              if (numValues == 1) {
                return file.getUint32(entryOffset + 8, !bigEnd);
              } else {
                vals = [];
                for (n2 = 0; n2 < numValues; n2++) {
                  vals[n2] = file.getUint32(valueOffset + 4 * n2, !bigEnd);
                }
                return vals;
              }
            case 5:
              if (numValues == 1) {
                numerator = file.getUint32(valueOffset, !bigEnd);
                denominator = file.getUint32(valueOffset + 4, !bigEnd);
                val = new Number(numerator / denominator);
                val.numerator = numerator;
                val.denominator = denominator;
                return val;
              } else {
                vals = [];
                for (n2 = 0; n2 < numValues; n2++) {
                  numerator = file.getUint32(valueOffset + 8 * n2, !bigEnd);
                  denominator = file.getUint32(valueOffset + 4 + 8 * n2, !bigEnd);
                  vals[n2] = new Number(numerator / denominator);
                  vals[n2].numerator = numerator;
                  vals[n2].denominator = denominator;
                }
                return vals;
              }
            case 9:
              if (numValues == 1) {
                return file.getInt32(entryOffset + 8, !bigEnd);
              } else {
                vals = [];
                for (n2 = 0; n2 < numValues; n2++) {
                  vals[n2] = file.getInt32(valueOffset + 4 * n2, !bigEnd);
                }
                return vals;
              }
            case 10:
              if (numValues == 1) {
                return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
              } else {
                vals = [];
                for (n2 = 0; n2 < numValues; n2++) {
                  vals[n2] = file.getInt32(valueOffset + 8 * n2, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n2, !bigEnd);
                }
                return vals;
              }
          }
        }
        function getNextIFDOffset(dataView, dirStart, bigEnd) {
          var entries = dataView.getUint16(dirStart, !bigEnd);
          return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd);
        }
        function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd) {
          var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart + firstIFDOffset, bigEnd);
          if (!IFD1OffsetPointer) {
            return {};
          } else if (IFD1OffsetPointer > dataView.byteLength) {
            return {};
          }
          var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd);
          if (thumbTags["Compression"]) {
            switch (thumbTags["Compression"]) {
              case 6:
                if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                  var tOffset = tiffStart + thumbTags.JpegIFOffset;
                  var tLength = thumbTags.JpegIFByteCount;
                  thumbTags["blob"] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                    type: "image/jpeg"
                  });
                }
                break;
              case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
              default:
                console.log("Unknown thumbnail image format '%s'", thumbTags["Compression"]);
            }
          } else if (thumbTags["PhotometricInterpretation"] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
          }
          return thumbTags;
        }
        function getStringFromDB(buffer, start, length) {
          var outstr = "";
          for (n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
          }
          return outstr;
        }
        function readEXIFData(file, start) {
          if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
          }
          var bigEnd, tags, tag, exifData, gpsData, tiffOffset = start + 6;
          if (file.getUint16(tiffOffset) == 18761) {
            bigEnd = false;
          } else if (file.getUint16(tiffOffset) == 19789) {
            bigEnd = true;
          } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
          }
          if (file.getUint16(tiffOffset + 2, !bigEnd) != 42) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
          }
          var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
          if (firstIFDOffset < 8) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
            return false;
          }
          tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);
          if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
              switch (tag) {
                case "LightSource":
                case "Flash":
                case "MeteringMode":
                case "ExposureProgram":
                case "SensingMethod":
                case "SceneCaptureType":
                case "SceneType":
                case "CustomRendered":
                case "WhiteBalance":
                case "GainControl":
                case "Contrast":
                case "Saturation":
                case "Sharpness":
                case "SubjectDistanceRange":
                case "FileSource":
                  exifData[tag] = StringValues[tag][exifData[tag]];
                  break;
                case "ExifVersion":
                case "FlashpixVersion":
                  exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                  break;
                case "ComponentsConfiguration":
                  exifData[tag] = StringValues.Components[exifData[tag][0]] + StringValues.Components[exifData[tag][1]] + StringValues.Components[exifData[tag][2]] + StringValues.Components[exifData[tag][3]];
                  break;
              }
              tags[tag] = exifData[tag];
            }
          }
          if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
              switch (tag) {
                case "GPSVersionID":
                  gpsData[tag] = gpsData[tag][0] + "." + gpsData[tag][1] + "." + gpsData[tag][2] + "." + gpsData[tag][3];
                  break;
              }
              tags[tag] = gpsData[tag];
            }
          }
          tags["thumbnail"] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);
          return tags;
        }
        function findXMPinJPEG(file) {
          if (!("DOMParser" in self)) {
            return;
          }
          var dataView = new DataView(file);
          if (debug) console.log("Got file of length " + file.byteLength);
          if (dataView.getUint8(0) != 255 || dataView.getUint8(1) != 216) {
            if (debug) console.log("Not a valid JPEG");
            return false;
          }
          var offset = 2, length = file.byteLength, dom = new DOMParser();
          while (offset < length - 4) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
              var startOffset = offset - 1;
              var sectionLength = dataView.getUint16(offset - 2) - 1;
              var xmpString = getStringFromDB(dataView, startOffset, sectionLength);
              var xmpEndIndex = xmpString.indexOf("xmpmeta>") + 8;
              xmpString = xmpString.substring(xmpString.indexOf("<x:xmpmeta"), xmpEndIndex);
              var indexOfXmp = xmpString.indexOf("x:xmpmeta") + 10;
              xmpString = xmpString.slice(0, indexOfXmp) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + xmpString.slice(indexOfXmp);
              var domDocument = dom.parseFromString(xmpString, "text/xml");
              return xml2Object(domDocument);
            } else {
              offset++;
            }
          }
        }
        function xml2json(xml) {
          var json = {};
          if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
              json["@attributes"] = {};
              for (var j2 = 0; j2 < xml.attributes.length; j2++) {
                var attribute = xml.attributes.item(j2);
                json["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
            }
          } else if (xml.nodeType == 3) {
            return xml.nodeValue;
          }
          if (xml.hasChildNodes()) {
            for (var i2 = 0; i2 < xml.childNodes.length; i2++) {
              var child = xml.childNodes.item(i2);
              var nodeName = child.nodeName;
              if (json[nodeName] == null) {
                json[nodeName] = xml2json(child);
              } else {
                if (json[nodeName].push == null) {
                  var old = json[nodeName];
                  json[nodeName] = [];
                  json[nodeName].push(old);
                }
                json[nodeName].push(xml2json(child));
              }
            }
          }
          return json;
        }
        function xml2Object(xml) {
          try {
            var obj2 = {};
            if (xml.children.length > 0) {
              for (var i2 = 0; i2 < xml.children.length; i2++) {
                var item = xml.children.item(i2);
                var attributes = item.attributes;
                for (var idx in attributes) {
                  var itemAtt = attributes[idx];
                  var dataKey = itemAtt.nodeName;
                  var dataValue = itemAtt.nodeValue;
                  if (dataKey !== void 0) {
                    obj2[dataKey] = dataValue;
                  }
                }
                var nodeName = item.nodeName;
                if (typeof obj2[nodeName] == "undefined") {
                  obj2[nodeName] = xml2json(item);
                } else {
                  if (typeof obj2[nodeName].push == "undefined") {
                    var old = obj2[nodeName];
                    obj2[nodeName] = [];
                    obj2[nodeName].push(old);
                  }
                  obj2[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj2 = xml.textContent;
            }
            return obj2;
          } catch (e) {
            console.log(e.message);
          }
        }
        EXIF.enableXmp = function() {
          EXIF.isXmpEnabled = true;
        };
        EXIF.disableXmp = function() {
          EXIF.isXmpEnabled = false;
        };
        EXIF.getData = function(img, callback) {
          if ((self.Image && img instanceof self.Image || self.HTMLImageElement && img instanceof self.HTMLImageElement) && !img.complete)
            return false;
          if (!imageHasData(img)) {
            getImageData(img, callback);
          } else {
            if (callback) {
              callback.call(img);
            }
          }
          return true;
        };
        EXIF.getTag = function(img, tag) {
          if (!imageHasData(img)) return;
          return img.exifdata[tag];
        };
        EXIF.getIptcTag = function(img, tag) {
          if (!imageHasData(img)) return;
          return img.iptcdata[tag];
        };
        EXIF.getAllTags = function(img) {
          if (!imageHasData(img)) return {};
          var a, data2 = img.exifdata, tags = {};
          for (a in data2) {
            if (data2.hasOwnProperty(a)) {
              tags[a] = data2[a];
            }
          }
          return tags;
        };
        EXIF.getAllIptcTags = function(img) {
          if (!imageHasData(img)) return {};
          var a, data2 = img.iptcdata, tags = {};
          for (a in data2) {
            if (data2.hasOwnProperty(a)) {
              tags[a] = data2[a];
            }
          }
          return tags;
        };
        EXIF.pretty = function(img) {
          if (!imageHasData(img)) return "";
          var a, data2 = img.exifdata, strPretty = "";
          for (a in data2) {
            if (data2.hasOwnProperty(a)) {
              if (typeof data2[a] == "object") {
                if (data2[a] instanceof Number) {
                  strPretty += a + " : " + data2[a] + " [" + data2[a].numerator + "/" + data2[a].denominator + "]\r\n";
                } else {
                  strPretty += a + " : [" + data2[a].length + " values]\r\n";
                }
              } else {
                strPretty += a + " : " + data2[a] + "\r\n";
              }
            }
          }
          return strPretty;
        };
        EXIF.readFromBinaryFile = function(file) {
          return findEXIFinJPEG(file);
        };
        if (typeof define === "function" && define.amd) {
          define("exif-js", [], function() {
            return EXIF;
          });
        }
      }).call(exports2);
    }
  });

  // js/vendor-extra/jsonrpc.js
  var require_jsonrpc = __commonJS({
    "js/vendor-extra/jsonrpc.js"(exports, module) {
      var escapeJSONChar = /* @__PURE__ */ (function() {
        var escapeChars = ["\b", "	", "\n", "\f", "\r"];
        return function(c) {
          c = c.replace(/\t|\r\n|\n/g, "");
          if (c == '"' || c == "\\") {
            return "\\" + c;
          }
          if (c.charCodeAt(0) >= 32) {
            return c;
          }
          for (var i2 = 0; i2 < escapeChars.length; i2++) {
            if (c == escapeChars[i2]) {
              return "\\" + c;
            }
          }
          return c;
        };
      })();
      function escapeJSONString(s) {
        var parts = s.split("");
        for (var i2 = 0; i2 < parts.length; i2++) {
          parts[i2] = escapeJSONChar(parts[i2]);
        }
        return '"' + parts.join("") + '"';
      }
      function toJSON(o) {
        var marker = "$_$jabsorbed$813492";
        var markerHead;
        var fixups = [];
        function removeMarkers() {
          var next;
          while (markerHead) {
            next = markerHead[marker].prev;
            delete markerHead[marker];
            markerHead = next;
          }
        }
        var omitCircRefOrDuplicate = {};
        var json;
        function subObjToJSON(o2, p, ref) {
          var v = [], fixup, original, parent, circRef, i2;
          if (o2 === null || o2 === void 0) {
            return "null";
          } else if (typeof o2 === "string") {
            return escapeJSONString(o2);
          } else if (typeof o2 === "number") {
            return o2.toString();
          } else if (typeof o2 === "boolean") {
            return o2.toString();
          } else {
            if (o2[marker]) {
              fixup = [ref];
              parent = p;
              while (parent) {
                if (original) {
                  original.unshift(parent[marker].ref);
                }
                if (parent === o2) {
                  circRef = parent;
                  original = [circRef[marker].ref];
                }
                fixup.unshift(parent[marker].ref);
                parent = parent[marker].parent;
              }
              if (circRef) {
                if (JSONRpcClient.fixupCircRefs) {
                  fixup.shift();
                  original.shift();
                  fixups.push([fixup, original]);
                  return omitCircRefOrDuplicate;
                } else {
                  removeMarkers();
                  throw new Error("circular reference detected!");
                }
              } else {
                if (JSONRpcClient.fixupDuplicates) {
                  original = [o2[marker].ref];
                  parent = o2[marker].parent;
                  while (parent) {
                    original.unshift(parent[marker].ref);
                    parent = parent[marker].parent;
                  }
                  fixup.shift();
                  original.shift();
                  fixups.push([fixup, original]);
                  return omitCircRefOrDuplicate;
                }
              }
            } else {
              o2[marker] = { parent: p, prev: markerHead, ref };
              markerHead = o2;
            }
            if (o2.constructor === Date) {
              return '{javaClass: "java.util.Date", time: ' + o2.valueOf() + "}";
            } else if (o2.constructor === Array) {
              for (i2 = 0; i2 < o2.length; i2++) {
                json = subObjToJSON(o2[i2], o2, i2);
                v.push(json === omitCircRefOrDuplicate ? null : json);
              }
              return "[" + v.join(", ") + "]";
            } else {
              for (var attr in o2) {
                if (attr === marker) {
                } else if (o2[attr] === null || o2[attr] === void 0) {
                  v.push('"' + attr + '": null');
                } else if (typeof o2[attr] == "function") {
                } else {
                  json = subObjToJSON(o2[attr], o2, attr);
                  if (json !== omitCircRefOrDuplicate) {
                    v.push(escapeJSONString(attr) + ": " + json);
                  }
                }
              }
              return "{" + v.join(", ") + "}";
            }
          }
        }
        json = subObjToJSON(o, null, "root");
        removeMarkers();
        if (fixups.length) {
          return { json, fixups };
        } else {
          return { json };
        }
      }
      function JSONRpcClient() {
        var arg_shift = 0, req, _function, methods, self2;
        if (typeof arguments[0] == "function") {
          this.readyCB = arguments[0];
          arg_shift++;
        }
        this.serverURL = arguments[arg_shift];
        this.user = arguments[arg_shift + 1];
        this.pass = arguments[arg_shift + 2];
        this.objectID = arguments[arg_shift + 3];
        this.javaClass = arguments[arg_shift + 4];
        this.JSONRPCType = arguments[arg_shift + 5];
        if (JSONRpcClient.knownClasses[this.javaClass] && this.JSONRPCType == "CallableReference") {
          for (var name in JSONRpcClient.knownClasses[this.javaClass]) {
            _function = JSONRpcClient.knownClasses[this.javaClass][name];
            this[name] = JSONRpcClient.bind(_function, this);
          }
        } else {
          if (this.objectID) {
            this._addMethods(["listMethods"], this.javaClass);
            req = this._makeRequest("listMethods", []);
          } else {
            this._addMethods(["system.listMethods"], this.javaClass);
            req = this._makeRequest("system.listMethods", []);
          }
          if (this.readyCB) {
            self2 = this;
            req.cb = function(result, e) {
              if (!e) {
                self2._addMethods(result);
              }
              self2.readyCB(result, e);
            };
          }
          methods = this._sendRequest(req);
          if (!this.readyCB) {
            this._addMethods(methods, this.javaClass);
          }
        }
      }
      JSONRpcClient.knownClasses = {};
      JSONRpcClient.Exception = function(code, message, javaStack) {
        this.code = code;
        var name, m;
        if (javaStack) {
          this.javaStack = javaStack;
          m = javaStack.match(/^([^:]*)/);
          if (m) {
            name = m[0];
          }
        }
        if (name) {
          this.name = name;
        } else {
          this.name = "JSONRpcClientException";
        }
        this.message = message;
      };
      JSONRpcClient.Exception.CODE_REMOTE_EXCEPTION = 490;
      JSONRpcClient.Exception.CODE_ERR_CLIENT = 550;
      JSONRpcClient.Exception.CODE_ERR_PARSE = 590;
      JSONRpcClient.Exception.CODE_ERR_NOMETHOD = 591;
      JSONRpcClient.Exception.CODE_ERR_UNMARSHALL = 592;
      JSONRpcClient.Exception.CODE_ERR_MARSHALL = 593;
      JSONRpcClient.Exception.prototype = new Error();
      JSONRpcClient.Exception.prototype.toString = function(code, msg) {
        return this.name + ": " + this.message;
      };
      JSONRpcClient.default_ex_handler = function(e) {
        console.error(e);
      };
      JSONRpcClient.toplevel_ex_handler = JSONRpcClient.default_ex_handler;
      JSONRpcClient.profile_async = false;
      JSONRpcClient.max_req_active = 1;
      JSONRpcClient.requestId = 1;
      JSONRpcClient.fixupCircRefs = true;
      JSONRpcClient.fixupDuplicates = true;
      JSONRpcClient.bind = function(functionName, context) {
        return function() {
          return functionName.apply(context, arguments);
        };
      };
      JSONRpcClient.prototype._createMethod = function(methodName) {
        var serverMethodCaller = function() {
          var args = [], callback;
          for (var i2 = 0; i2 < arguments.length; i2++) {
            args.push(arguments[i2]);
          }
          if (typeof args[0] == "function") {
            callback = args.shift();
          }
          var req = this._makeRequest.call(this, methodName, args, callback);
          if (!callback) {
            return this._sendRequest.call(this, req);
          } else {
            JSONRpcClient.async_requests.push(req);
            JSONRpcClient.kick_async();
            return req.requestId;
          }
        };
        return serverMethodCaller;
      };
      JSONRpcClient.prototype._addMethods = function(methodNames, javaClass) {
        var name, obj2, names, n2, method;
        if (javaClass) {
          JSONRpcClient.knownClasses[javaClass] = {};
        }
        for (var i2 = 0; i2 < methodNames.length; i2++) {
          obj2 = this;
          names = methodNames[i2].split(".");
          for (n2 = 0; n2 < names.length - 1; n2++) {
            name = names[n2];
            if (obj2[name]) {
              obj2 = obj2[name];
            } else {
              obj2[name] = {};
              obj2 = obj2[name];
            }
          }
          name = names[names.length - 1];
          if (!obj2[name]) {
            method = this._createMethod(methodNames[i2]);
            obj2[name] = JSONRpcClient.bind(method, this);
            if (javaClass && name != "listMethods") {
              JSONRpcClient.knownClasses[javaClass][name] = method;
            }
          }
        }
      };
      JSONRpcClient._getCharsetFromHeaders = function(http2) {
        var contentType, parts, i2;
        try {
          contentType = http2.getResponseHeader("Content-type");
          parts = contentType.split(/\s*;\s*/);
          for (i2 = 0; i2 < parts.length; i2++) {
            if (parts[i2].substring(0, 8) == "charset=") {
              return parts[i2].substring(8, parts[i2].length);
            }
          }
        } catch (e) {
        }
        return "UTF-8";
      };
      JSONRpcClient.async_requests = [];
      JSONRpcClient.async_inflight = {};
      JSONRpcClient.async_responses = [];
      JSONRpcClient.async_timeout = null;
      JSONRpcClient.num_req_active = 0;
      JSONRpcClient._async_handler = function() {
        var res, req;
        JSONRpcClient.async_timeout = null;
        while (JSONRpcClient.async_responses.length > 0) {
          res = JSONRpcClient.async_responses.shift();
          if (res.canceled) {
            continue;
          }
          if (res.profile) {
            res.profile.dispatch = /* @__PURE__ */ new Date();
          }
          res.cb(res.result, res.ex, res.profile);
        }
        while (JSONRpcClient.async_requests.length > 0 && JSONRpcClient.num_req_active < JSONRpcClient.max_req_active) {
          req = JSONRpcClient.async_requests.shift();
          if (req.canceled) {
            continue;
          }
          req.client._sendRequest.call(req.client, req);
        }
      };
      JSONRpcClient.kick_async = function() {
        if (!JSONRpcClient.async_timeout) {
          JSONRpcClient.async_timeout = setTimeout(JSONRpcClient._async_handler, 0);
        }
      };
      JSONRpcClient.cancelRequest = function(requestId) {
        if (JSONRpcClient.async_inflight[requestId]) {
          JSONRpcClient.async_inflight[requestId].canceled = true;
          return true;
        }
        var i2;
        for (i2 in JSONRpcClient.async_requests) {
          if (JSONRpcClient.async_requests[i2].requestId == requestId) {
            JSONRpcClient.async_requests[i2].canceled = true;
            return true;
          }
        }
        for (i2 in JSONRpcClient.async_responses) {
          if (JSONRpcClient.async_responses[i2].requestId == requestId) {
            JSONRpcClient.async_responses[i2].canceled = true;
            return true;
          }
        }
        return false;
      };
      JSONRpcClient.prototype._makeRequest = function(methodName, args, cb) {
        var req = {};
        req.client = this;
        req.requestId = JSONRpcClient.requestId++;
        var obj2 = '{"id":' + req.requestId + ',"method":';
        if (this.objectID) {
          obj2 += '".obj#' + this.objectID + "." + methodName + '"';
        } else {
          obj2 += '"' + methodName + '"';
        }
        if (cb) {
          req.cb = cb;
        }
        if (JSONRpcClient.profile_async) {
          req.profile = { submit: /* @__PURE__ */ new Date() };
        }
        var j2 = toJSON(args);
        obj2 += ',"params":' + j2.json;
        if (j2.fixups) {
          obj2 += ',"fixups":' + toJSON(j2.fixups).json;
        }
        req.data = obj2 + "}";
        return req;
      };
      JSONRpcClient.prototype._sendRequest = function(req) {
        var http2, self2;
        if (req.profile) {
          req.profile.start = /* @__PURE__ */ new Date();
        }
        http2 = JSONRpcClient.poolGetHTTPRequest();
        JSONRpcClient.num_req_active++;
        var timeStamp = Math.random();
        var url = this.serverURL;
        if (url.indexOf("?") > 0) {
          url = url + "&t=" + timeStamp;
        } else {
          url = url + "?t=" + timeStamp;
        }
        http2.open("POST", url, !!req.cb, this.user, this.pass);
        try {
          http2.setRequestHeader("Content-type", "text/plain");
        } catch (e) {
        }
        if (req.cb) {
          self2 = this;
          http2.onreadystatechange = function() {
            var res;
            if (http2.readyState == 4) {
              http2.onreadystatechange = function() {
              };
              res = { cb: req.cb, result: null, ex: null };
              if (req.profile) {
                res.profile = req.profile;
                res.profile.end = /* @__PURE__ */ new Date();
              } else {
                res.profile = false;
              }
              try {
                res.result = self2._handleResponse(http2);
              } catch (e) {
                res.ex = e;
              }
              if (!JSONRpcClient.async_inflight[req.requestId].canceled) {
                JSONRpcClient.async_responses.push(res);
              }
              delete JSONRpcClient.async_inflight[req.requestId];
              JSONRpcClient.kick_async();
            }
          };
        } else {
          http2.onreadystatechange = function() {
          };
        }
        JSONRpcClient.async_inflight[req.requestId] = req;
        try {
          http2.send(req.data);
        } catch (e) {
          JSONRpcClient.poolReturnHTTPRequest(http2);
          JSONRpcClient.num_req_active--;
          throw new JSONRpcClient.Exception(JSONRpcClient.Exception.CODE_ERR_CLIENT, "Connection failed");
        }
        if (!req.cb) {
          delete JSONRpcClient.async_inflight[req.requestId];
          return this._handleResponse(http2);
        }
        return null;
      };
      JSONRpcClient.prototype._handleResponse = function(http) {
        function applyFixups(obj2, fixups) {
          function findOriginal(ob, original) {
            for (var i3 = 0, j3 = original.length; i3 < j3; i3++) {
              ob = ob[original[i3]];
            }
            return ob;
          }
          function applyFixup(ob, fixups2, value) {
            var j3 = fixups2.length - 1;
            for (var i3 = 0; i3 < j3; i3++) {
              ob = ob[fixups2[i3]];
            }
            ob[fixups2[j3]] = value;
          }
          for (var i2 = 0, j2 = fixups.length; i2 < j2; i2++) {
            applyFixup(obj2, fixups[i2][0], findOriginal(obj2, fixups[i2][1]));
          }
        }
        if (!this.charset) {
          this.charset = JSONRpcClient._getCharsetFromHeaders(http);
        }
        var status, statusText, data;
        try {
          status = http.status;
          statusText = http.statusText;
          data = http.responseText;
        } catch (e) {
          JSONRpcClient.poolReturnHTTPRequest(http);
          JSONRpcClient.num_req_active--;
          JSONRpcClient.kick_async();
          throw new JSONRpcClient.Exception(JSONRpcClient.Exception.CODE_ERR_CLIENT, "Connection failed");
        }
        JSONRpcClient.poolReturnHTTPRequest(http);
        JSONRpcClient.num_req_active--;
        if (status != 200) {
          throw new JSONRpcClient.Exception(status, statusText);
        }
        var obj;
        try {
          eval("obj = " + data);
        } catch (e) {
          throw new JSONRpcClient.Exception(550, "error parsing result");
        }
        if (obj.error) {
          throw new JSONRpcClient.Exception(obj.error.code, obj.error.msg, obj.error.trace);
        }
        var r = obj.result;
        var i, tmp;
        if (r) {
          if (r.objectID && r.JSONRPCType == "CallableReference") {
            return new JSONRpcClient(
              this.serverURL,
              this.user,
              this.pass,
              r.objectID,
              r.javaClass,
              r.JSONRPCType
            );
          }
          r = JSONRpcClient.extractCallableReferences(this, r);
        }
        if (obj.fixups) {
          applyFixups(r, obj.fixups);
        }
        return r;
      };
      JSONRpcClient.extractCallableReferences = function(self2, root) {
        var i2, tmp2, value;
        for (i2 in root) {
          if (typeof root[i2] == "object") {
            tmp2 = JSONRpcClient.makeCallableReference(self2, root[i2]);
            if (tmp2) {
              root[i2] = tmp2;
            } else {
              tmp2 = JSONRpcClient.extractCallableReferences(self2, root[i2]);
              root[i2] = tmp2;
            }
          }
          if (typeof i2 == "object") {
            tmp2 = JSONRpcClient.makeCallableReference(self2, i2);
            if (tmp2) {
              value = root[i2];
              delete root[i2];
              root[tmp2] = value;
            } else {
              tmp2 = JSONRpcClient.extractCallableReferences(self2, i2);
              value = root[i2];
              delete root[i2];
              root[tmp2] = value;
            }
          }
        }
        return root;
      };
      JSONRpcClient.makeCallableReference = function(self2, value) {
        if (value && value.objectID && value.javaClass && value.JSONRPCType == "CallableReference") {
          return new JSONRpcClient(self2.serverURL, self2.user, self2.pass, value.objectID, value.javaClass, value.JSONRPCType);
        }
        return null;
      };
      JSONRpcClient.http_spare = [];
      JSONRpcClient.http_max_spare = 8;
      JSONRpcClient.poolGetHTTPRequest = function() {
        if (JSONRpcClient.http_spare.length > 0) {
          return JSONRpcClient.http_spare.pop();
        }
        return JSONRpcClient.getHTTPRequest();
      };
      JSONRpcClient.poolReturnHTTPRequest = function(http2) {
        if (JSONRpcClient.http_spare.length >= JSONRpcClient.http_max_spare) {
          delete http2;
        } else {
          JSONRpcClient.http_spare.push(http2);
        }
      };
      JSONRpcClient.msxmlNames = [
        "MSXML2.XMLHTTP.6.0",
        "MSXML2.XMLHTTP.3.0",
        "MSXML2.XMLHTTP",
        "MSXML2.XMLHTTP.5.0",
        "MSXML2.XMLHTTP.4.0",
        "Microsoft.XMLHTTP"
      ];
      JSONRpcClient.getHTTPRequest = function() {
        try {
          JSONRpcClient.httpObjectName = "XMLHttpRequest";
          return new XMLHttpRequest();
        } catch (e) {
        }
        for (var i2 = 0; i2 < JSONRpcClient.msxmlNames.length; i2++) {
          try {
            JSONRpcClient.httpObjectName = JSONRpcClient.msxmlNames[i2];
            return new ActiveXObject(JSONRpcClient.msxmlNames[i2]);
          } catch (e) {
          }
        }
        JSONRpcClient.httpObjectName = null;
        throw new JSONRpcClient.Exception(0, "Can't create XMLHttpRequest object");
      };
      if (typeof window !== "undefined") {
        window.JSONRpcClient = JSONRpcClient;
      }
    }
  });

  // node_modules/enquire.js/src/QueryHandler.js
  var require_QueryHandler = __commonJS({
    "node_modules/enquire.js/src/QueryHandler.js"(exports2, module2) {
      function QueryHandler(options) {
        this.options = options;
        !options.deferSetup && this.setup();
      }
      QueryHandler.prototype = {
        constructor: QueryHandler,
        /**
         * coordinates setup of the handler
         *
         * @function
         */
        setup: function() {
          if (this.options.setup) {
            this.options.setup();
          }
          this.initialised = true;
        },
        /**
         * coordinates setup and triggering of the handler
         *
         * @function
         */
        on: function() {
          !this.initialised && this.setup();
          this.options.match && this.options.match();
        },
        /**
         * coordinates the unmatch event for the handler
         *
         * @function
         */
        off: function() {
          this.options.unmatch && this.options.unmatch();
        },
        /**
         * called when a handler is to be destroyed.
         * delegates to the destroy or unmatch callbacks, depending on availability.
         *
         * @function
         */
        destroy: function() {
          this.options.destroy ? this.options.destroy() : this.off();
        },
        /**
         * determines equality by reference.
         * if object is supplied compare options, if function, compare match callback
         *
         * @function
         * @param {object || function} [target] the target for comparison
         */
        equals: function(target) {
          return this.options === target || this.options.match === target;
        }
      };
      module2.exports = QueryHandler;
    }
  });

  // node_modules/enquire.js/src/Util.js
  var require_Util = __commonJS({
    "node_modules/enquire.js/src/Util.js"(exports2, module2) {
      function each(collection, fn) {
        var i2 = 0, length = collection.length, cont;
        for (i2; i2 < length; i2++) {
          cont = fn(collection[i2], i2);
          if (cont === false) {
            break;
          }
        }
      }
      function isArray(target) {
        return Object.prototype.toString.apply(target) === "[object Array]";
      }
      function isFunction(target) {
        return typeof target === "function";
      }
      module2.exports = {
        isFunction,
        isArray,
        each
      };
    }
  });

  // node_modules/enquire.js/src/MediaQuery.js
  var require_MediaQuery = __commonJS({
    "node_modules/enquire.js/src/MediaQuery.js"(exports2, module2) {
      var QueryHandler = require_QueryHandler();
      var each = require_Util().each;
      function MediaQuery(query, isUnconditional) {
        this.query = query;
        this.isUnconditional = isUnconditional;
        this.handlers = [];
        this.mql = window.matchMedia(query);
        var self2 = this;
        this.listener = function(mql) {
          self2.mql = mql.currentTarget || mql;
          self2.assess();
        };
        this.mql.addListener(this.listener);
      }
      MediaQuery.prototype = {
        constuctor: MediaQuery,
        /**
         * add a handler for this query, triggering if already active
         *
         * @param {object} handler
         * @param {function} handler.match callback for when query is activated
         * @param {function} [handler.unmatch] callback for when query is deactivated
         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
         */
        addHandler: function(handler) {
          var qh = new QueryHandler(handler);
          this.handlers.push(qh);
          this.matches() && qh.on();
        },
        /**
         * removes the given handler from the collection, and calls it's destroy methods
         *
         * @param {object || function} handler the handler to remove
         */
        removeHandler: function(handler) {
          var handlers = this.handlers;
          each(handlers, function(h, i2) {
            if (h.equals(handler)) {
              h.destroy();
              return !handlers.splice(i2, 1);
            }
          });
        },
        /**
         * Determine whether the media query should be considered a match
         *
         * @return {Boolean} true if media query can be considered a match, false otherwise
         */
        matches: function() {
          return this.mql.matches || this.isUnconditional;
        },
        /**
         * Clears all handlers and unbinds events
         */
        clear: function() {
          each(this.handlers, function(handler) {
            handler.destroy();
          });
          this.mql.removeListener(this.listener);
          this.handlers.length = 0;
        },
        /*
            * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
            */
        assess: function() {
          var action = this.matches() ? "on" : "off";
          each(this.handlers, function(handler) {
            handler[action]();
          });
        }
      };
      module2.exports = MediaQuery;
    }
  });

  // node_modules/enquire.js/src/MediaQueryDispatch.js
  var require_MediaQueryDispatch = __commonJS({
    "node_modules/enquire.js/src/MediaQueryDispatch.js"(exports2, module2) {
      var MediaQuery = require_MediaQuery();
      var Util = require_Util();
      var each = Util.each;
      var isFunction = Util.isFunction;
      var isArray = Util.isArray;
      function MediaQueryDispatch() {
        if (!window.matchMedia) {
          throw new Error("matchMedia not present, legacy browsers require a polyfill");
        }
        this.queries = {};
        this.browserIsIncapable = !window.matchMedia("only all").matches;
      }
      MediaQueryDispatch.prototype = {
        constructor: MediaQueryDispatch,
        /**
         * Registers a handler for the given media query
         *
         * @param {string} q the media query
         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
         * @param {function} options.match fired when query matched
         * @param {function} [options.unmatch] fired when a query is no longer matched
         * @param {function} [options.setup] fired when handler first triggered
         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
         */
        register: function(q, options, shouldDegrade) {
          var queries = this.queries, isUnconditional = shouldDegrade && this.browserIsIncapable;
          if (!queries[q]) {
            queries[q] = new MediaQuery(q, isUnconditional);
          }
          if (isFunction(options)) {
            options = { match: options };
          }
          if (!isArray(options)) {
            options = [options];
          }
          each(options, function(handler) {
            if (isFunction(handler)) {
              handler = { match: handler };
            }
            queries[q].addHandler(handler);
          });
          return this;
        },
        /**
         * unregisters a query and all it's handlers, or a specific handler for a query
         *
         * @param {string} q the media query to target
         * @param {object || function} [handler] specific handler to unregister
         */
        unregister: function(q, handler) {
          var query = this.queries[q];
          if (query) {
            if (handler) {
              query.removeHandler(handler);
            } else {
              query.clear();
              delete this.queries[q];
            }
          }
          return this;
        }
      };
      module2.exports = MediaQueryDispatch;
    }
  });

  // node_modules/enquire.js/src/index.js
  var require_src = __commonJS({
    "node_modules/enquire.js/src/index.js"(exports2, module2) {
      var MediaQueryDispatch = require_MediaQueryDispatch();
      module2.exports = new MediaQueryDispatch();
    }
  });

  // js/vendor-extra/jquery_extension.js
  var require_jquery_extension = __commonJS({
    "js/vendor-extra/jquery_extension.js"() {
      $.fn.animateRotate = function(start, angle, duration, easing, complete) {
        var args = $.speed(duration, easing, complete);
        var step2 = args.step;
        return this.each(function(i2, e) {
          args.step = function(now) {
            $.style(e, "transform", "rotate(" + now + "deg)");
            if (step2) return step2.apply(this, arguments);
          };
          $({ deg: start }).animate({ deg: angle }, args);
        });
      };
    }
  });

  // js/vendor-extra/patternSelector.js
  var require_patternSelector = __commonJS({
    "js/vendor-extra/patternSelector.js"() {
      (function($2) {
        $2.fn.patternselect = function(options) {
          var __bind = function(fn, me) {
            return function() {
              return fn.apply(me, arguments);
            };
          };
          var patterns = [];
          if (options && options.usetransparent === true) {
            patterns = [
              "pattern-modern",
              "modern-grid-1",
              "modern-grid-2",
              "modern-grid-3",
              "modern-grid-4",
              "modern-grid-5"
            ];
          } else {
            patterns = [
              "singlebg",
              "45degreee_fabric",
              "60degree_gray",
              "always_grey",
              "bghead",
              "batthern",
              "beige_paper",
              "bgnoise_lg",
              "black_denim",
              "black-Linen",
              "black_linen_v2",
              "blackmamba",
              "black_paper",
              "black_scales",
              "black_thread",
              "bright_squares",
              "broken_noise",
              "brushed_alu_dark",
              "brushed_alu",
              "candyhole",
              "carbon_fibre_big",
              "carbon_fibre",
              "carbon_fibre_v2",
              "cardboard",
              "checkered_pattern",
              "circles",
              "classy_fabric",
              "concrete_wall_2",
              "concrete_wall_3",
              "concrete_wall",
              "connect",
              "cork_1",
              "crissXcross",
              "crossed_stripes",
              "crosses",
              "cubes",
              "dark_brick_wall",
              "dark_circles",
              "darkdenim3",
              "dark_leather",
              "dark_matter",
              "dark_mosaic",
              "dark_stripes",
              "dark_wood",
              "darth_stripe",
              "denim",
              "diagmonds",
              "diagonal-noise",
              "diamonds",
              "double_lined",
              "dvsup",
              "elastoplast",
              "elegant_grid",
              "exclusive_paper",
              "fabric_1",
              "fabric_plaid",
              "fake_brick",
              "fancy_deboss",
              "felt",
              "flowers",
              "foggy_birds",
              "foil",
              "gold_scale",
              "graphy",
              "gray_sand",
              "green_dust_scratch",
              "green-fibers",
              "green_gobbler",
              "gridme",
              "grilled",
              "groovepaper",
              "grunge_wall",
              "gun_metal",
              "handmadepaper",
              "hixs_pattern_evolution",
              "inflicted",
              "irongrip",
              "knitted-netting",
              "leather_1",
              "light_alu",
              "light_checkered_tiles",
              "light_grey_floral_motif",
              "light_honeycomb",
              "lined_paper",
              "littleknobs",
              "little_pluses",
              "merely_cubed",
              "micro_carbon",
              "mirrored_squares",
              "nami",
              "noise_pattern_with_crosslines",
              "noisy",
              "old_mathematics",
              "old_wall",
              "padded",
              "paper_1",
              "paper_2",
              "paper_3",
              "paven",
              "pineapplecut",
              "pinstripe",
              "plaid",
              "polaroid",
              "polonez_car",
              "pool_table",
              "project_papper",
              "px_by_Gre3g",
              "random_grey_variations",
              "ravenna",
              "real_cf",
              "ricepaper2",
              "ricepaper",
              "rip_jobs",
              "robots",
              "rockywall",
              "roughcloth",
              "rubber_grip",
              "silver_scales",
              "small-crackle-bright",
              "small_tiles",
              "smooth_wall",
              "soft_circle_scales",
              "soft_pad",
              "soft_wallpaper",
              "square_bg",
              "squares",
              "starring",
              "struckaxiom",
              "stucco",
              "subtle_freckles",
              "subtle_orange_emboss",
              "tactile_noise",
              "texturetastic_gray",
              "triangles",
              "type",
              "vertical_cloth",
              "vichy",
              "washi",
              "wavecut",
              "white_brick_wall",
              "white_carbon",
              "whitediamond",
              "white_paperboard",
              "white_plaster",
              "white_sand",
              "white_texture",
              "whitey",
              "wood_1",
              "wood_pattern",
              "woven",
              "xv",
              "zigzag"
            ];
          }
          var settings2 = {
            style: "pattern-select",
            placeholder: "Select a Pattern",
            lookahead: 2,
            basePath: "/templates/exentriqManager3/static/img/patterns-single/"
          };
          var Patternselect = (function() {
            function Patternselect2(original, o) {
              this.$original = $2(original);
              this.options = o;
              this.active = false;
              this.setupHtml();
              this.getVisiblePatterns();
              this.bindEvents();
              var pattern = this.$original.val();
              if (!pattern || patterns.indexOf(pattern) == -1) {
                pattern = patterns[0];
                this.$original.val(pattern);
              }
              this.updateSelected();
            }
            Patternselect2.prototype.bindEvents = function() {
              $2("li", this.$results).click(__bind(this.selectPattern, this)).mouseenter(__bind(this.activatePattern, this)).mouseleave(__bind(this.deactivatePattern, this));
              $2("span", this.$select).click(__bind(this.toggleDrop, this));
              this.$arrow.click(__bind(this.toggleDrop, this));
            };
            Patternselect2.prototype.toggleDrop = function(ev) {
              if (this.active) {
                this.$element.removeClass("pattern-select-active");
                this.$drop.hide();
                clearInterval(this.visibleInterval);
              } else {
                this.$element.addClass("pattern-select-active");
                this.$drop.show();
                this.moveToSelected();
                this.visibleInterval = setInterval(__bind(this.getVisiblePatterns, this), 500);
              }
              this.active = !this.active;
            };
            Patternselect2.prototype.selectPattern = function() {
              var pattern = $2("li.active", this.$results).data("value");
              this.$original.val(pattern).change();
              this.updateSelected();
              this.toggleDrop();
            };
            Patternselect2.prototype.moveToSelected = function() {
              var $li2, pattern = this.$original.val();
              if (pattern) {
                $li2 = $2("li[data-value='" + pattern + "']", this.$results);
                if ($li2.length === 0)
                  $li2 = $2("li", this.$results).first();
              } else {
                $li2 = $2("li", this.$results).first();
              }
              this.$results.scrollTop($li2.addClass("active").position().top);
            };
            Patternselect2.prototype.activatePattern = function(ev) {
              $2("li.active", this.$results).removeClass("active");
              $2(ev.currentTarget).addClass("active");
            };
            Patternselect2.prototype.deactivatePattern = function(ev) {
              $2(ev.currentTarget).removeClass("active");
            };
            Patternselect2.prototype.updateSelected = function() {
              var pattern = this.$original.val();
              $2("span", this.$element).text("").css(this.toStyle(pattern));
            };
            Patternselect2.prototype.setupHtml = function() {
              var elementID = null;
              var originalID;
              if (originalID = this.$original.attr("id")) {
                elementID = originalID + "_patternselector";
                try {
                  $2("#" + elementID).remove();
                } catch (e) {
                }
                ;
              }
              this.$original.empty().hide();
              this.$element = $2("<div>", { "class": this.options.style, "id": elementID });
              this.$arrow = $2("<div><b></b></div>");
              this.$select = $2("<a><span>" + this.options.placeholder + "</span></a>");
              this.$drop = $2("<div>", { "class": "fs-drop" });
              this.$results = $2("<ul>", { "class": "fs-results" });
              this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop));
              this.$drop.append(this.$results.append(this.patternsAsHtml())).hide();
            };
            Patternselect2.prototype.patternsAsHtml = function() {
              var l = patterns.length;
              var r2, s, h = "";
              for (var i2 = 0; i2 < l; i2++) {
                r2 = this.toReadable(patterns[i2]);
                s = this.toStyle(patterns[i2]);
                h += '<li data-value="' + patterns[i2] + '"></li>';
              }
              return h;
            };
            Patternselect2.prototype.toReadable = function(pattern) {
              return pattern.replace(/[\+|:]/g, " ");
            };
            Patternselect2.prototype.toStyle = function(pattern) {
              var patternUrl = this.options.basePath + pattern + ".png";
              return { background: 'url("' + patternUrl + '") repeat' };
            };
            Patternselect2.prototype.getVisiblePatterns = function() {
              if (this.$results.is(":hidden")) return;
              var fs = this;
              var top = this.$results.scrollTop();
              var bottom = top + this.$results.height();
              if (this.options.lookahead) {
                var li = $2("li", this.$results).first().height();
                bottom += li * this.options.lookahead;
              }
              $2("li", this.$results).each(function() {
                var ft = $2(this).position().top + top;
                var fb = ft + $2(this).height();
                if (fb >= top && ft <= bottom) {
                  var pattern = $2(this).data("value");
                  $2(this).css(fs.toStyle(pattern));
                }
              });
            };
            return Patternselect2;
          })();
          return this.each(function(options2) {
            if (options2) $2.extend(settings2, options2);
            return new Patternselect(this, settings2);
          });
        };
      })(jQuery);
    }
  });

  // js/vendor-extra/jquery.fontselect.min.js
  var require_jquery_fontselect_min = __commonJS({
    "js/vendor-extra/jquery.fontselect.min.js"() {
      globalLoadingFont = false;
      (function($2) {
        $2.fn.fontselect = function(options) {
          var __bind = function(fn, me) {
            return function() {
              return fn.apply(me, arguments);
            };
          };
          var fonts = [
            "ABeeZee",
            "Abel",
            "Abril Fatface",
            "Aclonica",
            "Acme",
            "Actor",
            "Adamina",
            "Advent Pro",
            "Aguafina Script",
            "Akronim",
            "Aladin",
            "Aldrich",
            "Alef",
            "Alegreya",
            "Alegreya SC",
            "Alex Brush",
            "Alfa Slab One",
            "Alice",
            "Alike",
            "Alike Angular",
            "Allan",
            "Allerta",
            "Allerta Stencil",
            "Allura",
            "Almendra",
            "Almendra Display",
            "Almendra SC",
            "Amarante",
            "Amaranth",
            "Amatic SC",
            "Amethysta",
            "Anaheim",
            "Andada",
            "Andika",
            "Angkor",
            "Annie Use Your Telescope",
            "Anonymous Pro",
            "Antic",
            "Antic Didone",
            "Antic Slab",
            "Anton",
            "Arapey",
            "Arbutus",
            "Arbutus Slab",
            "Architects Daughter",
            "Archivo Black",
            "Archivo Narrow",
            "Arimo",
            "Arizonia",
            "Armata",
            "Artifika",
            "Arvo",
            "Asap",
            "Asset",
            "Astloch",
            "Asul",
            "Atomic Age",
            "Aubrey",
            "Audiowide",
            "Autour One",
            "Average",
            "Average Sans",
            "Averia Gruesa Libre",
            "Averia Libre",
            "Averia Sans Libre",
            "Averia Serif Libre",
            "Bad Script",
            "Balthazar",
            "Bangers",
            "Basic",
            "Battambang",
            "Baumans",
            "Bayon",
            "Belgrano",
            "Belleza",
            "BenchNine",
            "Bentham",
            "Berkshire Swash",
            "Bevan",
            "Bigelow Rules",
            "Bigshot One",
            "Bilbo",
            "Bilbo Swash Caps",
            "Bitter",
            "Black Ops One",
            "Bokor",
            "Bonbon",
            "Boogaloo",
            "Bowlby One",
            "Bowlby One SC",
            "Brawler",
            "Bree Serif",
            "Bubblegum Sans",
            "Bubbler One",
            //"Buda",
            "Buenard",
            "Butcherman",
            "Butterfly Kids",
            "Cabin",
            "Cabin Condensed",
            "Cabin Sketch",
            "Caesar Dressing",
            "Cagliostro",
            "Calligraffitti",
            "Cambo",
            "Candal",
            "Cantarell",
            "Cantata One",
            "Cantora One",
            "Capriola",
            "Cardo",
            "Carme",
            "Carrois Gothic",
            "Carrois Gothic SC",
            "Carter One",
            "Caudex",
            "Cedarville Cursive",
            "Ceviche One",
            "Changa One",
            "Chango",
            "Chau Philomene One",
            "Chela One",
            "Chelsea Market",
            "Chenla",
            "Cherry Cream Soda",
            "Cherry Swash",
            "Chewy",
            "Chicle",
            "Chivo",
            "Cinzel",
            "Cinzel Decorative",
            "Clicker Script",
            "Coda",
            //"Coda Caption",
            "Codystar",
            "Combo",
            "Comfortaa",
            "Coming Soon",
            "Concert One",
            "Condiment",
            "Content",
            "Contrail One",
            "Convergence",
            "Cookie",
            "Copse",
            "Corben",
            "Courgette",
            "Cousine",
            "Coustard",
            "Covered By Your Grace",
            "Crafty Girls",
            "Creepster",
            "Crete Round",
            "Crimson Text",
            "Croissant One",
            "Crushed",
            "Cuprum",
            "Cutive",
            "Cutive Mono",
            "Damion",
            "Dancing Script",
            "Dangrek",
            "Dawning of a New Day",
            "Days One",
            "Delius",
            "Delius Swash Caps",
            "Delius Unicase",
            "Della Respira",
            "Denk One",
            "Devonshire",
            "Didact Gothic",
            "Diplomata",
            "Diplomata SC",
            "Domine",
            "Donegal One",
            "Doppio One",
            "Dorsa",
            "Dosis",
            "Dr Sugiyama",
            "Droid Sans",
            "Droid Sans Mono",
            "Droid Serif",
            "Duru Sans",
            "Dynalight",
            "EB Garamond",
            "Eagle Lake",
            "Eater",
            "Economica",
            "Electrolize",
            "Elsie",
            "Elsie Swash Caps",
            "Emblema One",
            "Emilys Candy",
            "Engagement",
            "Englebert",
            "Enriqueta",
            "Erica One",
            "Esteban",
            "Euphoria Script",
            "Ewert",
            "Exo",
            "Expletus Sans",
            "Fanwood Text",
            "Fascinate",
            "Fascinate Inline",
            "Faster One",
            "Fasthand",
            "Fauna One",
            "Federant",
            "Federo",
            "Felipa",
            "Fenix",
            "Finger Paint",
            "Fjalla One",
            "Fjord One",
            "Flamenco",
            "Flavors",
            "Fondamento",
            "Fontdiner Swanky",
            "Forum",
            "Francois One",
            "Freckle Face",
            "Fredericka the Great",
            "Fredoka One",
            "Freehand",
            "Fresca",
            "Frijole",
            "Fruktur",
            "Fugaz One",
            "GFS Didot",
            "GFS Neohellenic",
            "Gabriela",
            "Gafata",
            "Galdeano",
            "Galindo",
            "Gentium Basic",
            "Gentium Book Basic",
            "Geo",
            "Geostar",
            "Geostar Fill",
            "Germania One",
            "Gilda Display",
            "Give You Glory",
            "Glass Antiqua",
            "Glegoo",
            "Gloria Hallelujah",
            "Goblin One",
            "Gochi Hand",
            "Gorditas",
            "Goudy Bookletter 1911",
            "Graduate",
            "Grand Hotel",
            "Gravitas One",
            "Great Vibes",
            "Griffy",
            "Gruppo",
            "Gudea",
            "Habibi",
            "Hammersmith One",
            "Hanalei",
            "Hanalei Fill",
            "Handlee",
            "Hanuman",
            "Happy Monkey",
            "Headland One",
            "Henny Penny",
            "Herr Von Muellerhoff",
            "Holtwood One SC",
            "Homemade Apple",
            "Homenaje",
            "IM Fell DW Pica",
            "IM Fell DW Pica SC",
            "IM Fell Double Pica",
            "IM Fell Double Pica SC",
            "IM Fell English",
            "IM Fell English SC",
            "IM Fell French Canon",
            "IM Fell French Canon SC",
            "IM Fell Great Primer",
            "IM Fell Great Primer SC",
            "Iceberg",
            "Iceland",
            "Imprima",
            "Inconsolata",
            "Inder",
            "Indie Flower",
            "Inika",
            "Irish Grover",
            "Istok Web",
            "Italiana",
            "Italianno",
            "Jacques Francois",
            "Jacques Francois Shadow",
            "Jim Nightshade",
            "Jockey One",
            "Jolly Lodger",
            "Josefin Sans",
            "Josefin Slab",
            "Joti One",
            "Judson",
            "Julee",
            "Julius Sans One",
            "Junge",
            "Jura",
            "Just Another Hand",
            "Just Me Again Down Here",
            "Kameron",
            "Karla",
            "Kaushan Script",
            "Kavoon",
            "Keania One",
            "Kelly Slab",
            "Kenia",
            "Khmer",
            "Kite One",
            "Knewave",
            "Kotta One",
            "Koulen",
            "Kranky",
            "Kreon",
            "Kristi",
            "Krona One",
            "La Belle Aurore",
            "Lancelot",
            "Lato",
            "League Script",
            "Leckerli One",
            "Ledger",
            "Lekton",
            "Lemon",
            "Libre Baskerville",
            "Life Savers",
            "Lilita One",
            "Lily Script One",
            "Limelight",
            "Linden Hill",
            "Lobster",
            "Lobster Two",
            "Londrina Outline",
            "Londrina Shadow",
            "Londrina Sketch",
            "Londrina Solid",
            "Lora",
            "Love Ya Like A Sister",
            "Loved by the King",
            "Lovers Quarrel",
            "Luckiest Guy",
            "Lusitana",
            "Lustria",
            "Macondo",
            "Macondo Swash Caps",
            "Magra",
            "Maiden Orange",
            "Mako",
            "Marcellus",
            "Marcellus SC",
            "Marck Script",
            "Margarine",
            "Marko One",
            "Marmelad",
            "Marvel",
            "Mate",
            "Mate SC",
            "Maven Pro",
            "McLaren",
            "Meddon",
            "MedievalSharp",
            "Medula One",
            "Megrim",
            "Meie Script",
            "Merienda",
            "Merienda One",
            "Merriweather",
            "Merriweather Sans",
            "Metal",
            "Metal Mania",
            "Metamorphous",
            "Metrophobic",
            "Michroma",
            "Milonga",
            "Miltonian",
            "Miltonian Tattoo",
            "Miniver",
            "Miss Fajardose",
            "Modern Antiqua",
            "Molengo",
            //"Molle",
            "Monda",
            "Monofett",
            "Monoton",
            "Monsieur La Doulaise",
            "Montaga",
            "Montez",
            "Montserrat",
            "Montserrat Alternates",
            "Montserrat Subrayada",
            "Moul",
            "Moulpali",
            "Mountains of Christmas",
            "Mouse Memoirs",
            "Mr Bedfort",
            "Mr Dafoe",
            "Mr De Haviland",
            "Mrs Saint Delafield",
            "Mrs Sheppards",
            "Muli",
            "Mystery Quest",
            "Neucha",
            "Neuton",
            "New Rocker",
            "News Cycle",
            "Niconne",
            "Nixie One",
            "Nobile",
            "Nokora",
            "Norican",
            "Nosifer",
            "Nothing You Could Do",
            "Noticia Text",
            "Noto Sans",
            "Noto Serif",
            "Nova Cut",
            "Nova Flat",
            "Nova Mono",
            "Nova Oval",
            "Nova Round",
            "Nova Script",
            "Nova Slim",
            "Nova Square",
            "Numans",
            "Nunito",
            "Odor Mean Chey",
            "Offside",
            "Old Standard TT",
            "Oldenburg",
            "Oleo Script",
            "Oleo Script Swash Caps",
            "Open Sans",
            //"Open Sans Condensed",
            "Oranienbaum",
            "Orbitron",
            "Oregano",
            "Orienta",
            "Original Surfer",
            "Oswald",
            "Over the Rainbow",
            "Overlock",
            "Overlock SC",
            "Ovo",
            "Oxygen",
            "Oxygen Mono",
            "PT Mono",
            "PT Sans",
            "PT Sans Caption",
            "PT Sans Narrow",
            "PT Serif",
            "PT Serif Caption",
            "Pacifico",
            "Paprika",
            "Parisienne",
            "Passero One",
            "Passion One",
            "Pathway Gothic One",
            "Patrick Hand",
            "Patrick Hand SC",
            "Patua One",
            "Paytone One",
            "Peralta",
            "Permanent Marker",
            "Petit Formal Script",
            "Petrona",
            "Philosopher",
            "Piedra",
            "Pinyon Script",
            "Pirata One",
            "Plaster",
            "Play",
            "Playball",
            "Playfair Display",
            "Playfair Display SC",
            "Podkova",
            "Poiret One",
            "Poller One",
            "Poly",
            "Pompiere",
            "Pontano Sans",
            "Port Lligat Sans",
            "Port Lligat Slab",
            "Prata",
            "Preahvihear",
            "Press Start 2P",
            "Princess Sofia",
            "Prociono",
            "Prosto One",
            "Puritan",
            "Purple Purse",
            "Quando",
            "Quantico",
            "Quattrocento",
            "Quattrocento Sans",
            "Questrial",
            "Quicksand",
            "Quintessential",
            "Qwigley",
            "Racing Sans One",
            "Radley",
            "Raleway",
            "Raleway Dots",
            "Rambla",
            "Rammetto One",
            "Ranchers",
            "Rancho",
            "Rationale",
            "Redressed",
            "Reenie Beanie",
            "Revalia",
            "Ribeye",
            "Ribeye Marrow",
            "Righteous",
            "Risque",
            "Roboto",
            "Roboto Condensed",
            "Roboto Slab",
            "Rochester",
            "Rock Salt",
            "Rokkitt",
            "Romanesco",
            "Ropa Sans",
            "Rosario",
            "Rosarivo",
            "Rouge Script",
            "Ruda",
            "Rufina",
            "Ruge Boogie",
            "Ruluko",
            "Rum Raisin",
            "Ruslan Display",
            "Russo One",
            "Ruthie",
            "Rye",
            "Sacramento",
            "Sail",
            "Salsa",
            "Sanchez",
            "Sancreek",
            "Sansita One",
            "Sarina",
            "Satisfy",
            "Scada",
            "Schoolbell",
            "Seaweed Script",
            "Sevillana",
            "Seymour One",
            "Shadows Into Light",
            "Shadows Into Light Two",
            "Shanti",
            "Share",
            "Share Tech",
            "Share Tech Mono",
            "Shojumaru",
            "Short Stack",
            "Siemreap",
            "Sigmar One",
            "Signika",
            "Signika Negative",
            "Simonetta",
            "Sintony",
            "Sirin Stencil",
            "Six Caps",
            "Skranji",
            "Slackey",
            "Smokum",
            "Smythe",
            "Sniglet",
            "Snippet",
            "Snowburst One",
            "Sofadi One",
            "Sofia",
            "Sonsie One",
            "Sorts Mill Goudy",
            "Source Code Pro",
            "Source Sans Pro",
            "Special Elite",
            "Spicy Rice",
            "Spinnaker",
            "Spirax",
            "Squada One",
            "Stalemate",
            "Stalinist One",
            "Stardos Stencil",
            "Stint Ultra Condensed",
            "Stint Ultra Expanded",
            "Stoke",
            "Strait",
            "Sue Ellen Francisco",
            "Sunshiney",
            "Supermercado One",
            "Suwannaphum",
            "Swanky and Moo Moo",
            "Syncopate",
            "Tangerine",
            "Taprom",
            "Tauri",
            "Telex",
            "Tenor Sans",
            "Text Me One",
            "The Girl Next Door",
            "Tienne",
            "Tinos",
            "Titan One",
            "Titillium Web",
            "Trade Winds",
            "Trocchi",
            "Trochut",
            "Trykker",
            "Tulpen One",
            "Ubuntu",
            "Ubuntu Condensed",
            "Ubuntu Mono",
            "Ultra",
            "Uncial Antiqua",
            "Underdog",
            "Unica One",
            //"UnifrakturCook",
            "UnifrakturMaguntia",
            "Unkempt",
            "Unlock",
            "Unna",
            "VT323",
            "Vampiro One",
            "Varela",
            "Varela Round",
            "Vast Shadow",
            "Vibur",
            "Vidaloka",
            "Viga",
            "Voces",
            "Volkhov",
            "Vollkorn",
            "Voltaire",
            "Waiting for the Sunrise",
            "Wallpoet",
            "Walter Turncoat",
            "Warnes",
            "Wellfleet",
            "Wendy One",
            "Wire One",
            "Yanone Kaffeesatz",
            "Yellowtail",
            "Yeseva One",
            "Yesteryear",
            "Zeyada"
          ];
          var settings2 = {
            style: "font-select",
            placeholder: "Select a font",
            lookahead: 5,
            api: "http://fonts.googleapis.com/css?family="
          };
          var Fontselect = (function() {
            function Fontselect2(original, o) {
              this.$original = $2(original);
              this.options = o;
              this.active = false;
              this.setupHtml();
              this.getVisibleFonts();
              this.bindEvents();
              var font = this.$original.val();
              this.currentfont = this.$original.val();
              var me = this;
              this.$original.on("change", function() {
                var newfont = me.$original.val();
                if (newfont != me.currentfont) {
                  me.currentfont = newfont;
                  if (newfont) {
                    me.updateSelected();
                  } else {
                    me.$element.text("<span></span>");
                  }
                }
              });
              if (font) {
                this.updateSelected();
              }
            }
            Fontselect2.prototype.bindEvents = function() {
              $2("li", this.$results).click(__bind(this.selectFont, this)).mouseenter(__bind(this.activateFont, this)).mouseleave(__bind(this.deactivateFont, this));
              $2("span", this.$select).click(__bind(this.toggleDrop, this));
              this.$arrow.click(__bind(this.toggleDrop, this));
            };
            Fontselect2.prototype.toggleDrop = function(ev) {
              if (this.active) {
                this.$element.removeClass("font-select-active");
                this.$drop.hide();
                clearInterval(this.visibleInterval);
              } else {
                this.$element.addClass("font-select-active");
                this.$drop.show();
                this.moveToSelected();
                this.visibleInterval = setInterval(__bind(this.getVisibleFonts, this), 500);
              }
              this.active = !this.active;
            };
            Fontselect2.prototype.selectFont = function() {
              var font = $2("li.active", this.$results).data("value");
              this.$original.val(font).change();
              this.updateSelected();
              this.toggleDrop();
              this.currentfont = font;
            };
            Fontselect2.prototype.moveToSelected = function() {
              var currentfontname = this.currentfont;
              var scrollpos = Math.max(0, fonts.indexOf(currentfontname));
              if (currentfontname) {
                $li = $2("li[data-value='" + currentfontname + "']", this.$results);
                if ($li.length === 0) {
                  $li = $2("li", this.$results).first();
                }
              } else {
                $li = $2("li", this.$results).first();
              }
              $li.addClass("active");
              this.$results.scrollTop(fonts.indexOf(currentfontname) * 25);
            };
            Fontselect2.prototype.activateFont = function(ev) {
              $2("li.active", this.$results).removeClass("active");
              $2(ev.currentTarget).addClass("active");
            };
            Fontselect2.prototype.deactivateFont = function(ev) {
              $2(ev.currentTarget).removeClass("active");
            };
            Fontselect2.prototype.updateSelected = function() {
              var font = this.$original.val();
              var i2 = fonts.indexOf(font) || 0;
              this.$select.children("span").text("").attr("style", "height:25px;background-image:url(/templates/exentriqManager2/static/img/fonts.png);background-position:0 -" + i2 * 25 + "px;");
            };
            Fontselect2.prototype.setupHtml = function() {
              this.$original.empty().hide();
              this.$element = $2("<div>", {
                "class": this.options.style
              });
              this.$arrow = $2("<div><b></b></div>");
              this.$select = $2("<a><span>" + this.options.placeholder + "</span></a>");
              this.$drop = $2("<div>", {
                "class": "fs-drop"
              });
              this.$results = $2("<ul>", {
                "class": "fs-results"
              });
              this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop));
              this.$drop.append(this.$results.append(this.fontsAsHtml())).hide();
            };
            Fontselect2.prototype.fontsAsHtml = function() {
              var l = fonts.length;
              var r2, s, h = "";
              for (var i2 = 0; i2 < l; i2++) {
                h += '<li data-value="' + fonts[i2] + '" style="height:25px;background-image:url(/templates/exentriqManager2/static/img/fonts.png);background-position:0 -' + i2 * 25 + 'px;"></li>';
              }
              return h;
            };
            Fontselect2.prototype.toReadable = function(font) {
              return font.replace(/[\+|:]/g, " ");
            };
            Fontselect2.prototype.toStyle = function(font) {
              var t = font.split(":");
              return {
                "font-family": this.toReadable(t[0]),
                "font-weight": t[1] || 400
              };
            };
            Fontselect2.prototype.getVisibleFonts = function() {
              if (this.$results.is(":hidden")) return;
              var fs = this;
              var top = this.$results.scrollTop();
              var bottom = top + this.$results.height();
              if (this.options.lookahead) {
                var li = $2("li", this.$results).first().height();
                bottom += li * this.options.lookahead;
              }
              $2("li", this.$results).each(function() {
                var ft = $2(this).position().top + top;
                var fb = ft + $2(this).height();
                if (fb >= top && ft <= bottom) {
                  var font = $2(this).data("value");
                }
              });
            };
            Fontselect2.prototype.addFontLink = function(font) {
              var link = this.options.api + font + "&text=" + this.toReadable(font);
              if ($2("link[href*='" + font + "']").length === 0) {
                $2("link:last").after('<link href="' + link + '" rel="stylesheet" type="text/css">');
              }
            };
            return Fontselect2;
          })();
          return this.each(function(options2) {
            if (options2) $2.extend(settings2, options2);
            return new Fontselect(this, settings2);
          });
        };
      })(jQuery);
    }
  });

  // node_modules/outlayer/node_modules/ev-emitter/ev-emitter.js
  var require_ev_emitter = __commonJS({
    "node_modules/outlayer/node_modules/ev-emitter/ev-emitter.js"(exports2, module2) {
      (function(global, factory) {
        if (typeof define == "function" && define.amd) {
          define(factory);
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory();
        } else {
          global.EvEmitter = factory();
        }
      })(typeof window != "undefined" ? window : exports2, function() {
        "use strict";
        function EvEmitter() {
        }
        var proto = EvEmitter.prototype;
        proto.on = function(eventName, listener) {
          if (!eventName || !listener) {
            return;
          }
          var events = this._events = this._events || {};
          var listeners = events[eventName] = events[eventName] || [];
          if (listeners.indexOf(listener) == -1) {
            listeners.push(listener);
          }
          return this;
        };
        proto.once = function(eventName, listener) {
          if (!eventName || !listener) {
            return;
          }
          this.on(eventName, listener);
          var onceEvents = this._onceEvents = this._onceEvents || {};
          var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
          onceListeners[listener] = true;
          return this;
        };
        proto.off = function(eventName, listener) {
          var listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) {
            return;
          }
          var index = listeners.indexOf(listener);
          if (index != -1) {
            listeners.splice(index, 1);
          }
          return this;
        };
        proto.emitEvent = function(eventName, args) {
          var listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) {
            return;
          }
          listeners = listeners.slice(0);
          args = args || [];
          var onceListeners = this._onceEvents && this._onceEvents[eventName];
          for (var i2 = 0; i2 < listeners.length; i2++) {
            var listener = listeners[i2];
            var isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
              this.off(eventName, listener);
              delete onceListeners[listener];
            }
            listener.apply(this, args);
          }
          return this;
        };
        proto.allOff = function() {
          delete this._events;
          delete this._onceEvents;
        };
        return EvEmitter;
      });
    }
  });

  // node_modules/get-size/get-size.js
  var require_get_size = __commonJS({
    "node_modules/get-size/get-size.js"(exports2, module2) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define(factory);
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory();
        } else {
          window2.getSize = factory();
        }
      })(window, function factory() {
        "use strict";
        function getStyleSize(value) {
          var num = parseFloat(value);
          var isValid = value.indexOf("%") == -1 && !isNaN(num);
          return isValid && num;
        }
        function noop() {
        }
        var logError = typeof console == "undefined" ? noop : function(message) {
          console.error(message);
        };
        var measurements = [
          "paddingLeft",
          "paddingRight",
          "paddingTop",
          "paddingBottom",
          "marginLeft",
          "marginRight",
          "marginTop",
          "marginBottom",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth",
          "borderBottomWidth"
        ];
        var measurementsLength = measurements.length;
        function getZeroSize() {
          var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
          };
          for (var i2 = 0; i2 < measurementsLength; i2++) {
            var measurement = measurements[i2];
            size[measurement] = 0;
          }
          return size;
        }
        function getStyle(elem) {
          var style = getComputedStyle(elem);
          if (!style) {
            logError("Style returned " + style + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1");
          }
          return style;
        }
        var isSetup = false;
        var isBoxSizeOuter;
        function setup() {
          if (isSetup) {
            return;
          }
          isSetup = true;
          var div = document.createElement("div");
          div.style.width = "200px";
          div.style.padding = "1px 2px 3px 4px";
          div.style.borderStyle = "solid";
          div.style.borderWidth = "1px 2px 3px 4px";
          div.style.boxSizing = "border-box";
          var body = document.body || document.documentElement;
          body.appendChild(div);
          var style = getStyle(div);
          isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
          getSize.isBoxSizeOuter = isBoxSizeOuter;
          body.removeChild(div);
        }
        function getSize(elem) {
          setup();
          if (typeof elem == "string") {
            elem = document.querySelector(elem);
          }
          if (!elem || typeof elem != "object" || !elem.nodeType) {
            return;
          }
          var style = getStyle(elem);
          if (style.display == "none") {
            return getZeroSize();
          }
          var size = {};
          size.width = elem.offsetWidth;
          size.height = elem.offsetHeight;
          var isBorderBox = size.isBorderBox = style.boxSizing == "border-box";
          for (var i2 = 0; i2 < measurementsLength; i2++) {
            var measurement = measurements[i2];
            var value = style[measurement];
            var num = parseFloat(value);
            size[measurement] = !isNaN(num) ? num : 0;
          }
          var paddingWidth = size.paddingLeft + size.paddingRight;
          var paddingHeight = size.paddingTop + size.paddingBottom;
          var marginWidth = size.marginLeft + size.marginRight;
          var marginHeight = size.marginTop + size.marginBottom;
          var borderWidth = size.borderLeftWidth + size.borderRightWidth;
          var borderHeight = size.borderTopWidth + size.borderBottomWidth;
          var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
          var styleWidth = getStyleSize(style.width);
          if (styleWidth !== false) {
            size.width = styleWidth + // add padding and border unless it's already including it
            (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
          }
          var styleHeight = getStyleSize(style.height);
          if (styleHeight !== false) {
            size.height = styleHeight + // add padding and border unless it's already including it
            (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
          }
          size.innerWidth = size.width - (paddingWidth + borderWidth);
          size.innerHeight = size.height - (paddingHeight + borderHeight);
          size.outerWidth = size.width + marginWidth;
          size.outerHeight = size.height + marginHeight;
          return size;
        }
        return getSize;
      });
    }
  });

  // node_modules/desandro-matches-selector/matches-selector.js
  var require_matches_selector = __commonJS({
    "node_modules/desandro-matches-selector/matches-selector.js"(exports2, module2) {
      (function(window2, factory) {
        "use strict";
        if (typeof define == "function" && define.amd) {
          define(factory);
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory();
        } else {
          window2.matchesSelector = factory();
        }
      })(window, function factory() {
        "use strict";
        var matchesMethod = (function() {
          var ElemProto = window.Element.prototype;
          if (ElemProto.matches) {
            return "matches";
          }
          if (ElemProto.matchesSelector) {
            return "matchesSelector";
          }
          var prefixes = ["webkit", "moz", "ms", "o"];
          for (var i2 = 0; i2 < prefixes.length; i2++) {
            var prefix = prefixes[i2];
            var method = prefix + "MatchesSelector";
            if (ElemProto[method]) {
              return method;
            }
          }
        })();
        return function matchesSelector(elem, selector) {
          return elem[matchesMethod](selector);
        };
      });
    }
  });

  // node_modules/fizzy-ui-utils/utils.js
  var require_utils = __commonJS({
    "node_modules/fizzy-ui-utils/utils.js"(exports2, module2) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define([
            "desandro-matches-selector/matches-selector"
          ], function(matchesSelector) {
            return factory(window2, matchesSelector);
          });
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory(
            window2,
            require_matches_selector()
          );
        } else {
          window2.fizzyUIUtils = factory(
            window2,
            window2.matchesSelector
          );
        }
      })(window, function factory(window2, matchesSelector) {
        "use strict";
        var utils = {};
        utils.extend = function(a, b) {
          for (var prop in b) {
            a[prop] = b[prop];
          }
          return a;
        };
        utils.modulo = function(num, div) {
          return (num % div + div) % div;
        };
        var arraySlice = Array.prototype.slice;
        utils.makeArray = function(obj2) {
          if (Array.isArray(obj2)) {
            return obj2;
          }
          if (obj2 === null || obj2 === void 0) {
            return [];
          }
          var isArrayLike = typeof obj2 == "object" && typeof obj2.length == "number";
          if (isArrayLike) {
            return arraySlice.call(obj2);
          }
          return [obj2];
        };
        utils.removeFrom = function(ary, obj2) {
          var index = ary.indexOf(obj2);
          if (index != -1) {
            ary.splice(index, 1);
          }
        };
        utils.getParent = function(elem, selector) {
          while (elem.parentNode && elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
              return elem;
            }
          }
        };
        utils.getQueryElement = function(elem) {
          if (typeof elem == "string") {
            return document.querySelector(elem);
          }
          return elem;
        };
        utils.handleEvent = function(event) {
          var method = "on" + event.type;
          if (this[method]) {
            this[method](event);
          }
        };
        utils.filterFindElements = function(elems, selector) {
          elems = utils.makeArray(elems);
          var ffElems = [];
          elems.forEach(function(elem) {
            if (!(elem instanceof HTMLElement)) {
              return;
            }
            if (!selector) {
              ffElems.push(elem);
              return;
            }
            if (matchesSelector(elem, selector)) {
              ffElems.push(elem);
            }
            var childElems = elem.querySelectorAll(selector);
            for (var i2 = 0; i2 < childElems.length; i2++) {
              ffElems.push(childElems[i2]);
            }
          });
          return ffElems;
        };
        utils.debounceMethod = function(_class, methodName, threshold) {
          threshold = threshold || 100;
          var method = _class.prototype[methodName];
          var timeoutName = methodName + "Timeout";
          _class.prototype[methodName] = function() {
            var timeout = this[timeoutName];
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;
            this[timeoutName] = setTimeout(function() {
              method.apply(_this, args);
              delete _this[timeoutName];
            }, threshold);
          };
        };
        utils.docReady = function(callback) {
          var readyState = document.readyState;
          if (readyState == "complete" || readyState == "interactive") {
            setTimeout(callback);
          } else {
            document.addEventListener("DOMContentLoaded", callback);
          }
        };
        utils.toDashed = function(str) {
          return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
            return $1 + "-" + $2;
          }).toLowerCase();
        };
        var console2 = window2.console;
        utils.htmlInit = function(WidgetClass, namespace) {
          utils.docReady(function() {
            var dashedNamespace = utils.toDashed(namespace);
            var dataAttr = "data-" + dashedNamespace;
            var dataAttrElems = document.querySelectorAll("[" + dataAttr + "]");
            var jsDashElems = document.querySelectorAll(".js-" + dashedNamespace);
            var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
            var dataOptionsAttr = dataAttr + "-options";
            var jQuery2 = window2.jQuery;
            elems.forEach(function(elem) {
              var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
              var options;
              try {
                options = attr && JSON.parse(attr);
              } catch (error) {
                if (console2) {
                  console2.error("Error parsing " + dataAttr + " on " + elem.className + ": " + error);
                }
                return;
              }
              var instance = new WidgetClass(elem, options);
              if (jQuery2) {
                jQuery2.data(elem, namespace, instance);
              }
            });
          });
        };
        return utils;
      });
    }
  });

  // node_modules/outlayer/item.js
  var require_item = __commonJS({
    "node_modules/outlayer/item.js"(exports2, module2) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define(
            [
              "ev-emitter/ev-emitter",
              "get-size/get-size"
            ],
            factory
          );
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory(
            require_ev_emitter(),
            require_get_size()
          );
        } else {
          window2.Outlayer = {};
          window2.Outlayer.Item = factory(
            window2.EvEmitter,
            window2.getSize
          );
        }
      })(window, function factory(EvEmitter, getSize) {
        "use strict";
        function isEmptyObj(obj2) {
          for (var prop in obj2) {
            return false;
          }
          prop = null;
          return true;
        }
        var docElemStyle = document.documentElement.style;
        var transitionProperty = typeof docElemStyle.transition == "string" ? "transition" : "WebkitTransition";
        var transformProperty = typeof docElemStyle.transform == "string" ? "transform" : "WebkitTransform";
        var transitionEndEvent = {
          WebkitTransition: "webkitTransitionEnd",
          transition: "transitionend"
        }[transitionProperty];
        var vendorProperties = {
          transform: transformProperty,
          transition: transitionProperty,
          transitionDuration: transitionProperty + "Duration",
          transitionProperty: transitionProperty + "Property",
          transitionDelay: transitionProperty + "Delay"
        };
        function Item(element, layout) {
          if (!element) {
            return;
          }
          this.element = element;
          this.layout = layout;
          this.position = {
            x: 0,
            y: 0
          };
          this._create();
        }
        var proto = Item.prototype = Object.create(EvEmitter.prototype);
        proto.constructor = Item;
        proto._create = function() {
          this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
          };
          this.css({
            position: "absolute"
          });
        };
        proto.handleEvent = function(event) {
          var method = "on" + event.type;
          if (this[method]) {
            this[method](event);
          }
        };
        proto.getSize = function() {
          this.size = getSize(this.element);
        };
        proto.css = function(style) {
          var elemStyle = this.element.style;
          for (var prop in style) {
            var supportedProp = vendorProperties[prop] || prop;
            elemStyle[supportedProp] = style[prop];
          }
        };
        proto.getPosition = function() {
          var style = getComputedStyle(this.element);
          var isOriginLeft = this.layout._getOption("originLeft");
          var isOriginTop = this.layout._getOption("originTop");
          var xValue = style[isOriginLeft ? "left" : "right"];
          var yValue = style[isOriginTop ? "top" : "bottom"];
          var x = parseFloat(xValue);
          var y = parseFloat(yValue);
          var layoutSize = this.layout.size;
          if (xValue.indexOf("%") != -1) {
            x = x / 100 * layoutSize.width;
          }
          if (yValue.indexOf("%") != -1) {
            y = y / 100 * layoutSize.height;
          }
          x = isNaN(x) ? 0 : x;
          y = isNaN(y) ? 0 : y;
          x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
          y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
          this.position.x = x;
          this.position.y = y;
        };
        proto.layoutPosition = function() {
          var layoutSize = this.layout.size;
          var style = {};
          var isOriginLeft = this.layout._getOption("originLeft");
          var isOriginTop = this.layout._getOption("originTop");
          var xPadding = isOriginLeft ? "paddingLeft" : "paddingRight";
          var xProperty = isOriginLeft ? "left" : "right";
          var xResetProperty = isOriginLeft ? "right" : "left";
          var x = this.position.x + layoutSize[xPadding];
          style[xProperty] = this.getXValue(x);
          style[xResetProperty] = "";
          var yPadding = isOriginTop ? "paddingTop" : "paddingBottom";
          var yProperty = isOriginTop ? "top" : "bottom";
          var yResetProperty = isOriginTop ? "bottom" : "top";
          var y = this.position.y + layoutSize[yPadding];
          style[yProperty] = this.getYValue(y);
          style[yResetProperty] = "";
          this.css(style);
          this.emitEvent("layout", [this]);
        };
        proto.getXValue = function(x) {
          var isHorizontal = this.layout._getOption("horizontal");
          return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + "%" : x + "px";
        };
        proto.getYValue = function(y) {
          var isHorizontal = this.layout._getOption("horizontal");
          return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + "%" : y + "px";
        };
        proto._transitionTo = function(x, y) {
          this.getPosition();
          var curX = this.position.x;
          var curY = this.position.y;
          var didNotMove = x == this.position.x && y == this.position.y;
          this.setPosition(x, y);
          if (didNotMove && !this.isTransitioning) {
            this.layoutPosition();
            return;
          }
          var transX = x - curX;
          var transY = y - curY;
          var transitionStyle = {};
          transitionStyle.transform = this.getTranslate(transX, transY);
          this.transition({
            to: transitionStyle,
            onTransitionEnd: {
              transform: this.layoutPosition
            },
            isCleaning: true
          });
        };
        proto.getTranslate = function(x, y) {
          var isOriginLeft = this.layout._getOption("originLeft");
          var isOriginTop = this.layout._getOption("originTop");
          x = isOriginLeft ? x : -x;
          y = isOriginTop ? y : -y;
          return "translate3d(" + x + "px, " + y + "px, 0)";
        };
        proto.goTo = function(x, y) {
          this.setPosition(x, y);
          this.layoutPosition();
        };
        proto.moveTo = proto._transitionTo;
        proto.setPosition = function(x, y) {
          this.position.x = parseFloat(x);
          this.position.y = parseFloat(y);
        };
        proto._nonTransition = function(args) {
          this.css(args.to);
          if (args.isCleaning) {
            this._removeStyles(args.to);
          }
          for (var prop in args.onTransitionEnd) {
            args.onTransitionEnd[prop].call(this);
          }
        };
        proto.transition = function(args) {
          if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(args);
            return;
          }
          var _transition = this._transn;
          for (var prop in args.onTransitionEnd) {
            _transition.onEnd[prop] = args.onTransitionEnd[prop];
          }
          for (prop in args.to) {
            _transition.ingProperties[prop] = true;
            if (args.isCleaning) {
              _transition.clean[prop] = true;
            }
          }
          if (args.from) {
            this.css(args.from);
            var h = this.element.offsetHeight;
            h = null;
          }
          this.enableTransition(args.to);
          this.css(args.to);
          this.isTransitioning = true;
        };
        function toDashedAll(str) {
          return str.replace(/([A-Z])/g, function($1) {
            return "-" + $1.toLowerCase();
          });
        }
        var transitionProps = "opacity," + toDashedAll(transformProperty);
        proto.enableTransition = function() {
          if (this.isTransitioning) {
            return;
          }
          var duration = this.layout.options.transitionDuration;
          duration = typeof duration == "number" ? duration + "ms" : duration;
          this.css({
            transitionProperty: transitionProps,
            transitionDuration: duration,
            transitionDelay: this.staggerDelay || 0
          });
          this.element.addEventListener(transitionEndEvent, this, false);
        };
        proto.onwebkitTransitionEnd = function(event) {
          this.ontransitionend(event);
        };
        proto.onotransitionend = function(event) {
          this.ontransitionend(event);
        };
        var dashedVendorProperties = {
          "-webkit-transform": "transform"
        };
        proto.ontransitionend = function(event) {
          if (event.target !== this.element) {
            return;
          }
          var _transition = this._transn;
          var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
          delete _transition.ingProperties[propertyName];
          if (isEmptyObj(_transition.ingProperties)) {
            this.disableTransition();
          }
          if (propertyName in _transition.clean) {
            this.element.style[event.propertyName] = "";
            delete _transition.clean[propertyName];
          }
          if (propertyName in _transition.onEnd) {
            var onTransitionEnd = _transition.onEnd[propertyName];
            onTransitionEnd.call(this);
            delete _transition.onEnd[propertyName];
          }
          this.emitEvent("transitionEnd", [this]);
        };
        proto.disableTransition = function() {
          this.removeTransitionStyles();
          this.element.removeEventListener(transitionEndEvent, this, false);
          this.isTransitioning = false;
        };
        proto._removeStyles = function(style) {
          var cleanStyle = {};
          for (var prop in style) {
            cleanStyle[prop] = "";
          }
          this.css(cleanStyle);
        };
        var cleanTransitionStyle = {
          transitionProperty: "",
          transitionDuration: "",
          transitionDelay: ""
        };
        proto.removeTransitionStyles = function() {
          this.css(cleanTransitionStyle);
        };
        proto.stagger = function(delay) {
          delay = isNaN(delay) ? 0 : delay;
          this.staggerDelay = delay + "ms";
        };
        proto.removeElem = function() {
          this.element.parentNode.removeChild(this.element);
          this.css({ display: "" });
          this.emitEvent("remove", [this]);
        };
        proto.remove = function() {
          if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return;
          }
          this.once("transitionEnd", function() {
            this.removeElem();
          });
          this.hide();
        };
        proto.reveal = function() {
          delete this.isHidden;
          this.css({ display: "" });
          var options = this.layout.options;
          var onTransitionEnd = {};
          var transitionEndProperty = this.getHideRevealTransitionEndProperty("visibleStyle");
          onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
          this.transition({
            from: options.hiddenStyle,
            to: options.visibleStyle,
            isCleaning: true,
            onTransitionEnd
          });
        };
        proto.onRevealTransitionEnd = function() {
          if (!this.isHidden) {
            this.emitEvent("reveal");
          }
        };
        proto.getHideRevealTransitionEndProperty = function(styleProperty) {
          var optionStyle = this.layout.options[styleProperty];
          if (optionStyle.opacity) {
            return "opacity";
          }
          for (var prop in optionStyle) {
            return prop;
          }
        };
        proto.hide = function() {
          this.isHidden = true;
          this.css({ display: "" });
          var options = this.layout.options;
          var onTransitionEnd = {};
          var transitionEndProperty = this.getHideRevealTransitionEndProperty("hiddenStyle");
          onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
          this.transition({
            from: options.visibleStyle,
            to: options.hiddenStyle,
            // keep hidden stuff hidden
            isCleaning: true,
            onTransitionEnd
          });
        };
        proto.onHideTransitionEnd = function() {
          if (this.isHidden) {
            this.css({ display: "none" });
            this.emitEvent("hide");
          }
        };
        proto.destroy = function() {
          this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
          });
        };
        return Item;
      });
    }
  });

  // node_modules/outlayer/outlayer.js
  var require_outlayer = __commonJS({
    "node_modules/outlayer/outlayer.js"(exports2, module2) {
      (function(window2, factory) {
        "use strict";
        if (typeof define == "function" && define.amd) {
          define(
            [
              "ev-emitter/ev-emitter",
              "get-size/get-size",
              "fizzy-ui-utils/utils",
              "./item"
            ],
            function(EvEmitter, getSize, utils, Item) {
              return factory(window2, EvEmitter, getSize, utils, Item);
            }
          );
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory(
            window2,
            require_ev_emitter(),
            require_get_size(),
            require_utils(),
            require_item()
          );
        } else {
          window2.Outlayer = factory(
            window2,
            window2.EvEmitter,
            window2.getSize,
            window2.fizzyUIUtils,
            window2.Outlayer.Item
          );
        }
      })(window, function factory(window2, EvEmitter, getSize, utils, Item) {
        "use strict";
        var console2 = window2.console;
        var jQuery2 = window2.jQuery;
        var noop = function() {
        };
        var GUID = 0;
        var instances = {};
        function Outlayer(element, options) {
          var queryElement = utils.getQueryElement(element);
          if (!queryElement) {
            if (console2) {
              console2.error("Bad element for " + this.constructor.namespace + ": " + (queryElement || element));
            }
            return;
          }
          this.element = queryElement;
          if (jQuery2) {
            this.$element = jQuery2(this.element);
          }
          this.options = utils.extend({}, this.constructor.defaults);
          this.option(options);
          var id = ++GUID;
          this.element.outlayerGUID = id;
          instances[id] = this;
          this._create();
          var isInitLayout = this._getOption("initLayout");
          if (isInitLayout) {
            this.layout();
          }
        }
        Outlayer.namespace = "outlayer";
        Outlayer.Item = Item;
        Outlayer.defaults = {
          containerStyle: {
            position: "relative"
          },
          initLayout: true,
          originLeft: true,
          originTop: true,
          resize: true,
          resizeContainer: true,
          // item options
          transitionDuration: "0.4s",
          hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
          },
          visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
          }
        };
        var proto = Outlayer.prototype;
        utils.extend(proto, EvEmitter.prototype);
        proto.option = function(opts) {
          utils.extend(this.options, opts);
        };
        proto._getOption = function(option) {
          var oldOption = this.constructor.compatOptions[option];
          return oldOption && this.options[oldOption] !== void 0 ? this.options[oldOption] : this.options[option];
        };
        Outlayer.compatOptions = {
          // currentName: oldName
          initLayout: "isInitLayout",
          horizontal: "isHorizontal",
          layoutInstant: "isLayoutInstant",
          originLeft: "isOriginLeft",
          originTop: "isOriginTop",
          resize: "isResizeBound",
          resizeContainer: "isResizingContainer"
        };
        proto._create = function() {
          this.reloadItems();
          this.stamps = [];
          this.stamp(this.options.stamp);
          utils.extend(this.element.style, this.options.containerStyle);
          var canBindResize = this._getOption("resize");
          if (canBindResize) {
            this.bindResize();
          }
        };
        proto.reloadItems = function() {
          this.items = this._itemize(this.element.children);
        };
        proto._itemize = function(elems) {
          var itemElems = this._filterFindItemElements(elems);
          var Item2 = this.constructor.Item;
          var items = [];
          for (var i2 = 0; i2 < itemElems.length; i2++) {
            var elem = itemElems[i2];
            var item = new Item2(elem, this);
            items.push(item);
          }
          return items;
        };
        proto._filterFindItemElements = function(elems) {
          return utils.filterFindElements(elems, this.options.itemSelector);
        };
        proto.getItemElements = function() {
          return this.items.map(function(item) {
            return item.element;
          });
        };
        proto.layout = function() {
          this._resetLayout();
          this._manageStamps();
          var layoutInstant = this._getOption("layoutInstant");
          var isInstant = layoutInstant !== void 0 ? layoutInstant : !this._isLayoutInited;
          this.layoutItems(this.items, isInstant);
          this._isLayoutInited = true;
        };
        proto._init = proto.layout;
        proto._resetLayout = function() {
          this.getSize();
        };
        proto.getSize = function() {
          this.size = getSize(this.element);
        };
        proto._getMeasurement = function(measurement, size) {
          var option = this.options[measurement];
          var elem;
          if (!option) {
            this[measurement] = 0;
          } else {
            if (typeof option == "string") {
              elem = this.element.querySelector(option);
            } else if (option instanceof HTMLElement) {
              elem = option;
            }
            this[measurement] = elem ? getSize(elem)[size] : option;
          }
        };
        proto.layoutItems = function(items, isInstant) {
          items = this._getItemsForLayout(items);
          this._layoutItems(items, isInstant);
          this._postLayout();
        };
        proto._getItemsForLayout = function(items) {
          return items.filter(function(item) {
            return !item.isIgnored;
          });
        };
        proto._layoutItems = function(items, isInstant) {
          this._emitCompleteOnItems("layout", items);
          if (!items || !items.length) {
            return;
          }
          var queue = [];
          items.forEach(function(item) {
            var position = this._getItemLayoutPosition(item);
            position.item = item;
            position.isInstant = isInstant || item.isLayoutInstant;
            queue.push(position);
          }, this);
          this._processLayoutQueue(queue);
        };
        proto._getItemLayoutPosition = function() {
          return {
            x: 0,
            y: 0
          };
        };
        proto._processLayoutQueue = function(queue) {
          this.updateStagger();
          queue.forEach(function(obj2, i2) {
            this._positionItem(obj2.item, obj2.x, obj2.y, obj2.isInstant, i2);
          }, this);
        };
        proto.updateStagger = function() {
          var stagger = this.options.stagger;
          if (stagger === null || stagger === void 0) {
            this.stagger = 0;
            return;
          }
          this.stagger = getMilliseconds(stagger);
          return this.stagger;
        };
        proto._positionItem = function(item, x, y, isInstant, i2) {
          if (isInstant) {
            item.goTo(x, y);
          } else {
            item.stagger(i2 * this.stagger);
            item.moveTo(x, y);
          }
        };
        proto._postLayout = function() {
          this.resizeContainer();
        };
        proto.resizeContainer = function() {
          var isResizingContainer = this._getOption("resizeContainer");
          if (!isResizingContainer) {
            return;
          }
          var size = this._getContainerSize();
          if (size) {
            this._setContainerMeasure(size.width, true);
            this._setContainerMeasure(size.height, false);
          }
        };
        proto._getContainerSize = noop;
        proto._setContainerMeasure = function(measure, isWidth) {
          if (measure === void 0) {
            return;
          }
          var elemSize = this.size;
          if (elemSize.isBorderBox) {
            measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
          }
          measure = Math.max(measure, 0);
          this.element.style[isWidth ? "width" : "height"] = measure + "px";
        };
        proto._emitCompleteOnItems = function(eventName, items) {
          var _this = this;
          function onComplete() {
            _this.dispatchEvent(eventName + "Complete", null, [items]);
          }
          var count = items.length;
          if (!items || !count) {
            onComplete();
            return;
          }
          var doneCount = 0;
          function tick() {
            doneCount++;
            if (doneCount == count) {
              onComplete();
            }
          }
          items.forEach(function(item) {
            item.once(eventName, tick);
          });
        };
        proto.dispatchEvent = function(type, event, args) {
          var emitArgs = event ? [event].concat(args) : args;
          this.emitEvent(type, emitArgs);
          if (jQuery2) {
            this.$element = this.$element || jQuery2(this.element);
            if (event) {
              var $event = jQuery2.Event(event);
              $event.type = type;
              this.$element.trigger($event, args);
            } else {
              this.$element.trigger(type, args);
            }
          }
        };
        proto.ignore = function(elem) {
          var item = this.getItem(elem);
          if (item) {
            item.isIgnored = true;
          }
        };
        proto.unignore = function(elem) {
          var item = this.getItem(elem);
          if (item) {
            delete item.isIgnored;
          }
        };
        proto.stamp = function(elems) {
          elems = this._find(elems);
          if (!elems) {
            return;
          }
          this.stamps = this.stamps.concat(elems);
          elems.forEach(this.ignore, this);
        };
        proto.unstamp = function(elems) {
          elems = this._find(elems);
          if (!elems) {
            return;
          }
          elems.forEach(function(elem) {
            utils.removeFrom(this.stamps, elem);
            this.unignore(elem);
          }, this);
        };
        proto._find = function(elems) {
          if (!elems) {
            return;
          }
          if (typeof elems == "string") {
            elems = this.element.querySelectorAll(elems);
          }
          elems = utils.makeArray(elems);
          return elems;
        };
        proto._manageStamps = function() {
          if (!this.stamps || !this.stamps.length) {
            return;
          }
          this._getBoundingRect();
          this.stamps.forEach(this._manageStamp, this);
        };
        proto._getBoundingRect = function() {
          var boundingRect = this.element.getBoundingClientRect();
          var size = this.size;
          this._boundingRect = {
            left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
            top: boundingRect.top + size.paddingTop + size.borderTopWidth,
            right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
            bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
          };
        };
        proto._manageStamp = noop;
        proto._getElementOffset = function(elem) {
          var boundingRect = elem.getBoundingClientRect();
          var thisRect = this._boundingRect;
          var size = getSize(elem);
          var offset = {
            left: boundingRect.left - thisRect.left - size.marginLeft,
            top: boundingRect.top - thisRect.top - size.marginTop,
            right: thisRect.right - boundingRect.right - size.marginRight,
            bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
          };
          return offset;
        };
        proto.handleEvent = utils.handleEvent;
        proto.bindResize = function() {
          window2.addEventListener("resize", this);
          this.isResizeBound = true;
        };
        proto.unbindResize = function() {
          window2.removeEventListener("resize", this);
          this.isResizeBound = false;
        };
        proto.onresize = function() {
          this.resize();
        };
        utils.debounceMethod(Outlayer, "onresize", 100);
        proto.resize = function() {
          if (!this.isResizeBound || !this.needsResizeLayout()) {
            return;
          }
          this.layout();
        };
        proto.needsResizeLayout = function() {
          var size = getSize(this.element);
          var hasSizes = this.size && size;
          return hasSizes && size.innerWidth !== this.size.innerWidth;
        };
        proto.addItems = function(elems) {
          var items = this._itemize(elems);
          if (items.length) {
            this.items = this.items.concat(items);
          }
          return items;
        };
        proto.appended = function(elems) {
          var items = this.addItems(elems);
          if (!items.length) {
            return;
          }
          this.layoutItems(items, true);
          this.reveal(items);
        };
        proto.prepended = function(elems) {
          var items = this._itemize(elems);
          if (!items.length) {
            return;
          }
          var previousItems = this.items.slice(0);
          this.items = items.concat(previousItems);
          this._resetLayout();
          this._manageStamps();
          this.layoutItems(items, true);
          this.reveal(items);
          this.layoutItems(previousItems);
        };
        proto.reveal = function(items) {
          this._emitCompleteOnItems("reveal", items);
          if (!items || !items.length) {
            return;
          }
          var stagger = this.updateStagger();
          items.forEach(function(item, i2) {
            item.stagger(i2 * stagger);
            item.reveal();
          });
        };
        proto.hide = function(items) {
          this._emitCompleteOnItems("hide", items);
          if (!items || !items.length) {
            return;
          }
          var stagger = this.updateStagger();
          items.forEach(function(item, i2) {
            item.stagger(i2 * stagger);
            item.hide();
          });
        };
        proto.revealItemElements = function(elems) {
          var items = this.getItems(elems);
          this.reveal(items);
        };
        proto.hideItemElements = function(elems) {
          var items = this.getItems(elems);
          this.hide(items);
        };
        proto.getItem = function(elem) {
          for (var i2 = 0; i2 < this.items.length; i2++) {
            var item = this.items[i2];
            if (item.element == elem) {
              return item;
            }
          }
        };
        proto.getItems = function(elems) {
          elems = utils.makeArray(elems);
          var items = [];
          elems.forEach(function(elem) {
            var item = this.getItem(elem);
            if (item) {
              items.push(item);
            }
          }, this);
          return items;
        };
        proto.remove = function(elems) {
          var removeItems = this.getItems(elems);
          this._emitCompleteOnItems("remove", removeItems);
          if (!removeItems || !removeItems.length) {
            return;
          }
          removeItems.forEach(function(item) {
            item.remove();
            utils.removeFrom(this.items, item);
          }, this);
        };
        proto.destroy = function() {
          var style = this.element.style;
          style.height = "";
          style.position = "";
          style.width = "";
          this.items.forEach(function(item) {
            item.destroy();
          });
          this.unbindResize();
          var id = this.element.outlayerGUID;
          delete instances[id];
          delete this.element.outlayerGUID;
          if (jQuery2) {
            jQuery2.removeData(this.element, this.constructor.namespace);
          }
        };
        Outlayer.data = function(elem) {
          elem = utils.getQueryElement(elem);
          var id = elem && elem.outlayerGUID;
          return id && instances[id];
        };
        Outlayer.create = function(namespace, options) {
          var Layout = subclass(Outlayer);
          Layout.defaults = utils.extend({}, Outlayer.defaults);
          utils.extend(Layout.defaults, options);
          Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
          Layout.namespace = namespace;
          Layout.data = Outlayer.data;
          Layout.Item = subclass(Item);
          utils.htmlInit(Layout, namespace);
          if (jQuery2 && jQuery2.bridget) {
            jQuery2.bridget(namespace, Layout);
          }
          return Layout;
        };
        function subclass(Parent) {
          function SubClass() {
            Parent.apply(this, arguments);
          }
          SubClass.prototype = Object.create(Parent.prototype);
          SubClass.prototype.constructor = SubClass;
          return SubClass;
        }
        var msUnits = {
          ms: 1,
          s: 1e3
        };
        function getMilliseconds(time2) {
          if (typeof time2 == "number") {
            return time2;
          }
          var matches = time2.match(/(^\d*\.?\d*)(\w*)/);
          var num = matches && matches[1];
          var unit = matches && matches[2];
          if (!num.length) {
            return 0;
          }
          num = parseFloat(num);
          var mult = msUnits[unit] || 1;
          return num * mult;
        }
        Outlayer.Item = Item;
        return Outlayer;
      });
    }
  });

  // node_modules/masonry-layout/masonry.js
  var require_masonry = __commonJS({
    "node_modules/masonry-layout/masonry.js"(exports2, module2) {
      (function(window2, factory) {
        if (typeof define == "function" && define.amd) {
          define(
            [
              "outlayer/outlayer",
              "get-size/get-size"
            ],
            factory
          );
        } else if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory(
            require_outlayer(),
            require_get_size()
          );
        } else {
          window2.Masonry = factory(
            window2.Outlayer,
            window2.getSize
          );
        }
      })(window, function factory(Outlayer, getSize) {
        "use strict";
        var Masonry = Outlayer.create("masonry");
        Masonry.compatOptions.fitWidth = "isFitWidth";
        var proto = Masonry.prototype;
        proto._resetLayout = function() {
          this.getSize();
          this._getMeasurement("columnWidth", "outerWidth");
          this._getMeasurement("gutter", "outerWidth");
          this.measureColumns();
          this.colYs = [];
          for (var i2 = 0; i2 < this.cols; i2++) {
            this.colYs.push(0);
          }
          this.maxY = 0;
          this.horizontalColIndex = 0;
        };
        proto.measureColumns = function() {
          this.getContainerWidth();
          if (!this.columnWidth) {
            var firstItem = this.items[0];
            var firstItemElem = firstItem && firstItem.element;
            this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || // if first elem has no width, default to size of container
            this.containerWidth;
          }
          var columnWidth = this.columnWidth += this.gutter;
          var containerWidth = this.containerWidth + this.gutter;
          var cols = containerWidth / columnWidth;
          var excess = columnWidth - containerWidth % columnWidth;
          var mathMethod = excess && excess < 1 ? "round" : "floor";
          cols = Math[mathMethod](cols);
          this.cols = Math.max(cols, 1);
        };
        proto.getContainerWidth = function() {
          var isFitWidth = this._getOption("fitWidth");
          var container = isFitWidth ? this.element.parentNode : this.element;
          var size = getSize(container);
          this.containerWidth = size && size.innerWidth;
        };
        proto._getItemLayoutPosition = function(item) {
          item.getSize();
          var remainder = item.size.outerWidth % this.columnWidth;
          var mathMethod = remainder && remainder < 1 ? "round" : "ceil";
          var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
          colSpan = Math.min(colSpan, this.cols);
          var colPosMethod = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition";
          var colPosition = this[colPosMethod](colSpan, item);
          var position = {
            x: this.columnWidth * colPosition.col,
            y: colPosition.y
          };
          var setHeight = colPosition.y + item.size.outerHeight;
          var setMax = colSpan + colPosition.col;
          for (var i2 = colPosition.col; i2 < setMax; i2++) {
            this.colYs[i2] = setHeight;
          }
          return position;
        };
        proto._getTopColPosition = function(colSpan) {
          var colGroup = this._getTopColGroup(colSpan);
          var minimumY = Math.min.apply(Math, colGroup);
          return {
            col: colGroup.indexOf(minimumY),
            y: minimumY
          };
        };
        proto._getTopColGroup = function(colSpan) {
          if (colSpan < 2) {
            return this.colYs;
          }
          var colGroup = [];
          var groupCount = this.cols + 1 - colSpan;
          for (var i2 = 0; i2 < groupCount; i2++) {
            colGroup[i2] = this._getColGroupY(i2, colSpan);
          }
          return colGroup;
        };
        proto._getColGroupY = function(col, colSpan) {
          if (colSpan < 2) {
            return this.colYs[col];
          }
          var groupColYs = this.colYs.slice(col, col + colSpan);
          return Math.max.apply(Math, groupColYs);
        };
        proto._getHorizontalColPosition = function(colSpan, item) {
          var col = this.horizontalColIndex % this.cols;
          var isOver = colSpan > 1 && col + colSpan > this.cols;
          col = isOver ? 0 : col;
          var hasSize = item.size.outerWidth && item.size.outerHeight;
          this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
          return {
            col,
            y: this._getColGroupY(col, colSpan)
          };
        };
        proto._manageStamp = function(stamp) {
          var stampSize = getSize(stamp);
          var offset = this._getElementOffset(stamp);
          var isOriginLeft = this._getOption("originLeft");
          var firstX = isOriginLeft ? offset.left : offset.right;
          var lastX = firstX + stampSize.outerWidth;
          var firstCol = Math.floor(firstX / this.columnWidth);
          firstCol = Math.max(0, firstCol);
          var lastCol = Math.floor(lastX / this.columnWidth);
          lastCol -= lastX % this.columnWidth ? 0 : 1;
          lastCol = Math.min(this.cols - 1, lastCol);
          var isOriginTop = this._getOption("originTop");
          var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
          for (var i2 = firstCol; i2 <= lastCol; i2++) {
            this.colYs[i2] = Math.max(stampMaxY, this.colYs[i2]);
          }
        };
        proto._getContainerSize = function() {
          this.maxY = Math.max.apply(Math, this.colYs);
          var size = {
            height: this.maxY
          };
          if (this._getOption("fitWidth")) {
            size.width = this._getContainerFitWidth();
          }
          return size;
        };
        proto._getContainerFitWidth = function() {
          var unusedCols = 0;
          var i2 = this.cols;
          while (--i2) {
            if (this.colYs[i2] !== 0) {
              break;
            }
            unusedCols++;
          }
          return (this.cols - unusedCols) * this.columnWidth - this.gutter;
        };
        proto.needsResizeLayout = function() {
          var previousWidth = this.containerWidth;
          this.getContainerWidth();
          return previousWidth != this.containerWidth;
        };
        return Masonry;
      });
    }
  });

  // node_modules/ev-emitter/ev-emitter.js
  var require_ev_emitter2 = __commonJS({
    "node_modules/ev-emitter/ev-emitter.js"(exports2, module2) {
      (function(global, factory) {
        if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory();
        } else {
          global.EvEmitter = factory();
        }
      })(typeof window != "undefined" ? window : exports2, function() {
        function EvEmitter() {
        }
        let proto = EvEmitter.prototype;
        proto.on = function(eventName, listener) {
          if (!eventName || !listener) return this;
          let events = this._events = this._events || {};
          let listeners = events[eventName] = events[eventName] || [];
          if (!listeners.includes(listener)) {
            listeners.push(listener);
          }
          return this;
        };
        proto.once = function(eventName, listener) {
          if (!eventName || !listener) return this;
          this.on(eventName, listener);
          let onceEvents = this._onceEvents = this._onceEvents || {};
          let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
          onceListeners[listener] = true;
          return this;
        };
        proto.off = function(eventName, listener) {
          let listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) return this;
          let index = listeners.indexOf(listener);
          if (index != -1) {
            listeners.splice(index, 1);
          }
          return this;
        };
        proto.emitEvent = function(eventName, args) {
          let listeners = this._events && this._events[eventName];
          if (!listeners || !listeners.length) return this;
          listeners = listeners.slice(0);
          args = args || [];
          let onceListeners = this._onceEvents && this._onceEvents[eventName];
          for (let listener of listeners) {
            let isOnce = onceListeners && onceListeners[listener];
            if (isOnce) {
              this.off(eventName, listener);
              delete onceListeners[listener];
            }
            listener.apply(this, args);
          }
          return this;
        };
        proto.allOff = function() {
          delete this._events;
          delete this._onceEvents;
          return this;
        };
        return EvEmitter;
      });
    }
  });

  // node_modules/imagesloaded/imagesloaded.js
  var require_imagesloaded = __commonJS({
    "node_modules/imagesloaded/imagesloaded.js"(exports2, module2) {
      (function(window2, factory) {
        if (typeof module2 == "object" && module2.exports) {
          module2.exports = factory(window2, require_ev_emitter2());
        } else {
          window2.imagesLoaded = factory(window2, window2.EvEmitter);
        }
      })(
        typeof window !== "undefined" ? window : exports2,
        function factory(window2, EvEmitter) {
          let $2 = window2.jQuery;
          let console2 = window2.console;
          function makeArray(obj2) {
            if (Array.isArray(obj2)) return obj2;
            let isArrayLike = typeof obj2 == "object" && typeof obj2.length == "number";
            if (isArrayLike) return [...obj2];
            return [obj2];
          }
          function ImagesLoaded(elem, options, onAlways) {
            if (!(this instanceof ImagesLoaded)) {
              return new ImagesLoaded(elem, options, onAlways);
            }
            let queryElem = elem;
            if (typeof elem == "string") {
              queryElem = document.querySelectorAll(elem);
            }
            if (!queryElem) {
              console2.error(`Bad element for imagesLoaded ${queryElem || elem}`);
              return;
            }
            this.elements = makeArray(queryElem);
            this.options = {};
            if (typeof options == "function") {
              onAlways = options;
            } else {
              Object.assign(this.options, options);
            }
            if (onAlways) this.on("always", onAlways);
            this.getImages();
            if ($2) this.jqDeferred = new $2.Deferred();
            setTimeout(this.check.bind(this));
          }
          ImagesLoaded.prototype = Object.create(EvEmitter.prototype);
          ImagesLoaded.prototype.getImages = function() {
            this.images = [];
            this.elements.forEach(this.addElementImages, this);
          };
          const elementNodeTypes = [1, 9, 11];
          ImagesLoaded.prototype.addElementImages = function(elem) {
            if (elem.nodeName === "IMG") {
              this.addImage(elem);
            }
            if (this.options.background === true) {
              this.addElementBackgroundImages(elem);
            }
            let { nodeType } = elem;
            if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
            let childImgs = elem.querySelectorAll("img");
            for (let img of childImgs) {
              this.addImage(img);
            }
            if (typeof this.options.background == "string") {
              let children = elem.querySelectorAll(this.options.background);
              for (let child of children) {
                this.addElementBackgroundImages(child);
              }
            }
          };
          const reURL = /url\((['"])?(.*?)\1\)/gi;
          ImagesLoaded.prototype.addElementBackgroundImages = function(elem) {
            let style = getComputedStyle(elem);
            if (!style) return;
            let matches = reURL.exec(style.backgroundImage);
            while (matches !== null) {
              let url = matches && matches[2];
              if (url) {
                this.addBackground(url, elem);
              }
              matches = reURL.exec(style.backgroundImage);
            }
          };
          ImagesLoaded.prototype.addImage = function(img) {
            let loadingImage = new LoadingImage(img);
            this.images.push(loadingImage);
          };
          ImagesLoaded.prototype.addBackground = function(url, elem) {
            let background = new Background(url, elem);
            this.images.push(background);
          };
          ImagesLoaded.prototype.check = function() {
            this.progressedCount = 0;
            this.hasAnyBroken = false;
            if (!this.images.length) {
              this.complete();
              return;
            }
            let onProgress = (image, elem, message) => {
              setTimeout(() => {
                this.progress(image, elem, message);
              });
            };
            this.images.forEach(function(loadingImage) {
              loadingImage.once("progress", onProgress);
              loadingImage.check();
            });
          };
          ImagesLoaded.prototype.progress = function(image, elem, message) {
            this.progressedCount++;
            this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
            this.emitEvent("progress", [this, image, elem]);
            if (this.jqDeferred && this.jqDeferred.notify) {
              this.jqDeferred.notify(this, image);
            }
            if (this.progressedCount === this.images.length) {
              this.complete();
            }
            if (this.options.debug && console2) {
              console2.log(`progress: ${message}`, image, elem);
            }
          };
          ImagesLoaded.prototype.complete = function() {
            let eventName = this.hasAnyBroken ? "fail" : "done";
            this.isComplete = true;
            this.emitEvent(eventName, [this]);
            this.emitEvent("always", [this]);
            if (this.jqDeferred) {
              let jqMethod = this.hasAnyBroken ? "reject" : "resolve";
              this.jqDeferred[jqMethod](this);
            }
          };
          function LoadingImage(img) {
            this.img = img;
          }
          LoadingImage.prototype = Object.create(EvEmitter.prototype);
          LoadingImage.prototype.check = function() {
            let isComplete = this.getIsImageComplete();
            if (isComplete) {
              this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
              return;
            }
            this.proxyImage = new Image();
            if (this.img.crossOrigin) {
              this.proxyImage.crossOrigin = this.img.crossOrigin;
            }
            this.proxyImage.addEventListener("load", this);
            this.proxyImage.addEventListener("error", this);
            this.img.addEventListener("load", this);
            this.img.addEventListener("error", this);
            this.proxyImage.src = this.img.currentSrc || this.img.src;
          };
          LoadingImage.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth;
          };
          LoadingImage.prototype.confirm = function(isLoaded, message) {
            this.isLoaded = isLoaded;
            let { parentNode } = this.img;
            let elem = parentNode.nodeName === "PICTURE" ? parentNode : this.img;
            this.emitEvent("progress", [this, elem, message]);
          };
          LoadingImage.prototype.handleEvent = function(event) {
            let method = "on" + event.type;
            if (this[method]) {
              this[method](event);
            }
          };
          LoadingImage.prototype.onload = function() {
            this.confirm(true, "onload");
            this.unbindEvents();
          };
          LoadingImage.prototype.onerror = function() {
            this.confirm(false, "onerror");
            this.unbindEvents();
          };
          LoadingImage.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this);
            this.proxyImage.removeEventListener("error", this);
            this.img.removeEventListener("load", this);
            this.img.removeEventListener("error", this);
          };
          function Background(url, element) {
            this.url = url;
            this.element = element;
            this.img = new Image();
          }
          Background.prototype = Object.create(LoadingImage.prototype);
          Background.prototype.check = function() {
            this.img.addEventListener("load", this);
            this.img.addEventListener("error", this);
            this.img.src = this.url;
            let isComplete = this.getIsImageComplete();
            if (isComplete) {
              this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
              this.unbindEvents();
            }
          };
          Background.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this);
            this.img.removeEventListener("error", this);
          };
          Background.prototype.confirm = function(isLoaded, message) {
            this.isLoaded = isLoaded;
            this.emitEvent("progress", [this, this.element, message]);
          };
          ImagesLoaded.makeJQueryPlugin = function(jQuery2) {
            jQuery2 = jQuery2 || window2.jQuery;
            if (!jQuery2) return;
            $2 = jQuery2;
            $2.fn.imagesLoaded = function(options, onAlways) {
              let instance = new ImagesLoaded(this, options, onAlways);
              return instance.jqDeferred.promise($2(this));
            };
          };
          ImagesLoaded.makeJQueryPlugin();
          return ImagesLoaded;
        }
      );
    }
  });

  // node_modules/riot/riot+compiler.min.js
  var require_riot_compiler_min = __commonJS({
    "node_modules/riot/riot+compiler.min.js"(exports2, module2) {
      (function(e, t) {
        "use strict";
        var n2 = { version: "v2.3.13", settings: {} }, r2 = 0, i2 = [], o = {}, f = "riot-", a = f + "tag", u = "string", s = "object", c = "undefined", l = "function", p = /^(?:opt(ion|group)|tbody|col|t[rhd])$/, d = ["_item", "_id", "_parent", "update", "root", "mount", "unmount", "mixin", "isMounted", "isLoop", "tags", "parent", "opts", "trigger", "on", "off", "one"], g = (e && e.document || {}).documentMode | 0;
        n2.observable = function(e2) {
          e2 = e2 || {};
          var t2 = {}, n3 = Array.prototype.slice, r3 = function(e3, t3) {
            e3.replace(/\S+/g, t3);
          }, i3 = function(t3, n4) {
            Object.defineProperty(e2, t3, { value: n4, enumerable: false, writable: false, configurable: false });
          };
          i3("on", function(n4, i4) {
            if (typeof i4 != "function") return e2;
            r3(n4, function(e3, n5) {
              (t2[e3] = t2[e3] || []).push(i4);
              i4.typed = n5 > 0;
            });
            return e2;
          });
          i3("off", function(n4, i4) {
            if (n4 == "*" && !i4) t2 = {};
            else {
              r3(n4, function(e3) {
                if (i4) {
                  var n5 = t2[e3];
                  for (var r4 = 0, o2; o2 = n5 && n5[r4]; ++r4) {
                    if (o2 == i4) n5.splice(r4--, 1);
                  }
                } else delete t2[e3];
              });
            }
            return e2;
          });
          i3("one", function(t3, n4) {
            function r4() {
              e2.off(t3, r4);
              n4.apply(e2, arguments);
            }
            return e2.on(t3, r4);
          });
          i3("trigger", function(i4) {
            var o2 = n3.call(arguments, 1), f2;
            r3(i4, function(r4) {
              f2 = n3.call(t2[r4] || [], 0);
              for (var i5 = 0, a2; a2 = f2[i5]; ++i5) {
                if (a2.busy) return;
                a2.busy = 1;
                a2.apply(e2, a2.typed ? [r4].concat(o2) : o2);
                if (f2[i5] !== a2) {
                  i5--;
                }
                a2.busy = 0;
              }
              if (t2["*"] && r4 != "*") e2.trigger.apply(e2, ["*", r4].concat(o2));
            });
            return e2;
          });
          return e2;
        };
        (function(t2) {
          var n3 = /^.+?\/+[^\/]+/, r3 = "EventListener", i3 = "remove" + r3, o2 = "add" + r3, f2 = "hasAttribute", a2 = "replace", u2 = "popstate", s2 = "hashchange", c2 = "trigger", l2 = 3, p2 = typeof e != "undefined" && e, d2 = typeof document != "undefined" && document, g2 = p2 && history, h2 = p2 && (g2.location || p2.location), m2 = R2.prototype, v2 = d2 && d2.ontouchstart ? "touchstart" : "click", y2 = false, b2 = t2.observable(), w2 = false, x2, _2, S2, C2, N2, E2 = [], L2 = 0;
          function O2(e2) {
            return e2.split(/[\/?#]/);
          }
          function j3(e2, t3) {
            var n4 = new RegExp("^" + t3[a2](/\*/g, "([^/?#]+?)")[a2](/\.\./, ".*") + "$"), r4 = e2.match(n4);
            if (r4) return r4.slice(1);
          }
          function T2(e2, t3) {
            var n4;
            return function() {
              clearTimeout(n4);
              n4 = setTimeout(e2, t3);
            };
          }
          function M2(e2) {
            x2 = T2(H2, 1);
            p2[o2](u2, x2);
            p2[o2](s2, x2);
            d2[o2](v2, F2);
            if (e2) H2(true);
          }
          function R2() {
            this.$ = [];
            t2.observable(this);
            b2.on("stop", this.s.bind(this));
            b2.on("emit", this.e.bind(this));
          }
          function k2(e2) {
            return e2[a2](/^\/|\/$/, "");
          }
          function A2(e2) {
            return typeof e2 == "string";
          }
          function $3(e2) {
            return (e2 || h2.href || "")[a2](n3, "");
          }
          function I2(e2) {
            return _2[0] == "#" ? (e2 || h2.href || "").split(_2)[1] || "" : $3(e2)[a2](_2, "");
          }
          function H2(e2) {
            var t3 = L2 == 0;
            if (l2 <= L2) return;
            L2++;
            E2.push(function() {
              var t4 = I2();
              if (e2 || t4 != S2) {
                b2[c2]("emit", t4);
                S2 = t4;
              }
            });
            if (t3) {
              while (E2.length) {
                E2[0]();
                E2.shift();
              }
              L2 = 0;
            }
          }
          function F2(e2) {
            if (e2.which != 1 || e2.metaKey || e2.ctrlKey || e2.shiftKey || e2.defaultPrevented) return;
            var t3 = e2.target;
            while (t3 && t3.nodeName != "A") t3 = t3.parentNode;
            if (!t3 || t3.nodeName != "A" || t3[f2]("download") || !t3[f2]("href") || t3.target && t3.target != "_self" || t3.href.indexOf(h2.href.match(n3)[0]) == -1) return;
            if (t3.href != h2.href) {
              if (t3.href.split("#")[0] == h2.href.split("#")[0] || _2 != "#" && $3(t3.href).indexOf(_2) !== 0 || !B2(I2(t3.href), t3.title || d2.title)) return;
            }
            e2.preventDefault();
          }
          function B2(e2, t3, n4) {
            if (g2) {
              e2 = _2 + k2(e2);
              t3 = t3 || d2.title;
              n4 ? g2.replaceState(null, t3, e2) : g2.pushState(null, t3, e2);
              d2.title = t3;
              w2 = false;
              H2();
              return w2;
            }
            return b2[c2]("emit", I2(e2));
          }
          m2.m = function(e2, t3, n4) {
            if (A2(e2) && (!t3 || A2(t3))) B2(e2, t3, n4 || false);
            else if (t3) this.r(e2, t3);
            else this.r("@", e2);
          };
          m2.s = function() {
            this.off("*");
            this.$ = [];
          };
          m2.e = function(e2) {
            this.$.concat("@").some(function(t3) {
              var n4 = (t3 == "@" ? C2 : N2)(k2(e2), k2(t3));
              if (typeof n4 != "undefined") {
                this[c2].apply(null, [t3].concat(n4));
                return w2 = true;
              }
            }, this);
          };
          m2.r = function(e2, t3) {
            if (e2 != "@") {
              e2 = "/" + k2(e2);
              this.$.push(e2);
            }
            this.on(e2, t3);
          };
          var K2 = new R2();
          var P2 = K2.m.bind(K2);
          P2.create = function() {
            var e2 = new R2();
            e2.m.stop = e2.s.bind(e2);
            return e2.m.bind(e2);
          };
          P2.base = function(e2) {
            _2 = e2 || "#";
            S2 = I2();
          };
          P2.exec = function() {
            H2(true);
          };
          P2.parser = function(e2, t3) {
            if (!e2 && !t3) {
              C2 = O2;
              N2 = j3;
            }
            if (e2) C2 = e2;
            if (t3) N2 = t3;
          };
          P2.query = function() {
            var e2 = {};
            var t3 = h2.href || S2;
            t3[a2](/[?&](.+?)=([^&]*)/g, function(t4, n4, r4) {
              e2[n4] = r4;
            });
            return e2;
          };
          P2.stop = function() {
            if (y2) {
              if (p2) {
                p2[i3](u2, x2);
                p2[i3](s2, x2);
                d2[i3](v2, F2);
              }
              b2[c2]("stop");
              y2 = false;
            }
          };
          P2.start = function(e2) {
            if (!y2) {
              if (p2) {
                if (document.readyState == "complete") M2(e2);
                else p2[o2]("load", function() {
                  setTimeout(function() {
                    M2(e2);
                  }, 1);
                });
              }
              y2 = true;
            }
          };
          P2.base();
          P2.parser();
          t2.route = P2;
        })(n2);
        var h = (function(e2) {
          var t2 = "g", r3 = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g, i3 = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g, o2 = i3.source + "|" + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + "|" + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source, f2 = "{ }", a2 = { "(": RegExp("([()])|" + o2, t2), "[": RegExp("([[\\]])|" + o2, t2), "{": RegExp("([{}])|" + o2, t2) };
          var u2 = e2, s2, c2 = [];
          function l2(e3) {
            return e3;
          }
          function p2(e3, n3) {
            if (!n3) n3 = c2;
            return new RegExp(e3.source.replace(/{/g, n3[2]).replace(/}/g, n3[3]), e3.global ? t2 : "");
          }
          function d2(e3) {
            var n3, r4 = e3.split(" ");
            if (e3 === f2) {
              r4[2] = r4[0];
              r4[3] = r4[1];
              n3 = l2;
            } else {
              if (r4.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(e3)) {
                throw new Error('Unsupported brackets "' + e3 + '"');
              }
              r4 = r4.concat(e3.replace(/(?=[[\]()*+?.^$|])/g, "\\").split(" "));
              n3 = p2;
            }
            r4[4] = n3(r4[1].length > 1 ? /{[\S\s]*?}/ : /{[^}]*}/, r4);
            r4[5] = n3(/\\({|})/g, r4);
            r4[6] = n3(/(\\?)({)/g, r4);
            r4[7] = RegExp("(\\\\?)(?:([[({])|(" + r4[3] + "))|" + o2, t2);
            r4[8] = e3;
            return r4;
          }
          function g2(e3) {
            if (!e3) e3 = f2;
            if (e3 !== c2[8]) {
              c2 = d2(e3);
              s2 = e3 === f2 ? l2 : p2;
              c2[9] = s2(/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/);
              c2[10] = s2(/(^|[^\\]){=[\S\s]*?}/);
              h2._rawOffset = c2[0].length;
            }
            u2 = e3;
          }
          function h2(e3) {
            return e3 instanceof RegExp ? s2(e3) : c2[e3];
          }
          h2.split = function y2(e3, t3, n3) {
            if (!n3) n3 = c2;
            var r4 = [], i4, o3, f3, u3, s3 = n3[6];
            o3 = f3 = s3.lastIndex = 0;
            while (i4 = s3.exec(e3)) {
              u3 = i4.index;
              if (o3) {
                if (i4[2]) {
                  s3.lastIndex = p3(i4[2], s3.lastIndex);
                  continue;
                }
                if (!i4[3]) continue;
              }
              if (!i4[1]) {
                l3(e3.slice(f3, u3));
                f3 = s3.lastIndex;
                s3 = n3[6 + (o3 ^= 1)];
                s3.lastIndex = f3;
              }
            }
            if (e3 && f3 < e3.length) {
              l3(e3.slice(f3));
            }
            return r4;
            function l3(e4) {
              if (t3 || o3) r4.push(e4 && e4.replace(n3[5], "$1"));
              else r4.push(e4);
            }
            function p3(t4, n4) {
              var r5, i5 = a2[t4], o4 = 1;
              i5.lastIndex = n4;
              while (r5 = i5.exec(e3)) {
                if (r5[1] && !(r5[1] === t4 ? ++o4 : --o4)) break;
              }
              return r5 ? i5.lastIndex : e3.length;
            }
          };
          h2.hasExpr = function b2(e3) {
            return h2(4).test(e3);
          };
          h2.loopKeys = function w2(e3) {
            var t3 = e3.match(h2(9));
            return t3 ? { key: t3[1], pos: t3[2], val: c2[0] + t3[3].trim() + c2[1] } : { val: e3.trim() };
          };
          h2.array = function x2(e3) {
            return d2(e3 || u2);
          };
          var m2;
          function v2(e3) {
            var t3;
            e3 = e3 || {};
            t3 = e3.brackets;
            Object.defineProperty(e3, "brackets", { set: g2, get: function() {
              return u2;
            }, enumerable: true });
            m2 = e3;
            g2(t3);
          }
          Object.defineProperty(h2, "settings", { set: v2, get: function() {
            return m2;
          } });
          h2.settings = typeof n2 !== "undefined" && n2.settings || {};
          h2.set = g2;
          h2.R_STRINGS = i3;
          h2.R_MLCOMMS = r3;
          h2.S_QBLOCKS = o2;
          return h2;
        })();
        var m = (function() {
          var t2 = {};
          function n3(e2, n4) {
            if (!e2) return e2;
            return (t2[e2] || (t2[e2] = i3(e2))).call(n4, r3);
          }
          n3.isRaw = function(e2) {
            return e2[h._rawOffset] === "=";
          };
          n3.haveRaw = function(e2) {
            return h(10).test(e2);
          };
          n3.hasExpr = h.hasExpr;
          n3.loopKeys = h.loopKeys;
          n3.errorHandler = null;
          function r3(e2, t3) {
            if (n3.errorHandler) {
              e2.riotData = { tagName: t3 && t3.root && t3.root.tagName, _riot_id: t3 && t3._riot_id };
              n3.errorHandler(e2);
            }
          }
          function i3(e2) {
            var t3 = a2(e2);
            if (t3.slice(0, 11) !== "try{return ") t3 = "return " + t3;
            return new Function("E", t3 + ";");
          }
          var o2 = RegExp(h.S_QBLOCKS, "g"), f2 = /\x01(\d+)~/g;
          function a2(e2) {
            var t3 = [], n4, r4 = h.split(e2.replace(/\u2057/g, '"'), 1);
            if (r4.length > 2 || r4[0]) {
              var i4, o3, a3 = [];
              for (i4 = o3 = 0; i4 < r4.length; ++i4) {
                n4 = r4[i4];
                if (n4 && (n4 = i4 & 1 ? s2(n4, 1, t3) : '"' + n4.replace(/\\/g, "\\\\").replace(/\r\n?|\n/g, "\\n").replace(/"/g, '\\"') + '"')) a3[o3++] = n4;
              }
              n4 = o3 < 2 ? a3[0] : "[" + a3.join(",") + '].join("")';
            } else {
              n4 = s2(r4[1], 0, t3);
            }
            if (t3[0]) n4 = n4.replace(f2, function(e3, n5) {
              return t3[n5].replace(/\r/g, "\\r").replace(/\n/g, "\\n");
            });
            return n4;
          }
          var u2 = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\x01(\d+)~):/;
          function s2(e2, t3, n4) {
            if (e2[0] === "=") e2 = e2.slice(1);
            e2 = e2.replace(o2, function(e3, t4) {
              return e3.length > 2 && !t4 ? "" + (n4.push(e3) - 1) + "~" : e3;
            }).replace(/\s+/g, " ").trim().replace(/\ ?([[\({},?\.:])\ ?/g, "$1");
            if (e2) {
              var r4 = [], i4 = 0, f3;
              while (e2 && (f3 = e2.match(u2)) && !f3.index) {
                var a3, s3, c3 = /,|([[{(])|$/g;
                e2 = RegExp.rightContext;
                a3 = f3[2] ? n4[f3[2]].slice(1, -1).trim().replace(/\s+/g, " ") : f3[1];
                while (s3 = (f3 = c3.exec(e2))[1]) l3(s3, c3);
                s3 = e2.slice(0, f3.index);
                e2 = RegExp.rightContext;
                r4[i4++] = d2(s3, 1, a3);
              }
              e2 = !i4 ? d2(e2, t3) : i4 > 1 ? "[" + r4.join(",") + '].join(" ").trim()' : r4[0];
            }
            return e2;
            function l3(t4, n5) {
              var r5, i5 = 1, o3 = t4 === "(" ? /[()]/g : t4 === "[" ? /[[\]]/g : /[{}]/g;
              o3.lastIndex = n5.lastIndex;
              while (r5 = o3.exec(e2)) {
                if (r5[0] === t4) ++i5;
                else if (!--i5) break;
              }
              n5.lastIndex = i5 ? e2.length : o3.lastIndex;
            }
          }
          var c2 = '"in this?this:' + (typeof e !== "object" ? "global" : "window") + ").", l2 = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g, p2 = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;
          function d2(e2, t3, n4) {
            var r4;
            e2 = e2.replace(l2, function(e3, t4, n5, i4, o3) {
              if (n5) {
                i4 = r4 ? 0 : i4 + e3.length;
                if (n5 !== "this" && n5 !== "global" && n5 !== "window") {
                  e3 = t4 + '("' + n5 + c2 + n5;
                  if (i4) r4 = (o3 = o3[i4]) === "." || o3 === "(" || o3 === "[";
                } else if (i4) {
                  r4 = !p2.test(o3.slice(i4));
                }
              }
              return e3;
            });
            if (r4) {
              e2 = "try{return " + e2 + "}catch(e){E(e,this)}";
            }
            if (n4) {
              e2 = (r4 ? "function(){" + e2 + "}.call(this)" : "(" + e2 + ")") + '?"' + n4 + '":""';
            } else if (t3) {
              e2 = "function(v){" + (r4 ? e2.replace("return ", "v=") : "v=(" + e2 + ")") + ';return v||v===0?v:""}.call(this)';
            }
            return e2;
          }
          n3.parse = function(e2) {
            return e2;
          };
          return n3;
        })();
        m.version = h.version = "v2.3.20";
        var v = (function(e2) {
          var t2 = { tr: "tbody", th: "tr", td: "tr", tbody: "table", col: "colgroup" }, n3 = /<yield\s+to=(['"])?@\1\s*>([\S\s]+?)<\/yield\s*>/.source, r3 = "div";
          e2 = e2 && e2 < 10;
          function i3(n4, i4) {
            var a2 = n4 && n4.match(/^\s*<([-\w]+)/), u2 = a2 && a2[1].toLowerCase(), s2 = t2[u2] || r3, c2 = W(s2);
            c2.stub = true;
            if (i4) n4 = f2(n4, i4);
            if (e2 && u2 && (a2 = u2.match(p))) o2(c2, n4, u2, !!a2[1]);
            else c2.innerHTML = n4;
            return c2;
          }
          function o2(e3, t3, n4, i4) {
            var o3 = W(r3), f3 = i4 ? "select>" : "table>", a2;
            o3.innerHTML = "<" + f3 + t3 + "</" + f3;
            a2 = ee(n4, o3);
            if (a2) e3.appendChild(a2);
          }
          function f2(e3, t3) {
            if (!/<yield\b/i.test(e3)) return e3;
            var r4 = 0;
            e3 = e3.replace(/<yield\s+from=['"]([-\w]+)['"]\s*(?:\/>|>\s*<\/yield\s*>)/gi, function(e4, i4) {
              var o3 = t3.match(RegExp(n3.replace("@", i4), "i"));
              ++r4;
              return o3 && o3[2] || "";
            });
            return r4 ? e3 : e3.replace(/<yield\s*(?:\/>|>\s*<\/yield\s*>)/gi, t3 || "");
          }
          return i3;
        })(g);
        function y(e2, t2, n3) {
          var r3 = {};
          r3[e2.key] = t2;
          if (e2.pos) r3[e2.pos] = n3;
          return r3;
        }
        function b(e2, t2) {
          var n3 = t2.length, r3 = e2.length, i3;
          while (n3 > r3) {
            i3 = t2[--n3];
            t2.splice(n3, 1);
            i3.unmount();
          }
        }
        function w(e2, t2) {
          Object.keys(e2.tags).forEach(function(n3) {
            var r3 = e2.tags[n3];
            if (U(r3)) M(r3, function(e3) {
              B(e3, n3, t2);
            });
            else B(r3, n3, t2);
          });
        }
        function x(e2, t2, n3) {
          var r3 = e2._root, i3;
          e2._virts = [];
          while (r3) {
            i3 = r3.nextSibling;
            if (n3) t2.insertBefore(r3, n3._root);
            else t2.appendChild(r3);
            e2._virts.push(r3);
            r3 = i3;
          }
        }
        function _(e2, t2, n3, r3) {
          var i3 = e2._root, o2, f2 = 0;
          for (; f2 < r3; f2++) {
            o2 = i3.nextSibling;
            t2.insertBefore(i3, n3._root);
            i3 = o2;
          }
        }
        function S(e2, t2, n3) {
          k(e2, "each");
          var r3 = typeof $2(e2, "no-reorder") !== u || k(e2, "no-reorder"), i3 = D(e2), f2 = o[i3] || { tmpl: e2.outerHTML }, a2 = p.test(i3), s2 = e2.parentNode, c2 = document.createTextNode(""), l2 = H(e2), d2 = /option/gi.test(i3), g2 = [], h2 = [], v2, S2 = e2.tagName == "VIRTUAL";
          n3 = m.loopKeys(n3);
          s2.insertBefore(c2, e2);
          t2.one("before-mount", function() {
            e2.parentNode.removeChild(e2);
            if (s2.stub) s2 = t2.root;
          }).on("update", function() {
            var u2 = m(n3.val, t2), p2 = document.createDocumentFragment();
            if (!U(u2)) {
              v2 = u2 || false;
              u2 = v2 ? Object.keys(u2).map(function(e3) {
                return y(n3, e3, u2[e3]);
              }) : [];
            }
            u2.forEach(function(u3, c3) {
              var d3 = r3 && u3 instanceof Object, m2 = h2.indexOf(u3), b2 = ~m2 && d3 ? m2 : c3, C2 = g2[b2];
              u3 = !v2 && n3.key ? y(n3, u3, c3) : u3;
              if (!d3 && !C2 || d3 && !~m2 || !C2) {
                C2 = new L(f2, { parent: t2, isLoop: true, hasImpl: !!o[i3], root: a2 ? s2 : e2.cloneNode(), item: u3 }, e2.innerHTML);
                C2.mount();
                if (S2) C2._root = C2.root.firstChild;
                if (c3 == g2.length) {
                  if (S2) x(C2, p2);
                  else p2.appendChild(C2.root);
                } else {
                  if (S2) x(C2, s2, g2[c3]);
                  else s2.insertBefore(C2.root, g2[c3].root);
                  h2.splice(c3, 0, u3);
                }
                g2.splice(c3, 0, C2);
                b2 = c3;
              } else C2.update(u3);
              if (b2 !== c3 && d3) {
                if (S2) _(C2, s2, g2[c3], e2.childNodes.length);
                else s2.insertBefore(C2.root, g2[c3].root);
                if (n3.pos) C2[n3.pos] = c3;
                g2.splice(c3, 0, g2.splice(b2, 1)[0]);
                h2.splice(c3, 0, h2.splice(b2, 1)[0]);
                if (!l2) w(C2, c3);
              }
              C2._item = u3;
              q(C2, "_parent", t2);
            }, true);
            b(u2, g2);
            if (d2) s2.appendChild(p2);
            else s2.insertBefore(p2, c2);
            if (l2) t2.tags[i3] = g2;
            h2 = u2.slice();
          });
        }
        var C = (function(t2) {
          if (!e) return { add: function() {
          }, inject: function() {
          } };
          var n3 = (function() {
            var e2 = W("style");
            I(e2, "type", "text/css");
            var t3 = ee("style[type=riot]");
            if (t3) {
              if (t3.id) e2.id = t3.id;
              t3.parentNode.replaceChild(e2, t3);
            } else document.getElementsByTagName("head")[0].appendChild(e2);
            return e2;
          })();
          var r3 = n3.styleSheet, i3 = "";
          Object.defineProperty(t2, "styleNode", { value: n3, writable: true });
          return { add: function(e2) {
            i3 += e2;
          }, inject: function() {
            if (i3) {
              if (r3) r3.cssText += i3;
              else n3.innerHTML += i3;
              i3 = "";
            }
          } };
        })(n2);
        function N(e2, t2, n3, r3) {
          Z(e2, function(e3) {
            if (e3.nodeType == 1) {
              e3.isLoop = e3.isLoop || (e3.parentNode && e3.parentNode.isLoop || $2(e3, "each")) ? 1 : 0;
              if (n3) {
                var i3 = H(e3);
                if (i3 && !e3.isLoop) n3.push(K(i3, { root: e3, parent: t2 }, e3.innerHTML, t2));
              }
              if (!e3.isLoop || r3) re(e3, t2, []);
            }
          });
        }
        function E(e2, t2, n3) {
          function r3(e3, t3, r4) {
            if (m.hasExpr(t3)) {
              n3.push(Q({ dom: e3, expr: t3 }, r4));
            }
          }
          Z(e2, function(e3) {
            var n4 = e3.nodeType, i3;
            if (n4 == 3 && e3.parentNode.tagName != "STYLE") r3(e3, e3.nodeValue);
            if (n4 != 1) return;
            i3 = $2(e3, "each");
            if (i3) {
              S(e3, t2, i3);
              return false;
            }
            M(e3.attributes, function(t3) {
              var n5 = t3.name, i4 = n5.split("__")[1];
              r3(e3, t3.value, { attr: i4 || n5, bool: i4 });
              if (i4) {
                k(e3, n5);
                return false;
              }
            });
            if (H(e3)) return false;
          });
        }
        function L(e2, o2, f2) {
          var a2 = n2.observable(this), l2 = te(o2.opts) || {}, p2 = o2.parent, g2 = o2.isLoop, h2 = o2.hasImpl, y2 = V(o2.item), b2 = [], w2 = [], x2 = o2.root, _2 = e2.fn, S2 = x2.tagName.toLowerCase(), C2 = {}, L2 = [], O2;
          if (_2 && x2._tag) x2._tag.unmount(true);
          this.isMounted = false;
          x2.isLoop = g2;
          x2._tag = this;
          q(this, "_riot_id", ++r2);
          Q(this, { parent: p2, root: x2, opts: l2, tags: {} }, y2);
          M(x2.attributes, function(e3) {
            var t2 = e3.value;
            if (m.hasExpr(t2)) C2[e3.name] = t2;
          });
          O2 = v(e2.tmpl, f2);
          function j3() {
            var e3 = h2 && g2 ? a2 : p2 || a2;
            M(x2.attributes, function(t2) {
              var n3 = t2.value;
              l2[A(t2.name)] = m.hasExpr(n3) ? m(n3, e3) : n3;
            });
            M(Object.keys(C2), function(t2) {
              l2[A(t2)] = m(C2[t2], e3);
            });
          }
          function $3(e3) {
            for (var t2 in y2) {
              if (typeof a2[t2] !== c && G(a2, t2)) a2[t2] = e3[t2];
            }
          }
          function H2() {
            if (!a2.parent || !g2) return;
            M(Object.keys(a2.parent), function(e3) {
              var t2 = !z(d, e3) && z(L2, e3);
              if (typeof a2[e3] === c || t2) {
                if (!t2) L2.push(e3);
                a2[e3] = a2.parent[e3];
              }
            });
          }
          q(this, "update", function(e3) {
            e3 = V(e3);
            H2();
            if (e3 && typeof y2 === s) {
              $3(e3);
              y2 = e3;
            }
            Q(a2, e3);
            j3();
            a2.trigger("update", e3);
            T(b2, a2);
            oe(function() {
              a2.trigger("updated");
            });
            return this;
          });
          q(this, "mixin", function() {
            M(arguments, function(e3) {
              var t2;
              e3 = typeof e3 === u ? n2.mixin(e3) : e3;
              if (R(e3)) {
                t2 = new e3();
                e3 = e3.prototype;
              } else t2 = e3;
              M(Object.getOwnPropertyNames(e3), function(e4) {
                if (e4 != "init") a2[e4] = R(t2[e4]) ? t2[e4].bind(a2) : t2[e4];
              });
              if (t2.init) t2.init.bind(a2)();
            });
            return this;
          });
          q(this, "mount", function() {
            j3();
            if (_2) _2.call(a2, l2);
            E(O2, a2, b2);
            F2(true);
            if (e2.attrs || h2) {
              J(e2.attrs, function(e3, t2) {
                I(x2, e3, t2);
              });
              E(a2.root, a2, b2);
            }
            if (!a2.parent || g2) a2.update(y2);
            a2.trigger("before-mount");
            if (g2 && !h2) {
              a2.root = x2 = O2.firstChild;
            } else {
              while (O2.firstChild) x2.appendChild(O2.firstChild);
              if (x2.stub) a2.root = x2 = p2.root;
            }
            if (g2) N(a2.root, a2.parent, null, true);
            if (!a2.parent || a2.parent.isMounted) {
              a2.isMounted = true;
              a2.trigger("mount");
            } else a2.parent.one("mount", function() {
              if (!X(a2.root)) {
                a2.parent.isMounted = a2.isMounted = true;
                a2.trigger("mount");
              }
            });
          });
          q(this, "unmount", function(e3) {
            var n3 = x2, r3 = n3.parentNode, o3;
            a2.trigger("before-unmount");
            i2.splice(i2.indexOf(a2), 1);
            if (this._virts) {
              M(this._virts, function(e4) {
                e4.parentNode.removeChild(e4);
              });
            }
            if (r3) {
              if (p2) {
                o3 = P(p2);
                if (U(o3.tags[S2])) M(o3.tags[S2], function(e4, t2) {
                  if (e4._riot_id == a2._riot_id) o3.tags[S2].splice(t2, 1);
                });
                else o3.tags[S2] = t;
              } else while (n3.firstChild) n3.removeChild(n3.firstChild);
              if (!e3) r3.removeChild(n3);
              else k(r3, "riot-tag");
            }
            a2.trigger("unmount");
            F2();
            a2.off("*");
            a2.isMounted = false;
            delete x2._tag;
          });
          function F2(e3) {
            M(w2, function(t3) {
              t3[e3 ? "mount" : "unmount"]();
            });
            if (!p2) return;
            var t2 = e3 ? "on" : "off";
            if (g2) p2[t2]("unmount", a2.unmount);
            else p2[t2]("update", a2.update)[t2]("unmount", a2.unmount);
          }
          N(O2, this, w2);
        }
        function O(t2, n3, r3, i3) {
          r3[t2] = function(t3) {
            var o2 = i3._parent, f2 = i3._item, a2;
            if (!f2) while (o2 && !f2) {
              f2 = o2._item;
              o2 = o2._parent;
            }
            t3 = t3 || e.event;
            if (G(t3, "currentTarget")) t3.currentTarget = r3;
            if (G(t3, "target")) t3.target = t3.srcElement;
            if (G(t3, "which")) t3.which = t3.charCode || t3.keyCode;
            t3.item = f2;
            if (n3.call(i3, t3) !== true && !/radio|check/.test(r3.type)) {
              if (t3.preventDefault) t3.preventDefault();
              t3.returnValue = false;
            }
            if (!t3.preventUpdate) {
              a2 = f2 ? P(o2) : i3;
              a2.update();
            }
          };
        }
        function j2(e2, t2, n3) {
          if (!e2) return;
          e2.insertBefore(n3, t2);
          e2.removeChild(t2);
        }
        function T(e2, t2) {
          M(e2, function(e3, n3) {
            var r3 = e3.dom, i3 = e3.attr, o2 = m(e3.expr, t2), u2 = e3.dom.parentNode;
            if (e3.bool) o2 = o2 ? i3 : false;
            else if (o2 == null) o2 = "";
            if (u2 && u2.tagName == "TEXTAREA") {
              o2 = ("" + o2).replace(/riot-/g, "");
              u2.value = o2;
            }
            if (e3.value === o2) return;
            e3.value = o2;
            if (!i3) {
              r3.nodeValue = "" + o2;
              return;
            }
            k(r3, i3);
            if (R(o2)) {
              O(i3, o2, r3, t2);
            } else if (i3 == "if") {
              var c2 = e3.stub, l2 = function() {
                j2(c2.parentNode, c2, r3);
              }, p2 = function() {
                j2(r3.parentNode, r3, c2);
              };
              if (o2) {
                if (c2) {
                  l2();
                  r3.inStub = false;
                  if (!X(r3)) {
                    Z(r3, function(e4) {
                      if (e4._tag && !e4._tag.isMounted) e4._tag.isMounted = !!e4._tag.trigger("mount");
                    });
                  }
                }
              } else {
                c2 = e3.stub = c2 || document.createTextNode("");
                if (r3.parentNode) p2();
                else (t2.parent || t2).one("updated", p2);
                r3.inStub = true;
              }
            } else if (/^(show|hide)$/.test(i3)) {
              if (i3 == "hide") o2 = !o2;
              r3.style.display = o2 ? "" : "none";
            } else if (i3 == "value") {
              r3.value = o2;
            } else if (ie(i3, f) && i3 != a) {
              if (o2) I(r3, i3.slice(f.length), o2);
            } else {
              if (e3.bool) {
                r3[i3] = o2;
                if (!o2) return;
              }
              if (o2 === 0 || o2 && typeof o2 !== s) I(r3, i3, o2);
            }
          });
        }
        function M(e2, t2) {
          for (var n3 = 0, r3 = (e2 || []).length, i3; n3 < r3; n3++) {
            i3 = e2[n3];
            if (i3 != null && t2(i3, n3) === false) n3--;
          }
          return e2;
        }
        function R(e2) {
          return typeof e2 === l || false;
        }
        function k(e2, t2) {
          e2.removeAttribute(t2);
        }
        function A(e2) {
          return e2.replace(/-(\w)/g, function(e3, t2) {
            return t2.toUpperCase();
          });
        }
        function $2(e2, t2) {
          return e2.getAttribute(t2);
        }
        function I(e2, t2, n3) {
          e2.setAttribute(t2, n3);
        }
        function H(e2) {
          return e2.tagName && o[$2(e2, a) || e2.tagName.toLowerCase()];
        }
        function F(e2, t2, n3) {
          var r3 = n3.tags[t2];
          if (r3) {
            if (!U(r3)) {
              if (r3 !== e2) n3.tags[t2] = [r3];
            }
            if (!z(n3.tags[t2], e2)) n3.tags[t2].push(e2);
          } else {
            n3.tags[t2] = e2;
          }
        }
        function B(e2, t2, n3) {
          var r3 = e2.parent, i3;
          if (!r3) return;
          i3 = r3.tags[t2];
          if (U(i3)) i3.splice(n3, 0, i3.splice(i3.indexOf(e2), 1)[0]);
          else F(e2, t2, r3);
        }
        function K(e2, t2, n3, r3) {
          var i3 = new L(e2, t2, n3), o2 = D(t2.root), f2 = P(r3);
          i3.parent = f2;
          i3._parent = r3;
          F(i3, o2, f2);
          if (f2 !== r3) F(i3, o2, r3);
          t2.root.innerHTML = "";
          return i3;
        }
        function P(e2) {
          var t2 = e2;
          while (!H(t2.root)) {
            if (!t2.parent) break;
            t2 = t2.parent;
          }
          return t2;
        }
        function q(e2, t2, n3, r3) {
          Object.defineProperty(e2, t2, Q({ value: n3, enumerable: false, writable: false, configurable: false }, r3));
          return e2;
        }
        function D(e2) {
          var t2 = H(e2), n3 = $2(e2, "name"), r3 = n3 && !m.hasExpr(n3) ? n3 : t2 ? t2.name : e2.tagName.toLowerCase();
          return r3;
        }
        function Q(e2) {
          var t2, n3 = arguments;
          for (var r3 = 1; r3 < n3.length; ++r3) {
            if (t2 = n3[r3]) {
              for (var i3 in t2) {
                if (G(e2, i3)) e2[i3] = t2[i3];
              }
            }
          }
          return e2;
        }
        function z(e2, t2) {
          return ~e2.indexOf(t2);
        }
        function U(e2) {
          return Array.isArray(e2) || e2 instanceof Array;
        }
        function G(e2, t2) {
          var n3 = Object.getOwnPropertyDescriptor(e2, t2);
          return typeof e2[t2] === c || n3 && n3.writable;
        }
        function V(e2) {
          if (!(e2 instanceof L) && !(e2 && typeof e2.trigger == l)) return e2;
          var t2 = {};
          for (var n3 in e2) {
            if (!z(d, n3)) t2[n3] = e2[n3];
          }
          return t2;
        }
        function Z(e2, t2) {
          if (e2) {
            if (t2(e2) === false) return;
            else {
              e2 = e2.firstChild;
              while (e2) {
                Z(e2, t2);
                e2 = e2.nextSibling;
              }
            }
          }
        }
        function J(e2, t2) {
          var n3, r3 = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
          while (n3 = r3.exec(e2)) {
            t2(n3[1].toLowerCase(), n3[2] || n3[3] || n3[4]);
          }
        }
        function X(e2) {
          while (e2) {
            if (e2.inStub) return true;
            e2 = e2.parentNode;
          }
          return false;
        }
        function W(e2) {
          return document.createElement(e2);
        }
        function Y(e2, t2) {
          return (t2 || document).querySelectorAll(e2);
        }
        function ee(e2, t2) {
          return (t2 || document).querySelector(e2);
        }
        function te(e2) {
          function t2() {
          }
          t2.prototype = e2;
          return new t2();
        }
        function ne(e2) {
          return $2(e2, "id") || $2(e2, "name");
        }
        function re(e2, t2, n3) {
          var r3 = ne(e2), i3, o2 = function(o3) {
            if (z(n3, r3)) return;
            i3 = U(o3);
            if (!o3) t2[r3] = e2;
            else if (!i3 || i3 && !z(o3, e2)) {
              if (i3) o3.push(e2);
              else t2[r3] = [o3, e2];
            }
          };
          if (!r3) return;
          if (m.hasExpr(r3)) t2.one("mount", function() {
            r3 = ne(e2);
            o2(t2[r3]);
          });
          else o2(t2[r3]);
        }
        function ie(e2, t2) {
          return e2.slice(0, t2.length) === t2;
        }
        var oe = (function(e2) {
          var t2 = e2.requestAnimationFrame || e2.mozRequestAnimationFrame || e2.webkitRequestAnimationFrame;
          if (!t2 || /iP(ad|hone|od).*OS 6/.test(e2.navigator.userAgent)) {
            var n3 = 0;
            t2 = function(e3) {
              var t3 = Date.now(), r3 = Math.max(16 - (t3 - n3), 0);
              setTimeout(function() {
                e3(n3 = t3 + r3);
              }, r3);
            };
          }
          return t2;
        })(e || {});
        function fe(e2, t2, n3) {
          var r3 = o[t2], f2 = e2._innerHTML = e2._innerHTML || e2.innerHTML;
          e2.innerHTML = "";
          if (r3 && e2) r3 = new L(r3, { root: e2, opts: n3 }, f2);
          if (r3 && r3.mount) {
            r3.mount();
            if (!z(i2, r3)) i2.push(r3);
          }
          return r3;
        }
        n2.util = { brackets: h, tmpl: m };
        n2.mixin = /* @__PURE__ */ (function() {
          var e2 = {};
          return function(t2, n3) {
            if (!n3) return e2[t2];
            e2[t2] = n3;
          };
        })();
        n2.tag = function(e2, t2, n3, r3, i3) {
          if (R(r3)) {
            i3 = r3;
            if (/^[\w\-]+\s?=/.test(n3)) {
              r3 = n3;
              n3 = "";
            } else r3 = "";
          }
          if (n3) {
            if (R(n3)) i3 = n3;
            else C.add(n3);
          }
          o[e2] = { name: e2, tmpl: t2, attrs: r3, fn: i3 };
          return e2;
        };
        n2.tag2 = function(e2, t2, n3, r3, i3, f2) {
          if (n3) C.add(n3);
          o[e2] = { name: e2, tmpl: t2, attrs: r3, fn: i3 };
          return e2;
        };
        n2.mount = function(e2, t2, n3) {
          var r3, i3, f2 = [];
          function c2(e3) {
            var t3 = "";
            M(e3, function(e4) {
              if (!/[^-\w]/.test(e4)) t3 += ",*[" + a + "=" + e4.trim() + "]";
            });
            return t3;
          }
          function l2() {
            var e3 = Object.keys(o);
            return e3 + c2(e3);
          }
          function p2(e3) {
            var r4;
            if (e3.tagName) {
              if (t2 && (!(r4 = $2(e3, a)) || r4 != t2)) I(e3, a, t2);
              var i4 = fe(e3, t2 || e3.getAttribute(a) || e3.tagName.toLowerCase(), n3);
              if (i4) f2.push(i4);
            } else if (e3.length) M(e3, p2);
          }
          C.inject();
          if (typeof t2 === s) {
            n3 = t2;
            t2 = 0;
          }
          if (typeof e2 === u) {
            if (e2 === "*") e2 = i3 = l2();
            else e2 += c2(e2.split(","));
            r3 = e2 ? Y(e2) : [];
          } else r3 = e2;
          if (t2 === "*") {
            t2 = i3 || l2();
            if (r3.tagName) r3 = Y(t2, r3);
            else {
              var d2 = [];
              M(r3, function(e3) {
                d2.push(Y(t2, e3));
              });
              r3 = d2;
            }
            t2 = 0;
          }
          if (r3.tagName) p2(r3);
          else M(r3, p2);
          return f2;
        };
        n2.update = function() {
          return M(i2, function(e2) {
            e2.update();
          });
        };
        n2.Tag = L;
        var ae = (function() {
          var t2 = { none: function(e2) {
            return e2;
          } };
          t2.javascript = t2.none;
          function n3(n4, r4) {
            var i4;
            switch (n4) {
              case "coffee":
                r4 = "CoffeeScript";
                break;
              case "es6":
              case "babel":
                r4 = "babel";
                break;
              case "none":
              case "javascript":
                return t2.none;
              default:
                if (!r4) r4 = n4;
                break;
            }
            i4 = e[r4];
            if (!i4) throw new Error(r4 + " parser not found.");
            t2[n4] = i4;
            return i4;
          }
          function r3(e2, r4) {
            return e2 in t2 ? t2[e2] : n3(e2, r4);
          }
          function i3(e2, t3) {
            if (t3) {
              for (var n4 in t3) {
                if (t3.hasOwnProperty(n4)) {
                  e2[n4] = t3[n4];
                }
              }
            }
            return e2;
          }
          var o2 = { jade: function(e2, t3, n4) {
            return r3("jade").render(e2, i3({ pretty: true, filename: n4, doctype: "html" }, t3));
          } };
          var f2 = { less: function(e2, t3, n4, o3) {
            var f3 = r3("less"), a3;
            f3.render(t3, i3({ sync: true, syncImport: true, filename: o3, compress: true }, n4), function(e3, t4) {
              if (e3) throw e3;
              a3 = t4.css;
            });
            return a3;
          }, stylus: function(e2, t3, n4, o3) {
            var f3 = i3({ filename: o3 }, n4), a3 = r3("stylus"), u2 = r3("nib");
            return u2 ? a3(t3, f3).use(u2()).import("nib").render() : a3.render(t3, f3);
          } };
          var a2 = { livescript: function(e2, t3) {
            return r3("livescript").compile(e2, i3({ bare: true, header: false }, t3));
          }, typescript: function(e2, t3) {
            return r3("typescript")(e2, t3).replace(/\r\n?/g, "\n");
          }, es6: function(e2, t3) {
            return r3("es6").transform(e2, i3({ blacklist: ["useStrict", "strict", "react"], sourceMaps: false, comments: false }, t3)).code;
          }, babel: function(e2, t3, n4) {
            return r3("babel").transform(e2, i3({ filename: n4 }, t3)).code;
          }, coffee: function(e2, t3) {
            return r3("coffee").compile(e2, i3({ bare: true }, t3));
          }, none: t2.none };
          a2.javascript = a2.none;
          a2.coffeescript = a2.coffee;
          return { html: o2, css: f2, js: a2, _req: r3 };
        })();
        n2.parsers = ae;
        var ue = (function() {
          function e2(e3, t3) {
            return new RegExp(e3, t3);
          }
          var t2 = e2("^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$"), r3 = ["style", "src", "d"], i3 = /^(?:input|img|br|wbr|hr|area|base|col|embed|keygen|link|meta|param|source|track)$/, o2 = /\s*([-\w:\xA0-\xFF]+)\s*(?:=\s*('[^']+'|"[^"]+"|\S+))?/g, f2 = /^"(?:number|date(?:time)?|time|month|email|color)\b/i, a2 = /[ \t]+$/gm, u2 = h.R_STRINGS.source;
          function s2(e3) {
            return "'" + (e3 ? e3.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r") : "") + "'";
          }
          function c2(e3, t3, n3, r4, i4, o3) {
            var f3 = ", ", a3 = "}" + (o3.length ? ", " + s2(o3._bp[8]) : "") + ");";
            if (i4 && i4.slice(-1) !== "\n") a3 = "\n" + a3;
            return "riot.tag2('" + e3 + "'" + f3 + s2(t3) + f3 + s2(n3) + f3 + s2(r4) + ", function(opts) {\n" + i4 + a3;
          }
          function l2(e3, n3) {
            var i4 = [], a3, u3, s3, c3, l3, p3 = '"';
            o2.lastIndex = 0;
            e3 = e3.replace(/\s+/g, " ");
            while (a3 = o2.exec(e3)) {
              u3 = a3[1].toLowerCase();
              s3 = a3[2];
              if (!s3) {
                i4.push(u3);
              } else {
                if (s3[0] !== p3) s3 = p3 + (s3[0] === "'" ? s3.slice(1, -1) : s3) + p3;
                if (u3 === "type" && f2.test(s3)) {
                  c3 = s3;
                } else {
                  if (/\u0001\d/.test(s3)) {
                    if (u3 === "value") l3 = 1;
                    else if (t2.test(u3)) u3 = "__" + u3;
                    else if (~r3.indexOf(u3)) u3 = "riot-" + u3;
                  }
                  i4.push(u3 + "=" + s3);
                }
              }
            }
            if (c3) {
              if (l3) c3 = p3 + n3._bp[0] + "'" + c3.slice(1, -1) + "'" + n3._bp[1] + p3;
              i4.push("type=" + c3);
            }
            return i4.join(" ");
          }
          function p2(e3, t3, n3) {
            var r4 = n3._bp;
            if (e3 && r4[4].test(e3)) {
              var i4 = t3.expr && (t3.parser || t3.type) ? S2 : 0, o3 = h.split(e3, 0, r4), f3;
              for (var a3 = 1; a3 < o3.length; a3 += 2) {
                f3 = o3[a3];
                if (f3[0] === "^") f3 = f3.slice(1);
                else if (i4) {
                  var u3 = f3[0] === "=";
                  f3 = i4(u3 ? f3.slice(1) : f3, t3).trim();
                  if (f3.slice(-1) === ";") f3 = f3.slice(0, -1);
                  if (u3) f3 = "=" + f3;
                }
                o3[a3] = "" + (n3.push(f3.replace(/[\r\n]+/g, " ").trim()) - 1) + r4[1];
              }
              e3 = o3.join("");
            }
            return e3;
          }
          function d2(e3, t3) {
            if (t3.length) {
              e3 = e3.replace(/\u0001(\d+)/g, function(e4, n3) {
                var r4 = t3[n3];
                if (r4[0] === "=") {
                  r4 = r4.replace(h.R_STRINGS, function(e5) {
                    return e5.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                  });
                }
                return t3._bp[0] + r4.replace(/"/g, "\u2057");
              });
            }
            return e3;
          }
          var g2 = e2(/<!--(?!>)[\S\s]*?-->/.source + "|" + u2, "g"), m2 = /<([-\w]+)\s*([^"'\/>]*(?:(?:"[^"]*"|'[^']*'|\/[^>])[^'"\/>]*)*)(\/?)>/g, v2 = e2(/<pre(?:\s+[^'">]+(?:(?:@Q)|[^>]*)*|\s*)?>([\S\s]*?)<\/pre\s*>/.source.replace("@Q", u2), "gi");
          function y2(e3, t3, n3) {
            e3 = p2(e3, t3, n3).replace(m2, function(e4, t4, r5, o3) {
              t4 = t4.toLowerCase();
              o3 = o3 && !i3.test(t4) ? "></" + t4 : "";
              if (r5) t4 += " " + l2(r5, n3);
              return "<" + t4 + o3 + ">";
            });
            if (!t3.whitespace) {
              if (/<pre[\s>]/.test(e3)) {
                var r4 = [];
                e3 = e3.replace(v2, function(e4) {
                  return r4.push(e4) && "";
                }).trim().replace(/\s+/g, " ");
                if (r4.length) e3 = e3.replace(/\u0002/g, function() {
                  return r4.shift();
                });
              } else e3 = e3.trim().replace(/\s+/g, " ");
            }
            if (t3.compact) e3 = e3.replace(/> <([-\w\/])/g, "><$1");
            return d2(e3, n3);
          }
          function b2(e3, t3, n3) {
            if (Array.isArray(t3)) {
              n3 = t3;
              t3 = {};
            } else {
              if (!n3) n3 = [];
              if (!t3) t3 = {};
            }
            e3 = e3.replace(/\r\n?/g, "\n").replace(g2, function(e4) {
              return e4[0] === "<" ? "" : e4;
            }).replace(a2, "");
            if (!n3._bp) n3._bp = h.array(t3.brackets);
            return y2(e3, t3, n3);
          }
          var w2 = e2("(" + h.S_QBLOCKS + ")|" + h.R_MLCOMMS.source + "|//[^\r\n]*", "g"), x2 = /^([ \t]*)([$_A-Za-z][$\w]*)\s*(\([^()]*\)\s*{)/m;
          function _2(t3) {
            var n3, r4, i4 = [], o3;
            t3 = t3.replace(w2, function(e3, t4) {
              return t4 ? e3 : " ";
            });
            while (n3 = t3.match(x2)) {
              i4.push(RegExp.leftContext);
              t3 = RegExp.rightContext;
              o3 = f3(t3);
              r4 = !/^(?:if|while|for|switch|catch|function)$/.test(n3[2]);
              if (r4) n3[0] = n3[1] + "this." + n3[2] + " = function" + n3[3];
              i4.push(n3[0], t3.slice(0, o3));
              t3 = t3.slice(o3);
              if (r4 && !/^\s*.\s*bind\b/.test(t3)) i4.push(".bind(this)");
            }
            return i4.length ? i4.join("") + t3 : t3;
            function f3(t4) {
              var n4 = e2("([{}])|" + h.S_QBLOCKS, "g"), r5 = 1, i5;
              while (r5 && (i5 = n4.exec(t4))) {
                if (i5[1]) i5[1] === "{" ? ++r5 : --r5;
              }
              return r5 ? t4.length : n4.lastIndex;
            }
          }
          function S2(e3, t3, n3, r4, i4) {
            if (!e3) return "";
            if (!n3) n3 = t3.type;
            var o3 = t3.parser || (n3 ? ae.js[n3] : _2);
            if (!o3) throw new Error('JS parser not found: "' + n3 + '"');
            return o3(e3, r4, i4).replace(a2, "");
          }
          function C2(e3, t3, n3, r4) {
            if (typeof t3 === "string") {
              r4 = n3;
              n3 = t3;
              t3 = {};
            }
            if (typeof n3 === "object") {
              r4 = n3;
              n3 = "";
            } else if (!r4) r4 = {};
            return S2(e3, t3, n3, r4.parserOptions, r4.url);
          }
          var N2 = e2("(}|{|^)[ ;]*([^@ ;{}][^{}]*)(?={)|" + u2, "g");
          function E2(e3, t3) {
            var n3 = ":scope";
            return t3.replace(N2, function(t4, r4, i4) {
              if (!i4) return t4;
              i4 = i4.replace(/[^,]+/g, function(t5) {
                var r5 = t5.trim();
                if (r5 && r5 !== "from" && r5 !== "to" && r5.slice(-1) !== "%") {
                  if (r5.indexOf(n3) < 0) r5 = n3 + " " + r5;
                  r5 = r5.replace(n3, e3) + "," + r5.replace(n3, '[riot-tag="' + e3 + '"]');
                }
                return t5.slice(-1) === " " ? r5 + " " : r5;
              });
              return r4 ? r4 + " " + i4 : i4;
            });
          }
          function L2(e3, t3, n3, r4) {
            var i4 = (r4 || (r4 = {})).scoped;
            if (n3) {
              if (n3 === "scoped-css") {
                i4 = true;
              } else if (ae.css[n3]) {
                e3 = ae.css[n3](t3, e3, r4.parserOpts || {}, r4.url);
              } else if (n3 !== "css") {
                throw new Error('CSS parser not found: "' + n3 + '"');
              }
            }
            e3 = e3.replace(h.R_MLCOMMS, "").replace(/\s+/g, " ").trim();
            if (i4) {
              if (!t3) throw new Error("Can not parse scoped CSS without a tagName");
              e3 = E2(t3, e3);
            }
            return e3;
          }
          function O2(e3, t3, n3) {
            if (typeof t3 === "object") {
              n3 = t3;
              t3 = "";
            }
            return L2(e3, n3.tagName, t3, n3);
          }
          var j3 = /\stype\s*=\s*(?:(['"])(.+?)\1|(\S+))/i, T2 = /\s*=\s*("(?:\\[\S\s]|[^"\\]*)*"|'(?:\\[\S\s]|[^'\\]*)*'|\{[^}]+}|\S+)/.source;
          function M2(e3) {
            if (e3) {
              var t3 = e3.match(j3);
              e3 = t3 && (t3[2] || t3[3]);
            }
            return e3 ? e3.replace("text/", "") : "";
          }
          function R2(t3, n3) {
            if (t3) {
              var r4 = e2("\\s" + n3 + T2, "i"), i4 = t3.match(r4);
              t3 = i4 && i4[1];
              if (t3) return /^['"]/.test(t3) ? t3.slice(1, -1) : t3;
            }
            return "";
          }
          function k2(e3) {
            var t3 = R2(e3, "options");
            if (t3) t3 = JSON.parse(t3);
            return t3;
          }
          function A2(e3, t3, n3, r4) {
            var i4 = M2(n3), o3 = k2(n3);
            return S2(e3, t3, i4, o3, r4);
          }
          function $3(e3, t3, n3, r4, i4) {
            var o3 = { parserOpts: k2(n3), scoped: n3 && /\sscoped(\s|=|$)/i.test(n3), url: r4 };
            return L2(e3, i4, M2(n3) || t3.style, o3);
          }
          var I2 = /\/>\n|^<(?:\/[\w\-]+\s*|[\w\-]+(?:\s+(?:[-\w:\xA0-\xFF][\S\s]*?)?)?)>\n/;
          function H2(e3) {
            var t3, n3;
            if (e3[e3.length - 1] === ">") return [e3, ""];
            t3 = e3.lastIndexOf("<");
            while (~t3) {
              if (n3 = e3.slice(t3).match(I2)) {
                t3 += n3.index + n3[0].length;
                return [e3.slice(0, t3), e3.slice(t3)];
              }
              t3 = e3.lastIndexOf("<", t3 - 1);
            }
            return ["", e3];
          }
          function F2(e3, t3, n3, r4) {
            var i4 = ae.html[n3];
            if (!i4) throw new Error('Template parser not found: "' + n3 + '"');
            return i4(e3, r4, t3);
          }
          var B2 = e2(/^([ \t]*)<([-\w]+)(?:\s+([^'"\/>]+(?:(?:@Q|\/[^>])[^'"\/>]*)*)|\s*)?(?:\/>|>[ \t]*\n?([\S\s]*)^\1<\/\2\s*>|>(.*)<\/\2\s*>)/.source.replace("@Q", u2), "gim"), K2 = /<style(\s+[^>]*)?>\n?([^<]*(?:<(?!\/style\s*>)[^<]*)*)<\/style\s*>/.source + "|" + u2, P2 = e2(K2, "gi"), q2 = e2(K2.replace(/style/g, "script"), "gi");
          function D2(t3, n3, r4) {
            var i4 = [], o3;
            if (!n3) n3 = {};
            if (!r4) r4 = "";
            o3 = n3.exclude || false;
            function f3(e3) {
              return !(o3 && ~o3.indexOf(e3));
            }
            var u3 = h.array(n3.brackets);
            if (n3.template) t3 = F2(t3, r4, n3.template, n3.templateOptions);
            t3 = t3.replace(/\r\n?/g, "\n").replace(B2, function(t4, o4, s3, h2, m3, v3) {
              var b3 = "", w3 = "", x3 = "", _3 = [];
              _3._bp = u3;
              s3 = s3.toLowerCase();
              h2 = h2 && f3("attribs") ? d2(l2(p2(h2, n3, _3), _3), _3) : "";
              if (v3) m3 = v3;
              if (m3 && (m3 = m3.replace(g2, function(e3) {
                return e3[0] === "<" ? "" : e3;
              })) && /\S/.test(m3)) {
                if (v3) {
                  x3 = f3("html") ? y2(v3, n3, _3) : "";
                } else {
                  m3 = m3.replace(e2("^" + o4, "gm"), "");
                  m3 = m3.replace(P2, function(e3, t5, i5) {
                    if (e3[0] !== "<") return e3;
                    if (f3("css")) w3 += (w3 ? " " : "") + $3(i5, n3, t5, r4, s3);
                    return "";
                  });
                  m3 = m3.replace(q2, function(e3, t5, i5) {
                    if (e3[0] !== "<") return e3;
                    if (f3("js")) b3 += (b3 ? "\n" : "") + A2(i5, n3, t5, r4);
                    return "";
                  });
                  var C3 = H2(m3.replace(a2, ""));
                  if (f3("html")) {
                    m3 = C3[0];
                    if (m3) x3 = y2(m3, n3, _3);
                  }
                  if (f3("js")) {
                    m3 = C3[1];
                    if (/\S/.test(m3)) b3 += (b3 ? "\n" : "") + S2(m3, n3, null, null, r4);
                  }
                }
              }
              b3 = /\S/.test(b3) ? b3.replace(/\n{3,}/g, "\n\n") : "";
              if (n3.entities) {
                i4.push({ tagName: s3, html: x3, css: w3, attribs: h2, js: b3 });
                return "";
              }
              return c2(s3, x3, w3, h2, b3, _3);
            });
            if (n3.entities) return i4;
            return t3;
          }
          n2.util.compiler = { compile: D2, html: b2, css: O2, js: C2, version: "v2.3.20" };
          return D2;
        })();
        n2.compile = /* @__PURE__ */ (function() {
          var e2, r3;
          function i3(e3, t2, n3) {
            var r4 = new XMLHttpRequest();
            r4.onreadystatechange = function() {
              if (r4.readyState === 4 && (r4.status === 200 || !r4.status && r4.responseText.length)) {
                t2(r4.responseText, n3, e3);
              }
            };
            r4.open("GET", e3, true);
            r4.send("");
          }
          function o2(e3, t2) {
            if (typeof e3 === u) {
              var n3 = W("script"), r4 = document.documentElement;
              if (t2) e3 += "\n//# sourceURL=" + t2 + ".js";
              n3.text = e3;
              r4.appendChild(n3);
              r4.removeChild(n3);
            }
          }
          function f2(t2, n3) {
            var f3 = Y('script[type="riot/tag"]'), a2 = f3.length;
            function u2() {
              e2.trigger("ready");
              r3 = true;
              if (t2) t2();
            }
            function s2(e3, t3, n4) {
              var r4 = ue(e3, t3, n4);
              o2(r4, n4);
              if (!--a2) u2();
            }
            if (!a2) u2();
            else {
              for (var c2 = 0; c2 < f3.length; ++c2) {
                var l2 = f3[c2], p2 = Q({ template: $2(l2, "template") }, n3), d2 = $2(l2, "src");
                d2 ? i3(d2, s2, p2) : s2(l2.innerHTML, p2);
              }
            }
          }
          return function(a2, c2, l2) {
            if (typeof a2 === u) {
              if (c2 && typeof c2 === s) {
                l2 = c2;
                c2 = false;
              }
              if (/^\s*</m.test(a2)) {
                var p2 = ue(a2, l2);
                if (c2 !== true) o2(p2);
                if (R(c2)) c2(p2, a2, l2);
                return p2;
              }
              i3(a2, function(e3, t2, n3) {
                var r4 = ue(e3, t2, n3);
                o2(r4, n3);
                if (c2) c2(r4, e3, t2);
              });
            } else {
              if (R(a2)) {
                l2 = c2;
                c2 = a2;
              } else {
                l2 = a2;
                c2 = t;
              }
              if (r3) {
                return c2 && c2();
              }
              if (e2) {
                if (c2) e2.on("ready", c2);
              } else {
                e2 = n2.observable();
                f2(c2, l2);
              }
            }
          };
        })();
        var se = n2.mount;
        n2.mount = function(e2, t2, r3) {
          var i3;
          n2.compile(function() {
            i3 = se(e2, t2, r3);
          });
          return i3;
        };
        if (typeof exports2 === s) module2.exports = n2;
        else if (typeof define === l && typeof define.amd !== c) define(function() {
          return n2;
        });
        else e.riot = n2;
      })(typeof window != "undefined" ? window : void 0);
    }
  });

  // js/vendor-extra/bootstrap-wysiwyg.js
  var require_bootstrap_wysiwyg = __commonJS({
    "js/vendor-extra/bootstrap-wysiwyg.js"() {
      (function($2) {
        "use strict";
        var readFileIntoDataUrl = function(fileInfo) {
          var loader = $2.Deferred(), fReader = new FileReader();
          fReader.onload = function(e) {
            loader.resolve(e.target.result);
          };
          fReader.onerror = loader.reject;
          fReader.onprogress = loader.notify;
          fReader.readAsDataURL(fileInfo);
          return loader.promise();
        };
        $2.fn.cleanHtml = function() {
          var html = $2(this).html();
          return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, "");
        };
        $2.fn.wysiwyg = function(userOptions) {
          var editor = this, selectedRange, options, toolbarBtnSelector, updateToolbar = function() {
            if (options.activeToolbarClass) {
              $2(options.toolbarSelector).find(toolbarBtnSelector).each(function() {
                var command = $2(this).data(options.commandRole);
                if (document.queryCommandState(command)) {
                  $2(this).addClass(options.activeToolbarClass);
                } else {
                  $2(this).removeClass(options.activeToolbarClass);
                }
              });
            }
          }, execCommand = function(commandWithArgs, valueArg) {
            var commandArr = commandWithArgs.split(" "), command = commandArr.shift(), args = commandArr.join(" ") + (valueArg || "");
            document.execCommand(command, 0, args);
            updateToolbar();
          }, bindHotkeys = function(hotKeys) {
            $2.each(hotKeys, function(hotkey, command) {
              editor.keydown(hotkey, function(e) {
                if (editor.attr("contenteditable") && editor.is(":visible")) {
                  e.preventDefault();
                  e.stopPropagation();
                  execCommand(command);
                }
              }).keyup(hotkey, function(e) {
                if (editor.attr("contenteditable") && editor.is(":visible")) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              });
            });
          }, getCurrentRange = function() {
            var sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
              return sel.getRangeAt(0);
            }
          }, saveSelection = function() {
            selectedRange = getCurrentRange();
          }, restoreSelection = function() {
            var selection = window.getSelection();
            if (selectedRange) {
              try {
                selection.removeAllRanges();
              } catch (ex) {
                document.body.createTextRange().select();
                document.selection.empty();
              }
              selection.addRange(selectedRange);
            }
          }, insertFiles = function(files) {
            editor.focus();
            $2.each(files, function(idx, fileInfo) {
              if (/^image\//.test(fileInfo.type)) {
                $2.when(readFileIntoDataUrl(fileInfo)).done(function(dataUrl) {
                  execCommand("insertimage", dataUrl);
                }).fail(function(e) {
                  options.fileUploadError("file-reader", e);
                });
              } else {
                options.fileUploadError("unsupported-file-type", fileInfo.type);
              }
            });
          }, markSelection = function(input, color) {
            restoreSelection();
            if (document.queryCommandSupported("hiliteColor")) {
              document.execCommand("hiliteColor", 0, color || "transparent");
            }
            saveSelection();
            input.data(options.selectionMarker, color);
          }, bindToolbar = function(toolbar, options2) {
            toolbar.find(toolbarBtnSelector).click(function() {
              restoreSelection();
              editor.focus();
              execCommand($2(this).data(options2.commandRole));
              saveSelection();
            });
            toolbar.find("[data-toggle=dropdown]").click(restoreSelection);
            toolbar.find("input[type=text][data-" + options2.commandRole + "]").on("webkitspeechchange change", function() {
              var newValue = this.value;
              this.value = "";
              restoreSelection();
              if (newValue) {
                editor.focus();
                execCommand($2(this).data(options2.commandRole), newValue);
              }
              saveSelection();
            }).on("focus", function() {
              var input = $2(this);
              if (!input.data(options2.selectionMarker)) {
                markSelection(input, options2.selectionColor);
                input.focus();
              }
            }).on("blur", function() {
              var input = $2(this);
              if (input.data(options2.selectionMarker)) {
                markSelection(input, false);
              }
            });
            toolbar.find("input[type=file][data-" + options2.commandRole + "]").change(function() {
              restoreSelection();
              if (this.type === "file" && this.files && this.files.length > 0) {
                insertFiles(this.files);
              }
              saveSelection();
              this.value = "";
            });
          }, initFileDrops = function() {
            editor.on("dragenter dragover", false).on("drop", function(e) {
              var dataTransfer = e.originalEvent.dataTransfer;
              e.stopPropagation();
              e.preventDefault();
              if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
                insertFiles(dataTransfer.files);
              }
            });
          };
          options = $2.extend({}, $2.fn.wysiwyg.defaults, userOptions);
          toolbarBtnSelector = "a[data-" + options.commandRole + "],button[data-" + options.commandRole + "],input[type=button][data-" + options.commandRole + "]";
          bindHotkeys(options.hotKeys);
          if (options.dragAndDropImages) {
            initFileDrops();
          }
          bindToolbar($2(options.toolbarSelector), options);
          editor.attr("contenteditable", true).on("mouseup keyup mouseout", function() {
            saveSelection();
            updateToolbar();
          });
          $2(window).bind("touchend", function(e) {
            var isInside = editor.is(e.target) || editor.has(e.target).length > 0, currentRange = getCurrentRange(), clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
            if (!clear || isInside) {
              saveSelection();
              updateToolbar();
            }
          });
          return this;
        };
        $2.fn.wysiwyg.defaults = {
          hotKeys: {
            "ctrl+b meta+b": "bold",
            "ctrl+i meta+i": "italic",
            "ctrl+u meta+u": "underline",
            "ctrl+z meta+z": "undo",
            "ctrl+y meta+y meta+shift+z": "redo",
            "ctrl+l meta+l": "justifyleft",
            "ctrl+r meta+r": "justifyright",
            "ctrl+e meta+e": "justifycenter",
            "ctrl+j meta+j": "justifyfull",
            "shift+tab": "outdent",
            "tab": "indent"
          },
          toolbarSelector: "[data-role=editor-toolbar]",
          commandRole: "edit",
          activeToolbarClass: "btn-info",
          selectionMarker: "edit-focus-marker",
          selectionColor: "darkgrey",
          dragAndDropImages: true,
          fileUploadError: function(reason, detail) {
            console.log("File upload error", reason, detail);
          }
        };
      })(window.jQuery);
    }
  });

  // node_modules/jquery-hotkeys/jquery-hotkeys.js
  var require_jquery_hotkeys = __commonJS({
    "node_modules/jquery-hotkeys/jquery-hotkeys.js"() {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define("jquery-hotkeys", ["jquery"], factory);
        } else {
          factory(jQuery);
        }
      })(function(jQuery2) {
        jQuery2.hotkeys = {
          version: "0.2.0",
          specialKeys: {
            8: "backspace",
            9: "tab",
            10: "return",
            13: "return",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "del",
            59: ";",
            61: "=",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "numlock",
            145: "scroll",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'"
          },
          shiftNums: {
            "`": "~",
            "1": "!",
            "2": "@",
            "3": "#",
            "4": "$",
            "5": "%",
            "6": "^",
            "7": "&",
            "8": "*",
            "9": "(",
            "0": ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
          },
          // excludes: button, checkbox, file, hidden, image, password, radio, reset, search, submit, url
          textAcceptingInputTypes: [
            "text",
            "password",
            "number",
            "email",
            "url",
            "range",
            "date",
            "month",
            "week",
            "time",
            "datetime",
            "datetime-local",
            "search",
            "color",
            "tel"
          ],
          // default input types not to bind to unless bound directly
          textInputTypes: /textarea|input|select/i,
          options: {
            filterInputAcceptingElements: true,
            filterTextInputs: true,
            filterContentEditable: true
          }
        };
        function keyHandler(handleObj) {
          if (typeof handleObj.data === "string") {
            handleObj.data = {
              keys: handleObj.data
            };
          }
          if (!handleObj.data || !handleObj.data.keys || typeof handleObj.data.keys !== "string") {
            return;
          }
          var origHandler = handleObj.handler, keys = handleObj.data.keys.toLowerCase().split(" ");
          handleObj.handler = function(event) {
            if (this !== event.target && (jQuery2.hotkeys.options.filterInputAcceptingElements && jQuery2.hotkeys.textInputTypes.test(event.target.nodeName) || jQuery2.hotkeys.options.filterContentEditable && jQuery2(event.target).attr("contenteditable") || jQuery2.hotkeys.options.filterTextInputs && jQuery2.inArray(event.target.type, jQuery2.hotkeys.textAcceptingInputTypes) > -1)) {
              return;
            }
            var special = event.type !== "keypress" && jQuery2.hotkeys.specialKeys[event.which], character = String.fromCharCode(event.which).toLowerCase(), modif = "", possible = {};
            jQuery2.each(["alt", "ctrl", "shift"], function(index, specialKey) {
              if (event[specialKey + "Key"] && special !== specialKey) {
                modif += specialKey + "+";
              }
            });
            if (event.metaKey && !event.ctrlKey && special !== "meta") {
              modif += "meta+";
            }
            if (event.metaKey && special !== "meta" && modif.indexOf("alt+ctrl+shift+") > -1) {
              modif = modif.replace("alt+ctrl+shift+", "hyper+");
            }
            if (special) {
              possible[modif + special] = true;
            } else {
              possible[modif + character] = true;
              possible[modif + jQuery2.hotkeys.shiftNums[character]] = true;
              if (modif === "shift+") {
                possible[jQuery2.hotkeys.shiftNums[character]] = true;
              }
            }
            for (var i2 = 0, l = keys.length; i2 < l; i2++) {
              if (possible[keys[i2]]) {
                return origHandler.apply(this, arguments);
              }
            }
          };
        }
        jQuery2.each(["keydown", "keyup", "keypress"], function() {
          jQuery2.event.special[this] = {
            add: keyHandler
          };
        });
      });
    }
  });

  // js/vendor-extra/jquery-cloneya.js
  var require_jquery_cloneya = __commonJS({
    "js/vendor-extra/jquery-cloneya.js"() {
      (function($2) {
        var emptyFunction = function() {
        };
        var CloneYa = function(element, options) {
          var regex = /^(.*)(\d)+$/i;
          var regindex = /\[.*(\d+)\]/;
          var elem = $2(element);
          var obj2 = this;
          var defaults = {
            maxLimit: 999,
            //who'll need that many?
            toClone: "toclone",
            baseID: "",
            valueClone: false,
            dataClone: false,
            deepClone: false,
            cloneButton: "clone",
            removeButton: "remove",
            clonePosition: "after",
            beforeClone: emptyFunction,
            afterClone: emptyFunction,
            beforeAppend: emptyFunction,
            afterAppend: emptyFunction,
            beforeRemove: emptyFunction,
            afterRemove: emptyFunction,
            maxLimitReach: emptyFunction,
            indexadjust: true
          };
          var config = $2.extend(defaults, options || {});
          this.getConfig = function() {
            return config;
          };
          var elems = elem.find("." + config.toClone);
          if (!config.baseID) {
            mainid = config.baseID;
          } else {
            mainid = elems.first().attr("id");
          }
          mainid = elems.first().attr("id");
          maininex = elems.first().attr("name");
          var cloneIndex = elems.length;
          elem.on("click", "." + config.cloneButton, function(event) {
            event.preventDefault();
            if (cloneIndex < config.maxLimit) {
              $toclone = $2(this).closest("." + config.toClone);
              config.beforeClone($toclone);
              $newclone = $toclone.clone({
                withDataAndEvents: config.dataClone,
                deepWithDataAndEvents: config.deepClone
              });
              $newclone.find("input, textarea, select").each(function() {
                if (!config.valueClone) {
                  $2(this).val("");
                }
                var name = $2(this).attr("name");
                if (name) {
                  var match = name.match(regindex);
                  if (match && match.length == 2) {
                    newindex = "[]";
                    newname = name.replace(/\[.*(\d+)\]/, newindex);
                    $2(this).attr("name", newname);
                  }
                }
              });
              currIndex = cloneIndex + 1;
              config.afterClone($toclone, $newclone);
              config.beforeAppend($toclone, $newclone);
              if (config.clonePosition != "after") {
                $toclone.before($newclone);
              } else {
                $toclone.after($newclone);
              }
              redoIDs();
              config.afterAppend($toclone, $newclone);
              cloneIndex++;
            } else {
              config.maxLimitReach(config.maxLimit);
            }
          });
          elem.on("click", "." + config.removeButton, function(event) {
            event.preventDefault();
            if (cloneIndex > 1) {
              $toremove = $2(this).closest("." + config.toClone);
              config.beforeRemove($toremove);
              $toremove.remove();
              config.afterRemove($toremove);
              cloneIndex--;
            }
          });
          var redoIDs = function() {
            $2("." + config.toClone).each(function(i2) {
              if (i2 != 0) {
                j = i2;
              } else {
                j = "";
              }
              if ($2(this).attr("id")) {
                $2(this).attr("id", mainid + j);
              }
              $2(this).find("*").each(function() {
                var id = $2(this).attr("id");
                if (id) {
                  var match = id.match(regex);
                  if (match && match.length == 3) {
                    $2(this).attr("id", match[1] + j);
                  } else {
                    $2(this).attr("id", id + j);
                  }
                }
              });
            });
          };
        };
        $2.fn.cloneya = function(options) {
          return this.each(function() {
            var element = $2(this);
            if (element.data("cloneya")) return;
            var cloneya = new CloneYa(this, options);
            element.data("cloneya", cloneya);
          });
        };
      })(jQuery);
    }
  });

  // js/vendor-extra/jquery.screwdefaultbuttons.js
  var require_jquery_screwdefaultbuttons = __commonJS({
    "js/vendor-extra/jquery.screwdefaultbuttons.js"() {
      (function($2, window2, document2, undefined2) {
        var methods = {
          init: function(options) {
            var defaults = $2.extend({
              image: null,
              width: 50,
              height: 50,
              disabled: false
            }, options);
            return this.each(function() {
              var $this = $2(this);
              var $thisImage = defaults.image;
              var dataImage = $this.data("sdb-image");
              if (dataImage) {
                $thisImage = dataImage;
              }
              if (!$thisImage) {
                $2.error("There is no image assigned for ScrewDefaultButtons");
              }
              $this.wrap("<div >").css({ "display": "none" });
              var buttonClass = $this.attr("class");
              var buttonClick = $this.attr("onclick");
              var $thisParent = $this.parent("div");
              $thisParent.addClass(buttonClass);
              $thisParent.attr("onclick", buttonClick);
              $thisParent.css({
                "background-image": $thisImage,
                width: defaults.width,
                height: defaults.height,
                cursor: "pointer"
              });
              var uncheckedPos = 0;
              var checkedPos = -defaults.height;
              if ($this.is(":disabled")) {
                uncheckedPos = -(defaults.height * 2);
                checkedPos = -(defaults.height * 3);
              }
              $this.on("disableBtn", function() {
                $this.attr("disabled", "disabled");
                uncheckedPos = -(defaults.height * 2);
                checkedPos = -(defaults.height * 3);
                $this.trigger("resetBackground");
              });
              $this.on("enableBtn", function() {
                $this.removeAttr("disabled");
                uncheckedPos = 0;
                checkedPos = -defaults.height;
                $this.trigger("resetBackground");
              });
              $this.on("resetBackground", function() {
                if ($this.is(":checked")) {
                  $thisParent.css({
                    backgroundPosition: "0 " + checkedPos + "px"
                  });
                } else {
                  $thisParent.css({
                    backgroundPosition: "0 " + uncheckedPos + "px"
                  });
                }
              });
              $this.trigger("resetBackground");
              if ($this.is(":checkbox")) {
                $thisParent.on("click", function() {
                  if (!$this.is(":disabled")) {
                    $this.change();
                  }
                });
                $thisParent.addClass("styledCheckbox");
                $this.on("change", function() {
                  if ($this.prop("checked")) {
                    $this.prop("checked", false);
                    $thisParent.css({
                      backgroundPosition: "0 " + uncheckedPos + "px"
                    });
                  } else {
                    $this.prop("checked", true);
                    $thisParent.css({
                      backgroundPosition: "0 " + checkedPos + "px"
                    });
                  }
                });
              } else if ($this.is(":radio")) {
                $thisParent.addClass("styledRadio");
                var $thisName = $this.attr("name");
                $thisParent.on("click", function() {
                  if (!$this.prop("checked") && !$this.is(":disabled")) {
                    $this.change();
                  }
                });
                $this.on("change", function() {
                  if ($this.prop("checked")) {
                    $this.prop("checked", false);
                    $thisParent.css({
                      backgroundPosition: "0 " + uncheckedPos + "px"
                    });
                  } else {
                    $this.prop("checked", true);
                    $thisParent.css({
                      backgroundPosition: "0 " + checkedPos + "px"
                    });
                    var otherRadioBtns = $2('input[name="' + $thisName + '"]').not($this);
                    otherRadioBtns.trigger("radioSwitch");
                  }
                });
                $this.on("radioSwitch", function() {
                  $thisParent.css({
                    backgroundPosition: "0 " + uncheckedPos + "px"
                  });
                });
                var $thisId = $2(this).attr("id");
                var $thisLabel = $2('label[for="' + $thisId + '"]');
                $thisLabel.on("click", function() {
                  $thisParent.trigger("click");
                });
              }
              if (!$2.support.leadingWhitespace) {
                var $thisId = $2(this).attr("id");
                var $thisLabel = $2('label[for="' + $thisId + '"]');
                $thisLabel.on("click", function() {
                  $thisParent.trigger("click");
                });
              }
            });
          },
          check: function() {
            return this.each(function() {
              var $this = $2(this);
              if (!methods.isChecked($this)) {
                $this.change();
              }
            });
          },
          uncheck: function() {
            return this.each(function() {
              var $this = $2(this);
              if (methods.isChecked($this)) {
                $this.change();
              }
            });
          },
          toggle: function() {
            return this.each(function() {
              var $this = $2(this);
              $this.change();
            });
          },
          disable: function() {
            return this.each(function() {
              var $this = $2(this);
              $this.trigger("disableBtn");
            });
          },
          enable: function() {
            return this.each(function() {
              var $this = $2(this);
              $this.trigger("enableBtn");
            });
          },
          isChecked: function($this) {
            if ($this.prop("checked")) {
              return true;
            }
            return false;
          }
        };
        $2.fn.screwDefaultButtons = function(method, options) {
          if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
          } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
          } else {
            $2.error("Method " + method + " does not exist on jQuery.screwDefaultButtons");
          }
        };
        return this;
      })(jQuery);
    }
  });

  // node_modules/jquery/dist/jquery.js
  var require_jquery = __commonJS({
    "node_modules/jquery/dist/jquery.js"(exports2, module2) {
      (function(global, factory) {
        "use strict";
        if (typeof module2 === "object" && typeof module2.exports === "object") {
          module2.exports = global.document ? factory(global, true) : function(w) {
            if (!w.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return factory(w);
          };
        } else {
          factory(global);
        }
      })(typeof window !== "undefined" ? window : exports2, function(window2, noGlobal) {
        "use strict";
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var flat = arr.flat ? function(array) {
          return arr.flat.call(array);
        } : function(array) {
          return arr.concat.apply([], array);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction2(obj2) {
          return typeof obj2 === "function" && typeof obj2.nodeType !== "number" && typeof obj2.item !== "function";
        };
        var isWindow = function isWindow2(obj2) {
          return obj2 != null && obj2 === obj2.window;
        };
        var document2 = window2.document;
        var preservedScriptAttributes = {
          type: true,
          src: true,
          nonce: true,
          noModule: true
        };
        function DOMEval(code, node, doc) {
          doc = doc || document2;
          var i2, val, script = doc.createElement("script");
          script.text = code;
          if (node) {
            for (i2 in preservedScriptAttributes) {
              val = node[i2] || node.getAttribute && node.getAttribute(i2);
              if (val) {
                script.setAttribute(i2, val);
              }
            }
          }
          doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function toType(obj2) {
          if (obj2 == null) {
            return obj2 + "";
          }
          return typeof obj2 === "object" || typeof obj2 === "function" ? class2type[toString.call(obj2)] || "object" : typeof obj2;
        }
        var version = "3.7.1", rhtmlSuffix = /HTML$/i, jQuery2 = function(selector, context) {
          return new jQuery2.fn.init(selector, context);
        };
        jQuery2.fn = jQuery2.prototype = {
          // The current version of jQuery being used
          jquery: version,
          constructor: jQuery2,
          // The default length of a jQuery object is 0
          length: 0,
          toArray: function() {
            return slice.call(this);
          },
          // Get the Nth element in the matched element set OR
          // Get the whole matched element set as a clean array
          get: function(num) {
            if (num == null) {
              return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
          },
          // Take an array of elements and push it onto the stack
          // (returning the new matched element set)
          pushStack: function(elems) {
            var ret = jQuery2.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
          },
          // Execute a callback for every element in the matched set.
          each: function(callback) {
            return jQuery2.each(this, callback);
          },
          map: function(callback) {
            return this.pushStack(jQuery2.map(this, function(elem, i2) {
              return callback.call(elem, i2, elem);
            }));
          },
          slice: function() {
            return this.pushStack(slice.apply(this, arguments));
          },
          first: function() {
            return this.eq(0);
          },
          last: function() {
            return this.eq(-1);
          },
          even: function() {
            return this.pushStack(jQuery2.grep(this, function(_elem, i2) {
              return (i2 + 1) % 2;
            }));
          },
          odd: function() {
            return this.pushStack(jQuery2.grep(this, function(_elem, i2) {
              return i2 % 2;
            }));
          },
          eq: function(i2) {
            var len = this.length, j2 = +i2 + (i2 < 0 ? len : 0);
            return this.pushStack(j2 >= 0 && j2 < len ? [this[j2]] : []);
          },
          end: function() {
            return this.prevObject || this.constructor();
          },
          // For internal use only.
          // Behaves like an Array's method, not like a jQuery method.
          push,
          sort: arr.sort,
          splice: arr.splice
        };
        jQuery2.extend = jQuery2.fn.extend = function() {
          var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i2 = 1, length = arguments.length, deep = false;
          if (typeof target === "boolean") {
            deep = target;
            target = arguments[i2] || {};
            i2++;
          }
          if (typeof target !== "object" && !isFunction(target)) {
            target = {};
          }
          if (i2 === length) {
            target = this;
            i2--;
          }
          for (; i2 < length; i2++) {
            if ((options = arguments[i2]) != null) {
              for (name in options) {
                copy = options[name];
                if (name === "__proto__" || target === copy) {
                  continue;
                }
                if (deep && copy && (jQuery2.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                  src = target[name];
                  if (copyIsArray && !Array.isArray(src)) {
                    clone = [];
                  } else if (!copyIsArray && !jQuery2.isPlainObject(src)) {
                    clone = {};
                  } else {
                    clone = src;
                  }
                  copyIsArray = false;
                  target[name] = jQuery2.extend(deep, clone, copy);
                } else if (copy !== void 0) {
                  target[name] = copy;
                }
              }
            }
          }
          return target;
        };
        jQuery2.extend({
          // Unique for each copy of jQuery on the page
          expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
          // Assume jQuery is ready without the ready module
          isReady: true,
          error: function(msg) {
            throw new Error(msg);
          },
          noop: function() {
          },
          isPlainObject: function(obj2) {
            var proto, Ctor;
            if (!obj2 || toString.call(obj2) !== "[object Object]") {
              return false;
            }
            proto = getProto(obj2);
            if (!proto) {
              return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
          },
          isEmptyObject: function(obj2) {
            var name;
            for (name in obj2) {
              return false;
            }
            return true;
          },
          // Evaluates a script in a provided context; falls back to the global one
          // if not specified.
          globalEval: function(code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
          },
          each: function(obj2, callback) {
            var length, i2 = 0;
            if (isArrayLike(obj2)) {
              length = obj2.length;
              for (; i2 < length; i2++) {
                if (callback.call(obj2[i2], i2, obj2[i2]) === false) {
                  break;
                }
              }
            } else {
              for (i2 in obj2) {
                if (callback.call(obj2[i2], i2, obj2[i2]) === false) {
                  break;
                }
              }
            }
            return obj2;
          },
          // Retrieve the text value of an array of DOM nodes
          text: function(elem) {
            var node, ret = "", i2 = 0, nodeType = elem.nodeType;
            if (!nodeType) {
              while (node = elem[i2++]) {
                ret += jQuery2.text(node);
              }
            }
            if (nodeType === 1 || nodeType === 11) {
              return elem.textContent;
            }
            if (nodeType === 9) {
              return elem.documentElement.textContent;
            }
            if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue;
            }
            return ret;
          },
          // results is for internal usage only
          makeArray: function(arr2, results) {
            var ret = results || [];
            if (arr2 != null) {
              if (isArrayLike(Object(arr2))) {
                jQuery2.merge(
                  ret,
                  typeof arr2 === "string" ? [arr2] : arr2
                );
              } else {
                push.call(ret, arr2);
              }
            }
            return ret;
          },
          inArray: function(elem, arr2, i2) {
            return arr2 == null ? -1 : indexOf.call(arr2, elem, i2);
          },
          isXMLDoc: function(elem) {
            var namespace = elem && elem.namespaceURI, docElem = elem && (elem.ownerDocument || elem).documentElement;
            return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
          },
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          merge: function(first, second) {
            var len = +second.length, j2 = 0, i2 = first.length;
            for (; j2 < len; j2++) {
              first[i2++] = second[j2];
            }
            first.length = i2;
            return first;
          },
          grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i2 = 0, length = elems.length, callbackExpect = !invert;
            for (; i2 < length; i2++) {
              callbackInverse = !callback(elems[i2], i2);
              if (callbackInverse !== callbackExpect) {
                matches.push(elems[i2]);
              }
            }
            return matches;
          },
          // arg is for internal usage only
          map: function(elems, callback, arg2) {
            var length, value, i2 = 0, ret = [];
            if (isArrayLike(elems)) {
              length = elems.length;
              for (; i2 < length; i2++) {
                value = callback(elems[i2], i2, arg2);
                if (value != null) {
                  ret.push(value);
                }
              }
            } else {
              for (i2 in elems) {
                value = callback(elems[i2], i2, arg2);
                if (value != null) {
                  ret.push(value);
                }
              }
            }
            return flat(ret);
          },
          // A global GUID counter for objects
          guid: 1,
          // jQuery.support is not used in Core but other projects attach their
          // properties to it so it needs to exist.
          support
        });
        if (typeof Symbol === "function") {
          jQuery2.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery2.each(
          "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
          function(_i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
          }
        );
        function isArrayLike(obj2) {
          var length = !!obj2 && "length" in obj2 && obj2.length, type = toType(obj2);
          if (isFunction(obj2) || isWindow(obj2)) {
            return false;
          }
          return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj2;
        }
        function nodeName(elem, name) {
          return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
        var pop = arr.pop;
        var sort = arr.sort;
        var splice = arr.splice;
        var whitespace = "[\\x20\\t\\r\\n\\f]";
        var rtrimCSS = new RegExp(
          "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
          "g"
        );
        jQuery2.contains = function(a, b) {
          var bup = b && b.parentNode;
          return a === bup || !!(bup && bup.nodeType === 1 && // Support: IE 9 - 11+
          // IE doesn't have `contains` on SVG.
          (a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
        };
        var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
        function fcssescape(ch, asCodePoint) {
          if (asCodePoint) {
            if (ch === "\0") {
              return "\uFFFD";
            }
            return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
          }
          return "\\" + ch;
        }
        jQuery2.escapeSelector = function(sel) {
          return (sel + "").replace(rcssescape, fcssescape);
        };
        var preferredDoc = document2, pushNative = push;
        (function() {
          var i2, Expr, outermostContext, sortInput, hasDuplicate, push2 = pushNative, document3, documentElement2, documentIsHTML, rbuggyQSA, matches, expando = jQuery2.expando, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + // Operator (capture 2)
          "*([*^$|!~]?=)" + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + identifier + ")"),
            CLASS: new RegExp("^\\.(" + identifier + ")"),
            TAG: new RegExp("^(" + identifier + "|[*])"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp(
              "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)",
              "i"
            ),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 65536;
            if (nonHex) {
              return nonHex;
            }
            return high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
          }, unloadHandler = function() {
            setDocument();
          }, inDisabledFieldset = addCombinator(
            function(elem) {
              return elem.disabled === true && nodeName(elem, "fieldset");
            },
            { dir: "parentNode", next: "legend" }
          );
          function safeActiveElement() {
            try {
              return document3.activeElement;
            } catch (err) {
            }
          }
          try {
            push2.apply(
              arr = slice.call(preferredDoc.childNodes),
              preferredDoc.childNodes
            );
            arr[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: function(target, els) {
                pushNative.apply(target, slice.call(els));
              },
              call: function(target) {
                pushNative.apply(target, slice.call(arguments, 1));
              }
            };
          }
          function find(selector, context, results, seed) {
            var m, i3, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m = match[1]) {
                    if (nodeType === 9) {
                      if (elem = context.getElementById(m)) {
                        if (elem.id === m) {
                          push2.call(results, elem);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                        push2.call(results, elem);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m = match[3]) && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }
                if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext != context || !support.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = jQuery2.escapeSelector(nid);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i3 = groups.length;
                    while (i3--) {
                      groups[i3] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i3]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
          }
          function createCache() {
            var keys = [];
            function cache(key, value) {
              if (keys.push(key + " ") > Expr.cacheLength) {
                delete cache[keys.shift()];
              }
              return cache[key + " "] = value;
            }
            return cache;
          }
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          function createInputPseudo(type) {
            return function(elem) {
              return nodeName(elem, "input") && elem.type === type;
            };
          }
          function createButtonPseudo(type) {
            return function(elem) {
              return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem) {
              if ("form" in elem) {
                if (elem.parentNode && elem.disabled === false) {
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }
                  return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                  elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                }
                return elem.disabled === disabled;
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }
              return false;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j2, matchIndexes = fn([], seed.length, argument), i3 = matchIndexes.length;
                while (i3--) {
                  if (seed[j2 = matchIndexes[i3]]) {
                    seed[j2] = !(matches2[j2] = seed[j2]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          function setDocument(node) {
            var subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            documentElement2 = document3.documentElement;
            documentIsHTML = !jQuery2.isXMLDoc(document3);
            matches = documentElement2.matches || documentElement2.webkitMatchesSelector || documentElement2.msMatchesSelector;
            if (documentElement2.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              subWindow.addEventListener("unload", unloadHandler);
            }
            support.getById = assert(function(el) {
              documentElement2.appendChild(el).id = jQuery2.expando;
              return !document3.getElementsByName || !document3.getElementsByName(jQuery2.expando).length;
            });
            support.disconnectedMatch = assert(function(el) {
              return matches.call(el, "*");
            });
            support.scope = assert(function() {
              return document3.querySelectorAll(":scope");
            });
            support.cssHas = assert(function() {
              try {
                document3.querySelector(":has(*,:jqfake)");
                return false;
              } catch (e) {
                return true;
              }
            });
            if (support.getById) {
              Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i3, elems, elem = context.getElementById(id);
                  if (elem) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                    elems = context.getElementsByName(id);
                    i3 = 0;
                    while (elem = elems[i3++]) {
                      node2 = elem.getAttributeNode("id");
                      if (node2 && node2.value === id) {
                        return [elem];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find.TAG = function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else {
                return context.querySelectorAll(tag);
              }
            };
            Expr.find.CLASS = function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyQSA = [];
            assert(function(el) {
              var input;
              documentElement2.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a><select id='" + expando + "-\r\\' disabled='disabled'><option selected=''></option></select>";
              if (!el.querySelectorAll("[selected]").length) {
                rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
              }
              if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                rbuggyQSA.push("~=");
              }
              if (!el.querySelectorAll("a#" + expando + "+*").length) {
                rbuggyQSA.push(".#.+[+~]");
              }
              if (!el.querySelectorAll(":checked").length) {
                rbuggyQSA.push(":checked");
              }
              input = document3.createElement("input");
              input.setAttribute("type", "hidden");
              el.appendChild(input).setAttribute("name", "D");
              documentElement2.appendChild(el).disabled = true;
              if (el.querySelectorAll(":disabled").length !== 2) {
                rbuggyQSA.push(":enabled", ":disabled");
              }
              input = document3.createElement("input");
              input.setAttribute("name", "");
              el.appendChild(input);
              if (!el.querySelectorAll("[name='']").length) {
                rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
              }
            });
            if (!support.cssHas) {
              rbuggyQSA.push(":has");
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            sortOrder = function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
                // Otherwise we know they are disconnected
                1
              );
              if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a === document3 || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
                  return -1;
                }
                if (b === document3 || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            };
            return document3;
          }
          find.matches = function(expr, elements) {
            return find(expr, null, null, elements);
          };
          find.matchesSelector = function(elem, expr) {
            setDocument(elem);
            if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                // fragment in IE 9
                elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return find(expr, document3, null, [elem]).length > 0;
          };
          find.contains = function(context, elem) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return jQuery2.contains(context, elem);
          };
          find.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document3) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            if (val !== void 0) {
              return val;
            }
            return elem.getAttribute(name);
          };
          find.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          jQuery2.uniqueSort = function(results) {
            var elem, duplicates = [], j2 = 0, i3 = 0;
            hasDuplicate = !support.sortStable;
            sortInput = !support.sortStable && slice.call(results, 0);
            sort.call(results, sortOrder);
            if (hasDuplicate) {
              while (elem = results[i3++]) {
                if (elem === results[i3]) {
                  j2 = duplicates.push(i3);
                }
              }
              while (j2--) {
                splice.call(results, duplicates[j2], 1);
              }
            }
            sortInput = null;
            return results;
          };
          jQuery2.fn.uniqueSort = function() {
            return this.pushStack(jQuery2.uniqueSort(slice.apply(this)));
          };
          Expr = jQuery2.expr = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              ATTR: function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              CHILD: function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    find.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  find.error(match[0]);
                }
                return match;
              },
              PSEUDO: function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr.CHILD.test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              TAG: function(nodeNameSelector) {
                var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem) {
                  return nodeName(elem, expectedNodeName);
                };
              },
              CLASS: function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                  return pattern.test(
                    typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                  );
                });
              },
              ATTR: function(name, operator, check) {
                return function(elem) {
                  var result = find.attr(elem, name);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  if (operator === "=") {
                    return result === check;
                  }
                  if (operator === "!=") {
                    return result !== check;
                  }
                  if (operator === "^=") {
                    return check && result.indexOf(check) === 0;
                  }
                  if (operator === "*=") {
                    return check && result.indexOf(check) > -1;
                  }
                  if (operator === "$=") {
                    return check && result.slice(-check.length) === check;
                  }
                  if (operator === "~=") {
                    return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
                  }
                  if (operator === "|=") {
                    return result === check || result.slice(0, check.length + 1) === check + "-";
                  }
                  return false;
                };
              },
              CHILD: function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? (
                  // Shortcut for :nth-*(n)
                  function(elem) {
                    return !!elem.parentNode;
                  }
                ) : function(elem, _context, xml) {
                  var cache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir2) {
                        node = elem;
                        while (node = node[dir2]) {
                          if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      outerCache = parent[expando] || (parent[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                      (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          outerCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        outerCache = elem[expando] || (elem[expando] = {});
                        cache = outerCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              outerCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              PSEUDO: function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i3 = matched.length;
                    while (i3--) {
                      idx = indexOf.call(seed, matched[i3]);
                      seed[idx] = !(matches2[idx] = matched[i3]);
                    }
                  }) : function(elem) {
                    return fn(elem, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              // Potentially complex pseudos
              not: markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrimCSS, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem, unmatched = matcher(seed, null, xml, []), i3 = seed.length;
                  while (i3--) {
                    if (elem = unmatched[i3]) {
                      seed[i3] = !(matches2[i3] = elem);
                    }
                  }
                }) : function(elem, _context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              has: markFunction(function(selector) {
                return function(elem) {
                  return find(selector, elem).length > 0;
                };
              }),
              contains: markFunction(function(text) {
                text = text.replace(runescape, funescape);
                return function(elem) {
                  return (elem.textContent || jQuery2.text(elem)).indexOf(text) > -1;
                };
              }),
              // "Whether an element is represented by a :lang() selector
              // is based solely on the element's language value
              // being equal to the identifier C,
              // or beginning with the identifier C immediately followed by "-".
              // The matching of C against the element's language value is performed case-insensitively.
              // The identifier C does not have to be a valid language name."
              // https://www.w3.org/TR/selectors/#lang-pseudo
              lang: markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  find.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),
              // Miscellaneous
              target: function(elem) {
                var hash = window2.location && window2.location.hash;
                return hash && hash.slice(1) === elem.id;
              },
              root: function(elem) {
                return elem === documentElement2;
              },
              focus: function(elem) {
                return elem === safeActiveElement() && document3.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              // Boolean properties
              enabled: createDisabledPseudo(false),
              disabled: createDisabledPseudo(true),
              checked: function(elem) {
                return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
              },
              selected: function(elem) {
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
              },
              // Contents
              empty: function(elem) {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              parent: function(elem) {
                return !Expr.pseudos.empty(elem);
              },
              // Element/input types
              header: function(elem) {
                return rheader.test(elem.nodeName);
              },
              input: function(elem) {
                return rinputs.test(elem.nodeName);
              },
              button: function(elem) {
                return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
              },
              text: function(elem) {
                var attr;
                return nodeName(elem, "input") && elem.type === "text" && // Support: IE <10 only
                // New HTML5 attribute values (e.g., "search") appear
                // with elem.type === "text"
                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              // Position-in-collection
              first: createPositionalPseudo(function() {
                return [0];
              }),
              last: createPositionalPseudo(function(_matchIndexes, length) {
                return [length - 1];
              }),
              eq: createPositionalPseudo(function(_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
              }),
              even: createPositionalPseudo(function(matchIndexes, length) {
                var i3 = 0;
                for (; i3 < length; i3 += 2) {
                  matchIndexes.push(i3);
                }
                return matchIndexes;
              }),
              odd: createPositionalPseudo(function(matchIndexes, length) {
                var i3 = 1;
                for (; i3 < length; i3 += 2) {
                  matchIndexes.push(i3);
                }
                return matchIndexes;
              }),
              lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                var i3;
                if (argument < 0) {
                  i3 = argument + length;
                } else if (argument > length) {
                  i3 = length;
                } else {
                  i3 = argument;
                }
                for (; --i3 >= 0; ) {
                  matchIndexes.push(i3);
                }
                return matchIndexes;
              }),
              gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                var i3 = argument < 0 ? argument + length : argument;
                for (; ++i3 < length; ) {
                  matchIndexes.push(i3);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos.nth = Expr.pseudos.eq;
          for (i2 in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i2] = createInputPseudo(i2);
          }
          for (i2 in { submit: true, reset: true }) {
            Expr.pseudos[i2] = createButtonPseudo(i2);
          }
          function setFilters() {
          }
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rleadingCombinator.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  // Cast descendant combinators to space
                  type: match[0].replace(rtrimCSS, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            if (parseOnly) {
              return soFar.length;
            }
            return soFar ? find.error(selector) : (
              // Cache the tokens
              tokenCache(selector, groups).slice(0)
            );
          }
          function toSelector(tokens) {
            var i3 = 0, len = tokens.length, selector = "";
            for (; i3 < len; i3++) {
              selector += tokens[i3].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ? (
              // Check against closest ancestor/preceding element
              function(elem, context, xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    return matcher(elem, context, xml);
                  }
                }
                return false;
              }
            ) : (
              // Check against all ancestor/preceding elements
              function(elem, context, xml) {
                var oldCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      if (matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                } else {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      if (skip && nodeName(elem, skip)) {
                        elem = elem[dir2] || elem;
                      } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                        return newCache[2] = oldCache[2];
                      } else {
                        outerCache[key] = newCache;
                        if (newCache[2] = matcher(elem, context, xml)) {
                          return true;
                        }
                      }
                    }
                  }
                }
                return false;
              }
            );
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i3 = matchers.length;
              while (i3--) {
                if (!matchers[i3](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function multipleContexts(selector, contexts, results) {
            var i3 = 0, len = contexts.length;
            for (; i3 < len; i3++) {
              find(selector, contexts[i3], results);
            }
            return results;
          }
          function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i3 = 0, len = unmatched.length, mapped = map != null;
            for (; i3 < len; i3++) {
              if (elem = unmatched[i3]) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i3);
                  }
                }
              }
            }
            return newUnmatched;
          }
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i3, elem, matcherOut, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
              if (matcher) {
                matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                  // ...intermediate processing is necessary
                  []
                ) : (
                  // ...otherwise use results directly
                  results
                );
                matcher(matcherIn, matcherOut, context, xml);
              } else {
                matcherOut = matcherIn;
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i3 = temp.length;
                while (i3--) {
                  if (elem = temp[i3]) {
                    matcherOut[postMap[i3]] = !(matcherIn[postMap[i3]] = elem);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i3 = matcherOut.length;
                    while (i3--) {
                      if (elem = matcherOut[i3]) {
                        temp.push(matcherIn[i3] = elem);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i3 = matcherOut.length;
                  while (i3--) {
                    if ((elem = matcherOut[i3]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i3]) > -1) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }
              } else {
                matcherOut = condense(
                  matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j2, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i3 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
              return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
              var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i3 < len; i3++) {
              if (matcher = Expr.relative[tokens[i3].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i3].type].apply(null, tokens[i3].matches);
                if (matcher[expando]) {
                  j2 = ++i3;
                  for (; j2 < len; j2++) {
                    if (Expr.relative[tokens[j2].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i3 > 1 && elementMatcher(matchers),
                    i3 > 1 && toSelector(
                      // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                      tokens.slice(0, i3 - 1).concat({ value: tokens[i3 - 2].type === " " ? "*" : "" })
                    ).replace(rtrimCSS, "$1"),
                    matcher,
                    i3 < j2 && matcherFromTokens(tokens.slice(i3, j2)),
                    j2 < len && matcherFromTokens(tokens = tokens.slice(j2)),
                    j2 < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j2, matcher, matchedCount = 0, i3 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i3 !== len && (elem = elems[i3]) != null; i3++) {
                if (byElement && elem) {
                  j2 = 0;
                  if (!context && elem.ownerDocument != document3) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j2++]) {
                    if (matcher(elem, context || document3, xml)) {
                      push2.call(results, elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }
              matchedCount += i3;
              if (bySet && i3 !== matchedCount) {
                j2 = 0;
                while (matcher = setMatchers[j2++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i3--) {
                      if (!(unmatched[i3] || setMatched[i3])) {
                        setMatched[i3] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  jQuery2.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          function compile(selector, match) {
            var i3, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i3 = match.length;
              while (i3--) {
                cached = matcherFromTokens(match[i3]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );
              cached.selector = selector;
            }
            return cached;
          }
          function select(selector, context, results, seed) {
            var i3, tokens, token, type, find2, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find.ID(
                  token.matches[0].replace(runescape, funescape),
                  context
                ) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i3 = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
              while (i3--) {
                token = tokens[i3];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find2 = Expr.find[type]) {
                  if (seed = find2(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  )) {
                    tokens.splice(i3, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context || rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
          }
          support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          setDocument();
          support.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          jQuery2.find = find;
          jQuery2.expr[":"] = jQuery2.expr.pseudos;
          jQuery2.unique = jQuery2.uniqueSort;
          find.compile = compile;
          find.select = select;
          find.setDocument = setDocument;
          find.tokenize = tokenize;
          find.escape = jQuery2.escapeSelector;
          find.getText = jQuery2.text;
          find.isXML = jQuery2.isXMLDoc;
          find.selectors = jQuery2.expr;
          find.support = jQuery2.support;
          find.uniqueSort = jQuery2.uniqueSort;
        })();
        var dir = function(elem, dir2, until) {
          var matched = [], truncate = until !== void 0;
          while ((elem = elem[dir2]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
              if (truncate && jQuery2(elem).is(until)) {
                break;
              }
              matched.push(elem);
            }
          }
          return matched;
        };
        var siblings = function(n2, elem) {
          var matched = [];
          for (; n2; n2 = n2.nextSibling) {
            if (n2.nodeType === 1 && n2 !== elem) {
              matched.push(n2);
            }
          }
          return matched;
        };
        var rneedsContext = jQuery2.expr.match.needsContext;
        var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function winnow(elements, qualifier, not) {
          if (isFunction(qualifier)) {
            return jQuery2.grep(elements, function(elem, i2) {
              return !!qualifier.call(elem, i2, elem) !== not;
            });
          }
          if (qualifier.nodeType) {
            return jQuery2.grep(elements, function(elem) {
              return elem === qualifier !== not;
            });
          }
          if (typeof qualifier !== "string") {
            return jQuery2.grep(elements, function(elem) {
              return indexOf.call(qualifier, elem) > -1 !== not;
            });
          }
          return jQuery2.filter(qualifier, elements, not);
        }
        jQuery2.filter = function(expr, elems, not) {
          var elem = elems[0];
          if (not) {
            expr = ":not(" + expr + ")";
          }
          if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery2.find.matchesSelector(elem, expr) ? [elem] : [];
          }
          return jQuery2.find.matches(expr, jQuery2.grep(elems, function(elem2) {
            return elem2.nodeType === 1;
          }));
        };
        jQuery2.fn.extend({
          find: function(selector) {
            var i2, ret, len = this.length, self2 = this;
            if (typeof selector !== "string") {
              return this.pushStack(jQuery2(selector).filter(function() {
                for (i2 = 0; i2 < len; i2++) {
                  if (jQuery2.contains(self2[i2], this)) {
                    return true;
                  }
                }
              }));
            }
            ret = this.pushStack([]);
            for (i2 = 0; i2 < len; i2++) {
              jQuery2.find(selector, self2[i2], ret);
            }
            return len > 1 ? jQuery2.uniqueSort(ret) : ret;
          },
          filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
          },
          not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
          },
          is: function(selector) {
            return !!winnow(
              this,
              // If this is a positional/relative selector, check membership in the returned set
              // so $("p:first").is("p:last") won't return true for a doc with two "p".
              typeof selector === "string" && rneedsContext.test(selector) ? jQuery2(selector) : selector || [],
              false
            ).length;
          }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery2.fn.init = function(selector, context, root) {
          var match, elem;
          if (!selector) {
            return this;
          }
          root = root || rootjQuery;
          if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery2 ? context[0] : context;
                jQuery2.merge(this, jQuery2.parseHTML(
                  match[1],
                  context && context.nodeType ? context.ownerDocument || context : document2,
                  true
                ));
                if (rsingleTag.test(match[1]) && jQuery2.isPlainObject(context)) {
                  for (match in context) {
                    if (isFunction(this[match])) {
                      this[match](context[match]);
                    } else {
                      this.attr(match, context[match]);
                    }
                  }
                }
                return this;
              } else {
                elem = document2.getElementById(match[2]);
                if (elem) {
                  this[0] = elem;
                  this.length = 1;
                }
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || root).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
          } else if (isFunction(selector)) {
            return root.ready !== void 0 ? root.ready(selector) : (
              // Execute immediately if ready is not present
              selector(jQuery2)
            );
          }
          return jQuery2.makeArray(selector, this);
        };
        init.prototype = jQuery2.fn;
        rootjQuery = jQuery2(document2);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
        jQuery2.fn.extend({
          has: function(target) {
            var targets = jQuery2(target, this), l = targets.length;
            return this.filter(function() {
              var i2 = 0;
              for (; i2 < l; i2++) {
                if (jQuery2.contains(this, targets[i2])) {
                  return true;
                }
              }
            });
          },
          closest: function(selectors, context) {
            var cur, i2 = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery2(selectors);
            if (!rneedsContext.test(selectors)) {
              for (; i2 < l; i2++) {
                for (cur = this[i2]; cur && cur !== context; cur = cur.parentNode) {
                  if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                    // Don't pass non-elements to jQuery#find
                    cur.nodeType === 1 && jQuery2.find.matchesSelector(cur, selectors)
                  ))) {
                    matched.push(cur);
                    break;
                  }
                }
              }
            }
            return this.pushStack(matched.length > 1 ? jQuery2.uniqueSort(matched) : matched);
          },
          // Determine the position of an element within the set
          index: function(elem) {
            if (!elem) {
              return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
              return indexOf.call(jQuery2(elem), this[0]);
            }
            return indexOf.call(
              this,
              // If it receives a jQuery object, the first element is used
              elem.jquery ? elem[0] : elem
            );
          },
          add: function(selector, context) {
            return this.pushStack(
              jQuery2.uniqueSort(
                jQuery2.merge(this.get(), jQuery2(selector, context))
              )
            );
          },
          addBack: function(selector) {
            return this.add(
              selector == null ? this.prevObject : this.prevObject.filter(selector)
            );
          }
        });
        function sibling(cur, dir2) {
          while ((cur = cur[dir2]) && cur.nodeType !== 1) {
          }
          return cur;
        }
        jQuery2.each({
          parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
          },
          parents: function(elem) {
            return dir(elem, "parentNode");
          },
          parentsUntil: function(elem, _i, until) {
            return dir(elem, "parentNode", until);
          },
          next: function(elem) {
            return sibling(elem, "nextSibling");
          },
          prev: function(elem) {
            return sibling(elem, "previousSibling");
          },
          nextAll: function(elem) {
            return dir(elem, "nextSibling");
          },
          prevAll: function(elem) {
            return dir(elem, "previousSibling");
          },
          nextUntil: function(elem, _i, until) {
            return dir(elem, "nextSibling", until);
          },
          prevUntil: function(elem, _i, until) {
            return dir(elem, "previousSibling", until);
          },
          siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
          },
          children: function(elem) {
            return siblings(elem.firstChild);
          },
          contents: function(elem) {
            if (elem.contentDocument != null && // Support: IE 11+
            // <object> elements with no `data` attribute has an object
            // `contentDocument` with a `null` prototype.
            getProto(elem.contentDocument)) {
              return elem.contentDocument;
            }
            if (nodeName(elem, "template")) {
              elem = elem.content || elem;
            }
            return jQuery2.merge([], elem.childNodes);
          }
        }, function(name, fn) {
          jQuery2.fn[name] = function(until, selector) {
            var matched = jQuery2.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
              selector = until;
            }
            if (selector && typeof selector === "string") {
              matched = jQuery2.filter(selector, matched);
            }
            if (this.length > 1) {
              if (!guaranteedUnique[name]) {
                jQuery2.uniqueSort(matched);
              }
              if (rparentsprev.test(name)) {
                matched.reverse();
              }
            }
            return this.pushStack(matched);
          };
        });
        var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        function createOptions(options) {
          var object = {};
          jQuery2.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = true;
          });
          return object;
        }
        jQuery2.Callbacks = function(options) {
          options = typeof options === "string" ? createOptions(options) : jQuery2.extend({}, options);
          var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
              memory = queue.shift();
              while (++firingIndex < list.length) {
                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                  firingIndex = list.length;
                  memory = false;
                }
              }
            }
            if (!options.memory) {
              memory = false;
            }
            firing = false;
            if (locked) {
              if (memory) {
                list = [];
              } else {
                list = "";
              }
            }
          }, self2 = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
              if (list) {
                if (memory && !firing) {
                  firingIndex = list.length - 1;
                  queue.push(memory);
                }
                (function add(args) {
                  jQuery2.each(args, function(_, arg2) {
                    if (isFunction(arg2)) {
                      if (!options.unique || !self2.has(arg2)) {
                        list.push(arg2);
                      }
                    } else if (arg2 && arg2.length && toType(arg2) !== "string") {
                      add(arg2);
                    }
                  });
                })(arguments);
                if (memory && !firing) {
                  fire();
                }
              }
              return this;
            },
            // Remove a callback from the list
            remove: function() {
              jQuery2.each(arguments, function(_, arg2) {
                var index;
                while ((index = jQuery2.inArray(arg2, list, index)) > -1) {
                  list.splice(index, 1);
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              });
              return this;
            },
            // Check if a given callback is in the list.
            // If no argument is given, return whether or not list has callbacks attached.
            has: function(fn) {
              return fn ? jQuery2.inArray(fn, list) > -1 : list.length > 0;
            },
            // Remove all callbacks from the list
            empty: function() {
              if (list) {
                list = [];
              }
              return this;
            },
            // Disable .fire and .add
            // Abort any current/pending executions
            // Clear all callbacks and values
            disable: function() {
              locked = queue = [];
              list = memory = "";
              return this;
            },
            disabled: function() {
              return !list;
            },
            // Disable .fire
            // Also disable .add unless we have memory (since it would have no effect)
            // Abort any pending executions
            lock: function() {
              locked = queue = [];
              if (!memory && !firing) {
                list = memory = "";
              }
              return this;
            },
            locked: function() {
              return !!locked;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function(context, args) {
              if (!locked) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                queue.push(args);
                if (!firing) {
                  fire();
                }
              }
              return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
              self2.fireWith(this, arguments);
              return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
              return !!fired;
            }
          };
          return self2;
        };
        function Identity(v) {
          return v;
        }
        function Thrower(ex) {
          throw ex;
        }
        function adoptValue(value, resolve, reject, noValue) {
          var method;
          try {
            if (value && isFunction(method = value.promise)) {
              method.call(value).done(resolve).fail(reject);
            } else if (value && isFunction(method = value.then)) {
              method.call(value, resolve, reject);
            } else {
              resolve.apply(void 0, [value].slice(noValue));
            }
          } catch (value2) {
            reject.apply(void 0, [value2]);
          }
        }
        jQuery2.extend({
          Deferred: function(func2) {
            var tuples = [
              // action, add listener, callbacks,
              // ... .then handlers, argument index, [final state]
              [
                "notify",
                "progress",
                jQuery2.Callbacks("memory"),
                jQuery2.Callbacks("memory"),
                2
              ],
              [
                "resolve",
                "done",
                jQuery2.Callbacks("once memory"),
                jQuery2.Callbacks("once memory"),
                0,
                "resolved"
              ],
              [
                "reject",
                "fail",
                jQuery2.Callbacks("once memory"),
                jQuery2.Callbacks("once memory"),
                1,
                "rejected"
              ]
            ], state = "pending", promise = {
              state: function() {
                return state;
              },
              always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function(fn) {
                return promise.then(null, fn);
              },
              // Keep pipe for back-compat
              pipe: function() {
                var fns = arguments;
                return jQuery2.Deferred(function(newDefer) {
                  jQuery2.each(tuples, function(_i, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](
                          this,
                          fn ? [returned] : arguments
                        );
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred2, handler, special) {
                  return function() {
                    var that = this, args = arguments, mightThrow = function() {
                      var returned, then;
                      if (depth < maxDepth) {
                        return;
                      }
                      returned = handler.apply(that, args);
                      if (returned === deferred2.promise()) {
                        throw new TypeError("Thenable self-resolution");
                      }
                      then = returned && // Support: Promises/A+ section 2.3.4
                      // https://promisesaplus.com/#point-64
                      // Only check objects and functions for thenability
                      (typeof returned === "object" || typeof returned === "function") && returned.then;
                      if (isFunction(then)) {
                        if (special) {
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special)
                          );
                        } else {
                          maxDepth++;
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special),
                            resolve(
                              maxDepth,
                              deferred2,
                              Identity,
                              deferred2.notifyWith
                            )
                          );
                        }
                      } else {
                        if (handler !== Identity) {
                          that = void 0;
                          args = [returned];
                        }
                        (special || deferred2.resolveWith)(that, args);
                      }
                    }, process = special ? mightThrow : function() {
                      try {
                        mightThrow();
                      } catch (e) {
                        if (jQuery2.Deferred.exceptionHook) {
                          jQuery2.Deferred.exceptionHook(
                            e,
                            process.error
                          );
                        }
                        if (depth + 1 >= maxDepth) {
                          if (handler !== Thrower) {
                            that = void 0;
                            args = [e];
                          }
                          deferred2.rejectWith(that, args);
                        }
                      }
                    };
                    if (depth) {
                      process();
                    } else {
                      if (jQuery2.Deferred.getErrorHook) {
                        process.error = jQuery2.Deferred.getErrorHook();
                      } else if (jQuery2.Deferred.getStackHook) {
                        process.error = jQuery2.Deferred.getStackHook();
                      }
                      window2.setTimeout(process);
                    }
                  };
                }
                return jQuery2.Deferred(function(newDefer) {
                  tuples[0][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onProgress) ? onProgress : Identity,
                      newDefer.notifyWith
                    )
                  );
                  tuples[1][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onFulfilled) ? onFulfilled : Identity
                    )
                  );
                  tuples[2][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onRejected) ? onRejected : Thrower
                    )
                  );
                }).promise();
              },
              // Get a promise for this deferred
              // If obj is provided, the promise aspect is added to the object
              promise: function(obj2) {
                return obj2 != null ? jQuery2.extend(obj2, promise) : promise;
              }
            }, deferred = {};
            jQuery2.each(tuples, function(i2, tuple) {
              var list = tuple[2], stateString = tuple[5];
              promise[tuple[1]] = list.add;
              if (stateString) {
                list.add(
                  function() {
                    state = stateString;
                  },
                  // rejected_callbacks.disable
                  // fulfilled_callbacks.disable
                  tuples[3 - i2][2].disable,
                  // rejected_handlers.disable
                  // fulfilled_handlers.disable
                  tuples[3 - i2][3].disable,
                  // progress_callbacks.lock
                  tuples[0][2].lock,
                  // progress_handlers.lock
                  tuples[0][3].lock
                );
              }
              list.add(tuple[3].fire);
              deferred[tuple[0]] = function() {
                deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
                return this;
              };
              deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func2) {
              func2.call(deferred, deferred);
            }
            return deferred;
          },
          // Deferred helper
          when: function(singleValue) {
            var remaining = arguments.length, i2 = remaining, resolveContexts = Array(i2), resolveValues = slice.call(arguments), primary = jQuery2.Deferred(), updateFunc = function(i3) {
              return function(value) {
                resolveContexts[i3] = this;
                resolveValues[i3] = arguments.length > 1 ? slice.call(arguments) : value;
                if (!--remaining) {
                  primary.resolveWith(resolveContexts, resolveValues);
                }
              };
            };
            if (remaining <= 1) {
              adoptValue(
                singleValue,
                primary.done(updateFunc(i2)).resolve,
                primary.reject,
                !remaining
              );
              if (primary.state() === "pending" || isFunction(resolveValues[i2] && resolveValues[i2].then)) {
                return primary.then();
              }
            }
            while (i2--) {
              adoptValue(resolveValues[i2], updateFunc(i2), primary.reject);
            }
            return primary.promise();
          }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery2.Deferred.exceptionHook = function(error, asyncError) {
          if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
            window2.console.warn(
              "jQuery.Deferred exception: " + error.message,
              error.stack,
              asyncError
            );
          }
        };
        jQuery2.readyException = function(error) {
          window2.setTimeout(function() {
            throw error;
          });
        };
        var readyList = jQuery2.Deferred();
        jQuery2.fn.ready = function(fn) {
          readyList.then(fn).catch(function(error) {
            jQuery2.readyException(error);
          });
          return this;
        };
        jQuery2.extend({
          // Is the DOM ready to be used? Set to true once it occurs.
          isReady: false,
          // A counter to track how many items to wait for before
          // the ready event fires. See trac-6781
          readyWait: 1,
          // Handle when the DOM is ready
          ready: function(wait) {
            if (wait === true ? --jQuery2.readyWait : jQuery2.isReady) {
              return;
            }
            jQuery2.isReady = true;
            if (wait !== true && --jQuery2.readyWait > 0) {
              return;
            }
            readyList.resolveWith(document2, [jQuery2]);
          }
        });
        jQuery2.ready.then = readyList.then;
        function completed() {
          document2.removeEventListener("DOMContentLoaded", completed);
          window2.removeEventListener("load", completed);
          jQuery2.ready();
        }
        if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
          window2.setTimeout(jQuery2.ready);
        } else {
          document2.addEventListener("DOMContentLoaded", completed);
          window2.addEventListener("load", completed);
        }
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
          var i2 = 0, len = elems.length, bulk = key == null;
          if (toType(key) === "object") {
            chainable = true;
            for (i2 in key) {
              access(elems, fn, i2, key[i2], true, emptyGet, raw);
            }
          } else if (value !== void 0) {
            chainable = true;
            if (!isFunction(value)) {
              raw = true;
            }
            if (bulk) {
              if (raw) {
                fn.call(elems, value);
                fn = null;
              } else {
                bulk = fn;
                fn = function(elem, _key, value2) {
                  return bulk.call(jQuery2(elem), value2);
                };
              }
            }
            if (fn) {
              for (; i2 < len; i2++) {
                fn(
                  elems[i2],
                  key,
                  raw ? value : value.call(elems[i2], i2, fn(elems[i2], key))
                );
              }
            }
          }
          if (chainable) {
            return elems;
          }
          if (bulk) {
            return fn.call(elems);
          }
          return len ? fn(elems[0], key) : emptyGet;
        };
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
        function fcamelCase(_all, letter) {
          return letter.toUpperCase();
        }
        function camelCase(string) {
          return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        }
        var acceptData = function(owner) {
          return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
        };
        function Data() {
          this.expando = jQuery2.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
          cache: function(owner) {
            var value = owner[this.expando];
            if (!value) {
              value = {};
              if (acceptData(owner)) {
                if (owner.nodeType) {
                  owner[this.expando] = value;
                } else {
                  Object.defineProperty(owner, this.expando, {
                    value,
                    configurable: true
                  });
                }
              }
            }
            return value;
          },
          set: function(owner, data2, value) {
            var prop, cache = this.cache(owner);
            if (typeof data2 === "string") {
              cache[camelCase(data2)] = value;
            } else {
              for (prop in data2) {
                cache[camelCase(prop)] = data2[prop];
              }
            }
            return cache;
          },
          get: function(owner, key) {
            return key === void 0 ? this.cache(owner) : (
              // Always use camelCase key (gh-2257)
              owner[this.expando] && owner[this.expando][camelCase(key)]
            );
          },
          access: function(owner, key, value) {
            if (key === void 0 || key && typeof key === "string" && value === void 0) {
              return this.get(owner, key);
            }
            this.set(owner, key, value);
            return value !== void 0 ? value : key;
          },
          remove: function(owner, key) {
            var i2, cache = owner[this.expando];
            if (cache === void 0) {
              return;
            }
            if (key !== void 0) {
              if (Array.isArray(key)) {
                key = key.map(camelCase);
              } else {
                key = camelCase(key);
                key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
              }
              i2 = key.length;
              while (i2--) {
                delete cache[key[i2]];
              }
            }
            if (key === void 0 || jQuery2.isEmptyObject(cache)) {
              if (owner.nodeType) {
                owner[this.expando] = void 0;
              } else {
                delete owner[this.expando];
              }
            }
          },
          hasData: function(owner) {
            var cache = owner[this.expando];
            return cache !== void 0 && !jQuery2.isEmptyObject(cache);
          }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data2) {
          if (data2 === "true") {
            return true;
          }
          if (data2 === "false") {
            return false;
          }
          if (data2 === "null") {
            return null;
          }
          if (data2 === +data2 + "") {
            return +data2;
          }
          if (rbrace.test(data2)) {
            return JSON.parse(data2);
          }
          return data2;
        }
        function dataAttr(elem, key, data2) {
          var name;
          if (data2 === void 0 && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data2 = elem.getAttribute(name);
            if (typeof data2 === "string") {
              try {
                data2 = getData(data2);
              } catch (e) {
              }
              dataUser.set(elem, key, data2);
            } else {
              data2 = void 0;
            }
          }
          return data2;
        }
        jQuery2.extend({
          hasData: function(elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
          },
          data: function(elem, name, data2) {
            return dataUser.access(elem, name, data2);
          },
          removeData: function(elem, name) {
            dataUser.remove(elem, name);
          },
          // TODO: Now that all calls to _data and _removeData have been replaced
          // with direct calls to dataPriv methods, these can be deprecated.
          _data: function(elem, name, data2) {
            return dataPriv.access(elem, name, data2);
          },
          _removeData: function(elem, name) {
            dataPriv.remove(elem, name);
          }
        });
        jQuery2.fn.extend({
          data: function(key, value) {
            var i2, name, data2, elem = this[0], attrs = elem && elem.attributes;
            if (key === void 0) {
              if (this.length) {
                data2 = dataUser.get(elem);
                if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                  i2 = attrs.length;
                  while (i2--) {
                    if (attrs[i2]) {
                      name = attrs[i2].name;
                      if (name.indexOf("data-") === 0) {
                        name = camelCase(name.slice(5));
                        dataAttr(elem, name, data2[name]);
                      }
                    }
                  }
                  dataPriv.set(elem, "hasDataAttrs", true);
                }
              }
              return data2;
            }
            if (typeof key === "object") {
              return this.each(function() {
                dataUser.set(this, key);
              });
            }
            return access(this, function(value2) {
              var data3;
              if (elem && value2 === void 0) {
                data3 = dataUser.get(elem, key);
                if (data3 !== void 0) {
                  return data3;
                }
                data3 = dataAttr(elem, key);
                if (data3 !== void 0) {
                  return data3;
                }
                return;
              }
              this.each(function() {
                dataUser.set(this, key, value2);
              });
            }, null, value, arguments.length > 1, null, true);
          },
          removeData: function(key) {
            return this.each(function() {
              dataUser.remove(this, key);
            });
          }
        });
        jQuery2.extend({
          queue: function(elem, type, data2) {
            var queue;
            if (elem) {
              type = (type || "fx") + "queue";
              queue = dataPriv.get(elem, type);
              if (data2) {
                if (!queue || Array.isArray(data2)) {
                  queue = dataPriv.access(elem, type, jQuery2.makeArray(data2));
                } else {
                  queue.push(data2);
                }
              }
              return queue || [];
            }
          },
          dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery2.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery2._queueHooks(elem, type), next = function() {
              jQuery2.dequeue(elem, type);
            };
            if (fn === "inprogress") {
              fn = queue.shift();
              startLength--;
            }
            if (fn) {
              if (type === "fx") {
                queue.unshift("inprogress");
              }
              delete hooks.stop;
              fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
              hooks.empty.fire();
            }
          },
          // Not public - generate a queueHooks object, or return the current one
          _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
              empty: jQuery2.Callbacks("once memory").add(function() {
                dataPriv.remove(elem, [type + "queue", key]);
              })
            });
          }
        });
        jQuery2.fn.extend({
          queue: function(type, data2) {
            var setter = 2;
            if (typeof type !== "string") {
              data2 = type;
              type = "fx";
              setter--;
            }
            if (arguments.length < setter) {
              return jQuery2.queue(this[0], type);
            }
            return data2 === void 0 ? this : this.each(function() {
              var queue = jQuery2.queue(this, type, data2);
              jQuery2._queueHooks(this, type);
              if (type === "fx" && queue[0] !== "inprogress") {
                jQuery2.dequeue(this, type);
              }
            });
          },
          dequeue: function(type) {
            return this.each(function() {
              jQuery2.dequeue(this, type);
            });
          },
          clearQueue: function(type) {
            return this.queue(type || "fx", []);
          },
          // Get a promise resolved when queues of a certain type
          // are emptied (fx is the type by default)
          promise: function(type, obj2) {
            var tmp2, count = 1, defer = jQuery2.Deferred(), elements = this, i2 = this.length, resolve = function() {
              if (!--count) {
                defer.resolveWith(elements, [elements]);
              }
            };
            if (typeof type !== "string") {
              obj2 = type;
              type = void 0;
            }
            type = type || "fx";
            while (i2--) {
              tmp2 = dataPriv.get(elements[i2], type + "queueHooks");
              if (tmp2 && tmp2.empty) {
                count++;
                tmp2.empty.add(resolve);
              }
            }
            resolve();
            return defer.promise(obj2);
          }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document2.documentElement;
        var isAttached = function(elem) {
          return jQuery2.contains(elem.ownerDocument, elem);
        }, composed = { composed: true };
        if (documentElement.getRootNode) {
          isAttached = function(elem) {
            return jQuery2.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
          };
        }
        var isHiddenWithinTree = function(elem, el) {
          elem = el || elem;
          return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
          // Support: Firefox <=43 - 45
          // Disconnected elements can have computed display: none, so first confirm that elem is
          // in the document.
          isAttached(elem) && jQuery2.css(elem, "display") === "none";
        };
        function adjustCSS(elem, prop, valueParts, tween) {
          var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
          } : function() {
            return jQuery2.css(elem, prop, "");
          }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery2.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery2.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery2.css(elem, prop));
          if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            while (maxIterations--) {
              jQuery2.style(elem, prop, initialInUnit + unit);
              if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                maxIterations = 0;
              }
              initialInUnit = initialInUnit / scale;
            }
            initialInUnit = initialInUnit * 2;
            jQuery2.style(elem, prop, initialInUnit + unit);
            valueParts = valueParts || [];
          }
          if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
              tween.unit = unit;
              tween.start = initialInUnit;
              tween.end = adjusted;
            }
          }
          return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem) {
          var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
          if (display) {
            return display;
          }
          temp = doc.body.appendChild(doc.createElement(nodeName2));
          display = jQuery2.css(temp, "display");
          temp.parentNode.removeChild(temp);
          if (display === "none") {
            display = "block";
          }
          defaultDisplayMap[nodeName2] = display;
          return display;
        }
        function showHide(elements, show) {
          var display, elem, values = [], index = 0, length = elements.length;
          for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
              continue;
            }
            display = elem.style.display;
            if (show) {
              if (display === "none") {
                values[index] = dataPriv.get(elem, "display") || null;
                if (!values[index]) {
                  elem.style.display = "";
                }
              }
              if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                values[index] = getDefaultDisplay(elem);
              }
            } else {
              if (display !== "none") {
                values[index] = "none";
                dataPriv.set(elem, "display", display);
              }
            }
          }
          for (index = 0; index < length; index++) {
            if (values[index] != null) {
              elements[index].style.display = values[index];
            }
          }
          return elements;
        }
        jQuery2.fn.extend({
          show: function() {
            return showHide(this, true);
          },
          hide: function() {
            return showHide(this);
          },
          toggle: function(state) {
            if (typeof state === "boolean") {
              return state ? this.show() : this.hide();
            }
            return this.each(function() {
              if (isHiddenWithinTree(this)) {
                jQuery2(this).show();
              } else {
                jQuery2(this).hide();
              }
            });
          }
        });
        var rcheckableType = /^(?:checkbox|radio)$/i;
        var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
          var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("checked", "checked");
          input.setAttribute("name", "t");
          div.appendChild(input);
          support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
          div.innerHTML = "<textarea>x</textarea>";
          support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
          div.innerHTML = "<option></option>";
          support.option = !!div.lastChild;
        })();
        var wrapMap = {
          // XHTML parsers do not magically insert elements in the
          // same way that tag soup parsers do. So we cannot shorten
          // this by omitting <tbody> or other required elements.
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        if (!support.option) {
          wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        function getAll(context, tag) {
          var ret;
          if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
          } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
          } else {
            ret = [];
          }
          if (tag === void 0 || tag && nodeName(context, tag)) {
            return jQuery2.merge([context], ret);
          }
          return ret;
        }
        function setGlobalEval(elems, refElements) {
          var i2 = 0, l = elems.length;
          for (; i2 < l; i2++) {
            dataPriv.set(
              elems[i2],
              "globalEval",
              !refElements || dataPriv.get(refElements[i2], "globalEval")
            );
          }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
          var elem, tmp2, tag, wrap, attached, j2, fragment = context.createDocumentFragment(), nodes = [], i2 = 0, l = elems.length;
          for (; i2 < l; i2++) {
            elem = elems[i2];
            if (elem || elem === 0) {
              if (toType(elem) === "object") {
                jQuery2.merge(nodes, elem.nodeType ? [elem] : elem);
              } else if (!rhtml.test(elem)) {
                nodes.push(context.createTextNode(elem));
              } else {
                tmp2 = tmp2 || fragment.appendChild(context.createElement("div"));
                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                wrap = wrapMap[tag] || wrapMap._default;
                tmp2.innerHTML = wrap[1] + jQuery2.htmlPrefilter(elem) + wrap[2];
                j2 = wrap[0];
                while (j2--) {
                  tmp2 = tmp2.lastChild;
                }
                jQuery2.merge(nodes, tmp2.childNodes);
                tmp2 = fragment.firstChild;
                tmp2.textContent = "";
              }
            }
          }
          fragment.textContent = "";
          i2 = 0;
          while (elem = nodes[i2++]) {
            if (selection && jQuery2.inArray(elem, selection) > -1) {
              if (ignored) {
                ignored.push(elem);
              }
              continue;
            }
            attached = isAttached(elem);
            tmp2 = getAll(fragment.appendChild(elem), "script");
            if (attached) {
              setGlobalEval(tmp2);
            }
            if (scripts) {
              j2 = 0;
              while (elem = tmp2[j2++]) {
                if (rscriptType.test(elem.type || "")) {
                  scripts.push(elem);
                }
              }
            }
          }
          return fragment;
        }
        var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
          return true;
        }
        function returnFalse() {
          return false;
        }
        function on(elem, types, selector, data2, fn, one) {
          var origFn, type;
          if (typeof types === "object") {
            if (typeof selector !== "string") {
              data2 = data2 || selector;
              selector = void 0;
            }
            for (type in types) {
              on(elem, type, selector, data2, types[type], one);
            }
            return elem;
          }
          if (data2 == null && fn == null) {
            fn = selector;
            data2 = selector = void 0;
          } else if (fn == null) {
            if (typeof selector === "string") {
              fn = data2;
              data2 = void 0;
            } else {
              fn = data2;
              data2 = selector;
              selector = void 0;
            }
          }
          if (fn === false) {
            fn = returnFalse;
          } else if (!fn) {
            return elem;
          }
          if (one === 1) {
            origFn = fn;
            fn = function(event) {
              jQuery2().off(event);
              return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery2.guid++);
          }
          return elem.each(function() {
            jQuery2.event.add(this, types, fn, data2, selector);
          });
        }
        jQuery2.event = {
          global: {},
          add: function(elem, types, handler, data2, selector) {
            var handleObjIn, eventHandle, tmp2, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!acceptData(elem)) {
              return;
            }
            if (handler.handler) {
              handleObjIn = handler;
              handler = handleObjIn.handler;
              selector = handleObjIn.selector;
            }
            if (selector) {
              jQuery2.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
              handler.guid = jQuery2.guid++;
            }
            if (!(events = elemData.events)) {
              events = elemData.events = /* @__PURE__ */ Object.create(null);
            }
            if (!(eventHandle = elemData.handle)) {
              eventHandle = elemData.handle = function(e) {
                return typeof jQuery2 !== "undefined" && jQuery2.event.triggered !== e.type ? jQuery2.event.dispatch.apply(elem, arguments) : void 0;
              };
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp2 = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp2[1];
              namespaces = (tmp2[2] || "").split(".").sort();
              if (!type) {
                continue;
              }
              special = jQuery2.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              special = jQuery2.event.special[type] || {};
              handleObj = jQuery2.extend({
                type,
                origType,
                data: data2,
                handler,
                guid: handler.guid,
                selector,
                needsContext: selector && jQuery2.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
              }, handleObjIn);
              if (!(handlers = events[type])) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;
                if (!special.setup || special.setup.call(elem, data2, namespaces, eventHandle) === false) {
                  if (elem.addEventListener) {
                    elem.addEventListener(type, eventHandle);
                  }
                }
              }
              if (special.add) {
                special.add.call(elem, handleObj);
                if (!handleObj.handler.guid) {
                  handleObj.handler.guid = handler.guid;
                }
              }
              if (selector) {
                handlers.splice(handlers.delegateCount++, 0, handleObj);
              } else {
                handlers.push(handleObj);
              }
              jQuery2.event.global[type] = true;
            }
          },
          // Detach an event or set of events from an element
          remove: function(elem, types, handler, selector, mappedTypes) {
            var j2, origCount, tmp2, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
              return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp2 = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp2[1];
              namespaces = (tmp2[2] || "").split(".").sort();
              if (!type) {
                for (type in events) {
                  jQuery2.event.remove(elem, type + types[t], handler, selector, true);
                }
                continue;
              }
              special = jQuery2.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              handlers = events[type] || [];
              tmp2 = tmp2[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
              origCount = j2 = handlers.length;
              while (j2--) {
                handleObj = handlers[j2];
                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp2 || tmp2.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                  handlers.splice(j2, 1);
                  if (handleObj.selector) {
                    handlers.delegateCount--;
                  }
                  if (special.remove) {
                    special.remove.call(elem, handleObj);
                  }
                }
              }
              if (origCount && !handlers.length) {
                if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                  jQuery2.removeEvent(elem, type, elemData.handle);
                }
                delete events[type];
              }
            }
            if (jQuery2.isEmptyObject(events)) {
              dataPriv.remove(elem, "handle events");
            }
          },
          dispatch: function(nativeEvent) {
            var i2, j2, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery2.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery2.event.special[event.type] || {};
            args[0] = event;
            for (i2 = 1; i2 < arguments.length; i2++) {
              args[i2] = arguments[i2];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
              return;
            }
            handlerQueue = jQuery2.event.handlers.call(this, event, handlers);
            i2 = 0;
            while ((matched = handlerQueue[i2++]) && !event.isPropagationStopped()) {
              event.currentTarget = matched.elem;
              j2 = 0;
              while ((handleObj = matched.handlers[j2++]) && !event.isImmediatePropagationStopped()) {
                if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                  event.handleObj = handleObj;
                  event.data = handleObj.data;
                  ret = ((jQuery2.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                  if (ret !== void 0) {
                    if ((event.result = ret) === false) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }
                }
              }
            }
            if (special.postDispatch) {
              special.postDispatch.call(this, event);
            }
            return event.result;
          },
          handlers: function(event, handlers) {
            var i2, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && // Support: IE <=9
            // Black-hole SVG <use> instance trees (trac-13180)
            cur.nodeType && // Support: Firefox <=42
            // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
            // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
            // Support: IE 11 only
            // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
            !(event.type === "click" && event.button >= 1)) {
              for (; cur !== this; cur = cur.parentNode || this) {
                if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                  matchedHandlers = [];
                  matchedSelectors = {};
                  for (i2 = 0; i2 < delegateCount; i2++) {
                    handleObj = handlers[i2];
                    sel = handleObj.selector + " ";
                    if (matchedSelectors[sel] === void 0) {
                      matchedSelectors[sel] = handleObj.needsContext ? jQuery2(sel, this).index(cur) > -1 : jQuery2.find(sel, this, null, [cur]).length;
                    }
                    if (matchedSelectors[sel]) {
                      matchedHandlers.push(handleObj);
                    }
                  }
                  if (matchedHandlers.length) {
                    handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                  }
                }
              }
            }
            cur = this;
            if (delegateCount < handlers.length) {
              handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }
            return handlerQueue;
          },
          addProp: function(name, hook) {
            Object.defineProperty(jQuery2.Event.prototype, name, {
              enumerable: true,
              configurable: true,
              get: isFunction(hook) ? function() {
                if (this.originalEvent) {
                  return hook(this.originalEvent);
                }
              } : function() {
                if (this.originalEvent) {
                  return this.originalEvent[name];
                }
              },
              set: function(value) {
                Object.defineProperty(this, name, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value
                });
              }
            });
          },
          fix: function(originalEvent) {
            return originalEvent[jQuery2.expando] ? originalEvent : new jQuery2.Event(originalEvent);
          },
          special: {
            load: {
              // Prevent triggered image.load events from bubbling to window.load
              noBubble: true
            },
            click: {
              // Utilize native event to ensure correct state for checkable inputs
              setup: function(data2) {
                var el = this || data2;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click", true);
                }
                return false;
              },
              trigger: function(data2) {
                var el = this || data2;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click");
                }
                return true;
              },
              // For cross-browser consistency, suppress native .click() on links
              // Also prevent it if we're currently inside a leveraged native-event stack
              _default: function(event) {
                var target = event.target;
                return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
              }
            },
            beforeunload: {
              postDispatch: function(event) {
                if (event.result !== void 0 && event.originalEvent) {
                  event.originalEvent.returnValue = event.result;
                }
              }
            }
          }
        };
        function leverageNative(el, type, isSetup) {
          if (!isSetup) {
            if (dataPriv.get(el, type) === void 0) {
              jQuery2.event.add(el, type, returnTrue);
            }
            return;
          }
          dataPriv.set(el, type, false);
          jQuery2.event.add(el, type, {
            namespace: false,
            handler: function(event) {
              var result, saved = dataPriv.get(this, type);
              if (event.isTrigger & 1 && this[type]) {
                if (!saved) {
                  saved = slice.call(arguments);
                  dataPriv.set(this, type, saved);
                  this[type]();
                  result = dataPriv.get(this, type);
                  dataPriv.set(this, type, false);
                  if (saved !== result) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return result;
                  }
                } else if ((jQuery2.event.special[type] || {}).delegateType) {
                  event.stopPropagation();
                }
              } else if (saved) {
                dataPriv.set(this, type, jQuery2.event.trigger(
                  saved[0],
                  saved.slice(1),
                  this
                ));
                event.stopPropagation();
                event.isImmediatePropagationStopped = returnTrue;
              }
            }
          });
        }
        jQuery2.removeEvent = function(elem, type, handle) {
          if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
          }
        };
        jQuery2.Event = function(src, props) {
          if (!(this instanceof jQuery2.Event)) {
            return new jQuery2.Event(src, props);
          }
          if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
            src.returnValue === false ? returnTrue : returnFalse;
            this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
          } else {
            this.type = src;
          }
          if (props) {
            jQuery2.extend(this, props);
          }
          this.timeStamp = src && src.timeStamp || Date.now();
          this[jQuery2.expando] = true;
        };
        jQuery2.Event.prototype = {
          constructor: jQuery2.Event,
          isDefaultPrevented: returnFalse,
          isPropagationStopped: returnFalse,
          isImmediatePropagationStopped: returnFalse,
          isSimulated: false,
          preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
              e.preventDefault();
            }
          },
          stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopPropagation();
            }
          },
          stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopImmediatePropagation();
            }
            this.stopPropagation();
          }
        };
        jQuery2.each({
          altKey: true,
          bubbles: true,
          cancelable: true,
          changedTouches: true,
          ctrlKey: true,
          detail: true,
          eventPhase: true,
          metaKey: true,
          pageX: true,
          pageY: true,
          shiftKey: true,
          view: true,
          "char": true,
          code: true,
          charCode: true,
          key: true,
          keyCode: true,
          button: true,
          buttons: true,
          clientX: true,
          clientY: true,
          offsetX: true,
          offsetY: true,
          pointerId: true,
          pointerType: true,
          screenX: true,
          screenY: true,
          targetTouches: true,
          toElement: true,
          touches: true,
          which: true
        }, jQuery2.event.addProp);
        jQuery2.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
          function focusMappedHandler(nativeEvent) {
            if (document2.documentMode) {
              var handle = dataPriv.get(this, "handle"), event = jQuery2.event.fix(nativeEvent);
              event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
              event.isSimulated = true;
              handle(nativeEvent);
              if (event.target === event.currentTarget) {
                handle(event);
              }
            } else {
              jQuery2.event.simulate(
                delegateType,
                nativeEvent.target,
                jQuery2.event.fix(nativeEvent)
              );
            }
          }
          jQuery2.event.special[type] = {
            // Utilize native event if possible so blur/focus sequence is correct
            setup: function() {
              var attaches;
              leverageNative(this, type, true);
              if (document2.documentMode) {
                attaches = dataPriv.get(this, delegateType);
                if (!attaches) {
                  this.addEventListener(delegateType, focusMappedHandler);
                }
                dataPriv.set(this, delegateType, (attaches || 0) + 1);
              } else {
                return false;
              }
            },
            trigger: function() {
              leverageNative(this, type);
              return true;
            },
            teardown: function() {
              var attaches;
              if (document2.documentMode) {
                attaches = dataPriv.get(this, delegateType) - 1;
                if (!attaches) {
                  this.removeEventListener(delegateType, focusMappedHandler);
                  dataPriv.remove(this, delegateType);
                } else {
                  dataPriv.set(this, delegateType, attaches);
                }
              } else {
                return false;
              }
            },
            // Suppress native focus or blur if we're currently inside
            // a leveraged native-event stack
            _default: function(event) {
              return dataPriv.get(event.target, type);
            },
            delegateType
          };
          jQuery2.event.special[delegateType] = {
            setup: function() {
              var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType);
              if (!attaches) {
                if (document2.documentMode) {
                  this.addEventListener(delegateType, focusMappedHandler);
                } else {
                  doc.addEventListener(type, focusMappedHandler, true);
                }
              }
              dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
            },
            teardown: function() {
              var doc = this.ownerDocument || this.document || this, dataHolder = document2.documentMode ? this : doc, attaches = dataPriv.get(dataHolder, delegateType) - 1;
              if (!attaches) {
                if (document2.documentMode) {
                  this.removeEventListener(delegateType, focusMappedHandler);
                } else {
                  doc.removeEventListener(type, focusMappedHandler, true);
                }
                dataPriv.remove(dataHolder, delegateType);
              } else {
                dataPriv.set(dataHolder, delegateType, attaches);
              }
            }
          };
        });
        jQuery2.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        }, function(orig, fix) {
          jQuery2.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
              var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
              if (!related || related !== target && !jQuery2.contains(target, related)) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply(this, arguments);
                event.type = fix;
              }
              return ret;
            }
          };
        });
        jQuery2.fn.extend({
          on: function(types, selector, data2, fn) {
            return on(this, types, selector, data2, fn);
          },
          one: function(types, selector, data2, fn) {
            return on(this, types, selector, data2, fn, 1);
          },
          off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
              handleObj = types.handleObj;
              jQuery2(types.delegateTarget).off(
                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                handleObj.selector,
                handleObj.handler
              );
              return this;
            }
            if (typeof types === "object") {
              for (type in types) {
                this.off(type, selector, types[type]);
              }
              return this;
            }
            if (selector === false || typeof selector === "function") {
              fn = selector;
              selector = void 0;
            }
            if (fn === false) {
              fn = returnFalse;
            }
            return this.each(function() {
              jQuery2.event.remove(this, types, fn, selector);
            });
          }
        });
        var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        function manipulationTarget(elem, content) {
          if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
            return jQuery2(elem).children("tbody")[0] || elem;
          }
          return elem;
        }
        function disableScript(elem) {
          elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
          return elem;
        }
        function restoreScript(elem) {
          if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
          } else {
            elem.removeAttribute("type");
          }
          return elem;
        }
        function cloneCopyEvent(src, dest) {
          var i2, l, type, pdataOld, udataOld, udataCur, events;
          if (dest.nodeType !== 1) {
            return;
          }
          if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.get(src);
            events = pdataOld.events;
            if (events) {
              dataPriv.remove(dest, "handle events");
              for (type in events) {
                for (i2 = 0, l = events[type].length; i2 < l; i2++) {
                  jQuery2.event.add(dest, type, events[type][i2]);
                }
              }
            }
          }
          if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery2.extend({}, udataOld);
            dataUser.set(dest, udataCur);
          }
        }
        function fixInput(src, dest) {
          var nodeName2 = dest.nodeName.toLowerCase();
          if (nodeName2 === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
          } else if (nodeName2 === "input" || nodeName2 === "textarea") {
            dest.defaultValue = src.defaultValue;
          }
        }
        function domManip(collection, args, callback, ignored) {
          args = flat(args);
          var fragment, first, scripts, hasScripts, node, doc, i2 = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
          if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
            return collection.each(function(index) {
              var self2 = collection.eq(index);
              if (valueIsFunction) {
                args[0] = value.call(this, index, self2.html());
              }
              domManip(self2, args, callback, ignored);
            });
          }
          if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
              fragment = first;
            }
            if (first || ignored) {
              scripts = jQuery2.map(getAll(fragment, "script"), disableScript);
              hasScripts = scripts.length;
              for (; i2 < l; i2++) {
                node = fragment;
                if (i2 !== iNoClone) {
                  node = jQuery2.clone(node, true, true);
                  if (hasScripts) {
                    jQuery2.merge(scripts, getAll(node, "script"));
                  }
                }
                callback.call(collection[i2], node, i2);
              }
              if (hasScripts) {
                doc = scripts[scripts.length - 1].ownerDocument;
                jQuery2.map(scripts, restoreScript);
                for (i2 = 0; i2 < hasScripts; i2++) {
                  node = scripts[i2];
                  if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery2.contains(doc, node)) {
                    if (node.src && (node.type || "").toLowerCase() !== "module") {
                      if (jQuery2._evalUrl && !node.noModule) {
                        jQuery2._evalUrl(node.src, {
                          nonce: node.nonce || node.getAttribute("nonce")
                        }, doc);
                      }
                    } else {
                      DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                    }
                  }
                }
              }
            }
          }
          return collection;
        }
        function remove(elem, selector, keepData) {
          var node, nodes = selector ? jQuery2.filter(selector, elem) : elem, i2 = 0;
          for (; (node = nodes[i2]) != null; i2++) {
            if (!keepData && node.nodeType === 1) {
              jQuery2.cleanData(getAll(node));
            }
            if (node.parentNode) {
              if (keepData && isAttached(node)) {
                setGlobalEval(getAll(node, "script"));
              }
              node.parentNode.removeChild(node);
            }
          }
          return elem;
        }
        jQuery2.extend({
          htmlPrefilter: function(html) {
            return html;
          },
          clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var i2, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery2.isXMLDoc(elem)) {
              destElements = getAll(clone);
              srcElements = getAll(elem);
              for (i2 = 0, l = srcElements.length; i2 < l; i2++) {
                fixInput(srcElements[i2], destElements[i2]);
              }
            }
            if (dataAndEvents) {
              if (deepDataAndEvents) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);
                for (i2 = 0, l = srcElements.length; i2 < l; i2++) {
                  cloneCopyEvent(srcElements[i2], destElements[i2]);
                }
              } else {
                cloneCopyEvent(elem, clone);
              }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
              setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
          },
          cleanData: function(elems) {
            var data2, elem, type, special = jQuery2.event.special, i2 = 0;
            for (; (elem = elems[i2]) !== void 0; i2++) {
              if (acceptData(elem)) {
                if (data2 = elem[dataPriv.expando]) {
                  if (data2.events) {
                    for (type in data2.events) {
                      if (special[type]) {
                        jQuery2.event.remove(elem, type);
                      } else {
                        jQuery2.removeEvent(elem, type, data2.handle);
                      }
                    }
                  }
                  elem[dataPriv.expando] = void 0;
                }
                if (elem[dataUser.expando]) {
                  elem[dataUser.expando] = void 0;
                }
              }
            }
          }
        });
        jQuery2.fn.extend({
          detach: function(selector) {
            return remove(this, selector, true);
          },
          remove: function(selector) {
            return remove(this, selector);
          },
          text: function(value) {
            return access(this, function(value2) {
              return value2 === void 0 ? jQuery2.text(this) : this.empty().each(function() {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                  this.textContent = value2;
                }
              });
            }, null, value, arguments.length);
          },
          append: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.appendChild(elem);
              }
            });
          },
          prepend: function() {
            return domManip(this, arguments, function(elem) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem);
                target.insertBefore(elem, target.firstChild);
              }
            });
          },
          before: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this);
              }
            });
          },
          after: function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this.nextSibling);
              }
            });
          },
          empty: function() {
            var elem, i2 = 0;
            for (; (elem = this[i2]) != null; i2++) {
              if (elem.nodeType === 1) {
                jQuery2.cleanData(getAll(elem, false));
                elem.textContent = "";
              }
            }
            return this;
          },
          clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
              return jQuery2.clone(this, dataAndEvents, deepDataAndEvents);
            });
          },
          html: function(value) {
            return access(this, function(value2) {
              var elem = this[0] || {}, i2 = 0, l = this.length;
              if (value2 === void 0 && elem.nodeType === 1) {
                return elem.innerHTML;
              }
              if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
                value2 = jQuery2.htmlPrefilter(value2);
                try {
                  for (; i2 < l; i2++) {
                    elem = this[i2] || {};
                    if (elem.nodeType === 1) {
                      jQuery2.cleanData(getAll(elem, false));
                      elem.innerHTML = value2;
                    }
                  }
                  elem = 0;
                } catch (e) {
                }
              }
              if (elem) {
                this.empty().append(value2);
              }
            }, null, value, arguments.length);
          },
          replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem) {
              var parent = this.parentNode;
              if (jQuery2.inArray(this, ignored) < 0) {
                jQuery2.cleanData(getAll(this));
                if (parent) {
                  parent.replaceChild(elem, this);
                }
              }
            }, ignored);
          }
        });
        jQuery2.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        }, function(name, original) {
          jQuery2.fn[name] = function(selector) {
            var elems, ret = [], insert = jQuery2(selector), last = insert.length - 1, i2 = 0;
            for (; i2 <= last; i2++) {
              elems = i2 === last ? this : this.clone(true);
              jQuery2(insert[i2])[original](elems);
              push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
          };
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var rcustomProp = /^--/;
        var getStyles = function(elem) {
          var view = elem.ownerDocument.defaultView;
          if (!view || !view.opener) {
            view = window2;
          }
          return view.getComputedStyle(elem);
        };
        var swap = function(elem, options, callback) {
          var ret, name, old = {};
          for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
          }
          ret = callback.call(elem);
          for (name in options) {
            elem.style[name] = old[name];
          }
          return ret;
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function() {
          function computeStyleTests() {
            if (!div) {
              return;
            }
            container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
            div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);
            var divStyle = window2.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
            documentElement.removeChild(container);
            div = null;
          }
          function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
          }
          var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
          if (!div.style) {
            return;
          }
          div.style.backgroundClip = "content-box";
          div.cloneNode(true).style.backgroundClip = "";
          support.clearCloneStyle = div.style.backgroundClip === "content-box";
          jQuery2.extend(support, {
            boxSizingReliable: function() {
              computeStyleTests();
              return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
              computeStyleTests();
              return pixelBoxStylesVal;
            },
            pixelPosition: function() {
              computeStyleTests();
              return pixelPositionVal;
            },
            reliableMarginLeft: function() {
              computeStyleTests();
              return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
              computeStyleTests();
              return scrollboxSizeVal;
            },
            // Support: IE 9 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Behavior in IE 9 is more subtle than in newer versions & it passes
            // some versions of this test; make sure not to make it pass there!
            //
            // Support: Firefox 70+
            // Only Firefox includes border widths
            // in computed dimensions. (gh-4529)
            reliableTrDimensions: function() {
              var table, tr, trChild, trStyle;
              if (reliableTrDimensionsVal == null) {
                table = document2.createElement("table");
                tr = document2.createElement("tr");
                trChild = document2.createElement("div");
                table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                tr.style.cssText = "box-sizing:content-box;border:1px solid";
                tr.style.height = "1px";
                trChild.style.height = "9px";
                trChild.style.display = "block";
                documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
                trStyle = window2.getComputedStyle(tr);
                reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
                documentElement.removeChild(table);
              }
              return reliableTrDimensionsVal;
            }
          });
        })();
        function curCSS(elem, name, computed) {
          var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
          computed = computed || getStyles(elem);
          if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
            if (isCustomProp && ret) {
              ret = ret.replace(rtrimCSS, "$1") || void 0;
            }
            if (ret === "" && !isAttached(elem)) {
              ret = jQuery2.style(elem, name);
            }
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
              width = style.width;
              minWidth = style.minWidth;
              maxWidth = style.maxWidth;
              style.minWidth = style.maxWidth = style.width = ret;
              ret = computed.width;
              style.width = width;
              style.minWidth = minWidth;
              style.maxWidth = maxWidth;
            }
          }
          return ret !== void 0 ? (
            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + ""
          ) : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
          return {
            get: function() {
              if (conditionFn()) {
                delete this.get;
                return;
              }
              return (this.get = hookFn).apply(this, arguments);
            }
          };
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
        function vendorPropName(name) {
          var capName = name[0].toUpperCase() + name.slice(1), i2 = cssPrefixes.length;
          while (i2--) {
            name = cssPrefixes[i2] + capName;
            if (name in emptyStyle) {
              return name;
            }
          }
        }
        function finalPropName(name) {
          var final = jQuery2.cssProps[name] || vendorProps[name];
          if (final) {
            return final;
          }
          if (name in emptyStyle) {
            return name;
          }
          return vendorProps[name] = vendorPropName(name) || name;
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
          letterSpacing: "0",
          fontWeight: "400"
        };
        function setPositiveNumber(_elem, value, subtract) {
          var matches = rcssNum.exec(value);
          return matches ? (
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
          ) : value;
        }
        function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
          var i2 = dimension === "width" ? 1 : 0, extra = 0, delta = 0, marginDelta = 0;
          if (box === (isBorderBox ? "border" : "content")) {
            return 0;
          }
          for (; i2 < 4; i2 += 2) {
            if (box === "margin") {
              marginDelta += jQuery2.css(elem, box + cssExpand[i2], true, styles);
            }
            if (!isBorderBox) {
              delta += jQuery2.css(elem, "padding" + cssExpand[i2], true, styles);
              if (box !== "padding") {
                delta += jQuery2.css(elem, "border" + cssExpand[i2] + "Width", true, styles);
              } else {
                extra += jQuery2.css(elem, "border" + cssExpand[i2] + "Width", true, styles);
              }
            } else {
              if (box === "content") {
                delta -= jQuery2.css(elem, "padding" + cssExpand[i2], true, styles);
              }
              if (box !== "margin") {
                delta -= jQuery2.css(elem, "border" + cssExpand[i2] + "Width", true, styles);
              }
            }
          }
          if (!isBorderBox && computedVal >= 0) {
            delta += Math.max(0, Math.ceil(
              elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
              // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
              // Use an explicit zero to avoid NaN (gh-3964)
            )) || 0;
          }
          return delta + marginDelta;
        }
        function getWidthOrHeight(elem, dimension, extra) {
          var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
          if (rnumnonpx.test(val)) {
            if (!extra) {
              return val;
            }
            val = "auto";
          }
          if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Interestingly, in some cases IE 9 doesn't suffer from this issue.
          !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
          // This happens for inline elements with no explicit setting (gh-3571)
          val === "auto" || // Support: Android <=4.1 - 4.3 only
          // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
          !parseFloat(val) && jQuery2.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
          elem.getClientRects().length) {
            isBorderBox = jQuery2.css(elem, "boxSizing", false, styles) === "border-box";
            valueIsBorderBox = offsetProp in elem;
            if (valueIsBorderBox) {
              val = elem[offsetProp];
            }
          }
          val = parseFloat(val) || 0;
          return val + boxModelAdjustment(
            elem,
            dimension,
            extra || (isBorderBox ? "border" : "content"),
            valueIsBorderBox,
            styles,
            // Provide the current computed size to request scroll gutter calculation (gh-3589)
            val
          ) + "px";
        }
        jQuery2.extend({
          // Add in style property hooks for overriding the default
          // behavior of getting and setting a style property
          cssHooks: {
            opacity: {
              get: function(elem, computed) {
                if (computed) {
                  var ret = curCSS(elem, "opacity");
                  return ret === "" ? "1" : ret;
                }
              }
            }
          },
          // Don't automatically add "px" to these possibly-unitless properties
          cssNumber: {
            animationIterationCount: true,
            aspectRatio: true,
            borderImageSlice: true,
            columnCount: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            gridArea: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnStart: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowStart: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            scale: true,
            widows: true,
            zIndex: true,
            zoom: true,
            // SVG-related
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeMiterlimit: true,
            strokeOpacity: true
          },
          // Add in properties whose names you wish to fix before
          // setting or getting the value
          cssProps: {},
          // Get and set the style property on a DOM Node
          style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
              return;
            }
            var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
            if (value !== void 0) {
              type = typeof value;
              if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                value = adjustCSS(elem, name, ret);
                type = "number";
              }
              if (value == null || value !== value) {
                return;
              }
              if (type === "number" && !isCustomProp) {
                value += ret && ret[3] || (jQuery2.cssNumber[origName] ? "" : "px");
              }
              if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                style[name] = "inherit";
              }
              if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
                if (isCustomProp) {
                  style.setProperty(name, value);
                } else {
                  style[name] = value;
                }
              }
            } else {
              if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
                return ret;
              }
              return style[name];
            }
          },
          css: function(elem, name, extra, styles) {
            var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
            if (!isCustomProp) {
              name = finalPropName(origName);
            }
            hooks = jQuery2.cssHooks[name] || jQuery2.cssHooks[origName];
            if (hooks && "get" in hooks) {
              val = hooks.get(elem, true, extra);
            }
            if (val === void 0) {
              val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
              val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
              num = parseFloat(val);
              return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
          }
        });
        jQuery2.each(["height", "width"], function(_i, dimension) {
          jQuery2.cssHooks[dimension] = {
            get: function(elem, computed, extra) {
              if (computed) {
                return rdisplayswap.test(jQuery2.css(elem, "display")) && // Support: Safari 8+
                // Table columns in Safari have non-zero offsetWidth & zero
                // getBoundingClientRect().width unless display is changed.
                // Support: IE <=11 only
                // Running getBoundingClientRect on a disconnected node
                // in IE throws an error.
                (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                  return getWidthOrHeight(elem, dimension, extra);
                }) : getWidthOrHeight(elem, dimension, extra);
              }
            },
            set: function(elem, value, extra) {
              var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery2.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
                elem,
                dimension,
                extra,
                isBorderBox,
                styles
              ) : 0;
              if (isBorderBox && scrollboxSizeBuggy) {
                subtract -= Math.ceil(
                  elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
                );
              }
              if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                elem.style[dimension] = value;
                value = jQuery2.css(elem, dimension);
              }
              return setPositiveNumber(elem, value, subtract);
            }
          };
        });
        jQuery2.cssHooks.marginLeft = addGetHookIf(
          support.reliableMarginLeft,
          function(elem, computed) {
            if (computed) {
              return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
                return elem.getBoundingClientRect().left;
              })) + "px";
            }
          }
        );
        jQuery2.each({
          margin: "",
          padding: "",
          border: "Width"
        }, function(prefix, suffix) {
          jQuery2.cssHooks[prefix + suffix] = {
            expand: function(value) {
              var i2 = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
              for (; i2 < 4; i2++) {
                expanded[prefix + cssExpand[i2] + suffix] = parts[i2] || parts[i2 - 2] || parts[0];
              }
              return expanded;
            }
          };
          if (prefix !== "margin") {
            jQuery2.cssHooks[prefix + suffix].set = setPositiveNumber;
          }
        });
        jQuery2.fn.extend({
          css: function(name, value) {
            return access(this, function(elem, name2, value2) {
              var styles, len, map = {}, i2 = 0;
              if (Array.isArray(name2)) {
                styles = getStyles(elem);
                len = name2.length;
                for (; i2 < len; i2++) {
                  map[name2[i2]] = jQuery2.css(elem, name2[i2], false, styles);
                }
                return map;
              }
              return value2 !== void 0 ? jQuery2.style(elem, name2, value2) : jQuery2.css(elem, name2);
            }, name, value, arguments.length > 1);
          }
        });
        function Tween(elem, options, prop, end, easing) {
          return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery2.Tween = Tween;
        Tween.prototype = {
          constructor: Tween,
          init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery2.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery2.cssNumber[prop] ? "" : "px");
          },
          cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
          },
          run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
              this.pos = eased = jQuery2.easing[this.easing](
                percent,
                this.options.duration * percent,
                0,
                1,
                this.options.duration
              );
            } else {
              this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
              this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
              hooks.set(this);
            } else {
              Tween.propHooks._default.set(this);
            }
            return this;
          }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
          _default: {
            get: function(tween) {
              var result;
              if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                return tween.elem[tween.prop];
              }
              result = jQuery2.css(tween.elem, tween.prop, "");
              return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
              if (jQuery2.fx.step[tween.prop]) {
                jQuery2.fx.step[tween.prop](tween);
              } else if (tween.elem.nodeType === 1 && (jQuery2.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                jQuery2.style(tween.elem, tween.prop, tween.now + tween.unit);
              } else {
                tween.elem[tween.prop] = tween.now;
              }
            }
          }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
          set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
              tween.elem[tween.prop] = tween.now;
            }
          }
        };
        jQuery2.easing = {
          linear: function(p) {
            return p;
          },
          swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
          },
          _default: "swing"
        };
        jQuery2.fx = Tween.prototype.init;
        jQuery2.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
          if (inProgress) {
            if (document2.hidden === false && window2.requestAnimationFrame) {
              window2.requestAnimationFrame(schedule);
            } else {
              window2.setTimeout(schedule, jQuery2.fx.interval);
            }
            jQuery2.fx.tick();
          }
        }
        function createFxNow() {
          window2.setTimeout(function() {
            fxNow = void 0;
          });
          return fxNow = Date.now();
        }
        function genFx(type, includeWidth) {
          var which, i2 = 0, attrs = { height: type };
          includeWidth = includeWidth ? 1 : 0;
          for (; i2 < 4; i2 += 2 - includeWidth) {
            which = cssExpand[i2];
            attrs["margin" + which] = attrs["padding" + which] = type;
          }
          if (includeWidth) {
            attrs.opacity = attrs.width = type;
          }
          return attrs;
        }
        function createTween(value, prop, animation) {
          var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
          for (; index < length; index++) {
            if (tween = collection[index].call(animation, prop, value)) {
              return tween;
            }
          }
        }
        function defaultPrefilter(elem, props, opts) {
          var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
          if (!opts.queue) {
            hooks = jQuery2._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
              hooks.unqueued = 0;
              oldfire = hooks.empty.fire;
              hooks.empty.fire = function() {
                if (!hooks.unqueued) {
                  oldfire();
                }
              };
            }
            hooks.unqueued++;
            anim.always(function() {
              anim.always(function() {
                hooks.unqueued--;
                if (!jQuery2.queue(elem, "fx").length) {
                  hooks.empty.fire();
                }
              });
            });
          }
          for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
              delete props[prop];
              toggle = toggle || value === "toggle";
              if (value === (hidden ? "hide" : "show")) {
                if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                  hidden = true;
                } else {
                  continue;
                }
              }
              orig[prop] = dataShow && dataShow[prop] || jQuery2.style(elem, prop);
            }
          }
          propTween = !jQuery2.isEmptyObject(props);
          if (!propTween && jQuery2.isEmptyObject(orig)) {
            return;
          }
          if (isBox && elem.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
              restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery2.css(elem, "display");
            if (display === "none") {
              if (restoreDisplay) {
                display = restoreDisplay;
              } else {
                showHide([elem], true);
                restoreDisplay = elem.style.display || restoreDisplay;
                display = jQuery2.css(elem, "display");
                showHide([elem]);
              }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
              if (jQuery2.css(elem, "float") === "none") {
                if (!propTween) {
                  anim.done(function() {
                    style.display = restoreDisplay;
                  });
                  if (restoreDisplay == null) {
                    display = style.display;
                    restoreDisplay = display === "none" ? "" : display;
                  }
                }
                style.display = "inline-block";
              }
            }
          }
          if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
              style.overflow = opts.overflow[0];
              style.overflowX = opts.overflow[1];
              style.overflowY = opts.overflow[2];
            });
          }
          propTween = false;
          for (prop in orig) {
            if (!propTween) {
              if (dataShow) {
                if ("hidden" in dataShow) {
                  hidden = dataShow.hidden;
                }
              } else {
                dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
              }
              if (toggle) {
                dataShow.hidden = !hidden;
              }
              if (hidden) {
                showHide([elem], true);
              }
              anim.done(function() {
                if (!hidden) {
                  showHide([elem]);
                }
                dataPriv.remove(elem, "fxshow");
                for (prop in orig) {
                  jQuery2.style(elem, prop, orig[prop]);
                }
              });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
              dataShow[prop] = propTween.start;
              if (hidden) {
                propTween.end = propTween.start;
                propTween.start = 0;
              }
            }
          }
        }
        function propFilter(props, specialEasing) {
          var index, name, easing, value, hooks;
          for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
              easing = value[1];
              value = props[index] = value[0];
            }
            if (index !== name) {
              props[name] = value;
              delete props[index];
            }
            hooks = jQuery2.cssHooks[name];
            if (hooks && "expand" in hooks) {
              value = hooks.expand(value);
              delete props[name];
              for (index in value) {
                if (!(index in props)) {
                  props[index] = value[index];
                  specialEasing[index] = easing;
                }
              }
            } else {
              specialEasing[name] = easing;
            }
          }
        }
        function Animation(elem, properties, options) {
          var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery2.Deferred().always(function() {
            delete tick.elem;
          }), tick = function() {
            if (stopped) {
              return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length2) {
              return remaining;
            }
            if (!length2) {
              deferred.notifyWith(elem, [animation, 1, 0]);
            }
            deferred.resolveWith(elem, [animation]);
            return false;
          }, animation = deferred.promise({
            elem,
            props: jQuery2.extend({}, properties),
            opts: jQuery2.extend(true, {
              specialEasing: {},
              easing: jQuery2.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
              var tween = jQuery2.Tween(
                elem,
                animation.opts,
                prop,
                end,
                animation.opts.specialEasing[prop] || animation.opts.easing
              );
              animation.tweens.push(tween);
              return tween;
            },
            stop: function(gotoEnd) {
              var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
              if (stopped) {
                return this;
              }
              stopped = true;
              for (; index2 < length2; index2++) {
                animation.tweens[index2].run(1);
              }
              if (gotoEnd) {
                deferred.notifyWith(elem, [animation, 1, 0]);
                deferred.resolveWith(elem, [animation, gotoEnd]);
              } else {
                deferred.rejectWith(elem, [animation, gotoEnd]);
              }
              return this;
            }
          }), props = animation.props;
          propFilter(props, animation.opts.specialEasing);
          for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
              if (isFunction(result.stop)) {
                jQuery2._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
              }
              return result;
            }
          }
          jQuery2.map(props, createTween, animation);
          if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
          }
          animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
          jQuery2.fx.timer(
            jQuery2.extend(tick, {
              elem,
              anim: animation,
              queue: animation.opts.queue
            })
          );
          return animation;
        }
        jQuery2.Animation = jQuery2.extend(Animation, {
          tweeners: {
            "*": [function(prop, value) {
              var tween = this.createTween(prop, value);
              adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
              return tween;
            }]
          },
          tweener: function(props, callback) {
            if (isFunction(props)) {
              callback = props;
              props = ["*"];
            } else {
              props = props.match(rnothtmlwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
              prop = props[index];
              Animation.tweeners[prop] = Animation.tweeners[prop] || [];
              Animation.tweeners[prop].unshift(callback);
            }
          },
          prefilters: [defaultPrefilter],
          prefilter: function(callback, prepend) {
            if (prepend) {
              Animation.prefilters.unshift(callback);
            } else {
              Animation.prefilters.push(callback);
            }
          }
        });
        jQuery2.speed = function(speed, easing, fn) {
          var opt = speed && typeof speed === "object" ? jQuery2.extend({}, speed) : {
            complete: fn || !fn && easing || isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
          };
          if (jQuery2.fx.off) {
            opt.duration = 0;
          } else {
            if (typeof opt.duration !== "number") {
              if (opt.duration in jQuery2.fx.speeds) {
                opt.duration = jQuery2.fx.speeds[opt.duration];
              } else {
                opt.duration = jQuery2.fx.speeds._default;
              }
            }
          }
          if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
          }
          opt.old = opt.complete;
          opt.complete = function() {
            if (isFunction(opt.old)) {
              opt.old.call(this);
            }
            if (opt.queue) {
              jQuery2.dequeue(this, opt.queue);
            }
          };
          return opt;
        };
        jQuery2.fn.extend({
          fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
          },
          animate: function(prop, speed, easing, callback) {
            var empty = jQuery2.isEmptyObject(prop), optall = jQuery2.speed(speed, easing, callback), doAnimation = function() {
              var anim = Animation(this, jQuery2.extend({}, prop), optall);
              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
          },
          stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
              var stop = hooks.stop;
              delete hooks.stop;
              stop(gotoEnd);
            };
            if (typeof type !== "string") {
              gotoEnd = clearQueue;
              clearQueue = type;
              type = void 0;
            }
            if (clearQueue) {
              this.queue(type || "fx", []);
            }
            return this.each(function() {
              var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery2.timers, data2 = dataPriv.get(this);
              if (index) {
                if (data2[index] && data2[index].stop) {
                  stopQueue(data2[index]);
                }
              } else {
                for (index in data2) {
                  if (data2[index] && data2[index].stop && rrun.test(index)) {
                    stopQueue(data2[index]);
                  }
                }
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                  timers[index].anim.stop(gotoEnd);
                  dequeue = false;
                  timers.splice(index, 1);
                }
              }
              if (dequeue || !gotoEnd) {
                jQuery2.dequeue(this, type);
              }
            });
          },
          finish: function(type) {
            if (type !== false) {
              type = type || "fx";
            }
            return this.each(function() {
              var index, data2 = dataPriv.get(this), queue = data2[type + "queue"], hooks = data2[type + "queueHooks"], timers = jQuery2.timers, length = queue ? queue.length : 0;
              data2.finish = true;
              jQuery2.queue(this, type, []);
              if (hooks && hooks.stop) {
                hooks.stop.call(this, true);
              }
              for (index = timers.length; index--; ) {
                if (timers[index].elem === this && timers[index].queue === type) {
                  timers[index].anim.stop(true);
                  timers.splice(index, 1);
                }
              }
              for (index = 0; index < length; index++) {
                if (queue[index] && queue[index].finish) {
                  queue[index].finish.call(this);
                }
              }
              delete data2.finish;
            });
          }
        });
        jQuery2.each(["toggle", "show", "hide"], function(_i, name) {
          var cssFn = jQuery2.fn[name];
          jQuery2.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
          };
        });
        jQuery2.each({
          slideDown: genFx("show"),
          slideUp: genFx("hide"),
          slideToggle: genFx("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" }
        }, function(name, props) {
          jQuery2.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
          };
        });
        jQuery2.timers = [];
        jQuery2.fx.tick = function() {
          var timer, i2 = 0, timers = jQuery2.timers;
          fxNow = Date.now();
          for (; i2 < timers.length; i2++) {
            timer = timers[i2];
            if (!timer() && timers[i2] === timer) {
              timers.splice(i2--, 1);
            }
          }
          if (!timers.length) {
            jQuery2.fx.stop();
          }
          fxNow = void 0;
        };
        jQuery2.fx.timer = function(timer) {
          jQuery2.timers.push(timer);
          jQuery2.fx.start();
        };
        jQuery2.fx.interval = 13;
        jQuery2.fx.start = function() {
          if (inProgress) {
            return;
          }
          inProgress = true;
          schedule();
        };
        jQuery2.fx.stop = function() {
          inProgress = null;
        };
        jQuery2.fx.speeds = {
          slow: 600,
          fast: 200,
          // Default speed
          _default: 400
        };
        jQuery2.fn.delay = function(time2, type) {
          time2 = jQuery2.fx ? jQuery2.fx.speeds[time2] || time2 : time2;
          type = type || "fx";
          return this.queue(type, function(next, hooks) {
            var timeout = window2.setTimeout(next, time2);
            hooks.stop = function() {
              window2.clearTimeout(timeout);
            };
          });
        };
        (function() {
          var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
          input.type = "checkbox";
          support.checkOn = input.value !== "";
          support.optSelected = opt.selected;
          input = document2.createElement("input");
          input.value = "t";
          input.type = "radio";
          support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery2.expr.attrHandle;
        jQuery2.fn.extend({
          attr: function(name, value) {
            return access(this, jQuery2.attr, name, value, arguments.length > 1);
          },
          removeAttr: function(name) {
            return this.each(function() {
              jQuery2.removeAttr(this, name);
            });
          }
        });
        jQuery2.extend({
          attr: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (typeof elem.getAttribute === "undefined") {
              return jQuery2.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
              hooks = jQuery2.attrHooks[name.toLowerCase()] || (jQuery2.expr.match.bool.test(name) ? boolHook : void 0);
            }
            if (value !== void 0) {
              if (value === null) {
                jQuery2.removeAttr(elem, name);
                return;
              }
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              elem.setAttribute(name, value + "");
              return value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            ret = jQuery2.find.attr(elem, name);
            return ret == null ? void 0 : ret;
          },
          attrHooks: {
            type: {
              set: function(elem, value) {
                if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                  var val = elem.value;
                  elem.setAttribute("type", value);
                  if (val) {
                    elem.value = val;
                  }
                  return value;
                }
              }
            }
          },
          removeAttr: function(elem, value) {
            var name, i2 = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && elem.nodeType === 1) {
              while (name = attrNames[i2++]) {
                elem.removeAttribute(name);
              }
            }
          }
        });
        boolHook = {
          set: function(elem, value, name) {
            if (value === false) {
              jQuery2.removeAttr(elem, name);
            } else {
              elem.setAttribute(name, name);
            }
            return name;
          }
        };
        jQuery2.each(jQuery2.expr.match.bool.source.match(/\w+/g), function(_i, name) {
          var getter = attrHandle[name] || jQuery2.find.attr;
          attrHandle[name] = function(elem, name2, isXML) {
            var ret, handle, lowercaseName = name2.toLowerCase();
            if (!isXML) {
              handle = attrHandle[lowercaseName];
              attrHandle[lowercaseName] = ret;
              ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
              attrHandle[lowercaseName] = handle;
            }
            return ret;
          };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery2.fn.extend({
          prop: function(name, value) {
            return access(this, jQuery2.prop, name, value, arguments.length > 1);
          },
          removeProp: function(name) {
            return this.each(function() {
              delete this[jQuery2.propFix[name] || name];
            });
          }
        });
        jQuery2.extend({
          prop: function(elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (nType !== 1 || !jQuery2.isXMLDoc(elem)) {
              name = jQuery2.propFix[name] || name;
              hooks = jQuery2.propHooks[name];
            }
            if (value !== void 0) {
              if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
                return ret;
              }
              return elem[name] = value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
              return ret;
            }
            return elem[name];
          },
          propHooks: {
            tabIndex: {
              get: function(elem) {
                var tabindex = jQuery2.find.attr(elem, "tabindex");
                if (tabindex) {
                  return parseInt(tabindex, 10);
                }
                if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                  return 0;
                }
                return -1;
              }
            }
          },
          propFix: {
            "for": "htmlFor",
            "class": "className"
          }
        });
        if (!support.optSelected) {
          jQuery2.propHooks.selected = {
            get: function(elem) {
              var parent = elem.parentNode;
              if (parent && parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
              return null;
            },
            set: function(elem) {
              var parent = elem.parentNode;
              if (parent) {
                parent.selectedIndex;
                if (parent.parentNode) {
                  parent.parentNode.selectedIndex;
                }
              }
            }
          };
        }
        jQuery2.each([
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable"
        ], function() {
          jQuery2.propFix[this.toLowerCase()] = this;
        });
        function stripAndCollapse(value) {
          var tokens = value.match(rnothtmlwhite) || [];
          return tokens.join(" ");
        }
        function getClass(elem) {
          return elem.getAttribute && elem.getAttribute("class") || "";
        }
        function classesToArray(value) {
          if (Array.isArray(value)) {
            return value;
          }
          if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
          }
          return [];
        }
        jQuery2.fn.extend({
          addClass: function(value) {
            var classNames, cur, curValue, className, i2, finalValue;
            if (isFunction(value)) {
              return this.each(function(j2) {
                jQuery2(this).addClass(value.call(this, j2, getClass(this)));
              });
            }
            classNames = classesToArray(value);
            if (classNames.length) {
              return this.each(function() {
                curValue = getClass(this);
                cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  for (i2 = 0; i2 < classNames.length; i2++) {
                    className = classNames[i2];
                    if (cur.indexOf(" " + className + " ") < 0) {
                      cur += className + " ";
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    this.setAttribute("class", finalValue);
                  }
                }
              });
            }
            return this;
          },
          removeClass: function(value) {
            var classNames, cur, curValue, className, i2, finalValue;
            if (isFunction(value)) {
              return this.each(function(j2) {
                jQuery2(this).removeClass(value.call(this, j2, getClass(this)));
              });
            }
            if (!arguments.length) {
              return this.attr("class", "");
            }
            classNames = classesToArray(value);
            if (classNames.length) {
              return this.each(function() {
                curValue = getClass(this);
                cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  for (i2 = 0; i2 < classNames.length; i2++) {
                    className = classNames[i2];
                    while (cur.indexOf(" " + className + " ") > -1) {
                      cur = cur.replace(" " + className + " ", " ");
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    this.setAttribute("class", finalValue);
                  }
                }
              });
            }
            return this;
          },
          toggleClass: function(value, stateVal) {
            var classNames, className, i2, self2, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
            if (isFunction(value)) {
              return this.each(function(i3) {
                jQuery2(this).toggleClass(
                  value.call(this, i3, getClass(this), stateVal),
                  stateVal
                );
              });
            }
            if (typeof stateVal === "boolean" && isValidValue) {
              return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            classNames = classesToArray(value);
            return this.each(function() {
              if (isValidValue) {
                self2 = jQuery2(this);
                for (i2 = 0; i2 < classNames.length; i2++) {
                  className = classNames[i2];
                  if (self2.hasClass(className)) {
                    self2.removeClass(className);
                  } else {
                    self2.addClass(className);
                  }
                }
              } else if (value === void 0 || type === "boolean") {
                className = getClass(this);
                if (className) {
                  dataPriv.set(this, "__className__", className);
                }
                if (this.setAttribute) {
                  this.setAttribute(
                    "class",
                    className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                  );
                }
              }
            });
          },
          hasClass: function(selector) {
            var className, elem, i2 = 0;
            className = " " + selector + " ";
            while (elem = this[i2++]) {
              if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                return true;
              }
            }
            return false;
          }
        });
        var rreturn = /\r/g;
        jQuery2.fn.extend({
          val: function(value) {
            var hooks, ret, valueIsFunction, elem = this[0];
            if (!arguments.length) {
              if (elem) {
                hooks = jQuery2.valHooks[elem.type] || jQuery2.valHooks[elem.nodeName.toLowerCase()];
                if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                  return ret;
                }
                ret = elem.value;
                if (typeof ret === "string") {
                  return ret.replace(rreturn, "");
                }
                return ret == null ? "" : ret;
              }
              return;
            }
            valueIsFunction = isFunction(value);
            return this.each(function(i2) {
              var val;
              if (this.nodeType !== 1) {
                return;
              }
              if (valueIsFunction) {
                val = value.call(this, i2, jQuery2(this).val());
              } else {
                val = value;
              }
              if (val == null) {
                val = "";
              } else if (typeof val === "number") {
                val += "";
              } else if (Array.isArray(val)) {
                val = jQuery2.map(val, function(value2) {
                  return value2 == null ? "" : value2 + "";
                });
              }
              hooks = jQuery2.valHooks[this.type] || jQuery2.valHooks[this.nodeName.toLowerCase()];
              if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
                this.value = val;
              }
            });
          }
        });
        jQuery2.extend({
          valHooks: {
            option: {
              get: function(elem) {
                var val = jQuery2.find.attr(elem, "value");
                return val != null ? val : (
                  // Support: IE <=10 - 11 only
                  // option.text throws exceptions (trac-14686, trac-14858)
                  // Strip and collapse whitespace
                  // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                  stripAndCollapse(jQuery2.text(elem))
                );
              }
            },
            select: {
              get: function(elem) {
                var value, option, i2, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                if (index < 0) {
                  i2 = max;
                } else {
                  i2 = one ? index : 0;
                }
                for (; i2 < max; i2++) {
                  option = options[i2];
                  if ((option.selected || i2 === index) && // Don't return options that are disabled or in a disabled optgroup
                  !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                    value = jQuery2(option).val();
                    if (one) {
                      return value;
                    }
                    values.push(value);
                  }
                }
                return values;
              },
              set: function(elem, value) {
                var optionSet, option, options = elem.options, values = jQuery2.makeArray(value), i2 = options.length;
                while (i2--) {
                  option = options[i2];
                  if (option.selected = jQuery2.inArray(jQuery2.valHooks.option.get(option), values) > -1) {
                    optionSet = true;
                  }
                }
                if (!optionSet) {
                  elem.selectedIndex = -1;
                }
                return values;
              }
            }
          }
        });
        jQuery2.each(["radio", "checkbox"], function() {
          jQuery2.valHooks[this] = {
            set: function(elem, value) {
              if (Array.isArray(value)) {
                return elem.checked = jQuery2.inArray(jQuery2(elem).val(), value) > -1;
              }
            }
          };
          if (!support.checkOn) {
            jQuery2.valHooks[this].get = function(elem) {
              return elem.getAttribute("value") === null ? "on" : elem.value;
            };
          }
        });
        var location2 = window2.location;
        var nonce = { guid: Date.now() };
        var rquery = /\?/;
        jQuery2.parseXML = function(data2) {
          var xml, parserErrorElem;
          if (!data2 || typeof data2 !== "string") {
            return null;
          }
          try {
            xml = new window2.DOMParser().parseFromString(data2, "text/xml");
          } catch (e) {
          }
          parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
          if (!xml || parserErrorElem) {
            jQuery2.error("Invalid XML: " + (parserErrorElem ? jQuery2.map(parserErrorElem.childNodes, function(el) {
              return el.textContent;
            }).join("\n") : data2));
          }
          return xml;
        };
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
          e.stopPropagation();
        };
        jQuery2.extend(jQuery2.event, {
          trigger: function(event, data2, elem, onlyHandlers) {
            var i2, cur, tmp2, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = lastElement = tmp2 = elem = elem || document2;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
              return;
            }
            if (rfocusMorph.test(type + jQuery2.event.triggered)) {
              return;
            }
            if (type.indexOf(".") > -1) {
              namespaces = type.split(".");
              type = namespaces.shift();
              namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery2.expando] ? event : new jQuery2.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = void 0;
            if (!event.target) {
              event.target = elem;
            }
            data2 = data2 == null ? [event] : jQuery2.makeArray(data2, [event]);
            special = jQuery2.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data2) === false) {
              return;
            }
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
              bubbleType = special.delegateType || type;
              if (!rfocusMorph.test(bubbleType + type)) {
                cur = cur.parentNode;
              }
              for (; cur; cur = cur.parentNode) {
                eventPath.push(cur);
                tmp2 = cur;
              }
              if (tmp2 === (elem.ownerDocument || document2)) {
                eventPath.push(tmp2.defaultView || tmp2.parentWindow || window2);
              }
            }
            i2 = 0;
            while ((cur = eventPath[i2++]) && !event.isPropagationStopped()) {
              lastElement = cur;
              event.type = i2 > 1 ? bubbleType : special.bindType || type;
              handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
              if (handle) {
                handle.apply(cur, data2);
              }
              handle = ontype && cur[ontype];
              if (handle && handle.apply && acceptData(cur)) {
                event.result = handle.apply(cur, data2);
                if (event.result === false) {
                  event.preventDefault();
                }
              }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
              if ((!special._default || special._default.apply(eventPath.pop(), data2) === false) && acceptData(elem)) {
                if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                  tmp2 = elem[ontype];
                  if (tmp2) {
                    elem[ontype] = null;
                  }
                  jQuery2.event.triggered = type;
                  if (event.isPropagationStopped()) {
                    lastElement.addEventListener(type, stopPropagationCallback);
                  }
                  elem[type]();
                  if (event.isPropagationStopped()) {
                    lastElement.removeEventListener(type, stopPropagationCallback);
                  }
                  jQuery2.event.triggered = void 0;
                  if (tmp2) {
                    elem[ontype] = tmp2;
                  }
                }
              }
            }
            return event.result;
          },
          // Piggyback on a donor event to simulate a different one
          // Used only for `focus(in | out)` events
          simulate: function(type, elem, event) {
            var e = jQuery2.extend(
              new jQuery2.Event(),
              event,
              {
                type,
                isSimulated: true
              }
            );
            jQuery2.event.trigger(e, null, elem);
          }
        });
        jQuery2.fn.extend({
          trigger: function(type, data2) {
            return this.each(function() {
              jQuery2.event.trigger(type, data2, this);
            });
          },
          triggerHandler: function(type, data2) {
            var elem = this[0];
            if (elem) {
              return jQuery2.event.trigger(type, data2, elem, true);
            }
          }
        });
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj2, traditional, add) {
          var name;
          if (Array.isArray(obj2)) {
            jQuery2.each(obj2, function(i2, v) {
              if (traditional || rbracket.test(prefix)) {
                add(prefix, v);
              } else {
                buildParams(
                  prefix + "[" + (typeof v === "object" && v != null ? i2 : "") + "]",
                  v,
                  traditional,
                  add
                );
              }
            });
          } else if (!traditional && toType(obj2) === "object") {
            for (name in obj2) {
              buildParams(prefix + "[" + name + "]", obj2[name], traditional, add);
            }
          } else {
            add(prefix, obj2);
          }
        }
        jQuery2.param = function(a, traditional) {
          var prefix, s = [], add = function(key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
          };
          if (a == null) {
            return "";
          }
          if (Array.isArray(a) || a.jquery && !jQuery2.isPlainObject(a)) {
            jQuery2.each(a, function() {
              add(this.name, this.value);
            });
          } else {
            for (prefix in a) {
              buildParams(prefix, a[prefix], traditional, add);
            }
          }
          return s.join("&");
        };
        jQuery2.fn.extend({
          serialize: function() {
            return jQuery2.param(this.serializeArray());
          },
          serializeArray: function() {
            return this.map(function() {
              var elements = jQuery2.prop(this, "elements");
              return elements ? jQuery2.makeArray(elements) : this;
            }).filter(function() {
              var type = this.type;
              return this.name && !jQuery2(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(_i, elem) {
              var val = jQuery2(this).val();
              if (val == null) {
                return null;
              }
              if (Array.isArray(val)) {
                return jQuery2.map(val, function(val2) {
                  return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
                });
              }
              return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
            }).get();
          }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
        originAnchor.href = location2.href;
        function addToPrefiltersOrTransports(structure) {
          return function(dataTypeExpression, func2) {
            if (typeof dataTypeExpression !== "string") {
              func2 = dataTypeExpression;
              dataTypeExpression = "*";
            }
            var dataType, i2 = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func2)) {
              while (dataType = dataTypes[i2++]) {
                if (dataType[0] === "+") {
                  dataType = dataType.slice(1) || "*";
                  (structure[dataType] = structure[dataType] || []).unshift(func2);
                } else {
                  (structure[dataType] = structure[dataType] || []).push(func2);
                }
              }
            }
          };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
          var inspected = {}, seekingTransport = structure === transports;
          function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery2.each(structure[dataType] || [], function(_, prefilterOrFactory) {
              var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
              if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                options.dataTypes.unshift(dataTypeOrTransport);
                inspect(dataTypeOrTransport);
                return false;
              } else if (seekingTransport) {
                return !(selected = dataTypeOrTransport);
              }
            });
            return selected;
          }
          return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
          var key, deep, flatOptions = jQuery2.ajaxSettings.flatOptions || {};
          for (key in src) {
            if (src[key] !== void 0) {
              (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
            }
          }
          if (deep) {
            jQuery2.extend(true, target, deep);
          }
          return target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
          var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
          while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === void 0) {
              ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
          }
          if (ct) {
            for (type in contents) {
              if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
              }
            }
          }
          if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
          } else {
            for (type in responses) {
              if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                finalDataType = type;
                break;
              }
              if (!firstDataType) {
                firstDataType = type;
              }
            }
            finalDataType = finalDataType || firstDataType;
          }
          if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
              dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
          }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
          var conv2, current, conv, tmp2, prev, converters = {}, dataTypes = s.dataTypes.slice();
          if (dataTypes[1]) {
            for (conv in s.converters) {
              converters[conv.toLowerCase()] = s.converters[conv];
            }
          }
          current = dataTypes.shift();
          while (current) {
            if (s.responseFields[current]) {
              jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
              response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
              if (current === "*") {
                current = prev;
              } else if (prev !== "*" && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv) {
                  for (conv2 in converters) {
                    tmp2 = conv2.split(" ");
                    if (tmp2[1] === current) {
                      conv = converters[prev + " " + tmp2[0]] || converters["* " + tmp2[0]];
                      if (conv) {
                        if (conv === true) {
                          conv = converters[conv2];
                        } else if (converters[conv2] !== true) {
                          current = tmp2[0];
                          dataTypes.unshift(tmp2[1]);
                        }
                        break;
                      }
                    }
                  }
                }
                if (conv !== true) {
                  if (conv && s.throws) {
                    response = conv(response);
                  } else {
                    try {
                      response = conv(response);
                    } catch (e) {
                      return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                      };
                    }
                  }
                }
              }
            }
          }
          return { state: "success", data: response };
        }
        jQuery2.extend({
          // Counter for holding the number of active queries
          active: 0,
          // Last-Modified header cache for next request
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: location2.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location2.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */
            accepts: {
              "*": allTypes,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
            },
            contents: {
              xml: /\bxml\b/,
              html: /\bhtml/,
              json: /\bjson\b/
            },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
            },
            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {
              // Convert anything to text
              "* text": String,
              // Text to html (true = no transformation)
              "text html": true,
              // Evaluate text as a json expression
              "text json": JSON.parse,
              // Parse text as xml
              "text xml": jQuery2.parseXML
            },
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
              url: true,
              context: true
            }
          },
          // Creates a full fledged settings object into target
          // with both ajaxSettings and settings fields.
          // If target is omitted, writes into ajaxSettings.
          ajaxSetup: function(target, settings2) {
            return settings2 ? (
              // Building a settings object
              ajaxExtend(ajaxExtend(target, jQuery2.ajaxSettings), settings2)
            ) : (
              // Extending ajaxSettings
              ajaxExtend(jQuery2.ajaxSettings, target)
            );
          },
          ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
          ajaxTransport: addToPrefiltersOrTransports(transports),
          // Main method
          ajax: function(url, options) {
            if (typeof url === "object") {
              options = url;
              url = void 0;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i2, uncached, s = jQuery2.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery2(callbackContext) : jQuery2.event, deferred = jQuery2.Deferred(), completeDeferred = jQuery2.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
              readyState: 0,
              // Builds headers hashtable if needed
              getResponseHeader: function(key) {
                var match;
                if (completed2) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while (match = rheaders.exec(responseHeadersString)) {
                      responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                    }
                  }
                  match = responseHeaders[key.toLowerCase() + " "];
                }
                return match == null ? null : match.join(", ");
              },
              // Raw string
              getAllResponseHeaders: function() {
                return completed2 ? responseHeadersString : null;
              },
              // Caches the header
              setRequestHeader: function(name, value) {
                if (completed2 == null) {
                  name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                  requestHeaders[name] = value;
                }
                return this;
              },
              // Overrides response content-type header
              overrideMimeType: function(type) {
                if (completed2 == null) {
                  s.mimeType = type;
                }
                return this;
              },
              // Status-dependent callbacks
              statusCode: function(map) {
                var code;
                if (map) {
                  if (completed2) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      statusCode[code] = [statusCode[code], map[code]];
                    }
                  }
                }
                return this;
              },
              // Cancel the request
              abort: function(statusText2) {
                var finalText = statusText2 || strAbort;
                if (transport) {
                  transport.abort(finalText);
                }
                done(0, finalText);
                return this;
              }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
              urlAnchor = document2.createElement("a");
              try {
                urlAnchor.href = s.url;
                urlAnchor.href = urlAnchor.href;
                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
              } catch (e) {
                s.crossDomain = true;
              }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
              s.data = jQuery2.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed2) {
              return jqXHR;
            }
            fireGlobals = jQuery2.event && s.global;
            if (fireGlobals && jQuery2.active++ === 0) {
              jQuery2.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
              uncached = s.url.slice(cacheURL.length);
              if (s.data && (s.processData || typeof s.data === "string")) {
                cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                delete s.data;
              }
              if (s.cache === false) {
                cacheURL = cacheURL.replace(rantiCache, "$1");
                uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
              }
              s.url = cacheURL + uncached;
            } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
              s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
              if (jQuery2.lastModified[cacheURL]) {
                jqXHR.setRequestHeader("If-Modified-Since", jQuery2.lastModified[cacheURL]);
              }
              if (jQuery2.etag[cacheURL]) {
                jqXHR.setRequestHeader("If-None-Match", jQuery2.etag[cacheURL]);
              }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
              jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader(
              "Accept",
              s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
            );
            for (i2 in s.headers) {
              jqXHR.setRequestHeader(i2, s.headers[i2]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
              return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
              done(-1, "No Transport");
            } else {
              jqXHR.readyState = 1;
              if (fireGlobals) {
                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
              }
              if (completed2) {
                return jqXHR;
              }
              if (s.async && s.timeout > 0) {
                timeoutTimer = window2.setTimeout(function() {
                  jqXHR.abort("timeout");
                }, s.timeout);
              }
              try {
                completed2 = false;
                transport.send(requestHeaders, done);
              } catch (e) {
                if (completed2) {
                  throw e;
                }
                done(-1, e);
              }
            }
            function done(status2, nativeStatusText, responses, headers) {
              var isSuccess, success, error, response, modified, statusText2 = nativeStatusText;
              if (completed2) {
                return;
              }
              completed2 = true;
              if (timeoutTimer) {
                window2.clearTimeout(timeoutTimer);
              }
              transport = void 0;
              responseHeadersString = headers || "";
              jqXHR.readyState = status2 > 0 ? 4 : 0;
              isSuccess = status2 >= 200 && status2 < 300 || status2 === 304;
              if (responses) {
                response = ajaxHandleResponses(s, jqXHR, responses);
              }
              if (!isSuccess && jQuery2.inArray("script", s.dataTypes) > -1 && jQuery2.inArray("json", s.dataTypes) < 0) {
                s.converters["text script"] = function() {
                };
              }
              response = ajaxConvert(s, response, jqXHR, isSuccess);
              if (isSuccess) {
                if (s.ifModified) {
                  modified = jqXHR.getResponseHeader("Last-Modified");
                  if (modified) {
                    jQuery2.lastModified[cacheURL] = modified;
                  }
                  modified = jqXHR.getResponseHeader("etag");
                  if (modified) {
                    jQuery2.etag[cacheURL] = modified;
                  }
                }
                if (status2 === 204 || s.type === "HEAD") {
                  statusText2 = "nocontent";
                } else if (status2 === 304) {
                  statusText2 = "notmodified";
                } else {
                  statusText2 = response.state;
                  success = response.data;
                  error = response.error;
                  isSuccess = !error;
                }
              } else {
                error = statusText2;
                if (status2 || !statusText2) {
                  statusText2 = "error";
                  if (status2 < 0) {
                    status2 = 0;
                  }
                }
              }
              jqXHR.status = status2;
              jqXHR.statusText = (nativeStatusText || statusText2) + "";
              if (isSuccess) {
                deferred.resolveWith(callbackContext, [success, statusText2, jqXHR]);
              } else {
                deferred.rejectWith(callbackContext, [jqXHR, statusText2, error]);
              }
              jqXHR.statusCode(statusCode);
              statusCode = void 0;
              if (fireGlobals) {
                globalEventContext.trigger(
                  isSuccess ? "ajaxSuccess" : "ajaxError",
                  [jqXHR, s, isSuccess ? success : error]
                );
              }
              completeDeferred.fireWith(callbackContext, [jqXHR, statusText2]);
              if (fireGlobals) {
                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                if (!--jQuery2.active) {
                  jQuery2.event.trigger("ajaxStop");
                }
              }
            }
            return jqXHR;
          },
          getJSON: function(url, data2, callback) {
            return jQuery2.get(url, data2, callback, "json");
          },
          getScript: function(url, callback) {
            return jQuery2.get(url, void 0, callback, "script");
          }
        });
        jQuery2.each(["get", "post"], function(_i, method) {
          jQuery2[method] = function(url, data2, callback, type) {
            if (isFunction(data2)) {
              type = type || callback;
              callback = data2;
              data2 = void 0;
            }
            return jQuery2.ajax(jQuery2.extend({
              url,
              type: method,
              dataType: type,
              data: data2,
              success: callback
            }, jQuery2.isPlainObject(url) && url));
          };
        });
        jQuery2.ajaxPrefilter(function(s) {
          var i2;
          for (i2 in s.headers) {
            if (i2.toLowerCase() === "content-type") {
              s.contentType = s.headers[i2] || "";
            }
          }
        });
        jQuery2._evalUrl = function(url, options, doc) {
          return jQuery2.ajax({
            url,
            // Make this explicit, since user can override this through ajaxSetup (trac-11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            // Only evaluate the response if it is successful (gh-4126)
            // dataFilter is not invoked for failure responses, so using it instead
            // of the default converter is kludgy but it works.
            converters: {
              "text script": function() {
              }
            },
            dataFilter: function(response) {
              jQuery2.globalEval(response, options, doc);
            }
          });
        };
        jQuery2.fn.extend({
          wrapAll: function(html) {
            var wrap;
            if (this[0]) {
              if (isFunction(html)) {
                html = html.call(this[0]);
              }
              wrap = jQuery2(html, this[0].ownerDocument).eq(0).clone(true);
              if (this[0].parentNode) {
                wrap.insertBefore(this[0]);
              }
              wrap.map(function() {
                var elem = this;
                while (elem.firstElementChild) {
                  elem = elem.firstElementChild;
                }
                return elem;
              }).append(this);
            }
            return this;
          },
          wrapInner: function(html) {
            if (isFunction(html)) {
              return this.each(function(i2) {
                jQuery2(this).wrapInner(html.call(this, i2));
              });
            }
            return this.each(function() {
              var self2 = jQuery2(this), contents = self2.contents();
              if (contents.length) {
                contents.wrapAll(html);
              } else {
                self2.append(html);
              }
            });
          },
          wrap: function(html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function(i2) {
              jQuery2(this).wrapAll(htmlIsFunction ? html.call(this, i2) : html);
            });
          },
          unwrap: function(selector) {
            this.parent(selector).not("body").each(function() {
              jQuery2(this).replaceWith(this.childNodes);
            });
            return this;
          }
        });
        jQuery2.expr.pseudos.hidden = function(elem) {
          return !jQuery2.expr.pseudos.visible(elem);
        };
        jQuery2.expr.pseudos.visible = function(elem) {
          return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery2.ajaxSettings.xhr = function() {
          try {
            return new window2.XMLHttpRequest();
          } catch (e) {
          }
        };
        var xhrSuccessStatus = {
          // File protocol always yields status code 0, assume 200
          0: 200,
          // Support: IE <=9 only
          // trac-1450: sometimes IE returns 1223 when it should be 204
          1223: 204
        }, xhrSupported = jQuery2.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery2.ajaxTransport(function(options) {
          var callback, errorCallback;
          if (support.cors || xhrSupported && !options.crossDomain) {
            return {
              send: function(headers, complete) {
                var i2, xhr = options.xhr();
                xhr.open(
                  options.type,
                  options.url,
                  options.async,
                  options.username,
                  options.password
                );
                if (options.xhrFields) {
                  for (i2 in options.xhrFields) {
                    xhr[i2] = options.xhrFields[i2];
                  }
                }
                if (options.mimeType && xhr.overrideMimeType) {
                  xhr.overrideMimeType(options.mimeType);
                }
                if (!options.crossDomain && !headers["X-Requested-With"]) {
                  headers["X-Requested-With"] = "XMLHttpRequest";
                }
                for (i2 in headers) {
                  xhr.setRequestHeader(i2, headers[i2]);
                }
                callback = function(type) {
                  return function() {
                    if (callback) {
                      callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                      if (type === "abort") {
                        xhr.abort();
                      } else if (type === "error") {
                        if (typeof xhr.status !== "number") {
                          complete(0, "error");
                        } else {
                          complete(
                            // File: protocol always yields status 0; see trac-8605, trac-14207
                            xhr.status,
                            xhr.statusText
                          );
                        }
                      } else {
                        complete(
                          xhrSuccessStatus[xhr.status] || xhr.status,
                          xhr.statusText,
                          // Support: IE <=9 only
                          // IE9 has no XHR2 but throws on binary (trac-11426)
                          // For XHR2 non-text, let the caller handle it (gh-2498)
                          (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                          xhr.getAllResponseHeaders()
                        );
                      }
                    }
                  };
                };
                xhr.onload = callback();
                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                if (xhr.onabort !== void 0) {
                  xhr.onabort = errorCallback;
                } else {
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                      window2.setTimeout(function() {
                        if (callback) {
                          errorCallback();
                        }
                      });
                    }
                  };
                }
                callback = callback("abort");
                try {
                  xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                  if (callback) {
                    throw e;
                  }
                }
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        jQuery2.ajaxPrefilter(function(s) {
          if (s.crossDomain) {
            s.contents.script = false;
          }
        });
        jQuery2.ajaxSetup({
          accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
            script: /\b(?:java|ecma)script\b/
          },
          converters: {
            "text script": function(text) {
              jQuery2.globalEval(text);
              return text;
            }
          }
        });
        jQuery2.ajaxPrefilter("script", function(s) {
          if (s.cache === void 0) {
            s.cache = false;
          }
          if (s.crossDomain) {
            s.type = "GET";
          }
        });
        jQuery2.ajaxTransport("script", function(s) {
          if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
              send: function(_, complete) {
                script = jQuery2("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                  script.remove();
                  callback = null;
                  if (evt) {
                    complete(evt.type === "error" ? 404 : 200, evt.type);
                  }
                });
                document2.head.appendChild(script[0]);
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery2.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery2.expando + "_" + nonce.guid++;
            this[callback] = true;
            return callback;
          }
        });
        jQuery2.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
          var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
          if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
              s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
              s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
              if (!responseContainer) {
                jQuery2.error(callbackName + " was not called");
              }
              return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window2[callbackName];
            window2[callbackName] = function() {
              responseContainer = arguments;
            };
            jqXHR.always(function() {
              if (overwritten === void 0) {
                jQuery2(window2).removeProp(callbackName);
              } else {
                window2[callbackName] = overwritten;
              }
              if (s[callbackName]) {
                s.jsonpCallback = originalSettings.jsonpCallback;
                oldCallbacks.push(callbackName);
              }
              if (responseContainer && isFunction(overwritten)) {
                overwritten(responseContainer[0]);
              }
              responseContainer = overwritten = void 0;
            });
            return "script";
          }
        });
        support.createHTMLDocument = (function() {
          var body = document2.implementation.createHTMLDocument("").body;
          body.innerHTML = "<form></form><form></form>";
          return body.childNodes.length === 2;
        })();
        jQuery2.parseHTML = function(data2, context, keepScripts) {
          if (typeof data2 !== "string") {
            return [];
          }
          if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
          }
          var base, parsed, scripts;
          if (!context) {
            if (support.createHTMLDocument) {
              context = document2.implementation.createHTMLDocument("");
              base = context.createElement("base");
              base.href = document2.location.href;
              context.head.appendChild(base);
            } else {
              context = document2;
            }
          }
          parsed = rsingleTag.exec(data2);
          scripts = !keepScripts && [];
          if (parsed) {
            return [context.createElement(parsed[1])];
          }
          parsed = buildFragment([data2], context, scripts);
          if (scripts && scripts.length) {
            jQuery2(scripts).remove();
          }
          return jQuery2.merge([], parsed.childNodes);
        };
        jQuery2.fn.load = function(url, params, callback) {
          var selector, type, response, self2 = this, off = url.indexOf(" ");
          if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
          }
          if (isFunction(params)) {
            callback = params;
            params = void 0;
          } else if (params && typeof params === "object") {
            type = "POST";
          }
          if (self2.length > 0) {
            jQuery2.ajax({
              url,
              // If "type" variable is undefined, then "GET" method will be used.
              // Make value of this field explicit since
              // user can override it through ajaxSetup method
              type: type || "GET",
              dataType: "html",
              data: params
            }).done(function(responseText) {
              response = arguments;
              self2.html(selector ? (
                // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery2("<div>").append(jQuery2.parseHTML(responseText)).find(selector)
              ) : (
                // Otherwise use the full result
                responseText
              ));
            }).always(callback && function(jqXHR, status2) {
              self2.each(function() {
                callback.apply(this, response || [jqXHR.responseText, status2, jqXHR]);
              });
            });
          }
          return this;
        };
        jQuery2.expr.pseudos.animated = function(elem) {
          return jQuery2.grep(jQuery2.timers, function(fn) {
            return elem === fn.elem;
          }).length;
        };
        jQuery2.offset = {
          setOffset: function(elem, options, i2) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery2.css(elem, "position"), curElem = jQuery2(elem), props = {};
            if (position === "static") {
              elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery2.css(elem, "top");
            curCSSLeft = jQuery2.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
              curPosition = curElem.position();
              curTop = curPosition.top;
              curLeft = curPosition.left;
            } else {
              curTop = parseFloat(curCSSTop) || 0;
              curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
              options = options.call(elem, i2, jQuery2.extend({}, curOffset));
            }
            if (options.top != null) {
              props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
              props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
              options.using.call(elem, props);
            } else {
              curElem.css(props);
            }
          }
        };
        jQuery2.fn.extend({
          // offset() relates an element's border box to the document origin
          offset: function(options) {
            if (arguments.length) {
              return options === void 0 ? this : this.each(function(i2) {
                jQuery2.offset.setOffset(this, options, i2);
              });
            }
            var rect, win, elem = this[0];
            if (!elem) {
              return;
            }
            if (!elem.getClientRects().length) {
              return { top: 0, left: 0 };
            }
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            };
          },
          // position() relates an element's margin box to its offset parent's padding box
          // This corresponds to the behavior of CSS absolute positioning
          position: function() {
            if (!this[0]) {
              return;
            }
            var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
            if (jQuery2.css(elem, "position") === "fixed") {
              offset = elem.getBoundingClientRect();
            } else {
              offset = this.offset();
              doc = elem.ownerDocument;
              offsetParent = elem.offsetParent || doc.documentElement;
              while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery2.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.parentNode;
              }
              if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                parentOffset = jQuery2(offsetParent).offset();
                parentOffset.top += jQuery2.css(offsetParent, "borderTopWidth", true);
                parentOffset.left += jQuery2.css(offsetParent, "borderLeftWidth", true);
              }
            }
            return {
              top: offset.top - parentOffset.top - jQuery2.css(elem, "marginTop", true),
              left: offset.left - parentOffset.left - jQuery2.css(elem, "marginLeft", true)
            };
          },
          // This method will return documentElement in the following cases:
          // 1) For the element inside the iframe without offsetParent, this method will return
          //    documentElement of the parent window
          // 2) For the hidden or detached element
          // 3) For body or html element, i.e. in case of the html node - it will return itself
          //
          // but those exceptions were never presented as a real life use-cases
          // and might be considered as more preferable results.
          //
          // This logic, however, is not guaranteed and can change at any point in the future
          offsetParent: function() {
            return this.map(function() {
              var offsetParent = this.offsetParent;
              while (offsetParent && jQuery2.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.offsetParent;
              }
              return offsetParent || documentElement;
            });
          }
        });
        jQuery2.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
          var top = "pageYOffset" === prop;
          jQuery2.fn[method] = function(val) {
            return access(this, function(elem, method2, val2) {
              var win;
              if (isWindow(elem)) {
                win = elem;
              } else if (elem.nodeType === 9) {
                win = elem.defaultView;
              }
              if (val2 === void 0) {
                return win ? win[prop] : elem[method2];
              }
              if (win) {
                win.scrollTo(
                  !top ? val2 : win.pageXOffset,
                  top ? val2 : win.pageYOffset
                );
              } else {
                elem[method2] = val2;
              }
            }, method, val, arguments.length);
          };
        });
        jQuery2.each(["top", "left"], function(_i, prop) {
          jQuery2.cssHooks[prop] = addGetHookIf(
            support.pixelPosition,
            function(elem, computed) {
              if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery2(elem).position()[prop] + "px" : computed;
              }
            }
          );
        });
        jQuery2.each({ Height: "height", Width: "width" }, function(name, type) {
          jQuery2.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
          }, function(defaultExtra, funcName) {
            jQuery2.fn[funcName] = function(margin, value) {
              var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
              return access(this, function(elem, type2, value2) {
                var doc;
                if (isWindow(elem)) {
                  return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
                }
                if (elem.nodeType === 9) {
                  doc = elem.documentElement;
                  return Math.max(
                    elem.body["scroll" + name],
                    doc["scroll" + name],
                    elem.body["offset" + name],
                    doc["offset" + name],
                    doc["client" + name]
                  );
                }
                return value2 === void 0 ? (
                  // Get width or height on the element, requesting but not forcing parseFloat
                  jQuery2.css(elem, type2, extra)
                ) : (
                  // Set width or height on the element
                  jQuery2.style(elem, type2, value2, extra)
                );
              }, type, chainable ? margin : void 0, chainable);
            };
          });
        });
        jQuery2.each([
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend"
        ], function(_i, type) {
          jQuery2.fn[type] = function(fn) {
            return this.on(type, fn);
          };
        });
        jQuery2.fn.extend({
          bind: function(types, data2, fn) {
            return this.on(types, null, data2, fn);
          },
          unbind: function(types, fn) {
            return this.off(types, null, fn);
          },
          delegate: function(selector, types, data2, fn) {
            return this.on(types, selector, data2, fn);
          },
          undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
          },
          hover: function(fnOver, fnOut) {
            return this.on("mouseenter", fnOver).on("mouseleave", fnOut || fnOver);
          }
        });
        jQuery2.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
          function(_i, name) {
            jQuery2.fn[name] = function(data2, fn) {
              return arguments.length > 0 ? this.on(name, null, data2, fn) : this.trigger(name);
            };
          }
        );
        var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        jQuery2.proxy = function(fn, context) {
          var tmp2, args, proxy;
          if (typeof context === "string") {
            tmp2 = fn[context];
            context = fn;
            fn = tmp2;
          }
          if (!isFunction(fn)) {
            return void 0;
          }
          args = slice.call(arguments, 2);
          proxy = function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
          };
          proxy.guid = fn.guid = fn.guid || jQuery2.guid++;
          return proxy;
        };
        jQuery2.holdReady = function(hold) {
          if (hold) {
            jQuery2.readyWait++;
          } else {
            jQuery2.ready(true);
          }
        };
        jQuery2.isArray = Array.isArray;
        jQuery2.parseJSON = JSON.parse;
        jQuery2.nodeName = nodeName;
        jQuery2.isFunction = isFunction;
        jQuery2.isWindow = isWindow;
        jQuery2.camelCase = camelCase;
        jQuery2.type = toType;
        jQuery2.now = Date.now;
        jQuery2.isNumeric = function(obj2) {
          var type = jQuery2.type(obj2);
          return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
          // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
          // subtraction forces infinities to NaN
          !isNaN(obj2 - parseFloat(obj2));
        };
        jQuery2.trim = function(text) {
          return text == null ? "" : (text + "").replace(rtrim, "$1");
        };
        if (typeof define === "function" && define.amd) {
          define("jquery", [], function() {
            return jQuery2;
          });
        }
        var _jQuery = window2.jQuery, _$ = window2.$;
        jQuery2.noConflict = function(deep) {
          if (window2.$ === jQuery2) {
            window2.$ = _$;
          }
          if (deep && window2.jQuery === jQuery2) {
            window2.jQuery = _jQuery;
          }
          return jQuery2;
        };
        if (typeof noGlobal === "undefined") {
          window2.jQuery = window2.$ = jQuery2;
        }
        return jQuery2;
      });
    }
  });

  // node_modules/magnific-popup/dist/jquery.magnific-popup.js
  var require_jquery_magnific_popup = __commonJS({
    "node_modules/magnific-popup/dist/jquery.magnific-popup.js"(exports2) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define(["jquery"], factory);
        } else if (typeof exports2 === "object") {
          factory(require_jquery());
        } else {
          factory(window.jQuery || window.Zepto);
        }
      })(function($2) {
        var CLOSE_EVENT = "Close", BEFORE_CLOSE_EVENT = "BeforeClose", AFTER_CLOSE_EVENT = "AfterClose", BEFORE_APPEND_EVENT = "BeforeAppend", MARKUP_PARSE_EVENT = "MarkupParse", OPEN_EVENT = "Open", CHANGE_EVENT = "Change", NS = "mfp", EVENT_NS = "." + NS, READY_CLASS = "mfp-ready", REMOVING_CLASS = "mfp-removing", PREVENT_CLOSE_CLASS = "mfp-prevent-close";
        var mfp, MagnificPopup = function() {
        }, _isJQ = !!window.jQuery, _prevStatus, _window = $2(window), _document, _prevContentType, _wrapClasses, _currPopupType;
        var _mfpOn = function(name, f) {
          mfp.ev.on(NS + name + EVENT_NS, f);
        }, _getEl = function(className, appendTo, html, raw) {
          var el = document.createElement("div");
          el.className = "mfp-" + className;
          if (html) {
            el.innerHTML = html;
          }
          if (!raw) {
            el = $2(el);
            if (appendTo) {
              el.appendTo(appendTo);
            }
          } else if (appendTo) {
            appendTo.appendChild(el);
          }
          return el;
        }, _mfpTrigger = function(e, data2) {
          mfp.ev.triggerHandler(NS + e, data2);
          if (mfp.st.callbacks) {
            e = e.charAt(0).toLowerCase() + e.slice(1);
            if (mfp.st.callbacks[e]) {
              mfp.st.callbacks[e].apply(mfp, Array.isArray(data2) ? data2 : [data2]);
            }
          }
        }, _getCloseBtn = function(type) {
          if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
            mfp.currTemplate.closeBtn = $2(mfp.st.closeMarkup.replace("%title%", mfp.st.tClose));
            _currPopupType = type;
          }
          return mfp.currTemplate.closeBtn;
        }, _checkInstance = function() {
          if (!$2.magnificPopup.instance) {
            mfp = new MagnificPopup();
            mfp.init();
            $2.magnificPopup.instance = mfp;
          }
        }, supportsTransitions = function() {
          var s = document.createElement("p").style, v = ["ms", "O", "Moz", "Webkit"];
          if (s["transition"] !== void 0) {
            return true;
          }
          while (v.length) {
            if (v.pop() + "Transition" in s) {
              return true;
            }
          }
          return false;
        };
        MagnificPopup.prototype = {
          constructor: MagnificPopup,
          /**
           * Initializes Magnific Popup plugin. 
           * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
           */
          init: function() {
            var appVersion = navigator.appVersion;
            mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
            mfp.isAndroid = /android/gi.test(appVersion);
            mfp.isIOS = /iphone|ipad|ipod/gi.test(appVersion);
            mfp.supportsTransition = supportsTransitions();
            mfp.probablyMobile = mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent);
            _document = $2(document);
            mfp.popupsCache = {};
          },
          /**
           * Opens popup
           * @param  data [description]
           */
          open: function(data2) {
            var i2;
            if (data2.isObj === false) {
              mfp.items = data2.items.toArray();
              mfp.index = 0;
              var items = data2.items, item;
              for (i2 = 0; i2 < items.length; i2++) {
                item = items[i2];
                if (item.parsed) {
                  item = item.el[0];
                }
                if (item === data2.el[0]) {
                  mfp.index = i2;
                  break;
                }
              }
            } else {
              mfp.items = Array.isArray(data2.items) ? data2.items : [data2.items];
              mfp.index = data2.index || 0;
            }
            if (mfp.isOpen) {
              mfp.updateItemHTML();
              return;
            }
            mfp.types = [];
            _wrapClasses = "";
            if (data2.mainEl && data2.mainEl.length) {
              mfp.ev = data2.mainEl.eq(0);
            } else {
              mfp.ev = _document;
            }
            if (data2.key) {
              if (!mfp.popupsCache[data2.key]) {
                mfp.popupsCache[data2.key] = {};
              }
              mfp.currTemplate = mfp.popupsCache[data2.key];
            } else {
              mfp.currTemplate = {};
            }
            mfp.st = $2.extend(true, {}, $2.magnificPopup.defaults, data2);
            mfp.fixedContentPos = mfp.st.fixedContentPos === "auto" ? !mfp.probablyMobile : mfp.st.fixedContentPos;
            if (mfp.st.modal) {
              mfp.st.closeOnContentClick = false;
              mfp.st.closeOnBgClick = false;
              mfp.st.showCloseBtn = false;
              mfp.st.enableEscapeKey = false;
            }
            if (!mfp.bgOverlay) {
              mfp.bgOverlay = _getEl("bg").on("click" + EVENT_NS, function() {
                mfp.close();
              });
              mfp.wrap = _getEl("wrap").attr("tabindex", -1).on("click" + EVENT_NS, function(e) {
                if (mfp._checkIfClose(e.target)) {
                  mfp.close();
                }
              });
              mfp.container = _getEl("container", mfp.wrap);
            }
            mfp.contentContainer = _getEl("content");
            if (mfp.st.preloader) {
              mfp.preloader = _getEl("preloader", mfp.container, mfp.st.tLoading);
            }
            var modules = $2.magnificPopup.modules;
            for (i2 = 0; i2 < modules.length; i2++) {
              var n2 = modules[i2];
              n2 = n2.charAt(0).toUpperCase() + n2.slice(1);
              mfp["init" + n2].call(mfp);
            }
            _mfpTrigger("BeforeOpen");
            if (mfp.st.showCloseBtn) {
              if (!mfp.st.closeBtnInside) {
                mfp.wrap.append(_getCloseBtn());
              } else {
                _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item2) {
                  values.close_replaceWith = _getCloseBtn(item2.type);
                });
                _wrapClasses += " mfp-close-btn-in";
              }
            }
            if (mfp.st.alignTop) {
              _wrapClasses += " mfp-align-top";
            }
            if (mfp.fixedContentPos) {
              mfp.wrap.css({
                overflow: mfp.st.overflowY,
                overflowX: "hidden",
                overflowY: mfp.st.overflowY
              });
            } else {
              mfp.wrap.css({
                top: _window.scrollTop(),
                position: "absolute"
              });
            }
            if (mfp.st.fixedBgPos === false || mfp.st.fixedBgPos === "auto" && !mfp.fixedContentPos) {
              mfp.bgOverlay.css({
                height: _document.height(),
                position: "absolute"
              });
            }
            if (mfp.st.enableEscapeKey) {
              _document.on("keyup" + EVENT_NS, function(e) {
                if (e.keyCode === 27) {
                  mfp.close();
                }
              });
            }
            _window.on("resize" + EVENT_NS, function() {
              mfp.updateSize();
            });
            if (!mfp.st.closeOnContentClick) {
              _wrapClasses += " mfp-auto-cursor";
            }
            if (_wrapClasses)
              mfp.wrap.addClass(_wrapClasses);
            var windowHeight = mfp.wH = _window.height();
            var windowStyles = {};
            if (mfp.fixedContentPos) {
              if (mfp._hasScrollBar(windowHeight)) {
                var s = mfp._getScrollbarSize();
                if (s) {
                  windowStyles.marginRight = s;
                }
              }
            }
            if (mfp.fixedContentPos) {
              if (!mfp.isIE7) {
                windowStyles.overflow = "hidden";
              } else {
                $2("body, html").css("overflow", "hidden");
              }
            }
            var classesToadd = mfp.st.mainClass;
            if (mfp.isIE7) {
              classesToadd += " mfp-ie7";
            }
            if (classesToadd) {
              mfp._addClassToMFP(classesToadd);
            }
            mfp.updateItemHTML();
            _mfpTrigger("BuildControls");
            $2("html").css(windowStyles);
            mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo || $2(document.body));
            mfp._lastFocusedEl = document.activeElement;
            setTimeout(function() {
              if (mfp.content) {
                mfp._addClassToMFP(READY_CLASS);
                mfp._setFocus();
              } else {
                mfp.bgOverlay.addClass(READY_CLASS);
              }
              _document.on("focusin" + EVENT_NS, mfp._onFocusIn);
            }, 16);
            mfp.isOpen = true;
            mfp.updateSize(windowHeight);
            _mfpTrigger(OPEN_EVENT);
            return data2;
          },
          /**
           * Closes the popup
           */
          close: function() {
            if (!mfp.isOpen) return;
            _mfpTrigger(BEFORE_CLOSE_EVENT);
            mfp.isOpen = false;
            if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
              mfp._addClassToMFP(REMOVING_CLASS);
              setTimeout(function() {
                mfp._close();
              }, mfp.st.removalDelay);
            } else {
              mfp._close();
            }
          },
          /**
           * Helper for close() function
           */
          _close: function() {
            _mfpTrigger(CLOSE_EVENT);
            var classesToRemove = REMOVING_CLASS + " " + READY_CLASS + " ";
            mfp.bgOverlay.detach();
            mfp.wrap.detach();
            mfp.container.empty();
            if (mfp.st.mainClass) {
              classesToRemove += mfp.st.mainClass + " ";
            }
            mfp._removeClassFromMFP(classesToRemove);
            if (mfp.fixedContentPos) {
              var windowStyles = { marginRight: "" };
              if (mfp.isIE7) {
                $2("body, html").css("overflow", "");
              } else {
                windowStyles.overflow = "";
              }
              $2("html").css(windowStyles);
            }
            _document.off("keyup" + EVENT_NS + " focusin" + EVENT_NS);
            mfp.ev.off(EVENT_NS);
            mfp.wrap.attr("class", "mfp-wrap").removeAttr("style");
            mfp.bgOverlay.attr("class", "mfp-bg");
            mfp.container.attr("class", "mfp-container");
            if (mfp.st.showCloseBtn && (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
              if (mfp.currTemplate.closeBtn)
                mfp.currTemplate.closeBtn.detach();
            }
            if (mfp.st.autoFocusLast && mfp._lastFocusedEl) {
              $2(mfp._lastFocusedEl).trigger("focus");
            }
            mfp.currItem = null;
            mfp.content = null;
            mfp.currTemplate = null;
            mfp.prevHeight = 0;
            _mfpTrigger(AFTER_CLOSE_EVENT);
          },
          updateSize: function(winHeight) {
            if (mfp.isIOS) {
              var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
              var height = window.innerHeight * zoomLevel;
              mfp.wrap.css("height", height);
              mfp.wH = height;
            } else {
              mfp.wH = winHeight || _window.height();
            }
            if (!mfp.fixedContentPos) {
              mfp.wrap.css("height", mfp.wH);
            }
            _mfpTrigger("Resize");
          },
          /**
           * Set content of popup based on current index
           */
          updateItemHTML: function() {
            var item = mfp.items[mfp.index];
            mfp.contentContainer.detach();
            if (mfp.content)
              mfp.content.detach();
            if (!item.parsed) {
              item = mfp.parseEl(mfp.index);
            }
            var type = item.type;
            _mfpTrigger("BeforeChange", [mfp.currItem ? mfp.currItem.type : "", type]);
            mfp.currItem = item;
            if (!mfp.currTemplate[type]) {
              var markup = mfp.st[type] ? mfp.st[type].markup : false;
              _mfpTrigger("FirstMarkupParse", markup);
              if (markup) {
                mfp.currTemplate[type] = $2(markup);
              } else {
                mfp.currTemplate[type] = true;
              }
            }
            if (_prevContentType && _prevContentType !== item.type) {
              mfp.container.removeClass("mfp-" + _prevContentType + "-holder");
            }
            var newContent = mfp["get" + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
            mfp.appendContent(newContent, type);
            item.preloaded = true;
            _mfpTrigger(CHANGE_EVENT, item);
            _prevContentType = item.type;
            mfp.container.prepend(mfp.contentContainer);
            _mfpTrigger("AfterChange");
          },
          /**
           * Set HTML content of popup
           */
          appendContent: function(newContent, type) {
            mfp.content = newContent;
            if (newContent) {
              if (mfp.st.showCloseBtn && mfp.st.closeBtnInside && mfp.currTemplate[type] === true) {
                if (!mfp.content.find(".mfp-close").length) {
                  mfp.content.append(_getCloseBtn());
                }
              } else {
                mfp.content = newContent;
              }
            } else {
              mfp.content = "";
            }
            _mfpTrigger(BEFORE_APPEND_EVENT);
            mfp.container.addClass("mfp-" + type + "-holder");
            mfp.contentContainer.append(mfp.content);
          },
          /**
           * Creates Magnific Popup data object based on given data
           * @param  {int} index Index of item to parse
           */
          parseEl: function(index) {
            var item = mfp.items[index], type;
            if (item.tagName) {
              item = { el: $2(item) };
            } else {
              type = item.type;
              item = { data: item, src: item.src };
            }
            if (item.el) {
              var types = mfp.types;
              for (var i2 = 0; i2 < types.length; i2++) {
                if (item.el.hasClass("mfp-" + types[i2])) {
                  type = types[i2];
                  break;
                }
              }
              item.src = item.el.attr("data-mfp-src");
              if (!item.src) {
                item.src = item.el.attr("href");
              }
            }
            item.type = type || mfp.st.type || "inline";
            item.index = index;
            item.parsed = true;
            mfp.items[index] = item;
            _mfpTrigger("ElementParse", item);
            return mfp.items[index];
          },
          /**
           * Initializes single popup or a group of popups
           */
          addGroup: function(el, options) {
            var eHandler = function(e) {
              e.mfpEl = this;
              mfp._openClick(e, el, options);
            };
            if (!options) {
              options = {};
            }
            var eName = "click.magnificPopup";
            options.mainEl = el;
            if (options.items) {
              options.isObj = true;
              el.off(eName).on(eName, eHandler);
            } else {
              options.isObj = false;
              if (options.delegate) {
                el.off(eName).on(eName, options.delegate, eHandler);
              } else {
                options.items = el;
                el.off(eName).on(eName, eHandler);
              }
            }
          },
          _openClick: function(e, el, options) {
            var midClick = options.midClick !== void 0 ? options.midClick : $2.magnificPopup.defaults.midClick;
            if (!midClick && (e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
              return;
            }
            var disableOn = options.disableOn !== void 0 ? options.disableOn : $2.magnificPopup.defaults.disableOn;
            if (disableOn) {
              if (typeof disableOn === "function") {
                if (!disableOn.call(mfp)) {
                  return true;
                }
              } else {
                if (_window.width() < disableOn) {
                  return true;
                }
              }
            }
            if (e.type) {
              e.preventDefault();
              if (mfp.isOpen) {
                e.stopPropagation();
              }
            }
            options.el = $2(e.mfpEl);
            if (options.delegate) {
              options.items = el.find(options.delegate);
            }
            mfp.open(options);
          },
          /**
           * Updates text on preloader
           */
          updateStatus: function(status2, text) {
            if (mfp.preloader) {
              if (_prevStatus !== status2) {
                mfp.container.removeClass("mfp-s-" + _prevStatus);
              }
              if (!text && status2 === "loading") {
                text = mfp.st.tLoading;
              }
              var data2 = {
                status: status2,
                text
              };
              _mfpTrigger("UpdateStatus", data2);
              status2 = data2.status;
              text = data2.text;
              if (mfp.st.allowHTMLInStatusIndicator) {
                mfp.preloader.html(text);
              } else {
                mfp.preloader.text(text);
              }
              mfp.preloader.find("a").on("click", function(e) {
                e.stopImmediatePropagation();
              });
              mfp.container.addClass("mfp-s-" + status2);
              _prevStatus = status2;
            }
          },
          /*
          	"Private" helpers that aren't private at all
           */
          // Check to close popup or not
          // "target" is an element that was clicked
          _checkIfClose: function(target) {
            if ($2(target).closest("." + PREVENT_CLOSE_CLASS).length) {
              return;
            }
            var closeOnContent = mfp.st.closeOnContentClick;
            var closeOnBg = mfp.st.closeOnBgClick;
            if (closeOnContent && closeOnBg) {
              return true;
            } else {
              if (!mfp.content || $2(target).closest(".mfp-close").length || mfp.preloader && target === mfp.preloader[0]) {
                return true;
              }
              if (target !== mfp.content[0] && !$2.contains(mfp.content[0], target)) {
                if (closeOnBg) {
                  if ($2.contains(document, target)) {
                    return true;
                  }
                }
              } else if (closeOnContent) {
                return true;
              }
            }
            return false;
          },
          _addClassToMFP: function(cName) {
            mfp.bgOverlay.addClass(cName);
            mfp.wrap.addClass(cName);
          },
          _removeClassFromMFP: function(cName) {
            this.bgOverlay.removeClass(cName);
            mfp.wrap.removeClass(cName);
          },
          _hasScrollBar: function(winHeight) {
            return (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height());
          },
          _setFocus: function() {
            (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).trigger("focus");
          },
          _onFocusIn: function(e) {
            if (e.target !== mfp.wrap[0] && !$2.contains(mfp.wrap[0], e.target)) {
              mfp._setFocus();
              return false;
            }
          },
          _parseMarkup: function(template, values, item) {
            var arr;
            if (item.data) {
              values = $2.extend(item.data, values);
            }
            _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);
            $2.each(values, function(key, value) {
              if (value === void 0 || value === false) {
                return true;
              }
              arr = key.split("_");
              if (arr.length > 1) {
                var el = template.find(EVENT_NS + "-" + arr[0]);
                if (el.length > 0) {
                  var attr = arr[1];
                  if (attr === "replaceWith") {
                    if (el[0] !== value[0]) {
                      el.replaceWith(value);
                    }
                  } else if (attr === "img") {
                    if (el.is("img")) {
                      el.attr("src", value);
                    } else {
                      el.replaceWith($2("<img>").attr("src", value).attr("class", el.attr("class")));
                    }
                  } else {
                    el.attr(arr[1], value);
                  }
                }
              } else {
                if (mfp.st.allowHTMLInTemplate) {
                  template.find(EVENT_NS + "-" + key).html(value);
                } else {
                  template.find(EVENT_NS + "-" + key).text(value);
                }
              }
            });
          },
          _getScrollbarSize: function() {
            if (mfp.scrollbarSize === void 0) {
              var scrollDiv = document.createElement("div");
              scrollDiv.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
              document.body.appendChild(scrollDiv);
              mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
              document.body.removeChild(scrollDiv);
            }
            return mfp.scrollbarSize;
          }
        };
        $2.magnificPopup = {
          instance: null,
          proto: MagnificPopup.prototype,
          modules: [],
          open: function(options, index) {
            _checkInstance();
            if (!options) {
              options = {};
            } else {
              options = $2.extend(true, {}, options);
            }
            options.isObj = true;
            options.index = index || 0;
            return this.instance.open(options);
          },
          close: function() {
            return $2.magnificPopup.instance && $2.magnificPopup.instance.close();
          },
          registerModule: function(name, module3) {
            if (module3.options) {
              $2.magnificPopup.defaults[name] = module3.options;
            }
            $2.extend(this.proto, module3.proto);
            this.modules.push(name);
          },
          defaults: {
            // Info about options is in docs:
            // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
            disableOn: 0,
            key: null,
            midClick: false,
            mainClass: "",
            preloader: true,
            focus: "",
            // CSS selector of input to focus after popup is opened
            closeOnContentClick: false,
            closeOnBgClick: true,
            closeBtnInside: true,
            showCloseBtn: true,
            enableEscapeKey: true,
            modal: false,
            alignTop: false,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: true,
            allowHTMLInStatusIndicator: false,
            allowHTMLInTemplate: false
          }
        };
        $2.fn.magnificPopup = function(options) {
          _checkInstance();
          var jqEl = $2(this);
          if (typeof options === "string") {
            if (options === "open") {
              var items, itemOpts = _isJQ ? jqEl.data("magnificPopup") : jqEl[0].magnificPopup, index = parseInt(arguments[1], 10) || 0;
              if (itemOpts.items) {
                items = itemOpts.items[index];
              } else {
                items = jqEl;
                if (itemOpts.delegate) {
                  items = items.find(itemOpts.delegate);
                }
                items = items.eq(index);
              }
              mfp._openClick({ mfpEl: items }, jqEl, itemOpts);
            } else {
              if (mfp.isOpen)
                mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
            }
          } else {
            options = $2.extend(true, {}, options);
            if (_isJQ) {
              jqEl.data("magnificPopup", options);
            } else {
              jqEl[0].magnificPopup = options;
            }
            mfp.addGroup(jqEl, options);
          }
          return jqEl;
        };
        var INLINE_NS = "inline", _hiddenClass, _inlinePlaceholder, _lastInlineElement, _putInlineElementsBack = function() {
          if (_lastInlineElement) {
            _inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach();
            _lastInlineElement = null;
          }
        };
        $2.magnificPopup.registerModule(INLINE_NS, {
          options: {
            hiddenClass: "hide",
            // will be appended with `mfp-` prefix
            markup: "",
            tNotFound: "Content not found"
          },
          proto: {
            initInline: function() {
              mfp.types.push(INLINE_NS);
              _mfpOn(CLOSE_EVENT + "." + INLINE_NS, function() {
                _putInlineElementsBack();
              });
            },
            getInline: function(item, template) {
              _putInlineElementsBack();
              if (item.src) {
                var inlineSt = mfp.st.inline, el = $2(item.src);
                if (el.length) {
                  var parent = el[0].parentNode;
                  if (parent && parent.tagName) {
                    if (!_inlinePlaceholder) {
                      _hiddenClass = inlineSt.hiddenClass;
                      _inlinePlaceholder = _getEl(_hiddenClass);
                      _hiddenClass = "mfp-" + _hiddenClass;
                    }
                    _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
                  }
                  mfp.updateStatus("ready");
                } else {
                  mfp.updateStatus("error", inlineSt.tNotFound);
                  el = $2("<div>");
                }
                item.inlineElement = el;
                return el;
              }
              mfp.updateStatus("ready");
              mfp._parseMarkup(template, {}, item);
              return template;
            }
          }
        });
        var AJAX_NS = "ajax", _ajaxCur, _removeAjaxCursor = function() {
          if (_ajaxCur) {
            $2(document.body).removeClass(_ajaxCur);
          }
        }, _destroyAjaxRequest = function() {
          _removeAjaxCursor();
          if (mfp.req) {
            mfp.req.abort();
          }
        };
        $2.magnificPopup.registerModule(AJAX_NS, {
          options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: "The content could not be loaded."
          },
          proto: {
            initAjax: function() {
              mfp.types.push(AJAX_NS);
              _ajaxCur = mfp.st.ajax.cursor;
              _mfpOn(CLOSE_EVENT + "." + AJAX_NS, _destroyAjaxRequest);
              _mfpOn("BeforeChange." + AJAX_NS, _destroyAjaxRequest);
            },
            getAjax: function(item) {
              if (_ajaxCur) {
                $2(document.body).addClass(_ajaxCur);
              }
              mfp.updateStatus("loading");
              var opts = $2.extend({
                url: item.src,
                success: function(data2, textStatus, jqXHR) {
                  var temp = {
                    data: data2,
                    xhr: jqXHR
                  };
                  _mfpTrigger("ParseAjax", temp);
                  mfp.appendContent($2(temp.data), AJAX_NS);
                  item.finished = true;
                  _removeAjaxCursor();
                  mfp._setFocus();
                  setTimeout(function() {
                    mfp.wrap.addClass(READY_CLASS);
                  }, 16);
                  mfp.updateStatus("ready");
                  _mfpTrigger("AjaxContentAdded");
                },
                error: function() {
                  _removeAjaxCursor();
                  item.finished = item.loadError = true;
                  mfp.updateStatus("error", mfp.st.ajax.tError.replace("%url%", item.src));
                }
              }, mfp.st.ajax.settings);
              mfp.req = $2.ajax(opts);
              return "";
            }
          }
        });
        var _imgInterval, _getTitle = function(item) {
          if (item.data && item.data.title !== void 0)
            return item.data.title;
          var src = mfp.st.image.titleSrc;
          if (src) {
            if (typeof src === "function") {
              return src.call(mfp, item);
            } else if (item.el) {
              return item.el.attr(src) || "";
            }
          }
          return "";
        };
        $2.magnificPopup.registerModule("image", {
          options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: true,
            tError: "The image could not be loaded."
          },
          proto: {
            initImage: function() {
              var imgSt = mfp.st.image, ns = ".image";
              mfp.types.push("image");
              _mfpOn(OPEN_EVENT + ns, function() {
                if (mfp.currItem.type === "image" && imgSt.cursor) {
                  $2(document.body).addClass(imgSt.cursor);
                }
              });
              _mfpOn(CLOSE_EVENT + ns, function() {
                if (imgSt.cursor) {
                  $2(document.body).removeClass(imgSt.cursor);
                }
                _window.off("resize" + EVENT_NS);
              });
              _mfpOn("Resize" + ns, mfp.resizeImage);
              if (mfp.isLowIE) {
                _mfpOn("AfterChange", mfp.resizeImage);
              }
            },
            resizeImage: function() {
              var item = mfp.currItem;
              if (!item || !item.img) return;
              if (mfp.st.image.verticalFit) {
                var decr = 0;
                if (mfp.isLowIE) {
                  decr = parseInt(item.img.css("padding-top"), 10) + parseInt(item.img.css("padding-bottom"), 10);
                }
                item.img.css("max-height", mfp.wH - decr);
              }
            },
            _onImageHasSize: function(item) {
              if (item.img) {
                item.hasSize = true;
                if (_imgInterval) {
                  clearInterval(_imgInterval);
                }
                item.isCheckingImgSize = false;
                _mfpTrigger("ImageHasSize", item);
                if (item.imgHidden) {
                  if (mfp.content)
                    mfp.content.removeClass("mfp-loading");
                  item.imgHidden = false;
                }
              }
            },
            /**
             * Function that loops until the image has size to display elements that rely on it asap
             */
            findImageSize: function(item) {
              var counter = 0, img = item.img[0], mfpSetInterval = function(delay) {
                if (_imgInterval) {
                  clearInterval(_imgInterval);
                }
                _imgInterval = setInterval(function() {
                  if (img.naturalWidth > 0) {
                    mfp._onImageHasSize(item);
                    return;
                  }
                  if (counter > 200) {
                    clearInterval(_imgInterval);
                  }
                  counter++;
                  if (counter === 3) {
                    mfpSetInterval(10);
                  } else if (counter === 40) {
                    mfpSetInterval(50);
                  } else if (counter === 100) {
                    mfpSetInterval(500);
                  }
                }, delay);
              };
              mfpSetInterval(1);
            },
            getImage: function(item, template) {
              var guard = 0, imgSt = mfp.st.image, onLoadError = function() {
                if (item) {
                  item.img.off(".mfploader");
                  if (item === mfp.currItem) {
                    mfp._onImageHasSize(item);
                    mfp.updateStatus("error", imgSt.tError.replace("%url%", item.src));
                  }
                  item.hasSize = true;
                  item.loaded = true;
                  item.loadError = true;
                }
              }, onLoadComplete = function() {
                if (item) {
                  if (item.img[0].complete) {
                    item.img.off(".mfploader");
                    if (item === mfp.currItem) {
                      mfp._onImageHasSize(item);
                      mfp.updateStatus("ready");
                    }
                    item.hasSize = true;
                    item.loaded = true;
                    _mfpTrigger("ImageLoadComplete");
                  } else {
                    guard++;
                    if (guard < 200) {
                      setTimeout(onLoadComplete, 100);
                    } else {
                      onLoadError();
                    }
                  }
                }
              };
              var el = template.find(".mfp-img");
              if (el.length) {
                var img = document.createElement("img");
                img.className = "mfp-img";
                if (item.el && item.el.find("img").length) {
                  img.alt = item.el.find("img").attr("alt");
                }
                item.img = $2(img).on("load.mfploader", onLoadComplete).on("error.mfploader", onLoadError);
                img.src = item.src;
                if (el.is("img")) {
                  item.img = item.img.clone();
                }
                img = item.img[0];
                if (img.naturalWidth > 0) {
                  item.hasSize = true;
                } else if (!img.width) {
                  item.hasSize = false;
                }
              }
              mfp._parseMarkup(template, {
                title: _getTitle(item),
                img_replaceWith: item.img
              }, item);
              mfp.resizeImage();
              if (item.hasSize) {
                if (_imgInterval) clearInterval(_imgInterval);
                if (item.loadError) {
                  template.addClass("mfp-loading");
                  mfp.updateStatus("error", imgSt.tError.replace("%url%", item.src));
                } else {
                  template.removeClass("mfp-loading");
                  mfp.updateStatus("ready");
                }
                return template;
              }
              mfp.updateStatus("loading");
              item.loading = true;
              if (!item.hasSize) {
                item.imgHidden = true;
                template.addClass("mfp-loading");
                mfp.findImageSize(item);
              }
              return template;
            }
          }
        });
        var hasMozTransform, getHasMozTransform = function() {
          if (hasMozTransform === void 0) {
            hasMozTransform = document.createElement("p").style.MozTransform !== void 0;
          }
          return hasMozTransform;
        };
        $2.magnificPopup.registerModule("zoom", {
          options: {
            enabled: false,
            easing: "ease-in-out",
            duration: 300,
            opener: function(element) {
              return element.is("img") ? element : element.find("img");
            }
          },
          proto: {
            initZoom: function() {
              var zoomSt = mfp.st.zoom, ns = ".zoom", image;
              if (!zoomSt.enabled || !mfp.supportsTransition) {
                return;
              }
              var duration = zoomSt.duration, getElToAnimate = function(image2) {
                var newImg = image2.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"), transition = "all " + zoomSt.duration / 1e3 + "s " + zoomSt.easing, cssObj = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden"
                }, t = "transition";
                cssObj["-webkit-" + t] = cssObj["-moz-" + t] = cssObj["-o-" + t] = cssObj[t] = transition;
                newImg.css(cssObj);
                return newImg;
              }, showMainContent = function() {
                mfp.content.css("visibility", "visible");
              }, openTimeout, animatedImg;
              _mfpOn("BuildControls" + ns, function() {
                if (mfp._allowZoom()) {
                  clearTimeout(openTimeout);
                  mfp.content.css("visibility", "hidden");
                  image = mfp._getItemToZoom();
                  if (!image) {
                    showMainContent();
                    return;
                  }
                  animatedImg = getElToAnimate(image);
                  animatedImg.css(mfp._getOffset());
                  mfp.wrap.append(animatedImg);
                  openTimeout = setTimeout(function() {
                    animatedImg.css(mfp._getOffset(true));
                    openTimeout = setTimeout(function() {
                      showMainContent();
                      setTimeout(function() {
                        animatedImg.remove();
                        image = animatedImg = null;
                        _mfpTrigger("ZoomAnimationEnded");
                      }, 16);
                    }, duration);
                  }, 16);
                }
              });
              _mfpOn(BEFORE_CLOSE_EVENT + ns, function() {
                if (mfp._allowZoom()) {
                  clearTimeout(openTimeout);
                  mfp.st.removalDelay = duration;
                  if (!image) {
                    image = mfp._getItemToZoom();
                    if (!image) {
                      return;
                    }
                    animatedImg = getElToAnimate(image);
                  }
                  animatedImg.css(mfp._getOffset(true));
                  mfp.wrap.append(animatedImg);
                  mfp.content.css("visibility", "hidden");
                  setTimeout(function() {
                    animatedImg.css(mfp._getOffset());
                  }, 16);
                }
              });
              _mfpOn(CLOSE_EVENT + ns, function() {
                if (mfp._allowZoom()) {
                  showMainContent();
                  if (animatedImg) {
                    animatedImg.remove();
                  }
                  image = null;
                }
              });
            },
            _allowZoom: function() {
              return mfp.currItem.type === "image";
            },
            _getItemToZoom: function() {
              if (mfp.currItem.hasSize) {
                return mfp.currItem.img;
              } else {
                return false;
              }
            },
            // Get element postion relative to viewport
            _getOffset: function(isLarge) {
              var el;
              if (isLarge) {
                el = mfp.currItem.img;
              } else {
                el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
              }
              var offset = el.offset();
              var paddingTop = parseInt(el.css("padding-top"), 10);
              var paddingBottom = parseInt(el.css("padding-bottom"), 10);
              offset.top -= $2(window).scrollTop() - paddingTop;
              var obj2 = {
                width: el.width(),
                // fix Zepto height+padding issue
                height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
              };
              if (getHasMozTransform()) {
                obj2["-moz-transform"] = obj2["transform"] = "translate(" + offset.left + "px," + offset.top + "px)";
              } else {
                obj2.left = offset.left;
                obj2.top = offset.top;
              }
              return obj2;
            }
          }
        });
        var IFRAME_NS = "iframe", _emptyPage = "//about:blank", _fixIframeBugs = function(isShowing) {
          if (mfp.currTemplate[IFRAME_NS]) {
            var el = mfp.currTemplate[IFRAME_NS].find("iframe");
            if (el.length) {
              if (!isShowing) {
                el[0].src = _emptyPage;
              }
              if (mfp.isIE8) {
                el.css("display", isShowing ? "block" : "none");
              }
            }
          }
        };
        $2.magnificPopup.registerModule(IFRAME_NS, {
          options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            // we don't care and support only one default type of URL by default
            patterns: {
              youtube: {
                index: "youtube.com",
                id: "v=",
                src: "//www.youtube.com/embed/%id%?autoplay=1"
              },
              vimeo: {
                index: "vimeo.com/",
                id: "/",
                src: "//player.vimeo.com/video/%id%?autoplay=1"
              },
              gmaps: {
                index: "//maps.google.",
                src: "%id%&output=embed"
              }
            }
          },
          proto: {
            initIframe: function() {
              mfp.types.push(IFRAME_NS);
              _mfpOn("BeforeChange", function(e, prevType, newType) {
                if (prevType !== newType) {
                  if (prevType === IFRAME_NS) {
                    _fixIframeBugs();
                  } else if (newType === IFRAME_NS) {
                    _fixIframeBugs(true);
                  }
                }
              });
              _mfpOn(CLOSE_EVENT + "." + IFRAME_NS, function() {
                _fixIframeBugs();
              });
            },
            getIframe: function(item, template) {
              var embedSrc = item.src;
              var iframeSt = mfp.st.iframe;
              $2.each(iframeSt.patterns, function() {
                if (embedSrc.indexOf(this.index) > -1) {
                  if (this.id) {
                    if (typeof this.id === "string") {
                      embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id) + this.id.length, embedSrc.length);
                    } else {
                      embedSrc = this.id.call(this, embedSrc);
                    }
                  }
                  embedSrc = this.src.replace("%id%", embedSrc);
                  return false;
                }
              });
              var dataObj = {};
              if (iframeSt.srcAction) {
                dataObj[iframeSt.srcAction] = embedSrc;
              }
              mfp._parseMarkup(template, dataObj, item);
              mfp.updateStatus("ready");
              return template;
            }
          }
        });
        var _getLoopedId = function(index) {
          var numSlides = mfp.items.length;
          if (index > numSlides - 1) {
            return index - numSlides;
          } else if (index < 0) {
            return numSlides + index;
          }
          return index;
        }, _replaceCurrTotal = function(text, curr, total) {
          return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
        };
        $2.magnificPopup.registerModule("gallery", {
          options: {
            enabled: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: true,
            arrows: true,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
            langDir: null,
            loop: true
          },
          proto: {
            initGallery: function() {
              var gSt = mfp.st.gallery, ns = ".mfp-gallery";
              mfp.direction = true;
              if (!gSt || !gSt.enabled) return false;
              if (!gSt.langDir) {
                gSt.langDir = document.dir || "ltr";
              }
              _wrapClasses += " mfp-gallery";
              _mfpOn(OPEN_EVENT + ns, function() {
                if (gSt.navigateByImgClick) {
                  mfp.wrap.on("click" + ns, ".mfp-img", function() {
                    if (mfp.items.length > 1) {
                      mfp.next();
                      return false;
                    }
                  });
                }
                _document.on("keydown" + ns, function(e) {
                  if (e.keyCode === 37) {
                    if (gSt.langDir === "rtl") mfp.next();
                    else mfp.prev();
                  } else if (e.keyCode === 39) {
                    if (gSt.langDir === "rtl") mfp.prev();
                    else mfp.next();
                  }
                });
                mfp.updateGalleryButtons();
              });
              _mfpOn("UpdateStatus" + ns, function() {
                mfp.updateGalleryButtons();
              });
              _mfpOn("UpdateStatus" + ns, function(e, data2) {
                if (data2.text) {
                  data2.text = _replaceCurrTotal(data2.text, mfp.currItem.index, mfp.items.length);
                }
              });
              _mfpOn(MARKUP_PARSE_EVENT + ns, function(e, element, values, item) {
                var l = mfp.items.length;
                values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : "";
              });
              _mfpOn("BuildControls" + ns, function() {
                if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
                  var arrowLeftDesc, arrowRightDesc, arrowLeftAction, arrowRightAction;
                  if (gSt.langDir === "rtl") {
                    arrowLeftDesc = gSt.tNext;
                    arrowRightDesc = gSt.tPrev;
                    arrowLeftAction = "next";
                    arrowRightAction = "prev";
                  } else {
                    arrowLeftDesc = gSt.tPrev;
                    arrowRightDesc = gSt.tNext;
                    arrowLeftAction = "prev";
                    arrowRightAction = "next";
                  }
                  var markup = gSt.arrowMarkup, arrowLeft = mfp.arrowLeft = $2(markup.replace(/%title%/gi, arrowLeftDesc).replace(/%action%/gi, arrowLeftAction).replace(/%dir%/gi, "left")).addClass(PREVENT_CLOSE_CLASS), arrowRight = mfp.arrowRight = $2(markup.replace(/%title%/gi, arrowRightDesc).replace(/%action%/gi, arrowRightAction).replace(/%dir%/gi, "right")).addClass(PREVENT_CLOSE_CLASS);
                  if (gSt.langDir === "rtl") {
                    mfp.arrowNext = arrowLeft;
                    mfp.arrowPrev = arrowRight;
                  } else {
                    mfp.arrowNext = arrowRight;
                    mfp.arrowPrev = arrowLeft;
                  }
                  arrowLeft.on("click", function() {
                    if (gSt.langDir === "rtl") mfp.next();
                    else mfp.prev();
                  });
                  arrowRight.on("click", function() {
                    if (gSt.langDir === "rtl") mfp.prev();
                    else mfp.next();
                  });
                  mfp.container.append(arrowLeft.add(arrowRight));
                }
              });
              _mfpOn(CHANGE_EVENT + ns, function() {
                if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);
                mfp._preloadTimeout = setTimeout(function() {
                  mfp.preloadNearbyImages();
                  mfp._preloadTimeout = null;
                }, 16);
              });
              _mfpOn(CLOSE_EVENT + ns, function() {
                _document.off(ns);
                mfp.wrap.off("click" + ns);
                mfp.arrowRight = mfp.arrowLeft = null;
              });
            },
            next: function() {
              var newIndex = _getLoopedId(mfp.index + 1);
              if (!mfp.st.gallery.loop && newIndex === 0) return false;
              mfp.direction = true;
              mfp.index = newIndex;
              mfp.updateItemHTML();
            },
            prev: function() {
              var newIndex = mfp.index - 1;
              if (!mfp.st.gallery.loop && newIndex < 0) return false;
              mfp.direction = false;
              mfp.index = _getLoopedId(newIndex);
              mfp.updateItemHTML();
            },
            goTo: function(newIndex) {
              mfp.direction = newIndex >= mfp.index;
              mfp.index = newIndex;
              mfp.updateItemHTML();
            },
            preloadNearbyImages: function() {
              var p = mfp.st.gallery.preload, preloadBefore = Math.min(p[0], mfp.items.length), preloadAfter = Math.min(p[1], mfp.items.length), i2;
              for (i2 = 1; i2 <= (mfp.direction ? preloadAfter : preloadBefore); i2++) {
                mfp._preloadItem(mfp.index + i2);
              }
              for (i2 = 1; i2 <= (mfp.direction ? preloadBefore : preloadAfter); i2++) {
                mfp._preloadItem(mfp.index - i2);
              }
            },
            _preloadItem: function(index) {
              index = _getLoopedId(index);
              if (mfp.items[index].preloaded) {
                return;
              }
              var item = mfp.items[index];
              if (!item.parsed) {
                item = mfp.parseEl(index);
              }
              _mfpTrigger("LazyLoad", item);
              if (item.type === "image") {
                item.img = $2('<img class="mfp-img" />').on("load.mfploader", function() {
                  item.hasSize = true;
                }).on("error.mfploader", function() {
                  item.hasSize = true;
                  item.loadError = true;
                  _mfpTrigger("LazyLoadError", item);
                }).attr("src", item.src);
              }
              item.preloaded = true;
            },
            /**
             * Show/hide the gallery prev/next buttons if we're at the start/end, if looping is turned off
             * Added by Joloco for Veg
             */
            updateGalleryButtons: function() {
              if (!mfp.st.gallery.loop && typeof mfp.arrowPrev === "object" && mfp.arrowPrev !== null) {
                if (mfp.index === 0) mfp.arrowPrev.hide();
                else mfp.arrowPrev.show();
                if (mfp.index === mfp.items.length - 1) mfp.arrowNext.hide();
                else mfp.arrowNext.show();
              }
            }
          }
        });
        var RETINA_NS = "retina";
        $2.magnificPopup.registerModule(RETINA_NS, {
          options: {
            replaceSrc: function(item) {
              return item.src.replace(/\.\w+$/, function(m) {
                return "@2x" + m;
              });
            },
            ratio: 1
            // Function or number.  Set to 1 to disable.
          },
          proto: {
            initRetina: function() {
              if (window.devicePixelRatio > 1) {
                var st = mfp.st.retina, ratio = st.ratio;
                ratio = !isNaN(ratio) ? ratio : ratio();
                if (ratio > 1) {
                  _mfpOn("ImageHasSize." + RETINA_NS, function(e, item) {
                    item.img.css({
                      "max-width": item.img[0].naturalWidth / ratio,
                      "width": "100%"
                    });
                  });
                  _mfpOn("ElementParse." + RETINA_NS, function(e, item) {
                    item.src = st.replaceSrc(item, ratio);
                  });
                }
              }
            }
          }
        });
        _checkInstance();
      });
    }
  });

  // node_modules/jquery-nestable/jquery.nestable.js
  var require_jquery_nestable = __commonJS({
    "node_modules/jquery-nestable/jquery.nestable.js"() {
      (function($2, window2, document2, undefined2) {
        var hasTouch = "ontouchstart" in document2;
        var hasPointerEvents = (function() {
          var el = document2.createElement("div"), docEl = document2.documentElement;
          if (!("pointerEvents" in el.style)) {
            return false;
          }
          el.style.pointerEvents = "auto";
          el.style.pointerEvents = "x";
          docEl.appendChild(el);
          var supports = window2.getComputedStyle && window2.getComputedStyle(el, "").pointerEvents === "auto";
          docEl.removeChild(el);
          return !!supports;
        })();
        var defaults = {
          listNodeName: "ol",
          itemNodeName: "li",
          rootClass: "dd",
          listClass: "dd-list",
          itemClass: "dd-item",
          dragClass: "dd-dragel",
          handleClass: "dd-handle",
          collapsedClass: "dd-collapsed",
          placeClass: "dd-placeholder",
          noDragClass: "dd-nodrag",
          emptyClass: "dd-empty",
          expandBtnHTML: '<button data-action="expand" type="button">Expand</button>',
          collapseBtnHTML: '<button data-action="collapse" type="button">Collapse</button>',
          group: 0,
          maxDepth: 5,
          threshold: 20
        };
        function Plugin(element, options) {
          this.w = $2(document2);
          this.el = $2(element);
          this.options = $2.extend({}, defaults, options);
          this.init();
        }
        Plugin.prototype = {
          init: function() {
            var list = this;
            list.reset();
            list.el.data("nestable-group", this.options.group);
            list.placeEl = $2('<div class="' + list.options.placeClass + '"/>');
            $2.each(this.el.find(list.options.itemNodeName), function(k, el) {
              list.setParent($2(el));
            });
            list.el.on("click", "button", function(e) {
              if (list.dragEl) {
                return;
              }
              var target = $2(e.currentTarget), action = target.data("action"), item = target.parent(list.options.itemNodeName);
              if (action === "collapse") {
                list.collapseItem(item);
              }
              if (action === "expand") {
                list.expandItem(item);
              }
            });
            var onStartEvent = function(e) {
              var handle = $2(e.target);
              if (!handle.hasClass(list.options.handleClass)) {
                if (handle.closest("." + list.options.noDragClass).length) {
                  return;
                }
                handle = handle.closest("." + list.options.handleClass);
              }
              if (!handle.length || list.dragEl) {
                return;
              }
              list.isTouch = /^touch/.test(e.type);
              if (list.isTouch && e.touches.length !== 1) {
                return;
              }
              e.preventDefault();
              list.dragStart(e.touches ? e.touches[0] : e);
            };
            var onMoveEvent = function(e) {
              if (list.dragEl) {
                e.preventDefault();
                list.dragMove(e.touches ? e.touches[0] : e);
              }
            };
            var onEndEvent = function(e) {
              if (list.dragEl) {
                e.preventDefault();
                list.dragStop(e.touches ? e.touches[0] : e);
              }
            };
            if (hasTouch) {
              list.el[0].addEventListener("touchstart", onStartEvent, false);
              window2.addEventListener("touchmove", onMoveEvent, false);
              window2.addEventListener("touchend", onEndEvent, false);
              window2.addEventListener("touchcancel", onEndEvent, false);
            }
            list.el.on("mousedown", onStartEvent);
            list.w.on("mousemove", onMoveEvent);
            list.w.on("mouseup", onEndEvent);
          },
          serialize: function() {
            var data2, depth = 0, list = this;
            step = function(level, depth2) {
              var array = [], items = level.children(list.options.itemNodeName);
              items.each(function() {
                var li = $2(this), item = $2.extend({}, li.data()), sub = li.children(list.options.listNodeName);
                if (sub.length) {
                  item.children = step(sub, depth2 + 1);
                }
                array.push(item);
              });
              return array;
            };
            data2 = step(list.el.find(list.options.listNodeName).first(), depth);
            return data2;
          },
          serialise: function() {
            return this.serialize();
          },
          reset: function() {
            this.mouse = {
              offsetX: 0,
              offsetY: 0,
              startX: 0,
              startY: 0,
              lastX: 0,
              lastY: 0,
              nowX: 0,
              nowY: 0,
              distX: 0,
              distY: 0,
              dirAx: 0,
              dirX: 0,
              dirY: 0,
              lastDirX: 0,
              lastDirY: 0,
              distAxX: 0,
              distAxY: 0
            };
            this.isTouch = false;
            this.moving = false;
            this.dragEl = null;
            this.dragRootEl = null;
            this.dragDepth = 0;
            this.hasNewRoot = false;
            this.pointEl = null;
          },
          expandItem: function(li) {
            li.removeClass(this.options.collapsedClass);
            li.children('[data-action="expand"]').hide();
            li.children('[data-action="collapse"]').show();
            li.children(this.options.listNodeName).show();
          },
          collapseItem: function(li) {
            var lists = li.children(this.options.listNodeName);
            if (lists.length) {
              li.addClass(this.options.collapsedClass);
              li.children('[data-action="collapse"]').hide();
              li.children('[data-action="expand"]').show();
              li.children(this.options.listNodeName).hide();
            }
          },
          expandAll: function() {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
              list.expandItem($2(this));
            });
          },
          collapseAll: function() {
            var list = this;
            list.el.find(list.options.itemNodeName).each(function() {
              list.collapseItem($2(this));
            });
          },
          setParent: function(li) {
            if (li.children(this.options.listNodeName).length) {
              li.prepend($2(this.options.expandBtnHTML));
              li.prepend($2(this.options.collapseBtnHTML));
            }
            li.children('[data-action="expand"]').hide();
          },
          unsetParent: function(li) {
            li.removeClass(this.options.collapsedClass);
            li.children("[data-action]").remove();
            li.children(this.options.listNodeName).remove();
          },
          dragStart: function(e) {
            var mouse = this.mouse, target = $2(e.target), dragItem = target.closest(this.options.itemNodeName);
            this.placeEl.css("height", dragItem.height());
            mouse.offsetX = e.offsetX !== undefined2 ? e.offsetX : e.pageX - target.offset().left;
            mouse.offsetY = e.offsetY !== undefined2 ? e.offsetY : e.pageY - target.offset().top;
            mouse.startX = mouse.lastX = e.pageX;
            mouse.startY = mouse.lastY = e.pageY;
            this.dragRootEl = this.el;
            this.dragEl = $2(document2.createElement(this.options.listNodeName)).addClass(this.options.listClass + " " + this.options.dragClass);
            this.dragEl.css("width", dragItem.width());
            dragItem.after(this.placeEl);
            dragItem[0].parentNode.removeChild(dragItem[0]);
            dragItem.appendTo(this.dragEl);
            $2(document2.body).append(this.dragEl);
            this.dragEl.css({
              "left": e.pageX - mouse.offsetX,
              "top": e.pageY - mouse.offsetY
            });
            var i2, depth, items = this.dragEl.find(this.options.itemNodeName);
            for (i2 = 0; i2 < items.length; i2++) {
              depth = $2(items[i2]).parents(this.options.listNodeName).length;
              if (depth > this.dragDepth) {
                this.dragDepth = depth;
              }
            }
          },
          dragStop: function(e) {
            var el = this.dragEl.children(this.options.itemNodeName).first();
            el[0].parentNode.removeChild(el[0]);
            this.placeEl.replaceWith(el);
            this.dragEl.remove();
            this.el.trigger("change");
            if (this.hasNewRoot) {
              this.dragRootEl.trigger("change");
            }
            this.reset();
          },
          dragMove: function(e) {
            var list, parent, prev, next, depth, opt = this.options, mouse = this.mouse;
            this.dragEl.css({
              "left": e.pageX - mouse.offsetX,
              "top": e.pageY - mouse.offsetY
            });
            mouse.lastX = mouse.nowX;
            mouse.lastY = mouse.nowY;
            mouse.nowX = e.pageX;
            mouse.nowY = e.pageY;
            mouse.distX = mouse.nowX - mouse.lastX;
            mouse.distY = mouse.nowY - mouse.lastY;
            mouse.lastDirX = mouse.dirX;
            mouse.lastDirY = mouse.dirY;
            mouse.dirX = mouse.distX === 0 ? 0 : mouse.distX > 0 ? 1 : -1;
            mouse.dirY = mouse.distY === 0 ? 0 : mouse.distY > 0 ? 1 : -1;
            var newAx = Math.abs(mouse.distX) > Math.abs(mouse.distY) ? 1 : 0;
            if (!mouse.moving) {
              mouse.dirAx = newAx;
              mouse.moving = true;
              return;
            }
            if (mouse.dirAx !== newAx) {
              mouse.distAxX = 0;
              mouse.distAxY = 0;
            } else {
              mouse.distAxX += Math.abs(mouse.distX);
              if (mouse.dirX !== 0 && mouse.dirX !== mouse.lastDirX) {
                mouse.distAxX = 0;
              }
              mouse.distAxY += Math.abs(mouse.distY);
              if (mouse.dirY !== 0 && mouse.dirY !== mouse.lastDirY) {
                mouse.distAxY = 0;
              }
            }
            mouse.dirAx = newAx;
            if (mouse.dirAx && mouse.distAxX >= opt.threshold) {
              mouse.distAxX = 0;
              prev = this.placeEl.prev(opt.itemNodeName);
              if (mouse.distX > 0 && prev.length && !prev.hasClass(opt.collapsedClass)) {
                list = prev.find(opt.listNodeName).last();
                depth = this.placeEl.parents(opt.listNodeName).length;
                if (depth + this.dragDepth <= opt.maxDepth) {
                  if (!list.length) {
                    list = $2("<" + opt.listNodeName + "/>").addClass(opt.listClass);
                    list.append(this.placeEl);
                    prev.append(list);
                    this.setParent(prev);
                  } else {
                    list = prev.children(opt.listNodeName).last();
                    list.append(this.placeEl);
                  }
                }
              }
              if (mouse.distX < 0) {
                next = this.placeEl.next(opt.itemNodeName);
                if (!next.length) {
                  parent = this.placeEl.parent();
                  this.placeEl.closest(opt.itemNodeName).after(this.placeEl);
                  if (!parent.children().length) {
                    this.unsetParent(parent.parent());
                  }
                }
              }
            }
            var isEmpty = false;
            if (!hasPointerEvents) {
              this.dragEl[0].style.visibility = "hidden";
            }
            this.pointEl = $2(document2.elementFromPoint(e.pageX - document2.body.scrollLeft, e.pageY - (window2.pageYOffset || document2.documentElement.scrollTop)));
            if (!hasPointerEvents) {
              this.dragEl[0].style.visibility = "visible";
            }
            if (this.pointEl.hasClass(opt.handleClass)) {
              this.pointEl = this.pointEl.parent(opt.itemNodeName);
            }
            if (this.pointEl.hasClass(opt.emptyClass)) {
              isEmpty = true;
            } else if (!this.pointEl.length || !this.pointEl.hasClass(opt.itemClass)) {
              return;
            }
            var pointElRoot = this.pointEl.closest("." + opt.rootClass), isNewRoot = this.dragRootEl.data("nestable-id") !== pointElRoot.data("nestable-id");
            if (!mouse.dirAx || isNewRoot || isEmpty) {
              if (isNewRoot && opt.group !== pointElRoot.data("nestable-group")) {
                return;
              }
              depth = this.dragDepth - 1 + this.pointEl.parents(opt.listNodeName).length;
              if (depth > opt.maxDepth) {
                return;
              }
              var before = e.pageY < this.pointEl.offset().top + this.pointEl.height() / 2;
              parent = this.placeEl.parent();
              if (isEmpty) {
                list = $2(document2.createElement(opt.listNodeName)).addClass(opt.listClass);
                list.append(this.placeEl);
                this.pointEl.replaceWith(list);
              } else if (before) {
                this.pointEl.before(this.placeEl);
              } else {
                this.pointEl.after(this.placeEl);
              }
              if (!parent.children().length) {
                this.unsetParent(parent.parent());
              }
              if (!this.dragRootEl.find(opt.itemNodeName).length) {
                this.dragRootEl.append('<div class="' + opt.emptyClass + '"/>');
              }
              if (isNewRoot) {
                this.dragRootEl = pointElRoot;
                this.hasNewRoot = this.el[0] !== this.dragRootEl[0];
              }
            }
          }
        };
        $2.fn.nestable = function(params) {
          var lists = this, retval = this;
          lists.each(function() {
            var plugin = $2(this).data("nestable");
            if (!plugin) {
              $2(this).data("nestable", new Plugin(this, params));
              $2(this).data("nestable-id", (/* @__PURE__ */ new Date()).getTime());
            } else {
              if (typeof params === "string" && typeof plugin[params] === "function") {
                retval = plugin[params]();
              }
            }
          });
          return retval || lists;
        };
      })(window.jQuery || window.Zepto, window, document);
    }
  });

  // node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js
  var require_jquery_bootstrap_wizard = __commonJS({
    "node_modules/twitter-bootstrap-wizard/jquery.bootstrap.wizard.js"() {
      (function($2) {
        var bootstrapWizardCreate = function(element, options) {
          var element = $2(element);
          var obj2 = this;
          var baseItemSelector = 'li:has([data-toggle="tab"])';
          var historyStack = [];
          var $settings = $2.extend({}, $2.fn.bootstrapWizard.defaults, options);
          var $activeTab = null;
          var $navigation = null;
          this.rebindClick = function(selector, fn) {
            selector.unbind("click", fn).bind("click", fn);
          };
          this.fixNavigationButtons = function() {
            if (!$activeTab.length) {
              $navigation.find("a:first").tab("show");
              $activeTab = $navigation.find(baseItemSelector + ":first");
            }
            $2($settings.previousSelector, element).toggleClass("disabled", obj2.firstIndex() >= obj2.currentIndex());
            $2($settings.nextSelector, element).toggleClass("disabled", obj2.currentIndex() >= obj2.navigationLength());
            $2($settings.nextSelector, element).toggleClass("hidden", obj2.currentIndex() >= obj2.navigationLength() && $2($settings.finishSelector, element).length > 0);
            $2($settings.lastSelector, element).toggleClass("hidden", obj2.currentIndex() >= obj2.navigationLength() && $2($settings.finishSelector, element).length > 0);
            $2($settings.finishSelector, element).toggleClass("hidden", obj2.currentIndex() < obj2.navigationLength());
            $2($settings.backSelector, element).toggleClass("disabled", historyStack.length == 0);
            $2($settings.backSelector, element).toggleClass("hidden", obj2.currentIndex() >= obj2.navigationLength() && $2($settings.finishSelector, element).length > 0);
            obj2.rebindClick($2($settings.nextSelector, element), obj2.next);
            obj2.rebindClick($2($settings.previousSelector, element), obj2.previous);
            obj2.rebindClick($2($settings.lastSelector, element), obj2.last);
            obj2.rebindClick($2($settings.firstSelector, element), obj2.first);
            obj2.rebindClick($2($settings.finishSelector, element), obj2.finish);
            obj2.rebindClick($2($settings.backSelector, element), obj2.back);
            if ($settings.onTabShow && typeof $settings.onTabShow === "function" && $settings.onTabShow($activeTab, $navigation, obj2.currentIndex()) === false) {
              return false;
            }
          };
          this.next = function(e) {
            if (element.hasClass("last")) {
              return false;
            }
            if ($settings.onNext && typeof $settings.onNext === "function" && $settings.onNext($activeTab, $navigation, obj2.nextIndex()) === false) {
              return false;
            }
            var formerIndex = obj2.currentIndex();
            $index = obj2.nextIndex();
            if ($index > obj2.navigationLength()) {
            } else {
              historyStack.push(formerIndex);
              $navigation.find(baseItemSelector + ":eq(" + $index + ") a").tab("show");
            }
          };
          this.previous = function(e) {
            if (element.hasClass("first")) {
              return false;
            }
            if ($settings.onPrevious && typeof $settings.onPrevious === "function" && $settings.onPrevious($activeTab, $navigation, obj2.previousIndex()) === false) {
              return false;
            }
            var formerIndex = obj2.currentIndex();
            $index = obj2.previousIndex();
            if ($index < 0) {
            } else {
              historyStack.push(formerIndex);
              $navigation.find(baseItemSelector + ":eq(" + $index + ") a").tab("show");
            }
          };
          this.first = function(e) {
            if ($settings.onFirst && typeof $settings.onFirst === "function" && $settings.onFirst($activeTab, $navigation, obj2.firstIndex()) === false) {
              return false;
            }
            if (element.hasClass("disabled")) {
              return false;
            }
            historyStack.push(obj2.currentIndex());
            $navigation.find(baseItemSelector + ":eq(0) a").tab("show");
          };
          this.last = function(e) {
            if ($settings.onLast && typeof $settings.onLast === "function" && $settings.onLast($activeTab, $navigation, obj2.lastIndex()) === false) {
              return false;
            }
            if (element.hasClass("disabled")) {
              return false;
            }
            historyStack.push(obj2.currentIndex());
            $navigation.find(baseItemSelector + ":eq(" + obj2.navigationLength() + ") a").tab("show");
          };
          this.finish = function(e) {
            if ($settings.onFinish && typeof $settings.onFinish === "function") {
              $settings.onFinish($activeTab, $navigation, obj2.lastIndex());
            }
          };
          this.back = function() {
            if (historyStack.length == 0) {
              return null;
            }
            var formerIndex = historyStack.pop();
            if ($settings.onBack && typeof $settings.onBack === "function" && $settings.onBack($activeTab, $navigation, formerIndex) === false) {
              historyStack.push(formerIndex);
              return false;
            }
            element.find(baseItemSelector + ":eq(" + formerIndex + ") a").tab("show");
          };
          this.currentIndex = function() {
            return $navigation.find(baseItemSelector).index($activeTab);
          };
          this.firstIndex = function() {
            return 0;
          };
          this.lastIndex = function() {
            return obj2.navigationLength();
          };
          this.getIndex = function(e) {
            return $navigation.find(baseItemSelector).index(e);
          };
          this.nextIndex = function() {
            return $navigation.find(baseItemSelector).index($activeTab) + 1;
          };
          this.previousIndex = function() {
            return $navigation.find(baseItemSelector).index($activeTab) - 1;
          };
          this.navigationLength = function() {
            return $navigation.find(baseItemSelector).length - 1;
          };
          this.activeTab = function() {
            return $activeTab;
          };
          this.nextTab = function() {
            return $navigation.find(baseItemSelector + ":eq(" + (obj2.currentIndex() + 1) + ")").length ? $navigation.find(baseItemSelector + ":eq(" + (obj2.currentIndex() + 1) + ")") : null;
          };
          this.previousTab = function() {
            if (obj2.currentIndex() <= 0) {
              return null;
            }
            return $navigation.find(baseItemSelector + ":eq(" + parseInt(obj2.currentIndex() - 1) + ")");
          };
          this.show = function(index) {
            var tabToShow = isNaN(index) ? element.find(baseItemSelector + " a[href=#" + index + "]") : element.find(baseItemSelector + ":eq(" + index + ") a");
            if (tabToShow.length > 0) {
              historyStack.push(obj2.currentIndex());
              tabToShow.tab("show");
            }
          };
          this.disable = function(index) {
            $navigation.find(baseItemSelector + ":eq(" + index + ")").addClass("disabled");
          };
          this.enable = function(index) {
            $navigation.find(baseItemSelector + ":eq(" + index + ")").removeClass("disabled");
          };
          this.hide = function(index) {
            $navigation.find(baseItemSelector + ":eq(" + index + ")").hide();
          };
          this.display = function(index) {
            $navigation.find(baseItemSelector + ":eq(" + index + ")").show();
          };
          this.remove = function(args) {
            var $index2 = args[0];
            var $removeTabPane = typeof args[1] != "undefined" ? args[1] : false;
            var $item = $navigation.find(baseItemSelector + ":eq(" + $index2 + ")");
            if ($removeTabPane) {
              var $href = $item.find("a").attr("href");
              $2($href).remove();
            }
            $item.remove();
          };
          var innerTabClick = function(e) {
            var $ul = $navigation.find(baseItemSelector);
            var clickedIndex = $ul.index($2(e.currentTarget).parent(baseItemSelector));
            var $clickedTab = $2($ul[clickedIndex]);
            if ($settings.onTabClick && typeof $settings.onTabClick === "function" && $settings.onTabClick($activeTab, $navigation, obj2.currentIndex(), clickedIndex, $clickedTab) === false) {
              return false;
            }
          };
          var innerTabShown = function(e) {
            $element = $2(e.target).parent();
            var nextTab = $navigation.find(baseItemSelector).index($element);
            if ($element.hasClass("disabled")) {
              return false;
            }
            if ($settings.onTabChange && typeof $settings.onTabChange === "function" && $settings.onTabChange($activeTab, $navigation, obj2.currentIndex(), nextTab) === false) {
              return false;
            }
            $activeTab = $element;
            obj2.fixNavigationButtons();
          };
          this.resetWizard = function() {
            $2('a[data-toggle="tab"]', $navigation).off("click", innerTabClick);
            $2('a[data-toggle="tab"]', $navigation).off("shown shown.bs.tab", innerTabShown);
            $navigation = element.find("ul:first", element);
            $activeTab = $navigation.find(baseItemSelector + ".active", element);
            $2('a[data-toggle="tab"]', $navigation).on("click", innerTabClick);
            $2('a[data-toggle="tab"]', $navigation).on("shown shown.bs.tab", innerTabShown);
            obj2.fixNavigationButtons();
          };
          $navigation = element.find("ul:first", element);
          $activeTab = $navigation.find(baseItemSelector + ".active", element);
          if (!$navigation.hasClass($settings.tabClass)) {
            $navigation.addClass($settings.tabClass);
          }
          if ($settings.onInit && typeof $settings.onInit === "function") {
            $settings.onInit($activeTab, $navigation, 0);
          }
          if ($settings.onShow && typeof $settings.onShow === "function") {
            $settings.onShow($activeTab, $navigation, obj2.nextIndex());
          }
          $2('a[data-toggle="tab"]', $navigation).on("click", innerTabClick);
          $2('a[data-toggle="tab"]', $navigation).on("shown shown.bs.tab", innerTabShown);
        };
        $2.fn.bootstrapWizard = function(options) {
          if (typeof options == "string") {
            var args = Array.prototype.slice.call(arguments, 1);
            if (args.length === 1) {
              args.toString();
            }
            return this.data("bootstrapWizard")[options](args);
          }
          return this.each(function(index) {
            var element = $2(this);
            if (element.data("bootstrapWizard")) return;
            var wizard = new bootstrapWizardCreate(element, options);
            element.data("bootstrapWizard", wizard);
            wizard.fixNavigationButtons();
          });
        };
        $2.fn.bootstrapWizard.defaults = {
          tabClass: "nav nav-pills",
          nextSelector: ".wizard li.next",
          previousSelector: ".wizard li.previous",
          firstSelector: ".wizard li.first",
          lastSelector: ".wizard li.last",
          finishSelector: ".wizard li.finish",
          backSelector: ".wizard li.back",
          onShow: null,
          onInit: null,
          onNext: null,
          onPrevious: null,
          onLast: null,
          onFirst: null,
          onFinish: null,
          onBack: null,
          onTabChange: null,
          onTabClick: null,
          onTabShow: null
        };
      })(jQuery);
    }
  });

  // js/vendor-extra/bootstrap.lightbox.js
  var require_bootstrap_lightbox = __commonJS({
    "js/vendor-extra/bootstrap.lightbox.js"(exports2) {
      (function() {
        var $2, Lightbox, LightboxOptions;
        $2 = jQuery;
        LightboxOptions = /* @__PURE__ */ (function() {
          function LightboxOptions2() {
            this.fileLoadingImage = "data:image/gif;base64,R0lGODlhIAAgAPUuAOjo6Nzc3M3Nzb+/v7e3t7GxsbW1tbu7u8XFxdHR0djY2MHBwa2trbm5ucnJyaSkpKWlpaGhoeLi4urq6u7u7ubm5vLy8vb29vT09Pr6+v39/aysrK+vr7Ozs8fHx9vb297e3qmpqb29vdPT06amptXV1aCgoMvLy8/Pz9fX18PDw/j4+Ozs7ODg4PDw8KioqOTk5JqampmZmZycnP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBwAuACwAAAAAIAAgAEAG/0CXcEgECQ6bUGRDbDpdimTo9QoJnlhsYVvojLLgrEAkGiwWiFTYldGsRyHSYz6P2COG9XCw2TAYeXprCQYEhQcKgoouAQ4IHg4CAiMpCiASFRMUFhgXFxkZawEDcnd2Jh2LLiAdLyQvELEFX6pCAQx9fQ21T1wFHCi8TwcGxQYnwk8eBAcHZQnJTh8D1I8OJwmWMBMsFJudoG4u4mAgIwIoCSMKlpjcmxeLCgcPJianEcIKBXR1prVRSMiBUIfDAA8JoC1SMYWKKw/RXCzoE6IixIgC+uDaQCsiAQ4gOSCIOMRXhxIkhRjoYEwhSQTGCAxIyYiAzWYjU35o5oxaIj095J6AWFDmDAIHCVpgubCizRoFKtBAQjeixIdLADRZYBpOQ1An5qYmLKEgQAsYWb95UiUhgIJK7bZRCBMEACH5BAkHADMALAAAAAAZACAAAAb/wJlwSAQJRJxNJMLgHBzE6FBxeD0ey2zEBJESA4sXBHItZ2MJr1DReZFIZfNS9lGXOC83aRzPktQKHCEheW4QBQseCQkeAwZeIAYbG4OEBiNqXgiTnBsemV6BkwwbDCigXioMq6RQqFEBHLKyB69SKAW5BRwltlELugW1vkQHBh3In8RDBs3NactCBM4GvdEzBNMGBNbRB9MEB9DRAwQNBwcC1zMe5wciCOsj7wcDAwrXAe8i9ifrDvwGLEDQjdgHewtUIPBQJxqKBQM9OBDQkBgIBws9CBCQQAEMNRk0SAngoeTGBCMUgKgwgYIFDBcyhPTywSTHEiolsHR5YcVMMkgoOCbACUJny5cxf0ppkWIRzgAtYABg4QKmz5AivUhQ8LTozqo9M9iS0KKFURY8iQQBACH5BAkHAAAALAAAAAAZACAAAAb/QIBwSAShRBzGA8LhHAQgolSoEIVIENJjG+maHgfFFBBQbUKvF3bL7kZMpoFUYTij0xAI++E2yVJEJQUbhCF3JGsRfF0xB0QKg4SFIR0qDgkJHgMhjEUESZIbBiNjAAkvAkQeHAUFTRwOpaUKHa22CbKlCLatsblTAQYdwgVyv1MJBsrKJcdTCMsGxs5EAwQEBgQn1FIH1wQHpNxDBw0H52LjQucHIiKA6gAi7SID4uoL9QMLuPEOA/sW+FI3IiACDwHigVCB4OCleKYOejgh4INChwIEJJAQLxPFBCNKcBwHIiOKBCUUfJAwgaRGlApASKgwwQWGCxkyaNAgC8SIMxEpYs6cQMHChRU6f0lQEFQmzaJHk/6CAeKDU6JGkfJ0VkHCUAo2cerc6mwC0bBayQIIAgAh+QQJBwAuACwAAAAAHAAgAAAG/0CXcEgEJQaFAomUHAhAxGhUMWCErq/X8sF9HRRSYgDB2ZixWgiXG4kMAuFPg2Gmb0JZEkTNbnPARCUGHAUcDHZYS3wPbW0QCUMfBklJhhsGCA4JCQ4LDH0RMzIcQiAHBR2UBQclYS4JBY0mA0MOBrepBieuRAgmMhuRBLfEkLxEJwdEHgbDtwLHxwEE1NQq0ccjDdQHX9i8Dt3d19+uCyIiB07lrgPu7q3sUu8LCx/y8/ULCPf4vQgAPQDyJ8RBQAfxCL5C4MGBAGMKFTA88VCCQhcgHDhEMWIgwRECUCQYkcKiQhAiSSoAAeCiggQlFHwAIWGCQgkpUqxsAQMABToMBCXIpFlhAgULF1Zk0KCBnQQQRI0iVdpUXgUJEooeTbrU34QKWqd2JUiBxVaqTC9iwHAhg9u0roIAACH5BAkHADMALAAAAAAfACAAAAb/wJlwSAQlFoZOKNQpDFAgonQq/CwKjI12E3p5IaGDgjoNeAoFDoeR5XpfJAiENAiQq6ImOt1efiEPgRxjVCkHBkl7axsMfnGADxERLyNTH4eIBgVNBAgnIyMOCxwvgYGSL4RCIAMGBJkGIiVkIx2QkhEcdkICBK+/AndDCBC4kgNVBwcNzAeVwkMCkZIxMR8zJyIiygco0FIIESYyBava2gMe31MbL0QjA/HxqutVUgILAwsL6vXCHgtULEDwzB8ZDwgSeqBnEJwHDw4cRGlIBQFEAQImUpQSESOUjVNQYEyQYBfIISVQJBhR4trJIR9IlkjxocJLIRJY0gQh4WaVTxQKArSQMMGnBAUfeFaY4MJnCxAtYCylgOFmhaFLWbjAcCHDSwASplq4sCKDBg0nJwCYQGFsWbQvKcjlmsGszxkW3Nq9y/Ut3Lsz6u6tFwQAIfkECQcAAAAsAAAAACAAHwAABv9AgHBIBCUQBsOGkVwkQMSodPhBdApYzma7CYU2IsV0CnIQklcsg7H1vl6hQWBMHRjOhnSBw+6G3iQQBWJjCgcEiEkGWXxtfy8QEA8hI1MfAwcNiUkHHgIjIycIBX+BkpOEQyAqByIHmQQLJWMjBpEPuBEFUEMCra+vKHRDHiS4DxERA3UDzQMis8O9xrkRhALOzQnSUQjIyREHACAIKggLCyfcUh3gyR8pCPLyH+tRI+AmJh4oCB4eDgTYk8IhQgwZMQYIcODghIMUA6McIDGgHoCGAjLOiUgnowAUCVpwpAMyASgJI8ckSFCihAKUKaW0TKHgA8yYROApCADiJk5QIS0+8JQAg8LPIRU+9IRRYcLRIRKINqVg4SmACRKmurBwweqECSyoXriQ4SmFCVQxkM2gQcNRCmJXsHX71ILaDGytChmLl65eAH3/EvGbMggAIfkECQcAMQAsAAAAACAAHAAABv/AmHBIjI0QB0KhQCCoEqCidPpBNAzYzrLA2Ww4A8V0ChIkm1jDtuv1qgLj4Ud1ODQIafWSw2iHQh1iYwoLdXV3aXt8Xn8vLxsjUwELAwMihgcDDgIlIwIIBoyOJCQhgkMgDpSVlginRSMGIS+kpAVRQwkICJSUCXFDHrMQD8UDqLvJrsBEKCQQxA8vggke1tYlzEUe0cUHMS0O4icOv9pFBsUPEQ8fCgLw8LjnQyPs6xEeJQkoCQmR9IpwiEAwAoF9IxLCCUhkQMEIDEpITKFAAkMiJx5CSEHxw4cKF3MVNBHBI4iTAEIKSTAywskWEmBMUDlFQswKFVjQlIKzwoQ6CRR2FpkAACgFFxiEDqEA1IUFDBeULqVg4cKFFRmkxsDwFGuGDBq0Wv2qoWxYqWTPao1Bdi2RsmuDAAAh+QQJBwAqACwAAAAAIAAaAAAG/0CVcEhUlRwDkcEgOiASoKJ0GnA0G4Ts0lDoLhTTKUiQbB4IW0OnW2BwEIHwEORYDJKHPHq57jI2GwZgYR8eCAh2d2Z7bBx/gAUlYh6Ghwt2CAIJKSUoDgQFjo8hHINDLZ6UlQ6mRSUNgBshIS8dUUMpAicCAg4eknJCDn+0JC8LQxIJCby8ccFDCbIvJMaDCsvZH9BFHi/U1CIqMCXlJSOt3EIGJBAPECQfLQr09DDqRSMQ7g8PDiABAgC8hY9Ih37vDoBYKKFFhYJFFiB8UECCxQoVJkAkciJCvwgkYGAEMIHCxmgeH0SIQHICCwoWTgpJsLJmSQouLGCQqaJjTT0IFGBiuHCB54CaEThYsED0QgaeDWbIiGGiwVCnGTJo4KkCxIIXCFRg1UCWa5GsZc2e1ap2Ctu2UrbCFRIEACH5BAkHADAALAAAAAAgABkAAAb/QJhwSISVTovBgTAYeEagonQaEKgGooN2STB4VZ/pFJRAqK5NbaPr7RQ6noB4CBIg7oik8rD2GtwFHAQKc3UODh53KklZDQ1+BZGBBSVTLQkCAoceiR4JIyklCQ4HBpIcDBsFhEWimAInDgJhUyUHgRwbugZRdCMjCcEorHMwJwWpuhsqQxUKKaGivcVCCbkbISEbrBIf3goK09RCHtjZIQMwEy0g7QHi40INIS/1Lx8AEvr6APFFI/ZIkDgxAUCFgxX8SSnwAoLAAxMiRmShsMgCEg8cFqDAkaOLikQEPBj5IISFkxgsYAA5JAHJjBdiymRZ7SWEFRkyrFhxgaaxQwgjI7zISTSDzwERkkbgoKFpU6M0NyiNQEDDEA1QQSYwkdSECQdEmtJ8EYErV1o+hziYIcPrgbRTEMiYQQxuEQRCggAAIfkECQcAMQAsAAAAACAAHAAABv/AmHBIjClQHsRApFqcRsWoNAZKJBHNweDAJTQQn2lUkhI4PNeFlnsgGAgER0AslIxQArMDgdWKDg0NbwYdB2FTEiUJiwInZ3xqf4EGlB0dBiVSMAopIyMJeCcCIyUKCiMCIoKVBQUGh0QgHx+cnyMgUykDlq2tBLhDMCAgAQGmwHQCBr0cDAhDEzASEi2yEnRECQUczRscCkITABUV0xXYRSfcG+wLMS4sE/Lk6FEH7OwMARYuFP4TFOoVGYFvQwgBGBLyCyiwiAGDIUIMuEAxIYaGRRZseMHRQIYMKyhewEhEwAsSJzd8XLmC5JAEJCCQmKmhpoaPLoUkgMBz5pBSmxlyxhDwoCiEEEQ0CI2xoGjRAkuLcHD64EDUlxGoOrgqhEPWBxEgwFqKwESEsyasXnUQwezZCOCuDpDh1sQArkIE0DURYg7eGHMfZPqbNwGRIAAh+QQJBwAuACwAAAAAIAAfAAAG/0CXcEh0gUqCEwLhcAhKxajUJVGMEgKBw7NcDL6OzzRaASlKV1TS0f2KDocTaCwEtAIfRSqt5XoHbw0EA2JTExISICABemknbAhecAcEBAcpUhQAFRWIiwoKHx+LewiAcAYEBg2FRCwTsBUwiBVTCggHDQa7BiJzQxYUwq8AE3RCKJW8BR5DFxgW0cIUx0Mjux0F2gpCF97eGBjVRAIG2toqQisZGSve40UD5xwFAez37PBEJdocHBsCMmgYOFBfkQb/NmwYUFCIBoNEEDBQuMHAQ4hSBFDcwAHjlBEKQ4j0KCWByBAvQpCMIgDlixcbVhZZ8JLEiwIyiRQgwZPEgU6cQkZAGEoCwgmgLgw8gLCURKuVCB5Ilfozp4ClU19wk4kgQoSpDwbIDPDCq9kIDALkDDHj7AMoQGOY8PoiAdKkMdBuvUtChNq7Qp4SCQIAIfkECQcAMAAsAQAAAB8AIAAABv9AmHBIlHxKCZRgmVAQn9AhwKgojRIJwcmD6AoCUShl2gJ9qlctF6EaLASgsNA1AVQk5TNS6eAuBgMHKh9hFhQsExN3EgEfKVgCfQh/gQcDTk8XGBYuh4oSoKAtRwKTgAeoB4REF62bFIkTYR8OpwcNBANxQhkZKyuaFhZyQwkiqAQEBg68vb3AF8REJbcGygSEGtoaztJPCcoG4ggwGkPc3lAL4gYdHWDn5unT4h0FBQLz0gf39wv6xDz0K9AAoBwUHApwSGgwzIiFHDYwaBhlBAMGGyRShCIgY0YOG58g8LjBQEgiBkKE2BBiwEkhI168CDEz30sDL0jIDLEqpAdOCBByvnB5UgAJoBB0YtqIAMIDpBCIUkxQIMKDq1c5wDN4YEOEr1gfvEix0YCJr1a/hhgRckEMtF85LN0Y4+xZEVtD1n3QYO7JESfyQgkCACH5BAkHADAALAQAAAAcACAAAAb/QJhwCANIQB/FaFn6EJ9QC6tSOSZHCZTg5EgEoE+MizWptgKKUiKx9SAQCRAYdsFYKCxAFZnCChxuCCoeX0QZGSt1d2VWSmyAbyoLCwpEGhqIdRQTE3p7CgmQCAsDpU5DmBmKFnMBAqOlAwcqcqiZc0QjpLIHBwKWiLhPKSIivb2nMJjCUAm9DQ0EHszMCNAE2IXUYCnRBgQGCdu4AwbmBgjjcw7mHR0H6mAJ7R0G8VAlBfr6908j+/z6DUHBAaDAIQg4KOTQ4KAQAgw2SBzgcITEi78OEri4gYG2ex5CiJS44KCAEC9ejKzUDwGJlylDqOj3D8KDBzALfMS1BsGANw0Rbt58uSHFOA4RkgYVijPECHURTChl+qAAy3EdpCoNSmLATmomwop9cOBqvAImQmxoIKDWnCAAIfkECQcAKQAsBgAAABoAIAAABv/AlFBooUwqsBYoAAINn1Dh5VJkHSWgj2KUUDijwoz4giles9sESlD6PjXwzIpKYVUkSkVJLXAI3G9jGC4sADASAXoJAicOHh4fUXFTg0Z3H3uMDggIHgGSYmApEiWanCoegHCiTwqOnAsDAqy0CrADuJG0oiUquAMHJ7usDrgHByKfw1EKIiLHBwnLYCrQDR7TUQINDQQEA9lQCd0GBA3hTyUEBuUG6EMl7PLvQgny7PQpHgUd/Af5BwoILKCCXgkOAwugoHeAA0KEysI52ECRAYOC6FAwoEiRgwJ0HjaE4LgBQbgRBl6oHLmhQ0QoBwZ4SJDAwwIOEEiofBEihEc+VhwiCBX64AEECC90vuAwgpaMoUWjPiChs8NHVgpiQJWa88WCl2BezDAxlOiDFweu7vrQgGIEExs4HPhDKwgAIfkECQcAJwAsBwAAABkAIAAABv/Ak/CkyWQuGBdlAqgMn9BnEWlZViQgECzKnV6qkyvoo/hIuEPNFAMWf0qjUgutNiJdrAqsBVKUEoABaEYrVEt7ZCMJKAICIGhoFQEKio0ejpBoIIsCDh4ICZmanZ4ICIKiUQqlCCooqVwopioLC4+wTx8ItQMDI7hQHr29DsBPCcMiKsZDJQfPBwPMQinQz9MnzgcEDQ3YCQ0EBAbe0w4G4wbS0wMG7gYI0yUdBvQGocwiBQUd9KjADvYJjGcsQQEOAgsoMOaBg0OEHDw8CRACX5QRBjZo3MCAg4F/J2LMMMFgAKgEHhYUeBEixMYNCo+ZiEAzwoObN0m8YLmxQAk0KDJMCLWJM+fOlhsMLHxSQuhQojchkNDpcgHIIQoaRHiKk4TUECKWQgIh4ADHmw4PYIIUBAAh+QQJBwAAACwEAAAAHAAgAAAG/0CAcEjUZDKXi8VFbDqdGmPSQplYn9hiZqWsViSwSvYZRWKoky8IBBsXjWYXawKTgBSKlpu4vWC8Ei0BCiUlEntPFGofhAkjeohOFYMlIwkCKZFPEimWlwIgmk4gCSgCJw4Jok4lpw4eCKGrQyACrwgqmbNDKB6wCCi7QyMIuAgOwkIpCAvNC8kACgsD1APQCtUi1sklByLe28ICB+QHz8kLDQ3kHskpBPDwqsIDBgT2BAHiBvz87UO2IiXo0KEfgQ9DHJiIgGDPiQIQCXZAJmREjBkRInAYgaUEAQ4QIzbQB8BDjBgZUxZYkGqEAwQGNjDgABKiAQVDPpBIGeGBT0kIQF+8CLFBpkyQBko0UcBgYU+fDyA8EDq0aFEGBHA6CSAiJVQSEEgIJVqUAwKSWBQ0IPGVhNihITgM0Lqn1gGaD0iAHIBCFpYgACH5BAkHADEALAIAAAAeACAAAAb/wJhwSCzGNJqMcck0IjOXC6ZJLT6lFle1+oRiXKwJa7vsRi2USaUCIC8zK6krXZG0Ku7lBa2GtUAgeUwUaxIgHwqBgkYTdocKJRKLRhUBiCUJCpNGAZAJny2bRBIjnwICH6JEJSinAgmqQwoCJw4OArFCH7YevbkxH70Iw78fw8e/KQgqzAi/CQsD0h6/CNLSJ0SKggoHIiIDIiNDIRyTCAfp6QExGzImEc55Ag0H9QfZDybw8LhkIwYICCQgIpWICPAiRHggj4oAAxADGsgWA0SIhA8yFhi3pMSBDhEhithW4oHCjBlJFFDhYMQIBwgMcChQICQBTUQSQDiZEQKJRxcvQmwYymEmzQ4dCKRYooADypQ/gw7dYJTmgVRMAgyA8MAniZ9CpzIoWgABuyrdXjyIGiLs0AILsLoBIUAEzbYgFyTYtiQIACH5BAkHAAAALAAAAQAgAB8AAAb/QIBwSCwaAZqjcqnUZJjQpXN1iVqFGucFg7kys9Oty+JtOjOXi4VCKS/RahdrMnEr45RJBVa3G9d6FRISfkd6MBIgIBWFRSyIIAEfhI1EiQEKJR+Vlh+ZJSWcQxIpJSMJI6JCEqcJKCiqAC2uArWxH7UnukMnBh6FKQ4nDh61LyYxEQyFAh7OCAkeJiYR1Ql2Hwja2ikf1d8Fdg4LCyoqCCAADdTfCGUJA/HxAkIK3w8PJPRWJSLy8ZuEDKiGL98vKCgOKDwg4sA+IQE2RCj4AIKBVEdKLCBAYOGBBemIpAhBkcSLEAYQnBgxolkDAzANEGhwYEDAIiNIQoBAwmSIRw0bGHDgUKBATI4dUyxRUICnyZNAhRYt0AEmAQM2oQQY8KJriJ9Bh0616iBkFAUiNnwFCpRo0Q4IbnoBgWIATKAyVSQweyQIACH5BAkHADEALAAABAAgABwAAAb/wJhwSCwaiRpN5shsFpNLp/QJzVym2Fj1csFkpZkw10L+OldjF4VidmIs6gmA1WZiKCx5BVBn6isSMH1HE4ASLS2DRhOHIAEfBRwcBQWKFQGPHwoRJiYRESODFQqkJSUQn58egy2mI68bqREDgx8JtwkjBJ6fHIMjKAICKCUeng8PoHUgwifCCh/JyA8ddSgO2NggMQfTDxCrXyUIHuUICUIKJN4kKFkKKioI8wjbQgPsIeFOCQP+C/PQDQnAgYRBEi9CGCjBJAWCAyL8DVjgwd6QFCEMvki4YQMBDwJMCXAw4IBJiP8+HBmxYWOIEB0ZSKJkoCaBBg1ODlDQREGHN5cdN8ikVKCmzZwHVKh0EmBB0I6TKHWwSYDAAQEWpSgYwAEq0ak2ESw1AyLBAgIGKFlFMCKrkSAAIfkECQcAMgAsAAAGACAAGgAABv9AmXBILBqPmqNyqUwyn01NBkqVJTXSafWJzV5kjoJge8yYV5c0wRQzhcbkIfqCwVg2kXxkEB/S7RQUEHoRcH0YLoEsE4QRCX1CLosTExV6DxEokDIUABWfEoMPmA6bEzAwEqocEaMPC5sVIC0gtQeuDwWbIB8BHx8gDq4QECN9EgrJKSktHyQQDxAkBn0pIyUj1xIyByQv3y8eZB8J5eUKQgovJN4vG5pUHycC9CgJLUML698bG6VPJTw4OEHwRAoiAQq8CBGi34YGJZR8cIAAgYeLHgTgI5KCQcMNDBhw4HDAgYASJRIIUDFgwIIFFS0GODKCg0ORBXIaMEDggM8/Ay0HqLD4YYkCA/1wFuiwk+dPEUEdzGQSAAEHpUyb9jwgAqgAEFUULMhZQCsBAg24Su0DIgGCtDuBehgBdkkQACH5BAkHADIALAAABwAgABkAAAb/QJlMJSwaj8hkURGZOZTQqOxgMsVMAqlW+ImYIuDGVuv4giOJMVSjIZwjDPWRLWNnOJHHIzKQGzNsGhkZL3l7J35Fg4srEHp6aYkyKxeVlY8PEJGJFxieFhYvehAQiJIYLqAUFAUkjiQLkjIULLW1ByS5Lx2yEwC/ABMnui8hI4kTEhUwzBMfL9AvGwSJEiASLdkTMgMhxRsbT2oSCh8BINdCChsh4Bscm1IgIykK9h8VRSrgDAwcBaaifEiQYMSIEiVAGAlgwN2/AgdKKAmA4oQAAQQTlJBwREGBDf4KiDQgAqO9EQkcIPDgwKIAFAlaJClR4GGBDgYMEDhwQMSAQAELEKxk6UCAQiUKCDzMmXNnz59BhXowKiUAgpFNCTR4+lMoggRHtXxAwJSA1p4+ByBAESDRPAQ/dy5Y4CBhlCAAIfkECQcAJgAsAAAEACAAHAAABv9Ak9CUeA2PyKTyqCDNjMtoFLSJRGJQqXY4sFplpO1W4bU+EmLtIfJ4WBFp6YfEdnfiUke7HUHjlwd7DwV/UQUQDxAQC4VLLySKEAKNSRokl5cjlCYaGpwaL4+hfoUZGZ0aGRuhLyEnlKaxGR2tLxsqlBe6uwMhvhsGlBYYGBfEAiEbyhslhRYUFBYWLhYBDMsMB4UTEyzQ0SYLyxwFr3EAFRUA3CxCChwb5AUdpFoVIBISMDAV7UII8goUMDBJS4sPH0CAaNGiwpEABOR1MGBgQIolIFKMSKEAYQAQAJAoMCBwIsUGCwSMUKAgRQkBAlAkGFGC4weHSUqQNGmgwQFNEQMGLEDgwQFMmSM2Sojy4QBFAlAP/BSqwkPREzETlFgqJYADqFGnCkVA1oFRBVy3fEDQwKfUoEPJehgBohCIEQ4WLDgwgCgKBXWjBAEAIfkECQcAKAAsAAABACAAHwAABv9AlHAoVBCPyGQyIJopn1CUgmMyRaLY4YhkNc1A2aiCFCmXnWEliFN+mAtp5cD9cEcQ8eS4zhfkkyJ8dXh/Rx8kEA8QEAaFSCcQL4sQI45HBySZL3CWRAUvmgudRBsvpiF+o0IhrCEblaoorhu0CbEoHLS0qaoGugyEfxpEGgO0DBwNjhrMKMwCGwwF0yV/GdfMGhkBBRzTBSJ/FxfX10Iq3tMGvFkYGOPjK0XTHQb2sFgUFC4W7u9DHgrYs0fAVpQJACaw2OcCA5EADQYaIHAAgZEkFSRIqFBhgkIKSBQQmDjxgIgBCEakCADiwwcFClhq5DgBJJIUDQgQaHDgwIBPBSoQODghIMGIEgo+gGghAcaEJx8GUDQ54CcCDw4EFFWZFISEp1BAOOjp06pQokaPKmhRIcwHByJOLkBAN+vWDzD+gCghACtdrSUCSIASBAAh+QQFBwAzACwAAAAAHwAgAAAG/8CZcEgECU7EpHJJVDQiJhlzugwMIlhThMoVKjjYcGzQnY5C2EfYZCgvFaGHXI1lHNxJUGEujxRGeEoLEBAPhRAIgUoKLySEECQCikoDjSSOHpNJHyEvjS9tmkQCnZ4vgKJDIiGsIR2pRAYbsxuJsEIctBuStzMMswwMqLe/DBwcCb0zBcfMvLcEBdIFmb0L0wV3vQIFHR0GBiW9Ad/gBguTGkoI5gQEyXgZGupEHwQG7g0H4mUrGfLq5glxgI/AgQMD4FHBcMEfQHozQAwgoA/hAAcfmFCg4ILhhX8Zkig4eHDAAhUIUCgIIEECjAowAEygYMHjRyUpBogQYXKBB04HJ1CMKPEBRIsKMjnWvMAkgAqeA1A6ECAgQQkFRSVUmDCzIxUjJhEg+Fl16MoWWiuwcFEmgACxCKYKLZFCgVG1ikAoSCAARdWrICRQCQIAOw==";
            this.resizeDuration = 700;
            this.fadeDuration = 500;
            this.labelImage = "Image";
            this.labelOf = "of";
          }
          return LightboxOptions2;
        })();
        Lightbox = (function() {
          function Lightbox2(options) {
            this.options = options;
            this.album = [];
            this.currentImageIndex = void 0;
            this.init();
          }
          Lightbox2.prototype.init = function() {
            this.enable();
            return this.build();
          };
          Lightbox2.prototype.enable = function() {
            var _this = this;
            return $2("body").on("click", ".thumbnails[data-toggle^=lightbox] .thumbnail", function(e) {
              _this.start($2(e.currentTarget));
              return false;
            });
          };
          Lightbox2.prototype.build = function() {
            var $lightbox, _this = this;
            $2("<div/>", {
              id: "lightboxOverlay"
            }).appendTo($2("body"));
            $2("<div/>", {
              id: "lightbox"
            }).append($2("<div/>", {
              "class": "lb-outerContainer"
            }).append($2("<button/>", {
              "class": "close",
              type: "button",
              "aria-hidden": "true"
            }).html("&times;"), $2("<div/>", {
              "class": "lb-container"
            }).append($2("<img/>", {
              "class": "lb-image"
            }), $2("<div/>", {
              "class": "lb-nav"
            }).append($2("<a/>", {
              "class": "lb-prev"
            }), $2("<a/>", {
              "class": "lb-next"
            })), $2("<div/>", {
              "class": "lb-loader"
            }).append($2("<a/>", {
              "class": "lb-cancel"
            }).append($2("<img/>", {
              src: this.options.fileLoadingImage
            })))), $2("<div/>", {
              "class": "lb-dataContainer"
            }).append($2("<div/>", {
              "class": "lb-data"
            }).append($2("<h4/>", {
              "class": "lb-caption"
            }), $2("<p/>", {
              "class": "lb-description"
            }), $2("<p/>", {
              "class": "close"
            }).text("close"), $2("<p/>", {
              "class": "lb-number"
            }))))).appendTo($2("body"));
            $2("#lightboxOverlay").hide().on("click", function(e) {
              _this.end();
              return false;
            });
            $lightbox = $2("#lightbox");
            $lightbox.hide().on("click", function(e) {
              if ($2(e.target).attr("id") === "lightbox") {
                _this.end();
              }
              return false;
            });
            $lightbox.find(".lb-outerContainer").on("click", function(e) {
              if ($2(e.target).attr("id") === "lightbox") {
                _this.end();
              }
              return false;
            });
            $lightbox.find(".lb-prev").on("click", function(e) {
              _this.changeImage(_this.currentImageIndex - 1);
              return false;
            });
            $lightbox.find(".lb-next").on("click", function(e) {
              _this.changeImage(_this.currentImageIndex + 1);
              return false;
            });
            $lightbox.find(".lb-loader, .close").on("click", function(e) {
              _this.end();
              return false;
            });
          };
          Lightbox2.prototype.start = function($link) {
            var $lightbox, $window, a, current, i2, imageNumber, left, top, _i, _len, _ref;
            if (!$link.attr("href") && !$link.attr("data-target")) {
              return;
            }
            $2(window).on("resize", this.sizeOverlay);
            $2("select, object, embed").css({
              visibility: "hidden"
            });
            $2("#lightboxOverlay").width($2(document).width()).height($2(document).height()).fadeIn(this.options.fadeDuration);
            this.album = [];
            imageNumber = 0;
            current = 0;
            if ($link.parents(".thumbnails").attr("data-toggle") === "lightbox" && $link.parents(".thumbnails").find(".thumbnail").length) {
              _ref = $link.parents(".thumbnails").find(".thumbnail");
              for (i2 = _i = 0, _len = _ref.length; _i < _len; i2 = ++_i) {
                a = _ref[i2];
                if (!$2(a).attr("href") && !$2(a).attr("data-target")) {
                  continue;
                }
                this.album.push({
                  link: $2(a).attr("href") || $2(a).attr("data-target"),
                  title: $2(a).attr("title") || $2(a).attr("data-title"),
                  description: $2(a).attr("data-description")
                });
                if ($link.attr("href") && $2(a).attr("href") === $link.attr("href") || $link.attr("data-target") && $2(a).attr("data-target") === $link.attr("data-target")) {
                  imageNumber = current;
                }
                ++current;
              }
            } else {
              this.album.push({
                link: $link.attr("href") || $link.attr("data-target"),
                title: $link.attr("title") || $link.attr("data-title"),
                description: $link.attr("data-description")
              });
            }
            $window = $2(window);
            top = $window.scrollTop() + $window.height() / 10;
            left = $window.scrollLeft();
            $lightbox = $2("#lightbox");
            $lightbox.css({
              top: top + "px",
              left: left + "px"
            }).fadeIn(this.options.fadeDuration);
            this.changeImage(imageNumber);
          };
          Lightbox2.prototype.changeImage = function(imageNumber) {
            var $image, $lightbox, preloader, _this = this;
            this.disableKeyboardNav();
            $lightbox = $2("#lightbox");
            $image = $lightbox.find(".lb-image");
            this.sizeOverlay();
            $2("#lightboxOverlay").fadeIn(this.options.fadeDuration);
            $2(".lb-loader").fadeIn("slow");
            $lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption, .lb-description").hide();
            $lightbox.find(".lb-outerContainer").addClass("animating");
            preloader = new Image();
            preloader.onload = function() {
              $image.attr("src", _this.album[imageNumber].link);
              $image.width = preloader.width;
              $image.height = preloader.height;
              return _this.sizeContainer(preloader.width, preloader.height);
            };
            preloader.src = this.album[imageNumber].link;
            this.currentImageIndex = imageNumber;
          };
          Lightbox2.prototype.sizeOverlay = function() {
            return $2("#lightboxOverlay").width($2(document).width()).height($2(document).height());
          };
          Lightbox2.prototype.sizeContainer = function(imageWidth, imageHeight) {
            var $container, $lightbox, $outerContainer, containerBottomPadding, containerLeftPadding, containerRightPadding, containerTopPadding, newHeight, newWidth, oldHeight, oldWidth, _this = this;
            $lightbox = $2("#lightbox");
            $outerContainer = $lightbox.find(".lb-outerContainer");
            oldWidth = $outerContainer.outerWidth();
            oldHeight = $outerContainer.outerHeight();
            $container = $lightbox.find(".lb-container");
            containerTopPadding = parseInt($container.css("padding-top"), 10);
            containerRightPadding = parseInt($container.css("padding-right"), 10);
            containerBottomPadding = parseInt($container.css("padding-bottom"), 10);
            containerLeftPadding = parseInt($container.css("padding-left"), 10);
            newWidth = imageWidth + containerLeftPadding + containerRightPadding;
            newHeight = imageHeight + containerTopPadding + containerBottomPadding;
            if (newWidth !== oldWidth && newHeight !== oldHeight) {
              $outerContainer.animate({
                width: newWidth,
                height: newHeight
              }, this.options.resizeDuration, "swing");
            } else if (newWidth !== oldWidth) {
              $outerContainer.animate({
                width: newWidth
              }, this.options.resizeDuration, "swing");
            } else if (newHeight !== oldHeight) {
              $outerContainer.animate({
                height: newHeight
              }, this.options.resizeDuration, "swing");
            }
            setTimeout(function() {
              $lightbox.find(".lb-dataContainer").width(newWidth);
              $lightbox.find(".lb-prevLink").height(newHeight);
              $lightbox.find(".lb-nextLink").height(newHeight);
              _this.showImage();
            }, this.options.resizeDuration);
          };
          Lightbox2.prototype.showImage = function() {
            var $lightbox;
            $lightbox = $2("#lightbox");
            $lightbox.find(".lb-loader").hide();
            $lightbox.find(".lb-image").fadeIn("slow");
            this.updateNav();
            this.updateDetails();
            this.preloadNeighboringImages();
            this.enableKeyboardNav();
          };
          Lightbox2.prototype.updateNav = function() {
            var $lightbox;
            $lightbox = $2("#lightbox");
            $lightbox.find(".lb-nav").show();
            if (this.currentImageIndex > 0) {
              $lightbox.find(".lb-prev").show();
            }
            if (this.currentImageIndex < this.album.length - 1) {
              $lightbox.find(".lb-next").show();
            }
          };
          Lightbox2.prototype.updateDetails = function() {
            var $lightbox, _this = this;
            $lightbox = $2("#lightbox");
            if (typeof this.album[this.currentImageIndex].title !== "undefined" && this.album[this.currentImageIndex].title !== "") {
              $lightbox.find("h4").html(this.album[this.currentImageIndex].title).fadeIn("fast");
            }
            if (typeof this.album[this.currentImageIndex].description !== "undefined" && this.album[this.currentImageIndex].description !== "") {
              $lightbox.find(".lb-description").html(this.album[this.currentImageIndex].description).fadeIn("fast");
            }
            if (this.album.length > 1) {
              $lightbox.find(".lb-number").html(this.options.labelImage + " " + (this.currentImageIndex + 1) + " " + this.options.labelOf + "  " + this.album.length).fadeIn("fast");
            } else {
              $lightbox.find(".lb-number").hide();
            }
            $lightbox.find(".lb-outerContainer").removeClass("animating");
            $lightbox.find(".lb-dataContainer").fadeIn(this.resizeDuration, function() {
              return _this.sizeOverlay();
            });
          };
          Lightbox2.prototype.preloadNeighboringImages = function() {
            var preloadNext, preloadPrev;
            if (this.album.length > this.currentImageIndex + 1) {
              preloadNext = new Image();
              preloadNext.src = this.album[this.currentImageIndex + 1].link;
            }
            if (this.currentImageIndex > 0) {
              preloadPrev = new Image();
              preloadPrev.src = this.album[this.currentImageIndex - 1].link;
            }
          };
          Lightbox2.prototype.enableKeyboardNav = function() {
            $2(document).on("keyup.keyboard", $2.proxy(this.keyboardAction, this));
          };
          Lightbox2.prototype.disableKeyboardNav = function() {
            $2(document).off(".keyboard");
          };
          Lightbox2.prototype.keyboardAction = function(event) {
            var KEYCODE_ESC, KEYCODE_LEFTARROW, KEYCODE_RIGHTARROW, key, keycode;
            KEYCODE_ESC = 27;
            KEYCODE_LEFTARROW = 37;
            KEYCODE_RIGHTARROW = 39;
            keycode = event.keyCode;
            key = String.fromCharCode(keycode).toLowerCase();
            if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
              this.end();
            } else if (key === "p" || keycode === KEYCODE_LEFTARROW) {
              if (this.currentImageIndex !== 0) {
                this.changeImage(this.currentImageIndex - 1);
              }
            } else if (key === "n" || keycode === KEYCODE_RIGHTARROW) {
              if (this.currentImageIndex !== this.album.length - 1) {
                this.changeImage(this.currentImageIndex + 1);
              }
            }
          };
          Lightbox2.prototype.end = function() {
            this.disableKeyboardNav();
            $2(window).off("resize", this.sizeOverlay);
            $2("#lightbox").fadeOut(this.options.fadeDuration);
            $2("#lightboxOverlay").fadeOut(this.options.fadeDuration);
            return $2("select, object, embed").css({
              visibility: "visible"
            });
          };
          return Lightbox2;
        })();
        $2(function() {
          var lightbox, options;
          options = new LightboxOptions();
          return lightbox = new Lightbox(options);
        });
      }).call(exports2);
    }
  });

  // js/vendor-extra/jquery.validate.js
  var require_jquery_validate = __commonJS({
    "js/vendor-extra/jquery.validate.js"(exports2, module2) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define(["jquery"], factory);
        } else if (typeof module2 === "object" && module2.exports) {
          module2.exports = factory(require_jquery());
        } else {
          factory(jQuery);
        }
      })(function($2) {
        $2.extend($2.fn, {
          // https://jqueryvalidation.org/validate/
          validate: function(options) {
            if (!this.length) {
              if (options && options.debug && window.console) {
                console.warn("Nothing selected, can't validate, returning nothing.");
              }
              return;
            }
            var validator = $2.data(this[0], "validator");
            if (validator) {
              return validator;
            }
            this.attr("novalidate", "novalidate");
            validator = new $2.validator(options, this[0]);
            $2.data(this[0], "validator", validator);
            if (validator.settings.onsubmit) {
              this.on("click.validate", ":submit", function(event) {
                validator.submitButton = event.currentTarget;
                if ($2(this).hasClass("cancel")) {
                  validator.cancelSubmit = true;
                }
                if ($2(this).attr("formnovalidate") !== void 0) {
                  validator.cancelSubmit = true;
                }
              });
              this.on("submit.validate", function(event) {
                if (validator.settings.debug) {
                  event.preventDefault();
                }
                function handle() {
                  var hidden, result;
                  if (validator.submitButton && (validator.settings.submitHandler || validator.formSubmitted)) {
                    hidden = $2("<input type='hidden'/>").attr("name", validator.submitButton.name).val($2(validator.submitButton).val()).appendTo(validator.currentForm);
                  }
                  if (validator.settings.submitHandler && !validator.settings.debug) {
                    result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                    if (hidden) {
                      hidden.remove();
                    }
                    if (result !== void 0) {
                      return result;
                    }
                    return false;
                  }
                  return true;
                }
                if (validator.cancelSubmit) {
                  validator.cancelSubmit = false;
                  return handle();
                }
                if (validator.form()) {
                  if (validator.pendingRequest) {
                    validator.formSubmitted = true;
                    return false;
                  }
                  return handle();
                } else {
                  validator.focusInvalid();
                  return false;
                }
              });
            }
            return validator;
          },
          // https://jqueryvalidation.org/valid/
          valid: function() {
            var valid, validator, errorList;
            if ($2(this[0]).is("form")) {
              valid = this.validate().form();
            } else {
              errorList = [];
              valid = true;
              validator = $2(this[0].form).validate();
              this.each(function() {
                valid = validator.element(this) && valid;
                if (!valid) {
                  errorList = errorList.concat(validator.errorList);
                }
              });
              validator.errorList = errorList;
            }
            return valid;
          },
          // https://jqueryvalidation.org/rules/
          rules: function(command, argument) {
            var element = this[0], isContentEditable = typeof this.attr("contenteditable") !== "undefined" && this.attr("contenteditable") !== "false", settings2, staticRules, existingRules, data2, param, filtered;
            if (element == null) {
              return;
            }
            if (!element.form && isContentEditable) {
              element.form = this.closest("form")[0];
              element.name = this.attr("name");
            }
            if (element.form == null) {
              return;
            }
            if (command) {
              settings2 = $2.data(element.form, "validator").settings;
              staticRules = settings2.rules;
              existingRules = $2.validator.staticRules(element);
              switch (command) {
                case "add":
                  $2.extend(existingRules, $2.validator.normalizeRule(argument));
                  delete existingRules.messages;
                  staticRules[element.name] = existingRules;
                  if (argument.messages) {
                    settings2.messages[element.name] = $2.extend(settings2.messages[element.name], argument.messages);
                  }
                  break;
                case "remove":
                  if (!argument) {
                    delete staticRules[element.name];
                    return existingRules;
                  }
                  filtered = {};
                  $2.each(argument.split(/\s/), function(index, method) {
                    filtered[method] = existingRules[method];
                    delete existingRules[method];
                  });
                  return filtered;
              }
            }
            data2 = $2.validator.normalizeRules(
              $2.extend(
                {},
                $2.validator.classRules(element),
                $2.validator.attributeRules(element),
                $2.validator.dataRules(element),
                $2.validator.staticRules(element)
              ),
              element
            );
            if (data2.required) {
              param = data2.required;
              delete data2.required;
              data2 = $2.extend({ required: param }, data2);
            }
            if (data2.remote) {
              param = data2.remote;
              delete data2.remote;
              data2 = $2.extend(data2, { remote: param });
            }
            return data2;
          }
        });
        var trim = function(str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        };
        $2.extend($2.expr.pseudos || $2.expr[":"], {
          // '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support
          // https://jqueryvalidation.org/blank-selector/
          blank: function(a) {
            return !trim("" + $2(a).val());
          },
          // https://jqueryvalidation.org/filled-selector/
          filled: function(a) {
            var val = $2(a).val();
            return val !== null && !!trim("" + val);
          },
          // https://jqueryvalidation.org/unchecked-selector/
          unchecked: function(a) {
            return !$2(a).prop("checked");
          }
        });
        $2.validator = function(options, form) {
          this.settings = $2.extend(true, {}, $2.validator.defaults, options);
          this.currentForm = form;
          this.init();
        };
        $2.validator.format = function(source, params) {
          if (arguments.length === 1) {
            return function() {
              var args = $2.makeArray(arguments);
              args.unshift(source);
              return $2.validator.format.apply(this, args);
            };
          }
          if (params === void 0) {
            return source;
          }
          if (arguments.length > 2 && params.constructor !== Array) {
            params = $2.makeArray(arguments).slice(1);
          }
          if (params.constructor !== Array) {
            params = [params];
          }
          $2.each(params, function(i2, n2) {
            source = source.replace(new RegExp("\\{" + i2 + "\\}", "g"), function() {
              return n2;
            });
          });
          return source;
        };
        $2.extend($2.validator, {
          defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $2([]),
            errorLabelContainer: $2([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            customElements: [],
            onfocusin: function(element) {
              this.lastActive = element;
              if (this.settings.focusCleanup) {
                if (this.settings.unhighlight) {
                  this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                }
                this.hideThese(this.errorsFor(element));
              }
            },
            onfocusout: function(element) {
              if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                this.element(element);
              }
            },
            onkeyup: function(element, event) {
              var excludedKeys = [
                16,
                17,
                18,
                20,
                35,
                36,
                37,
                38,
                39,
                40,
                45,
                144,
                225
              ];
              if (event.which === 9 && this.elementValue(element) === "" || $2.inArray(event.keyCode, excludedKeys) !== -1) {
                return;
              } else if (element.name in this.submitted || element.name in this.invalid) {
                this.element(element);
              }
            },
            onclick: function(element) {
              if (element.name in this.submitted) {
                this.element(element);
              } else if (element.parentNode.name in this.submitted) {
                this.element(element.parentNode);
              }
            },
            highlight: function(element, errorClass, validClass) {
              if (element.type === "radio") {
                this.findByName(element.name).addClass(errorClass).removeClass(validClass);
              } else {
                $2(element).addClass(errorClass).removeClass(validClass);
              }
            },
            unhighlight: function(element, errorClass, validClass) {
              if (element.type === "radio") {
                this.findByName(element.name).removeClass(errorClass).addClass(validClass);
              } else {
                $2(element).removeClass(errorClass).addClass(validClass);
              }
            }
          },
          // https://jqueryvalidation.org/jQuery.validator.setDefaults/
          setDefaults: function(settings2) {
            $2.extend($2.validator.defaults, settings2);
          },
          messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: $2.validator.format("Please enter no more than {0} characters."),
            minlength: $2.validator.format("Please enter at least {0} characters."),
            rangelength: $2.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $2.validator.format("Please enter a value between {0} and {1}."),
            max: $2.validator.format("Please enter a value less than or equal to {0}."),
            min: $2.validator.format("Please enter a value greater than or equal to {0}."),
            step: $2.validator.format("Please enter a multiple of {0}.")
          },
          autoCreateRanges: false,
          prototype: {
            init: function() {
              this.labelContainer = $2(this.settings.errorLabelContainer);
              this.errorContext = this.labelContainer.length && this.labelContainer || $2(this.currentForm);
              this.containers = $2(this.settings.errorContainer).add(this.settings.errorLabelContainer);
              this.submitted = {};
              this.valueCache = {};
              this.pendingRequest = 0;
              this.pending = {};
              this.invalid = {};
              this.reset();
              var currentForm = this.currentForm, groups = this.groups = {}, rules;
              $2.each(this.settings.groups, function(key, value) {
                if (typeof value === "string") {
                  value = value.split(/\s/);
                }
                $2.each(value, function(index, name) {
                  groups[name] = key;
                });
              });
              rules = this.settings.rules;
              $2.each(rules, function(key, value) {
                rules[key] = $2.validator.normalizeRule(value);
              });
              function delegate(event) {
                var isContentEditable = typeof $2(this).attr("contenteditable") !== "undefined" && $2(this).attr("contenteditable") !== "false";
                if (!this.form && isContentEditable) {
                  this.form = $2(this).closest("form")[0];
                  this.name = $2(this).attr("name");
                }
                if (currentForm !== this.form) {
                  return;
                }
                var validator = $2.data(this.form, "validator"), eventType = "on" + event.type.replace(/^validate/, ""), settings2 = validator.settings;
                if (settings2[eventType] && !$2(this).is(settings2.ignore)) {
                  settings2[eventType].call(validator, this, event);
                }
              }
              var focusListeners = [
                ":text",
                "[type='password']",
                "[type='file']",
                "select",
                "textarea",
                "[type='number']",
                "[type='search']",
                "[type='tel']",
                "[type='url']",
                "[type='email']",
                "[type='datetime']",
                "[type='date']",
                "[type='month']",
                "[type='week']",
                "[type='time']",
                "[type='datetime-local']",
                "[type='range']",
                "[type='color']",
                "[type='radio']",
                "[type='checkbox']",
                "[contenteditable]",
                "[type='button']"
              ];
              var clickListeners = ["select", "option", "[type='radio']", "[type='checkbox']"];
              $2(this.currentForm).on("focusin.validate focusout.validate keyup.validate", focusListeners.concat(this.settings.customElements).join(", "), delegate).on("click.validate", clickListeners.concat(this.settings.customElements).join(", "), delegate);
              if (this.settings.invalidHandler) {
                $2(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
              }
            },
            // https://jqueryvalidation.org/Validator.form/
            form: function() {
              this.checkForm();
              $2.extend(this.submitted, this.errorMap);
              this.invalid = $2.extend({}, this.errorMap);
              if (!this.valid()) {
                $2(this.currentForm).triggerHandler("invalid-form", [this]);
              }
              this.showErrors();
              return this.valid();
            },
            checkForm: function() {
              this.prepareForm();
              for (var i2 = 0, elements = this.currentElements = this.elements(); elements[i2]; i2++) {
                this.check(elements[i2]);
              }
              return this.valid();
            },
            // https://jqueryvalidation.org/Validator.element/
            element: function(element) {
              var cleanElement = this.clean(element), checkElement = this.validationTargetFor(cleanElement), v = this, result = true, rs, group;
              if (checkElement === void 0) {
                delete this.invalid[cleanElement.name];
              } else {
                this.prepareElement(checkElement);
                this.currentElements = $2(checkElement);
                group = this.groups[checkElement.name];
                if (group) {
                  $2.each(this.groups, function(name, testgroup) {
                    if (testgroup === group && name !== checkElement.name) {
                      cleanElement = v.validationTargetFor(v.clean(v.findByName(name)));
                      if (cleanElement && cleanElement.name in v.invalid) {
                        v.currentElements.push(cleanElement);
                        result = v.check(cleanElement) && result;
                      }
                    }
                  });
                }
                rs = this.check(checkElement) !== false;
                result = result && rs;
                if (rs) {
                  this.invalid[checkElement.name] = false;
                } else {
                  this.invalid[checkElement.name] = true;
                }
                if (!this.numberOfInvalids()) {
                  this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                $2(element).attr("aria-invalid", !rs);
              }
              return result;
            },
            // https://jqueryvalidation.org/Validator.showErrors/
            showErrors: function(errors) {
              if (errors) {
                var validator = this;
                $2.extend(this.errorMap, errors);
                this.errorList = $2.map(this.errorMap, function(message, name) {
                  return {
                    message,
                    element: validator.findByName(name)[0]
                  };
                });
                this.successList = $2.grep(this.successList, function(element) {
                  return !(element.name in errors);
                });
              }
              if (this.settings.showErrors) {
                this.settings.showErrors.call(this, this.errorMap, this.errorList);
              } else {
                this.defaultShowErrors();
              }
            },
            // https://jqueryvalidation.org/Validator.resetForm/
            resetForm: function() {
              if ($2.fn.resetForm) {
                $2(this.currentForm).resetForm();
              }
              this.invalid = {};
              this.submitted = {};
              this.prepareForm();
              this.hideErrors();
              var elements = this.elements().removeData("previousValue").removeAttr("aria-invalid");
              this.resetElements(elements);
            },
            resetElements: function(elements) {
              var i2;
              if (this.settings.unhighlight) {
                for (i2 = 0; elements[i2]; i2++) {
                  this.settings.unhighlight.call(
                    this,
                    elements[i2],
                    this.settings.errorClass,
                    ""
                  );
                  this.findByName(elements[i2].name).removeClass(this.settings.validClass);
                }
              } else {
                elements.removeClass(this.settings.errorClass).removeClass(this.settings.validClass);
              }
            },
            numberOfInvalids: function() {
              return this.objectLength(this.invalid);
            },
            objectLength: function(obj2) {
              var count = 0, i2;
              for (i2 in obj2) {
                if (obj2[i2] !== void 0 && obj2[i2] !== null && obj2[i2] !== false) {
                  count++;
                }
              }
              return count;
            },
            hideErrors: function() {
              this.hideThese(this.toHide);
            },
            hideThese: function(errors) {
              errors.not(this.containers).text("");
              this.addWrapper(errors).hide();
            },
            valid: function() {
              return this.size() === 0;
            },
            size: function() {
              return this.errorList.length;
            },
            focusInvalid: function() {
              if (this.settings.focusInvalid) {
                try {
                  $2(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin");
                } catch (e) {
                }
              }
            },
            findLastActive: function() {
              var lastActive = this.lastActive;
              return lastActive && $2.grep(this.errorList, function(n2) {
                return n2.element.name === lastActive.name;
              }).length === 1 && lastActive;
            },
            elements: function() {
              var validator = this, rulesCache = {}, selectors = ["input", "select", "textarea", "[contenteditable]"];
              return $2(this.currentForm).find(selectors.concat(this.settings.customElements).join(", ")).not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                var name = this.name || $2(this).attr("name");
                var isContentEditable = typeof $2(this).attr("contenteditable") !== "undefined" && $2(this).attr("contenteditable") !== "false";
                if (!name && validator.settings.debug && window.console) {
                  console.error("%o has no name assigned", this);
                }
                if (isContentEditable) {
                  this.form = $2(this).closest("form")[0];
                  this.name = name;
                }
                if (this.form !== validator.currentForm) {
                  return false;
                }
                if (name in rulesCache || !validator.objectLength($2(this).rules())) {
                  return false;
                }
                rulesCache[name] = true;
                return true;
              });
            },
            clean: function(selector) {
              return $2(selector)[0];
            },
            errors: function() {
              var errorClass = this.settings.errorClass.split(" ").join(".");
              return $2(this.settings.errorElement + "." + errorClass, this.errorContext);
            },
            resetInternals: function() {
              this.successList = [];
              this.errorList = [];
              this.errorMap = {};
              this.toShow = $2([]);
              this.toHide = $2([]);
            },
            reset: function() {
              this.resetInternals();
              this.currentElements = $2([]);
            },
            prepareForm: function() {
              this.reset();
              this.toHide = this.errors().add(this.containers);
            },
            prepareElement: function(element) {
              this.reset();
              this.toHide = this.errorsFor(element);
            },
            elementValue: function(element) {
              var $element2 = $2(element), type = element.type, isContentEditable = typeof $element2.attr("contenteditable") !== "undefined" && $element2.attr("contenteditable") !== "false", val, idx;
              if (type === "radio" || type === "checkbox") {
                return this.findByName(element.name).filter(":checked").val();
              } else if (type === "number" && typeof element.validity !== "undefined") {
                return element.validity.badInput ? "NaN" : $element2.val();
              }
              if (isContentEditable) {
                val = $element2.text();
              } else {
                val = $element2.val();
              }
              if (type === "file") {
                if (val.substr(0, 12) === "C:\\fakepath\\") {
                  return val.substr(12);
                }
                idx = val.lastIndexOf("/");
                if (idx >= 0) {
                  return val.substr(idx + 1);
                }
                idx = val.lastIndexOf("\\");
                if (idx >= 0) {
                  return val.substr(idx + 1);
                }
                return val;
              }
              if (typeof val === "string") {
                return val.replace(/\r/g, "");
              }
              return val;
            },
            check: function(element) {
              element = this.validationTargetFor(this.clean(element));
              var rules = $2(element).rules(), rulesCount = $2.map(rules, function(n2, i2) {
                return i2;
              }).length, dependencyMismatch = false, val = this.elementValue(element), result, method, rule, normalizer;
              this.abortRequest(element);
              if (typeof rules.normalizer === "function") {
                normalizer = rules.normalizer;
              } else if (typeof this.settings.normalizer === "function") {
                normalizer = this.settings.normalizer;
              }
              if (normalizer) {
                val = normalizer.call(element, val);
                delete rules.normalizer;
              }
              for (method in rules) {
                rule = { method, parameters: rules[method] };
                try {
                  result = $2.validator.methods[method].call(this, val, element, rule.parameters);
                  if (result === "dependency-mismatch" && rulesCount === 1) {
                    dependencyMismatch = true;
                    continue;
                  }
                  dependencyMismatch = false;
                  if (result === "pending") {
                    this.toHide = this.toHide.not(this.errorsFor(element));
                    return;
                  }
                  if (!result) {
                    this.formatAndAdd(element, rule);
                    return false;
                  }
                } catch (e) {
                  if (this.settings.debug && window.console) {
                    console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                  }
                  if (e instanceof TypeError) {
                    e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                  }
                  throw e;
                }
              }
              if (dependencyMismatch) {
                return;
              }
              if (this.objectLength(rules)) {
                this.successList.push(element);
              }
              return true;
            },
            // Return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function(element, method) {
              return $2(element).data("msg" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase()) || $2(element).data("msg");
            },
            // Return the custom message for the given element name and validation method
            customMessage: function(name, method) {
              var m = this.settings.messages[name];
              return m && (m.constructor === String ? m : m[method]);
            },
            // Return the first defined argument, allowing empty strings
            findDefined: function() {
              for (var i2 = 0; i2 < arguments.length; i2++) {
                if (arguments[i2] !== void 0) {
                  return arguments[i2];
                }
              }
              return void 0;
            },
            // The second parameter 'rule' used to be a string, and extended to an object literal
            // of the following form:
            // rule = {
            //     method: "method name",
            //     parameters: "the given method parameters"
            // }
            //
            // The old behavior still supported, kept to maintain backward compatibility with
            // old code, and will be removed in the next major release.
            defaultMessage: function(element, rule) {
              if (typeof rule === "string") {
                rule = { method: rule };
              }
              var message = this.findDefined(
                this.customMessage(element.name, rule.method),
                this.customDataMessage(element, rule.method),
                // 'title' is never undefined, so handle empty string as undefined
                !this.settings.ignoreTitle && element.title || void 0,
                $2.validator.messages[rule.method],
                "<strong>Warning: No message defined for " + element.name + "</strong>"
              ), theregex = /\$?\{(\d+)\}/g;
              if (typeof message === "function") {
                message = message.call(this, rule.parameters, element);
              } else if (theregex.test(message)) {
                message = $2.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
              }
              return message;
            },
            formatAndAdd: function(element, rule) {
              var message = this.defaultMessage(element, rule);
              this.errorList.push({
                message,
                element,
                method: rule.method
              });
              this.errorMap[element.name] = message;
              this.submitted[element.name] = message;
            },
            addWrapper: function(toToggle) {
              if (this.settings.wrapper) {
                toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
              }
              return toToggle;
            },
            defaultShowErrors: function() {
              var i2, elements, error;
              for (i2 = 0; this.errorList[i2]; i2++) {
                error = this.errorList[i2];
                if (this.settings.highlight) {
                  this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                }
                this.showLabel(error.element, error.message);
              }
              if (this.errorList.length) {
                this.toShow = this.toShow.add(this.containers);
              }
              if (this.settings.success) {
                for (i2 = 0; this.successList[i2]; i2++) {
                  this.showLabel(this.successList[i2]);
                }
              }
              if (this.settings.unhighlight) {
                for (i2 = 0, elements = this.validElements(); elements[i2]; i2++) {
                  this.settings.unhighlight.call(this, elements[i2], this.settings.errorClass, this.settings.validClass);
                }
              }
              this.toHide = this.toHide.not(this.toShow);
              this.hideErrors();
              this.addWrapper(this.toShow).show();
            },
            validElements: function() {
              return this.currentElements.not(this.invalidElements());
            },
            invalidElements: function() {
              return $2(this.errorList).map(function() {
                return this.element;
              });
            },
            showLabel: function(element, message) {
              var place, group, errorID, v, error = this.errorsFor(element), elementID = this.idOrName(element), describedBy = $2(element).attr("aria-describedby");
              if (error.length) {
                error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                if (this.settings && this.settings.escapeHtml) {
                  error.text(message || "");
                } else {
                  error.html(message || "");
                }
              } else {
                error = $2("<" + this.settings.errorElement + ">").attr("id", elementID + "-error").addClass(this.settings.errorClass);
                if (this.settings && this.settings.escapeHtml) {
                  error.text(message || "");
                } else {
                  error.html(message || "");
                }
                place = error;
                if (this.settings.wrapper) {
                  place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                }
                if (this.labelContainer.length) {
                  this.labelContainer.append(place);
                } else if (this.settings.errorPlacement) {
                  this.settings.errorPlacement.call(this, place, $2(element));
                } else {
                  place.insertAfter(element);
                }
                if (error.is("label")) {
                  error.attr("for", elementID);
                } else if (error.parents("label[for='" + this.escapeCssMeta(elementID) + "']").length === 0) {
                  errorID = error.attr("id");
                  if (!describedBy) {
                    describedBy = errorID;
                  } else if (!describedBy.match(new RegExp("\\b" + this.escapeCssMeta(errorID) + "\\b"))) {
                    describedBy += " " + errorID;
                  }
                  $2(element).attr("aria-describedby", describedBy);
                  group = this.groups[element.name];
                  if (group) {
                    v = this;
                    $2.each(v.groups, function(name, testgroup) {
                      if (testgroup === group) {
                        $2("[name='" + v.escapeCssMeta(name) + "']", v.currentForm).attr("aria-describedby", error.attr("id"));
                      }
                    });
                  }
                }
              }
              if (!message && this.settings.success) {
                error.text("");
                if (typeof this.settings.success === "string") {
                  error.addClass(this.settings.success);
                } else {
                  this.settings.success(error, element);
                }
              }
              this.toShow = this.toShow.add(error);
            },
            errorsFor: function(element) {
              var name = this.escapeCssMeta(this.idOrName(element)), describer = $2(element).attr("aria-describedby"), selector = "label[for='" + name + "'], label[for='" + name + "'] *";
              if (describer) {
                selector = selector + ", #" + this.escapeCssMeta(describer).replace(/\s+/g, ", #");
              }
              return this.errors().filter(selector);
            },
            // See https://api.jquery.com/category/selectors/, for CSS
            // meta-characters that should be escaped in order to be used with JQuery
            // as a literal part of a name/id or any selector.
            escapeCssMeta: function(string) {
              if (string === void 0) {
                return "";
              }
              return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },
            idOrName: function(element) {
              return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },
            validationTargetFor: function(element) {
              if (this.checkable(element)) {
                element = this.findByName(element.name);
              }
              return $2(element).not(this.settings.ignore)[0];
            },
            checkable: function(element) {
              return /radio|checkbox/i.test(element.type);
            },
            findByName: function(name) {
              return $2(this.currentForm).find("[name='" + this.escapeCssMeta(name) + "']");
            },
            getLength: function(value, element) {
              switch (element.nodeName.toLowerCase()) {
                case "select":
                  return $2("option:selected", element).length;
                case "input":
                  if (this.checkable(element)) {
                    return this.findByName(element.name).filter(":checked").length;
                  }
              }
              return value.length;
            },
            depend: function(param, element) {
              return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },
            dependTypes: {
              "boolean": function(param) {
                return param;
              },
              "string": function(param, element) {
                return !!$2(param, element.form).length;
              },
              "function": function(param, element) {
                return param(element);
              }
            },
            optional: function(element) {
              var val = this.elementValue(element);
              return !$2.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },
            elementAjaxPort: function(element) {
              return "validate" + element.name;
            },
            startRequest: function(element) {
              if (!this.pending[element.name]) {
                this.pendingRequest++;
                $2(element).addClass(this.settings.pendingClass);
                this.pending[element.name] = true;
              }
            },
            stopRequest: function(element, valid) {
              this.pendingRequest--;
              if (this.pendingRequest < 0) {
                this.pendingRequest = 0;
              }
              delete this.pending[element.name];
              $2(element).removeClass(this.settings.pendingClass);
              if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form() && this.pendingRequest === 0) {
                $2(this.currentForm).trigger("submit");
                if (this.submitButton) {
                  $2("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove();
                }
                this.formSubmitted = false;
              } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                $2(this.currentForm).triggerHandler("invalid-form", [this]);
                this.formSubmitted = false;
              }
            },
            abortRequest: function(element) {
              var port;
              if (this.pending[element.name]) {
                port = this.elementAjaxPort(element);
                $2.ajaxAbort(port);
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                  this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                $2(element).removeClass(this.settings.pendingClass);
              }
            },
            previousValue: function(element, method) {
              method = typeof method === "string" && method || "remote";
              return $2.data(element, "previousValue") || $2.data(element, "previousValue", {
                old: null,
                valid: true,
                message: this.defaultMessage(element, { method })
              });
            },
            // Cleans up all forms and elements, removes validator-specific events
            destroy: function() {
              this.resetForm();
              $2(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur");
            }
          },
          classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            number: { number: true },
            digits: { digits: true },
            creditcard: { creditcard: true }
          },
          addClassRules: function(className, rules) {
            if (className.constructor === String) {
              this.classRuleSettings[className] = rules;
            } else {
              $2.extend(this.classRuleSettings, className);
            }
          },
          classRules: function(element) {
            var rules = {}, classes = $2(element).attr("class");
            if (classes) {
              $2.each(classes.split(" "), function() {
                if (this in $2.validator.classRuleSettings) {
                  $2.extend(rules, $2.validator.classRuleSettings[this]);
                }
              });
            }
            return rules;
          },
          normalizeAttributeRule: function(rules, type, method, value) {
            if (/min|max|step/.test(method) && (type === null || /number|range|text/.test(type))) {
              value = Number(value);
              if (isNaN(value)) {
                value = void 0;
              }
            }
            if (value || value === 0) {
              rules[method] = value;
            } else if (type === method && type !== "range") {
              rules[type === "date" ? "dateISO" : method] = true;
            }
          },
          attributeRules: function(element) {
            var rules = {}, $element2 = $2(element), type = element.getAttribute("type"), method, value;
            for (method in $2.validator.methods) {
              if (method === "required") {
                value = element.getAttribute(method);
                if (value === "") {
                  value = true;
                }
                value = !!value;
              } else {
                value = $element2.attr(method);
              }
              this.normalizeAttributeRule(rules, type, method, value);
            }
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
              delete rules.maxlength;
            }
            return rules;
          },
          dataRules: function(element) {
            var rules = {}, $element2 = $2(element), type = element.getAttribute("type"), method, value;
            for (method in $2.validator.methods) {
              value = $element2.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
              if (value === "") {
                value = true;
              }
              this.normalizeAttributeRule(rules, type, method, value);
            }
            return rules;
          },
          staticRules: function(element) {
            var rules = {}, validator = $2.data(element.form, "validator");
            if (validator.settings.rules) {
              rules = $2.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
          },
          normalizeRules: function(rules, element) {
            $2.each(rules, function(prop, val) {
              if (val === false) {
                delete rules[prop];
                return;
              }
              if (val.param || val.depends) {
                var keepRule = true;
                switch (typeof val.depends) {
                  case "string":
                    keepRule = !!$2(val.depends, element.form).length;
                    break;
                  case "function":
                    keepRule = val.depends.call(element, element);
                    break;
                }
                if (keepRule) {
                  rules[prop] = val.param !== void 0 ? val.param : true;
                } else {
                  $2.data(element.form, "validator").resetElements($2(element));
                  delete rules[prop];
                }
              }
            });
            $2.each(rules, function(rule, parameter) {
              rules[rule] = typeof parameter === "function" && rule !== "normalizer" ? parameter(element) : parameter;
            });
            $2.each(["minlength", "maxlength"], function() {
              if (rules[this]) {
                rules[this] = Number(rules[this]);
              }
            });
            $2.each(["rangelength", "range"], function() {
              var parts;
              if (rules[this]) {
                if (Array.isArray(rules[this])) {
                  rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                } else if (typeof rules[this] === "string") {
                  parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                  rules[this] = [Number(parts[0]), Number(parts[1])];
                }
              }
            });
            if ($2.validator.autoCreateRanges) {
              if (rules.min != null && rules.max != null) {
                rules.range = [rules.min, rules.max];
                delete rules.min;
                delete rules.max;
              }
              if (rules.minlength != null && rules.maxlength != null) {
                rules.rangelength = [rules.minlength, rules.maxlength];
                delete rules.minlength;
                delete rules.maxlength;
              }
            }
            return rules;
          },
          // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
          normalizeRule: function(data2) {
            if (typeof data2 === "string") {
              var transformed = {};
              $2.each(data2.split(/\s/), function() {
                transformed[this] = true;
              });
              data2 = transformed;
            }
            return data2;
          },
          // https://jqueryvalidation.org/jQuery.validator.addMethod/
          addMethod: function(name, method, message) {
            $2.validator.methods[name] = method;
            $2.validator.messages[name] = message !== void 0 ? message : $2.validator.messages[name];
            if (method.length < 3) {
              $2.validator.addClassRules(name, $2.validator.normalizeRule(name));
            }
          },
          // https://jqueryvalidation.org/jQuery.validator.methods/
          methods: {
            // https://jqueryvalidation.org/required-method/
            required: function(value, element, param) {
              if (!this.depend(param, element)) {
                return "dependency-mismatch";
              }
              if (element.nodeName.toLowerCase() === "select") {
                var val = $2(element).val();
                return val && val.length > 0;
              }
              if (this.checkable(element)) {
                return this.getLength(value, element) > 0;
              }
              return value !== void 0 && value !== null && value.length > 0;
            },
            // https://jqueryvalidation.org/email-method/
            email: function(value, element) {
              return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            // https://jqueryvalidation.org/url-method/
            url: function(value, element) {
              return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
            },
            // https://jqueryvalidation.org/date-method/
            date: /* @__PURE__ */ (function() {
              var called = false;
              return function(value, element) {
                if (!called) {
                  called = true;
                  if (this.settings.debug && window.console) {
                    console.warn(
                      "The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`."
                    );
                  }
                }
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
              };
            })(),
            // https://jqueryvalidation.org/dateISO-method/
            dateISO: function(value, element) {
              return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },
            // https://jqueryvalidation.org/number-method/
            number: function(value, element) {
              return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:-?\.\d+)?$/.test(value);
            },
            // https://jqueryvalidation.org/digits-method/
            digits: function(value, element) {
              return this.optional(element) || /^\d+$/.test(value);
            },
            // https://jqueryvalidation.org/minlength-method/
            minlength: function(value, element, param) {
              var length = Array.isArray(value) ? value.length : this.getLength(value, element);
              return this.optional(element) || length >= param;
            },
            // https://jqueryvalidation.org/maxlength-method/
            maxlength: function(value, element, param) {
              var length = Array.isArray(value) ? value.length : this.getLength(value, element);
              return this.optional(element) || length <= param;
            },
            // https://jqueryvalidation.org/rangelength-method/
            rangelength: function(value, element, param) {
              var length = Array.isArray(value) ? value.length : this.getLength(value, element);
              return this.optional(element) || length >= param[0] && length <= param[1];
            },
            // https://jqueryvalidation.org/min-method/
            min: function(value, element, param) {
              return this.optional(element) || value >= param;
            },
            // https://jqueryvalidation.org/max-method/
            max: function(value, element, param) {
              return this.optional(element) || value <= param;
            },
            // https://jqueryvalidation.org/range-method/
            range: function(value, element, param) {
              return this.optional(element) || value >= param[0] && value <= param[1];
            },
            // https://jqueryvalidation.org/step-method/
            step: function(value, element, param) {
              var type = $2(element).attr("type"), errorMessage = "Step attribute on input type " + type + " is not supported.", supportedTypes = ["text", "number", "range"], re = new RegExp("\\b" + type + "\\b"), notSupported = type && !re.test(supportedTypes.join()), decimalPlaces = function(num) {
                var match = ("" + num).match(/(?:\.(\d+))?$/);
                if (!match) {
                  return 0;
                }
                return match[1] ? match[1].length : 0;
              }, toInt = function(num) {
                return Math.round(num * Math.pow(10, decimals));
              }, valid = true, decimals;
              if (notSupported) {
                throw new Error(errorMessage);
              }
              decimals = decimalPlaces(param);
              if (decimalPlaces(value) > decimals || toInt(value) % toInt(param) !== 0) {
                valid = false;
              }
              return this.optional(element) || valid;
            },
            // https://jqueryvalidation.org/equalTo-method/
            equalTo: function(value, element, param) {
              var target = $2(param);
              if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
                target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                  $2(element).valid();
                });
              }
              return value === target.val();
            },
            // https://jqueryvalidation.org/remote-method/
            remote: function(value, element, param, method) {
              if (this.optional(element)) {
                return "dependency-mismatch";
              }
              method = typeof method === "string" && method || "remote";
              var previous = this.previousValue(element, method), validator, data2, optionDataString;
              if (!this.settings.messages[element.name]) {
                this.settings.messages[element.name] = {};
              }
              previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];
              this.settings.messages[element.name][method] = previous.message;
              param = typeof param === "string" && { url: param } || param;
              optionDataString = $2.param($2.extend({ data: value }, param.data));
              if (previous.valid !== null && previous.old === optionDataString) {
                return previous.valid;
              }
              previous.old = optionDataString;
              previous.valid = null;
              validator = this;
              this.startRequest(element);
              data2 = {};
              data2[element.name] = value;
              $2.ajax($2.extend(true, {
                mode: "abort",
                port: this.elementAjaxPort(element),
                dataType: "json",
                data: data2,
                context: validator.currentForm,
                success: function(response) {
                  var valid = response === true || response === "true", errors, message, submitted;
                  validator.settings.messages[element.name][method] = previous.originalMessage;
                  if (valid) {
                    submitted = validator.formSubmitted;
                    validator.toHide = validator.errorsFor(element);
                    validator.formSubmitted = submitted;
                    validator.successList.push(element);
                    validator.invalid[element.name] = false;
                    validator.showErrors();
                  } else {
                    errors = {};
                    message = response || validator.defaultMessage(element, { method, parameters: value });
                    errors[element.name] = previous.message = message;
                    validator.invalid[element.name] = true;
                    validator.showErrors(errors);
                  }
                  previous.valid = valid;
                  validator.stopRequest(element, valid);
                }
              }, param));
              return "pending";
            }
          }
        });
        var pendingRequests = {}, ajax;
        if ($2.ajaxPrefilter) {
          $2.ajaxPrefilter(function(settings2, _, xhr) {
            var port = settings2.port;
            if (settings2.mode === "abort") {
              $2.ajaxAbort(port);
              pendingRequests[port] = xhr;
            }
          });
        } else {
          ajax = $2.ajax;
          $2.ajax = function(settings2) {
            var mode = ("mode" in settings2 ? settings2 : $2.ajaxSettings).mode, port = ("port" in settings2 ? settings2 : $2.ajaxSettings).port;
            if (mode === "abort") {
              $2.ajaxAbort(port);
              pendingRequests[port] = ajax.apply(this, arguments);
              return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
          };
        }
        $2.ajaxAbort = function(port) {
          if (pendingRequests[port]) {
            pendingRequests[port].abort();
            delete pendingRequests[port];
          }
        };
        return $2;
      });
    }
  });

  // js/vendor-extra/popupWindow.js
  var require_popupWindow = __commonJS({
    "js/vendor-extra/popupWindow.js"() {
      var popupWindow = null;
      var watch = null;
      (function($2) {
        $2.fn.popupWindow = function(instanceSettings) {
          return this.each(function() {
            $2(this).off("click");
            $2(this).click(function() {
              $2.fn.popupWindow.defaultSettings = {
                unload: null,
                centerBrowser: 0,
                // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
                centerScreen: 0,
                // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
                height: 500,
                // sets the height in pixels of the window.
                left: 0,
                // left position when the window appears.
                location: 0,
                // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
                menubar: 0,
                // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
                resizable: 0,
                // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
                scrollbars: 0,
                // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
                status: 0,
                // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
                width: 500,
                // sets the width in pixels of the window.
                windowName: null,
                // name of window set from the name attribute of the element that invokes the click
                windowURL: null,
                // url used for the popup
                top: 0,
                // top position when the window appears.
                toolbar: 0
                // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
              };
              settings = $2.extend({}, $2.fn.popupWindow.defaultSettings, instanceSettings || {});
              var windowFeatures = "height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ",status=" + settings.status + ",resizable=" + settings.resizable + ",location=" + settings.location + ",menuBar=" + settings.menubar;
              settings.windowName = this.name || settings.windowName;
              settings.windowURL = this.href || settings.windowURL;
              var centeredY, centeredX;
              if (watch != null) {
                clearInterval(watch);
              }
              if (popupWindow != null) {
                popupWindow.close();
              }
              if (settings.centerBrowser) {
                if ($2.browser.msie) {
                  centeredY = window.screenTop - 120 + ((document.documentElement.clientHeight + 120) / 2 - settings.height / 2);
                  centeredX = window.screenLeft + ((document.body.offsetWidth + 20) / 2 - settings.width / 2);
                } else {
                  centeredY = window.screenY + (window.outerHeight / 2 - settings.height / 2);
                  centeredX = window.screenX + (window.outerWidth / 2 - settings.width / 2);
                }
                popupWindow = window.open(settings.windowURL, settings.windowName, windowFeatures + ",left=" + centeredX + ",top=" + centeredY);
                popupWindow.focus();
              } else if (settings.centerScreen) {
                centeredY = (screen.height - settings.height) / 2;
                centeredX = (screen.width - settings.width) / 2;
                popupWindow = window.open(settings.windowURL, settings.windowName, windowFeatures + ",left=" + centeredX + ",top=" + centeredY);
                popupWindow.focus();
              } else {
                popupWindow = window.open(settings.windowURL, settings.windowName, windowFeatures + ",left=" + settings.left + ",top=" + settings.top);
                popupWindow.focus();
              }
              if (settings.unload != null) {
                watch = setInterval(
                  function() {
                    if (popupWindow.closed == true) {
                      settings.unload();
                      clearInterval(watch);
                    }
                  },
                  200
                );
              }
              return false;
            });
          });
        };
      })(jQuery);
    }
  });

  // js/vendor-extra/jquery.polyglot.language.switcher.js
  var require_jquery_polyglot_language_switcher = __commonJS({
    "js/vendor-extra/jquery.polyglot.language.switcher.js"(exports, module) {
      (function($) {
        $.timer = function(func, time, autostart) {
          this.set = function(func, time, autostart) {
            this.init = true;
            if (typeof func == "object") {
              var paramList = ["autostart", "time"];
              for (var arg in paramList) {
                if (func[paramList[arg]] != void 0) {
                  eval(paramList[arg] + " = func[paramList[arg]]");
                }
              }
              ;
              func = func.action;
            }
            if (typeof func == "function") {
              this.action = func;
            }
            if (!isNaN(time)) {
              this.intervalTime = time;
            }
            if (autostart && !this.active) {
              this.active = true;
              this.setTimer();
            }
            return this;
          };
          this.once = function(time2) {
            var timer = this;
            if (isNaN(time2)) {
              time2 = 0;
            }
            window.setTimeout(function() {
              timer.action();
            }, time2);
            return this;
          };
          this.play = function(reset) {
            if (!this.active) {
              if (reset) {
                this.setTimer();
              } else {
                this.setTimer(this.remaining);
              }
              this.active = true;
            }
            return this;
          };
          this.pause = function() {
            if (this.active) {
              this.active = false;
              this.remaining -= /* @__PURE__ */ new Date() - this.last;
              this.clearTimer();
            }
            return this;
          };
          this.stop = function() {
            this.active = false;
            this.remaining = this.intervalTime;
            this.clearTimer();
            return this;
          };
          this.toggle = function(reset) {
            if (this.active) {
              this.pause();
            } else if (reset) {
              this.play(true);
            } else {
              this.play();
            }
            return this;
          };
          this.reset = function() {
            this.active = false;
            this.play(true);
            return this;
          };
          this.clearTimer = function() {
            window.clearTimeout(this.timeoutObject);
          };
          this.setTimer = function(time2) {
            var timer = this;
            if (typeof this.action != "function") {
              return;
            }
            if (isNaN(time2)) {
              time2 = this.intervalTime;
            }
            this.remaining = time2;
            this.last = /* @__PURE__ */ new Date();
            this.clearTimer();
            this.timeoutObject = window.setTimeout(function() {
              timer.go();
            }, time2);
          };
          this.go = function() {
            if (this.active) {
              this.action();
              this.setTimer();
            }
          };
          if (this.init) {
            return new $.timer(func, time, autostart);
          } else {
            this.set(func, time, autostart);
            return this;
          }
        };
        $.fn.polyglotLanguageSwitcher = function(op) {
          var ls2 = $.fn.polyglotLanguageSwitcher;
          var rootElement = $(this);
          var rootElementId = $(this).attr("id");
          var aElement;
          var ulElement = $('<ul class="dropdown">');
          var length = 0;
          var isOpen = false;
          var liElements = [];
          var settings2 = $.extend({}, ls2.defaults, op);
          var closePopupTimer;
          var isStaticWebSite = settings2.websiteType == "static";
          init();
          installListeners();
          function triggerEvent(evt) {
            if (settings2[evt.name]) {
              settings2[evt.name].call($(this), evt);
            }
          }
          function open() {
            if (!isOpen) {
              triggerEvent({ name: "beforeOpen", element: rootElement, instance: ls2 });
              aElement.addClass("active");
              doAnimation(true);
              setTimeout(function() {
                isOpen = true;
                triggerEvent({ name: "afterOpen", element: rootElement, instance: ls2 });
              }, 100);
            }
          }
          function close() {
            if (isOpen) {
              triggerEvent({ name: "beforeClose", element: rootElement, instance: ls2 });
              doAnimation(false);
              aElement.removeClass("active");
              isOpen = false;
              if (closePopupTimer && closePopupTimer.active) {
                closePopupTimer.clearTimer();
              }
              triggerEvent({ name: "afterClose", element: rootElement, instance: ls2 });
            }
          }
          function suspendCloseAction() {
            if (closePopupTimer && closePopupTimer.active) {
              closePopupTimer.pause();
            }
          }
          function resumeCloseAction() {
            if (closePopupTimer) {
              closePopupTimer.play(false);
            }
          }
          function doAnimation(open2) {
            if (settings2.effect == "fade") {
              if (open2) {
                ulElement.fadeIn(settings2.animSpeed);
              } else {
                ulElement.fadeOut(settings2.animSpeed);
              }
            } else {
              if (open2) {
                ulElement.slideDown(settings2.animSpeed);
              } else {
                ulElement.slideUp(settings2.animSpeed);
              }
            }
          }
          function doAction(item) {
            close();
            var selectedAElement = $(item).children(":first-child");
            var selectedId = $(selectedAElement).attr("id");
            var selectedText = $(selectedAElement).text();
            $(ulElement).children().each(function() {
              $(this).detach();
            });
            for (var i2 = 0; i2 < liElements.length; i2++) {
              if ($(liElements[i2]).children(":first-child").attr("id") != selectedId) {
                ulElement.append(liElements[i2]);
              }
            }
            var innerSpanElement = aElement.children(":first-child");
            aElement.attr("id", selectedId);
            aElement.text(selectedText);
            aElement.append(innerSpanElement);
          }
          function installListeners() {
            $(document).click(function() {
              close();
            });
            $(document).keyup(function(e) {
              if (e.which == 27) {
                close();
              }
            });
            if (settings2.openMode == "hover") {
              closePopupTimer = $.timer(function() {
                close();
              });
              closePopupTimer.set({ time: settings2.hoverTimeout, autostart: true });
            }
          }
          function init() {
            var selectedItem;
            var options = $("#" + rootElementId + " > form > select > option");
            if (isStaticWebSite) {
              var selectedId;
              var url = window.location.href;
              options.each(function() {
                var id = $(this).attr("id");
                if (url.indexOf("/" + id + "/") >= 0) {
                  selectedId = id;
                }
              });
            }
            options.each(function() {
              var id = $(this).attr("id");
              var selected;
              if (isStaticWebSite) {
                selected = selectedId === id;
              } else {
                selected = $(this).attr("selected");
              }
              var liElement = toLiElement($(this));
              if (selected) {
                selectedItem = liElement;
              }
              liElements.push(liElement);
              if (length > 0) {
                ulElement.append(liElement);
              } else {
                aElement = $('<a id="' + $(this).attr("id") + '" class="current" href="#">' + $(this).text() + ' <span class="trigger">&raquo;</span></a>');
                if (settings2.openMode == "hover") {
                  aElement.hover(function() {
                    open();
                    suspendCloseAction();
                  }, function() {
                    resumeCloseAction();
                  });
                } else {
                  aElement.click(
                    function() {
                      open();
                    }
                  );
                }
              }
              length++;
            });
            $("#" + rootElementId + " form:first-child").remove();
            rootElement.append(aElement);
            rootElement.append(ulElement);
            if (selectedItem) {
              doAction(selectedItem);
            }
          }
          function toLiElement(option) {
            var id = $(option).attr("id");
            var value = $(option).attr("value");
            var text = $(option).text();
            var liElement;
            if (isStaticWebSite) {
              var url = window.location.href;
              var page = url.substring(url.lastIndexOf("/") + 1);
              var urlPage = "http://" + document.domain + "/" + settings2.pagePrefix + id + "/" + page;
              liElement = $('<li><a id="' + id + '" href="' + urlPage + '">' + text + "</a></li>");
            } else {
              var href = document.URL.replace("#", "");
              var params = parseQueryString();
              params[settings2.paramName] = value;
              if (href.indexOf("?") > 0) {
                href = href.substring(0, href.indexOf("?"));
              }
              href += toQueryString(params);
              liElement = $('<li><a id="' + id + '" href="' + href + '">' + text + "</a></li>");
            }
            liElement.bind("click", function() {
              triggerEvent({ name: "onChange", selectedItem: $(this).children(":first").attr("id"), element: rootElement, instance: ls2 });
              doAction($(this));
            });
            if (settings2.openMode == "hover") {
              liElement.hover(function() {
                suspendCloseAction();
              }, function() {
                resumeCloseAction();
              });
            }
            return liElement;
          }
          function parseQueryString() {
            var params = {};
            var query = window.location.search.substr(1).split("&");
            if (query.length > 0) {
              for (var i2 = 0; i2 < query.length; ++i2) {
                var p = query[i2].split("=");
                if (p.length != 2) {
                  continue;
                }
                params[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
              }
            }
            return params;
          }
          function toQueryString(params) {
            if (settings2.testMode) {
              return "#";
            } else {
              var queryString = "?";
              var i2 = 0;
              for (var param in params) {
                var x = "";
                if (i2 > 0) {
                  x = "&";
                }
                queryString += x + param + "=" + params[param];
                i2++;
              }
              return queryString;
            }
          }
          ls2.open = function() {
            open();
          };
          ls2.close = function() {
            close();
          };
          triggerEvent({ name: "afterLoad", element: rootElement, instance: ls2 });
          return ls2;
        };
        var ls = $.fn.polyglotLanguageSwitcher;
        ls.defaults = {
          openMode: "click",
          hoverTimeout: 1500,
          animSpeed: 200,
          effect: "slide",
          paramName: "lang",
          pagePrefix: "",
          websiteType: "dynamic",
          testMode: false,
          onChange: NaN,
          afterLoad: NaN,
          beforeOpen: NaN,
          afterOpen: NaN,
          beforeClose: NaN,
          afterClose: NaN
        };
      })(jQuery);
    }
  });

  // node_modules/nanoscroller/bin/javascripts/jquery.nanoscroller.js
  var require_jquery_nanoscroller = __commonJS({
    "node_modules/nanoscroller/bin/javascripts/jquery.nanoscroller.js"(exports2, module2) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          return define(["jquery"], function($2) {
            return factory($2, window, document);
          });
        } else if (typeof exports2 === "object") {
          return module2.exports = factory(require_jquery(), window, document);
        } else {
          return factory(jQuery, window, document);
        }
      })(function($2, window2, document2) {
        "use strict";
        var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, ENTER, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEENTER, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, cAF, defaults, getBrowserScrollbarWidth, hasTransform, isFFWithBuggyScrollbar, rAF, transform, _elementStyle, _prefixStyle, _vendor;
        defaults = {
          /**
            a classname for the pane element.
            @property paneClass
            @type String
            @default 'nano-pane'
           */
          paneClass: "nano-pane",
          /**
            a classname for the slider element.
            @property sliderClass
            @type String
            @default 'nano-slider'
           */
          sliderClass: "nano-slider",
          /**
            a classname for the content element.
            @property contentClass
            @type String
            @default 'nano-content'
           */
          contentClass: "nano-content",
          /**
            a setting to enable native scrolling in iOS devices.
            @property iOSNativeScrolling
            @type Boolean
            @default false
           */
          iOSNativeScrolling: false,
          /**
            a setting to prevent the rest of the page being
            scrolled when user scrolls the `.content` element.
            @property preventPageScrolling
            @type Boolean
            @default false
           */
          preventPageScrolling: false,
          /**
            a setting to disable binding to the resize event.
            @property disableResize
            @type Boolean
            @default false
           */
          disableResize: false,
          /**
            a setting to make the scrollbar always visible.
            @property alwaysVisible
            @type Boolean
            @default false
           */
          alwaysVisible: false,
          /**
            a default timeout for the `flash()` method.
            @property flashDelay
            @type Number
            @default 1500
           */
          flashDelay: 1500,
          /**
            a minimum height for the `.slider` element.
            @property sliderMinHeight
            @type Number
            @default 20
           */
          sliderMinHeight: 20,
          /**
            a maximum height for the `.slider` element.
            @property sliderMaxHeight
            @type Number
            @default null
           */
          sliderMaxHeight: null,
          /**
            an alternate document context.
            @property documentContext
            @type Document
            @default null
           */
          documentContext: null,
          /**
            an alternate window context.
            @property windowContext
            @type Window
            @default null
           */
          windowContext: null
        };
        SCROLLBAR = "scrollbar";
        SCROLL = "scroll";
        MOUSEDOWN = "mousedown";
        MOUSEENTER = "mouseenter";
        MOUSEMOVE = "mousemove";
        MOUSEWHEEL = "mousewheel";
        MOUSEUP = "mouseup";
        RESIZE = "resize";
        DRAG = "drag";
        ENTER = "enter";
        UP = "up";
        PANEDOWN = "panedown";
        DOMSCROLL = "DOMMouseScroll";
        DOWN = "down";
        WHEEL = "wheel";
        KEYDOWN = "keydown";
        KEYUP = "keyup";
        TOUCHMOVE = "touchmove";
        BROWSER_IS_IE7 = window2.navigator.appName === "Microsoft Internet Explorer" && /msie 7./i.test(window2.navigator.appVersion) && window2.ActiveXObject;
        BROWSER_SCROLLBAR_WIDTH = null;
        rAF = window2.requestAnimationFrame;
        cAF = window2.cancelAnimationFrame;
        _elementStyle = document2.createElement("div").style;
        _vendor = (function() {
          var i2, transform2, vendor, vendors, _i, _len;
          vendors = ["t", "webkitT", "MozT", "msT", "OT"];
          for (i2 = _i = 0, _len = vendors.length; _i < _len; i2 = ++_i) {
            vendor = vendors[i2];
            transform2 = vendors[i2] + "ransform";
            if (transform2 in _elementStyle) {
              return vendors[i2].substr(0, vendors[i2].length - 1);
            }
          }
          return false;
        })();
        _prefixStyle = function(style) {
          if (_vendor === false) {
            return false;
          }
          if (_vendor === "") {
            return style;
          }
          return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        };
        transform = _prefixStyle("transform");
        hasTransform = transform !== false;
        getBrowserScrollbarWidth = function() {
          var outer, outerStyle, scrollbarWidth;
          outer = document2.createElement("div");
          outerStyle = outer.style;
          outerStyle.position = "absolute";
          outerStyle.width = "100px";
          outerStyle.height = "100px";
          outerStyle.overflow = SCROLL;
          outerStyle.top = "-9999px";
          document2.body.appendChild(outer);
          scrollbarWidth = outer.offsetWidth - outer.clientWidth;
          document2.body.removeChild(outer);
          return scrollbarWidth;
        };
        isFFWithBuggyScrollbar = function() {
          var isOSXFF, ua, version;
          ua = window2.navigator.userAgent;
          isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
          if (!isOSXFF) {
            return false;
          }
          version = /Firefox\/\d{2}\./.exec(ua);
          if (version) {
            version = version[0].replace(/\D+/g, "");
          }
          return isOSXFF && +version > 23;
        };
        NanoScroll = (function() {
          function NanoScroll2(el, options) {
            this.el = el;
            this.options = options;
            BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
            this.$el = $2(this.el);
            this.doc = $2(this.options.documentContext || document2);
            this.win = $2(this.options.windowContext || window2);
            this.body = this.doc.find("body");
            this.$content = this.$el.children("." + this.options.contentClass);
            this.$content.attr("tabindex", this.options.tabIndex || 0);
            this.content = this.$content[0];
            this.previousPosition = 0;
            if (this.options.iOSNativeScrolling && this.el.style.WebkitOverflowScrolling != null) {
              this.nativeScrolling();
            } else {
              this.generate();
            }
            this.createEvents();
            this.addEvents();
            this.reset();
          }
          NanoScroll2.prototype.preventScrolling = function(e, direction) {
            if (!this.isActive) {
              return;
            }
            if (e.type === DOMSCROLL) {
              if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
                e.preventDefault();
              }
            } else if (e.type === MOUSEWHEEL) {
              if (!e.originalEvent || !e.originalEvent.wheelDelta) {
                return;
              }
              if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
                e.preventDefault();
              }
            }
          };
          NanoScroll2.prototype.nativeScrolling = function() {
            this.$content.css({
              WebkitOverflowScrolling: "touch"
            });
            this.iOSNativeScrolling = true;
            this.isActive = true;
          };
          NanoScroll2.prototype.updateScrollValues = function() {
            var content, direction;
            content = this.content;
            this.maxScrollTop = content.scrollHeight - content.clientHeight;
            this.prevScrollTop = this.contentScrollTop || 0;
            this.contentScrollTop = content.scrollTop;
            direction = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same";
            this.previousPosition = this.contentScrollTop;
            if (direction !== "same") {
              this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction
              });
            }
            if (!this.iOSNativeScrolling) {
              this.maxSliderTop = this.paneHeight - this.sliderHeight;
              this.sliderTop = this.maxScrollTop === 0 ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
            }
          };
          NanoScroll2.prototype.setOnScrollStyles = function() {
            var cssValue;
            if (hasTransform) {
              cssValue = {};
              cssValue[transform] = "translate(0, " + this.sliderTop + "px)";
            } else {
              cssValue = {
                top: this.sliderTop
              };
            }
            if (rAF) {
              if (cAF && this.scrollRAF) {
                cAF(this.scrollRAF);
              }
              this.scrollRAF = rAF(/* @__PURE__ */ (function(_this) {
                return function() {
                  _this.scrollRAF = null;
                  return _this.slider.css(cssValue);
                };
              })(this));
            } else {
              this.slider.css(cssValue);
            }
          };
          NanoScroll2.prototype.createEvents = function() {
            this.events = {
              down: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  _this.isBeingDragged = true;
                  _this.offsetY = e.pageY - _this.slider.offset().top;
                  if (!_this.slider.is(e.target)) {
                    _this.offsetY = 0;
                  }
                  _this.pane.addClass("active");
                  _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
                  _this.body.bind(MOUSEENTER, _this.events[ENTER]);
                  return false;
                };
              })(this),
              drag: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  _this.sliderY = e.pageY - _this.$el.offset().top - _this.paneTop - (_this.offsetY || _this.sliderHeight * 0.5);
                  _this.scroll();
                  if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
                    _this.$el.trigger("scrollend");
                  } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
                    _this.$el.trigger("scrolltop");
                  }
                  return false;
                };
              })(this),
              up: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  _this.isBeingDragged = false;
                  _this.pane.removeClass("active");
                  _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
                  _this.body.unbind(MOUSEENTER, _this.events[ENTER]);
                  return false;
                };
              })(this),
              resize: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  _this.reset();
                };
              })(this),
              panedown: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  _this.sliderY = (e.offsetY || e.originalEvent.layerY) - _this.sliderHeight * 0.5;
                  _this.scroll();
                  _this.events.down(e);
                  return false;
                };
              })(this),
              scroll: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  _this.updateScrollValues();
                  if (_this.isBeingDragged) {
                    return;
                  }
                  if (!_this.iOSNativeScrolling) {
                    _this.sliderY = _this.sliderTop;
                    _this.setOnScrollStyles();
                  }
                  if (e == null) {
                    return;
                  }
                  if (_this.contentScrollTop >= _this.maxScrollTop) {
                    if (_this.options.preventPageScrolling) {
                      _this.preventScrolling(e, DOWN);
                    }
                    if (_this.prevScrollTop !== _this.maxScrollTop) {
                      _this.$el.trigger("scrollend");
                    }
                  } else if (_this.contentScrollTop === 0) {
                    if (_this.options.preventPageScrolling) {
                      _this.preventScrolling(e, UP);
                    }
                    if (_this.prevScrollTop !== 0) {
                      _this.$el.trigger("scrolltop");
                    }
                  }
                };
              })(this),
              wheel: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  var delta;
                  if (e == null) {
                    return;
                  }
                  delta = e.delta || e.wheelDelta || e.originalEvent && e.originalEvent.wheelDelta || -e.detail || e.originalEvent && -e.originalEvent.detail;
                  if (delta) {
                    _this.sliderY += -delta / 3;
                  }
                  _this.scroll();
                  return false;
                };
              })(this),
              enter: /* @__PURE__ */ (function(_this) {
                return function(e) {
                  var _ref;
                  if (!_this.isBeingDragged) {
                    return;
                  }
                  if ((e.buttons || e.which) !== 1) {
                    return (_ref = _this.events)[UP].apply(_ref, arguments);
                  }
                };
              })(this)
            };
          };
          NanoScroll2.prototype.addEvents = function() {
            var events;
            this.removeEvents();
            events = this.events;
            if (!this.options.disableResize) {
              this.win.bind(RESIZE, events[RESIZE]);
            }
            if (!this.iOSNativeScrolling) {
              this.slider.bind(MOUSEDOWN, events[DOWN]);
              this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
            }
            this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
          };
          NanoScroll2.prototype.removeEvents = function() {
            var events;
            events = this.events;
            this.win.unbind(RESIZE, events[RESIZE]);
            if (!this.iOSNativeScrolling) {
              this.slider.unbind();
              this.pane.unbind();
            }
            this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
          };
          NanoScroll2.prototype.generate = function() {
            var contentClass, cssRule, currentPadding, options, pane, paneClass, sliderClass;
            options = this.options;
            paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
            if (!(pane = this.$el.children("." + paneClass)).length && !pane.children("." + sliderClass).length) {
              this.$el.append('<div class="' + paneClass + '"><div class="' + sliderClass + '" /></div>');
            }
            this.pane = this.$el.children("." + paneClass);
            this.slider = this.pane.find("." + sliderClass);
            if (BROWSER_SCROLLBAR_WIDTH === 0 && isFFWithBuggyScrollbar()) {
              currentPadding = window2.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, "");
              cssRule = {
                right: -14,
                paddingRight: +currentPadding + 14
              };
            } else if (BROWSER_SCROLLBAR_WIDTH) {
              cssRule = {
                right: -BROWSER_SCROLLBAR_WIDTH
              };
              this.$el.addClass("has-scrollbar");
            }
            if (cssRule != null) {
              this.$content.css(cssRule);
            }
            return this;
          };
          NanoScroll2.prototype.restore = function() {
            this.stopped = false;
            if (!this.iOSNativeScrolling) {
              this.pane.show();
            }
            this.addEvents();
          };
          NanoScroll2.prototype.reset = function() {
            var content, contentHeight, contentPosition, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, right, sliderHeight;
            if (this.iOSNativeScrolling) {
              this.contentHeight = this.content.scrollHeight;
              return;
            }
            if (!this.$el.find("." + this.options.paneClass).length) {
              this.generate().stop();
            }
            if (this.stopped) {
              this.restore();
            }
            content = this.content;
            contentStyle = content.style;
            contentStyleOverflowY = contentStyle.overflowY;
            if (BROWSER_IS_IE7) {
              this.$content.css({
                height: this.$content.height()
              });
            }
            contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
            parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
            if (parentMaxHeight > 0) {
              this.$el.height("");
              this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
            }
            paneHeight = this.pane.outerHeight(false);
            paneTop = parseInt(this.pane.css("top"), 10);
            paneBottom = parseInt(this.pane.css("bottom"), 10);
            paneOuterHeight = paneHeight + paneTop + paneBottom;
            sliderHeight = Math.round(paneOuterHeight / contentHeight * paneHeight);
            if (sliderHeight < this.options.sliderMinHeight) {
              sliderHeight = this.options.sliderMinHeight;
            } else if (this.options.sliderMaxHeight != null && sliderHeight > this.options.sliderMaxHeight) {
              sliderHeight = this.options.sliderMaxHeight;
            }
            if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
              sliderHeight += BROWSER_SCROLLBAR_WIDTH;
            }
            this.maxSliderTop = paneOuterHeight - sliderHeight;
            this.contentHeight = contentHeight;
            this.paneHeight = paneHeight;
            this.paneOuterHeight = paneOuterHeight;
            this.sliderHeight = sliderHeight;
            this.paneTop = paneTop;
            this.slider.height(sliderHeight);
            this.events.scroll();
            this.pane.show();
            this.isActive = true;
            if (content.scrollHeight === content.clientHeight || this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL) {
              this.pane.hide();
              this.isActive = false;
            } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
              this.slider.hide();
            } else {
              this.slider.show();
            }
            this.pane.css({
              opacity: this.options.alwaysVisible ? 1 : "",
              visibility: this.options.alwaysVisible ? "visible" : ""
            });
            contentPosition = this.$content.css("position");
            if (contentPosition === "static" || contentPosition === "relative") {
              right = parseInt(this.$content.css("right"), 10);
              if (right) {
                this.$content.css({
                  right: "",
                  marginRight: right
                });
              }
            }
            return this;
          };
          NanoScroll2.prototype.scroll = function() {
            if (!this.isActive) {
              return;
            }
            this.sliderY = Math.max(0, this.sliderY);
            this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
            this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop);
            if (!this.iOSNativeScrolling) {
              this.updateScrollValues();
              this.setOnScrollStyles();
            }
            return this;
          };
          NanoScroll2.prototype.scrollBottom = function(offsetY) {
            if (!this.isActive) {
              return;
            }
            this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
            this.stop().restore();
            return this;
          };
          NanoScroll2.prototype.scrollTop = function(offsetY) {
            if (!this.isActive) {
              return;
            }
            this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
            this.stop().restore();
            return this;
          };
          NanoScroll2.prototype.scrollTo = function(node) {
            if (!this.isActive) {
              return;
            }
            this.scrollTop(this.$el.find(node).get(0).offsetTop);
            return this;
          };
          NanoScroll2.prototype.stop = function() {
            if (cAF && this.scrollRAF) {
              cAF(this.scrollRAF);
              this.scrollRAF = null;
            }
            this.stopped = true;
            this.removeEvents();
            if (!this.iOSNativeScrolling) {
              this.pane.hide();
            }
            return this;
          };
          NanoScroll2.prototype.destroy = function() {
            if (!this.stopped) {
              this.stop();
            }
            if (!this.iOSNativeScrolling && this.pane.length) {
              this.pane.remove();
            }
            if (BROWSER_IS_IE7) {
              this.$content.height("");
            }
            this.$content.removeAttr("tabindex");
            if (this.$el.hasClass("has-scrollbar")) {
              this.$el.removeClass("has-scrollbar");
              this.$content.css({
                right: ""
              });
            }
            return this;
          };
          NanoScroll2.prototype.flash = function() {
            if (this.iOSNativeScrolling) {
              return;
            }
            if (!this.isActive) {
              return;
            }
            this.reset();
            this.pane.addClass("flashed");
            setTimeout(/* @__PURE__ */ (function(_this) {
              return function() {
                _this.pane.removeClass("flashed");
              };
            })(this), this.options.flashDelay);
            return this;
          };
          return NanoScroll2;
        })();
        $2.fn.nanoScroller = function(settings2) {
          return this.each(function() {
            var options, scrollbar;
            if (!(scrollbar = this.nanoscroller)) {
              options = $2.extend({}, defaults, settings2);
              this.nanoscroller = scrollbar = new NanoScroll(this, options);
            }
            if (settings2 && typeof settings2 === "object") {
              $2.extend(scrollbar.options, settings2);
              if (settings2.scrollBottom != null) {
                return scrollbar.scrollBottom(settings2.scrollBottom);
              }
              if (settings2.scrollTop != null) {
                return scrollbar.scrollTop(settings2.scrollTop);
              }
              if (settings2.scrollTo) {
                return scrollbar.scrollTo(settings2.scrollTo);
              }
              if (settings2.scroll === "bottom") {
                return scrollbar.scrollBottom(0);
              }
              if (settings2.scroll === "top") {
                return scrollbar.scrollTop(0);
              }
              if (settings2.scroll && settings2.scroll instanceof $2) {
                return scrollbar.scrollTo(settings2.scroll);
              }
              if (settings2.stop) {
                return scrollbar.stop();
              }
              if (settings2.destroy) {
                return scrollbar.destroy();
              }
              if (settings2.flash) {
                return scrollbar.flash();
              }
            }
            return scrollbar.reset();
          });
        };
        $2.fn.nanoScroller.Constructor = NanoScroll;
      });
    }
  });

  // js/vendor-extra/jquery.cookie.js
  var require_jquery_cookie = __commonJS({
    "js/vendor-extra/jquery.cookie.js"(exports2) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define(["jquery"], factory);
        } else if (typeof exports2 === "object") {
          factory(require_jquery());
        } else {
          factory(jQuery);
        }
      })(function($2) {
        var pluses = /\+/g;
        function encode(s) {
          return config.raw ? s : encodeURIComponent(s);
        }
        function decode(s) {
          return config.raw ? s : decodeURIComponent(s);
        }
        function stringifyCookieValue(value) {
          return encode(config.json ? JSON.stringify(value) : String(value));
        }
        function parseCookieValue(s) {
          if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
          }
          try {
            s = decodeURIComponent(s.replace(pluses, " "));
            return config.json ? JSON.parse(s) : s;
          } catch (e) {
          }
        }
        function read(s, converter) {
          var value = config.raw ? s : parseCookieValue(s);
          return $2.isFunction(converter) ? converter(value) : value;
        }
        var config = $2.cookie = function(key, value, options) {
          if (value !== void 0 && !$2.isFunction(value)) {
            options = $2.extend({}, config.defaults, options);
            if (typeof options.expires === "number") {
              var days = options.expires, t = options.expires = /* @__PURE__ */ new Date();
              t.setTime(+t + days * 864e5);
            }
            return document.cookie = [
              encode(key),
              "=",
              stringifyCookieValue(value),
              options.expires ? "; expires=" + options.expires.toUTCString() : "",
              // use expires attribute, max-age is not supported by IE
              options.path ? "; path=" + options.path : "",
              options.domain ? "; domain=" + options.domain : "",
              options.secure ? "; secure" : ""
            ].join("");
          }
          var result = key ? void 0 : {};
          var cookies = document.cookie ? document.cookie.split("; ") : [];
          for (var i2 = 0, l = cookies.length; i2 < l; i2++) {
            var parts = cookies[i2].split("=");
            var name = decode(parts.shift());
            var cookie = parts.join("=");
            if (key && key === name) {
              result = read(cookie, value);
              break;
            }
            if (!key && (cookie = read(cookie)) !== void 0) {
              result[name] = cookie;
            }
          }
          return result;
        };
        config.defaults = {};
        $2.removeCookie = function(key, options) {
          if ($2.cookie(key) === void 0) {
            return false;
          }
          $2.cookie(key, "", $2.extend({}, options, { expires: -1 }));
          return !$2.cookie(key);
        };
      });
    }
  });

  // node_modules/jquery-mousewheel/jquery.mousewheel.js
  var require_jquery_mousewheel = __commonJS({
    "node_modules/jquery-mousewheel/jquery.mousewheel.js"(exports2, module2) {
      (function(factory) {
        "use strict";
        if (typeof define === "function" && define.amd) {
          define(["jquery"], factory);
        } else if (typeof exports2 === "object") {
          module2.exports = factory;
        } else {
          factory(jQuery);
        }
      })(function($2) {
        "use strict";
        var nullLowestDeltaTimeout, lowestDelta, modernEvents = !!$2.fn.on, toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], toBind = "onwheel" in window.document || window.document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], slice = Array.prototype.slice;
        if ($2.event.fixHooks) {
          for (var i2 = toFix.length; i2; ) {
            $2.event.fixHooks[toFix[--i2]] = $2.event.mouseHooks;
          }
        }
        var special = $2.event.special.mousewheel = {
          version: "3.2.2",
          setup: function() {
            if (this.addEventListener) {
              for (var i3 = toBind.length; i3; ) {
                this.addEventListener(toBind[--i3], handler, false);
              }
            } else {
              this.onmousewheel = handler;
            }
            $2.data(this, "mousewheel-line-height", special.getLineHeight(this));
            $2.data(this, "mousewheel-page-height", special.getPageHeight(this));
          },
          teardown: function() {
            if (this.removeEventListener) {
              for (var i3 = toBind.length; i3; ) {
                this.removeEventListener(toBind[--i3], handler, false);
              }
            } else {
              this.onmousewheel = null;
            }
            $2.removeData(this, "mousewheel-line-height");
            $2.removeData(this, "mousewheel-page-height");
          },
          getLineHeight: function(elem) {
            var $elem = $2(elem), $parent = $elem["offsetParent" in $2.fn ? "offsetParent" : "parent"]();
            if (!$parent.length) {
              $parent = $2("body");
            }
            return parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16;
          },
          getPageHeight: function(elem) {
            return $2(elem).height();
          },
          settings: {
            adjustOldDeltas: true,
            // see shouldAdjustOldDeltas() below
            normalizeOffset: true
            // calls getBoundingClientRect for each event
          }
        };
        $2.fn.extend({
          mousewheel: function(fn) {
            return fn ? this[modernEvents ? "on" : "bind"]("mousewheel", fn) : this.trigger("mousewheel");
          },
          unmousewheel: function(fn) {
            return this[modernEvents ? "off" : "unbind"]("mousewheel", fn);
          }
        });
        function handler(event) {
          var orgEvent = event || window.event, args = slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0;
          event = $2.event.fix(orgEvent);
          event.type = "mousewheel";
          if ("detail" in orgEvent) {
            deltaY = orgEvent.detail * -1;
          }
          if ("wheelDelta" in orgEvent) {
            deltaY = orgEvent.wheelDelta;
          }
          if ("wheelDeltaY" in orgEvent) {
            deltaY = orgEvent.wheelDeltaY;
          }
          if ("wheelDeltaX" in orgEvent) {
            deltaX = orgEvent.wheelDeltaX * -1;
          }
          if ("axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaX = deltaY * -1;
            deltaY = 0;
          }
          delta = deltaY === 0 ? deltaX : deltaY;
          if ("deltaY" in orgEvent) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
          }
          if ("deltaX" in orgEvent) {
            deltaX = orgEvent.deltaX;
            if (deltaY === 0) {
              delta = deltaX * -1;
            }
          }
          if (deltaY === 0 && deltaX === 0) {
            return;
          }
          if (orgEvent.deltaMode === 1) {
            var lineHeight = $2.data(this, "mousewheel-line-height");
            delta *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
          } else if (orgEvent.deltaMode === 2) {
            var pageHeight = $2.data(this, "mousewheel-page-height");
            delta *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
          }
          absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
          if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;
            if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
              lowestDelta /= 40;
            }
          }
          if (shouldAdjustOldDeltas(orgEvent, absDelta)) {
            delta /= 40;
            deltaX /= 40;
            deltaY /= 40;
          }
          delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta);
          deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta);
          deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta);
          if (special.settings.normalizeOffset && this.getBoundingClientRect) {
            var boundingRect = this.getBoundingClientRect();
            event.offsetX = event.clientX - boundingRect.left;
            event.offsetY = event.clientY - boundingRect.top;
          }
          event.deltaX = deltaX;
          event.deltaY = deltaY;
          event.deltaFactor = lowestDelta;
          event.deltaMode = 0;
          args.unshift(event, delta, deltaX, deltaY);
          if (nullLowestDeltaTimeout) {
            window.clearTimeout(nullLowestDeltaTimeout);
          }
          nullLowestDeltaTimeout = window.setTimeout(function() {
            lowestDelta = null;
          }, 200);
          return ($2.event.dispatch || $2.event.handle).apply(this, args);
        }
        function shouldAdjustOldDeltas(orgEvent, absDelta) {
          return special.settings.adjustOldDeltas && orgEvent.type === "mousewheel" && absDelta % 120 === 0;
        }
      });
    }
  });

  // js/vendor-extra/toastr.min.js
  var require_toastr_min = __commonJS({
    "js/vendor-extra/toastr.min.js"(exports2, module2) {
      !(function(e) {
        e(["jquery"], function(e2) {
          return /* @__PURE__ */ (function() {
            function t(e3, t2, n3) {
              return g({ type: O.error, iconClass: m().iconClasses.error, message: e3, optionsOverride: n3, title: t2 });
            }
            function n2(t2, n3) {
              return t2 || (t2 = m()), v = e2("#" + t2.containerId), v.length ? v : (n3 && (v = d(t2)), v);
            }
            function o(e3, t2, n3) {
              return g({ type: O.info, iconClass: m().iconClasses.info, message: e3, optionsOverride: n3, title: t2 });
            }
            function s(e3) {
              C = e3;
            }
            function i2(e3, t2, n3) {
              return g({ type: O.success, iconClass: m().iconClasses.success, message: e3, optionsOverride: n3, title: t2 });
            }
            function a(e3, t2, n3) {
              return g({ type: O.warning, iconClass: m().iconClasses.warning, message: e3, optionsOverride: n3, title: t2 });
            }
            function r2(e3, t2) {
              var o2 = m();
              v || n2(o2), u(e3, o2, t2) || l(o2);
            }
            function c(t2) {
              var o2 = m();
              return v || n2(o2), t2 && 0 === e2(":focus", t2).length ? void h(t2) : void (v.children().length && v.remove());
            }
            function l(t2) {
              for (var n3 = v.children(), o2 = n3.length - 1; o2 >= 0; o2--) u(e2(n3[o2]), t2);
            }
            function u(t2, n3, o2) {
              var s2 = !(!o2 || !o2.force) && o2.force;
              return !(!t2 || !s2 && 0 !== e2(":focus", t2).length) && (t2[n3.hideMethod]({ duration: n3.hideDuration, easing: n3.hideEasing, complete: function() {
                h(t2);
              } }), true);
            }
            function d(t2) {
              return v = e2("<div/>").attr("id", t2.containerId).addClass(t2.positionClass), v.appendTo(e2(t2.target)), v;
            }
            function p() {
              return { tapToDismiss: true, toastClass: "toast", containerId: "toast-container", debug: false, showMethod: "fadeIn", showDuration: 300, showEasing: "swing", onShown: void 0, hideMethod: "fadeOut", hideDuration: 1e3, hideEasing: "swing", onHidden: void 0, closeMethod: false, closeDuration: false, closeEasing: false, closeOnHover: true, extendedTimeOut: 1e3, iconClasses: { error: "toast-error", info: "toast-info", success: "toast-success", warning: "toast-warning" }, iconClass: "toast-info", positionClass: "toast-top-right", timeOut: 5e3, titleClass: "toast-title", messageClass: "toast-message", escapeHtml: false, target: "body", closeHtml: '<button type="button">&times;</button>', closeClass: "toast-close-button", newestOnTop: true, preventDuplicates: false, progressBar: false, progressClass: "toast-progress", rtl: false };
            }
            function f(e3) {
              C && C(e3);
            }
            function g(t2) {
              function o2(e3) {
                return null == e3 && (e3 = ""), e3.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
              }
              function s2() {
                c2(), u2(), d2(), p2(), g2(), C2(), l2(), i3();
              }
              function i3() {
                var e3 = "";
                switch (t2.iconClass) {
                  case "toast-success":
                  case "toast-info":
                    e3 = "polite";
                    break;
                  default:
                    e3 = "assertive";
                }
                I.attr("aria-live", e3);
              }
              function a2() {
                E.closeOnHover && I.hover(H, D), !E.onclick && E.tapToDismiss && I.click(b2), E.closeButton && j2 && j2.click(function(e3) {
                  e3.stopPropagation ? e3.stopPropagation() : void 0 !== e3.cancelBubble && e3.cancelBubble !== true && (e3.cancelBubble = true), E.onCloseClick && E.onCloseClick(e3), b2(true);
                }), E.onclick && I.click(function(e3) {
                  E.onclick(e3), b2();
                });
              }
              function r3() {
                I.hide(), I[E.showMethod]({ duration: E.showDuration, easing: E.showEasing, complete: E.onShown }), E.timeOut > 0 && (k = setTimeout(b2, E.timeOut), F.maxHideTime = parseFloat(E.timeOut), F.hideEta = (/* @__PURE__ */ new Date()).getTime() + F.maxHideTime, E.progressBar && (F.intervalId = setInterval(x, 10)));
              }
              function c2() {
                t2.iconClass && I.addClass(E.toastClass).addClass(y);
              }
              function l2() {
                E.newestOnTop ? v.prepend(I) : v.append(I);
              }
              function u2() {
                if (t2.title) {
                  var e3 = t2.title;
                  E.escapeHtml && (e3 = o2(t2.title)), M.append(e3).addClass(E.titleClass), I.append(M);
                }
              }
              function d2() {
                if (t2.message) {
                  var e3 = t2.message;
                  E.escapeHtml && (e3 = o2(t2.message)), B.append(e3).addClass(E.messageClass), I.append(B);
                }
              }
              function p2() {
                E.closeButton && (j2.addClass(E.closeClass).attr("role", "button"), I.prepend(j2));
              }
              function g2() {
                E.progressBar && (q.addClass(E.progressClass), I.prepend(q));
              }
              function C2() {
                E.rtl && I.addClass("rtl");
              }
              function O2(e3, t3) {
                if (e3.preventDuplicates) {
                  if (t3.message === w) return true;
                  w = t3.message;
                }
                return false;
              }
              function b2(t3) {
                var n3 = t3 && E.closeMethod !== false ? E.closeMethod : E.hideMethod, o3 = t3 && E.closeDuration !== false ? E.closeDuration : E.hideDuration, s3 = t3 && E.closeEasing !== false ? E.closeEasing : E.hideEasing;
                if (!e2(":focus", I).length || t3) return clearTimeout(F.intervalId), I[n3]({ duration: o3, easing: s3, complete: function() {
                  h(I), clearTimeout(k), E.onHidden && "hidden" !== P.state && E.onHidden(), P.state = "hidden", P.endTime = /* @__PURE__ */ new Date(), f(P);
                } });
              }
              function D() {
                (E.timeOut > 0 || E.extendedTimeOut > 0) && (k = setTimeout(b2, E.extendedTimeOut), F.maxHideTime = parseFloat(E.extendedTimeOut), F.hideEta = (/* @__PURE__ */ new Date()).getTime() + F.maxHideTime);
              }
              function H() {
                clearTimeout(k), F.hideEta = 0, I.stop(true, true)[E.showMethod]({ duration: E.showDuration, easing: E.showEasing });
              }
              function x() {
                var e3 = (F.hideEta - (/* @__PURE__ */ new Date()).getTime()) / F.maxHideTime * 100;
                q.width(e3 + "%");
              }
              var E = m(), y = t2.iconClass || E.iconClass;
              if ("undefined" != typeof t2.optionsOverride && (E = e2.extend(E, t2.optionsOverride), y = t2.optionsOverride.iconClass || y), !O2(E, t2)) {
                T++, v = n2(E, true);
                var k = null, I = e2("<div/>"), M = e2("<div/>"), B = e2("<div/>"), q = e2("<div/>"), j2 = e2(E.closeHtml), F = { intervalId: null, hideEta: null, maxHideTime: null }, P = { toastId: T, state: "visible", startTime: /* @__PURE__ */ new Date(), options: E, map: t2 };
                return s2(), r3(), a2(), f(P), E.debug && console && console.log(P), I;
              }
            }
            function m() {
              return e2.extend({}, p(), b.options);
            }
            function h(e3) {
              v || (v = n2()), e3.is(":visible") || (e3.remove(), e3 = null, 0 === v.children().length && (v.remove(), w = void 0));
            }
            var v, C, w, T = 0, O = { error: "error", info: "info", success: "success", warning: "warning" }, b = { clear: r2, remove: c, error: t, getContainer: n2, info: o, options: {}, subscribe: s, success: i2, version: "2.1.4", warning: a };
            return b;
          })();
        });
      })("function" == typeof define && define.amd ? define : function(e, t) {
        "undefined" != typeof module2 && module2.exports ? module2.exports = t(require_jquery()) : window.toastr = t(window.jQuery);
      });
    }
  });

  // node_modules/jquery-smooth-scroll/jquery.smooth-scroll.js
  var require_jquery_smooth_scroll = __commonJS({
    "node_modules/jquery-smooth-scroll/jquery.smooth-scroll.js"(exports2, module2) {
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define(["jquery"], factory);
        } else if (typeof module2 === "object" && module2.exports) {
          factory(require_jquery());
        } else {
          factory(jQuery);
        }
      })(function($2) {
        var version = "2.2.0";
        var optionOverrides = {};
        var defaults = {
          exclude: [],
          excludeWithin: [],
          offset: 0,
          // one of 'top' or 'left'
          direction: "top",
          // if set, bind click events through delegation
          //  supported since jQuery 1.4.2
          delegateSelector: null,
          // jQuery set of elements you wish to scroll (for $.smoothScroll).
          //  if null (default), $('html, body').firstScrollable() is used.
          scrollElement: null,
          // only use if you want to override default behavior
          scrollTarget: null,
          // automatically focus the target element after scrolling to it
          autoFocus: false,
          // fn(opts) function to be called before scrolling occurs.
          // `this` is the element(s) being scrolled
          beforeScroll: function() {
          },
          // fn(opts) function to be called after scrolling occurs.
          // `this` is the triggering element
          afterScroll: function() {
          },
          // easing name. jQuery comes with "swing" and "linear." For others, you'll need an easing plugin
          // from jQuery UI or elsewhere
          easing: "swing",
          // speed can be a number or 'auto'
          // if 'auto', the speed will be calculated based on the formula:
          // (current scroll position - target scroll position) / autoCoeffic
          speed: 400,
          // coefficient for "auto" speed
          autoCoefficient: 2,
          // $.fn.smoothScroll only: whether to prevent the default click action
          preventDefault: true
        };
        var getScrollable = function(opts) {
          var scrollable = [];
          var scrolled = false;
          var dir = opts.dir && opts.dir === "left" ? "scrollLeft" : "scrollTop";
          this.each(function() {
            var el = $2(this);
            if (this === document || this === window) {
              return;
            }
            if (document.scrollingElement && (this === document.documentElement || this === document.body)) {
              scrollable.push(document.scrollingElement);
              return false;
            }
            if (el[dir]() > 0) {
              scrollable.push(this);
            } else {
              el[dir](1);
              scrolled = el[dir]() > 0;
              if (scrolled) {
                scrollable.push(this);
              }
              el[dir](0);
            }
          });
          if (!scrollable.length) {
            this.each(function() {
              if (this === document.documentElement && $2(this).css("scrollBehavior") === "smooth") {
                scrollable = [this];
              }
              if (!scrollable.length && this.nodeName === "BODY") {
                scrollable = [this];
              }
            });
          }
          if (opts.el === "first" && scrollable.length > 1) {
            scrollable = [scrollable[0]];
          }
          return scrollable;
        };
        var rRelative = /^([\-\+]=)(\d+)/;
        $2.fn.extend({
          scrollable: function(dir) {
            var scrl = getScrollable.call(this, { dir });
            return this.pushStack(scrl);
          },
          firstScrollable: function(dir) {
            var scrl = getScrollable.call(this, { el: "first", dir });
            return this.pushStack(scrl);
          },
          smoothScroll: function(options, extra) {
            options = options || {};
            if (options === "options") {
              if (!extra) {
                return this.first().data("ssOpts");
              }
              return this.each(function() {
                var $this = $2(this);
                var opts2 = $2.extend($this.data("ssOpts") || {}, extra);
                $2(this).data("ssOpts", opts2);
              });
            }
            var opts = $2.extend({}, $2.fn.smoothScroll.defaults, options);
            var clickHandler = function(event) {
              var escapeSelector = function(str) {
                return str.replace(/(:|\.|\/)/g, "\\$1");
              };
              var link = this;
              var $link = $2(this);
              var thisOpts = $2.extend({}, opts, $link.data("ssOpts") || {});
              var exclude = opts.exclude;
              var excludeWithin = thisOpts.excludeWithin;
              var elCounter = 0;
              var ewlCounter = 0;
              var include = true;
              var clickOpts = {};
              var locationPath = $2.smoothScroll.filterPath(location.pathname);
              var linkPath = $2.smoothScroll.filterPath(link.pathname);
              var hostMatch = location.hostname === link.hostname || !link.hostname;
              var pathMatch = thisOpts.scrollTarget || linkPath === locationPath;
              var thisHash = escapeSelector(link.hash);
              if (thisHash && !$2(thisHash).length) {
                include = false;
              }
              if (!thisOpts.scrollTarget && (!hostMatch || !pathMatch || !thisHash)) {
                include = false;
              } else {
                while (include && elCounter < exclude.length) {
                  if ($link.is(escapeSelector(exclude[elCounter++]))) {
                    include = false;
                  }
                }
                while (include && ewlCounter < excludeWithin.length) {
                  if ($link.closest(excludeWithin[ewlCounter++]).length) {
                    include = false;
                  }
                }
              }
              if (include) {
                if (thisOpts.preventDefault) {
                  event.preventDefault();
                }
                $2.extend(clickOpts, thisOpts, {
                  scrollTarget: thisOpts.scrollTarget || thisHash,
                  link
                });
                $2.smoothScroll(clickOpts);
              }
            };
            if (options.delegateSelector !== null) {
              this.off("click.smoothscroll", options.delegateSelector).on("click.smoothscroll", options.delegateSelector, clickHandler);
            } else {
              this.off("click.smoothscroll").on("click.smoothscroll", clickHandler);
            }
            return this;
          }
        });
        var getExplicitOffset = function(val) {
          var explicit = { relative: "" };
          var parts = typeof val === "string" && rRelative.exec(val);
          if (typeof val === "number") {
            explicit.px = val;
          } else if (parts) {
            explicit.relative = parts[1];
            explicit.px = parseFloat(parts[2]) || 0;
          }
          return explicit;
        };
        var onAfterScroll = function(opts) {
          var $tgt = $2(opts.scrollTarget);
          if (opts.autoFocus && $tgt.length) {
            $tgt[0].focus();
            if (!$tgt.is(document.activeElement)) {
              $tgt.prop({ tabIndex: -1 });
              $tgt[0].focus();
            }
          }
          opts.afterScroll.call(opts.link, opts);
        };
        $2.smoothScroll = function(options, px) {
          if (options === "options" && typeof px === "object") {
            return $2.extend(optionOverrides, px);
          }
          var opts, $scroller, speed, delta;
          var explicitOffset = getExplicitOffset(options);
          var scrollTargetOffset = {};
          var scrollerOffset = 0;
          var offPos = "offset";
          var scrollDir = "scrollTop";
          var aniProps = {};
          var aniOpts = {};
          if (explicitOffset.px) {
            opts = $2.extend({ link: null }, $2.fn.smoothScroll.defaults, optionOverrides);
          } else {
            opts = $2.extend({ link: null }, $2.fn.smoothScroll.defaults, options || {}, optionOverrides);
            if (opts.scrollElement) {
              offPos = "position";
              if (opts.scrollElement.css("position") === "static") {
                opts.scrollElement.css("position", "relative");
              }
            }
            if (px) {
              explicitOffset = getExplicitOffset(px);
            }
          }
          scrollDir = opts.direction === "left" ? "scrollLeft" : scrollDir;
          if (opts.scrollElement) {
            $scroller = opts.scrollElement;
            if (!explicitOffset.px && !/^(?:HTML|BODY)$/.test($scroller[0].nodeName)) {
              scrollerOffset = $scroller[scrollDir]();
            }
          } else {
            $scroller = $2("html, body").firstScrollable(opts.direction);
          }
          opts.beforeScroll.call($scroller, opts);
          scrollTargetOffset = explicitOffset.px ? explicitOffset : {
            relative: "",
            px: $2(opts.scrollTarget)[offPos]() && $2(opts.scrollTarget)[offPos]()[opts.direction] || 0
          };
          aniProps[scrollDir] = scrollTargetOffset.relative + (scrollTargetOffset.px + scrollerOffset + opts.offset);
          speed = opts.speed;
          if (speed === "auto") {
            delta = Math.abs(aniProps[scrollDir] - $scroller[scrollDir]());
            speed = delta / opts.autoCoefficient;
          }
          aniOpts = {
            duration: speed,
            easing: opts.easing,
            complete: function() {
              onAfterScroll(opts);
            }
          };
          if (opts.step) {
            aniOpts.step = opts.step;
          }
          if ($scroller.length) {
            $scroller.stop().animate(aniProps, aniOpts);
          } else {
            onAfterScroll(opts);
          }
        };
        $2.smoothScroll.version = version;
        $2.smoothScroll.filterPath = function(string) {
          string = string || "";
          return string.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "");
        };
        $2.fn.smoothScroll.defaults = defaults;
      });
    }
  });

  // js/vendor-extra/index.js
  var import_fastclick = __toESM(require_fastclick());
  console.log("\u{1F525} vendor-extra index loaded");
  window.FastClick = import_fastclick.default;
  if (typeof window.FastClick.attach !== "function") {
    window.FastClick.attach = function(target) {
      return (0, import_fastclick.default)(target);
    };
  }
  function initVendorPlugins() {
    require_exif();
    require_jsonrpc();
    if (typeof JSONRpcClient === "function") {
      window.JSONRpcClient = JSONRpcClient;
    } else {
    }
    require_src();
    require_jquery_extension();
    require_patternSelector();
    require_jquery_fontselect_min();
    require_masonry();
    require_imagesloaded();
    const riotMod = require_riot_compiler_min();
    if (typeof window.riot === "undefined" && riotMod) {
      window.riot = riotMod;
    }
    require_bootstrap_wysiwyg();
    require_jquery_hotkeys();
    require_jquery_cloneya();
    require_jquery_screwdefaultbuttons();
    require_jquery_magnific_popup();
    require_jquery_nestable();
    require_jquery_bootstrap_wizard();
    require_bootstrap_lightbox();
    require_jquery_validate();
    if (!window.jQuery.fn.validate) {
      if (typeof window.validate === "function") {
        window.validate(window.jQuery);
      } else {
        window.jQuery.fn.validate = require_jquery_validate();
      }
    }
    require_popupWindow();
    require_jquery_polyglot_language_switcher();
    require_jquery_nanoscroller();
    require_jquery_cookie();
    if (window.jQuery && !window.jQuery.cookie) {
      const pluginJquery = require_jquery();
      if (pluginJquery.cookie) {
        window.jQuery.cookie = pluginJquery.cookie;
      } else {
      }
    }
    require_jquery_mousewheel();
    require_toastr_min();
    if (typeof window.toastr === "undefined") {
      console.warn("\u26A0\uFE0F toastr not found \u2192 forcing window.toastr");
      window.toastr = require_toastr_min();
    }
    require_jquery_smooth_scroll();
  }
  (function waitForjQuery() {
    if (window.jQuery) {
      initVendorPlugins();
    } else {
      setTimeout(waitForjQuery, 50);
    }
  })();
})();
/*!
 * ScrewDefaultButtons v2.0.6
 * http://screwdefaultbuttons.com/
 *
 * Licensed under the MIT license.
 * Copyright 2013 Matt Solano http://mattsolano.com
 *
 * Date: Mon February 25 2013
 */
/*!
 * jQuery Validation Plugin v1.21.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2024 Jörn Zaefferer
 * Released under the MIT license
 */
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
/*! Bundled license information:

fastclick/lib/fastclick.js:
  (**
   * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
   *
   * @codingstandard ftlabs-jsv2
   * @copyright The Financial Times Limited [All Rights Reserved]
   * @license MIT License (see LICENSE.txt)
   *)

get-size/get-size.js:
  (*!
   * getSize v2.0.3
   * measure size of elements
   * MIT license
   *)

outlayer/outlayer.js:
  (*!
   * Outlayer v2.1.1
   * the brains and guts of a layout library
   * MIT license
   *)

masonry-layout/masonry.js:
  (*!
   * Masonry v4.2.2
   * Cascading grid layout library
   * https://masonry.desandro.com
   * MIT License
   * by David DeSandro
   *)

imagesloaded/imagesloaded.js:
  (*!
   * imagesLoaded v5.0.0
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   *)

riot/riot+compiler.min.js:
  (* Riot v2.3.13, @license MIT, (c) 2015 Muut Inc. + contributors *)

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.7.1
   * https://jquery.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2023-08-28T13:37Z
   *)

magnific-popup/dist/jquery.magnific-popup.js:
  (*! Magnific Popup - v1.2.0 - 2024-06-08
  * http://dimsemenov.com/plugins/magnific-popup/
  * Copyright (c) 2024 Dmytro Semenov; *)

jquery-nestable/jquery.nestable.js:
  (*!
   * Nestable jQuery Plugin - Copyright (c) 2012 David Bushell - http://dbushell.com/
   * Dual-licensed under the BSD or MIT licenses
   *)

twitter-bootstrap-wizard/jquery.bootstrap.wizard.js:
  (*!
   * jQuery twitter bootstrap wizard plugin
   * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
   * version 1.0
   * Requires jQuery v1.3.2 or later
   * Supports Bootstrap 2.2.x, 2.3.x, 3.0
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
   *)

nanoscroller/bin/javascripts/jquery.nanoscroller.js:
  (*! nanoScrollerJS - v0.8.7 - 2015
  * http://jamesflorentino.github.com/nanoScrollerJS/
  * Copyright (c) 2015 James Florentino; Licensed MIT *)

jquery-mousewheel/jquery.mousewheel.js:
  (*!
   * jQuery Mousewheel 3.2.2
   * Copyright OpenJS Foundation and other contributors
   *)

jquery-smooth-scroll/jquery.smooth-scroll.js:
  (*!
   * jQuery Smooth Scroll - v2.2.0 - 2017-05-05
   * https://github.com/kswedberg/jquery-smooth-scroll
   * Copyright (c) 2017 Karl Swedberg
   * Licensed MIT
   *)
*/
