import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, createError, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, getRequestProtocol, getRequestHost, getQuery as getQuery$1, removeResponseHeader, setHeader, getHeader, getResponseStatus, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, getResponseStatusText, H3Error } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve as resolve$6, dirname, join as join$1 } from 'node:path';
import crypto$1 from 'node:crypto';
import { parentPort, threadId, Worker } from 'node:worker_threads';
import { escapeHtml } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@vue/shared/dist/shared.cjs.js';
import defu, { defuFn, defu as defu$1, createDefu } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/defu/dist/defu.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, hasProtocol, withHttps, withoutTrailingSlash, withLeadingSlash, withBase, withTrailingSlash, withoutLeadingSlash, decodePath, parsePath, stringifyQuery, parseQuery, encodePath, stringifyParsedURL, joinRelativeURL } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/ufo/dist/index.mjs';
import { createFetch, Headers as Headers$1, $fetch as $fetch$1 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/ofetch/dist/node.mjs';
import { readFile } from 'node:fs/promises';
import { join, dirname as dirname$1, resolve as resolve$7 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/pathe/dist/index.mjs';
import { parse, ELEMENT_NODE, TEXT_NODE } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/ultrahtml/dist/index.js';
import { querySelector } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/ultrahtml/dist/selector.js';
import viteNodeEntry_mjs from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/vite-builder/dist/vite-node-entry.mjs';
import { viteNodeFetch } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/vite-builder/dist/vite-node.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import destr, { destr as destr$1 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/destr/dist/index.mjs';
import { stringify, uneval, parse as parse$1 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/devalue/index.js';
import { createHead as createHead$2, propsToString, renderSSRHead } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/nitro-server/node_modules/unhead/dist/server.mjs';
import fs, { existsSync, mkdirSync, readFileSync, writeFileSync, promises } from 'node:fs';
import consola, { createConsola, consola as consola$1 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/consola/dist/index.mjs';
import { createStorage, defineDriver, prefixStorage, normalizeKey } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/unstorage/dist/index.mjs';
import { digest, hash as hash$1 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/radix3/dist/index.mjs';
import lruCacheDriver from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/unstorage/drivers/lru-cache.mjs';
import { createHead as createHead$3, renderSSRHead as renderSSRHead$1 } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/unhead/dist/server.mjs';
import { toValue, isVNode, isRef } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/vue/index.mjs';
import { createHooks } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/node-mock-http/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/unstorage/drivers/fs.mjs';
import fsDriver from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/unstorage/drivers/fs-lite.mjs';
import { klona } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/klona/dist/index.mjs';
import { snakeCase } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/unctx/dist/index.mjs';
import { ErrorParser } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/source-map/source-map.js';
import devalue from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/devalue/dist/devalue.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/errx/dist/index.js';
import _wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/vite-builder/dist/fix-stacktrace.mjs';
import { fileURLToPath } from 'node:url';
import { createFilter } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxtseo-shared/dist/utils.mjs';
import Fuse from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/fuse.js/dist/fuse.mjs';
import { diffLines } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-link-checker/node_modules/diff/libesm/index.js';
import MagicString from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/magic-string/dist/magic-string.es.mjs';
import { renderToString } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/nitro-server/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

// @ts-check


/**
 * @param {string} item
 */
function normalizeFsKey (item) {
  const safe = item.replace(/[^\w.-]/g, '_');
  const prefix = safe.slice(0, 20);
  const hash = crypto$1.createHash('sha256').update(item).digest('hex');
  return `${prefix}-${hash}`
}

const _47Users_47estephanysugeycanedo_47Desktop_47pitaya_45lab_45site_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js = defineDriver(
  /**
   * @param {{ base?: string }} opts
   */
  (opts) => {
    const fs = fsDriver({ base: opts.base });
    const lru = lruCacheDriver({ max: 1000 });

    return {
      ...fs, // fall back to file system - only the bottom three methods are used in renderer
      async setItem (key, value, opts) {
        await Promise.all([
          fs.setItem?.(normalizeFsKey(key), value, opts),
          lru.setItem?.(key, value, opts),
        ]);
      },
      async hasItem (key, opts) {
        return await lru.hasItem(key, opts) || await fs.hasItem(normalizeFsKey(key), opts)
      },
      async getItem (key, opts) {
        return await lru.getItem(key, opts) || await fs.getItem(normalizeFsKey(key), opts)
      },
    }
  },
);

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/server","watchOptions":{"ignored":[null]}}));
storage.mount('cache:nuxt:payload', _47Users_47estephanysugeycanedo_47Desktop_47pitaya_45lab_45site_47node_modules_47_64nuxt_47nitro_45server_47dist_47runtime_47utils_47cache_45driver_46js({"driver":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js","base":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/.nuxt/cache/nuxt/payload"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt": {
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
      },
      "/_nuxt/**": {
        "robots": "noindex",
        "headers": {
          "X-Robots-Tag": "noindex"
        }
      },
      "/": {
        "prerender": true
      },
      "/about": {
        "prerender": true
      },
      "/philosophy": {
        "prerender": true
      },
      "/catalog": {
        "prerender": true
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_og-static-fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/about/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/philosophy/_payload.json": {
        "ssr": true,
        "prerender": true
      },
      "/catalog/_payload.json": {
        "ssr": true,
        "prerender": true
      }
    }
  },
  "public": {
    "emailjsPublicKey": "TU_PUBLIC_KEY",
    "emailjsServiceId": "TU_SERVICE_ID",
    "emailjsTemplateId": "TU_TEMPLATE_ID",
    "nuxt-link-checker": {
      "version": "5.1.0",
      "hasSitemapModule": true,
      "rootDir": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site",
      "excludeLinks": [
        {
          "__regexp__": true,
          "source": "^\\/_",
          "flags": ""
        },
        {
          "__regexp__": true,
          "source": "^\\/llms(-[\\w-]+)?\\.txt$",
          "flags": ""
        }
      ],
      "excludePages": [],
      "skipInspections": [],
      "fetchTimeout": 10000,
      "showLiveInspections": false,
      "fetchRemoteUrls": false
    },
    "nuxt-schema-org": {
      "reactive": true,
      "minify": false,
      "scriptAttributes": {
        "data-nuxt-schema-org": true
      },
      "identity": "",
      "version": "6.2.1"
    },
    "nuxt-seo-utils-version": "8.3.1",
    "seo-utils": {
      "canonicalQueryWhitelist": [
        "page",
        "sort",
        "filter",
        "search",
        "q",
        "category",
        "tag"
      ],
      "canonicalLowercase": true,
      "tagPriority": "low",
      "separator": "",
      "titleSeparator": ""
    },
    "nuxt-robots": {
      "version": "6.1.1",
      "isNuxtContentV2": false,
      "debug": false,
      "credits": true,
      "groups": [
        {
          "userAgent": [
            "*"
          ],
          "disallow": [
            ""
          ],
          "allow": [],
          "contentUsage": [],
          "contentSignal": [],
          "_indexable": true,
          "_rules": [],
          "_normalized": true
        }
      ],
      "sitemap": [
        "/sitemap.xml",
        "/sitemap.xml"
      ],
      "header": true,
      "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "robotsDisabledValue": "noindex, nofollow",
      "cacheControl": "max-age=14400, must-revalidate",
      "botDetection": true,
      "pageMetaRobots": {}
    },
    "nuxt-og-image": {
      "defaults": {
        "emojis": "noto",
        "extension": "png",
        "width": 1200,
        "height": 600,
        "cacheMaxAgeSeconds": 259200
      },
      "hasServerRuntime": true
    }
  },
  "sitemap": {
    "cacheMaxAgeSeconds": 0,
    "debug": false
  },
  "nuxt-schema-org": {
    "reactive": true,
    "minify": false,
    "scriptAttributes": {
      "data-nuxt-schema-org": true
    },
    "identity": "",
    "version": "6.2.1"
  },
  "seo-utils-head": {
    "link": [
      {
        "rel": "icon",
        "type": "image/png",
        "href": "/favicon.png"
      },
      {
        "rel": "apple-touch-icon",
        "href": "/favicon.png"
      }
    ],
    "meta": []
  },
  "nuxt-site-config": {
    "stack": [
      {
        "_context": "system",
        "_priority": -15,
        "env": "development"
      }
    ],
    "version": "4.1.0",
    "debug": false,
    "multiTenancy": []
  },
  "nuxt-robots": {
    "version": "6.1.1",
    "isNuxtContentV2": false,
    "debug": false,
    "credits": true,
    "groups": [
      {
        "userAgent": [
          "*"
        ],
        "disallow": [
          ""
        ],
        "allow": [],
        "contentUsage": [],
        "contentSignal": [],
        "_indexable": true,
        "_rules": [],
        "_normalized": true
      }
    ],
    "sitemap": [
      "/sitemap.xml",
      "/sitemap.xml"
    ],
    "header": true,
    "robotsEnabledValue": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "robotsDisabledValue": "noindex, nofollow",
    "cacheControl": "max-age=14400, must-revalidate",
    "botDetection": true,
    "pageMetaRobots": {}
  },
  "nuxt-og-image": {
    "version": "6.6.0",
    "satoriOptions": {},
    "resvgOptions": {},
    "sharpOptions": {},
    "publicStoragePath": "root:public",
    "defaults": {
      "emojis": "noto",
      "extension": "png",
      "width": 1200,
      "height": 600,
      "cacheMaxAgeSeconds": 259200
    },
    "debug": false,
    "baseCacheKey": "/cache/nuxt-og-image/6.6.0",
    "buildCacheDir": "",
    "hasNuxtIcon": false,
    "colorPreference": "light",
    "isNuxtContentDocumentDriven": false,
    "cssFramework": "tailwind",
    "browser": "",
    "security": {
      "strict": false,
      "maxDimension": 2048,
      "maxDpr": 2,
      "renderTimeout": 15000,
      "imageFetchTimeout": 3000,
      "maxQueryParamSize": "",
      "restrictRuntimeImagesToOrigin": false,
      "secret": ""
    },
    "componentDirs": [
      "OgImageCommunity",
      "OgImageTemplate",
      "og-image",
      "OgImage"
    ],
    "srcDir": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site",
    "rootDir": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site",
    "communityTemplatesDir": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community"
  },
  "ogImage": {
    "secret": ""
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e.data) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-top-navigation-by-user-activation');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve$6(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _qVimX5_0COVWYAmZOUGpMDnI6H_rRIfsIWZhnCRb8I = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const SiteConfigPriority = {
  nitro: -4,
  runtime: 0
};

function normalizeSiteConfig(config) {
  if (typeof config.indexable !== "undefined")
    config.indexable = String(config.indexable) !== "false";
  if (typeof config.trailingSlash !== "undefined" && !config.trailingSlash)
    config.trailingSlash = String(config.trailingSlash) !== "false";
  if (config.url && !hasProtocol(String(config.url), { acceptRelative: true, strict: false }))
    config.url = withHttps(String(config.url));
  const keys = Object.keys(config).sort((a, b) => a.localeCompare(b));
  const newConfig = {};
  for (const k of keys)
    newConfig[k] = config[k];
  return newConfig;
}
function createSiteConfigStack(options) {
  const debug = options?.debug || false;
  const stack = [];
  function push(input) {
    if (!input || typeof input !== "object" || Object.keys(input).length === 0) {
      return () => {
      };
    }
    if (!input._context && debug) {
      let lastFunctionName = new Error("tmp").stack?.split("\n")[2]?.split(" ")[5];
      if (lastFunctionName?.includes("/"))
        lastFunctionName = "anonymous";
      input._context = lastFunctionName;
    }
    const entry = {};
    for (const k in input) {
      const val = input[k];
      if (typeof val !== "undefined" && val !== "")
        entry[k] = val;
    }
    if (Object.keys(entry).filter((k) => !k.startsWith("_")).length === 0) {
      return () => {
      };
    }
    stack.push(entry);
    return () => {
      const idx = stack.indexOf(entry);
      if (idx !== -1)
        stack.splice(idx, 1);
    };
  }
  function get(options2) {
    const siteConfig = {};
    if (options2?.debug)
      siteConfig._context = {};
    siteConfig._priority = {};
    for (const o in stack.sort((a, b) => (a._priority || 0) - (b._priority || 0))) {
      for (const k in stack[o]) {
        const key = k;
        const val = options2?.resolveRefs ? toValue(stack[o][k]) : stack[o][k];
        if (!k.startsWith("_") && typeof val !== "undefined" && val !== "") {
          siteConfig[k] = val;
          if (typeof stack[o]._priority !== "undefined" && stack[o]._priority !== -1) {
            siteConfig._priority[key] = stack[o]._priority;
          }
          if (options2?.debug)
            siteConfig._context[key] = stack[o]._context?.[key] || stack[o]._context || "anonymous";
        }
      }
    }
    return options2?.skipNormalize ? siteConfig : normalizeSiteConfig(siteConfig);
  }
  return {
    stack,
    push,
    get
  };
}

const NUXT_SITE_ENV_RE = /^NUXT_(PUBLIC_)?SITE_/;
function envSiteConfig(env = {}) {
  return Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith("NUXT_SITE_") || k.startsWith("NUXT_PUBLIC_SITE_")).map(([k, v]) => [
    k.replace(NUXT_SITE_ENV_RE, "").split("_").map((s, i) => i === 0 ? s.toLowerCase() : s[0]?.toUpperCase() + s.slice(1).toLowerCase()).join(""),
    v
  ]));
}

const logger$4 = /* @__PURE__ */ createConsola({
  defaults: {
    tag: "nuxt-site-config"
  }
});

function getSiteConfig(e, _options) {
  if (!e.context._initedSiteConfig) {
    logger$4.warn("Site config has not been initialized yet. If you're trying to access site config in a server middleware then this not yet supported. See https://github.com/harlan-zw/nuxt-seo/issues/397");
  }
  e.context.siteConfig = e.context.siteConfig || createSiteConfigStack();
  const options = defu$1(_options, useRuntimeConfig(e)["nuxt-site-config"], { debug: false });
  return e.context.siteConfig.get(options);
}

const _sqFPuib21LTMfdr067pELXHEex8SId7j7V9v2yo84a4 = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("render:html", async (ctx, { event }) => {
    const routeOptions = getRouteRules(event);
    const isIsland = process.env.NUXT_COMPONENT_ISLANDS && event.path.startsWith("/__nuxt_island");
    event.path;
    const noSSR = !!process.env.NUXT_NO_SSR || event.context.nuxt?.noSSR || routeOptions.ssr === false && !isIsland || (false);
    if (noSSR) {
      const siteConfig = Object.fromEntries(
        Object.entries(getSiteConfig(event)).map(([k, v]) => [k, toValue(v)])
      );
      ctx.body.push(`<script>window.__NUXT_SITE_CONFIG__=${devalue(siteConfig)}<\/script>`);
    }
  });
});

const KNOWN_SEARCH_BOTS = [
  {
    pattern: "googlebot",
    name: "googlebot",
    secondaryPatterns: ["google.com/bot.html"]
  },
  {
    pattern: "bingbot",
    name: "bingbot",
    secondaryPatterns: ["msnbot"]
  },
  {
    pattern: "yandexbot",
    name: "yandexbot"
  },
  {
    pattern: "baiduspider",
    name: "baiduspider",
    secondaryPatterns: ["baidu.com"]
  },
  {
    pattern: "duckduckbot",
    name: "duckduckbot",
    secondaryPatterns: ["duckduckgo.com"]
  },
  {
    pattern: "slurp",
    name: "yahoo"
  },
  {
    pattern: "applebot",
    name: "applebot",
    secondaryPatterns: ["apple.com/go/applebot"]
  }
];
const SOCIAL_BOTS = [
  {
    pattern: "twitterbot",
    name: "twitter",
    secondaryPatterns: ["twitter"]
  },
  {
    pattern: "facebookexternalhit",
    name: "facebook",
    secondaryPatterns: ["facebook.com"]
  },
  {
    pattern: "linkedinbot",
    name: "linkedin",
    secondaryPatterns: ["linkedin"]
  },
  {
    pattern: "pinterestbot",
    name: "pinterest",
    secondaryPatterns: ["pinterest"]
  },
  {
    pattern: "discordbot",
    name: "discord",
    secondaryPatterns: ["discordapp"]
  }
];
const SEO_BOTS = [
  {
    pattern: "mj12bot",
    name: "majestic12",
    secondaryPatterns: ["majestic12.co.uk/bot"]
  },
  {
    pattern: "ahrefsbot",
    name: "ahrefs",
    secondaryPatterns: ["ahrefs.com"]
  },
  {
    pattern: "semrushbot",
    name: "semrush",
    secondaryPatterns: ["semrush.com/bot"]
  },
  {
    pattern: "screaming frog",
    name: "screaming-frog",
    secondaryPatterns: ["screamingfrog.co.uk"]
  },
  {
    pattern: "rogerbot",
    name: "moz"
  }
];
const AI_BOTS = [
  {
    pattern: "anthropic",
    name: "anthropic"
  },
  {
    pattern: "claude",
    name: "claude"
  },
  {
    pattern: "gptbot",
    name: "gpt",
    secondaryPatterns: ["openai.com"]
  },
  {
    pattern: "google-extended",
    name: "google-extended"
  },
  {
    pattern: "applebot-extended",
    name: "applebot-extended"
  },
  {
    pattern: "bytespider",
    name: "bytespider"
  },
  {
    pattern: "diffbot",
    name: "diffbot"
  },
  {
    pattern: "googlebot-news",
    name: "google-news"
  },
  {
    pattern: "cohere",
    name: "cohere",
    secondaryPatterns: ["cohere.com"]
  },
  {
    pattern: "ccbot",
    name: "commoncrawl",
    secondaryPatterns: ["commoncrawl.org"]
  },
  {
    pattern: "perplexitybot",
    name: "perplexity",
    secondaryPatterns: ["perplexity.ai"]
  }
];
const HTTP_TOOL_BOTS = [
  {
    pattern: "python-requests",
    name: "requests",
    secondaryPatterns: ["python"]
  },
  {
    pattern: "wget",
    name: "wget"
  },
  {
    pattern: "curl",
    name: "curl",
    secondaryPatterns: ["curl"]
  }
];
const SECURITY_SCANNING_BOTS = [
  {
    pattern: "zgrab",
    name: "zgrab"
  },
  {
    pattern: "masscan",
    name: "masscan"
  },
  {
    pattern: "nmap",
    name: "nmap",
    secondaryPatterns: ["insecure.org"]
  },
  {
    pattern: "nikto",
    name: "nikto"
  },
  {
    pattern: "wpscan",
    name: "wpscan"
  }
];
const SCRAPING_BOTS = [
  {
    pattern: "scrapy",
    name: "scrapy",
    secondaryPatterns: ["scrapy.org"]
  }
];
const AUTOMATION_BOTS = [
  {
    pattern: "phantomjs",
    name: "phantomjs"
  },
  {
    pattern: "headless",
    name: "headless-browser"
  },
  {
    pattern: "playwright",
    name: "playwright"
  },
  {
    pattern: "selenium",
    name: "selenium",
    secondaryPatterns: ["webdriver"]
  },
  {
    pattern: "puppeteer",
    name: "puppeteer",
    secondaryPatterns: ["headless"]
  }
];
const GENERIC_BOTS = [
  {
    pattern: "bot",
    name: "generic-bot"
  },
  {
    pattern: "spider",
    name: "generic-spider"
  },
  {
    pattern: "crawler",
    name: "generic-crawler"
  },
  {
    pattern: "scraper",
    name: "generic-scraper"
  }
];
const BOT_MAP = [
  {
    type: "search-engine",
    bots: KNOWN_SEARCH_BOTS,
    trusted: true
  },
  {
    type: "social",
    bots: SOCIAL_BOTS,
    trusted: true
  },
  {
    type: "seo",
    bots: SEO_BOTS,
    trusted: true
  },
  {
    type: "ai",
    bots: AI_BOTS,
    trusted: true
  },
  {
    type: "generic",
    bots: GENERIC_BOTS,
    trusted: false
  },
  {
    type: "automation",
    bots: AUTOMATION_BOTS,
    trusted: false
  },
  {
    type: "http-tool",
    bots: HTTP_TOOL_BOTS,
    trusted: false
  },
  {
    type: "security-scanner",
    bots: SECURITY_SCANNING_BOTS,
    trusted: false
  },
  {
    type: "scraping",
    bots: SCRAPING_BOTS,
    trusted: false
  }
];

const ROBOT_DIRECTIVE_VALUES = {
  // Standard directives
  enabled: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  disabled: "noindex, nofollow",
  index: "index",
  noindex: "noindex",
  follow: "follow",
  nofollow: "nofollow",
  none: "none",
  all: "all",
  // Non-standard directives (not part of official robots spec)
  noai: "noai",
  noimageai: "noimageai"
};
function formatMaxImagePreview(value) {
  return `max-image-preview:${value}`;
}
function formatMaxSnippet(value) {
  return `max-snippet:${value}`;
}
function formatMaxVideoPreview(value) {
  return `max-video-preview:${value}`;
}
function parseRobotsTxt(s) {
  const groups = [];
  const sitemaps = [];
  const errors = [];
  const warnings = [];
  let createNewGroup = false;
  let currentGroup = {
    comment: [],
    // comments are too hard to parse in a logical order, we'll just omit them
    disallow: [],
    allow: [],
    userAgent: [],
    contentUsage: [],
    contentSignal: []
  };
  let ln = -1;
  for (const _line of s.split("\n")) {
    ln++;
    const [preComment] = _line.split("#").map((s2) => s2.trim());
    const line = String(preComment);
    const sepIndex = line.indexOf(":");
    if (sepIndex === -1)
      continue;
    const rule = line.substring(0, sepIndex).trim().toLowerCase();
    const val = line.substring(sepIndex + 1).trim();
    switch (rule) {
      case "user-agent":
      case "useragent":
      case "user agent":
        if (createNewGroup) {
          groups.push({
            ...currentGroup
          });
          currentGroup = {
            comment: [],
            disallow: [],
            allow: [],
            userAgent: [],
            contentUsage: [],
            contentSignal: []
          };
          createNewGroup = false;
        }
        currentGroup.userAgent.push(val);
        break;
      case "allow":
        currentGroup.allow.push(val);
        createNewGroup = true;
        break;
      case "disallow":
      case "dissallow":
      case "dissalow":
      case "disalow":
      case "diasllow":
      case "disallaw":
        currentGroup.disallow.push(val);
        createNewGroup = true;
        break;
      case "sitemap":
      case "site-map":
        sitemaps.push(val);
        break;
      case "host":
        currentGroup.host = val;
        break;
      case "clean-param":
        if (currentGroup.userAgent.some((u) => u.toLowerCase().includes("yandex"))) {
          currentGroup.cleanParam = currentGroup.cleanParam || [];
          currentGroup.cleanParam.push(val);
        } else {
          errors.push(`L${ln}: Clean-param directive is only when targeting Yandex user agent.`);
        }
        break;
      case "content-usage":
        currentGroup.contentUsage = currentGroup.contentUsage || [];
        currentGroup.contentUsage.push(val);
        break;
      case "content-signal":
        currentGroup.contentSignal = currentGroup.contentSignal || [];
        currentGroup.contentSignal.push(val);
        break;
      default:
        errors.push(`L${ln}: Unknown directive ${rule} `);
        break;
    }
  }
  groups.push({
    ...currentGroup
  });
  return {
    groups,
    sitemaps,
    errors,
    warnings
  };
}
function validateGroupRules(group, errors, warnings) {
  const toCheck = ["allow", "disallow"];
  toCheck.forEach((key) => {
    (group[key] || []).filter((rule) => {
      if (rule === "")
        return true;
      if (!rule.startsWith("/") && !rule.startsWith("*")) {
        errors.push(`Disallow rule "${rule}" must start with a \`/\` or be a \`*\`.`);
        return false;
      }
      if (key === "disallow" && (rule === "/api" || rule === "/api/")) {
        warnings.push(`Disallow rule "${rule}" blocks API routes which may prevent crawlers from functioning correctly (e.g. sitemaps, OG image generation).`);
      }
      return true;
    });
  });
  if (group.contentUsage) {
    const validCategories = ["bots", "train-ai", "ai-output", "search"];
    const validValues = ["y", "n"];
    group.contentUsage.forEach((rule) => {
      if (rule === "") {
        errors.push(`Content-Usage rule cannot be empty.`);
        return;
      }
      const parts = rule.trim().split(/\s+/);
      if (parts.length === 1) {
        if (!parts[0]?.includes("=")) {
          errors.push(`Content-Usage rule "${rule}" must contain a preference assignment (e.g., "train-ai=n").`);
          return;
        }
        const preferences = parts[0].split(",").map((p) => p.trim());
        preferences.forEach((pref) => {
          const [category, value] = pref.split("=").map((s) => s.trim());
          if (!validCategories.includes(category || "")) {
            errors.push(`Content-Usage category "${category}" is invalid. Valid categories: ${validCategories.join(", ")}.`);
          }
          if (!validValues.includes(value || "")) {
            errors.push(`Content-Usage value "${value}" for "${category}" is invalid. Valid values: y, n.`);
          }
        });
      } else if (parts.length >= 2) {
        const firstPart = parts[0];
        if (firstPart?.includes("=")) {
          const allPreferences = rule.split(",").map((p) => p.trim());
          allPreferences.forEach((pref) => {
            if (!pref.includes("=")) {
              errors.push(`Content-Usage rule "${pref}" must contain a preference assignment (e.g., "train-ai=n").`);
              return;
            }
            const [category, value] = pref.split("=").map((s) => s.trim());
            if (!validCategories.includes(category || "")) {
              errors.push(`Content-Usage category "${category}" is invalid. Valid categories: ${validCategories.join(", ")}.`);
            }
            if (!validValues.includes(value || "")) {
              errors.push(`Content-Usage value "${value}" for "${category}" is invalid. Valid values: y, n.`);
            }
          });
        } else {
          const path = firstPart;
          const preference = parts.slice(1).join(" ");
          if (!path?.startsWith("/")) {
            errors.push(`Content-Usage path "${path}" must start with a \`/\`.`);
          }
          if (!preference.includes("=")) {
            errors.push(`Content-Usage preference "${preference}" must contain an assignment (e.g., "train-ai=n").`);
          } else {
            const preferences = preference.split(",").map((p) => p.trim());
            preferences.forEach((pref) => {
              const [category, value] = pref.split("=").map((s) => s.trim());
              if (!validCategories.includes(category || "")) {
                errors.push(`Content-Usage category "${category}" is invalid. Valid categories: ${validCategories.join(", ")}.`);
              }
              if (!validValues.includes(value || "")) {
                errors.push(`Content-Usage value "${value}" for "${category}" is invalid. Valid values: y, n.`);
              }
            });
          }
        }
      }
    });
  }
  if (group.contentSignal) {
    const validCategories = ["search", "ai-input", "ai-train"];
    const validValues = ["yes", "no"];
    group.contentSignal.forEach((rule) => {
      if (rule === "") {
        errors.push(`Content-Signal rule cannot be empty.`);
        return;
      }
      const parts = rule.trim().split(/\s+/);
      if (parts.length === 1) {
        if (!parts[0]?.includes("=")) {
          errors.push(`Content-Signal rule "${rule}" must contain a preference assignment (e.g., "ai-train=no").`);
          return;
        }
        const preferences = parts[0].split(",").map((p) => p.trim());
        preferences.forEach((pref) => {
          const [category, value] = pref.split("=").map((s) => s.trim());
          if (!validCategories.includes(category || "")) {
            errors.push(`Content-Signal category "${category}" is invalid. Valid categories: ${validCategories.join(", ")}.`);
          }
          if (!validValues.includes(value || "")) {
            errors.push(`Content-Signal value "${value}" for "${category}" is invalid. Valid values: yes, no.`);
          }
        });
      } else if (parts.length >= 2) {
        const firstPart = parts[0];
        if (firstPart?.includes("=")) {
          const allPreferences = rule.split(",").map((p) => p.trim());
          allPreferences.forEach((pref) => {
            if (!pref.includes("=")) {
              errors.push(`Content-Signal rule "${pref}" must contain a preference assignment (e.g., "ai-train=no").`);
              return;
            }
            const [category, value] = pref.split("=").map((s) => s.trim());
            if (!validCategories.includes(category || "")) {
              errors.push(`Content-Signal category "${category}" is invalid. Valid categories: ${validCategories.join(", ")}.`);
            }
            if (!validValues.includes(value || "")) {
              errors.push(`Content-Signal value "${value}" for "${category}" is invalid. Valid values: yes, no.`);
            }
          });
        } else {
          const path = firstPart;
          const preference = parts.slice(1).join(" ");
          if (!path?.startsWith("/")) {
            errors.push(`Content-Signal path "${path}" must start with a \`/\`.`);
          }
          if (!preference.includes("=")) {
            errors.push(`Content-Signal preference "${preference}" must contain an assignment (e.g., "ai-train=no").`);
          } else {
            const preferences = preference.split(",").map((p) => p.trim());
            preferences.forEach((pref) => {
              const [category, value] = pref.split("=").map((s) => s.trim());
              if (!validCategories.includes(category || "")) {
                errors.push(`Content-Signal category "${category}" is invalid. Valid categories: ${validCategories.join(", ")}.`);
              }
              if (!validValues.includes(value || "")) {
                errors.push(`Content-Signal value "${value}" for "${category}" is invalid. Valid values: yes, no.`);
              }
            });
          }
        }
      }
    });
  }
}
function matches(pattern, path) {
  const pathLength = path.length;
  const patternLength = pattern.length;
  const matchingLengths = Array.from({ length: pathLength + 1 }).fill(0);
  let numMatchingLengths = 1;
  let p = 0;
  while (p < patternLength) {
    if (pattern[p] === "$" && p + 1 === patternLength) {
      return matchingLengths[numMatchingLengths - 1] === pathLength;
    }
    if (pattern[p] === "*") {
      numMatchingLengths = pathLength - matchingLengths[0] + 1;
      for (let i = 1; i < numMatchingLengths; i++) {
        matchingLengths[i] = matchingLengths[i - 1] + 1;
      }
    } else {
      let numMatches = 0;
      for (let i = 0; i < numMatchingLengths; i++) {
        const matchLength = matchingLengths[i];
        if (matchLength < pathLength && path[matchLength] === pattern[p]) {
          matchingLengths[numMatches++] = matchLength + 1;
        }
      }
      if (numMatches === 0) {
        return false;
      }
      numMatchingLengths = numMatches;
    }
    p++;
  }
  return true;
}
function matchPathToRule(path, _rules) {
  let matchedRule = null;
  const rules = _rules.filter(Boolean);
  const rulesLength = rules.length;
  let i = 0;
  while (i < rulesLength) {
    const rule = rules[i];
    if (!rule || !matches(rule.pattern, path)) {
      i++;
      continue;
    }
    if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
      matchedRule = rule;
    } else if (rule.pattern.length === matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
      matchedRule = rule;
    }
    i++;
  }
  return matchedRule;
}
function validateRobots(robotsTxt) {
  robotsTxt.groups = robotsTxt.groups.filter((group) => {
    if (!group.allow.length && !group.disallow.length) {
      robotsTxt.errors.push(`Group "${group.userAgent.join(", ")}" has no allow or disallow rules. You must provide one of either.`);
      return false;
    }
    validateGroupRules(group, robotsTxt.errors, robotsTxt.warnings);
    return true;
  });
  return robotsTxt;
}
function asArray(v) {
  return typeof v === "undefined" ? [] : Array.isArray(v) ? v : [v];
}
function contentUsageToString(prefs) {
  return Object.entries(prefs).filter(([_, value]) => value !== void 0).map(([key, value]) => `${key}=${value}`).join(", ");
}
function normalizeContentPreferences(value) {
  if (!value)
    return [];
  if (Array.isArray(value))
    return value.filter((rule) => Boolean(rule));
  if (typeof value === "object" && !Array.isArray(value)) {
    const str = contentUsageToString(value);
    return str ? [str] : [];
  }
  if (typeof value === "string")
    return value ? [value] : [];
  return [];
}
function normalizeGroup(group) {
  if (group._normalized) {
    const resolvedGroup = group;
    const disallow2 = asArray(resolvedGroup.disallow);
    resolvedGroup._indexable = !disallow2.includes("/");
    resolvedGroup._rules = [
      ...resolvedGroup.disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...resolvedGroup.allow.map((r) => ({ pattern: r, allow: true }))
    ];
    return resolvedGroup;
  }
  const disallow = asArray(group.disallow);
  const allow = asArray(group.allow).filter((rule) => Boolean(rule));
  const contentUsage = normalizeContentPreferences(group.contentUsage);
  const contentSignal = normalizeContentPreferences(group.contentSignal);
  return {
    ...group,
    userAgent: group.userAgent ? asArray(group.userAgent) : ["*"],
    disallow,
    allow,
    contentUsage,
    contentSignal,
    _indexable: !disallow.includes("/"),
    _rules: [
      ...disallow.filter(Boolean).map((r) => ({ pattern: r, allow: false })),
      ...allow.map((r) => ({ pattern: r, allow: true }))
    ],
    _normalized: true
  };
}
function generateRobotsTxt({ groups, sitemaps }) {
  const lines = [];
  for (const group of groups) {
    for (const comment of group.comment || [])
      lines.push(`# ${comment}`);
    for (const userAgent of group.userAgent || ["*"])
      lines.push(`User-agent: ${userAgent}`);
    for (const allow of group.allow || [])
      lines.push(`Allow: ${allow}`);
    for (const disallow of group.disallow || [])
      lines.push(`Disallow: ${disallow}`);
    for (const cleanParam of group.cleanParam || [])
      lines.push(`Clean-param: ${cleanParam}`);
    for (const contentUsage of group.contentUsage || [])
      lines.push(`Content-Usage: ${contentUsage}`);
    for (const contentSignal of group.contentSignal || [])
      lines.push(`Content-Signal: ${contentSignal}`);
    lines.push("");
  }
  for (const sitemap of sitemaps)
    lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}
createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function createPatternMap() {
  const patternMap = /* @__PURE__ */ new Map();
  for (const def of BOT_MAP) {
    for (const bot of def.bots) {
      const patterns = [bot.pattern, ...bot.secondaryPatterns || []];
      for (const pattern of patterns) {
        patternMap.set(pattern.toLowerCase(), {
          botName: bot.name,
          botCategory: def.type,
          trusted: def.trusted
        });
      }
    }
  }
  return patternMap;
}
function normaliseRobotsRouteRule(config) {
  if (!config)
    return void 0;
  let allow;
  if (typeof config.robots === "boolean")
    allow = config.robots;
  else if (typeof config.robots === "object" && "indexable" in config.robots && typeof config.robots.indexable !== "undefined")
    allow = config.robots.indexable;
  let rule;
  if (typeof config.robots === "object" && config.robots !== null) {
    if ("rule" in config.robots && typeof config.robots.rule !== "undefined") {
      rule = config.robots.rule;
    } else if (!("indexable" in config.robots)) {
      const directives = [];
      for (const [key, value] of Object.entries(config.robots)) {
        if (value === false || value === null || value === void 0)
          continue;
        if (key in ROBOT_DIRECTIVE_VALUES && typeof value === "boolean" && value) {
          directives.push(ROBOT_DIRECTIVE_VALUES[key]);
        } else if (key === "max-image-preview" && typeof value === "string") {
          directives.push(formatMaxImagePreview(value));
        } else if (key === "max-snippet" && typeof value === "number") {
          directives.push(formatMaxSnippet(value));
        } else if (key === "max-video-preview" && typeof value === "number") {
          directives.push(formatMaxVideoPreview(value));
        }
      }
      if (directives.length > 0) {
        rule = directives.join(", ");
      }
    }
  } else if (typeof config.robots === "string") {
    rule = config.robots;
  }
  if (rule && typeof allow === "undefined") {
    const disallowIndicators = ["none", "noindex", "noai", "noimageai"];
    allow = !disallowIndicators.some(
      (indicator) => rule === indicator || rule.split(",").some((part) => part.trim() === indicator)
    );
  }
  if (typeof allow === "undefined" && typeof rule === "undefined")
    return;
  return {
    allow,
    rule
  };
}

