/* 
  esm.sh - esbuild bundle(fft.js@4.0.4) es2022 production 
  Code from https://esm.sh/v90/fft.js@4.0.4/es2022/fft.js
  var wt=Object.create;var ct=Object.defineProperty;var bt=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var zt=Object.getPrototypeOf,Rt=Object.prototype.hasOwnProperty;var Ct=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var Dt=(i,t,s,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of At(t))!Rt.call(i,r)&&r!==s&&ct(i,r,{get:()=>t[r],enumerable:!(a=bt(t,r))||a.enumerable});return i};var It=(i,t,s)=>(s=i!=null?wt(zt(i)):{},Dt(t||!i||!i.__esModule?ct(s,"default",{value:i,enumerable:!0}):s,i));var vt=Ct((Mt,et)=>{"use strict";function F(i){if(this.size=i|0,this.size<=1||(this.size&this.size-1)!==0)throw new Error("FFT size must be a power of two and bigger than 1");this._csize=i<<1;for(var t=new Array(this.size*2),s=0;s<t.length;s+=2){let _=Math.PI*s/this.size;t[s]=Math.cos(_),t[s+1]=-Math.sin(_)}this.table=t;for(var a=0,r=1;this.size>r;r<<=1)a++;this._width=a%2===0?a-1:a,this._bitrev=new Array(1<<this._width);for(var o=0;o<this._bitrev.length;o++){this._bitrev[o]=0;for(var n=0;n<this._width;n+=2){var c=this._width-n-2;this._bitrev[o]|=(o>>>n&3)<<c}}this._out=null,this._data=null,this._inv=0}et.exports=F;F.prototype.fromComplexArray=function(t,s){for(var a=s||new Array(t.length>>>1),r=0;r<t.length;r+=2)a[r>>>1]=t[r];return a};F.prototype.createComplexArray=function(){let t=new Array(this._csize);for(var s=0;s<t.length;s++)t[s]=0;return t};F.prototype.toComplexArray=function(t,s){for(var a=s||this.createComplexArray(),r=0;r<a.length;r+=2)a[r]=t[r>>>1],a[r+1]=0;return a};F.prototype.completeSpectrum=function(t){for(var s=this._csize,a=s>>>1,r=2;r<a;r+=2)t[s-r]=t[r],t[s-r+1]=-t[r+1]};F.prototype.transform=function(t,s){if(t===s)throw new Error("Input and output buffers must be different");this._out=t,this._data=s,this._inv=0,this._transform4(),this._out=null,this._data=null};F.prototype.realTransform=function(t,s){if(t===s)throw new Error("Input and output buffers must be different");this._out=t,this._data=s,this._inv=0,this._realTransform4(),this._out=null,this._data=null};F.prototype.inverseTransform=function(t,s){if(t===s)throw new Error("Input and output buffers must be different");this._out=t,this._data=s,this._inv=1,this._transform4();for(var a=0;a<t.length;a++)t[a]/=this.size;this._out=null,this._data=null};F.prototype._transform4=function(){var t=this._out,s=this._csize,a=this._width,r=1<<a,o=s/r<<1,n,c,_=this._bitrev;if(o===4)for(n=0,c=0;n<s;n+=o,c++){let v=_[c];this._singleTransform2(n,v,r)}else for(n=0,c=0;n<s;n+=o,c++){let v=_[c];this._singleTransform4(n,v,r)}var e=this._inv?-1:1,h=this.table;for(r>>=2;r>=2;r>>=2){o=s/r<<1;var d=o>>>2;for(n=0;n<s;n+=o)for(var u=n+d,T=n,l=0;T<u;T+=2,l+=r){let v=T,p=v+d,m=p+d,f=m+d,y=t[v],b=t[v+1],w=t[p],g=t[p+1],A=t[m],z=t[m+1],R=t[f],C=t[f+1],D=y,I=b,x=h[l],B=e*h[l+1],E=w*x-g*B,M=w*B+g*x,J=h[2*l],K=e*h[2*l+1],N=A*J-z*K,Q=A*K+z*J,S=h[3*l],U=e*h[3*l+1],V=R*S-C*U,W=R*U+C*S,X=D+N,$=I+Q,P=D-N,Y=I-Q,Z=E+V,G=M+W,H=e*(E-V),j=e*(M-W),q=X+Z,L=$+G,k=X-Z,O=$-G,tt=P+j,rt=Y-H,st=P-j,nt=Y+H;t[v]=q,t[v+1]=L,t[p]=tt,t[p+1]=rt,t[m]=k,t[m+1]=O,t[f]=st,t[f+1]=nt}}};F.prototype._singleTransform2=function(t,s,a){let r=this._out,o=this._data,n=o[s],c=o[s+1],_=o[s+a],e=o[s+a+1],h=n+_,d=c+e,u=n-_,T=c-e;r[t]=h,r[t+1]=d,r[t+2]=u,r[t+3]=T};F.prototype._singleTransform4=function(t,s,a){let r=this._out,o=this._data,n=this._inv?-1:1,c=a*2,_=a*3,e=o[s],h=o[s+1],d=o[s+a],u=o[s+a+1],T=o[s+c],l=o[s+c+1],v=o[s+_],p=o[s+_+1],m=e+T,f=h+l,y=e-T,b=h-l,w=d+v,g=u+p,A=n*(d-v),z=n*(u-p),R=m+w,C=f+g,D=y+z,I=b-A,x=m-w,B=f-g,E=y-z,M=b+A;r[t]=R,r[t+1]=C,r[t+2]=D,r[t+3]=I,r[t+4]=x,r[t+5]=B,r[t+6]=E,r[t+7]=M};F.prototype._realTransform4=function(){var t=this._out,s=this._csize,a=this._width,r=1<<a,o=s/r<<1,n,c,_=this._bitrev;if(o===4)for(n=0,c=0;n<s;n+=o,c++){let ot=_[c];this._singleRealTransform2(n,ot>>>1,r>>>1)}else for(n=0,c=0;n<s;n+=o,c++){let ot=_[c];this._singleRealTransform4(n,ot>>>1,r>>>1)}var e=this._inv?-1:1,h=this.table;for(r>>=2;r>=2;r>>=2){o=s/r<<1;var d=o>>>1,u=d>>>1,T=u>>>1;for(n=0;n<s;n+=o)for(var l=0,v=0;l<=T;l+=2,v+=r){var p=n+l,m=p+u,f=m+u,y=f+u,b=t[p],w=t[p+1],g=t[m],A=t[m+1],z=t[f],R=t[f+1],C=t[y],D=t[y+1],I=b,x=w,B=h[v],E=e*h[v+1],M=g*B-A*E,J=g*E+A*B,K=h[2*v],N=e*h[2*v+1],Q=z*K-R*N,S=z*N+R*K,U=h[3*v],V=e*h[3*v+1],W=C*U-D*V,X=C*V+D*U,$=I+Q,P=x+S,Y=I-Q,Z=x-S,G=M+W,H=J+X,j=e*(M-W),q=e*(J-X),L=$+G,k=P+H,O=Y+q,tt=Z-j;if(t[p]=L,t[p+1]=k,t[m]=O,t[m+1]=tt,l===0){var rt=$-G,st=P-H;t[f]=rt,t[f+1]=st;continue}if(l!==T){var nt=Y,lt=-Z,_t=$,pt=-P,mt=-e*q,dt=-e*j,ut=-e*H,ft=-e*G,Tt=nt+mt,Ft=lt+dt,gt=_t+ft,yt=pt-ut,at=n+u-l,it=n+d-l;t[at]=Tt,t[at+1]=Ft,t[it]=gt,t[it+1]=yt}}}};F.prototype._singleRealTransform2=function(t,s,a){let r=this._out,o=this._data,n=o[s],c=o[s+a],_=n+c,e=n-c;r[t]=_,r[t+1]=0,r[t+2]=e,r[t+3]=0};F.prototype._singleRealTransform4=function(t,s,a){let r=this._out,o=this._data,n=this._inv?-1:1,c=a*2,_=a*3,e=o[s],h=o[s+a],d=o[s+c],u=o[s+_],T=e+d,l=e-d,v=h+u,p=n*(h-u),m=T+v,f=l,y=-p,b=T-v,w=l,g=p;r[t]=m,r[t+1]=0,r[t+2]=f,r[t+3]=y,r[t+4]=b,r[t+5]=0,r[t+6]=w,r[t+7]=g}});var xt=It(vt()),{default:ht,...Bt}=xt,$t=ht!==void 0?ht:Bt;export{$t as default};
*/
var wt = Object.create;
var ct = Object.defineProperty;
var bt = Object.getOwnPropertyDescriptor;
var At = Object.getOwnPropertyNames;
var zt = Object.getPrototypeOf,
  Rt = Object.prototype.hasOwnProperty;
