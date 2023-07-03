/* 
  esm.sh - esbuild bundle(pitchy@4.0.7) es2022 production 
  Code from https://esm.sh/v90/pitchy@4.0.7/es2022/pitchy.js
  import B from"./fft.js";var i=class{_inputLength;_fft;_bufferSupplier;_paddedInputBuffer;_transformBuffer;_inverseBuffer;static forFloat32Array(t){return new i(t,r=>new Float32Array(r))}static forFloat64Array(t){return new i(t,r=>new Float64Array(r))}static forNumberArray(t){return new i(t,r=>Array(r))}constructor(t,r){if(t<1)throw new Error("Input length must be at least one");this._inputLength=t,this._fft=new B(y(2*t)),this._bufferSupplier=r,this._paddedInputBuffer=this._bufferSupplier(this._fft.size),this._transformBuffer=this._bufferSupplier(2*this._fft.size),this._inverseBuffer=this._bufferSupplier(2*this._fft.size)}get inputLength(){return this._inputLength}autocorrelate(t,r=this._bufferSupplier(t.length)){if(t.length!==this._inputLength)throw new Error(`Input must have length ${this._inputLength} but had length ${t.length}`);for(let e=0;e<t.length;e++)this._paddedInputBuffer[e]=t[e];for(let e=t.length;e<this._paddedInputBuffer.length;e++)this._paddedInputBuffer[e]=0;this._fft.realTransform(this._transformBuffer,this._paddedInputBuffer),this._fft.completeSpectrum(this._transformBuffer);let f=this._transformBuffer;for(let e=0;e<f.length;e+=2)f[e]=f[e]*f[e]+f[e+1]*f[e+1],f[e+1]=0;this._fft.inverseTransform(this._inverseBuffer,this._transformBuffer);for(let e=0;e<t.length;e++)r[e]=this._inverseBuffer[2*e];return r}};function m(s){let t=[],r=!1,f=-1/0,e=-1;for(let n=1;n<s.length-1;n++)s[n-1]<=0&&s[n]>0?(r=!0,e=n,f=s[n]):s[n-1]>0&&s[n]<=0?(r=!1,e!==-1&&t.push(e)):r&&s[n]>f&&(f=s[n],e=n);return t}function g(s,t){let[r,f,e]=[s-1,s,s+1],[n,u,o]=[t[r],t[f],t[e]],h=n/2-u+o/2,_=-(n/2)*(f+e)+u*(r+e)-o/2*(r+f),d=n*f*e/2-u*r*e+o*r*f/2,l=-_/(2*h),c=h*l*l+_*l+d;return[l,c]}var a=class{_autocorrelator;_nsdfBuffer;_clarityThreshold=.9;static forFloat32Array(t){return new a(t,r=>new Float32Array(r))}static forFloat64Array(t){return new a(t,r=>new Float64Array(r))}static forNumberArray(t){return new a(t,r=>Array(r))}constructor(t,r){this._autocorrelator=new i(t,r),this._nsdfBuffer=r(t)}get inputLength(){return this._autocorrelator.inputLength}findPitch(t,r){this._nsdf(t);let f=m(this._nsdfBuffer);if(f.length===0)return[0,0];let e=Math.max(...f.map(h=>this._nsdfBuffer[h])),n=f.find(h=>this._nsdfBuffer[h]>=this._clarityThreshold*e),[u,o]=g(n,this._nsdfBuffer);return[r/u,Math.min(o,1)]}_nsdf(t){this._autocorrelator.autocorrelate(t,this._nsdfBuffer);let r=2*this._nsdfBuffer[0],f;for(f=0;f<this._nsdfBuffer.length&&r>0;f++)this._nsdfBuffer[f]=2*this._nsdfBuffer[f]/r,r-=t[f]**2+t[t.length-f-1]**2;for(;f<this._nsdfBuffer.length;f++)this._nsdfBuffer[f]=0}};function y(s){return s--,s|=s>>1,s|=s>>2,s|=s>>4,s|=s>>8,s|=s>>16,s++,s}export{i as Autocorrelator,a as PitchDetector};
*/ 
import B from "./fft.js";