function useRuntimeConfigNuxtRobots(event) {
  return useRuntimeConfig(event)["nuxt-robots"];
}

const logger$3 = createConsola({
  defaults: { tag: "@nuxtjs/robots" }
});

async function resolveRobotsTxtContext(e, nitro = useNitroApp()) {
  const { groups, sitemap: sitemaps } = useRuntimeConfigNuxtRobots(e);
  const generateRobotsTxtCtx = {
    event: e,
    context: e ? "robots.txt" : "init",
    errors: [],
    warnings: [],
    ...JSON.parse(JSON.stringify({ groups, sitemaps }))
  };
  await nitro.hooks.callHook("robots:config", generateRobotsTxtCtx);
  generateRobotsTxtCtx.groups = generateRobotsTxtCtx.groups.map(normalizeGroup);
  nitro._robots.ctx = generateRobotsTxtCtx;
  return generateRobotsTxtCtx;
}

const _G4jgSMse8USGLBKPDVbP0ZJM6TRJbry9Vlle4ptgHw = defineNitroPlugin(async (nitroApp) => {
  const { isNuxtContentV2, robotsDisabledValue, botDetection } = useRuntimeConfigNuxtRobots();
  if (botDetection !== false) {
    nitroApp._robotsPatternMap = createPatternMap();
  }
  nitroApp._robots = {};
  await resolveRobotsTxtContext(void 0, nitroApp);
  const nuxtContentUrls = /* @__PURE__ */ new Set();
  if (isNuxtContentV2) {
    let urls;
    try {
      urls = await (await nitroApp.localFetch("/__robots__/nuxt-content.json", {})).json();
    } catch (e) {
      logger$3.error("Failed to read robot rules from content files.", e);
    }
    if (urls && Array.isArray(urls) && urls.length) {
      urls.forEach((url) => nuxtContentUrls.add(withoutTrailingSlash(url)));
    }
  }
  if (nuxtContentUrls.size) {
    nitroApp._robots.nuxtContentUrls = nuxtContentUrls;
  }
});

const htmlPayloadCache = createStorage({
  // short cache time so we don't need many entries at runtime
  driver: lruCacheDriver({ max: 50 })
});
const emojiCache = createStorage({
  driver: lruCacheDriver({ max: 1e3 })
});
class BoundedMap {
  constructor(max) {
    this.max = max;
  }
  map = /* @__PURE__ */ new Map();
  get(key) {
    return this.map.get(key);
  }
  set(key, value) {
    if (this.map.size >= this.max)
      this.map.delete(this.map.keys().next().value);
    this.map.set(key, value);
  }
}
const fontCache = new BoundedMap(100);
const fontArrayCache = new BoundedMap(20);

const FILE_EXT_RE = /\.[0-9a-z]+$/i;
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
const fileExtensions = [
  // Images
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
  // Documents
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "md",
  "markdown",
  // Archives
  "zip",
  "rar",
  "7z",
  "tar",
  "gz",
  // Audio
  "mp3",
  "wav",
  "flac",
  "ogg",
  "opus",
  "m4a",
  "aac",
  "midi",
  "mid",
  // Video
  "mp4",
  "avi",
  "mkv",
  "mov",
  "wmv",
  "flv",
  "webm",
  // Web
  "html",
  "css",
  "js",
  "json",
  "xml",
  "tsx",
  "jsx",
  "ts",
  "vue",
  "svelte",
  "xsl",
  "rss",
  "atom",
  // Programming
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "h",
  "go",
  // Data formats
  "csv",
  "tsv",
  "sql",
  "yaml",
  "yml",
  // Fonts
  "woff",
  "woff2",
  "ttf",
  "otf",
  "eot",
  // Executables/Binaries
  "exe",
  "msi",
  "apk",
  "ipa",
  "dmg",
  "iso",
  "bin",
  // Scripts/Config
  "bat",
  "cmd",
  "sh",
  "env",
  "htaccess",
  "conf",
  "toml",
  "ini",
  // Package formats
  "deb",
  "rpm",
  "jar",
  "war",
  // E-books
  "epub",
  "mobi",
  // Common temporary/backup files
  "log",
  "tmp",
  "bak",
  "old",
  "sav"
];
function isPathFile(path) {
  const lastSegment = path.split("/").pop();
  const ext = (lastSegment || path).match(FILE_EXT_RE)?.[0];
  return !!(ext && fileExtensions.includes(ext.replace(".", "")));
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}

const e=globalThis.process?.env||Object.create(null),t=globalThis.process||{env:e},n=t!==void 0&&t.env&&t.env.NODE_ENV||void 0,r=[[`claude`,[`CLAUDECODE`,`CLAUDE_CODE`]],[`replit`,[`REPL_ID`]],[`gemini`,[`GEMINI_CLI`]],[`codex`,[`CODEX_SANDBOX`,`CODEX_THREAD_ID`]],[`opencode`,[`OPENCODE`]],[`pi`,[i(`PATH`,/\.pi[\\/]agent/)]],[`auggie`,[`AUGMENT_AGENT`]],[`goose`,[`GOOSE_PROVIDER`]],[`devin`,[i(`EDITOR`,/devin/)]],[`cursor`,[`CURSOR_AGENT`]],[`kiro`,[i(`TERM_PROGRAM`,/kiro/)]]];function i(t,n){return ()=>{let r=e[t];return r?n.test(r):false}}function a(){let t=e.AI_AGENT;if(t)return {name:t.toLowerCase()};for(let[t,n]of r)for(let r of n)if(typeof r==`string`?e[r]:r())return {name:t};return {}}const o=a();o.name;!!o.name;const l=[[`APPVEYOR`],[`AWS_AMPLIFY`,`AWS_APP_ID`,{ci:true}],[`AZURE_PIPELINES`,`SYSTEM_TEAMFOUNDATIONCOLLECTIONURI`],[`AZURE_STATIC`,`INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN`],[`APPCIRCLE`,`AC_APPCIRCLE`],[`BAMBOO`,`bamboo_planKey`],[`BITBUCKET`,`BITBUCKET_COMMIT`],[`BITRISE`,`BITRISE_IO`],[`BUDDY`,`BUDDY_WORKSPACE_ID`],[`BUILDKITE`],[`CIRCLE`,`CIRCLECI`],[`CIRRUS`,`CIRRUS_CI`],[`CLOUDFLARE_PAGES`,`CF_PAGES`,{ci:true}],[`CLOUDFLARE_WORKERS`,`WORKERS_CI`,{ci:true}],[`GOOGLE_CLOUDRUN`,`K_SERVICE`],[`GOOGLE_CLOUDRUN_JOB`,`CLOUD_RUN_JOB`],[`CODEBUILD`,`CODEBUILD_BUILD_ARN`],[`CODEFRESH`,`CF_BUILD_ID`],[`DRONE`],[`DRONE`,`DRONE_BUILD_EVENT`],[`DSARI`],[`GITHUB_ACTIONS`],[`GITLAB`,`GITLAB_CI`],[`GITLAB`,`CI_MERGE_REQUEST_ID`],[`GOCD`,`GO_PIPELINE_LABEL`],[`LAYERCI`],[`JENKINS`,`JENKINS_URL`],[`HUDSON`,`HUDSON_URL`],[`MAGNUM`],[`NETLIFY`],[`NETLIFY`,`NETLIFY_LOCAL`,{ci:false}],[`NEVERCODE`],[`RENDER`],[`SAIL`,`SAILCI`],[`SEMAPHORE`],[`SCREWDRIVER`],[`SHIPPABLE`],[`SOLANO`,`TDDIUM`],[`STRIDER`],[`TEAMCITY`,`TEAMCITY_VERSION`],[`TRAVIS`],[`VERCEL`,`NOW_BUILDER`],[`VERCEL`,`VERCEL`,{ci:false}],[`VERCEL`,`VERCEL_ENV`,{ci:false}],[`APPCENTER`,`APPCENTER_BUILD_ID`],[`CODESANDBOX`,`CODESANDBOX_SSE`,{ci:false}],[`CODESANDBOX`,`CODESANDBOX_HOST`,{ci:false}],[`STACKBLITZ`],[`STORMKIT`],[`CLEAVR`],[`ZEABUR`],[`CODESPHERE`,`CODESPHERE_APP_ID`,{ci:true}],[`RAILWAY`,`RAILWAY_PROJECT_ID`],[`RAILWAY`,`RAILWAY_SERVICE_ID`],[`DENO-DEPLOY`,`DENO_DEPLOY`],[`DENO-DEPLOY`,`DENO_DEPLOYMENT_ID`],[`FIREBASE_APP_HOSTING`,`FIREBASE_APP_HOSTING`,{ci:true}],[`EDGEONE_PAGES`,`EO_PAGES_CI`,{ci:true}]];function u(){for(let t of l)if(e[t[1]||t[0]])return {name:t[0].toLowerCase(),...t[2]};return e.SHELL===`/bin/jsh`&&t.versions?.webcontainer?{name:`stackblitz`,ci:false}:{name:``,ci:false}}const d=u();d.name;const p=t.platform||``,m=!!e.CI||d.ci!==false,h=!!t.stdout?.isTTY;!!e.DEBUG;const v=n===`test`||!!e.TEST;n===`production`||e.MODE===`production`;const b=n===`dev`||n===`development`||e.MODE===`development`;!!e.MINIMAL||m||v||!h;const S=/^win/i.test(p);!e.NO_COLOR&&(!!e.FORCE_COLOR||(h||S)&&e.TERM!==`dumb`||m);const E=(t.versions?.node||``).replace(/^v/,``)||null;Number(E?.split(`.`)[0])||null;const O=!!t?.versions?.node,k=`Bun`in globalThis,A=`Deno`in globalThis,j=`fastly`in globalThis,M=`Netlify`in globalThis,N=`EdgeRuntime`in globalThis,P=globalThis.navigator?.userAgent===`Cloudflare-Workers`,F=[[M,`netlify`],[N,`edge-light`],[P,`workerd`],[j,`fastly`],[A,`deno`],[k,`bun`],[O,`node`]];function I(){let e=F.find(e=>e[0]);if(e)return {name:e[1]}}const L=I();L?.name||``;

const PROTOCOL_RE = /^https?:\/\//;
const TRAILING_SLASH_RE = /\/$/;
function isLocalhostHost(host) {
  if (!host || host.startsWith("localhost") || host.startsWith("127.") || host.startsWith("0.0.0.0"))
    return true;
  const hostname = host.startsWith("[") ? host.slice(0, host.indexOf("]") + 1) : host;
  return hostname === "[::1]" || hostname === "::1" || hostname === "[::]" || hostname === "::";
}
function extractHostname(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    return close !== -1 ? host.slice(0, close + 1) : host;
  }
  const colonCount = host.split(":").length - 1;
  return colonCount === 1 ? host.slice(0, host.indexOf(":")) : host;
}
function splitHostPort(host) {
  if (host.startsWith("[")) {
    const close = host.indexOf("]");
    const hostname = close !== -1 ? host.slice(0, close + 1) : host;
    const port = close !== -1 && host[close + 1] === ":" ? host.slice(close + 2) : "";
    const normalized = hostname === "[::1]" || hostname === "[::]" ? "localhost" : hostname;
    return { host: normalized, port };
  }
  if (host === "0.0.0.0" || host.startsWith("0.0.0.0:")) {
    const i = host.indexOf(":");
    return { host: "localhost", port: i !== -1 ? host.slice(i + 1) : "" };
  }
  const colonCount = host.split(":").length - 1;
  if (colonCount === 1) {
    const i = host.indexOf(":");
    return { host: host.slice(0, i), port: host.slice(i + 1) };
  }
  if (colonCount > 1) {
    const normalized = host === "::1" || host === "::" ? "localhost" : `[${host}]`;
    return { host: normalized, port: "" };
  }
  return { host, port: "" };
}
function getNitroOrigin$1(ctx = {}) {
  const isDev = ctx.isDev ?? b;
  const isPrerender = ctx.isPrerender ?? false;
  let host = "";
  let port = "";
  let protocol = process.env.NITRO_SSL_CERT && process.env.NITRO_SSL_KEY ? "https" : "http";
  if (isDev || isPrerender) {
    const devEnv = process.env.__NUXT_DEV__ || process.env.NUXT_VITE_NODE_OPTIONS;
    if (devEnv) {
      const parsed = JSON.parse(devEnv);
      const origin = parsed.proxy?.url || parsed.baseURL?.replace("/__nuxt_vite_node__", "");
      host = origin.replace(PROTOCOL_RE, "").replace(TRAILING_SLASH_RE, "");
      protocol = origin.startsWith("https") ? "https" : "http";
    }
  }
  if (isDev && isLocalhostHost(host) && ctx.requestHost) {
    const reqHost = extractHostname(ctx.requestHost);
    if (reqHost && !isLocalhostHost(reqHost)) {
      host = ctx.requestHost;
      protocol = ctx.requestProtocol || protocol;
    }
  }
  if (!host && ctx.requestHost) {
    host = ctx.requestHost;
    protocol = ctx.requestProtocol || protocol;
  }
  if (!host) {
    host = process.env.NITRO_HOST || process.env.HOST || "";
    if (isDev)
      port = process.env.NITRO_PORT || process.env.PORT || "3000";
  }
  const split = splitHostPort(host);
  host = split.host;
  if (split.port)
    port = split.port;
  host = process.env.NUXT_SITE_HOST_OVERRIDE || host;
  port = process.env.NUXT_SITE_PORT_OVERRIDE || port;
  if (host.startsWith("http://") || host.startsWith("https://")) {
    protocol = host.startsWith("https://") ? "https" : "http";
    host = host.replace(PROTOCOL_RE, "");
  } else if (!isDev && (!host || !isLocalhostHost(host))) {
    protocol = "https";
  }
  return `${protocol}://${host}${port ? `:${port}` : ""}/`;
}

function getNitroOrigin(e) {
  return getNitroOrigin$1({
    isDev: true,
    isPrerender: false,
    requestHost: e ? getRequestHost(e, { xForwardedHost: true }) : void 0,
    requestProtocol: e ? getRequestProtocol(e, { xForwardedProto: true }) : void 0
  });
}

function createSitePathResolver(e, options = {}) {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const nuxtBase = useRuntimeConfig(e).app.baseURL || "/";
  return (path) => {
    return resolveSitePath(path, {
      ...options,
      siteUrl: options.canonical !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    });
  };
}
function withSiteUrl(e, path, options = {}) {
  const siteConfig = e.context.siteConfig?.get();
  let siteUrl = e.context.siteConfigNitroOrigin;
  if ((options.canonical !== false || false) && siteConfig.url)
    siteUrl = siteConfig.url;
  return resolveSitePath(path, {
    absolute: true,
    siteUrl,
    trailingSlash: siteConfig.trailingSlash,
    base: e.context.nitro.baseURL,
    withBase: options.withBase
  });
}

const RE_SOCIAL_META_TAG = /<meta[^>]+(property|name)="(twitter|og):([^"]+)"[^>]*>/g;
const RE_SOCIAL_META_KEY = /(property|name)="(twitter|og):([^"]+)"/;
const RE_META_CONTENT$1 = /content="([^"]+)"/;
const RE_OG_KEY_PARAM = /[,/]k_([^,./]+)/;
function extractSocialPreviewTags(html) {
  const data = [];
  const rootData = {};
  const socialMetaTags = html.match(RE_SOCIAL_META_TAG) || [];
  let currentArrayIdx = -1;
  socialMetaTags.forEach((tag) => {
    const [, , type, key] = tag.match(RE_SOCIAL_META_KEY);
    const value = tag.match(RE_META_CONTENT$1)?.[1];
    if (!value) {
      return;
    }
    if (key === "title" || key === "description") {
      rootData[`${type}:${key}`] = value;
      return;
    }
    if (type === "og" && key === "image") {
      currentArrayIdx++;
    }
    if (!data[currentArrayIdx])
      data[currentArrayIdx] = {};
    if (!data[currentArrayIdx][type])
      data[currentArrayIdx][type] = {};
    data[currentArrayIdx][type][key] = value;
  });
  data.forEach((preview) => {
    if (preview.og?.image && preview.og?.image.includes("/_og/")) {
      const url = withoutQuery$2(preview.og.image);
      const keyMatch = url.match(RE_OG_KEY_PARAM);
      preview.key = keyMatch?.[1] || "og";
    }
  });
  return [rootData, data];
}
function detectBase64MimeType(data) {
  const signatures = {
    "R0lGODdh": "image/gif",
    "R0lGODlh": "image/gif",
    "iVBORw0KGgo": "image/png",
    "/9j/": "image/jpeg",
    "UklGR": "image/webp",
    "AAABAA": "image/x-icon",
    "PHN2Zy": "image/svg+xml",
    // <svg
    "PD94bW": "image/svg+xml",
    // <?xml
    "PCEt": "image/svg+xml"
    // <!--
  };
  for (const s in signatures) {
    if (data.startsWith(s)) {
      return signatures[s];
    }
  }
  return "image/svg+xml";
}
function toBase64Image(data) {
  const base64 = typeof data === "string" ? data : Buffer.from(data).toString("base64");
  const type = detectBase64MimeType(base64);
  return `data:${type};base64,${base64}`;
}
function withoutQuery$2(path) {
  return path.split("?")[0];
}

const RE_BASE64_URL_DASH = /-/g;
const RE_BASE64_URL_TILDE = /~/g;
const RE_DOUBLE_UNDERSCORE = /__/g;
const RE_PLUS = /\+/g;
const RE_SINGLE_UNDERSCORE = /(?<!_)_(?!_)/;
const RE_OG_ROUTE_PREFIX = /\/_og\/[ds]\//;
const RE_COMMA_PARAM_SEPARATOR = /,(?=\w+_)/;
const PARAM_ALIASES = {
  w: "width",
  h: "height",
  c: "component",
  em: "emojis",
  k: "key",
  a: "alt",
  u: "url",
  cache: "cacheMaxAgeSeconds",
  p: "_path",
  // page path - needs alias since _path starts with underscore
  q: "_query",
  // query params - needs alias since _query starts with underscore
  ch: "_componentHash"
  // component template hash for cache busting prerendered URLs
};
Object.fromEntries(
  Object.entries(PARAM_ALIASES).map(([alias, param]) => [param, alias])
);
const KNOWN_PARAMS = /* @__PURE__ */ new Set([
  "width",
  "height",
  "component",
  "renderer",
  "emojis",
  "key",
  "alt",
  "url",
  "cacheMaxAgeSeconds",
  "cacheKey",
  "extension",
  "satori",
  "resvg",
  "sharp",
  "screenshot",
  "takumi",
  "fonts",
  "_query",
  "_hash",
  "_componentHash",
  "socialPreview",
  "props",
  "_path"
]);
const COMPLEX_PARAMS = /* @__PURE__ */ new Set(["satori", "resvg", "sharp", "screenshot", "takumi", "fonts", "_query", "_path"]);
function b64Decode(str) {
  const standard = str.replace(RE_BASE64_URL_DASH, "+").replace(RE_BASE64_URL_TILDE, "/");
  const padded = standard + "=".repeat((4 - standard.length % 4) % 4);
  if (typeof atob === "function") {
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(padded, "base64").toString("utf8");
}
const RE_NUMERIC = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/;
function tryParseNumber(value) {
  if (RE_NUMERIC.test(value)) {
    const num = Number(value);
    if (!Number.isNaN(num))
      return num;
  }
  return value;
}
function decodeSimpleValue(raw) {
  if (raw.startsWith("~~")) {
    return decodeURIComponent(raw.slice(1).replace(RE_PLUS, "%20")).replace(RE_DOUBLE_UNDERSCORE, "_");
  }
  if (raw.startsWith("~")) {
    try {
      return b64Decode(raw.slice(1));
    } catch {
      return decodeURIComponent(raw.replace(RE_PLUS, "%20")).replace(RE_DOUBLE_UNDERSCORE, "_");
    }
  }
  return decodeURIComponent(raw.replace(RE_PLUS, "%20")).replace(RE_DOUBLE_UNDERSCORE, "_");
}
function decodeOgImageParams(encoded) {
  if (!encoded || encoded === "default")
    return {};
  const options = {};
  const parts = encoded.split(RE_COMMA_PARAM_SEPARATOR);
  for (const part of parts) {
    const idx = part.search(RE_SINGLE_UNDERSCORE);
    if (idx === -1)
      continue;
    const alias = part.slice(0, idx);
    let value = part.slice(idx + 1);
    const paramName = PARAM_ALIASES[alias] || alias;
    if (COMPLEX_PARAMS.has(paramName)) {
      try {
        const json = b64Decode(value);
        options[paramName] = JSON.parse(json);
      } catch {
        options[paramName] = value;
      }
    } else if (paramName === "props") {
      try {
        const json = b64Decode(value);
        options.props = { ...options.props, ...JSON.parse(json) };
      } catch {
      }
    } else if (KNOWN_PARAMS.has(paramName)) {
      value = decodeSimpleValue(value);
      if (value === "true") {
        options[paramName] = true;
      } else if (value === "false") {
        options[paramName] = false;
      } else if (value !== "") {
        options[paramName] = tryParseNumber(value);
      }
    } else {
      value = decodeSimpleValue(value);
      options.props = options.props || {};
      if (value === "true") {
        options.props[paramName] = true;
      } else if (value === "false") {
        options.props[paramName] = false;
      } else if (value !== "") {
        options.props[paramName] = tryParseNumber(value);
      }
    }
  }
  return options;
}
function extractEncodedSegment(path, extension) {
  const match = path.match(RE_OG_ROUTE_PREFIX);
  if (match?.index != null) {
    return path.slice(match.index + match[0].length).replace(new RegExp(`\\.${extension}$`), "");
  }
  return path.split("/").pop().replace(new RegExp(`\\.${extension}$`), "");
}

const RE_KEBAB_CASE = /-([a-z])/g;
function isInternalRoute$1(path) {
  return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "alt",
    "props",
    "renderer",
    "component",
    "emojis",
    "_query",
    "_hash",
    "fonts",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "takumi",
    "cacheMaxAgeSeconds",
    "cacheKey",
    "key"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu$1(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => !filterIsOgImageOption(k) && !ignoreKeys.includes(k))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(RE_KEBAB_CASE, (g) => String(g[1]).toUpperCase())] = val;
  });
  const result = Object.fromEntries(
    Object.entries({ ...options }).filter(([k]) => filterIsOgImageOption(k) || ignoreKeys.includes(k))
  );
  if (Object.keys(props).length > 0)
    result.props = props;
  return result;
}
const DANGEROUS_ATTRS = /* @__PURE__ */ new Set(["autofocus", "contenteditable", "tabindex", "accesskey"]);
function sanitizeProps(props) {
  const clean = {};
  for (const key of Object.keys(props)) {
    if (key.startsWith("on") || DANGEROUS_ATTRS.has(key.toLowerCase()))
      continue;
    clean[key] = props[key];
  }
  return clean;
}

const logger$2 = createConsola({
  defaults: {
    tag: "@nuxtjs/og-image"
  }
});

const logger$1 = createConsola({
  defaults: {
    tag: "Nuxt OG Image"
  }
});

const RE_OG_IMAGE_PREFIX$1 = /^OgImage/;
const RE_RENDERER_SUFFIX = /(Satori|Browser|Takumi)$/;
const ejectedTemplates = /* @__PURE__ */ new Set();
function autoEjectCommunityTemplate(component, runtimeConfig, options) {
  if (options?.requestPath?.includes("/_og/")) {
    return;
  }
  const { srcDir, communityTemplatesDir } = runtimeConfig;
  if (!srcDir || !communityTemplatesDir)
    return;
  if (ejectedTemplates.has(component.pascalName))
    return;
  ejectedTemplates.add(component.pascalName);
  const baseName = component.pascalName.replace(RE_OG_IMAGE_PREFIX$1, "").replace(RE_RENDERER_SUFFIX, "");
  const filename = `${baseName}.${component.renderer}.vue`;
  const outputDir = join(srcDir, "components", "OgImage");
  const outputPath = join(outputDir, filename);
  if (existsSync(outputPath))
    return;
  const templatePath = join(communityTemplatesDir, filename);
  if (!existsSync(templatePath)) {
    logger$1.warn(`[nuxt-og-image] Community template not found: ${templatePath}`);
    return;
  }
  if (!existsSync(outputDir))
    mkdirSync(outputDir, { recursive: true });
  const content = readFileSync(templatePath, "utf-8");
  writeFileSync(outputPath, content, "utf-8");
  logger$1.info(`Auto-ejected community template "${baseName}" to ${outputPath}`);
}

function fetchIsland(e, component, props, timeout) {
  const hashId = hash$1([component, props, {}, void 0]).replace(/[-_]/g, "");
  const signal = timeout ? AbortSignal.timeout(timeout) : void 0;
  return e.$fetch(`/__nuxt_island/${component}_${hashId}.json`, {
    params: {
      props: JSON.stringify(props)
    },
    timeout,
    signal
  });
}
function createNitroRouteRuleMatcher$2() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu$1({}, ..._routeRulesMatcher.matchAll(
      withoutBase(withoutTrailingSlash(path.split("?")[0]), app.baseURL)
    ).reverse());
  };
}

const componentNames = [{"hash":"Nii9MheFKbeOSkOj9qtSGSHTVGzl03zt8xU3S9I-GA4","pascalName":"BlogPostTakumi","kebabName":"blog-post-takumi","path":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/BlogPost.takumi.vue","category":"community","renderer":"takumi","propNames":["colorMode","title","author","date","category","avatar","backgroundImage"]},{"hash":"rL7FpBisCop2TG42iQRJGFZZItC3-XzdqfmptP9UCnk","pascalName":"DocsTakumi","kebabName":"docs-takumi","path":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/Docs.takumi.vue","category":"community","renderer":"takumi","propNames":["colorMode","title","description","icon","primaryColor","primaryTextColor","site"]},{"hash":"cFYTVsKa3J48KJwXTJEqV9qZKEA0zgz-W-8jrdXKjZw","pascalName":"NuxtSeoTakumi","kebabName":"nuxt-seo-takumi","path":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/NuxtSeo.takumi.vue","category":"community","renderer":"takumi","propNames":["colorMode","title","description","isPro","width","height"]},{"hash":"qzOKZNUZ-1A2I3uL-N-od-jRWyexKx7JSJZlmOg9NHc","pascalName":"ProductCardTakumi","kebabName":"product-card-takumi","path":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/app/components/Templates/Community/ProductCard.takumi.vue","category":"community","renderer":"takumi","propNames":["colorMode","productName","price","description","image","brand"]}];

const RENDERER_SUFFIXES = ["satori", "browser", "takumi"];
const RE_RENDERER_SUFFIX_DOT = /\.?(satori|browser|takumi)$/i;
const RE_RENDERER_SUFFIX_PASCAL = /(Satori|Browser|Takumi)$/;
const RE_OG_IMAGE_PREFIX = /^OgImage/;
function parseInputName(name) {
  for (const suffix of RENDERER_SUFFIXES) {
    if (name.endsWith(`.${suffix}`))
      return { baseName: name.slice(0, -(suffix.length + 1)), renderer: suffix };
  }
  for (const suffix of RENDERER_SUFFIXES) {
    const pascal = suffix.charAt(0).toUpperCase() + suffix.slice(1);
    if (name.endsWith(pascal))
      return { baseName: name.slice(0, -pascal.length), renderer: suffix };
  }
  return { baseName: name, renderer: null };
}
function stripRenderer(name) {
  return name.replace(RE_RENDERER_SUFFIX_DOT, "").replace(RE_RENDERER_SUFFIX_PASCAL, "");
}
const OGIMAGE_PREFIXES = [
  { prefix: "OgImageCommunity", overlapWord: "Community" },
  { prefix: "OgImageTemplate", overlapWord: "Template" },
  { prefix: "OgImage", overlapWord: "Image" }
];
function getComponentBaseNames(component) {
  const names = [];
  const stripped = stripRenderer(component.pascalName);
  for (const { prefix, overlapWord } of OGIMAGE_PREFIXES) {
    if (!stripped.startsWith(prefix))
      continue;
    const withoutPrefix = stripped.slice(prefix.length);
    if (withoutPrefix) {
      names.push(withoutPrefix);
      if (withoutPrefix !== overlapWord)
        names.push(overlapWord + withoutPrefix);
    } else {
      names.push(overlapWord);
    }
    break;
  }
  if (names.length === 0)
    names.push(stripped);
  return names;
}
function resolveComponent(name) {
  const exactMatch = componentNames.find((c) => c.pascalName === name);
  if (exactMatch)
    return { component: exactMatch, renderer: exactMatch.renderer };
  const { baseName, renderer } = parseInputName(name);
  const strippedBaseName = baseName.replace(RE_OG_IMAGE_PREFIX, "");
  const matches = componentNames.filter((c) => {
    const baseNames = getComponentBaseNames(c);
    return baseNames.some(
      (cBase) => cBase === baseName || cBase === strippedBaseName || cBase === `OgImage${baseName}` || cBase === `OgImage${strippedBaseName}`
    );
  });
  const filtered = renderer ? matches.filter((c) => c.renderer === renderer) : matches;
  if (filtered.length === 0) {
    if (renderer && matches.length > 0) {
      const available = matches.map((c) => `${getComponentBaseNames(c)[0]}.${c.renderer}`).join(", ");
      throw createError({
        statusCode: 500,
        message: `[Nuxt OG Image] Component "${name}" not found. Available variants: ${available}`
      });
    }
    throw createError({
      statusCode: 500,
      message: `[Nuxt OG Image] Component "${name}" not found. Create a component in components/OgImage/ with a renderer suffix (e.g., ${baseName}.satori.vue)`
    });
  }
  const appComponents = filtered.filter((c) => c.category !== "community");
  if (appComponents.length > 0) {
    const resolved2 = appComponents[0];
    return { component: resolved2, renderer: resolved2.renderer };
  }
  const resolved = filtered[0];
  return { component: resolved, renderer: resolved.renderer };
}
function normaliseOptions(_options) {
  const options = { ..._options };
  if (options.component === "PageScreenshot") {
    return {
      options,
      renderer: options.renderer || "browser",
      component: void 0
    };
  }
  if (!componentNames?.length) {
    throw createError({
      statusCode: 500,
      message: `[Nuxt OG Image] No OG Image components found. Create a component in components/OgImage/ with a renderer suffix (e.g., Default.satori.vue)`
    });
  }
  let resolved;
  let renderer;
  if (options.component) {
    const result = resolveComponent(options.component);
    resolved = result.component;
    renderer = result.renderer;
  } else {
    resolved = componentNames.find((c) => c.category !== "community") || componentNames[0];
    renderer = resolved.renderer;
  }
  options.component = resolved.pascalName;
  if (resolved.category === "community") ;
  return {
    options,
    renderer,
    component: resolved
  };
}

const RE_TOKEN = /[^\w-]/g;
function sanitizeName(name) {
  return name.replace(RE_TOKEN, "_");
}
function createTimings() {
  const totals = /* @__PURE__ */ new Map();
  const spans = /* @__PURE__ */ new Map();
  const record = (name, ms) => {
    const key = sanitizeName(name);
    const existing = totals.get(key);
    if (existing) {
      existing.dur += ms;
      existing.count += 1;
    } else {
      totals.set(key, { dur: ms, count: 1 });
    }
  };
  const start = (name) => {
    const key = sanitizeName(name);
    const t0 = performance.now();
    const span = spans.get(key) ?? { open: 0, windowStart: 0, wall: 0 };
    if (span.open === 0)
      span.windowStart = t0;
    span.open += 1;
    spans.set(key, span);
    let ended = false;
    return () => {
      if (ended)
        return 0;
      ended = true;
      const t1 = performance.now();
      const ms = t1 - t0;
      span.open -= 1;
      if (span.open === 0) {
        span.wall += t1 - span.windowStart;
        const existing = totals.get(key);
        if (existing) {
          existing.dur = span.wall;
          existing.count += 1;
        } else {
          totals.set(key, { dur: span.wall, count: 1 });
        }
      } else {
        const existing = totals.get(key);
        if (existing)
          existing.count += 1;
        else
          totals.set(key, { dur: 0, count: 1 });
      }
      return ms;
    };
  };
  const measure = async (name, fn) => {
    const end = start(name);
    try {
      return await fn();
    } finally {
      end();
    }
  };
  const entries = () => Array.from(totals.entries()).map(([name, v]) => ({
    name,
    dur: Math.round(v.dur * 1e3) / 1e3,
    count: v.count > 1 ? v.count : void 0
  }));
  const header = () => entries().map(({ name, dur, count }) => {
    const desc = count ? `;desc="n=${count}"` : "";
    return `${name}${desc};dur=${dur}`;
  }).join(", ");
  return { start, record, measure, entries, header };
}
const TIMING_CTX_KEY = "_ogImageTimings";

function withTimeout(promise, ms, label) {
  let timer;
  return Promise.race([
    Promise.resolve(promise),
    new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`${label} timed out after ${ms}ms`)),
        ms
      );
    })
  ]).finally(() => clearTimeout(timer));
}

function useOgImageRuntimeConfig(e) {
  const c = useRuntimeConfig(e);
  const moduleCfg = c["nuxt-og-image"] || {};
  const cloudflareEnv = e?.context.cloudflare?.env || e?.context?._platform?.cloudflare?.env;
  const overrideSecret = c.ogImage?.secret || cloudflareEnv?.NUXT_OG_IMAGE_SECRET;
  const security = overrideSecret ? { ...moduleCfg.security || {}, secret: overrideSecret } : moduleCfg.security;
  return {
    defaults: {},
    ...moduleCfg,
    security,
    app: {
      baseURL: c.app.baseURL
    }
  };
}

const satoriRendererInstance = { instance: void 0 };
const browserRendererInstance = { instance: void 0 };
const takumiRendererInstance = { instance: void 0 };
async function getSatoriRenderer() {
  satoriRendererInstance.instance = satoriRendererInstance.instance || await Promise.resolve().then(function () { return empty; }).then((m) => m.default);
  return satoriRendererInstance.instance;
}
async function getBrowserRenderer() {
  browserRendererInstance.instance = browserRendererInstance.instance || await Promise.resolve().then(function () { return empty; }).then((m) => m.default);
  return browserRendererInstance.instance;
}
async function getTakumiRenderer() {
  takumiRendererInstance.instance = takumiRendererInstance.instance || await Promise.resolve().then(function () { return renderer$1; }).then((m) => m.default);
  return takumiRendererInstance.instance;
}