var Ct = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports);
var Dt = (i, t, s, a) => {
  if ((t && typeof t == "object") || typeof t == "function") for (let r of At(t)) !Rt.call(i, r) && r !== s && ct(i, r, { get: () => t[r], enumerable: !(a = bt(t, r)) || a.enumerable });
  return i;
};
var It = (i, t, s) => ((s = i != null ? wt(zt(i)) : {}), Dt(t || !i || !i.__esModule ? ct(s, "default", { value: i, enumerable: !0 }) : s, i));
var vt = Ct((Mt, et) => {
  "use strict";
  function F(i) {
    if (((this.size = i | 0), this.size <= 1 || (this.size & (this.size - 1)) !== 0)) throw new Error("FFT size must be a power of two and bigger than 1");
    this._csize = i << 1;
    for (var t = new Array(this.size * 2), s = 0; s < t.length; s += 2) {
      let _ = (Math.PI * s) / this.size;
      (t[s] = Math.cos(_)), (t[s + 1] = -Math.sin(_));
    }
    this.table = t;
    for (var a = 0, r = 1; this.size > r; r <<= 1) a++;
    (this._width = a % 2 === 0 ? a - 1 : a), (this._bitrev = new Array(1 << this._width));
    for (var o = 0; o < this._bitrev.length; o++) {
      this._bitrev[o] = 0;
      for (var n = 0; n < this._width; n += 2) {
        var c = this._width - n - 2;
        this._bitrev[o] |= ((o >>> n) & 3) << c;
      }
    }
    (this._out = null), (this._data = null), (this._inv = 0);
  }
  et.exports = F;
  F.prototype.fromComplexArray = function (t, s) {
    for (var a = s || new Array(t.length >>> 1), r = 0; r < t.length; r += 2) a[r >>> 1] = t[r];
    return a;
  };
  F.prototype.createComplexArray = function () {
    let t = new Array(this._csize);
    for (var s = 0; s < t.length; s++) t[s] = 0;
    return t;
  };
  F.prototype.toComplexArray = function (t, s) {
    for (var a = s || this.createComplexArray(), r = 0; r < a.length; r += 2) (a[r] = t[r >>> 1]), (a[r + 1] = 0);
    return a;
  };
  F.prototype.completeSpectrum = function (t) {
    for (var s = this._csize, a = s >>> 1, r = 2; r < a; r += 2) (t[s - r] = t[r]), (t[s - r + 1] = -t[r + 1]);
  };
  F.prototype.transform = function (t, s) {
    if (t === s) throw new Error("Input and output buffers must be different");
    (this._out = t), (this._data = s), (this._inv = 0), this._transform4(), (this._out = null), (this._data = null);
  };
  F.prototype.realTransform = function (t, s) {
    if (t === s) throw new Error("Input and output buffers must be different");
    (this._out = t), (this._data = s), (this._inv = 0), this._realTransform4(), (this._out = null), (this._data = null);
  };
  F.prototype.inverseTransform = function (t, s) {
    if (t === s) throw new Error("Input and output buffers must be different");
    (this._out = t), (this._data = s), (this._inv = 1), this._transform4();
    for (var a = 0; a < t.length; a++) t[a] /= this.size;
    (this._out = null), (this._data = null);
  };
  F.prototype._transform4 = function () {
    var t = this._out,
      s = this._csize,
      a = this._width,
      r = 1 << a,
      o = (s / r) << 1,
      n,
      c,
      _ = this._bitrev;
    if (o === 4)
      for (n = 0, c = 0; n < s; n += o, c++) {
        let v = _[c];
        this._singleTransform2(n, v, r);
      }
    else
      for (n = 0, c = 0; n < s; n += o, c++) {
        let v = _[c];
        this._singleTransform4(n, v, r);
      }
    var e = this._inv ? -1 : 1,
      h = this.table;
    for (r >>= 2; r >= 2; r >>= 2) {
      o = (s / r) << 1;
      var d = o >>> 2;
      for (n = 0; n < s; n += o)
        for (var u = n + d, T = n, l = 0; T < u; T += 2, l += r) {
          let v = T,
            p = v + d,
            m = p + d,
            f = m + d,
            y = t[v],
            b = t[v + 1],
            w = t[p],
            g = t[p + 1],
            A = t[m],
            z = t[m + 1],
            R = t[f],
            C = t[f + 1],
            D = y,
            I = b,
            x = h[l],
            B = e * h[l + 1],
            E = w * x - g * B,
            M = w * B + g * x,
            J = h[2 * l],
            K = e * h[2 * l + 1],
            N = A * J - z * K,
            Q = A * K + z * J,
            S = h[3 * l],
            U = e * h[3 * l + 1],
            V = R * S - C * U,
            W = R * U + C * S,
            X = D + N,
            $ = I + Q,
            P = D - N,
            Y = I - Q,
            Z = E + V,
            G = M + W,
            H = e * (E - V),
            j = e * (M - W),
            q = X + Z,
            L = $ + G,
            k = X - Z,
            O = $ - G,
            tt = P + j,
            rt = Y - H,
            st = P - j,
            nt = Y + H;
          (t[v] = q), (t[v + 1] = L), (t[p] = tt), (t[p + 1] = rt), (t[m] = k), (t[m + 1] = O), (t[f] = st), (t[f + 1] = nt);
        }
    }
  };
  F.prototype._singleTransform2 = function (t, s, a) {
    let r = this._out,
      o = this._data,
      n = o[s],
      c = o[s + 1],
      _ = o[s + a],
      e = o[s + a + 1],
      h = n + _,
      d = c + e,
      u = n - _,
      T = c - e;
    (r[t] = h), (r[t + 1] = d), (r[t + 2] = u), (r[t + 3] = T);
  };
  F.prototype._singleTransform4 = function (t, s, a) {
    let r = this._out,
      o = this._data,
      n = this._inv ? -1 : 1,
      c = a * 2,
      _ = a * 3,
      e = o[s],
      h = o[s + 1],
      d = o[s + a],
      u = o[s + a + 1],
      T = o[s + c],
      l = o[s + c + 1],
      v = o[s + _],
      p = o[s + _ + 1],
      m = e + T,
      f = h + l,
      y = e - T,
      b = h - l,
      w = d + v,
      g = u + p,
      A = n * (d - v),
      z = n * (u - p),
      R = m + w,
      C = f + g,
      D = y + z,
      I = b - A,
      x = m - w,
      B = f - g,
      E = y - z,
      M = b + A;
    (r[t] = R), (r[t + 1] = C), (r[t + 2] = D), (r[t + 3] = I), (r[t + 4] = x), (r[t + 5] = B), (r[t + 6] = E), (r[t + 7] = M);
  };
  F.prototype._realTransform4 = function () {
    var t = this._out,
      s = this._csize,
      a = this._width,
      r = 1 << a,
      o = (s / r) << 1,
      n,
      c,
      _ = this._bitrev;
    if (o === 4)
      for (n = 0, c = 0; n < s; n += o, c++) {
        let ot = _[c];
        this._singleRealTransform2(n, ot >>> 1, r >>> 1);
      }
    else
      for (n = 0, c = 0; n < s; n += o, c++) {
        let ot = _[c];
        this._singleRealTransform4(n, ot >>> 1, r >>> 1);
      }
    var e = this._inv ? -1 : 1,
      h = this.table;
    for (r >>= 2; r >= 2; r >>= 2) {
      o = (s / r) << 1;
      var d = o >>> 1,
        u = d >>> 1,
        T = u >>> 1;
      for (n = 0; n < s; n += o)
        for (var l = 0, v = 0; l <= T; l += 2, v += r) {
          var p = n + l,
            m = p + u,
            f = m + u,
            y = f + u,
            b = t[p],
            w = t[p + 1],
            g = t[m],
            A = t[m + 1],
            z = t[f],
            R = t[f + 1],
            C = t[y],
            D = t[y + 1],
            I = b,
            x = w,
            B = h[v],
            E = e * h[v + 1],
            M = g * B - A * E,
            J = g * E + A * B,
            K = h[2 * v],
            N = e * h[2 * v + 1],
            Q = z * K - R * N,
            S = z * N + R * K,
            U = h[3 * v],
            V = e * h[3 * v + 1],
            W = C * U - D * V,
            X = C * V + D * U,
            $ = I + Q,
            P = x + S,
            Y = I - Q,
            Z = x - S,
            G = M + W,
            H = J + X,
            j = e * (M - W),
            q = e * (J - X),
            L = $ + G,
            k = P + H,
            O = Y + q,
            tt = Z - j;
          if (((t[p] = L), (t[p + 1] = k), (t[m] = O), (t[m + 1] = tt), l === 0)) {
            var rt = $ - G,
              st = P - H;
            (t[f] = rt), (t[f + 1] = st);
            continue;
          }
          if (l !== T) {
            var nt = Y,
              lt = -Z,
              _t = $,
              pt = -P,
              mt = -e * q,
              dt = -e * j,
              ut = -e * H,
              ft = -e * G,
              Tt = nt + mt,
              Ft = lt + dt,
              gt = _t + ft,
              yt = pt - ut,
              at = n + u - l,
              it = n + d - l;
            (t[at] = Tt), (t[at + 1] = Ft), (t[it] = gt), (t[it + 1] = yt);
          }
        }
    }
  };
  F.prototype._singleRealTransform2 = function (t, s, a) {
    let r = this._out,
      o = this._data,
      n = o[s],
      c = o[s + a],
      _ = n + c,
      e = n - c;
    (r[t] = _), (r[t + 1] = 0), (r[t + 2] = e), (r[t + 3] = 0);
  };
  F.prototype._singleRealTransform4 = function (t, s, a) {
    let r = this._out,
      o = this._data,
      n = this._inv ? -1 : 1,
      c = a * 2,
      _ = a * 3,
      e = o[s],
      h = o[s + a],
      d = o[s + c],
      u = o[s + _],
      T = e + d,
      l = e - d,
      v = h + u,
      p = n * (h - u),
      m = T + v,
      f = l,
      y = -p,
      b = T - v,
      w = l,
      g = p;
    (r[t] = m), (r[t + 1] = 0), (r[t + 2] = f), (r[t + 3] = y), (r[t + 4] = b), (r[t + 5] = 0), (r[t + 6] = w), (r[t + 7] = g);
  };
});
var xt = It(vt()),
  { default: ht, ...Bt } = xt,
  $t = ht !== void 0 ? ht : Bt;
export { $t as default };
