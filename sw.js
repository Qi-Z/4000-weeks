/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-99d8380f'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/index-C_JFIQ6V.js",
    "revision": null
  }, {
    "url": "assets/index-DLUheNL3.css",
    "revision": null
  }, {
    "url": "assets/index.es-DMv_kUPg.js",
    "revision": null
  }, {
    "url": "assets/purify.es-aGzT-_H7.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-CwtvwXb3.js",
    "revision": null
  }, {
    "url": "icons/icon-192.png",
    "revision": "616d1d33287fa8534e0935b63cf7fb1c"
  }, {
    "url": "icons/icon-512.png",
    "revision": "616d1d33287fa8534e0935b63cf7fb1c"
  }, {
    "url": "index.html",
    "revision": "3b83c0d936e22a7dfb89c232bc4d67fc"
  }, {
    "url": "og-image.png",
    "revision": "c2eef055ba6a2b6f82562b83d56a0ab9"
  }, {
    "url": "vite.svg",
    "revision": "8e3a10e157f75ada21ab742c022d5430"
  }, {
    "url": "icons/icon-192.png",
    "revision": "616d1d33287fa8534e0935b63cf7fb1c"
  }, {
    "url": "icons/icon-512.png",
    "revision": "616d1d33287fa8534e0935b63cf7fb1c"
  }, {
    "url": "manifest.webmanifest",
    "revision": "d88863114091924edab6aef5cf9d7c29"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