const RE_HASH_MODE = /^o_([a-z0-9]+)$/i;
const RE_SIGNATURE_SUFFIX = /,s_([^,]+)$/;
function resolvePathCacheKey(e, path, resolvedOptions) {
  const siteConfig = getSiteConfig(e, {
    resolveRefs: true
  });
  const basePath = withoutTrailingSlash(withoutLeadingSlash(normalizeKey(path)));
  const hashParts = [
    basePath,
    siteConfig.url
  ];
  if (resolvedOptions)
    hashParts.push(hash$1(resolvedOptions));
  return [
    !basePath || basePath === "/" ? "index" : basePath,
    hash$1(hashParts)
  ].join(":");
}
async function resolveContext(e) {
  const runtimeConfig = useOgImageRuntimeConfig(e);
  const resolvePathWithBase = createSitePathResolver(e, {
    absolute: false,
    withBase: true
  });
  const path = resolvePathWithBase(parseURL(e.path).pathname);
  let extension = path.split(".").pop();
  if (!extension || !path.includes(".") || extension.includes("/") || !["png", "jpeg", "jpg", "webp", "svg", "html", "json"].includes(extension)) {
    extension = "png";
  }
  const encodedSegment = extractEncodedSegment(path, extension);
  const secret = runtimeConfig.security?.secret;
  let paramsSegment = encodedSegment;
  if (secret && RE_SIGNATURE_SUFFIX.test(encodedSegment)) {
    paramsSegment = encodedSegment.replace(RE_SIGNATURE_SUFFIX, "");
  }
  const hashMatch = paramsSegment.match(RE_HASH_MODE);
  let urlOptions = {};
  if (hashMatch) {
    const optionsHash = hashMatch[1];
    {
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Hash-based URLs (o_${optionsHash}) are only supported during prerendering. Use encoded params or query params for runtime.`
      });
    }
  } else {
    urlOptions = decodeOgImageParams(paramsSegment);
  }
  const maxQueryParamSize = runtimeConfig.security?.maxQueryParamSize;
  if (maxQueryParamSize && true) {
    const queryString = parseURL(e.path).search || "";
    if (queryString.length > maxQueryParamSize) {
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Query string exceeds maximum allowed length of ${maxQueryParamSize} characters.`
      });
    }
  }
  let queryParams = {};
  {
    const query = getQuery$1(e);
    for (const k in query) {
      const v = String(query[k]);
      if (!v)
        continue;
      if (v.startsWith("{")) {
        try {
          queryParams[k] = JSON.parse(v);
        } catch {
        }
      } else {
        queryParams[k] = v;
      }
    }
    delete queryParams.html;
    queryParams = separateProps(queryParams);
  }
  const basePath = withoutTrailingSlash(urlOptions._path || "/");
  const componentHash = urlOptions._componentHash || "";
  delete urlOptions._path;
  delete urlOptions._hash;
  delete urlOptions._componentHash;
  if (runtimeConfig.security?.strict) {
    delete urlOptions.html;
  }
  const basePathWithQuery = queryParams._query && typeof queryParams._query === "object" ? withQuery(basePath, queryParams._query) : basePath;
  const isDebugJsonPayload = extension === "json" && (true);
  const routeRuleMatcher = createNitroRouteRuleMatcher$2();
  const routeRules = routeRuleMatcher(basePath);
  const ogImageRouteRules = separateProps(routeRules.ogImage);
  const options = defu$1(queryParams, urlOptions, ogImageRouteRules, runtimeConfig.defaults);
  const maxDim = runtimeConfig.security?.maxDimension || 2048;
  if (options.width != null) {
    const w = Number(options.width);
    options.width = Number.isFinite(w) ? Math.min(Math.max(1, w), maxDim) : void 0;
  }
  if (options.height != null) {
    const h = Number(options.height);
    options.height = Number.isFinite(h) ? Math.min(Math.max(1, h), maxDim) : void 0;
  }
  if (options.props && typeof options.props === "object")
    options.props = sanitizeProps(options.props);
  if (!options) {
    return createError({
      statusCode: 404,
      statusMessage: "[Nuxt OG Image] OG Image not found."
    });
  }
  const normalised = normaliseOptions(options);
  if (normalised.component && normalised.options.props && typeof normalised.options.props === "object") {
    const builtinProps = /* @__PURE__ */ new Set(["colorMode", "timestamp"]);
    const allowedProps = normalised.component.propNames || [];
    const allowedSet = new Set(allowedProps);
    const raw = normalised.options.props;
    const filtered = {};
    for (const key2 of Object.keys(raw)) {
      if (allowedSet.has(key2) || builtinProps.has(key2))
        filtered[key2] = raw[key2];
      else logger$2.warn(`[Nuxt OG Image] Prop "${key2}" is not declared by component "${normalised.component.pascalName}". Declared props: ${allowedProps.join(", ")}`);
    }
    normalised.options.props = filtered;
  }
  if (normalised.component?.category === "community")
    autoEjectCommunityTemplate(normalised.component, runtimeConfig, { requestPath: e.path });
  const rendererType = normalised.renderer;
  const baseCacheKey = normalised.options.cacheKey || (hashMatch ? `hash:${hashMatch[1]}` : resolvePathCacheKey(e, basePathWithQuery, normalised.options));
  const key = componentHash ? `${baseCacheKey}:${componentHash}` : baseCacheKey;
  let renderer;
  switch (rendererType) {
    case "satori":
      renderer = await getSatoriRenderer();
      break;
    case "browser":
      renderer = await getBrowserRenderer();
      break;
    case "takumi":
      renderer = await getTakumiRenderer();
      break;
  }
  if (!renderer || renderer.__mock__) {
    throw createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Renderer "${rendererType}" is not available. Component "${normalised.component?.pascalName}" requires the ${rendererType} renderer but it's not bundled for this preset.`
    });
  }
  const timings = e.context[TIMING_CTX_KEY] || createTimings();
  e.context[TIMING_CTX_KEY] = timings;
  const ctx = {
    e,
    key,
    renderer,
    isDevToolsContextRequest: isDebugJsonPayload,
    runtimeConfig,
    publicStoragePath: runtimeConfig.publicStoragePath,
    extension,
    basePath,
    options: normalised.options,
    timings,
    // @ts-expect-error hookable v6
    _nitro: useNitroApp()
  };
  const hookTimeout = runtimeConfig.security?.renderTimeout ?? 15e3;
  await withTimeout(
    ctx._nitro.hooks.callHook("nuxt-og-image:context", ctx),
    hookTimeout,
    "nuxt-og-image:context hook"
  );
  return ctx;
}

const _nJ_0TyIWXjajZeiLx85MmdiThPFQmjM1GW6wdAkhmYA = defineNitroPlugin(async (nitro) => {
  return;
});

const rootDir$1 = "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site";

const appHead = {"link":[{"rel":"icon","type":"image/png","href":"/favicon.png"},{"rel":"apple-touch-icon","href":"/favicon.png"}],"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"},{"name":"description","content":"Descubre PITAYA LAB: velas de soya perfumadas, aceites aromáticos para difusores y brumas aromáticas ecológicas. Productos botánicos biodegradables que transforman tu hogar con fragancias inspiradas en la naturaleza y hoteles de lujo."},{"name":"keywords","content":"velas de soya, aceites aromáticos, brumas aromáticas, aromatizantes naturales, Pitaya Lab, productos biodegradables, fragancias para hogar, Xcaret, Vidanta, Solara, Maderas del Edén"},{"property":"og:title","content":"PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas"},{"property":"og:description","content":"Productos botánicos biodegradables que transforman tu hogar con exquisitas fragancias. Velas de soya, aceites aromáticos y brumas."},{"property":"og:type","content":"website"},{"property":"og:url","content":"https://pitayalab.com"},{"name":"robots","content":"index, follow"}],"style":[],"script":[],"noscript":[],"charset":"utf-8","viewport":"width=device-width, initial-scale=1","title":"PITAYA LAB | Velas de Soya, Aceites Aromáticos y Brumas Ecológicas","htmlAttrs":{}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined,
	Symbol: (data) => typeof data === "symbol" ? data.description ?? "" : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _gYxzXHz7KD9b0uOzpDEMSd1vFZVZ5invXaxkOTB9IQA = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir$1), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			
			filename,
			
			stack: trace
		};
		
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const plugins = [
  _qVimX5_0COVWYAmZOUGpMDnI6H_rRIfsIWZhnCRb8I,
_sqFPuib21LTMfdr067pELXHEex8SId7j7V9v2yo84a4,
_G4jgSMse8USGLBKPDVbP0ZJM6TRJbry9Vlle4ptgHw,
_nJ_0TyIWXjajZeiLx85MmdiThPFQmjM1GW6wdAkhmYA,
_gYxzXHz7KD9b0uOzpDEMSd1vFZVZ5invXaxkOTB9IQA,
_wH6JrtIxmaSoA8lCPWFnE9z4lQeXW6H5z3l5aymEQw
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$7(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_og-static-fonts/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _qo472K = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const PORT_SUFFIX_RE = /:\d+$/;
const _V62Qqs = eventHandler(async (e) => {
  if (e.context._initedSiteConfig)
    return;
  const runtimeConfig = useRuntimeConfig(e);
  const config = runtimeConfig["nuxt-site-config"];
  const nitroApp = useNitroApp();
  const siteConfig = e.context.siteConfig || createSiteConfigStack({
    debug: config.debug
  });
  const nitroOrigin = getNitroOrigin(e);
  e.context.siteConfigNitroOrigin = nitroOrigin;
  {
    siteConfig.push({
      _context: "nitro:init",
      _priority: SiteConfigPriority.nitro,
      url: nitroOrigin
    });
  }
  siteConfig.push({
    _context: "runtimeEnv",
    _priority: SiteConfigPriority.runtime,
    ...runtimeConfig.site || {},
    ...runtimeConfig.public.site || {},
    ...envSiteConfig(globalThis._importMeta_.env || {})
    // just in-case, shouldn't be needed
  });
  const buildStack = config.stack || [];
  buildStack.forEach((c) => siteConfig.push(c));
  if (e.context._nitro.routeRules.site) {
    siteConfig.push({
      _context: "route-rules",
      ...e.context._nitro.routeRules.site
    });
  }
  if (config.multiTenancy) {
    const host = parseURL(nitroOrigin).host?.replace(PORT_SUFFIX_RE, "") || "";
    const tenant = config.multiTenancy?.find((t) => t.hosts.includes(host));
    if (tenant) {
      siteConfig.push({
        _context: `multi-tenancy:${host}`,
        _priority: SiteConfigPriority.runtime,
        ...tenant.config
      });
    }
  }
  const ctx = { siteConfig, event: e };
  await nitroApp.hooks.callHook("site-config:init", ctx);
  e.context.siteConfig = ctx.siteConfig;
  e.context._initedSiteConfig = true;
});

const _qhm7Yd = eventHandler(async (e) => {
  const siteConfig = getSiteConfig(e);
  const nitroOrigin = getNitroOrigin(e);
  const runtimeConfig = useRuntimeConfig(e);
  const stack = e.context.siteConfig.stack;
  setHeader(e, "Content-Type", "application/json");
  return {
    config: siteConfig,
    stack,
    nitroOrigin,
    version: runtimeConfig["nuxt-site-config"].version
  };
});

function getSiteIndexable(e) {
  const { env, indexable } = getSiteConfig(e);
  if (typeof indexable !== "undefined")
    return String(indexable) === "true";
  return env === "production";
}

function getSiteRobotConfig(e) {
  const query = getQuery$1(e);
  const hints = [];
  const { groups, debug } = useRuntimeConfigNuxtRobots(e);
  let indexable = getSiteIndexable(e);
  const queryIndexableEnabled = String(query.mockProductionEnv) === "true" || query.mockProductionEnv === "";
  {
    const { _context } = getSiteConfig(e, { debug: debug || true });
    if (queryIndexableEnabled) {
      indexable = true;
      hints.push("You are mocking a production enviroment with ?mockProductionEnv query.");
    } else if (!indexable && _context.indexable === "nuxt-robots:config") {
      hints.push("You are blocking indexing with your Nuxt Robots config.");
    } else if (!queryIndexableEnabled && !_context.indexable) {
      hints.push(`Indexing is blocked in development. You can mock a production environment with ?mockProductionEnv query.`);
    } else if (!indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is blocked by site config set by ${_context.indexable}.`);
    } else if (indexable && !queryIndexableEnabled) {
      hints.push(`Indexing is enabled from ${_context.indexable}.`);
    }
  }
  if (groups.some((g) => g.userAgent.includes("*") && g.disallow.includes("/"))) {
    indexable = false;
    hints.push("You are blocking all user agents with a wildcard `Disallow /`.");
  } else if (groups.some((g) => g.disallow.includes("/"))) {
    hints.push("You are blocking specific user agents with `Disallow /`.");
  }
  return { indexable, hints };
}

const _RM7jao = defineEventHandler(async (e) => {
  const nitroApp = useNitroApp();
  const { indexable, hints } = getSiteRobotConfig(e);
  const { credits, isNuxtContentV2, cacheControl } = useRuntimeConfigNuxtRobots(e);
  let robotsTxtCtx = {
    sitemaps: [],
    groups: [
      {
        allow: [],
        comment: [],
        userAgent: ["*"],
        disallow: ["/"]
      }
    ]
  };
  if (indexable) {
    robotsTxtCtx = await resolveRobotsTxtContext(e);
    robotsTxtCtx.sitemaps = [...new Set(
      asArray(robotsTxtCtx.sitemaps).map((s) => !s.startsWith("http") ? withSiteUrl(e, s, { withBase: true}) : s)
    )];
    if (isNuxtContentV2) {
      const contentWithRobotRules = await e.$fetch("/__robots__/nuxt-content.json", {
        headers: {
          Accept: "application/json"
        }
      });
      if (String(contentWithRobotRules).trim().startsWith("<!DOCTYPE")) {
        logger$3.error("Invalid HTML returned from /__robots__/nuxt-content.json, skipping.");
      } else {
        for (const group of robotsTxtCtx.groups) {
          if (group.userAgent.includes("*")) {
            group.disallow.push(...contentWithRobotRules);
            group.disallow = group.disallow.filter(Boolean);
          }
        }
      }
    }
  }
  let robotsTxt = generateRobotsTxt(robotsTxtCtx);
  if (hints.length) {
    robotsTxt += `
# DEVELOPMENT HINTS:
# - ${hints.join("\n# - ")}
`;
  }
  if (credits) {
    robotsTxt = [
      `# START nuxt-robots (${indexable ? "indexable" : "indexing disabled"})`,
      robotsTxt,
      "# END nuxt-robots"
    ].filter(Boolean).join("\n");
  }
  setHeader(e, "Content-Type", "text/plain; charset=utf-8");
  setHeader(e, "Cache-Control", "no-store" );
  const hookCtx = { robotsTxt, e };
  await nitroApp.hooks.callHook("robots:robots-txt", hookCtx);
  return hookCtx.robotsTxt;
});

function withoutQuery$1(path) {
  return String(path.split("?")[0]);
}
function createNitroRouteRuleMatcher$1(e) {
  const { nitro, app } = useRuntimeConfig(e);
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (path) => {
    return defu$1({}, ..._routeRulesMatcher.matchAll(
      withoutBase(withoutTrailingSlash(withoutQuery$1(path)), app.baseURL)
    ).reverse());
  };
}

function getPathRobotConfig(e, options) {
  const runtimeConfig = useRuntimeConfig(e);
  const { robotsDisabledValue, robotsEnabledValue, isNuxtContentV2 } = useRuntimeConfigNuxtRobots(e);
  if (!options?.skipSiteIndexable) {
    if (!getSiteRobotConfig(e).indexable) {
      return {
        rule: robotsDisabledValue,
        indexable: false,
        debug: {
          source: "Site Config"
        }
      };
    }
  }
  const path = options?.path || e.path;
  let userAgent = options?.userAgent;
  if (!userAgent) {
    try {
      userAgent = getRequestHeader(e, "User-Agent");
    } catch {
    }
  }
  const nitroApp = useNitroApp();
  const groups = [
    // run explicit user agent matching first
    ...nitroApp._robots.ctx.groups.filter((g) => {
      if (userAgent) {
        return g.userAgent.some((ua) => ua.toLowerCase().includes(userAgent.toLowerCase()));
      }
      return false;
    }),
    // run wildcard matches second
    ...nitroApp._robots.ctx.groups.filter((g) => g.userAgent.includes("*"))
  ];
  for (const group of groups) {
    if (!options?.skipSiteIndexable && group._indexable === false) {
      return {
        indexable: false,
        rule: robotsDisabledValue,
        debug: {
          source: "/robots.txt",
          line: JSON.stringify(group)
        }
      };
    }
    const rules = options?.skipSiteIndexable ? (group._rules || []).filter((r) => r.pattern !== "/") : group._rules || [];
    const robotsTxtRule = matchPathToRule(path, rules);
    if (robotsTxtRule) {
      if (!robotsTxtRule.allow) {
        return {
          indexable: false,
          rule: robotsDisabledValue,
          debug: {
            source: "/robots.txt",
            line: `Disallow: ${robotsTxtRule.pattern}`
          }
        };
      }
      break;
    }
  }
  if (isNuxtContentV2 && nitroApp._robots?.nuxtContentUrls?.has(withoutTrailingSlash(path))) {
    return {
      indexable: false,
      rule: robotsDisabledValue,
      debug: {
        source: "Nuxt Content"
      }
    };
  }
  const { pageMetaRobots } = useRuntimeConfigNuxtRobots(e);
  const pageMetaRule = pageMetaRobots?.[withoutTrailingSlash(path)];
  if (typeof pageMetaRule !== "undefined") {
    const normalised = normaliseRobotsRouteRule({ robots: pageMetaRule });
    if (normalised && (typeof normalised.allow !== "undefined" || typeof normalised.rule !== "undefined")) {
      return {
        indexable: normalised.allow ?? false,
        rule: normalised.rule || (normalised.allow ? robotsEnabledValue : robotsDisabledValue),
        debug: {
          source: "Page Meta"
        }
      };
    }
  }
  nitroApp._robotsRuleMatcher = nitroApp._robotsRuleMatcher || createNitroRouteRuleMatcher$1(e);
  let robotRouteRules = nitroApp._robotsRuleMatcher(path);
  let routeRulesPath = path;
  const i18nConfig = runtimeConfig.public?.i18n;
  if (i18nConfig?.locales && typeof robotRouteRules.robots === "undefined") {
    const { locales } = i18nConfig;
    const locale = locales.find((l) => routeRulesPath.startsWith(`/${l.code}`));
    if (locale) {
      routeRulesPath = routeRulesPath.replace(`/${locale.code}`, "");
      robotRouteRules = nitroApp._robotsRuleMatcher(routeRulesPath);
    }
  }
  const routeRules = normaliseRobotsRouteRule(robotRouteRules);
  if (routeRules && (typeof routeRules.allow !== "undefined" || typeof routeRules.rule !== "undefined")) {
    return {
      indexable: routeRules.allow ?? false,
      rule: routeRules.rule || (routeRules.allow ? robotsEnabledValue : robotsDisabledValue),
      debug: {
        source: "Route Rules"
      }
    };
  }
  return {
    indexable: true,
    rule: robotsEnabledValue
  };
}

const _phqCO7 = defineEventHandler(async (e) => {
  if (e.path === "/robots.txt" || e.path.startsWith("/__") || e.path.startsWith("/api") || e.path.startsWith("/_nuxt"))
    return;
  const nuxtRobotsConfig = useRuntimeConfigNuxtRobots(e);
  if (nuxtRobotsConfig) {
    const { header } = nuxtRobotsConfig;
    const robotConfig = getPathRobotConfig(e, { skipSiteIndexable: Boolean(getQuery$1(e)?.mockProductionEnv) });
    if (header) {
      setHeader(e, "X-Robots-Tag", robotConfig.rule);
    }
    e.context.robots = robotConfig;
    {
      const productionRobotConfig = getPathRobotConfig(e, { skipSiteIndexable: true });
      setHeader(e, "X-Robots-Production", productionRobotConfig.rule);
      e.context.robotsProduction = productionRobotConfig;
    }
  }
});

const _fgAqrj = defineEventHandler(async (e) => {
  const runtimeConfig = useRuntimeConfigNuxtRobots(e);
  const { indexable, hints } = getSiteRobotConfig(e);
  const siteConfig = getSiteConfig(e);
  const robotsTxt = await e.$fetch("/robots.txt", {
    query: getQuery$1(e)
  });
  const parsed = validateRobots(parseRobotsTxt(robotsTxt));
  return {
    robotsTxt,
    indexable,
    hints,
    runtimeConfig,
    siteConfig: {
      url: siteConfig.url,
      env: siteConfig.env,
      indexable: siteConfig.indexable
    },
    validation: {
      errors: parsed.errors,
      warnings: parsed.warnings,
      groups: parsed.groups.length,
      sitemaps: parsed.sitemaps
    }
  };
});

function extractRobotsMetaFromHtml(html) {
  const metaTag = html.match(/<meta\s[^>]*\bname=["']robots["'][^>]*>/i)?.[0];
  if (!metaTag)
    return null;
  const content = metaTag.match(/(?:^|\s)content=["']([^"']+)["']/i)?.[1] || null;
  const productionContent = metaTag.match(/(?:^|\s)data-production-content=["']([^"']+)["']/i)?.[1] || null;
  const hint = metaTag.match(/(?:^|\s)data-hint=["']([^"']+)["']/i)?.[1] || null;
  return { content, productionContent, hint };
}

const _BR08O_ = defineEventHandler(async (e) => {
  const query = getQuery$1(e);
  const path = query.path;
  const isMockProduction = Boolean(query.mockProductionEnv);
  delete query.path;
  let robotsHeader = null;
  let robotsContent = null;
  let robotsHint = null;
  const res = await $fetch.raw(withQuery(path, query)).catch(() => null);
  if (res) {
    const html = String(res._data);
    robotsHeader = res.headers.get("x-robots-tag") || null;
    const meta = extractRobotsMetaFromHtml(html);
    if (meta) {
      if (isMockProduction) {
        const productionHeader = res.headers.get("x-robots-production");
        if (productionHeader) {
          robotsHeader = productionHeader;
        }
        if (meta.productionContent) {
          robotsContent = meta.productionContent;
          robotsHint = meta.hint;
        }
      }
      if (!robotsContent && meta.content) {
        robotsContent = meta.content;
        robotsHint = meta.hint;
      }
    }
  }
  if (!robotsContent) {
    const robotConfig = getPathRobotConfig(e, {
      path,
      skipSiteIndexable: isMockProduction
    });
    robotsContent = robotConfig.rule;
    robotsHint = robotConfig.debug?.source || null;
    if (!robotsHeader) {
      robotsHeader = robotConfig.rule;
    }
  }
  const [source, line] = robotsHint ? robotsHint.split(",") : [null, null];
  return {
    rule: robotsContent,
    indexable: !(robotsContent?.includes("noindex") || robotsHeader?.includes("noindex")),
    crawlable: !(source === "/robots.txt"),
    path,
    debug: {
      source,
      line
    },
    robotsHeader,
    robotsContent
  };
});

const _lEmhsx = defineEventHandler(async (e) => {
  const { url, mode } = getQuery$1(e);
  if (!url || typeof url !== "string")
    return { url: "", robotsTxt: "", indexable: false, hints: [], validation: { errors: [], warnings: [], groups: 0, sitemaps: [] }, hasRemoteDebug: false, error: "Missing url query parameter" };
  const baseUrl = url.replace(/\/$/, "");
  if (mode === "debug") {
    const debugUrl = `${baseUrl}/__robots__/debug.json`;
    const response2 = await fetch(debugUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(1e4)
    }).catch(() => null);
    if (response2?.ok) {
      const json = await response2.json().catch(() => null);
      if (json?.robotsTxt) {
        return {
          ...json,
          url: baseUrl,
          hasRemoteDebug: true
        };
      }
    }
  }
  const robotsUrl = `${baseUrl}/robots.txt`;
  const response = await fetch(robotsUrl, {
    headers: { Accept: "text/plain" },
    signal: AbortSignal.timeout(15e3)
  }).catch((err) => err);
  if (response instanceof Error)
    return { url: baseUrl, robotsTxt: "", indexable: false, hints: [], validation: { errors: [], warnings: [], groups: 0, sitemaps: [] }, hasRemoteDebug: false, error: `Failed to fetch robots.txt: ${response.message}` };
  if (!response.ok)
    return { url: baseUrl, robotsTxt: "", indexable: false, hints: [], validation: { errors: [], warnings: [], groups: 0, sitemaps: [] }, hasRemoteDebug: false, error: `HTTP ${response.status}: ${response.statusText}` };
  const robotsTxt = await response.text();
  const parsed = validateRobots(parseRobotsTxt(robotsTxt));
  const hasBlockAll = parsed.groups.some(
    (g) => g.userAgent.includes("*") && g.disallow.includes("/")
  );
  return {
    url: baseUrl,
    robotsTxt,
    indexable: !hasBlockAll,
    hints: hasBlockAll ? ["robots.txt blocks all crawlers with Disallow: /"] : [],
    validation: {
      errors: parsed.errors,
      warnings: parsed.warnings,
      groups: parsed.groups.length,
      sitemaps: parsed.sitemaps
    },
    hasRemoteDebug: false
  };
});

const logger = createConsola({
  defaults: {
    tag: "@nuxt/sitemap"
  }
});
const merger$1 = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey$1(arr, key) {
  const seen = /* @__PURE__ */ new Map();
  let resultLength = 0;
  const result = Array.from({ length: arr.length });
  for (const item of arr) {
    const k = item[key];
    if (seen.has(k)) {
      const existingIndex = seen.get(k);
      result[existingIndex] = merger$1(item, result[existingIndex]);
    } else {
      seen.set(k, resultLength);
      result[resultLength++] = item;
    }
  }
  result.length = resultLength;
  return result;
}
function splitForLocales(path, locales) {
  const prefix = withLeadingSlash(path).split("/")[1];
  if (prefix && locales.includes(prefix))
    return [prefix, path.replace(`/${prefix}`, "")];
  return [null, path];
}
function resolveI18nSitemapLocaleKey(sitemapName, localeSitemapKeys) {
  let best = null;
  for (const key of localeSitemapKeys) {
    if (sitemapName === key || sitemapName.startsWith(`${key}-`)) {
      if (best === null || key.length > best.length)
        best = key;
    }
  }
  return best;
}
const StringifiedRegExpPattern = /\/(.*?)\/([gimsuy]*)$/;
function normalizeRuntimeFilters(input) {
  return (input || []).map((rule) => {
    if (rule instanceof RegExp || typeof rule === "string")
      return rule;
    const match = rule.regex.match(StringifiedRegExpPattern);
    if (match)
      return new RegExp(match[1], match[2]);
    return false;
  }).filter(Boolean);
}
function createPathFilter(options = {}, baseURL) {
  const urlFilter = createFilter({
    include: normalizeRuntimeFilters(options.include),
    exclude: normalizeRuntimeFilters(options.exclude)
  });
  const hasBase = baseURL !== "/";
  return (loc) => {
    let path = loc;
    try {
      path = parseURL(loc).pathname;
    } catch {
      return false;
    }
    if (hasBase)
      path = withoutBase(path, baseURL);
    return urlFilter(path);
  };
}
function findPageMapping(pathWithoutPrefix, pages) {
  const stripped = pathWithoutPrefix[0] === "/" ? pathWithoutPrefix.slice(1) : pathWithoutPrefix;
  const pageKey = stripped.endsWith("/index") ? stripped.slice(0, -6) || "index" : stripped || "index";
  if (pages[pageKey])
    return { mappings: pages[pageKey], paramSegments: [] };
  const sortedKeys = Object.keys(pages).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (pageKey.startsWith(`${key}/`)) {
      const paramPath = pageKey.slice(key.length + 1);
      return { mappings: pages[key], paramSegments: paramPath.split("/") };
    }
  }
  return null;
}
function applyDynamicParams(customPath, paramSegments) {
  if (!paramSegments.length)
    return customPath;
  let i = 0;
  return customPath.replace(/\[[^\]]+\]/g, () => paramSegments[i++] || "");
}