var i = class {
  _inputLength;
  _fft;
  _bufferSupplier;
  _paddedInputBuffer;
  _transformBuffer;
  _inverseBuffer;
  static forFloat32Array(t) {
    return new i(t, (r) => new Float32Array(r));
  }
  static forFloat64Array(t) {
    return new i(t, (r) => new Float64Array(r));
  }
  static forNumberArray(t) {
    return new i(t, (r) => Array(r));
  }
  constructor(t, r) {
    if (t < 1) throw new Error("Input length must be at least one");
    (this._inputLength = t),
      (this._fft = new B(y(2 * t))),
      (this._bufferSupplier = r),
      (this._paddedInputBuffer = this._bufferSupplier(this._fft.size)),
      (this._transformBuffer = this._bufferSupplier(2 * this._fft.size)),
      (this._inverseBuffer = this._bufferSupplier(2 * this._fft.size));
  }
  get inputLength() {
    return this._inputLength;
  }
  autocorrelate(t, r = this._bufferSupplier(t.length)) {
    if (t.length !== this._inputLength) throw new Error(`Input must have length ${this._inputLength} but had length ${t.length}`);
    for (let e = 0; e < t.length; e++) this._paddedInputBuffer[e] = t[e];
    for (let e = t.length; e < this._paddedInputBuffer.length; e++) this._paddedInputBuffer[e] = 0;
    this._fft.realTransform(this._transformBuffer, this._paddedInputBuffer), this._fft.completeSpectrum(this._transformBuffer);
    let f = this._transformBuffer;
    for (let e = 0; e < f.length; e += 2) (f[e] = f[e] * f[e] + f[e + 1] * f[e + 1]), (f[e + 1] = 0);
    this._fft.inverseTransform(this._inverseBuffer, this._transformBuffer);
    for (let e = 0; e < t.length; e++) r[e] = this._inverseBuffer[2 * e];
    return r;
  }
};
function m(s) {
  let t = [],
    r = !1,
    f = -1 / 0,
    e = -1;
  for (let n = 1; n < s.length - 1; n++) s[n - 1] <= 0 && s[n] > 0 ? ((r = !0), (e = n), (f = s[n])) : s[n - 1] > 0 && s[n] <= 0 ? ((r = !1), e !== -1 && t.push(e)) : r && s[n] > f && ((f = s[n]), (e = n));
  return t;
}
function g(s, t) {
  let [r, f, e] = [s - 1, s, s + 1],
    [n, u, o] = [t[r], t[f], t[e]],
    h = n / 2 - u + o / 2,
    _ = -(n / 2) * (f + e) + u * (r + e) - (o / 2) * (r + f),
    d = (n * f * e) / 2 - u * r * e + (o * r * f) / 2,
    l = -_ / (2 * h),
    c = h * l * l + _ * l + d;
  return [l, c];
}
var a = class {
  _autocorrelator;
  _nsdfBuffer;
  _clarityThreshold = 0.9;
  static forFloat32Array(t) {
    return new a(t, (r) => new Float32Array(r));
  }
  static forFloat64Array(t) {
    return new a(t, (r) => new Float64Array(r));
  }
  static forNumberArray(t) {
    return new a(t, (r) => Array(r));
  }
  constructor(t, r) {
    (this._autocorrelator = new i(t, r)), (this._nsdfBuffer = r(t));
  }
  get inputLength() {
    return this._autocorrelator.inputLength;
  }
  findPitch(t, r) {
    this._nsdf(t);
    let f = m(this._nsdfBuffer);
    if (f.length === 0) return [0, 0];
    let e = Math.max(...f.map((h) => this._nsdfBuffer[h])),
      n = f.find((h) => this._nsdfBuffer[h] >= this._clarityThreshold * e),
      [u, o] = g(n, this._nsdfBuffer);
    return [r / u, Math.min(o, 1)];
  }
  _nsdf(t) {
    this._autocorrelator.autocorrelate(t, this._nsdfBuffer);
    let r = 2 * this._nsdfBuffer[0],
      f;
    for (f = 0; f < this._nsdfBuffer.length && r > 0; f++) (this._nsdfBuffer[f] = (2 * this._nsdfBuffer[f]) / r), (r -= t[f] ** 2 + t[t.length - f - 1] ** 2);
    for (; f < this._nsdfBuffer.length; f++) this._nsdfBuffer[f] = 0;
  }
};
function y(s) {
  return s--, (s |= s >> 1), (s |= s >> 2), (s |= s >> 4), (s |= s >> 8), (s |= s >> 16), s++, s;
}
export { i as Autocorrelator, a as PitchDetector };
