!(function(t) {
  var e = {};
  function n(i) {
    if (e[i]) return e[i].exports;
    var r = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function(t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (n.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function(t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if ((n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
        for (var r in t)
          n.d(
            i,
            r,
            function(e) {
              return t[e];
            }.bind(null, r),
          );
      return i;
    }),
    (n.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function(t, e, n) {
    const i = n(1);
    messaging = new (class {
      constructor() {
        (this._channels = []), this.presence;
      }
      init(t, e = "hareesh2") {
        "" == t && (t = "QLqNPA.Fol0BA:xjR18XdU_Ub4C1m_"), (this._service = new i.Realtime({ key: t, clientId: e }));
      }
      register(t, e, n) {
        if (this.getChannel(t, e, "register")) throw new Error(`[Room : ${t}] with [Type: ${e}] already exist`);
        var i = this._service.channels.get(`${t}`);
        if (!e) {
          i.subscribe(function(t) {
            t.data["channel_id"] = i.name;
            n(t);
          }),
            this._channels.push({ _room: i, _type: e, _cb: this.callback });
        } else {
          i.subscribe(e, function(t) {
            n(t);
          }),
            this._channels.push({ _room: i, _type: e, _cb: this.callback });
        }
      }
      send(t, e = "push", n, i) {
        this._service.channels.get(t).publish(e, n);
      }
      getMessages(t, e = "push") {
        this.getChannel(t, e)._room.history((t, e) => {
          var n = e.items;
        });
      }
      getChannel(t, e = "push", n = "getChannel") {
        var i = window.messaging._channels.filter((n) => {
          if (n._type == e && n._room.name == `${t}`) return n;
        });
        if ("getChannel" == n && i.length <= 0) throw new Error(`[Room : ${t}] with [Type: ${e}] not found`);
        return i.length > 0 ? i[0] : null;
      }
      unRegister(t, e) {
        for (var n = this.getChannel(t, e), i = n._room.name.split(":"), r = 0; r < window.messaging._channels.length; r++)
          if (i[1] == window.messaging._channels[r]._room.name.split(":")[1]) return n._room.unsubscribe(), window.messaging._channels.splice(r, 1);
      }
      presenceChannel(t, e) {
        var n = this._service.channels.get(`${t}`);
        n.presence.subscribe("enter", function(t) {
          e(t);
        }),
          n.presence.subscribe("present", function(t) {
            e(t);
          }),
          n.presence.subscribe("update", function(t) {
            e(t);
          }),
          n.presence.subscribe("leave", function(t) {
            e(t);
          }),
          n.presence.enter();
      }
      presenceMembers(t, e) {
        this._service.channels.get(`${t}`).presence.get(function(t, n) {
          e(n);
        });
      }
    })();
  },
  function(t, e, n) {
    (function(e) {
      /**
       * @license Copyright 2019, Ably
       *
       * Ably JavaScript Library v1.1.22
       * https://github.com/ably/ably-js
       *
       * Ably Realtime NinjaChat Messaging
       * https://www.ably.io
       *
       * Released under the Apache Licence v2.0
       */
      var n,
        i,
        r,
        o = {},
        s = ("object" == typeof window && window) || ("object" == typeof self && self),
        a =
          a ||
          (function(t, e) {
            var n = {},
              i = (n.lib = {}),
              r = (i.Base = (function() {
                function t() {}
                return {
                  extend: function(e) {
                    t.prototype = this;
                    var n = new t();
                    return (
                      e && n.mixIn(e),
                      n.hasOwnProperty("init") ||
                        (n.init = function() {
                          n.$super.init.apply(this, arguments);
                        }),
                      (n.init.prototype = n),
                      (n.$super = this),
                      n
                    );
                  },
                  create: function() {
                    var t = this.extend();
                    return t.init.apply(t, arguments), t;
                  },
                  init: function() {},
                  mixIn: function(t) {
                    for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                    t.hasOwnProperty("toString") && (this.toString = t.toString);
                  },
                  clone: function() {
                    return this.init.prototype.extend(this);
                  },
                };
              })()),
              o = (i.WordArray = r.extend({
                init: function(t, e) {
                  (t = this.words = t || []), (this.sigBytes = null != e ? e : 4 * t.length);
                },
                toString: function(t) {
                  return (t || a).stringify(this);
                },
                concat: function(t) {
                  var e = this.words,
                    n = t.words,
                    i = this.sigBytes,
                    r = t.sigBytes;
                  if ((this.clamp(), i % 4))
                    for (var o = 0; o < r; o++) {
                      var s = (n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                      e[(i + o) >>> 2] |= s << (24 - ((i + o) % 4) * 8);
                    }
                  else if (n.length > 65535) for (o = 0; o < r; o += 4) e[(i + o) >>> 2] = n[o >>> 2];
                  else e.push.apply(e, n);
                  return (this.sigBytes += r), this;
                },
                clamp: function() {
                  var e = this.words,
                    n = this.sigBytes;
                  (e[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)), (e.length = t.ceil(n / 4));
                },
                clone: function() {
                  var t = r.clone.call(this);
                  return (t.words = this.words.slice(0)), t;
                },
                random: function(e) {
                  for (
                    var n,
                      i = [],
                      r = function(e) {
                        e = e;
                        var n = 987654321,
                          i = 4294967295;
                        return function() {
                          var r = (((n = (36969 * (65535 & n) + (n >> 16)) & i) << 16) + (e = (18e3 * (65535 & e) + (e >> 16)) & i)) & i;
                          return (r /= 4294967296), (r += 0.5) * (t.random() > 0.5 ? 1 : -1);
                        };
                      },
                      s = 0;
                    s < e;
                    s += 4
                  ) {
                    var a = r(4294967296 * (n || t.random()));
                    (n = 987654071 * a()), i.push((4294967296 * a()) | 0);
                  }
                  return new o.init(i, e);
                },
              })),
              s = (n.enc = {}),
              a = (s.Hex = {
                stringify: function(t) {
                  for (var e = t.words, n = t.sigBytes, i = [], r = 0; r < n; r++) {
                    var o = (e[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                    i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16));
                  }
                  return i.join("");
                },
                parse: function(t) {
                  for (var e = t.length, n = [], i = 0; i < e; i += 2) n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << (24 - (i % 8) * 4);
                  return new o.init(n, e / 2);
                },
              }),
              c = (s.Latin1 = {
                stringify: function(t) {
                  for (var e = t.words, n = t.sigBytes, i = [], r = 0; r < n; r++) {
                    var o = (e[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                    i.push(String.fromCharCode(o));
                  }
                  return i.join("");
                },
                parse: function(t) {
                  for (var e = t.length, n = [], i = 0; i < e; i++) n[i >>> 2] |= (255 & t.charCodeAt(i)) << (24 - (i % 4) * 8);
                  return new o.init(n, e);
                },
              }),
              u = (s.Utf8 = {
                stringify: function(t) {
                  try {
                    return decodeURIComponent(escape(c.stringify(t)));
                  } catch (t) {
                    throw new Error("Malformed UTF-8 data");
                  }
                },
                parse: function(t) {
                  return c.parse(unescape(encodeURIComponent(t)));
                },
              }),
              h = (i.BufferedBlockAlgorithm = r.extend({
                reset: function() {
                  (this._data = new o.init()), (this._nDataBytes = 0);
                },
                _append: function(t) {
                  "string" == typeof t && (t = u.parse(t)), this._data.concat(t), (this._nDataBytes += t.sigBytes);
                },
                _process: function(e) {
                  var n = this._data,
                    i = n.words,
                    r = n.sigBytes,
                    s = this.blockSize,
                    a = r / (4 * s),
                    c = (a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) * s,
                    u = t.min(4 * c, r);
                  if (c) {
                    for (var h = 0; h < c; h += s) this._doProcessBlock(i, h);
                    var l = i.splice(0, c);
                    n.sigBytes -= u;
                  }
                  return new o.init(l, u);
                },
                clone: function() {
                  var t = r.clone.call(this);
                  return (t._data = this._data.clone()), t;
                },
                _minBufferSize: 0,
              })),
              l =
                ((i.Hasher = h.extend({
                  cfg: r.extend(),
                  init: function(t) {
                    (this.cfg = this.cfg.extend(t)), this.reset();
                  },
                  reset: function() {
                    h.reset.call(this), this._doReset();
                  },
                  update: function(t) {
                    return this._append(t), this._process(), this;
                  },
                  finalize: function(t) {
                    return t && this._append(t), this._doFinalize();
                  },
                  blockSize: 16,
                  _createHelper: function(t) {
                    return function(e, n) {
                      return new t.init(n).finalize(e);
                    };
                  },
                  _createHmacHelper: function(t) {
                    return function(e, n) {
                      return new l.HMAC.init(t, n).finalize(e);
                    };
                  },
                })),
                (n.algo = {}));
            return n;
          })(Math);
      !(function(t) {
        var e = a,
          n = e.lib,
          i = n.WordArray,
          r = n.Hasher,
          o = e.algo,
          s = [],
          c = [];
        !(function() {
          function e(e) {
            for (var n = t.sqrt(e), i = 2; i <= n; i++) if (!(e % i)) return !1;
            return !0;
          }
          function n(t) {
            return (4294967296 * (t - (0 | t))) | 0;
          }
          for (var i = 2, r = 0; r < 64; ) e(i) && (r < 8 && (s[r] = n(t.pow(i, 0.5))), (c[r] = n(t.pow(i, 1 / 3))), r++), i++;
        })();
        var u = [],
          h = (o.SHA256 = r.extend({
            _doReset: function() {
              this._hash = new i.init(s.slice(0));
            },
            _doProcessBlock: function(t, e) {
              for (var n = this._hash.words, i = n[0], r = n[1], o = n[2], s = n[3], a = n[4], h = n[5], l = n[6], f = n[7], p = 0; p < 64; p++) {
                if (p < 16) u[p] = 0 | t[e + p];
                else {
                  var d = u[p - 15],
                    g = ((d << 25) | (d >>> 7)) ^ ((d << 14) | (d >>> 18)) ^ (d >>> 3),
                    m = u[p - 2],
                    y = ((m << 15) | (m >>> 17)) ^ ((m << 13) | (m >>> 19)) ^ (m >>> 10);
                  u[p] = g + u[p - 7] + y + u[p - 16];
                }
                var v = (i & r) ^ (i & o) ^ (r & o),
                  O = ((i << 30) | (i >>> 2)) ^ ((i << 19) | (i >>> 13)) ^ ((i << 10) | (i >>> 22)),
                  R = f + (((a << 26) | (a >>> 6)) ^ ((a << 21) | (a >>> 11)) ^ ((a << 7) | (a >>> 25))) + ((a & h) ^ (~a & l)) + c[p] + u[p];
                (f = l), (l = h), (h = a), (a = (s + R) | 0), (s = o), (o = r), (r = i), (i = (R + (O + v)) | 0);
              }
              (n[0] = (n[0] + i) | 0),
                (n[1] = (n[1] + r) | 0),
                (n[2] = (n[2] + o) | 0),
                (n[3] = (n[3] + s) | 0),
                (n[4] = (n[4] + a) | 0),
                (n[5] = (n[5] + h) | 0),
                (n[6] = (n[6] + l) | 0),
                (n[7] = (n[7] + f) | 0);
            },
            _doFinalize: function() {
              var e = this._data,
                n = e.words,
                i = 8 * this._nDataBytes,
                r = 8 * e.sigBytes;
              return (
                (n[r >>> 5] |= 128 << (24 - (r % 32))),
                (n[14 + (((r + 64) >>> 9) << 4)] = t.floor(i / 4294967296)),
                (n[15 + (((r + 64) >>> 9) << 4)] = i),
                (e.sigBytes = 4 * n.length),
                this._process(),
                this._hash
              );
            },
            clone: function() {
              var t = r.clone.call(this);
              return (t._hash = this._hash.clone()), t;
            },
          }));
        (e.SHA256 = r._createHelper(h)), (e.HmacSHA256 = r._createHmacHelper(h));
      })(Math),
        (i = (n = a).lib.Base),
        (r = n.enc.Utf8),
        (n.algo.HMAC = i.extend({
          init: function(t, e) {
            (t = this._hasher = new t.init()), "string" == typeof e && (e = r.parse(e));
            var n = t.blockSize,
              i = 4 * n;
            e.sigBytes > i && (e = t.finalize(e)), e.clamp();
            for (var o = (this._oKey = e.clone()), s = (this._iKey = e.clone()), a = o.words, c = s.words, u = 0; u < n; u++) (a[u] ^= 1549556828), (c[u] ^= 909522486);
            (o.sigBytes = s.sigBytes = i), this.reset();
          },
          reset: function() {
            var t = this._hasher;
            t.reset(), t.update(this._iKey);
          },
          update: function(t) {
            return this._hasher.update(t), this;
          },
          finalize: function(t) {
            var e = this._hasher,
              n = e.finalize(t);
            return e.reset(), e.finalize(this._oKey.clone().concat(n));
          },
        })),
        (function() {
          var t = a,
            e = t.lib.WordArray;
          t.enc.Base64 = {
            stringify: function(t) {
              var e = t.words,
                n = t.sigBytes,
                i = this._map;
              t.clamp();
              for (var r = [], o = 0; o < n; o += 3)
                for (
                  var s =
                      (((e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) | (((e[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) & 255) << 8) | ((e[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) & 255),
                    a = 0;
                  a < 4 && o + 0.75 * a < n;
                  a++
                )
                  r.push(i.charAt((s >>> (6 * (3 - a))) & 63));
              var c = i.charAt(64);
              if (c) for (; r.length % 4; ) r.push(c);
              return r.join("");
            },
            parse: function(t) {
              var n = t.length,
                i = this._map,
                r = i.charAt(64);
              if (r) {
                var o = t.indexOf(r);
                -1 != o && (n = o);
              }
              for (var s = [], a = 0, c = 0; c < n; c++)
                if (c % 4) {
                  var u = i.indexOf(t.charAt(c - 1)) << ((c % 4) * 2),
                    h = i.indexOf(t.charAt(c)) >>> (6 - (c % 4) * 2);
                  (s[a >>> 2] |= (u | h) << (24 - (a % 4) * 8)), a++;
                }
              return e.create(s, a);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          };
        })(),
        a.lib.Cipher ||
          (function(t) {
            var e = a,
              n = e.lib,
              i = n.Base,
              r = n.WordArray,
              o = n.BufferedBlockAlgorithm,
              s = e.enc,
              c = (s.Utf8, s.Base64),
              u = e.algo.EvpKDF,
              h = (n.Cipher = o.extend({
                cfg: i.extend(),
                createEncryptor: function(t, e) {
                  return this.create(this._ENC_XFORM_MODE, t, e);
                },
                createDecryptor: function(t, e) {
                  return this.create(this._DEC_XFORM_MODE, t, e);
                },
                init: function(t, e, n) {
                  (this.cfg = this.cfg.extend(n)), (this._xformMode = t), (this._key = e), this.reset();
                },
                reset: function() {
                  o.reset.call(this), this._doReset();
                },
                process: function(t) {
                  return this._append(t), this._process();
                },
                finalize: function(t) {
                  return t && this._append(t), this._doFinalize();
                },
                keySize: 4,
                ivSize: 4,
                _ENC_XFORM_MODE: 1,
                _DEC_XFORM_MODE: 2,
                _createHelper: (function() {
                  function t(t) {
                    return "string" == typeof t ? O : y;
                  }
                  return function(e) {
                    return {
                      encrypt: function(n, i, r) {
                        return t(i).encrypt(e, n, i, r);
                      },
                      decrypt: function(n, i, r) {
                        return t(i).decrypt(e, n, i, r);
                      },
                    };
                  };
                })(),
              })),
              l =
                ((n.StreamCipher = h.extend({
                  _doFinalize: function() {
                    return this._process(!0);
                  },
                  blockSize: 1,
                })),
                (e.mode = {})),
              f = (n.BlockCipherMode = i.extend({
                createEncryptor: function(t, e) {
                  return this.Encryptor.create(t, e);
                },
                createDecryptor: function(t, e) {
                  return this.Decryptor.create(t, e);
                },
                init: function(t, e) {
                  (this._cipher = t), (this._iv = e);
                },
              })),
              p = (l.CBC = (function() {
                var e = f.extend();
                function n(e, n, i) {
                  var r = this._iv;
                  if (r) {
                    var o = r;
                    this._iv = t;
                  } else o = this._prevBlock;
                  for (var s = 0; s < i; s++) e[n + s] ^= o[s];
                }
                return (
                  (e.Encryptor = e.extend({
                    processBlock: function(t, e) {
                      var i = this._cipher,
                        r = i.blockSize;
                      n.call(this, t, e, r), i.encryptBlock(t, e), (this._prevBlock = t.slice(e, e + r));
                    },
                  })),
                  (e.Decryptor = e.extend({
                    processBlock: function(t, e) {
                      var i = this._cipher,
                        r = i.blockSize,
                        o = t.slice(e, e + r);
                      i.decryptBlock(t, e), n.call(this, t, e, r), (this._prevBlock = o);
                    },
                  })),
                  e
                );
              })()),
              d = ((e.pad = {}).Pkcs7 = {
                pad: function(t, e) {
                  for (var n = 4 * e, i = n - (t.sigBytes % n), o = (i << 24) | (i << 16) | (i << 8) | i, s = [], a = 0; a < i; a += 4) s.push(o);
                  var c = r.create(s, i);
                  t.concat(c);
                },
                unpad: function(t) {
                  var e = 255 & t.words[(t.sigBytes - 1) >>> 2];
                  t.sigBytes -= e;
                },
              }),
              g =
                ((n.BlockCipher = h.extend({
                  cfg: h.cfg.extend({ mode: p, padding: d }),
                  reset: function() {
                    h.reset.call(this);
                    var t = this.cfg,
                      e = t.iv,
                      n = t.mode;
                    if (this._xformMode == this._ENC_XFORM_MODE) var i = n.createEncryptor;
                    else {
                      i = n.createDecryptor;
                      this._minBufferSize = 1;
                    }
                    this._mode = i.call(n, this, e && e.words);
                  },
                  _doProcessBlock: function(t, e) {
                    this._mode.processBlock(t, e);
                  },
                  _doFinalize: function() {
                    var t = this.cfg.padding;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                      t.pad(this._data, this.blockSize);
                      var e = this._process(!0);
                    } else {
                      e = this._process(!0);
                      t.unpad(e);
                    }
                    return e;
                  },
                  blockSize: 4,
                })),
                (n.CipherParams = i.extend({
                  init: function(t) {
                    this.mixIn(t);
                  },
                  toString: function(t) {
                    return (t || this.formatter).stringify(this);
                  },
                }))),
              m = ((e.format = {}).OpenSSL = {
                stringify: function(t) {
                  var e = t.ciphertext,
                    n = t.salt;
                  if (n)
                    var i = r
                      .create([1398893684, 1701076831])
                      .concat(n)
                      .concat(e);
                  else i = e;
                  return i.toString(c);
                },
                parse: function(t) {
                  var e = c.parse(t),
                    n = e.words;
                  if (1398893684 == n[0] && 1701076831 == n[1]) {
                    var i = r.create(n.slice(2, 4));
                    n.splice(0, 4), (e.sigBytes -= 16);
                  }
                  return g.create({ ciphertext: e, salt: i });
                },
              }),
              y = (n.SerializableCipher = i.extend({
                cfg: i.extend({ format: m }),
                encrypt: function(t, e, n, i) {
                  i = this.cfg.extend(i);
                  var r = t.createEncryptor(n, i),
                    o = r.finalize(e),
                    s = r.cfg;
                  return g.create({ ciphertext: o, key: n, iv: s.iv, algorithm: t, mode: s.mode, padding: s.padding, blockSize: t.blockSize, formatter: i.format });
                },
                decrypt: function(t, e, n, i) {
                  return (i = this.cfg.extend(i)), (e = this._parse(e, i.format)), t.createDecryptor(n, i).finalize(e.ciphertext);
                },
                _parse: function(t, e) {
                  return "string" == typeof t ? e.parse(t, this) : t;
                },
              })),
              v = ((e.kdf = {}).OpenSSL = {
                execute: function(t, e, n, i) {
                  i || (i = r.random(8));
                  var o = u.create({ keySize: e + n }).compute(t, i),
                    s = r.create(o.words.slice(e), 4 * n);
                  return (o.sigBytes = 4 * e), g.create({ key: o, iv: s, salt: i });
                },
              }),
              O = (n.PasswordBasedCipher = y.extend({
                cfg: y.cfg.extend({ kdf: v }),
                encrypt: function(t, e, n, i) {
                  var r = (i = this.cfg.extend(i)).kdf.execute(n, t.keySize, t.ivSize);
                  i.iv = r.iv;
                  var o = y.encrypt.call(this, t, e, r.key, i);
                  return o.mixIn(r), o;
                },
                decrypt: function(t, e, n, i) {
                  (i = this.cfg.extend(i)), (e = this._parse(e, i.format));
                  var r = i.kdf.execute(n, t.keySize, t.ivSize, e.salt);
                  return (i.iv = r.iv), y.decrypt.call(this, t, e, r.key, i);
                },
              }));
          })(),
        (function() {
          var t = a,
            e = t.lib.BlockCipher,
            n = t.algo,
            i = [],
            r = [],
            o = [],
            s = [],
            c = [],
            u = [],
            h = [],
            l = [],
            f = [],
            p = [];
          !(function() {
            for (var t = [], e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : (e << 1) ^ 283;
            var n = 0,
              a = 0;
            for (e = 0; e < 256; e++) {
              var d = a ^ (a << 1) ^ (a << 2) ^ (a << 3) ^ (a << 4);
              (d = (d >>> 8) ^ (255 & d) ^ 99), (i[n] = d), (r[d] = n);
              var g = t[n],
                m = t[g],
                y = t[m],
                v = (257 * t[d]) ^ (16843008 * d);
              (o[n] = (v << 24) | (v >>> 8)), (s[n] = (v << 16) | (v >>> 16)), (c[n] = (v << 8) | (v >>> 24)), (u[n] = v);
              v = (16843009 * y) ^ (65537 * m) ^ (257 * g) ^ (16843008 * n);
              (h[d] = (v << 24) | (v >>> 8)), (l[d] = (v << 16) | (v >>> 16)), (f[d] = (v << 8) | (v >>> 24)), (p[d] = v), n ? ((n = g ^ t[t[t[y ^ g]]]), (a ^= t[t[a]])) : (n = a = 1);
            }
          })();
          var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
            g = (n.AES = e.extend({
              _doReset: function() {
                for (var t = this._key, e = t.words, n = t.sigBytes / 4, r = 4 * ((this._nRounds = n + 6) + 1), o = (this._keySchedule = []), s = 0; s < r; s++)
                  if (s < n) o[s] = e[s];
                  else {
                    var a = o[s - 1];
                    s % n
                      ? n > 6 && s % n == 4 && (a = (i[a >>> 24] << 24) | (i[(a >>> 16) & 255] << 16) | (i[(a >>> 8) & 255] << 8) | i[255 & a])
                      : ((a = (i[(a = (a << 8) | (a >>> 24)) >>> 24] << 24) | (i[(a >>> 16) & 255] << 16) | (i[(a >>> 8) & 255] << 8) | i[255 & a]), (a ^= d[(s / n) | 0] << 24)),
                      (o[s] = o[s - n] ^ a);
                  }
                for (var c = (this._invKeySchedule = []), u = 0; u < r; u++) {
                  s = r - u;
                  if (u % 4) a = o[s];
                  else a = o[s - 4];
                  c[u] = u < 4 || s <= 4 ? a : h[i[a >>> 24]] ^ l[i[(a >>> 16) & 255]] ^ f[i[(a >>> 8) & 255]] ^ p[i[255 & a]];
                }
              },
              encryptBlock: function(t, e) {
                this._doCryptBlock(t, e, this._keySchedule, o, s, c, u, i);
              },
              decryptBlock: function(t, e) {
                var n = t[e + 1];
                (t[e + 1] = t[e + 3]), (t[e + 3] = n), this._doCryptBlock(t, e, this._invKeySchedule, h, l, f, p, r);
                n = t[e + 1];
                (t[e + 1] = t[e + 3]), (t[e + 3] = n);
              },
              _doCryptBlock: function(t, e, n, i, r, o, s, a) {
                for (var c = this._nRounds, u = t[e] ^ n[0], h = t[e + 1] ^ n[1], l = t[e + 2] ^ n[2], f = t[e + 3] ^ n[3], p = 4, d = 1; d < c; d++) {
                  var g = i[u >>> 24] ^ r[(h >>> 16) & 255] ^ o[(l >>> 8) & 255] ^ s[255 & f] ^ n[p++],
                    m = i[h >>> 24] ^ r[(l >>> 16) & 255] ^ o[(f >>> 8) & 255] ^ s[255 & u] ^ n[p++],
                    y = i[l >>> 24] ^ r[(f >>> 16) & 255] ^ o[(u >>> 8) & 255] ^ s[255 & h] ^ n[p++],
                    v = i[f >>> 24] ^ r[(u >>> 16) & 255] ^ o[(h >>> 8) & 255] ^ s[255 & l] ^ n[p++];
                  (u = g), (h = m), (l = y), (f = v);
                }
                (g = ((a[u >>> 24] << 24) | (a[(h >>> 16) & 255] << 16) | (a[(l >>> 8) & 255] << 8) | a[255 & f]) ^ n[p++]),
                  (m = ((a[h >>> 24] << 24) | (a[(l >>> 16) & 255] << 16) | (a[(f >>> 8) & 255] << 8) | a[255 & u]) ^ n[p++]),
                  (y = ((a[l >>> 24] << 24) | (a[(f >>> 16) & 255] << 16) | (a[(u >>> 8) & 255] << 8) | a[255 & h]) ^ n[p++]),
                  (v = ((a[f >>> 24] << 24) | (a[(u >>> 16) & 255] << 16) | (a[(h >>> 8) & 255] << 8) | a[255 & l]) ^ n[p++]);
                (t[e] = g), (t[e + 1] = m), (t[e + 2] = y), (t[e + 3] = v);
              },
              keySize: 8,
            }));
          t.AES = e._createHelper(g);
        })(),
        (function() {
          if ("undefined" != typeof ArrayBuffer) {
            var t = a.lib.WordArray,
              e = t.init;
            (t.init = function(t) {
              if (
                (t instanceof ArrayBuffer
                  ? (t = new Uint8Array(t))
                  : (t instanceof Int8Array ||
                      ("undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray) ||
                      t instanceof Int16Array ||
                      t instanceof Uint16Array ||
                      t instanceof Int32Array ||
                      t instanceof Uint32Array ||
                      ("undefined" != typeof Float32Array && t instanceof Float32Array) ||
                      ("undefined" != typeof Float64Array && t instanceof Float64Array)) &&
                    (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)),
                t instanceof Uint8Array)
              ) {
                for (var n = t.byteLength, i = [], r = 0; r < n; r++) i[r >>> 2] |= t[r] << (24 - (r % 4) * 8);
                e.call(this, i, n);
              } else e.apply(this, arguments);
            }).prototype = t;
          }
        })();
      var c = (function() {
          function t() {}
          return (
            (t.addListener = function(t, e, n) {
              t.addEventListener
                ? t.addEventListener(e, n, !1)
                : t.attachEvent("on" + e, function() {
                    n.apply(t, arguments);
                  });
            }),
            (t.removeListener = function(t, e, n) {
              t.removeEventListener
                ? t.removeEventListener(e, n, !1)
                : t.detachEvent("on" + e, function() {
                    n.apply(t, arguments);
                  });
            }),
            (t.addMessageListener = function(e, n) {
              t.addListener(e, "message", n);
            }),
            (t.removeMessageListener = function(e, n) {
              t.removeListener(e, "message", n);
            }),
            (t.addUnloadListener = function(e) {
              t.addListener(s, "unload", e);
            }),
            t
          );
        })(),
        u = (function() {
          "use strict";
          var t = {};
          function e(t, e, n) {
            t.byteLength;
            for (var i = 0, r = n.length; i < r; i++) {
              var o = n.charCodeAt(i);
              if (o < 128) t.setUint8(e++, ((o >>> 0) & 127) | 0);
              else if (o < 2048) t.setUint8(e++, ((o >>> 6) & 31) | 192), t.setUint8(e++, ((o >>> 0) & 63) | 128);
              else if (o < 65536) t.setUint8(e++, ((o >>> 12) & 15) | 224), t.setUint8(e++, ((o >>> 6) & 63) | 128), t.setUint8(e++, ((o >>> 0) & 63) | 128);
              else {
                if (!(o < 1114112)) throw new Error("bad codepoint " + o);
                t.setUint8(e++, ((o >>> 18) & 7) | 240), t.setUint8(e++, ((o >>> 12) & 63) | 128), t.setUint8(e++, ((o >>> 6) & 63) | 128), t.setUint8(e++, ((o >>> 0) & 63) | 128);
              }
            }
          }
          function n(t, e, n) {
            for (var i = "", r = e, o = e + n; r < o; r++) {
              var s = t.getUint8(r);
              if (0 != (128 & s))
                if (192 != (224 & s))
                  if (224 != (240 & s)) {
                    if (240 != (248 & s)) throw new Error("Invalid byte " + s.toString(16));
                    i += String.fromCharCode(((7 & s) << 18) | ((63 & t.getUint8(++r)) << 12) | ((63 & t.getUint8(++r)) << 6) | ((63 & t.getUint8(++r)) << 0));
                  } else i += String.fromCharCode(((15 & s) << 12) | ((63 & t.getUint8(++r)) << 6) | ((63 & t.getUint8(++r)) << 0));
                else i += String.fromCharCode(((15 & s) << 6) | (63 & t.getUint8(++r)));
              else i += String.fromCharCode(s);
            }
            return i;
          }
          function i(t) {
            for (var e = 0, n = 0, i = t.length; n < i; n++) {
              var r = t.charCodeAt(n);
              if (r < 128) e += 1;
              else if (r < 2048) e += 2;
              else if (r < 65536) e += 3;
              else {
                if (!(r < 1114112)) throw new Error("bad codepoint " + r);
                e += 4;
              }
            }
            return e;
          }
          (t.inspect = function(t) {
            if (void 0 === t) return "undefined";
            var e, n;
            t instanceof ArrayBuffer ? ((n = "ArrayBuffer"), (e = new DataView(t))) : t instanceof DataView && ((n = "DataView"), (e = t));
            if (!e) return JSON.stringify(t);
            for (var i = [], r = 0; r < t.byteLength; r++) {
              if (r > 20) {
                i.push("...");
                break;
              }
              var o = e.getUint8(r).toString(16);
              1 === o.length && (o = "0" + o), i.push(o);
            }
            return "<" + n + " " + i.join(" ") + ">";
          }),
            (t.utf8Write = e),
            (t.utf8Read = n),
            (t.utf8ByteCount = i),
            (t.encode = function(t, n) {
              var r = (function t(e, n) {
                var r = typeof e;
                if ("string" === r) {
                  if ((o = i(e)) < 32) return 1 + o;
                  if (o < 256) return 2 + o;
                  if (o < 65536) return 3 + o;
                  if (o < 4294967296) return 5 + o;
                }
                ArrayBuffer.isView && ArrayBuffer.isView(e) && (e = e.buffer);
                if (e instanceof ArrayBuffer) {
                  if ((o = e.byteLength) < 256) return 2 + o;
                  if (o < 65536) return 3 + o;
                  if (o < 4294967296) return 5 + o;
                }
                if ("number" === r) {
                  if (Math.floor(e) !== e) return 9;
                  if (e >= 0) {
                    if (e < 128) return 1;
                    if (e < 256) return 2;
                    if (e < 65536) return 3;
                    if (e < 4294967296) return 5;
                    if (e < 0x10000000000000000) return 9;
                    throw new Error("Number too big 0x" + e.toString(16));
                  }
                  if (e >= -32) return 1;
                  if (e >= -128) return 2;
                  if (e >= -32768) return 3;
                  if (e >= -2147483648) return 5;
                  if (e >= -0x8000000000000000) return 9;
                  throw new Error("Number too small -0x" + e.toString(16).substr(1));
                }
                if ("boolean" === r) return 1;
                if (null === e) return n ? 0 : 1;
                if (void 0 === e) return n ? 0 : 3;
                if ("function" == typeof e.toJSON) return t(e.toJSON(), n);
                if ("object" === r) {
                  var o,
                    s = 0;
                  if (Array.isArray(e)) {
                    o = e.length;
                    for (var c = 0; c < o; c++) s += t(e[c], n);
                  } else {
                    var u = a(e, n);
                    o = u.length;
                    for (c = 0; c < o; c++) {
                      var h = u[c];
                      s += t(h) + t(e[h], n);
                    }
                  }
                  if (o < 16) return 1 + s;
                  if (o < 65536) return 3 + s;
                  if (o < 4294967296) return 5 + s;
                  throw new Error("Array or object too long 0x" + o.toString(16));
                }
                if ("function" === r) return 0;
                throw new Error("Unknown type " + r);
              })(t, n);
              if (0 != r) {
                var s = new ArrayBuffer(r);
                return (
                  (function t(n, r, s, c) {
                    var u = typeof n;
                    if ("string" === u) {
                      if ((h = i(n)) < 32) return r.setUint8(s, 160 | h), e(r, s + 1, n), 1 + h;
                      if (h < 256) return r.setUint8(s, 217), r.setUint8(s + 1, h), e(r, s + 2, n), 2 + h;
                      if (h < 65536) return r.setUint8(s, 218), r.setUint16(s + 1, h), e(r, s + 3, n), 3 + h;
                      if (h < 4294967296) return r.setUint8(s, 219), r.setUint32(s + 1, h), e(r, s + 5, n), 5 + h;
                    }
                    ArrayBuffer.isView && ArrayBuffer.isView(n) && (n = n.buffer);
                    if (n instanceof ArrayBuffer) {
                      if ((h = n.byteLength) < 256) return r.setUint8(s, 196), r.setUint8(s + 1, h), new Uint8Array(r.buffer).set(new Uint8Array(n), s + 2), 2 + h;
                      if (h < 65536) return r.setUint8(s, 197), r.setUint16(s + 1, h), new Uint8Array(r.buffer).set(new Uint8Array(n), s + 3), 3 + h;
                      if (h < 4294967296) return r.setUint8(s, 198), r.setUint32(s + 1, h), new Uint8Array(r.buffer).set(new Uint8Array(n), s + 5), 5 + h;
                    }
                    if ("number" === u) {
                      if (Math.floor(n) !== n) return r.setUint8(s, 203), r.setFloat64(s + 1, n), 9;
                      if (n >= 0) {
                        if (n < 128) return r.setUint8(s, n), 1;
                        if (n < 256) return r.setUint8(s, 204), r.setUint8(s + 1, n), 2;
                        if (n < 65536) return r.setUint8(s, 205), r.setUint16(s + 1, n), 3;
                        if (n < 4294967296) return r.setUint8(s, 206), r.setUint32(s + 1, n), 5;
                        if (n < 0x10000000000000000)
                          return (
                            r.setUint8(s, 207),
                            (function(t, e, n) {
                              n < 0x10000000000000000 ? (t.setUint32(e, Math.floor(n * o)), t.setInt32(e + 4, -1 & n)) : (t.setUint32(e, 4294967295), t.setUint32(e + 4, 4294967295));
                            })(r, s + 1, n),
                            9
                          );
                        throw new Error("Number too big 0x" + n.toString(16));
                      }
                      if (n >= -32) return r.setInt8(s, n), 1;
                      if (n >= -128) return r.setUint8(s, 208), r.setInt8(s + 1, n), 2;
                      if (n >= -32768) return r.setUint8(s, 209), r.setInt16(s + 1, n), 3;
                      if (n >= -2147483648) return r.setUint8(s, 210), r.setInt32(s + 1, n), 5;
                      if (n >= -0x8000000000000000)
                        return (
                          r.setUint8(s, 211),
                          (function(t, e, n) {
                            n < 0x8000000000000000 ? (t.setInt32(e, Math.floor(n * o)), t.setInt32(e + 4, -1 & n)) : (t.setUint32(e, 2147483647), t.setUint32(e + 4, 2147483647));
                          })(r, s + 1, n),
                          9
                        );
                      throw new Error("Number too small -0x" + (-n).toString(16).substr(1));
                    }
                    if ("undefined" === u) return c ? 0 : (r.setUint8(s, 212), r.setUint8(s + 1, 0), r.setUint8(s + 2, 0), 3);
                    if (null === n) return c ? 0 : (r.setUint8(s, 192), 1);
                    if ("boolean" === u) return r.setUint8(s, n ? 195 : 194), 1;
                    if ("function" == typeof n.toJSON) return t(n.toJSON(), r, s, c);
                    if ("object" === u) {
                      var h,
                        l = 0,
                        f = Array.isArray(n);
                      if (f) h = n.length;
                      else {
                        var p = a(n, c);
                        h = p.length;
                      }
                      if (
                        (h < 16
                          ? (r.setUint8(s, h | (f ? 144 : 128)), (l = 1))
                          : h < 65536
                          ? (r.setUint8(s, f ? 220 : 222), r.setUint16(s + 1, h), (l = 3))
                          : h < 4294967296 && (r.setUint8(s, f ? 221 : 223), r.setUint32(s + 1, h), (l = 5)),
                        f)
                      )
                        for (var d = 0; d < h; d++) l += t(n[d], r, s + l, c);
                      else
                        for (d = 0; d < h; d++) {
                          var g = p[d];
                          (l += t(g, r, s + l)), (l += t(n[g], r, s + l, c));
                        }
                      return l;
                    }
                    if ("function" === u) return 0;
                    throw new Error("Unknown type " + u);
                  })(t, new DataView(s), 0, n),
                  s
                );
              }
            }),
            (t.decode = function(t) {
              var e = new s(new DataView(t)),
                n = e.parse();
              if (e.offset !== t.byteLength) throw new Error(t.byteLength - e.offset + " trailing bytes");
              return n;
            });
          var r = 4294967296,
            o = 1 / r;
          function s(t, e) {
            (this.offset = e || 0), (this.view = t);
          }
          function a(t, e) {
            return y.keysArray(t, !0).filter(function(n) {
              var i = t[n];
              return !((e && null == i) || ("function" === typeof i && !i.toJSON));
            });
          }
          return (
            (s.prototype.map = function(t) {
              for (var e = {}, n = 0; n < t; n++) {
                e[this.parse()] = this.parse();
              }
              return e;
            }),
            (s.prototype.bin = s.prototype.buf = function(t) {
              var e = new ArrayBuffer(t);
              return new Uint8Array(e).set(new Uint8Array(this.view.buffer, this.offset, t), 0), (this.offset += t), e;
            }),
            (s.prototype.str = function(t) {
              var e = n(this.view, this.offset, t);
              return (this.offset += t), e;
            }),
            (s.prototype.array = function(t) {
              for (var e = new Array(t), n = 0; n < t; n++) e[n] = this.parse();
              return e;
            }),
            (s.prototype.ext = function(t) {
              var e = {};
              return (e.type = this.view.getInt8(this.offset)), this.offset++, (e.data = this.buf(t)), (this.offset += t), e;
            }),
            (s.prototype.parse = function() {
              var t,
                e,
                n,
                i,
                o = this.view.getUint8(this.offset);
              if (0 == (128 & o)) return this.offset++, o;
              if (128 == (240 & o)) return (e = 15 & o), this.offset++, this.map(e);
              if (144 == (240 & o)) return (e = 15 & o), this.offset++, this.array(e);
              if (160 == (224 & o)) return (e = 31 & o), this.offset++, this.str(e);
              if (224 == (224 & o)) return (t = this.view.getInt8(this.offset)), this.offset++, t;
              switch (o) {
                case 192:
                  return this.offset++, null;
                case 193:
                  return void this.offset++;
                case 194:
                  return this.offset++, !1;
                case 195:
                  return this.offset++, !0;
                case 196:
                  return (e = this.view.getUint8(this.offset + 1)), (this.offset += 2), this.bin(e);
                case 197:
                  return (e = this.view.getUint16(this.offset + 1)), (this.offset += 3), this.bin(e);
                case 198:
                  return (e = this.view.getUint32(this.offset + 1)), (this.offset += 5), this.bin(e);
                case 199:
                  return (e = this.view.getUint8(this.offset + 1)), (this.offset += 2), this.ext(e);
                case 200:
                  return (e = this.view.getUint16(this.offset + 1)), (this.offset += 3), this.ext(e);
                case 201:
                  return (e = this.view.getUint32(this.offset + 1)), (this.offset += 5), this.ext(e);
                case 202:
                  return (t = this.view.getFloat32(this.offset + 1)), (this.offset += 5), t;
                case 203:
                  return (t = this.view.getFloat64(this.offset + 1)), (this.offset += 9), t;
                case 204:
                  return (t = this.view.getUint8(this.offset + 1)), (this.offset += 2), t;
                case 205:
                  return (t = this.view.getUint16(this.offset + 1)), (this.offset += 3), t;
                case 206:
                  return (t = this.view.getUint32(this.offset + 1)), (this.offset += 5), t;
                case 207:
                  return (n = this.view), (i = (i = this.offset + 1) || 0), (t = n.getUint32(i) * r + n.getUint32(i + 4)), (this.offset += 9), t;
                case 208:
                  return (t = this.view.getInt8(this.offset + 1)), (this.offset += 2), t;
                case 209:
                  return (t = this.view.getInt16(this.offset + 1)), (this.offset += 3), t;
                case 210:
                  return (t = this.view.getInt32(this.offset + 1)), (this.offset += 5), t;
                case 211:
                  return (
                    (t = (function(t, e) {
                      return (e = e || 0), t.getInt32(e) * r + t.getUint32(e + 4);
                    })(this.view, this.offset + 1)),
                    (this.offset += 9),
                    t
                  );
                case 212:
                  return (e = 1), this.offset++, this.ext(e);
                case 213:
                  return (e = 2), this.offset++, this.ext(e);
                case 214:
                  return (e = 4), this.offset++, this.ext(e);
                case 215:
                  return (e = 8), this.offset++, this.ext(e);
                case 216:
                  return (e = 16), this.offset++, this.ext(e);
                case 217:
                  return (e = this.view.getUint8(this.offset + 1)), (this.offset += 2), this.str(e);
                case 218:
                  return (e = this.view.getUint16(this.offset + 1)), (this.offset += 3), this.str(e);
                case 219:
                  return (e = this.view.getUint32(this.offset + 1)), (this.offset += 5), this.str(e);
                case 220:
                  return (e = this.view.getUint16(this.offset + 1)), (this.offset += 3), this.array(e);
                case 221:
                  return (e = this.view.getUint32(this.offset + 1)), (this.offset += 5), this.array(e);
                case 222:
                  return (e = this.view.getUint16(this.offset + 1)), (this.offset += 3), this.map(e);
                case 223:
                  return (e = this.view.getUint32(this.offset + 1)), (this.offset += 5), this.map(e);
              }
              throw new Error("Unknown type 0x" + o.toString(16));
            }),
            t
          );
        })();
      "undefined" == typeof Window &&
        "undefined" == typeof WorkerGlobalScope &&
        console.log("Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm");
      var h,
        l = s.navigator && s.navigator.userAgent.toString(),
        f = {
          libver: "js-web",
          logTimestamps: !0,
          userAgent: l,
          currentUrl: s.location && s.location.href,
          noUpgrade: l && l.match(/MSIE\s8\.0/),
          binaryType: "arraybuffer",
          WebSocket: s.WebSocket || s.MozWebSocket,
          xhrSupported: s.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(),
          jsonpSupported: "undefined" != typeof document,
          allowComet: ((h = s.location), !s.WebSocket || !h || !h.origin || h.origin.indexOf("http") > -1),
          streamingSupported: !0,
          useProtocolHeartbeats: !0,
          createHmac: null,
          msgpack: u,
          supportsBinary: !!s.TextDecoder,
          preferBinary: !1,
          ArrayBuffer: s.ArrayBuffer,
          atob: s.atob,
          nextTick: function(t) {
            setTimeout(t, 0);
          },
          addEventListener: s.addEventListener,
          inspect: JSON.stringify,
          stringByteSize: function(t) {
            return (s.TextDecoder && new s.TextEncoder().encode(t).length) || t.length;
          },
          TextEncoder: s.TextEncoder,
          TextDecoder: s.TextDecoder,
          Promise: s.Promise,
          getRandomValues: (function(t) {
            if (void 0 !== t)
              return function(e, n) {
                t.getRandomValues(e), n && n(null);
              };
          })(s.crypto || s.msCrypto),
        },
        p = (function() {
          var t,
            e = 16,
            n = a.lib.WordArray;
          if (f.getRandomWordArray) t = f.getRandomWordArray;
          else if ("undefined" != typeof Uint32Array && f.getRandomValues) {
            var i = new Uint32Array(4);
            t = function(t, e) {
              var n = t / 4,
                r = 4 == n ? i : new Uint32Array(n);
              f.getRandomValues(r, function(t) {
                e(t, m.toWordArray(r));
              });
            };
          } else
            t = function(t, e) {
              b.logAction(
                b.LOG_MAJOR,
                "Ably.Crypto.generateRandom()",
                "Warning: the browser you are using does not support secure cryptographically secure randomness generation; falling back to insecure Math.random()",
              );
              for (var i = t / 4, r = new Array(i), o = 0; o < i; o++) r[o] = Math.floor(4294967296 * Math.random()) - 2147483648;
              e(null, n.create(r));
            };
          function r(t) {
            if ("aes" === t.algorithm && "cbc" === t.mode) {
              if (128 === t.keyLength || 256 === t.keyLength) return;
              throw new Error("Unsupported key length " + t.keyLength + " for aes-cbc encryption. Encryption key must be 128 or 256 bits (16 or 32 ASCII characters)");
            }
          }
          function o(t) {
            return t.replace("_", "/").replace("-", "+");
          }
          n.create([0, 0, 0, 0]);
          var s = [
            n.create([269488144, 269488144, 269488144, 269488144], 16),
            n.create([16777216], 1),
            n.create([33685504], 2),
            n.create([50529024], 3),
            n.create([67372036], 4),
            n.create([84215045, 83886080], 5),
            n.create([101058054, 101056512], 6),
            n.create([117901063, 117901056], 7),
            n.create([134744072, 134744072], 8),
            n.create([151587081, 151587081, 150994944], 9),
            n.create([168430090, 168430090, 168427520], 10),
            n.create([185273099, 185273099, 185273088], 11),
            n.create([202116108, 202116108, 202116108], 12),
            n.create([218959117, 218959117, 218959117, 218103808], 13),
            n.create([235802126, 235802126, 235802126, 235798528], 14),
            n.create([252645135, 252645135, 252645135, 252645135], 15),
            n.create([269488144, 269488144, 269488144, 269488144], 16),
          ];
          function c() {}
          function u() {
            (this.algorithm = null), (this.keyLength = null), (this.mode = null), (this.key = null);
          }
          function h(t, e, n) {
            (this.algorithm = t.algorithm + "-" + String(t.keyLength) + "-" + t.mode),
              (this.cjsAlgorithm = t.algorithm.toUpperCase().replace(/-\d+$/, "")),
              (this.key = m.toWordArray(t.key)),
              n && (this.iv = m.toWordArray(n).clone()),
              (this.blockLengthWords = e);
          }
          return (
            (c.CipherParams = u),
            (c.getDefaultParams = function(t) {
              var e;
              if ("function" != typeof t && "string" != typeof t) {
                if (!t.key) throw new Error("Crypto.getDefaultParams: a key is required");
                e = "string" == typeof t.key ? a.enc.Base64.parse(o(t.key)) : m.toWordArray(t.key);
                var n = new u();
                if (((n.key = e), (n.algorithm = t.algorithm || "aes"), (n.keyLength = 32 * e.words.length), (n.mode = t.mode || "cbc"), t.keyLength && t.keyLength !== n.keyLength))
                  throw new Error("Crypto.getDefaultParams: a keyLength of " + t.keyLength + " was specified, but the key actually has length " + n.keyLength);
                return r(n), n;
              }
              if ((b.deprecated("Crypto.getDefaultParams(key, callback)", "Crypto.getDefaultParams({key: key})"), "function" == typeof t))
                c.generateRandomKey(function(e) {
                  t(null, c.getDefaultParams({ key: e }));
                });
              else {
                if ("function" != typeof arguments[1]) throw new Error("Invalid arguments for Crypto.getDefaultParams");
                arguments[1](null, c.getDefaultParams({ key: t }));
              }
            }),
            (c.generateRandomKey = function(e, n) {
              1 == arguments.length && "function" == typeof e && ((n = e), (e = void 0)), t((e || 256) / 8, n);
            }),
            (c.getCipher = function(t) {
              var e = t instanceof u ? t : c.getDefaultParams(t);
              return { cipherParams: e, cipher: new h(e, 4, t.iv) };
            }),
            (h.prototype.encrypt = function(n, i) {
              b.logAction(b.LOG_MICRO, "CBCCipher.encrypt()", "");
              var r = (n = m.toWordArray(n)).sigBytes,
                o = (function(t) {
                  return (t + e) & -e;
                })(r),
                c = this,
                u = function() {
                  c.getIv(function(t, e) {
                    if (t) i(t);
                    else {
                      var a = c.encryptCipher.process(n.concat(s[o - r])),
                        u = e.concat(a);
                      i(null, u);
                    }
                  });
                };
              this.encryptCipher
                ? u()
                : this.iv
                ? ((this.encryptCipher = a.algo[this.cjsAlgorithm].createEncryptor(this.key, { iv: this.iv })), u())
                : t(e, function(t, e) {
                    t ? i(t) : ((c.encryptCipher = a.algo[c.cjsAlgorithm].createEncryptor(c.key, { iv: e })), (c.iv = e), u());
                  });
            }),
            (h.prototype.decrypt = function(t) {
              b.logAction(b.LOG_MICRO, "CBCCipher.decrypt()", ""), (t = m.toWordArray(t));
              var e = this.blockLengthWords,
                i = t.words,
                r = n.create(i.slice(0, e)),
                o = n.create(i.slice(e)),
                s = a.algo[this.cjsAlgorithm].createDecryptor(this.key, { iv: r }),
                c = s.process(o),
                u = s.finalize();
              return s.reset(), u && u.sigBytes && c.concat(u), c;
            }),
            (h.prototype.getIv = function(n) {
              if (this.iv) {
                var i = this.iv;
                return (this.iv = null), void n(null, i);
              }
              var r = this;
              t(e, function(t, e) {
                t ? n(t) : n(null, r.encryptCipher.process(e));
              });
            }),
            c
          );
        })(),
        d = (function() {
          var t,
            e,
            n = "ablyjs-storage-test";
          try {
            s.sessionStorage.setItem(n, n), s.sessionStorage.removeItem(n), (t = !0);
          } catch (e) {
            t = !1;
          }
          try {
            s.localStorage.setItem(n, n), s.localStorage.removeItem(n), (e = !0);
          } catch (t) {
            e = !1;
          }
          function i() {}
          function r(t) {
            return t ? s.sessionStorage : s.localStorage;
          }
          function o(t, e, n, i) {
            var o = { value: e };
            return n && (o.expires = y.now() + n), r(i).setItem(t, JSON.stringify(o));
          }
          function a(t, e) {
            var n = r(e).getItem(t);
            if (!n) return null;
            var i = JSON.parse(n);
            return i.expires && i.expires < y.now() ? (r(e).removeItem(t), null) : i.value;
          }
          function c(t, e) {
            return r(e).removeItem(t);
          }
          return (
            e &&
              ((i.set = function(t, e, n) {
                return o(t, e, n, !1);
              }),
              (i.get = function(t) {
                return a(t, !1);
              }),
              (i.remove = function(t) {
                return c(t, !1);
              })),
            t &&
              ((i.setSession = function(t, e, n) {
                return o(t, e, n, !0);
              }),
              (i.getSession = function(t) {
                return a(t, !0);
              }),
              (i.removeSession = function(t) {
                return c(t, !0);
              })),
            i
          );
        })(),
        g = {
          internetUpUrl: "https://internet-up.ably-realtime.com/is-the-internet-up.txt",
          jsonpInternetUpUrl: "https://internet-up.ably-realtime.com/is-the-internet-up-0-9.js",
          defaultTransports: ["xhr_polling", "xhr_streaming", "jsonp", "web_socket"],
          baseTransportOrder: ["xhr_polling", "xhr_streaming", "jsonp", "web_socket"],
          transportPreferenceOrder: ["jsonp", "xhr_polling", "xhr_streaming", "web_socket"],
          upgradeTransports: ["xhr_streaming", "web_socket"],
        };
      f.noUpgrade && (g.upgradeTransports = []);
      var m = (function() {
          var t = a.lib.WordArray,
            e = f.ArrayBuffer,
            n = f.atob,
            i = f.TextEncoder,
            r = f.TextDecoder,
            o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          function s(t) {
            return null != t && void 0 !== t.sigBytes;
          }
          function c(t) {
            return null != t && t.constructor === e;
          }
          function u(t) {
            return e && e.isView && e.isView(t);
          }
          function h() {}
          (h.base64CharSet = o), (h.hexCharSet = "0123456789abcdef");
          var l = (h.isBuffer = function(t) {
              return c(t) || s(t) || u(t);
            }),
            p = (h.toBuffer = function(t) {
              if (!e) throw new Error("Can't convert to Buffer: browser does not support the necessary types");
              if (c(t)) return new Uint8Array(t);
              if (u(t)) return new Uint8Array(t.buffer);
              if (s(t)) {
                for (var n = new e(t.sigBytes), i = new Uint8Array(n), r = 0; r < t.sigBytes; r++) i[r] = (t.words[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                return i;
              }
              throw new Error("BufferUtils.toBuffer expected an arraybuffer, typed array, or CryptoJS wordarray");
            });
          return (
            (h.toArrayBuffer = function(t) {
              return c(t) ? t : p(t).buffer;
            }),
            (h.toWordArray = function(e) {
              return u(e) && (e = e.buffer), s(e) ? e : t.create(e);
            }),
            (h.base64Encode = function(t) {
              return s(t)
                ? a.enc.Base64.stringify(t)
                : (function(t) {
                    for (var e, n, i, r, s = "", a = o, c = t.byteLength, u = c % 3, h = c - u, l = 0; l < h; l += 3)
                      (e = (258048 & (r = (t[l] << 16) | (t[l + 1] << 8) | t[l + 2])) >> 12), (n = (4032 & r) >> 6), (i = 63 & r), (s += a[(16515072 & r) >> 18] + a[e] + a[n] + a[i]);
                    return (
                      1 == u
                        ? ((e = (3 & (r = t[h])) << 4), (s += a[(252 & r) >> 2] + a[e] + "=="))
                        : 2 == u && ((e = (1008 & (r = (t[h] << 8) | t[h + 1])) >> 4), (n = (15 & r) << 2), (s += a[(64512 & r) >> 10] + a[e] + a[n] + "=")),
                      s
                    );
                  })(p(t));
            }),
            (h.base64Decode = function(t) {
              return e && n
                ? (function(t) {
                    for (var e = n(t), i = e.length, r = new Uint8Array(i), o = 0; o < i; o++) {
                      var s = e.charCodeAt(o);
                      r[o] = s;
                    }
                    return r.buffer;
                  })(t)
                : a.enc.Base64.parse(t);
            }),
            (h.hexEncode = function(t) {
              return (t = h.toWordArray(t)), a.enc.Hex.stringify(t);
            }),
            (h.hexDecode = function(t) {
              var n = a.enc.Hex.parse(t);
              return e ? h.toArrayBuffer(n) : n;
            }),
            (h.utf8Encode = function(t) {
              return i ? new i().encode(t).buffer : a.enc.Utf8.parse(t);
            }),
            (h.utf8Decode = function(t) {
              if (!l(t)) throw new Error("Expected input of utf8decode to be an arraybuffer, typed array, or CryptoJS wordarray");
              return r && !s(t) ? new r().decode(t) : ((t = h.toWordArray(t)), a.enc.Utf8.stringify(t));
            }),
            (h.bufferCompare = function(t, e) {
              if (!t) return -1;
              if (!e) return 1;
              (t = h.toWordArray(t)), (e = h.toWordArray(e)), t.clamp(), e.clamp();
              var n = t.sigBytes - e.sigBytes;
              if (0 != n) return n;
              (t = t.words), (e = e.words);
              for (var i = 0; i < t.length; i++) if (0 != (n = t[i] - e[i])) return n;
              return 0;
            }),
            (h.byteLength = function(t) {
              return c(t) || u(t) ? t.byteLength : s(t) ? t.sigBytes : void 0;
            }),
            h
          );
        })(),
        y = (function() {
          var t = f.msgpack;
          function e() {}
          function n(t) {
            return Math.floor(Math.random() * t.length);
          }
          (e.mixin = function(t) {
            for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              if (!n) break;
              var i = n.hasOwnProperty;
              for (var r in n) (i && !i.call(n, r)) || (t[r] = n[r]);
            }
            return t;
          }),
            (e.copy = function(t) {
              return e.mixin({}, t);
            }),
            (e.isArray =
              Array.isArray ||
              function(t) {
                return "[object Array]" == Object.prototype.toString.call(t);
              }),
            (e.ensureArray = function(t) {
              return e.isEmptyArg(t) ? [] : e.isArray(t) ? t : [t];
            }),
            (e.isObject = function(t) {
              return "[object Object]" == Object.prototype.toString.call(t);
            }),
            (e.isEmpty = function(t) {
              for (var e in t) return !1;
              return !0;
            }),
            (e.isOnlyPropIn = function(t, e) {
              for (var n in t) if (n !== e) return !1;
              return !0;
            }),
            (e.isEmptyArg = function(t) {
              return null == t;
            }),
            (e.shallowClone = function(t) {
              var e = new Object();
              for (var n in t) e[n] = t[n];
              return e;
            }),
            (e.prototypicalClone = function(t, n) {
              function i() {}
              i.prototype = t;
              var r = new i();
              return n && e.mixin(r, n), r;
            }),
            (e.inherits =
              f.inherits ||
              function(t, n) {
                (t.super_ = n), (t.prototype = e.prototypicalClone(n.prototype, { constructor: t }));
              }),
            (e.containsValue = function(t, e) {
              for (var n in t) if (t[n] == e) return !0;
              return !1;
            }),
            (e.intersect = function(t, n) {
              return e.isArray(n) ? e.arrIntersect(t, n) : e.arrIntersectOb(t, n);
            }),
            (e.arrIntersect = function(t, n) {
              for (var i = [], r = 0; r < t.length; r++) {
                var o = t[r];
                -1 != e.arrIndexOf(n, o) && i.push(o);
              }
              return i;
            }),
            (e.arrIntersectOb = function(t, e) {
              for (var n = [], i = 0; i < t.length; i++) {
                var r = t[i];
                r in e && n.push(r);
              }
              return n;
            }),
            (e.arrSubtract = function(t, n) {
              for (var i = [], r = 0; r < t.length; r++) {
                var o = t[r];
                -1 == e.arrIndexOf(n, o) && i.push(o);
              }
              return i;
            }),
            (e.arrIndexOf = Array.prototype.indexOf
              ? function(t, e, n) {
                  return t.indexOf(e, n);
                }
              : function(t, e, n) {
                  n = n || 0;
                  for (var i = t.length; n < i; n++) if (t[n] === e) return n;
                  return -1;
                }),
            (e.arrIn = function(t, n) {
              return -1 !== e.arrIndexOf(t, n);
            }),
            (e.arrDeleteValue = function(t, n) {
              var i = e.arrIndexOf(t, n),
                r = -1 != i;
              return r && t.splice(i, 1), r;
            }),
            (e.arrWithoutValue = function(t, n) {
              var i = t.slice();
              return e.arrDeleteValue(i, n), i;
            }),
            (e.keysArray = function(t, e) {
              var n = [];
              for (var i in t) (e && !t.hasOwnProperty(i)) || n.push(i);
              return n;
            }),
            (e.valuesArray = function(t, e) {
              var n = [];
              for (var i in t) (e && !t.hasOwnProperty(i)) || n.push(t[i]);
              return n;
            }),
            (e.arrForEach = Array.prototype.forEach
              ? function(t, e) {
                  t.forEach(e);
                }
              : function(t, e) {
                  for (var n = t.length, i = 0; i < n; i++) e(t[i], i, t);
                }),
            (e.safeArrForEach = function(t, n) {
              return e.arrForEach(t.slice(), n);
            }),
            (e.arrMap = Array.prototype.map
              ? function(t, e) {
                  return t.map(e);
                }
              : function(t, e) {
                  for (var n = [], i = t.length, r = 0; r < i; r++) n.push(e(t[r], r, t));
                  return n;
                }),
            (e.arrFilter = Array.prototype.filter
              ? function(t, e) {
                  return t.filter(e);
                }
              : function(t, e) {
                  for (var n = [], i = t.length, r = 0; r < i; r++) e(t[r]) && n.push(t[r]);
                  return n;
                }),
            (e.arrEvery = Array.prototype.every
              ? function(t, e) {
                  return t.every(e);
                }
              : function(t, e) {
                  for (var n = t.length, i = 0; i < n; i++) if (!e(t[i], i, t)) return !1;
                  return !0;
                }),
            (e.allSame = function(t, n) {
              if (0 === t.length) return !0;
              var i = t[0][n];
              return e.arrEvery(t, function(t) {
                return t[n] === i;
              });
            }),
            (e.nextTick = f.nextTick);
          var i = { json: "application/json", jsonp: "application/javascript", xml: "application/xml", html: "text/html", msgpack: "application/x-msgpack" };
          return (
            (e.defaultGetHeaders = function(t) {
              return { accept: i[t || "json"], "X-Ably-Version": g.apiVersion, "X-Ably-Lib": g.libstring };
            }),
            (e.defaultPostHeaders = function(t) {
              var e;
              return { accept: (e = i[t || "json"]), "content-type": e, "X-Ably-Version": g.apiVersion, "X-Ably-Lib": g.libstring };
            }),
            (e.arrPopRandomElement = function(t) {
              return t.splice(n(t), 1)[0];
            }),
            (e.toQueryString = function(t) {
              var e = [];
              if (t) for (var n in t) e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
              return e.length ? "?" + e.join("&") : "";
            }),
            (e.parseQueryString = function(t) {
              for (var e, n = /([^?&=]+)=?([^&]*)/g, i = {}; (e = n.exec(t)); ) i[decodeURIComponent(e[1])] = decodeURIComponent(e[2]);
              return i;
            }),
            (e.now =
              Date.now ||
              function() {
                return new Date().getTime();
              }),
            (e.inspect = f.inspect),
            (e.isErrorInfo = function(t) {
              return "ErrorInfo" == t.constructor.name;
            }),
            (e.inspectError = function(t) {
              return t && (e.isErrorInfo(t) || "Error" == t.constructor.name || t instanceof Error) ? t.toString() : e.inspect(t);
            }),
            (e.inspectBody = function(t) {
              return m.isBuffer(t) ? t.toString() : "string" == typeof t ? t : f.inspect(t);
            }),
            (e.dataSizeBytes = function(t) {
              if (m.isBuffer(t)) return m.byteLength(t);
              if ("string" == typeof t) return f.stringByteSize(t);
              throw new Error("Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " + typeof t);
            }),
            (e.cheapRandStr = function() {
              return String(Math.random()).substr(2);
            }),
            (e.randomString =
              f.getRandomValues && "undefined" != typeof Uint8Array
                ? function(t) {
                    var e = new Uint8Array(t);
                    return f.getRandomValues(e), m.base64Encode(e);
                  }
                : function(t) {
                    for (var e = m.base64CharSet, i = Math.round((4 * t) / 3), r = "", o = 0; o < i; o++) r += e[n(e)];
                    return r;
                  }),
            (e.randomHexString =
              f.getRandomValues && "undefined" != typeof Uint8Array
                ? function(t) {
                    var e = new Uint8Array(t);
                    return f.getRandomValues(e), m.hexEncode(e);
                  }
                : function(t) {
                    for (var e = m.hexCharSet, i = 2 * t, r = "", o = 0; o < i; o++) r += e[n(e)];
                    return r;
                  }),
            (e.arrChooseN = function(t, n) {
              for (var i = Math.min(n, t.length), r = t.slice(), o = [], s = 0; s < i; s++) o.push(e.arrPopRandomElement(r));
              return o;
            }),
            (e.trim = String.prototype.trim
              ? function(t) {
                  return t.trim();
                }
              : function(t) {
                  return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
                }),
            (e.promisify = function(t, e, n) {
              return new Promise(function(i, r) {
                t[e].apply(
                  t,
                  Array.prototype.slice.call(n).concat(function(t, e) {
                    t ? r(t) : i(e);
                  }),
                );
              });
            }),
            (e.decodeBody = function(e, n) {
              return "msgpack" == n ? t.decode(e) : JSON.parse(String(e));
            }),
            (e.encodeBody = function(e, n) {
              return "msgpack" == n ? t.encode(e, !0) : JSON.stringify(e);
            }),
            e
          );
        })(),
        v = (function() {
          var t = function() {};
          function e() {}
          var n =
            Date.now ||
            function() {
              return new Date().getTime();
            };
          function i(t) {
            var e = t.statusCode;
            return (408 === e && !t.code) || (400 === e && !t.code) || (e >= 500 && e <= 504);
          }
          function r(t) {
            var e = t.connection,
              n = e && e.connectionManager.host;
            return n ? [n].concat(g.getFallbackHosts(t.options)) : g.getHosts(t.options);
          }
          return (
            (e._getHosts = r),
            (e.methods = ["get", "delete", "post", "put", "patch"]),
            (e.methodsWithoutBody = ["get", "delete"]),
            (e.methodsWithBody = y.arrSubtract(e.methods, e.methodsWithoutBody)),
            y.arrForEach(e.methodsWithoutBody, function(t) {
              (e[t] = function(n, i, r, o, s) {
                e.do(t, n, i, r, null, o, s);
              }),
                (e[t + "Uri"] = function(n, i, r, o, s) {
                  e.doUri(t, n, i, r, null, o, s);
                });
            }),
            y.arrForEach(e.methodsWithBody, function(t) {
              (e[t] = function(n, i, r, o, s, a) {
                e.do(t, n, i, r, o, s, a);
              }),
                (e[t + "Uri"] = function(n, i, r, o, s, a) {
                  e.doUri(t, n, i, r, o, s, a);
                });
            }),
            (e.do = function(o, s, a, c, u, h, l) {
              l = l || t;
              var f =
                  "function" == typeof a
                    ? a
                    : function(t) {
                        return s.baseUri(t) + a;
                      },
                p = (c && c.accept, arguments),
                d = s._currentFallback;
              if (d) {
                if (d.validUntil > n())
                  return void e.Request(o, s, f(d.host), c, h, u, function(t) {
                    if (t && i(t)) return (s._currentFallback = null), void e.do.apply(e, p);
                    l.apply(null, arguments);
                  });
                s._currentFallback = null;
              }
              var g = r(s);
              if (1 != g.length) {
                var m = function(t, r) {
                  var a = t.shift();
                  e.doUri(o, s, f(a), c, u, h, function(e) {
                    e && i(e) && t.length ? m(t, !0) : (r && (s._currentFallback = { host: a, validUntil: n() + s.options.timeouts.fallbackRetryTimeout }), l.apply(null, arguments));
                  });
                };
                m(g);
              } else e.doUri(o, s, f(g[0]), c, u, h, l);
            }),
            (e.doUri = function(t, n, i, r, o, s, a) {
              e.Request(t, n, i, r, s, o, a);
            }),
            (e.supportsAuthHeaders = !1),
            (e.supportsLinkHeaders = !1),
            e
          );
        })(),
        O = (function() {
          function t() {
            this.buffer = [];
          }
          (t.prototype.append = function(t) {
            return this.buffer.push(t), this;
          }),
            (t.prototype.toString = function() {
              return this.buffer.join("");
            });
          var e = {
            codex: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(i) {
              for (var r = new t(), o = e.codex, s = new n(i); s.moveNext(); ) {
                var a = s.current;
                s.moveNext();
                var c = s.current;
                s.moveNext();
                var u = s.current,
                  h = a >> 2,
                  l = ((3 & a) << 4) | (c >> 4),
                  f = ((15 & c) << 2) | (u >> 6),
                  p = 63 & u;
                isNaN(c) ? (f = p = 64) : isNaN(u) && (p = 64), r.append(o.charAt(h) + o.charAt(l) + o.charAt(f) + o.charAt(p));
              }
              return r.toString();
            },
            decode: function(e) {
              for (var n = new t(), r = new i(e); r.moveNext(); ) {
                var o = r.current;
                if (o < 128) n.append(String.fromCharCode(o));
                else if (o > 191 && o < 224) {
                  r.moveNext();
                  var s = r.current;
                  n.append(String.fromCharCode(((31 & o) << 6) | (63 & s)));
                } else {
                  r.moveNext();
                  s = r.current;
                  r.moveNext();
                  var a = r.current;
                  n.append(String.fromCharCode(((15 & o) << 12) | ((63 & s) << 6) | (63 & a)));
                }
              }
              return n.toString();
            },
          };
          function n(t) {
            (this._input = t), (this._index = -1), (this._buffer = []);
          }
          function i(t) {
            (this._input = t), (this._index = -1), (this._buffer = []);
          }
          return (
            (n.prototype = {
              current: Number.NaN,
              moveNext: function() {
                if (this._buffer.length > 0) return (this.current = this._buffer.shift()), !0;
                if (this._index >= this._input.length - 1) return (this.current = Number.NaN), !1;
                var t = this._input.charCodeAt(++this._index);
                return (
                  13 == t && 10 == this._input.charCodeAt(this._index + 1) && ((t = 10), (this._index += 2)),
                  t < 128
                    ? (this.current = t)
                    : t > 127 && t < 2048
                    ? ((this.current = (t >> 6) | 192), this._buffer.push((63 & t) | 128))
                    : ((this.current = (t >> 12) | 224), this._buffer.push(((t >> 6) & 63) | 128), this._buffer.push((63 & t) | 128)),
                  !0
                );
              },
            }),
            (i.prototype = {
              current: 64,
              moveNext: function() {
                if (this._buffer.length > 0) return (this.current = this._buffer.shift()), !0;
                if (this._index >= this._input.length - 1) return (this.current = 64), !1;
                var t = e.codex.indexOf(this._input.charAt(++this._index)),
                  n = e.codex.indexOf(this._input.charAt(++this._index)),
                  i = e.codex.indexOf(this._input.charAt(++this._index)),
                  r = e.codex.indexOf(this._input.charAt(++this._index)),
                  o = (t << 2) | (n >> 4),
                  s = ((15 & n) << 4) | (i >> 2),
                  a = ((3 & i) << 6) | r;
                return (this.current = o), 64 != i && this._buffer.push(s), 64 != r && this._buffer.push(a), !0;
              },
            }),
            e
          );
        })();
      function R(t) {
        if ("string" != typeof t) throw new S("host must be a string; was a " + typeof t, 4e4, 400);
        if (!t.length) throw new S("host must not be zero-length", 4e4, 400);
      }
      (g.ENVIRONMENT = ""),
        (g.REST_HOST = "rest.ably.io"),
        (g.REALTIME_HOST = "realtime.ably.io"),
        (g.FALLBACK_HOSTS = ["A.ably-realtime.com", "B.ably-realtime.com", "C.ably-realtime.com", "D.ably-realtime.com", "E.ably-realtime.com"]),
        (g.PORT = 80),
        (g.TLS_PORT = 443),
        (g.TIMEOUTS = {
          disconnectedRetryTimeout: 15e3,
          suspendedRetryTimeout: 3e4,
          httpRequestTimeout: 15e3,
          channelRetryTimeout: 15e3,
          fallbackRetryTimeout: 6e5,
          connectionStateTtl: 12e4,
          realtimeRequestTimeout: 1e4,
          recvTimeout: 9e4,
          preferenceConnectTimeout: 6e3,
          parallelUpgradeDelay: 6e3,
        }),
        (g.httpMaxRetryCount = 3),
        (g.maxMessageSize = 65536),
        (g.errorReportingUrl = "https://errors.ably.io/api/15/store/"),
        (g.errorReportingHeaders = { "X-Sentry-Auth": "Sentry sentry_version=7, sentry_key=a04e33c8674c451f8a310fbec029acf5, sentry_client=ably-js/0.1", "Content-Type": "application/json" }),
        (g.version = "1.1.22"),
        (g.libstring = f.libver + "-" + g.version),
        (g.apiVersion = "1.1"),
        (g.getHost = function(t, e, n) {
          return (e = n ? (e == t.restHost && t.realtimeHost) || e || t.realtimeHost : e || t.restHost);
        }),
        (g.getPort = function(t, e) {
          return e || t.tls ? t.tlsPort : t.port;
        }),
        (g.getHttpScheme = function(t) {
          return t.tls ? "https://" : "http://";
        }),
        (g.getFallbackHosts = function(t) {
          var e = t.fallbackHosts,
            n = void 0 !== t.httpMaxRetryCount ? t.httpMaxRetryCount : g.httpMaxRetryCount;
          return e ? y.arrChooseN(e, n) : [];
        }),
        (g.getHosts = function(t) {
          return [t.restHost].concat(g.getFallbackHosts(t));
        }),
        (g.objectifyOptions = function(t) {
          return "string" == typeof t ? (-1 == t.indexOf(":") ? { token: t } : { key: t }) : t;
        }),
        (g.normaliseOptions = function(t) {
          t.host && (b.deprecated("host", "restHost"), (t.restHost = t.host)),
            t.wsHost && (b.deprecated("wsHost", "realtimeHost"), (t.realtimeHost = t.wsHost)),
            t.queueEvents && (b.deprecated("queueEvents", "queueMessages"), (t.queueMessages = t.queueEvents)),
            !0 === t.recover &&
              (b.deprecated("{recover: true}", "{recover: function(lastConnectionDetails, cb) { cb(true); }}"),
              (t.recover = function(t, e) {
                e(!0);
              })),
            "function" == typeof t.recover &&
              !0 === t.closeOnUnload &&
              (b.logAction(b.LOG_ERROR, "Defaults.normaliseOptions", "closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter"),
              (t.recover = null)),
            "closeOnUnload" in t || (t.closeOnUnload = !t.recover),
            t.transports &&
              y.arrIn(t.transports, "xhr") &&
              (b.deprecated('transports: ["xhr"]', 'transports: ["xhr_streaming"]'), y.arrDeleteValue(t.transports, "xhr"), t.transports.push("xhr_streaming")),
            "queueMessages" in t || (t.queueMessages = !0);
          var e = !1;
          if (t.restHost) t.realtimeHost = t.realtimeHost || t.restHost;
          else {
            var n = (t.environment && String(t.environment).toLowerCase()) || g.ENVIRONMENT;
            (e = !n || "production" === n), (t.restHost = e ? g.REST_HOST : n + "-" + g.REST_HOST), (t.realtimeHost = e ? g.REALTIME_HOST : n + "-" + g.REALTIME_HOST);
          }
          for (var i in ((t.fallbackHosts = e || t.fallbackHostsUseDefault ? g.FALLBACK_HOSTS : t.fallbackHosts),
          y.arrForEach((t.fallbackHosts || []).concat(t.restHost, t.realtimeHost), R),
          (t.port = t.port || g.PORT),
          (t.tlsPort = t.tlsPort || g.TLS_PORT),
          (t.maxMessageSize = t.maxMessageSize || g.maxMessageSize),
          "tls" in t || (t.tls = !0),
          (t.timeouts = {}),
          g.TIMEOUTS))
            t.timeouts[i] = t[i] || g.TIMEOUTS[i];
          ((t.useBinaryProtocol = "useBinaryProtocol" in t ? f.supportsBinary && t.useBinaryProtocol : f.preferBinary), t.clientId) &&
            ((t.headers = t.headers || {})["X-Ably-ClientId"] = m.base64Encode(m.utf8Encode(t.clientId)));
          return (
            "idempotentRestPublishing" in t || (t.idempotentRestPublishing = !1),
            t.promises &&
              !f.Promise &&
              (b.logAction(b.LOG_ERROR, "Defaults.normaliseOptions", "{promises: true} was specified, but no Promise constructor found; disabling promises"), (t.promises = !1)),
            t
          );
        });
      var A = (function() {
          function t() {
            (this.any = []), (this.events = {}), (this.anyOnce = []), (this.eventsOnce = {});
          }
          function e(t, e, n) {
            try {
              e.apply(t, n);
            } catch (t) {
              b.logAction(b.LOG_ERROR, "EventEmitter.emit()", "Unexpected listener exception: " + t + "; stack = " + (t && t.stack));
            }
          }
          function n(t, e, i) {
            var r, o, s, a;
            for (a = 0; a < t.length; a++)
              if (((r = t[a]), i && (r = r[i]), y.isArray(r))) {
                for (; -1 !== (o = y.arrIndexOf(r, e)); ) r.splice(o, 1);
                i && 0 === r.length && delete t[a][i];
              } else if (y.isObject(r)) for (s in r) r.hasOwnProperty(s) && y.isArray(r[s]) && n([r], e, s);
          }
          return (
            (t.prototype.on = function(t, e) {
              if (1 == arguments.length && "function" == typeof t) this.any.push(t);
              else if (y.isEmptyArg(t)) this.any.push(e);
              else if (y.isArray(t)) {
                var n = this;
                y.arrForEach(t, function(t) {
                  n.on(t, e);
                });
              } else {
                var i = this.events[t] || (this.events[t] = []);
                i.push(e);
              }
            }),
            (t.prototype.off = function(t, e) {
              if (0 == arguments.length || (y.isEmptyArg(t) && y.isEmptyArg(e))) return (this.any = []), (this.events = {}), (this.anyOnce = []), void (this.eventsOnce = {});
              if ((1 == arguments.length && "function" == typeof t && ((e = t), (t = null)), e && y.isEmptyArg(t))) n([this.any, this.events, this.anyOnce, this.eventsOnce], e);
              else {
                if (y.isArray(t)) {
                  var i = this;
                  y.arrForEach(t, function(t) {
                    i.off(t, e);
                  });
                }
                e ? n([this.events, this.eventsOnce], e, t) : (delete this.events[t], delete this.eventsOnce[t]);
              }
            }),
            (t.prototype.listeners = function(t) {
              if (t) {
                var e = this.events[t] || [];
                return this.eventsOnce[t] && Array.prototype.push.apply(e, this.eventsOnce[t]), e.length ? e : null;
              }
              return this.any.length ? this.any : null;
            }),
            (t.prototype.emit = function(t) {
              var n = Array.prototype.slice.call(arguments, 1),
                i = { event: t },
                r = [];
              this.anyOnce.length && (Array.prototype.push.apply(r, this.anyOnce), (this.anyOnce = [])), this.any.length && Array.prototype.push.apply(r, this.any);
              var o = this.eventsOnce[t];
              o && (Array.prototype.push.apply(r, o), delete this.eventsOnce[t]);
              var s = this.events[t];
              s && Array.prototype.push.apply(r, s),
                y.arrForEach(r, function(t) {
                  e(i, t, n);
                });
            }),
            (t.prototype.once = function(t, e) {
              var n = arguments.length,
                i = this;
              if ((0 === n || (1 === n && "function" != typeof t)) && f.Promise)
                return new f.Promise(function(e) {
                  i.once(t, e);
                });
              if (1 == arguments.length && "function" == typeof t) this.anyOnce.push(t);
              else if (y.isEmptyArg(t)) this.anyOnce.push(e);
              else {
                if (y.isArray(t)) throw "Arrays of events can only be used with on(), not once()";
                var r = this.eventsOnce[t] || (this.eventsOnce[t] = []);
                r.push(e);
              }
            }),
            (t.prototype.whenState = function(t, n, i) {
              var r = { event: t },
                o = this,
                s = Array.prototype.slice.call(arguments, 3);
              if ("string" != typeof t || "string" != typeof n) throw "whenState requires a valid event String argument";
              if ("function" != typeof i && f.Promise)
                return new f.Promise(function(e) {
                  o.whenState.bind(o, t, n, e).apply(o, s);
                });
              t === n ? e(r, i, s) : this.once(t, i);
            }),
            t
          );
        })(),
        b = (function() {
          var t, e;
          function n(t, e) {
            return ("000" + t).slice(-2 - (e || 0));
          }
          ("undefined" == typeof Window && "undefined" == typeof WorkerGlobalScope) || (s.console && s.console.log && "function" == typeof s.console.log.apply)
            ? ((t = function() {
                console.log.apply(console, arguments);
              }),
              (e = console.warn
                ? function() {
                    console.warn.apply(console, arguments);
                  }
                : t))
            : (t = e =
                s.console && s.console.log
                  ? function() {
                      Function.prototype.apply.call(console.log, console, arguments);
                    }
                  : function() {});
          var i = 1;
          function r(t) {
            return f.logTimestamps
              ? function(e) {
                  var i = new Date();
                  t(n(i.getHours()) + ":" + n(i.getMinutes()) + ":" + n(i.getSeconds()) + "." + n(i.getMilliseconds(), !0) + " " + e);
                }
              : t;
          }
          var o = r(t),
            a = r(e);
          function c(t) {}
          return (
            (c.LOG_NONE = 0),
            (c.LOG_ERROR = 1),
            (c.LOG_MAJOR = 2),
            (c.LOG_MINOR = 3),
            (c.LOG_MICRO = 4),
            (c.LOG_DEFAULT = 1),
            (c.LOG_DEBUG = 4),
            (c.logAction = function(t, e, n) {
              c.shouldLog(t) && (1 === t ? a : o)("Ably: " + e + ": " + n);
            }),
            (c.deprecated = function(t, e) {
              c.shouldLog(1) && a("Ably: Deprecation warning - '" + t + "' is deprecated and will be removed from a future version. Please use '" + e + "' instead.");
            }),
            (c.shouldLog = function(t) {
              return t <= i;
            }),
            (c.setLog = function(t, e) {
              void 0 !== t && (i = t), void 0 !== e && (o = a = e);
            }),
            c
          );
        })(),
        w = function(t) {
          t = t || [];
          var e = function() {
            for (var e = 0; e < t.length; e++) {
              var n = t[e];
              if (n)
                try {
                  n.apply(null, arguments);
                } catch (t) {
                  b.logAction(b.LOG_ERROR, "Multicaster multiple callback handler", "Unexpected exception: " + t + "; stack = " + t.stack);
                }
            }
          };
          return (
            (e.push = function() {
              Array.prototype.push.apply(t, arguments);
            }),
            e
          );
        },
        C = (function() {
          function t() {}
          t.levels = ["fatal", "error", "warning", "info", "debug"];
          return (
            (t.report = function(t, e, n, i) {
              var r = {
                event_id: y.randomHexString(16),
                tags: y.mixin({ lib: f.libver }, i),
                platform: "javascript",
                level: t,
                release: g.version,
                fingerprint: n && [n],
                message: e,
                request: { headers: { "User-Agent": f.userAgent }, url: f.currentUrl },
              };
              b.logAction(b.LOG_MICRO, "ErrorReporter", "POSTing to error reporter: " + e),
                v.postUri(null, g.errorReportingUrl, g.errorReportingHeaders, JSON.stringify(r), {}, function(t, e) {
                  b.logAction(b.LOG_MICRO, "ErrorReporter", "POSTing to error reporter resulted in: " + (t ? y.inspectError(t) : y.inspectBody(e)));
                });
            }),
            t
          );
        })(),
        S = (function() {
          function t(t, e, n, i) {
            (this.message = t), (this.code = e), (this.statusCode = n), (this.cause = i), (this.href = void 0);
          }
          return (
            (t.prototype.toString = function() {
              var t = "[" + this.constructor.name;
              return (
                this.message && (t += ": " + this.message),
                this.statusCode && (t += "; statusCode=" + this.statusCode),
                this.code && (t += "; code=" + this.code),
                this.cause && (t += "; cause=" + y.inspectError(this.cause)),
                !this.href || (this.message && this.message.indexOf("help.ably.io") > -1) || (t += "; see " + this.href + " "),
                (t += "]")
              );
            }),
            (t.fromValues = function(e) {
              var n = y.mixin(new t(), e);
              return e instanceof Error && (n.message = e.message), n.code && !n.href && (n.href = "https://help.ably.io/error/" + n.code), n;
            }),
            t
          );
        })(),
        _ = (function() {
          function t() {
            (this.name = void 0),
              (this.id = void 0),
              (this.timestamp = void 0),
              (this.clientId = void 0),
              (this.connectionId = void 0),
              (this.connectionKey = void 0),
              (this.data = void 0),
              (this.encoding = void 0),
              (this.extras = void 0),
              (this.size = void 0);
          }
          function e(t) {
            if (t && t.cipher && !t.cipher.channelCipher) {
              if (!p) throw new Error("Encryption not enabled; use ably.encryption.js instead");
              var e = p.getCipher(t.cipher);
              (t.cipher = e.cipherParams), (t.channelCipher = e.cipher);
            }
          }
          function n(t) {
            var e = 0;
            return t.name && (e += t.name.length), t.clientId && (e += t.clientId.length), t.extras && (e += JSON.stringify(t.extras).length), t.data && (e += y.dataSizeBytes(t.data)), e;
          }
          return (
            (t.prototype.toJSON = function() {
              var t = { name: this.name, id: this.id, clientId: this.clientId, connectionId: this.connectionId, connectionKey: this.connectionKey, encoding: this.encoding, extras: this.extras },
                e = this.data;
              if (e && m.isBuffer(e))
                if (arguments.length > 0) {
                  var n = this.encoding;
                  (t.encoding = n ? n + "/base64" : "base64"), (e = m.base64Encode(e));
                } else e = m.toBuffer(e);
              return (t.data = e), t;
            }),
            (t.prototype.toString = function() {
              var t = "[Message";
              return (
                this.name && (t += "; name=" + this.name),
                this.id && (t += "; id=" + this.id),
                this.timestamp && (t += "; timestamp=" + this.timestamp),
                this.clientId && (t += "; clientId=" + this.clientId),
                this.connectionId && (t += "; connectionId=" + this.connectionId),
                this.encoding && (t += "; encoding=" + this.encoding),
                this.extras && (t += "; extras =" + JSON.stringify(this.extras)),
                this.data &&
                  ("string" == typeof this.data
                    ? (t += "; data=" + this.data)
                    : m.isBuffer(this.data)
                    ? (t += "; data (buffer)=" + m.base64Encode(this.data))
                    : (t += "; data (json)=" + JSON.stringify(this.data))),
                this.extras && (t += "; extras=" + JSON.stringify(this.extras)),
                (t += "]")
              );
            }),
            (t.encrypt = function(t, e, n) {
              var i = t.data,
                r = t.encoding,
                o = e.channelCipher;
              (r = r ? r + "/" : ""),
                m.isBuffer(i) || ((i = m.utf8Encode(String(i))), (r += "utf-8/")),
                o.encrypt(i, function(e, i) {
                  e ? n(e) : ((t.data = i), (t.encoding = r + "cipher+" + o.algorithm), n(null, t));
                });
            }),
            (t.encode = function(e, n, i) {
              var r,
                o = e.data;
              if (!("string" == typeof o || m.isBuffer(o) || null == o)) {
                if (!y.isObject(o) && !y.isArray(o)) throw new S("Data type is unsupported", 40013, 400);
                (e.data = JSON.stringify(o)), (e.encoding = (r = e.encoding) ? r + "/json" : "json");
              }
              null != n && n.cipher ? t.encrypt(e, n, i) : i(null, e);
            }),
            (t.encodeArray = function(e, n, i) {
              for (var r = 0, o = 0; o < e.length; o++)
                t.encode(e[o], n, function(t, n) {
                  t ? i(t) : ++r == e.length && i(null, e);
                });
            }),
            (t.serialize = y.encodeBody),
            (t.decode = function(t, e) {
              var n = t.encoding;
              if (n) {
                var i,
                  r = n.split("/"),
                  o = r.length,
                  s = t.data;
                try {
                  for (; (i = o) > 0; ) {
                    var a = r[--o].match(/([\-\w]+)(\+([\w\-]+))?/);
                    if (!a) break;
                    var c = a[1];
                    switch (c) {
                      case "base64":
                        s = m.base64Decode(String(s));
                        continue;
                      case "utf-8":
                        s = m.utf8Decode(s);
                        continue;
                      case "json":
                        s = JSON.parse(s);
                        continue;
                      case "cipher":
                        if (null != e && e.cipher) {
                          var u = a[3],
                            h = e.channelCipher;
                          if (u != h.algorithm) throw new Error("Unable to decrypt message with given cipher; incompatible cipher params");
                          s = h.decrypt(s);
                          continue;
                        }
                        throw new Error("Unable to decrypt message; not an encrypted channel");
                      default:
                        throw new Error("Unknown encoding");
                    }
                    break;
                  }
                } catch (t) {
                  throw new S("Error processing the " + c + " encoding, decoder returned â€˜" + t.message + "â€™", 40013, 400);
                } finally {
                  (t.encoding = i <= 0 ? null : r.slice(0, i).join("/")), (t.data = s);
                }
              }
            }),
            (t.fromResponseBody = function(e, n, i) {
              i && (e = y.decodeBody(e, i));
              for (var r = 0; r < e.length; r++) {
                var o = (e[r] = t.fromValues(e[r]));
                try {
                  t.decode(o, n);
                } catch (t) {
                  b.logAction(b.LOG_ERROR, "Message.fromResponseBody()", t.toString());
                }
              }
              return e;
            }),
            (t.fromValues = function(e) {
              return y.mixin(new t(), e);
            }),
            (t.fromValuesArray = function(e) {
              for (var n = e.length, i = new Array(n), r = 0; r < n; r++) i[r] = t.fromValues(e[r]);
              return i;
            }),
            (t.fromEncoded = function(n, i) {
              var r = t.fromValues(n);
              e(i);
              try {
                t.decode(r, i);
              } catch (t) {
                b.logAction(b.LOG_ERROR, "Message.fromEncoded()", t.toString());
              }
              return r;
            }),
            (t.fromEncodedArray = function(n, i) {
              return (
                e(i),
                y.arrMap(n, function(e) {
                  return t.fromEncoded(e, i);
                })
              );
            }),
            (t.getMessagesSize = function(t) {
              for (var e, i = 0, r = 0; r < t.length; r++) i += (e = t[r]).size || (e.size = n(e));
              return i;
            }),
            t
          );
        })(),
        T = (function() {
          f.msgpack;
          function t(t) {
            return y.arrIndexOf(e.Actions, t);
          }
          function e() {
            (this.action = void 0),
              (this.id = void 0),
              (this.timestamp = void 0),
              (this.clientId = void 0),
              (this.connectionId = void 0),
              (this.data = void 0),
              (this.encoding = void 0),
              (this.size = void 0);
          }
          return (
            (e.Actions = ["absent", "present", "enter", "leave", "update"]),
            (e.prototype.isSynthesized = function() {
              return this.id.substring(this.connectionId.length, 0) !== this.connectionId;
            }),
            (e.prototype.parseId = function() {
              var t = this.id.split(":");
              return { connectionId: t[0], msgSerial: parseInt(t[1], 10), index: parseInt(t[2], 10) };
            }),
            (e.prototype.toJSON = function() {
              var e = { clientId: this.clientId, action: t(this.action), encoding: this.encoding },
                n = this.data;
              if (n && m.isBuffer(n))
                if (arguments.length > 0) {
                  var i = this.encoding;
                  (e.encoding = i ? i + "/base64" : "base64"), (n = m.base64Encode(n));
                } else n = m.toBuffer(n);
              return (e.data = n), e;
            }),
            (e.prototype.toString = function() {
              var t = "[PresenceMessage";
              return (
                (t += "; action=" + this.action),
                this.id && (t += "; id=" + this.id),
                this.timestamp && (t += "; timestamp=" + this.timestamp),
                this.clientId && (t += "; clientId=" + this.clientId),
                this.connectionId && (t += "; connectionId=" + this.connectionId),
                this.encoding && (t += "; encoding=" + this.encoding),
                this.data &&
                  ("string" == typeof this.data
                    ? (t += "; data=" + this.data)
                    : m.isBuffer(this.data)
                    ? (t += "; data (buffer)=" + m.base64Encode(this.data))
                    : (t += "; data (json)=" + JSON.stringify(this.data))),
                (t += "]")
              );
            }),
            (e.encode = _.encode),
            (e.decode = _.decode),
            (e.fromResponseBody = function(t, n, i) {
              i && (t = y.decodeBody(t, i));
              for (var r = 0; r < t.length; r++) {
                var o = (t[r] = e.fromValues(t[r], !0));
                try {
                  e.decode(o, n);
                } catch (t) {
                  b.logAction(b.LOG_ERROR, "PresenceMessage.fromResponseBody()", t.toString());
                }
              }
              return t;
            }),
            (e.fromValues = function(t, n) {
              return n && (t.action = e.Actions[t.action]), y.mixin(new e(), t);
            }),
            (e.fromValuesArray = function(t) {
              for (var n = t.length, i = new Array(n), r = 0; r < n; r++) i[r] = e.fromValues(t[r]);
              return i;
            }),
            (e.fromEncoded = function(t, n) {
              var i = e.fromValues(t, !0);
              try {
                e.decode(i, n);
              } catch (t) {
                b.logAction(b.LOG_ERROR, "PresenceMessage.fromEncoded()", t.toString());
              }
              return i;
            }),
            (e.fromEncodedArray = function(t, n) {
              return y.arrMap(t, function(t) {
                return e.fromEncoded(t, n);
              });
            }),
            (e.getMessagesSize = _.getMessagesSize),
            e
          );
        })(),
        I = (function() {
          function t() {
            (this.action = void 0),
              (this.flags = void 0),
              (this.id = void 0),
              (this.timestamp = void 0),
              (this.count = void 0),
              (this.error = void 0),
              (this.connectionId = void 0),
              (this.connectionKey = void 0),
              (this.connectionSerial = void 0),
              (this.channel = void 0),
              (this.channelSerial = void 0),
              (this.msgSerial = void 0),
              (this.messages = void 0),
              (this.presence = void 0),
              (this.auth = void 0);
          }
          var e = (t.Action = {
            HEARTBEAT: 0,
            ACK: 1,
            NACK: 2,
            CONNECT: 3,
            CONNECTED: 4,
            DISCONNECT: 5,
            DISCONNECTED: 6,
            CLOSE: 7,
            CLOSED: 8,
            ERROR: 9,
            ATTACH: 10,
            ATTACHED: 11,
            DETACH: 12,
            DETACHED: 13,
            PRESENCE: 14,
            MESSAGE: 15,
            SYNC: 16,
            AUTH: 17,
          });
          (t.ActionName = []),
            y.arrForEach(y.keysArray(t.Action, !0), function(n) {
              t.ActionName[e[n]] = n;
            });
          var n = { HAS_PRESENCE: 1, HAS_BACKLOG: 2, RESUMED: 4, TRANSIENT: 16, PRESENCE: 65536, PUBLISH: 1 << 17, SUBSCRIBE: 1 << 18, PRESENCE_SUBSCRIBE: 1 << 19 },
            i = y.keysArray(n);
          function r(t) {
            var e = [];
            if (t) for (var n = 0; n < t.length; n++) e.push(t[n].toString());
            return "[ " + e.join(", ") + " ]";
          }
          (n.MODE_ALL = n.PRESENCE | n.PUBLISH | n.SUBSCRIBE | n.PRESENCE_SUBSCRIBE),
            (t.prototype.hasFlag = function(t) {
              return (this.flags & n[t]) > 0;
            }),
            (t.prototype.setFlag = function(t) {
              return (this.flags = this.flags | n[t]);
            }),
            (t.prototype.getMode = function() {
              return this.flags && this.flags & n.MODE_ALL;
            }),
            (t.serialize = y.encodeBody),
            (t.deserialize = function(e, n) {
              var i = y.decodeBody(e, n);
              return t.fromDeserialized(i);
            }),
            (t.fromDeserialized = function(e) {
              var n = e.error;
              n && (e.error = S.fromValues(n));
              var i = e.messages;
              if (i) for (var r = 0; r < i.length; r++) i[r] = _.fromValues(i[r]);
              var o = e.presence;
              if (o) for (r = 0; r < o.length; r++) o[r] = T.fromValues(o[r], !0);
              return y.mixin(new t(), e);
            }),
            (t.fromValues = function(e) {
              return y.mixin(new t(), e);
            });
          var o = "id channel channelSerial connectionId connectionKey connectionSerial count msgSerial timestamp".split(" ");
          return (
            (t.stringify = function(e) {
              var n,
                s = "[ProtocolMessage";
              void 0 !== e.action && (s += "; action=" + t.ActionName[e.action] || !1);
              for (var a = 0; a < o.length; a++) (n = o[a]), void 0 !== e[n] && (s += "; " + n + "=" + e[n]);
              return (
                e.messages && (s += "; messages=" + r(_.fromValuesArray(e.messages))),
                e.presence && (s += "; presence=" + r(T.fromValuesArray(e.presence))),
                e.error && (s += "; error=" + S.fromValues(e.error).toString()),
                e.auth && e.auth.accessToken && (s += "; token=" + e.auth.accessToken),
                e.flags &&
                  (s +=
                    "; flags=" +
                    y
                      .arrFilter(i, function(t) {
                        return e.hasFlag(t);
                      })
                      .join(",")),
                (s += "]")
              );
            }),
            (t.isDuplicate = function(t, n) {
              return t && n && (t.action === e.MESSAGE || t.action === e.PRESENCE) && t.action === n.action && t.channel === n.channel && t.id === n.id;
            }),
            t
          );
        })(),
        M = (function() {
          function t(t) {
            (this.count = (t && t.count) || 0),
              (this.data = (t && t.data) || 0),
              (this.uncompressedData = (t && t.uncompressedData) || 0),
              (this.failed = (t && t.failed) || 0),
              (this.refused = (t && t.refused) || 0);
          }
          function e(e) {
            if ((t.call(this, e), (this.category = void 0), e && e.category))
              for (var n in ((this.category = {}), e.category)) {
                var i = e.category[n];
                Object.prototype.hasOwnProperty.call(e.category, n) && i && (this.category[n] = new t(i));
              }
          }
          function n(t) {
            (this.peak = (t && t.peak) || 0), (this.min = (t && t.min) || 0), (this.mean = (t && t.mean) || 0), (this.opened = (t && t.opened) || 0), (this.refused = (t && t.refused) || 0);
          }
          function i(t) {
            (this.succeeded = (t && t.succeeded) || 0), (this.failed = (t && t.failed) || 0), (this.refused = (t && t.refused) || 0);
          }
          function r(t) {
            (this.plain = new n(t && t.plain)), (this.tls = new n(t && t.tls)), (this.all = new n(t && t.all));
          }
          function o(t) {
            (this.messages = new e(t && t.messages)), (this.presence = new e(t && t.presence)), (this.all = new e(t && t.all));
          }
          function s(t) {
            (this.realtime = new o(t && t.realtime)),
              (this.rest = new o(t && t.rest)),
              (this.webhook = new o(t && t.webhook)),
              (this.sharedQueue = new o(t && t.sharedQueue)),
              (this.externalQueue = new o(t && t.externalQueue)),
              (this.httpEvent = new o(t && t.httpEvent)),
              (this.push = new o(t && t.push)),
              (this.all = new o(t && t.all));
          }
          function a(t) {
            (this.all = new o(t && t.all)), (this.inbound = new s(t && t.inbound)), (this.outbound = new s(t && t.outbound));
          }
          function c(t) {
            (this.all = new o(t && t.all)), (this.producerPaid = new a(t && t.producerPaid)), (this.consumerPaid = new a(t && t.consumerPaid));
          }
          function u(t) {
            this.messages = (t && t.messages) || 0;
            var e = t && t.notifications;
            (this.notifications = { invalid: (e && e.invalid) || 0, attempted: (e && e.attempted) || 0, successful: (e && e.successful) || 0, failed: (e && e.failed) || 0 }),
              (this.directPublishes = (t && t.directPublishes) || 0);
          }
          function h(t) {
            (this.succeeded = (t && t.succeeded) || 0), (this.skipped = (t && t.skipped) || 0), (this.failed = (t && t.failed) || 0);
          }
          function l(t) {
            if (((this.delta = void 0), t && t.delta))
              for (var e in ((this.delta = {}), t.delta)) {
                var n = t.delta[e];
                Object.prototype.hasOwnProperty.call(t.delta, e) && n && (this.delta[e] = new h(n));
              }
          }
          function f(t) {
            a.call(this, t),
              (this.persisted = new o(t && t.persisted)),
              (this.connections = new r(t && t.connections)),
              (this.channels = new n(t && t.channels)),
              (this.apiRequests = new i(t && t.apiRequests)),
              (this.tokenRequests = new i(t && t.tokenRequests)),
              (this.xchgProducer = new c(t && t.xchgProducer)),
              (this.xchgConsumer = new c(t && t.xchgConsumer)),
              (this.push = new u(t && t.pushStats)),
              (this.processed = new l(t && t.processed)),
              (this.inProgress = (t && t.inProgress) || void 0),
              (this.unit = (t && t.unit) || void 0),
              (this.intervalId = (t && t.intervalId) || void 0);
          }
          return (
            (f.fromValues = function(t) {
              return new f(t);
            }),
            f
          );
        })(),
        E = (function() {
          function t() {
            (this.id = void 0),
              (this.deviceSecret = void 0),
              (this.platform = void 0),
              (this.formFactor = void 0),
              (this.clientId = void 0),
              (this.metadata = void 0),
              (this.deviceIdentityToken = void 0),
              (this.push = { recipient: void 0, state: void 0, errorReason: void 0 });
          }
          return (
            (t.prototype.toJSON = function() {
              return {
                id: this.id,
                deviceSecret: this.deviceSecret,
                platform: this.platform,
                formFactor: this.formFactor,
                clientId: this.clientId,
                metadata: this.metadata,
                deviceIdentityToken: this.deviceIdentityToken,
                push: { recipient: this.push.recipient, state: this.push.state, errorReason: this.push.errorReason },
              };
            }),
            (t.prototype.toString = function() {
              var t = "[DeviceDetails";
              return (
                this.id && (t += "; id=" + this.id),
                this.platform && (t += "; platform=" + this.platform),
                this.formFactor && (t += "; formFactor=" + this.formFactor),
                this.clientId && (t += "; clientId=" + this.clientId),
                this.metadata && (t += "; metadata=" + this.metadata),
                this.deviceIdentityToken && (t += "; deviceIdentityToken=" + JSON.stringify(this.deviceIdentityToken)),
                this.push.recipient && (t += "; push.recipient=" + JSON.stringify(this.push.recipient)),
                this.push.state && (t += "; push.state=" + this.push.state),
                this.push.errorReason && (t += "; push.errorReason=" + this.push.errorReason),
                this.push.metadata && (t += "; push.metadata=" + this.push.metadata),
                (t += "]")
              );
            }),
            (t.toRequestBody = y.encodeBody),
            (t.fromResponseBody = function(e, n) {
              return n && (e = y.decodeBody(e, n)), y.isArray(e) ? t.fromValuesArray(e) : t.fromValues(e);
            }),
            (t.fromValues = function(e) {
              return y.mixin(new t(), e);
            }),
            (t.fromValuesArray = function(e) {
              for (var n = e.length, i = new Array(n), r = 0; r < n; r++) i[r] = t.fromValues(e[r]);
              return i;
            }),
            t
          );
        })(),
        k = (function() {
          function t() {
            (this.channel = void 0), (this.deviceId = void 0), (this.clientId = void 0);
          }
          return (
            (t.prototype.toJSON = function() {
              return { channel: this.channel, deviceId: this.deviceId, clientId: this.clientId };
            }),
            (t.prototype.toString = function() {
              var t = "[PushChannelSubscription";
              return this.channel && (t += "; channel=" + this.channel), this.deviceId && (t += "; deviceId=" + this.deviceId), this.clientId && (t += "; clientId=" + this.clientId), (t += "]");
            }),
            (t.toRequestBody = y.encodeBody),
            (t.fromResponseBody = function(e, n) {
              return n && (e = y.decodeBody(e, n)), y.isArray(e) ? t.fromValuesArray(e) : t.fromValues(e);
            }),
            (t.fromValues = function(e) {
              return y.mixin(new t(), e);
            }),
            (t.fromValuesArray = function(e) {
              for (var n = e.length, i = new Array(n), r = 0; r < n; r++) i[r] = t.fromValues(e[r]);
              return i;
            }),
            t
          );
        })(),
        P = {
          disconnected: S.fromValues({ statusCode: 400, code: 80003, message: "Connection to server temporarily unavailable" }),
          suspended: S.fromValues({ statusCode: 400, code: 80002, message: "Connection to server unavailable" }),
          failed: S.fromValues({ statusCode: 400, code: 8e4, message: "Connection failed or disconnected by server" }),
          closing: S.fromValues({ statusCode: 400, code: 80017, message: "Connection closing" }),
          closed: S.fromValues({ statusCode: 400, code: 80017, message: "Connection closed" }),
          unknownConnectionErr: S.fromValues({ statusCode: 500, code: 50002, message: "Internal connection error" }),
          unknownChannelErr: S.fromValues({ statusCode: 500, code: 50001, message: "Internal channel error" }),
        },
        L = (function() {
          function t() {
            A.call(this), (this.messages = []);
          }
          return (
            y.inherits(t, A),
            (t.prototype.count = function() {
              return this.messages.length;
            }),
            (t.prototype.push = function(t) {
              this.messages.push(t);
            }),
            (t.prototype.shift = function() {
              return this.messages.shift();
            }),
            (t.prototype.last = function() {
              return this.messages[this.messages.length - 1];
            }),
            (t.prototype.copyAll = function() {
              return this.messages.slice();
            }),
            (t.prototype.append = function(t) {
              this.messages.push.apply(this.messages, t);
            }),
            (t.prototype.prepend = function(t) {
              this.messages.unshift.apply(this.messages, t);
            }),
            (t.prototype.completeMessages = function(t, e, n) {
              b.logAction(b.LOG_MICRO, "MessageQueue.completeMessages()", "serial = " + t + "; count = " + e), (n = n || null);
              var i = this.messages,
                r = i[0];
              if (r) {
                var o = r.message.msgSerial,
                  s = t + e;
                if (s > o) for (var a = i.splice(0, s - o), c = 0; c < a.length; c++) a[c].callback(n);
                0 == i.length && this.emit("idle");
              }
            }),
            (t.prototype.completeAllMessages = function(t) {
              this.completeMessages(0, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, t);
            }),
            (t.prototype.clear = function() {
              b.logAction(b.LOG_MICRO, "MessageQueue.clear()", "clearing " + this.messages.length + " messages"), (this.messages = []), this.emit("idle");
            }),
            t
          );
        })(),
        x = (function() {
          var t = I.Action;
          function e(t) {
            A.call(this), (this.transport = t), (this.messageQueue = new L());
            var e = this;
            t.on("ack", function(t, n) {
              e.onAck(t, n);
            }),
              t.on("nack", function(t, n, i) {
                e.onNack(t, n, i);
              });
          }
          return (
            y.inherits(e, A),
            (e.prototype.onAck = function(t, e) {
              b.logAction(b.LOG_MICRO, "Protocol.onAck()", "serial = " + t + "; count = " + e), this.messageQueue.completeMessages(t, e);
            }),
            (e.prototype.onNack = function(t, e, n) {
              b.logAction(b.LOG_ERROR, "Protocol.onNack()", "serial = " + t + "; count = " + e + "; err = " + y.inspectError(n)),
                n || (n = new S("Unable to send message; channel not responding", 50001, 500)),
                this.messageQueue.completeMessages(t, e, n);
            }),
            (e.prototype.onceIdle = function(t) {
              var e = this.messageQueue;
              0 !== e.count() ? e.once("idle", t) : t();
            }),
            (e.prototype.send = function(t) {
              t.ackRequired && this.messageQueue.push(t),
                b.shouldLog(b.LOG_MICRO) && b.logAction(b.LOG_MICRO, "Protocol.send()", "sending msg; " + I.stringify(t.message)),
                (t.sendAttempted = !0),
                this.transport.send(t.message);
            }),
            (e.prototype.getTransport = function() {
              return this.transport;
            }),
            (e.prototype.getPendingMessages = function() {
              return this.messageQueue.copyAll();
            }),
            (e.prototype.clearPendingMessages = function() {
              return this.messageQueue.clear();
            }),
            (e.prototype.finish = function() {
              var t = this.transport;
              this.onceIdle(function() {
                t.disconnect();
              });
            }),
            (e.PendingMessage = function(e, n) {
              (this.message = e), (this.callback = n), (this.merged = !1);
              var i = e.action;
              (this.sendAttempted = !1), (this.ackRequired = i == t.MESSAGE || i == t.PRESENCE);
            }),
            e
          );
        })(),
        U = (function() {
          var t = !(void 0 === d || !d.get),
            e = !(void 0 === d || !d.getSession),
            n = I.Action,
            i = x.PendingMessage,
            r = function() {},
            o = g.transportPreferenceOrder,
            a = o[o.length - 1],
            c = "ably-connection-recovery";
          function u(t, e, n, i) {
            (this.options = t),
              (this.host = e),
              (this.mode = n),
              (this.connectionKey = i),
              (this.format = t.useBinaryProtocol ? "msgpack" : "json"),
              (this.connectionSerial = void 0),
              (this.timeSerial = void 0);
          }
          function h(t, n) {
            A.call(this), (this.realtime = t), (this.options = n);
            var i = n.timeouts,
              r = this,
              o = i.preferenceConnectTimeout + i.realtimeRequestTimeout;
            if (
              ((this.states = {
                initialized: { state: "initialized", terminal: !1, queueEvents: !0, sendEvents: !1, failState: "disconnected" },
                connecting: { state: "connecting", terminal: !1, queueEvents: !0, sendEvents: !1, retryDelay: o, failState: "disconnected" },
                connected: { state: "connected", terminal: !1, queueEvents: !1, sendEvents: !0, failState: "disconnected" },
                synchronizing: { state: "connected", terminal: !1, queueEvents: !0, sendEvents: !1, forceQueueEvents: !0, failState: "disconnected" },
                disconnected: { state: "disconnected", terminal: !1, queueEvents: !0, sendEvents: !1, retryDelay: i.disconnectedRetryTimeout, failState: "disconnected" },
                suspended: { state: "suspended", terminal: !1, queueEvents: !1, sendEvents: !1, retryDelay: i.suspendedRetryTimeout, failState: "suspended" },
                closing: { state: "closing", terminal: !1, queueEvents: !1, sendEvents: !1, retryDelay: i.realtimeRequestTimeout, failState: "closed" },
                closed: { state: "closed", terminal: !0, queueEvents: !1, sendEvents: !1, failState: "closed" },
                failed: { state: "failed", terminal: !0, queueEvents: !1, sendEvents: !1, failState: "failed" },
              }),
              (this.state = this.states.initialized),
              (this.errorReason = null),
              (this.queuedMessages = new L()),
              (this.msgSerial = 0),
              (this.connectionDetails = void 0),
              (this.connectionId = void 0),
              (this.connectionKey = void 0),
              (this.timeSerial = void 0),
              (this.connectionSerial = void 0),
              (this.connectionStateTtl = i.connectionStateTtl),
              (this.maxIdleInterval = null),
              (this.transports = y.intersect(n.transports || g.defaultTransports, h.supportedTransports)),
              (this.baseTransport = y.intersect(g.baseTransportOrder, this.transports)[0]),
              (this.upgradeTransports = y.intersect(this.transports, g.upgradeTransports)),
              (this.transportPreference = null),
              (this.httpHosts = g.getHosts(n)),
              (this.activeProtocol = null),
              (this.proposedTransports = []),
              (this.pendingTransports = []),
              (this.host = null),
              (this.lastAutoReconnectAttempt = null),
              (this.lastActivity = null),
              (this.mostRecentMsg = null),
              (this.forceFallbackHost = !1),
              (this.connectCounter = 0),
              b.logAction(b.LOG_MINOR, "Realtime.ConnectionManager()", "started"),
              b.logAction(b.LOG_MICRO, "Realtime.ConnectionManager()", "requested transports = [" + (n.transports || g.defaultTransports) + "]"),
              b.logAction(b.LOG_MICRO, "Realtime.ConnectionManager()", "available transports = [" + this.transports + "]"),
              b.logAction(b.LOG_MICRO, "Realtime.ConnectionManager()", "http hosts = [" + this.httpHosts + "]"),
              !this.transports.length)
            ) {
              var s = "no requested transports available";
              throw (b.logAction(b.LOG_ERROR, "realtime.ConnectionManager()", s), new Error(s));
            }
            var a = f.addEventListener;
            a &&
              (e && "function" == typeof n.recover && a("beforeunload", this.persistConnection.bind(this)),
              !0 === n.closeOnUnload &&
                a("beforeunload", function() {
                  b.logAction(b.LOG_MAJOR, "Realtime.ConnectionManager()", "beforeunload event has triggered the connection to close as closeOnUnload is true"), r.requestState({ state: "closing" });
                }),
              a("online", function() {
                (r.state != r.states.disconnected && r.state != r.states.suspended) ||
                  (b.logAction(b.LOG_MINOR, "ConnectionManager caught browser â€˜onlineâ€™ event", "reattempting connection"), r.requestState({ state: "connecting" }));
              }),
              a("offline", function() {
                r.state == r.states.connected && (b.logAction(b.LOG_MINOR, "ConnectionManager caught browser â€˜offlineâ€™ event", "disconnecting active transport"), r.disconnectAllTransports());
              }));
          }
          return (
            (u.prototype.getConnectParams = function(t) {
              var e = t ? y.copy(t) : {},
                n = this.options;
              switch (this.mode) {
                case "upgrade":
                  e.upgrade = this.connectionKey;
                  break;
                case "resume":
                  (e.resume = this.connectionKey), void 0 !== this.timeSerial ? (e.timeSerial = this.timeSerial) : void 0 !== this.connectionSerial && (e.connectionSerial = this.connectionSerial);
                  break;
                case "recover":
                  var i = n.recover.split(":");
                  if (i) {
                    e.recover = i[0];
                    var r = i[1];
                    isNaN(r) ? (e.timeSerial = r) : (e.connectionSerial = r);
                  }
              }
              return (
                void 0 !== n.clientId && (e.clientId = n.clientId),
                !1 === n.echoMessages && (e.echo = "false"),
                void 0 !== this.format && (e.format = this.format),
                void 0 !== this.stream && (e.stream = this.stream),
                void 0 !== this.heartbeats && (e.heartbeats = this.heartbeats),
                (e.v = g.apiVersion),
                (e.lib = g.libstring),
                void 0 !== n.transportParams && y.mixin(e, n.transportParams),
                e
              );
            }),
            (u.prototype.toString = function() {
              var t = "[mode=" + this.mode;
              return (
                this.host && (t += ",host=" + this.host),
                this.connectionKey && (t += ",connectionKey=" + this.connectionKey),
                void 0 !== this.connectionSerial && (t += ",connectionSerial=" + this.connectionSerial),
                this.timeSerial && (t += ",timeSerial=" + this.timeSerial),
                this.format && (t += ",format=" + this.format),
                (t += "]")
              );
            }),
            y.inherits(h, A),
            (h.supportedTransports = {}),
            (h.prototype.createTransportParams = function(t, e) {
              var n = new u(this.options, t, e, this.connectionKey);
              return this.timeSerial ? (n.timeSerial = this.timeSerial) : void 0 !== this.connectionSerial && (n.connectionSerial = this.connectionSerial), n;
            }),
            (h.prototype.getTransportParams = function(t) {
              var n = this;
              !(function(t) {
                if (n.connectionKey) t("resume");
                else if ("string" != typeof n.options.recover) {
                  var i = n.options.recover,
                    r = e && d.getSession(c);
                  if (r && "function" == typeof i)
                    return (
                      b.logAction(b.LOG_MINOR, "ConnectionManager.getTransportParams()", "Calling clientOptions-provided recover function with last session data"),
                      void i(r, function(e) {
                        e ? ((n.options.recover = r.recoveryKey), t("recover")) : t("clean");
                      })
                    );
                  t("clean");
                } else t("recover");
              })(function(e) {
                var i = n.createTransportParams(null, e);
                if ("recover" === e) {
                  b.logAction(b.LOG_MINOR, "ConnectionManager.getTransportParams()", "Transport recovery mode = recover; recoveryKey = " + n.options.recover);
                  var r = n.options.recover.split(":");
                  r && r[2] && (n.msgSerial = r[2]);
                } else b.logAction(b.LOG_MINOR, "ConnectionManager.getTransportParams()", "Transport params = " + i.toString());
                t(i);
              });
            }),
            (h.prototype.tryATransport = function(t, e, n) {
              var i = this;
              t.host;
              b.logAction(b.LOG_MICRO, "ConnectionManager.tryATransport()", "trying " + e),
                h.supportedTransports[e].tryConnect(this, this.realtime.auth, t, function(r, o) {
                  var s = i.state;
                  return s == i.states.closing || s == i.states.closed || s == i.states.failed
                    ? (o && (b.logAction(b.LOG_MINOR, "ConnectionManager.tryATransport()", "connection " + s.state + " while we were attempting the transport; closing " + o), o.close()), void n(!0))
                    : r
                    ? (b.logAction(b.LOG_MINOR, "ConnectionManager.tryATransport()", "transport " + e + " " + r.event + ", err: " + r.error.toString()),
                      void (H.isTokenErr(r.error)
                        ? i.realtime.auth._forceNewToken(null, null, function(r) {
                            r ? i.actOnErrorFromAuthorize(r) : i.tryATransport(t, e, n);
                          })
                        : "failed" === r.event
                        ? (i.notifyState({ state: "failed", error: r.error }), n(!0))
                        : "disconnected" === r.event && n(!1)))
                    : (b.logAction(b.LOG_MICRO, "ConnectionManager.tryATransport()", "viable transport " + e + "; setting pending"), i.setTransportPending(o, t), void n(null, o));
                });
            }),
            (h.prototype.setTransportPending = function(t, e) {
              var n = e.mode;
              b.logAction(b.LOG_MINOR, "ConnectionManager.setTransportPending()", "transport = " + t + "; mode = " + n), y.arrDeleteValue(this.proposedTransports, t), this.pendingTransports.push(t);
              var i = this;
              t.once("connected", function(r, o, s, c) {
                "upgrade" == n && i.activeProtocol
                  ? t.shortName !== a && y.arrIn(i.getUpgradePossibilities(), a)
                    ? setTimeout(function() {
                        i.scheduleTransportActivation(r, t, o, s, c);
                      }, i.options.timeouts.parallelUpgradeDelay)
                    : i.scheduleTransportActivation(r, t, o, s, c)
                  : (i.activateTransport(r, t, o, s, c),
                    y.nextTick(function() {
                      i.connectImpl(e);
                    })),
                  "recover" === n && i.options.recover && ((i.options.recover = null), i.unpersistConnection());
              }),
                t.on(["disconnected", "closed", "failed"], function(e) {
                  i.deactivateTransport(t, this.event, e);
                }),
                this.emit("transport.pending", t);
            }),
            (h.prototype.scheduleTransportActivation = function(t, e, n, i, r) {
              var s,
                a,
                c = this,
                u = this.activeProtocol && this.activeProtocol.getTransport(),
                h = function() {
                  e.disconnect(), y.arrDeleteValue(c.pendingTransports, e);
                };
              return this.state !== this.states.connected && this.state !== this.states.connecting
                ? (b.logAction(
                    b.LOG_MINOR,
                    "ConnectionManager.scheduleTransportActivation()",
                    "Current connection state (" +
                      this.state.state +
                      (this.state === this.states.synchronizing ? ", but with an upgrade already in progress" : "") +
                      ") is not valid to upgrade in; abandoning upgrade to " +
                      e.shortName,
                  ),
                  void h())
                : !u || ((s = e), (a = u), y.arrIndexOf(o, s.shortName) > y.arrIndexOf(o, a.shortName))
                ? (b.logAction(b.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Scheduling transport upgrade; transport = " + e),
                  void this.realtime.channels.onceNopending(function(o) {
                    var s;
                    if (o) b.logAction(b.LOG_ERROR, "ConnectionManager.scheduleTransportActivation()", "Unable to activate transport; transport = " + e + "; err = " + o);
                    else {
                      if (!e.isConnected)
                        return (
                          b.logAction(b.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Proposed transport " + e.shortName + "is no longer connected; abandoning upgrade"), void h()
                        );
                      if (c.state === c.states.connected)
                        b.logAction(b.LOG_MICRO, "ConnectionManager.scheduleTransportActivation()", "Currently connected, so temporarily pausing events until the upgrade is complete"),
                          (c.state = c.states.synchronizing),
                          (s = c.activeProtocol);
                      else if (c.state !== c.states.connecting)
                        return (
                          b.logAction(
                            b.LOG_MINOR,
                            "ConnectionManager.scheduleTransportActivation()",
                            "Current connection state (" +
                              c.state.state +
                              (c.state === c.states.synchronizing ? ", but with an upgrade already in progress" : "") +
                              ") is not valid to upgrade in; abandoning upgrade to " +
                              e.shortName,
                          ),
                          void h()
                        );
                      var a = n !== c.connectionId,
                        u = a ? r : c;
                      a &&
                        b.logAction(
                          b.LOG_ERROR,
                          "ConnectionManager.scheduleTransportActivation()",
                          "Upgrade resulted in new connectionId; resetting library connection position from " +
                            (c.timeSerial || c.connectionSerial) +
                            " to " +
                            (u.timeSerial || u.connectionSerial) +
                            "; upgrade error was " +
                            t,
                        ),
                        b.logAction(b.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Syncing transport; transport = " + e),
                        c.sync(e, u, function(n, r, o) {
                          if (n)
                            c.state === c.states.synchronizing &&
                              (b.logAction(b.LOG_ERROR, "ConnectionManager.scheduleTransportActivation()", "Unexpected error attempting to sync transport; transport = " + e + "; err = " + n),
                              c.disconnectAllTransports());
                          else {
                            var a = function() {
                              b.logAction(b.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Activating transport; transport = " + e),
                                c.activateTransport(t, e, r, i, o),
                                c.state === c.states.synchronizing
                                  ? (b.logAction(
                                      b.LOG_MICRO,
                                      "ConnectionManager.scheduleTransportActivation()",
                                      "Pre-upgrade protocol idle, sending queued messages on upgraded transport; transport = " + e,
                                    ),
                                    (c.state = c.states.connected))
                                  : b.logAction(
                                      b.LOG_MINOR,
                                      "ConnectionManager.scheduleTransportActivation()",
                                      "Pre-upgrade protocol idle, but state is now " + c.state.state + ", so leaving unchanged",
                                    ),
                                c.state.sendEvents && c.sendQueuedMessages();
                            };
                            s ? s.onceIdle(a) : a();
                          }
                        });
                    }
                  }))
                : (b.logAction(
                    b.LOG_MINOR,
                    "ConnectionManager.scheduleTransportActivation()",
                    "Proposed transport " + e.shortName + " is no better than current active transport " + u.shortName + " - abandoning upgrade",
                  ),
                  void h());
            }),
            (h.prototype.activateTransport = function(t, e, n, i, r) {
              b.logAction(b.LOG_MINOR, "ConnectionManager.activateTransport()", "transport = " + e),
                t && b.logAction(b.LOG_ERROR, "ConnectionManager.activateTransport()", "error = " + t),
                n && b.logAction(b.LOG_MICRO, "ConnectionManager.activateTransport()", "connectionId =  " + n),
                i && b.logAction(b.LOG_MICRO, "ConnectionManager.activateTransport()", "connectionDetails =  " + JSON.stringify(i)),
                r && b.logAction(b.LOG_MICRO, "ConnectionManager.activateTransport()", "serial =  " + (r.timeSerial || r.connectionSerial)),
                this.persistTransportPreference(e);
              var o = this.state,
                s = this.states.connected.state;
              if (
                (b.logAction(b.LOG_MINOR, "ConnectionManager.activateTransport()", "current state = " + o.state),
                o.state == this.states.closing.state || o.state == this.states.closed.state || o.state == this.states.failed.state)
              )
                return b.logAction(b.LOG_MINOR, "ConnectionManager.activateTransport()", "Disconnecting transport and abandoning"), e.disconnect(), !1;
              if ((y.arrDeleteValue(this.pendingTransports, e), !e.isConnected))
                return b.logAction(b.LOG_MINOR, "ConnectionManager.activateTransport()", "Declining to activate transport " + e + " since it appears to no longer be connected"), !1;
              var a = this.activeProtocol;
              (this.activeProtocol = new x(e)), (this.host = e.params.host);
              var c = i.connectionKey;
              c && this.connectionKey != c && this.setConnection(n, i, r, !!t), this.onConnectionDetailsUpdate(i, e);
              var u = this;
              if (
                (y.nextTick(function() {
                  e.on("connected", function(t, n, i) {
                    u.onConnectionDetailsUpdate(i, e), u.emit("update", new F(s, s, null, t));
                  });
                }),
                o.state === this.states.connected.state
                  ? t && ((this.errorReason = this.realtime.connection.errorReason = t), this.emit("update", new F(s, s, null, t)))
                  : (this.notifyState({ state: "connected", error: t }), (this.errorReason = this.realtime.connection.errorReason = t || null)),
                this.emit("transport.active", e),
                a)
              )
                if (
                  (a.messageQueue.count() > 0 &&
                    b.logAction(
                      b.LOG_ERROR,
                      "ConnectionManager.activateTransport()",
                      "Previous active protocol (for transport " + a.transport.shortName + ", new one is " + e.shortName + ") finishing with " + a.messageQueue.count() + " messages still pending",
                    ),
                  a.transport === e)
                ) {
                  var h = "Assumption violated: activating a transport that was also the transport for the previous active protocol; transport = " + e.shortName + "; stack = " + new Error().stack;
                  b.logAction(b.LOG_ERROR, "ConnectionManager.activateTransport()", h), C.report("error", h, "transport-previously-active");
                } else a.finish();
              return (
                y.safeArrForEach(this.pendingTransports, function(t) {
                  if (t === e) {
                    var n = "Assumption violated: activating a transport that is still marked as a pending transport; transport = " + e.shortName + "; stack = " + new Error().stack;
                    b.logAction(b.LOG_ERROR, "ConnectionManager.activateTransport()", n), C.report("error", n, "transport-activating-pending"), y.arrDeleteValue(u.pendingTransports, e);
                  } else t.disconnect();
                }),
                y.safeArrForEach(this.proposedTransports, function(t) {
                  if (t === e) {
                    var n = "Assumption violated: activating a transport that is still marked as a proposed transport; transport = " + e.shortName + "; stack = " + new Error().stack;
                    b.logAction(b.LOG_ERROR, "ConnectionManager.activateTransport()", n), C.report("error", n, "transport-activating-proposed"), y.arrDeleteValue(u.proposedTransports, e);
                  } else t.dispose();
                }),
                !0
              );
            }),
            (h.prototype.deactivateTransport = function(t, e, n) {
              var i = this.activeProtocol,
                r = i && i.getTransport() === t,
                o = y.arrDeleteValue(this.pendingTransports, t),
                s = y.arrDeleteValue(this.proposedTransports, t),
                a = this.noTransportsScheduledForActivation();
              if (
                (b.logAction(b.LOG_MINOR, "ConnectionManager.deactivateTransport()", "transport = " + t),
                b.logAction(
                  b.LOG_MINOR,
                  "ConnectionManager.deactivateTransport()",
                  "state = " + e + (r ? "; was active" : o ? "; was pending" : s ? "; was proposed" : "") + (a ? "" : "; another transport is scheduled for activation"),
                ),
                n && n.message && b.logAction(b.LOG_MICRO, "ConnectionManager.deactivateTransport()", "reason =  " + n.message),
                r &&
                  (b.logAction(b.LOG_MICRO, "ConnectionManager.deactivateTransport()", "Getting, clearing, and requeuing " + this.activeProtocol.messageQueue.count() + " pending messages"),
                  this.queuePendingMessages(i.getPendingMessages()),
                  y.nextTick(function() {
                    i.clearPendingMessages();
                  }),
                  (this.activeProtocol = this.host = null),
                  clearTimeout(this.channelResumeCheckTimer)),
                this.emit("transport.inactive", t),
                (r && a) || (r && "failed" === e) || "closed" === e || (null === i && o && 0 === this.pendingTransports.length))
              ) {
                if ("disconnected" === e && n && n.statusCode > 500 && this.httpHosts.length > 1)
                  return this.unpersistTransportPreference(), (this.forceFallbackHost = !0), void this.notifyState({ state: e, error: n, retryImmediately: !0 });
                var c = "failed" === e && H.isTokenErr(n) ? "disconnected" : e;
                this.notifyState({ state: c, error: n });
              } else
                r &&
                  "disconnected" === e &&
                  this.state !== this.states.synchronizing &&
                  (b.logAction(
                    b.LOG_MICRO,
                    "ConnectionManager.deactivateTransport()",
                    "wasActive but another transport is connected and scheduled for activation, so going into the connecting state until it activates",
                  ),
                  this.startSuspendTimer(),
                  this.startTransitionTimer(this.states.connecting),
                  this.notifyState({ state: "connecting", error: n }));
            }),
            (h.prototype.noTransportsScheduledForActivation = function() {
              return (
                y.isEmpty(this.pendingTransports) ||
                this.pendingTransports.every(function(t) {
                  return !t.isConnected;
                })
              );
            }),
            (h.prototype.sync = function(t, e, i) {
              var r = setTimeout(function() {
                  t.off("sync"), i(new S("Timeout waiting for sync response", 5e4, 500));
                }, this.options.timeouts.realtimeRequestTimeout),
                o = I.fromValues({ action: n.SYNC, connectionKey: this.connectionKey });
              e.timeSerial ? (o.timeSerial = e.timeSerial) : void 0 !== e.connectionSerial && (o.connectionSerial = e.connectionSerial),
                t.send(o),
                t.once("sync", function(t, e) {
                  clearTimeout(r), i(null, t, e);
                });
            }),
            (h.prototype.setConnection = function(t, e, n, i) {
              var r = this,
                o = this.connectionid,
                s = o && o !== t;
              (s || (!o && i)) && (b.logAction(b.LOG_MINOR, "ConnectionManager.setConnection()", "Resetting msgSerial"), (this.msgSerial = 0)),
                this.connectionId !== t
                  ? (b.logAction(b.LOG_MINOR, "ConnectionManager.setConnection()", "New connectionId; reattaching any attached channels"),
                    y.nextTick(function() {
                      r.realtime.channels.reattach();
                    }))
                  : this.options.checkChannelsOnResume &&
                    (b.logAction(b.LOG_MINOR, "ConnectionManager.setConnection()", "Same connectionId; checkChannelsOnResume is enabled"),
                    clearTimeout(this.channelResumeCheckTimer),
                    this.realtime.channels.resetAttachedMsgIndicators(),
                    (this.channelResumeCheckTimer = setTimeout(function() {
                      r.realtime.channels.checkAttachedMsgIndicators(t);
                    }, 3e4))),
                (this.realtime.connection.id = this.connectionId = t),
                (this.realtime.connection.key = this.connectionKey = e.connectionKey);
              var a = s || !o;
              this.setConnectionSerial(n, a);
            }),
            (h.prototype.clearConnection = function() {
              (this.realtime.connection.id = this.connectionId = void 0),
                (this.realtime.connection.key = this.connectionKey = void 0),
                this.clearConnectionSerial(),
                (this.msgSerial = 0),
                this.unpersistConnection();
            }),
            (h.prototype.setConnectionSerial = function(t, e) {
              var n = t.timeSerial,
                i = t.connectionSerial;
              if (
                (b.logAction(
                  b.LOG_MICRO,
                  "ConnectionManager.setConnectionSerial()",
                  "Updating connection serial; serial = " + i + "; timeSerial = " + n + "; force = " + e + "; previous = " + this.connectionSerial,
                ),
                void 0 !== n)
              )
                return n <= this.timeSerial && !e
                  ? (b.logAction(
                      b.LOG_ERROR,
                      "ConnectionManager.setConnectionSerial()",
                      "received message with timeSerial " + n + ", but current timeSerial is " + this.timeSerial + "; assuming message is a duplicate and discarding it",
                    ),
                    !0)
                  : ((this.realtime.connection.timeSerial = this.timeSerial = n), void this.setRecoveryKey());
              if (void 0 !== i) {
                if (i <= this.connectionSerial && !e)
                  return (
                    b.logAction(
                      b.LOG_ERROR,
                      "ConnectionManager.setConnectionSerial()",
                      "received message with connectionSerial " + i + ", but current connectionSerial is " + this.connectionSerial + "; assuming message is a duplicate and discarding it",
                    ),
                    !0
                  );
                (this.realtime.connection.serial = this.connectionSerial = i), this.setRecoveryKey();
              }
            }),
            (h.prototype.clearConnectionSerial = function() {
              (this.realtime.connection.serial = this.connectionSerial = void 0), (this.realtime.connection.timeSerial = this.timeSerial = void 0), this.clearRecoveryKey();
            }),
            (h.prototype.setRecoveryKey = function() {
              this.realtime.connection.recoveryKey = this.connectionKey + ":" + (this.timeSerial || this.connectionSerial) + ":" + this.msgSerial;
            }),
            (h.prototype.clearRecoveryKey = function() {
              this.realtime.connection.recoveryKey = null;
            }),
            (h.prototype.checkConnectionStateFreshness = function() {
              if (this.lastActivity && this.connectionId) {
                var t = y.now() - this.lastActivity;
                t > this.connectionStateTtl + this.maxIdleInterval &&
                  (b.logAction(b.LOG_MINOR, "ConnectionManager.checkConnectionStateFreshness()", "Last known activity from realtime was " + t + "ms ago; discarding connection state"),
                  this.clearConnection(),
                  (this.states.connecting.failState = "suspended"),
                  (this.states.connecting.queueEvents = !1));
              }
            }),
            (h.prototype.persistConnection = function() {
              if (e) {
                var t = this.realtime.connection.recoveryKey;
                t && ((n = { recoveryKey: t, disconnectedAt: y.now(), location: s.location, clientId: this.realtime.auth.clientId }), this.connectionStateTtl, e && d.setSession(c, n));
              }
              var n;
            }),
            (h.prototype.unpersistConnection = function() {
              e && d.removeSession(c);
            }),
            (h.prototype.getError = function() {
              return this.errorReason || this.getStateError();
            }),
            (h.prototype.getStateError = function() {
              return P[this.state.state];
            }),
            (h.prototype.activeState = function() {
              return this.state.queueEvents || this.state.sendEvents;
            }),
            (h.prototype.enactStateChange = function(t) {
              var e = "failed" === t.current ? b.LOG_ERROR : b.LOG_MAJOR;
              b.logAction(e, "Connection state", t.current + (t.reason ? "; reason: " + t.reason : "")),
                b.logAction(b.LOG_MINOR, "ConnectionManager.enactStateChange", "setting new state: " + t.current + "; reason = " + (t.reason && t.reason.message));
              var n = (this.state = this.states[t.current]);
              t.reason && ((this.errorReason = t.reason), (this.realtime.connection.errorReason = t.reason)),
                (n.terminal || "suspended" === n.state) && this.clearConnection(),
                this.emit("connectionstate", t);
            }),
            (h.prototype.startTransitionTimer = function(t) {
              b.logAction(b.LOG_MINOR, "ConnectionManager.startTransitionTimer()", "transitionState: " + t.state),
                this.transitionTimer && (b.logAction(b.LOG_MINOR, "ConnectionManager.startTransitionTimer()", "clearing already-running timer"), clearTimeout(this.transitionTimer));
              var e = this;
              this.transitionTimer = setTimeout(function() {
                e.transitionTimer &&
                  ((e.transitionTimer = null),
                  b.logAction(b.LOG_MINOR, "ConnectionManager " + t.state + " timer expired", "requesting new state: " + t.failState),
                  e.notifyState({ state: t.failState }));
              }, t.retryDelay);
            }),
            (h.prototype.cancelTransitionTimer = function() {
              b.logAction(b.LOG_MINOR, "ConnectionManager.cancelTransitionTimer()", ""), this.transitionTimer && (clearTimeout(this.transitionTimer), (this.transitionTimer = null));
            }),
            (h.prototype.startSuspendTimer = function() {
              var t = this;
              this.suspendTimer ||
                (this.suspendTimer = setTimeout(function() {
                  t.suspendTimer &&
                    ((t.suspendTimer = null),
                    b.logAction(b.LOG_MINOR, "ConnectionManager suspend timer expired", "requesting new state: suspended"),
                    (t.states.connecting.failState = "suspended"),
                    (t.states.connecting.queueEvents = !1),
                    t.notifyState({ state: "suspended" }));
                }, this.connectionStateTtl));
            }),
            (h.prototype.checkSuspendTimer = function(t) {
              "disconnected" !== t && "suspended" !== t && "connecting" !== t && this.cancelSuspendTimer();
            }),
            (h.prototype.cancelSuspendTimer = function() {
              (this.states.connecting.failState = "disconnected"), (this.states.connecting.queueEvents = !0), this.suspendTimer && (clearTimeout(this.suspendTimer), (this.suspendTimer = null));
            }),
            (h.prototype.startRetryTimer = function(t) {
              var e = this;
              this.retryTimer = setTimeout(function() {
                b.logAction(b.LOG_MINOR, "ConnectionManager retry timer expired", "retrying"), (e.retryTimer = null), e.requestState({ state: "connecting" });
              }, t);
            }),
            (h.prototype.cancelRetryTimer = function() {
              this.retryTimer && (clearTimeout(this.retryTimer), (this.retryTimer = null));
            }),
            (h.prototype.notifyState = function(t) {
              var e = t.state,
                n = this,
                i =
                  "disconnected" === e &&
                  (this.state === this.states.connected ||
                    this.state === this.states.synchronizing ||
                    t.retryImmediately ||
                    (this.state === this.states.connecting && t.error && H.isTokenErr(t.error) && !(this.errorReason && H.isTokenErr(this.errorReason))));
              if (
                (b.logAction(b.LOG_MINOR, "ConnectionManager.notifyState()", "new state: " + e + (i ? "; will retry connection immediately" : "")),
                e != this.state.state && (this.cancelTransitionTimer(), this.cancelRetryTimer(), this.checkSuspendTimer(t.state), !this.state.terminal))
              ) {
                var r = this.states[t.state],
                  o = new F(this.state.state, r.state, r.retryDelay, t.error || P[r.state]);
                if (i) {
                  var s = function() {
                      n.state === n.states.disconnected && ((n.lastAutoReconnectAttempt = y.now()), n.requestState({ state: "connecting" }));
                    },
                    a = this.lastAutoReconnectAttempt && y.now() - this.lastAutoReconnectAttempt + 1;
                  a && a < 1e3
                    ? (b.logAction(b.LOG_MICRO, "ConnectionManager.notifyState()", "Last reconnect attempt was only " + a + "ms ago, waiting another " + (1e3 - a) + "ms before trying again"),
                      setTimeout(s, 1e3 - a))
                    : y.nextTick(s);
                } else ("disconnected" !== e && "suspended" !== e) || this.startRetryTimer(r.retryDelay);
                (("disconnected" === e && !i) || "suspended" === e || r.terminal) &&
                  y.nextTick(function() {
                    n.disconnectAllTransports();
                  }),
                  "connected" != e ||
                    this.activeProtocol ||
                    b.logAction(b.LOG_ERROR, "ConnectionManager.notifyState()", "Broken invariant: attempted to go into connected state, but there is no active protocol"),
                  this.enactStateChange(o),
                  this.state.sendEvents
                    ? this.sendQueuedMessages()
                    : this.state.queueEvents || (this.realtime.channels.propogateConnectionInterruption(e, o.reason), this.failQueuedMessages(o.reason));
              }
            }),
            (h.prototype.requestState = function(t) {
              var e = t.state,
                n = this;
              if (
                (b.logAction(b.LOG_MINOR, "ConnectionManager.requestState()", "requested state: " + e + "; current state: " + this.state.state),
                e != this.state.state &&
                  (this.cancelTransitionTimer(),
                  this.cancelRetryTimer(),
                  this.checkSuspendTimer(e),
                  !(("connecting" == e && "connected" == this.state.state) || ("closing" == e && "closed" == this.state.state))))
              ) {
                var i = this.states[e],
                  r = new F(this.state.state, i.state, null, t.error || P[i.state]);
                this.enactStateChange(r),
                  "connecting" == e &&
                    y.nextTick(function() {
                      n.startConnect();
                    }),
                  "closing" == e && this.closeImpl();
              }
            }),
            (h.prototype.startConnect = function() {
              if (this.state === this.states.connecting) {
                var t = this.realtime.auth,
                  e = this,
                  n = ++this.connectCounter,
                  i = function() {
                    e.checkConnectionStateFreshness(),
                      e.getTransportParams(function(t) {
                        n === e.connectCounter && e.connectImpl(t, n);
                      });
                  };
                if (
                  (b.logAction(b.LOG_MINOR, "ConnectionManager.startConnect()", "starting connection"),
                  this.startSuspendTimer(),
                  this.startTransitionTimer(this.states.connecting),
                  "basic" === t.method)
                )
                  i();
                else {
                  var r = function(t) {
                    n === e.connectCounter && (t ? e.actOnErrorFromAuthorize(t) : i());
                  };
                  this.errorReason && H.isTokenErr(this.errorReason) ? t._forceNewToken(null, null, r) : t._ensureValidAuthCredentials(!1, r);
                }
              } else b.logAction(b.LOG_MINOR, "ConnectionManager.startConnect()", "Must be in connecting state to connect, but was " + this.state.state);
            }),
            (h.prototype.connectImpl = function(t, e) {
              var n = this.state.state;
              n !== this.states.connecting.state && n !== this.states.connected.state
                ? b.logAction(b.LOG_MINOR, "ConnectionManager.connectImpl()", "Must be in connecting state to connect (or connected to upgrade), but was " + n)
                : this.pendingTransports.length
                ? b.logAction(b.LOG_MINOR, "ConnectionManager.connectImpl()", "Transports " + this.pendingTransports[0].toString() + " currently pending; taking no action")
                : n == this.states.connected.state
                ? this.upgradeIfNeeded(t)
                : this.transports.length > 1 && this.getTransportPreference()
                ? this.connectPreference(t)
                : this.connectBase(t, e);
            }),
            (h.prototype.connectPreference = function(t) {
              var e = this.getTransportPreference(),
                n = this,
                i = !1;
              y.arrIn(this.transports, e) || (this.unpersistTransportPreference(), this.connectImpl(t)),
                b.logAction(b.LOG_MINOR, "ConnectionManager.connectPreference()", "Trying to connect with stored transport preference " + e);
              var r = setTimeout(function() {
                (i = !0),
                  n.state.state !== n.states.connected.state &&
                    (b.logAction(b.LOG_MINOR, "ConnectionManager.connectPreference()", "Shortcircuit connection attempt with " + e + " failed; clearing preference and trying from scratch"),
                    n.disconnectAllTransports(),
                    n.unpersistTransportPreference()),
                  n.connectImpl(t);
              }, this.options.timeouts.preferenceConnectTimeout);
              (t.host = n.httpHosts[0]),
                n.tryATransport(t, e, function(e, o) {
                  clearTimeout(r), i && o ? (o.off(), o.disconnect(), y.arrDeleteValue(this.pendingTransports, o)) : o || e || (n.unpersistTransportPreference(), n.connectImpl(t));
                });
            }),
            (h.prototype.connectBase = function(t, e) {
              var n = this,
                i = function(t) {
                  n.notifyState({ state: n.states.connecting.failState, error: t });
                },
                r = this.httpHosts.slice(),
                o = function(t, i) {
                  e === n.connectCounter && (i || t || a());
                };
              b.logAction(b.LOG_MINOR, "ConnectionManager.connectBase()", "Trying to connect with base transport " + this.baseTransport);
              var s = r.shift();
              if (s) {
                if (((t.host = s), this.forceFallbackHost && r.length)) return (this.forceFallbackHost = !1), void a();
                this.tryATransport(t, this.baseTransport, o);
              } else i(new S("Unable to connect (no available host)", 80003, 404));
              function a() {
                r.length
                  ? v.checkConnectivity(function(s, a) {
                      e === n.connectCounter &&
                        (s ? i(s) : a ? ((t.host = y.arrPopRandomElement(r)), n.tryATransport(t, n.baseTransport, o)) : i(new S("Unable to connect (network unreachable)", 80003, 404)));
                    })
                  : i(new S("Unable to connect (and no more fallback hosts to try)", 80003, 404));
              }
            }),
            (h.prototype.getUpgradePossibilities = function() {
              var t = this.activeProtocol.getTransport().shortName,
                e = y.arrIndexOf(this.upgradeTransports, t);
              return this.upgradeTransports.slice(e + 1);
            }),
            (h.prototype.upgradeIfNeeded = function(t) {
              var e = this.getUpgradePossibilities(),
                n = this;
              b.logAction(b.LOG_MINOR, "ConnectionManager.upgradeIfNeeded()", "upgrade possibilities: " + y.inspect(e)),
                e.length &&
                  y.arrForEach(e, function(e) {
                    var i = n.createTransportParams(t.host, "upgrade");
                    n.tryATransport(i, e, r);
                  });
            }),
            (h.prototype.closeImpl = function() {
              b.logAction(b.LOG_MINOR, "ConnectionManager.closeImpl()", "closing connection"),
                this.cancelSuspendTimer(),
                this.startTransitionTimer(this.states.closing),
                y.safeArrForEach(this.pendingTransports, function(t) {
                  b.logAction(b.LOG_MICRO, "ConnectionManager.closeImpl()", "Closing pending transport: " + t), t && t.close();
                }),
                y.safeArrForEach(this.proposedTransports, function(t) {
                  b.logAction(b.LOG_MICRO, "ConnectionManager.closeImpl()", "Disposing of proposed transport: " + t), t && t.dispose();
                }),
                this.activeProtocol &&
                  (b.logAction(b.LOG_MICRO, "ConnectionManager.closeImpl()", "Closing active transport: " + this.activeProtocol.getTransport()), this.activeProtocol.getTransport().close()),
                this.notifyState({ state: "closed" });
            }),
            (h.prototype.onAuthUpdated = function(t, e) {
              var i = this;
              switch (this.state.state) {
                case "connected":
                  if (
                    (b.logAction(b.LOG_MICRO, "ConnectionManager.onAuthUpdated()", "Sending AUTH message on active transport"),
                    (this.pendingTransports.length || this.proposedTransports.length) && i.state !== i.states.synchronizing)
                  ) {
                    this.disconnectAllTransports(!0);
                    var r = this.activeProtocol.getTransport().params;
                    y.nextTick(function() {
                      "connected" === i.state.state && i.upgradeIfNeeded(r);
                    });
                  }
                  this.activeProtocol.getTransport().onAuthUpdated(t);
                  var o = I.fromValues({ action: n.AUTH, auth: { accessToken: t.token } });
                  this.send(o);
                  var s = function() {
                      i.off(a), e(null, t);
                    },
                    a = function(t) {
                      "failed" === t.current && (i.off(s), i.off(a), e(t.reason || i.getStateError()));
                    };
                  this.once("connectiondetails", s), this.on("connectionstate", a);
                  break;
                case "connecting":
                  b.logAction(b.LOG_MICRO, "ConnectionManager.onAuthUpdated()", "Aborting current connection attempts in order to start again with the new auth details"),
                    this.disconnectAllTransports();
                default:
                  b.logAction(b.LOG_MICRO, "ConnectionManager.onAuthUpdated()", "Connection state is " + this.state.state + "; waiting until either connected or failed");
                  var c = function(n) {
                    switch (n.current) {
                      case "connected":
                        i.off(c), e(null, t);
                        break;
                      case "failed":
                      case "closed":
                      case "suspended":
                        i.off(c), e(n.reason || i.getStateError());
                    }
                  };
                  i.on("connectionstate", c), "connecting" === this.state.state ? i.startConnect() : i.requestState({ state: "connecting" });
              }
            }),
            (h.prototype.disconnectAllTransports = function(t) {
              b.logAction(b.LOG_MINOR, "ConnectionManager.disconnectAllTransports()", "Disconnecting all transports" + (t ? " except the active transport" : "")),
                this.connectCounter++,
                y.safeArrForEach(this.pendingTransports, function(t) {
                  b.logAction(b.LOG_MICRO, "ConnectionManager.disconnectAllTransports()", "Disconnecting pending transport: " + t), t && t.disconnect();
                }),
                (this.pendingTransports = []),
                y.safeArrForEach(this.proposedTransports, function(t) {
                  b.logAction(b.LOG_MICRO, "ConnectionManager.disconnectAllTransports()", "Disposing of proposed transport: " + t), t && t.dispose();
                }),
                (this.proposedTransports = []),
                this.activeProtocol &&
                  !t &&
                  (b.logAction(b.LOG_MICRO, "ConnectionManager.disconnectAllTransports()", "Disconnecting active transport: " + this.activeProtocol.getTransport()),
                  this.activeProtocol.getTransport().disconnect());
            }),
            (h.prototype.send = function(t, e, n) {
              n = n || r;
              var o = this.state;
              if (o.sendEvents) return b.logAction(b.LOG_MICRO, "ConnectionManager.send()", "sending event"), void this.sendImpl(new i(t, n));
              if (!((e && o.queueEvents) || o.forceQueueEvents)) {
                var s = "rejecting event, queueEvent was " + e + ", state was " + o.state;
                return b.logAction(b.LOG_MICRO, "ConnectionManager.send()", s), void n(this.errorReason || new S(s, 9e4, 400));
              }
              b.shouldLog(b.LOG_MICRO) && b.logAction(b.LOG_MICRO, "ConnectionManager.send()", "queueing msg; " + I.stringify(t)), this.queue(t, n);
            }),
            (h.prototype.sendImpl = function(t) {
              var e = t.message;
              t.ackRequired && !t.sendAttempted && ((e.msgSerial = this.msgSerial++), this.setRecoveryKey());
              try {
                this.activeProtocol.send(t);
              } catch (t) {
                b.logAction(b.LOG_ERROR, "ConnectionManager.sendImpl()", "Unexpected exception in transport.send(): " + t.stack);
              }
            }),
            (h.prototype.queue = function(t, e) {
              b.logAction(b.LOG_MICRO, "ConnectionManager.queue()", "queueing event");
              var r = this.queuedMessages.last(),
                o = this.options.maxMessageSize;
              r &&
              !r.sendAttempted &&
              (function(t, e, i) {
                var r;
                if (t.channel !== e.channel) return !1;
                if ((r = t.action) !== n.PRESENCE && r !== n.MESSAGE) return !1;
                if (r !== e.action) return !1;
                var o = r === n.PRESENCE ? "presence" : "messages",
                  s = t[o].concat(e[o]);
                return !(_.getMessagesSize(s) > i) && !!y.allSame(s, "clientId") && ((t[o] = s), !0);
              })(r.message, t, o)
                ? (r.merged || ((r.callback = w([r.callback])), (r.merged = !0)), r.callback.push(e))
                : this.queuedMessages.push(new i(t, e));
            }),
            (h.prototype.sendQueuedMessages = function() {
              var t;
              for (b.logAction(b.LOG_MICRO, "ConnectionManager.sendQueuedMessages()", "sending " + this.queuedMessages.count() + " queued messages"); (t = this.queuedMessages.shift()); )
                this.sendImpl(t);
            }),
            (h.prototype.queuePendingMessages = function(t) {
              t && t.length && (b.logAction(b.LOG_MICRO, "ConnectionManager.queuePendingMessages()", "queueing " + t.length + " pending messages"), this.queuedMessages.prepend(t));
            }),
            (h.prototype.failQueuedMessages = function(t) {
              var e = this.queuedMessages.count();
              e > 0 &&
                (b.logAction(b.LOG_ERROR, "ConnectionManager.failQueuedMessages()", "failing " + e + " queued messages, err = " + y.inspectError(t)), this.queuedMessages.completeAllMessages(t));
            }),
            (h.prototype.onChannelMessage = function(t, e) {
              var i = this.activeProtocol && e === this.activeProtocol.getTransport(),
                r = y.arrIn(this.pendingTransports, e) && this.state == this.states.synchronizing,
                o = t.action === n.MESSAGE || t.action === n.PRESENCE;
              if (i || r) {
                if (o) {
                  if (this.setConnectionSerial(t)) return;
                  if (I.isDuplicate(t, this.mostRecentMsg))
                    return void b.logAction(
                      b.LOG_ERROR,
                      "ConnectionManager.onChannelMessage()",
                      "received message with different connectionSerial, but same message id as a previous; discarding; id = " + t.id,
                    );
                  this.mostRecentMsg = t;
                }
                this.realtime.channels.onChannelMessage(t);
              } else
                y.arrIndexOf([n.ACK, n.NACK, n.ERROR], t.action) > -1
                  ? this.realtime.channels.onChannelMessage(t)
                  : b.logAction(b.LOG_MICRO, "ConnectionManager.onChannelMessage()", "received message " + JSON.stringify(t) + "on defunct transport; discarding");
            }),
            (h.prototype.ping = function(t, e) {
              if (t) {
                b.logAction(b.LOG_MINOR, "ConnectionManager.ping()", "transport = " + t);
                var n = y.now(),
                  i = y.cheapRandStr(),
                  r = function(s) {
                    if (s === i) {
                      t.off("heartbeat", r), clearTimeout(o);
                      var a = y.now() - n;
                      e(null, a);
                    }
                  },
                  o = setTimeout(function() {
                    t.off("heartbeat", r), e(new S("Timeout waiting for heartbeat response", 5e4, 500));
                  }, this.options.timeouts.realtimeRequestTimeout);
                return t.on("heartbeat", r), void t.ping(i);
              }
              if ("connected" === this.state.state) {
                var s = !1,
                  a = this,
                  c = function() {
                    s ||
                      ((s = !0),
                      y.nextTick(function() {
                        a.ping(null, e);
                      }));
                  };
                this.on("transport.active", c),
                  this.ping(this.activeProtocol.getTransport(), function(t, n) {
                    a.off("transport.active", c), s || ((s = !0), e(t, n));
                  });
              } else e(new S("Unable to ping service; not connected", 4e4, 400));
            }),
            (h.prototype.abort = function(t) {
              this.activeProtocol.getTransport().fail(t);
            }),
            (h.prototype.registerProposedTransport = function(t) {
              this.proposedTransports.push(t);
            }),
            (h.prototype.getTransportPreference = function() {
              return this.transportPreference || (t && d.get("ably-transport-preference"));
            }),
            (h.prototype.persistTransportPreference = function(e) {
              y.arrIn(g.upgradeTransports, e.shortName) && ((this.transportPreference = e.shortName), t && d.set("ably-transport-preference", e.shortName));
            }),
            (h.prototype.unpersistTransportPreference = function() {
              (this.transportPreference = null), t && d.remove("ably-transport-preference");
            }),
            (h.prototype.actOnErrorFromAuthorize = function(t) {
              if (40171 === t.code) this.notifyState({ state: "failed", error: t });
              else if (403 === t.statusCode) {
                var e = "Client configured authentication provider returned 403; failing the connection";
                b.logAction(b.LOG_ERROR, "ConnectionManager.actOnErrorFromAuthorize()", e), this.notifyState({ state: "failed", error: new S(e, 80019, 403, t) });
              } else {
                e = "Client configured authentication provider request failed";
                b.logAction(b.LOG_MINOR, "ConnectionManager.actOnErrorFromAuthorize", e), this.notifyState({ state: this.state.failState, error: new S(e, 80019, 401, t) });
              }
            }),
            (h.prototype.onConnectionDetailsUpdate = function(t, e) {
              if (t) {
                (this.connectionDetails = t), (this.options.maxMessageSize = t.maxMessageSize);
                var n = t.clientId;
                if (n) {
                  var i = this.realtime.auth._uncheckedSetClientId(n);
                  if (i) return b.logAction(b.LOG_ERROR, "ConnectionManager.onConnectionDetailsUpdate()", i.message), void e.fail(i);
                }
                var r = t.connectionStateTtl;
                r && (this.connectionStateTtl = r), (this.maxIdleInterval = t.maxIdleInterval), this.emit("connectiondetails", t);
              }
            }),
            h
          );
        })(),
        N = (function() {
          var t = I.Action,
            e = I.fromValues({ action: t.CLOSE }),
            n = I.fromValues({ action: t.DISCONNECT });
          function i(t, e, n) {
            A.call(this),
              (this.connectionManager = t),
              t.registerProposedTransport(this),
              (this.auth = e),
              (this.params = n),
              (this.timeouts = n.options.timeouts),
              (this.format = n.format),
              (this.isConnected = !1),
              (this.isFinished = !1),
              (this.isDisposed = !1),
              (this.maxIdleInterval = null),
              (this.idleTimer = null),
              (this.lastActivity = null);
          }
          return (
            y.inherits(i, A),
            (i.prototype.connect = function() {}),
            (i.prototype.close = function() {
              this.isConnected && this.requestClose(), this.finish("closed", P.closed);
            }),
            (i.prototype.disconnect = function(t) {
              this.isConnected && this.requestDisconnect(), this.finish("disconnected", t || P.disconnected);
            }),
            (i.prototype.fail = function(t) {
              this.isConnected && this.requestDisconnect(), this.finish("failed", t || P.failed);
            }),
            (i.prototype.finish = function(t, e) {
              this.isFinished ||
                ((this.isFinished = !0), (this.isConnected = !1), (this.maxIdleInterval = null), clearTimeout(this.idleTimer), (this.idleTimer = null), this.emit(t, e), this.dispose());
            }),
            (i.prototype.onProtocolMessage = function(e) {
              switch (
                (b.shouldLog(b.LOG_MICRO) &&
                  b.logAction(b.LOG_MICRO, "Transport.onProtocolMessage()", "received on " + this.shortName + ": " + I.stringify(e) + "; connectionId = " + this.connectionManager.connectionId),
                this.onActivity(),
                e.action)
              ) {
                case t.HEARTBEAT:
                  b.logAction(b.LOG_MICRO, "Transport.onProtocolMessage()", this.shortName + " heartbeat; connectionId = " + this.connectionManager.connectionId), this.emit("heartbeat", e.id);
                  break;
                case t.CONNECTED:
                  this.onConnect(e), this.emit("connected", e.error, e.connectionId, e.connectionDetails, e);
                  break;
                case t.CLOSED:
                  this.onClose(e);
                  break;
                case t.DISCONNECTED:
                  this.onDisconnect(e);
                  break;
                case t.ACK:
                  this.emit("ack", e.msgSerial, e.count);
                  break;
                case t.NACK:
                  this.emit("nack", e.msgSerial, e.count, e.error);
                  break;
                case t.SYNC:
                  if (void 0 !== e.connectionId) {
                    this.emit("sync", e.connectionId, e);
                    break;
                  }
                  this.connectionManager.onChannelMessage(e, this);
                  break;
                case t.AUTH:
                  this.auth.authorize(function(t) {
                    t && b.logAction(b.LOG_ERROR, "Transport.onProtocolMessage()", "Ably requested re-authentication, but unable to obtain a new token: " + y.inspectError(t));
                  });
                  break;
                case t.ERROR:
                  if (
                    (b.logAction(
                      b.LOG_MINOR,
                      "Transport.onProtocolMessage()",
                      "received error action; connectionId = " + this.connectionManager.connectionId + "; err = " + y.inspect(e.error) + (e.channel ? ", channel: " + e.channel : ""),
                    ),
                    void 0 === e.channel)
                  ) {
                    this.onFatalError(e);
                    break;
                  }
                  this.connectionManager.onChannelMessage(e, this);
                  break;
                default:
                  this.connectionManager.onChannelMessage(e, this);
              }
            }),
            (i.prototype.onConnect = function(t) {
              this.isConnected = !0;
              var e = t.connectionDetails.maxIdleInterval;
              e && ((this.maxIdleInterval = e + this.timeouts.realtimeRequestTimeout), this.onActivity());
            }),
            (i.prototype.onDisconnect = function(t) {
              var e = t && t.error;
              b.logAction(b.LOG_MINOR, "Transport.onDisconnect()", "err = " + y.inspectError(e)), this.finish("disconnected", e);
            }),
            (i.prototype.onFatalError = function(t) {
              var e = t && t.error;
              b.logAction(b.LOG_MINOR, "Transport.onFatalError()", "err = " + y.inspectError(e)), this.finish("failed", e);
            }),
            (i.prototype.onClose = function(t) {
              var e = t && t.error;
              b.logAction(b.LOG_MINOR, "Transport.onClose()", "err = " + y.inspectError(e)), this.finish("closed", e);
            }),
            (i.prototype.requestClose = function() {
              b.logAction(b.LOG_MINOR, "Transport.requestClose()", ""), this.send(e);
            }),
            (i.prototype.requestDisconnect = function() {
              b.logAction(b.LOG_MINOR, "Transport.requestDisconnect()", ""), this.send(n);
            }),
            (i.prototype.ping = function(t) {
              var e = { action: I.Action.HEARTBEAT };
              t && (e.id = t), this.send(I.fromValues(e));
            }),
            (i.prototype.dispose = function() {
              b.logAction(b.LOG_MINOR, "Transport.dispose()", ""), (this.isDisposed = !0), this.off();
            }),
            (i.prototype.onActivity = function() {
              this.maxIdleInterval && ((this.lastActivity = this.connectionManager.lastActivity = y.now()), this.setIdleTimer(this.maxIdleInterval + 100));
            }),
            (i.prototype.setIdleTimer = function(t) {
              var e = this;
              this.idleTimer ||
                (this.idleTimer = setTimeout(function() {
                  e.onIdleTimerExpire();
                }, t));
            }),
            (i.prototype.onIdleTimerExpire = function() {
              this.idleTimer = null;
              var t = y.now() - this.lastActivity,
                e = this.maxIdleInterval - t;
              if (e <= 0) {
                var n = "No activity seen from realtime in " + t + "ms; assuming connection has dropped";
                b.logAction(b.LOG_ERROR, "Transport.onIdleTimerExpire()", n), this.disconnect(new S(n, 80003, 408));
              } else this.setIdleTimer(e + 100);
            }),
            (i.prototype.onAuthUpdated = function() {}),
            i
          );
        })(),
        G =
          ((function() {
            var t = f.WebSocket,
              e = "web_socket";
            function n(t, n, i) {
              (this.shortName = e), (i.heartbeats = f.useProtocolHeartbeats), N.call(this, t, n, i), (this.wsHost = g.getHost(i.options, i.host, !0));
            }
            y.inherits(n, N),
              (n.isAvailable = function() {
                return !!t;
              }),
              n.isAvailable() && (U.supportedTransports[e] = n),
              (n.tryConnect = function(t, e, i, r) {
                var o = new n(t, e, i),
                  s = function(t) {
                    r({ event: this.event, error: t });
                  };
                o.on(["failed", "disconnected"], s),
                  o.on("wsopen", function() {
                    b.logAction(b.LOG_MINOR, "WebSocketTransport.tryConnect()", "viable transport " + o), o.off(["failed", "disconnected"], s), r(null, o);
                  }),
                  o.connect();
              }),
              (n.prototype.createWebSocket = function(e, n) {
                var i = 0;
                if (n) for (var r in n) e += (i++ ? "&" : "?") + r + "=" + n[r];
                return (this.uri = e), new t(e);
              }),
              (n.prototype.toString = function() {
                return "WebSocketTransport; uri=" + this.uri;
              }),
              (n.prototype.connect = function() {
                b.logAction(b.LOG_MINOR, "WebSocketTransport.connect()", "starting"), N.prototype.connect.call(this);
                var t = this,
                  e = this.params,
                  n = e.options,
                  i = (n.tls ? "wss://" : "ws://") + this.wsHost + ":" + g.getPort(n) + "/";
                b.logAction(b.LOG_MINOR, "WebSocketTransport.connect()", "uri: " + i),
                  this.auth.getAuthParams(function(n, r) {
                    if (!t.isDisposed) {
                      var o = "";
                      for (var s in r) o += " " + s + ": " + r[s] + ";";
                      if ((b.logAction(b.LOG_MINOR, "WebSocketTransport.connect()", "authParams:" + o + " err: " + n), n)) t.disconnect(n);
                      else {
                        var a = e.getConnectParams(r);
                        try {
                          var c = (t.wsConnection = t.createWebSocket(i, a));
                          (c.binaryType = f.binaryType),
                            (c.onopen = function() {
                              t.onWsOpen();
                            }),
                            (c.onclose = function(e) {
                              t.onWsClose(e);
                            }),
                            (c.onmessage = function(e) {
                              t.onWsData(e.data);
                            }),
                            (c.onerror = function(e) {
                              t.onWsError(e);
                            }),
                            c.on &&
                              c.on("ping", function() {
                                t.onActivity();
                              });
                        } catch (e) {
                          b.logAction(b.LOG_ERROR, "WebSocketTransport.connect()", "Unexpected exception creating websocket: err = " + (e.stack || e.message)), t.disconnect(e);
                        }
                      }
                    }
                  });
              }),
              (n.prototype.send = function(t) {
                var e = this.wsConnection;
                if (e)
                  try {
                    e.send(I.serialize(t, this.params.format));
                  } catch (t) {
                    var n = "Exception from ws connection when trying to send: " + y.inspectError(t);
                    b.logAction(b.LOG_ERROR, "WebSocketTransport.send()", n), this.finish("disconnected", new S(n, 5e4, 500));
                  }
                else b.logAction(b.LOG_ERROR, "WebSocketTransport.send()", "No socket connection");
              }),
              (n.prototype.onWsData = function(t) {
                b.logAction(b.LOG_MICRO, "WebSocketTransport.onWsData()", "data received; length = " + t.length + "; type = " + typeof t);
                try {
                  this.onProtocolMessage(I.deserialize(t, this.format));
                } catch (t) {
                  b.logAction(b.LOG_ERROR, "WebSocketTransport.onWsData()", "Unexpected exception handing channel message: " + t.stack);
                }
              }),
              (n.prototype.onWsOpen = function() {
                b.logAction(b.LOG_MINOR, "WebSocketTransport.onWsOpen()", "opened WebSocket"), this.emit("wsopen");
              }),
              (n.prototype.onWsClose = function(t) {
                var e, n;
                if (("object" == typeof t ? ((e = t.wasClean), (n = t.code)) : (e = 1e3 == (n = t)), delete this.wsConnection, e)) {
                  b.logAction(b.LOG_MINOR, "WebSocketTransport.onWsClose()", "Cleanly closed WebSocket");
                  var i = new S("Websocket closed", 80003, 400);
                  this.finish("disconnected", i);
                } else {
                  var r = "Unclean disconnection of WebSocket ; code = " + n;
                  i = new S(r, 80003, 400);
                  b.logAction(b.LOG_MINOR, "WebSocketTransport.onWsClose()", r), this.finish("disconnected", i);
                }
                this.emit("disposed");
              }),
              (n.prototype.onWsError = function(t) {
                b.logAction(b.LOG_MINOR, "WebSocketTransport.onError()", "Error from WebSocket: " + t.message);
                var e = this;
                y.nextTick(function() {
                  e.disconnect(t);
                });
              }),
              (n.prototype.dispose = function() {
                b.logAction(b.LOG_MINOR, "WebSocketTransport.dispose()", ""), (this.isDisposed = !0);
                var t = this.wsConnection;
                t &&
                  ((t.onmessage = function() {}),
                  delete this.wsConnection,
                  y.nextTick(function() {
                    b.logAction(b.LOG_MICRO, "WebSocketTransport.dispose()", "closing websocket"), t.close();
                  }));
              });
          })(),
          (function() {
            function t(t) {
              return (function(t) {
                return !!t.code && !H.isTokenErr(t) && (!!y.arrIn([80015, 80017, 80030], t.code) || (t.code >= 4e4 && t.code < 5e4));
              })(t)
                ? [I.fromValues({ action: I.Action.ERROR, error: t })]
                : [I.fromValues({ action: I.Action.DISCONNECTED, error: t })];
            }
            function e(t, e, n) {
              (n.format = void 0),
                (n.heartbeats = !0),
                N.call(this, t, e, n),
                (this.stream = !("stream" in n) || n.stream),
                (this.sendRequest = null),
                (this.recvRequest = null),
                (this.pendingCallback = null),
                (this.pendingItems = null);
            }
            return (
              y.inherits(e, N),
              (e.REQ_SEND = 0),
              (e.REQ_RECV = 1),
              (e.REQ_RECV_POLL = 2),
              (e.REQ_RECV_STREAM = 3),
              (e.prototype.connect = function() {
                b.logAction(b.LOG_MINOR, "CometTransport.connect()", "starting"), N.prototype.connect.call(this);
                var e = this,
                  n = this.params,
                  i = n.options,
                  r = g.getHost(i, n.host),
                  o = g.getPort(i),
                  s = i.tls ? "https://" : "http://";
                this.baseUri = s + r + ":" + o + "/comet/";
                var a = this.baseUri + "connect";
                b.logAction(b.LOG_MINOR, "CometTransport.connect()", "uri: " + a),
                  this.auth.getAuthParams(function(n, i) {
                    if (n) e.disconnect(n);
                    else if (!e.isDisposed) {
                      e.authParams = i;
                      var r = e.params.getConnectParams(i);
                      "stream" in r && (e.stream = r.stream), b.logAction(b.LOG_MINOR, "CometTransport.connect()", "connectParams:" + y.toQueryString(r));
                      var o = !1,
                        s = (e.recvRequest = e.createRequest(a, null, r, null, e.stream ? 3 : 1));
                      s.on("data", function(t) {
                        e.recvRequest && (o || ((o = !0), e.emit("preconnect")), e.onData(t));
                      }),
                        s.on("complete", function(n, i, r) {
                          e.recvRequest || (n = n || new S("Request cancelled", 80003, 400)),
                            (e.recvRequest = null),
                            e.onActivity(),
                            n
                              ? n.code
                                ? e.onData(t(n))
                                : e.disconnect(n)
                              : y.nextTick(function() {
                                  e.recv();
                                });
                        }),
                        s.exec();
                    }
                  });
              }),
              (e.prototype.requestClose = function() {
                b.logAction(b.LOG_MINOR, "CometTransport.requestClose()"), this._requestCloseOrDisconnect(!0);
              }),
              (e.prototype.requestDisconnect = function() {
                b.logAction(b.LOG_MINOR, "CometTransport.requestDisconnect()"), this._requestCloseOrDisconnect(!1);
              }),
              (e.prototype._requestCloseOrDisconnect = function(t) {
                var e = t ? this.closeUri : this.disconnectUri;
                if (e) {
                  var n = this,
                    i = this.createRequest(e, null, this.authParams, null, 0);
                  i.on("complete", function(e) {
                    e && (b.logAction(b.LOG_ERROR, "CometTransport.request" + (t ? "Close()" : "Disconnect()"), "request returned err = " + y.inspectError(e)), n.finish("disconnected", e));
                  }),
                    i.exec();
                }
              }),
              (e.prototype.dispose = function() {
                if ((b.logAction(b.LOG_MINOR, "CometTransport.dispose()", ""), !this.isDisposed)) {
                  (this.isDisposed = !0),
                    this.recvRequest && (b.logAction(b.LOG_MINOR, "CometTransport.dispose()", "aborting recv request"), this.recvRequest.abort(), (this.recvRequest = null)),
                    this.finish("disconnected", P.disconnected);
                  var t = this;
                  y.nextTick(function() {
                    t.emit("disposed");
                  });
                }
              }),
              (e.prototype.onConnect = function(t) {
                if (!this.isDisposed) {
                  var e = t.connectionKey;
                  N.prototype.onConnect.call(this, t);
                  var n = this.baseUri + e;
                  b.logAction(b.LOG_MICRO, "CometTransport.onConnect()", "baseUri = " + n + "; connectionKey = " + t.connectionKey),
                    (this.sendUri = n + "/send"),
                    (this.recvUri = n + "/recv"),
                    (this.closeUri = n + "/close"),
                    (this.disconnectUri = n + "/disconnect");
                }
              }),
              (e.prototype.send = function(t) {
                if (this.sendRequest) return (this.pendingItems = this.pendingItems || []), void this.pendingItems.push(t);
                var e = this.pendingItems || [];
                e.push(t), (this.pendingItems = null), this.sendItems(e);
              }),
              (e.prototype.sendAnyPending = function() {
                var t = this.pendingItems;
                t && ((this.pendingItems = null), this.sendItems(t));
              }),
              (e.prototype.sendItems = function(e) {
                var n = this,
                  i = (this.sendRequest = n.createRequest(n.sendUri, null, n.authParams, this.encodeRequest(e), 0));
                i.on("complete", function(e, i) {
                  e && b.logAction(b.LOG_ERROR, "CometTransport.sendItems()", "on complete: err = " + y.inspectError(e)),
                    (n.sendRequest = null),
                    i ? n.onData(i) : e && e.code ? n.onData(t(e)) : n.disconnect(e),
                    n.pendingItems &&
                      y.nextTick(function() {
                        n.sendRequest || n.sendAnyPending();
                      });
                }),
                  i.exec();
              }),
              (e.prototype.recv = function() {
                if (!this.recvRequest && this.isConnected) {
                  var e = this,
                    n = (this.recvRequest = this.createRequest(this.recvUri, null, this.authParams, null, e.stream ? 3 : 2));
                  n.on("data", function(t) {
                    e.onData(t);
                  }),
                    n.on("complete", function(n) {
                      (e.recvRequest = null),
                        e.onActivity(),
                        n
                          ? n.code
                            ? e.onData(t(n))
                            : e.disconnect(n)
                          : y.nextTick(function() {
                              e.recv();
                            });
                    }),
                    n.exec();
                }
              }),
              (e.prototype.onData = function(t) {
                try {
                  var e = this.decodeResponse(t);
                  if (e && e.length) for (var n = 0; n < e.length; n++) this.onProtocolMessage(I.fromDeserialized(e[n]));
                } catch (t) {
                  b.logAction(b.LOG_ERROR, "CometTransport.onData()", "Unexpected exception handing channel event: " + t.stack);
                }
              }),
              (e.prototype.encodeRequest = function(t) {
                return JSON.stringify(t);
              }),
              (e.prototype.decodeResponse = function(t) {
                return "string" == typeof t && (t = JSON.parse(t)), t;
              }),
              (e.prototype.onAuthUpdated = function(t) {
                this.authParams = { access_token: t.token };
              }),
              e
            );
          })()),
        B = (function() {
          function t() {}
          function e(t) {
            (this.channel = t), (this.basePath = t.basePath + "/presence");
          }
          return (
            y.inherits(e, A),
            (e.prototype.get = function(e, n) {
              if ((b.logAction(b.LOG_MICRO, "Presence.get()", "channel = " + this.channel.name), void 0 === n))
                if ("function" == typeof e) (n = e), (e = null);
                else {
                  if (this.channel.rest.options.promises) return y.promisify(this, "get", arguments);
                  n = t;
                }
              var i = this.channel.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = v.supportsLinkHeaders ? void 0 : r,
                s = y.defaultGetHeaders(r);
              i.options.headers && y.mixin(s, i.options.headers);
              var a = this.channel.channelOptions;
              new D(i, this.basePath, s, o, function(t, e, n) {
                return T.fromResponseBody(t, a, !n && r);
              }).get(e, n);
            }),
            (e.prototype.history = function(t, e) {
              b.logAction(b.LOG_MICRO, "Presence.history()", "channel = " + this.channel.name), this._history(t, e);
            }),
            (e.prototype._history = function(e, n) {
              if (void 0 === n)
                if ("function" == typeof e) (n = e), (e = null);
                else {
                  if (this.channel.rest.options.promises) return y.promisify(this, "_history", arguments);
                  n = t;
                }
              var i = this.channel.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = v.supportsLinkHeaders ? void 0 : r,
                s = y.defaultGetHeaders(r);
              this.channel;
              i.options.headers && y.mixin(s, i.options.headers);
              var a = this.channel.channelOptions;
              new D(i, this.basePath + "/history", s, o, function(t, e, n) {
                return T.fromResponseBody(t, a, !n && r);
              }).get(e, n);
            }),
            e
          );
        })(),
        q = (function() {
          var t = f.msgpack;
          function e() {}
          function n(t, e, n, i, r) {
            v.supportsAuthHeaders
              ? t.auth.getAuthHeaders(function(t, o) {
                  t ? i(t) : r(y.mixin(o, e), n);
                })
              : t.auth.getAuthParams(function(t, o) {
                  t ? i(t) : r(e, y.mixin(o, n));
                });
          }
          function i(t) {
            var e = [];
            if (t) for (var n in t) e.push(n + "=" + t[n]);
            return e.join("&");
          }
          function r(t, e) {
            return t + (e ? "?" : "") + i(e);
          }
          return (
            y.arrForEach(v.methodsWithoutBody, function(t) {
              e[t] = function(n, i, r, o, s, a) {
                e.do(t, n, i, null, r, o, s, a);
              };
            }),
            y.arrForEach(v.methodsWithBody, function(t) {
              e[t] = function(n, i, r, o, s, a, c) {
                e.do(t, n, i, r, o, s, a, c);
              };
            }),
            (e.do = function(e, o, s, a, c, u, h, l) {
              b.shouldLog(b.LOG_MICRO) &&
                (l = (function(t, e, n, o) {
                  return function(s, a, c, u, h) {
                    s
                      ? b.logAction(b.LOG_MICRO, "Resource." + e + "()", "Received Error; " + r(n, o) + "; Error: " + y.inspectError(s))
                      : b.logAction(b.LOG_MICRO, "Resource." + e + "()", "Received; " + r(n, o) + "; Headers: " + i(c) + "; StatusCode: " + h + "; Body: " + (m.isBuffer(a) ? a.toString() : a)),
                      t && t(s, a, c, u, h);
                  };
                })(l, e, s, u)),
                h &&
                  ((l =
                    l &&
                    (function(t, e) {
                      return function(n, i, r, o, s) {
                        if (!n || i) {
                          if (!o)
                            try {
                              i = y.decodeBody(i, e);
                            } catch (e) {
                              return void t(e);
                            }
                          if (void 0 !== i.statusCode) {
                            var a = i.statusCode,
                              c = i.response,
                              u = i.headers;
                            if (a < 200 || a >= 300) {
                              var h = (c && c.error) || n;
                              return h || ((h = new Error("Error in unenveloping " + i)).statusCode = a), void t(h, c, u, !0, a);
                            }
                            t(n, c, u, !0, a);
                          } else t(n, i, r, !0, s);
                        } else t(n);
                      };
                    })(l, h)),
                  ((u = u || {}).envelope = h)),
                n(o, c, u, l, function i(h, f) {
                  b.shouldLog(b.LOG_MICRO) && b.logAction(b.LOG_MICRO, "Resource." + e + "()", "Sending; " + r(s, f));
                  var p = [
                    o,
                    s,
                    h,
                    a,
                    f,
                    function(t, e, r, s, a) {
                      t && H.isTokenErr(t)
                        ? o.auth.authorize(null, null, function(t) {
                            t ? l(t) : n(o, c, u, l, i);
                          })
                        : l(t, e, r, s, a);
                    },
                  ];
                  if ((a || p.splice(3, 1), b.shouldLog(b.LOG_MICRO))) {
                    var d = a;
                    if ((h["content-type"] || "").indexOf("msgpack") > 0)
                      try {
                        d = t.decode(a);
                      } catch (t) {
                        b.logAction(b.LOG_MICRO, "Resource." + e + "()", "Sending MsgPack Decoding Error: " + y.inspectError(t));
                      }
                    b.logAction(b.LOG_MICRO, "Resource." + e + "()", "Sending; " + r(s, f) + "; Body: " + d);
                  }
                  v[e].apply(this, p);
                });
            }),
            e
          );
        })(),
        D = (function() {
          function t(t, e, n, i, r, o) {
            (this.rest = t), (this.path = e), (this.headers = n), (this.envelope = i), (this.bodyHandler = r), (this.useHttpPaginatedResponse = o || !1);
          }
          function e(t, e, n) {
            if (((this.resource = t), (this.items = e), n)) {
              var i = this;
              "first" in n &&
                (this.first = function(t) {
                  i.get(n.first, t);
                }),
                "current" in n &&
                  (this.current = function(t) {
                    i.get(n.current, t);
                  }),
                (this.next = function(t) {
                  "next" in n ? i.get(n.next, t) : t(null, null);
                }),
                (this.hasNext = function() {
                  return "next" in n;
                }),
                (this.isLast = function() {
                  return !this.hasNext();
                });
            }
          }
          function n(t, n, i, r, o, s) {
            e.call(this, t, n, o), (this.statusCode = r), (this.success = r < 300 && r >= 200), (this.headers = i), (this.errorCode = s && s.code), (this.errorMessage = s && s.message);
          }
          return (
            y.arrForEach(v.methodsWithoutBody, function(e) {
              t.prototype[e] = function(t, n) {
                var i = this;
                q[e](i.rest, i.path, i.headers, t, i.envelope, function(t, e, r, o, s) {
                  i.handlePage(t, e, r, o, s, n);
                });
              };
            }),
            y.arrForEach(v.methodsWithBody, function(e) {
              t.prototype[e] = function(t, n, i) {
                var r = this;
                q[e](r.rest, r.path, n, r.headers, t, r.envelope, function(t, e, n, o, s) {
                  i && r.handlePage(t, e, n, o, s, i);
                });
              };
            }),
            (t.prototype.handlePage = function(t, i, r, o, s, a) {
              if (
                t &&
                (function(t, e, n) {
                  return !(n && (e || "number" == typeof t.code));
                })(t, i, this.useHttpPaginatedResponse)
              )
                return b.logAction(b.LOG_ERROR, "PaginatedResource.handlePage()", "Unexpected error getting resource: err = " + y.inspectError(t)), void a(t);
              var c, u, h;
              try {
                c = this.bodyHandler(i, r, o);
              } catch (e) {
                return void a(t || e);
              }
              r &&
                (u = r.Link || r.link) &&
                (h = (function(t) {
                  "string" == typeof t && (t = t.split(","));
                  for (var e, n, i = {}, r = 0; r < t.length; r++) {
                    var o = t[r].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);
                    if (o) {
                      var s = ((e = o[1]), (n = void 0), (n = e.match(/^\.\/(\w+)\?(.*)$/)) && y.parseQueryString(n[2]));
                      s && (i[o[2]] = s);
                    }
                  }
                  return i;
                })(u)),
                this.useHttpPaginatedResponse ? a(null, new n(this, c, r, s, h, t)) : a(null, new e(this, c, h));
            }),
            (e.prototype.get = function(t, e) {
              var n = this.resource;
              q.get(n.rest, n.path, n.headers, t, n.envelope, function(t, i, r, o, s) {
                n.handlePage(t, i, r, o, s, e);
              });
            }),
            y.inherits(n, e),
            t
          );
        })(),
        H = (function() {
          var t,
            n,
            i = Math.pow(2, 17);
          function r() {}
          function o() {
            return ("000000" + Math.floor(1e16 * Math.random())).slice(-16);
          }
          function s(t) {
            return y.isErrorInfo(t)
              ? (t.code || (403 === t.statusCode ? (t.code = 40300) : ((t.code = 40170), (t.statusCode = 401))), t)
              : new S(y.inspectError(t), t.code || 40170, t.statusCode || 401);
          }
          function c(t) {
            if (!t) return "";
            "string" == typeof t && (t = JSON.parse(t));
            var e = {},
              n = y.keysArray(t, !0);
            if (!n) return "";
            n.sort();
            for (var i = 0; i < n.length; i++) e[n[i]] = t[n[i]].sort();
            return JSON.stringify(e);
          }
          function u(t) {
            if (t.authCallback) b.logAction(b.LOG_MINOR, "Auth()", "using token auth with authCallback");
            else if (t.authUrl) b.logAction(b.LOG_MINOR, "Auth()", "using token auth with authUrl");
            else if (t.key) b.logAction(b.LOG_MINOR, "Auth()", "using token auth with client-side signing");
            else {
              if (!t.tokenDetails) {
                var e = "authOptions must include valid authentication parameters";
                throw (b.logAction(b.LOG_ERROR, "Auth()", e), new Error(e));
              }
              b.logAction(b.LOG_MINOR, "Auth()", "using token auth with supplied token only");
            }
          }
          f.createHmac
            ? ((n = function(t) {
                return new e(t, "ascii").toString("base64");
              }),
              (t = function(t, e) {
                var n = f.createHmac("SHA256", e);
                return n.update(t), n.digest("base64");
              }))
            : ((n = O.encode),
              (t = function(t, e) {
                return a.HmacSHA256(t, e).toString(a.enc.Base64);
              }));
          var h = 0;
          function l(e, n) {
            if (
              ((this.client = e),
              (this.tokenParams = n.defaultTokenParams || {}),
              (this.currentTokenRequestId = null),
              (this.waitingForTokenRequest = null),
              (function(t) {
                return (
                  t.useTokenAuth ||
                  (!(function(t) {
                    return "useTokenAuth" in t && !t.useTokenAuth;
                  })(t) &&
                    (t.authCallback || t.authUrl || t.token || t.tokenDetails))
                );
              })(n))
            ) {
              if (n.key && !t) {
                var i = "client-side token request signing not supported";
                throw (b.logAction(b.LOG_ERROR, "Auth()", i), new Error(i));
              }
              (function(t) {
                return !t.key && !t.authCallback && !t.authUrl;
              })(n) &&
                b.logAction(
                  b.LOG_ERROR,
                  "Auth()",
                  "Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help",
                ),
                this._saveTokenOptions(n.defaultTokenParams, n),
                u(this.authOptions);
            } else {
              if (!n.key) {
                i = "No authentication options provided; need one of: key, authUrl, or authCallback (or for testing only, token or tokenDetails)";
                throw (b.logAction(b.LOG_ERROR, "Auth()", i), new S(i, 40160, 401));
              }
              b.logAction(b.LOG_MINOR, "Auth()", "anonymous, using basic auth"), this._saveBasicOptions(n);
            }
          }
          return (
            (l.prototype.authorize = function(t, e, n) {
              if (("function" != typeof t || n ? "function" != typeof e || n || ((n = e), (e = null)) : ((n = t), (e = t = null)), !n)) {
                if (this.client.options.promises) return y.promisify(this, "authorize", arguments);
                n = r;
              }
              var i = this;
              if (e && e.key && this.authOptions.key !== e.key) throw new S("Unable to update auth options with incompatible key", 40102, 401);
              e &&
                "force" in e &&
                (b.logAction(
                  b.LOG_ERROR,
                  "Auth.authorize",
                  "Deprecation warning: specifying {force: true} in authOptions is no longer necessary, authorize() now always gets a new token. Please remove this, as in version 1.0 and later, having a non-null authOptions will overwrite stored library authOptions, which may not be what you want",
                ),
                y.isOnlyPropIn(e, "force") && (e = null)),
                this._forceNewToken(t, e, function(t, e) {
                  t ? n(t) : i.client.connection ? i.client.connection.connectionManager.onAuthUpdated(e, n) : n(null, e);
                });
            }),
            (l.prototype.authorise = function() {
              b.deprecated("Auth.authorise", "Auth.authorize"), this.authorize.apply(this, arguments);
            }),
            (l.prototype._forceNewToken = function(t, e, n) {
              var i = this;
              (this.tokenDetails = null),
                this._saveTokenOptions(t, e),
                u(this.authOptions),
                this._ensureValidAuthCredentials(!0, function(t, e) {
                  delete i.tokenParams.timestamp, delete i.authOptions.queryTime, n(t, e);
                });
            }),
            (l.prototype.requestToken = function(t, e, n) {
              if (("function" != typeof t || n ? "function" != typeof e || n || ((n = e), (e = null)) : ((n = t), (e = t = null)), !n && this.client.options.promises))
                return y.promisify(this, "requestToken", arguments);
              (e = e || this.authOptions), (t = t || y.copy(this.tokenParams)), (n = n || r);
              var o,
                a = this.client;
              if (e.authCallback) b.logAction(b.LOG_MINOR, "Auth.requestToken()", "using token auth with authCallback"), (o = e.authCallback);
              else if (e.authUrl)
                b.logAction(b.LOG_MINOR, "Auth.requestToken()", "using token auth with authUrl"),
                  (o = function(t, n) {
                    var r = y.mixin({ accept: "application/json, text/plain" }, e.authHeaders),
                      o = e.authMethod && "post" === e.authMethod.toLowerCase();
                    if (!o) {
                      var s = e.authUrl.indexOf("?");
                      if (s > -1) {
                        var c = y.parseQueryString(e.authUrl.slice(s));
                        (e.authUrl = e.authUrl.slice(0, s)), (e.authParams = y.mixin(c, e.authParams));
                      }
                    }
                    var u = y.mixin({}, e.authParams || {}, t),
                      h = function(t, e, r, o) {
                        var s;
                        if (
                          (t
                            ? b.logAction(b.LOG_MICRO, "Auth.requestToken().tokenRequestCallback", "Received Error: " + y.inspectError(t))
                            : ((s = r["content-type"]), b.logAction(b.LOG_MICRO, "Auth.requestToken().tokenRequestCallback", "Received; content-type: " + s + "; body: " + y.inspectBody(e))),
                          t || o)
                        )
                          return n(t, e);
                        if ((m.isBuffer(e) && (e = e.toString()), s)) {
                          var a = s.indexOf("application/json") > -1,
                            c = s.indexOf("text/plain") > -1 || s.indexOf("application/jwt") > -1;
                          if (a || c) {
                            if (a) {
                              if (e.length > i) return void n(new S("authUrl response exceeded max permitted length", 40170, 401));
                              try {
                                e = JSON.parse(e);
                              } catch (t) {
                                return void n(new S("Unexpected error processing authURL response; err = " + t.message, 40170, 401));
                              }
                            }
                            n(null, e, s);
                          } else n(new S("authUrl responded with unacceptable content-type " + s + ", should be either text/plain, application/jwt or application/json", 40170, 401));
                        } else n(new S("authUrl response is missing a content-type header", 40170, 401));
                      };
                    if (
                      (b.logAction(
                        b.LOG_MICRO,
                        "Auth.requestToken().tokenRequestCallback",
                        "Requesting token from " + e.authUrl + "; Params: " + JSON.stringify(u) + "; method: " + (o ? "POST" : "GET"),
                      ),
                      o)
                    ) {
                      var l = r || {};
                      l["content-type"] = "application/x-www-form-urlencoded";
                      var f = y.toQueryString(u).slice(1);
                      v.postUri(a, e.authUrl, l, f, {}, h);
                    } else v.getUri(a, e.authUrl, r || {}, u, h);
                  });
              else {
                if (!e.key) {
                  var u = "Need a new token, but authOptions does not include any way to request one (no authUrl, authCallback, or key)";
                  return (
                    b.logAction(
                      b.LOG_ERROR,
                      "Auth()",
                      "library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help",
                    ),
                    void n(new S(u, 40171, 403))
                  );
                }
                var h = this;
                b.logAction(b.LOG_MINOR, "Auth.requestToken()", "using token auth with client-side signing"),
                  (o = function(t, n) {
                    h.createTokenRequest(t, e, n);
                  });
              }
              "capability" in t && (t.capability = c(t.capability));
              var l = function(t, n) {
                  var i = "/keys/" + t.keyName + "/requestToken",
                    r = y.defaultPostHeaders();
                  e.requestHeaders && y.mixin(r, e.requestHeaders),
                    b.logAction(b.LOG_MICRO, "Auth.requestToken().requestToken", "Sending POST to " + i + "; Token params: " + JSON.stringify(t)),
                    (t = JSON.stringify(t)),
                    v.post(
                      a,
                      function(t) {
                        return a.baseUri(t) + i;
                      },
                      r,
                      t,
                      null,
                      n,
                    );
                },
                f = !1,
                p = this.client.options.timeouts.realtimeRequestTimeout,
                d = setTimeout(function() {
                  f = !0;
                  var t = "Token request callback timed out after " + p / 1e3 + " seconds";
                  b.logAction(b.LOG_ERROR, "Auth.requestToken()", t), n(new S(t, 40170, 401));
                }, p);
              o(t, function(t, r, o) {
                if (!f) {
                  if ((clearTimeout(d), t)) return b.logAction(b.LOG_ERROR, "Auth.requestToken()", "token request signing call returned error; err = " + y.inspectError(t)), void n(s(t));
                  if ("string" != typeof r) {
                    if ("object" != typeof r) {
                      var a = "Expected token request callback to call back with a token string or token request/details object, but got a " + typeof r;
                      return b.logAction(b.LOG_ERROR, "Auth.requestToken()", a), void n(new S(a, 40170, 401));
                    }
                    var c = JSON.stringify(r).length;
                    if (c > i && !e.suppressMaxLengthCheck) n(new S("Token request/details object exceeded max permitted stringified size (was " + c + " bytes)", 40170, 401));
                    else if ("issued" in r) n(null, r);
                    else {
                      if (!("keyName" in r)) {
                        a = "Expected token request callback to call back with a token string, token request object, or token details object";
                        return b.logAction(b.LOG_ERROR, "Auth.requestToken()", a), void n(new S(a, 40170, 401));
                      }
                      l(r, function(t, e, i, r) {
                        if (t) return b.logAction(b.LOG_ERROR, "Auth.requestToken()", "token request API call returned error; err = " + y.inspectError(t)), void n(s(t));
                        r || (e = JSON.parse(e)), b.logAction(b.LOG_MINOR, "Auth.getToken()", "token received"), n(null, e);
                      });
                    }
                  } else
                    0 === r.length
                      ? n(new S("Token string is empty", 40170, 401))
                      : r.length > i
                      ? n(new S("Token string exceeded max permitted length (was " + r.length + " bytes)", 40170, 401))
                      : "undefined" === r || "null" === r
                      ? n(new S("Token string was literal null/undefined", 40170, 401))
                      : "{" !== r[0] || (o && o.indexOf("application/jwt") > -1)
                      ? n(null, { token: r })
                      : n(new S("Token was double-encoded; make sure you're not JSON-encoding an already encoded token request or details", 40170, 401));
                }
              });
            }),
            (l.prototype.createTokenRequest = function(e, n, i) {
              if (("function" != typeof e || i ? "function" != typeof n || i || ((i = n), (n = null)) : ((i = e), (n = e = null)), !i && this.client.options.promises))
                return y.promisify(this, "createTokenRequest", arguments);
              (n = n || this.authOptions), (e = e || y.copy(this.tokenParams));
              var r = n.key;
              if (r) {
                var s = r.split(":"),
                  a = s[0],
                  u = s[1];
                if (u)
                  if ("" !== e.clientId) {
                    "capability" in e && (e.capability = c(e.capability));
                    var h,
                      l = y.mixin({ keyName: a }, e),
                      f = e.clientId || "",
                      p = e.ttl || "",
                      d = e.capability || "",
                      g = this;
                    (h = function() {
                      var e = l.nonce || (l.nonce = o()),
                        n = l.timestamp,
                        r = l.keyName + "\n" + p + "\n" + d + "\n" + f + "\n" + n + "\n" + e + "\n";
                      (l.mac = l.mac || t(r, u)), b.logAction(b.LOG_MINOR, "Auth.getTokenRequest()", "generated signed request"), i(null, l);
                    }),
                      l.timestamp
                        ? h()
                        : g.getTimestamp(n && n.queryTime, function(t, e) {
                            t ? i(t) : ((l.timestamp = e), h());
                          });
                  } else i(new S("clientId canâ€™t be an empty string", 40012, 400));
                else i(new S("Invalid key specified", 40101, 403));
              } else i(new S("No key specified", 40101, 403));
            }),
            (l.prototype.getAuthParams = function(t) {
              "basic" == this.method
                ? t(null, { key: this.key })
                : this._ensureValidAuthCredentials(!1, function(e, n) {
                    e ? t(e) : t(null, { access_token: n.token });
                  });
            }),
            (l.prototype.getAuthHeaders = function(t) {
              "basic" == this.method
                ? t(null, { authorization: "Basic " + this.basicKey })
                : this._ensureValidAuthCredentials(!1, function(e, i) {
                    e ? t(e) : t(null, { authorization: "Bearer " + n(i.token) });
                  });
            }),
            (l.prototype.getTimestamp = function(t, e) {
              this.isTimeOffsetSet() || (!t && !this.authOptions.queryTime) ? e(null, this.getTimestampUsingOffset()) : this.client.time(e);
            }),
            (l.prototype.getTimestampUsingOffset = function() {
              return y.now() + (this.client.serverTimeOffset || 0);
            }),
            (l.prototype.isTimeOffsetSet = function() {
              return null !== this.client.serverTimeOffset;
            }),
            (l.prototype._saveBasicOptions = function(t) {
              (this.method = "basic"), (this.key = t.key), (this.basicKey = n(t.key)), (this.authOptions = t || {}), "clientId" in t && this._userSetClientId(t.clientId);
            }),
            (l.prototype._saveTokenOptions = function(t, e) {
              (this.method = "token"),
                t && (this.tokenParams = t),
                e &&
                  (e.token && (e.tokenDetails = "string" == typeof e.token ? { token: e.token } : e.token),
                  e.tokenDetails && (this.tokenDetails = e.tokenDetails),
                  "clientId" in e && this._userSetClientId(e.clientId),
                  (this.authOptions = e));
            }),
            (l.prototype._ensureValidAuthCredentials = function(t, e) {
              var n = this,
                i = this.tokenDetails;
              if (i) {
                if (this._tokenClientIdMismatch(i.clientId)) return void e(new S("Mismatch between clientId in token (" + i.clientId + ") and current clientId (" + this.clientId + ")", 40102, 403));
                if (!this.isTimeOffsetSet() || !i.expires || i.expires >= this.getTimestampUsingOffset())
                  return b.logAction(b.LOG_MINOR, "Auth.getToken()", "using cached token; expires = " + i.expires), void e(null, i);
                b.logAction(b.LOG_MINOR, "Auth.getToken()", "deleting expired token"), (this.tokenDetails = null);
              }
              if (((this.waitingForTokenRequest || (this.waitingForTokenRequest = w())).push(e), null === this.currentTokenRequestId || t)) {
                var o = (this.currentTokenRequestId = h++);
                this.requestToken(this.tokenParams, this.authOptions, function(t, e) {
                  if (n.currentTokenRequestId > o) b.logAction(b.LOG_MINOR, "Auth._ensureValidAuthCredentials()", "Discarding token request response; overtaken by newer one");
                  else {
                    n.currentTokenRequestId = null;
                    var i = n.waitingForTokenRequest || r;
                    (n.waitingForTokenRequest = null), t ? i(t) : i(null, (n.tokenDetails = e));
                  }
                });
              }
            }),
            (l.prototype._userSetClientId = function(t) {
              if ("string" != typeof t && null !== t) throw new S("clientId must be either a string or null", 40012, 400);
              if ("*" === t)
                throw new S(
                  'Canâ€™t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)',
                  40012,
                  400,
                );
              var e = this._uncheckedSetClientId(t);
              if (e) throw e;
            }),
            (l.prototype._uncheckedSetClientId = function(t) {
              if (this._tokenClientIdMismatch(t)) {
                var e = "Unexpected clientId mismatch: client has " + this.clientId + ", requested " + t,
                  n = new S(e, 40102, 401);
                return b.logAction(b.LOG_ERROR, "Auth._uncheckedSetClientId()", e), n;
              }
              return (this.clientId = this.tokenParams.clientId = t), null;
            }),
            (l.prototype._tokenClientIdMismatch = function(t) {
              return this.clientId && "*" !== this.clientId && t && "*" !== t && this.clientId !== t;
            }),
            (l.isTokenErr = function(t) {
              return t.code && t.code >= 40140 && t.code < 40150;
            }),
            l
          );
        })(),
        j = (function() {
          var t = function() {},
            e = f.msgpack;
          function n(t) {
            if (!(this instanceof n)) return new n(t);
            if (!t) {
              var e = "no options provided";
              throw (b.logAction(b.LOG_ERROR, "Rest()", e), new Error(e));
            }
            if (
              ((t = g.objectifyOptions(t)).log && b.setLog(t.log.level, t.log.handler),
              b.logAction(b.LOG_MICRO, "Rest()", "initialized with clientOptions " + y.inspect(t)),
              (this.options = g.normaliseOptions(t)),
              t.key)
            ) {
              var r = t.key.match(/^([^:\s]+):([^:.\s]+)$/);
              if (!r) {
                e = "invalid key parameter";
                throw (b.logAction(b.LOG_ERROR, "Rest()", e), new Error(e));
              }
              (t.keyName = r[1]), (t.keySecret = r[2]);
            }
            if ("clientId" in t) {
              if ("string" != typeof t.clientId && null !== t.clientId) throw new S("clientId must be either a string or null", 40012, 400);
              if ("*" === t.clientId)
                throw new S(
                  'Canâ€™t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})',
                  40012,
                  400,
                );
            }
            b.logAction(b.LOG_MINOR, "Rest()", "started; version = " + g.libstring),
              (this.baseUri = this.authority = function(e) {
                return g.getHttpScheme(t) + e + ":" + g.getPort(t, !1);
              }),
              (this._currentFallback = null),
              (this.serverTimeOffset = null),
              (this.auth = new H(this, t)),
              (this.channels = new i(this)),
              (this.push = new J(this));
          }
          function i(t) {
            (this.rest = t), (this.attached = {});
          }
          return (
            (n.prototype.stats = function(e, n) {
              if (void 0 === n)
                if ("function" == typeof e) (n = e), (e = null);
                else {
                  if (this.options.promises) return y.promisify(this, "stats", arguments);
                  n = t;
                }
              var i = y.defaultGetHeaders(),
                r = this.options.useBinaryProtocol ? "msgpack" : "json",
                o = v.supportsLinkHeaders ? void 0 : r;
              this.options.headers && y.mixin(i, this.options.headers),
                new D(this, "/stats", i, o, function(t, e, n) {
                  for (var i = n ? t : JSON.parse(t), r = 0; r < i.length; r++) i[r] = M.fromValues(i[r]);
                  return i;
                }).get(e, n);
            }),
            (n.prototype.time = function(e, n) {
              if (void 0 === n)
                if ("function" == typeof e) (n = e), (e = null);
                else {
                  if (this.options.promises) return y.promisify(this, "time", arguments);
                  n = t;
                }
              var i = y.defaultGetHeaders();
              this.options.headers && y.mixin(i, this.options.headers);
              var r = this,
                o = function(t) {
                  return r.authority(t) + "/time";
                };
              v.get(this, o, i, e, function(t, e, i, o) {
                if (t) n(t);
                else {
                  o || (e = JSON.parse(e));
                  var s = e[0];
                  if (!s) return ((t = new Error("Internal error (unexpected result type from GET /time)")).statusCode = 500), void n(t);
                  (r.serverTimeOffset = s - y.now()), n(null, s);
                }
              });
            }),
            (n.prototype.request = function(n, i, r, o, s, a) {
              var c = this.options.useBinaryProtocol,
                u = c ? e.encode : JSON.stringify,
                h = c ? e.decode : JSON.parse,
                l = c ? "msgpack" : "json",
                f = v.supportsLinkHeaders ? void 0 : l;
              r = r || {};
              var p = "get" == (n = n.toLowerCase()) ? y.defaultGetHeaders(l) : y.defaultPostHeaders(l);
              if (void 0 === a) {
                if (this.options.promises) return y.promisify(this, "request", [n, i, r, o, s]);
                a = t;
              }
              "string" != typeof o && (o = u(o)), this.options.headers && y.mixin(p, this.options.headers), s && y.mixin(p, s);
              var d = new D(
                this,
                i,
                p,
                f,
                function(t, e, n) {
                  return y.ensureArray(n ? t : h(t));
                },
                !0,
              );
              if (!y.arrIn(v.methods, n)) throw new S("Unsupported method " + n, 40500, 405);
              y.arrIn(v.methodsWithBody, n) ? d[n](r, o, a) : d[n](r, a);
            }),
            (n.prototype.setLog = function(t) {
              b.setLog(t.level, t.handler);
            }),
            (i.prototype.get = function(t, e) {
              t = String(t);
              var n = this.attached[t];
              return n ? e && n.setOptions(e) : (this.attached[t] = n = new K(this.rest, t, e)), n;
            }),
            (i.prototype.release = function(t) {
              delete this.attached[String(t)];
            }),
            n
          );
        })();
      (j.Promise = function(t) {
        return ((t = g.objectifyOptions(t)).promises = !0), new j(t);
      }),
        (j.Callbacks = j);
      var z = (function() {
        function t(n) {
          if (!(this instanceof t)) return new t(n);
          b.logAction(b.LOG_MINOR, "Realtime()", ""), j.call(this, n), (this.connection = new W(this, this.options)), (this.channels = new e(this)), !1 !== n.autoConnect && this.connect();
        }
        function e(t) {
          A.call(this), (this.realtime = t), (this.all = {}), (this.inProgress = {});
          var e = this;
          t.connection.connectionManager.on("transport.active", function() {
            e.onTransportActive();
          });
        }
        return (
          y.inherits(t, j),
          (t.prototype.connect = function() {
            b.logAction(b.LOG_MINOR, "Realtime.connect()", ""), this.connection.connect();
          }),
          (t.prototype.close = function() {
            b.logAction(b.LOG_MINOR, "Realtime.close()", ""), this.connection.close();
          }),
          y.inherits(e, A),
          (e.prototype.onChannelMessage = function(t) {
            var e = t.channel;
            if (void 0 !== e) {
              var n = this.all[e];
              n ? n.onMessage(t) : b.logAction(b.LOG_ERROR, "Channels.onChannelMessage()", "received event for non-existent channel: " + e);
            } else b.logAction(b.LOG_ERROR, "Channels.onChannelMessage()", "received event unspecified channel, action = " + t.action);
          }),
          (e.prototype.onTransportActive = function() {
            for (var t in this.all) {
              var e = this.all[t];
              "attaching" === e.state || "detaching" === e.state ? e.checkPendingState() : "suspended" === e.state && e.attach();
            }
          }),
          (e.prototype.reattach = function(t) {
            for (var e in this.all) {
              var n = this.all[e];
              "attached" === n.state && n.requestState("attaching", t);
            }
          }),
          (e.prototype.resetAttachedMsgIndicators = function() {
            for (var t in this.all) {
              var e = this.all[t];
              "attached" === e.state && (e._attachedMsgIndicator = !1);
            }
          }),
          (e.prototype.checkAttachedMsgIndicators = function(t) {
            for (var e in this.all) {
              var n = this.all[e];
              if ("attached" === n.state && !1 === n._attachedMsgIndicator) {
                var i = "30s after a resume, found channel which has not received an attached; channelId = " + e + "; connectionId = " + t;
                b.logAction(b.LOG_ERROR, "Channels.checkAttachedMsgIndicators()", i), C.report("error", i, "channel-no-attached-after-resume"), n.requestState("attaching");
              }
            }
          }),
          (e.prototype.propogateConnectionInterruption = function(t, e) {
            var n = ["attaching", "attached", "detaching", "suspended"],
              i = { closing: "detached", closed: "detached", failed: "failed", suspended: "suspended" }[t];
            for (var r in this.all) {
              var o = this.all[r];
              y.arrIn(n, o.state) && o.notifyState(i, e);
            }
          }),
          (e.prototype.get = function(t, e) {
            t = String(t);
            var n = this.all[t];
            return n ? e && n.setOptions(e) : (n = this.all[t] = new Y(this.realtime, t, e)), n;
          }),
          (e.prototype.release = function(t) {
            this.all[t] && delete this.all[t];
          }),
          (e.prototype.setInProgress = function(t, e, n) {
            (this.inProgress[t.name] = this.inProgress[t.name] || {}), (this.inProgress[t.name][e] = n), !n && this.hasNopending() && this.emit("nopending");
          }),
          (e.prototype.onceNopending = function(t) {
            this.hasNopending() ? t() : this.once("nopending", t);
          }),
          (e.prototype.hasNopending = function() {
            return y.arrEvery(y.valuesArray(this.inProgress, !0), function(t) {
              return !y.containsValue(t, !0);
            });
          }),
          t
        );
      })();
      (z.Promise = function(t) {
        return ((t = g.objectifyOptions(t)).promises = !0), new z(t);
      }),
        (z.Callbacks = z);
      var F = function(t, e, n, i) {
          (this.previous = t), (this.current = e), n && (this.retryIn = n), i && (this.reason = i);
        },
        V = function(t, e, n, i) {
          (this.previous = t), (this.current = e), "attached" === e && (this.resumed = n), i && (this.reason = i);
        },
        W = (function() {
          function t() {}
          function e(t, e) {
            A.call(this),
              (this.ably = t),
              (this.connectionManager = new U(t, e)),
              (this.state = this.connectionManager.state.state),
              (this.key = void 0),
              (this.id = void 0),
              (this.serial = void 0),
              (this.timeSerial = void 0),
              (this.recoveryKey = void 0),
              (this.errorReason = null);
            var n = this;
            this.connectionManager.on("connectionstate", function(t) {
              var e = (n.state = t.current);
              y.nextTick(function() {
                n.emit(e, t);
              });
            }),
              this.connectionManager.on("update", function(t) {
                y.nextTick(function() {
                  n.emit("update", t);
                });
              });
          }
          return (
            y.inherits(e, A),
            (e.prototype.whenState = function(t, e) {
              A.prototype.whenState.call(this, t, this.state, e, new F(void 0, t));
            }),
            (e.prototype.connect = function() {
              b.logAction(b.LOG_MINOR, "Connection.connect()", ""), this.connectionManager.requestState({ state: "connecting" });
            }),
            (e.prototype.ping = function(e) {
              if ((b.logAction(b.LOG_MINOR, "Connection.ping()", ""), !e)) {
                if (this.ably.options.promises) return y.promisify(this, "ping", arguments);
                e = t;
              }
              this.connectionManager.ping(null, e);
            }),
            (e.prototype.close = function() {
              b.logAction(b.LOG_MINOR, "Connection.close()", "connectionKey = " + this.key), this.connectionManager.requestState({ state: "closing" });
            }),
            e
          );
        })(),
        J = (function() {
          var t = function() {};
          function e(t) {
            (this.rest = t), (this.deviceRegistrations = new n(t)), (this.channelSubscriptions = new i(t));
          }
          function n(t) {
            this.rest = t;
          }
          function i(t) {
            this.rest = t;
          }
          return (
            (e.prototype.publish = function(e, n, i) {
              var r = this.rest,
                o = r.options.useBinaryProtocol ? "msgpack" : "json",
                s = y.mixin({ recipient: e }, n),
                a = y.defaultPostHeaders(o),
                c = {};
              if ("function" != typeof i) {
                if (this.rest.options.promises) return y.promisify(this, "publish", arguments);
                i = t;
              }
              r.options.headers && y.mixin(a, r.options.headers),
                r.options.pushFullWait && y.mixin(c, { fullWait: "true" }),
                (s = y.encodeBody(s, o)),
                q.post(r, "/push/publish", s, a, c, !1, function(t) {
                  i(t);
                });
            }),
            (n.prototype.save = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = E.fromValues(e),
                s = y.defaultPostHeaders(r),
                a = {};
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "save", arguments);
                n = t;
              }
              i.options.headers && y.mixin(s, i.options.headers),
                i.options.pushFullWait && y.mixin(a, { fullWait: "true" }),
                (o = y.encodeBody(o, r)),
                q.put(i, "/push/deviceRegistrations/" + encodeURIComponent(e.id), o, s, a, !1, function(t, e, i, o) {
                  n(t, !t && E.fromResponseBody(e, !o && r));
                });
            }),
            (n.prototype.get = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = y.defaultGetHeaders(r),
                s = e.id || e;
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "get", arguments);
                n = t;
              }
              "string" == typeof s && s.length
                ? (i.options.headers && y.mixin(o, i.options.headers),
                  q.get(i, "/push/deviceRegistrations/" + encodeURIComponent(s), o, {}, !1, function(t, e, i, o) {
                    n(t, !t && E.fromResponseBody(e, !o && r));
                  }))
                : n(new S("First argument to DeviceRegistrations#get must be a deviceId string or DeviceDetails", 4e4, 400));
            }),
            (n.prototype.list = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = v.supportsLinkHeaders ? void 0 : r,
                s = y.defaultGetHeaders(r);
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "list", arguments);
                n = t;
              }
              i.options.headers && y.mixin(s, i.options.headers),
                new D(i, "/push/deviceRegistrations", s, o, function(t, e, n) {
                  return E.fromResponseBody(t, !n && r);
                }).get(e, n);
            }),
            (n.prototype.remove = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = y.defaultGetHeaders(r),
                s = {},
                a = e.id || e;
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "remove", arguments);
                n = t;
              }
              "string" == typeof a && a.length
                ? (i.options.headers && y.mixin(o, i.options.headers),
                  i.options.pushFullWait && y.mixin(s, { fullWait: "true" }),
                  q.delete(i, "/push/deviceRegistrations/" + encodeURIComponent(a), o, s, !1, function(t) {
                    n(t);
                  }))
                : n(new S("First argument to DeviceRegistrations#remove must be a deviceId string or DeviceDetails", 4e4, 400));
            }),
            (n.prototype.removeWhere = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = y.defaultGetHeaders(r);
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "removeWhere", arguments);
                n = t;
              }
              i.options.headers && y.mixin(o, i.options.headers),
                i.options.pushFullWait && y.mixin(e, { fullWait: "true" }),
                q.delete(i, "/push/deviceRegistrations", o, e, !1, function(t) {
                  n(t);
                });
            }),
            (i.prototype.save = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = k.fromValues(e),
                s = y.defaultPostHeaders(r),
                a = {};
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "save", arguments);
                n = t;
              }
              i.options.headers && y.mixin(s, i.options.headers),
                i.options.pushFullWait && y.mixin(a, { fullWait: "true" }),
                (o = y.encodeBody(o, r)),
                q.post(i, "/push/channelSubscriptions", o, s, a, !1, function(t, e, i, o) {
                  n(t, !t && k.fromResponseBody(e, !o && r));
                });
            }),
            (i.prototype.list = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = v.supportsLinkHeaders ? void 0 : r,
                s = y.defaultGetHeaders(r);
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "list", arguments);
                n = t;
              }
              i.options.headers && y.mixin(s, i.options.headers),
                new D(i, "/push/channelSubscriptions", s, o, function(t, e, n) {
                  return k.fromResponseBody(t, !n && r);
                }).get(e, n);
            }),
            (i.prototype.removeWhere = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = y.defaultGetHeaders(r);
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "removeWhere", arguments);
                n = t;
              }
              i.options.headers && y.mixin(o, i.options.headers),
                i.options.pushFullWait && y.mixin(e, { fullWait: "true" }),
                q.delete(i, "/push/channelSubscriptions", o, e, !1, function(t) {
                  n(t);
                });
            }),
            (i.prototype.remove = i.prototype.removeWhere),
            (i.prototype.listChannels = function(e, n) {
              var i = this.rest,
                r = i.options.useBinaryProtocol ? "msgpack" : "json",
                o = v.supportsLinkHeaders ? void 0 : r,
                s = y.defaultGetHeaders(r);
              if ("function" != typeof n) {
                if (this.rest.options.promises) return y.promisify(this, "listChannels", arguments);
                n = t;
              }
              i.options.headers && y.mixin(s, i.options.headers),
                i.options.pushFullWait && y.mixin(e, { fullWait: "true" }),
                new D(i, "/push/channels", s, o, function(t, e, n) {
                  !n && r && (t = y.decodeBody(t, r));
                  for (var i = 0; i < t.length; i++) t[i] = String(t[i]);
                  return t;
                }).get(e, n);
            }),
            function(t) {
              (this.rest = t), (this.admin = new e(t));
            }
          );
        })(),
        K = (function() {
          function t() {}
          function e(t, e, n) {
            b.logAction(b.LOG_MINOR, "Channel()", "started; name = " + e),
              A.call(this),
              (this.rest = t),
              (this.name = e),
              (this.basePath = "/channels/" + encodeURIComponent(e)),
              (this.presence = new B(this)),
              this.setOptions(n);
          }
          function n(t) {
            return y.arrEvery(t, function(t) {
              return !t.id;
            });
          }
          return (
            y.inherits(e, A),
            (e.prototype.setOptions = function(t) {
              if (((this.channelOptions = t = t || {}), t.cipher)) {
                if (!p) throw new Error("Encryption not enabled; use ably.encryption.js instead");
                var e = p.getCipher(t.cipher);
                (t.cipher = e.cipherParams), (t.channelCipher = e.cipher);
              } else "cipher" in t && ((t.cipher = null), (t.channelCipher = null));
            }),
            (e.prototype.history = function(e, n) {
              if ((b.logAction(b.LOG_MICRO, "Channel.history()", "channel = " + this.name), void 0 === n))
                if ("function" == typeof e) (n = e), (e = null);
                else {
                  if (this.rest.options.promises) return y.promisify(this, "history", arguments);
                  n = t;
                }
              this._history(e, n);
            }),
            (e.prototype._history = function(t, e) {
              var n = this.rest,
                i = n.options.useBinaryProtocol ? "msgpack" : "json",
                r = v.supportsLinkHeaders ? void 0 : i,
                o = y.defaultGetHeaders(i);
              n.options.headers && y.mixin(o, n.options.headers);
              var s = this.channelOptions;
              new D(n, this.basePath + "/messages", o, r, function(t, e, n) {
                return _.fromResponseBody(t, s, !n && i);
              }).get(t, e);
            }),
            (e.prototype.publish = function() {
              var e,
                i,
                r = arguments.length,
                o = arguments[0],
                s = arguments[1],
                a = arguments[r - 1],
                c = this;
              if ("function" != typeof a) {
                if (this.rest.options.promises) return y.promisify(this, "publish", arguments);
                a = t;
              }
              if ("string" == typeof o || null === o) (e = [_.fromValues({ name: o, data: s })]), (i = arguments[2]);
              else if (y.isObject(o)) (e = [_.fromValues(o)]), (i = arguments[1]);
              else {
                if (!y.isArray(o)) throw new S("The single-argument form of publish() expects a message object or an array of message objects", 40013, 400);
                (e = _.fromValuesArray(o)), (i = arguments[1]);
              }
              ("object" == typeof i && i) || (i = {});
              var u = this.rest,
                h = u.options,
                l = h.useBinaryProtocol ? "msgpack" : "json",
                f = u.options.idempotentRestPublishing,
                p = y.defaultPostHeaders(l);
              if ((h.headers && y.mixin(p, h.headers), f && n(e))) {
                var d = y.randomString(9);
                y.arrForEach(e, function(t, e) {
                  t.id = d + ":" + e.toString();
                });
              }
              _.encodeArray(e, this.channelOptions, function(t) {
                if (t) a(t);
                else {
                  var n = _.getMessagesSize(e),
                    r = h.maxMessageSize;
                  n > r
                    ? a(new S("Maximum size of messages that can be published at once exceeded ( was " + n + " bytes; limit is " + r + " bytes)", 40009, 400))
                    : c._publish(_.serialize(e, l), p, i, a);
                }
              });
            }),
            (e.prototype._publish = function(t, e, n, i) {
              q.post(this.rest, this.basePath + "/messages", t, e, n, !1, i);
            }),
            e
          );
        })(),
        Y = (function() {
          var t = I.Action,
            e = function() {};
          function n(t, e, n) {
            b.logAction(b.LOG_MINOR, "RealtimeChannel()", "started; name = " + e),
              K.call(this, t, e, n),
              (this.realtime = t),
              (this.presence = new Q(this, t.options)),
              (this.connectionManager = t.connection.connectionManager),
              (this.state = "initialized"),
              (this.subscriptions = new A()),
              (this.syncChannelSerial = void 0),
              (this.properties = { attachSerial: void 0 }),
              this.setOptions(n),
              (this.errorReason = null),
              (this._requestedFlags = null),
              (this._mode = null),
              (this._attachedMsgIndicator = !1);
          }
          return (
            y.inherits(n, K),
            (n.invalidStateError = function(t) {
              return { statusCode: 400, code: 90001, message: "Channel operation failed as channel state is " + t };
            }),
            (n.progressOps = { statechange: "statechange", sync: "sync" }),
            (n.processListenerArgs = function(t) {
              return "function" == typeof (t = Array.prototype.slice.call(t))[0] && t.unshift(null), null == t[t.length - 1] && t.pop(), t;
            }),
            (n.prototype.publish = function() {
              var t = arguments.length,
                n = arguments[0],
                i = arguments[t - 1];
              if ("function" != typeof i) {
                if (this.realtime.options.promises) return y.promisify(this, "publish", arguments);
                (i = e), ++t;
              }
              if (this.connectionManager.activeState()) {
                if (2 == t)
                  if (y.isObject(n)) n = [_.fromValues(n)];
                  else {
                    if (!y.isArray(n)) throw new S("The single-argument form of publish() expects a message object or an array of message objects", 40013, 400);
                    n = _.fromValuesArray(n);
                  }
                else n = [_.fromValues({ name: arguments[0], data: arguments[1] })];
                var r = this,
                  o = this.realtime.options.maxMessageSize;
                _.encodeArray(n, this.channelOptions, function(t) {
                  if (t) i(t);
                  else {
                    var e = _.getMessagesSize(n);
                    e > o ? i(new S("Maximum size of messages that can be published at once exceeded ( was " + e + " bytes; limit is " + o + " bytes)", 40009, 400)) : r._publish(n, i);
                  }
                });
              } else i(this.connectionManager.getError());
            }),
            (n.prototype._publish = function(e, i) {
              b.logAction(b.LOG_MICRO, "RealtimeChannel.publish()", "message count = " + e.length);
              var r = this.state;
              switch (r) {
                case "failed":
                case "suspended":
                  i(S.fromValues(n.invalidStateError(r)));
                  break;
                default:
                  b.logAction(b.LOG_MICRO, "RealtimeChannel.publish()", "sending message; channel state is " + r);
                  var o = new I();
                  (o.action = t.MESSAGE), (o.channel = this.name), (o.messages = e), this.sendMessage(o, i);
              }
            }),
            (n.prototype.onEvent = function(t) {
              b.logAction(b.LOG_MICRO, "RealtimeChannel.onEvent()", "received message");
              for (var e = this.subscriptions, n = 0; n < t.length; n++) {
                var i = t[n];
                e.emit(i.name, i);
              }
            }),
            (n.prototype.attach = function(t, e) {
              if (("function" == typeof t && ((e = t), (t = null)), !e)) {
                if (this.realtime.options.promises) return y.promisify(this, "attach", arguments);
                e = function(t) {
                  t && b.logAction(b.LOG_MAJOR, "RealtimeChannel.attach()", "Channel attach failed: " + t.toString());
                };
              }
              t && (this._requestedFlags = t);
              var n = this.connectionManager;
              if (n.activeState())
                switch (this.state) {
                  case "attached":
                    if (!t) {
                      e();
                      break;
                    }
                  default:
                    this.requestState("attaching");
                  case "attaching":
                    this.once(function(t) {
                      switch (this.event) {
                        case "attached":
                          e();
                          break;
                        case "detached":
                        case "suspended":
                        case "failed":
                          e(t.reason || n.getError());
                          break;
                        case "detaching":
                          e(new S("Attach request superseded by a subsequent detach request", 9e4, 409));
                      }
                    });
                }
              else e(n.getError());
            }),
            (n.prototype.attachImpl = function() {
              b.logAction(b.LOG_MICRO, "RealtimeChannel.attachImpl()", "sending ATTACH message"), this.setInProgress("statechange", !0);
              var n = I.fromValues({ action: t.ATTACH, channel: this.name });
              this._requestedFlags &&
                y.arrForEach(this._requestedFlags, function(t) {
                  n.setFlag(t);
                }),
                this.sendMessage(n, e);
            }),
            (n.prototype.detach = function(t) {
              if (!t) {
                if (this.realtime.options.promises) return y.promisify(this, "detach", arguments);
                t = e;
              }
              var n = this.connectionManager;
              if (n.activeState())
                switch (this.state) {
                  case "detached":
                  case "failed":
                    t();
                    break;
                  default:
                    this.requestState("detaching");
                  case "detaching":
                    this.once(function(e) {
                      switch (this.event) {
                        case "detached":
                          t();
                          break;
                        case "attached":
                        case "suspended":
                        case "failed":
                          t(e.reason || n.getError());
                          break;
                        case "attaching":
                          t(new S("Detach request superseded by a subsequent attach request", 9e4, 409));
                      }
                    });
                }
              else t(n.getError());
            }),
            (n.prototype.detachImpl = function(n) {
              b.logAction(b.LOG_MICRO, "RealtimeChannel.detach()", "sending DETACH message"), this.setInProgress("statechange", !0);
              var i = I.fromValues({ action: t.DETACH, channel: this.name });
              this.sendMessage(i, n || e);
            }),
            (n.prototype.subscribe = function() {
              var t = n.processListenerArgs(arguments),
                i = t[0],
                r = t[1],
                o = t[2];
              if (!o) {
                if (this.realtime.options.promises) return y.promisify(this, "subscribe", [i, r]);
                o = e;
              }
              if ("failed" !== this.state) return this.subscriptions.on(i, r), this.attach(o);
              o(S.fromValues(n.invalidStateError("failed")));
            }),
            (n.prototype.unsubscribe = function() {
              var t = n.processListenerArgs(arguments),
                e = t[0],
                i = t[1];
              this.subscriptions.off(e, i);
            }),
            (n.prototype.sync = function() {
              switch (this.state) {
                case "initialized":
                case "detaching":
                case "detached":
                  throw new S("Unable to sync to channel; not attached", 4e4);
              }
              var e = this.connectionManager;
              if (!e.activeState()) throw e.getError();
              var n = I.fromValues({ action: t.SYNC, channel: this.name });
              this.syncChannelSerial && (n.channelSerial = this.syncChannelSerial), e.send(n);
            }),
            (n.prototype.sendMessage = function(t, e) {
              this.connectionManager.send(t, this.realtime.options.queueMessages, e);
            }),
            (n.prototype.sendPresence = function(e, n) {
              var i = I.fromValues({ action: t.PRESENCE, channel: this.name, presence: y.isArray(e) ? T.fromValuesArray(e) : [T.fromValues(e)] });
              this.sendMessage(i, n);
            }),
            (n.prototype.onMessage = function(e) {
              var n,
                i = !1;
              switch (e.action) {
                case t.ATTACHED:
                  if (((this._attachedMsgIndicator = !0), (this.properties.attachSerial = e.channelSerial), (this._mode = e.getMode()), "attached" === this.state)) {
                    var r = e.hasFlag("RESUMED");
                    if (!r || this.channelOptions.updateOnAttached) {
                      this.presence.onAttached(e.hasFlag("HAS_PRESENCE"));
                      var o = new V(this.state, this.state, r, e.error);
                      this.emit("update", o);
                    }
                  } else this.notifyState("attached", e.error, e.hasFlag("RESUMED"), e.hasFlag("HAS_PRESENCE"));
                  break;
                case t.DETACHED:
                  var s = e.error ? S.fromValues(e.error) : new S("Channel detached", 90001, 404);
                  "detaching" === this.state ? this.notifyState("detached", s) : "attaching" === this.state ? this.notifyState("suspended", s) : this.requestState("attaching", s);
                  break;
                case t.SYNC:
                  if (((i = !0), (n = this.syncChannelSerial = e.channelSerial), !e.presence)) break;
                case t.PRESENCE:
                  for (var a = e.presence, c = e.id, u = e.connectionId, h = e.timestamp, l = this.channelOptions, f = 0; f < a.length; f++) {
                    try {
                      var p = a[f];
                      T.decode(p, l);
                    } catch (t) {
                      b.logAction(b.LOG_ERROR, "RealtimeChannel.onMessage()", t.toString());
                    }
                    p.connectionId || (p.connectionId = u), p.timestamp || (p.timestamp = h), p.id || (p.id = c + ":" + f);
                  }
                  this.presence.setPresence(a, i, n);
                  break;
                case t.MESSAGE:
                  var d = e.messages;
                  for (c = e.id, u = e.connectionId, h = e.timestamp, l = this.channelOptions, f = 0; f < d.length; f++) {
                    try {
                      var g = d[f];
                      _.decode(g, l);
                    } catch (t) {
                      b.logAction(b.LOG_MINOR, "RealtimeChannel.onMessage()", t.toString());
                    }
                    g.connectionId || (g.connectionId = u), g.timestamp || (g.timestamp = h), g.id || (g.id = c + ":" + f);
                  }
                  this.onEvent(d);
                  break;
                case t.ERROR:
                  (s = e.error) && 80016 == s.code ? this.checkPendingState() : this.notifyState("failed", S.fromValues(s));
                  break;
                default:
                  b.logAction(b.LOG_ERROR, "RealtimeChannel.onMessage()", "Fatal protocol error: unrecognised action (" + e.action + ")"), this.connectionManager.abort(P.unknownChannelErr);
              }
            }),
            (n.prototype.onAttached = function() {
              b.logAction(b.LOG_MINOR, "RealtimeChannel.onAttached", "activating channel; name = " + this.name);
            }),
            (n.prototype.notifyState = function(t, e, n, i) {
              if (
                (b.logAction(b.LOG_MICRO, "RealtimeChannel.notifyState", "name = " + this.name + ", current state = " + this.state + ", notifying state " + t),
                this.clearStateTimer(),
                t !== this.state)
              ) {
                this.presence.actOnChannelState(t, i, e), "suspended" === t && this.connectionManager.state.sendEvents ? this.startRetryTimer() : this.cancelRetryTimer(), e && (this.errorReason = e);
                var r = new V(this.state, t, n, e),
                  o = "failed" === t ? b.LOG_ERROR : b.LOG_MAJOR;
                b.logAction(o, 'Channel state for channel "' + this.name + '"', t + (e ? "; reason: " + e : "")),
                  "attached" === t
                    ? (this.onAttached(), this.setInProgress("sync", i), this.setInProgress("statechange", !1))
                    : ("detached" !== t && "failed" !== t && "suspended" !== t) || (this.setInProgress("statechange", !1), this.setInProgress("sync", !1)),
                  (this.state = t),
                  this.emit(t, r);
              }
            }),
            (n.prototype.requestState = function(t, e) {
              b.logAction(b.LOG_MINOR, "RealtimeChannel.requestState", "name = " + this.name + ", state = " + t), this.notifyState(t, e), this.checkPendingState();
            }),
            (n.prototype.checkPendingState = function() {
              var t = this.connectionManager.state;
              if (t.sendEvents || t.forceQueueEvents)
                switch ((b.logAction(b.LOG_MINOR, "RealtimeChannel.checkPendingState", "name = " + this.name + ", state = " + this.state), this.state)) {
                  case "attaching":
                    this.startStateTimerIfNotRunning(), this.attachImpl();
                    break;
                  case "detaching":
                    this.startStateTimerIfNotRunning(), this.detachImpl();
                    break;
                  case "attached":
                    this.sync();
                }
              else b.logAction(b.LOG_MINOR, "RealtimeChannel.checkPendingState", "sendEvents is false; state is " + this.connectionManager.state.state);
            }),
            (n.prototype.timeoutPendingState = function() {
              switch (this.state) {
                case "attaching":
                  var t = new S("Channel attach timed out", 90007, 408);
                  this.notifyState("suspended", t);
                  break;
                case "detaching":
                  t = new S("Channel detach timed out", 90007, 408);
                  this.notifyState("attached", t);
                  break;
                default:
                  this.checkPendingState();
              }
            }),
            (n.prototype.startStateTimerIfNotRunning = function() {
              var t = this;
              this.stateTimer ||
                (this.stateTimer = setTimeout(function() {
                  b.logAction(b.LOG_MINOR, "RealtimeChannel.startStateTimerIfNotRunning", "timer expired"), (t.stateTimer = null), t.timeoutPendingState();
                }, this.realtime.options.timeouts.realtimeRequestTimeout));
            }),
            (n.prototype.clearStateTimer = function() {
              var t = this.stateTimer;
              t && (clearTimeout(t), (this.stateTimer = null));
            }),
            (n.prototype.startRetryTimer = function() {
              var t = this;
              this.retryTimer ||
                (this.retryTimer = setTimeout(function() {
                  "suspended" === t.state &&
                    t.connectionManager.state.sendEvents &&
                    ((t.retryTimer = null), b.logAction(b.LOG_MINOR, "RealtimeChannel retry timer expired", "attempting a new attach"), t.requestState("attaching"));
                }, this.realtime.options.timeouts.channelRetryTimeout));
            }),
            (n.prototype.cancelRetryTimer = function() {
              this.retryTimer && (clearTimeout(this.retryTimer), (this.suspendTimer = null));
            }),
            (n.prototype.setInProgress = function(t, e) {
              this.rest.channels.setInProgress(this, t, e);
            }),
            (n.prototype.history = function(t, n) {
              if ((b.logAction(b.LOG_MICRO, "RealtimeChannel.history()", "channel = " + this.name), void 0 === n))
                if ("function" == typeof t) (n = t), (t = null);
                else {
                  if (this.rest.options.promises) return y.promisify(this, "history", arguments);
                  n = e;
                }
              if (t && t.untilAttach) {
                if ("attached" !== this.state) return void n(new S("option untilAttach requires the channel to be attached", 4e4, 400));
                if (!this.properties.attachSerial) return void n(new S("untilAttach was specified and channel is attached, but attachSerial is not defined", 4e4, 400));
                delete t.untilAttach, (t.from_serial = this.properties.attachSerial);
              }
              K.prototype._history.call(this, t, n);
            }),
            (n.prototype.whenState = function(t, e) {
              A.prototype.whenState.call(this, t, this.state, e);
            }),
            n
          );
        })(),
        Q = (function() {
          var t = function() {};
          function e(t) {
            return t.clientId + ":" + t.connectionId;
          }
          function n(t) {
            var e = t.channel.realtime,
              n = e.auth.clientId;
            return (!n || "*" === n) && "connected" === e.connection.state;
          }
          function i(t, e, n) {
            switch (t.state) {
              case "attached":
              case "suspended":
                n();
                break;
              case "initialized":
              case "detached":
              case "detaching":
              case "attaching":
                t.attach(function(t) {
                  t ? e(t) : n();
                });
                break;
              default:
                e(S.fromValues(Y.invalidStateError(t.state)));
            }
          }
          function r(t, e) {
            B.call(this, t), (this.syncComplete = !1), (this.members = new o(this)), (this._myMembers = new o(this)), (this.subscriptions = new A()), (this.pendingPresence = []);
          }
          function o(t) {
            A.call(this), (this.presence = t), (this.map = {}), (this.syncInProgress = !1), (this.residualMembers = null);
          }
          function s(t, e) {
            if (t.isSynthesized() || e.isSynthesized()) return t.timestamp > e.timestamp;
            var n = t.parseId(),
              i = e.parseId();
            return n.msgSerial === i.msgSerial ? n.index > i.index : n.msgSerial > i.msgSerial;
          }
          return (
            y.inherits(r, B),
            (r.prototype.enter = function(t, e) {
              if (n(this)) throw new S("clientId must be specified to enter a presence channel", 40012, 400);
              return this._enterOrUpdateClient(void 0, t, "enter", e);
            }),
            (r.prototype.update = function(t, e) {
              if (n(this)) throw new S("clientId must be specified to update presence data", 40012, 400);
              return this._enterOrUpdateClient(void 0, t, "update", e);
            }),
            (r.prototype.enterClient = function(t, e, n) {
              return this._enterOrUpdateClient(t, e, "enter", n);
            }),
            (r.prototype.updateClient = function(t, e, n) {
              return this._enterOrUpdateClient(t, e, "update", n);
            }),
            (r.prototype._enterOrUpdateClient = function(e, n, i, r) {
              if (!r)
                if ("function" == typeof n) (r = n), (n = null);
                else {
                  if (this.channel.realtime.options.promises) return y.promisify(this, "_enterOrUpdateClient", [e, n, i]);
                  r = t;
                }
              var o = this.channel;
              if (o.connectionManager.activeState()) {
                b.logAction(b.LOG_MICRO, "RealtimePresence." + i + "Client()", "channel = " + o.name + ", client = " + (e || "(implicit) " + this.channel.realtime.auth.clientId));
                var s = T.fromValues({ action: i, data: n });
                e && (s.clientId = e);
                var a = this;
                T.encode(s, o.channelOptions, function(t) {
                  if (t) r(t);
                  else
                    switch (o.state) {
                      case "attached":
                        o.sendPresence(s, r);
                        break;
                      case "initialized":
                      case "detached":
                        o.attach();
                      case "attaching":
                        a.pendingPresence.push({ presence: s, callback: r });
                        break;
                      default:
                        ((t = new S("Unable to " + i + " presence channel (incompatible state)", 90001)).code = 90001), r(t);
                    }
                });
              } else r(o.connectionManager.getError());
            }),
            (r.prototype.leave = function(t, e) {
              if (n(this)) throw new S("clientId must have been specified to enter or leave a presence channel", 40012, 400);
              return this.leaveClient(void 0, t, e);
            }),
            (r.prototype.leaveClient = function(e, n, i) {
              if (!i)
                if ("function" == typeof n) (i = n), (n = null);
                else {
                  if (this.channel.realtime.options.promises) return y.promisify(this, "leaveClient", [e, n]);
                  i = t;
                }
              var r = this.channel;
              if (r.connectionManager.activeState()) {
                b.logAction(b.LOG_MICRO, "RealtimePresence.leaveClient()", "leaving; channel = " + this.channel.name + ", client = " + e);
                var o = T.fromValues({ action: "leave", data: n });
                switch ((e && (o.clientId = e), r.state)) {
                  case "attached":
                    r.sendPresence(o, i);
                    break;
                  case "attaching":
                    this.pendingPresence.push({ presence: o, callback: i });
                    break;
                  case "initialized":
                  case "failed":
                    i(new S("Unable to leave presence channel (incompatible state)", 90001));
                    break;
                  default:
                    i(P.failed);
                }
              } else i(r.connectionManager.getError());
            }),
            (r.prototype.get = function() {
              var e = Array.prototype.slice.call(arguments);
              1 == e.length && "function" == typeof e[0] && e.unshift(null);
              var n = e[0],
                r = e[1],
                o = !n || !("waitForSync" in n) || n.waitForSync;
              if (!r) {
                if (this.channel.realtime.options.promises) return y.promisify(this, "get", e);
                r = t;
              }
              function s(t) {
                r(null, n ? t.list(n) : t.values());
              }
              if ("suspended" !== this.channel.state) {
                var a = this;
                i(this.channel, r, function() {
                  var t = a.members;
                  o
                    ? t.waitSync(function() {
                        s(t);
                      })
                    : s(t);
                });
              } else o ? r(S.fromValues({ statusCode: 400, code: 91005, message: "Presence state is out of sync due to channel being in the SUSPENDED state" })) : s(this.members);
            }),
            (r.prototype.history = function(e, n) {
              if ((b.logAction(b.LOG_MICRO, "RealtimePresence.history()", "channel = " + this.name), void 0 === n))
                if ("function" == typeof e) (n = e), (e = null);
                else {
                  if (this.channel.realtime.options.promises) return y.promisify(this, "history", arguments);
                  n = t;
                }
              e &&
                e.untilAttach &&
                ("attached" === this.channel.state
                  ? (delete e.untilAttach, (e.from_serial = this.channel.properties.attachSerial))
                  : n(new S("option untilAttach requires the channel to be attached, was: " + this.channel.state, 4e4, 400))),
                B.prototype._history.call(this, e, n);
            }),
            (r.prototype.setPresence = function(t, e, n) {
              b.logAction(b.LOG_MICRO, "RealtimePresence.setPresence()", "received presence for " + t.length + " participants; syncChannelSerial = " + n);
              var i,
                r,
                o = this.members,
                s = this._myMembers,
                a = [],
                c = this.channel.connectionManager.connectionId;
              e && (this.members.startSync(), n && (r = n.match(/^[\w\-]+:(.*)$/)) && (i = r[1]));
              for (var u = 0; u < t.length; u++) {
                switch ((h = T.fromValues(t[u])).action) {
                  case "leave":
                    o.remove(h) && a.push(h), h.connectionId !== c || h.isSynthesized() || s.remove(h);
                    break;
                  case "enter":
                  case "present":
                  case "update":
                    o.put(h) && a.push(h), h.connectionId === c && s.put(h);
                }
              }
              e && !i && (o.endSync(), this._ensureMyMembersPresent(), this.channel.setInProgress(Y.progressOps.sync, !1), (this.channel.syncChannelSerial = null));
              for (u = 0; u < a.length; u++) {
                var h = a[u];
                this.subscriptions.emit(h.action, h);
              }
            }),
            (r.prototype.onAttached = function(t) {
              b.logAction(b.LOG_MINOR, "RealtimePresence.onAttached()", "channel = " + this.channel.name + ", hasPresence = " + t),
                t ? this.members.startSync() : (this._synthesizeLeaves(this.members.values()), this.members.clear(), this._ensureMyMembersPresent());
              var e = this.pendingPresence,
                n = e.length;
              if (n) {
                this.pendingPresence = [];
                var i = [],
                  r = w();
                b.logAction(b.LOG_MICRO, "RealtimePresence.onAttached", "sending " + n + " queued presence messages");
                for (var o = 0; o < n; o++) {
                  var s = e[o];
                  i.push(s.presence), r.push(s.callback);
                }
                this.channel.sendPresence(i, r);
              }
            }),
            (r.prototype.actOnChannelState = function(t, e, n) {
              switch (t) {
                case "attached":
                  this.onAttached(e);
                  break;
                case "detached":
                case "failed":
                  this._clearMyMembers(), this.members.clear();
                case "suspended":
                  this.failPendingPresence(n);
              }
            }),
            (r.prototype.failPendingPresence = function(t) {
              if (this.pendingPresence.length) {
                b.logAction(b.LOG_MINOR, "RealtimeChannel.failPendingPresence", "channel; name = " + this.channel.name + ", err = " + y.inspectError(t));
                for (var e = 0; e < this.pendingPresence.length; e++)
                  try {
                    this.pendingPresence[e].callback(t);
                  } catch (t) {}
                this.pendingPresence = [];
              }
            }),
            (r.prototype._clearMyMembers = function() {
              this._myMembers.clear();
            }),
            (r.prototype._ensureMyMembersPresent = function() {
              var t = this,
                e = this.members,
                n = this._myMembers,
                i = function(e) {
                  if (e) {
                    var n = "Presence auto-re-enter failed: " + e.toString(),
                      i = new S(n, 91004, 400);
                    b.logAction(b.LOG_ERROR, "RealtimePresence._ensureMyMembersPresent()", n);
                    var r = new V(t.channel.state, t.channel.state, !0, i);
                    t.channel.emit("update", r);
                  }
                };
              for (var r in n.map)
                if (!(r in e.map)) {
                  var o = n.map[r];
                  b.logAction(b.LOG_MICRO, "RealtimePresence._ensureMyMembersPresent()", 'Auto-reentering clientId "' + o.clientId + '" into the presence set'),
                    this._enterOrUpdateClient(o.clientId, o.data, "enter", i),
                    delete n.map[r];
                }
            }),
            (r.prototype._synthesizeLeaves = function(t) {
              var e = this.subscriptions;
              y.arrForEach(t, function(t) {
                var n = T.fromValues({ action: "leave", connectionId: t.connectionId, clientId: t.clientId, data: t.data, encoding: t.encoding, timestamp: y.now() });
                e.emit("leave", n);
              });
            }),
            (r.prototype.on = function() {
              b.deprecated("presence.on", "presence.subscribe"), this.subscribe.apply(this, arguments);
            }),
            (r.prototype.off = function() {
              b.deprecated("presence.off", "presence.unsubscribe"), this.unsubscribe.apply(this, arguments);
            }),
            (r.prototype.subscribe = function() {
              var e = Y.processListenerArgs(arguments),
                n = e[0],
                i = e[1],
                r = e[2],
                o = this.channel;
              if (!r) {
                if (this.channel.realtime.options.promises) return y.promisify(this, "subscribe", [n, i]);
                r = t;
              }
              "failed" !== o.state ? (this.subscriptions.on(n, i), o.attach(r)) : r(S.fromValues(Y.invalidStateError("failed")));
            }),
            (r.prototype.unsubscribe = function() {
              var t = Y.processListenerArgs(arguments),
                e = t[0],
                n = t[1];
              this.subscriptions.off(e, n);
            }),
            y.inherits(o, A),
            (o.prototype.get = function(t) {
              return this.map[t];
            }),
            (o.prototype.getClient = function(t) {
              var e = this.map,
                n = [];
              for (var i in e) {
                var r = e[i];
                r.clientId == t && "absent" != r.action && n.push(r);
              }
              return n;
            }),
            (o.prototype.list = function(t) {
              var e = this.map,
                n = t && t.clientId,
                i = t && t.connectionId,
                r = [];
              for (var o in e) {
                var s = e[o];
                "absent" !== s.action && ((n && n != s.clientId) || (i && i != s.connectionId) || r.push(s));
              }
              return r;
            }),
            (o.prototype.put = function(t) {
              ("enter" !== t.action && "update" !== t.action) || ((t = T.fromValues(t)).action = "present");
              var n = this.map,
                i = e(t);
              this.residualMembers && delete this.residualMembers[i];
              var r = n[i];
              return !(r && !s(t, r)) && ((n[i] = t), !0);
            }),
            (o.prototype.values = function() {
              var t = this.map,
                e = [];
              for (var n in t) {
                var i = t[n];
                "absent" != i.action && e.push(i);
              }
              return e;
            }),
            (o.prototype.remove = function(t) {
              var n = this.map,
                i = e(t),
                r = n[i];
              return !(r && !s(t, r)) && (this.syncInProgress ? (((t = T.fromValues(t)).action = "absent"), (n[i] = t)) : delete n[i], !0);
            }),
            (o.prototype.startSync = function() {
              var t = this.map,
                e = this.syncInProgress;
              b.logAction(b.LOG_MINOR, "PresenceMap.startSync()", "channel = " + this.presence.channel.name + "; syncInProgress = " + e),
                this.syncInProgress || ((this.residualMembers = y.copy(t)), this.setInProgress(!0));
            }),
            (o.prototype.endSync = function() {
              var t = this.map,
                e = this.syncInProgress;
              if ((b.logAction(b.LOG_MINOR, "PresenceMap.endSync()", "channel = " + this.presence.channel.name + "; syncInProgress = " + e), e)) {
                for (var n in t) {
                  "absent" === t[n].action && delete t[n];
                }
                for (var n in (this.presence._synthesizeLeaves(y.valuesArray(this.residualMembers)), this.residualMembers)) delete t[n];
                (this.residualMembers = null), this.setInProgress(!1);
              }
              this.emit("sync");
            }),
            (o.prototype.waitSync = function(t) {
              var e = this.syncInProgress;
              b.logAction(b.LOG_MINOR, "PresenceMap.waitSync()", "channel = " + this.presence.channel.name + "; syncInProgress = " + e), e ? this.once("sync", t) : t();
            }),
            (o.prototype.clear = function(t) {
              (this.map = {}), this.setInProgress(!1), (this.residualMembers = null);
            }),
            (o.prototype.setInProgress = function(t) {
              b.logAction(b.LOG_MICRO, "PresenceMap.setInProgress()", "inProgress = " + t), (this.syncInProgress = t), (this.presence.syncComplete = !t);
            }),
            r
          );
        })(),
        X = (function() {
          var t = function() {},
            e = 0,
            n = {},
            i = 3;
          var r = void 0 !== s && s.XDomainRequest;
          function o() {
            var t, e;
            return r && (t = (e = navigator.userAgent.toString().match(/MSIE\s([\d.]+)/)) && Number(e[1])) && 10 === t;
          }
          function a(t, i, r, s, a, c, u) {
            A.call(this),
              ((r = r || {}).rnd = y.cheapRandStr()),
              o() && !r.envelope && (r.envelope = "json"),
              (this.uri = t + y.toQueryString(r)),
              (this.headers = i || {}),
              (this.body = s),
              (this.method = u ? u.toUpperCase() : y.isEmptyArg(s) ? "GET" : "POST"),
              (this.requestMode = a),
              (this.timeouts = c),
              (this.timedOut = !1),
              (this.requestComplete = !1),
              (n[(this.id = String(++e))] = this);
          }
          y.inherits(a, A);
          var u = (a.createRequest = function(t, e, n, i, r, o, s) {
            return (o = o || g.TIMEOUTS), new a(t, e, y.copy(n), i, r, o, s);
          });
          return (
            (a.prototype.complete = function(t, e, n, i, r) {
              this.requestComplete || ((this.requestComplete = !0), e && this.emit("data", e), this.emit("complete", t, e, n, i, r), this.dispose());
            }),
            (a.prototype.abort = function() {
              this.dispose();
            }),
            (a.prototype.exec = function() {
              var t = 0 == this.requestMode ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout,
                e = this,
                n = (this.timer = setTimeout(function() {
                  (e.timedOut = !0), a.abort();
                }, t)),
                r = this.body,
                o = this.method,
                s = this.headers,
                a = (this.xhr = new XMLHttpRequest()),
                c = s.accept,
                u = "text";
              (c ? 0 === c.indexOf("application/x-msgpack") && (u = "arraybuffer") : (s.accept = "application/json"), r) &&
                (s["content-type"] || (s["content-type"] = "application/json")).indexOf("application/json") > -1 &&
                "string" != typeof r &&
                (r = JSON.stringify(r));
              for (var h in (a.open(o, this.uri, !0), (a.responseType = u), "authorization" in s && (a.withCredentials = !0), s)) a.setRequestHeader(h, s[h]);
              var l = function(t, n, i, r) {
                var o = n + " (event type: " + t.type + ")" + (e.xhr.statusText ? ", current statusText is " + e.xhr.statusText : "");
                b.logAction(b.LOG_ERROR, "Request.on" + t.type + "()", o), e.complete(new S(o, i, r));
              };
              (a.onerror = function(t) {
                l(t, "XHR error occurred", null, 400);
              }),
                (a.onabort = function(t) {
                  e.timedOut ? l(t, "Request aborted due to request timeout expiring", null, 408) : l(t, "Request cancelled", null, 400);
                }),
                (a.ontimeout = function(t) {
                  l(t, "Request timed out", null, 408);
                });
              var f,
                p,
                d,
                g,
                v = 0,
                O = !1;
              function R() {
                try {
                  var t,
                    n,
                    i = (function(t, e) {
                      return t.getResponseHeader && t.getResponseHeader(e);
                    })(a, "content-type");
                  (i
                  ? i.indexOf("application/json") >= 0
                  : "text" == a.responseType)
                    ? ((n = "arraybuffer" === a.responseType ? m.utf8Decode(a.response) : String(a.responseText)).length && (n = JSON.parse(n)), (O = !0))
                    : (n = a.response),
                    void 0 !== n.response
                      ? ((p = n.statusCode), (g = p < 400), (t = n.headers), (n = n.response))
                      : (t = (function(t) {
                          for (var e = y.trim(t.getAllResponseHeaders()).split("\r\n"), n = {}, i = 0; i < e.length; i++) {
                            var r = y.arrMap(e[i].split(":"), y.trim);
                            n[r[0].toLowerCase()] = r[1];
                          }
                          return n;
                        })(a));
                } catch (t) {
                  return void e.complete(new S("Malformed response body from server: " + t.message, null, 400));
                }
                if (g || y.isArray(n)) e.complete(null, n, t, O, p);
                else {
                  var r = n.error;
                  r || (r = new S("Error response received from server: " + p + " body was: " + y.inspect(n), null, p)), e.complete(r, n, t, O, p);
                }
              }
              function A() {
                for (var t, e, n = (d = a.responseText).length - 1; v < n && (t = d.indexOf("\n", v)) > -1; ) (e = d.slice(v, t)), (v = t + 1), w(e);
              }
              function w(t) {
                try {
                  t = JSON.parse(t);
                } catch (t) {
                  return void e.complete(new S("Malformed response body from server: " + t.message, null, 400));
                }
                e.emit("data", t);
              }
              (a.onreadystatechange = function() {
                var t = a.readyState;
                t < 3 ||
                  (0 !== a.status &&
                    (void 0 === p &&
                      (1223 === (p = a.status) && (p = 204),
                      clearTimeout(n),
                      (g = p < 400),
                      204 != p
                        ? (f =
                            e.requestMode == i &&
                            g &&
                            (function(t) {
                              return t.getResponseHeader && (t.getResponseHeader("transfer-encoding") || !t.getResponseHeader("content-length"));
                            })(a))
                        : e.complete(null, null, null, null, p)),
                    3 == t && f
                      ? A()
                      : 4 == t &&
                        (f
                          ? (A(),
                            (e.streamComplete = !0),
                            y.nextTick(function() {
                              e.complete();
                            }))
                          : R())));
              }),
                a.send(r);
            }),
            (a.prototype.dispose = function() {
              var e = this.xhr;
              if (e) {
                (e.onreadystatechange = e.onerror = e.onabort = e.ontimeout = t), (this.xhr = null);
                var i = this.timer;
                i && (clearTimeout(i), (this.timer = null)), this.requestComplete || e.abort();
              }
              delete n[this.id];
            }),
            f.xhrSupported &&
              ("object" == typeof c &&
                c.addUnloadListener(function() {
                  for (var t in n) n[t].dispose();
                }),
              void 0 !== v &&
                ((v.supportsAuthHeaders = !0),
                (v.Request = function(t, e, n, i, r, o, s) {
                  var a = u(n, i, r, o, 0, e && e.options.timeouts, t);
                  return a.once("complete", s), a.exec(), a;
                }),
                (v.checkConnectivity = function(t) {
                  var e = g.internetUpUrl;
                  b.logAction(b.LOG_MICRO, "(XHRRequest)Http.checkConnectivity()", "Sending; " + e),
                    v.getUri(null, e, null, null, function(e, n) {
                      var i = !e && "yes" == n.replace(/\n/, "");
                      b.logAction(b.LOG_MICRO, "(XHRRequest)Http.checkConnectivity()", "Result: " + i), t(null, i);
                    });
                }))),
            a
          );
        })();
      (function() {
        var t = "xhr_streaming";
        function e(e, n, i) {
          G.call(this, e, n, i), (this.shortName = t);
        }
        y.inherits(e, G),
          (e.isAvailable = function() {
            return f.xhrSupported && f.streamingSupported && f.allowComet;
          }),
          (e.tryConnect = function(t, n, i, r) {
            var o = new e(t, n, i),
              s = function(t) {
                r({ event: this.event, error: t });
              };
            o.on(["failed", "disconnected"], s),
              o.on("preconnect", function() {
                b.logAction(b.LOG_MINOR, "XHRStreamingTransport.tryConnect()", "viable transport " + o), o.off(["failed", "disconnected"], s), r(null, o);
              }),
              o.connect();
          }),
          (e.prototype.toString = function() {
            return "XHRStreamingTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected;
          }),
          (e.prototype.createRequest = function(t, e, n, i, r) {
            return X.createRequest(t, e, n, i, r, this.timeouts);
          }),
          void 0 !== U && e.isAvailable() && (U.supportedTransports[t] = e);
      })(),
        (function() {
          var t = "xhr_polling";
          function e(e, n, i) {
            (i.stream = !1), G.call(this, e, n, i), (this.shortName = t);
          }
          y.inherits(e, G),
            (e.isAvailable = function() {
              return f.xhrSupported && f.allowComet;
            }),
            (e.tryConnect = function(t, n, i, r) {
              var o = new e(t, n, i),
                s = function(t) {
                  r({ event: this.event, error: t });
                };
              o.on(["failed", "disconnected"], s),
                o.on("preconnect", function() {
                  b.logAction(b.LOG_MINOR, "XHRPollingTransport.tryConnect()", "viable transport " + o), o.off(["failed", "disconnected"], s), r(null, o);
                }),
                o.connect();
            }),
            (e.prototype.toString = function() {
              return "XHRPollingTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected;
            }),
            (e.prototype.createRequest = function(t, e, n, i, r) {
              return X.createRequest(t, e, n, i, r, this.timeouts);
            }),
            void 0 !== U && e.isAvailable() && (U.supportedTransports[t] = e);
        })(),
        (function() {
          var t = function() {},
            e = (s._ablyjs_jsonp = {});
          e._ = function(n) {
            return e["_" + n] || t;
          };
          var n = 1,
            i = null,
            r = "jsonp";
          function o(t, e, n) {
            (n.stream = !1), G.call(this, t, e, n), (this.shortName = r);
          }
          y.inherits(o, G),
            (o.isAvailable = function() {
              return f.jsonpSupported && f.allowComet;
            }),
            o.isAvailable() && (U.supportedTransports[r] = o),
            f.jsonpSupported && (i = document.getElementsByTagName("head")[0]);
          var a = null;
          (s.JSONPTransport = o),
            (o.tryConnect = function(t, e, n, i) {
              var r = new o(t, e, n),
                s = function(t) {
                  i({ event: this.event, error: t });
                };
              r.on(["failed", "disconnected"], s),
                r.on("preconnect", function() {
                  b.logAction(b.LOG_MINOR, "JSONPTransport.tryConnect()", "viable transport " + r), r.off(["failed", "disconnected"], s), i(null, r);
                }),
                r.connect();
            }),
            (o.prototype.toString = function() {
              return "JSONPTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected;
            });
          var c = (o.prototype.createRequest = function(t, e, n, i, r, o, s) {
            return (o = (this && this.timeouts) || o || g.TIMEOUTS), new u(void 0, t, e, y.copy(n), i, r, o, s);
          });
          function u(t, e, i, r, o, s, a, c) {
            A.call(this),
              void 0 === t && (t = n++),
              (this.id = t),
              (this.uri = e),
              (this.params = r || {}),
              (this.params.rnd = y.cheapRandStr()),
              i && (i["X-Ably-Version"] && (this.params.v = i["X-Ably-Version"]), i["X-Ably-Lib"] && (this.params.lib = i["X-Ably-Lib"])),
              (this.body = o),
              (this.method = c),
              (this.requestMode = s),
              (this.timeouts = a),
              (this.requestComplete = !1);
          }
          y.inherits(u, A),
            (u.prototype.exec = function() {
              var t = this.id,
                n = this.body,
                r = this.method,
                o = this.uri,
                s = this.params,
                a = this;
              (s.callback = "_ablyjs_jsonp._(" + t + ")"), (s.envelope = "jsonp"), n && (s.body = n), r && "get" !== r && (s.method = r);
              var c = (this.script = document.createElement("script")),
                u = o + y.toQueryString(s);
              (c.src = u),
                c.src.split("/").slice(-1)[0] !== u.split("/").slice(-1)[0] &&
                  b.logAction(
                    b.LOG_ERROR,
                    "JSONP Request.exec()",
                    "Warning: the browser appears to have truncated the script URI. This will likely result in the request failing due to an unparseable body param",
                  ),
                (c.async = !0),
                (c.type = "text/javascript"),
                (c.charset = "UTF-8"),
                (c.onerror = function(t) {
                  a.complete(new S("JSONP script error (event: " + y.inspect(t) + ")", null, 400));
                }),
                (e["_" + t] = function(t) {
                  if (t.statusCode) {
                    var e = t.response;
                    if (204 == t.statusCode) a.complete(null, null, null, t.statusCode);
                    else if (e)
                      if (t.statusCode < 400 || y.isArray(e)) a.complete(null, e, t.headers, t.statusCode);
                      else {
                        var n = e.error || new S("Error response received from server", null, t.statusCode);
                        a.complete(n);
                      }
                    else a.complete(new S("Invalid server response: no envelope detected", null, 500));
                  } else a.complete(null, t);
                });
              var h = this.requestMode == G.REQ_SEND ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout;
              (this.timer = setTimeout(function() {
                a.abort();
              }, h)),
                i.insertBefore(c, i.firstChild);
            }),
            (u.prototype.complete = function(t, e, n, i) {
              var r;
              ((n = n || {}), this.requestComplete) ||
                ((this.requestComplete = !0),
                e && ((r = "string" == typeof e ? "text/plain" : "application/json"), (n["content-type"] = r), this.emit("data", e)),
                this.emit("complete", t, e, n, !0, i),
                this.dispose());
            }),
            (u.prototype.abort = function() {
              this.dispose();
            }),
            (u.prototype.dispose = function() {
              var t = this.timer;
              t && (clearTimeout(t), (this.timer = null));
              var n = this.script;
              n.parentNode && n.parentNode.removeChild(n), delete e[this.id], this.emit("disposed");
            }),
            f.jsonpSupported &&
              !v.Request &&
              ((v.Request = function(t, e, n, i, r, o, s) {
                var a = c(n, i, r, o, G.REQ_SEND, e && e.options.timeouts, t);
                return (
                  a.once("complete", s),
                  y.nextTick(function() {
                    a.exec();
                  }),
                  a
                );
              }),
              (v.checkConnectivity = function(t) {
                var e = g.jsonpInternetUpUrl;
                if (a) a.push(t);
                else {
                  (a = [t]), b.logAction(b.LOG_MICRO, "(JSONP)Http.checkConnectivity()", "Sending; " + e);
                  var n = new u("isTheInternetUp", e, null, null, null, G.REQ_SEND, g.TIMEOUTS);
                  n.once("complete", function(t, e) {
                    var n = !t && e;
                    b.logAction(b.LOG_MICRO, "(JSONP)Http.checkConnectivity()", "Result: " + n);
                    for (var i = 0; i < a.length; i++) a[i](null, n);
                    a = null;
                  }),
                    y.nextTick(function() {
                      n.exec();
                    });
                }
              }));
        })();
      (o.msgpack = u),
        (o.Rest = j),
        (o.Realtime = z),
        (z.ConnectionManager = U),
        (z.BufferUtils = j.BufferUtils = m),
        void 0 !== p && (z.Crypto = j.Crypto = p),
        (z.Defaults = j.Defaults = g),
        (z.Http = j.Http = v),
        (z.Utils = j.Utils = y),
        (z.Http = j.Http = v),
        (z.Message = j.Message = _),
        (z.PresenceMessage = j.PresenceMessage = T),
        (z.ProtocolMessage = j.ProtocolMessage = I),
        (t.exports = o),
        (t.exports.__esModule = !0);
    }.call(this, n(2).Buffer));
  },
  function(t, e, n) {
    "use strict";
    (function(t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var i = n(4),
        r = n(5),
        o = n(6);
      function s() {
        return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(t, e) {
        if (s() < e) throw new RangeError("Invalid typed array length");
        return c.TYPED_ARRAY_SUPPORT ? ((t = new Uint8Array(e)).__proto__ = c.prototype) : (null === t && (t = new c(e)), (t.length = e)), t;
      }
      function c(t, e, n) {
        if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return l(this, t);
        }
        return u(this, t, e, n);
      }
      function u(t, e, n, i) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
          ? (function(t, e, n, i) {
              if ((e.byteLength, n < 0 || e.byteLength < n)) throw new RangeError("'offset' is out of bounds");
              if (e.byteLength < n + (i || 0)) throw new RangeError("'length' is out of bounds");
              e = void 0 === n && void 0 === i ? new Uint8Array(e) : void 0 === i ? new Uint8Array(e, n) : new Uint8Array(e, n, i);
              c.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = c.prototype) : (t = f(t, e));
              return t;
            })(t, e, n, i)
          : "string" == typeof e
          ? (function(t, e, n) {
              ("string" == typeof n && "" !== n) || (n = "utf8");
              if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
              var i = 0 | d(e, n),
                r = (t = a(t, i)).write(e, n);
              r !== i && (t = t.slice(0, r));
              return t;
            })(t, e, n)
          : (function(t, e) {
              if (c.isBuffer(e)) {
                var n = 0 | p(e.length);
                return 0 === (t = a(t, n)).length ? t : (e.copy(t, 0, 0, n), t);
              }
              if (e) {
                if (("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || "length" in e) return "number" != typeof e.length || (i = e.length) != i ? a(t, 0) : f(t, e);
                if ("Buffer" === e.type && o(e.data)) return f(t, e.data);
              }
              var i;
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            })(t, e);
      }
      function h(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function l(t, e) {
        if ((h(e), (t = a(t, e < 0 ? 0 : 0 | p(e))), !c.TYPED_ARRAY_SUPPORT)) for (var n = 0; n < e; ++n) t[n] = 0;
        return t;
      }
      function f(t, e) {
        var n = e.length < 0 ? 0 : 0 | p(e.length);
        t = a(t, n);
        for (var i = 0; i < n; i += 1) t[i] = 255 & e[i];
        return t;
      }
      function p(t) {
        if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
        return 0 | t;
      }
      function d(t, e) {
        if (c.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;
        for (var i = !1; ; )
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;
            case "utf8":
            case "utf-8":
            case void 0:
              return H(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return j(t).length;
            default:
              if (i) return H(t).length;
              (e = ("" + e).toLowerCase()), (i = !0);
          }
      }
      function g(t, e, n) {
        var i = !1;
        if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
        if (((void 0 === n || n > this.length) && (n = this.length), n <= 0)) return "";
        if ((n >>>= 0) <= (e >>>= 0)) return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return E(this, e, n);
            case "utf8":
            case "utf-8":
              return _(this, e, n);
            case "ascii":
              return I(this, e, n);
            case "latin1":
            case "binary":
              return M(this, e, n);
            case "base64":
              return S(this, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return k(this, e, n);
            default:
              if (i) throw new TypeError("Unknown encoding: " + t);
              (t = (t + "").toLowerCase()), (i = !0);
          }
      }
      function m(t, e, n) {
        var i = t[e];
        (t[e] = t[n]), (t[n] = i);
      }
      function y(t, e, n, i, r) {
        if (0 === t.length) return -1;
        if (
          ("string" == typeof n ? ((i = n), (n = 0)) : n > 2147483647 ? (n = 2147483647) : n < -2147483648 && (n = -2147483648),
          (n = +n),
          isNaN(n) && (n = r ? 0 : t.length - 1),
          n < 0 && (n = t.length + n),
          n >= t.length)
        ) {
          if (r) return -1;
          n = t.length - 1;
        } else if (n < 0) {
          if (!r) return -1;
          n = 0;
        }
        if (("string" == typeof e && (e = c.from(e, i)), c.isBuffer(e))) return 0 === e.length ? -1 : v(t, e, n, i, r);
        if ("number" == typeof e)
          return (
            (e &= 255),
            c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf
              ? r
                ? Uint8Array.prototype.indexOf.call(t, e, n)
                : Uint8Array.prototype.lastIndexOf.call(t, e, n)
              : v(t, [e], n, i, r)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(t, e, n, i, r) {
        var o,
          s = 1,
          a = t.length,
          c = e.length;
        if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
          if (t.length < 2 || e.length < 2) return -1;
          (s = 2), (a /= 2), (c /= 2), (n /= 2);
        }
        function u(t, e) {
          return 1 === s ? t[e] : t.readUInt16BE(e * s);
        }
        if (r) {
          var h = -1;
          for (o = n; o < a; o++)
            if (u(t, o) === u(e, -1 === h ? 0 : o - h)) {
              if ((-1 === h && (h = o), o - h + 1 === c)) return h * s;
            } else -1 !== h && (o -= o - h), (h = -1);
        } else
          for (n + c > a && (n = a - c), o = n; o >= 0; o--) {
            for (var l = !0, f = 0; f < c; f++)
              if (u(t, o + f) !== u(e, f)) {
                l = !1;
                break;
              }
            if (l) return o;
          }
        return -1;
      }
      function O(t, e, n, i) {
        n = Number(n) || 0;
        var r = t.length - n;
        i ? (i = Number(i)) > r && (i = r) : (i = r);
        var o = e.length;
        if (o % 2 != 0) throw new TypeError("Invalid hex string");
        i > o / 2 && (i = o / 2);
        for (var s = 0; s < i; ++s) {
          var a = parseInt(e.substr(2 * s, 2), 16);
          if (isNaN(a)) return s;
          t[n + s] = a;
        }
        return s;
      }
      function R(t, e, n, i) {
        return z(H(e, t.length - n), t, n, i);
      }
      function A(t, e, n, i) {
        return z(
          (function(t) {
            for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
            return e;
          })(e),
          t,
          n,
          i,
        );
      }
      function b(t, e, n, i) {
        return A(t, e, n, i);
      }
      function w(t, e, n, i) {
        return z(j(e), t, n, i);
      }
      function C(t, e, n, i) {
        return z(
          (function(t, e) {
            for (var n, i, r, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) (n = t.charCodeAt(s)), (i = n >> 8), (r = n % 256), o.push(r), o.push(i);
            return o;
          })(e, t.length - n),
          t,
          n,
          i,
        );
      }
      function S(t, e, n) {
        return 0 === e && n === t.length ? i.fromByteArray(t) : i.fromByteArray(t.slice(e, n));
      }
      function _(t, e, n) {
        n = Math.min(t.length, n);
        for (var i = [], r = e; r < n; ) {
          var o,
            s,
            a,
            c,
            u = t[r],
            h = null,
            l = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
          if (r + l <= n)
            switch (l) {
              case 1:
                u < 128 && (h = u);
                break;
              case 2:
                128 == (192 & (o = t[r + 1])) && (c = ((31 & u) << 6) | (63 & o)) > 127 && (h = c);
                break;
              case 3:
                (o = t[r + 1]), (s = t[r + 2]), 128 == (192 & o) && 128 == (192 & s) && (c = ((15 & u) << 12) | ((63 & o) << 6) | (63 & s)) > 2047 && (c < 55296 || c > 57343) && (h = c);
                break;
              case 4:
                (o = t[r + 1]),
                  (s = t[r + 2]),
                  (a = t[r + 3]),
                  128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (c = ((15 & u) << 18) | ((63 & o) << 12) | ((63 & s) << 6) | (63 & a)) > 65535 && c < 1114112 && (h = c);
            }
          null === h ? ((h = 65533), (l = 1)) : h > 65535 && ((h -= 65536), i.push(((h >>> 10) & 1023) | 55296), (h = 56320 | (1023 & h))), i.push(h), (r += l);
        }
        return (function(t) {
          var e = t.length;
          if (e <= T) return String.fromCharCode.apply(String, t);
          var n = "",
            i = 0;
          for (; i < e; ) n += String.fromCharCode.apply(String, t.slice(i, (i += T)));
          return n;
        })(i);
      }
      (e.Buffer = c),
        (e.SlowBuffer = function(t) {
          +t != t && (t = 0);
          return c.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (c.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function() {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function() {
                        return 42;
                      },
                    }),
                    42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (e.kMaxLength = s()),
        (c.poolSize = 8192),
        (c._augment = function(t) {
          return (t.__proto__ = c.prototype), t;
        }),
        (c.from = function(t, e, n) {
          return u(null, t, e, n);
        }),
        c.TYPED_ARRAY_SUPPORT &&
          ((c.prototype.__proto__ = Uint8Array.prototype),
          (c.__proto__ = Uint8Array),
          "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, { value: null, configurable: !0 })),
        (c.alloc = function(t, e, n) {
          return (function(t, e, n, i) {
            return h(e), e <= 0 ? a(t, e) : void 0 !== n ? ("string" == typeof i ? a(t, e).fill(n, i) : a(t, e).fill(n)) : a(t, e);
          })(null, t, e, n);
        }),
        (c.allocUnsafe = function(t) {
          return l(null, t);
        }),
        (c.allocUnsafeSlow = function(t) {
          return l(null, t);
        }),
        (c.isBuffer = function(t) {
          return !(null == t || !t._isBuffer);
        }),
        (c.compare = function(t, e) {
          if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
          if (t === e) return 0;
          for (var n = t.length, i = e.length, r = 0, o = Math.min(n, i); r < o; ++r)
            if (t[r] !== e[r]) {
              (n = t[r]), (i = e[r]);
              break;
            }
          return n < i ? -1 : i < n ? 1 : 0;
        }),
        (c.isEncoding = function(t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (c.concat = function(t, e) {
          if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return c.alloc(0);
          var n;
          if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
          var i = c.allocUnsafe(e),
            r = 0;
          for (n = 0; n < t.length; ++n) {
            var s = t[n];
            if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
            s.copy(i, r), (r += s.length);
          }
          return i;
        }),
        (c.byteLength = d),
        (c.prototype._isBuffer = !0),
        (c.prototype.swap16 = function() {
          var t = this.length;
          if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e = 0; e < t; e += 2) m(this, e, e + 1);
          return this;
        }),
        (c.prototype.swap32 = function() {
          var t = this.length;
          if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e = 0; e < t; e += 4) m(this, e, e + 3), m(this, e + 1, e + 2);
          return this;
        }),
        (c.prototype.swap64 = function() {
          var t = this.length;
          if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e = 0; e < t; e += 8) m(this, e, e + 7), m(this, e + 1, e + 6), m(this, e + 2, e + 5), m(this, e + 3, e + 4);
          return this;
        }),
        (c.prototype.toString = function() {
          var t = 0 | this.length;
          return 0 === t ? "" : 0 === arguments.length ? _(this, 0, t) : g.apply(this, arguments);
        }),
        (c.prototype.equals = function(t) {
          if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === c.compare(this, t);
        }),
        (c.prototype.inspect = function() {
          var t = "",
            n = e.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString("hex", 0, n)
                .match(/.{2}/g)
                .join(" ")),
              this.length > n && (t += " ... ")),
            "<Buffer " + t + ">"
          );
        }),
        (c.prototype.compare = function(t, e, n, i, r) {
          if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          if ((void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === i && (i = 0), void 0 === r && (r = this.length), e < 0 || n > t.length || i < 0 || r > this.length))
            throw new RangeError("out of range index");
          if (i >= r && e >= n) return 0;
          if (i >= r) return -1;
          if (e >= n) return 1;
          if (this === t) return 0;
          for (var o = (r >>>= 0) - (i >>>= 0), s = (n >>>= 0) - (e >>>= 0), a = Math.min(o, s), u = this.slice(i, r), h = t.slice(e, n), l = 0; l < a; ++l)
            if (u[l] !== h[l]) {
              (o = u[l]), (s = h[l]);
              break;
            }
          return o < s ? -1 : s < o ? 1 : 0;
        }),
        (c.prototype.includes = function(t, e, n) {
          return -1 !== this.indexOf(t, e, n);
        }),
        (c.prototype.indexOf = function(t, e, n) {
          return y(this, t, e, n, !0);
        }),
        (c.prototype.lastIndexOf = function(t, e, n) {
          return y(this, t, e, n, !1);
        }),
        (c.prototype.write = function(t, e, n, i) {
          if (void 0 === e) (i = "utf8"), (n = this.length), (e = 0);
          else if (void 0 === n && "string" == typeof e) (i = e), (n = this.length), (e = 0);
          else {
            if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            (e |= 0), isFinite(n) ? ((n |= 0), void 0 === i && (i = "utf8")) : ((i = n), (n = void 0));
          }
          var r = this.length - e;
          if (((void 0 === n || n > r) && (n = r), (t.length > 0 && (n < 0 || e < 0)) || e > this.length)) throw new RangeError("Attempt to write outside buffer bounds");
          i || (i = "utf8");
          for (var o = !1; ; )
            switch (i) {
              case "hex":
                return O(this, t, e, n);
              case "utf8":
              case "utf-8":
                return R(this, t, e, n);
              case "ascii":
                return A(this, t, e, n);
              case "latin1":
              case "binary":
                return b(this, t, e, n);
              case "base64":
                return w(this, t, e, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return C(this, t, e, n);
              default:
                if (o) throw new TypeError("Unknown encoding: " + i);
                (i = ("" + i).toLowerCase()), (o = !0);
            }
        }),
        (c.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        });
      var T = 4096;
      function I(t, e, n) {
        var i = "";
        n = Math.min(t.length, n);
        for (var r = e; r < n; ++r) i += String.fromCharCode(127 & t[r]);
        return i;
      }
      function M(t, e, n) {
        var i = "";
        n = Math.min(t.length, n);
        for (var r = e; r < n; ++r) i += String.fromCharCode(t[r]);
        return i;
      }
      function E(t, e, n) {
        var i = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > i) && (n = i);
        for (var r = "", o = e; o < n; ++o) r += D(t[o]);
        return r;
      }
      function k(t, e, n) {
        for (var i = t.slice(e, n), r = "", o = 0; o < i.length; o += 2) r += String.fromCharCode(i[o] + 256 * i[o + 1]);
        return r;
      }
      function P(t, e, n) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n) throw new RangeError("Trying to access beyond buffer length");
      }
      function L(t, e, n, i, r, o) {
        if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > r || e < o) throw new RangeError('"value" argument is out of bounds');
        if (n + i > t.length) throw new RangeError("Index out of range");
      }
      function x(t, e, n, i) {
        e < 0 && (e = 65535 + e + 1);
        for (var r = 0, o = Math.min(t.length - n, 2); r < o; ++r) t[n + r] = (e & (255 << (8 * (i ? r : 1 - r)))) >>> (8 * (i ? r : 1 - r));
      }
      function U(t, e, n, i) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var r = 0, o = Math.min(t.length - n, 4); r < o; ++r) t[n + r] = (e >>> (8 * (i ? r : 3 - r))) & 255;
      }
      function N(t, e, n, i, r, o) {
        if (n + i > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function G(t, e, n, i, o) {
        return o || N(t, 0, n, 4), r.write(t, e, n, i, 23, 4), n + 4;
      }
      function B(t, e, n, i, o) {
        return o || N(t, 0, n, 8), r.write(t, e, n, i, 52, 8), n + 8;
      }
      (c.prototype.slice = function(t, e) {
        var n,
          i = this.length;
        if (((t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), (e = void 0 === e ? i : ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), e < t && (e = t), c.TYPED_ARRAY_SUPPORT))
          (n = this.subarray(t, e)).__proto__ = c.prototype;
        else {
          var r = e - t;
          n = new c(r, void 0);
          for (var o = 0; o < r; ++o) n[o] = this[o + t];
        }
        return n;
      }),
        (c.prototype.readUIntLE = function(t, e, n) {
          (t |= 0), (e |= 0), n || P(t, e, this.length);
          for (var i = this[t], r = 1, o = 0; ++o < e && (r *= 256); ) i += this[t + o] * r;
          return i;
        }),
        (c.prototype.readUIntBE = function(t, e, n) {
          (t |= 0), (e |= 0), n || P(t, e, this.length);
          for (var i = this[t + --e], r = 1; e > 0 && (r *= 256); ) i += this[t + --e] * r;
          return i;
        }),
        (c.prototype.readUInt8 = function(t, e) {
          return e || P(t, 1, this.length), this[t];
        }),
        (c.prototype.readUInt16LE = function(t, e) {
          return e || P(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (c.prototype.readUInt16BE = function(t, e) {
          return e || P(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (c.prototype.readUInt32LE = function(t, e) {
          return e || P(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3];
        }),
        (c.prototype.readUInt32BE = function(t, e) {
          return e || P(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]);
        }),
        (c.prototype.readIntLE = function(t, e, n) {
          (t |= 0), (e |= 0), n || P(t, e, this.length);
          for (var i = this[t], r = 1, o = 0; ++o < e && (r *= 256); ) i += this[t + o] * r;
          return i >= (r *= 128) && (i -= Math.pow(2, 8 * e)), i;
        }),
        (c.prototype.readIntBE = function(t, e, n) {
          (t |= 0), (e |= 0), n || P(t, e, this.length);
          for (var i = e, r = 1, o = this[t + --i]; i > 0 && (r *= 256); ) o += this[t + --i] * r;
          return o >= (r *= 128) && (o -= Math.pow(2, 8 * e)), o;
        }),
        (c.prototype.readInt8 = function(t, e) {
          return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
        }),
        (c.prototype.readInt16LE = function(t, e) {
          e || P(t, 2, this.length);
          var n = this[t] | (this[t + 1] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (c.prototype.readInt16BE = function(t, e) {
          e || P(t, 2, this.length);
          var n = this[t + 1] | (this[t] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (c.prototype.readInt32LE = function(t, e) {
          return e || P(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24);
        }),
        (c.prototype.readInt32BE = function(t, e) {
          return e || P(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3];
        }),
        (c.prototype.readFloatLE = function(t, e) {
          return e || P(t, 4, this.length), r.read(this, t, !0, 23, 4);
        }),
        (c.prototype.readFloatBE = function(t, e) {
          return e || P(t, 4, this.length), r.read(this, t, !1, 23, 4);
        }),
        (c.prototype.readDoubleLE = function(t, e) {
          return e || P(t, 8, this.length), r.read(this, t, !0, 52, 8);
        }),
        (c.prototype.readDoubleBE = function(t, e) {
          return e || P(t, 8, this.length), r.read(this, t, !1, 52, 8);
        }),
        (c.prototype.writeUIntLE = function(t, e, n, i) {
          ((t = +t), (e |= 0), (n |= 0), i) || L(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var r = 1,
            o = 0;
          for (this[e] = 255 & t; ++o < n && (r *= 256); ) this[e + o] = (t / r) & 255;
          return e + n;
        }),
        (c.prototype.writeUIntBE = function(t, e, n, i) {
          ((t = +t), (e |= 0), (n |= 0), i) || L(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
          var r = n - 1,
            o = 1;
          for (this[e + r] = 255 & t; --r >= 0 && (o *= 256); ) this[e + r] = (t / o) & 255;
          return e + n;
        }),
        (c.prototype.writeUInt8 = function(t, e, n) {
          return (t = +t), (e |= 0), n || L(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), (this[e] = 255 & t), e + 1;
        }),
        (c.prototype.writeUInt16LE = function(t, e, n) {
          return (t = +t), (e |= 0), n || L(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : x(this, t, e, !0), e + 2;
        }),
        (c.prototype.writeUInt16BE = function(t, e, n) {
          return (t = +t), (e |= 0), n || L(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : x(this, t, e, !1), e + 2;
        }),
        (c.prototype.writeUInt32LE = function(t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || L(this, t, e, 4, 4294967295, 0),
            c.TYPED_ARRAY_SUPPORT ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t)) : U(this, t, e, !0),
            e + 4
          );
        }),
        (c.prototype.writeUInt32BE = function(t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || L(this, t, e, 4, 4294967295, 0),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t)) : U(this, t, e, !1),
            e + 4
          );
        }),
        (c.prototype.writeIntLE = function(t, e, n, i) {
          if (((t = +t), (e |= 0), !i)) {
            var r = Math.pow(2, 8 * n - 1);
            L(this, t, e, n, r - 1, -r);
          }
          var o = 0,
            s = 1,
            a = 0;
          for (this[e] = 255 & t; ++o < n && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), (this[e + o] = (((t / s) >> 0) - a) & 255);
          return e + n;
        }),
        (c.prototype.writeIntBE = function(t, e, n, i) {
          if (((t = +t), (e |= 0), !i)) {
            var r = Math.pow(2, 8 * n - 1);
            L(this, t, e, n, r - 1, -r);
          }
          var o = n - 1,
            s = 1,
            a = 0;
          for (this[e + o] = 255 & t; --o >= 0 && (s *= 256); ) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), (this[e + o] = (((t / s) >> 0) - a) & 255);
          return e + n;
        }),
        (c.prototype.writeInt8 = function(t, e, n) {
          return (t = +t), (e |= 0), n || L(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), (this[e] = 255 & t), e + 1;
        }),
        (c.prototype.writeInt16LE = function(t, e, n) {
          return (t = +t), (e |= 0), n || L(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : x(this, t, e, !0), e + 2;
        }),
        (c.prototype.writeInt16BE = function(t, e, n) {
          return (t = +t), (e |= 0), n || L(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : x(this, t, e, !1), e + 2;
        }),
        (c.prototype.writeInt32LE = function(t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || L(this, t, e, 4, 2147483647, -2147483648),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24)) : U(this, t, e, !0),
            e + 4
          );
        }),
        (c.prototype.writeInt32BE = function(t, e, n) {
          return (
            (t = +t),
            (e |= 0),
            n || L(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t)) : U(this, t, e, !1),
            e + 4
          );
        }),
        (c.prototype.writeFloatLE = function(t, e, n) {
          return G(this, t, e, !0, n);
        }),
        (c.prototype.writeFloatBE = function(t, e, n) {
          return G(this, t, e, !1, n);
        }),
        (c.prototype.writeDoubleLE = function(t, e, n) {
          return B(this, t, e, !0, n);
        }),
        (c.prototype.writeDoubleBE = function(t, e, n) {
          return B(this, t, e, !1, n);
        }),
        (c.prototype.copy = function(t, e, n, i) {
          if ((n || (n = 0), i || 0 === i || (i = this.length), e >= t.length && (e = t.length), e || (e = 0), i > 0 && i < n && (i = n), i === n)) return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
          if (i < 0) throw new RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length), t.length - e < i - n && (i = t.length - e + n);
          var r,
            o = i - n;
          if (this === t && n < e && e < i) for (r = o - 1; r >= 0; --r) t[r + e] = this[r + n];
          else if (o < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (r = 0; r < o; ++r) t[r + e] = this[r + n];
          else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
          return o;
        }),
        (c.prototype.fill = function(t, e, n, i) {
          if ("string" == typeof t) {
            if (("string" == typeof e ? ((i = e), (e = 0), (n = this.length)) : "string" == typeof n && ((i = n), (n = this.length)), 1 === t.length)) {
              var r = t.charCodeAt(0);
              r < 256 && (t = r);
            }
            if (void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
            if ("string" == typeof i && !c.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
          } else "number" == typeof t && (t &= 255);
          if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
          if (n <= e) return this;
          var o;
          if (((e >>>= 0), (n = void 0 === n ? this.length : n >>> 0), t || (t = 0), "number" == typeof t)) for (o = e; o < n; ++o) this[o] = t;
          else {
            var s = c.isBuffer(t) ? t : H(new c(t, i).toString()),
              a = s.length;
            for (o = 0; o < n - e; ++o) this[o + e] = s[o % a];
          }
          return this;
        });
      var q = /[^+\/0-9A-Za-z-_]/g;
      function D(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function H(t, e) {
        var n;
        e = e || 1 / 0;
        for (var i = t.length, r = null, o = [], s = 0; s < i; ++s) {
          if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
            if (!r) {
              if (n > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (s + 1 === i) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              r = n;
              continue;
            }
            if (n < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), (r = n);
              continue;
            }
            n = 65536 + (((r - 55296) << 10) | (n - 56320));
          } else r && (e -= 3) > -1 && o.push(239, 191, 189);
          if (((r = null), n < 128)) {
            if ((e -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            o.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            o.push((n >> 18) | 240, ((n >> 12) & 63) | 128, ((n >> 6) & 63) | 128, (63 & n) | 128);
          }
        }
        return o;
      }
      function j(t) {
        return i.toByteArray(
          (function(t) {
            if (
              (t = (function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
              })(t).replace(q, "")).length < 2
            )
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          })(t),
        );
      }
      function z(t, e, n, i) {
        for (var r = 0; r < i && !(r + n >= e.length || r >= t.length); ++r) e[r + n] = t[r];
        return r;
      }
    }.call(this, n(3)));
  },
  function(t, e) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  },
  function(t, e, n) {
    "use strict";
    (e.byteLength = function(t) {
      var e = u(t),
        n = e[0],
        i = e[1];
      return (3 * (n + i)) / 4 - i;
    }),
      (e.toByteArray = function(t) {
        var e,
          n,
          i = u(t),
          s = i[0],
          a = i[1],
          c = new o(
            (function(t, e, n) {
              return (3 * (e + n)) / 4 - n;
            })(0, s, a),
          ),
          h = 0,
          l = a > 0 ? s - 4 : s;
        for (n = 0; n < l; n += 4)
          (e = (r[t.charCodeAt(n)] << 18) | (r[t.charCodeAt(n + 1)] << 12) | (r[t.charCodeAt(n + 2)] << 6) | r[t.charCodeAt(n + 3)]),
            (c[h++] = (e >> 16) & 255),
            (c[h++] = (e >> 8) & 255),
            (c[h++] = 255 & e);
        2 === a && ((e = (r[t.charCodeAt(n)] << 2) | (r[t.charCodeAt(n + 1)] >> 4)), (c[h++] = 255 & e));
        1 === a && ((e = (r[t.charCodeAt(n)] << 10) | (r[t.charCodeAt(n + 1)] << 4) | (r[t.charCodeAt(n + 2)] >> 2)), (c[h++] = (e >> 8) & 255), (c[h++] = 255 & e));
        return c;
      }),
      (e.fromByteArray = function(t) {
        for (var e, n = t.length, r = n % 3, o = [], s = 0, a = n - r; s < a; s += 16383) o.push(h(t, s, s + 16383 > a ? a : s + 16383));
        1 === r ? ((e = t[n - 1]), o.push(i[e >> 2] + i[(e << 4) & 63] + "==")) : 2 === r && ((e = (t[n - 2] << 8) + t[n - 1]), o.push(i[e >> 10] + i[(e >> 4) & 63] + i[(e << 2) & 63] + "="));
        return o.join("");
      });
    for (var i = [], r = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = s.length; a < c; ++a)
      (i[a] = s[a]), (r[s.charCodeAt(a)] = a);
    function u(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      var n = t.indexOf("=");
      return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
    }
    function h(t, e, n) {
      for (var r, o, s = [], a = e; a < n; a += 3)
        (r = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])), s.push(i[((o = r) >> 18) & 63] + i[(o >> 12) & 63] + i[(o >> 6) & 63] + i[63 & o]);
      return s.join("");
    }
    (r["-".charCodeAt(0)] = 62), (r["_".charCodeAt(0)] = 63);
  },
  function(t, e) {
    (e.read = function(t, e, n, i, r) {
      var o,
        s,
        a = 8 * r - i - 1,
        c = (1 << a) - 1,
        u = c >> 1,
        h = -7,
        l = n ? r - 1 : 0,
        f = n ? -1 : 1,
        p = t[e + l];
      for (l += f, o = p & ((1 << -h) - 1), p >>= -h, h += a; h > 0; o = 256 * o + t[e + l], l += f, h -= 8);
      for (s = o & ((1 << -h) - 1), o >>= -h, h += i; h > 0; s = 256 * s + t[e + l], l += f, h -= 8);
      if (0 === o) o = 1 - u;
      else {
        if (o === c) return s ? NaN : (1 / 0) * (p ? -1 : 1);
        (s += Math.pow(2, i)), (o -= u);
      }
      return (p ? -1 : 1) * s * Math.pow(2, o - i);
    }),
      (e.write = function(t, e, n, i, r, o) {
        var s,
          a,
          c,
          u = 8 * o - r - 1,
          h = (1 << u) - 1,
          l = h >> 1,
          f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = i ? 0 : o - 1,
          d = i ? 1 : -1,
          g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
        for (
          e = Math.abs(e),
            isNaN(e) || e === 1 / 0
              ? ((a = isNaN(e) ? 1 : 0), (s = h))
              : ((s = Math.floor(Math.log(e) / Math.LN2)),
                e * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                (e += s + l >= 1 ? f / c : f * Math.pow(2, 1 - l)) * c >= 2 && (s++, (c /= 2)),
                s + l >= h ? ((a = 0), (s = h)) : s + l >= 1 ? ((a = (e * c - 1) * Math.pow(2, r)), (s += l)) : ((a = e * Math.pow(2, l - 1) * Math.pow(2, r)), (s = 0)));
          r >= 8;
          t[n + p] = 255 & a, p += d, a /= 256, r -= 8
        );
        for (s = (s << r) | a, u += r; u > 0; t[n + p] = 255 & s, p += d, s /= 256, u -= 8);
        t[n + p - d] |= 128 * g;
      });
  },
  function(t, e) {
    var n = {}.toString;
    t.exports =
      Array.isArray ||
      function(t) {
        return "[object Array]" == n.call(t);
      };
  },
]);