const VALID_CHANGEFREQ = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
function validateSitemapUrl(url) {
  if (typeof url === "string")
    return [];
  const warnings = [];
  if (url.lastmod) {
    const d = typeof url.lastmod === "string" ? url.lastmod : void 0;
    if (d && !isValidW3CDate(d))
      warnings.push(`lastmod "${d}" is not a valid W3C date`);
  }
  if (url.changefreq && !VALID_CHANGEFREQ.includes(url.changefreq))
    warnings.push(`changefreq "${url.changefreq}" is not valid (expected: always|hourly|daily|weekly|monthly|yearly|never)`);
  if (url.priority !== void 0) {
    const p = typeof url.priority === "number" ? url.priority : Number.parseFloat(String(url.priority));
    if (Number.isNaN(p) || p < 0 || p > 1)
      warnings.push(`priority "${url.priority}" is not valid (expected: number between 0.0 and 1.0)`);
  }
  return warnings;
}
function resolve$5(s, resolvers) {
  if (typeof s === "undefined")
    return void 0;
  const str = typeof s === "string" ? s : s.toString();
  if (!resolvers)
    return str;
  if (hasProtocol(str, { acceptRelative: true, strict: false }))
    return resolvers.fixSlashes(str);
  return resolvers.canonicalUrlResolver(str);
}
function removeTrailingSlash(s) {
  return s.replace(/\/(\?|#|$)/, "$1");
}
function preNormalizeEntry(_e, resolvers) {
  const input = typeof _e === "string" ? { loc: _e } : { ..._e };
  if (input.url && !input.loc) {
    input.loc = input.url;
  }
  delete input.url;
  if (typeof input.loc !== "string") {
    input.loc = "";
  }
  const skipEncoding = input._encoded === true;
  const e = input;
  e.loc = removeTrailingSlash(e.loc);
  e._abs = hasProtocol(e.loc, { acceptRelative: false, strict: false });
  try {
    e._path = e._abs ? parseURL(e.loc) : parsePath(e.loc);
  } catch {
    e._path = null;
  }
  if (e._path) {
    const search = e._path.search;
    const qs = search && search.length > 1 ? stringifyQuery(parseQuery(search)) : "";
    const pathname = skipEncoding ? e._path.pathname : encodePath(e._path.pathname);
    e._relativeLoc = `${pathname}${qs.length ? `?${qs}` : ""}`;
    if (e._path.host) {
      e.loc = stringifyParsedURL(e._path);
    } else {
      e.loc = e._relativeLoc;
    }
  } else if (!skipEncoding && !isEncoded(e.loc)) {
    e.loc = encodeURI(e.loc);
  }
  if (e.loc === "")
    e.loc = `/`;
  e.loc = resolve$5(e.loc, resolvers);
  e._key = `${e._sitemap || ""}${withoutTrailingSlash(e.loc)}`;
  return e;
}
function isEncoded(url) {
  try {
    return url !== decodeURIComponent(url);
  } catch {
    return false;
  }
}
function normaliseEntry(_e, defaults, resolvers) {
  const e = defu$1(_e, defaults);
  {
    const warnings = validateSitemapUrl(e);
    if (warnings.length)
      e._warnings = (e._warnings || []).concat(warnings);
  }
  if (e.lastmod) {
    const date = normaliseDate(e.lastmod);
    if (date)
      e.lastmod = date;
    else
      delete e.lastmod;
  }
  if (!e.lastmod)
    delete e.lastmod;
  e.loc = resolve$5(e.loc, resolvers);
  if (e.alternatives) {
    const alternatives = e.alternatives.map((a) => ({ ...a }));
    for (const alt of alternatives) {
      if (typeof alt.href === "string") {
        alt.href = resolve$5(alt.href, resolvers);
      } else if (typeof alt.href === "object" && alt.href) {
        alt.href = resolve$5(alt.href.href, resolvers);
      }
    }
    e.alternatives = mergeOnKey$1(alternatives, "hreflang");
  }
  if (e.images) {
    const images = e.images.map((i) => ({ ...i }));
    for (const img of images) {
      img.loc = resolve$5(img.loc, resolvers);
    }
    e.images = mergeOnKey$1(images, "loc");
  }
  if (e.videos) {
    const videos = e.videos.map((v) => ({ ...v }));
    for (const video of videos) {
      if (video.content_loc) {
        video.content_loc = resolve$5(video.content_loc, resolvers);
      }
    }
    e.videos = mergeOnKey$1(videos, "content_loc");
  }
  return e;
}
const IS_VALID_W3C_DATE = [
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
  /^\d{4}-[01]\d-[0-3]\d$/,
  /^\d{4}-[01]\d$/,
  /^\d{4}$/
];
function isValidW3CDate(d) {
  return IS_VALID_W3C_DATE.some((r) => r.test(d));
}
function normaliseDate(d) {
  if (typeof d === "string") {
    const tIdx = d.indexOf("T");
    if (tIdx !== -1) {
      const t = d.slice(tIdx + 1);
      if (!t.includes("+") && !t.includes("-") && !t.includes("Z")) {
        d += "Z";
      }
    }
    if (!isValidW3CDate(d))
      return false;
    d = new Date(d);
    d.setMilliseconds(0);
    if (Number.isNaN(d.getTime()))
      return false;
  }
  const z = (n) => `0${n}`.slice(-2);
  const date = `${d.getUTCFullYear()}-${z(d.getUTCMonth() + 1)}-${z(d.getUTCDate())}`;
  if (d.getUTCHours() > 0 || d.getUTCMinutes() > 0 || d.getUTCSeconds() > 0) {
    return `${date}T${z(d.getUTCHours())}:${z(d.getUTCMinutes())}:${z(d.getUTCSeconds())}Z`;
  }
  return date;
}

function isValidUrl(value) {
  return URL.canParse(value);
}
async function parseSitemapIndex(xml) {
  if (!xml)
    throw new Error("Empty XML input provided");
  const { XMLParser } = await import('file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/fast-xml-parser/src/fxp.js');
  const parser = new XMLParser({
    isArray: (tagName) => tagName === "sitemap",
    removeNSPrefix: true,
    trimValues: true
  });
  const parsed = parser.parse(xml);
  if (parsed?.sitemapindex === void 0)
    throw new Error("XML does not contain a valid sitemapindex element");
  if (!parsed.sitemapindex || !parsed.sitemapindex.sitemap)
    return { entries: [], warnings: [] };
  const sitemaps = Array.isArray(parsed.sitemapindex.sitemap) ? parsed.sitemapindex.sitemap : [parsed.sitemapindex.sitemap];
  const warnings = [];
  const entries = [];
  for (const s of sitemaps) {
    if (typeof s.loc !== "string" || !s.loc.trim().length) {
      warnings.push({
        type: "validation",
        message: "Sitemap entry missing required loc element"
      });
      continue;
    }
    const loc = s.loc.trim();
    if (!isValidUrl(loc)) {
      warnings.push({
        type: "validation",
        message: "Sitemap entry has invalid URL",
        context: { url: loc }
      });
      continue;
    }
    entries.push({
      loc,
      ...s.lastmod && { lastmod: s.lastmod.trim() }
    });
  }
  return { entries, warnings };
}
function isSitemapIndex(xml) {
  return xml.includes("<sitemapindex") || xml.includes("sitemapindex>");
}

function isValidString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function parseNumber(value) {
  if (typeof value === "number")
    return value;
  if (typeof value === "string" && value.trim()) {
    const num = Number.parseFloat(value.trim());
    return Number.isNaN(num) ? void 0 : num;
  }
  return void 0;
}
function parseInteger(value) {
  if (typeof value === "number")
    return Math.floor(value);
  if (typeof value === "string" && value.trim()) {
    const num = Number.parseInt(value.trim(), 10);
    return Number.isNaN(num) ? void 0 : num;
  }
  return void 0;
}
function extractUrlFromParsedElement(urlElement, warnings) {
  if (!isValidString(urlElement.loc)) {
    warnings.push({
      type: "validation",
      message: "URL entry missing required loc element",
      context: { url: String(urlElement.loc || "undefined") }
    });
    return null;
  }
  const urlObj = { loc: urlElement.loc };
  if (isValidString(urlElement.lastmod)) {
    urlObj.lastmod = urlElement.lastmod;
  }
  if (isValidString(urlElement.changefreq)) {
    const validFreqs = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
    if (validFreqs.includes(urlElement.changefreq)) {
      urlObj.changefreq = urlElement.changefreq;
    } else {
      warnings.push({
        type: "validation",
        message: "Invalid changefreq value",
        context: { url: urlElement.loc, field: "changefreq", value: urlElement.changefreq }
      });
    }
  }
  const priority = parseNumber(urlElement.priority);
  if (priority !== void 0 && !Number.isNaN(priority)) {
    if (priority < 0 || priority > 1) {
      warnings.push({
        type: "validation",
        message: "Priority value should be between 0.0 and 1.0, clamping to valid range",
        context: { url: urlElement.loc, field: "priority", value: priority }
      });
    }
    urlObj.priority = Math.max(0, Math.min(1, priority));
  } else if (urlElement.priority !== void 0) {
    warnings.push({
      type: "validation",
      message: "Invalid priority value",
      context: { url: urlElement.loc, field: "priority", value: urlElement.priority }
    });
  }
  if (urlElement.image) {
    const images = Array.isArray(urlElement.image) ? urlElement.image : [urlElement.image];
    const validImages = images.map((img) => {
      if (isValidString(img.loc)) {
        return { loc: img.loc };
      } else {
        warnings.push({
          type: "validation",
          message: "Image missing required loc element",
          context: { url: urlElement.loc, field: "image.loc" }
        });
        return null;
      }
    }).filter((img) => img !== null);
    if (validImages.length > 0) {
      urlObj.images = validImages;
    }
  }
  if (urlElement.video) {
    const videos = Array.isArray(urlElement.video) ? urlElement.video : [urlElement.video];
    const validVideos = videos.map((video) => {
      const missingFields = [];
      if (!isValidString(video.title))
        missingFields.push("title");
      if (!isValidString(video.thumbnail_loc))
        missingFields.push("thumbnail_loc");
      if (!isValidString(video.description))
        missingFields.push("description");
      if (!isValidString(video.content_loc))
        missingFields.push("content_loc");
      if (missingFields.length > 0) {
        warnings.push({
          type: "validation",
          message: `Video missing required fields: ${missingFields.join(", ")}`,
          context: { url: urlElement.loc, field: "video" }
        });
        return null;
      }
      const videoObj = {
        title: video.title,
        thumbnail_loc: video.thumbnail_loc,
        description: video.description,
        content_loc: video.content_loc
      };
      if (isValidString(video.player_loc)) {
        videoObj.player_loc = video.player_loc;
      }
      const duration = parseInteger(video.duration);
      if (duration !== void 0) {
        videoObj.duration = duration;
      } else if (video.duration !== void 0) {
        warnings.push({
          type: "validation",
          message: "Invalid video duration value",
          context: { url: urlElement.loc, field: "video.duration", value: video.duration }
        });
      }
      if (isValidString(video.expiration_date)) {
        videoObj.expiration_date = video.expiration_date;
      }
      const rating = parseNumber(video.rating);
      if (rating !== void 0) {
        if (rating < 0 || rating > 5) {
          warnings.push({
            type: "validation",
            message: "Video rating should be between 0.0 and 5.0",
            context: { url: urlElement.loc, field: "video.rating", value: rating }
          });
        }
        videoObj.rating = rating;
      } else if (video.rating !== void 0) {
        warnings.push({
          type: "validation",
          message: "Invalid video rating value",
          context: { url: urlElement.loc, field: "video.rating", value: video.rating }
        });
      }
      const viewCount = parseInteger(video.view_count);
      if (viewCount !== void 0) {
        videoObj.view_count = viewCount;
      } else if (video.view_count !== void 0) {
        warnings.push({
          type: "validation",
          message: "Invalid video view_count value",
          context: { url: urlElement.loc, field: "video.view_count", value: video.view_count }
        });
      }
      if (isValidString(video.publication_date)) {
        videoObj.publication_date = video.publication_date;
      }
      if (isValidString(video.family_friendly)) {
        const validValues = ["yes", "no"];
        if (validValues.includes(video.family_friendly)) {
          videoObj.family_friendly = video.family_friendly;
        } else {
          warnings.push({
            type: "validation",
            message: 'Invalid video family_friendly value, should be "yes" or "no"',
            context: { url: urlElement.loc, field: "video.family_friendly", value: video.family_friendly }
          });
        }
      }
      if (isValidString(video.requires_subscription)) {
        const validValues = ["yes", "no"];
        if (validValues.includes(video.requires_subscription)) {
          videoObj.requires_subscription = video.requires_subscription;
        } else {
          warnings.push({
            type: "validation",
            message: 'Invalid video requires_subscription value, should be "yes" or "no"',
            context: { url: urlElement.loc, field: "video.requires_subscription", value: video.requires_subscription }
          });
        }
      }
      if (isValidString(video.live)) {
        const validValues = ["yes", "no"];
        if (validValues.includes(video.live)) {
          videoObj.live = video.live;
        } else {
          warnings.push({
            type: "validation",
            message: 'Invalid video live value, should be "yes" or "no"',
            context: { url: urlElement.loc, field: "video.live", value: video.live }
          });
        }
      }
      if (video.restriction && typeof video.restriction === "object") {
        const restriction = video.restriction;
        if (isValidString(restriction.relationship) && isValidString(restriction["#text"])) {
          const validRelationships = ["allow", "deny"];
          if (validRelationships.includes(restriction.relationship)) {
            videoObj.restriction = {
              relationship: restriction.relationship,
              restriction: restriction["#text"]
            };
          } else {
            warnings.push({
              type: "validation",
              message: 'Invalid video restriction relationship, should be "allow" or "deny"',
              context: { url: urlElement.loc, field: "video.restriction.relationship", value: restriction.relationship }
            });
          }
        }
      }
      if (video.platform && typeof video.platform === "object") {
        const platform = video.platform;
        if (isValidString(platform.relationship) && isValidString(platform["#text"])) {
          const validRelationships = ["allow", "deny"];
          if (validRelationships.includes(platform.relationship)) {
            videoObj.platform = {
              relationship: platform.relationship,
              platform: platform["#text"]
            };
          } else {
            warnings.push({
              type: "validation",
              message: 'Invalid video platform relationship, should be "allow" or "deny"',
              context: { url: urlElement.loc, field: "video.platform.relationship", value: platform.relationship }
            });
          }
        }
      }
      if (video.price) {
        const prices = Array.isArray(video.price) ? video.price : [video.price];
        const validPrices = prices.map((price) => {
          const priceValue = price["#text"];
          if (priceValue == null || typeof priceValue !== "string" && typeof priceValue !== "number") {
            warnings.push({
              type: "validation",
              message: "Video price missing value",
              context: { url: urlElement.loc, field: "video.price" }
            });
            return null;
          }
          const validTypes = ["rent", "purchase", "package", "subscription"];
          if (price.type && !validTypes.includes(price.type)) {
            warnings.push({
              type: "validation",
              message: `Invalid video price type "${price.type}", should be one of: ${validTypes.join(", ")}`,
              context: { url: urlElement.loc, field: "video.price.type", value: price.type }
            });
          }
          return {
            price: String(priceValue),
            currency: price.currency,
            type: price.type
          };
        }).filter((p) => p !== null);
        if (validPrices.length > 0) {
          videoObj.price = validPrices;
        }
      }
      if (video.uploader && typeof video.uploader === "object") {
        const uploader = video.uploader;
        if (isValidString(uploader.info) && isValidString(uploader["#text"])) {
          videoObj.uploader = {
            uploader: uploader["#text"],
            info: uploader.info
          };
        } else {
          warnings.push({
            type: "validation",
            message: "Video uploader missing required info or name",
            context: { url: urlElement.loc, field: "video.uploader" }
          });
        }
      }
      if (video.tag) {
        const tags = Array.isArray(video.tag) ? video.tag : [video.tag];
        const validTags = tags.filter(isValidString);
        if (validTags.length > 0) {
          videoObj.tag = validTags;
        }
      }
      return videoObj;
    }).filter((video) => video !== null);
    if (validVideos.length > 0) {
      urlObj.videos = validVideos;
    }
  }
  if (urlElement.link) {
    const links = Array.isArray(urlElement.link) ? urlElement.link : [urlElement.link];
    const alternatives = links.map((link) => {
      if (link.rel === "alternate" && isValidString(link.hreflang) && isValidString(link.href)) {
        return {
          hreflang: link.hreflang,
          href: link.href
        };
      } else {
        warnings.push({
          type: "validation",
          message: 'Alternative link missing required rel="alternate", hreflang, or href',
          context: { url: urlElement.loc, field: "link" }
        });
        return null;
      }
    }).filter((alt) => alt !== null);
    if (alternatives.length > 0) {
      urlObj.alternatives = alternatives;
    }
  }
  if (urlElement.news && typeof urlElement.news === "object") {
    const news = urlElement.news;
    if (isValidString(news.title) && isValidString(news.publication_date) && news.publication && isValidString(news.publication.name) && isValidString(news.publication.language)) {
      urlObj.news = {
        title: news.title,
        publication_date: news.publication_date,
        publication: {
          name: news.publication.name,
          language: news.publication.language
        }
      };
    } else {
      warnings.push({
        type: "validation",
        message: "News entry missing required fields (title, publication_date, publication.name, publication.language)",
        context: { url: urlElement.loc, field: "news" }
      });
    }
  }
  return Object.fromEntries(
    Object.entries(urlObj).filter(
      ([_, value]) => value != null && (!Array.isArray(value) || value.length > 0)
    )
  );
}
async function parseSitemapXml(xml) {
  const warnings = [];
  if (!xml) {
    throw new Error("Empty XML input provided");
  }
  const { XMLParser } = await import('file:///Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/fast-xml-parser/src/fxp.js');
  const parser = new XMLParser({
    isArray: (tagName) => ["url", "image", "video", "link", "tag", "price"].includes(tagName),
    removeNSPrefix: true,
    parseAttributeValue: false,
    ignoreAttributes: false,
    attributeNamePrefix: "",
    trimValues: true
  });
  try {
    const parsed = parser.parse(xml);
    if (!parsed?.urlset) {
      throw new Error("XML does not contain a valid urlset element");
    }
    if (!parsed.urlset.url) {
      throw new Error("Sitemap contains no URL entries");
    }
    const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    const validUrls = urls.map((url) => extractUrlFromParsedElement(url, warnings)).filter((url) => url !== null);
    if (validUrls.length === 0 && urls.length > 0) {
      warnings.push({
        type: "validation",
        message: "No valid URLs found in sitemap after validation"
      });
    }
    return { urls: validUrls, warnings };
  } catch (error) {
    if (error instanceof Error && (error.message === "Empty XML input provided" || error.message === "XML does not contain a valid urlset element" || error.message === "Sitemap contains no URL entries")) {
      throw error;
    }
    throw new Error(`Failed to parse XML: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function normalizeSourceInput(source) {
  if (typeof source === "string") {
    return { context: { name: "hook" }, fetch: source };
  }
  if (Array.isArray(source)) {
    return { context: { name: "hook" }, fetch: source };
  }
  return source;
}
async function tryFetchWithFallback(url, options, event) {
  const isExternalUrl = !url.startsWith("/");
  if (isExternalUrl) {
    const strategies = [
      // Strategy 1: Use globalThis.$fetch (original approach)
      () => globalThis.$fetch(url, options),
      // Strategy 2: If event is available, try using event context even for external URLs
      event ? () => event.$fetch(url, options) : null,
      // Strategy 3: Use native fetch as last resort
      () => $fetch(url, options)
    ].filter(Boolean);
    let lastError = null;
    for (const strategy of strategies) {
      try {
        return await strategy();
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    throw lastError;
  }
  const fetchContainer = url.startsWith("/") && event ? event : globalThis;
  return await fetchContainer.$fetch(url, options);
}
async function fetchDataSource(input, event) {
  const context = typeof input.context === "string" ? { name: input.context } : input.context || { name: "fetch" };
  const url = typeof input.fetch === "string" ? input.fetch : input.fetch[0];
  const options = typeof input.fetch === "string" ? {} : input.fetch[1];
  const start = Date.now();
  const isExternalUrl = !url.startsWith("/");
  const timeout = isExternalUrl ? 1e4 : options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  try {
    let isMaybeErrorResponse = false;
    const isXmlRequest = parseURL(url).pathname.endsWith(".xml");
    const mergedHeaders = defu$1(
      options?.headers,
      {
        Accept: isXmlRequest ? "text/xml" : "application/json"
      },
      event && !isExternalUrl ? { host: getRequestHost(event, { xForwardedHost: true }) } : {}
    );
    const fetchOptions = {
      ...options,
      responseType: isXmlRequest ? "text" : "json",
      signal: timeoutController.signal,
      headers: mergedHeaders,
      // Use ofetch's built-in retry for external sources
      ...isExternalUrl && {
        retry: 2,
        retryDelay: 200
      },
      // @ts-expect-error untyped
      onResponse({ response }) {
        if (typeof response._data === "string" && response._data.startsWith("<!DOCTYPE html>"))
          isMaybeErrorResponse = true;
      }
    };
    const res = await tryFetchWithFallback(url, fetchOptions, event);
    const timeTakenMs = Date.now() - start;
    if (isMaybeErrorResponse) {
      return {
        ...input,
        context,
        urls: [],
        timeTakenMs,
        error: "Received HTML response instead of JSON"
      };
    }
    let urls = [];
    if (typeof res === "object") {
      urls = res.urls || res;
    } else if (typeof res === "string" && parseURL(url).pathname.endsWith(".xml")) {
      const result = await parseSitemapXml(res);
      urls = result.urls;
    }
    return {
      ...input,
      context,
      timeTakenMs,
      urls
    };
  } catch (_err) {
    const error = _err;
    if (isExternalUrl) {
      const errorInfo = {
        url,
        timeout,
        error: error.message,
        statusCode: error.response?.status,
        statusText: error.response?.statusText,
        method: options?.method || "GET"
      };
      logger.error("Failed to fetch external source.", errorInfo);
    } else {
      logger.error("Failed to fetch source.", { url, error: error.message });
    }
    return {
      ...input,
      context,
      urls: [],
      error: error.message,
      _isFailure: true
      // Mark as failure to prevent caching
    };
  } finally {
    if (abortRequestTimeout) {
      clearTimeout(abortRequestTimeout);
    }
  }
}
async function globalSitemapSources() {
  const m = await Promise.resolve().then(function () { return globalSources; });
  return [...m.sources];
}
async function childSitemapSources(definition) {
  if (!definition?._hasSourceChunk)
    return [];
  const m = await Promise.resolve().then(function () { return childSources; });
  return [...m.sources[definition.sitemapName] || []];
}
async function resolveSitemapSources(sources, event) {
  return (await Promise.all(
    sources.map((source) => {
      const normalized = normalizeSourceInput(source);
      if ("urls" in normalized) {
        return {
          timeTakenMs: 0,
          ...normalized,
          urls: normalized.urls
        };
      }
      if (normalized.fetch)
        return fetchDataSource(normalized, event);
      return {
        ...normalized,
        error: "Invalid source"
      };
    })
  )).flat();
}

const staticConfig = {"isI18nMapped":false,"sitemapName":"sitemap.xml","isMultiSitemap":false,"excludeAppSources":[],"cacheMaxAgeSeconds":0,"autoLastmod":false,"defaultSitemapsChunkSize":1000,"minify":false,"sortEntries":true,"discoverImages":true,"discoverVideos":true,"sitemapsPathPrefix":"/__sitemap__/","isNuxtContentDocumentDriven":false,"xsl":"/__sitemap__/style.xsl","xslTips":true,"xslColumns":[{"label":"URL","width":"50%"},{"label":"Images","width":"25%","select":"count(image:image)"},{"label":"Last Updated","width":"25%","select":"concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"}],"credits":true,"version":"8.2.1","sitemaps":{"sitemap.xml":{"sitemapName":"sitemap.xml","route":"sitemap.xml","defaults":{},"include":[],"exclude":["/_**","/_nuxt/**","/_nuxt/**"],"includeAppSources":true}}};

function xmlEscape(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function useSitemapRuntimeConfig(e) {
  const clone = JSON.parse(JSON.stringify(staticConfig));
  for (const k in clone.sitemaps) {
    const sitemap = clone.sitemaps[k];
    sitemap.include = normalizeRuntimeFilters(sitemap.include);
    sitemap.exclude = normalizeRuntimeFilters(sitemap.exclude);
    clone.sitemaps[k] = sitemap;
  }
  Object.assign(clone, useRuntimeConfig(e).sitemap);
  return Object.freeze(clone);
}

function attachUrlWarnings(sources) {
  for (const source of sources) {
    if (!source.urls?.length)
      continue;
    const warnings = [];
    for (const url of source.urls) {
      const msgs = validateSitemapUrl(url);
      if (msgs.length) {
        const loc = typeof url === "string" ? url : url.loc || "";
        for (const message of msgs)
          warnings.push({ loc, message });
      }
    }
    if (warnings.length)
      source._urlWarnings = warnings;
  }
  return sources;
}
const _EmAKwj = defineEventHandler(async (e) => {
  const _runtimeConfig = useSitemapRuntimeConfig();
  const siteConfig = getSiteConfig(e);
  const { sitemaps: _sitemaps } = _runtimeConfig;
  const runtimeConfig = { ..._runtimeConfig };
  delete runtimeConfig.sitemaps;
  const globalSources = await globalSitemapSources();
  const nitroOrigin = getNitroOrigin(e);
  const sitemaps = {};
  for (const s of Object.keys(_sitemaps)) {
    const sitemap = _sitemaps[s];
    sitemaps[s] = {
      ...sitemap,
      sources: attachUrlWarnings(await resolveSitemapSources(await childSitemapSources(sitemap), e))
    };
  }
  return {
    nitroOrigin,
    sitemaps,
    runtimeConfig,
    globalSources: attachUrlWarnings(await resolveSitemapSources(globalSources, e)),
    siteConfig: { ...siteConfig }
  };
});

async function fetchXml(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/xml, text/xml" },
    signal: AbortSignal.timeout(15e3)
  });
  if (!response.ok)
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  return response.text();
}
const _wQ_EuQ = defineEventHandler(async (e) => {
  const { url, mode } = getQuery$1(e);
  if (!url || typeof url !== "string")
    return { url: "", isIndex: false, sitemaps: [], warnings: [], error: "Missing url query parameter" };
  if (mode === "debug") {
    const debugUrl = `${url.replace(/\/$/, "")}/__sitemap__/debug.json`;
    const response = await fetch(debugUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(1e4)
    }).catch(() => null);
    if (response?.ok) {
      const json = await response.json().catch(() => null);
      if (json?.sitemaps)
        return json;
    }
  }
  const sitemapUrl = url.endsWith("/") ? `${url}sitemap.xml` : url;
  const xml = await fetchXml(sitemapUrl).catch((err) => {
    return err;
  });
  if (xml instanceof Error)
    return { url: sitemapUrl, isIndex: false, sitemaps: [], warnings: [], error: `Failed to fetch sitemap: ${xml.message}` };
  if (isSitemapIndex(xml)) {
    const { entries, warnings } = await parseSitemapIndex(xml);
    const sitemaps = await Promise.all(
      entries.map(async (entry) => {
        const childXml = await fetchXml(entry.loc).catch((err) => err);
        if (childXml instanceof Error) {
          return {
            loc: entry.loc,
            urlCount: 0,
            warnings: [],
            error: childXml.message,
            lastmod: entry.lastmod
          };
        }
        const result2 = await parseSitemapXml(childXml).catch((err) => ({
          urls: [],
          warnings: [{ type: "validation", message: err.message }]
        }));
        return {
          loc: entry.loc,
          urlCount: result2.urls.length,
          warnings: result2.warnings,
          lastmod: entry.lastmod
        };
      })
    );
    return { url: sitemapUrl, isIndex: true, sitemaps, warnings };
  }
  const result = await parseSitemapXml(xml).catch((err) => ({
    urls: [],
    warnings: [{ type: "validation", message: err.message }]
  }));
  return {
    url: sitemapUrl,
    isIndex: false,
    sitemaps: [{
      loc: sitemapUrl,
      urlCount: result.urls.length,
      warnings: result.warnings
    }],
    warnings: []
  };
});

const _1ngzjc = defineEventHandler(async (e) => {
  const fixPath = createSitePathResolver(e, { absolute: false, withBase: true });
  const { sitemapName: fallbackSitemapName, cacheMaxAgeSeconds, version, xslColumns, xslTips } = useSitemapRuntimeConfig();
  setHeader(e, "Content-Type", "application/xslt+xml");
  if (cacheMaxAgeSeconds)
    setHeader(e, "Cache-Control", `public, max-age=${cacheMaxAgeSeconds}, must-revalidate`);
  else
    setHeader(e, "Cache-Control", `no-cache, no-store`);
  const { name: siteName, url: siteUrl } = getSiteConfig(e);
  const referrer = getHeader(e, "Referer") || "/";
  const referrerPath = parseURL(referrer).pathname;
  const isNotIndexButHasIndex = referrerPath !== "/sitemap.xml" && referrerPath !== "/sitemap_index.xml" && referrerPath.endsWith(".xml");
  const sitemapName = parseURL(referrer).pathname.split("/").pop()?.split("-sitemap")[0] || fallbackSitemapName;
  const title = `${siteName}${sitemapName !== "sitemap.xml" ? ` - ${sitemapName === "sitemap_index.xml" ? "index" : sitemapName}` : ""}`.replace(/&/g, "&amp;");
  const isIndexPage = referrerPath === "/sitemap.xml" || referrerPath === "/sitemap_index.xml";
  const canonicalQuery = getQuery(referrer).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const debugUrl = xmlEscape(withQuery("/__sitemap__/debug.json", { sitemap: sitemapName }));
  const devUrl = xmlEscape(referrerPath);
  const prodUrl = xmlEscape(withQuery(referrerPath, { canonical: "" }));
  const fetchErrors = [];
  const xslQuery = getQuery$1(e);
  if (xslQuery.error_messages) {
    const errorMessages = xslQuery.error_messages;
    const errorUrls = xslQuery.error_urls;
    if (errorMessages) {
      const messages = Array.isArray(errorMessages) ? errorMessages : [errorMessages];
      const urls = Array.isArray(errorUrls) ? errorUrls : errorUrls ? [errorUrls] : [];
      messages.forEach((msg, i) => {
        const errorParts = [xmlEscape(msg)];
        if (urls[i])
          errorParts.push(xmlEscape(urls[i]));
        fetchErrors.push(`<span class="error-item">${errorParts.join(" \u2014 ")}</span>`);
      });
    }
  }
  const hasRuntimeErrors = fetchErrors.length > 0;
  const showDevTools = xslTips !== false;
  const hints = [
    `This is an XSL sitemap (CSS for XML). Disable with <code>xsl: false</code>`,
    `View the raw XML by adding <code>?canonical</code> to the URL`,
    `Check <code>/__sitemap__/debug.json</code> for full sitemap diagnostics`
  ];
  const hint = hints[Math.floor(Math.random() * hints.length)];
  let columns = [...xslColumns];
  if (!columns.length) {
    columns = [
      { label: "URL", width: "50%" },
      { label: "Images", width: "25%", select: "count(image:image)" },
      { label: "Last Updated", width: "25%", select: "concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))" }
    ];
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <style type="text/css">
          :root {
            --accent: #00dc82;
            --accent-hover: #00b86b;
            --bg: #0a0a0a;
            --bg-elevated: #141414;
            --bg-subtle: #1a1a1a;
            --border: #262626;
            --border-subtle: #1f1f1f;
            --text: #e5e5e5;
            --text-muted: #737373;
            --text-faint: #525252;
            --error: #ef4444;
            --error-bg: rgba(239,68,68,0.1);
            --warning: #f59e0b;
          }
          * { box-sizing: border-box; }
          body {
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
            font-size: 13px;
            color: var(--text);
            background: var(--bg);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          a { color: inherit; transition: color 0.15s; }
          a:hover { color: var(--accent); }

          /* Debug bar (dev only) */
          .debug-bar {
            position: fixed;
            bottom: 0.75rem;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 0 1rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 100;
            font-size: 11px;
          }
          .debug-bar-brand {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-muted);
            text-decoration: none;
          }
          .debug-bar-brand:hover { color: var(--text); }
          .debug-bar-brand svg { flex-shrink: 0; }
          .debug-bar-hint {
            color: var(--text-faint);
            margin-right: auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .debug-bar-hint code {
            background: var(--bg-subtle);
            padding: 0.1rem 0.3rem;
            border-radius: 3px;
            font-size: 10px;
          }
          .mode-badge {
            font-size: 9px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
          }
          .mode-dev { background: rgba(245,158,11,0.15); color: var(--warning); }
          .mode-prod { background: rgba(0,220,130,0.12); color: var(--accent); }
          .mode-toggle {
            display: inline-flex;
            border-radius: 4px;
            overflow: hidden;
            background: var(--bg-subtle);
            padding: 2px;
            gap: 1px;
          }
          .mode-toggle a {
            padding: 0.2rem 0.4rem;
            font-size: 9px;
            font-weight: 500;
            text-decoration: none;
            color: var(--text-muted);
            border-radius: 2px;
            transition: all 0.15s;
          }
          .mode-toggle a:hover { color: var(--text); }
          .mode-toggle a.active {
            background: var(--accent);
            color: #0a0a0a;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            text-decoration: none;
            font-size: 10px;
            font-weight: 500;
            transition: all 0.15s;
          }
          .btn-primary {
            background: var(--accent);
            color: #0a0a0a;
          }
          .btn-primary:hover { background: var(--accent-hover); color: #0a0a0a; }
          .btn svg { width: 12px; height: 12px; }

          /* Error banner */
          .error-banner {
            background: var(--error-bg);
            border-bottom: 1px solid rgba(239,68,68,0.2);
            padding: 0.75rem 1.5rem;
            color: #fca5a5;
            font-size: 12px;
          }
          .error-banner strong { color: var(--error); }
          .error-item { display: block; margin-top: 0.375rem; color: #fca5a5; }
          .error-debug-link {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin-top: 0.625rem;
            padding: 0.25rem 0.5rem;
            background: var(--error);
            color: #fff;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            text-decoration: none;
            transition: background 0.15s;
          }
          .error-debug-link:hover { background: #dc2626; color: #fff; }

          /* Main content */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
          }
          .header {
            margin-bottom: 1.25rem;
          }
          .header h1 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 0.25rem 0;
            color: var(--text);
          }
          .header-meta {
            color: var(--text-muted);
            font-size: 12px;
          }
          .header-meta a {
            color: var(--text-muted);
            text-decoration: underline;
            text-decoration-color: var(--border);
            text-underline-offset: 2px;
          }
          .header-meta a:hover { color: var(--accent); text-decoration-color: var(--accent); }

          /* Table */
          .table-wrap {
            border: 1px solid var(--border);
            border-radius: 8px;
            overflow: hidden;
            background: var(--bg-elevated);
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            text-align: left;
            padding: 0.625rem 1rem;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            background: var(--bg-subtle);
            border-bottom: 1px solid var(--border);
          }
          td {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            font-size: 12px;
            color: var(--text);
          }
          tr:last-child td { border-bottom: none; }
          tr:hover td { background: rgba(255,255,255,0.02); }
          td a {
            text-decoration: none;
            word-break: break-all;
            color: var(--text);
          }
          td a:hover { color: var(--accent); }
          .inline-warning {
            font-size: 11px;
            color: var(--warning);
            margin-top: 0.25rem;
            line-height: 1.4;
          }
          .inline-warning::before {
            content: "\u26A0 ";
          }
          .count {
            display: inline-block;
            min-width: 1.25rem;
            padding: 0.125rem 0.375rem;
            background: var(--bg-subtle);
            border-radius: 4px;
            text-align: center;
            font-size: 11px;
            color: var(--text-muted);
            font-variant-numeric: tabular-nums;
          }
          .count:empty::before { content: "0"; }

          /* Light mode */
          @media (prefers-color-scheme: light) {
            :root {
              --accent: #00a963;
              --accent-hover: #008f54;
              --bg: #ffffff;
              --bg-elevated: #f5f5f5;
              --bg-subtle: #ebebeb;
              --border: #d4d4d4;
              --border-subtle: #e5e5e5;
              --text: #171717;
              --text-muted: #525252;
              --text-faint: #737373;
              --error: #dc2626;
              --error-bg: rgba(220,38,38,0.08);
              --warning: #b45309;
            }
            tr:hover td { background: rgba(0,0,0,0.02); }
            .btn-primary { color: #fff; }
            .btn-primary:hover { color: #fff; }
            .mode-toggle a.active { color: #fff; }
            .error-banner { color: #991b1b; }
            .error-item { color: #b91c1c; }
            .error-debug-link { color: #fff; }
            .error-debug-link:hover { color: #fff; }
          }

          .debug-bar-version {
            color: var(--text-faint);
            font-size: 10px;
          }

          /* Responsive */
          @media (max-width: 640px) {
            .debug-bar { padding: 0 0.75rem; gap: 0.5rem; width: 95%; }
            .debug-bar-brand span { display: none; }
            .debug-bar-hint { display: none; }
            .debug-bar-version { display: none; }
            .mode-badge { display: none; }
            .container { padding: 1rem; }
            th, td { padding: 0.5rem 0.75rem; }
          }
          ${showDevTools ? "body { padding-bottom: 3.5rem; }" : ""}
        </style>
      </head>
      <body>
        ${hasRuntimeErrors ? `<div class="error-banner">
            <strong>Sitemap Generation Errors</strong>
            ${fetchErrors.join("")}
            <a href="${debugUrl}" target="_blank" class="error-debug-link">View Debug Info \u2192</a>
          </div>` : ""}
        <div class="container">
          <div class="header">
            <h1>${xmlEscape(title)}</h1>
            <div class="header-meta">
              ${isNotIndexButHasIndex ? `Part of <a href="${xmlEscape(fixPath("/sitemap_index.xml"))}">${xmlEscape(fixPath("/sitemap_index.xml"))}</a> \xB7 ` : ""}
              <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
                <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps
              </xsl:if>
              <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
              </xsl:if>
            </div>
          </div>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style="width:70%">Sitemap</th>
                    <th style="width:30%">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <xsl:variable name="sitemapURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <tr>
                      <td>
                        <a href="{$sitemapURL}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                      </td>
                      <td>
                        <xsl:value-of
                          select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)),concat(' ', substring(sitemap:lastmod,20,6)))"/>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
          <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &lt; 1">
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    ${columns.map((c) => `<th style="width:${c.width}">${c.label}</th>`).join("\n")}
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <xsl:variable name="itemURL">
                          <xsl:value-of select="sitemap:loc"/>
                        </xsl:variable>
                        <a href="{$itemURL}">
                          <xsl:value-of select="sitemap:loc"/>
                        </a>
                        ${showDevTools ? `<xsl:for-each select="comment()[starts-with(normalize-space(.), 'WARN:')]">
                          <div class="inline-warning">
                            <xsl:value-of select="substring-after(normalize-space(.), 'WARN:')"/>
                          </div>
                        </xsl:for-each>` : ""}
                      </td>
                      ${columns.filter((c) => c.label !== "URL").map((c) => `<td><span class="count"><xsl:value-of select="${c.select}"/></span></td>`).join("\n")}
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </xsl:if>
        </div>
        ${showDevTools ? `<div class="debug-bar">
            <a href="${xmlEscape(fixPath("/sitemap_index.xml"))}" class="debug-bar-brand">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32"><path fill="#00dc82" d="M4 26h4v4H4zm10 0h4v4h-4zm10 0h4v4h-4zm1-10h-8v-2h-2v2H7a2 2 0 0 0-2 2v6h2v-6h8v6h2v-6h8v6h2v-6a2 2 0 0 0-2-2zM9 2v10h14V2zm2 2h2v6h-2zm10 6h-6V4h6z"/></svg>
              <span>Sitemap Debug Bar</span>
            </a>
            <span class="debug-bar-version">v${version} \xB7 ${xmlEscape(siteUrl)}</span>
            <span class="debug-bar-hint">Hint: ${hint}</span>
            ${isIndexPage ? `<span class="mode-badge ${isShowingCanonical ? "mode-prod" : "mode-dev"}">${isShowingCanonical ? "Prod" : "Dev"}</span>
              <div class="mode-toggle">
                <a href="${isShowingCanonical ? devUrl : "#"}" class="${!isShowingCanonical ? "active" : ""}">Dev</a>
                <a href="${!isShowingCanonical ? prodUrl : "#"}" class="${isShowingCanonical ? "active" : ""}">Prod</a>
              </div>` : ""}
            <a href="${debugUrl}" target="_blank" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Debug
            </a>
          </div>` : ""}
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`;
});

function sortInPlace(urls) {
  urls.sort((a, b) => {
    const aLoc = typeof a === "string" ? a : a.loc;
    const bLoc = typeof b === "string" ? b : b.loc;
    const aSegments = aLoc.split("/").length;
    const bSegments = bLoc.split("/").length;
    if (aSegments !== bSegments) {
      return aSegments - bSegments;
    }
    return aLoc.localeCompare(bLoc, void 0, { numeric: true });
  });
  return urls;
}

function parseChunkInfo(sitemapName, sitemaps, defaultChunkSize) {
  defaultChunkSize = defaultChunkSize || 1e3;
  if (typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName))) {
    return {
      isChunked: true,
      baseSitemapName: "sitemap",
      chunkIndex: Number(sitemapName),
      chunkSize: defaultChunkSize
    };
  }
  if (sitemapName.includes("-")) {
    const parts = sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const baseSitemapName = parts.join("-");
      const baseSitemap = sitemaps[baseSitemapName];
      if (baseSitemap && (baseSitemap.chunks || baseSitemap._isChunking)) {
        const chunkSize = typeof baseSitemap.chunks === "number" ? baseSitemap.chunks : baseSitemap.chunkSize || defaultChunkSize;
        return {
          isChunked: true,
          baseSitemapName,
          chunkIndex: Number(lastPart),
          chunkSize
        };
      }
    }
  }
  return {
    isChunked: false,
    baseSitemapName: sitemapName,
    chunkIndex: void 0,
    chunkSize: defaultChunkSize
  };
}
function sliceUrlsForChunk(urls, sitemapName, sitemaps, defaultChunkSize = 1e3) {
  const chunkInfo = parseChunkInfo(sitemapName, sitemaps, defaultChunkSize);
  if (chunkInfo.isChunked && chunkInfo.chunkIndex !== void 0) {
    const startIndex = chunkInfo.chunkIndex * chunkInfo.chunkSize;
    const endIndex = (chunkInfo.chunkIndex + 1) * chunkInfo.chunkSize;
    return urls.slice(startIndex, endIndex);
  }
  return urls;
}

function escapeValueForXml(value) {
  if (value === true || value === false)
    return value ? "yes" : "no";
  return xmlEscape(String(value));
}
function yesNo(v) {
  return v === "yes" || v === true ? "yes" : "no";
}
const URLSET_OPENING_TAG = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
function buildUrlXml(url, NL, I1, I2, I3, I4) {
  let xml = `${I1}<url>${NL}`;
  if (url.loc)
    xml += `${I2}<loc>${xmlEscape(url.loc)}</loc>${NL}`;
  if (url.lastmod)
    xml += `${I2}<lastmod>${xmlEscape(url.lastmod)}</lastmod>${NL}`;
  if (url.changefreq)
    xml += `${I2}<changefreq>${xmlEscape(url.changefreq)}</changefreq>${NL}`;
  if (url.priority !== void 0) {
    const p = typeof url.priority === "number" ? url.priority : Number.parseFloat(url.priority);
    xml += `${I2}<priority>${p.toFixed(1)}</priority>${NL}`;
  }
  if (url.alternatives) {
    for (const alt of url.alternatives) {
      let attrs = "";
      for (const [k, v] of Object.entries(alt)) attrs += ` ${k}="${xmlEscape(String(v))}"`;
      xml += `${I2}<xhtml:link rel="alternate"${attrs} />${NL}`;
    }
  }
  if (url.images) {
    for (const img of url.images) {
      xml += `${I2}<image:image>${NL}${I3}<image:loc>${xmlEscape(img.loc)}</image:loc>${NL}`;
      if (img.title)
        xml += `${I3}<image:title>${xmlEscape(img.title)}</image:title>${NL}`;
      if (img.caption)
        xml += `${I3}<image:caption>${xmlEscape(img.caption)}</image:caption>${NL}`;
      if (img.geo_location)
        xml += `${I3}<image:geo_location>${xmlEscape(img.geo_location)}</image:geo_location>${NL}`;
      if (img.license)
        xml += `${I3}<image:license>${xmlEscape(img.license)}</image:license>${NL}`;
      xml += `${I2}</image:image>${NL}`;
    }
  }
  if (url.videos) {
    for (const video of url.videos) {
      xml += `${I2}<video:video>${NL}${I3}<video:title>${xmlEscape(video.title)}</video:title>${NL}`;
      if (video.thumbnail_loc)
        xml += `${I3}<video:thumbnail_loc>${xmlEscape(video.thumbnail_loc)}</video:thumbnail_loc>${NL}`;
      xml += `${I3}<video:description>${xmlEscape(video.description)}</video:description>${NL}`;
      if (video.content_loc)
        xml += `${I3}<video:content_loc>${xmlEscape(video.content_loc)}</video:content_loc>${NL}`;
      if (video.player_loc)
        xml += `${I3}<video:player_loc>${xmlEscape(video.player_loc)}</video:player_loc>${NL}`;
      if (video.duration !== void 0)
        xml += `${I3}<video:duration>${escapeValueForXml(video.duration)}</video:duration>${NL}`;
      if (video.expiration_date)
        xml += `${I3}<video:expiration_date>${xmlEscape(video.expiration_date)}</video:expiration_date>${NL}`;
      if (video.rating !== void 0)
        xml += `${I3}<video:rating>${escapeValueForXml(video.rating)}</video:rating>${NL}`;
      if (video.view_count !== void 0)
        xml += `${I3}<video:view_count>${escapeValueForXml(video.view_count)}</video:view_count>${NL}`;
      if (video.publication_date)
        xml += `${I3}<video:publication_date>${xmlEscape(video.publication_date)}</video:publication_date>${NL}`;
      if (video.family_friendly !== void 0)
        xml += `${I3}<video:family_friendly>${yesNo(video.family_friendly)}</video:family_friendly>${NL}`;
      if (video.restriction)
        xml += `${I3}<video:restriction relationship="${xmlEscape(video.restriction.relationship || "allow")}">${xmlEscape(video.restriction.restriction)}</video:restriction>${NL}`;
      if (video.platform)
        xml += `${I3}<video:platform relationship="${xmlEscape(video.platform.relationship || "allow")}">${xmlEscape(video.platform.platform)}</video:platform>${NL}`;
      if (video.requires_subscription !== void 0)
        xml += `${I3}<video:requires_subscription>${yesNo(video.requires_subscription)}</video:requires_subscription>${NL}`;
      if (video.price) {
        for (const price of video.price) {
          const c = price.currency ? ` currency="${xmlEscape(price.currency)}"` : "";
          const t = price.type ? ` type="${xmlEscape(price.type)}"` : "";
          xml += `${I3}<video:price${c}${t}>${xmlEscape(String(price.price ?? ""))}</video:price>${NL}`;
        }
      }
      if (video.uploader) {
        const info = video.uploader.info ? ` info="${xmlEscape(video.uploader.info)}"` : "";
        xml += `${I3}<video:uploader${info}>${xmlEscape(video.uploader.uploader)}</video:uploader>${NL}`;
      }
      if (video.live !== void 0)
        xml += `${I3}<video:live>${yesNo(video.live)}</video:live>${NL}`;
      if (video.tag) {
        const tags = Array.isArray(video.tag) ? video.tag : [video.tag];
        for (const t of tags) xml += `${I3}<video:tag>${xmlEscape(t)}</video:tag>${NL}`;
      }
      if (video.category)
        xml += `${I3}<video:category>${xmlEscape(video.category)}</video:category>${NL}`;
      if (video.gallery_loc)
        xml += `${I3}<video:gallery_loc>${xmlEscape(video.gallery_loc)}</video:gallery_loc>${NL}`;
      xml += `${I2}</video:video>${NL}`;
    }
  }
  if (url.news) {
    xml += `${I2}<news:news>${NL}${I3}<news:publication>${NL}`;
    xml += `${I4}<news:name>${xmlEscape(url.news.publication.name)}</news:name>${NL}`;
    xml += `${I4}<news:language>${xmlEscape(url.news.publication.language)}</news:language>${NL}`;
    xml += `${I3}</news:publication>${NL}`;
    if (url.news.title)
      xml += `${I3}<news:title>${xmlEscape(url.news.title)}</news:title>${NL}`;
    if (url.news.publication_date)
      xml += `${I3}<news:publication_date>${xmlEscape(url.news.publication_date)}</news:publication_date>${NL}`;
    xml += `${I2}</news:news>${NL}`;
  }
  if (url._warnings?.length) {
    for (const w of url._warnings)
      xml += `${I2}<!-- WARN: ${w} -->${NL}`;
  }
  xml += `${I1}</url>`;
  return xml;
}
function urlsToXml(urls, resolvers, { version, xsl, credits, minify }, errorInfo) {
  let xslHref = xsl ? resolvers.relativeBaseUrlResolver(xsl) : false;
  if (xslHref && errorInfo?.messages.length) {
    xslHref = withQuery(xslHref, {
      errors: "true",
      error_messages: errorInfo.messages,
      error_urls: errorInfo.urls
    });
  }
  const NL = minify ? "" : "\n";
  const I1 = minify ? "" : "    ";
  const I2 = minify ? "" : "        ";
  const I3 = minify ? "" : "            ";
  const I4 = minify ? "" : "                ";
  let xml = xslHref ? `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${escapeValueForXml(xslHref)}"?>${NL}` : `<?xml version="1.0" encoding="UTF-8"?>${NL}`;
  xml += URLSET_OPENING_TAG + NL;
  for (const url of urls) {
    xml += buildUrlXml(url, NL, I1, I2, I3, I4) + NL;
  }
  xml += "</urlset>";
  if (credits) {
    xml += `${NL}<!-- XML Sitemap generated by @nuxtjs/sitemap v${version} at ${(/* @__PURE__ */ new Date()).toISOString()} -->`;
  }
  return xml;
}

const SERVER_CACHE_MAX_AGE$1 = staticConfig.cacheMaxAgeSeconds || 60 * 10;
function resolveSitemapEntries(sitemap, urls, runtimeConfig, resolvers, baseURL) {
  const {
    autoI18n,
    isI18nMapped
  } = runtimeConfig;
  const filterPath = createPathFilter({
    include: sitemap.include,
    exclude: sitemap.exclude
  }, baseURL || "/");
  const _urls = urls.map((_e) => {
    const e = preNormalizeEntry(_e, resolvers);
    if (!e.loc || !filterPath(e.loc))
      return false;
    return e;
  }).filter(Boolean);
  let validI18nUrlsForTransform = [];
  const withoutPrefixPaths = {};
  if (autoI18n && autoI18n.strategy !== "no_prefix") {
    const localeCodes = autoI18n.locales.map((l) => l.code);
    const localeByCode = new Map(autoI18n.locales.map((l) => [l.code, l]));
    const isPrefixStrategy = autoI18n.strategy === "prefix";
    const isPrefixExceptOrAndDefault = autoI18n.strategy === "prefix_and_default" || autoI18n.strategy === "prefix_except_default";
    const xDefaultAndLocales = [{ code: "x-default", _hreflang: "x-default" }, ...autoI18n.locales];
    const defaultLocale = autoI18n.defaultLocale;
    const hasPages = !!autoI18n.pages;
    const hasDifferentDomains = !!autoI18n.differentDomains;
    validI18nUrlsForTransform = _urls.map((_e, i) => {
      if (_e._abs)
        return false;
      const split = splitForLocales(_e._relativeLoc, localeCodes);
      let localeCode = split[0];
      const pathWithoutPrefix = split[1];
      if (!localeCode)
        localeCode = defaultLocale;
      const e = _e;
      e._pathWithoutPrefix = pathWithoutPrefix;
      const locale = localeByCode.get(localeCode);
      if (!locale)
        return false;
      e._locale = locale;
      e._index = i;
      e._key = `${e._sitemap || ""}${e._path?.pathname || "/"}${e._path?.search || ""}`;
      withoutPrefixPaths[pathWithoutPrefix] = withoutPrefixPaths[pathWithoutPrefix] || [];
      if (!withoutPrefixPaths[pathWithoutPrefix].some((e2) => e2._locale.code === locale.code))
        withoutPrefixPaths[pathWithoutPrefix].push(e);
      return e;
    }).filter(Boolean);
    for (const e of validI18nUrlsForTransform) {
      if (!e._i18nTransform && !e.alternatives?.length) {
        const alternatives = (withoutPrefixPaths[e._pathWithoutPrefix] || []).map((u) => {
          const entries = [];
          if (u._locale.code === defaultLocale) {
            entries.push({
              href: u.loc,
              hreflang: "x-default"
            });
          }
          entries.push({
            href: u.loc,
            hreflang: u._locale._hreflang || defaultLocale
          });
          return entries;
        }).flat().filter(Boolean);
        if (alternatives.length)
          e.alternatives = alternatives;
      } else if (e._i18nTransform) {
        delete e._i18nTransform;
        if (hasDifferentDomains) {
          const defLocale = localeByCode.get(defaultLocale);
          e.alternatives = [
            {
              ...defLocale,
              code: "x-default"
            },
            ...autoI18n.locales.filter((l) => !!l.domain)
          ].map((locale) => {
            return {
              hreflang: locale._hreflang,
              href: joinURL(withHttps(locale.domain), e._pathWithoutPrefix)
            };
          });
        } else {
          const pageMatch = hasPages ? findPageMapping(e._pathWithoutPrefix, autoI18n.pages) : null;
          const pathSearch = e._path?.search || "";
          const pathWithoutPrefix = e._pathWithoutPrefix;
          for (const l of autoI18n.locales) {
            let loc = pathWithoutPrefix;
            if (pageMatch && pageMatch.mappings[l.code] !== void 0) {
              const customPath = pageMatch.mappings[l.code];
              if (customPath === false)
                continue;
              if (typeof customPath === "string") {
                loc = customPath[0] === "/" ? customPath : `/${customPath}`;
                loc = applyDynamicParams(loc, pageMatch.paramSegments);
                if (isPrefixStrategy || isPrefixExceptOrAndDefault && l.code !== defaultLocale)
                  loc = joinURL(`/${l.code}`, loc);
              }
            } else if (!hasDifferentDomains && !(isPrefixExceptOrAndDefault && l.code === defaultLocale)) {
              loc = joinURL(`/${l.code}`, pathWithoutPrefix);
            }
            const _sitemap = isI18nMapped ? l._sitemap : void 0;
            const alternatives = [];
            for (const locale of xDefaultAndLocales) {
              const code = locale.code === "x-default" ? defaultLocale : locale.code;
              const isDefault = locale.code === "x-default" || locale.code === defaultLocale;
              let href = pathWithoutPrefix;
              if (pageMatch && pageMatch.mappings[code] !== void 0) {
                const customPath = pageMatch.mappings[code];
                if (customPath === false)
                  continue;
                if (typeof customPath === "string") {
                  href = customPath[0] === "/" ? customPath : `/${customPath}`;
                  href = applyDynamicParams(href, pageMatch.paramSegments);
                  if (isPrefixStrategy || isPrefixExceptOrAndDefault && !isDefault)
                    href = joinURL("/", code, href);
                }
              } else if (isPrefixStrategy) {
                href = joinURL("/", code, pathWithoutPrefix);
              } else if (isPrefixExceptOrAndDefault && !isDefault) {
                href = joinURL("/", code, pathWithoutPrefix);
              }
              if (!filterPath(href))
                continue;
              alternatives.push({
                hreflang: locale._hreflang,
                href
              });
            }
            const { _index: _, ...rest } = e;
            const newEntry = preNormalizeEntry({
              _sitemap,
              ...rest,
              _key: `${_sitemap || ""}${loc || "/"}${pathSearch}`,
              _locale: l,
              loc,
              alternatives
            }, resolvers);
            if (e._locale.code === newEntry._locale.code) {
              _urls[e._index] = newEntry;
              e._index = void 0;
            } else {
              _urls.push(newEntry);
            }
          }
        }
      }
      if (isI18nMapped) {
        e._sitemap = e._sitemap || e._locale._sitemap;
        e._key = `${e._sitemap || ""}${e.loc || "/"}${e._path?.search || ""}`;
      }
      if (e._index)
        _urls[e._index] = e;
    }
  }
  return _urls;
}
async function buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) {
  const { sitemaps, autoI18n, isI18nMapped, isMultiSitemap, sortEntries } = runtimeConfig;
  let sourcesInput = effectiveSitemap.includeAppSources ? [...await globalSitemapSources(), ...await childSitemapSources(effectiveSitemap)] : await childSitemapSources(effectiveSitemap);
  if (nitro && resolvers.event) {
    const ctx = {
      event: resolvers.event,
      sitemapName: matchName,
      sources: sourcesInput
    };
    await nitro.hooks.callHook("sitemap:sources", ctx);
    sourcesInput = ctx.sources;
  }
  const sources = await resolveSitemapSources(sourcesInput, resolvers.event);
  const failedSources = sources.filter((source) => source.error && source._isFailure).map((source) => ({
    url: typeof source.fetch === "string" ? source.fetch : source.fetch?.[0] || "unknown",
    error: source.error || "Unknown error"
  }));
  const resolvedCtx = {
    urls: sources.flatMap((s) => s.urls),
    sitemapName: matchName,
    event: resolvers.event
  };
  await nitro?.hooks.callHook("sitemap:input", resolvedCtx);
  const enhancedUrls = resolveSitemapEntries(effectiveSitemap, resolvedCtx.urls, { autoI18n, isI18nMapped }, resolvers, useRuntimeConfig().app.baseURL);
  const localeSitemapKeys = isI18nMapped && autoI18n ? autoI18n.locales.map((l) => l._sitemap) : [];
  if (isMultiSitemap) {
    const sitemapNames = Object.keys(sitemaps).filter((k) => k !== "index");
    const warnedSitemaps = nitro?._sitemapWarnedSitemaps || /* @__PURE__ */ new Set();
    for (const e of enhancedUrls) {
      const hasMatchingSitemap = typeof e._sitemap === "string" && (sitemapNames.includes(e._sitemap) || isI18nMapped && sitemapNames.some((name) => resolveI18nSitemapLocaleKey(name, localeSitemapKeys) === e._sitemap));
      if (typeof e._sitemap === "string" && !hasMatchingSitemap) {
        if (!warnedSitemaps.has(e._sitemap)) {
          warnedSitemaps.add(e._sitemap);
          logger.error(`Sitemap \`${e._sitemap}\` not found in sitemap config. Available sitemaps: ${sitemapNames.join(", ")}. Entry \`${e.loc}\` will be omitted.`);
        }
      }
    }
    if (nitro) {
      nitro._sitemapWarnedSitemaps = warnedSitemaps;
    }
  }
  const filteredUrls = enhancedUrls.filter((e) => {
    if (e._sitemap === false)
      return false;
    if (isMultiSitemap && e._sitemap && matchName) {
      if (isChunked)
        return e._sitemap === matchName;
      if (e._sitemap === matchName)
        return true;
      if (isI18nMapped)
        return e._sitemap === resolveI18nSitemapLocaleKey(matchName, localeSitemapKeys);
      return false;
    }
    return true;
  });
  const urls = sortEntries ? sortInPlace(filteredUrls) : filteredUrls;
  return { urls, failedSources };
}
defineCachedFunction(
  async (_event, effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) => buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro),
  {
    name: "sitemap:resolved-urls",
    group: "sitemap",
    base: "sitemap",
    maxAge: SERVER_CACHE_MAX_AGE$1,
    getKey: (event, _effectiveSitemap, matchName, isChunked) => {
      const host = getHeader(event, "host") || getHeader(event, "x-forwarded-host") || "";
      const proto = getHeader(event, "x-forwarded-proto") || "https";
      return `resolved-${isChunked ? "chunked-" : ""}${matchName}-${proto}-${host}`;
    },
    swr: true
  }
);
async function getResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro) {
  resolvers.event;
  return buildResolvedSitemapUrls(effectiveSitemap, matchName, isChunked, resolvers, runtimeConfig, nitro);
}
async function buildSitemapUrls(sitemap, resolvers, runtimeConfig, nitro) {
  const { sitemaps, autoI18n, defaultSitemapsChunkSize } = runtimeConfig;
  const chunkSize = defaultSitemapsChunkSize || void 0;
  const chunkInfo = parseChunkInfo(sitemap.sitemapName, sitemaps, chunkSize);
  if (autoI18n?.differentDomains) {
    const domain = autoI18n.locales.find((e) => e.language === sitemap.sitemapName || e.code === sitemap.sitemapName)?.domain;
    if (domain) {
      const _tester = resolvers.canonicalUrlResolver;
      resolvers.canonicalUrlResolver = (path) => resolveSitePath(path, {
        absolute: true,
        withBase: false,
        siteUrl: withHttps(domain),
        trailingSlash: _tester("/test/").endsWith("/"),
        base: "/"
      });
    }
  }
  let effectiveSitemap = sitemap;
  const baseSitemapName = chunkInfo.baseSitemapName;
  if (chunkInfo.isChunked && baseSitemapName !== sitemap.sitemapName && sitemaps[baseSitemapName]) {
    effectiveSitemap = sitemaps[baseSitemapName];
  }
  const matchName = chunkInfo.isChunked ? baseSitemapName : sitemap.sitemapName;
  const resolved = await getResolvedSitemapUrls(effectiveSitemap, matchName, chunkInfo.isChunked, resolvers, runtimeConfig, nitro);
  const urls = sliceUrlsForChunk(resolved.urls, sitemap.sitemapName, sitemaps, chunkSize);
  return { urls, failedSources: resolved.failedSources };
}

function withoutQuery(path) {
  return path.split("?")[0];
}
function createNitroRouteRuleMatcher() {
  const { nitro, app } = useRuntimeConfig();
  const _routeRulesMatcher = toRouteMatcher(
    createRouter({
      routes: Object.fromEntries(
        Object.entries(nitro?.routeRules || {}).map(([path, rules]) => [withoutTrailingSlash(path), rules])
      )
    })
  );
  return (pathOrUrl) => {
    const path = pathOrUrl[0] === "/" ? pathOrUrl : parseURL(pathOrUrl, app.baseURL).pathname;
    return defu$1({}, ..._routeRulesMatcher.matchAll(
      withoutBase(withoutTrailingSlash(withoutQuery(path)), app.baseURL)
    ).reverse());
  };
}

const SERVER_CACHE_MAX_AGE = staticConfig.cacheMaxAgeSeconds || 60 * 10;
function useNitroUrlResolvers(e) {
  const canonicalQuery = getQuery$1(e).canonical;
  const isShowingCanonical = typeof canonicalQuery !== "undefined" && canonicalQuery !== "false";
  const siteConfig = getSiteConfig(e);
  return {
    event: e,
    fixSlashes: (path) => fixSlashes(siteConfig.trailingSlash, path),
    // we need these as they depend on the nitro event
    canonicalUrlResolver: createSitePathResolver(e, {
      canonical: isShowingCanonical || false,
      absolute: true,
      withBase: true
    }),
    relativeBaseUrlResolver: createSitePathResolver(e, { absolute: false, withBase: true })
  };
}
async function buildSitemapXml(event, definition, resolvers, runtimeConfig) {
  const { sitemapName } = definition;
  const nitro = useNitroApp();
  const { urls: sitemapUrls, failedSources } = await buildSitemapUrls(definition, resolvers, runtimeConfig, nitro);
  const routeRuleMatcher = createNitroRouteRuleMatcher();
  const { autoI18n } = runtimeConfig;
  let validCount = 0;
  for (let i = 0; i < sitemapUrls.length; i++) {
    const u = sitemapUrls[i];
    const path = u._path?.pathname || u.loc;
    if (!getPathRobotConfig(event, { path, skipSiteIndexable: true }).indexable)
      continue;
    let routeRules = routeRuleMatcher(path);
    if (autoI18n?.locales && autoI18n?.strategy !== "no_prefix") {
      const match = splitForLocales(path, autoI18n.locales.map((l) => l.code));
      const pathWithoutPrefix = match[1];
      if (pathWithoutPrefix && pathWithoutPrefix !== path)
        routeRules = defu$1(routeRules, routeRuleMatcher(pathWithoutPrefix));
    }
    if (routeRules.sitemap === false)
      continue;
    if (typeof routeRules.robots !== "undefined" && !routeRules.robots)
      continue;
    const hasRobotsDisabled = Object.entries(routeRules.headers || {}).some(([name, value]) => name.toLowerCase() === "x-robots-tag" && value.toLowerCase().includes("noindex"));
    if (routeRules.redirect || hasRobotsDisabled)
      continue;
    sitemapUrls[validCount++] = routeRules.sitemap ? defu$1(u, routeRules.sitemap) : u;
  }
  sitemapUrls.length = validCount;
  if (validCount === 0 && sitemapUrls.length > 0) {
    logger.warn(`Sitemap had ${sitemapUrls.length} that were all filtered out. This may be due to a robots rules blocking these URLs from indexing. Check your /** route rules or robots.txt configuration.`);
  }
  const locSize = sitemapUrls.length;
  const resolvedCtx = {
    urls: sitemapUrls,
    sitemapName,
    event
  };
  await nitro.hooks.callHook("sitemap:resolved", resolvedCtx);
  if (resolvedCtx.urls.length !== locSize) {
    resolvedCtx.urls = resolvedCtx.urls.map((e) => preNormalizeEntry(e, resolvers));
  }
  const maybeSort = (urls2) => runtimeConfig.sortEntries ? sortInPlace(urls2) : urls2;
  const defaults = definition.defaults || {};
  const normalizedPreDedupe = resolvedCtx.urls.map((e) => normaliseEntry(e, defaults, resolvers));
  const urls = maybeSort(mergeOnKey$1(normalizedPreDedupe, "_key").map((e) => normaliseEntry(e, defaults, resolvers)));
  if (definition._isChunking && definition.sitemapName.includes("-")) {
    const parts = definition.sitemapName.split("-");
    const lastPart = parts.pop();
    if (!Number.isNaN(Number(lastPart))) {
      const chunkIndex = Number(lastPart);
      const baseSitemapName = parts.join("-");
      if (urls.length === 0 && chunkIndex > 0) {
        throw createError({
          statusCode: 404,
          message: `Sitemap chunk ${chunkIndex} for "${baseSitemapName}" does not exist.`
        });
      }
    }
  }
  const errorInfo = failedSources.length > 0 ? {
    messages: failedSources.map((f) => f.error),
    urls: failedSources.map((f) => f.url)
  } : void 0;
  const sitemap = urlsToXml(urls, resolvers, runtimeConfig, errorInfo);
  const ctx = { sitemap, sitemapName, event };
  await nitro.hooks.callHook("sitemap:output", ctx);
  return ctx.sitemap;
}
defineCachedFunction(
  buildSitemapXml,
  {
    name: "sitemap:xml",
    group: "sitemap",
    maxAge: SERVER_CACHE_MAX_AGE,
    base: "sitemap",
    // Use the sitemap storage
    getKey: (event, definition) => {
      const host = getHeader(event, "host") || getHeader(event, "x-forwarded-host") || "";
      const proto = getHeader(event, "x-forwarded-proto") || "https";
      const sitemapName = definition.sitemapName || "default";
      return `${sitemapName}-${proto}-${host}`;
    },
    swr: true
    // Enable stale-while-revalidate
  }
);
async function createSitemap(event, definition, runtimeConfig) {
  const resolvers = useNitroUrlResolvers(event);
  const xml = await buildSitemapXml(event, definition, resolvers, runtimeConfig);
  setHeader(event, "Content-Type", "text/xml; charset=UTF-8");
  if (runtimeConfig.cacheMaxAgeSeconds) {
    setHeader(event, "Cache-Control", `public, max-age=${runtimeConfig.cacheMaxAgeSeconds}, s-maxage=${runtimeConfig.cacheMaxAgeSeconds}, stale-while-revalidate=3600`);
    const now = /* @__PURE__ */ new Date();
    setHeader(event, "X-Sitemap-Generated", now.toISOString());
    setHeader(event, "X-Sitemap-Cache-Duration", `${runtimeConfig.cacheMaxAgeSeconds}s`);
    const expiryTime = new Date(now.getTime() + runtimeConfig.cacheMaxAgeSeconds * 1e3);
    setHeader(event, "X-Sitemap-Cache-Expires", expiryTime.toISOString());
    const remainingSeconds = Math.floor((expiryTime.getTime() - now.getTime()) / 1e3);
    setHeader(event, "X-Sitemap-Cache-Remaining", `${remainingSeconds}s`);
  } else {
    setHeader(event, "Cache-Control", `no-cache, no-store`);
  }
  event.context._isSitemap = true;
  return xml;
}

async function sitemapXmlEventHandler(e) {
  const runtimeConfig = useSitemapRuntimeConfig();
  const { sitemaps } = runtimeConfig;
  if ("index" in sitemaps)
    return sendRedirect(e, withBase("/sitemap_index.xml", useRuntimeConfig().app.baseURL), 302 );
  return createSitemap(e, Object.values(sitemaps)[0], runtimeConfig);
}

const _QeQc9E = defineEventHandler(sitemapXmlEventHandler);

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
	
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function defineRule(rule) {
  return rule;
}
function isNonFetchableLink(link) {
  const trimmedLink = link.trim().toLowerCase();
  return trimmedLink.startsWith("javascript:") || trimmedLink.startsWith("blob:") || trimmedLink.startsWith("data:") || trimmedLink.startsWith("mailto:") || trimmedLink.startsWith("tel:") || trimmedLink.startsWith("vbscript:") || trimmedLink.startsWith("#");
}

const responses = {};
const MockSuccessResponse = Promise.resolve({ status: 200, statusText: "OK", headers: {} });
async function getLinkResponse({ link, timeout, fetchRemoteUrls, baseURL, isInStorage }) {
  if (link.includes("#") && !link.startsWith("#"))
    link = link.split("#")[0];
  link = decodeURI(link);
  if (link in responses) {
    return responses[link];
  }
  if (isNonFetchableLink(link)) {
    return null;
  }
  if (isInStorage()) {
    responses[link] = Promise.resolve({ status: 200, statusText: "OK", headers: { "X-Nuxt-Prerendered": true } });
    return responses[link];
  }
  if (link.startsWith("http") || link.startsWith("//")) {
    responses[link] = fetchRemoteUrls ? crawlFetch(link, { timeout, baseURL }) : MockSuccessResponse;
    return responses[link];
  }
  responses[link] = crawlFetch(link, { timeout, baseURL });
  return responses[link];
}
async function crawlFetch(link, options = {}) {
  const timeout = options.timeout || 5e3;
  const timeoutController = new AbortController();
  const abortRequestTimeout = setTimeout(() => timeoutController.abort(), timeout);
  const start = Date.now();
  return await globalThis.$fetch.raw(encodeURI(link), {
    baseURL: options.baseURL,
    method: "HEAD",
    signal: timeoutController.signal,
    retry: 3,
    retryDelay: 250,
    headers: {
      "user-agent": "Nuxt Link Checker"
    }
  }).catch((error) => {
    if (error.name === "AbortError")
      return { status: 408, statusText: "Request Timeout", headers: {} };
    return { status: 404, statusText: "Not Found", headers: {} };
  }).finally(() => clearTimeout(abortRequestTimeout)).then((res) => {
    let headersObj = {};
    if (res.headers) {
      if (typeof res.headers.entries === "function") {
        headersObj = Object.fromEntries(Array.from(res.headers.entries()));
      } else if (typeof res.headers === "object") {
        headersObj = { ...res.headers };
      }
    }
    return { status: res.status, statusText: res.statusText, headers: headersObj, time: Date.now() - start };
  });
}

const lruFsCache = /* @__PURE__ */ new Map();
const regexEscapeRe = /[-/\\^$*+?.()|[\]{}]/g;
function generateLinkSources(s, link) {
  const regEscapedLink = link.replace(regexEscapeRe, "\\$&");
  const VueLinkRegExp = new RegExp(`(['"])${regEscapedLink}(['"])`);
  const MdLinkRegExp = new RegExp(`\\[.*\\]\\((${regEscapedLink})\\)`);
  const lines = s.split("\n");
  const sources = [];
  for (const [i, line] of lines.entries()) {
    const lineNumber = i + 1;
    const preLineLength = lines.slice(0, lineNumber - 1).join("\n").length + 1;
    let index = line.search(VueLinkRegExp);
    if (index !== -1) {
      const columnNumber = index - 1;
      const start = preLineLength + index + 1;
      const end = start + link.length;
      sources.push({ start, end, lineNumber, columnNumber });
    } else {
      index = line.search(MdLinkRegExp);
      if (index !== -1) {
        const substr = line.slice(index);
        const start = preLineLength + index + substr.indexOf("(", index) + 1;
        const end = start + link.length;
        if (s.substring(start, end) === link) {
          sources.push({ start, end, lineNumber: i + 1, columnNumber: start });
        }
      }
    }
  }
  return sources;
}
const LINE_PREVIEW_OFFSET = 2;
async function generateFileLinkPreviews(filepath, link) {
  const contents = lruFsCache.has(filepath) ? lruFsCache.get(filepath) : await readFile(filepath, "utf8").catch(() => "");
  const previews = contents ? generateLinkSourcePreviews(contents, link) : [];
  let lang = filepath.split(".").pop();
  if (!lang)
    lang = "vue";
  lruFsCache.set(filepath, contents);
  if (lruFsCache.size > 100)
    lruFsCache.delete(lruFsCache.keys().next().value);
  return { previews, lang, filepath };
}
async function generateFileLinkDiff(filepath, original, replacement) {
  const contents = lruFsCache.has(filepath) ? lruFsCache.get(filepath) : await readFile(filepath, "utf8");
  lruFsCache.set(filepath, contents);
  if (lruFsCache.size > 100)
    lruFsCache.delete(lruFsCache.keys().next().value);
  return {
    ...generateLinkDiff(contents, original, replacement),
    filepath
  };
}
function generateLinkSourcePreviews(s, link) {
  const sources = generateLinkSources(s, link);
  const lines = s.split("\n");
  return sources.map(({ lineNumber, columnNumber }) => {
    const code = lines.slice(lineNumber - LINE_PREVIEW_OFFSET - 1, lineNumber + LINE_PREVIEW_OFFSET).join("\n");
    return { code, lineNumber, columnNumber };
  });
}
function generateLinkDiff(s, originalLink, newLink) {
  const ms = new MagicString(s);
  const sources = generateLinkSources(s, originalLink);
  sources.forEach(({ start, end }) => {
    ms.remove(start, end);
    ms.prependRight(start, newLink);
  });
  return { diff: calculateDiff(s, ms.toString()), code: ms.toString() };
}
function calculateDiff(from, to) {
  const diffs = diffLines(from.trim(), to.trim());
  const added = [];
  const removed = [];
  const result = [];
  for (const diff of diffs) {
    const lines = diff.value.trimEnd().split("\n");
    for (const line of lines) {
      if (diff.added) {
        added.push(result.length);
        result.push(line);
      } else if (diff.removed) {
        removed.push(result.length);
        result.push(line);
      } else {
        result.push(line);
      }
    }
  }
  return {
    added,
    removed,
    result: result.join("\n")
  };
}

function RuleAbsoluteSiteUrls() {
  return defineRule({
    id: "absolute-site-urls",
    test({ report, url, siteConfig }) {
      if (!url.host)
        return;
      report({
        name: "absolute-site-urls",
        scope: "warning",
        message: "Internal links should be relative.",
        tip: "Using internal links that start with / is recommended to avoid issues when deploying your site to different domain names",
        fix: url.pathname,
        fixDescription: `Remove ${siteConfig.url}.`
      });
    }
  });
}

function RuleDescriptiveLinkText() {
  return defineRule({
    id: "link-text",
    test({ textContent, report }) {
      if (typeof textContent === "undefined")
        return;
      if (!textContent) {
        report({
          name: "link-text",
          scope: "warning",
          message: "Missing link textContent, title or aria-label.",
          tip: "Links with descriptive text are easier to understand for screen readers and search engines."
        });
      }
      const uniformLinkText = textContent.trim().toLowerCase();
      const listOfBadDescriptiveLinkTexts = [
        "click here",
        "click this",
        "go",
        "here",
        "this",
        "start",
        "right here",
        "more",
        "learn more"
      ];
      if (listOfBadDescriptiveLinkTexts.includes(uniformLinkText)) {
        report({
          name: "link-text",
          scope: "warning",
          message: `Link text "${textContent}" should be more descriptive.`,
          tip: `The ${textContent} descriptive text does not provide any context to the link.`
        });
      }
    }
  });
}

function RuleMissingHash() {
  return defineRule({
    id: "missing-hash",
    test({ link, report, ids, fromPath }) {
      const [path, hash] = link.split("#");
      if (!path)
        return;
      if (!link.includes("#") || link.endsWith("#top") || fixSlashes(false, path) !== fromPath)
        return;
      if (!hash || ids.includes(hash))
        return;
      const fuse = new Fuse(ids, {
        threshold: 0.6
      });
      const fixedHash = fuse.search(hash.replace("#", ""))?.[0]?.item;
      const payload = {
        name: "missing-hash",
        scope: "error",
        message: `No element with id "${hash}" found.`
      };
      if (fixedHash) {
        payload.fix = `${link.split("#")[0]}#${fixedHash}`;
        payload.fixDescription = `Did you mean ${payload.fix}?`;
      }
      report(payload);
    }
  });
}

function RuleNoDocumentRelative() {
  return defineRule({
    id: "no-baseless",
    // TODO rename to no-document-relative
    test({ link, fromPath, report }) {
      if (link.startsWith("#") || link.startsWith("/") || link.startsWith("http") || isNonFetchableLink(link))
        return;
      report({
        name: "no-baseless",
        scope: "warning",
        message: "Links should be root relative.",
        fix: `${joinURL(fromPath, link)}`,
        fixDescription: `Add base ${fromPath}.`
      });
    }
  });
}

const doubleSlashRe = /^\/{2,}|\/{2,}/g;
const doubleSlashTestRe = /^\/{2,}|\/{2,}/;
function RuleNoDoubleSlashes() {
  return defineRule({
    id: "no-double-slashes",
    test({ url, link, report }) {
      if (link.startsWith("//") && !link.includes(".")) {
        report({
          name: "no-double-slashes",
          scope: "warning",
          message: "Links should not contain double slashes.",
          fix: link.replaceAll(doubleSlashRe, "/"),
          fixDescription: "Remove double slashes."
        });
      } else if (doubleSlashTestRe.test(url.pathname)) {
        report({
          name: "no-double-slashes",
          scope: "warning",
          message: "Links should not contain double slashes.",
          fix: link.replace(url.pathname, url.pathname.replaceAll(doubleSlashRe, "/")),
          fixDescription: "Remove double slashes."
        });
      }
    }
  });
}

function RuleNoDuplicateQueryParams() {
  return defineRule({
    id: "no-duplicate-query-params",
    test({ report, link, url }) {
      if (!url.search)
        return;
      const search = url.search.slice(1);
      const searchParams = search.split("&").map((param) => param.split("=")[0]);
      const duplicates = /* @__PURE__ */ new Set();
      for (const param of searchParams) {
        if (duplicates.has(param)) {
          const fix = link.replace(new RegExp(`([?&])${param}=[^&]*&?`), "$1");
          report({
            name: "no-duplicate-query-params",
            scope: "warning",
            message: "Links should not contain duplicated query parameters.",
            fix,
            tip: "Duplicate query parameters can cause canonical URL issues.",
            fixDescription: "Remove duplicate query parameter."
          });
          return;
        }
        duplicates.add(param);
      }
    }
  });
}

function RuleNoErrorResponse() {
  return defineRule({
    id: "no-error-response",
    externalLinks: true,
    test({ link, response, report, pageSearch }) {
      if (!response?.status || response.status.toString().startsWith("2") || response.status.toString().startsWith("3") || isNonFetchableLink(link))
        return;
      const payload = {
        name: "no-error-response",
        scope: "error",
        message: `Should not respond with status code ${response.status}${response.statusText ? ` (${response.statusText})` : ""}.`
      };
      if (link.startsWith("/") && pageSearch) {
        const related = pageSearch.search(link)?.[0]?.item;
        if (related?.link && related.link !== link) {
          payload.fix = related.link;
          payload.fixDescription = `Did you mean ${related.link}?`;
        }
      } else {
        payload.canRetry = true;
      }
      report(payload);
    }
  });
}

function RuleNoJavascript() {
  return defineRule({
    id: "no-javascript",
    externalLinks: true,
    test({ link, report }) {
      if (link.startsWith("javascript:")) {
        report({
          name: "no-javascript",
          scope: "error",
          tip: 'Using a <button type="button"> instead as a better practice.',
          message: "Should not use JavaScript"
        });
      }
    }
  });
}

function RuleNoMissingHref() {
  return defineRule({
    id: "no-missing-href",
    test({ report, link, role }) {
      if (link.trim().length > 0 || role === "button") {
        return;
      }
      report({
        name: "no-missing-href",
        scope: "warning",
        message: "For accessibility and UX anchor tags require a href attribute.",
        tip: 'Use a button element with type="button" instead if the link is not navigational.'
      }, true);
    }
  });
}

const nonAsciiRe = /[^\u0020-\u007F]/;
function RuleNoNonAsciiChars() {
  return defineRule({
    id: "no-non-ascii-chars",
    test({ link, url, report }) {
      if (link.startsWith("#"))
        return;
      function test(s) {
        if (nonAsciiRe.test(s)) {
          report({
            name: "no-non-ascii-chars",
            scope: "warning",
            message: "Links should not contain non-ascii characters.",
            // fix is to uri encode the link
            fix: encodeURI(s),
            fixDescription: "Encode non-ascii characters."
          });
        }
      }
      test(url.pathname);
      test(url.search);
      if (link.includes("#")) {
        const hash = link.split("#")[1];
        if (hash)
          test(hash);
      }
    }
  });
}

function RuleNoUnderscores() {
  return defineRule({
    id: "no-underscores",
    test({ url, report }) {
      if (url.pathname.includes("_")) {
        report({
          name: "no-underscores",
          scope: "warning",
          message: "Links should not contain underscores.",
          fix: url.pathname.replaceAll("_", "-"),
          fixDescription: "Replace underscores with dashes."
        });
      }
    }
  });
}

const uppercaseRe = /[A-Z]/;
function RuleNoUppercaseChars() {
  return defineRule({
    id: "no-uppercase-chars",
    test({ report, link }) {
      if (link.startsWith("#"))
        return;
      if (uppercaseRe.test(link)) {
        report({
          name: "no-uppercase-chars",
          scope: "warning",
          message: "Links should not contain uppercase characters.",
          fix: link.toLowerCase(),
          fixDescription: "Convert to lowercase."
        });
      }
    }
  });
}

const whitespaceRe = /\s/;
function RuleNoWhitespace() {
  return defineRule({
    id: "no-whitespace",
    test({ link, report }) {
      if (link.trim() !== link) {
        report({
          name: "no-whitespace",
          scope: "warning",
          message: "Links should not start or end with whitespace.",
          fix: link.trim(),
          fixDescription: "Remove whitespace from start and end of link."
        });
      }
      if (whitespaceRe.test(link.trim())) {
        report({
          name: "no-whitespace",
          scope: "warning",
          message: "Links should not contain whitespace.",
          tip: "Use hyphens to separate words instead of spaces."
        });
      }
    }
  });
}

function RuleTrailingSlash() {
  return defineRule({
    id: "trailing-slash",
    test({ report, link, siteConfig }) {
      const $url = parseURL(link);
      if ($url.pathname === "" && $url.hash) {
        return;
      }
      const isFile = $url.pathname.split("/").pop().includes(".");
      if ($url.pathname === "/" || isFile)
        return;
      const fix = fixSlashes(siteConfig.trailingSlash, link);
      if (!$url.pathname.endsWith("/") && siteConfig.trailingSlash) {
        report({
          name: "trailing-slash",
          scope: "warning",
          message: "Should have a trailing slash.",
          tip: "Incorrect trailing slashes can cause duplicate pages in search engines and waste crawl budget.",
          fix,
          fixDescription: "Add trailing slash."
        });
      } else if ($url.pathname.endsWith("/") && !siteConfig.trailingSlash) {
        report({
          name: "trailing-slash",
          scope: "warning",
          message: "Should not have a trailing slash.",
          tip: "Incorrect trailing slashes can cause duplicate pages in search engines and waste crawl budget.",
          fix,
          fixDescription: "Removing trailing slash."
        });
      }
    }
  });
}

function RuleRedirects() {
  return defineRule({
    id: "redirects",
    test({ report, response }) {
      if (response?.status !== 301 && response?.status !== 302)
        return;
      const payload = {
        name: "redirects",
        scope: "warning",
        message: "Should not redirect.",
        tip: "Redirects use up your crawl budget and increase loading times, it's recommended to avoid them when possible."
      };
      const fix = typeof response.headers?.get === "function" ? response.headers.get("location") : response.headers?.location || false;
      if (fix) {
        payload.fix = fix;
        payload.fixDescription = `Set to redirect URL ${fix}.`;
      }
      report(payload);
    }
  });
}

const AllInspections = [
  RuleNoMissingHref(),
  RuleNoDuplicateQueryParams(),
  RuleNoNonAsciiChars(),
  RuleMissingHash(),
  RuleNoUnderscores(),
  RuleNoWhitespace(),
  RuleNoDoubleSlashes(),
  RuleNoErrorResponse(),
  RuleNoDocumentRelative(),
  RuleNoJavascript(),
  RuleTrailingSlash(),
  RuleNoUppercaseChars(),
  RuleAbsoluteSiteUrls(),
  RuleRedirects(),
  RuleDescriptiveLinkText()
];
function inspect(ctx, rules) {
  rules = rules || AllInspections;
  const res = { error: [], warning: [], fix: ctx.link, link: ctx.link };
  let link = ctx.link;
  const siteConfigHost = ctx.siteConfig?.url && parseURL(ctx.siteConfig.url).host;
  const url = parseURL(link);
  const validInspections = rules.filter(({ id }) => !(ctx.skipInspections || []).includes(id));
  let processing = true;
  for (const rule of validInspections) {
    const isFakeAbsolute = link.startsWith("//") && !link.includes(".");
    const hasNonHttpProtocol = hasProtocol(link) && !link.startsWith("http");
    const isExternalLink = hasNonHttpProtocol || url.host && url.host !== siteConfigHost && !isFakeAbsolute;
    if (!rule.externalLinks && isExternalLink) {
      continue;
    }
    rule.test({
      ...ctx,
      link,
      url,
      report(obj, stop) {
        if (stop) {
          processing = false;
        }
        res[obj.scope].push(obj);
        if (obj.fix)
          link = obj.fix;
      }
    });
    if (!processing)
      break;
  }
  res.passes = !res.error?.length && !res.warning?.length;
  res.fix = link;
  res.textContent = ctx.textContent;
  return res;
}

const merger = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value))
    obj[key] = Array.from(/* @__PURE__ */ new Set([...obj[key], ...value]));
  return obj[key];
});
function mergeOnKey(arr, key) {
  const res = {};
  arr.forEach((item) => {
    const k = item[key];
    res[k] = merger(item, res[k] || {});
  });
  return Object.values(res);
}
function isInternalRoute(path) {
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.includes(".") || path.startsWith("/__") || path.startsWith("@");
}
const _SVoKWp = defineEventHandler(async (e) => {
  const { tasks, ids, path } = await readBody(e);
  const runtimeConfig = useRuntimeConfig().public["nuxt-link-checker"] || {};
  const partialCtx = {
    ids,
    fromPath: fixSlashes(false, path),
    siteConfig: getSiteConfig(e)
  };
  lruFsCache.clear();
  const links = await $fetch("/__link-checker__/links");
  const pageSearch = new Fuse(mergeOnKey(links, "link"), {
    keys: ["link", "title"],
    threshold: 0.5
  });
  return Promise.all(
    tasks.map(async ({ link, paths, textContent }) => {
      if (isNonFetchableLink(link) || isInternalRoute(link))
        return { passes: true };
      const response = await getLinkResponse({
        link,
        timeout: runtimeConfig.fetchTimeout,
        fetchRemoteUrls: runtimeConfig.fetchRemoteUrls,
        baseURL: getNitroOrigin(e),
        isInStorage() {
          return false;
        }
      });
      const result = inspect({
        ...partialCtx,
        link,
        textContent,
        pageSearch,
        response,
        skipInspections: runtimeConfig.skipInspections
      });
      const filePaths = [
        resolve$7(runtimeConfig.rootDir, links.find((l) => l.file && l.link === path)?.file || ""),
        ...paths.map((p) => {
          const [filepath] = p.split(":");
          return filepath;
        })
      ].filter(Boolean);
      if (!result.passes) {
        result.sources = (await Promise.all(filePaths.map(async (filepath) => await generateFileLinkPreviews(filepath, link)))).filter((s) => s.previews.length);
        result.diff = await Promise.all((result.sources || []).map(async ({ filepath }) => generateFileLinkDiff(filepath, link, result.fix)));
      }
      return result;
    })
  );
});

const contentLinkProvider = () => [];

const pagePaths = [
  {
    "title": "",
    "link": "/about",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/about.vue"
  },
  {
    "title": "",
    "link": "/catalog",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/catalog.vue"
  },
  {
    "title": "",
    "link": "/contact",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/contact.vue"
  },
  {
    "title": "",
    "link": "/faq",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/faq.vue"
  },
  {
    "title": "",
    "link": "/philosophy",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/philosophy.vue"
  },
  {
    "title": "",
    "link": "/privacy",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/privacy.vue"
  },
  {
    "title": "",
    "link": "/terms",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/terms.vue"
  },
  {
    "title": "",
    "link": "/",
    "file": "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/pages/index.vue"
  }
];

const _7L0ysC = defineCachedEventHandler(async (e) => {
  const runtimeConfig = useRuntimeConfig().public["nuxt-link-checker"] || {};
  const linkDb = [
    ...pagePaths
  ];
  if (runtimeConfig.hasSitemapModule) {
    const sitemapDebug = await $fetch("/__sitemap__/debug.json");
    const entries = sitemapDebug.globalSources.map((source) => source.urls).flat();
    linkDb.push(...entries.map((s) => ({ path: s.loc, title: "" })));
  }
  if (contentLinkProvider) {
    const links = await contentLinkProvider();
    linkDb.push(...links);
  }
  return linkDb;
}, {
  maxAge: 10
  // avoid thrashing
});

const _Fyb6Ax = defineEventHandler(async (e) => {
  return {
    runtimeConfig: useRuntimeConfig(e).public["nuxt-link-checker"]
  };
});

function useSchemaOrgConfig(e) {
  const runtimeConfig = useRuntimeConfig(e);
  return defu$1(runtimeConfig["nuxt-schema-org"], {
    scriptAttributes: {}
  });
}

const _FOk2J5 = defineEventHandler(async (e) => {
  const nitroOrigin = getNitroOrigin(e);
  const siteConfig = getSiteConfig(e);
  return {
    nitroOrigin,
    runtimeConfig: useSchemaOrgConfig(e),
    siteConfig: {
      url: siteConfig.url
    }
  };
});

const fileMapping = {};

const _nWSIDm = defineEventHandler(async (e) => {
  const path = parseURL(e.path).pathname;
  if (fileMapping[path]) {
    if (path.endsWith(".svg"))
      setHeader(e, "Content-Type", "image/svg+xml");
    else if (path.endsWith(".png"))
      setHeader(e, "Content-Type", "image/png");
    else if (path.endsWith(".jpg") || path.endsWith(".jpeg"))
      setHeader(e, "Content-Type", "image/jpeg");
    return fs.readFileSync(fileMapping[path]);
  }
});

const _dht0B4 = defineEventHandler((e) => {
  const siteConfig = getSiteConfig(e);
  const runtimeConfig = useRuntimeConfig(e);
  const seoUtils = runtimeConfig.public?.["seo-utils"] || {};
  const headConfig = runtimeConfig["seo-utils-head"] || { link: [], meta: [] };
  const query = getQuery$1(e);
  return {
    runtimeConfig: {
      version: runtimeConfig.public?.["nuxt-seo-utils-version"] || "unknown",
      ...seoUtils
    },
    siteConfig: {
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      env: siteConfig.env,
      indexable: siteConfig.indexable,
      trailingSlash: siteConfig.trailingSlash,
      titleSeparator: siteConfig.separator,
      defaultLocale: siteConfig.defaultLocale,
      currentLocale: siteConfig.currentLocale,
      twitter: siteConfig.twitter
    },
    headConfig,
    path: query.path || "/"
  };
});

const VueResolver$1 = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol$1 = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall$1(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol$1, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver$1);
}

function filterIslandProps(props) {
  if (!props) {
    return {};
  }
  const out = {};
  for (const key in props) {
    if (!key.startsWith("data-v-")) {
      out[key] = props[key];
    }
  }
  return out;
}
function computeIslandHash(name, filteredProps, context, source) {
  return hash$1([name, filteredProps, context, source]).replace(/[-_]/g, "");
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead$1(options = {}) {
  const head = createHead$2({
    ...options,
    propResolvers: [VueResolver$1]
  });
  head.install = vueInstall$1(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function encodeEventPath(path) {
	const queryIndex = path.indexOf("?");
	if (queryIndex === -1) {
		return encodePath(path);
	}
	return encodePath(path.slice(0, queryIndex)) + path.slice(queryIndex);
}
function createSSRContext(event) {
	const url = encodeEventPath(event.path);
	const ssrContext = {
		url,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead$1(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => Promise.resolve().then(function () { return server; }).then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => Promise.resolve().then(function () { return client_manifest$1; }).then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);

const getSSRRenderer = lazyCachedFunction(async () => {
	
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	
	const precomputed = undefined ;
	
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		
		
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});

const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);

function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const handler$1 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		if (ssrContext["~renderResponse"] && err?.message === "skipping render") {
			return {};
		}
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	
	
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (ssrContext["~renderResponse"]) {
		const response = ssrContext["~renderResponse"];
		if (response.statusCode && response.statusCode >= 400) {
			throw createError({
				statusCode: response.statusCode,
				statusMessage: response.statusMessage
			});
		}
		return returnIslandResponse(event, response);
	}
	
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			
			
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
function returnIslandResponse(event, response) {
	for (const header in response.headers || {}) {
		setResponseHeader(event, header, response.headers[header]);
	}
	if (response.statusCode) {
		setResponseStatus(event, response.statusCode, response.statusMessage);
	}
	return response.body;
}
const ISLAND_PATH_PREFIX = "/__nuxt_island/";
const VALID_COMPONENT_NAME_RE = /^[a-z][\w.-]*$/i;
async function getIslandContext(event) {
	let url = event.path || "";
	url.replace(/\?.*$/, "");
	if (!url.startsWith(ISLAND_PATH_PREFIX)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request path"
		});
	}
	const componentParts = url.substring(ISLAND_PATH_PREFIX.length).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	if (!componentName || !VALID_COMPONENT_NAME_RE.test(componentName)) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island component name"
		});
	}
	const rawContext = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const rawProps = destr$1(rawContext?.props) || {};
	const filteredProps = filterIslandProps(rawProps);
	
	
	const clientContext = {};
	if (rawContext && typeof rawContext === "object") {
		for (const key in rawContext) {
			if (key !== "props") {
				clientContext[key] = rawContext[key];
			}
		}
	}
	
	
	const expectedHash = computeIslandHash(componentName, filteredProps, clientContext, undefined);
	if (!hashId || hashId !== expectedHash) {
		throw createError({
			statusCode: 400,
			statusMessage: "Invalid island request hash"
		});
	}
	return {
		url: typeof rawContext?.url === "string" ? rawContext.url : "/",
		id: hashId,
		name: componentName,
		props: rawProps,
		slots: {},
		components: {}
	};
}

const _lazy_xXdK0j = () => Promise.resolve().then(function () { return renderer; });
const _lazy_tCvncX = () => Promise.resolve().then(function () { return debug_json$1; });
const _lazy_xu410X = () => Promise.resolve().then(function () { return image$1; });
const _lazy_fmeByh = () => Promise.resolve().then(function () { return resolve$1; });

const handlers = [
  { route: '', handler: _qo472K, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_xXdK0j, lazy: true, middleware: false, method: undefined },
  { route: '', handler: _V62Qqs, lazy: false, middleware: true, method: undefined },
  { route: '/__site-config__/debug.json', handler: _qhm7Yd, lazy: false, middleware: false, method: undefined },
  { route: '/robots.txt', handler: _RM7jao, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _phqCO7, lazy: false, middleware: true, method: undefined },
  { route: '/__robots__/debug.json', handler: _fgAqrj, lazy: false, middleware: false, method: undefined },
  { route: '/__robots__/debug-path.json', handler: _BR08O_, lazy: false, middleware: false, method: undefined },
  { route: '/__robots__/debug-production.json', handler: _lEmhsx, lazy: false, middleware: false, method: undefined },
  { route: '/__sitemap__/debug.json', handler: _EmAKwj, lazy: false, middleware: false, method: undefined },
  { route: '/__sitemap__/debug-production.json', handler: _wQ_EuQ, lazy: false, middleware: false, method: undefined },
  { route: '/__sitemap__/style.xsl', handler: _1ngzjc, lazy: false, middleware: false, method: undefined },
  { route: '/sitemap.xml', handler: _QeQc9E, lazy: false, middleware: false, method: undefined },
  { route: '/__link-checker__/inspect', handler: _SVoKWp, lazy: false, middleware: false, method: undefined },
  { route: '/__link-checker__/links', handler: _7L0ysC, lazy: false, middleware: false, method: undefined },
  { route: '/__link-checker__/debug.json', handler: _Fyb6Ax, lazy: false, middleware: false, method: undefined },
  { route: '/_og/debug.json', handler: _lazy_tCvncX, lazy: true, middleware: false, method: undefined },
  { route: '/_og/d/**', handler: _lazy_xu410X, lazy: true, middleware: false, method: undefined },
  { route: '/_og/s/**', handler: _lazy_xu410X, lazy: true, middleware: false, method: undefined },
  { route: '/_og/r/**', handler: _lazy_fmeByh, lazy: true, middleware: false, method: undefined },
  { route: '/__schema-org__/debug.json', handler: _FOk2J5, lazy: false, middleware: false, method: undefined },
  { route: '', handler: _nWSIDm, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt-seo-utils/debug.json', handler: _dht0B4, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: handler$1, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_xXdK0j, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = crypto$1.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$1 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$1.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$1.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join$1(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join$1(tmpdir(), socketName);
}
async function shutdown() {
  server$1.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--un-default-border-color,#e5e7eb)}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const empty$1 = Object.freeze(
  Object.create(null, {
    __mock__: { get: () => true },
  }),
);

const empty = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: empty$1
}, Symbol.toStringTag, { value: 'Module' }));

function getCloudflareAssets(event) {
  const assets = event.context.cloudflare?.env?.ASSETS || event.context.ASSETS;
  return assets && typeof assets.fetch === "function" ? assets : void 0;
}
async function tryCloudflareAssetsFetch(event, path, signal) {
  const assets = getCloudflareAssets(event);
  if (!assets)
    return;
  const origin = event.context.cloudflare?.request?.url || `https://${getRequestHost(event) || "localhost"}`;
  const url = new URL(path, origin).href;
  const res = await assets.fetch(url, signal ? { signal } : void 0).catch(() => null);
  if (!res || !res.ok)
    return;
  return res.arrayBuffer();
}

async function fetchLocalAsset(event, path, options) {
  const { fetchTimeout, headers, includeExternalFallback = false, onStepFailure } = options;
  const deadline = AbortSignal.timeout(fetchTimeout);
  let expired = false;
  const timer = new Promise((resolve) => {
    setTimeout(() => {
      expired = true;
      resolve(void 0);
    }, fetchTimeout);
  });
  const race = (p) => Promise.race([p, timer]);
  let result = await race(tryCloudflareAssetsFetch(event, path, deadline).catch((err) => {
    onStepFailure?.(path, err);
    return void 0;
  }));
  if (result || expired)
    return result;
  result = await race(event.$fetch(path, {
    responseType: "arrayBuffer",
    signal: deadline,
    timeout: fetchTimeout,
    headers
  }).catch((err) => {
    onStepFailure?.(path, err);
    return void 0;
  }));
  if (result || expired || !includeExternalFallback)
    return result;
  const absolute = `${getNitroOrigin(event)}${path}`;
  return await race($fetch$1(absolute, {
    responseType: "arrayBuffer",
    signal: deadline,
    timeout: fetchTimeout,
    headers
  }).catch((err) => {
    onStepFailure?.(absolute, err);
    return void 0;
  }));
}

const MIN_TIMEOUT_MS = 100;
function getFetchTimeout(runtimeConfig) {
  const value = runtimeConfig.security?.imageFetchTimeout ?? 3e3;
  if (!Number.isFinite(value) || value < MIN_TIMEOUT_MS)
    return MIN_TIMEOUT_MS;
  return value;
}

const buildDir = "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/.nuxt";
const rootDir = "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site";

let fontUrlMapping;
async function loadFontUrlMapping() {
  if (fontUrlMapping)
    return fontUrlMapping;
  const content = await readFile(join(buildDir, "cache", "og-image", "font-urls.json"), "utf-8").catch(() => null);
  fontUrlMapping = content ? JSON.parse(content) : {};
  return fontUrlMapping;
}
async function resolve$4(event, font) {
  const path = font.src || font.localPath;
  const timeout = getFetchTimeout(useOgImageRuntimeConfig());
  if (font.absolutePath) {
    const data = await readFile(font.absolutePath).catch(() => null);
    if (data?.length)
      return data;
  }
  if (path.startsWith("/_og-static-fonts/")) {
    const filename = path.slice("/_og-static-fonts/".length);
    const cached = await readFile(join(buildDir, "cache", "og-image", "fonts-ttf", filename)).catch(() => null);
    if (cached?.length)
      return cached;
  }
  if (path.startsWith("/_fonts/")) {
    const filename = path.slice("/_fonts/".length);
    const mapping = await loadFontUrlMapping();
    if (mapping[filename]) {
      const res = await fetch(mapping[filename], { signal: AbortSignal.timeout(timeout) }).catch(() => null);
      if (res?.ok)
        return Buffer.from(await res.arrayBuffer());
    }
  }
  {
    const filename = path.slice(1);
    const data = await readFile(join(rootDir, "public", filename)).catch(() => null);
    if (data?.length)
      return data;
  }
  const { app } = useRuntimeConfig();
  {
    const reqUrl = getRequestURL(event);
    const origin = `${reqUrl.protocol}//${reqUrl.host}`;
    const url = new URL(withBase(path, app.baseURL), origin).href;
    const res = await fetch(url, { signal: AbortSignal.timeout(timeout) }).catch(() => null);
    if (res?.ok) {
      return Buffer.from(await res.arrayBuffer());
    }
  }
  const fullPath = withBase(path, app.baseURL);
  const arrayBuffer = await event.$fetch(fullPath, {
    responseType: "arrayBuffer",
    timeout
  });
  return Buffer.from(arrayBuffer);
}

async function resolve$3(event, font) {
  const path = font.src || font.localPath;
  const { app } = useRuntimeConfig();
  const fullPath = withBase(path, app.baseURL);
  const origin = getNitroOrigin(event);
  const timeout = getFetchTimeout(useOgImageRuntimeConfig());
  const res = await fetch(new URL(fullPath, origin).href, { signal: AbortSignal.timeout(timeout) }).catch(() => null);
  if (res?.ok) {
    return Buffer.from(await res.arrayBuffer());
  }
  const arrayBuffer = await event.$fetch(fullPath, {
    responseType: "arrayBuffer",
    timeout
  });
  return Buffer.from(arrayBuffer);
}

const resolve$2 = (true || false) ? resolve$4 : resolve$3;

const fontRequirements = {"weights":[400],"styles":["normal"],"families":[],"hasDynamicBindings":false};
const _mapPath = "/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/.nuxt/cache/og-image/component-font-map.json";
function getComponentFontMap() {
  try { return JSON.parse(readFileSync(_mapPath, 'utf-8')) }
  catch { return {} }
}

const resolvedFonts = [{"family":"Inter","src":"/_og-static-fonts/inter-400-latin.ttf","weight":400,"style":"normal","satoriSrc":"/_og-static-fonts/inter-400-latin.ttf","absolutePath":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/public/_og-fonts/inter-400-latin.ttf","fallback":true},{"family":"Inter","src":"/_og-static-fonts/inter-700-latin.ttf","weight":700,"style":"normal","satoriSrc":"/_og-static-fonts/inter-700-latin.ttf","absolutePath":"/Users/estephanysugeycanedo/Desktop/pitaya-lab-site/node_modules/nuxt-og-image/dist/runtime/public/_og-fonts/inter-700-latin.ttf","fallback":true}];

const availableFonts = [];

function fontFormat(src) {
  if (src.endsWith(".woff2"))
    return "woff2";
  if (src.endsWith(".woff"))
    return "woff";
  if (src.endsWith(".otf"))
    return "otf";
  return "ttf";
}
function selectFontSource(f, supportedFormats, preferStatic) {
  const primarySupported = supportedFormats.has(fontFormat(f.src));
  const satoriSupported = !!(f.satoriSrc && supportedFormats.has(fontFormat(f.satoriSrc)));
  const isVariable = !!f.weightRange;
  if (preferStatic && !isVariable && satoriSupported && f.satoriSrc !== f.src)
    return { src: f.satoriSrc, isStaticFallback: true };
  if (primarySupported)
    return { src: f.src, isStaticFallback: false };
  if (satoriSupported)
    return { src: f.satoriSrc, isStaticFallback: true };
  return null;
}

function renameSubsetFonts(fonts) {
  const groups = /* @__PURE__ */ new Map();
  for (const f of fonts) {
    const key = `${f.family}\0${f.weight}\0${f.style}`;
    const arr = groups.get(key);
    if (arr)
      arr.push(f);
    else
      groups.set(key, [f]);
  }
  const result = [];
  let changed = false;
  for (const members of groups.values()) {
    const needsRename = members.length > 1 && new Set(members.map((f) => f.cacheKey)).size > 1;
    if (!needsRename) {
      result.push(...members);
      continue;
    }
    changed = true;
    for (let i = 0; i < members.length; i++) {
      const f = members[i];
      result.push({
        ...f,
        originalFamily: f.originalFamily || f.family,
        family: `${f.family}__${i}`
      });
    }
  }
  return changed ? result : fonts;
}
function buildSubsetFamilyChain(fonts) {
  const chains = /* @__PURE__ */ new Map();
  for (const f of fonts) {
    if (!f.originalFamily)
      continue;
    const arr = chains.get(f.originalFamily);
    if (arr)
      arr.push(f.family);
    else
      chains.set(f.originalFamily, [f.family]);
  }
  return chains;
}
function resolveSubsetChain(family, chains) {
  const direct = chains.get(family);
  if (direct)
    return direct;
  const lower = family.toLowerCase();
  for (const [key, value] of chains) {
    if (key.toLowerCase() === lower)
      return value;
  }
}

const RE_UNICODE_RANGE_PART = /^U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?$/;
function parseUnicodeRange(range) {
  const parts = range.split(",").map((s) => s.trim()).filter(Boolean);
  const result = [];
  for (const part of parts) {
    const match = part.match(RE_UNICODE_RANGE_PART);
    if (!match)
      return null;
    const start = Number.parseInt(match[1], 16);
    const end = match[2] ? Number.parseInt(match[2], 16) : start;
    result.push([start, end]);
  }
  return result.length > 0 ? result : null;
}
function codepointsIntersectRanges(codepoints, ranges) {
  for (const cp of codepoints) {
    for (const [start, end] of ranges) {
      if (cp >= start && cp <= end)
        return true;
    }
  }
  return false;
}
function addCodepointsFromString(str, codepoints) {
  for (const ch of str)
    codepoints.add(ch.codePointAt(0));
}
function extractCodepoints(node) {
  const codepoints = /* @__PURE__ */ new Set();
  const walk = (n) => {
    if (typeof n.text === "string")
      addCodepointsFromString(n.text, codepoints);
    const children = n.props?.children ?? n.children;
    if (typeof children === "string") {
      addCodepointsFromString(children, codepoints);
    } else if (Array.isArray(children)) {
      for (const child of children) {
        if (child == null)
          continue;
        if (typeof child === "string")
          addCodepointsFromString(child, codepoints);
        else
          walk(child);
      }
    }
  };
  walk(node);
  return codepoints;
}

async function loadFont(event, font, src) {
  const cacheKey = `${font.family}-${font.weight}-${font.style}-${src}`;
  const cached = fontCache.get(cacheKey);
  if (cached)
    return cached;
  const data = await resolve$2(event, { ...font, src }).catch((err) => {
    logger$2.warn(`Failed to load font ${font.family}: ${err.message}`);
    return null;
  });
  if (!data)
    return null;
  fontCache.set(cacheKey, data);
  return data;
}
function findClosestWeight(target, available) {
  return available.reduce(
    (closest, w) => Math.abs(w - target) < Math.abs(closest - target) ? w : closest
  );
}
function selectFontsForRequirements(allFonts, requirements) {
  if (requirements.hasDynamicBindings)
    return [...allFonts];
  const fallbackFonts = [];
  const byFamily = /* @__PURE__ */ new Map();
  const requiredFamilies = requirements.families.length > 0 ? new Set(requirements.families) : null;
  for (const f of allFonts) {
    if (f.fallback) {
      fallbackFonts.push(f);
      continue;
    }
    if (!requirements.styles.includes(f.style))
      continue;
    if (requiredFamilies && !requiredFamilies.has(f.family))
      continue;
    const arr = byFamily.get(f.family) || [];
    arr.push(f);
    byFamily.set(f.family, arr);
  }
  const selected = [];
  for (const [, familyFonts] of byFamily) {
    const availableWeights = [...new Set(familyFonts.map((f) => f.weight))].toSorted((a, b) => a - b);
    if (availableWeights.length === 0)
      continue;
    const selectedWeights = /* @__PURE__ */ new Set();
    for (const w of requirements.weights) {
      if (availableWeights.includes(w)) {
        selectedWeights.add(w);
      } else {
        selectedWeights.add(findClosestWeight(w, availableWeights));
      }
    }
    selected.push(...familyFonts.filter((f) => selectedWeights.has(f.weight)));
  }
  selected.push(...fallbackFonts);
  return selected;
}
const _warnedFontKeys = /* @__PURE__ */ new Set();
async function loadAllFonts(event, options) {
  const map = getComponentFontMap();
  const componentReqs = options.component ? map[options.component] : null;
  const usingGlobalFallback = !!(componentReqs && componentReqs.hasDynamicBindings);
  const reqs = componentReqs && !componentReqs.hasDynamicBindings ? componentReqs : fontRequirements;
  const fonts = selectFontsForRequirements(resolvedFonts, reqs);
  if (options.fontFamilyOverride) {
    const loadedFamilies = new Set(fonts.map((f) => f.family));
    if (!loadedFamilies.has(options.fontFamilyOverride)) {
      const overrideFonts = availableFonts.filter((f) => f.family === options.fontFamilyOverride);
      if (overrideFonts.length > 0) {
        fonts.push(...overrideFonts);
      } else {
        const resolvedOverride = resolvedFonts.filter((f) => f.family === options.fontFamilyOverride);
        fonts.push(...resolvedOverride);
      }
    }
  }
  const resolved = [];
  for (const f of fonts) {
    const selection = selectFontSource(f, options.supportedFormats, options.preferStatic ?? false);
    if (selection)
      resolved.push({ font: f, ...selection });
  }
  const filtered = options.codepoints && options.codepoints.size > 0 ? resolved.filter(({ font: f, isStaticFallback }) => {
    if (isStaticFallback || !f.unicodeRange)
      return true;
    const ranges = parseUnicodeRange(f.unicodeRange);
    if (!ranges)
      return true;
    return codepointsIntersectRanges(options.codepoints, ranges);
  }) : resolved;
  const results = await Promise.all(
    filtered.map(async ({ font: f, src: initialSrc, isStaticFallback }) => {
      let src = initialSrc;
      let data = await loadFont(event, f, src);
      if (!data && src !== f.src && options.supportedFormats.has(fontFormat(f.src))) {
        data = await loadFont(event, f, f.src);
        if (data) {
          src = f.src;
          isStaticFallback = false;
        }
      }
      if (!data)
        return null;
      return {
        ...f,
        src,
        ...isStaticFallback ? { unicodeRange: void 0 } : {},
        cacheKey: `${f.family}-${f.weight}-${f.style}-${src}`,
        data
      };
    })
  );
  const loaded = results.filter((f) => f !== null);
  const fingerprint = loaded.map((f) => f.cacheKey).sort().join("|");
  const cachedArray = fontArrayCache.get(fingerprint);
  if (cachedArray)
    return cachedArray;
  fontArrayCache.set(fingerprint, loaded);
  const isCommunity = options.component && map[options.component]?.category === "community";
  if (!options.supportedFormats.has("woff2") && loaded.length === 0 && fonts.length > 0 && !isCommunity) {
    const variableFamilies = [...new Set(fonts.map((f) => f.family))];
    const warnKey = `variable-fonts-${variableFamilies.join(",")}`;
    if (!_warnedFontKeys.has(warnKey)) {
      if (_warnedFontKeys.size >= 100)
        _warnedFontKeys.clear();
      _warnedFontKeys.add(warnKey);
      logger$2.warn(`All fonts are variable fonts (${variableFamilies.join(", ")}). Variable fonts are not supported by Satori renderer. Falling back to bundled Inter font. Consider using the 'takumi' renderer for variable font support.`);
    }
  }
  if (reqs.weights.length > 0 && !isCommunity) {
    const families = reqs.families.length > 0 ? reqs.families : [...new Set(loaded.map((f) => f.family))];
    const component = options.component ? ` (${options.component})` : "";
    const fallbackNote = usingGlobalFallback ? " Note: using global font requirements because this component has dynamic font bindings." : "";
    for (const family of families) {
      const loadedWeights = [...new Set(loaded.filter((f) => f.family === family).map((f) => f.weight))].toSorted((a, b) => a - b);
      if (loadedWeights.length === 0)
        continue;
      for (const reqWeight of reqs.weights) {
        if (loadedWeights.includes(reqWeight))
          continue;
        const closest = findClosestWeight(reqWeight, loadedWeights);
        const warnKey = `${family}-${reqWeight}-${closest}-${options.component || ""}`;
        if (_warnedFontKeys.has(warnKey))
          continue;
        if (_warnedFontKeys.size >= 100)
          _warnedFontKeys.clear();
        _warnedFontKeys.add(warnKey);
        logger$2.warn(`Font "${family}" weight ${reqWeight} not configured${component}, using ${closest} instead.${fallbackNote}`);
      }
    }
  }
  return loaded;
}
async function loadDefinedFonts(event, fontDefs) {
  const results = [];
  for (const def of fontDefs) {
    if (!def || typeof def !== "object" || !def.path)
      continue;
    const name = def.name;
    const weight = def.weight || 400;
    const style = def.style === "italic" ? "italic" : "normal";
    const path = def.path;
    const fontConfig = { family: name, weight, style, src: path, localPath: path };
    const data = await resolve$2(event.e, fontConfig).catch(() => null);
    if (data) {
      results.push({
        ...fontConfig,
        cacheKey: `custom-${name}-${weight}-${style}-${path}`,
        data
      });
    }
  }
  return results;
}
async function loadFontsForRenderer(event, options) {
  const baseFonts = await loadAllFonts(event.e, options);
  const customFonts = Array.isArray(options.fontDefs) && options.fontDefs.length > 0 ? await loadDefinedFonts(event, options.fontDefs) : [];
  const allFonts = customFonts.length > 0 ? [...baseFonts, ...customFonts] : baseFonts;
  return renameSubsetFonts(allFonts);
}
function getDefaultFontFamily(options) {
  const fontFamilyOverride = options.props?.fontFamily;
  const defaultFont = resolvedFonts[0]?.family;
  return { fontFamilyOverride, defaultFont };
}

const takumiInstance = { instance: void 0 };
async function ensureInstance() {
  takumiInstance.instance = takumiInstance.instance || await Promise.resolve().then(function () { return nodeDev$1; }).then((m) => m.default);
  await takumiInstance.instance.initWasmPromise;
  return takumiInstance.instance;
}
async function getTakumi() {
  return (await ensureInstance()).Renderer;
}
async function getExtractResourceUrls() {
  return (await ensureInstance()).extractResourceUrls;
}

const RE_QUOT = /&quot;/g;
const RE_APOS_DEC = /&#39;/g;
const RE_APOS_HEX = /&#x27;/g;
const RE_LT$1 = /&lt;/g;
const RE_GT$1 = /&gt;/g;
const RE_CENT = /&cent;/g;
const RE_POUND = /&pound;/g;
const RE_YEN = /&yen;/g;
const RE_EURO = /&euro;/g;
const RE_COPY = /&copy;/g;
const RE_REG = /&reg;/g;
const RE_SLASH_HEX = /&#x2F;/g;
const RE_DEC_ENTITY = /&#(\d+);/g;
const RE_AMP$1 = /&amp;/g;
function decodeHtml(html) {
  return html.replace(RE_LT$1, "<").replace(RE_GT$1, ">").replace(RE_CENT, "\xA2").replace(RE_POUND, "\xA3").replace(RE_YEN, "\xA5").replace(RE_EURO, "\u20AC").replace(RE_COPY, "\xA9").replace(RE_REG, "\xAE").replace(RE_QUOT, '"').replace(RE_APOS_DEC, "'").replace(RE_APOS_HEX, "'").replace(RE_SLASH_HEX, "/").replace(RE_DEC_ENTITY, (full, int) => {
    return String.fromCharCode(Number.parseInt(int));
  }).replace(RE_AMP$1, "&");
}

function walkTree(e, node, plugins) {
  const promises = [];
  for (const plugin of plugins.flat()) {
    if (plugin.filter(node)) {
      promises.push(plugin.transform(node, e));
    }
  }
  if (!node.props?.children || !Array.isArray(node.props.children))
    return promises;
  if (node.props.children.length === 0) {
    delete node.props.children;
    return promises;
  }
  for (const child of node.props.children || []) {
    if (child && typeof child === "object") {
      promises.push(
        ...walkTree(e, child, plugins)
      );
    }
  }
  return promises;
}
function defineTransformer(transformer) {
  return transformer;
}

const encoding = defineTransformer([
  // clean up vue inspector data attributes
  {
    filter: (node) => node.props?.["data-v-inspector"],
    transform: (node) => {
      delete node.props["data-v-inspector"];
    }
  },
  // decode HTML entities in string children
  {
    filter: (node) => typeof node.props?.children === "string",
    transform: (node) => {
      node.props.children = decodeHtml(node.props.children);
    }
  },
  // decode HTML entities in array children (text nodes with siblings)
  {
    filter: (node) => Array.isArray(node.props?.children),
    transform: (node) => {
      node.props.children = node.props.children.map(
        (child) => typeof child === "string" ? decodeHtml(child) : child
      );
    }
  }
]);

function getImageDimensions(data) {
  if (data[0] === 137 && data[1] === 80 && data.length >= 24) {
    const width = new DataView(data.buffer, data.byteOffset + 16).getUint32(0, false);
    const height = new DataView(data.buffer, data.byteOffset + 20).getUint32(0, false);
    return { width, height };
  }
  if (data[0] === 255 && data[1] === 216) {
    let i = 2;
    while (i < data.length - 8) {
      if (data[i] === 255) {
        const marker = data[i + 1];
        if (marker >= 192 && marker <= 195 || marker === 201) {
          const height = data[i + 5] << 8 | data[i + 6];
          const width = data[i + 7] << 8 | data[i + 8];
          return { width, height };
        }
        const len = data[i + 2] << 8 | data[i + 3];
        i += len + 2;
      } else {
        i++;
      }
    }
  }
  if (data[0] === 71 && data[1] === 73 && data[2] === 70 && data.length >= 10) {
    const width = data[6] | data[7] << 8;
    const height = data[8] | data[9] << 8;
    return { width, height };
  }
  return {};
}

const RE_URL_LEADING = /^url\(['"]?/;
const RE_URL_TRAILING = /['"]?\)$/;
const SUBREQUEST_HEADERS = { "x-nuxt-og-image": "1" };
async function resolveLocalFilePathImage(publicStoragePath, src) {
  const normalizedSrc = withoutLeadingSlash(
    src.replace("_nuxt/@fs/", "").replace("_nuxt/", "").replace("./", "")
  ).replaceAll("/", ":");
  const key = `${publicStoragePath}:${normalizedSrc}`;
  if (await useStorage().hasItem(key))
    return await useStorage().getItemRaw(key);
}
function toBufferSourceAsBase64(buf) {
  const ab = buf instanceof ArrayBuffer ? buf : ArrayBuffer.isView(buf) ? buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) : buf;
  return toBase64Image(ab);
}
const renderCaches = /* @__PURE__ */ new WeakMap();
function getRenderCache(e) {
  let cache = renderCaches.get(e);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    renderCaches.set(e, cache);
  }
  return cache;
}
function resolveSrcToBuffer(src, kind, ctx) {
  const cache = getRenderCache(ctx.e);
  const existing = cache.get(src);
  if (existing)
    return existing;
  const promise = doResolveSrcToBuffer(src, kind, ctx);
  cache.set(src, promise);
  return promise;
}
async function doResolveSrcToBuffer(src, kind, { e, publicStoragePath, runtimeConfig, timings }) {
  const fetchTimeout = getFetchTimeout(runtimeConfig);
  const logFailure = (url, err) => {
    logger$1.debug(`[og-image] ${kind} fetch failed (${url}): ${err?.message || err}`);
  };
  if (src.startsWith("/")) {
    let buffer2;
    {
      const srcWithoutBase = src.replace(runtimeConfig.app.baseURL, "/");
      buffer2 = await resolveLocalFilePathImage(publicStoragePath, srcWithoutBase);
    }
    if (!buffer2 && true) {
      const ab = await timings.measure("image-fetch", () => fetchLocalAsset(e, src, {
        fetchTimeout,
        headers: SUBREQUEST_HEADERS,
        includeExternalFallback: true,
        onStepFailure: logFailure
      }));
      if (ab)
        buffer2 = new Uint8Array(ab);
    }
    return buffer2 ? { buffer: buffer2 } : {};
  }
  const decodedSrc = decodeHtml(src);
  const end = timings.start("image-fetch");
  let buffer;
  {
    buffer = await $fetch(decodedSrc, {
      responseType: "arrayBuffer",
      timeout: fetchTimeout
    }).catch((err) => {
      logFailure(decodedSrc, err);
    }).finally(end);
  }
  return buffer ? { buffer } : {};
}
function applyImageDimensions(node, buffer) {
  if (typeof node.props.width === "string")
    node.props.width = Number(node.props.width) || void 0;
  if (typeof node.props.height === "string")
    node.props.height = Number(node.props.height) || void 0;
  if (node.props.width && node.props.height)
    return;
  const view = buffer instanceof Uint8Array ? buffer : ArrayBuffer.isView(buffer) ? new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) : new Uint8Array(buffer);
  const dimensions = getImageDimensions(view);
  if (!dimensions?.width || !dimensions?.height)
    return;
  const naturalAspectRatio = dimensions.width / dimensions.height;
  if (node.props.width && !node.props.height) {
    node.props.height = Math.round(node.props.width / naturalAspectRatio);
  } else if (node.props.height && !node.props.width) {
    node.props.width = Math.round(node.props.height * naturalAspectRatio);
  } else {
    node.props.width = dimensions.width;
    node.props.height = dimensions.height;
  }
}
const imageSrc = defineTransformer([
  // fix <img src="">
  {
    filter: (node) => node.type === "img" && node.props?.src,
    transform: async (node, ctx) => {
      let src = node.props.src;
      if (src.startsWith("data:"))
        return;
      if (ctx.renderer.name === "satori" && src.endsWith(".webp")) {
        logger$1.warn("Using WebP images with Satori is not supported. Please consider switching image format or use the takumi or browser renderer.", src);
      }
      const isRelative = src.startsWith("/");
      if (!isRelative)
        src = node.props.src = decodeHtml(src);
      const result = await resolveSrcToBuffer(src, "image", ctx);
      if (result.blocked) {
        delete node.props.src;
        return;
      }
      if (result.buffer) {
        node.props.src = toBufferSourceAsBase64(result.buffer);
        applyImageDimensions(node, result.buffer);
        return;
      }
      if (isRelative) {
        node.props.src = withBase(src, `${getNitroOrigin(ctx.e)}`);
        return;
      }
    }
  },
  // fix style="background-image: url('')"
  {
    filter: (node) => node.props?.style?.backgroundImage?.includes("url("),
    transform: async (node, ctx) => {
      const backgroundImage = node.props.style.backgroundImage;
      const src = backgroundImage.replace(RE_URL_LEADING, "").replace(RE_URL_TRAILING, "");
      if (src.startsWith("data:"))
        return;
      const result = await resolveSrcToBuffer(src, "background-image", ctx);
      if (result.blocked) {
        delete node.props.style.backgroundImage;
        return;
      }
      if (result.buffer) {
        node.props.style.backgroundImage = `url(${toBufferSourceAsBase64(result.buffer)})`;
        return;
      }
    }
  }
]);

const tw4Breakpoints = {};

const DEFAULT_BREAKPOINTS = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
const BREAKPOINTS = { ...DEFAULT_BREAKPOINTS, ...tw4Breakpoints };
const RESPONSIVE_PREFIX_RE = /^(sm|md|lg|xl|2xl):(.+)$/;
const DARK_MODE_PREFIX_RE = /^dark:(.+)$/;
const GAP_CLASS_RE = /^gap(?:-(x|y))?-(\d+(?:\.\d+)?)$/;
const GAP_ARBITRARY_RE = /^gap(?:-(x|y))?-\[(.+)\]$/;
const TEXT_SIZE_RE = /^(?:xs|sm|base|lg|xl|\d+xl)$/;
const BORDER_WIDTH_RE = /^\d+$/;
const BORDER_SIDE_RE = /^[trblxy](?:-\d+)?$/;
const RING_WIDTH_RE = /^\d+$/;
const DIVIDE_SIDE_RE = /^[xy](?:-\d+)?$/;
const DIVIDE_NUMERIC_RE = /^\d+$/;
const OUTLINE_NUMERIC_RE = /^\d+$/;
const OUTLINE_STYLE_RE = /^(?:none|dashed|dotted|double)$/;
function resolveGapToStyle(cls, style) {
  const match = cls.match(GAP_CLASS_RE);
  if (match) {
    const axis = match[1];
    const value = Number(match[2]);
    if (axis === "x")
      style.columnGap = value;
    else if (axis === "y")
      style.rowGap = value;
    else style.gap = value;
    return true;
  }
  const arbMatch = cls.match(GAP_ARBITRARY_RE);
  if (arbMatch) {
    const axis = arbMatch[1];
    const value = arbMatch[2];
    if (axis === "x")
      style.columnGap = value;
    else if (axis === "y")
      style.rowGap = value;
    else style.gap = value;
    return true;
  }
  return false;
}
const DISPLAY_CLASSES = /* @__PURE__ */ new Set([
  "hidden",
  "block",
  "flex",
  "grid",
  "inline",
  "inline-flex",
  "inline-block",
  "inline-grid",
  "contents",
  "table",
  "flow-root",
  "list-item"
]);
const OVERLOADED_GROUPS = [
  ["text-", (v) => TEXT_SIZE_RE.test(v) ? "text-size" : "text-color"],
  ["border-", (v) => BORDER_WIDTH_RE.test(v) || BORDER_SIDE_RE.test(v) ? "border-width" : "border-color"],
  ["ring-", (v) => RING_WIDTH_RE.test(v) ? "ring-width" : "ring-color"],
  ["divide-", (v) => DIVIDE_SIDE_RE.test(v) || DIVIDE_NUMERIC_RE.test(v) || v === "reverse" ? "divide-width" : "divide-color"],
  ["outline-", (v) => OUTLINE_NUMERIC_RE.test(v) || OUTLINE_STYLE_RE.test(v) ? "outline-style" : "outline-color"]
];
function getUtilityGroup(cls) {
  if (DISPLAY_CLASSES.has(cls))
    return "display";
  if (cls.includes("["))
    return `${cls.slice(0, cls.indexOf("["))}-arbitrary`;
  for (const [prefix, resolver] of OVERLOADED_GROUPS) {
    if (cls === prefix.slice(0, -1) || cls.startsWith(prefix)) {
      return resolver(cls.slice(prefix.length));
    }
  }
  const dashIdx = cls.indexOf("-");
  return dashIdx === -1 ? cls : cls.slice(0, dashIdx);
}
function resolveDarkToken(baseClass, renderWidth) {
  const respMatch = baseClass.match(RESPONSIVE_PREFIX_RE);
  if (respMatch) {
    const bp = respMatch[1];
    const finalClass = respMatch[2];
    const breakpointWidth = BREAKPOINTS[bp];
    return breakpointWidth && renderWidth >= breakpointWidth ? finalClass : null;
  }
  return baseClass;
}
const styleDirectives = defineTransformer({
  filter: (node) => !!node.props?.class,
  transform: (node, ctx) => {
    const classes = node.props.class || "";
    const renderWidth = Number(ctx.options.width) || 1200;
    const isDarkMode = ctx.options.props?.colorMode === "dark";
    const tokens = classes.split(" ").filter((c) => c.trim());
    const darkOverrideGroups = /* @__PURE__ */ new Set();
    const responsiveOverrideGroups = /* @__PURE__ */ new Set();
    for (const token of tokens) {
      if (isDarkMode) {
        const darkMatch = token.match(DARK_MODE_PREFIX_RE);
        if (darkMatch) {
          const resolved = resolveDarkToken(darkMatch[1], renderWidth);
          if (resolved)
            darkOverrideGroups.add(getUtilityGroup(resolved));
          continue;
        }
      }
      const respMatch = token.match(RESPONSIVE_PREFIX_RE);
      if (respMatch) {
        const bp = respMatch[1];
        const baseClass = respMatch[2];
        const breakpointWidth = BREAKPOINTS[bp];
        if (breakpointWidth && renderWidth >= breakpointWidth)
          responsiveOverrideGroups.add(getUtilityGroup(baseClass));
      }
    }
    const processedClasses = [];
    const gapStyles = {};
    for (const token of tokens) {
      const darkMatch = token.match(DARK_MODE_PREFIX_RE);
      if (darkMatch) {
        if (isDarkMode) {
          const resolved = resolveDarkToken(darkMatch[1], renderWidth);
          if (resolved) {
            if (!resolveGapToStyle(resolved, gapStyles))
              processedClasses.push(resolved);
          }
        }
        continue;
      }
      const respMatch = token.match(RESPONSIVE_PREFIX_RE);
      if (respMatch) {
        const bp = respMatch[1];
        const baseClass = respMatch[2];
        const breakpointWidth = BREAKPOINTS[bp];
        if (breakpointWidth && renderWidth >= breakpointWidth) {
          if (isDarkMode && darkOverrideGroups.has(getUtilityGroup(baseClass)))
            continue;
          if (!resolveGapToStyle(baseClass, gapStyles))
            processedClasses.push(baseClass);
        }
      } else {
        const group = getUtilityGroup(token);
        if (isDarkMode && darkOverrideGroups.has(group) || responsiveOverrideGroups.has(group))
          continue;
        if (!resolveGapToStyle(token, gapStyles))
          processedClasses.push(token);
      }
    }
    if (Object.keys(gapStyles).length > 0) {
      node.props.style = { ...node.props.style, ...gapStyles };
    }
    node.props.class = processedClasses.join(" ");
  }
});

function splitCssDeclarations(style) {
  const declarations = [];
  let current = "";
  let parenDepth = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;
  for (let i = 0; i < style.length; i++) {
    const char = style[i];
    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    } else if (!inSingleQuote && !inDoubleQuote) {
      if (char === "(") {
        parenDepth++;
      } else if (char === ")") {
        parenDepth = Math.max(0, parenDepth - 1);
      } else if (char === ";" && parenDepth === 0) {
        if (current.trim())
          declarations.push(current);
        current = "";
        continue;
      }
    }
    current += char;
  }
  if (current.trim())
    declarations.push(current);
  return declarations;
}

const RE_KEBAB_SEGMENT = /-([a-z])/g;
const RE_CSS_QUOTES = /^['"](.+)['"]$/;
const RE_IMPORTANT = /\s*!important\s*$/;
const RE_HTML_ENTITY = /&(?:amp|quot|#39|#x27);/g;
const HTML_ENTITY_MAP = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'"
};
function camelCase(str) {
  return str.replace(RE_KEBAB_SEGMENT, (_, c) => c.toUpperCase());
}
function decodeHtmlEntities(value) {
  return value.replace(RE_HTML_ENTITY, (m) => HTML_ENTITY_MAP[m] ?? m);
}
function parseStyleAttr(style) {
  if (!style)
    return void 0;
  const result = {};
  for (const decl of splitCssDeclarations(decodeHtmlEntities(style))) {
    const colonIdx = decl.indexOf(":");
    if (colonIdx === -1)
      continue;
    const prop = decl.slice(0, colonIdx).trim();
    const val = decl.slice(colonIdx + 1).trim();
    if (prop && val) {
      const cleanVal = val.replace(RE_IMPORTANT, "");
      result[camelCase(prop)] = prop === "font-family" ? cleanVal.replace(RE_CSS_QUOTES, "$1") : cleanVal;
    }
  }
  return Object.keys(result).length ? result : void 0;
}

const EMOJI_CODEPOINT_TO_NAME = {
  // Faces - most popular
  "1f600": "grinning-face",
  "1f603": "grinning-face-with-big-eyes",
  "1f604": "grinning-face-with-smiling-eyes",
  "1f601": "beaming-face-with-smiling-eyes",
  "1f606": "grinning-squinting-face",
  "1f605": "grinning-face-with-sweat",
  "1f602": "face-with-tears-of-joy",
  "1f923": "rolling-on-the-floor-laughing",
  "1f60a": "smiling-face-with-smiling-eyes",
  "1f607": "smiling-face-with-halo",
  "1f970": "smiling-face-with-hearts",
  "1f60d": "smiling-face-with-heart-eyes",
  "1f929": "star-struck",
  "1f618": "face-blowing-a-kiss",
  "1f617": "kissing-face",
  "1f619": "kissing-face-with-smiling-eyes",
  "1f61a": "kissing-face-with-closed-eyes",
  "1f60b": "face-savoring-food",
  "1f61b": "face-with-tongue",
  "1f61c": "winking-face-with-tongue",
  "1f92a": "zany-face",
  "1f61d": "squinting-face-with-tongue",
  "1f911": "money-mouth-face",
  "1f917": "smiling-face-with-open-hands",
  "1f92d": "face-with-hand-over-mouth",
  "1f92b": "shushing-face",
  "1f914": "thinking-face",
  "1f910": "zipper-mouth-face",
  "1f928": "face-with-raised-eyebrow",
  "1f610": "neutral-face",
  "1f611": "expressionless-face",
  "1f636": "face-without-mouth",
  "1f60f": "smirking-face",
  "1f612": "unamused-face",
  "1f644": "face-with-rolling-eyes",
  "1f62c": "grimacing-face",
  "1f925": "lying-face",
  "1f60c": "relieved-face",
  "1f614": "pensive-face",
  "1f62a": "sleepy-face",
  "1f924": "drooling-face",
  "1f634": "sleeping-face",
  "1f637": "face-with-medical-mask",
  "1f912": "face-with-thermometer",
  "1f915": "face-with-head-bandage",
  "1f922": "nauseated-face",
  "1f92e": "face-vomiting",
  "1f927": "sneezing-face",
  "1f975": "hot-face",
  "1f976": "cold-face",
  "1f974": "woozy-face",
  "1f635": "knocked-out-face",
  "1f92f": "exploding-head",
  "1f920": "cowboy-hat-face",
  "1f973": "partying-face",
  "1f60e": "smiling-face-with-sunglasses",
  "1f913": "nerd-face",
  "1f9d0": "face-with-monocle",
  // Gestures
  "1f44b": "waving-hand",
  "1f44d": "thumbs-up",
  "1f44e": "thumbs-down",
  "1f44f": "clapping-hands",
  "1f64c": "raising-hands",
  "1f64f": "folded-hands",
  "1f4aa": "flexed-biceps",
  "270c": "victory-hand",
  "1f91e": "crossed-fingers",
  "1f918": "sign-of-the-horns",
  "1f919": "call-me-hand",
  "1f448": "backhand-index-pointing-left",
  "1f449": "backhand-index-pointing-right",
  "1f446": "backhand-index-pointing-up",
  "1f447": "backhand-index-pointing-down",
  "261d": "index-pointing-up",
  "270b": "raised-hand",
  "1f91a": "raised-back-of-hand",
  "1f590": "hand-with-fingers-splayed",
  "1f596": "vulcan-salute",
  "1f44c": "ok-hand",
  // Hearts & Symbols
  "2764": "red-heart",
  "1f9e1": "orange-heart",
  "1f49b": "yellow-heart",
  "1f49a": "green-heart",
  "1f499": "blue-heart",
  "1f49c": "purple-heart",
  "1f5a4": "black-heart",
  "1f90d": "white-heart",
  "1f90e": "brown-heart",
  "1f494": "broken-heart",
  "1f495": "two-hearts",
  "1f496": "sparkling-heart",
  "1f497": "growing-heart",
  "1f498": "heart-with-arrow",
  "1f49d": "heart-with-ribbon",
  "1f49e": "revolving-hearts",
  "1f49f": "heart-decoration",
  // Popular Objects & Symbols
  "1f680": "rocket",
  "26a1": "high-voltage",
  "1f525": "fire",
  "2728": "sparkles",
  "1f31f": "glowing-star",
  "2b50": "star",
  "1f4a5": "collision",
  "1f4a1": "light-bulb",
  "1f389": "party-popper",
  "1f38a": "confetti-ball",
  "1f381": "wrapped-gift",
  "1f3c6": "trophy",
  "1f3c5": "1st-place-medal",
  "1f947": "1st-place-medal",
  "1f4af": "hundred-points",
  "2705": "check-mark-button",
  "274c": "cross-mark",
  "2714": "check-mark",
  "2795": "plus",
  "2796": "minus",
  "2716": "multiply",
  "27a1": "right-arrow",
  "2b05": "left-arrow",
  "2b06": "up-arrow",
  "2b07": "down-arrow",
  // Tech & Work
  "1f4bb": "laptop",
  "1f4f1": "mobile-phone",
  "2699": "gear",
  "1f527": "wrench",
  "1f528": "hammer",
  "1f529": "nut-and-bolt",
  "1f6e0": "hammer-and-wrench",
  "1f4e6": "package",
  "1f4dd": "memo",
  "1f4c8": "chart-increasing",
  "1f4c9": "chart-decreasing",
  "1f4ca": "bar-chart",
  "1f4cb": "clipboard",
  "1f4cc": "pushpin",
  "1f4cd": "round-pushpin",
  "1f4ce": "paperclip",
  "1f4cf": "straight-ruler",
  "1f4d0": "triangular-ruler",
  "1f50d": "magnifying-glass-tilted-left",
  "1f50e": "magnifying-glass-tilted-right",
  "1f512": "locked",
  "1f513": "unlocked",
  // Nature & Weather
  "2600": "sun",
  "1f31e": "sun-with-face",
  "1f319": "crescent-moon",
  "1f308": "rainbow",
  "2601": "cloud",
  "26c5": "sun-behind-cloud",
  "1f327": "cloud-with-rain",
  "26c8": "cloud-with-lightning-and-rain",
  "1f329": "cloud-with-lightning",
  "2744": "snowflake",
  "1f4a7": "droplet",
  "1f30a": "water-wave",
  // Animals
  "1f436": "dog-face",
  "1f431": "cat-face",
  "1f42d": "mouse-face",
  "1f430": "rabbit-face",
  "1f43b": "bear",
  "1f43c": "panda",
  "1f428": "koala",
  "1f42f": "tiger-face",
  "1f981": "lion",
  "1f984": "unicorn",
  "1f98b": "butterfly",
  "1f41d": "honeybee",
  "1f577": "spider",
  "1f427": "penguin",
  "1f426": "bird",
  "1f985": "eagle",
  "1f419": "octopus",
  "1f422": "turtle",
  "1f40d": "snake",
  "1f409": "dragon",
  "1f432": "dragon-face",
  // Food
  "1f34e": "red-apple",
  "1f34a": "tangerine",
  "1f34b": "lemon",
  "1f34c": "banana",
  "1f34d": "pineapple",
  "1f347": "grapes",
  "1f353": "strawberry",
  "1f352": "cherries",
  "1f351": "peach",
  "1f349": "watermelon",
  "1f96d": "mango",
  "1f951": "avocado",
  "1f955": "carrot",
  "1f33d": "ear-of-corn",
  "1f336": "hot-pepper",
  "1f355": "pizza",
  "1f354": "hamburger",
  "1f35f": "french-fries",
  "1f32d": "hot-dog",
  "1f32e": "taco",
  "1f32f": "burrito",
  "1f37f": "popcorn",
  "1f36a": "cookie",
  "1f382": "birthday-cake",
  "1f370": "shortcake",
  "1f36b": "chocolate-bar",
  "1f36c": "candy",
  "1f36d": "lollipop",
  "1f369": "doughnut",
  "1f366": "soft-ice-cream",
  "1f36f": "honey-pot",
  "2615": "hot-beverage",
  "1f375": "teacup-without-handle",
  "1f37a": "beer-mug",
  "1f37b": "clinking-beer-mugs",
  "1f377": "wine-glass",
  "1f378": "cocktail-glass"
};

const RE_VARIATION_SELECTOR = /-fe0f$/i;
const RE_MATCH_EMOJIS = /(?:\p{Extended_Pictographic}|[\d#*]\uFE0F\u20E3|\p{Regional_Indicator}{2})(?:\p{Emoji_Modifier}|\uFE0F|\u200D[\p{Extended_Pictographic}\p{Emoji}])*/gu;
function getEmojiIconNames(codePoint, _emojiSet) {
  const baseCodePoint = codePoint.replace(RE_VARIATION_SELECTOR, "");
  const knownName = EMOJI_CODEPOINT_TO_NAME[codePoint] || EMOJI_CODEPOINT_TO_NAME[baseCodePoint];
  if (knownName) {
    return [knownName];
  }
  return [codePoint, baseCodePoint, `u${baseCodePoint}`].filter((v, i, a) => a.indexOf(v) === i);
}
function getEmojiCodePoint(emoji) {
  return Array.from(emoji, (char) => char.codePointAt(0).toString(16)).join("-");
}

async function getEmojiSvg(ctx, emojiChar) {
  const emojiSet = ctx.options.emojis;
  const codePoint = getEmojiCodePoint(emojiChar);
  const possibleNames = getEmojiIconNames(codePoint);
  let svg = null;
  for (const iconName of possibleNames) {
    const key = ["1", emojiSet, iconName].join("|");
    if (await emojiCache.hasItem(key)) {
      svg = await emojiCache.getItem(key);
      if (svg)
        break;
    }
  }
  if (!svg) {
    const timeout = getFetchTimeout(ctx.runtimeConfig);
    const deadline = AbortSignal.timeout(timeout);
    const endTiming = ctx.timings.start("emoji-fetch");
    try {
      for (const iconName of possibleNames) {
        if (deadline.aborted)
          break;
        try {
          svg = await $fetch$1(`https://api.iconify.design/${emojiSet}/${iconName}.svg`, {
            responseType: "text",
            retry: 0,
            signal: deadline,
            timeout
          });
          if (svg && svg !== "404") {
            const key = ["1", emojiSet, iconName].join("|");
            await emojiCache.setItem(key, svg);
            break;
          }
        } catch {
          svg = null;
        }
      }
    } finally {
      endTiming();
    }
  }
  if (svg) {
    return svg.replace("<svg ", '<svg data-emoji style="margin: 0 .05em 0 .15em; vertical-align: -0.1em;" ');
  }
  return null;
}

const RE_SVG_ID_ATTR = /\bid="([^"]+)"/g;
const RE_HTML_TEXT_CONTENT = />([^<]*)</g;
const RE_REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;
let emojiCounter = 0;
function wrapDefsElements(svg) {
  const defsElements = ["linearGradient", "radialGradient", "filter", "clipPath", "mask", "pattern"];
  const defsRegex = new RegExp(`<(${defsElements.join("|")})[\\s\\S]*?<\\/\\1>`, "g");
  if (svg.includes("<defs>") || svg.includes("<defs ")) {
    return svg;
  }
  const foundDefs = [];
  let result = svg.replace(defsRegex, (match) => {
    foundDefs.push(match);
    return "";
  });
  if (foundDefs.length > 0) {
    const svgTagEnd = result.indexOf(">") + 1;
    result = `${result.slice(0, svgTagEnd)}<defs>${foundDefs.join("")}</defs>${result.slice(svgTagEnd)}`;
  }
  return result;
}
function makeIdsUnique(svg) {
  const prefix = `e${emojiCounter++}_`;
  const ids = /* @__PURE__ */ new Set();
  svg.replace(RE_SVG_ID_ATTR, (_, id) => {
    ids.add(id);
    return "";
  });
  let result = svg;
  for (const id of ids) {
    result = result.replace(new RegExp(`id="${id}"`, "g"), `id="${prefix}${id}"`).replace(new RegExp(`url\\(#${id}\\)`, "g"), `url(#${prefix}${id})`).replace(new RegExp(`href="#${id}"`, "g"), `href="#${prefix}${id}"`);
  }
  return result;
}
async function applyEmojis(ctx, island) {
  if (!island.html || !ctx.options.emojis)
    return;
  const matches = [...island.html.matchAll(RE_MATCH_EMOJIS)];
  if (!matches.length)
    return;
  const emojiToSvg = /* @__PURE__ */ new Map();
  const uniqueEmojis = [...new Set(matches.map((m) => m[0]))];
  await Promise.all(uniqueEmojis.map(async (emoji) => {
    let svg = await getEmojiSvg(ctx, emoji);
    if (svg) {
      svg = makeIdsUnique(svg);
      svg = wrapDefsElements(svg);
    }
    emojiToSvg.set(emoji, svg ?? null);
  }));
  let html = island.html;
  html = html.replace(RE_HTML_TEXT_CONTENT, (fullMatch, textContent) => {
    if (!textContent)
      return fullMatch;
    let newTextContent = textContent;
    for (const [emoji, svg] of emojiToSvg) {
      if (svg) {
        const escaped = emoji.replace(RE_REGEX_SPECIAL_CHARS, "\\$&");
        newTextContent = newTextContent.replace(new RegExp(escaped, "g"), svg);
      }
    }
    return `>${newTextContent}<`;
  });
  island.html = html;
}

const RE_BODY_CONTENT = /<body>([\s\S]*)<\/body>/;
const SVG_CAMEL_ATTRS = {
  viewbox: "viewBox",
  preserveaspectratio: "preserveAspectRatio",
  basefrequency: "baseFrequency",
  baseprofile: "baseProfile",
  clippathunits: "clipPathUnits",
  diffuseconstant: "diffuseConstant",
  edgemode: "edgeMode",
  filterunits: "filterUnits",
  glyphref: "glyphRef",
  gradienttransform: "gradientTransform",
  gradientunits: "gradientUnits",
  kernelmatrix: "kernelMatrix",
  kernelunitlength: "kernelUnitLength",
  keypoints: "keyPoints",
  keysplines: "keySplines",
  keytimes: "keyTimes",
  lengthadjust: "lengthAdjust",
  limitingconeangle: "limitingConeAngle",
  markerheight: "markerHeight",
  markerunits: "markerUnits",
  markerwidth: "markerWidth",
  maskcontentunits: "maskContentUnits",
  maskunits: "maskUnits",
  numoctaves: "numOctaves",
  pathlength: "pathLength",
  patterncontentunits: "patternContentUnits",
  patterntransform: "patternTransform",
  patternunits: "patternUnits",
  pointsatx: "pointsAtX",
  pointsaty: "pointsAtY",
  pointsatz: "pointsAtZ",
  repeatcount: "repeatCount",
  repeatdur: "repeatDur",
  requiredextensions: "requiredExtensions",
  specularconstant: "specularConstant",
  specularexponent: "specularExponent",
  spreadmethod: "spreadMethod",
  startoffset: "startOffset",
  stddeviation: "stdDeviation",
  stitchtiles: "stitchTiles",
  surfacescale: "surfaceScale",
  systemlanguage: "systemLanguage",
  tablevalues: "tableValues",
  targetx: "targetX",
  targety: "targetY",
  textlength: "textLength",
  xchannelselector: "xChannelSelector",
  ychannelselector: "yChannelSelector",
  zoomandpan: "zoomAndPan"
};
const SVG_CAMEL_ATTR_VALUES = new Set(Object.values(SVG_CAMEL_ATTRS));
const RE_PERCENT = /^\d+%$/;
const RE_VIEWBOX_SEP = /[\s,]+/;
function resolveSvgDimension(props, style, key) {
  const attr = props[key];
  if (attr != null && !RE_PERCENT.test(String(attr))) {
    const n = Number(attr);
    if (!Number.isNaN(n))
      return n;
  }
  const sv = style?.[key];
  if (sv != null) {
    const n = typeof sv === "number" ? sv : Number.parseInt(String(sv));
    if (!Number.isNaN(n))
      return n;
  }
  const vb = props.viewBox || props.viewbox;
  if (typeof vb === "string") {
    const parts = vb.split(RE_VIEWBOX_SEP);
    if (parts.length === 4) {
      const n = Number(parts[key === "width" ? 2 : 3]);
      if (!Number.isNaN(n))
        return n;
    }
  }
}
function elementToVNode(el) {
  const props = {};
  const { style, ...attrs } = el.attributes;
  const parsedStyle = parseStyleAttr(style);
  if (parsedStyle)
    props.style = parsedStyle;
  for (const [name, value] of Object.entries(attrs)) {
    const key = SVG_CAMEL_ATTRS[name] || name;
    props[key] = typeof value === "string" ? decodeHtml(value) : value;
  }
  const children = [];
  for (const child of el.children) {
    if (child.type === ELEMENT_NODE) {
      children.push(elementToVNode(child));
    } else if (child.type === TEXT_NODE) {
      const text = child.value;
      if (text.trim())
        children.push(text);
    }
  }
  if (children.length)
    props.children = children;
  return { type: el.name, props };
}
function htmlToVNode(html) {
  const doc = parse(html);
  const root = querySelector(doc, "div");
  if (!root)
    throw new Error("Failed to parse HTML - no root div found");
  return elementToVNode(root);
}
const UNSUPPORTED_SVG_ELEMENTS = /* @__PURE__ */ new Set(["text", "tspan", "textPath", "foreignObject", "switch", "a"]);
function warnUnsupportedSvgElements(vnode, component) {
  const unsupported = /* @__PURE__ */ new Set();
  const collectUnsupported = (node) => {
    if (UNSUPPORTED_SVG_ELEMENTS.has(node.type))
      unsupported.add(`<${node.type}>`);
    if (Array.isArray(node.props?.children)) {
      for (const child of node.props.children) {
        if (child && typeof child === "object")
          collectUnsupported(child);
      }
    }
  };
  const walk = (node) => {
    if (node.type === "svg") {
      collectUnsupported(node);
    } else if (Array.isArray(node.props?.children)) {
      for (const child of node.props.children) {
        if (child && typeof child === "object")
          walk(child);
      }
    }
  };
  walk(vnode);
  if (unsupported.size) {
    const elements = [...unsupported].join(", ");
    const source = component ? ` in "${component}"` : "";
    logger$1.warn(`SVG ${elements} elements${source} are not supported by image renderers and will not be displayed. Convert text to <path> elements instead.`);
  }
}
async function createVNodes(ctx, options) {
  let html = ctx.options.html;
  if (html) {
    logger$1.warn("The `html` option is deprecated and will be removed in the next major version. Use a Vue component instead.");
  }
  if (!html) {
    const islandTimeout = ctx.runtimeConfig.security?.renderTimeout ?? 15e3;
    const island = await ctx.timings.measure("island-fetch", () => fetchIsland(ctx.e, ctx.options.component, typeof ctx.options.props !== "undefined" ? ctx.options.props : ctx.options, islandTimeout));
    await applyEmojis(ctx, island);
    html = island.html;
    if (html?.includes("<body>")) {
      html = html.match(RE_BODY_CONTENT)?.[1] || "";
    }
  }
  const baseStyle = `position: relative; display: flex; margin: 0 auto; width: ${ctx.options.width}px; height: ${ctx.options.height}px; overflow: hidden;`;
  const fullStyle = baseStyle;
  const template = `<div style="${fullStyle}">${html}</div>`;
  const vnodeTree = htmlToVNode(template);
  const rootChild = vnodeTree.props.children?.[0];
  if (rootChild && typeof rootChild === "object") {
    rootChild.props.style = { width: "100%", height: "100%", ...rootChild.props.style };
  }
  warnUnsupportedSvgElements(vnodeTree, ctx.options.component);
  await ctx.timings.measure("vnode-walk", () => Promise.all(walkTree(ctx, vnodeTree, [encoding, styleDirectives, imageSrc])));
  return vnodeTree;
}

const RE_RELATIVE_UNIT = /^([\d.]+)(em|rem)$/;
const RE_TW_TEXT_ARBITRARY = /(?:^|\s)text-\[(\d+(?:\.\d+)?)(px|rem|em)\]/;
const RE_FONT_SIZE_PX = /^(\d+(?:\.\d+)?)(px)?$/;
const DEFAULT_FONT_SIZE = 16;
const RE_UPPERCASE = /[A-Z]/g;
const RE_DQUOTE = /"/g;
const RE_AMP = /&/g;
const RE_LT = /</g;
const RE_GT = />/g;
async function createTakumiNodes(ctx) {
  const vnodeTree = await createVNodes(ctx);
  return await ctx.timings.measure("takumi-nodes", () => vnodeToTakumiNode(vnodeTree, DEFAULT_FONT_SIZE));
}
function pickNumericDimension(props, key) {
  const v = props[key];
  if (v == null)
    return void 0;
  const n = Number(v);
  return Number.isNaN(n) ? void 0 : n;
}
function resolveRelativeUnit(value, inheritedFontSize) {
  if (value == null)
    return void 0;
  const match = String(value).match(RE_RELATIVE_UNIT);
  if (!match)
    return void 0;
  const n = Number.parseFloat(match[1]);
  return match[2] === "rem" ? n * DEFAULT_FONT_SIZE : n * inheritedFontSize;
}
function extractFontSize(props, style) {
  if (style?.fontSize != null) {
    const m = String(style.fontSize).match(RE_FONT_SIZE_PX);
    if (m)
      return Number.parseFloat(m[1]);
  }
  const twStr = props.tw || props.class || "";
  const twMatch = twStr.match(RE_TW_TEXT_ARBITRARY);
  if (twMatch) {
    const val = Number.parseFloat(twMatch[1]);
    if (twMatch[2] === "px")
      return val;
  }
  return void 0;
}
async function vnodeToTakumiNode(vnode, inheritedFontSize) {
  const { style, children, class: cls, tw, src, ...rest } = vnode.props;
  const baseMetadata = {
    tw: tw || cls || void 0,
    style
  };
  if (vnode.type === "svg") {
    const hasExplicitFontSize = inheritedFontSize !== DEFAULT_FONT_SIZE;
    const isRelativeW = RE_RELATIVE_UNIT.test(String(rest.width ?? ""));
    const isRelativeH = RE_RELATIVE_UNIT.test(String(rest.height ?? ""));
    return {
      ...baseMetadata,
      type: "image",
      src: vnodeToHtmlString(vnode),
      // When em/rem + explicit parent font size → resolve to px.
      // When em/rem + default font size → leave undefined (takumi handles natively).
      // Otherwise → use standard resolution chain (numeric attrs → style → viewBox).
      width: isRelativeW ? hasExplicitFontSize ? resolveRelativeUnit(rest.width, inheritedFontSize) : void 0 : resolveSvgDimension(rest, style, "width"),
      height: isRelativeH ? hasExplicitFontSize ? resolveRelativeUnit(rest.height, inheritedFontSize) : void 0 : resolveSvgDimension(rest, style, "height")
    };
  }
  if (vnode.type === "img") {
    return {
      ...baseMetadata,
      type: "image",
      src: src || rest.href || "",
      width: pickNumericDimension(rest, "width"),
      height: pickNumericDimension(rest, "height")
    };
  }
  const nodeFontSize = extractFontSize(vnode.props, style);
  const childFontSize = nodeFontSize ?? inheritedFontSize;
  const containerStyle = { ...style };
  const w = pickNumericDimension(rest, "width");
  const h = pickNumericDimension(rest, "height");
  if (w != null && !containerStyle.width)
    containerStyle.width = w;
  if (h != null && !containerStyle.height)
    containerStyle.height = h;
  const hasStyle = Object.keys(containerStyle).length > 0;
  const containerMetadata = {
    tw: baseMetadata.tw,
    style: hasStyle ? containerStyle : void 0
  };
  const textContent = typeof children === "string" ? children : Array.isArray(children) && children.length >= 1 && children.every((c) => typeof c === "string") ? children.join("") : void 0;
  if (textContent !== void 0) {
    return {
      ...containerMetadata,
      type: "text",
      text: textContent
    };
  }
  if (Array.isArray(children)) {
    const takumiChildren = [];
    for (const child of children) {
      if (child && typeof child === "object")
        takumiChildren.push(await vnodeToTakumiNode(child, childFontSize));
      else if (typeof child === "string" && child.trim())
        takumiChildren.push({ type: "text", text: child.trim() });
    }
    return {
      ...containerMetadata,
      type: "container",
      children: takumiChildren.length ? takumiChildren : void 0
    };
  }
  return {
    ...containerMetadata,
    type: "container"
  };
}
function vnodeToHtmlString(vnode) {
  const { style, children, ...attrs } = vnode.props;
  const attrParts = [];
  const kebabCase = (str) => str.replace(RE_UPPERCASE, (m) => `-${m.toLowerCase()}`);
  if (vnode.type === "svg") {
    if (!attrs.xmlns)
      attrParts.push('xmlns="http://www.w3.org/2000/svg"');
    if (!attrs.width && vnode.props.width)
      attrParts.push(`width="${vnode.props.width}"`);
    if (!attrs.height && vnode.props.height)
      attrParts.push(`height="${vnode.props.height}"`);
  }
  const resolveValue = (val) => {
    if (typeof val === "string") {
      if (val.includes("calc("))
        return val;
      if (val.endsWith("em") || val.endsWith("rem")) {
        const num = Number.parseFloat(val);
        return !Number.isNaN(num) ? `${num * 16}px` : val;
      }
    }
    return val;
  };
  if (style && typeof style === "object") {
    const styleStr = Object.entries(style).filter(([_, v]) => v !== void 0 && v !== null && v !== "").map(([k, v]) => `${kebabCase(k)}:${resolveValue(v)}`).join(";");
    if (styleStr)
      attrParts.push(`style="${styleStr.replace(RE_DQUOTE, "&quot;")}"`);
  } else if (typeof style === "string") {
    attrParts.push(`style="${style.replace(RE_DQUOTE, "&quot;")}"`);
  }
  for (const [key, val] of Object.entries(attrs)) {
    if (key === "tw" || key === "class" || val == null)
      continue;
    const finalKey = SVG_CAMEL_ATTR_VALUES.has(key) ? key : kebabCase(key);
    attrParts.push(`${finalKey}="${String(resolveValue(val)).replace(RE_DQUOTE, "&quot;")}"`);
  }
  const open = attrParts.length ? `<${vnode.type} ${attrParts.join(" ")}>` : `<${vnode.type}>`;
  const inner = Array.isArray(children) ? children.map((c) => {
    if (typeof c === "string")
      return c.replace(RE_AMP, "&amp;").replace(RE_LT, "&lt;").replace(RE_GT, "&gt;");
    if (c && typeof c === "object")
      return vnodeToHtmlString(c);
    return "";
  }).join("") : typeof children === "string" ? children.replace(RE_AMP, "&amp;").replace(RE_LT, "&lt;").replace(RE_GT, "&gt;") : "";
  return `${open}${inner}</${vnode.type}>`;
}

const RE_QUOTES = /['"]/g;
async function getTakumiState(event) {
  const nitro = event._nitro;
  if (nitro._takumiState)
    return nitro._takumiState;
  const Renderer = await getTakumi();
  nitro._takumiState = {
    renderer: new Renderer(),
    loadedFontKeys: /* @__PURE__ */ new Set(),
    loadedFamilies: /* @__PURE__ */ new Set(),
    lock: Promise.resolve()
  };
  return nitro._takumiState;
}
function withTakumiLock(state, timeoutMs, fn, onLockTimeout) {
  const guarded = async () => {
    let timer;
    try {
      return await Promise.race([
        fn(),
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(new Error(`takumi render timed out after ${timeoutMs}ms (lock-held)`)),
            timeoutMs
          );
        })
      ]);
    } catch (err) {
      try {
        const Renderer = await getTakumi();
        state.renderer = new Renderer();
        state.loadedFontKeys.clear();
        state.loadedFamilies.clear();
      } catch (resetErr) {
        logger$2.warn(`failed to reset takumi renderer after lock timeout: ${resetErr?.message || resetErr}`);
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  };
  const work = state.lock.then(guarded, guarded);
  state.lock = work.catch((err) => {
  });
  let acquireTimer;
  return Promise.race([
    work,
    new Promise((_, reject) => {
      acquireTimer = setTimeout(() => {
        onLockTimeout?.();
        reject(new Error(`takumi lock acquire timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    })
  ]).finally(() => clearTimeout(acquireTimer));
}
function dedupeFontsByBinary(fonts) {
  const byBinary = /* @__PURE__ */ new Map();
  for (const font of fonts) {
    if (!font.data)
      continue;
    const binaryKey = `${font.family}|${font.style || "normal"}|${font.src || ""}`;
    const existing = byBinary.get(binaryKey);
    if (existing) {
      existing.weights.add(font.weight);
      if (font.weightRange)
        existing.hasRange = true;
    } else {
      byBinary.set(binaryKey, {
        family: font.family,
        style: font.style,
        data: font.data,
        weights: /* @__PURE__ */ new Set([font.weight]),
        hasRange: !!font.weightRange
      });
    }
  }
  const result = [];
  for (const [binaryKey, entry] of byBinary) {
    const isVariable = entry.weights.size > 1 || entry.hasRange;
    result.push({
      binaryKey,
      family: entry.family,
      style: entry.style,
      data: entry.data,
      weight: isVariable ? void 0 : [...entry.weights][0]
    });
  }
  return result;
}
async function loadFontsIntoRenderer(state, fonts) {
  for (const entry of dedupeFontsByBinary(fonts)) {
    if (state.loadedFontKeys.has(entry.binaryKey))
      continue;
    const fontData = entry.data instanceof ArrayBuffer ? new Uint8Array(entry.data) : Uint8Array.from(entry.data);
    try {
      await state.renderer.loadFont({
        name: entry.family,
        data: fontData,
        ...entry.weight !== void 0 ? { weight: entry.weight } : {},
        style: entry.style
      });
      state.loadedFamilies.add(entry.family);
    } catch (err) {
      logger$2.warn(`Failed to load font "${entry.family}" into takumi renderer: ${err.message}`);
    }
    state.loadedFontKeys.add(entry.binaryKey);
  }
}
function lookupFontFamily(family, loadedFamilies) {
  if (loadedFamilies.has(family))
    return family;
  for (const loaded of loadedFamilies) {
    if (loaded.toLowerCase() === family.toLowerCase())
      return loaded;
  }
}
function rewriteFontFamilies(node, loadedFamilies, subsetChains) {
  if (node.style?.fontFamily) {
    const families = node.style.fontFamily.split(",").map((f) => f.trim().replace(RE_QUOTES, ""));
    const resolved = [];
    const seen = /* @__PURE__ */ new Set();
    const addUnique = (name) => {
      if (!seen.has(name.toLowerCase())) {
        resolved.push(name);
        seen.add(name.toLowerCase());
      }
    };
    for (const f of families) {
      const chain = resolveSubsetChain(f, subsetChains);
      if (chain) {
        chain.forEach(addUnique);
        continue;
      }
      addUnique(lookupFontFamily(f, loadedFamilies) || f);
    }
    for (const family of loadedFamilies)
      addUnique(family);
    node.style.fontFamily = resolved.map((f) => `"${f}"`).join(", ");
  }
  if ("children" in node && node.children) {
    for (const child of node.children)
      rewriteFontFamilies(child, loadedFamilies, subsetChains);
  }
}
async function createImage(event, format) {
  const { options, timings } = event;
  const { fontFamilyOverride, defaultFont } = getDefaultFontFamily(options);
  const nodes = await createTakumiNodes(event);
  const codepoints = extractCodepoints(nodes);
  const fonts = await timings.measure("font-load", () => loadFontsForRenderer(event, { supportedFormats: /* @__PURE__ */ new Set(["ttf", "woff2"]), preferStatic: true, component: options.component, fontFamilyOverride: fontFamilyOverride || defaultFont, codepoints }));
  const hookTimeout = event.runtimeConfig.security?.renderTimeout ?? 15e3;
  await withTimeout(
    event._nitro.hooks.callHook("nuxt-og-image:takumi:nodes", nodes, event),
    hookTimeout,
    "nuxt-og-image:takumi:nodes hook"
  );
  const subsetChains = buildSubsetFamilyChain(fonts);
  const state = await timings.measure("takumi-init", () => getTakumiState(event));
  const extractResourceUrls = await timings.measure("takumi-extract-init", () => getExtractResourceUrls());
  const resourceUrls = await extractResourceUrls(nodes);
  const baseURL = event.runtimeConfig.app.baseURL;
  const fetchedResources = [];
  if (resourceUrls.length) {
    const fetchTimeout = getFetchTimeout(event.runtimeConfig);
    const headers = { "x-nuxt-og-image": "1" };
    await timings.measure("resource-fetch", () => Promise.all(resourceUrls.map(async (src) => {
      let data;
      if (src.startsWith("/")) {
        const path = withBase(src, baseURL);
        data = await fetchLocalAsset(event.e, path, {
          fetchTimeout,
          headers,
          includeExternalFallback: true
        });
      } else {
        data = await $fetch(src, {
          responseType: "arrayBuffer",
          signal: AbortSignal.timeout(fetchTimeout),
          timeout: fetchTimeout,
          headers
        }).catch((err) => {
          return void 0;
        });
      }
      if (data)
        fetchedResources.push({ src, data: new Uint8Array(data) });
    })));
  }
  const maxDpr = event.runtimeConfig.security?.maxDpr || 2;
  const maxDim = event.runtimeConfig.security?.maxDimension || 2048;
  const dpr = Math.min(Math.max(1, options.takumi?.devicePixelRatio ?? 1), maxDpr);
  const renderOptions = defu$1(options.takumi, {
    width: Math.min(Number(options.width) * dpr, maxDim),
    height: Math.min(Number(options.height) * dpr, maxDim),
    format,
    fetchedResources,
    devicePixelRatio: dpr
  });
  const lockTimeout = event.runtimeConfig.security?.renderTimeout ?? 15e3;
  const endLockWait = timings.start("lock-wait");
  return await withTakumiLock(state, lockTimeout, () => {
    endLockWait();
    return timings.measure("render-takumi", async () => {
      await loadFontsIntoRenderer(state, fonts);
      const rootStyle = nodes.style ?? {};
      if (fontFamilyOverride) {
        const chain = subsetChains.get(fontFamilyOverride);
        if (chain) {
          rootStyle.fontFamily = chain.map((f) => `"${f}"`).join(", ");
        } else if (state.loadedFamilies.has(fontFamilyOverride)) {
          rootStyle.fontFamily = fontFamilyOverride;
        }
      }
      nodes.style = rootStyle;
      rewriteFontFamilies(nodes, state.loadedFamilies, subsetChains);
      return state.renderer.render(nodes, renderOptions);
    });
  }, endLockWait);
}
const TakumiRenderer = {
  name: "takumi",
  supportedFormats: ["png", "jpeg", "jpg", "webp", "json"],
  async createImage(e) {
    switch (e.extension) {
      case "png":
        return createImage(e, "png");
      case "jpeg":
      case "jpg":
        return createImage(e, "jpeg");
      case "webp":
        return createImage(e, "webp");
    }
  },
  async debug(e) {
    const [vnodes, fonts] = await Promise.all([
      createTakumiNodes(e),
      loadFontsForRenderer(e, { supportedFormats: /* @__PURE__ */ new Set(["ttf", "woff2"]), preferStatic: true, component: e.options.component })
    ]);
    return {
      vnodes,
      fonts: fonts.map(({ data, ...f }) => ({
        ...f,
        size: data.byteLength
      }))
    };
  }
};

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: TakumiRenderer
}, Symbol.toStringTag, { value: 'Module' }));

const sources$1 = [
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/about"
            },
            {
                "loc": "/catalog"
            },
            {
                "loc": "/contact"
            },
            {
                "loc": "/faq"
            },
            {
                "loc": "/philosophy"
            },
            {
                "loc": "/privacy"
            },
            {
                "loc": "/terms"
            },
            {
                "loc": "/"
            }
        ],
        "sourceType": "app"
    }
];

const globalSources = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  sources: sources$1
}, Symbol.toStringTag, { value: 'Module' }));

const sources = {};

const childSources = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  sources: sources
}, Symbol.toStringTag, { value: 'Module' }));

const server = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: viteNodeEntry_mjs
}, Symbol.toStringTag, { value: 'Module' }));

const client_manifest = () => viteNodeFetch.getManifest();

const client_manifest$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client_manifest
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: encodeForwardSlashes(stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"])) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? encodeForwardSlashes(stringify(opts.data, opts.ssrContext["~payloadReducers"])) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}

function encodeForwardSlashes(str) {
	return str.replaceAll("/", "\\u002F");
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const handler = defineRenderHandler((event) => {
	
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	return renderRoute(event, ssrError);
});
async function renderRoute(event, ssrError) {
	const nitroApp = useNitroApp();
	
	const ssrContext = createSSRContext(event);
	
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		if (typeof ssrError.data === "string") {
			try {
				ssrError.data = destr(ssrError.data);
			} catch {}
		}
		setSSRError(ssrContext, ssrError);
	}
	
	const routeOptions = getRouteRules(event);
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	
	!ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		
		
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	
	
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		
		
		
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		
		
		
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		
		ssrContext.head.push({ script: renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})   }, {
			...headEntryOptions,
			
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			
			
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
}
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handler
}, Symbol.toStringTag, { value: 'Module' }));

const compatibility = {"browser":false,"satori":false,"takumi":"node-dev","resvg":"node-dev","sharp":"node"};

const debug_json = defineEventHandler(async (e) => {
  setHeader(e, "Content-Type", "application/json");
  const runtimeConfig = useOgImageRuntimeConfig(e);
  return {
    siteConfigUrl: getSiteConfig(e).url,
    origin: getNitroOrigin(e),
    componentNames,
    runtimeConfig,
    compatibility,
    resolvedFonts,
    availableFonts,
    fontRequirements
  };
});

const debug_json$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: debug_json
}, Symbol.toStringTag, { value: 'Module' }));

const PAYLOAD_REGEX = /<script.+id="nuxt-og-image-options"[^>]*>(.+?)<\/script>/;
function extractOptionsFromHtml(html) {
  const match = String(html).match(PAYLOAD_REGEX);
  if (!match?.[1])
    return [];
  return parse$1(match[1]);
}
async function doFetchWithErrorHandling(fetch, path) {
  const res = await fetch(path, {
    redirect: "follow",
    headers: {
      accept: "text/html"
    }
  }).catch((err) => {
    return err;
  });
  let errorDescription;
  if (res.status >= 300 && res.status < 400) {
    if (res.headers.has("location")) {
      return await doFetchWithErrorHandling(fetch, res.headers.get("location") || "");
    }
    errorDescription = `${res.status} redirected to ${res.headers.get("location") || "unknown"}`;
  } else if (res.status >= 400) {
    errorDescription = `${res.status} error: ${res.statusText}`;
  }
  if (errorDescription) {
    return [null, createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to parse \`${path}\` for og-image extraction. ${errorDescription}`
    })];
  }
  return [res._data || await res.text(), null];
}
async function fetchPathHtmlAndExtractOptions(e, path, cacheKey) {
  await htmlPayloadCache.getItem(cacheKey);
  let [html, err] = await doFetchWithErrorHandling(e.fetch, path);
  if (err) {
    logger$1.warn(err);
  }
  if (!html) {
    const [fallbackHtml, err2] = await doFetchWithErrorHandling(globalThis.$fetch.raw, path);
    if (err2) {
      return err2;
    }
    html = fallbackHtml;
  }
  if (!html) {
    return createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Failed to read the path ${path} for og-image extraction, returning no HTML.`
    });
  }
  const [root, images] = extractSocialPreviewTags(html);
  const options = extractOptionsFromHtml(html);
  const payload = {
    options,
    socialPreview: { root, images }
  };
  return payload;
}

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$3({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const RE_SCRIPT_TAG = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
async function html(ctx) {
  const { options } = ctx;
  const fonts = resolvedFonts;
  if (!options.component) {
    throw createError({
      statusCode: 500,
      statusMessage: `[Nuxt OG Image] Rendering an invalid component. Received options: ${JSON.stringify(options)}.`
    });
  }
  const islandTimeout = ctx.runtimeConfig.security?.renderTimeout ?? 15e3;
  const island = await fetchIsland(ctx.e, ctx.options.component, typeof ctx.options.props !== "undefined" ? ctx.options.props : ctx.options, islandTimeout);
  const head = createHead();
  head.push(island.head);
  let defaultFontFamily = "sans-serif";
  const firstFont = fonts[0];
  if (firstFont)
    defaultFontFamily = firstFont.family.replaceAll("+", " ");
  await applyEmojis(ctx, island);
  let html2 = island.html;
  const scale = options.props?.scale || 1;
  const scaledWidth = Math.round(Number(options.width) * scale);
  const scaledHeight = Math.round(Number(options.height) * scale);
  const fontFaces = fonts.map((font) => {
    const ext = font.src.split(".").pop()?.toLowerCase();
    const format = ext === "woff2" ? "woff2" : ext === "woff" ? "woff" : "truetype";
    return `@font-face {
  font-family: '${font.family.replaceAll("+", " ")}';
  font-style: ${font.style};
  font-weight: ${font.weight};
  src: url('${font.src}') format('${format}');
}`;
  }).join("\n");
  const bgColor = options.props?.colorMode === "dark" ? "#1b1b1b" : "#fff";
  head.push({
    style: [
      {
        innerHTML: `/* reset */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
img, svg { display: block; max-width: 100%; }

/* viewport */
html, body {
  width: ${scaledWidth}px;
  height: ${scaledHeight}px;
  overflow: hidden;
  font-family: '${defaultFontFamily}', sans-serif;
  background-color: ${bgColor};
}

/* scale wrapper */
.og-scale-wrapper {
  transform: scale(${scale});
  transform-origin: top left;
  width: ${options.width}px;
  height: ${options.height}px;
}
.og-scale-wrapper > :first-child {
  width: 100%;
  height: 100%;
}

/* match satori flex defaults for divs */
div { display: flex; }
div:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl) {
  flex-direction: column;
}
div:not(:has(div, p, ul, ol, li, blockquote, pre, hr, table, dl)) {
  flex-wrap: wrap;
  gap: 12px;
}

svg[data-emoji] { display: inline-block; }

/* fonts */
${fontFaces}`
      }
    ],
    meta: [
      { charset: "utf-8" }
    ]
  });
  RE_SCRIPT_TAG.lastIndex = 0;
  html2 = html2.replaceAll(RE_SCRIPT_TAG, "");
  const headChunk = await renderSSRHead$1(head);
  return `<!DOCTYPE html>
<html ${headChunk.htmlAttrs}>
<head>${headChunk.headTags}</head>
<body ${headChunk.bodyAttrs}>${headChunk.bodyTagsOpen}<div class="og-scale-wrapper" data-v-inspector-ignore="true">${html2}</div>${headChunk.bodyTags}</body>
</html>`;
}

async function useOgImageBufferCache(ctx, options) {
  const intentionallyEnabled = false;
  let enabled = intentionallyEnabled;
  prefixStorage(useStorage(), withTrailingSlash(options.baseCacheKey || "/"));
  ctx.key;
  let cachedItem = false;
  {
    setHeader(ctx.e, "Cache-Control", "no-cache, no-store, must-revalidate");
    setHeader(ctx.e, "Pragma", "no-cache");
    setHeader(ctx.e, "Expires", "0");
  }
  return {
    enabled,
    cachedItem,
    async update(item) {
      setHeader(ctx.e, "X-OG-Cache", "DISABLED");
      return;
    }
  };
}

async function imageEventHandler(e) {
  const reqStart = performance.now();
  const ctx = await resolveContext(e).catch((err) => {
    logger$2.error(`resolveContext error for ${e.path}:`, err?.message || err);
    throw err;
  });
  if (ctx instanceof H3Error)
    return ctx;
  const timings = ctx.timings;
  timings.record("resolve-context", performance.now() - reqStart);
  try {
    return await renderOgImage(e, ctx);
  } finally {
    timings.record("total", performance.now() - reqStart);
    const header = timings.header();
    if (header)
      setHeader(e, "Server-Timing", header);
  }
}
async function renderOgImage(e, ctx) {
  const timings = ctx.timings;
  const { isDevToolsContextRequest, extension, renderer } = ctx;
  const { debug, baseCacheKey, security } = useOgImageRuntimeConfig(e);
  if (isDevToolsContextRequest) {
    setHeader(e, "Content-Type", "application/json");
    const [extract, rendererDebug] = await Promise.all([
      fetchPathHtmlAndExtractOptions(e, ctx.basePath, ctx.key),
      renderer.debug ? renderer.debug(ctx).catch((err) => {
        logger$2.debug(`renderer.debug failed for ${ctx.options.component}: ${err?.message || err}`);
        return {};
      }) : {}
    ]);
    return {
      extract,
      siteUrl: getSiteConfig(e).url,
      ...rendererDebug
    };
  }
  switch (extension) {
    case "html":
      setHeader(e, "Content-Type", `text/html`);
      return html(ctx);
    case "svg": {
      if (ctx.renderer.name !== "satori") {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/svg+xml`);
      const debugResult = await ctx.renderer.debug(ctx);
      return debugResult.svg;
    }
    case "png":
    case "jpeg":
    case "jpg":
    case "webp":
      if (!renderer.supportedFormats.includes(extension)) {
        return createError({
          statusCode: 400,
          statusMessage: `[Nuxt OG Image] Generating ${extension}'s with ${renderer.name} is not supported.`
        });
      }
      setHeader(e, "Content-Type", `image/${extension === "jpg" ? "jpeg" : extension}`);
      break;
    default:
      return createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Invalid request for og.${extension}.`
      });
  }
  const endCacheLookup = timings.start("cache-lookup");
  const cacheApi = await useOgImageBufferCache(ctx, {
    cacheMaxAgeSeconds: ctx.options.cacheMaxAgeSeconds,
    baseCacheKey,
    secret: security?.secret
  }).finally(endCacheLookup);
  if (typeof cacheApi === "undefined") {
    return;
  }
  if (cacheApi instanceof H3Error) {
    return cacheApi;
  }
  let image = cacheApi.cachedItem;
  if (image) {
    timings.record("cache-hit", 0);
  }
  if (!image) {
    const timeout = security?.renderTimeout ?? 15e3;
    let timer;
    const endRender = timings.start("render-total");
    image = await Promise.race([
      renderer.createImage(ctx),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`OG image render timed out after ${timeout}ms`)), timeout);
      })
    ]).catch((err) => {
      if (err?.message?.includes("timed out")) {
        logger$2.error(`renderer.createImage timeout for ${e.path}`);
        return createError({ statusCode: 408, statusMessage: `[Nuxt OG Image] Request timed out while waiting for OG image render.` });
      }
      logger$2.error(`renderer.createImage error for ${e.path}:`, err?.stack || err?.message || err);
      throw err;
    }).finally(() => {
      clearTimeout(timer);
      endRender();
    });
    if (image instanceof H3Error) {
      return image;
    }
    if (!image) {
      return createError({
        statusCode: 500,
        statusMessage: `Failed to generate og.${extension}.`
      });
    }
    await cacheApi.update(image);
  }
  return image;
}

const image = defineEventHandler(async (e) => {
  {
    return await imageEventHandler(e);
  }
});

const image$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: image
}, Symbol.toStringTag, { value: 'Module' }));

const RE_META_TAG = /<meta\b[^>]*>/gi;
const RE_META_KEY = /\b(?:property|name)\s*=\s*(?:"([^"]+)"|'([^']+)')/i;
const RE_META_CONTENT = /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i;
const MAX_RESOLVE_PATH_LENGTH = 2048;
const RE_STRIP_PREFIX = /^.*?\/_og\/r/;
const RE_IMAGE_EXT = /\.(?:png|jpe?g|webp|svg)$/i;
const RE_DOUBLE_LEADING_SLASH = /^\/{2,}/;
function extractMeta(html, key) {
  for (const tagMatch of html.matchAll(RE_META_TAG)) {
    const tag = tagMatch[0];
    const keyMatch = tag.match(RE_META_KEY);
    const keyValue = keyMatch?.[1] ?? keyMatch?.[2];
    if (keyValue?.toLowerCase() !== key)
      continue;
    const contentMatch = tag.match(RE_META_CONTENT);
    const content = contentMatch?.[1] ?? contentMatch?.[2];
    if (content)
      return content;
  }
  return void 0;
}
function resolveTargetPath(event) {
  const pathname = parseURL(event.path).pathname;
  const stripped = pathname.replace(RE_STRIP_PREFIX, "") || "/";
  return stripped.replace(RE_IMAGE_EXT, "") || "/";
}
const resolve = defineEventHandler(async (event) => {
  const runtimeConfig = useOgImageRuntimeConfig(event);
  const security = runtimeConfig.security;
  if (security?.maxQueryParamSize && true) {
    const queryString = parseURL(event.path).search || "";
    if (queryString.length > security.maxQueryParamSize) {
      throw createError({
        statusCode: 400,
        statusMessage: `[Nuxt OG Image] Query string exceeds maximum allowed length of ${security.maxQueryParamSize} characters.`
      });
    }
  }
  const targetPath = resolveTargetPath(event);
  if (targetPath.length > MAX_RESOLVE_PATH_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `[Nuxt OG Image] Target path exceeds ${MAX_RESOLVE_PATH_LENGTH} characters.`
    });
  }
  if (targetPath.includes("://") || RE_DOUBLE_LEADING_SLASH.test(targetPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Target path must be a same-origin path."
    });
  }
  if (isInternalRoute$1(targetPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "[Nuxt OG Image] Cannot resolve og:image for internal route."
    });
  }
  const query = getQuery$1(event);
  const ogKey = typeof query._og_key === "string" ? query._og_key.toLowerCase() : "";
  const metaKey = ogKey === "twitter" ? "twitter:image" : "og:image";
  const forwardQuery = {};
  for (const [k, v] of Object.entries(query)) {
    if (!k.startsWith("_og_"))
      forwardQuery[k] = v;
  }
  const fetchPath = withQuery(withLeadingSlash(targetPath), forwardQuery);
  const html = await event.$fetch(fetchPath, {
    headers: { accept: "text/html" },
    responseType: "text"
  }).catch((err) => {
    throw createError({
      statusCode: 502,
      statusMessage: `[Nuxt OG Image] Failed to fetch ${fetchPath}: ${err?.message || "unknown error"}`
    });
  });
  const resolved = extractMeta(String(html), metaKey);
  if (!resolved) {
    throw createError({
      statusCode: 404,
      statusMessage: `[Nuxt OG Image] No <meta property="${metaKey}"> found on ${fetchPath}.`
    });
  }
  return sendRedirect(event, resolved, 302);
});

const resolve$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: resolve
}, Symbol.toStringTag, { value: 'Module' }));

const workerCode = `
const { createRequire } = require('node:module')
const _require = createRequire(process.cwd() + '/')
const { parentPort } = require('node:worker_threads')
const { Renderer, extractResourceUrls } = _require('@takumi-rs/core')

let renderer = new Renderer()

parentPort.on('message', async ({ id, type, newFonts, nodes, options }) => {
  try {
    if (type === 'extractResourceUrls') {
      const urls = extractResourceUrls(nodes)
      parentPort.postMessage({ id, urls })
      return
    }
    const fontWarnings = []
    for (const font of (newFonts || [])) {
      try {
        await renderer.loadFont({
          name: font.name,
          data: font.data,
          weight: font.weight,
          style: font.style,
        })
      } catch (e) {
        fontWarnings.push({ name: font.name, weight: font.weight, error: e?.message || String(e) })
      }
    }
    const image = await renderer.render(nodes, options)
    // Always slice to create a standard ArrayBuffer \u2014 native addon buffers
    // use external memory that can't be transferred via postMessage
    const ab = image.buffer.slice(image.byteOffset, image.byteOffset + image.byteLength)
    parentPort.postMessage({ id, image: ab, fontWarnings }, [ab])
  } catch (err) {
    parentPort.postMessage({ id, error: err?.message || String(err) })
  }
})
`;
let worker = null;
let workerGeneration = 0;
let requestId = 0;
const pending = /* @__PURE__ */ new Map();
function killWorker() {
  if (!worker)
    return;
  worker.terminate();
  worker = null;
  for (const [id, p] of pending) {
    clearTimeout(p.timer);
    pending.delete(id);
    p.reject(new Error("Takumi worker terminated"));
  }
}
const signalKey = Symbol.for("og-image:takumi-worker-cleanup");
if (!globalThis[signalKey]) {
  globalThis[signalKey] = true;
  process.on("exit", killWorker);
}
function createWorker() {
  workerGeneration++;
  const w = new Worker(workerCode, { eval: true });
  w.on("message", ({ id, image, urls, error, fontWarnings }) => {
    const p = pending.get(id);
    if (p) {
      clearTimeout(p.timer);
      pending.delete(id);
      if (error)
        p.reject(new Error(error));
      else if (urls !== void 0)
        p.resolve(urls);
      else
        p.resolve({ image: Buffer.from(image), fontWarnings });
    }
  });
  w.on("error", (err) => {
    for (const [id, p] of pending) {
      clearTimeout(p.timer);
      pending.delete(id);
      p.reject(err);
    }
    worker = null;
  });
  w.on("exit", (code) => {
    if (code !== 0) {
      for (const [id, p] of pending) {
        clearTimeout(p.timer);
        pending.delete(id);
        p.reject(new Error(`Takumi worker exited with code ${code}`));
      }
    }
    worker = null;
  });
  w.unref();
  return w;
}
function ensureWorker() {
  if (!worker)
    worker = createWorker();
}
function postToWorker(msg, timeoutMs = 3e4) {
  return new Promise((resolve, reject) => {
    ensureWorker();
    const id = ++requestId;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error("takumi worker timed out \u2014 killing worker"));
      killWorker();
    }, timeoutMs);
    pending.set(id, { resolve, reject, timer });
    worker.postMessage({ id, ...msg });
  });
}
function extractResourceUrls(nodes) {
  return postToWorker({ type: "extractResourceUrls", nodes });
}
class RendererWorkerProxy {
  allFonts = [];
  allFontKeys = /* @__PURE__ */ new Set();
  pendingFonts = [];
  syncedGeneration = -1;
  loadFont(font) {
    const key = `${font.name}|${font.weight || 400}|${font.style || "normal"}`;
    if (this.allFontKeys.has(key))
      return;
    this.allFontKeys.add(key);
    this.allFonts.push(font);
    this.pendingFonts.push(font);
  }
  render(nodes, options) {
    ensureWorker();
    let fontsToSend;
    if (this.syncedGeneration !== workerGeneration) {
      fontsToSend = [...this.allFonts];
      this.pendingFonts = [];
    } else {
      fontsToSend = this.pendingFonts.splice(0);
    }
    this.syncedGeneration = workerGeneration;
    return postToWorker({ type: "render", newFonts: fontsToSend, nodes, options }).then((result) => {
      if (result.fontWarnings?.length) {
        for (const w of result.fontWarnings)
          console.warn(`[nuxt-og-image] Failed to load font "${w.name}" (weight: ${w.weight}) into takumi renderer: ${w.error}`);
      }
      return result.image;
    });
  }
}
const nodeDev = {
  initWasmPromise: Promise.resolve(),
  Renderer: RendererWorkerProxy,
  extractResourceUrls
};

const nodeDev$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: nodeDev
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
