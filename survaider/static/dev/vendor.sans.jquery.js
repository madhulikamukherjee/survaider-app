var Node = Node || {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3
};

$.scrollWindowTo = function(pos, duration, cb) {
  if (duration == null) {
    duration = 0;
  }
  if (pos === $(window).scrollTop()) {
    $(window).trigger('scroll');
    if (typeof cb === "function") {
      cb();
    }
    return;
  }
  return $('html, body').animate({
    scrollTop: pos
  }, duration, function() {
    return typeof cb === "function" ? cb() : void 0;
  });
};
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
//# sourceMappingURL=underscore-min.map
(function() {
  var arrays, basicObjects, deepClone, deepExtend, deepExtendCouple, isBasicObject,
    __slice = [].slice;

  deepClone = function(obj) {
    var func, isArr;
    if (!_.isObject(obj || _.isFunction(obj))) {
      return obj;
    }
    if (_.isDate(obj)) {
      return new Date(obj.getTime());
    }
    if (_.isRegExp(obj)) {
      return new RegExp(obj.source, obj.toString().replace(/.*\//, ""));
    }
    isArr = _.isArray(obj || _.isArguments(obj));
    func = function(memo, value, key) {
      if (isArr) {
        memo.push(deepClone(value));
      } else {
        memo[key] = deepClone(value);
      }
      return memo;
    };
    return _.reduce(obj, func, isArr ? [] : {});
  };

  isBasicObject = function(object) {
    if(object === null) return false;
    return (object.prototype === {}.prototype || object.prototype === Object.prototype) && _.isObject(object) && !_.isArray(object) && !_.isFunction(object) && !_.isDate(object) && !_.isRegExp(object) && !_.isArguments(object);
  };

  basicObjects = function(object) {
    return _.filter(_.keys(object), function(key) {
      return isBasicObject(object[key]);
    });
  };

  arrays = function(object) {
    return _.filter(_.keys(object), function(key) {
      return _.isArray(object[key]);
    });
  };

  deepExtendCouple = function(destination, source, maxDepth) {
    var combine, recurse, sharedArrayKey, sharedArrayKeys, sharedObjectKey, sharedObjectKeys, _i, _j, _len, _len1;
    if (maxDepth == null) {
      maxDepth = 20;
    }
    if (maxDepth <= 0) {
      console.warn('_.deepExtend(): Maximum depth of recursion hit.');
      return _.extend(destination, source);
    }
    sharedObjectKeys = _.intersection(basicObjects(destination), basicObjects(source));
    recurse = function(key) {
      return source[key] = deepExtendCouple(destination[key], source[key], maxDepth - 1);
    };
    for (_i = 0, _len = sharedObjectKeys.length; _i < _len; _i++) {
      sharedObjectKey = sharedObjectKeys[_i];
      recurse(sharedObjectKey);
    }
    sharedArrayKeys = _.intersection(arrays(destination), arrays(source));
    combine = function(key) {
      return source[key] = _.union(destination[key], source[key]);
    };
    for (_j = 0, _len1 = sharedArrayKeys.length; _j < _len1; _j++) {
      sharedArrayKey = sharedArrayKeys[_j];
      combine(sharedArrayKey);
    }
    return _.extend(destination, source);
  };

  deepExtend = function() {
    var finalObj, maxDepth, objects, _i;
    objects = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), maxDepth = arguments[_i++];
    if (!_.isNumber(maxDepth)) {
      objects.push(maxDepth);
      maxDepth = 20;
    }
    if (objects.length <= 1) {
      return objects[0];
    }
    if (maxDepth <= 0) {
      return _.extend.apply(this, objects);
    }
    finalObj = objects.shift();
    while (objects.length > 0) {
      finalObj = deepExtendCouple(finalObj, deepClone(objects.shift()), maxDepth);
    }
    return finalObj;
  };

  _.mixin({
    deepClone: deepClone,
    isBasicObject: isBasicObject,
    basicObjects: basicObjects,
    arrays: arrays,
    deepExtend: deepExtend
  });

}).call(this);
(function() {
  // Public sightglass interface.
  function sightglass(obj, keypath, callback, options) {
    return new Observer(obj, keypath, callback, options)
  }

  // Batteries not included.
  sightglass.adapters = {}

  // Constructs a new keypath observer and kicks things off.
  function Observer(obj, keypath, callback, options) {
    this.options = options || {}
    this.options.adapters = this.options.adapters || {}
    this.obj = obj
    this.keypath = keypath
    this.callback = callback
    this.objectPath = []
    this.parse()

    if (isObject(this.target = this.realize())) {
      this.set(true, this.key, this.target, this.callback)
    }
  }

  // Tokenizes the provided keypath string into interface + path tokens for the
  // observer to work with.
  Observer.tokenize = function(keypath, interfaces, root) {
    var tokens = []
    var current = {i: root, path: ''}
    var index, chr

    for (index = 0; index < keypath.length; index++) {
      chr = keypath.charAt(index)

      if (!!~interfaces.indexOf(chr)) {
        tokens.push(current)
        current = {i: chr, path: ''}
      } else {
        current.path += chr
      }
    }

    tokens.push(current)
    return tokens
  }

  // Parses the keypath using the interfaces defined on the view. Sets variables
  // for the tokenized keypath as well as the end key.
  Observer.prototype.parse = function() {
    var interfaces = this.interfaces()
    var root, path

    if (!interfaces.length) {
      error('Must define at least one adapter interface.')
    }

    if (!!~interfaces.indexOf(this.keypath[0])) {
      root = this.keypath[0]
      path = this.keypath.substr(1)
    } else {
      if (typeof (root = this.options.root || sightglass.root) === 'undefined') {
        error('Must define a default root adapter.')
      }

      path = this.keypath
    }

    this.tokens = Observer.tokenize(path, interfaces, root)
    this.key = this.tokens.pop()
  }

  // Realizes the full keypath, attaching observers for every key and correcting
  // old observers to any changed objects in the keypath.
  Observer.prototype.realize = function() {
    var current = this.obj
    var unreached = false
    var prev

    this.tokens.forEach(function(token, index) {
      if (isObject(current)) {
        if (typeof this.objectPath[index] !== 'undefined') {
          if (current !== (prev = this.objectPath[index])) {
            this.set(false, token, prev, this.update.bind(this))
            this.set(true, token, current, this.update.bind(this))
            this.objectPath[index] = current
          }
        } else {
          this.set(true, token, current, this.update.bind(this))
          this.objectPath[index] = current
        }

        current = this.get(token, current)
      } else {
        if (unreached === false) {
          unreached = index
        }

        if (prev = this.objectPath[index]) {
          this.set(false, token, prev, this.update.bind(this))
        }
      }
    }, this)

    if (unreached !== false) {
      this.objectPath.splice(unreached)
    }

    return current
  }

  // Updates the keypath. This is called when any intermediary key is changed.
  Observer.prototype.update = function() {
    var next, oldValue

    if ((next = this.realize()) !== this.target) {
      if (isObject(this.target)) {
        this.set(false, this.key, this.target, this.callback)
      }

      if (isObject(next)) {
        this.set(true, this.key, next, this.callback)
      }

      oldValue = this.value()
      this.target = next

      if (this.value() !== oldValue) this.callback()
    }
  }

  // Reads the current end value of the observed keypath. Returns undefined if
  // the full keypath is unreachable.
  Observer.prototype.value = function() {
    if (isObject(this.target)) {
      return this.get(this.key, this.target)
    }
  }

  // Sets the current end value of the observed keypath. Calling setValue when
  // the full keypath is unreachable is a no-op.
  Observer.prototype.setValue = function(value) {
    if (isObject(this.target)) {
      this.adapter(this.key).set(this.target, this.key.path, value)
    }
  }

  // Gets the provided key on an object.
  Observer.prototype.get = function(key, obj) {
    return this.adapter(key).get(obj, key.path)
  }

  // Observes or unobserves a callback on the object using the provided key.
  Observer.prototype.set = function(active, key, obj, callback) {
    var action = active ? 'observe' : 'unobserve'
    this.adapter(key)[action](obj, key.path, callback)
  }

  // Returns an array of all unique adapter interfaces available.
  Observer.prototype.interfaces = function() {
    var interfaces = Object.keys(this.options.adapters)

    Object.keys(sightglass.adapters).forEach(function(i) {
      if (!~interfaces.indexOf(i)) {
        interfaces.push(i)
      }
    })

    return interfaces
  }

  // Convenience function to grab the adapter for a specific key.
  Observer.prototype.adapter = function(key) {
    return this.options.adapters[key.i] ||
      sightglass.adapters[key.i]
  }

  // Unobserves the entire keypath.
  Observer.prototype.unobserve = function() {
    var obj

    this.tokens.forEach(function(token, index) {
      if (obj = this.objectPath[index]) {
        this.set(false, token, obj, this.update.bind(this))
      }
    }, this)

    if (isObject(this.target)) {
      this.set(false, this.key, this.target, this.callback)
    }
  }

  // Check if a value is an object than can be observed.
  function isObject(obj) {
    return typeof obj === 'object' && obj !== null
  }

  // Error thrower.
  function error(message) {
    throw new Error('[sightglass] ' + message)
  }

  // Export module for Node and the browser.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = sightglass
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return this.sightglass = sightglass
    })
  } else {
    this.sightglass = sightglass
  }
}).call(this);

// Rivets.js
// version: 0.5.13
// author: Michael Richards
// license: MIT
(function() {
  var Rivets, jQuery,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Rivets = {};

  jQuery = window.jQuery || window.Zepto;

  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }

  Rivets.Binding = (function() {
    function Binding(view, el, type, key, keypath, options) {
      var identifier, regexp, value, _ref;
      this.view = view;
      this.el = el;
      this.type = type;
      this.key = key;
      this.keypath = keypath;
      this.options = options != null ? options : {};
      this.update = __bind(this.update, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.publish = __bind(this.publish, this);
      this.sync = __bind(this.sync, this);
      this.set = __bind(this.set, this);
      this.eventHandler = __bind(this.eventHandler, this);
      this.formattedValue = __bind(this.formattedValue, this);
      if (!(this.binder = this.view.binders[type])) {
        _ref = this.view.binders;
        for (identifier in _ref) {
          value = _ref[identifier];
          if (identifier !== '*' && identifier.indexOf('*') !== -1) {
            regexp = new RegExp("^" + (identifier.replace('*', '.+')) + "$");
            if (regexp.test(type)) {
              this.binder = value;
              this.args = new RegExp("^" + (identifier.replace('*', '(.+)')) + "$").exec(type);
              this.args.shift();
            }
          }
        }
      }
      this.binder || (this.binder = this.view.binders['*']);
      if (this.binder instanceof Function) {
        this.binder = {
          routine: this.binder
        };
      }
      this.formatters = this.options.formatters || [];
      this.model = this.key ? this.view.models[this.key] : this.view.models;
    }

    Binding.prototype.formattedValue = function(value) {
      var args, formatter, id, _i, _len, _ref;
      _ref = this.formatters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        formatter = _ref[_i];
        args = formatter.split(/\s+/);
        id = args.shift();
        formatter = this.model[id] instanceof Function ? this.model[id] : this.view.formatters[id];
        if ((formatter != null ? formatter.read : void 0) instanceof Function) {
          value = formatter.read.apply(formatter, [value].concat(__slice.call(args)));
        } else if (formatter instanceof Function) {
          value = formatter.apply(null, [value].concat(__slice.call(args)));
        }
      }
      return value;
    };

    Binding.prototype.eventHandler = function(fn) {
      var binding, handler;
      handler = (binding = this).view.config.handler;
      return function(ev) {
        return handler.call(fn, this, ev, binding);
      };
    };

    Binding.prototype.set = function(value) {
      var _ref;
      value = value instanceof Function && !this.binder["function"] ? this.formattedValue(value.call(this.model)) : this.formattedValue(value);
      return (_ref = this.binder.routine) != null ? _ref.call(this, this.el, value) : void 0;
    };

    Binding.prototype.sync = function() {
      return this.set(this.options.bypass ? this.model[this.keypath] : this.view.config.adapter.read(this.model, this.keypath));
    };

    Binding.prototype.publish = function() {
      var args, formatter, id, value, _i, _len, _ref, _ref1, _ref2;
      value = Rivets.Util.getInputValue(this.el);
      _ref = this.formatters.slice(0).reverse();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        formatter = _ref[_i];
        args = formatter.split(/\s+/);
        id = args.shift();
        if ((_ref1 = this.view.formatters[id]) != null ? _ref1.publish : void 0) {
          value = (_ref2 = this.view.formatters[id]).publish.apply(_ref2, [value].concat(__slice.call(args)));
        }
      }
      return this.view.config.adapter.publish(this.model, this.keypath, value);
    };

    Binding.prototype.bind = function() {
      var dependency, keypath, model, _i, _len, _ref, _ref1, _ref2, _results;
      if ((_ref = this.binder.bind) != null) {
        _ref.call(this, this.el);
      }
      if (this.options.bypass) {
        this.sync();
      } else {
        this.view.config.adapter.subscribe(this.model, this.keypath, this.sync);
        if (this.view.config.preloadData) {
          this.sync();
        }
      }
      if ((_ref1 = this.options.dependencies) != null ? _ref1.length : void 0) {
        _ref2 = this.options.dependencies;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          dependency = _ref2[_i];
          if (/^\./.test(dependency)) {
            model = this.model;
            keypath = dependency.substr(1);
          } else {
            dependency = dependency.split('.');
            model = this.view.models[dependency.shift()];
            keypath = dependency.join('.');
          }
          _results.push(this.view.config.adapter.subscribe(model, keypath, this.sync));
        }
        return _results;
      }
    };

    Binding.prototype.unbind = function() {
      var dependency, keypath, model, _i, _len, _ref, _ref1, _ref2, _results;
      if ((_ref = this.binder.unbind) != null) {
        _ref.call(this, this.el);
      }
      if (!this.options.bypass) {
        this.view.config.adapter.unsubscribe(this.model, this.keypath, this.sync);
      }
      if ((_ref1 = this.options.dependencies) != null ? _ref1.length : void 0) {
        _ref2 = this.options.dependencies;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          dependency = _ref2[_i];
          if (/^\./.test(dependency)) {
            model = this.model;
            keypath = dependency.substr(1);
          } else {
            dependency = dependency.split('.');
            model = this.view.models[dependency.shift()];
            keypath = dependency.join('.');
          }
          _results.push(this.view.config.adapter.unsubscribe(model, keypath, this.sync));
        }
        return _results;
      }
    };

    Binding.prototype.update = function(models) {
      var _ref;
      if (models == null) {
        models = {};
      }
      if (this.key) {
        if (models[this.key]) {
          if (!this.options.bypass) {
            this.view.config.adapter.unsubscribe(this.model, this.keypath, this.sync);
          }
          this.model = models[this.key];
          if (this.options.bypass) {
            this.sync();
          } else {
            this.view.config.adapter.subscribe(this.model, this.keypath, this.sync);
            if (this.view.config.preloadData) {
              this.sync();
            }
          }
        }
      } else {
        this.sync();
      }
      return (_ref = this.binder.update) != null ? _ref.call(this, models) : void 0;
    };

    return Binding;

  })();

  Rivets.ComponentBinding = (function(_super) {
    __extends(ComponentBinding, _super);

    function ComponentBinding(view, el, type) {
      var attribute, _i, _len, _ref, _ref1;
      this.view = view;
      this.el = el;
      this.type = type;
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.update = __bind(this.update, this);
      this.locals = __bind(this.locals, this);
      this.component = Rivets.components[this.type];
      this.attributes = {};
      this.inflections = {};
      _ref = this.el.attributes || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attribute = _ref[_i];
        if (_ref1 = attribute.name, __indexOf.call(this.component.attributes, _ref1) >= 0) {
          this.attributes[attribute.name] = attribute.value;
        } else {
          this.inflections[attribute.name] = attribute.value;
        }
      }
    }

    ComponentBinding.prototype.sync = function() {};

    ComponentBinding.prototype.locals = function(models) {
      var inverse, key, model, path, result, _i, _len, _ref, _ref1;
      if (models == null) {
        models = this.view.models;
      }
      result = {};
      _ref = this.inflections;
      for (key in _ref) {
        inverse = _ref[key];
        _ref1 = inverse.split('.');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          path = _ref1[_i];
          result[key] = (result[key] || models)[path];
        }
      }
      for (key in models) {
        model = models[key];
        if (result[key] == null) {
          result[key] = model;
        }
      }
      return result;
    };

    ComponentBinding.prototype.update = function(models) {
      var _ref;
      return (_ref = this.componentView) != null ? _ref.update(this.locals(models)) : void 0;
    };

    ComponentBinding.prototype.bind = function() {
      var el, _ref;
      if (this.componentView != null) {
        return (_ref = this.componentView) != null ? _ref.bind() : void 0;
      } else {
        el = this.component.build.call(this.attributes);
        (this.componentView = new Rivets.View(el, this.locals(), this.view.options)).bind();
        return this.el.parentNode.replaceChild(el, this.el);
      }
    };

    ComponentBinding.prototype.unbind = function() {
      var _ref;
      return (_ref = this.componentView) != null ? _ref.unbind() : void 0;
    };

    return ComponentBinding;

  })(Rivets.Binding);

  Rivets.TextBinding = (function(_super) {
    __extends(TextBinding, _super);

    function TextBinding(view, el, type, key, keypath, options) {
      this.view = view;
      this.el = el;
      this.type = type;
      this.key = key;
      this.keypath = keypath;
      this.options = options != null ? options : {};
      this.sync = __bind(this.sync, this);
      this.formatters = this.options.formatters || [];
      this.model = this.key ? this.view.models[this.key] : this.view.models;
    }

    TextBinding.prototype.binder = {
      routine: function(node, value) {
        return node.data = value != null ? value : '';
      }
    };

    TextBinding.prototype.sync = function() {
      return TextBinding.__super__.sync.apply(this, arguments);
    };

    return TextBinding;

  })(Rivets.Binding);

  Rivets.View = (function() {
    function View(els, models, options) {
      var k, option, v, _base, _i, _len, _ref, _ref1, _ref2;
      this.els = els;
      this.models = models;
      this.options = options != null ? options : {};
      this.update = __bind(this.update, this);
      this.publish = __bind(this.publish, this);
      this.sync = __bind(this.sync, this);
      this.unbind = __bind(this.unbind, this);
      this.bind = __bind(this.bind, this);
      this.select = __bind(this.select, this);
      this.build = __bind(this.build, this);
      this.componentRegExp = __bind(this.componentRegExp, this);
      this.bindingRegExp = __bind(this.bindingRegExp, this);
      if (typeof this.els.length === 'undefined') {
        this.els = [this.els];
      }
      _ref = ['config', 'binders', 'formatters'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        this[option] = {};
        if (this.options[option]) {
          _ref1 = this.options[option];
          for (k in _ref1) {
            v = _ref1[k];
            this[option][k] = v;
          }
        }
        _ref2 = Rivets[option];
        for (k in _ref2) {
          v = _ref2[k];
          if ((_base = this[option])[k] == null) {
            _base[k] = v;
          }
        }
      }
      this.build();
    }

    View.prototype.bindingRegExp = function() {
      var prefix;
      prefix = this.config.prefix;
      if (prefix) {
        return new RegExp("^data-" + prefix + "-");
      } else {
        return /^data-/;
      }
    };

    View.prototype.componentRegExp = function() {
      var _ref, _ref1;
      return new RegExp("^" + ((_ref = (_ref1 = this.config.prefix) != null ? _ref1.toUpperCase() : void 0) != null ? _ref : 'RV') + "-");
    };

    View.prototype.build = function() {
      var bindingRegExp, buildBinding, componentRegExp, el, parse, skipNodes, _i, _len, _ref,
        _this = this;
      this.bindings = [];
      skipNodes = [];
      bindingRegExp = this.bindingRegExp();
      componentRegExp = this.componentRegExp();
      buildBinding = function(binding, node, type, declaration) {
        var context, ctx, dependencies, key, keypath, options, path, pipe, pipes, splitPath;
        options = {};
        pipes = (function() {
          var _i, _len, _ref, _results;
          _ref = declaration.split('|');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            pipe = _ref[_i];
            _results.push(pipe.trim());
          }
          return _results;
        })();
        context = (function() {
          var _i, _len, _ref, _results;
          _ref = pipes.shift().split('<');
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ctx = _ref[_i];
            _results.push(ctx.trim());
          }
          return _results;
        })();
        path = context.shift();
        splitPath = path.split(/\.|:/);
        options.formatters = pipes;
        options.bypass = path.indexOf(':') !== -1;
        if (splitPath[0]) {
          key = splitPath.shift();
        } else {
          key = null;
          splitPath.shift();
        }
        keypath = splitPath.join('.');
        if (dependencies = context.shift()) {
          options.dependencies = dependencies.split(/\s+/);
        }
        return _this.bindings.push(new Rivets[binding](_this, node, type, key, keypath, options));
      };
      parse = function(node) {
        var attribute, attributes, binder, childNode, delimiters, identifier, n, parser, regexp, restTokens, startToken, text, token, tokens, type, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _results;
        if (__indexOf.call(skipNodes, node) < 0) {
          if (node.nodeType === Node.TEXT_NODE) {
            parser = Rivets.TextTemplateParser;
            if (delimiters = _this.config.templateDelimiters) {
              if ((tokens = parser.parse(node.data, delimiters)).length) {
                if (!(tokens.length === 1 && tokens[0].type === parser.types.text)) {
                  startToken = tokens[0], restTokens = 2 <= tokens.length ? __slice.call(tokens, 1) : [];
                  node.data = startToken.value;
                  if (startToken.type === 0) {
                    node.data = startToken.value;
                  } else {
                    buildBinding('TextBinding', node, null, startToken.value);
                  }
                  for (_i = 0, _len = restTokens.length; _i < _len; _i++) {
                    token = restTokens[_i];
                    text = document.createTextNode(token.value);
                    node.parentNode.appendChild(text);
                    if (token.type === 1) {
                      buildBinding('TextBinding', text, null, token.value);
                    }
                  }
                }
              }
            }
          } else if (componentRegExp.test(node.tagName)) {
            type = node.tagName.replace(componentRegExp, '').toLowerCase();
            _this.bindings.push(new Rivets.ComponentBinding(_this, node, type));
          } else if (node.attributes != null) {
            _ref = node.attributes;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              attribute = _ref[_j];
              if (bindingRegExp.test(attribute.name)) {
                type = attribute.name.replace(bindingRegExp, '');
                if (!(binder = _this.binders[type])) {
                  _ref1 = _this.binders;
                  for (identifier in _ref1) {
                    value = _ref1[identifier];
                    if (identifier !== '*' && identifier.indexOf('*') !== -1) {
                      regexp = new RegExp("^" + (identifier.replace('*', '.+')) + "$");
                      if (regexp.test(type)) {
                        binder = value;
                      }
                    }
                  }
                }
                binder || (binder = _this.binders['*']);
                if (binder.block) {
                  _ref2 = node.childNodes;
                  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                    n = _ref2[_k];
                    skipNodes.push(n);
                  }
                  attributes = [attribute];
                }
              }
            }
            _ref3 = attributes || node.attributes;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              attribute = _ref3[_l];
              if (bindingRegExp.test(attribute.name)) {
                type = attribute.name.replace(bindingRegExp, '');
                buildBinding('Binding', node, type, attribute.value);
              }
            }
          }
          _ref4 = node.childNodes;
          _results = [];
          for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
            childNode = _ref4[_m];
            _results.push(parse(childNode));
          }
          return _results;
        }
      };
      _ref = this.els;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        parse(el);
      }
    };

    View.prototype.select = function(fn) {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        if (fn(binding)) {
          _results.push(binding);
        }
      }
      return _results;
    };

    View.prototype.bind = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.bind());
      }
      return _results;
    };

    View.prototype.unbind = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.unbind());
      }
      return _results;
    };

    View.prototype.sync = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.sync());
      }
      return _results;
    };

    View.prototype.publish = function() {
      var binding, _i, _len, _ref, _results;
      _ref = this.select(function(b) {
        return b.binder.publishes;
      });
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.publish());
      }
      return _results;
    };

    View.prototype.update = function(models) {
      var binding, key, model, _i, _len, _ref, _results;
      if (models == null) {
        models = {};
      }
      for (key in models) {
        model = models[key];
        this.models[key] = model;
      }
      _ref = this.bindings;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        _results.push(binding.update(models));
      }
      return _results;
    };

    return View;

  })();

  Rivets.TextTemplateParser = (function() {
    function TextTemplateParser() {}

    TextTemplateParser.types = {
      text: 0,
      binding: 1
    };

    TextTemplateParser.parse = function(template, delimiters) {
      var index, lastIndex, lastToken, length, substring, tokens, value;
      tokens = [];
      length = template.length;
      index = 0;
      lastIndex = 0;
      while (lastIndex < length) {
        index = template.indexOf(delimiters[0], lastIndex);
        if (index < 0) {
          tokens.push({
            type: this.types.text,
            value: template.slice(lastIndex)
          });
          break;
        } else {
          if (index > 0 && lastIndex < index) {
            tokens.push({
              type: this.types.text,
              value: template.slice(lastIndex, index)
            });
          }
          lastIndex = index + 2;
          index = template.indexOf(delimiters[1], lastIndex);
          if (index < 0) {
            substring = template.slice(lastIndex - 2);
            lastToken = tokens[tokens.length - 1];
            if ((lastToken != null ? lastToken.type : void 0) === this.types.text) {
              lastToken.value += substring;
            } else {
              tokens.push({
                type: this.types.text,
                value: substring
              });
            }
            break;
          }
          value = template.slice(lastIndex, index).trim();
          tokens.push({
            type: this.types.binding,
            value: value
          });
          lastIndex = index + 2;
        }
      }
      return tokens;
    };

    return TextTemplateParser;

  })();

  Rivets.Util = {
    bindEvent: function(el, event, handler) {
      if (window.jQuery != null) {
        el = jQuery(el);
        if (el.on != null) {
          return el.on(event, handler);
        } else {
          return el.bind(event, handler);
        }
      } else if (window.addEventListener != null) {
        return el.addEventListener(event, handler, false);
      } else {
        event = 'on' + event;
        return el.attachEvent(event, handler);
      }
    },
    unbindEvent: function(el, event, handler) {
      if (window.jQuery != null) {
        el = jQuery(el);
        if (el.off != null) {
          return el.off(event, handler);
        } else {
          return el.unbind(event, handler);
        }
      } else if (window.removeEventListener != null) {
        return el.removeEventListener(event, handler, false);
      } else {
        event = 'on' + event;
        return el.detachEvent(event, handler);
      }
    },
    getInputValue: function(el) {
      var o, _i, _len, _results;
      if (window.jQuery != null) {
        el = jQuery(el);
        switch (el[0].type) {
          case 'checkbox':
            return el.is(':checked');
          default:
            return el.val();
        }
      } else {
        switch (el.type) {
          case 'checkbox':
            return el.checked;
          case 'select-multiple':
            _results = [];
            for (_i = 0, _len = el.length; _i < _len; _i++) {
              o = el[_i];
              if (o.selected) {
                _results.push(o.value);
              }
            }
            return _results;
            break;
          default:
            return el.value;
        }
      }
    }
  };

  Rivets.binders = {
    enabled: function(el, value) {
      return el.disabled = !value;
    },
    disabled: function(el, value) {
      return el.disabled = !!value;
    },
    checked: {
      publishes: true,
      bind: function(el) {
        return Rivets.Util.bindEvent(el, 'change', this.publish);
      },
      unbind: function(el) {
        return Rivets.Util.unbindEvent(el, 'change', this.publish);
      },
      routine: function(el, value) {
        var _ref;
        if (el.type === 'radio') {
          return el.checked = ((_ref = el.value) != null ? _ref.toString() : void 0) === (value != null ? value.toString() : void 0);
        } else {
          return el.checked = !!value;
        }
      }
    },
    unchecked: {
      publishes: true,
      bind: function(el) {
        return Rivets.Util.bindEvent(el, 'change', this.publish);
      },
      unbind: function(el) {
        return Rivets.Util.unbindEvent(el, 'change', this.publish);
      },
      routine: function(el, value) {
        var _ref;
        if (el.type === 'radio') {
          return el.checked = ((_ref = el.value) != null ? _ref.toString() : void 0) !== (value != null ? value.toString() : void 0);
        } else {
          return el.checked = !value;
        }
      }
    },
    show: function(el, value) {
      return el.style.display = value ? '' : 'none';
    },
    hide: function(el, value) {
      return el.style.display = value ? 'none' : '';
    },
    html: function(el, value) {
      return el.innerHTML = value != null ? value : '';
    },
    value: {
      publishes: true,
      bind: function(el) {
        return Rivets.Util.bindEvent(el, 'change', this.publish);
      },
      unbind: function(el) {
        return Rivets.Util.unbindEvent(el, 'change', this.publish);
      },
      routine: function(el, value) {
        var o, _i, _len, _ref, _ref1, _ref2, _results;
        if (window.jQuery != null) {
          el = jQuery(el);
          if ((value != null ? value.toString() : void 0) !== ((_ref = el.val()) != null ? _ref.toString() : void 0)) {
            return el.val(value != null ? value : '');
          }
        } else {
          if (el.type === 'select-multiple') {
            if (value != null) {
              _results = [];
              for (_i = 0, _len = el.length; _i < _len; _i++) {
                o = el[_i];
                _results.push(o.selected = (_ref1 = o.value, __indexOf.call(value, _ref1) >= 0));
              }
              return _results;
            }
          } else if ((value != null ? value.toString() : void 0) !== ((_ref2 = el.value) != null ? _ref2.toString() : void 0)) {
            return el.value = value != null ? value : '';
          }
        }
      }
    },
    text: function(el, value) {
      if (el.innerText != null) {
        return el.innerText = value != null ? value : '';
      } else {
        return el.textContent = value != null ? value : '';
      }
    },
    "if": {
      block: true,
      bind: function(el) {
        var attr, declaration;
        if (this.marker == null) {
          attr = ['data', this.view.config.prefix, this.type].join('-').replace('--', '-');
          declaration = el.getAttribute(attr);
          this.marker = document.createComment(" rivets: " + this.type + " " + declaration + " ");
          el.removeAttribute(attr);
          el.parentNode.insertBefore(this.marker, el);
          return el.parentNode.removeChild(el);
        }
      },
      unbind: function() {
        var _ref;
        return (_ref = this.nested) != null ? _ref.unbind() : void 0;
      },
      routine: function(el, value) {
        var key, model, models, options, _ref;
        if (!!value === (this.nested == null)) {
          if (value) {
            models = {};
            _ref = this.view.models;
            for (key in _ref) {
              model = _ref[key];
              models[key] = model;
            }
            options = {
              binders: this.view.options.binders,
              formatters: this.view.options.formatters,
              config: this.view.options.config
            };
            (this.nested = new Rivets.View(el, models, options)).bind();
            return this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
          } else {
            el.parentNode.removeChild(el);
            this.nested.unbind();
            return delete this.nested;
          }
        }
      },
      update: function(models) {
        var _ref;
        return (_ref = this.nested) != null ? _ref.update(models) : void 0;
      }
    },
    unless: {
      block: true,
      bind: function(el) {
        return Rivets.binders["if"].bind.call(this, el);
      },
      unbind: function() {
        return Rivets.binders["if"].unbind.call(this);
      },
      routine: function(el, value) {
        return Rivets.binders["if"].routine.call(this, el, !value);
      },
      update: function(models) {
        return Rivets.binders["if"].update.call(this, models);
      }
    },
    "on-*": {
      "function": true,
      unbind: function(el) {
        if (this.handler) {
          return Rivets.Util.unbindEvent(el, this.args[0], this.handler);
        }
      },
      routine: function(el, value) {
        if (this.handler) {
          Rivets.Util.unbindEvent(el, this.args[0], this.handler);
        }
        return Rivets.Util.bindEvent(el, this.args[0], this.handler = this.eventHandler(value));
      }
    },
    "each-*": {
      block: true,
      bind: function(el) {
        var attr;
        if (this.marker == null) {
          attr = ['data', this.view.config.prefix, this.type].join('-').replace('--', '-');
          this.marker = document.createComment(" rivets: " + this.type + " ");
          this.iterated = [];
          el.removeAttribute(attr);
          el.parentNode.insertBefore(this.marker, el);
          return el.parentNode.removeChild(el);
        }
      },
      unbind: function(el) {
        var view, _i, _len, _ref, _results;
        if (this.iterated != null) {
          _ref = this.iterated;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            _results.push(view.unbind());
          }
          return _results;
        }
      },
      routine: function(el, collection) {
        var data, i, index, k, key, model, modelName, options, previous, template, v, view, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;
        modelName = this.args[0];
        collection = collection || [];
        if (this.iterated.length > collection.length) {
          _ref = Array(this.iterated.length - collection.length);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            view = this.iterated.pop();
            view.unbind();
            this.marker.parentNode.removeChild(view.els[0]);
          }
        }
        _results = [];
        for (index = _j = 0, _len1 = collection.length; _j < _len1; index = ++_j) {
          model = collection[index];
          data = {};
          data[modelName] = model;
          if (this.iterated[index] == null) {
            _ref1 = this.view.models;
            for (key in _ref1) {
              model = _ref1[key];
              if (data[key] == null) {
                data[key] = model;
              }
            }
            previous = this.iterated.length ? this.iterated[this.iterated.length - 1].els[0] : this.marker;
            options = {
              binders: this.view.options.binders,
              formatters: this.view.options.formatters,
              config: {}
            };
            _ref2 = this.view.options.config;
            for (k in _ref2) {
              v = _ref2[k];
              options.config[k] = v;
            }
            options.config.preloadData = true;
            template = el.cloneNode(true);
            view = new Rivets.View(template, data, options);
            view.bind();
            this.iterated.push(view);
            _results.push(this.marker.parentNode.insertBefore(template, previous.nextSibling));
          } else if (this.iterated[index].models[modelName] !== model) {
            _results.push(this.iterated[index].update(data));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      update: function(models) {
        var data, key, model, view, _i, _len, _ref, _results;
        data = {};
        for (key in models) {
          model = models[key];
          if (key !== this.args[0]) {
            data[key] = model;
          }
        }
        _ref = this.iterated;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(view.update(data));
        }
        return _results;
      }
    },
    "class-*": function(el, value) {
      var elClass;
      elClass = " " + el.className + " ";
      if (!value === (elClass.indexOf(" " + this.args[0] + " ") !== -1)) {
        return el.className = value ? "" + el.className + " " + this.args[0] : elClass.replace(" " + this.args[0] + " ", ' ').trim();
      }
    },
    "*": function(el, value) {
      if (value) {
        return el.setAttribute(this.type, value);
      } else {
        return el.removeAttribute(this.type);
      }
    }
  };

  Rivets.components = {};

  Rivets.config = {
    preloadData: true,
    handler: function(context, ev, binding) {
      return this.call(context, ev, binding.view.models);
    }
  };

  Rivets.formatters = {};

  Rivets.factory = function(exports) {
    exports._ = Rivets;
    exports.binders = Rivets.binders;
    exports.components = Rivets.components;
    exports.formatters = Rivets.formatters;
    exports.config = Rivets.config;
    exports.configure = function(options) {
      var property, value;
      if (options == null) {
        options = {};
      }
      for (property in options) {
        value = options[property];
        Rivets.config[property] = value;
      }
    };
    return exports.bind = function(el, models, options) {
      var view;
      if (models == null) {
        models = {};
      }
      if (options == null) {
        options = {};
      }
      view = new Rivets.View(el, models, options);
      view.bind();
      return view;
    };
  };

  if (typeof exports === 'object') {
    Rivets.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Rivets.factory(this.rivets = exports);
      return exports;
    });
  } else {
    Rivets.factory(this.rivets = {});
  }

}).call(this);

//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

/**
 * Main source
 */

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['underscore', 'backbone'], factory);
    } else {
        // globals
        factory(_, Backbone);
    }
}(function(_, Backbone) {
    
    /**
     * Takes a nested object and returns a shallow object keyed with the path names
     * e.g. { "level1.level2": "value" }
     *
     * @param  {Object}      Nested object e.g. { level1: { level2: 'value' } }
     * @return {Object}      Shallow object with path names e.g. { 'level1.level2': 'value' }
     */
    function objToPaths(obj) {
        var ret = {},
            separator = DeepModel.keyPathSeparator;

        for (var key in obj) {
            var val = obj[key];

            if (val && val.constructor === Object && !_.isEmpty(val)) {
                //Recursion for embedded objects
                var obj2 = objToPaths(val);

                for (var key2 in obj2) {
                    var val2 = obj2[key2];

                    ret[key + separator + key2] = val2;
                }
            } else {
                ret[key] = val;
            }
        }

        return ret;
    }

    /**
     * @param {Object}  Object to fetch attribute from
     * @param {String}  Object path e.g. 'user.name'
     * @return {Mixed}
     */
    function getNested(obj, path, return_exists) {
        var separator = DeepModel.keyPathSeparator;

        var fields = path.split(separator);
        var result = obj;
        return_exists || (return_exists === false);
        for (var i = 0, n = fields.length; i < n; i++) {
            if (return_exists && !_.has(result, fields[i])) {
                return false;
            }
            result = result[fields[i]];

            if (result == null && i < n - 1) {
                result = {};
            }
            
            if (typeof result === 'undefined') {
                if (return_exists)
                {
                    return true;
                }
                return result;
            }
        }
        if (return_exists)
        {
            return true;
        }
        return result;
    }

    /**
     * @param {Object} obj                Object to fetch attribute from
     * @param {String} path               Object path e.g. 'user.name'
     * @param {Object} [options]          Options
     * @param {Boolean} [options.unset]   Whether to delete the value
     * @param {Mixed}                     Value to set
     */
    function setNested(obj, path, val, options) {
        options = options || {};

        var separator = DeepModel.keyPathSeparator;

        var fields = path.split(separator);
        var result = obj;
        for (var i = 0, n = fields.length; i < n && result !== undefined ; i++) {
            var field = fields[i];

            //If the last in the path, set the value
            if (i === n - 1) {
                options.unset ? delete result[field] : result[field] = val;
            } else {
                //Create the child object if it doesn't exist, or isn't an object
                if (typeof result[field] === 'undefined' || ! _.isObject(result[field])) {
                    result[field] = {};
                }

                //Move onto the next part of the path
                result = result[field];
            }
        }
    }

    function deleteNested(obj, path) {
      setNested(obj, path, null, { unset: true });
    }

    var DeepModel = Backbone.Model.extend({

        // Override constructor
        // Support having nested defaults by using _.deepExtend instead of _.extend
        constructor: function(attributes, options) {
            var defaults;
            var attrs = attributes || {};
            this.cid = _.uniqueId('c');
            this.attributes = {};
            if (options && options.collection) this.collection = options.collection;
            if (options && options.parse) attrs = this.parse(attrs, options) || {};
            if (defaults = _.result(this, 'defaults')) {
                //<custom code>
                // Replaced the call to _.defaults with _.deepExtend.
                attrs = _.deepExtend({}, defaults, attrs);
                //</custom code>
            }
            this.set(attrs, options);
            this.changed = {};
            this.initialize.apply(this, arguments);
        },

        // Return a copy of the model's `attributes` object.
        toJSON: function(options) {
          return _.deepClone(this.attributes);
        },

        // Override get
        // Supports nested attributes via the syntax 'obj.attr' e.g. 'author.user.name'
        get: function(attr) {
            return getNested(this.attributes, attr);
        },

        // Override set
        // Supports nested attributes via the syntax 'obj.attr' e.g. 'author.user.name'
        set: function(key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (key == null) return this;
            
            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (typeof key === 'object') {
              attrs = key;
              options = val || {};
            } else {
              (attrs = {})[key] = val;
            }

            options || (options = {});
            
            // Run validation.
            if (!this._validate(attrs, options)) return false;

            // Extract attributes and options.
            unset           = options.unset;
            silent          = options.silent;
            changes         = [];
            changing        = this._changing;
            this._changing  = true;

            if (!changing) {
              this._previousAttributes = _.deepClone(this.attributes); //<custom>: Replaced _.clone with _.deepClone
              this.changed = {};
            }
            current = this.attributes, prev = this._previousAttributes;

            // Check for changes of `id`.
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

            //<custom code>
            attrs = objToPaths(attrs);
            //</custom code>

            // For each `set` attribute, update or delete the current value.
            for (attr in attrs) {
              val = attrs[attr];

              //<custom code>: Using getNested, setNested and deleteNested
              if (!_.isEqual(getNested(current, attr), val)) changes.push(attr);
              if (!_.isEqual(getNested(prev, attr), val)) {
                setNested(this.changed, attr, val);
              } else {
                deleteNested(this.changed, attr);
              }
              unset ? deleteNested(current, attr) : setNested(current, attr, val);
              //</custom code>
            }

            // Trigger all relevant attribute changes.
            if (!silent) {
              if (changes.length) this._pending = true;

              //<custom code>
              var separator = DeepModel.keyPathSeparator;

              for (var i = 0, l = changes.length; i < l; i++) {
                var key = changes[i];

                this.trigger('change:' + key, this, getNested(current, key), options);

                var fields = key.split(separator);

                //Trigger change events for parent keys with wildcard (*) notation
                for(var n = fields.length - 1; n > 0; n--) {
                  var parentKey = _.first(fields, n).join(separator),
                      wildcardKey = parentKey + separator + '*';

                  this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
                }
                //</custom code>
              }
            }

            if (changing) return this;
            if (!silent) {
              while (this._pending) {
                this._pending = false;
                this.trigger('change', this, options);
              }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },

        // Clear all attributes on the model, firing `"change"` unless you choose
        // to silence it.
        clear: function(options) {
          var attrs = {};
          var shallowAttributes = objToPaths(this.attributes);
          for (var key in shallowAttributes) attrs[key] = void 0;
          return this.set(attrs, _.extend({}, options, {unset: true}));
        },

        // Determine if the model has changed since the last `"change"` event.
        // If you specify an attribute name, determine if that attribute has changed.
        hasChanged: function(attr) {
          if (attr == null) return !_.isEmpty(this.changed);
          return getNested(this.changed, attr) !== undefined;
        },

        // Return an object containing all the attributes that have changed, or
        // false if there are no changed attributes. Useful for determining what
        // parts of a view need to be updated and/or what attributes need to be
        // persisted to the server. Unset attributes will be set to undefined.
        // You can also pass an attributes object to diff against the model,
        // determining if there *would be* a change.
        changedAttributes: function(diff) {
          //<custom code>: objToPaths
          if (!diff) return this.hasChanged() ? objToPaths(this.changed) : false;
          //</custom code>

          var old = this._changing ? this._previousAttributes : this.attributes;
          
          //<custom code>
          diff = objToPaths(diff);
          old = objToPaths(old);
          //</custom code>

          var val, changed = false;
          for (var attr in diff) {
            if (_.isEqual(old[attr], (val = diff[attr]))) continue;
            (changed || (changed = {}))[attr] = val;
          }
          return changed;
        },

        // Get the previous value of an attribute, recorded at the time the last
        // `"change"` event was fired.
        previous: function(attr) {
          if (attr == null || !this._previousAttributes) return null;

          //<custom code>
          return getNested(this._previousAttributes, attr);
          //</custom code>
        },

        // Get all of the attributes of the model at the time of the previous
        // `"change"` event.
        previousAttributes: function() {
          //<custom code>
          return _.deepClone(this._previousAttributes);
          //</custom code>
        }
    });


    //Config; override in your app to customise
    DeepModel.keyPathSeparator = '.';


    //Exports
    Backbone.DeepModel = DeepModel;

    //For use in NodeJS
    if (typeof module != 'undefined') module.exports = DeepModel;
    
    return Backbone;

}));

/*! svg.js v2.0.5 MIT*/;!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.SVG=e()}(this,function(){function t(t){return t.toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function e(t){return t.charAt(0).toUpperCase()+t.slice(1)}function i(t){return 4==t.length?["#",t.substring(1,2),t.substring(1,2),t.substring(2,3),t.substring(2,3),t.substring(3,4),t.substring(3,4)].join(""):t}function n(t){var e=t.toString(16);return 1==e.length?"0"+e:e}function r(t,e,i){return null==i?i=t.height/t.width*e:null==e&&(e=t.width/t.height*i),{width:e,height:i}}function s(t,e,i){return{x:e*t.a+i*t.c+0,y:e*t.b+i*t.d+0}}function a(t){return{a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]}}function o(t){return t instanceof m.Matrix||(t=new m.Matrix(t)),t}function h(t,e){t.cx=null==t.cx?e.bbox().cx:t.cx,t.cy=null==t.cy?e.bbox().cy:t.cy}function u(t){return t=t.replace(m.regex.whitespace,"").replace(m.regex.matrix,"").split(m.regex.matrixElements),a(m.utils.map(t,function(t){return parseFloat(t)}))}function l(t,e){return"number"==typeof t.from?t.from+(t.to-t.from)*e:t instanceof m.Color||t instanceof m.Number||t instanceof m.Matrix?t.at(e):1>e?t.from:t.to}function c(t){for(var e=0,i=t.length,n="";i>e;e++)n+=t[e][0],null!=t[e][1]&&(n+=t[e][1],null!=t[e][2]&&(n+=" ",n+=t[e][2],null!=t[e][3]&&(n+=" ",n+=t[e][3],n+=" ",n+=t[e][4],null!=t[e][5]&&(n+=" ",n+=t[e][5],n+=" ",n+=t[e][6],null!=t[e][7]&&(n+=" ",n+=t[e][7])))));return n+" "}function f(t){for(var e=t.childNodes.length-1;e>=0;e--)t.childNodes[e]instanceof SVGElement&&f(t.childNodes[e]);return m.adopt(t).id(m.eid(t.nodeName))}function d(t){return null==t.x&&(t.x=0,t.y=0,t.width=0,t.height=0),t.w=t.width,t.h=t.height,t.x2=t.x+t.width,t.y2=t.y+t.height,t.cx=t.x+t.width/2,t.cy=t.y+t.height/2,t}function p(t){var e=t.toString().match(m.regex.reference);return e?e[1]:void 0}var m=this.SVG=function(t){return m.supported?(t=new m.Doc(t),m.parser||m.prepare(t),t):void 0};if(m.ns="http://www.w3.org/2000/svg",m.xmlns="http://www.w3.org/2000/xmlns/",m.xlink="http://www.w3.org/1999/xlink",m.supported=function(){return!!document.createElementNS&&!!document.createElementNS(m.ns,"svg").createSVGRect}(),!m.supported)return!1;m.did=1e3,m.eid=function(t){return"Svgjs"+e(t)+m.did++},m.create=function(t){var e=document.createElementNS(this.ns,t);return e.setAttribute("id",this.eid(t)),e},m.extend=function(){var t,e,i,n;for(t=[].slice.call(arguments),e=t.pop(),n=t.length-1;n>=0;n--)if(t[n])for(i in e)t[n].prototype[i]=e[i];m.Set&&m.Set.inherit&&m.Set.inherit()},m.invent=function(t){var e="function"==typeof t.create?t.create:function(){this.constructor.call(this,m.create(t.create))};return t.inherit&&(e.prototype=new t.inherit),t.extend&&m.extend(e,t.extend),t.construct&&m.extend(t.parent||m.Container,t.construct),e},m.adopt=function(t){if(t.instance)return t.instance;var i;return i="svg"==t.nodeName?t.parentNode instanceof SVGElement?new m.Nested:new m.Doc:"linearGradient"==t.nodeName?new m.Gradient("linear"):"radialGradient"==t.nodeName?new m.Gradient("radial"):m[e(t.nodeName)]?new(m[e(t.nodeName)]):new m.Element(t),i.type=t.nodeName,i.node=t,t.instance=i,i instanceof m.Doc&&i.namespace().defs(),i},m.prepare=function(t){var e=document.getElementsByTagName("body")[0],i=(e?new m.Doc(e):t.nested()).size(2,0),n=m.create("path");i.node.appendChild(n),m.parser={body:e||t.parent(),draw:i.style("opacity:0;position:fixed;left:100%;top:100%;overflow:hidden"),poly:i.polyline().node,path:n}},m.regex={unit:/^(-?[\d\.]+)([a-z%]{0,2})$/,hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgb:/rgb\((\d+),(\d+),(\d+)\)/,reference:/#([a-z0-9\-_]+)/i,matrix:/matrix\(|\)/g,matrixElements:/,*\s+|,/,whitespace:/\s/g,isHex:/^#[a-f0-9]{3,6}$/i,isRgb:/^rgb\(/,isCss:/[^:]+:[^;]+;?/,isBlank:/^(\s+)?$/,isNumber:/^-?[\d\.]+$/,isPercent:/^-?[\d\.]+%$/,isImage:/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i},m.utils={map:function(t,e){var i,n=t.length,r=[];for(i=0;n>i;i++)r.push(e(t[i]));return r},radians:function(t){return t%360*Math.PI/180},degrees:function(t){return 180*t/Math.PI%360},filterSVGElements:function(t){return[].filter.call(t,function(t){return t instanceof SVGElement})}},m.defaults={attrs:{"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000","font-size":16,"font-family":"Helvetica, Arial, sans-serif","text-anchor":"start"}},m.Color=function(t){var e;this.r=0,this.g=0,this.b=0,"string"==typeof t?m.regex.isRgb.test(t)?(e=m.regex.rgb.exec(t.replace(/\s/g,"")),this.r=parseInt(e[1]),this.g=parseInt(e[2]),this.b=parseInt(e[3])):m.regex.isHex.test(t)&&(e=m.regex.hex.exec(i(t)),this.r=parseInt(e[1],16),this.g=parseInt(e[2],16),this.b=parseInt(e[3],16)):"object"==typeof t&&(this.r=t.r,this.g=t.g,this.b=t.b)},m.extend(m.Color,{toString:function(){return this.toHex()},toHex:function(){return"#"+n(this.r)+n(this.g)+n(this.b)},toRgb:function(){return"rgb("+[this.r,this.g,this.b].join()+")"},brightness:function(){return this.r/255*.3+this.g/255*.59+this.b/255*.11},morph:function(t){return this.destination=new m.Color(t),this},at:function(t){return this.destination?(t=0>t?0:t>1?1:t,new m.Color({r:~~(this.r+(this.destination.r-this.r)*t),g:~~(this.g+(this.destination.g-this.g)*t),b:~~(this.b+(this.destination.b-this.b)*t)})):this}}),m.Color.test=function(t){return t+="",m.regex.isHex.test(t)||m.regex.isRgb.test(t)},m.Color.isRgb=function(t){return t&&"number"==typeof t.r&&"number"==typeof t.g&&"number"==typeof t.b},m.Color.isColor=function(t){return m.Color.isRgb(t)||m.Color.test(t)},m.Array=function(t,e){t=(t||[]).valueOf(),0==t.length&&e&&(t=e.valueOf()),this.value=this.parse(t)},m.extend(m.Array,{morph:function(t){if(this.destination=this.parse(t),this.value.length!=this.destination.length){for(var e=this.value[this.value.length-1],i=this.destination[this.destination.length-1];this.value.length>this.destination.length;)this.destination.push(i);for(;this.value.length<this.destination.length;)this.value.push(e)}return this},settle:function(){for(var t=0,e=this.value.length,i=[];e>t;t++)-1==i.indexOf(this.value[t])&&i.push(this.value[t]);return this.value=i},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,n=[];i>e;e++)n.push(this.value[e]+(this.destination[e]-this.value[e])*t);return new m.Array(n)},toString:function(){return this.value.join(" ")},valueOf:function(){return this.value},parse:function(t){return t=t.valueOf(),Array.isArray(t)?t:this.split(t)},split:function(t){return t.trim().split(/\s+/)},reverse:function(){return this.value.reverse(),this}}),m.PointArray=function(t,e){this.constructor.call(this,t,e||[[0,0]])},m.PointArray.prototype=new m.Array,m.extend(m.PointArray,{toString:function(){for(var t=0,e=this.value.length,i=[];e>t;t++)i.push(this.value[t].join(","));return i.join(" ")},toLine:function(){return{x1:this.value[0][0],y1:this.value[0][1],x2:this.value[1][0],y2:this.value[1][1]}},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,n=[];i>e;e++)n.push([this.value[e][0]+(this.destination[e][0]-this.value[e][0])*t,this.value[e][1]+(this.destination[e][1]-this.value[e][1])*t]);return new m.PointArray(n)},parse:function(t){if(t=t.valueOf(),Array.isArray(t))return t;t=this.split(t);for(var e,i=0,n=t.length,r=[];n>i;i++)e=t[i].split(","),r.push([parseFloat(e[0]),parseFloat(e[1])]);return r},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var n=this.value.length-1;n>=0;n--)this.value[n]=[this.value[n][0]+t,this.value[n][1]+e];return this},size:function(t,e){var i,n=this.bbox();for(i=this.value.length-1;i>=0;i--)this.value[i][0]=(this.value[i][0]-n.x)*t/n.width+n.x,this.value[i][1]=(this.value[i][1]-n.y)*e/n.height+n.y;return this},bbox:function(){return m.parser.poly.setAttribute("points",this.toString()),m.parser.poly.getBBox()}}),m.PathArray=function(t,e){this.constructor.call(this,t,e||[["M",0,0]])},m.PathArray.prototype=new m.Array,m.extend(m.PathArray,{toString:function(){return c(this.value)},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var n,r=this.value.length-1;r>=0;r--)n=this.value[r][0],"M"==n||"L"==n||"T"==n?(this.value[r][1]+=t,this.value[r][2]+=e):"H"==n?this.value[r][1]+=t:"V"==n?this.value[r][1]+=e:"C"==n||"S"==n||"Q"==n?(this.value[r][1]+=t,this.value[r][2]+=e,this.value[r][3]+=t,this.value[r][4]+=e,"C"==n&&(this.value[r][5]+=t,this.value[r][6]+=e)):"A"==n&&(this.value[r][6]+=t,this.value[r][7]+=e);return this},size:function(t,e){var i,n,r=this.bbox();for(i=this.value.length-1;i>=0;i--)n=this.value[i][0],"M"==n||"L"==n||"T"==n?(this.value[i][1]=(this.value[i][1]-r.x)*t/r.width+r.x,this.value[i][2]=(this.value[i][2]-r.y)*e/r.height+r.y):"H"==n?this.value[i][1]=(this.value[i][1]-r.x)*t/r.width+r.x:"V"==n?this.value[i][1]=(this.value[i][1]-r.y)*e/r.height+r.y:"C"==n||"S"==n||"Q"==n?(this.value[i][1]=(this.value[i][1]-r.x)*t/r.width+r.x,this.value[i][2]=(this.value[i][2]-r.y)*e/r.height+r.y,this.value[i][3]=(this.value[i][3]-r.x)*t/r.width+r.x,this.value[i][4]=(this.value[i][4]-r.y)*e/r.height+r.y,"C"==n&&(this.value[i][5]=(this.value[i][5]-r.x)*t/r.width+r.x,this.value[i][6]=(this.value[i][6]-r.y)*e/r.height+r.y)):"A"==n&&(this.value[i][1]=this.value[i][1]*t/r.width,this.value[i][2]=this.value[i][2]*e/r.height,this.value[i][6]=(this.value[i][6]-r.x)*t/r.width+r.x,this.value[i][7]=(this.value[i][7]-r.y)*e/r.height+r.y);return this},parse:function(t){if(t instanceof m.PathArray)return t.valueOf();var e,i,n,r,s,a,o,h,u,l,f,d=0,p=0;for(m.parser.path.setAttribute("d","string"==typeof t?t:c(t)),f=m.parser.path.pathSegList,e=0,i=f.numberOfItems;i>e;++e)l=f.getItem(e),u=l.pathSegTypeAsLetter,"M"==u||"L"==u||"H"==u||"V"==u||"C"==u||"S"==u||"Q"==u||"T"==u||"A"==u?("x"in l&&(d=l.x),"y"in l&&(p=l.y)):("x1"in l&&(s=d+l.x1),"x2"in l&&(o=d+l.x2),"y1"in l&&(a=p+l.y1),"y2"in l&&(h=p+l.y2),"x"in l&&(d+=l.x),"y"in l&&(p+=l.y),"m"==u?f.replaceItem(m.parser.path.createSVGPathSegMovetoAbs(d,p),e):"l"==u?f.replaceItem(m.parser.path.createSVGPathSegLinetoAbs(d,p),e):"h"==u?f.replaceItem(m.parser.path.createSVGPathSegLinetoHorizontalAbs(d),e):"v"==u?f.replaceItem(m.parser.path.createSVGPathSegLinetoVerticalAbs(p),e):"c"==u?f.replaceItem(m.parser.path.createSVGPathSegCurvetoCubicAbs(d,p,s,a,o,h),e):"s"==u?f.replaceItem(m.parser.path.createSVGPathSegCurvetoCubicSmoothAbs(d,p,o,h),e):"q"==u?f.replaceItem(m.parser.path.createSVGPathSegCurvetoQuadraticAbs(d,p,s,a),e):"t"==u?f.replaceItem(m.parser.path.createSVGPathSegCurvetoQuadraticSmoothAbs(d,p),e):"a"==u?f.replaceItem(m.parser.path.createSVGPathSegArcAbs(d,p,l.r1,l.r2,l.angle,l.largeArcFlag,l.sweepFlag),e):("z"==u||"Z"==u)&&(d=n,p=r)),("M"==u||"m"==u)&&(n=d,r=p);for(t=[],f=m.parser.path.pathSegList,e=0,i=f.numberOfItems;i>e;++e)l=f.getItem(e),u=l.pathSegTypeAsLetter,d=[u],"M"==u||"L"==u||"T"==u?d.push(l.x,l.y):"H"==u?d.push(l.x):"V"==u?d.push(l.y):"C"==u?d.push(l.x1,l.y1,l.x2,l.y2,l.x,l.y):"S"==u?d.push(l.x2,l.y2,l.x,l.y):"Q"==u?d.push(l.x1,l.y1,l.x,l.y):"A"==u&&d.push(l.r1,l.r2,l.angle,0|l.largeArcFlag,0|l.sweepFlag,l.x,l.y),t.push(d);return t},bbox:function(){return m.parser.path.setAttribute("d",this.toString()),m.parser.path.getBBox()}}),m.Number=m.invent({create:function(t,e){this.value=0,this.unit=e||"","number"==typeof t?this.value=isNaN(t)?0:isFinite(t)?t:0>t?-3.4e38:3.4e38:"string"==typeof t?(e=t.match(m.regex.unit),e&&(this.value=parseFloat(e[1]),"%"==e[2]?this.value/=100:"s"==e[2]&&(this.value*=1e3),this.unit=e[2])):t instanceof m.Number&&(this.value=t.valueOf(),this.unit=t.unit)},extend:{toString:function(){return("%"==this.unit?~~(1e8*this.value)/1e6:"s"==this.unit?this.value/1e3:this.value)+this.unit},valueOf:function(){return this.value},plus:function(t){return new m.Number(this+new m.Number(t),this.unit)},minus:function(t){return this.plus(-new m.Number(t))},times:function(t){return new m.Number(this*new m.Number(t),this.unit)},divide:function(t){return new m.Number(this/new m.Number(t),this.unit)},to:function(t){var e=new m.Number(this);return"string"==typeof t&&(e.unit=t),e},morph:function(t){return this.destination=new m.Number(t),this},at:function(t){return this.destination?new m.Number(this.destination).minus(this).times(t).plus(this):this}}}),m.ViewBox=function(t){var e,i,n,r,s=1,a=1,o=t.bbox(),h=(t.attr("viewBox")||"").match(/-?[\d\.]+/g),u=t,l=t;for(n=new m.Number(t.width()),r=new m.Number(t.height());"%"==n.unit;)s*=n.value,n=new m.Number(u instanceof m.Doc?u.parent().offsetWidth:u.parent().width()),u=u.parent();for(;"%"==r.unit;)a*=r.value,r=new m.Number(l instanceof m.Doc?l.parent().offsetHeight:l.parent().height()),l=l.parent();this.x=o.x,this.y=o.y,this.width=n*s,this.height=r*a,this.zoom=1,h&&(e=parseFloat(h[0]),i=parseFloat(h[1]),n=parseFloat(h[2]),r=parseFloat(h[3]),this.zoom=this.width/this.height>n/r?this.height/r:this.width/n,this.x=e,this.y=i,this.width=n,this.height=r)},m.extend(m.ViewBox,{toString:function(){return this.x+" "+this.y+" "+this.width+" "+this.height}}),m.Element=m.invent({create:function(t){this._stroke=m.defaults.attrs.stroke,(this.node=t)&&(this.type=t.nodeName,this.node.instance=this,this._stroke=t.getAttribute("stroke")||this._stroke)},extend:{x:function(t){return this.attr("x",t)},y:function(t){return this.attr("y",t)},cx:function(t){return null==t?this.x()+this.width()/2:this.x(t-this.width()/2)},cy:function(t){return null==t?this.y()+this.height()/2:this.y(t-this.height()/2)},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},width:function(t){return this.attr("width",t)},height:function(t){return this.attr("height",t)},size:function(t,e){var i=r(this.bbox(),t,e);return this.width(new m.Number(i.width)).height(new m.Number(i.height))},clone:function(){var t=f(this.node.cloneNode(!0));return this.after(t),t},remove:function(){return this.parent()&&this.parent().removeElement(this),this},replace:function(t){return this.after(t).remove(),t},addTo:function(t){return t.put(this)},putIn:function(t){return t.add(this)},id:function(t){return this.attr("id",t)},inside:function(t,e){var i=this.bbox();return t>i.x&&e>i.y&&t<i.x+i.width&&e<i.y+i.height},show:function(){return this.style("display","")},hide:function(){return this.style("display","none")},visible:function(){return"none"!=this.style("display")},toString:function(){return this.attr("id")},classes:function(){var t=this.attr("class");return null==t?[]:t.trim().split(/\s+/)},hasClass:function(t){return-1!=this.classes().indexOf(t)},addClass:function(t){if(!this.hasClass(t)){var e=this.classes();e.push(t),this.attr("class",e.join(" "))}return this},removeClass:function(t){return this.hasClass(t)&&this.attr("class",this.classes().filter(function(e){return e!=t}).join(" ")),this},toggleClass:function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t)},reference:function(t){return m.get(this.attr(t))},parent:function(t){if(this.node.parentNode){var e=m.adopt(this.node.parentNode);if(t)for(;!(e instanceof t)&&e.node.parentNode instanceof SVGElement;)e=m.adopt(e.node.parentNode);return e}},doc:function(){return this instanceof m.Doc?this:this.parent(m.Doc)},"native":function(){return this.node},svg:function(t){var e=document.createElement("svg");if(!(t&&this instanceof m.Parent))return e.appendChild(t=document.createElement("svg")),t.appendChild(this.node.cloneNode(!0)),e.innerHTML.replace(/^<svg>/,"").replace(/<\/svg>$/,"");e.innerHTML="<svg>"+t.replace(/\n/,"").replace(/<(\w+)([^<]+?)\/>/g,"<$1$2></$1>")+"</svg>";for(var i=0,n=e.firstChild.childNodes.length;n>i;i++)this.node.appendChild(e.firstChild.firstChild);return this}}}),m.FX=m.invent({create:function(t){this.target=t},extend:{animate:function(t,e,i){var n,r,s,a=this.target,o=this;return"object"==typeof t&&(i=t.delay,e=t.ease,t=t.duration),t="="==t?t:null==t?1e3:new m.Number(t).valueOf(),e=e||"<>",o.at=function(t){var i;if(t=0>t?0:t>1?1:t,null==n){n=[];for(s in o.attrs)n.push(s);if(a.morphArray&&(o.destination.plot||n.indexOf("points")>-1)){var h,u=new a.morphArray(o.destination.plot||o.attrs.points||a.array());o.destination.size&&u.size(o.destination.size.width.to,o.destination.size.height.to),h=u.bbox(),o.destination.x?u.move(o.destination.x.to,h.y):o.destination.cx&&u.move(o.destination.cx.to-h.width/2,h.y),h=u.bbox(),o.destination.y?u.move(h.x,o.destination.y.to):o.destination.cy&&u.move(h.x,o.destination.cy.to-h.height/2),o.destination={plot:a.array().morph(u)}}}if(null==r){r=[];for(s in o.styles)r.push(s)}for(t="<>"==e?-Math.cos(t*Math.PI)/2+.5:">"==e?Math.sin(t*Math.PI/2):"<"==e?-Math.cos(t*Math.PI/2)+1:"-"==e?t:"function"==typeof e?e(t):t,o.destination.plot?a.plot(o.destination.plot.at(t)):(o.destination.x?a.x(o.destination.x.at(t)):o.destination.cx&&a.cx(o.destination.cx.at(t)),o.destination.y?a.y(o.destination.y.at(t)):o.destination.cy&&a.cy(o.destination.cy.at(t)),o.destination.size&&a.size(o.destination.size.width.at(t),o.destination.size.height.at(t))),o.destination.viewbox&&a.viewbox(o.destination.viewbox.x.at(t),o.destination.viewbox.y.at(t),o.destination.viewbox.width.at(t),o.destination.viewbox.height.at(t)),o.destination.leading&&a.leading(o.destination.leading.at(t)),i=n.length-1;i>=0;i--)a.attr(n[i],l(o.attrs[n[i]],t));for(i=r.length-1;i>=0;i--)a.style(r[i],l(o.styles[r[i]],t));o.situation.during&&o.situation.during.call(a,t,function(e,i){return l({from:e,to:i},t)})},"number"==typeof t&&(this.timeout=setTimeout(function(){var n=(new Date).getTime();o.situation.start=n,o.situation.play=!0,o.situation.finish=n+t,o.situation.duration=t,o.situation.ease=e,o.render=function(){if(o.situation.play===!0){var n=(new Date).getTime(),r=n>o.situation.finish?1:(n-o.situation.start)/t;o.situation.reversing&&(r=-r+1),o.at(r),n>o.situation.finish?(o.destination.plot&&a.plot(new m.PointArray(o.destination.plot.destination).settle()),o.situation.loop===!0||"number"==typeof o.situation.loop&&o.situation.loop>0?(o.situation.reverse&&(o.situation.reversing=!o.situation.reversing),"number"==typeof o.situation.loop&&((!o.situation.reverse||o.situation.reversing)&&--o.situation.loop,o.situation.reverse||1!=o.situation.loop||--o.situation.loop),o.animate(t,e,i)):o.situation.after?o.situation.after.apply(a,[o]):o.stop()):o.animationFrame=requestAnimationFrame(o.render)}else o.animationFrame=requestAnimationFrame(o.render)},o.render()},new m.Number(i).valueOf())),this},bbox:function(){return this.target.bbox()},attr:function(t,e){if("object"==typeof t)for(var i in t)this.attr(i,t[i]);else{var n=this.target.attr(t);"transform"==t?(this.attrs[t]&&(e=this.attrs[t].destination.multiply(e)),this.attrs[t]=this.target.ctm().morph(e),this.param&&(e=this.target.transform("rotation"),this.attrs[t].param={from:this.target.param||{rotation:e,cx:this.param.cx,cy:this.param.cy},to:this.param})):this.attrs[t]=m.Color.isColor(e)?new m.Color(n).morph(e):m.regex.unit.test(e)?new m.Number(n).morph(e):{from:n,to:e}}return this},style:function(t,e){if("object"==typeof t)for(var i in t)this.style(i,t[i]);else this.styles[t]={from:this.target.style(t),to:e};return this},x:function(t){return this.destination.x=new m.Number(this.target.x()).morph(t),this},y:function(t){return this.destination.y=new m.Number(this.target.y()).morph(t),this},cx:function(t){return this.destination.cx=new m.Number(this.target.cx()).morph(t),this},cy:function(t){return this.destination.cy=new m.Number(this.target.cy()).morph(t),this},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},size:function(t,e){if(this.target instanceof m.Text)this.attr("font-size",t);else{var i=this.target.bbox();this.destination.size={width:new m.Number(i.width).morph(t),height:new m.Number(i.height).morph(e)}}return this},plot:function(t){return this.destination.plot=t,this},leading:function(t){return this.target.destination.leading&&(this.destination.leading=new m.Number(this.target.destination.leading).morph(t)),this},viewbox:function(t,e,i,n){if(this.target instanceof m.Container){var r=this.target.viewbox();this.destination.viewbox={x:new m.Number(r.x).morph(t),y:new m.Number(r.y).morph(e),width:new m.Number(r.width).morph(i),height:new m.Number(r.height).morph(n)}}return this},update:function(t){return this.target instanceof m.Stop&&(null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new m.Number(t.offset))),this},during:function(t){return this.situation.during=t,this},after:function(t){return this.situation.after=t,this},loop:function(t,e){return this.situation.loop=this.situation.loops=t||!0,this.situation.reverse=!!e,this},stop:function(t){return t===!0?(this.animate(0),this.situation.after&&this.situation.after.apply(this.target,[this])):(clearTimeout(this.timeout),cancelAnimationFrame(this.animationFrame),this.attrs={},this.styles={},this.situation={},this.destination={}),this},pause:function(){return this.situation.play===!0&&(this.situation.play=!1,this.situation.pause=(new Date).getTime()),this},play:function(){if(this.situation.play===!1){var t=(new Date).getTime()-this.situation.pause;this.situation.finish+=t,this.situation.start+=t,this.situation.play=!0}return this}},parent:m.Element,construct:{animate:function(t,e,i){return(this.fx||(this.fx=new m.FX(this))).stop().animate(t,e,i)},stop:function(t){return this.fx&&this.fx.stop(t),this},pause:function(){return this.fx&&this.fx.pause(),this},play:function(){return this.fx&&this.fx.play(),this}}}),m.BBox=m.invent({create:function(t){if(t){var e;try{e=t.node.getBBox()}catch(i){e={x:t.node.clientLeft,y:t.node.clientTop,width:t.node.clientWidth,height:t.node.clientHeight}}this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height}d(this)},parent:m.Element,construct:{bbox:function(){return new m.BBox(this)}}}),m.TBox=m.invent({create:function(t){if(t){var e=t.ctm().extract(),i=t.bbox();this.width=i.width*e.scaleX,this.height=i.height*e.scaleY,this.x=i.x+e.x,this.y=i.y+e.y}d(this)},parent:m.Element,construct:{tbox:function(){return new m.TBox(this)}}}),m.RBox=m.invent({create:function(t){if(t){var e=t.doc().parent(),i=t.node.getBoundingClientRect(),n=1;for(this.x=i.left,this.y=i.top,this.x-=e.offsetLeft,this.y-=e.offsetTop;e=e.offsetParent;)this.x-=e.offsetLeft,this.y-=e.offsetTop;for(e=t;e.parent&&(e=e.parent());)e.viewbox&&(n*=e.viewbox().zoom,this.x-=e.x()||0,this.y-=e.y()||0);this.width=i.width/=n,this.height=i.height/=n}d(this),this.x+=window.scrollX,this.y+=window.scrollY},parent:m.Element,construct:{rbox:function(){return new m.RBox(this)}}}),[m.BBox,m.TBox,m.RBox].forEach(function(t){m.extend(t,{merge:function(e){var i=new t;return i.x=Math.min(this.x,e.x),i.y=Math.min(this.y,e.y),i.width=Math.max(this.x+this.width,e.x+e.width)-i.x,i.height=Math.max(this.y+this.height,e.y+e.height)-i.y,d(i)}})}),m.Matrix=m.invent({create:function(t){var e,i=a([1,0,0,1,0,0]);for(t=t instanceof m.Element?t.matrixify():"string"==typeof t?u(t):6==arguments.length?a([].slice.call(arguments)):"object"==typeof t?t:i,e=g.length-1;e>=0;e--)this[g[e]]=t&&"number"==typeof t[g[e]]?t[g[e]]:i[g[e]]},extend:{extract:function(){var t=s(this,0,1),e=s(this,1,0),i=180/Math.PI*Math.atan2(t.y,t.x)-90;return{x:this.e,y:this.f,skewX:-i,skewY:180/Math.PI*Math.atan2(e.y,e.x),scaleX:Math.sqrt(this.a*this.a+this.b*this.b),scaleY:Math.sqrt(this.c*this.c+this.d*this.d),rotation:i}},clone:function(){return new m.Matrix(this)},morph:function(t){return this.destination=new m.Matrix(t),this},at:function(t){if(!this.destination)return this;var e=new m.Matrix({a:this.a+(this.destination.a-this.a)*t,b:this.b+(this.destination.b-this.b)*t,c:this.c+(this.destination.c-this.c)*t,d:this.d+(this.destination.d-this.d)*t,e:this.e+(this.destination.e-this.e)*t,f:this.f+(this.destination.f-this.f)*t});if(this.param&&this.param.to){var i={rotation:this.param.from.rotation+(this.param.to.rotation-this.param.from.rotation)*t,cx:this.param.from.cx,cy:this.param.from.cy};e=e.rotate((this.param.to.rotation-2*this.param.from.rotation)*t,i.cx,i.cy),e.param=i}return e},multiply:function(t){return new m.Matrix(this.native().multiply(o(t).native()))},inverse:function(){return new m.Matrix(this.native().inverse())},translate:function(t,e){return new m.Matrix(this.native().translate(t||0,e||0))},scale:function(t,e,i,n){return(1==arguments.length||3==arguments.length)&&(e=t),3==arguments.length&&(n=i,i=e),this.around(i,n,new m.Matrix(t,0,0,e,0,0))},rotate:function(t,e,i){return t=m.utils.radians(t),this.around(e,i,new m.Matrix(Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0))},flip:function(t,e){return"x"==t?this.scale(-1,1,e,0):this.scale(1,-1,0,e)},skew:function(t,e,i,n){return this.around(i,n,this.native().skewX(t||0).skewY(e||0))},skewX:function(t,e,i){return this.around(e,i,this.native().skewX(t||0))},skewY:function(t,e,i){return this.around(e,i,this.native().skewY(t||0))},around:function(t,e,i){return this.multiply(new m.Matrix(1,0,0,1,t||0,e||0)).multiply(i).multiply(new m.Matrix(1,0,0,1,-t||0,-e||0))},"native":function(){for(var t=m.parser.draw.node.createSVGMatrix(),e=g.length-1;e>=0;e--)t[g[e]]=this[g[e]];return t},toString:function(){return"matrix("+this.a+","+this.b+","+this.c+","+this.d+","+this.e+","+this.f+")"}},parent:m.Element,construct:{ctm:function(){return new m.Matrix(this.node.getCTM())}}}),m.extend(m.Element,{attr:function(t,e,i){if(null==t){for(t={},e=this.node.attributes,i=e.length-1;i>=0;i--)t[e[i].nodeName]=m.regex.isNumber.test(e[i].nodeValue)?parseFloat(e[i].nodeValue):e[i].nodeValue;return t}if("object"==typeof t)for(e in t)this.attr(e,t[e]);else if(null===e)this.node.removeAttribute(t);else{if(null==e)return e=this.node.getAttribute(t),null==e?m.defaults.attrs[t]:m.regex.isNumber.test(e)?parseFloat(e):e;"stroke-width"==t?this.attr("stroke",parseFloat(e)>0?this._stroke:null):"stroke"==t&&(this._stroke=e),("fill"==t||"stroke"==t)&&(m.regex.isImage.test(e)&&(e=this.doc().defs().image(e,0,0)),e instanceof m.Image&&(e=this.doc().defs().pattern(0,0,function(){this.add(e)}))),"number"==typeof e?e=new m.Number(e):m.Color.isColor(e)?e=new m.Color(e):Array.isArray(e)?e=new m.Array(e):e instanceof m.Matrix&&e.param&&(this.param=e.param),"leading"==t?this.leading&&this.leading(e):"string"==typeof i?this.node.setAttributeNS(i,t,e.toString()):this.node.setAttribute(t,e.toString()),!this.rebuild||"font-size"!=t&&"x"!=t||this.rebuild(t,e)}return this}}),m.extend(m.Element,m.FX,{transform:function(t,e){var i,n=this.target||this;if("object"!=typeof t)return i=new m.Matrix(n).extract(),"object"==typeof this.param&&(i.rotation=this.param.rotation,i.cx=this.param.cx,i.cy=this.param.cy),"string"==typeof t?i[t]:i;if(i=this instanceof m.FX&&this.attrs.transform?this.attrs.transform:new m.Matrix(n),e=!!e||!!t.relative,null!=t.a)i=e?i.multiply(new m.Matrix(t)):new m.Matrix(t);else if(null!=t.rotation)h(t,n),e&&(t.rotation+=this.param&&null!=this.param.rotation?this.param.rotation:i.extract().rotation),this.param=t,this instanceof m.Element&&(i=e?i.rotate(t.rotation,t.cx,t.cy):i.rotate(t.rotation-i.extract().rotation,t.cx,t.cy));else if(null!=t.scale||null!=t.scaleX||null!=t.scaleY){if(h(t,n),t.scaleX=null!=t.scale?t.scale:null!=t.scaleX?t.scaleX:1,t.scaleY=null!=t.scale?t.scale:null!=t.scaleY?t.scaleY:1,!e){var r=i.extract();t.scaleX=1*t.scaleX/r.scaleX,t.scaleY=1*t.scaleY/r.scaleY}i=i.scale(t.scaleX,t.scaleY,t.cx,t.cy)}else if(null!=t.skewX||null!=t.skewY){if(h(t,n),t.skewX=null!=t.skewX?t.skewX:0,t.skewY=null!=t.skewY?t.skewY:0,!e){var r=i.extract();i=i.multiply((new m.Matrix).skew(r.skewX,r.skewY,t.cx,t.cy).inverse())}i=i.skew(t.skewX,t.skewY,t.cx,t.cy)}else t.flip?i=i.flip(t.flip,null==t.offset?n.bbox()["c"+t.flip]:t.offset):(null!=t.x||null!=t.y)&&(e?i=i.translate(t.x,t.y):(null!=t.x&&(i.e=t.x),null!=t.y&&(i.f=t.y)));return this.attr(this instanceof m.Pattern?"patternTransform":this instanceof m.Gradient?"gradientTransform":"transform",i)}}),m.extend(m.Element,{untransform:function(){return this.attr("transform",null)},matrixify:function(){var t=(this.attr("transform")||"").split(/\)\s*/).slice(0,-1).map(function(t){var e=t.trim().split("(");return[e[0],e[1].split(m.regex.matrixElements).map(function(t){return parseFloat(t)})]}).reduce(function(t,e){return"matrix"==e[0]?t.multiply(a(e[1])):t[e[0]].apply(t,e[1])},new m.Matrix);return this.attr("transform",t),t}}),m.extend(m.Element,{style:function(e,i){if(0==arguments.length)return this.node.style.cssText||"";if(arguments.length<2)if("object"==typeof e)for(i in e)this.style(i,e[i]);else{if(!m.regex.isCss.test(e))return this.node.style[t(e)];e=e.split(";");for(var n=0;n<e.length;n++)i=e[n].split(":"),this.style(i[0].replace(/\s+/g,""),i[1])}else this.node.style[t(e)]=null===i||m.regex.isBlank.test(i)?"":i;return this}}),m.Parent=m.invent({create:function(t){this.constructor.call(this,t)},inherit:m.Element,extend:{children:function(){return m.utils.map(m.utils.filterSVGElements(this.node.childNodes),function(t){return m.adopt(t)})},add:function(t,e){return this.has(t)||(e=null==e?this.children().length:e,this.node.insertBefore(t.node,this.node.childNodes[e]||null)),this},put:function(t,e){return this.add(t,e),t},has:function(t){return this.index(t)>=0},index:function(t){return this.children().indexOf(t)},get:function(t){return this.children()[t]},first:function(){return this.children()[0]},last:function(){return this.children()[this.children().length-1]},each:function(t,e){var i,n,r=this.children();for(i=0,n=r.length;n>i;i++)r[i]instanceof m.Element&&t.apply(r[i],[i,r]),e&&r[i]instanceof m.Container&&r[i].each(t,e);return this},removeElement:function(t){return this.node.removeChild(t.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,this},defs:function(){return this.doc().defs()}}}),m.Container=m.invent({create:function(t){this.constructor.call(this,t)},inherit:m.Parent,extend:{viewbox:function(t){return 0==arguments.length?new m.ViewBox(this):(t=1==arguments.length?[t.x,t.y,t.width,t.height]:[].slice.call(arguments),this.attr("viewBox",t))}}}),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchmove","touchleave","touchend","touchcancel"].forEach(function(t){m.Element.prototype[t]=function(e){var i=this;return this.node["on"+t]="function"==typeof e?function(){return e.apply(i,arguments)}:null,this}}),m.listeners=[],m.handlerMap=[],m.on=function(t,e,i){var n=i.bind(t.instance||t),r=(m.handlerMap.indexOf(t)+1||m.handlerMap.push(t))-1,s=e.split(".")[0],a=e.split(".")[1]||"*";m.listeners[r]=m.listeners[r]||{},m.listeners[r][s]=m.listeners[r][s]||{},m.listeners[r][s][a]=m.listeners[r][s][a]||{},m.listeners[r][s][a][i]=n,t.addEventListener(s,n,!1)},m.off=function(t,e,i){var n=m.handlerMap.indexOf(t),r=e&&e.split(".")[0],s=e&&e.split(".")[1];if(-1!=n)if(i)m.listeners[n][r]&&m.listeners[n][r][s||"*"]&&(t.removeEventListener(r,m.listeners[n][r][s||"*"][i],!1),delete m.listeners[n][r][s||"*"][i]);else if(s&&r){if(m.listeners[n][r]&&m.listeners[n][r][s]){for(i in m.listeners[n][r][s])m.off(t,[r,s].join("."),i);delete m.listeners[n][r][s]}}else if(s)for(e in m.listeners[n])for(namespace in m.listeners[n][e])s===namespace&&m.off(t,[e,s].join("."));else if(r){if(m.listeners[n][r]){for(namespace in m.listeners[n][r])m.off(t,[r,namespace].join("."));delete m.listeners[n][r]}}else{for(e in m.listeners[n])m.off(t,e);delete m.listeners[n]}},m.extend(m.Element,{on:function(t,e){return m.on(this.node,t,e),this},off:function(t,e){return m.off(this.node,t,e),this},fire:function(t,e){return t instanceof Event?this.node.dispatchEvent(t):this.node.dispatchEvent(new y(t,{detail:e})),this}}),m.Defs=m.invent({create:"defs",inherit:m.Container}),m.G=m.invent({create:"g",inherit:m.Container,extend:{x:function(t){return null==t?this.transform("x"):this.transform({x:-this.x()+t},!0)},y:function(t){return null==t?this.transform("y"):this.transform({y:-this.y()+t},!0)
},cx:function(t){return null==t?this.tbox().cx:this.x(t-this.tbox().width/2)},cy:function(t){return null==t?this.tbox().cy:this.y(t-this.tbox().height/2)}},construct:{group:function(){return this.put(new m.G)}}}),m.extend(m.Element,{siblings:function(){return this.parent().children()},position:function(){return this.parent().index(this)},next:function(){return this.siblings()[this.position()+1]},previous:function(){return this.siblings()[this.position()-1]},forward:function(){var t=this.position()+1,e=this.parent();return e.removeElement(this).add(this,t),e instanceof m.Doc&&e.node.appendChild(e.defs().node),this},backward:function(){var t=this.position();return t>0&&this.parent().removeElement(this).add(this,t-1),this},front:function(){var t=this.parent();return t.node.appendChild(this.node),t instanceof m.Doc&&t.node.appendChild(t.defs().node),this},back:function(){return this.position()>0&&this.parent().removeElement(this).add(this,0),this},before:function(t){t.remove();var e=this.position();return this.parent().add(t,e),this},after:function(t){t.remove();var e=this.position();return this.parent().add(t,e+1),this}}),m.Mask=m.invent({create:function(){this.constructor.call(this,m.create("mask")),this.targets=[]},inherit:m.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unmask();return delete this.targets,this.parent().removeElement(this),this}},construct:{mask:function(){return this.defs().put(new m.Mask)}}}),m.extend(m.Element,{maskWith:function(t){return this.masker=t instanceof m.Mask?t:this.parent().mask().add(t),this.masker.targets.push(this),this.attr("mask",'url("#'+this.masker.attr("id")+'")')},unmask:function(){return delete this.masker,this.attr("mask",null)}}),m.ClipPath=m.invent({create:function(){this.constructor.call(this,m.create("clipPath")),this.targets=[]},inherit:m.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unclip();return delete this.targets,this.parent().removeElement(this),this}},construct:{clip:function(){return this.defs().put(new m.ClipPath)}}}),m.extend(m.Element,{clipWith:function(t){return this.clipper=t instanceof m.ClipPath?t:this.parent().clip().add(t),this.clipper.targets.push(this),this.attr("clip-path",'url("#'+this.clipper.attr("id")+'")')},unclip:function(){return delete this.clipper,this.attr("clip-path",null)}}),m.Gradient=m.invent({create:function(t){this.constructor.call(this,m.create(t+"Gradient")),this.type=t},inherit:m.Container,extend:{at:function(t,e,i){return this.put(new m.Stop).update(t,e,i)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},fill:function(){return"url(#"+this.id()+")"},toString:function(){return this.fill()}},construct:{gradient:function(t,e){return this.defs().gradient(t,e)}}}),m.extend(m.Gradient,m.FX,{from:function(t,e){return"radial"==(this.target||this).type?this.attr({fx:new m.Number(t),fy:new m.Number(e)}):this.attr({x1:new m.Number(t),y1:new m.Number(e)})},to:function(t,e){return"radial"==(this.target||this).type?this.attr({cx:new m.Number(t),cy:new m.Number(e)}):this.attr({x2:new m.Number(t),y2:new m.Number(e)})}}),m.extend(m.Defs,{gradient:function(t,e){return this.put(new m.Gradient(t)).update(e)}}),m.Stop=m.invent({create:"stop",inherit:m.Element,extend:{update:function(t){return("number"==typeof t||t instanceof m.Number)&&(t={offset:arguments[0],color:arguments[1],opacity:arguments[2]}),null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new m.Number(t.offset)),this}}}),m.Pattern=m.invent({create:"pattern",inherit:m.Container,extend:{fill:function(){return"url(#"+this.id()+")"},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return this.fill()}},construct:{pattern:function(t,e,i){return this.defs().pattern(t,e,i)}}}),m.extend(m.Defs,{pattern:function(t,e,i){return this.put(new m.Pattern).update(i).attr({x:0,y:0,width:t,height:e,patternUnits:"userSpaceOnUse"})}}),m.Doc=m.invent({create:function(t){t&&(t="string"==typeof t?document.getElementById(t):t,"svg"==t.nodeName?this.constructor.call(this,t):(this.constructor.call(this,m.create("svg")),t.appendChild(this.node)),this.namespace().size("100%","100%").defs())},inherit:m.Container,extend:{namespace:function(){return this.attr({xmlns:m.ns,version:"1.1"}).attr("xmlns:xlink",m.xlink,m.xmlns)},defs:function(){if(!this._defs){var t;this._defs=(t=this.node.getElementsByTagName("defs")[0])?m.adopt(t):new m.Defs,this.node.appendChild(this._defs.node)}return this._defs},parent:function(){return"#document"==this.node.parentNode.nodeName?null:this.node.parentNode},spof:function(){var t=this.node.getScreenCTM();return t&&this.style("left",-t.e%1+"px").style("top",-t.f%1+"px"),this},remove:function(){return this.parent()&&this.parent().removeChild(this.node),this}}}),m.Shape=m.invent({create:function(t){this.constructor.call(this,t)},inherit:m.Element}),m.Bare=m.invent({create:function(t,e){if(this.constructor.call(this,m.create(t)),e)for(var i in e.prototype)"function"==typeof e.prototype[i]&&(this[i]=e.prototype[i])},inherit:m.Element,extend:{words:function(t){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return this.node.appendChild(document.createTextNode(t)),this}}}),m.extend(m.Parent,{element:function(t,e){return this.put(new m.Bare(t,e))},symbol:function(){return this.defs().element("symbol",m.Container)}}),m.Use=m.invent({create:"use",inherit:m.Shape,extend:{element:function(t,e){return this.attr("href",(e||"")+"#"+t,m.xlink)}},construct:{use:function(t,e){return this.put(new m.Use).element(t,e)}}}),m.Rect=m.invent({create:"rect",inherit:m.Shape,construct:{rect:function(t,e){return this.put((new m.Rect).size(t,e))}}}),m.Circle=m.invent({create:"circle",inherit:m.Shape,construct:{circle:function(t){return this.put(new m.Circle).rx(new m.Number(t).divide(2)).move(0,0)}}}),m.extend(m.Circle,m.FX,{rx:function(t){return this.attr("r",t)},ry:function(t){return this.rx(t)}}),m.Ellipse=m.invent({create:"ellipse",inherit:m.Shape,construct:{ellipse:function(t,e){return this.put(new m.Ellipse).size(t,e).move(0,0)}}}),m.extend(m.Ellipse,m.Rect,m.FX,{rx:function(t){return this.attr("rx",t)},ry:function(t){return this.attr("ry",t)}}),m.extend(m.Circle,m.Ellipse,{x:function(t){return null==t?this.cx()-this.rx():this.cx(t+this.rx())},y:function(t){return null==t?this.cy()-this.ry():this.cy(t+this.ry())},cx:function(t){return null==t?this.attr("cx"):this.attr("cx",t)},cy:function(t){return null==t?this.attr("cy"):this.attr("cy",t)},width:function(t){return null==t?2*this.rx():this.rx(new m.Number(t).divide(2))},height:function(t){return null==t?2*this.ry():this.ry(new m.Number(t).divide(2))},size:function(t,e){var i=r(this.bbox(),t,e);return this.rx(new m.Number(i.width).divide(2)).ry(new m.Number(i.height).divide(2))}}),m.Line=m.invent({create:"line",inherit:m.Shape,extend:{array:function(){return new m.PointArray([[this.attr("x1"),this.attr("y1")],[this.attr("x2"),this.attr("y2")]])},plot:function(t,e,i,n){return t=4==arguments.length?{x1:t,y1:e,x2:i,y2:n}:new m.PointArray(t).toLine(),this.attr(t)},move:function(t,e){return this.attr(this.array().move(t,e).toLine())},size:function(t,e){var i=r(this.bbox(),t,e);return this.attr(this.array().size(i.width,i.height).toLine())}},construct:{line:function(t,e,i,n){return this.put(new m.Line).plot(t,e,i,n)}}}),m.Polyline=m.invent({create:"polyline",inherit:m.Shape,construct:{polyline:function(t){return this.put(new m.Polyline).plot(t)}}}),m.Polygon=m.invent({create:"polygon",inherit:m.Shape,construct:{polygon:function(t){return this.put(new m.Polygon).plot(t)}}}),m.extend(m.Polyline,m.Polygon,{array:function(){return this._array||(this._array=new m.PointArray(this.attr("points")))},plot:function(t){return this.attr("points",this._array=new m.PointArray(t))},move:function(t,e){return this.attr("points",this.array().move(t,e))},size:function(t,e){var i=r(this.bbox(),t,e);return this.attr("points",this.array().size(i.width,i.height))}}),m.extend(m.Line,m.Polyline,m.Polygon,{morphArray:m.PointArray,x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},width:function(t){var e=this.bbox();return null==t?e.width:this.size(t,e.height)},height:function(t){var e=this.bbox();return null==t?e.height:this.size(e.width,t)}}),m.Path=m.invent({create:"path",inherit:m.Shape,extend:{morphArray:m.PathArray,array:function(){return this._array||(this._array=new m.PathArray(this.attr("d")))},plot:function(t){return this.attr("d",this._array=new m.PathArray(t))},move:function(t,e){return this.attr("d",this.array().move(t,e))},x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},size:function(t,e){var i=r(this.bbox(),t,e);return this.attr("d",this.array().size(i.width,i.height))},width:function(t){return null==t?this.bbox().width:this.size(t,this.bbox().height)},height:function(t){return null==t?this.bbox().height:this.size(this.bbox().width,t)}},construct:{path:function(t){return this.put(new m.Path).plot(t)}}}),m.Image=m.invent({create:"image",inherit:m.Shape,extend:{load:function(t){if(!t)return this;var e=this,i=document.createElement("img");return i.onload=function(){var n=e.parent(m.Pattern);0==e.width()&&0==e.height()&&e.size(i.width,i.height),n&&0==n.width()&&0==n.height()&&n.size(e.width(),e.height()),"function"==typeof e._loaded&&e._loaded.call(e,{width:i.width,height:i.height,ratio:i.width/i.height,url:t})},this.attr("href",i.src=this.src=t,m.xlink)},loaded:function(t){return this._loaded=t,this}},construct:{image:function(t,e,i){return this.put(new m.Image).load(t).size(e||0,i||e||0)}}}),m.Text=m.invent({create:function(){this.constructor.call(this,m.create("text")),this._leading=new m.Number(1.3),this._rebuild=!0,this._build=!1,this.attr("font-family",m.defaults.attrs["font-family"])},inherit:m.Shape,extend:{clone:function(){var t=f(this.node.cloneNode(!0));return t.lines().each(function(){this.newLined=!0}),this.after(t),t},x:function(t){return null==t?this.attr("x"):(this.textPath||this.lines().each(function(){this.newLined&&this.x(t)}),this.attr("x",t))},y:function(t){var e=this.attr("y"),i="number"==typeof e?e-this.bbox().y:0;return null==t?"number"==typeof e?e-i:e:this.attr("y","number"==typeof t?t+i:t)},cx:function(t){return null==t?this.bbox().cx:this.x(t-this.bbox().width/2)},cy:function(t){return null==t?this.bbox().cy:this.y(t-this.bbox().height/2)},text:function(t){if("undefined"==typeof t)return this.content;if(this.clear().build(!0),"function"==typeof t)t.call(this,this);else{t=(this.content=t).split("\n");for(var e=0,i=t.length;i>e;e++)this.tspan(t[e]).newLine()}return this.build(!1).rebuild()},size:function(t){return this.attr("font-size",t).rebuild()},leading:function(t){return null==t?this._leading:(this._leading=new m.Number(t),this.rebuild())},lines:function(){var t=m.utils.map(m.utils.filterSVGElements(this.node.childNodes),function(t){return m.adopt(t)});return new m.Set(t)},rebuild:function(t){if("boolean"==typeof t&&(this._rebuild=t),this._rebuild){var e=this;this.lines().each(function(){this.newLined&&(this.textPath||this.attr("x",e.attr("x")),this.attr("dy",e._leading*new m.Number(e.attr("font-size"))))}),this.fire("rebuild")}return this},build:function(t){return this._build=!!t,this}},construct:{text:function(t){return this.put(new m.Text).text(t)},plain:function(t){return this.put(new m.Text).plain(t)}}}),m.Tspan=m.invent({create:"tspan",inherit:m.Shape,extend:{text:function(t){return"function"==typeof t?t.call(this,this):this.plain(t),this},dx:function(t){return this.attr("dx",t)},dy:function(t){return this.attr("dy",t)},newLine:function(){var t=this.parent(m.Text);return this.newLined=!0,this.dy(t._leading*t.attr("font-size")).attr("x",t.x())}}}),m.extend(m.Text,m.Tspan,{plain:function(t){return this._build===!1&&this.clear(),this.node.appendChild(document.createTextNode(this.content=t)),this},tspan:function(t){var e=(this.textPath()||this).node,i=new m.Tspan;return this._build===!1&&this.clear(),e.appendChild(i.node),i.text(t)},clear:function(){for(var t=(this.textPath()||this).node;t.hasChildNodes();)t.removeChild(t.lastChild);return this instanceof m.Text&&(this.content=""),this},length:function(){return this.node.getComputedTextLength()}}),m.TextPath=m.invent({create:"textPath",inherit:m.Element,parent:m.Text,construct:{path:function(t){for(var e=new m.TextPath,i=this.doc().defs().path(t);this.node.hasChildNodes();)e.node.appendChild(this.node.firstChild);return this.node.appendChild(e.node),e.attr("href","#"+i,m.xlink),this},plot:function(t){var e=this.track();return e&&e.plot(t),this},track:function(){var t=this.textPath();return t?t.reference("href"):void 0},textPath:function(){return this.node.firstChild&&"textPath"==this.node.firstChild.nodeName?m.adopt(this.node.firstChild):void 0}}}),m.Nested=m.invent({create:function(){this.constructor.call(this,m.create("svg")),this.style("overflow","visible")},inherit:m.Container,construct:{nested:function(){return this.put(new m.Nested)}}}),m.A=m.invent({create:"a",inherit:m.Container,extend:{to:function(t){return this.attr("href",t,m.xlink)},show:function(t){return this.attr("show",t,m.xlink)},target:function(t){return this.attr("target",t)}},construct:{link:function(t){return this.put(new m.A).to(t)}}}),m.extend(m.Element,{linkTo:function(t){var e=new m.A;return"function"==typeof t?t.call(e,e):e.to(t),this.parent().put(e).put(this)}}),m.Marker=m.invent({create:"marker",inherit:m.Container,extend:{width:function(t){return this.attr("markerWidth",t)},height:function(t){return this.attr("markerHeight",t)},ref:function(t,e){return this.attr("refX",t).attr("refY",e)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return"url(#"+this.id()+")"}},construct:{marker:function(t,e,i){return this.defs().marker(t,e,i)}}}),m.extend(m.Defs,{marker:function(t,e,i){return this.put(new m.Marker).size(t,e).ref(t/2,e/2).viewbox(0,0,t,e).attr("orient","auto").update(i)}}),m.extend(m.Line,m.Polyline,m.Polygon,m.Path,{marker:function(t,e,i,n){var r=["marker"];return"all"!=t&&r.push(t),r=r.join("-"),t=arguments[1]instanceof m.Marker?arguments[1]:this.doc().marker(e,i,n),this.attr(r,t)}});var x={stroke:["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],fill:["color","opacity","rule"],prefix:function(t,e){return"color"==e?t:t+"-"+e}};["fill","stroke"].forEach(function(t){var e,i={};i[t]=function(i){if("string"==typeof i||m.Color.isRgb(i)||i&&"function"==typeof i.fill)this.attr(t,i);else for(e=x[t].length-1;e>=0;e--)null!=i[x[t][e]]&&this.attr(x.prefix(t,x[t][e]),i[x[t][e]]);return this},m.extend(m.Element,m.FX,i)}),m.extend(m.Element,m.FX,{rotate:function(t,e,i){return this.transform({rotation:t,cx:e,cy:i})},skew:function(t,e,i,n){return this.transform({skewX:t,skewY:e,cx:i,cy:n})},scale:function(t,e,i,n){return 1==arguments.length||3==arguments.length?this.transform({scale:t,cx:e,cy:i}):this.transform({scaleX:t,scaleY:e,cx:i,cy:n})},translate:function(t,e){return this.transform({x:t,y:e})},flip:function(t,e){return this.transform({flip:t,offset:e})},matrix:function(t){return this.attr("transform",new m.Matrix(t))},opacity:function(t){return this.attr("opacity",t)},dx:function(t){return this.x((this.target||this).x()+t)},dy:function(t){return this.y((this.target||this).y()+t)},dmove:function(t,e){return this.dx(t).dy(e)}}),m.extend(m.Rect,m.Ellipse,m.Circle,m.Gradient,m.FX,{radius:function(t,e){var i=(this.target||this).type;return"radial"==i||"circle"==i?this.attr({r:new m.Number(t)}):this.rx(t).ry(null==e?t:e)}}),m.extend(m.Path,{length:function(){return this.node.getTotalLength()},pointAt:function(t){return this.node.getPointAtLength(t)}}),m.extend(m.Parent,m.Text,m.FX,{font:function(t){for(var e in t)"leading"==e?this.leading(t[e]):"anchor"==e?this.attr("text-anchor",t[e]):"size"==e||"family"==e||"weight"==e||"stretch"==e||"variant"==e||"style"==e?this.attr("font-"+e,t[e]):this.attr(e,t[e]);return this}}),m.Set=m.invent({create:function(t){Array.isArray(t)?this.members=t:this.clear()},extend:{add:function(){var t,e,i=[].slice.call(arguments);for(t=0,e=i.length;e>t;t++)this.members.push(i[t]);return this},remove:function(t){var e=this.index(t);return e>-1&&this.members.splice(e,1),this},each:function(t){for(var e=0,i=this.members.length;i>e;e++)t.apply(this.members[e],[e,this.members]);return this},clear:function(){return this.members=[],this},length:function(){return this.members.length},has:function(t){return this.index(t)>=0},index:function(t){return this.members.indexOf(t)},get:function(t){return this.members[t]},first:function(){return this.get(0)},last:function(){return this.get(this.members.length-1)},valueOf:function(){return this.members},bbox:function(){var t=new m.BBox;if(0==this.members.length)return t;var e=this.members[0].rbox();return t.x=e.x,t.y=e.y,t.width=e.width,t.height=e.height,this.each(function(){t=t.merge(this.rbox())}),t}},construct:{set:function(t){return new m.Set(t)}}}),m.FX.Set=m.invent({create:function(t){this.set=t}}),m.Set.inherit=function(){var t,e=[];for(var t in m.Shape.prototype)"function"==typeof m.Shape.prototype[t]&&"function"!=typeof m.Set.prototype[t]&&e.push(t);e.forEach(function(t){m.Set.prototype[t]=function(){for(var e=0,i=this.members.length;i>e;e++)this.members[e]&&"function"==typeof this.members[e][t]&&this.members[e][t].apply(this.members[e],arguments);return"animate"==t?this.fx||(this.fx=new m.FX.Set(this)):this}}),e=[];for(var t in m.FX.prototype)"function"==typeof m.FX.prototype[t]&&"function"!=typeof m.FX.Set.prototype[t]&&e.push(t);e.forEach(function(t){m.FX.Set.prototype[t]=function(){for(var e=0,i=this.set.members.length;i>e;e++)this.set.members[e].fx[t].apply(this.set.members[e].fx,arguments);return this}})},m.extend(m.Element,{data:function(t,e,i){if("object"==typeof t)for(e in t)this.data(e,t[e]);else if(arguments.length<2)try{return JSON.parse(this.attr("data-"+t))}catch(n){return this.attr("data-"+t)}else this.attr("data-"+t,null===e?null:i===!0||"string"==typeof e||"number"==typeof e?e:JSON.stringify(e));return this}}),m.extend(m.Element,{remember:function(t,e){if("object"==typeof arguments[0])for(var e in t)this.remember(e,t[e]);else{if(1==arguments.length)return this.memory()[t];this.memory()[t]=e}return this},forget:function(){if(0==arguments.length)this._memory={};else for(var t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory||(this._memory={})}}),m.get=function(t){var e=document.getElementById(p(t)||t);return e?m.adopt(e):void 0},m.select=function(t,e){return new m.Set(m.utils.map((e||document).querySelectorAll(t),function(t){return m.adopt(t)}))},m.extend(m.Parent,{select:function(t){return m.select(t,this.node)}});var g="abcdef".split("");if("function"!=typeof y){var y=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var i=document.createEvent("CustomEvent");return i.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),i};y.prototype=window.Event.prototype,window.CustomEvent=y}return function(t){for(var e=0,i=["moz","webkit"],n=0;n<i.length&&!window.requestAnimationFrame;++n)t.requestAnimationFrame=t[i[n]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[i[n]+"CancelAnimationFrame"]||t[i[n]+"CancelRequestAnimationFrame"];t.requestAnimationFrame=t.requestAnimationFrame||function(i){var n=(new Date).getTime(),r=Math.max(0,16-(n-e)),s=t.setTimeout(function(){i(n+r)},r);return e=n+r,s},t.cancelAnimationFrame=t.cancelAnimationFrame||t.clearTimeout}(window),m});
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o){var a,r,s,l,i=function(e){return e&&e.__esModule?e:{"default":e}},u=o("./modules/handle-dom"),c=o("./modules/utils"),d=o("./modules/handle-swal-dom"),f=o("./modules/handle-click"),p=o("./modules/handle-key"),m=i(p),v=o("./modules/default-params"),y=i(v),h=o("./modules/set-params"),g=i(h);s=l=function(){function o(e){var t=s;return t[e]===n?y["default"][e]:t[e]}var s=arguments[0];if(u.addClass(t.body,"stop-scrolling"),d.resetInput(),s===n)return c.logStr("SweetAlert expects at least 1 attribute!"),!1;var i=c.extend({},y["default"]);switch(typeof s){case"string":i.title=s,i.text=arguments[1]||"",i.type=arguments[2]||"";break;case"object":if(s.title===n)return c.logStr('Missing "title" argument!'),!1;i.title=s.title;for(var p in y["default"])i[p]=o(p);i.confirmButtonText=i.showCancelButton?"Confirm":y["default"].confirmButtonText,i.confirmButtonText=o("confirmButtonText"),i.doneFunction=arguments[1]||null;break;default:return c.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof s),!1}g["default"](i),d.fixVerticalPosition(),d.openModal(arguments[1]);for(var v=d.getModal(),h=v.querySelectorAll("button"),b=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],w=function(e){return f.handleButton(e,i,v)},C=0;C<h.length;C++)for(var S=0;S<b.length;S++){var x=b[S];h[C][x]=w}d.getOverlay().onclick=w,a=e.onkeydown;var k=function(e){return m["default"](e,i,v)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){r!==n&&(r.focus(),r=n)},0)},l.enableButtons()},s.setDefaults=l.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");c.extend(y["default"],e)},s.close=l.close=function(){var o=d.getModal();u.fadeOut(d.getOverlay(),5),u.fadeOut(o,5),u.removeClass(o,"showSweetAlert"),u.addClass(o,"hideSweetAlert"),u.removeClass(o,"visible");var s=o.querySelector(".sa-icon.sa-success");u.removeClass(s,"animate"),u.removeClass(s.querySelector(".sa-tip"),"animateSuccessTip"),u.removeClass(s.querySelector(".sa-long"),"animateSuccessLong");var l=o.querySelector(".sa-icon.sa-error");u.removeClass(l,"animateErrorIcon"),u.removeClass(l.querySelector(".sa-x-mark"),"animateXMark");var i=o.querySelector(".sa-icon.sa-warning");return u.removeClass(i,"pulseWarning"),u.removeClass(i.querySelector(".sa-body"),"pulseWarningIns"),u.removeClass(i.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");u.removeClass(o,e)},300),u.removeClass(t.body,"stop-scrolling"),e.onkeydown=a,e.previousActiveElement&&e.previousActiveElement.focus(),r=n,clearTimeout(o.timeout),!0},s.showInputError=l.showInputError=function(e){var t=d.getModal(),n=t.querySelector(".sa-input-error");u.addClass(n,"show");var o=t.querySelector(".sa-error-container");u.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){s.enableButtons()},1),t.querySelector("input").focus()},s.resetInputError=l.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=d.getModal(),n=t.querySelector(".sa-input-error");u.removeClass(n,"show");var o=t.querySelector(".sa-error-container");u.removeClass(o,"show")},s.disableButtons=l.disableButtons=function(){var e=d.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},s.enableButtons=l.enableButtons=function(){var e=d.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=s:c.logStr("SweetAlert is a frontend module!")},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var g=o.querySelector("button.confirm"),b=o.querySelector("button.cancel");m?b.style.boxShadow="none":g.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},g=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=g},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},g=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},b=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=g,a.openModal=b,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],g=y[1];h&&g?(m=h,v=g):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var b=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",b),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){var e=getComputedStyle(t),o=e.position;if("fixed"===o)return t;for(var i=t;i=i.parentNode;){var n=void 0;try{n=getComputedStyle(i)}catch(r){}if("undefined"==typeof n||null===n)return i;var s=n.overflow,a=n.overflowX,f=n.overflowY;if(/(auto|scroll)/.test(s+f+a)&&("absolute"!==o||["relative","absolute","fixed"].indexOf(n.position)>=0))return i}return document.body}function r(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var o=e.documentElement,i={},n=t.getBoundingClientRect();for(var r in n)i[r]=n[r];var s=x(e);return i.top-=s.top,i.left-=s.left,"undefined"==typeof i.width&&(i.width=document.body.scrollWidth-i.left-i.right),"undefined"==typeof i.height&&(i.height=document.body.scrollHeight-i.top-i.bottom),i.top=i.top-o.clientTop,i.left=i.left-o.clientLeft,i.right=e.body.clientWidth-i.width-i.left,i.bottom=e.body.clientHeight-i.height-i.top,i}function s(t){return t.offsetParent||document.documentElement}function a(){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");f(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return{width:n,height:n}}function f(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var o in e)({}).hasOwnProperty.call(e,o)&&(t[o]=e[o])}),t}function h(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var o=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),i=u(t).replace(o," ");p(t,i)}}function l(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{h(t,e);var o=u(t)+(" "+e);p(t,o)}}function d(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var o=u(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function u(t){return t.className instanceof SVGAnimatedString?t.className.baseVal:t.className}function p(t,e){t.setAttribute("class",e)}function c(t,e,o){o.forEach(function(o){-1===e.indexOf(o)&&d(t,o)&&h(t,o)}),e.forEach(function(e){d(t,e)||l(t,e)})}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){var o=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return t+o>=e&&e>=t-o}function m(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function v(){for(var t={top:0,left:0},e=arguments.length,o=Array(e),i=0;e>i;i++)o[i]=arguments[i];return o.forEach(function(e){var o=e.top,i=e.left;"string"==typeof o&&(o=parseFloat(o,10)),"string"==typeof i&&(i=parseFloat(i,10)),t.top+=o,t.left+=i}),t}function y(t,e){return"string"==typeof t.left&&-1!==t.left.indexOf("%")&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&-1!==t.top.indexOf("%")&&(t.top=parseFloat(t.top,10)/100*e.height),t}function b(t,e){return"scrollParent"===e?e=t.scrollParent:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=r(e),o=t,i=getComputedStyle(e);e=[o.left,o.top,t.width+o.left,t.height+o.top],U.forEach(function(t,o){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[o]+=parseFloat(i["border"+t+"Width"]):e[o]-=parseFloat(i["border"+t+"Width"])})}(),e}var w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),C=void 0;"undefined"==typeof C&&(C={modules:[]});var O=function(){var t=0;return function(){return++t}}(),E={},x=function(t){var e=t._tetherZeroElement;"undefined"==typeof e&&(e=t.createElement("div"),e.setAttribute("data-tether-id",O()),f(e.style,{top:0,left:0,position:"absolute"}),t.body.appendChild(e),t._tetherZeroElement=e);var o=e.getAttribute("data-tether-id");if("undefined"==typeof E[o]){E[o]={};var i=e.getBoundingClientRect();for(var n in i)E[o][n]=i[n];T(function(){delete E[o]})}return E[o]},A=[],T=function(t){A.push(t)},S=function(){for(var t=void 0;t=A.pop();)t()},W=function(){function t(){i(this,t)}return w(t,[{key:"on",value:function(t,e,o){var i=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if("undefined"==typeof this.bindings||"undefined"==typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){if("undefined"!=typeof this.bindings&&this.bindings[t])for(var e=0;e<this.bindings[t].length;){var o=this.bindings[t][e],i=o.handler,n=o.ctx,r=o.once,s=n;"undefined"==typeof s&&(s=this);for(var a=arguments.length,f=Array(a>1?a-1:0),h=1;a>h;h++)f[h-1]=arguments[h];i.apply(s,f),r?this.bindings[t].splice(e,1):++e}}}]),t}();C.Utils={getScrollParent:n,getBounds:r,getOffsetParent:s,extend:f,addClass:l,removeClass:h,hasClass:d,updateClasses:c,defer:T,flush:S,uniqueId:O,Evented:W,getScrollBarSize:a};var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}();if("undefined"==typeof C)throw new Error("You must include the utils.js file before tether.js");var P=C.Utils,n=P.getScrollParent,r=P.getBounds,s=P.getOffsetParent,f=P.extend,l=P.addClass,h=P.removeClass,c=P.updateClasses,T=P.defer,S=P.flush,a=P.getScrollBarSize,k=function(){for(var t=document.createElement("div"),e=["transform","webkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),B=[],_=function(){B.forEach(function(t){t.position(!1)}),S()};!function(){var t=null,e=null,o=null,i=function n(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(o=setTimeout(n,250))):void("undefined"!=typeof t&&m()-t<10||("undefined"!=typeof o&&(clearTimeout(o),o=null),t=m(),_(),e=m()-t))};["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,i)})}();var z={center:"center",left:"right",right:"left"},F={middle:"middle",top:"bottom",bottom:"top"},L={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},Y=function(t,e){var o=t.left,i=t.top;return"auto"===o&&(o=z[e.left]),"auto"===i&&(i=F[e.top]),{left:o,top:i}},H=function(t){var e=t.left,o=t.top;return"undefined"!=typeof L[t.left]&&(e=L[t.left]),"undefined"!=typeof L[t.top]&&(o=L[t.top]),{left:e,top:o}},X=function(t){var e=t.split(" "),o=M(e,2),i=o[0],n=o[1];return{top:i,left:n}},j=X,N=function(){function t(e){var o=this;i(this,t),this.position=this.position.bind(this),B.push(this),this.history=[],this.setOptions(e,!1),C.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(o)}),this.position()}return w(t,[{key:"getClass",value:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,o=arguments.length<=1||void 0===arguments[1]?!0:arguments[1],i={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=f(i,t);var r=this.options,s=r.element,a=r.target,h=r.targetModifier;if(this.element=s,this.target=a,this.targetModifier=h,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),l(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&l(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=j(this.options.targetAttachment),this.attachment=j(this.options.attachment),this.offset=X(this.options.offset),this.targetOffset=X(this.options.targetOffset),"undefined"!=typeof this.scrollParent&&this.disable(),this.scrollParent="scroll-handle"===this.targetModifier?this.target:n(this.target),this.options.enabled!==!1&&this.enable(o)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return r(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=r(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,o=this.target;o===document.body?(o=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=r(o);var i=getComputedStyle(o),n=o.scrollWidth>o.clientWidth||[i.overflow,i.overflowX].indexOf("scroll")>=0||this.target!==document.body,s=0;n&&(s=15);var a=t.height-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)-s,e={width:15,height:.975*a*(a/o.scrollHeight),left:t.left+t.width-parseFloat(i.borderLeftWidth)-15},f=0;408>a&&this.target===document.body&&(f=-11e-5*Math.pow(a,2)-.00727*a+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var h=this.target.scrollTop/(o.scrollHeight-a);return e.top=h*(a-e.height-f)+t.top+parseFloat(i.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this.options.addTargetClasses!==!1&&l(this.target,this.getClass("enabled")),l(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),t&&this.position()}},{key:"disable",value:function(){h(this.target,this.getClass("enabled")),h(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.position)}},{key:"destroy",value:function(){var t=this;this.disable(),B.forEach(function(e,o){return e===t?void B.splice(o,1):void 0})}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;var i=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var n=this._addAttachClasses;t.top&&n.push(this.getClass("element-attached")+"-"+t.top),t.left&&n.push(this.getClass("element-attached")+"-"+t.left),e.top&&n.push(this.getClass("target-attached")+"-"+e.top),e.left&&n.push(this.getClass("target-attached")+"-"+e.left);var r=[];i.forEach(function(t){r.push(o.getClass("element-attached")+"-"+t),r.push(o.getClass("target-attached")+"-"+t)}),T(function(){"undefined"!=typeof o._addAttachClasses&&(c(o.element,o._addAttachClasses,r),o.options.addTargetClasses!==!1&&c(o.target,o._addAttachClasses,r),delete o._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];if(this.enabled){this.clearCache();var o=Y(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,o);var i=this.cache("element-bounds",function(){return r(t.element)}),n=i.width,f=i.height;if(0===n&&0===f&&"undefined"!=typeof this.lastSize){var h=this.lastSize;n=h.width,f=h.height}else this.lastSize={width:n,height:f};var l=this.cache("target-bounds",function(){return t.getTargetBounds()}),d=l,u=y(H(this.attachment),{width:n,height:f}),p=y(H(o),d),c=y(this.offset,{width:n,height:f}),g=y(this.targetOffset,d);u=v(u,c),p=v(p,g);for(var m=l.left+p.left-u.left,b=l.top+p.top-u.top,w=0;w<C.modules.length;++w){var O=C.modules[w],E=O.position.call(this,{left:m,top:b,targetAttachment:o,targetPos:l,elementPos:i,offset:u,targetOffset:p,manualOffset:c,manualTargetOffset:g,scrollbarSize:A,attachment:this.attachment});if(E===!1)return!1;"undefined"!=typeof E&&"object"==typeof E&&(b=E.top,m=E.left)}var x={page:{top:b,left:m},viewport:{top:b-pageYOffset,bottom:pageYOffset-b-f+innerHeight,left:m-pageXOffset,right:pageXOffset-m-n+innerWidth}},A=void 0;return document.body.scrollWidth>window.innerWidth&&(A=this.cache("scrollbar-size",a),x.viewport.bottom-=A.height),document.body.scrollHeight>window.innerHeight&&(A=this.cache("scrollbar-size",a),x.viewport.right-=A.width),(-1===["","static"].indexOf(document.body.style.position)||-1===["","static"].indexOf(document.body.parentElement.style.position))&&(x.page.bottom=document.body.scrollHeight-b-f,x.page.right=document.body.scrollWidth-m-n),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return s(t.target)}),o=t.cache("target-offsetparent-bounds",function(){return r(e)}),i=getComputedStyle(e),n=o,a={};if(["Top","Left","Bottom","Right"].forEach(function(t){a[t.toLowerCase()]=parseFloat(i["border"+t+"Width"])}),o.right=document.body.scrollWidth-o.left-n.width+a.right,o.bottom=document.body.scrollHeight-o.top-n.height+a.bottom,x.page.top>=o.top+a.top&&x.page.bottom>=o.bottom&&x.page.left>=o.left+a.left&&x.page.right>=o.right){var f=e.scrollTop,h=e.scrollLeft;x.offset={top:x.page.top-o.top+f-a.top,left:x.page.left-o.left+h-a.left}}}(),this.move(x),this.history.unshift(x),this.history.length>3&&this.history.pop(),e&&S(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var o={};for(var i in t){o[i]={};for(var n in t[i]){for(var r=!1,a=0;a<this.history.length;++a){var h=this.history[a];if("undefined"!=typeof h[i]&&!g(h[i][n],t[i][n])){r=!0;break}}r||(o[i][n]=!0)}}var l={top:"",left:"",right:"",bottom:""},d=function(t,o){var i="undefined"!=typeof e.options.optimizations,n=i?e.options.optimizations.gpu:null;if(n!==!1){var r=void 0,s=void 0;t.top?(l.top=0,r=o.top):(l.bottom=0,r=-o.bottom),t.left?(l.left=0,s=o.left):(l.right=0,s=-o.right),l[k]="translateX("+Math.round(s)+"px) translateY("+Math.round(r)+"px)","msTransform"!==k&&(l[k]+=" translateZ(0)")}else t.top?l.top=o.top+"px":l.bottom=o.bottom+"px",t.left?l.left=o.left+"px":l.right=o.right+"px"},u=!1;if((o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(l.position="absolute",d(o.page,t.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(l.position="fixed",d(o.viewport,t.viewport)):"undefined"!=typeof o.offset&&o.offset.top&&o.offset.left?!function(){l.position="absolute";var i=e.cache("target-offsetparent",function(){return s(e.target)});s(e.element)!==i&&T(function(){e.element.parentNode.removeChild(e.element),i.appendChild(e.element)}),d(o.offset,t.offset),u=!0}():(l.position="absolute",d({top:!0,left:!0},t.page)),!u){for(var p=!0,c=this.element.parentNode;c&&"BODY"!==c.tagName;){if("static"!==getComputedStyle(c).position){p=!1;break}c=c.parentNode}p||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element))}var m={},v=!1;for(var n in l){var y=l[n],b=this.element.style[n];""!==b&&""!==y&&["top","left","bottom","right"].indexOf(n)>=0&&(b=parseFloat(b),y=parseFloat(y)),b!==y&&(v=!0,m[n]=y)}v&&T(function(){f(e.element.style,m)})}}}]),t}();N.modules=[],C.position=_;var R=f(N,C),M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),P=C.Utils,r=P.getBounds,f=P.extend,c=P.updateClasses,T=P.defer,U=["left","top","right","bottom"];C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=t.targetAttachment;if(!this.options.constraints)return!0;var s=this.cache("element-bounds",function(){return r(e.element)}),a=s.height,h=s.width;if(0===h&&0===a&&"undefined"!=typeof this.lastSize){var l=this.lastSize;h=l.width,a=l.height}var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),u=d.height,p=d.width,g=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&g.push(e),o&&g.push(o)}),g.forEach(function(t){["left","top","right","bottom"].forEach(function(e){g.push(t+"-"+e)})});var m=[],v=f({},n),y=f({},this.attachment);return this.options.constraints.forEach(function(t){var r=t.to,s=t.attachment,f=t.pin;"undefined"==typeof s&&(s="");var l=void 0,d=void 0;if(s.indexOf(" ")>=0){var c=s.split(" "),g=M(c,2);d=g[0],l=g[1]}else l=d=s;var w=b(e,r);("target"===d||"both"===d)&&(o<w[1]&&"top"===v.top&&(o+=u,v.top="bottom"),o+a>w[3]&&"bottom"===v.top&&(o-=u,v.top="top")),"together"===d&&(o<w[1]&&"top"===v.top&&("bottom"===y.top?(o+=u,v.top="bottom",o+=a,y.top="top"):"top"===y.top&&(o+=u,v.top="bottom",o-=a,y.top="bottom")),o+a>w[3]&&"bottom"===v.top&&("top"===y.top?(o-=u,v.top="top",o-=a,y.top="bottom"):"bottom"===y.top&&(o-=u,v.top="top",o+=a,y.top="top")),"middle"===v.top&&(o+a>w[3]&&"top"===y.top?(o-=a,y.top="bottom"):o<w[1]&&"bottom"===y.top&&(o+=a,y.top="top"))),("target"===l||"both"===l)&&(i<w[0]&&"left"===v.left&&(i+=p,v.left="right"),i+h>w[2]&&"right"===v.left&&(i-=p,v.left="left")),"together"===l&&(i<w[0]&&"left"===v.left?"right"===y.left?(i+=p,v.left="right",i+=h,y.left="left"):"left"===y.left&&(i+=p,v.left="right",i-=h,y.left="right"):i+h>w[2]&&"right"===v.left?"left"===y.left?(i-=p,v.left="left",i-=h,y.left="right"):"right"===y.left&&(i-=p,v.left="left",i+=h,y.left="left"):"center"===v.left&&(i+h>w[2]&&"left"===y.left?(i-=h,y.left="right"):i<w[0]&&"right"===y.left&&(i+=h,y.left="left"))),("element"===d||"both"===d)&&(o<w[1]&&"bottom"===y.top&&(o+=a,y.top="top"),o+a>w[3]&&"top"===y.top&&(o-=a,y.top="bottom")),("element"===l||"both"===l)&&(i<w[0]&&"right"===y.left&&(i+=h,y.left="left"),i+h>w[2]&&"left"===y.left&&(i-=h,y.left="right")),"string"==typeof f?f=f.split(",").map(function(t){return t.trim()}):f===!0&&(f=["top","left","right","bottom"]),f=f||[];var C=[],O=[];o<w[1]&&(f.indexOf("top")>=0?(o=w[1],C.push("top")):O.push("top")),o+a>w[3]&&(f.indexOf("bottom")>=0?(o=w[3]-a,C.push("bottom")):O.push("bottom")),i<w[0]&&(f.indexOf("left")>=0?(i=w[0],C.push("left")):O.push("left")),i+h>w[2]&&(f.indexOf("right")>=0?(i=w[2]-h,C.push("right")):O.push("right")),C.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),m.push(t),C.forEach(function(e){m.push(t+"-"+e)})}(),O.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),m.push(t),O.forEach(function(e){m.push(t+"-"+e)})}(),(C.indexOf("left")>=0||C.indexOf("right")>=0)&&(y.left=v.left=!1),(C.indexOf("top")>=0||C.indexOf("bottom")>=0)&&(y.top=v.top=!1),(v.top!==n.top||v.left!==n.left||y.top!==e.attachment.top||y.left!==e.attachment.left)&&e.updateAttachClasses(y,v)}),T(function(){e.options.addTargetClasses!==!1&&c(e.target,m,g),c(e.element,m,g)}),{top:o,left:i}}});var P=C.Utils,r=P.getBounds,c=P.updateClasses,T=P.defer;C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=this.cache("element-bounds",function(){return r(e.element)}),s=n.height,a=n.width,f=this.getTargetBounds(),h=o+s,l=i+a,d=[];o<=f.bottom&&h>=f.top&&["left","right"].forEach(function(t){var e=f[t];(e===i||e===l)&&d.push(t)}),i<=f.right&&l>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];(e===o||e===h)&&d.push(t)});var u=[],p=[],g=["left","top","right","bottom"];return u.push(this.getClass("abutted")),g.forEach(function(t){u.push(e.getClass("abutted")+"-"+t)}),d.length&&p.push(this.getClass("abutted")),d.forEach(function(t){p.push(e.getClass("abutted")+"-"+t)}),T(function(){e.options.addTargetClasses!==!1&&c(e.target,p,u),c(e.element,p,u)}),!0}});var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return C.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){i=i.split(" "),i[1]=i[1]||i[0];var s=M(i,2);n=s[0],r=s[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return e+=n,o+=r,{top:e,left:o}}}}),R});
!function(e,t){"function"==typeof define&&define.amd?define(["tether"],t):"object"==typeof exports?module.exports=t(require("tether")):e.Shepherd=t(e.Tether)}(this,function(e){"use strict";function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)}function i(e){var t=document.createElement("div");return t.innerHTML=e,t.children[0]}function o(e,t){var n=void 0;return"undefined"!=typeof e.matches?n=e.matches:"undefined"!=typeof e.matchesSelector?n=e.matchesSelector:"undefined"!=typeof e.msMatchesSelector?n=e.msMatchesSelector:"undefined"!=typeof e.webkitMatchesSelector?n=e.webkitMatchesSelector:"undefined"!=typeof e.mozMatchesSelector?n=e.mozMatchesSelector:"undefined"!=typeof e.oMatchesSelector&&(n=e.oMatchesSelector),n.call(e,t)}function r(e,t){if(null===e||"undefined"==typeof e)return e;if("object"==typeof e)return e;var n=e.split(" "),i=n.length,o=t.length;i>o&&(n[0]=n.slice(0,i-o+1).join(" "),n.splice(1,o));for(var r={},s=0;o>s;++s){var h=t[s];r[h]=n[s]}return r}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),h=function(e,t,n){for(var i=!0;i;){var o=e,r=t,s=n;h=c=u=void 0,i=!1;var h=Object.getOwnPropertyDescriptor(o,r);if(void 0!==h){if("value"in h)return h.value;var u=h.get;return void 0===u?void 0:u.call(s)}var c=Object.getPrototypeOf(o);if(null===c)return void 0;e=c,t=r,n=s,i=!0}},u=e.Utils,c=u.Evented,a=u.addClass,d=u.extend,l=u.hasClass,p=u.removeClass,f=u.uniqueId,v=new c,y={top:"bottom center",left:"middle right",right:"middle left",bottom:"top center",center:"middle center"},m=function(u){function c(e,n){return t(this,c),h(Object.getPrototypeOf(c.prototype),"constructor",this).call(this,e,n),this.tour=e,this.bindMethods(),this.setOptions(n),this}return n(c,u),s(c,[{key:"bindMethods",value:function(){var e=this,t=["_show","show","hide","isOpen","cancel","complete","scrollTo","destroy"];t.map(function(t){e[t]=e[t].bind(e)})}},{key:"setOptions",value:function(){var e=void 0===arguments[0]?{}:arguments[0];this.options=e,this.destroy(),this.id=this.options.id||this.id||"step-"+f();var t=this.options.when;if(t)for(var n in t)if({}.hasOwnProperty.call(t,n)){var i=t[n];this.on(n,i,this)}this.options.buttons||(this.options.buttons=[{text:"Next",action:this.tour.next}])}},{key:"getTour",value:function(){return this.tour}},{key:"bindAdvance",value:function(){var e=this,t=r(this.options.advanceOn,["selector","event"]),n=t.event,i=t.selector,s=function(t){e.isOpen()&&("undefined"!=typeof i?o(t.target,i)&&e.tour.next():e.el&&t.target===e.el&&e.tour.next())};document.body.addEventListener(n,s),this.on("destroy",function(){return document.body.removeEventListener(n,s)})}},{key:"getAttachTo",value:function(){var e=r(this.options.attachTo,["element","on"])||{},t=e.element;if("string"==typeof t&&(e.element=document.querySelector(t),!e.element))throw new Error("The element for this Shepherd step was not found "+t);return e}},{key:"setupTether",value:function(){if("undefined"==typeof e)throw new Error("Using the attachment feature of Shepherd requires the Tether library");var t=this.getAttachTo(),n=y[t.on||"right"];"undefined"==typeof t.element&&(t.element="viewport",n="middle center");var i={classPrefix:"shepherd",element:this.el,constraints:[{to:"window",pin:!0,attachment:"together"}],target:t.element,offset:t.offset||"0 0",attachment:n};this.tether&&this.tether.destroy(),this.tether=new e(d(i,this.options.tetherOptions))}},{key:"show",value:function(){var e=this;if("undefined"!=typeof this.options.beforeShowPromise){var t=this.options.beforeShowPromise();if("undefined"!=typeof t)return t.then(function(){return e._show()})}this._show()}},{key:"_show",value:function(){var e=this;this.trigger("before-show"),this.el||this.render(),a(this.el,"shepherd-open"),document.body.setAttribute("data-shepherd-step",this.id),this.setupTether(),this.options.scrollTo&&setTimeout(function(){e.scrollTo()}),this.trigger("show")}},{key:"hide",value:function(){this.trigger("before-hide"),p(this.el,"shepherd-open"),document.body.removeAttribute("data-shepherd-step"),this.tether&&this.tether.destroy(),this.tether=null,this.trigger("hide")}},{key:"isOpen",value:function(){return l(this.el,"shepherd-open")}},{key:"cancel",value:function(){this.tour.cancel(),this.trigger("cancel")}},{key:"complete",value:function(){this.tour.complete(),this.trigger("complete")}},{key:"scrollTo",value:function(){var e=this.getAttachTo(),t=e.element;"undefined"!=typeof this.options.scrollToHandler?this.options.scrollToHandler(t):"undefined"!=typeof t&&t.scrollIntoView()}},{key:"destroy",value:function(){"undefined"!=typeof this.el&&(document.body.removeChild(this.el),delete this.el),this.tether&&this.tether.destroy(),this.tether=null,this.trigger("destroy")}},{key:"render",value:function(){var e=this;"undefined"!=typeof this.el&&this.destroy(),this.el=i("<div class='shepherd-step "+(this.options.classes||"")+"' data-id='"+this.id+"' "+(this.options.idAttribute?'id="'+this.options.idAttribute+'"':"")+"></div>");var t=document.createElement("div");t.className="shepherd-content",this.el.appendChild(t);var n=document.createElement("header");if(t.appendChild(n),"undefined"!=typeof this.options.title&&(n.innerHTML+="<h3 class='shepherd-title'>"+this.options.title+"</h3>",this.el.className+=" shepherd-has-title"),this.options.showCancelLink){var o=i("<a href class='shepherd-cancel-link'>✕</a>");n.appendChild(o),this.el.className+=" shepherd-has-cancel-link",this.bindCancelLink(o)}"undefined"!=typeof this.options.text&&!function(){var n=i("<div class='shepherd-text'></div>"),o=e.options.text;"function"==typeof o&&(o=o.call(e,n)),o instanceof HTMLElement?n.appendChild(o):("string"==typeof o&&(o=[o]),o.map(function(e){n.innerHTML+="<p>"+e+"</p>"})),t.appendChild(n)}();var r=document.createElement("footer");this.options.buttons&&!function(){var t=i("<ul class='shepherd-buttons'></ul>");e.options.buttons.map(function(n){var o=i("<li><a class='shepherd-button "+(n.classes||"")+"'>"+n.text+"</a>");t.appendChild(o),e.bindButtonEvents(n,o.querySelector("a"))}),r.appendChild(t)}(),t.appendChild(r),document.body.appendChild(this.el),this.setupTether(),this.options.advanceOn&&this.bindAdvance()}},{key:"bindCancelLink",value:function(e){var t=this;e.addEventListener("click",function(e){e.preventDefault(),t.cancel()})}},{key:"bindButtonEvents",value:function(e,t){var n=this;e.events=e.events||{},"undefined"!=typeof e.action&&(e.events.click=e.action);for(var i in e.events)if({}.hasOwnProperty.call(e.events,i)){var o=e.events[i];"string"==typeof o&&!function(){var e=o;o=function(){return n.tour.show(e)}}(),t.addEventListener(i,o)}this.on("destroy",function(){for(var n in e.events)if({}.hasOwnProperty.call(e.events,n)){var i=e.events[n];t.removeEventListener(n,i)}})}}]),c}(c),g=function(e){function i(){var e=this,n=void 0===arguments[0]?{}:arguments[0];t(this,i),h(Object.getPrototypeOf(i.prototype),"constructor",this).call(this,n),this.bindMethods(),this.options=n,this.steps=this.options.steps||[];var o=["complete","cancel","hide","start","show","active","inactive"];return o.map(function(t){!function(t){e.on(t,function(n){n=n||{},n.tour=e,v.trigger(t,n)})}(t)}),this}return n(i,e),s(i,[{key:"bindMethods",value:function(){var e=this,t=["next","back","cancel","complete","hide"];t.map(function(t){e[t]=e[t].bind(e)})}},{key:"addStep",value:function(e,t){return"undefined"==typeof t&&(t=e),t instanceof m?t.tour=this:(("string"==typeof e||"number"==typeof e)&&(t.id=e.toString()),t=d({},this.options.defaults,t),t=new m(this,t)),this.steps.push(t),this}},{key:"getById",value:function(e){for(var t=0;t<this.steps.length;++t){var n=this.steps[t];if(n.id===e)return n}}},{key:"getCurrentStep",value:function(){return this.currentStep}},{key:"next",value:function(){var e=this.steps.indexOf(this.currentStep);e===this.steps.length-1?(this.hide(e),this.trigger("complete"),this.done()):this.show(e+1)}},{key:"back",value:function(){var e=this.steps.indexOf(this.currentStep);this.show(e-1)}},{key:"cancel",value:function(){"undefined"!=typeof this.currentStep&&this.currentStep.hide(),this.trigger("cancel"),this.done()}},{key:"complete",value:function(){"undefined"!=typeof this.currentStep&&this.currentStep.hide(),this.trigger("complete"),this.done()}},{key:"hide",value:function(){"undefined"!=typeof this.currentStep&&this.currentStep.hide(),this.trigger("hide"),this.done()}},{key:"done",value:function(){v.activeTour=null,p(document.body,"shepherd-active"),this.trigger("inactive",{tour:this})}},{key:"show",value:function(){var e=void 0===arguments[0]?0:arguments[0];this.currentStep?this.currentStep.hide():(a(document.body,"shepherd-active"),this.trigger("active",{tour:this})),v.activeTour=this;var t=void 0;t="string"==typeof e?this.getById(e):this.steps[e],t&&(this.trigger("show",{step:t,previous:this.currentStep}),this.currentStep=t,t.show())}},{key:"start",value:function(){this.trigger("start"),this.currentStep=null,this.next()}}]),i}(c);return d(v,{Tour:g,Step:m,Evented:c}),v});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){module.exports=require("./lib/schema");require("./lib/patterns/reference");require("./lib/patterns/nothing");require("./lib/patterns/anything");require("./lib/patterns/object");require("./lib/patterns/or");require("./lib/patterns/equality");require("./lib/patterns/regexp");require("./lib/patterns/class");require("./lib/patterns/schema");require("./lib/extensions/Boolean");require("./lib/extensions/Number");require("./lib/extensions/String");require("./lib/extensions/Object");require("./lib/extensions/Array");require("./lib/extensions/Function");require("./lib/extensions/Schema")},{"./lib/extensions/Array":3,"./lib/extensions/Boolean":4,"./lib/extensions/Function":5,"./lib/extensions/Number":6,"./lib/extensions/Object":7,"./lib/extensions/Schema":8,"./lib/extensions/String":9,"./lib/patterns/anything":10,"./lib/patterns/class":11,"./lib/patterns/equality":12,"./lib/patterns/nothing":13,"./lib/patterns/object":14,"./lib/patterns/or":15,"./lib/patterns/reference":16,"./lib/patterns/regexp":17,"./lib/patterns/schema":18,"./lib/schema":19}],2:[function(require,module,exports){var Schema=module.exports=function(){};Schema.prototype={wrap:function(){if(this.wrapped)return this.validate;this.wrapped=true;var publicFunctions=["toJSON","unwrap","errors"];publicFunctions=publicFunctions.concat(this.publicFunctions||[]);for(var i=0;i<publicFunctions.length;i++){if(!this[publicFunctions[i]])continue;this.validate[publicFunctions[i]]=this[publicFunctions[i]].bind(this)}return this.validate},unwrap:function(){return this},toJSON:session(function(makeReference){var json,session=Schema.session;if(!session.serialized)session.serialized={objects:[],jsons:[],ids:[]};var index=session.serialized.objects.indexOf(this);if(makeReference&&index!==-1){json=session.serialized.jsons[index];if(json.id==null){do{json.id="id-"+Math.floor(Math.random()*1e5)}while(session.serialized.ids.indexOf(json.id)!==-1);session.serialized.ids.push(json.id)}json={$ref:json.id}}else{json={};if(this.doc!=null)json.description=this.doc;session.serialized.objects.push(this);session.serialized.jsons.push(json)}return json})};Schema.extend=function(descriptor){if(!descriptor.validate){throw new Error("Schema objects must have a validate function.")}var constructor=function(){var self=this;if(this.initialize)this.initialize.apply(this,arguments);this.validate=this.validate.bind(this);this.validate.schema=this.validate};var prototype=Object.create(Schema.prototype);for(var key in descriptor)prototype[key]=descriptor[key];constructor.prototype=prototype;return constructor};var active=false;function session(f){return function(){if(active){return f.apply(this,arguments)}else{active=true;var result=f.apply(this,arguments);for(var i in session)delete session[i];active=false;return result}}}Schema.session=session;function lastDefinedResult(functions,arg){var i=functions.length,result;while(i--){result=functions[i](arg);if(result!=null)return result}}var fromJSdefs=[];Schema.fromJS=lastDefinedResult.bind(null,fromJSdefs);Schema.fromJS.def=Array.prototype.push.bind(fromJSdefs);var fromJSONdefs=[];Schema.fromJSON=session(lastDefinedResult.bind(null,fromJSONdefs));Schema.fromJSON.def=Array.prototype.push.bind(fromJSONdefs);Schema.patterns={};Schema.extensions={}},{}],3:[function(require,module,exports){var Schema=require("../BaseSchema"),EqualitySchema=require("../patterns/equality"),anything=require("../patterns/anything").instance;var ArraySchema=module.exports=Schema.extensions.ArraySchema=Schema.extend({initialize:function(itemSchema,max,min){this.itemSchema=itemSchema||anything;this.min=min||0;this.max=max||Infinity},errors:function(instance){var self=this;if(!(instance instanceof Array))return instance+" is not an instance of Array";if(this.min===this.max){if(instance.length!==this.min)return"Array length should be equal to "+this.min+" and is "+instance.length}else{if(this.min>0&&instance.length<this.min)return"Array length should not be less than "+this.min+" and is "+instance.length;if(this.max<Infinity&&instance.length>this.max)return"Array length should not be more than "+this.max+" and is "+instance.length}var results={};for(var i=0;i<instance.length;i++){var errs=this.itemSchema.errors(instance[i]);if(errs){results[i]=errs}}var resultKeysArray=Object.keys(results);if(resultKeysArray.length>0){return results}return false},validate:function(instance){if(!(instance instanceof Array))return false;if(this.min===this.max){if(instance.length!==this.min)return false}else{if(this.min>0&&instance.length<this.min)return false;if(this.max<Infinity&&instance.length>this.max)return false}for(var i=0;i<instance.length;i++){if(!this.itemSchema.validate(instance[i]))return false}return true},toJSON:Schema.session(function(){var json=Schema.prototype.toJSON.call(this,true);if(json["$ref"]!=null)return json;json.type="array";if(this.min>0)json.minItems=this.min;if(this.max<Infinity)json.maxItems=this.max;if(this.itemSchema!==anything)json.items=this.itemSchema.toJSON();return json})});Schema.fromJSON.def(function(sch){if(!sch||sch.type!=="array")return;if(sch.items instanceof Array)return;return new ArraySchema(Schema.fromJSON(sch.items),sch.maxItems,sch.minItems)});Array.of=function(){var args=Array.prototype.slice.call(arguments).reverse();if(args.length==3){if(!(typeof args[2]==="number")){throw new Error("3 arguments were passed to Array.of and 1st argument (minLength) SHOULD be number NOT "+args[2])}if(!(typeof args[1]==="number")){throw new Error("3 arguments were passed to Array.of and 2nd argument (maxLength) SHOULD be number NOT "+args[1])}}if(args.length===2){if(!(typeof args[1]==="number")){throw new Error("2 arguments were passed to Array.of and 1nd argument (length) SHOULD be number NOT "+args[1])}args[2]=args[1]}return new ArraySchema(Schema.fromJS(args[0]),args[1],args[2]).wrap()};Array.like=function(other){return new EqualitySchema(other).wrap()};Array.schema=(new ArraySchema).wrap()},{"../BaseSchema":2,"../patterns/anything":10,"../patterns/equality":12}],4:[function(require,module,exports){var Schema=require("../BaseSchema");var BooleanSchema=module.exports=Schema.extensions.BooleanSchema=new Schema.extend({errors:function(instance){if(!this.validate(instance)){return instance+" is not Boolean"}return false},validate:function(instance){return Object(instance)instanceof Boolean},toJSON:function(){return{type:"boolean"}}});var booleanSchema=module.exports=(new BooleanSchema).wrap();Schema.fromJSON.def(function(sch){if(!sch||sch.type!=="boolean")return;return booleanSchema});Boolean.schema=booleanSchema},{"../BaseSchema":2}],5:[function(require,module,exports){var ReferenceSchema=require("../patterns/reference");Function.reference=function(f){return new ReferenceSchema(f).wrap()}},{"../patterns/reference":16}],6:[function(require,module,exports){var Schema=require("../BaseSchema");var NumberSchema=module.exports=Schema.extensions.NumberSchema=Schema.extend({initialize:function(minimum,exclusiveMinimum,maximum,exclusiveMaximum,divisibleBy){this.minimum=minimum!=null?minimum:-Infinity;this.exclusiveMinimum=exclusiveMinimum;this.maximum=minimum!=null?maximum:Infinity;this.exclusiveMaximum=exclusiveMaximum;this.divisibleBy=divisibleBy||0},min:function(minimum){return new NumberSchema(minimum,false,this.maximum,this.exclusiveMaximum,this.divisibleBy).wrap()},above:function(minimum){return new NumberSchema(minimum,true,this.maximum,this.exclusiveMaximum,this.divisibleBy).wrap()},max:function(maximum){return new NumberSchema(this.minimum,this.exclusiveMinimum,maximum,false,this.divisibleBy).wrap()},below:function(maximum){return new NumberSchema(this.minimum,this.exclusiveMinimum,maximum,true,this.divisibleBy).wrap()},step:function(divisibleBy){return new NumberSchema(this.minimum,this.exclusiveMinimum,this.maximum,this.exclusiveMaximum,divisibleBy).wrap()},publicFunctions:["min","above","max","below","step"],errors:function(instance){var message;if(!(Object(instance)instanceof Number)){message=instance+" is not Number"}else if(instance<this.minimum){message="number = "+instance+" is smaller than required minimum = "+this.minimum}else if(instance>this.maximum){message="number = "+instance+" is bigger than required maximum = "+this.maximum}else if(this.divisibleBy!==0&&instance%this.divisibleBy!==0){message="number = "+instance+" is not divisibleBy "+this.divisibleBy}if(message!=null){return message}return false},validate:function(instance){return Object(instance)instanceof Number&&(this.exclusiveMinimum?instance>this.minimum:instance>=this.minimum)&&(this.exclusiveMaximum?instance<this.maximum:instance<=this.maximum)&&(this.divisibleBy===0||instance%this.divisibleBy===0)},toJSON:function(){var json=Schema.prototype.toJSON.call(this);json.type=this.divisibleBy!==0&&this.divisibleBy%1===0?"integer":"number";if(this.divisibleBy!==0&&this.divisibleBy!==1)json.divisibleBy=this.divisibleBy;if(this.minimum!==-Infinity){json.minimum=this.minimum;if(this.exclusiveMinimum===true)json.exclusiveMinimum=true}if(this.maximum!==Infinity){json.maximum=this.maximum;if(this.exclusiveMaximum===true)json.exclusiveMaximum=true}return json}});Schema.fromJSON.def(function(sch){if(!sch||sch.type!=="number"&&sch.type!=="integer")return;return new NumberSchema(sch.minimum,sch.exclusiveMinimum,sch.maximum,sch.exclusiveMaximum,sch.divisibleBy||(sch.type==="integer"?1:0))});Number.schema=(new NumberSchema).wrap();Number.min=Number.schema.min;Number.above=Number.schema.above;Number.max=Number.schema.max;Number.below=Number.schema.below;Number.step=Number.schema.step;Number.Integer=Number.step(1)},{"../BaseSchema":2}],7:[function(require,module,exports){var ReferenceSchema=require("../patterns/reference"),EqualitySchema=require("../patterns/equality"),ObjectSchema=require("../patterns/object");Object.like=function(other){return new EqualitySchema(other).wrap()};Object.reference=function(o){return new ReferenceSchema(o).wrap()};Object.schema=(new ObjectSchema).wrap()},{"../patterns/equality":12,"../patterns/object":14,"../patterns/reference":16}],8:[function(require,module,exports){var Schema=require("../BaseSchema"),schema=require("../schema");var SchemaReference=module.exports=Schema.extensions.SchemaReference=Schema.extend({validate:function(){throw new Error("Trying to validate unresolved schema reference.")},resolve:function(schemaDescriptor){var schemaObject=Schema.fromJS(schemaDescriptor);for(var key in schemaObject){if(schemaObject[key]instanceof Function){this[key]=schemaObject[key].bind(schemaObject)}else{this[key]=schemaObject[key]}}delete this.resolve},publicFunctions:["resolve"]});schema.reference=function(schemaDescriptor){return new SchemaReference};function renewing(ref){ref.resolve=function(){Schema.self=schema.self=renewing(new SchemaReference);return SchemaReference.prototype.resolve.apply(this,arguments)};return ref}Schema.self=schema.self=renewing(new SchemaReference);Schema.fromJSON.def(function(sch){if(sch.id==null&&sch["$ref"]==null)return;var id,session=Schema.session;if(!session.deserialized)session.deserialized={references:{},subscribers:{}};if(sch.id!=null){id=sch.id;delete sch.id;var schemaObject=Schema.fromJSON(sch);sch.id=id;session.deserialized.references[id]=schemaObject;(session.deserialized.subscribers[id]||[]).forEach(function(callback){callback(schemaObject)});return schemaObject}else{id=sch["$ref"];if(session.deserialized.references[id])return session.deserialized.references[id];if(!session.deserialized.subscribers[id])session.deserialized.subscribers[id]=[];var reference=new SchemaReference;session.deserialized.subscribers[id].push(reference.resolve.bind(reference));return reference}})},{"../BaseSchema":2,"../schema":19}],9:[function(require,module,exports){var RegexpSchema=require("../patterns/regexp");String.of=function(){var args=Array.prototype.slice.call(arguments).reverse(),charset=args[0]?"["+args[0]+"]":".",max=args[1],min=args.length>2?args[2]:args[1],regexp="^"+charset+"{"+(min||0)+","+(max||"")+"}$";return new RegexpSchema(RegExp(regexp)).wrap()};String.schema=(new RegexpSchema).wrap()},{"../patterns/regexp":17}],10:[function(require,module,exports){var Schema=require("../BaseSchema");var AnythingSchema=module.exports=Schema.patterns.AnythingSchema=Schema.extend({errors:function(instance){if(instance==null)return"anything cannot be null";return false},validate:function(instance){return instance!=null},toJSON:function(){return{type:"any"}}});var anything=AnythingSchema.instance=new AnythingSchema;Schema.fromJS.def(function(sch){if(sch===undefined)return anything});Schema.fromJSON.def(function(sch){if(sch.type==="any")return anything})},{"../BaseSchema":2}],11:[function(require,module,exports){var Schema=require("../BaseSchema");var ClassSchema=module.exports=Schema.patterns.ClassSchema=Schema.extend({initialize:function(constructor){this.constructor=constructor},getName:function(obj){if(!obj)return obj;if(obj instanceof Object){return obj.constructor.name}else{return typeof obj+" = "+obj}},errors:function(instance){var middleMessage=" is not instance of ";if(instance==null){return this.getName(instance)+middleMessage+this.getName(this.constructor)}if(!(instance instanceof this.constructor)){return this.getName(instance)+middleMessage+this.getName(this.constructor)}return false},validate:function(instance){return instance instanceof this.constructor}});Schema.fromJS.def(function(constructor){if(!(constructor instanceof Function))return;if(constructor.schema instanceof Function){return constructor.schema.unwrap()}else{return new ClassSchema(constructor)}})},{"../BaseSchema":2}],12:[function(require,module,exports){var Schema=require("../BaseSchema");var equal=function(a,b){if(Object(a)!==a||Object(b)!==b)return a===b;if(a instanceof Array!==b instanceof Array)return false;if(Object.keys(a).length!==Object.keys(b).length)return false;for(var key in a){if(!equal(a[key],b[key]))return false}return true};var EqualitySchema=module.exports=Schema.patterns.EqualitySchema=Schema.extend({initialize:function(object){this.object=object},errors:function(instance){if(!equal(instance,this.object)){return instance+" is not equal to "+this.object}return false},validate:function(instance){return equal(instance,this.object)},toJSON:function(){var json=Schema.prototype.toJSON.call(this);json["enum"]=[this.object];return json}});Schema.fromJS.def(function(sch){if(sch instanceof Array&&sch.length===1)return new EqualitySchema(sch[0])})},{"../BaseSchema":2}],13:[function(require,module,exports){var Schema=require("../BaseSchema");var NothingSchema=module.exports=Schema.patterns.NothingSchema=Schema.extend({errors:function(instance){return false},validate:function(instance){return instance==null},toJSON:function(){return{type:"null"}}});var nothing=NothingSchema.instance=new NothingSchema;Schema.fromJS.def(function(sch){if(sch===null)return nothing});Schema.fromJSON.def(function(sch){if(sch.type==="null")return nothing})},{"../BaseSchema":2}],14:[function(require,module,exports){var Schema=require("../BaseSchema"),anything=require("./anything").instance,nothing=require("./nothing").instance;var ObjectSchema=module.exports=Schema.patterns.ObjectSchema=Schema.extend({initialize:function(properties,other){var self=this;this.other=other||anything;this.properties=properties||[];this.stringProps={},this.regexpProps=[];this.properties.forEach(function(property){if(typeof property.key==="string"){self.stringProps[property.key]=property}else{self.regexpProps.push(property)}})},errors:function(instance){var self=this;if(instance==null)return instance+" is not Object";var error,errors={};Object.keys(this.stringProps).forEach(function(key){if(key in instance){if(error=self.stringProps[key].value.errors(instance[key])){errors[key]=error}}else if(self.stringProps[key].min>0){errors[key]="key is not present in the object"}});if(this.regexpProps.length||this.other!==anything){var checked;var occurences=self.regexpProps.map(function(){return 0});for(var key in instance){checked=false;this.regexpProps.forEach(function(prop,index){if(prop.key.test(key)){occurences[index]+=1;checked=true;if(error=prop.value.errors(instance[key])){errors[key]=error}}});if(!checked&&!(key in this.stringProps)){if(error=this.other.errors(instance[key])){errors[key]=error}}}for(var i=0;i<self.regexpProps.length;i++){var prop=self.regexpProps[i];if(prop.min>occurences[i]){errors[prop.key.toString().slice(1,-1)]="regexp key matched "+occurences[i]+" times which is lower than allowed ("+prop.min+")"}else if(occurences[i]>prop.max){errors[prop.key.toString().slice(1,-1)]="regexp key matched "+occurences[i]+" times which is higher than allowed ("+prop.max+")"}}}return Object.keys(errors).length?errors:false},validate:function(instance){var self=this;if(instance==null)return false;var stringPropsValid=Object.keys(this.stringProps).every(function(key){if(key in instance){return self.stringProps[key].value.validate(instance[key])}else{return self.stringProps[key].min===0}});if(!stringPropsValid)return false;if(!this.regexpProps.length&&this.other===anything)return true;var checked;var occurences=self.regexpProps.map(function(){return 0});for(var key in instance){checked=false;var regexpPropsValid=this.regexpProps.every(function(prop,index){if(prop.key.test(key)){checked=true;occurences[index]+=1;return prop.value.validate(instance[key])}else{return true}});if(!regexpPropsValid)return false;if(!checked&&!(key in this.stringProps)&&!this.other.validate(instance[key]))return false}for(var i=0;i<self.regexpProps.length;i++){var prop=self.regexpProps[i];if(prop.min>occurences[i]||occurences[i]>prop.max)return false}return true},toJSON:Schema.session(function(){var i,property,regexp,json=Schema.prototype.toJSON.call(this,true);if(json["$ref"]!=null)return json;json.type="object";for(i in this.stringProps){property=this.stringProps[i];json.properties=json.properties||{};json.properties[property.key]=property.value.toJSON();if(property.min===1)json.properties[property.key].required=true;if(property.title)json.properties[property.key].title=property.title}for(i=0;i<this.regexpProps.length;i++){property=this.regexpProps[i];json.patternProperties=json.patternProperties||{};regexp=property.key.toString();regexp=regexp.substr(2,regexp.length-4);json.patternProperties[regexp]=property.value.toJSON();if(property.title)json.patternProperties[regexp].title=property.title}if(this.other!==anything){json.additionalProperties=this.other===nothing?false:this.other.toJSON()}return json})});var regexpString=function(){var shouldBeEscaped="[](){}^$?*+.".split("").map(function(element){return RegExp("(\\\\)*\\"+element,"g")});var shouldntBeEscaped="bBwWdDsS".split("").map(function(element){return RegExp("(\\\\)*"+element,"g")});return function(string){var i,j,match;for(i=0;i<shouldBeEscaped.length;i++){match=string.match(shouldBeEscaped[i]);if(!match)continue;for(j=0;j<match.length;j++){if(match[j].length%2===1)return RegExp("^"+string+"$")}}for(i=0;i<shouldntBeEscaped.length;i++){match=string.match(shouldntBeEscaped[i]);if(!match)continue;for(j=0;j<match.length;j++){if(match[j].length%2===0)return RegExp("^"+string+"$")}}for(i=0;i<shouldBeEscaped.length;i++){string=string.replace(shouldBeEscaped[i],function(match){return match.substr(1)})}return string}}();Schema.fromJS.def(function(object){if(!(object instanceof Object))return;var other,property,properties=[];for(var key in object){property={value:Schema.fromJS(object[key])};if(key==="*"){other=property.value;continue}property.min=key[0]==="*"||key[0]==="?"?0:1;property.max=key[0]==="*"||key[0]==="+"?Infinity:1;key=key.replace(/^[*?+]/,"");key=key.replace(/\s*:[^:]+$/,function(match){property.title=match.replace(/^\s*:\s*/,"");return""});property.key=regexpString(key);properties.push(property)}return new ObjectSchema(properties,other)});Schema.fromJSON.def(function(json){if(!json||json.type!=="object")return;var key,properties=[];for(key in json.properties){properties.push({min:json.properties[key].required?1:0,max:1,key:key,value:Schema.fromJSON(json.properties[key]),title:json.properties[key].title})}for(key in json.patternProperties){properties.push({min:0,max:Infinity,key:RegExp("^"+key+"$"),value:Schema.fromJSON(json.patternProperties[key]),title:json.patternProperties[key].title})}var other;if(json.additionalProperties!==undefined){other=json.additionalProperties===false?nothing:Schema.fromJSON(json.additionalProperties)}return new ObjectSchema(properties,other)})},{"../BaseSchema":2,"./anything":10,"./nothing":13}],15:[function(require,module,exports){var Schema=require("../BaseSchema"),EqualitySchema=require("../patterns/equality");var OrSchema=module.exports=Schema.patterns.OrSchema=Schema.extend({initialize:function(schemas){this.schemas=schemas},errors:function(instance){var self=this;var errors=[];if(!this.validate(instance)){this.schemas.forEach(function(sch){var result=sch.errors(instance);if(result){errors.push(result)}});if(errors.length>0){return errors}}return false},validate:function(instance){return this.schemas.some(function(sch){return sch.validate(instance)})},toJSON:Schema.session(function(){var json=Schema.prototype.toJSON.call(this,true),subjsons=this.schemas.map(function(sch){return sch.toJSON()}),onlyEquality=subjsons.every(function(json){return json["enum"]instanceof Array&&json["enum"].length===1});if(json["$ref"]!=null)return json;if(onlyEquality){json["enum"]=subjsons.map(function(json){return json["enum"][0]})}else{json["type"]=subjsons.map(function(json){var simpleType=typeof json.type==="string"&&Object.keys(json).length===1;return simpleType?json.type:json})}return json})});Schema.fromJS.def(function(schemas){if(schemas instanceof Array)return new OrSchema(schemas.map(function(sch){return sch===undefined?Schema.self:Schema.fromJS(sch)}))});Schema.fromJSON.def(function(sch){if(!sch)return;if(sch["enum"]instanceof Array){return new OrSchema(sch["enum"].map(function(object){return new EqualitySchema(object)}))}if(sch["type"]instanceof Array){return new OrSchema(sch["type"].map(function(type){return Schema.fromJSON(typeof type==="string"?{type:type}:type)}))}})},{"../BaseSchema":2,"../patterns/equality":12}],16:[function(require,module,exports){var Schema=require("../BaseSchema");var ReferenceSchema=module.exports=Schema.patterns.ReferenceSchema=Schema.extend({initialize:function(value){this.value=value},getName:function(obj){if(obj instanceof Object){return obj.constructor.name+" = "+obj}else{return typeof obj+" = "+obj}},errors:function(instance){if(instance==null){return instance+" is not a reference"}if(instance!==this.value){var middleMessage=" is not reference to ";return this.getName(instance)+middleMessage+this.getName(this.value)}return false},validate:function(instance){return instance===this.value},toJSON:function(){var json=Schema.prototype.toJSON.call(this);json["enum"]=[this.value];return json}});Schema.fromJS.def(function(value){return new ReferenceSchema(value)})},{"../BaseSchema":2}],17:[function(require,module,exports){var Schema=require("../BaseSchema");var RegexpSchema=module.exports=Schema.patterns.RegexpSchema=Schema.extend({initialize:function(regexp){this.regexp=regexp},errors:function(instance){var message;if(!(Object(instance)instanceof String)){message=instance+" is not a String"}else if(this.regexp&&!this.regexp.test(instance)){message=instance+" is not matched with RegExp -> "+this.regexp}if(message)return message;return false},validate:function(instance){return Object(instance)instanceof String&&(!this.regexp||this.regexp.test(instance))},toJSON:function(){var json=Schema.prototype.toJSON.call(this);json.type="string";if(this.regexp){json.pattern=this.regexp.toString();json.pattern=json.pattern.substr(1,json.pattern.length-2)}return json}});Schema.fromJSON.def(function(sch){if(!sch||sch.type!=="string")return;if("pattern"in sch){return new RegexpSchema(RegExp("^"+sch.pattern+"$"))}else if("minLength"in sch||"maxLength"in sch){return new RegexpSchema(RegExp("^.{"+[sch.minLength||0,sch.maxLength].join(",")+"}$"))}else{return new RegexpSchema}});Schema.fromJS.def(function(regexp){if(regexp instanceof RegExp)return new RegexpSchema(regexp)})},{"../BaseSchema":2}],18:[function(require,module,exports){var Schema=require("../BaseSchema");Schema.fromJS.def(function(sch){if(sch instanceof Schema)return sch})},{"../BaseSchema":2}],19:[function(require,module,exports){var Schema=require("./BaseSchema");schema=module.exports=function(schemaDescription){var doc,schemaObject;if(arguments.length===2){doc=schemaDescription;schemaDescription=arguments[1]}if(this instanceof schema){var constructor=Schema.extend(schemaDescription);schemaObject=new constructor;if(doc)schemaObject.doc=doc;return schemaObject.wrap()}else{schemaObject=Schema.fromJS(schemaDescription);schema.self.resolve(schemaObject);if(doc)schemaObject.doc=doc;return schemaObject.wrap()}};schema.Schema=Schema;schema.toJSON=function(sch){return Schema.fromJS(sch).toJSON()};schema.fromJS=function(sch){return Schema.fromJS(sch).wrap()};schema.fromJSON=function(sch){return Schema.fromJSON(sch).wrap()};if(typeof define==="function"&&define.amd){define([],function(){return schema})}},{"./BaseSchema":2}]},{},[1]);
/**
 * jsBezier-0.7
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * licensed under the MIT license.
 *
 * a set of Bezier curve functions that deal with Beziers, used by jsPlumb, and perhaps useful for other people.  These functions work with Bezier
 * curves of arbitrary degree.
 *
 * - functions are all in the 'jsBezier' namespace.
 *
 * - all input points should be in the format {x:.., y:..}. all output points are in this format too.
 *
 * - all input curves should be in the format [ {x:.., y:..}, {x:.., y:..}, {x:.., y:..}, {x:.., y:..} ]
 *
 * - 'location' as used as an input here refers to a decimal in the range 0-1 inclusive, which indicates a point some proportion along the length
 * of the curve.  location as output has the same format and meaning.
 *
 *
 * Function List:
 * --------------
 *
 * distanceFromCurve(point, curve)
 *
 * 	Calculates the distance that the given point lies from the given Bezier.  Note that it is computed relative to the center of the Bezier,
 * so if you have stroked the curve with a wide pen you may wish to take that into account!  The distance returned is relative to the values
 * of the curve and the point - it will most likely be pixels.
 *
 * gradientAtPoint(curve, location)
 *
 * 	Calculates the gradient to the curve at the given location, as a decimal between 0 and 1 inclusive.
 *
 * gradientAtPointAlongCurveFrom (curve, location)
 *
 *	Calculates the gradient at the point on the given curve that is 'distance' units from location.
 *
 * nearestPointOnCurve(point, curve)
 *
 *	Calculates the nearest point to the given point on the given curve.  The return value of this is a JS object literal, containing both the
 *point's coordinates and also the 'location' of the point (see above), for example:  { point:{x:551,y:150}, location:0.263365 }.
 *
 * pointOnCurve(curve, location)
 *
 * 	Calculates the coordinates of the point on the given Bezier curve at the given location.
 *
 * pointAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the coordinates of the point on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * locationAlongCurveFrom(curve, location, distance)
 *
 * 	Calculates the location on the given curve that is 'distance' units from location.  'distance' should be in the same coordinate
 * space as that used to construct the Bezier curve.  For an HTML Canvas usage, for example, distance would be a measure of pixels.
 *
 * perpendicularToCurveAt(curve, location, length, distance)
 *
 * 	Calculates the perpendicular to the given curve at the given location.  length is the length of the line you wish for (it will be centered
 * on the point at 'location'). distance is optional, and allows you to specify a point along the path from the given location as the center of
 * the perpendicular returned.  The return value of this is an array of two points: [ {x:...,y:...}, {x:...,y:...} ].
 *
 *
 */

(function() {

    var root = this;

    if(typeof Math.sgn == "undefined") {
        Math.sgn = function(x) { return x == 0 ? 0 : x > 0 ? 1 :-1; };
    }

    var Vectors = {
            subtract 	: 	function(v1, v2) { return {x:v1.x - v2.x, y:v1.y - v2.y }; },
            dotProduct	: 	function(v1, v2) { return (v1.x * v2.x)  + (v1.y * v2.y); },
            square		:	function(v) { return Math.sqrt((v.x * v.x) + (v.y * v.y)); },
            scale		:	function(v, s) { return {x:v.x * s, y:v.y * s }; }
        },

        maxRecursion = 64,
        flatnessTolerance = Math.pow(2.0,-maxRecursion-1);

    /**
     * Calculates the distance that the point lies from the curve.
     *
     * @param point a point in the form {x:567, y:3342}
     * @param curve a Bezier curve in the form [{x:..., y:...}, {x:..., y:...}, {x:..., y:...}, {x:..., y:...}].  note that this is currently
     * hardcoded to assume cubiz beziers, but would be better off supporting any degree.
     * @return a JS object literal containing location and distance, for example: {location:0.35, distance:10}.  Location is analogous to the location
     * argument you pass to the pointOnPath function: it is a ratio of distance travelled along the curve.  Distance is the distance in pixels from
     * the point to the curve.
     */
    var _distanceFromCurve = function(point, curve) {
        var candidates = [],
            w = _convertToBezier(point, curve),
            degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            numSolutions = _findRoots(w, higherDegree, candidates, 0),
            v = Vectors.subtract(point, curve[0]), dist = Vectors.square(v), t = 0.0;

        for (var i = 0; i < numSolutions; i++) {
            v = Vectors.subtract(point, _bezier(curve, degree, candidates[i], null, null));
            var newDist = Vectors.square(v);
            if (newDist < dist) {
                dist = newDist;
                t = candidates[i];
            }
        }
        v = Vectors.subtract(point, curve[degree]);
        newDist = Vectors.square(v);
        if (newDist < dist) {
            dist = newDist;
            t = 1.0;
        }
        return {location:t, distance:dist};
    };
    /**
     * finds the nearest point on the curve to the given point.
     */
    var _nearestPointOnCurve = function(point, curve) {
        var td = _distanceFromCurve(point, curve);
        return {point:_bezier(curve, curve.length - 1, td.location, null, null), location:td.location};
    };
    var _convertToBezier = function(point, curve) {
        var degree = curve.length - 1, higherDegree = (2 * degree) - 1,
            c = [], d = [], cdTable = [], w = [],
            z = [ [1.0, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1.0] ];

        for (var i = 0; i <= degree; i++) c[i] = Vectors.subtract(curve[i], point);
        for (var i = 0; i <= degree - 1; i++) {
            d[i] = Vectors.subtract(curve[i+1], curve[i]);
            d[i] = Vectors.scale(d[i], 3.0);
        }
        for (var row = 0; row <= degree - 1; row++) {
            for (var column = 0; column <= degree; column++) {
                if (!cdTable[row]) cdTable[row] = [];
                cdTable[row][column] = Vectors.dotProduct(d[row], c[column]);
            }
        }
        for (i = 0; i <= higherDegree; i++) {
            if (!w[i]) w[i] = [];
            w[i].y = 0.0;
            w[i].x = parseFloat(i) / higherDegree;
        }
        var n = degree, m = degree-1;
        for (var k = 0; k <= n + m; k++) {
            var lb = Math.max(0, k - m),
                ub = Math.min(k, n);
            for (i = lb; i <= ub; i++) {
                j = k - i;
                w[i+j].y += cdTable[j][i] * z[j][i];
            }
        }
        return w;
    };
    /**
     * counts how many roots there are.
     */
    var _findRoots = function(w, degree, t, depth) {
        var left = [], right = [],
            left_count, right_count,
            left_t = [], right_t = [];

        switch (_getCrossingCount(w, degree)) {
            case 0 : {
                return 0;
            }
            case 1 : {
                if (depth >= maxRecursion) {
                    t[0] = (w[0].x + w[degree].x) / 2.0;
                    return 1;
                }
                if (_isFlatEnough(w, degree)) {
                    t[0] = _computeXIntercept(w, degree);
                    return 1;
                }
                break;
            }
        }
        _bezier(w, degree, 0.5, left, right);
        left_count  = _findRoots(left,  degree, left_t, depth+1);
        right_count = _findRoots(right, degree, right_t, depth+1);
        for (var i = 0; i < left_count; i++) t[i] = left_t[i];
        for (var i = 0; i < right_count; i++) t[i+left_count] = right_t[i];
        return (left_count+right_count);
    };
    var _getCrossingCount = function(curve, degree) {
        var n_crossings = 0, sign, old_sign;
        sign = old_sign = Math.sgn(curve[0].y);
        for (var i = 1; i <= degree; i++) {
            sign = Math.sgn(curve[i].y);
            if (sign != old_sign) n_crossings++;
            old_sign = sign;
        }
        return n_crossings;
    };
    var _isFlatEnough = function(curve, degree) {
        var  error,
            intercept_1, intercept_2, left_intercept, right_intercept,
            a, b, c, det, dInv, a1, b1, c1, a2, b2, c2;
        a = curve[0].y - curve[degree].y;
        b = curve[degree].x - curve[0].x;
        c = curve[0].x * curve[degree].y - curve[degree].x * curve[0].y;

        var max_distance_above = max_distance_below = 0.0;

        for (var i = 1; i < degree; i++) {
            var value = a * curve[i].x + b * curve[i].y + c;
            if (value > max_distance_above)
                max_distance_above = value;
            else if (value < max_distance_below)
                max_distance_below = value;
        }

        a1 = 0.0; b1 = 1.0; c1 = 0.0; a2 = a; b2 = b;
        c2 = c - max_distance_above;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_1 = (b1 * c2 - b2 * c1) * dInv;
        a2 = a; b2 = b; c2 = c - max_distance_below;
        det = a1 * b2 - a2 * b1;
        dInv = 1.0/det;
        intercept_2 = (b1 * c2 - b2 * c1) * dInv;
        left_intercept = Math.min(intercept_1, intercept_2);
        right_intercept = Math.max(intercept_1, intercept_2);
        error = right_intercept - left_intercept;
        return (error < flatnessTolerance)? 1 : 0;
    };
    var _computeXIntercept = function(curve, degree) {
        var XLK = 1.0, YLK = 0.0,
            XNM = curve[degree].x - curve[0].x, YNM = curve[degree].y - curve[0].y,
            XMK = curve[0].x - 0.0, YMK = curve[0].y - 0.0,
            det = XNM*YLK - YNM*XLK, detInv = 1.0/det,
            S = (XNM*YMK - YNM*XMK) * detInv;
        return 0.0 + XLK * S;
    };
    var _bezier = function(curve, degree, t, left, right) {
        var temp = [[]];
        for (var j =0; j <= degree; j++) temp[0][j] = curve[j];
        for (var i = 1; i <= degree; i++) {
            for (var j =0 ; j <= degree - i; j++) {
                if (!temp[i]) temp[i] = [];
                if (!temp[i][j]) temp[i][j] = {};
                temp[i][j].x = (1.0 - t) * temp[i-1][j].x + t * temp[i-1][j+1].x;
                temp[i][j].y = (1.0 - t) * temp[i-1][j].y + t * temp[i-1][j+1].y;
            }
        }
        if (left != null)
            for (j = 0; j <= degree; j++) left[j]  = temp[j][0];
        if (right != null)
            for (j = 0; j <= degree; j++) right[j] = temp[degree-j][j];

        return (temp[degree][0]);
    };

    var _curveFunctionCache = {};
    var _getCurveFunctions = function(order) {
        var fns = _curveFunctionCache[order];
        if (!fns) {
            fns = [];
            var f_term = function() { return function(t) { return Math.pow(t, order); }; },
                l_term = function() { return function(t) { return Math.pow((1-t), order); }; },
                c_term = function(c) { return function(t) { return c; }; },
                t_term = function() { return function(t) { return t; }; },
                one_minus_t_term = function() { return function(t) { return 1-t; }; },
                _termFunc = function(terms) {
                    return function(t) {
                        var p = 1;
                        for (var i = 0; i < terms.length; i++) p = p * terms[i](t);
                        return p;
                    };
                };

            fns.push(new f_term());  // first is t to the power of the curve order
            for (var i = 1; i < order; i++) {
                var terms = [new c_term(order)];
                for (var j = 0 ; j < (order - i); j++) terms.push(new t_term());
                for (var j = 0 ; j < i; j++) terms.push(new one_minus_t_term());
                fns.push(new _termFunc(terms));
            }
            fns.push(new l_term());  // last is (1-t) to the power of the curve order

            _curveFunctionCache[order] = fns;
        }

        return fns;
    };


    /**
     * calculates a point on the curve, for a Bezier of arbitrary order.
     * @param curve an array of control points, eg [{x:10,y:20}, {x:50,y:50}, {x:100,y:100}, {x:120,y:100}].  For a cubic bezier this should have four points.
     * @param location a decimal indicating the distance along the curve the point should be located at.  this is the distance along the curve as it travels, taking the way it bends into account.  should be a number from 0 to 1, inclusive.
     */
    var _pointOnPath = function(curve, location) {
        var cc = _getCurveFunctions(curve.length - 1),
            _x = 0, _y = 0;
        for (var i = 0; i < curve.length ; i++) {
            _x = _x + (curve[i].x * cc[i](location));
            _y = _y + (curve[i].y * cc[i](location));
        }

        return {x:_x, y:_y};
    };

    var _dist = function(p1,p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    var _isPoint = function(curve) {
        return curve[0].x == curve[1].x && curve[0].y == curve[1].y;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.  this method returns both the x,y location of the point and also
     * its 'location' (proportion of travel along the path); the method below - _pointAlongPathFrom - calls this method and just returns the
     * point.
     */
    var _pointAlongPath = function(curve, location, distance) {

        if (_isPoint(curve)) {
            return {
                point:curve[0],
                location:location
            };
        }

        var prev = _pointOnPath(curve, location),
            tally = 0,
            curLoc = location,
            direction = distance > 0 ? 1 : -1,
            cur = null;

        while (tally < Math.abs(distance)) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        return {point:cur, location:curLoc};
    };

    var _length = function(curve) {
        if (_isPoint(curve)) return 0;

        var prev = _pointOnPath(curve, 0),
            tally = 0,
            curLoc = 0,
            direction = 1,
            cur = null;

        while (curLoc < 1) {
            curLoc += (0.005 * direction);
            cur = _pointOnPath(curve, curLoc);
            tally += _dist(cur, prev);
            prev = cur;
        }
        return tally;
    };

    /**
     * finds the point that is 'distance' along the path from 'location'.
     */
    var _pointAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).point;
    };

    /**
     * finds the location that is 'distance' along the path from 'location'.
     */
    var _locationAlongPathFrom = function(curve, location, distance) {
        return _pointAlongPath(curve, location, distance).location;
    };

    /**
     * returns the gradient of the curve at the given location, which is a decimal between 0 and 1 inclusive.
     *
     * thanks // http://bimixual.org/AnimationLibrary/beziertangents.html
     */
    var _gradientAtPoint = function(curve, location) {
        var p1 = _pointOnPath(curve, location),
            p2 = _pointOnPath(curve.slice(0, curve.length - 1), location),
            dy = p2.y - p1.y, dx = p2.x - p1.x;
        return dy == 0 ? Infinity : Math.atan(dy / dx);
    };

    /**
     returns the gradient of the curve at the point which is 'distance' from the given location.
     if this point is greater than location 1, the gradient at location 1 is returned.
     if this point is less than location 0, the gradient at location 0 is returned.
     */
    var _gradientAtPointAlongPathFrom = function(curve, location, distance) {
        var p = _pointAlongPath(curve, location, distance);
        if (p.location > 1) p.location = 1;
        if (p.location < 0) p.location = 0;
        return _gradientAtPoint(curve, p.location);
    };

    /**
     * calculates a line that is 'length' pixels long, perpendicular to, and centered on, the path at 'distance' pixels from the given location.
     * if distance is not supplied, the perpendicular for the given location is computed (ie. we set distance to zero).
     */
    var _perpendicularToPathAt = function(curve, location, length, distance) {
        distance = distance == null ? 0 : distance;
        var p = _pointAlongPath(curve, location, distance),
            m = _gradientAtPoint(curve, p.location),
            _theta2 = Math.atan(-1 / m),
            y =  length / 2 * Math.sin(_theta2),
            x =  length / 2 * Math.cos(_theta2);
        return [{x:p.point.x + x, y:p.point.y + y}, {x:p.point.x - x, y:p.point.y - y}];
    };

    this.jsBezier = {
        distanceFromCurve : _distanceFromCurve,
        gradientAtPoint : _gradientAtPoint,
        gradientAtPointAlongCurveFrom : _gradientAtPointAlongPathFrom,
        nearestPointOnCurve : _nearestPointOnCurve,
        pointOnCurve : _pointOnPath,
        pointAlongCurveFrom : _pointAlongPathFrom,
        perpendicularToCurveAt : _perpendicularToPathAt,
        locationAlongCurveFrom:_locationAlongPathFrom,
        getLength:_length
    };
}).call(this);

/**
 * Biltong v0.2
 *
 * Various geometry functions written as part of jsPlumb and perhaps useful for others.
 *
 * Copyright (c) 2014 Simon Porritt
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
;(function() {

	
	"use strict";

	var Biltong = this.Biltong = {};

	var _isa = function(a) { return Object.prototype.toString.call(a) === "[object Array]"; },
		_pointHelper = function(p1, p2, fn) {
		    p1 = _isa(p1) ? p1 : [p1.x, p1.y];
		    p2 = _isa(p2) ? p2 : [p2.x, p2.y];    
		    return fn(p1, p2);
		},
		/**
		* @name Biltong.gradient
		* @function
		* @desc Calculates the gradient of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a line between the two points.
		*/
		_gradient = Biltong.gradient = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) { 
		        if (_p2[0] == _p1[0])
		            return _p2[1] > _p1[1] ? Infinity : -Infinity;
		        else if (_p2[1] == _p1[1]) 
		            return _p2[0] > _p1[0] ? 0 : -0;
		        else 
		            return (_p2[1] - _p1[1]) / (_p2[0] - _p1[0]); 
		    });		
		},
		/**
		* @name Biltong.normal
		* @function
		* @desc Calculates the gradient of a normal to a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The gradient of a normal to a line between the two points.
		*/
		_normal = Biltong.normal = function(p1, p2) {
		    return -1 / _gradient(p1, p2);
		},
		/**
		* @name Biltong.lineLength
		* @function
		* @desc Calculates the length of a line between the two points.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The length of a line between the two points.
		*/
		_lineLength = Biltong.lineLength = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        return Math.sqrt(Math.pow(_p2[1] - _p1[1], 2) + Math.pow(_p2[0] - _p1[0], 2));			
		    });
		},
		/**
		* @name Biltong.quadrant
		* @function
		* @desc Calculates the quadrant in which the angle between the two points lies. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Integer} The quadrant - 1 for upper right, 2 for lower right, 3 for lower left, 4 for upper left.
		*/
		_quadrant = Biltong.quadrant = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        if (_p2[0] > _p1[0]) {
		            return (_p2[1] > _p1[1]) ? 2 : 1;
		        }
		        else if (_p2[0] == _p1[0]) {
		            return _p2[1] > _p1[1] ? 2 : 1;    
		        }
		        else {
		            return (_p2[1] > _p1[1]) ? 3 : 4;
		        }
		    });
		},
		/**
		* @name Biltong.theta
		* @function
		* @desc Calculates the angle between the two points. 
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Float} The angle between the two points.
		*/
		_theta = Biltong.theta = function(p1, p2) {
		    return _pointHelper(p1, p2, function(_p1, _p2) {
		        var m = _gradient(_p1, _p2),
		            t = Math.atan(m),
		            s = _quadrant(_p1, _p2);
		        if ((s == 4 || s== 3)) t += Math.PI;
		        if (t < 0) t += (2 * Math.PI);
		    
		        return t;
		    });
		},
		/**
		* @name Biltong.intersects
		* @function
		* @desc Calculates whether or not the two rectangles intersect.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @return {Boolean} True if the rectangles intersect, false otherwise.
		*/
		_intersects = Biltong.intersects = function(r1, r2) {
		    var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;
		
			return  ( (x1 <= a1 && a1 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a2 && a2 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
			        ( (x1 <= a1 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
			        ( (x1 <= a2 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||	
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x2 && x2 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
			        ( (a1 <= x1 && x1 <= a2) && (b1 <= y2 && y2 <= b2) ) ||
			        ( (a1 <= x2 && x1 <= a2) && (b1 <= y2 && y2 <= b2) );
		},
		/**
		* @name Biltong.encloses
		* @function
		* @desc Calculates whether or not r2 is completely enclosed by r1.
		* @param {Rectangle} r1 First rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Rectangle} r2 Second rectangle, as a js object in the form `{x:.., y:.., w:.., h:..}`
		* @param {Boolean} [allowSharedEdges=false] If true, the concept of enclosure allows for one or more edges to be shared by the two rectangles.
		* @return {Boolean} True if r1 encloses r2, false otherwise.
		*/
		_encloses = Biltong.encloses = function(r1, r2, allowSharedEdges) {
			var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
		        a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h,
				c = function(v1, v2, v3, v4) { return allowSharedEdges ? v1 <= v2 && v3>= v4 : v1 < v2 && v3 > v4; };
				
			return c(x1,a1,x2,a2) && c(y1,b1,y2,b2);
		},
		_segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1] ],
		_inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1] ],
		/**
		* @name Biltong.pointOnLine
		* @function
		* @desc Calculates a point on the line from `fromPoint` to `toPoint` that is `distance` units along the length of the line.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Point} Point on the line, in the form `{ x:..., y:... }`.
		*/
		_pointOnLine = Biltong.pointOnLine = function(fromPoint, toPoint, distance) {
		    var m = _gradient(fromPoint, toPoint),
		        s = _quadrant(fromPoint, toPoint),
		        segmentMultiplier = distance > 0 ? _segmentMultipliers[s] : _inverseSegmentMultipliers[s],
		        theta = Math.atan(m),
		        y = Math.abs(distance * Math.sin(theta)) * segmentMultiplier[1],
		        x =  Math.abs(distance * Math.cos(theta)) * segmentMultiplier[0];
		    return { x:fromPoint.x + x, y:fromPoint.y + y };
		},
		/**
		* @name Biltong.perpendicularLineTo
		* @function
		* @desc Calculates a line of length `length` that is perpendicular to the line from `fromPoint` to `toPoint` and passes through `toPoint`.
		* @param {Point} p1 First point, either as a 2 entry array or object with `left` and `top` properties.
		* @param {Point} p2 Second point, either as a 2 entry array or object with `left` and `top` properties.
		* @return {Line} Perpendicular line, in the form `[ { x:..., y:... }, { x:..., y:... } ]`.
		*/        
		_perpendicularLineTo = Biltong.perpendicularLineTo = function(fromPoint, toPoint, length) {
		    var m = _gradient(fromPoint, toPoint),
		        theta2 = Math.atan(-1 / m),
		        y =  length / 2 * Math.sin(theta2),
		        x =  length / 2 * Math.cos(theta2);
		    return [{x:toPoint.x + x, y:toPoint.y + y}, {x:toPoint.x - x, y:toPoint.y - y}];
		};	
}).call(this);
;
(function () {

    "use strict";

    var Sniff = {
        android: navigator.userAgent.toLowerCase().indexOf("android") > -1
    };

    var matchesSelector = function (el, selector, ctx) {
            ctx = ctx || el.parentNode;
            var possibles = ctx.querySelectorAll(selector);
            for (var i = 0; i < possibles.length; i++) {
                if (possibles[i] === el) {
                    return true;
                }
            }
            return false;
        },
        _gel = function (el) {
            return typeof el == "string" ? document.getElementById(el) : el;
        },
        _t = function (e) {
            return e.srcElement || e.target;
        },
        _d = function (l, fn) {
            for (var i = 0, j = l.length; i < j; i++) {
                if (l[i] == fn) break;
            }
            if (i < l.length) l.splice(i, 1);
        },
        guid = 1,
    //
    // this function generates a guid for every handler, sets it on the handler, then adds
    // it to the associated object's map of handlers for the given event. this is what enables us
    // to unbind all events of some type, or all events (the second of which can be requested by the user,
    // but it also used by Mottle when an element is removed.)
        _store = function (obj, event, fn) {
            var g = guid++;
            obj.__ta = obj.__ta || {};
            obj.__ta[event] = obj.__ta[event] || {};
            // store each handler with a unique guid.
            obj.__ta[event][g] = fn;
            // set the guid on the handler.
            fn.__tauid = g;
            return g;
        },
        _unstore = function (obj, event, fn) {
            obj.__ta && obj.__ta[event] && delete obj.__ta[event][fn.__tauid];
            // a handler might have attached extra functions, so we unbind those too.
            if (fn.__taExtra) {
                for (var i = 0; i < fn.__taExtra.length; i++) {
                    _unbind(obj, fn.__taExtra[i][0], fn.__taExtra[i][1]);
                }
                fn.__taExtra.length = 0;
            }
            // a handler might have attached an unstore callback
            fn.__taUnstore && fn.__taUnstore();
        },
        _curryChildFilter = function (children, obj, fn, evt) {
            if (children == null) return fn;
            else {
                var c = children.split(","),
                    _fn = function (e) {
                        _fn.__tauid = fn.__tauid;
                        var t = _t(e);
                        for (var i = 0; i < c.length; i++) {
                            if (matchesSelector(t, c[i], obj)) {
                                fn.apply(t, arguments);
                            }
                        }
                    };
                registerExtraFunction(fn, evt, _fn);
                return _fn;
            }
        },
    //
    // registers an 'extra' function on some event listener function we were given - a function that we
    // created and bound to the element as part of our housekeeping, and which we want to unbind and remove
    // whenever the given function is unbound.
        registerExtraFunction = function (fn, evt, newFn) {
            fn.__taExtra = fn.__taExtra || [];
            fn.__taExtra.push([evt, newFn]);
        },
        DefaultHandler = function (obj, evt, fn, children) {
            if (isTouchDevice && touchMap[evt]) {
                var tfn = _curryChildFilter(children, obj, fn, touchMap[evt]);
                _bind(obj, touchMap[evt], tfn , fn);
            }
            if (evt === "focus" && obj.getAttribute("tabindex") == null) {
                obj.setAttribute("tabindex", "1");
            }
            _bind(obj, evt, _curryChildFilter(children, obj, fn, evt), fn);
        },
        SmartClickHandler = function (obj, evt, fn, children) {
            if (obj.__taSmartClicks == null) {
                var down = function (e) {
                        obj.__tad = _pageLocation(e);
                    },
                    up = function (e) {
                        obj.__tau = _pageLocation(e);
                    },
                    click = function (e) {
                        if (obj.__tad && obj.__tau && obj.__tad[0] === obj.__tau[0] && obj.__tad[1] === obj.__tau[1]) {
                            for (var i = 0; i < obj.__taSmartClicks.length; i++)
                                obj.__taSmartClicks[i].apply(_t(e), [ e ]);
                        }
                    };
                DefaultHandler(obj, "mousedown", down, children);
                DefaultHandler(obj, "mouseup", up, children);
                DefaultHandler(obj, "click", click, children);
                obj.__taSmartClicks = [];
            }

            // store in the list of callbacks
            obj.__taSmartClicks.push(fn);
            // the unstore function removes this function from the object's listener list for this type.
            fn.__taUnstore = function () {
                _d(obj.__taSmartClicks, fn);
            };
        },
        _tapProfiles = {
            "tap": {touches: 1, taps: 1},
            "dbltap": {touches: 1, taps: 2},
            "contextmenu": {touches: 2, taps: 1}
        },
        TapHandler = function (clickThreshold, dblClickThreshold) {
            return function (obj, evt, fn, children) {
                // if event is contextmenu, for devices which are mouse only, we want to
                // use the default bind.
                if (evt == "contextmenu" && isMouseDevice)
                    DefaultHandler(obj, evt, fn, children);
                else {
                    // the issue here is that this down handler gets registered only for the
                    // child nodes in the first registration. in fact it should be registered with
                    // no child selector and then on down we should cycle through the regustered
                    // functions to see if one of them matches. on mouseup we should execute ALL of
                    // the functions whose children are either null or match the element.
                    if (obj.__taTapHandler == null) {
                        var tt = obj.__taTapHandler = {
                            tap: [],
                            dbltap: [],
                            contextmenu: [],
                            down: false,
                            taps: 0,
                            downSelectors: []
                        };
                        var down = function (e) {
                                var target = e.srcElement || e.target;
                                for (var i = 0; i < tt.downSelectors.length; i++) {
                                    if (tt.downSelectors[i] == null || matchesSelector(target, tt.downSelectors[i], obj)) {
                                        tt.down = true;
                                        setTimeout(clearSingle, clickThreshold);
                                        setTimeout(clearDouble, dblClickThreshold);
                                        break; // we only need one match on mousedown
                                    }
                                }
                            },
                            up = function (e) {
                                if (tt.down) {
                                    var target = e.srcElement || e.target;
                                    tt.taps++;
                                    var tc = _touchCount(e);
                                    for (var eventId in _tapProfiles) {
                                        if (_tapProfiles.hasOwnProperty(eventId)) {
                                            var p = _tapProfiles[eventId];
                                            if (p.touches === tc && (p.taps === 1 || p.taps === tt.taps)) {
                                                for (var i = 0; i < tt[eventId].length; i++) {
                                                    if (tt[eventId][i][1] == null || matchesSelector(target, tt[eventId][i][1], obj))
                                                        tt[eventId][i][0].apply(_t(e), [ e ]);
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            clearSingle = function () {
                                tt.down = false;
                            },
                            clearDouble = function () {
                                tt.taps = 0;
                            };

                        DefaultHandler(obj, "mousedown", down/*, children*/);
                        DefaultHandler(obj, "mouseup", up/*, children*/);
                    }
                    // add this child selector (it can be null, that's fine).
                    obj.__taTapHandler.downSelectors.push(children);

                    obj.__taTapHandler[evt].push([fn, children]);
                    // the unstore function removes this function from the object's listener list for this type.
                    fn.__taUnstore = function () {
                        _d(obj.__taTapHandler[evt], fn);
                    };
                }
            };
        },
        meeHelper = function (type, evt, obj, target) {
            for (var i in obj.__tamee[type]) {
                if (obj.__tamee[type].hasOwnProperty(i)) {
                    obj.__tamee[type][i].apply(target, [ evt ]);
                }
            }
        },
        MouseEnterExitHandler = function () {
            var activeElements = [];
            return function (obj, evt, fn, children) {
                if (!obj.__tamee) {
                    // __tamee holds a flag saying whether the mouse is currently "in" the element, and a list of
                    // both mouseenter and mouseexit functions.
                    obj.__tamee = { over: false, mouseenter: [], mouseexit: [] };
                    // register over and out functions
                    var over = function (e) {
                            var t = _t(e);
                            if ((children == null && (t == obj && !obj.__tamee.over)) || (matchesSelector(t, children, obj) && (t.__tamee == null || !t.__tamee.over))) {
                                meeHelper("mouseenter", e, obj, t);
                                t.__tamee = t.__tamee || {};
                                t.__tamee.over = true;
                                activeElements.push(t);
                            }
                        },
                        out = function (e) {
                            var t = _t(e);
                            // is the current target one of the activeElements? and is the
                            // related target NOT a descendant of it?
                            for (var i = 0; i < activeElements.length; i++) {
                                if (t == activeElements[i] && !matchesSelector((e.relatedTarget || e.toElement), "*", t)) {
                                    t.__tamee.over = false;
                                    activeElements.splice(i, 1);
                                    meeHelper("mouseexit", e, obj, t);
                                }
                            }
                        };

                    _bind(obj, "mouseover", _curryChildFilter(children, obj, over, "mouseover"), over);
                    _bind(obj, "mouseout", _curryChildFilter(children, obj, out, "mouseout"), out);
                }

                fn.__taUnstore = function () {
                    delete obj.__tamee[evt][fn.__tauid];
                };

                _store(obj, evt, fn);
                obj.__tamee[evt][fn.__tauid] = fn;
            };
        },
        isTouchDevice = "ontouchstart" in document.documentElement,
        isMouseDevice = "onmousedown" in document.documentElement,
        touchMap = { "mousedown": "touchstart", "mouseup": "touchend", "mousemove": "touchmove" },
        touchstart = "touchstart", touchend = "touchend", touchmove = "touchmove",
        iev = (function () {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        isIELT9 = iev > -1 && iev < 9,
        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                return _genLoc(e, "page");
            }
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _touchCount = function (e) {
            return _touches(e).length;
        },
    //http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
        _bind = function (obj, type, fn, originalFn) {
            _store(obj, type, fn);
            originalFn.__tauid = fn.__tauid;
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                var key = type + fn.__tauid;
                obj["e" + key] = fn;
                // TODO look at replacing with .call(..)
                obj[key] = function () {
                    obj["e" + key] && obj["e" + key](window.event);
                };
                obj.attachEvent("on" + type, obj[key]);
            }
        },
        _unbind = function (obj, type, fn) {
            if (fn == null) return;
            _each(obj, function () {
                var _el = _gel(this);
                _unstore(_el, type, fn);
                // it has been bound if there is a tauid. otherwise it was not bound and we can ignore it.
                if (fn.__tauid != null) {
                    if (_el.removeEventListener) {
                        _el.removeEventListener(type, fn, false);
                        if (isTouchDevice && touchMap[type]) _el.removeEventListener(touchMap[type], fn, false);
                    }
                    else if (this.detachEvent) {
                        var key = type + fn.__tauid;
                        _el[key] && _el.detachEvent("on" + type, _el[key]);
                        _el[key] = null;
                        _el["e" + key] = null;
                    }
                }

                // if a touch event was also registered, deregister now.
                if (fn.__taTouchProxy) {
                    _unbind(obj, fn.__taTouchProxy[1], fn.__taTouchProxy[0]);
                }
            });
        },
        _devNull = function () {
        },
        _each = function (obj, fn) {
            if (obj == null) return;
            // if a list (or list-like), use it. if a string, get a list
            // by running the string through querySelectorAll. else, assume
            // it's an Element.
            // obj.top is "unknown" in IE8.
            obj = (typeof Window !== "undefined" && (typeof obj.top !== "unknown" && obj == obj.top)) ? [ obj ] :
                    (typeof obj !== "string") && (obj.tagName == null && obj.length != null) ? obj :
                    typeof obj === "string" ? document.querySelectorAll(obj)
                : [ obj ];

            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i]);
        };

    /**
     * Mottle offers support for abstracting out the differences
     * between touch and mouse devices, plus "smart click" functionality
     * (don't fire click if the mouse has moved between mousedown and mouseup),
     * and synthesized click/tap events.
     * @class Mottle
     * @constructor
     * @param {Object} params Constructor params
     * @param {Integer} [params.clickThreshold=150] Threshold, in milliseconds beyond which a touchstart followed by a touchend is not considered to be a click.
     * @param {Integer} [params.dblClickThreshold=350] Threshold, in milliseconds beyond which two successive tap events are not considered to be a click.
     * @param {Boolean} [params.smartClicks=false] If true, won't fire click events if the mouse has moved between mousedown and mouseup. Note that this functionality
     * requires that Mottle consume the mousedown event, and so may not be viable in all use cases.
     */
    this.Mottle = function (params) {
        params = params || {};
        var clickThreshold = params.clickThreshold || 150,
            dblClickThreshold = params.dblClickThreshold || 350,
            mouseEnterExitHandler = new MouseEnterExitHandler(),
            tapHandler = new TapHandler(clickThreshold, dblClickThreshold),
            _smartClicks = params.smartClicks,
            _doBind = function (obj, evt, fn, children) {
                if (fn == null) return;
                _each(obj, function () {
                    var _el = _gel(this);
                    if (_smartClicks && evt === "click")
                        SmartClickHandler(_el, evt, fn, children);
                    else if (evt === "tap" || evt === "dbltap" || evt === "contextmenu") {
                        tapHandler(_el, evt, fn, children);
                    }
                    else if (evt === "mouseenter" || evt == "mouseexit")
                        mouseEnterExitHandler(_el, evt, fn, children);
                    else
                        DefaultHandler(_el, evt, fn, children);
                });
            };

        /**
         * Removes an element from the DOM, and deregisters all event handlers for it. You should use this
         * to ensure you don't leak memory.
         * @method remove
         * @param {String|Element} el Element, or id of the element, to remove.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.remove = function (el) {
            _each(el, function () {
                var _el = _gel(this);
                if (_el.__ta) {
                    for (var evt in _el.__ta) {
                        if (_el.__ta.hasOwnProperty(evt)) {
                            for (var h in _el.__ta[evt]) {
                                if (_el.__ta[evt].hasOwnProperty(h))
                                    _unbind(_el, evt, _el.__ta[evt][h]);
                            }
                        }
                    }
                }
                _el.parentNode && _el.parentNode.removeChild(_el);
            });
            return this;
        };

        /**
         * Register an event handler, optionally as a delegate for some set of descendant elements. Note
         * that this method takes either 3 or 4 arguments - if you supply 3 arguments it is assumed you have
         * omitted the `children` parameter, and that the event handler should be bound directly to the given element.
         * @method on
         * @param {Element[]|Element|String} el Either an Element, or a CSS spec for a list of elements, or an array of Elements.
         * @param {String} [children] Comma-delimited list of selectors identifying allowed children.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.on = function (el, event, children, fn) {
            var _el = arguments[0],
                _c = arguments.length == 4 ? arguments[2] : null,
                _e = arguments[1],
                _f = arguments[arguments.length - 1];

            _doBind(_el, _e, _f, _c);
            return this;
        };

        /**
         * Cancel delegate event handling for the given function. Note that unlike with 'on' you do not supply
         * a list of child selectors here: it removes event delegation from all of the child selectors for which the
         * given function was registered (if any).
         * @method off
         * @param {Element[]|Element|String} el Element - or ID of element - from which to remove event listener.
         * @param {String} event Event ID.
         * @param {Function} fn Event handler function.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.off = function (el, event, fn) {
            _unbind(el, event, fn);
            return this;
        };

        /**
         * Triggers some event for a given element.
         * @method trigger
         * @param {Element} el Element for which to trigger the event.
         * @param {String} event Event ID.
         * @param {Event} originalEvent The original event. Should be optional of course, but currently is not, due
         * to the jsPlumb use case that caused this method to be added.
         * @param {Object} [payload] Optional object to set as `payload` on the generated event; useful for message passing.
         * @return {Mottle} The current Mottle instance; you can chain this method.
         */
        this.trigger = function (el, event, originalEvent, payload) {
            // MouseEvent undefined in old IE; that's how we know it's a mouse event.  A fine Microsoft paradox.
            var originalIsMouse = isMouseDevice && (typeof MouseEvent === "undefined" || originalEvent == null || originalEvent.constructor === MouseEvent);

            var eventToBind = (isTouchDevice && !isMouseDevice && touchMap[event]) ? touchMap[event] : event,
                bindingAMouseEvent = !(isTouchDevice && !isMouseDevice && touchMap[event]);

            var pl = _pageLocation(originalEvent), sl = _screenLocation(originalEvent), cl = _clientLocation(originalEvent);
            _each(el, function () {
                var _el = _gel(this), evt;
                originalEvent = originalEvent || {
                    screenX: sl[0],
                    screenY: sl[1],
                    clientX: cl[0],
                    clientY: cl[1]
                };

                var _decorate = function (_evt) {
                    if (payload) _evt.payload = payload;
                };

                var eventGenerators = {
                    "TouchEvent": function (evt) {
                        var touch = document.createTouch(window, _el, 0, pl[0], pl[1],
                            sl[0], sl[1],
                            cl[0], cl[1],
                            0, 0, 0, 0);

                        // https://gist.github.com/sstephenson/448808
                        var touches = document.createTouchList(touch);
                        var targetTouches = document.createTouchList(touch);
                        var changedTouches = document.createTouchList(touch);
                        evt.initTouchEvent(eventToBind, true, true, window, null, sl[0], sl[1],
                            cl[0], cl[1], false, false, false, false,
                            touches, targetTouches, changedTouches, 1, 0);
                    },
                    "MouseEvents": function (evt) {
                        evt.initMouseEvent(eventToBind, true, true, window, 0,
                            sl[0], sl[1],
                            cl[0], cl[1],
                            false, false, false, false, 1, _el);

                        if (Sniff.android) {
                            // Android's touch events are not standard.
                            var t = document.createTouch(window, _el, 0, pl[0], pl[1],
                                sl[0], sl[1],
                                cl[0], cl[1],
                                0, 0, 0, 0);

                            evt.touches = evt.targetTouches = evt.changedTouches = document.createTouchList(t);
                        }
                    }
                };

                if (document.createEvent) {

                    var ite = !bindingAMouseEvent && !originalIsMouse && (isTouchDevice && touchMap[event] && !Sniff.android),
                        evtName = ite ? "TouchEvent" : "MouseEvents";

                    evt = document.createEvent(evtName);
                    eventGenerators[evtName](evt);
                    _decorate(evt);
                    _el.dispatchEvent(evt);
                }
                else if (document.createEventObject) {
                    evt = document.createEventObject();
                    evt.eventType = evt.eventName = eventToBind;
                    evt.screenX = sl[0];
                    evt.screenY = sl[1];
                    evt.clientX = cl[0];
                    evt.clientY = cl[1];
                    _decorate(evt);
                    _el.fireEvent('on' + eventToBind, evt);
                }
            });
            return this;
        }
    };

    /**
     * Static method to assist in 'consuming' an element: uses `stopPropagation` where available, or sets `e.returnValue=false` where it is not.
     * @method Mottle.consume
     * @param {Event} e Event to consume
     * @param {Boolean} [doNotPreventDefault=false] If true, does not call `preventDefault()` on the event.
     */
    Mottle.consume = function (e, doNotPreventDefault) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.returnValue = false;

        if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
    };

    /**
     * Gets the page location corresponding to the given event. For touch events this means get the page location of the first touch.
     * @method Mottle.pageLocation
     * @param {Event} e Event to get page location for.
     * @return {Integer[]} [left, top] for the given event.
     */
    Mottle.pageLocation = _pageLocation;

    /**
     * Forces touch events to be turned "on". Useful for testing: even if you don't have a touch device, you can still
     * trigger a touch event when this is switched on and it will be captured and acted on.
     * @method setForceTouchEvents
     * @param {Boolean} value If true, force touch events to be on.
     */
    Mottle.setForceTouchEvents = function (value) {
        isTouchDevice = value;
    };

    /**
     * Forces mouse events to be turned "on". Useful for testing: even if you don't have a mouse, you can still
     * trigger a mouse event when this is switched on and it will be captured and acted on.
     * @method setForceMouseEvents
     * @param {Boolean} value If true, force mouse events to be on.
     */
    Mottle.setForceMouseEvents = function (value) {
        isMouseDevice = value;
    };

}).call(this);

/**
 drag/drop functionality for use with jsPlumb but with
 no knowledge of jsPlumb. supports multiple scopes (separated by whitespace), dragging
 multiple elements, constrain to parent, drop filters, drag start filters, custom
 css classes.

 a lot of the functionality of this script is expected to be plugged in:

 addClass
 removeClass

 addEvent
 removeEvent

 getPosition
 setPosition
 getSize

 indexOf
 intersects

 the name came from here:

 http://mrsharpoblunto.github.io/foswig.js/

 copyright 2015 jsPlumb
 */

;(function() {

    "use strict";

    Array.prototype.suggest = function(item, head) {
        if (this.indexOf(item) === -1) {
            head ? this.unshift(item) : this.push(item);
        }
    };

    Array.prototype.vanquish = function(item) {
        var idx = this.indexOf(item);
        if (idx != -1) this.splice(idx, 1);
    };

    var _isString = function(f) {
        return f == null ? false : (typeof f === "string" || f.constructor == String);
    };

    var getOffsetRect = function (elem) {
        // (1)
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docElem = document.documentElement,
        // (2)
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        // (3)
            clientTop = docElem.clientTop || body.clientTop || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
        // (4)
            top  = box.top +  scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    };

    var matchesSelector = function(el, selector, ctx) {
        ctx = ctx || el.parentNode;
        var possibles = ctx.querySelectorAll(selector);
        for (var i = 0; i < possibles.length; i++) {
            if (possibles[i] === el)
                return true;
        }
        return false;
    };

    var iev = (function() {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        DEFAULT_GRID_X = 50,
        DEFAULT_GRID_Y = 50,
        isIELT9 = iev > -1 && iev < 9,
        _pl = function(e) {
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                var ts = _touches(e), t = _getTouch(ts, 0);
                // this is for iPad. may not fly for Android.
                return [t.pageX, t.pageY];
            }
        },
        _getTouch = function(touches, idx) { return touches.item ? touches.item(idx) : touches[idx]; },
        _touches = function(e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        },
        _classes = {
            draggable:"katavorio-draggable",    // draggable elements
            droppable:"katavorio-droppable",    // droppable elements
            drag : "katavorio-drag",            // elements currently being dragged
            selected:"katavorio-drag-selected", // elements in current drag selection
            active : "katavorio-drag-active",   // droppables that are targets of a currently dragged element
            hover : "katavorio-drag-hover",     // droppables over which a matching drag element is hovering
            noSelect : "katavorio-drag-no-select" // added to the body to provide a hook to suppress text selection
        },
        _defaultScope = "katavorio-drag-scope",
        _events = [ "stop", "start", "drag", "drop", "over", "out", "beforeStart" ],
        _devNull = function() {},
        _true = function() { return true; },
        _foreach = function(l, fn, from) {
            for (var i = 0; i < l.length; i++) {
                if (l[i] != from)
                    fn(l[i]);
            }
        },
        _setDroppablesActive = function(dd, val, andHover, drag) {
            _foreach(dd, function(e) {
                e.setActive(val);
                if (val) e.updatePosition();
                if (andHover) e.setHover(drag, val);
            });
        },
        _each = function(obj, fn) {
            if (obj == null) return;
            obj = !_isString(obj) && (obj.tagName == null && obj.length != null) ? obj : [ obj ];
            for (var i = 0; i < obj.length; i++)
                fn.apply(obj[i], [ obj[i] ]);
        },
        _consume = function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        },
        _defaultInputFilterSelector = "input,textarea,select,button,option",
    //
    // filters out events on all input elements, like textarea, checkbox, input, select.
        _inputFilter = function(e, el, _katavorio) {
            var t = e.srcElement || e.target;
            return !matchesSelector(t, _katavorio.getInputFilterSelector(), el);
        };

    var Super = function(el, params, css, scope) {
        this.params = params || {};
        this.el = el;
        this.params.addClass(this.el, this._class);
        this.uuid = _uuid();
        var enabled = true;
        this.setEnabled = function(e) { enabled = e; };
        this.isEnabled = function() { return enabled; };
        this.toggleEnabled = function() { enabled = !enabled; };
        this.setScope = function(scopes) {
            this.scopes = scopes ? scopes.split(/\s+/) : [ scope ];
        };
        this.addScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { m[s] = true;});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.removeScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) { delete m[s];});
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.toggleScope = function(scopes) {
            var m = {};
            _each(this.scopes, function(s) { m[s] = true;});
            _each(scopes ? scopes.split(/\s+/) : [], function(s) {
                if (m[s]) delete m[s];
                else m[s] = true;
            });
            this.scopes = [];
            for (var i in m) this.scopes.push(i);
        };
        this.setScope(params.scope);
        this.k = params.katavorio;
        return params.katavorio;
    };

    var Drag = function(el, params, css, scope) {
        this._class = css.draggable;
        var k = Super.apply(this, arguments);
        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
        var downAt = [0,0], posAtDown = null, moving = false,
            consumeStartEvent = this.params.consumeStartEvent !== false,
            dragEl = this.el,
            clone = this.params.clone,
            scroll = this.params.scroll,
            _multipleDrop = params.multipleDrop !== false;

        var snapThreshold = params.snapThreshold || 5,
            _snap = function(pos, x, y, thresholdX, thresholdY) {
                thresholdX = thresholdX || snapThreshold;
                thresholdY = thresholdY || snapThreshold;
                var _dx = Math.floor(pos[0] / x),
                    _dxl = x * _dx,
                    _dxt = _dxl + x,
                    _x = Math.abs(pos[0] - _dxl) <= thresholdX ? _dxl : Math.abs(_dxt - pos[0]) <= thresholdX ? _dxt : pos[0];

                var _dy = Math.floor(pos[1] / y),
                    _dyl = y * _dy,
                    _dyt = _dyl + y,
                    _y = Math.abs(pos[1] - _dyl) <= thresholdY ? _dyl : Math.abs(_dyt - pos[1]) <= thresholdY ? _dyt : pos[1];

                return [ _x, _y];
            };

        this.posses = [];
        this.posseRoles = {};

        this.toGrid = function(pos) {
            if (this.params.grid == null) {
                return pos;
            }
            else {
                return _snap(pos, this.params.grid[0], this.params.grid[1]);
            }
        };

        this.snap = function(x, y) {
            if (dragEl == null) return;
            x = x || (this.params.grid ? this.params.grid[0] : DEFAULT_GRID_X);
            y = y || (this.params.grid ? this.params.grid[1] : DEFAULT_GRID_Y);
            var p = this.params.getPosition(dragEl);
            this.params.setPosition(dragEl, _snap(p, x, y, x, y));
        };

        this.constrain = typeof this.params.constrain === "function" ? this.params.constrain  : (this.params.constrain || this.params.containment) ? function(pos) {
            return [
                Math.max(0, Math.min(constrainRect.w - this.size[0], pos[0])),
                Math.max(0, Math.min(constrainRect.h - this.size[1], pos[1]))
            ];
        } : function(pos) { return pos; };

        var _assignId = function(obj) {
                if (typeof obj == "function") {
                    obj._katavorioId = _uuid();
                    return obj._katavorioId;
                } else {
                    return obj;
                }
            },
        // a map of { spec -> [ fn, exclusion ] } entries.
            _filters = {},
            _testFilter = function(e) {
                for (var key in _filters) {
                    var f = _filters[key];
                    var rv = f[0](e);
                    if (f[1]) rv = !rv;
                    if (!rv) return false;
                }
                return true;
            },
            _setFilter = this.setFilter = function(f, _exclude) {
                if (f) {
                    var key = _assignId(f);
                    _filters[key] = [
                        function(e) {
                            var t = e.srcElement || e.target, m;
                            if (_isString(f)) {
                                m = matchesSelector(t, f, el);
                            }
                            else if (typeof f === "function") {
                                m = f(e, el);
                            }
                            return m;
                        },
                            _exclude !== false
                    ];

                }
            },
            _addFilter = this.addFilter = _setFilter,
            _removeFilter = this.removeFilter = function(f) {
                var key = typeof f == "function" ? f._katavorioId : f;
                delete _filters[key];
            };

        this.clearAllFilters = function() {
            _filters = {};
        };

        this.canDrag = this.params.canDrag || _true;

        var constrainRect,
            matchingDroppables = [], intersectingDroppables = [];

        this.downListener = function(e) {
            var isNotRightClick = this.rightButtonCanDrag || (e.which !== 3 && e.button !== 2);
            if (isNotRightClick && this.isEnabled() && this.canDrag()) {
                var _f =  _testFilter(e) && _inputFilter(e, this.el, this.k);
                if (_f) {
                    if (!clone)
                        dragEl = this.el;
                    else {
                        dragEl = this.el.cloneNode(true);
                        dragEl.setAttribute("id", null);
                        dragEl.style.position = "absolute";
                        // the clone node is added to the body; getOffsetRect gives us a value
                        // relative to the body.
                        var b = getOffsetRect(this.el);
                        dragEl.style.left = b.left + "px";
                        dragEl.style.top = b.top + "px";
                        document.body.appendChild(dragEl);
                    }
                    consumeStartEvent && _consume(e);
                    downAt = _pl(e);
                    //
                    this.params.bind(document, "mousemove", this.moveListener);
                    this.params.bind(document, "mouseup", this.upListener);
                    k.markSelection(this);
                    k.markPosses(this);
                    this.params.addClass(document.body, css.noSelect);
                    _dispatch("beforeStart", {el:this.el, pos:posAtDown, e:e, drag:this});
                }
                else if (this.params.consumeFilteredEvents) {
                    _consume(e);
                }
            }
        }.bind(this);

        this.moveListener = function(e) {
            if (downAt) {
                if (!moving) {
                    var _continue = _dispatch("start", {el:this.el, pos:posAtDown, e:e, drag:this});
                    if (_continue !== false) {
                        if (!downAt) return;
                        this.mark(true);
                        moving = true;
                    }
                }

                // it is possible that the start event caused the drag to be aborted. So we check
                // again that we are currently dragging.
                if (downAt) {
                    intersectingDroppables.length = 0;
                    var pos = _pl(e), dx = pos[0] - downAt[0], dy = pos[1] - downAt[1],
                        z = this.params.ignoreZoom ? 1 : k.getZoom();
                    dx /= z;
                    dy /= z;
                    this.moveBy(dx, dy, e);
                    k.updateSelection(dx, dy, this);
                    k.updatePosses(dx, dy, this);
                }
            }
        }.bind(this);

        this.upListener = function(e) {
            if (downAt) {
                downAt = null;
                this.params.unbind(document, "mousemove", this.moveListener);
                this.params.unbind(document, "mouseup", this.upListener);
                this.params.removeClass(document.body, css.noSelect);
                this.unmark(e);
                k.unmarkSelection(this, e);
                k.unmarkPosses(this, e);
                this.stop(e);
                k.notifySelectionDragStop(this, e);
                moving = false;
                if (clone) {
                    dragEl && dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
                    dragEl = null;
                }
            }
        }.bind(this);

        this.getFilters = function() { return _filters; };

        this.abort = function() {
            if (downAt != null)
                this.upListener();
        };

        this.getDragElement = function() {
            return dragEl || this.el;
        };

        var listeners = {"start":[], "drag":[], "stop":[], "over":[], "out":[], "beforeStart":[] };
        if (params.events.start) listeners.start.push(params.events.start);
        if (params.events.beforeStart) listeners.beforeStart.push(params.events.beforeStart);
        if (params.events.stop) listeners.stop.push(params.events.stop);
        if (params.events.drag) listeners.drag.push(params.events.drag);

        this.on = function(evt, fn) {
            if (listeners[evt]) listeners[evt].push(fn);
        };

        var _dispatch = function(evt, value) {
            if (listeners[evt]) {
                for (var i = 0; i < listeners[evt].length; i++) {
                    try {
                        listeners[evt][i](value);
                    }
                    catch (e) { }
                }
            }
        };

        this.notifyStart = function(e) {
            _dispatch("start", {el:this.el, pos:this.params.getPosition(dragEl), e:e, drag:this});
        };

        this.stop = function(e, force) {
            if (force || moving) {
                var positions = [],
                    sel = k.getSelection(),
                    dPos = this.params.getPosition(dragEl);

                if (sel.length > 1) {
                    for (var i = 0; i < sel.length; i++) {
                        var p = this.params.getPosition(sel[i].el);
                        positions.push([ sel[i].el, { left: p[0], top: p[1] }, sel[i] ]);
                    }
                }
                else {
                    positions.push([ dragEl, {left:dPos[0], top:dPos[1]}, this ]);
                }

                _dispatch("stop", {
                    el: dragEl, pos: dPos, e: e, drag: this, selection:positions
                });
            }
        };

        this.mark = function(andNotify) {
            posAtDown = this.params.getPosition(dragEl);
            this.size = this.params.getSize(dragEl);
            matchingDroppables = k.getMatchingDroppables(this);
            _setDroppablesActive(matchingDroppables, true, false, this);
            this.params.addClass(dragEl, this.params.dragClass || css.drag);
            if (this.params.constrain || this.params.containment) {
                var cs = this.params.getSize(dragEl.parentNode);
                constrainRect = { w:cs[0], h:cs[1] };
            }
            if (andNotify) {
                k.notifySelectionDragStart(this);
            }
        };
        this.unmark = function(e) {
            _setDroppablesActive(matchingDroppables, false, true, this);
            this.params.removeClass(dragEl, this.params.dragClass || css.drag);
            matchingDroppables.length = 0;
            for (var i = 0; i < intersectingDroppables.length; i++) {
                var retVal = intersectingDroppables[i].drop(this, e);
                if (retVal === true) break;
            }
        };
        this.moveBy = function(dx, dy, e) {
            intersectingDroppables.length = 0;
            var cPos = this.constrain(this.toGrid(([posAtDown[0] + dx, posAtDown[1] + dy])), dragEl),
                rect = { x:cPos[0], y:cPos[1], w:this.size[0], h:this.size[1]},
                focusDropElement = null;

            this.params.setPosition(dragEl, cPos);
            for (var i = 0; i < matchingDroppables.length; i++) {
                var r2 = { x:matchingDroppables[i].position[0], y:matchingDroppables[i].position[1], w:matchingDroppables[i].size[0], h:matchingDroppables[i].size[1]};
                if (this.params.intersects(rect, r2) && (_multipleDrop || focusDropElement == null || focusDropElement == matchingDroppables[i].el) && matchingDroppables[i].canDrop(this)) {
                    if (!focusDropElement) focusDropElement = matchingDroppables[i].el;
                    intersectingDroppables.push(matchingDroppables[i]);
                    matchingDroppables[i].setHover(this, true, e);
                }
                else if (matchingDroppables[i].isHover()) {
                    matchingDroppables[i].setHover(this, false, e);
                }
            }

            _dispatch("drag", {el:this.el, pos:cPos, e:e, drag:this});

            /* test to see if the parent needs to be scrolled
             if (scroll) {
             var pnsl = dragEl.parentNode.scrollLeft, pnst = dragEl.parentNode.scrollTop;
             console.log("scroll!", pnsl, pnst);
             }*/
        };
        this.destroy = function() {
            this.params.unbind(this.el, "mousedown", this.downListener);
            this.params.unbind(document, "mousemove", this.moveListener);
            this.params.unbind(document, "mouseup", this.upListener);
            this.downListener = null;
            this.upListener = null;
            this.moveListener = null;
            //this.params = null;
            //this.el = null;
            //dragEl = null;
        };

        // init:register mousedown, and perhaps set a filter
        this.params.bind(this.el, "mousedown", this.downListener);

        // if handle provded, use that.  otherwise, try to set a filter.
        // note that a `handle` selector always results in filterExclude being set to false, ie.
        // the selector defines the handle element(s).
        if (this.params.handle)
            _setFilter(this.params.handle, false);
        else
            _setFilter(this.params.filter, this.params.filterExclude);
    };

    var Drop = function(el, params, css, scope) {
        this._class = css.droppable;
        this.params = params || {};
        this._activeClass = params.activeClass || css.active;
        this._hoverClass = params.hoverClass || css.hover;
        Super.apply(this, arguments);
        var hover = false;

        this.setActive = function(val) {
            this.params[val ? "addClass" : "removeClass"](this.el, this._activeClass);
        };

        this.updatePosition = function() {
            this.position = this.params.getPosition(this.el);
            this.size = this.params.getSize(this.el);
        };

        this.canDrop = this.params.canDrop || function(drag) {
            return true;
        };

        this.isHover = function() { return hover; };

        this.setHover = function(drag, val, e) {
            // if turning off hover but this was not the drag that caused the hover, ignore.
            if (val || this.el._katavorioDragHover == null || this.el._katavorioDragHover == drag.el._katavorio) {
                this.params[val ? "addClass" : "removeClass"](this.el, this._hoverClass);
                //this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                this.el._katavorioDragHover = val ? drag.el._katavorio : null;
                if (hover !== val)
                    this.params.events[val ? "over" : "out"]({el:this.el, e:e, drag:drag, drop:this});
                hover = val;
            }
        };

        this.drop = function(drag, event) {
            return this.params.events["drop"]({ drag:drag, e:event, drop:this });
        };

        this.destroy = function() {
            this._class = null;
            this._activeClass = null;
            this._hoverClass = null;
            //this.params = null;
            hover = null;
            //this.el = null;
        };
    };

    var _uuid = function() {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    };

    var _gel = function(el) {
        if (el == null) return null;
        el = (typeof el === "string" || el.constructor == String)  ? document.getElementById(el) : el;
        if (el == null) return null;
        el._katavorio = el._katavorio || _uuid();
        return el;
    };

    this.Katavorio = function(katavorioParams) {

        var _selection = [],
            _selectionMap = {};

        this._dragsByScope = {};
        this._dropsByScope = {};
        var _zoom = 1,
            _reg = function(obj, map) {
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        map[_obj.scopes[i]] = map[_obj.scopes[i]] || [];
                        map[_obj.scopes[i]].push(_obj);
                    }
                });
            },
            _unreg = function(obj, map) {
                var c = 0;
                _each(obj, function(_obj) {
                    for(var i = 0; i < _obj.scopes.length; i++) {
                        if (map[_obj.scopes[i]]) {
                            var idx = katavorioParams.indexOf(map[_obj.scopes[i]], _obj);
                            if (idx != -1) {
                                map[_obj.scopes[i]].splice(idx, 1);
                                c++;
                            }
                        }
                    }
                });

                return c > 0 ;
            },
            _getMatchingDroppables = this.getMatchingDroppables = function(drag) {
                var dd = [], _m = {};
                for (var i = 0; i < drag.scopes.length; i++) {
                    var _dd = this._dropsByScope[drag.scopes[i]];
                    if (_dd) {
                        for (var j = 0; j < _dd.length; j++) {
                            if (_dd[j].canDrop(drag) &&  !_m[_dd[j].uuid]/* && _dd[j].el !== drag.el*/) {
                                _m[_dd[j].uuid] = true;
                                dd.push(_dd[j]);
                            }
                        }
                    }
                }
                return dd;
            },
            _prepareParams = function(p) {
                p = p || {};
                var _p = {
                    events:{}
                }, i;
                for (i in katavorioParams) _p[i] = katavorioParams[i];
                for (i in p) _p[i] = p[i];
                // events

                for (i = 0; i < _events.length; i++) {
                    _p.events[_events[i]] = p[_events[i]] || _devNull;
                }
                _p.katavorio = this;
                return _p;
            }.bind(this),
            _mistletoe = function(existingDrag, params) {
                for (var i = 0; i < _events.length; i++) {
                    if (params[_events[i]]) {
                        existingDrag.on(_events[i], params[_events[i]]);
                    }
                }
            }.bind(this),
            _css = {},
            overrideCss = katavorioParams.css || {},
            _scope = katavorioParams.scope || _defaultScope;

        // prepare map of css classes based on defaults frst, then optional overrides
        for (var i in _classes) _css[i] = _classes[i];
        for (var i in overrideCss) _css[i] = overrideCss[i];

        var inputFilterSelector = katavorioParams.inputFilterSelector || _defaultInputFilterSelector;
        /**
         * Gets the selector identifying which input elements to filter from drag events.
         * @method getInputFilterSelector
         * @return {String} Current input filter selector.
         */
        this.getInputFilterSelector = function() { return inputFilterSelector; };

        /**
         * Sets the selector identifying which input elements to filter from drag events.
         * @method setInputFilterSelector
         * @param {String} selector Input filter selector to set.
         * @return {Katavorio} Current instance; method may be chained.
         */
        this.setInputFilterSelector = function(selector) {
            inputFilterSelector = selector;
            return this;
        };

        this.draggable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    if (_el._katavorioDrag == null) {
                        var p = _prepareParams(params);
                        _el._katavorioDrag = new Drag(_el, p, _css, _scope);
                        _reg(_el._katavorioDrag, this._dragsByScope);
                        o.push(_el._katavorioDrag);
                        katavorioParams.addClass(_el, _css.draggable);
                    }
                    else {
                        _mistletoe(_el._katavorioDrag, params);
                    }
                }
            }.bind(this));
            return o;

        };

        this.droppable = function(el, params) {
            var o = [];
            _each(el, function(_el) {
                _el = _gel(_el);
                if (_el != null) {
                    var drop = new Drop(_el, _prepareParams(params), _css, _scope);
                    _el._katavorioDrop = _el._katavorioDrop || [];
                    _el._katavorioDrop.push(drop);
                    _reg(drop, this._dropsByScope);
                    o.push(drop);
                    katavorioParams.addClass(_el, _css.droppable);
                }
            }.bind(this));
            return o;
        };

        /**
         * @name Katavorio#select
         * @function
         * @desc Adds an element to the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to add.
         */
        this.select = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorioDrag) {
                    if (!_selectionMap[_el._katavorio]) {
                        _selection.push(_el._katavorioDrag);
                        _selectionMap[_el._katavorio] = [ _el, _selection.length - 1 ];
                        katavorioParams.addClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        /**
         * @name Katavorio#deselect
         * @function
         * @desc Removes an element from the current selection (for multiple node drag)
         * @param {Element|String} DOM element - or id of the element - to remove.
         */
        this.deselect = function(el) {
            _each(el, function() {
                var _el = _gel(this);
                if (_el && _el._katavorio) {
                    var e = _selectionMap[_el._katavorio];
                    if (e) {
                        var _s = [];
                        for (var i = 0; i < _selection.length; i++)
                            if (_selection[i].el !== _el) _s.push(_selection[i]);
                        _selection = _s;
                        delete _selectionMap[_el._katavorio];
                        katavorioParams.removeClass(_el, _css.selected);
                    }
                }
            });
            return this;
        };

        this.deselectAll = function() {
            for (var i in _selectionMap) {
                var d = _selectionMap[i];
                katavorioParams.removeClass(d[0], _css.selected);
            }

            _selection.length = 0;
            _selectionMap = {};
        };

        this.markSelection = function(drag) {
            _foreach(_selection, function(e) { e.mark(); }, drag);
        };

        this.markPosses = function(drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.mark();
                        }, drag);
                    }
                })
            }
        };

        this.unmarkSelection = function(drag, event) {
            _foreach(_selection, function(e) { e.unmark(event); }, drag);
        };

        this.unmarkPosses = function(drag, event) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (d) {
                            d.unmark(event);
                        }, drag);
                    }
                });
            }
        };

        this.getSelection = function() { return _selection.slice(0); };

        this.updateSelection = function(dx, dy, drag) {
            _foreach(_selection, function(e) { e.moveBy(dx, dy); }, drag);
        };

        this.updatePosses = function(dx, dy, drag) {
            if (drag.posses) {
                _each(drag.posses, function(p) {
                    if (drag.posseRoles[p] && _posses[p]) {
                        _foreach(_posses[p].members, function (e) {
                            e.moveBy(dx, dy);
                        }, drag);
                    }
                });
            }
        };

        this.notifySelectionDragStop = function(drag, evt) {
            _foreach(_selection, function(e) { e.stop(evt, true); }, drag);
        };

        this.notifySelectionDragStart = function(drag, evt) {
            _foreach(_selection, function(e) { e.notifyStart(evt);}, drag);
        };

        this.setZoom = function(z) { _zoom = z; };
        this.getZoom = function() { return _zoom; };

        // does the work of changing scopes
        var _scopeManip = function(kObj, scopes, map, fn) {
            _each(kObj, function(_kObj) {
                _unreg(_kObj, map);  // deregister existing scopes
                _kObj[fn](scopes); // set scopes
                _reg(_kObj, map); // register new ones
            });
        };

        _each([ "set", "add", "remove", "toggle"], function(v) {
            this[v + "Scope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
            this[v + "DragScope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrag, scopes, this._dragsByScope, v + "Scope");
            }.bind(this);
            this[v + "DropScope"] = function(el, scopes) {
                _scopeManip(el._katavorioDrop, scopes, this._dropsByScope, v + "Scope");
            }.bind(this);
        }.bind(this));

        this.snapToGrid = function(x, y) {
            for (var s in this._dragsByScope) {
                _foreach(this._dragsByScope[s], function(d) { d.snap(x, y); });
            }
        };

        this.getDragsForScope = function(s) { return this._dragsByScope[s]; };
        this.getDropsForScope = function(s) { return this._dropsByScope[s]; };

        var _destroy = function(el, type, map) {
            el = _gel(el);
            if (el[type]) {
                if (_unreg(el[type], map)) {
                    _each(el[type], function(kObj) { kObj.destroy() });
                }

                el[type] = null;
            }
        };

        this.elementRemoved = function(el) {
            this.destroyDraggable(el);
            this.destroyDroppable(el);
        };

        this.destroyDraggable = function(el) {
            _destroy(el, "_katavorioDrag", this._dragsByScope);
        };

        this.destroyDroppable = function(el) {
            _destroy(el, "_katavorioDrop", this._dropsByScope);
        };

        this.reset = function() {
            this._dragsByScope = {};
            this._dropsByScope = {};
            _selection = [];
            _selectionMap = {};
            _posses = {};
        };

        // ----- groups
        var _posses = {};
        /**
         * Add the given element to the posse with the given id, creating the group if it at first does not exist.
         * @param {Element} el Element to add.
         * @param {String...|Object...} spec Variable args parameters. Each argument can be a either a String, indicating
         * the ID of a Posse to which the element should be added as an active participant, or an Object containing
         * `{ id:"posseId", active:false/true}`. In the latter case, if `active` is not provided it is assumed to be
         * true.
         * @returns {Posse} The Posse to which the element(s) was/were added.
         */
        this.addToPosse = function(el, spec) {

            var posses = [], posseId, active;

            var _one = function(_spec) {
                posseId = _isString(_spec) ? _spec : _spec.id;
                active = _isString(_spec) ? true : _spec.active !== false;
                var posse = _posses[posseId] || (function() {
                    var g = {name:posseId, members:[]};
                    _posses[posseId] = g;
                    return g;
                })();
                _each(el, function(_el) {
                    if (_el._katavorioDrag) {
                        posse.members.suggest(_el._katavorioDrag);
                        _el._katavorioDrag.posses.suggest(posse.name);
                        _el._katavorioDrag.posseRoles[posse.name] = active;
                    }
                });
                posses.push(posse);
            };

            for (var i = 1; i < arguments.length; i++) {
                _one(arguments[i]);
            }



            return posses.length == 1 ? posses[0] : posses;
        };

        /**
         * Remove the given element from the given posse(s).
         * @param {Element} el Element to remove.
         * @param {String...} posseId Varargs parameter: one value for each posse to remove the element from.
         */
        this.removeFromPosse = function(el, posseId) {
            if (arguments.length < 2) throw new TypeError("No posse id provided for remove operation");
            for(var i = 1; i < arguments.length; i++) {
                posseId = arguments[i];
                _each(el, function (_el) {
                    if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                        var d = _el._katavorioDrag;
                        _each(posseId, function (p) {
                            _posses[p].members.vanquish(d);
                            d.posses.vanquish(p);
                            delete d.posseRoles[p];
                        });
                    }
                });
            }
        };

        /**
         * Remove the given element from all Posses to which it belongs.
         * @param {Element|Element[]} el Element to remove from Posses.
         */
        this.removeFromAllPosses = function(el) {
            _each(el, function(_el) {
                if (_el._katavorioDrag && _el._katavorioDrag.posses) {
                    var d = _el._katavorioDrag;
                    _each(d.posses, function(p) {
                        _posses[p].members.vanquish(d);
                    });
                    d.posses.length = 0;
                    d.posseRoles = {};
                }
            });
        };
    };
}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains utility functions that run in both browsers and headless.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */

;
(function () {

    var _isa = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]";
        },
        _isnum = function (n) {
            return Object.prototype.toString.call(n) === "[object Number]";
        },
        _iss = function (s) {
            return typeof s === "string";
        },
        _isb = function (s) {
            return typeof s === "boolean";
        },
        _isnull = function (s) {
            return s == null;
        },
        _iso = function (o) {
            return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
        },
        _isd = function (o) {
            return Object.prototype.toString.call(o) === "[object Date]";
        },
        _isf = function (o) {
            return Object.prototype.toString.call(o) === "[object Function]";
        },
        _ise = function (o) {
            for (var i in o) {
                if (o.hasOwnProperty(i)) return false;
            }
            return true;
        };

    var root = this;
    var exports = root.jsPlumbUtil = {
        isArray: _isa,
        isString: _iss,
        isBoolean: _isb,
        isNull: _isnull,
        isObject: _iso,
        isDate: _isd,
        isFunction: _isf,
        isEmpty: _ise,
        isNumber: _isnum,
        clone: function (a) {
            if (_iss(a)) return "" + a;
            else if (_isb(a)) return !!a;
            else if (_isd(a)) return new Date(a.getTime());
            else if (_isf(a)) return a;
            else if (_isa(a)) {
                var b = [];
                for (var i = 0; i < a.length; i++)
                    b.push(this.clone(a[i]));
                return b;
            }
            else if (_iso(a)) {
                var c = {};
                for (var j in a)
                    c[j] = this.clone(a[j]);
                return c;
            }
            else return a;
        },
        merge: function (a, b, collations) {
            // first change the collations array - if present - into a lookup table, because its faster.
            var cMap = {}, ar, i;
            collations = collations || [];
            for (i = 0; i < collations.length; i++)
                cMap[collations[i]] = true;

            var c = this.clone(a);
            for (i in b) {
                if (c[i] == null) {
                    c[i] = b[i];
                }
                else if (_iss(b[i]) || _isb(b[i])) {
                    if (!cMap[i]) {
                        c[i] = b[i]; // if we dont want to collate, just copy it in.
                    }
                    else {
                        ar = [];
                        // if c's object is also an array we can keep its values.
                        ar.push.apply(ar, _isa(c[i]) ? c[i] : [ c[i] ]);
                        ar.push.apply(ar, _isa(b[i]) ? b[i] : [ b[i] ]);
                        c[i] = ar;
                    }
                }
                else {
                    if (_isa(b[i])) {
                        ar = [];
                        // if c's object is also an array we can keep its values.
                        if (_isa(c[i])) ar.push.apply(ar, c[i]);
                        ar.push.apply(ar, b[i]);
                        c[i] = ar;
                    }
                    else if (_iso(b[i])) {
                        // overwite c's value with an object if it is not already one.
                        if (!_iso(c[i]))
                            c[i] = {};
                        for (var j in b[i]) {
                            c[i][j] = b[i][j];
                        }
                    }
                }

            }
            return c;
        },
        replace: function (inObj, path, value) {
            if (inObj == null) return;
            var q = inObj, t = q;
            path.replace(/([^\.])+/g, function (term, lc, pos, str) {
                var array = term.match(/([^\[0-9]+){1}(\[)([0-9+])/),
                    last = pos + term.length >= str.length,
                    _getArray = function () {
                        return t[array[1]] || (function () {
                            t[array[1]] = [];
                            return t[array[1]];
                        })();
                    };

                if (last) {
                    // set term = value on current t, creating term as array if necessary.
                    if (array)
                        _getArray()[array[3]] = value;
                    else
                        t[term] = value;
                }
                else {
                    // set to current t[term], creating t[term] if necessary.
                    if (array) {
                        var a = _getArray();
                        t = a[array[3]] || (function () {
                            a[array[3]] = {};
                            return a[array[3]];
                        })();
                    }
                    else
                        t = t[term] || (function () {
                            t[term] = {};
                            return t[term];
                        })();
                }
            });

            return inObj;
        },
        //
        // chain a list of functions, supplied by [ object, method name, args ], and return on the first
        // one that returns the failValue. if none return the failValue, return the successValue.
        //
        functionChain: function (successValue, failValue, fns) {
            for (var i = 0; i < fns.length; i++) {
                var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
                if (o === failValue) {
                    return o;
                }
            }
            return successValue;
        },
        // take the given model and expand out any parameters.
        populate: function (model, values) {
            // for a string, see if it has parameter matches, and if so, try to make the substitutions.
            var getValue = function (fromString) {
                    var matches = fromString.match(/(\${.*?})/g);
                    if (matches != null) {
                        for (var i = 0; i < matches.length; i++) {
                            var val = values[matches[i].substring(2, matches[i].length - 1)] || "";
                            if (val != null) {
                                fromString = fromString.replace(matches[i], val);
                            }
                        }
                    }
                    return fromString;
                },
            // process one entry.
                _one = function (d) {
                    if (d != null) {
                        if (_iss(d)) {
                            return getValue(d);
                        }
                        else if (_isa(d)) {
                            var r = [];
                            for (var i = 0; i < d.length; i++)
                                r.push(_one(d[i]));
                            return r;
                        }
                        else if (_iso(d)) {
                            var s = {};
                            for (var j in d) {
                                s[j] = _one(d[j]);
                            }
                            return s;
                        }
                        else {
                            return d;
                        }
                    }
                };

            return _one(model);
        },
        findWithFunction: function (a, f) {
            if (a)
                for (var i = 0; i < a.length; i++) if (f(a[i])) return i;
            return -1;
        },
        removeWithFunction: function (a, f) {
            var idx = exports.findWithFunction(a, f);
            if (idx > -1) a.splice(idx, 1);
            return idx != -1;
        },
        remove: function (l, v) {
            var idx = l.indexOf(v);
            if (idx > -1) l.splice(idx, 1);
            return idx != -1;
        },
        // TODO support insert index
        addWithFunction: function (list, item, hashFunction) {
            if (exports.findWithFunction(list, hashFunction) == -1) list.push(item);
        },
        addToList: function (map, key, value, insertAtStart) {
            var l = map[key];
            if (l == null) {
                l = [];
                map[key] = l;
            }
            l[insertAtStart ? "unshift" : "push"](value);
            return l;
        },
        //
        // extends the given obj (which can be an array) with the given constructor function, prototype functions, and
        // class members, any of which may be null.
        //
        extend: function (child, parent, _protoFn) {
            var i;
            parent = _isa(parent) ? parent : [ parent ];

            for (i = 0; i < parent.length; i++) {
                for (var j in parent[i].prototype) {
                    if (parent[i].prototype.hasOwnProperty(j)) {
                        child.prototype[j] = parent[i].prototype[j];
                    }
                }
            }

            var _makeFn = function (name, protoFn) {
                return function () {
                    for (i = 0; i < parent.length; i++) {
                        if (parent[i].prototype[name])
                            parent[i].prototype[name].apply(this, arguments);
                    }
                    return protoFn.apply(this, arguments);
                };
            };

            var _oneSet = function (fns) {
                for (var k in fns) {
                    child.prototype[k] = _makeFn(k, fns[k]);
                }
            };

            if (arguments.length > 2) {
                for (i = 2; i < arguments.length; i++)
                    _oneSet(arguments[i]);
            }

            return child;
        },
        uuid: function () {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        },
        logEnabled: true,
        log: function () {
            if (exports.logEnabled && typeof console != "undefined") {
                try {
                    var msg = arguments[arguments.length - 1];
                    console.log(msg);
                }
                catch (e) {
                }
            }
        },

        /**
         * Wraps one function with another, creating a placeholder for the
         * wrapped function if it was null. this is used to wrap the various
         * drag/drop event functions - to allow jsPlumb to be notified of
         * important lifecycle events without imposing itself on the user's
         * drag/drop functionality.
         * @method jsPlumbUtil.wrap
         * @param {Function} wrappedFunction original function to wrap; may be null.
         * @param {Function} newFunction function to wrap the original with.
         * @param {Object} [returnOnThisValue] Optional. Indicates that the wrappedFunction should
         * not be executed if the newFunction returns a value matching 'returnOnThisValue'.
         * note that this is a simple comparison and only works for primitives right now.
         */
        wrap: function (wrappedFunction, newFunction, returnOnThisValue) {
            wrappedFunction = wrappedFunction || function () {
            };
            newFunction = newFunction || function () {
            };
            return function () {
                var r = null;
                try {
                    r = newFunction.apply(this, arguments);
                } catch (e) {
                    exports.log("jsPlumb function failed : " + e);
                }
                if (returnOnThisValue == null || (r !== returnOnThisValue)) {
                    try {
                        r = wrappedFunction.apply(this, arguments);
                    } catch (e) {
                        exports.log("wrapped function failed : " + e);
                    }
                }
                return r;
            };
        }
    };

    exports.EventGenerator = function () {
        var _listeners = {},
            eventsSuspended = false,
        // this is a list of events that should re-throw any errors that occur during their dispatch. it is current private.
            eventsToDieOn = { "ready": true };

        this.bind = function (event, listener, insertAtStart) {
            var _one = function(evt) {
                exports.addToList(_listeners, evt, listener, insertAtStart);
                listener.__jsPlumb = listener.__jsPlumb || {};
                listener.__jsPlumb[jsPlumbUtil.uuid()] = evt;
            };

            if (typeof event === "string") _one(event);
            else if (event.length != null) {
                for (var i = 0; i < event.length; i++) {
                    _one(event[i]);
                }
            }

            return this;
        };

        this.fire = function (event, value, originalEvent) {
            if (!eventsSuspended && _listeners[event]) {
                var l = _listeners[event].length, i = 0, _gone = false, ret = null;
                if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
                    while (!_gone && i < l && ret !== false) {
                        // doing it this way rather than catching and then possibly re-throwing means that an error propagated by this
                        // method will have the whole call stack available in the debugger.
                        if (eventsToDieOn[event])
                            _listeners[event][i].apply(this, [ value, originalEvent]);
                        else {
                            try {
                                ret = _listeners[event][i].apply(this, [ value, originalEvent ]);
                            } catch (e) {
                                exports.log("jsPlumb: fire failed for event " + event + " : " + e);
                            }
                        }
                        i++;
                        if (_listeners == null || _listeners[event] == null)
                            _gone = true;
                    }
                }
            }
            return this;
        };

        this.unbind = function (eventOrListener, listener) {

            if (arguments.length === 0) {
                _listeners = {};
            }
            else if (arguments.length === 1) {
                if (typeof eventOrListener === "string")
                    delete _listeners[eventOrListener];
                else if (eventOrListener.__jsPlumb) {
                    var evt;
                    for (var i in eventOrListener.__jsPlumb) {
                        evt = eventOrListener.__jsPlumb[i];
                        exports.remove(_listeners[evt] || [], eventOrListener);
                    }
                }
            }
            else if (arguments.length === 2) {
                exports.remove(_listeners[eventOrListener] || [], listener);
            }

            return this;
        };

        this.getListener = function (forEvent) {
            return _listeners[forEvent];
        };
        this.setSuspendEvents = function (val) {
            eventsSuspended = val;
        };
        this.isSuspendEvents = function () {
            return eventsSuspended;
        };
        this.silently = function(fn) {
            this.setSuspendEvents(true);
            try {
                fn();
            }
            catch (e) {
                jsPlumbUtil.log("Cannot execute silent function " + e);
            }
            this.setSuspendEvents(false);
        };
        this.cleanupListeners = function () {
            for (var i in _listeners) {
                _listeners[i] = null;
            }
        };
    };

    exports.EventGenerator.prototype = {
        cleanup: function () {
            this.cleanupListeners();
        }
    };

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains utility functions that run in browsers only.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
 ;(function() {

  "use strict";

   var root = this;
   var exports = root.jsPlumbUtil;

   exports.matchesSelector = function(el, selector, ctx) {
       ctx = ctx || el.parentNode;
       var possibles = ctx.querySelectorAll(selector);
       for (var i = 0; i < possibles.length; i++) {
           if (possibles[i] === el)
               return true;
       }
       return false;
   };

   exports.consume = function(e, doNotPreventDefault) {
       if (e.stopPropagation)
           e.stopPropagation();
       else
           e.returnValue = false;

       if (!doNotPreventDefault && e.preventDefault)
            e.preventDefault();
   };

   /*
    * Function: sizeElement
    * Helper to size and position an element. You would typically use
    * this when writing your own Connector or Endpoint implementation.
    *
    * Parameters:
    *  x - [int] x position for the element origin
    *  y - [int] y position for the element origin
    *  w - [int] width of the element
    *  h - [int] height of the element
    *
    */
   exports.sizeElement = function(el, x, y, w, h) {
       if (el) {
           el.style.height = h + "px";
           el.height = h;
           el.style.width = w + "px";
           el.width = w;
           el.style.left = x + "px";
           el.style.top = y + "px";
       }
   };


 }).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the core code.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
(function () {

    "use strict";

    var root = this;
    var connectorTypes = [], rendererTypes;

    var _ju = root.jsPlumbUtil,
        _getOffset = function (el, _instance, relativeToRoot) {
            return _instance.getOffset(el, relativeToRoot);
        },

        /**
         * creates a timestamp, using milliseconds since 1970, but as a string.
         */
        _timestamp = function () {
            return "" + (new Date()).getTime();
        },

    // helper method to update the hover style whenever it, or paintStyle, changes.
    // we use paintStyle as the foundation and merge hoverPaintStyle over the
    // top.
        _updateHoverStyle = function (component) {
            if (component._jsPlumb.paintStyle && component._jsPlumb.hoverPaintStyle) {
                var mergedHoverStyle = {};
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.paintStyle);
                jsPlumb.extend(mergedHoverStyle, component._jsPlumb.hoverPaintStyle);
                delete component._jsPlumb.hoverPaintStyle;
                // we want the fillStyle of paintStyle to override a gradient, if possible.
                if (mergedHoverStyle.gradient && component._jsPlumb.paintStyle.fillStyle)
                    delete mergedHoverStyle.gradient;
                component._jsPlumb.hoverPaintStyle = mergedHoverStyle;
            }
        },
        events = ["tap", "dbltap", "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu" ],
        eventFilters = { "mouseout": "mouseleave", "mouseexit": "mouseleave" },
        _updateAttachedElements = function (component, state, timestamp, sourceElement) {
            var affectedElements = component.getAttachedElements();
            if (affectedElements) {
                for (var i = 0, j = affectedElements.length; i < j; i++) {
                    if (!sourceElement || sourceElement != affectedElements[i])
                        affectedElements[i].setHover(state, true, timestamp);			// tell the attached elements not to inform their own attached elements.
                }
            }
        },
        _splitType = function (t) {
            return t == null ? null : t.split(" ");
        },
        _mapType = function(map, obj, typeId) {
            for (var i in obj)
                map[i] = typeId;
        },
        _applyTypes = function (component, params, doNotRepaint) {
            if (component.getDefaultType) {
                var td = component.getTypeDescriptor(), map = {};
                var defType = component.getDefaultType();
                var o = _ju.merge({}, defType);
                _mapType(map, defType, "__default");
                for (var i = 0, j = component._jsPlumb.types.length; i < j; i++) {
                    var tid = component._jsPlumb.types[i];
                    if (tid !== "__default") {
                        var _t = component._jsPlumb.instance.getType(tid, td);
                        if (_t != null) {
                            o = _ju.merge(o, _t, [ "cssClass" ]);
                            _mapType(map, _t, tid);
                        }
                    }
                }

                if (params) {
                    o = _ju.populate(o, params);
                }

                component.applyType(o, doNotRepaint, map);
                if (!doNotRepaint) component.repaint();
            }
        },

// ------------------------------ BEGIN jsPlumbUIComponent --------------------------------------------

        jsPlumbUIComponent = window.jsPlumbUIComponent = function (params) {

            jsPlumbUtil.EventGenerator.apply(this, arguments);

            var self = this,
                a = arguments,
                idPrefix = self.idPrefix,
                id = idPrefix + (new Date()).getTime();

            this._jsPlumb = {
                instance: params._jsPlumb,
                parameters: params.parameters || {},
                paintStyle: null,
                hoverPaintStyle: null,
                paintStyleInUse: null,
                hover: false,
                beforeDetach: params.beforeDetach,
                beforeDrop: params.beforeDrop,
                overlayPlacements: [],
                hoverClass: params.hoverClass || params._jsPlumb.Defaults.HoverClass,
                types: [],
                typeCache:{}
            };

            this.cacheTypeItem = function(key, item, typeId) {
                this._jsPlumb.typeCache[typeId] = this._jsPlumb.typeCache[typeId] || {};
                this._jsPlumb.typeCache[typeId][key] = item;
            };
            this.getCachedTypeItem = function(key, typeId) {
                return this._jsPlumb.typeCache[typeId] ? this._jsPlumb.typeCache[typeId][key] : null;
            };

            this.getId = function () {
                return id;
            };

// ----------------------------- default type --------------------------------------------


            var o = params.overlays || [], oo = {};
            if (this.defaultOverlayKeys) {
                for (var i = 0; i < this.defaultOverlayKeys.length; i++)
                    Array.prototype.push.apply(o, this._jsPlumb.instance.Defaults[this.defaultOverlayKeys[i]] || []);

                for (i = 0; i < o.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = jsPlumb.convertToFullOverlaySpec(o[i]);
                    oo[fo[1].id] = fo;
                }
            }

            var _defaultType = {
                overlays:oo,
                parameters: params.parameters || {},
                scope: params.scope || this._jsPlumb.instance.getDefaultScope()
            };
            this.getDefaultType = function() {
                return _defaultType;
            };
            this.appendToDefaultType = function(obj) {
                for (var i in obj) _defaultType[i] = obj[i];
            };

// ----------------------------- end default type --------------------------------------------

            // all components can generate events

            if (params.events) {
                for (i in params.events)
                    self.bind(i, params.events[i]);
            }

            // all components get this clone function.
            // TODO issue 116 showed a problem with this - it seems 'a' that is in
            // the clone function's scope is shared by all invocations of it, the classic
            // JS closure problem.  for now, jsPlumb does a version of this inline where
            // it used to call clone.  but it would be nice to find some time to look
            // further at this.
            this.clone = function () {
                var o = {};//new Object();
                this.constructor.apply(o, a);
                return o;
            }.bind(this);

            // user can supply a beforeDetach callback, which will be executed before a detach
            // is performed; returning false prevents the detach.
            this.isDetachAllowed = function (connection) {
                var r = true;
                if (this._jsPlumb.beforeDetach) {
                    try {
                        r = this._jsPlumb.beforeDetach(connection);
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDetach callback failed", e);
                    }
                }
                return r;
            };

            // user can supply a beforeDrop callback, which will be executed before a dropped
            // connection is confirmed. user can return false to reject connection.
            this.isDropAllowed = function (sourceId, targetId, scope, connection, dropEndpoint, source, target) {
                var r = this._jsPlumb.instance.checkCondition("beforeDrop", {
                    sourceId: sourceId,
                    targetId: targetId,
                    scope: scope,
                    connection: connection,
                    dropEndpoint: dropEndpoint,
                    source: source, target: target
                });
                if (this._jsPlumb.beforeDrop) {
                    try {
                        r = this._jsPlumb.beforeDrop({
                            sourceId: sourceId,
                            targetId: targetId,
                            scope: scope,
                            connection: connection,
                            dropEndpoint: dropEndpoint,
                            source: source, target: target
                        });
                    }
                    catch (e) {
                        _ju.log("jsPlumb: beforeDrop callback failed", e);
                    }
                }
                return r;
            };

            var boundListeners = [],
                bindAListener = function (obj, type, fn) {
                    boundListeners.push([obj, type, fn]);
                    obj.bind(type, fn);
                },
                domListeners = [];

            // sets the component associated with listener events. for instance, an overlay delegates
            // its events back to a connector. but if the connector is swapped on the underlying connection,
            // then this component must be changed. This is called by setConnector in the Connection class.
            this.setListenerComponent = function (c) {
                for (var i = 0; i < domListeners.length; i++)
                    domListeners[i][3] = c;
            };


        };

    var _removeTypeCssHelper = function (component, typeIndex) {
        var typeId = component._jsPlumb.types[typeIndex],
            type = component._jsPlumb.instance.getType(typeId, component.getTypeDescriptor());

        if (type != null) {

            if (type.cssClass && component.canvas)
                component._jsPlumb.instance.removeClass(component.canvas, type.cssClass);
        }
    };

    jsPlumbUtil.extend(jsPlumbUIComponent, jsPlumbUtil.EventGenerator, {

        getParameter: function (name) {
            return this._jsPlumb.parameters[name];
        },

        setParameter: function (name, value) {
            this._jsPlumb.parameters[name] = value;
        },

        getParameters: function () {
            return this._jsPlumb.parameters;
        },

        setParameters: function (p) {
            this._jsPlumb.parameters = p;
        },

        getClass:function() {
            return jsPlumb.getClass(this.canvas);
        },

        hasClass:function(clazz) {
            return jsPlumb.hasClass(this.canvas, clazz);
        },

        addClass: function (clazz) {
            jsPlumb.addClass(this.canvas, clazz);
        },

        removeClass: function (clazz) {
            jsPlumb.removeClass(this.canvas, clazz);
        },

        updateClasses: function (classesToAdd, classesToRemove) {
            jsPlumb.updateClasses(this.canvas, classesToAdd, classesToRemove);
        },

        setType: function (typeId, params, doNotRepaint) {
            this.clearTypes();
            this._jsPlumb.types = _splitType(typeId) || [];
            _applyTypes(this, params, doNotRepaint);
        },

        getType: function () {
            return this._jsPlumb.types;
        },

        reapplyTypes: function (params, doNotRepaint) {
            _applyTypes(this, params, doNotRepaint);
        },

        hasType: function (typeId) {
            return this._jsPlumb.types.indexOf(typeId) != -1;
        },

        addType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId), _cont = false;
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    if (!this.hasType(t[i])) {
                        this._jsPlumb.types.push(t[i]);
                        _cont = true;
                    }
                }
                if (_cont) _applyTypes(this, params, doNotRepaint);
            }
        },

        removeType: function (typeId, doNotRepaint) {
            var t = _splitType(typeId), _cont = false, _one = function (tt) {
                var idx = this._jsPlumb.types.indexOf(tt);
                if (idx != -1) {
                    // remove css class if necessary
                    _removeTypeCssHelper(this, idx);
                    this._jsPlumb.types.splice(idx, 1);
                    return true;
                }
                return false;
            }.bind(this);

            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    _cont = _one(t[i]) || _cont;
                }
                if (_cont) _applyTypes(this, null, doNotRepaint);
            }
        },
        clearTypes: function (doNotRepaint) {
            var i = this._jsPlumb.types.length;
            for (var j = 0; j < i; j++) {
                _removeTypeCssHelper(this, 0);
                this._jsPlumb.types.splice(0, 1);
            }
            _applyTypes(this, {}, doNotRepaint);
        },

        toggleType: function (typeId, params, doNotRepaint) {
            var t = _splitType(typeId);
            if (t != null) {
                for (var i = 0, j = t.length; i < j; i++) {
                    var idx = this._jsPlumb.types.indexOf(t[i]);
                    if (idx != -1) {
                        _removeTypeCssHelper(this, idx);
                        this._jsPlumb.types.splice(idx, 1);
                    }
                    else
                        this._jsPlumb.types.push(t[i]);
                }

                _applyTypes(this, params, doNotRepaint);
            }
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.hoverPaintStyle, doNotRepaint);
            if (t.parameters) {
                for (var i in t.parameters)
                    this.setParameter(i, t.parameters[i]);
            }
            this._jsPlumb.paintStyleInUse = this.getPaintStyle();
        },
        setPaintStyle: function (style, doNotRepaint) {
//		    	this._jsPlumb.paintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.
            this._jsPlumb.paintStyle = style;
            this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle;
            _updateHoverStyle(this);
            if (!doNotRepaint) this.repaint();
        },
        getPaintStyle: function () {
            return this._jsPlumb.paintStyle;
        },
        setHoverPaintStyle: function (style, doNotRepaint) {
            //this._jsPlumb.hoverPaintStyle = jsPlumb.extend({}, style);
// TODO figure out if we want components to clone paintStyle so as not to share it.		    	
            this._jsPlumb.hoverPaintStyle = style;
            _updateHoverStyle(this);
            if (!doNotRepaint) this.repaint();
        },
        getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle;
        },
        destroy: function (force) {
            if (force || this.typeId == null) {
                this.cleanupListeners(); // this is on EventGenerator
                this.clone = null;
                this._jsPlumb = null;
            }
        },

        isHover: function () {
            return this._jsPlumb.hover;
        },

        setHover: function (hover, ignoreAttachedElements, timestamp) {
            // while dragging, we ignore these events.  this keeps the UI from flashing and
            // swishing and whatevering.
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {

                this._jsPlumb.hover = hover;

                if (this.canvas != null) {
                    if (this._jsPlumb.instance.hoverClass != null) {
                        var method = hover ? "addClass" : "removeClass";
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.instance.hoverClass);
                    }
                    if (this._jsPlumb.hoverClass != null) {
                        this._jsPlumb.instance[method](this.canvas, this._jsPlumb.hoverClass);
                    }
                }
                if (this._jsPlumb.hoverPaintStyle != null) {
                    this._jsPlumb.paintStyleInUse = hover ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle;
                    if (!this._jsPlumb.instance.isSuspendDrawing()) {
                        timestamp = timestamp || _timestamp();
                        this.repaint({timestamp: timestamp, recalc: false});
                    }
                }
                // get the list of other affected elements, if supported by this component.
                // for a connection, its the endpoints.  for an endpoint, its the connections! surprise.
                if (this.getAttachedElements && !ignoreAttachedElements)
                    _updateAttachedElements(this, hover, _timestamp(), this);
            }
        }
    });

// ------------------------------ END jsPlumbUIComponent --------------------------------------------

    var _jsPlumbInstanceIndex = 0,
        getInstanceIndex = function () {
            var i = _jsPlumbInstanceIndex + 1;
            _jsPlumbInstanceIndex++;
            return i;
        };

    var jsPlumbInstance = window.jsPlumbInstance = function (_defaults) {

        this.Defaults = {
            Anchor: "Bottom",
            Anchors: [ null, null ],
            ConnectionsDetachable: true,
            ConnectionOverlays: [ ],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: false,
            DragOptions: { },
            DropOptions: { },
            Endpoint: "Dot",
            EndpointOverlays: [ ],
            Endpoints: [ null, null ],
            EndpointStyle: { fillStyle: "#456" },
            EndpointStyles: [ null, null ],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [ null, null ],
            HoverPaintStyle: null,
            LabelStyle: { color: "black" },
            LogEnabled: false,
            Overlays: [ ],
            MaxConnections: 1,
            PaintStyle: { lineWidth: 4, strokeStyle: "#456" },
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };
        if (_defaults) jsPlumb.extend(this.Defaults, _defaults);

        this.logEnabled = this.Defaults.LogEnabled;
        this._connectionTypes = {};
        this._endpointTypes = {};

        jsPlumbUtil.EventGenerator.apply(this);

        var _currentInstance = this,
            _instanceIndex = getInstanceIndex(),
            _bb = _currentInstance.bind,
            _initialDefaults = {},
            _zoom = 1,
            _info = function (el) {
                if (el == null) return null;
                else if (el.nodeType == 3 || el.nodeType == 8) {
                    return { el:el, text:true };
                }
                else {
                    var _el = _currentInstance.getElement(el);
                    return { el: _el, id: (jsPlumbUtil.isString(el) && _el == null) ? el : _getId(_el) };
                }
            };

        this.getInstanceIndex = function () {
            return _instanceIndex;
        };

        this.setZoom = function (z, repaintEverything) {
            _zoom = z;
            _currentInstance.fire("zoom", _zoom);
            if (repaintEverything) _currentInstance.repaintEverything();
            return true;
        };
        this.getZoom = function () {
            return _zoom;
        };

        for (var i in this.Defaults)
            _initialDefaults[i] = this.Defaults[i];

        var _container, _containerDelegations = [];
        this.unbindContainer = function() {
            if (_container != null && _containerDelegations.length > 0) {
                for (var i = 0; i < _containerDelegations.length; i++) {
                    _currentInstance.off(_container, _containerDelegations[i][0], _containerDelegations[i][1]);
                }
            }
        };
        this.setContainer = function (c) {

            this.unbindContainer();

            // get container as dom element.
            c = this.getElement(c);
            // move existing connections and endpoints, if any.
            this.select().each(function (conn) {
                conn.moveParent(c);
            });
            this.selectEndpoints().each(function (ep) {
                ep.moveParent(c);
            });

            // set container.
            var previousContainer = _container;
            _container = c;
            _containerDelegations.length = 0;

            var _oneDelegateHandler = function (id, e) {
                var t = e.srcElement || e.target,
                    jp = (t && t.parentNode ? t.parentNode._jsPlumb : null) || (t ? t._jsPlumb : null) || (t && t.parentNode && t.parentNode.parentNode ? t.parentNode.parentNode._jsPlumb : null);
                if (jp) {
                    jp.fire(id, jp, e);
                    // jsplumb also fires every event coming from components/overlays. That's what the test for `jp.component` is for.
                    _currentInstance.fire(id, jp.component || jp, e);
                }
            };

            var _addOneDelegate = function(eventId, selector, fn) {
                _containerDelegations.push([eventId, fn]);
                _currentInstance.on(_container, eventId, selector, fn);
            };

            // delegate one event on the container to jsplumb elements. it might be possible to
            // abstract this out: each of endpoint, connection and overlay could register themselves with
            // jsplumb as "component types" or whatever, and provide a suitable selector. this would be
            // done by the renderer (although admittedly from 2.0 onwards we're not supporting vml anymore)
            var _oneDelegate = function (id) {
                // connections.
                //_addOneDelegate(id, ".jsplumb-connector, .jsplumb-connector > *", function (e) {
                _addOneDelegate(id, ".jsplumb-connector > *", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // endpoints. note they can have an enclosing div, or not.
                _addOneDelegate(id, ".jsplumb-endpoint, .jsplumb-endpoint > *, .jsplumb-endpoint svg *", function (e) {
                    _oneDelegateHandler(id, e);
                });
                // overlays
                _addOneDelegate(id, ".jsplumb-overlay, .jsplumb-overlay *", function (e) {
                    _oneDelegateHandler(id, e);
                });
            };

            for (var i = 0; i < events.length; i++)
                _oneDelegate(events[i]);

            // managed elements
            for (var elId in managedElements) {
                var el = managedElements[elId].el;
                if (el.parentNode === previousContainer) {
                    previousContainer.removeChild(el);
                    _container.appendChild(el);
                }
            }

        };
        this.getContainer = function () {
            return _container;
        };

        this.bind = function (event, fn) {
            if ("ready" === event && initialized) fn();
            else _bb.apply(_currentInstance, [event, fn]);
        };

        _currentInstance.importDefaults = function (d) {
            for (var i in d) {
                _currentInstance.Defaults[i] = d[i];
            }
            if (d.Container)
                _currentInstance.setContainer(d.Container);

            return _currentInstance;
        };

        _currentInstance.restoreDefaults = function () {
            _currentInstance.Defaults = jsPlumb.extend({}, _initialDefaults);
            return _currentInstance;
        };

        var log = null,
            initialized = false,
        // TODO remove from window scope
            connections = [],
        // map of element id -> endpoint lists. an element can have an arbitrary
        // number of endpoints on it, and not all of them have to be connected
        // to anything.
            endpointsByElement = {},
            endpointsByUUID = {},
            managedElements = {},
            offsets = {},
            offsetTimestamps = {},
            draggableStates = {},
            connectionBeingDragged = false,
            sizes = [],
            _suspendDrawing = false,
            _suspendedAt = null,
            DEFAULT_SCOPE = this.Defaults.Scope,
            renderMode = null,  // will be set in init()
            _curIdStamp = 1,
            _idstamp = function () {
                return "" + _curIdStamp++;
            },

        //
        // appends an element to some other element, which is calculated as follows:
        //
        // 1. if Container exists, use that element.
        // 2. if the 'parent' parameter exists, use that.
        // 3. otherwise just use the root element.
        //
        //
            _appendElement = function (el, parent) {
                if (_container)
                    _container.appendChild(el);
                else if (!parent)
                    this.appendToRoot(el);
                else
                    this.getElement(parent).appendChild(el);
            }.bind(this),

        //
        // Draws an endpoint and its connections. this is the main entry point into drawing connections as well
        // as endpoints, since jsPlumb is endpoint-centric under the hood.
        //
        // @param element element to draw (of type library specific element object)
        // @param ui UI object from current library's event system. optional.
        // @param timestamp timestamp for this paint cycle. used to speed things up a little by cutting down the amount of offset calculations we do.
        // @param clearEdits defaults to false; indicates that mouse edits for connectors should be cleared
        ///
            _draw = function (element, ui, timestamp, clearEdits) {

                // TODO is it correct to filter by headless at this top level? how would a headless adapter ever repaint?
                // NO. it is not correct.
                if (!jsPlumb.headless && !_suspendDrawing) {
                    var id = _getId(element),
                        repaintEls = _currentInstance.getDragManager().getElementsForDraggable(id);

                    if (timestamp == null) timestamp = _timestamp();

                    // update the offset of everything _before_ we try to draw anything.
                    var o = _updateOffset({ elId: id, offset: ui, recalc: false, timestamp: timestamp });

                    if (repaintEls) {
                        for (var i in repaintEls) {
                            _updateOffset({
                                elId: repaintEls[i].id,
                                offset: {
                                    left: o.o.left + repaintEls[i].offset.left,
                                    top: o.o.top + repaintEls[i].offset.top
                                },
                                recalc: false,
                                timestamp: timestamp
                            });
                        }
                    }

                    _currentInstance.anchorManager.redraw(id, ui, timestamp, null, clearEdits);

                    if (repaintEls) {
                        for (var j in repaintEls) {
                            _currentInstance.anchorManager.redraw(repaintEls[j].id, ui, timestamp, repaintEls[j].offset, clearEdits, true);
                        }
                    }
                }
            },

        //
        // gets an Endpoint by uuid.
        //
            _getEndpoint = function (uuid) {
                return endpointsByUUID[uuid];
            },

            /**
             * inits a draggable if it's not already initialised.
             * TODO: somehow abstract this to the adapter, because the concept of "draggable" has no
             * place on the server.
             */
            _initDraggableIfNecessary = function (element, isDraggable, dragOptions, id) {
                // move to DragManager?
                if (!jsPlumb.headless) {
                    var _draggable = isDraggable == null ? false : isDraggable;
                    if (_draggable) {
                        if (jsPlumb.isDragSupported(element, _currentInstance)) {
                            var options = dragOptions || _currentInstance.Defaults.DragOptions;
                            options = jsPlumb.extend({}, options); // make a copy.
                            if (!jsPlumb.isAlreadyDraggable(element, _currentInstance)) {
                                var dragEvent = jsPlumb.dragEvents.drag,
                                    stopEvent = jsPlumb.dragEvents.stop,
                                    startEvent = jsPlumb.dragEvents.start,
                                    _del = _currentInstance.getElement(element),
                                    _ancestor = _currentInstance.getDragManager().getDragAncestor(_del),
                                    _noOffset = {left: 0, top: 0},
                                    _ancestorOffset = _noOffset,
                                    _started = false;

                                _manage(id, element);

                                options[startEvent] = _ju.wrap(options[startEvent], function () {
                                    _ancestorOffset = _ancestor != null ? _currentInstance.getOffset(_ancestor) : _noOffset;
                                    _currentInstance.setHoverSuspended(true);
                                    _currentInstance.select({source: element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
                                    _currentInstance.select({target: element}).addClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
                                    _currentInstance.setConnectionBeingDragged(true);
                                    if (options.canDrag) return dragOptions.canDrag();
                                }, false);

                                options[dragEvent] = _ju.wrap(options[dragEvent], function () {
                                    // TODO: here we could actually use getDragObject, and then compute it ourselves,
                                    // since every adapter does the same thing. but i'm not sure why YUI's getDragObject
                                    // differs from getUIPosition so much
                                    var ui = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom());
                                    // adjust by ancestor offset if there is one: this is for the case that a draggable
                                    // is contained inside some other element that is not the Container.
                                    ui.left += _ancestorOffset.left;
                                    ui.top += _ancestorOffset.top;
                                    _draw(element, ui, null, true);
                                    if (_started) _currentInstance.addClass(element, "jsPlumb_dragged");
                                    _started = true;
                                });
                                options[stopEvent] = _ju.wrap(options[stopEvent], function () {
                                    var elements = [];

                                    // TODO once jquery is no longer supported, remove this, as we will know
                                    // exactly what the method signature is. For now, we need to cater for the
                                    // fact that jquery ui provides two args and katavorio provides only one.
                                    if (arguments.length == 1 && arguments[0].selection && arguments[0].selection.length > 0) {
                                        elements = arguments[0].selection;
                                    }
                                    else {
                                        elements = [
                                            [ element, _currentInstance.getUIPosition(arguments, _currentInstance.getZoom(), true) ]
                                        ];
                                    }

                                    // this is one element
                                    var _one = function (_e) {
                                        _draw(_e[0], _e[1]);
                                        _currentInstance.removeClass(_e[0], "jsPlumb_dragged");
                                        _currentInstance.select({source: _e[0]}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.sourceElementDraggingClass, true);
                                        _currentInstance.select({target: _e[0]}).removeClass(_currentInstance.elementDraggingClass + " " + _currentInstance.targetElementDraggingClass, true);
                                        _currentInstance.getDragManager().dragEnded(_e[0]);
                                    };

                                    for (var i = 0; i < elements.length; i++)
                                        _one(elements[i]);

                                    // this is common across all
                                    _started = false;
                                    _currentInstance.setHoverSuspended(false);
                                    _currentInstance.setConnectionBeingDragged(false);
                                });
                                var elId = _getId(element); // need ID
                                draggableStates[elId] = true;
                                var draggable = draggableStates[elId];
                                options.disabled = draggable == null ? false : !draggable;
                                _currentInstance.initDraggable(element, options);
                                _currentInstance.getDragManager().register(element);
                            }
                            else {
                                // already draggable. attach any start, drag or stop listeners to the current Drag.
                                if (dragOptions.force) {
                                    _currentInstance.initDraggable(element, options);
                                }
                            }
                        }
                    }
                }
            },

            _scopeMatch = function (e1, e2) {
                var s1 = e1.scope.split(/\s/), s2 = e2.scope.split(/\s/);
                for (var i = 0; i < s1.length; i++)
                    for (var j = 0; j < s2.length; j++)
                        if (s2[j] == s1[i]) return true;

                return false;
            },

        /*
         * prepares a final params object that can be passed to _newConnection, taking into account defaults, events, etc.
         */
            _prepareConnectionParams = function (params, referenceParams) {
                var _p = jsPlumb.extend({ }, params);
                if (referenceParams) jsPlumb.extend(_p, referenceParams);

                // hotwire endpoints passed as source or target to sourceEndpoint/targetEndpoint, respectively.
                if (_p.source) {
                    if (_p.source.endpoint)
                        _p.sourceEndpoint = _p.source;
                    else
                        _p.source = _currentInstance.getElement(_p.source);
                }
                if (_p.target) {
                    if (_p.target.endpoint)
                        _p.targetEndpoint = _p.target;
                    else
                        _p.target = _currentInstance.getElement(_p.target);
                }

                // test for endpoint uuids to connect
                if (params.uuids) {
                    _p.sourceEndpoint = _getEndpoint(params.uuids[0]);
                    _p.targetEndpoint = _getEndpoint(params.uuids[1]);
                }

                // now ensure that if we do have Endpoints already, they're not full.
                // source:
                if (_p.sourceEndpoint && _p.sourceEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; source endpoint is full");
                    return;
                }

                // target:
                if (_p.targetEndpoint && _p.targetEndpoint.isFull()) {
                    _ju.log(_currentInstance, "could not add connection; target endpoint is full");
                    return;
                }

                // if source endpoint mandates connection type and nothing specified in our params, use it.
                if (!_p.type && _p.sourceEndpoint)
                    _p.type = _p.sourceEndpoint.connectionType;

                // copy in any connectorOverlays that were specified on the source endpoint.
                // it doesnt copy target endpoint overlays.  i'm not sure if we want it to or not.
                if (_p.sourceEndpoint && _p.sourceEndpoint.connectorOverlays) {
                    _p.overlays = _p.overlays || [];
                    for (var i = 0, j = _p.sourceEndpoint.connectorOverlays.length; i < j; i++) {
                        _p.overlays.push(_p.sourceEndpoint.connectorOverlays[i]);
                    }
                }

                // pointer events
                if (!_p["pointer-events"] && _p.sourceEndpoint && _p.sourceEndpoint.connectorPointerEvents)
                    _p["pointer-events"] = _p.sourceEndpoint.connectorPointerEvents;

                var _mergeOverrides = function (def, values) {
                    var m = jsPlumb.extend({}, def);
                    for (var i in values) {
                        if (values[i]) m[i] = values[i];
                    }
                    return m;
                };

                var _addEndpoint = function (el, def, idx) {
                    return _currentInstance.addEndpoint(el, _mergeOverrides(def, {
                        anchor: _p.anchors ? _p.anchors[idx] : _p.anchor,
                        endpoint: _p.endpoints ? _p.endpoints[idx] : _p.endpoint,
                        paintStyle: _p.endpointStyles ? _p.endpointStyles[idx] : _p.endpointStyle,
                        hoverPaintStyle: _p.endpointHoverStyles ? _p.endpointHoverStyles[idx] : _p.endpointHoverStyle
                    }));
                };

                // check for makeSource/makeTarget specs.

                var _oneElementDef = function (type, idx, defs, matchType) {
                    if (_p[type] && !_p[type].endpoint && !_p[type + "Endpoint"] && !_p.newConnection) {
                        var tid = _getId(_p[type]), tep = defs[tid];

                        tep = tep ? tep[matchType] : null;

                        if (tep) {
                            // if not enabled, return.
                            if (!tep.enabled) return false;
                            var newEndpoint = tep.endpoint != null && tep.endpoint._jsPlumb ? tep.endpoint : _addEndpoint(_p[type], tep.def, idx);
                            if (newEndpoint.isFull()) return false;
                            _p[type + "Endpoint"] = newEndpoint;
                            newEndpoint._doNotDeleteOnDetach = false; // reset.
                            newEndpoint._deleteOnDetach = true;
                            if (tep.uniqueEndpoint) {
                                if (!tep.endpoint) {
                                    tep.endpoint = newEndpoint;
                                    newEndpoint._deleteOnDetach = false;
                                    newEndpoint._doNotDeleteOnDetach = true;
                                }
                                else
                                    newEndpoint.finalEndpoint = tep.endpoint;
                            }
                        }
                    }
                };

                if (_oneElementDef("source", 0, this.sourceEndpointDefinitions, _p.type || "default") === false) return;
                if (_oneElementDef("target", 1, this.targetEndpointDefinitions, _p.type || "default") === false) return;

                // last, ensure scopes match
                if (_p.sourceEndpoint && _p.targetEndpoint)
                    if (!_scopeMatch(_p.sourceEndpoint, _p.targetEndpoint)) _p = null;

                return _p;
            }.bind(_currentInstance),

            _newConnection = function (params) {
                var connectionFunc = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType();

                params._jsPlumb = _currentInstance;
                params.newConnection = _newConnection;
                params.newEndpoint = _newEndpoint;
                params.endpointsByUUID = endpointsByUUID;
                params.endpointsByElement = endpointsByElement;
                params.finaliseConnection = _finaliseConnection;
                params.id = "con_" + _idstamp();
                var con = new connectionFunc(params);

                // if the connection is draggable, then maybe we need to tell the target endpoint to init the
                // dragging code. it won't run again if it already configured to be draggable.
                if (con.isDetachable()) {
                    con.endpoints[0].initDraggable("_jsPlumbSource");
                    con.endpoints[1].initDraggable("_jsPlumbTarget");
                }

                return con;
            },

        //
        // adds the connection to the backing model, fires an event if necessary and then redraws
        //
            _finaliseConnection = _currentInstance.finaliseConnection = function (jpc, params, originalEvent, doInformAnchorManager) {
                params = params || {};
                // add to list of connections (by scope).
                if (!jpc.suspendedEndpoint)
                    connections.push(jpc);

                jpc.pending = null;

                // turn off isTemporarySource on the source endpoint (only viable on first draw)
                jpc.endpoints[0].isTemporarySource = false;

                // always inform the anchor manager
                // except that if jpc has a suspended endpoint it's not true to say the
                // connection is new; it has just (possibly) moved. the question is whether
                // to make that call here or in the anchor manager.  i think perhaps here.
                if (doInformAnchorManager !== false)
                    _currentInstance.anchorManager.newConnection(jpc);

                // force a paint
                _draw(jpc.source);

                // fire an event
                if (!params.doNotFireConnectionEvent && params.fireEvent !== false) {

                    var eventArgs = {
                        connection: jpc,
                        source: jpc.source, target: jpc.target,
                        sourceId: jpc.sourceId, targetId: jpc.targetId,
                        sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                    };

                    _currentInstance.fire("connection", eventArgs, originalEvent);
                }
            },

        /*
         factory method to prepare a new endpoint.  this should always be used instead of creating Endpoints
         manually, since this method attaches event listeners and an id.
         */
            _newEndpoint = function (params, id) {
                var endpointFunc = _currentInstance.Defaults.EndpointType || jsPlumb.Endpoint;
                var _p = jsPlumb.extend({}, params);
                _p._jsPlumb = _currentInstance;
                _p.newConnection = _newConnection;
                _p.newEndpoint = _newEndpoint;
                _p.endpointsByUUID = endpointsByUUID;
                _p.endpointsByElement = endpointsByElement;
                _p.fireDetachEvent = fireDetachEvent;
                _p.elementId = id || _getId(_p.source);
                var ep = new endpointFunc(_p);
                ep.id = "ep_" + _idstamp();
                _manage(_p.elementId, _p.source);

                if (!jsPlumb.headless)
                    _currentInstance.getDragManager().endpointAdded(_p.source, id);

                return ep;
            },

        /*
         * performs the given function operation on all the connections found
         * for the given element id; this means we find all the endpoints for
         * the given element, and then for each endpoint find the connectors
         * connected to it. then we pass each connection in to the given
         * function.
         */
            _operation = function (elId, func, endpointFunc) {
                var endpoints = endpointsByElement[elId];
                if (endpoints && endpoints.length) {
                    for (var i = 0, ii = endpoints.length; i < ii; i++) {
                        for (var j = 0, jj = endpoints[i].connections.length; j < jj; j++) {
                            var retVal = func(endpoints[i].connections[j]);
                            // if the function passed in returns true, we exit.
                            // most functions return false.
                            if (retVal) return;
                        }
                        if (endpointFunc) endpointFunc(endpoints[i]);
                    }
                }
            },

            _setDraggable = function (element, draggable) {
                return jsPlumb.each(element, function (el) {
                    if (_currentInstance.isDragSupported(el)) {
                        draggableStates[_currentInstance.getAttribute(el, "id")] = draggable;
                        _currentInstance.setElementDraggable(el, draggable);
                    }
                });
            },
        /*
         * private method to do the business of hiding/showing.
         *
         * @param el
         *            either Id of the element in question or a library specific
         *            object for the element.
         * @param state
         *            String specifying a value for the css 'display' property
         *            ('block' or 'none').
         */
            _setVisible = function (el, state, alsoChangeEndpoints) {
                state = state === "block";
                var endpointFunc = null;
                if (alsoChangeEndpoints) {
                    if (state) endpointFunc = function (ep) {
                        ep.setVisible(true, true, true);
                    };
                    else endpointFunc = function (ep) {
                        ep.setVisible(false, true, true);
                    };
                }
                var info = _info(el);
                _operation(info.id, function (jpc) {
                    if (state && alsoChangeEndpoints) {
                        // this test is necessary because this functionality is new, and i wanted to maintain backwards compatibility.
                        // this block will only set a connection to be visible if the other endpoint in the connection is also visible.
                        var oidx = jpc.sourceId === info.id ? 1 : 0;
                        if (jpc.endpoints[oidx].isVisible()) jpc.setVisible(true);
                    }
                    else  // the default behaviour for show, and what always happens for hide, is to just set the visibility without getting clever.
                        jpc.setVisible(state);
                }, endpointFunc);
            },
        /*
         * toggles the draggable state of the given element(s).
         * el is either an id, or an element object, or a list of ids/element objects.
         */
            _toggleDraggable = function (el) {
                return jsPlumb.each(el, function (el) {
                    var elId = _currentInstance.getAttribute(el, "id");
                    var state = draggableStates[elId] == null ? false : draggableStates[elId];
                    state = !state;
                    draggableStates[elId] = state;
                    _currentInstance.setDraggable(el, state);
                    return state;
                }.bind(this));
            },
            /**
             * private method to do the business of toggling hiding/showing.
             */
            _toggleVisible = function (elId, changeEndpoints) {
                var endpointFunc = null;
                if (changeEndpoints) {
                    endpointFunc = function (ep) {
                        var state = ep.isVisible();
                        ep.setVisible(!state);
                    };
                }
                _operation(elId, function (jpc) {
                    var state = jpc.isVisible();
                    jpc.setVisible(!state);
                }, endpointFunc);
            },

        // TODO comparison performance
            _getCachedData = function (elId) {
                var o = offsets[elId];
                if (!o)
                    return _updateOffset({elId: elId});
                else
                    return {o: o, s: sizes[elId]};
            },

            /**
             * gets an id for the given element, creating and setting one if
             * necessary.  the id is of the form
             *
             *    jsPlumb_<instance index>_<index in instance>
             *
             * where "index in instance" is a monotonically increasing integer that starts at 0,
             * for each instance.  this method is used not only to assign ids to elements that do not
             * have them but also to connections and endpoints.
             */
            _getId = function (element, uuid, doNotCreateIfNotFound) {
                if (jsPlumbUtil.isString(element)) return element;
                if (element == null) return null;
                var id = _currentInstance.getAttribute(element, "id");
                if (!id || id === "undefined") {
                    // check if fixed uuid parameter is given
                    if (arguments.length == 2 && arguments[1] !== undefined)
                        id = uuid;
                    else if (arguments.length == 1 || (arguments.length == 3 && !arguments[2]))
                        id = "jsPlumb_" + _instanceIndex + "_" + _idstamp();

                    if (!doNotCreateIfNotFound) _currentInstance.setAttribute(element, "id", id);
                }
                return id;
            };

        this.setConnectionBeingDragged = function (v) {
            connectionBeingDragged = v;
        };
        this.isConnectionBeingDragged = function () {
            return connectionBeingDragged;
        };

        /**
         * Returns a map of all the elements this jsPlumbInstance is currently managing.
         * @returns {Object} Map of [id-> {el, endpoint[], connection, position}] information.
         */
        this.getManagedElements = function() {
            return managedElements;
        };

        this.getRenderMode = function() { return "svg"; };

        this.connectorClass = "jsplumb-connector";
        this.connectorOutlineClass = "jsplumb-connector-outline";
        this.connectedClass = "jsplumb-connected";
        this.hoverClass = "jsplumb-hover";
        this.endpointClass = "jsplumb-endpoint";
        this.endpointConnectedClass = "jsplumb-endpoint-connected";
        this.endpointFullClass = "jsplumb-endpoint-full";
        this.endpointDropAllowedClass = "jsplumb-endpoint-drop-allowed";
        this.endpointDropForbiddenClass = "jsplumb-endpoint-drop-forbidden";
        this.overlayClass = "jsplumb-overlay";
        this.draggingClass = "jsplumb-dragging";
        this.elementDraggingClass = "jsplumb-element-dragging";
        this.sourceElementDraggingClass = "jsplumb-source-element-dragging";
        this.targetElementDraggingClass = "jsplumb-target-element-dragging";
        this.endpointAnchorClassPrefix = "jsplumb-endpoint-anchor";
        this.hoverSourceClass = "jsplumb-source-hover";
        this.hoverTargetClass = "jsplumb-target-hover";
        this.dragSelectClass = "jsplumb-drag-select";

        this.Anchors = {};
        this.Connectors = {  "svg": {} };
        this.Endpoints = { "svg": {} };
        this.Overlays = { "svg": {} } ;
        this.ConnectorRenderers = {};
        this.SVG = "svg";

// --------------------------- jsPlumbInstance public API ---------------------------------------------------------


        this.addEndpoint = function (el, params, referenceParams) {
            referenceParams = referenceParams || {};
            var p = jsPlumb.extend({}, referenceParams);
            jsPlumb.extend(p, params);
            p.endpoint = p.endpoint || _currentInstance.Defaults.Endpoint;
            p.paintStyle = p.paintStyle || _currentInstance.Defaults.EndpointStyle;

            var results = [],
                inputs = (_ju.isArray(el) || (el.length != null && !_ju.isString(el))) ? el : [ el ];

            for (var i = 0, j = inputs.length; i < j; i++) {
                p.source = _currentInstance.getElement(inputs[i]);
                _ensureContainer(p.source);

                var id = _getId(p.source), e = _newEndpoint(p, id);

                // SP new. here we have introduced a class-wide element manager, which is responsible
                // for getting object dimensions and width/height, and for updating these values only
                // when necessary (after a drag, or on a forced refresh call).
                var myOffset = _manage(id, p.source).info.o;
                _ju.addToList(endpointsByElement, id, e);

                if (!_suspendDrawing) {
                    e.paint({
                        anchorLoc: e.anchor.compute({ xy: [ myOffset.left, myOffset.top ], wh: sizes[id], element: e, timestamp: _suspendedAt }),
                        timestamp: _suspendedAt
                    });
                }

                results.push(e);
                e._doNotDeleteOnDetach = true; // mark this as being added via addEndpoint.
            }

            return results.length == 1 ? results[0] : results;
        };

        this.addEndpoints = function (el, endpoints, referenceParams) {
            var results = [];
            for (var i = 0, j = endpoints.length; i < j; i++) {
                var e = _currentInstance.addEndpoint(el, endpoints[i], referenceParams);
                if (_ju.isArray(e))
                    Array.prototype.push.apply(results, e);
                else results.push(e);
            }
            return results;
        };

        this.animate = function (el, properties, options) {
            if (!this.animationSupported) return false;

            options = options || {};
            var del = _currentInstance.getElement(el),
                id = _getId(del),
                stepFunction = jsPlumb.animEvents.step,
                completeFunction = jsPlumb.animEvents.complete;

            options[stepFunction] = _ju.wrap(options[stepFunction], function () {
                _currentInstance.revalidate(id);
            });

            // onComplete repaints, just to make sure everything looks good at the end of the animation.
            options[completeFunction] = _ju.wrap(options[completeFunction], function () {
                _currentInstance.revalidate(id);
            });

            _currentInstance.doAnimate(del, properties, options);
        };

        /**
         * checks for a listener for the given condition, executing it if found, passing in the given value.
         * condition listeners would have been attached using "bind" (which is, you could argue, now overloaded, since
         * firing click events etc is a bit different to what this does).  i thought about adding a "bindCondition"
         * or something, but decided against it, for the sake of simplicity. jsPlumb will never fire one of these
         * condition events anyway.
         */
        this.checkCondition = function (conditionName, args) {
            var l = _currentInstance.getListener(conditionName),
                r = true;

            if (l && l.length > 0) {
                var values = Array.prototype.slice.call(arguments, 1);
                try {
                    for (var i = 0, j = l.length; i < j; i++) {
                        r = r && l[i].apply(l[i], values);
                    }
                }
                catch (e) {
                    _ju.log(_currentInstance, "cannot check condition [" + conditionName + "]" + e);
                }
            }
            return r;
        };

        this.connect = function (params, referenceParams) {
            // prepare a final set of parameters to create connection with
            var _p = _prepareConnectionParams(params, referenceParams), jpc;
            // TODO probably a nicer return value if the connection was not made.  _prepareConnectionParams
            // will return null (and log something) if either endpoint was full.  what would be nicer is to
            // create a dedicated 'error' object.
            if (_p) {
                if (_p.source == null && _p.sourceEndpoint == null) {
                    jsPlumbUtil.log("Cannot establish connection - source does not exist");
                    return;
                }
                if (_p.target == null && _p.targetEndpoint == null) {
                    jsPlumbUtil.log("Cannot establish connection - target does not exist");
                    return;
                }
                _ensureContainer(_p.source);
                // create the connection.  it is not yet registered
                jpc = _newConnection(_p);
                // now add it the model, fire an event, and redraw
                _finaliseConnection(jpc, _p);
            }
            return jpc;
        };

        var stTypes = [
            { el: "source", elId: "sourceId", epDefs: "sourceEndpointDefinitions" },
            { el: "target", elId: "targetId", epDefs: "targetEndpointDefinitions" }
        ];

        var _set = function (c, el, idx, doNotRepaint) {
            var ep, _st = stTypes[idx], cId = c[_st.elId], cEl = c[_st.el], sid, sep,
                oldEndpoint = c.endpoints[idx];

            var evtParams = {
                index: idx,
                originalSourceId: idx === 0 ? cId : c.sourceId,
                newSourceId: c.sourceId,
                originalTargetId: idx == 1 ? cId : c.targetId,
                newTargetId: c.targetId,
                connection: c
            };

            if (el.constructor == jsPlumb.Endpoint) { // TODO here match the current endpoint class; users can change it {
                ep = el;
                ep.addConnection(c);
            }
            else {
                sid = _getId(el);
                sep = this[_st.epDefs][sid];

                if (sid === c[_st.elId])
                    ep = null;  // dont change source/target if the element is already the one given.
                else if (sep) {
                    for (var t in sep) {
                        if (!sep[t].enabled) return;
                        ep = sep[t].endpoint != null && sep[t].endpoint._jsPlumb ? sep[t].endpoint : this.addEndpoint(el, sep[t].def);
                        if (sep[t].uniqueEndpoint) sep[t].endpoint = ep;
                        ep._doNotDeleteOnDetach = false;
                        ep._deleteOnDetach = true;
                        ep.addConnection(c);
                    }
                }
                else {
                    ep = c.makeEndpoint(idx === 0, el, sid);
                    ep._doNotDeleteOnDetach = false;
                    ep._deleteOnDetach = true;
                }
            }

            if (ep != null) {
                oldEndpoint.detachFromConnection(c);
                c.endpoints[idx] = ep;
                c[_st.el] = ep.element;
                c[_st.elId] = ep.elementId;
                evtParams[idx === 0 ? "newSourceId" : "newTargetId"] = ep.elementId;

                fireMoveEvent(evtParams);

                if (!doNotRepaint)
                    c.repaint();
            }

            return evtParams;

        }.bind(this);

        this.setSource = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 0, doNotRepaint);
            this.anchorManager.sourceChanged(p.originalSourceId, p.newSourceId, connection);
        };
        this.setTarget = function (connection, el, doNotRepaint) {
            var p = _set(connection, el, 1, doNotRepaint);
            this.anchorManager.updateOtherEndpoint(p.originalSourceId, p.originalTargetId, p.newTargetId, connection);
        };

        this.deleteEndpoint = function (object, dontUpdateHover) {
            var endpoint = (typeof object === "string") ? endpointsByUUID[object] : object;
            if (endpoint) {
                _currentInstance.deleteObject({ endpoint: endpoint, dontUpdateHover: dontUpdateHover });
            }
            return _currentInstance;
        };

        this.deleteEveryEndpoint = function () {
            var _is = _currentInstance.setSuspendDrawing(true);
            for (var id in endpointsByElement) {
                var endpoints = endpointsByElement[id];
                if (endpoints && endpoints.length) {
                    for (var i = 0, j = endpoints.length; i < j; i++) {
                        _currentInstance.deleteEndpoint(endpoints[i], true);
                    }
                }
            }
            endpointsByElement = {};
            // SP new
            managedElements = {};
            endpointsByUUID = {};
            offsets = {};
            offsetTimestamps = {};
            _currentInstance.anchorManager.reset();
            _currentInstance.getDragManager().reset();
            if (!_is) _currentInstance.setSuspendDrawing(false);
            return _currentInstance;
        };

        var fireDetachEvent = function (jpc, doFireEvent, originalEvent) {
            // may have been given a connection, or in special cases, an object
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                argIsConnection = jpc.constructor == connType,
                params = argIsConnection ? {
                    connection: jpc,
                    source: jpc.source, target: jpc.target,
                    sourceId: jpc.sourceId, targetId: jpc.targetId,
                    sourceEndpoint: jpc.endpoints[0], targetEndpoint: jpc.endpoints[1]
                } : jpc;

            if (doFireEvent)
                _currentInstance.fire("connectionDetached", params, originalEvent);

            _currentInstance.anchorManager.connectionDetached(params);
        };

        var fireMoveEvent = _currentInstance.fireMoveEvent = function (params, evt) {
            _currentInstance.fire("connectionMoved", params, evt);
        };

        this.unregisterEndpoint = function (endpoint) {
            //if (endpoint._jsPlumb == null) return;
            if (endpoint._jsPlumb.uuid) endpointsByUUID[endpoint._jsPlumb.uuid] = null;
            _currentInstance.anchorManager.deleteEndpoint(endpoint);
            // TODO at least replace this with a removeWithFunction call.
            for (var e in endpointsByElement) {
                var endpoints = endpointsByElement[e];
                if (endpoints) {
                    var newEndpoints = [];
                    for (var i = 0, j = endpoints.length; i < j; i++)
                        if (endpoints[i] != endpoint) newEndpoints.push(endpoints[i]);

                    endpointsByElement[e] = newEndpoints;
                }
                if (endpointsByElement[e].length < 1) {
                    delete endpointsByElement[e];
                }
            }
        };

        this.detach = function () {

            if (arguments.length === 0) return;
            var connType = _currentInstance.Defaults.ConnectionType || _currentInstance.getDefaultConnectionType(),
                firstArgIsConnection = arguments[0].constructor == connType,
                params = arguments.length == 2 ? firstArgIsConnection ? (arguments[1] || {}) : arguments[0] : arguments[0],
                fireEvent = (params.fireEvent !== false),
                forceDetach = params.forceDetach,
                conn = firstArgIsConnection ? arguments[0] : params.connection;

            if (conn) {
                if (forceDetach || jsPlumbUtil.functionChain(true, false, [
                    [ conn.endpoints[0], "isDetachAllowed", [ conn ] ],
                    [ conn.endpoints[1], "isDetachAllowed", [ conn ] ],
                    [ conn, "isDetachAllowed", [ conn ] ],
                    [ _currentInstance, "checkCondition", [ "beforeDetach", conn ] ]
                ])) {

                    conn.endpoints[0].detach(conn, false, true, fireEvent);
                }
            }
            else {
                var _p = jsPlumb.extend({}, params); // a backwards compatibility hack: source should be thought of as 'params' in this case.
                // test for endpoint uuids to detach
                if (_p.uuids) {
                    _getEndpoint(_p.uuids[0]).detachFrom(_getEndpoint(_p.uuids[1]), fireEvent);
                } else if (_p.sourceEndpoint && _p.targetEndpoint) {
                    _p.sourceEndpoint.detachFrom(_p.targetEndpoint);
                } else {
                    var sourceId = _getId(_currentInstance.getElement(_p.source)),
                        targetId = _getId(_currentInstance.getElement(_p.target));
                    _operation(sourceId, function (jpc) {
                        if ((jpc.sourceId == sourceId && jpc.targetId == targetId) || (jpc.targetId == sourceId && jpc.sourceId == targetId)) {
                            if (_currentInstance.checkCondition("beforeDetach", jpc)) {
                                jpc.endpoints[0].detach(jpc, false, true, fireEvent);
                            }
                        }
                    });
                }
            }
        };

        this.detachAllConnections = function (el, params) {
            params = params || {};
            el = _currentInstance.getElement(el);
            var id = _getId(el),
                endpoints = endpointsByElement[id];
            if (endpoints && endpoints.length) {
                for (var i = 0, j = endpoints.length; i < j; i++) {
                    endpoints[i].detachAll(params.fireEvent !== false, params.forceDetach);
                }
            }
            return _currentInstance;
        };

        this.detachEveryConnection = function (params) {
            params = params || {};
            _currentInstance.batch(function () {
                for (var id in endpointsByElement) {
                    var endpoints = endpointsByElement[id];
                    if (endpoints && endpoints.length) {
                        for (var i = 0, j = endpoints.length; i < j; i++) {
                            endpoints[i].detachAll(params.fireEvent !== false, params.forceDetach);
                        }
                    }
                }
                connections.length = 0;
            });
            return _currentInstance;
        };

        /// not public.  but of course its exposed. how to change this.
        this.deleteObject = function (params) {
            var result = {
                    endpoints: {},
                    connections: {},
                    endpointCount: 0,
                    connectionCount: 0
                },
                fireEvent = params.fireEvent !== false,
                deleteAttachedObjects = params.deleteAttachedObjects !== false;

            var unravelConnection = function (connection) {
                if (connection != null && result.connections[connection.id] == null) {
                    if (!params.dontUpdateHover && connection._jsPlumb != null) connection.setHover(false);
                    result.connections[connection.id] = connection;
                    result.connectionCount++;
                    if (deleteAttachedObjects) {
                        for (var j = 0; j < connection.endpoints.length; j++) {
                            if (connection.endpoints[j]._deleteOnDetach)
                                unravelEndpoint(connection.endpoints[j]);
                        }
                    }
                }
            };
            var unravelEndpoint = function (endpoint) {
                if (endpoint != null && result.endpoints[endpoint.id] == null) {
                    if (!params.dontUpdateHover && endpoint._jsPlumb != null) endpoint.setHover(false);
                    result.endpoints[endpoint.id] = endpoint;
                    result.endpointCount++;

                    if (deleteAttachedObjects) {
                        for (var i = 0; i < endpoint.connections.length; i++) {
                            var c = endpoint.connections[i];
                            unravelConnection(c);
                        }
                    }
                }
            };

            if (params.connection)
                unravelConnection(params.connection);
            else unravelEndpoint(params.endpoint);

            // loop through connections
            for (var i in result.connections) {
                var c = result.connections[i];
                if (c._jsPlumb) {
                    jsPlumbUtil.removeWithFunction(connections, function (_c) {
                        return c.id == _c.id;
                    });

                    fireDetachEvent(c, params.fireEvent === false ? false : !c.pending, params.originalEvent);

                    c.endpoints[0].detachFromConnection(c);
                    c.endpoints[1].detachFromConnection(c);
                    c.cleanup(true);
                    c.destroy(true);
                }
            }

            // loop through endpoints
            for (var j in result.endpoints) {
                var e = result.endpoints[j];
                if (e._jsPlumb) {
                    _currentInstance.unregisterEndpoint(e);
                    // FIRE some endpoint deleted event?
                    e.cleanup(true);
                    e.destroy(true);
                }
            }

            return result;
        };

        this.draggable = function (el, options) {
            var i, j, info;
            // allows for array or jquery selector
            if (typeof el == 'object' && el.length) {
                for (i = 0, j = el.length; i < j; i++) {
                    info = _info(el[i]);
                    if (info.el) _initDraggableIfNecessary(info.el, true, options, info.id);
                }
            }
            else {
                //ele = _currentInstance.getElement(el);
                info = _info(el);
                if (info.el) _initDraggableIfNecessary(info.el, true, options, info.id);
            }
            return _currentInstance;
        };

        // helpers for select/selectEndpoints
        var _setOperation = function (list, func, args, selector) {
                for (var i = 0, j = list.length; i < j; i++) {
                    list[i][func].apply(list[i], args);
                }
                return selector(list);
            },
            _getOperation = function (list, func, args) {
                var out = [];
                for (var i = 0, j = list.length; i < j; i++) {
                    out.push([ list[i][func].apply(list[i], args), list[i] ]);
                }
                return out;
            },
            setter = function (list, func, selector) {
                return function () {
                    return _setOperation(list, func, arguments, selector);
                };
            },
            getter = function (list, func) {
                return function () {
                    return _getOperation(list, func, arguments);
                };
            },
            prepareList = function (input, doNotGetIds) {
                var r = [];
                if (input) {
                    if (typeof input == 'string') {
                        if (input === "*") return input;
                        r.push(input);
                    }
                    else {
                        if (doNotGetIds) r = input;
                        else {
                            if (input.length) {
                                for (var i = 0, j = input.length; i < j; i++)
                                    r.push(_info(input[i]).id);
                            }
                            else
                                r.push(_info(input).id);
                        }
                    }
                }
                return r;
            },
            filterList = function (list, value, missingIsFalse) {
                if (list === "*") return true;
                return list.length > 0 ? list.indexOf(value) != -1 : !missingIsFalse;
            };

        // get some connections, specifying source/target/scope
        this.getConnections = function (options, flat) {
            if (!options) {
                options = {};
            } else if (options.constructor == String) {
                options = { "scope": options };
            }
            var scope = options.scope || _currentInstance.getDefaultScope(),
                scopes = prepareList(scope, true),
                sources = prepareList(options.source),
                targets = prepareList(options.target),
                results = (!flat && scopes.length > 1) ? {} : [],
                _addOne = function (scope, obj) {
                    if (!flat && scopes.length > 1) {
                        var ss = results[scope];
                        if (ss == null) {
                            ss = results[scope] = [];
                        }
                        ss.push(obj);
                    } else results.push(obj);
                };

            for (var j = 0, jj = connections.length; j < jj; j++) {
                var c = connections[j];
                if (filterList(scopes, c.scope) && filterList(sources, c.sourceId) && filterList(targets, c.targetId))
                    _addOne(c.scope, c);
            }

            return results;
        };

        var _curryEach = function (list, executor) {
                return function (f) {
                    for (var i = 0, ii = list.length; i < ii; i++) {
                        f(list[i]);
                    }
                    return executor(list);
                };
            },
            _curryGet = function (list) {
                return function (idx) {
                    return list[idx];
                };
            };

        var _makeCommonSelectHandler = function (list, executor) {
            var out = {
                    length: list.length,
                    each: _curryEach(list, executor),
                    get: _curryGet(list)
                },
                setters = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay",
                    "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle",
                    "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible",
                    "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind" ],

                getters = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle",
                    "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents" ],
                i, ii;

            for (i = 0, ii = setters.length; i < ii; i++)
                out[setters[i]] = setter(list, setters[i], executor);

            for (i = 0, ii = getters.length; i < ii; i++)
                out[getters[i]] = getter(list, getters[i]);

            return out;
        };

        var _makeConnectionSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeConnectionSelectHandler);
            return jsPlumb.extend(common, {
                // setters
                setDetachable: setter(list, "setDetachable", _makeConnectionSelectHandler),
                setReattach: setter(list, "setReattach", _makeConnectionSelectHandler),
                setConnector: setter(list, "setConnector", _makeConnectionSelectHandler),
                detach: function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        _currentInstance.detach(list[i]);
                },
                // getters
                isDetachable: getter(list, "isDetachable"),
                isReattach: getter(list, "isReattach")
            });
        };

        var _makeEndpointSelectHandler = function (list) {
            var common = _makeCommonSelectHandler(list, _makeEndpointSelectHandler);
            return jsPlumb.extend(common, {
                setEnabled: setter(list, "setEnabled", _makeEndpointSelectHandler),
                setAnchor: setter(list, "setAnchor", _makeEndpointSelectHandler),
                isEnabled: getter(list, "isEnabled"),
                detachAll: function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        list[i].detachAll();
                },
                "remove": function () {
                    for (var i = 0, ii = list.length; i < ii; i++)
                        _currentInstance.deleteObject({endpoint: list[i]});
                }
            });
        };

        this.select = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            return _makeConnectionSelectHandler(params.connections || _currentInstance.getConnections(params, true));
        };

        this.selectEndpoints = function (params) {
            params = params || {};
            params.scope = params.scope || "*";
            var noElementFilters = !params.element && !params.source && !params.target,
                elements = noElementFilters ? "*" : prepareList(params.element),
                sources = noElementFilters ? "*" : prepareList(params.source),
                targets = noElementFilters ? "*" : prepareList(params.target),
                scopes = prepareList(params.scope, true);

            var ep = [];

            for (var el in endpointsByElement) {
                var either = filterList(elements, el, true),
                    source = filterList(sources, el, true),
                    sourceMatchExact = sources != "*",
                    target = filterList(targets, el, true),
                    targetMatchExact = targets != "*";

                // if they requested 'either' then just match scope. otherwise if they requested 'source' (not as a wildcard) then we have to match only endpoints that have isSource set to to true, and the same thing with isTarget.
                if (either || source || target) {
                    inner:
                        for (var i = 0, ii = endpointsByElement[el].length; i < ii; i++) {
                            var _ep = endpointsByElement[el][i];
                            if (filterList(scopes, _ep.scope, true)) {

                                var noMatchSource = (sourceMatchExact && sources.length > 0 && !_ep.isSource),
                                    noMatchTarget = (targetMatchExact && targets.length > 0 && !_ep.isTarget);

                                if (noMatchSource || noMatchTarget)
                                    continue inner;

                                ep.push(_ep);
                            }
                        }
                }
            }

            return _makeEndpointSelectHandler(ep);
        };

        // get all connections managed by the instance of jsplumb.
        this.getAllConnections = function () {
            return connections;
        };
        this.getDefaultScope = function () {
            return DEFAULT_SCOPE;
        };
        // get an endpoint by uuid.
        this.getEndpoint = _getEndpoint;
        // get endpoints for some element.
        this.getEndpoints = function (el) {
            return endpointsByElement[_info(el).id];
        };
        // gets the default endpoint type. used when subclassing. see wiki.
        this.getDefaultEndpointType = function () {
            return jsPlumb.Endpoint;
        };
        // gets the default connection type. used when subclassing.  see wiki.
        this.getDefaultConnectionType = function () {
            return jsPlumb.Connection;
        };
        /*
         * Gets an element's id, creating one if necessary. really only exposed
         * for the lib-specific functionality to access; would be better to pass
         * the current instance into the lib-specific code (even though this is
         * a static call. i just don't want to expose it to the public API).
         */
        this.getId = _getId;

        this.appendElement = _appendElement;

        var _hoverSuspended = false;
        this.isHoverSuspended = function () {
            return _hoverSuspended;
        };
        this.setHoverSuspended = function (s) {
            _hoverSuspended = s;
        };

        // set an element's connections to be hidden
        this.hide = function (el, changeEndpoints) {
            _setVisible(el, "none", changeEndpoints);
            return _currentInstance;
        };

        // exposed for other objects to use to get a unique id.
        this.idstamp = _idstamp;

        this.connectorsInitialized = false;
        this.registerConnectorType = function (connector, name) {
            connectorTypes.push([connector, name]);
        };

        // ensure that, if the current container exists, it is a DOM element and not a selector.
        // if it does not exist and `candidate` is supplied, the offset parent of that element will be set as the Container.
        // this is used to do a better default behaviour for the case that the user has not set a container:
        // addEndpoint, makeSource, makeTarget and connect all call this method with the offsetParent of the
        // element in question (for connect it is the source element). So if no container is set, it is inferred
        // to be the offsetParent of the first element the user tries to connect.
        var _ensureContainer = function (candidate) {
            if (!_container && candidate) {
                var can = _currentInstance.getElement(candidate);
                if (can.offsetParent) _currentInstance.setContainer(can.offsetParent);
            }
        };

        var _getContainerFromDefaults = function () {
            if (_currentInstance.Defaults.Container)
                _currentInstance.setContainer(_currentInstance.Defaults.Container);
        };

        // check if a given element is managed or not. if not, add to our map. if drawing is not suspended then
        // we'll also stash its dimensions; otherwise we'll do this in a lazy way through updateOffset.
        var _manage = _currentInstance.manage = function (id, element, transient) {
            if (!managedElements[id]) {
                managedElements[id] = {
                    el: element,
                    endpoints: [],
                    connections: []
                };

                managedElements[id].info = _updateOffset({ elId: id, timestamp: _suspendedAt });
                if (!transient) {
                    _currentInstance.fire("manageElement", { id:id, info:managedElements[id].info, el:element });
                }
            }

            return managedElements[id];
        };

        var _unmanage = function(id) {
            if (managedElements[id]) {
                delete managedElements[id];
                _currentInstance.fire("unmanageElement", id);
            }
        };

        /**
         * updates the offset and size for a given element, and stores the
         * values. if 'offset' is not null we use that (it would have been
         * passed in from a drag call) because it's faster; but if it is null,
         * or if 'recalc' is true in order to force a recalculation, we get the current values.
         */
        var _updateOffset = this.updateOffset = function (params) {

            var timestamp = params.timestamp, recalc = params.recalc, offset = params.offset, elId = params.elId, s;
            if (_suspendDrawing && !timestamp) timestamp = _suspendedAt;
            if (!recalc) {
                if (timestamp && timestamp === offsetTimestamps[elId]) {
                    return {o: params.offset || offsets[elId], s: sizes[elId]};
                }
            }
            if (recalc || (!offset && offsets[elId] == null)) { // if forced repaint or no offset available, we recalculate.

                // get the current size and offset, and store them
                s = managedElements[elId] ? managedElements[elId].el : null;
                if (s != null) {
                    sizes[elId] = _currentInstance.getSize(s);
                    offsets[elId] = _currentInstance.getOffset(s);
                    offsetTimestamps[elId] = timestamp;
                }
            } else {
                offsets[elId] = offset || offsets[elId];
                if (sizes[elId] == null) {
                    s = managedElements[elId].el;
                    if (s != null) sizes[elId] = _currentInstance.getSize(s);
                }
                offsetTimestamps[elId] = timestamp;
            }

            if (offsets[elId] && !offsets[elId].right) {
                offsets[elId].right = offsets[elId].left + sizes[elId][0];
                offsets[elId].bottom = offsets[elId].top + sizes[elId][1];
                offsets[elId].width = sizes[elId][0];
                offsets[elId].height = sizes[elId][1];
                offsets[elId].centerx = offsets[elId].left + (offsets[elId].width / 2);
                offsets[elId].centery = offsets[elId].top + (offsets[elId].height / 2);
            }

            return {o: offsets[elId], s: sizes[elId]};
        };

        /**
         * callback from the current library to tell us to prepare ourselves (attach
         * mouse listeners etc; can't do that until the library has provided a bind method)
         */
        this.init = function () {
            rendererTypes = jsPlumb.getRenderModes();

            var _oneType = function (renderer, name, fn) {
                jsPlumb.Connectors[renderer][name] = function () {
                    fn.apply(this, arguments);
                    jsPlumb.ConnectorRenderers[renderer].apply(this, arguments);
                };
                jsPlumbUtil.extend(jsPlumb.Connectors[renderer][name], [ fn, jsPlumb.ConnectorRenderers[renderer]]);
            };

            if (!jsPlumb.connectorsInitialized) {
                for (var i = 0; i < connectorTypes.length; i++) {
                    for (var j = 0; j < rendererTypes.length; j++) {
                        _oneType(rendererTypes[j], connectorTypes[i][1], connectorTypes[i][0]);
                    }

                }
                jsPlumb.connectorsInitialized = true;
            }

            if (!initialized) {
                _getContainerFromDefaults();
                _currentInstance.anchorManager = new jsPlumb.AnchorManager({jsPlumbInstance: _currentInstance});
                initialized = true;
                _currentInstance.fire("ready", _currentInstance);
            }
        }.bind(this);

        this.log = log;
        this.jsPlumbUIComponent = jsPlumbUIComponent;

        /*
         * Creates an anchor with the given params.
         *
         *
         * Returns: The newly created Anchor.
         * Throws: an error if a named anchor was not found.
         */
        this.makeAnchor = function () {
            var pp, _a = function (t, p) {
                if (jsPlumb.Anchors[t]) return new jsPlumb.Anchors[t](p);
                if (!_currentInstance.Defaults.DoNotThrowErrors)
                    throw { msg: "jsPlumb: unknown anchor type '" + t + "'" };
            };
            if (arguments.length === 0) return null;
            var specimen = arguments[0], elementId = arguments[1], jsPlumbInstance = arguments[2], newAnchor = null;
            // if it appears to be an anchor already...
            if (specimen.compute && specimen.getOrientation) return specimen;  //TODO hazy here about whether it should be added or is already added somehow.
            // is it the name of an anchor type?
            else if (typeof specimen == "string") {
                newAnchor = _a(arguments[0], {elementId: elementId, jsPlumbInstance: _currentInstance});
            }
            // is it an array? it will be one of:
            // 		an array of [spec, params] - this defines a single anchor, which may be dynamic, but has parameters.
            //		an array of arrays - this defines some dynamic anchors
            //		an array of numbers - this defines a single anchor.
            else if (_ju.isArray(specimen)) {
                if (_ju.isArray(specimen[0]) || _ju.isString(specimen[0])) {
                    // if [spec, params] format
                    if (specimen.length == 2 && _ju.isObject(specimen[1])) {
                        // if first arg is a string, its a named anchor with params
                        if (_ju.isString(specimen[0])) {
                            pp = jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance}, specimen[1]);
                            newAnchor = _a(specimen[0], pp);
                        }
                        // otherwise first arg is array, second is params. we treat as a dynamic anchor, which is fine
                        // even if the first arg has only one entry. you could argue all anchors should be implicitly dynamic in fact.
                        else {
                            pp = jsPlumb.extend({elementId: elementId, jsPlumbInstance: _currentInstance, anchors: specimen[0]}, specimen[1]);
                            newAnchor = new jsPlumb.DynamicAnchor(pp);
                        }
                    }
                    else
                        newAnchor = new jsPlumb.DynamicAnchor({anchors: specimen, selector: null, elementId: elementId, jsPlumbInstance: _currentInstance});

                }
                else {
                    var anchorParams = {
                        x: specimen[0], y: specimen[1],
                        orientation: (specimen.length >= 4) ? [ specimen[2], specimen[3] ] : [0, 0],
                        offsets: (specimen.length >= 6) ? [ specimen[4], specimen[5] ] : [ 0, 0 ],
                        elementId: elementId,
                        jsPlumbInstance: _currentInstance,
                        cssClass: specimen.length == 7 ? specimen[6] : null
                    };
                    newAnchor = new jsPlumb.Anchor(anchorParams);
                    newAnchor.clone = function () {
                        return new jsPlumb.Anchor(anchorParams);
                    };
                }
            }

            if (!newAnchor.id) newAnchor.id = "anchor_" + _idstamp();
            return newAnchor;
        };

        /**
         * makes a list of anchors from the given list of types or coords, eg
         * ["TopCenter", "RightMiddle", "BottomCenter", [0, 1, -1, -1] ]
         */
        this.makeAnchors = function (types, elementId, jsPlumbInstance) {
            var r = [];
            for (var i = 0, ii = types.length; i < ii; i++) {
                if (typeof types[i] == "string")
                    r.push(jsPlumb.Anchors[types[i]]({elementId: elementId, jsPlumbInstance: jsPlumbInstance}));
                else if (_ju.isArray(types[i]))
                    r.push(_currentInstance.makeAnchor(types[i], elementId, jsPlumbInstance));
            }
            return r;
        };

        /**
         * Makes a dynamic anchor from the given list of anchors (which may be in shorthand notation as strings or dimension arrays, or Anchor
         * objects themselves) and the given, optional, anchorSelector function (jsPlumb uses a default if this is not provided; most people will
         * not need to provide this - i think).
         */
        this.makeDynamicAnchor = function (anchors, anchorSelector) {
            return new jsPlumb.DynamicAnchor({anchors: anchors, selector: anchorSelector, elementId: null, jsPlumbInstance: _currentInstance});
        };

// --------------------- makeSource/makeTarget ---------------------------------------------- 

        this.targetEndpointDefinitions = {};
        var _setEndpointPaintStylesAndAnchor = function (ep, epIndex, _instance) {
           /* ep.paintStyle = ep.paintStyle ||
                _instance.Defaults.EndpointStyles[epIndex] ||
                _instance.Defaults.EndpointStyle;

            ep.hoverPaintStyle = ep.hoverPaintStyle ||
                _instance.Defaults.EndpointHoverStyles[epIndex] ||
                _instance.Defaults.EndpointHoverStyle;

            ep.anchor = ep.anchor ||
                _instance.Defaults.Anchors[epIndex] ||
                _instance.Defaults.Anchor;

            ep.endpoint = ep.endpoint ||
                _instance.Defaults.Endpoints[epIndex] ||
                _instance.Defaults.Endpoint;*/
        };

        // TODO put all the source stuff inside one parent, keyed by id.
        this.sourceEndpointDefinitions = {};

        var selectorFilter = function (evt, _el, selector, _instance, negate) {
            var t = evt.target || evt.srcElement, ok = false,
                sel = _instance.getSelector(_el, selector);
            for (var j = 0; j < sel.length; j++) {
                if (sel[j] == t) {
                    ok = true;
                    break;
                }
            }
            return negate ? !ok : ok;
        };

        // SP target source refactor
        var _makeElementDropHandler = function (elInfo, p, dropOptions, isSource, isTarget) {
            var proxyComponent = new jsPlumbUIComponent(p);
            var _drop = p._jsPlumb.EndpointDropHandler({
                jsPlumb: _currentInstance,
                enabled: function () {
                    return elInfo.def.enabled;
                },
                isFull: function () {
                    var targetCount = _currentInstance.select({target: elInfo.id}).length;
                    return elInfo.def.maxConnections > 0 && targetCount >= elInfo.def.maxConnections;
                },
                element: elInfo.el,
                elementId: elInfo.id,
                isSource: isSource,
                isTarget: isTarget,
                addClass: function (clazz) {
                    _currentInstance.addClass(elInfo.el, clazz);
                },
                removeClass: function (clazz) {
                    _currentInstance.removeClass(elInfo.el, clazz);
                },
                onDrop: function (jpc) {
                    var source = jpc.endpoints[0];
                    source.anchor.locked = false;
                },
                isDropAllowed: function () {
                    return proxyComponent.isDropAllowed.apply(proxyComponent, arguments);
                },
                isRedrop:function(jpc) {
                    return (jpc.suspendedElement != null && jpc.suspendedEndpoint != null && jpc.suspendedEndpoint.element === elInfo.el);
                },
                getEndpoint: function (jpc) {

                    // make a new Endpoint for the target, or get it from the cache if uniqueEndpoint
                    // is set. if its a redrop the new endpoint will be immediately cleaned up.

                    var newEndpoint = elInfo.def.endpoint;

                    // if no cached endpoint, or there was one but it has been cleaned up
                    // (ie. detached), create a new one
                    if (newEndpoint == null || newEndpoint._jsPlumb == null) {
                        var eps = _currentInstance.deriveEndpointAndAnchorSpec(jpc.getType().join(" "), true);
                        var pp = eps.endpoints ? jsPlumb.extend(p, {
                            endpoint:elInfo.def.def.endpoint || eps.endpoints[1]
                        }) :p;
                        if (eps.anchors) {
                            pp = jsPlumb.extend(pp, {
                                anchor:elInfo.def.def.anchor || eps.anchors[1]
                            });
                        }
                        newEndpoint = _currentInstance.addEndpoint(elInfo.el, pp);
                        newEndpoint._mtNew = true;
                    }

                    if (p.uniqueEndpoint) elInfo.def.endpoint = newEndpoint;  // may of course just store what it just pulled out. that's ok.
                    // TODO test options to makeTarget to see if we should do this?
                    newEndpoint._doNotDeleteOnDetach = false; // reset.
                    newEndpoint._deleteOnDetach = true;

                    // if connection is detachable, init the new endpoint to be draggable, to support that happening.
                    if (jpc.isDetachable())
                        newEndpoint.initDraggable();

                    // if the anchor has a 'positionFinder' set, then delegate to that function to find
                    // out where to locate the anchor.
                    if (newEndpoint.anchor.positionFinder != null) {
                        var dropPosition = _currentInstance.getUIPosition(arguments, _currentInstance.getZoom()),
                            elPosition = _currentInstance.getOffset(elInfo.el),
                            elSize = _currentInstance.getSize(elInfo.el),
                            ap = newEndpoint.anchor.positionFinder(dropPosition, elPosition, elSize, newEndpoint.anchor.constructorParams);

                        newEndpoint.anchor.x = ap[0];
                        newEndpoint.anchor.y = ap[1];
                        // now figure an orientation for it..kind of hard to know what to do actually. probably the best thing i can do is to
                        // support specifying an orientation in the anchor's spec. if one is not supplied then i will make the orientation
                        // be what will cause the most natural link to the source: it will be pointing at the source, but it needs to be
                        // specified in one axis only, and so how to make that choice? i think i will use whichever axis is the one in which
                        // the target is furthest away from the source.
                    }

                    return newEndpoint;
                },
                maybeCleanup: function (ep) {
                    if (ep._mtNew && ep.connections.length === 0) {
                        _currentInstance.deleteObject({endpoint: ep});
                    }
                    else
                        delete ep._mtNew;
                }
            });

            // wrap drop events as needed and initialise droppable
            var dropEvent = jsPlumb.dragEvents.drop;
            dropOptions.scope = dropOptions.scope || (p.scope || _currentInstance.Defaults.Scope);
            dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], _drop, true);

            // if target, return true from the over event. this will cause katavorio to stop setting drops to hover
            // if multipleDrop is set to false.
            if (isTarget) {
                dropOptions[jsPlumb.dragEvents.over] = function () { return true; };
            }

            // vanilla jsplumb only
            if (p.allowLoopback === false) {
                dropOptions.canDrop = function (_drag) {
                    var de = _drag.getDragElement()._jsPlumbRelatedElement;
                    return de != elInfo.el;
                };
            }
            _currentInstance.initDroppable(elInfo.el, dropOptions, "internal");

            return _drop;

        };

        // see API docs
        this.makeTarget = function (el, params, referenceParams) {

            // put jsplumb ref into params without altering the params passed in
            var p = jsPlumb.extend({_jsPlumb: this}, referenceParams);
            jsPlumb.extend(p, params);

            // calculate appropriate paint styles and anchor from the params given
            _setEndpointPaintStylesAndAnchor(p, 1, this);

            var deleteEndpointsOnDetach = !(p.deleteEndpointsOnDetach === false),
                maxConnections = p.maxConnections || -1,

                _doOne = function (el) {

                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    // decode the info for this element (id and element)
                    var elInfo = _info(el),
                        elid = elInfo.id,
                        dropOptions = jsPlumb.extend({}, p.dropOptions || {}),
                        type = "default";

                    this.targetEndpointDefinitions[elid] = this.targetEndpointDefinitions[elid] || {};

                    _ensureContainer(elid);

                    // store the definition
                    var _def = {
                        def: jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };
                    elInfo.def = _def;
                    this.targetEndpointDefinitions[elid][type] = _def;
                    _makeElementDropHandler(elInfo, p, dropOptions, p.isSource === true, true);

                }.bind(this);

            // make an array if only given one element
            var inputs = el.length && el.constructor != String ? el : [ el ];

            // register each one in the list.
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(inputs[i]);
            }

            return this;
        };

        // see api docs
        this.unmakeTarget = function (el, doNotClearArrays) {
            var info = _info(el);
            jsPlumb.destroyDroppable(info.el);
            if (!doNotClearArrays) {
                delete this.targetEndpointDefinitions[info.id];
            }

            return this;
        };

        // see api docs
        this.makeSource = function (el, params, referenceParams) {
            var p = jsPlumb.extend({_jsPlumb: this}, referenceParams);
            jsPlumb.extend(p, params);
            var type = p.connectionType || "default";
            var aae = _currentInstance.deriveEndpointAndAnchorSpec(type);
            p.endpoint = p.endpoint || aae.endpoints[0];
            p.anchor = p.anchor || aae.anchors[0];
            _setEndpointPaintStylesAndAnchor(p, 0, this);
            var maxConnections = p.maxConnections || -1,
                onMaxConnections = p.onMaxConnections,
                _doOne = function (elInfo) {
                    // get the element's id and store the endpoint definition for it.  jsPlumb.connect calls will look for one of these,
                    // and use the endpoint definition if found.
                    var elid = elInfo.id,
                        _del = this.getElement(elInfo.el);

                    this.sourceEndpointDefinitions[elid] = this.sourceEndpointDefinitions[elid] || {};
                    _ensureContainer(elid);

                    var _def = {
                        def:jsPlumb.extend({}, p),
                        uniqueEndpoint: p.uniqueEndpoint,
                        maxConnections: maxConnections,
                        enabled: true
                    };


                    this.sourceEndpointDefinitions[elid][type] = _def;
                    elInfo.def = _def;

                    var stopEvent = jsPlumb.dragEvents.stop,
                        dragEvent = jsPlumb.dragEvents.drag,
                        dragOptions = jsPlumb.extend({ }, p.dragOptions || {}),
                        existingDrag = dragOptions.drag,
                        existingStop = dragOptions.stop,
                        ep = null,
                        endpointAddedButNoDragYet = false;

                    // set scope if its not set in dragOptions but was passed in in params
                    dragOptions.scope = dragOptions.scope || p.scope;

                    dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], function () {
                        if (existingDrag) existingDrag.apply(this, arguments);
                        endpointAddedButNoDragYet = false;
                    });

                    dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], function () {

                        if (existingStop) existingStop.apply(this, arguments);
                        this.currentlyDragging = false;
                        if (ep._jsPlumb != null) { // if not cleaned up...

                            // reset the anchor to the anchor that was initially provided. the one we were using to drag
                            // the connection was just a placeholder that was located at the place the user pressed the
                            // mouse button to initiate the drag.
                            var anchorDef = p.anchor || this.Defaults.Anchor,
                                oldAnchor = ep.anchor,
                                oldConnection = ep.connections[0];

                            // if the connection has a type, try to get an anchor spec for it.
                            /*if (oldConnection != null) {
                                var aae = _currentInstance.deriveEndpointAndAnchorSpec(oldConnection.getType().join(" "), false);
                                if (aae.anchors) anchorDef = aae.anchor[0];
                                if (aae.endpoints) ep.setEndpoint(aae.endpoints[0]);
                            }*/

                            var    newAnchor = this.makeAnchor(anchorDef, elid, this),
                                _el = ep.element;

                            // if the anchor has a 'positionFinder' set, then delegate to that function to find
                            // out where to locate the anchor. issue 117.
                            if (newAnchor.positionFinder != null) {
                                var elPosition = _currentInstance.getOffset(_el),
                                    elSize = this.getSize(_el),
                                    dropPosition = { left: elPosition.left + (oldAnchor.x * elSize[0]), top: elPosition.top + (oldAnchor.y * elSize[1]) },
                                    ap = newAnchor.positionFinder(dropPosition, elPosition, elSize, newAnchor.constructorParams);

                                newAnchor.x = ap[0];
                                newAnchor.y = ap[1];
                            }

                            ep.setAnchor(newAnchor, true);
                            ep.repaint();
                            this.repaint(ep.elementId);
                            if (oldConnection != null) this.repaint(oldConnection.targetId);
                        }
                    }.bind(this));

                    // when the user presses the mouse, add an Endpoint, if we are enabled.
                    var mouseDownListener = function (e) {
                        // on right mouse button, abort.
                        if (e.which === 3 || e.button === 2) return;

                        // TODO store def on element.
                        var def = this.sourceEndpointDefinitions[elid][type];

                        // if disabled, return.
                        if (!def.enabled) return;

                        elid = this.getId(this.getElement(elInfo.el)); // elid might have changed since this method was called to configure the element.

                        // if a filter was given, run it, and return if it says no.
                        if (p.filter) {
                            var r = jsPlumbUtil.isString(p.filter) ? selectorFilter(e, elInfo.el, p.filter, this, p.filterExclude) : p.filter(e, elInfo.el);
                            if (r === false) return;
                        }

                        // if maxConnections reached
                        var sourceCount = this.select({source: elid}).length;
                        if (def.maxConnections >= 0 && (sourceCount >= def.maxConnections)) {
                            if (onMaxConnections) {
                                onMaxConnections({
                                    element: elInfo.el,
                                    maxConnections: maxConnections
                                }, e);
                            }
                            return false;
                        }

                        // find the position on the element at which the mouse was pressed; this is where the endpoint
                        // will be located.
                        var elxy = jsPlumb.getPositionOnElement(e, _del, _zoom);

                        // we need to override the anchor in here, and force 'isSource', but we don't want to mess with
                        // the params passed in, because after a connection is established we're going to reset the endpoint
                        // to have the anchor we were given.
                        var tempEndpointParams = {};
                        jsPlumb.extend(tempEndpointParams, p);
                        tempEndpointParams.isTemporarySource = true;
                        tempEndpointParams.anchor = [ elxy[0], elxy[1] , 0, 0];
                        tempEndpointParams.dragOptions = dragOptions;

                        if (def.def.scope) tempEndpointParams.scope = def.def.scope;

                        ep = this.addEndpoint(elid, tempEndpointParams);
                        endpointAddedButNoDragYet = true;
                        ep._doNotDeleteOnDetach = false; // reset.
                        ep._deleteOnDetach = true;

                        // if unique endpoint and it's already been created, push it onto the endpoint we create. at the end
                        // of a successful connection we'll switch to that endpoint.
                        // TODO this is the same code as the programmatic endpoints create on line 1050 ish
                        if (def.uniqueEndpoint) {
                            if (!def.endpoint) {
                                def.endpoint = ep;
                                ep._deleteOnDetach = false;
                                ep._doNotDeleteOnDetach = true;
                            }
                            else
                                ep.finalEndpoint = def.endpoint;
                        }

                        var _delTempEndpoint = function () {
                            // this mouseup event is fired only if no dragging occurred, by jquery and yui, but for mootools
                            // it is fired even if dragging has occurred, in which case we would blow away a perfectly
                            // legitimate endpoint, were it not for this check.  the flag is set after adding an
                            // endpoint and cleared in a drag listener we set in the dragOptions above.
                            _currentInstance.off(ep.canvas, "mouseup", _delTempEndpoint);
                            _currentInstance.off(elInfo.el, "mouseup", _delTempEndpoint);
                            if (endpointAddedButNoDragYet) {
                                endpointAddedButNoDragYet = false;
                                _currentInstance.deleteEndpoint(ep);
                            }
                        };

                        _currentInstance.on(ep.canvas, "mouseup", _delTempEndpoint);
                        _currentInstance.on(elInfo.el, "mouseup", _delTempEndpoint);

                        // optionally check for attributes to extract from the source element
                        var payload = {};
                        if (def.def.extract) {
                            for (var att in def.def.extract) {
                                var v = e.srcElement.getAttribute(att);
                                if (v) {
                                    payload[def.def.extract[att]] = v;
                                }
                            }
                        }

                        // and then trigger its mousedown event, which will kick off a drag, which will start dragging
                        // a new connection from this endpoint.
                        _currentInstance.trigger(ep.canvas, "mousedown", e, payload);

                        jsPlumbUtil.consume(e);

                    }.bind(this);

                    this.on(elInfo.el, "mousedown", mouseDownListener);
                    _def.trigger = mouseDownListener;

                    // if a filter was provided, set it as a dragFilter on the element,
                    // to prevent the element drag function from kicking in when we want to
                    // drag a new connection
                    if (p.filter && (jsPlumbUtil.isString(p.filter) || jsPlumbUtil.isFunction(p.filter))) {
                        _currentInstance.setDragFilter(elInfo.el, p.filter);
                    }

                    var dropOptions = jsPlumb.extend({}, p.dropOptions || {});

                    _makeElementDropHandler(elInfo, p, dropOptions, true, p.isTarget === true);

                }.bind(this);

            var inputs = el.length && el.constructor != String ? el : [ el ];
            for (var i = 0, ii = inputs.length; i < ii; i++) {
                _doOne(_info(inputs[i]));
            }

            return this;
        };

        // see api docs
        this.unmakeSource = function (el, connectionType, doNotClearArrays) {
            var info = _info(el);
            var eldefs = this.sourceEndpointDefinitions[info.id];
            if (eldefs) {
                for (var def in eldefs) {
                    if (connectionType == null || connectionType === def) {
                        var mouseDownListener = eldefs[def].trigger;
                        if (mouseDownListener)
                            _currentInstance.off(info.el, "mousedown", mouseDownListener);
                        if (!doNotClearArrays) {
                            delete this.sourceEndpointDefinitions[info.id][def];
                        }
                    }
                }
            }

            return this;
        };

        // see api docs
        this.unmakeEverySource = function () {
            for (var i in this.sourceEndpointDefinitions)
                _currentInstance.unmakeSource(i, null, true);

            this.sourceEndpointDefinitions = {};
            return this;
        };

        var _getScope = function (el, types, connectionType) {
            types = jsPlumbUtil.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) return eldefs[connectionType].def.scope || this.Defaults.Scope;
            }
        }.bind(this);

        var _setScope = function (el, scope, types, connectionType) {
            types = jsPlumbUtil.isArray(types) ? types : [ types ];
            var id = _getId(el);
            connectionType = connectionType || "default";
            for (var i = 0; i < types.length; i++) {
                var eldefs = this[types[i]][id];
                if (eldefs && eldefs[connectionType]) {
                    eldefs[connectionType].def.scope = scope;
                }
            }

        }.bind(this);

        this.getScope = function (el, scope) {
            return _getScope(el, [ "sourceEndpointDefinitions", "targetEndpointDefinitions" ]);
        };
        this.getSourceScope = function (el) {
            return _getScope(el, "sourceEndpointDefinitions");
        };
        this.getTargetScope = function (el) {
            return _getScope(el, "targetEndpointDefinitions");
        };
        this.setScope = function (el, scope, connectionType) {
            this.setSourceScope(el, scope, connectionType);
            this.setTargetScope(el, scope, connectionType);
        };
        this.setSourceScope = function (el, scope, connectionType) {
            _setScope(el, scope, "sourceEndpointDefinitions", connectionType);
            // we get the source scope during the mousedown event, but we also want to set this.
            this.setDragScope(el, scope);
        };
        this.setTargetScope = function (el, scope, connectionType) {
            _setScope(el, scope, "targetEndpointDefinitions", connectionType);
            this.setDropScope(el, scope);
        };

        // see api docs
        this.unmakeEveryTarget = function () {
            for (var i in this.targetEndpointDefinitions)
                _currentInstance.unmakeTarget(i, true);

            this.targetEndpointDefinitions = {};
            return this;
        };

        // does the work of setting a source enabled or disabled.
        var _setEnabled = function (type, el, state, toggle, connectionType) {
            var a = type == "source" ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
            connectionType = connectionType || "default";


            if (_ju.isString(el) && a[el] && a[el][connectionType]) {
                a[el][connectionType].enabled = toggle ? !a[el][connectionType].enabled : state;
            }
            else if (el.length) {
                for (var i = 0, ii = el.length; i < ii; i++) {
                    var info = _info(el[i]);
                    if (a[info.id] && a[info.id][connectionType])
                        a[info.id][connectionType].enabled = toggle ? !a[info.id][connectionType].enabled : state;
                }
            }
            // otherwise a DOM element
            else {
                var id = _info(el).id;
                if (a[id] && a[id][connectionType])
                    a[id][connectionType].enabled = toggle ? !a[id][connectionType].enabled : state;
            }
            return this;
        }.bind(this);

        var _first = function (el, fn) {
            if (_ju.isString(el) || !el.length)
                return fn.apply(this, [ el ]);
            else if (el.length)
                return fn.apply(this, [ el[0] ]);

        }.bind(this);

        this.toggleSourceEnabled = function (el, connectionType) {
            _setEnabled("source", el, null, true, connectionType);
            return this.isSourceEnabled(el, connectionType);
        };

        this.setSourceEnabled = function (el, state, connectionType) {
            return _setEnabled("source", el, state, null, connectionType);
        };
        this.isSource = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.sourceEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isSourceEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var sep = this.sourceEndpointDefinitions[_info(_el).id];
                return sep && sep[connectionType] && sep[connectionType].enabled === true;
            }.bind(this));
        };

        this.toggleTargetEnabled = function (el, connectionType) {
            _setEnabled("target", el, null, true, connectionType);
            return this.isTargetEnabled(el, connectionType);
        };

        this.isTarget = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var eldefs = this.targetEndpointDefinitions[_info(_el).id];
                return eldefs != null && eldefs[connectionType] != null;
            }.bind(this));
        };
        this.isTargetEnabled = function (el, connectionType) {
            connectionType = connectionType || "default";
            return _first(el, function (_el) {
                var tep = this.targetEndpointDefinitions[_info(_el).id];
                return tep && tep[connectionType] && tep[connectionType].enabled === true;
            }.bind(this));
        };
        this.setTargetEnabled = function (el, state, connectionType) {
            return _setEnabled("target", el, state, null, connectionType);
        };

// --------------------- end makeSource/makeTarget ---------------------------------------------- 				

        this.ready = function (fn) {
            _currentInstance.bind("ready", fn);
        };

        var _elEach = function(el, fn) {
            // support both lists...
            if (typeof el == 'object' && el.length)
                for (var i = 0, ii = el.length; i < ii; i++) {
                    fn(el[i]);
                }
            else // ...and single strings or elements.
                fn(el);

            return _currentInstance;
        };

        // repaint some element's endpoints and connections
        this.repaint = function (el, ui, timestamp) {
            return _elEach(el, function(_el) {
                _draw(_el, ui, timestamp);
            });
        };

        this.revalidate = function (el, timestamp, isIdAlready) {
            return _elEach(el, function(_el) {
                var elId = isIdAlready ? _el : _currentInstance.getId(_el);
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp:timestamp });
                _currentInstance.repaint(_el);
            });
        };

        // repaint every endpoint and connection.
        this.repaintEverything = function () {
            // TODO this timestamp causes continuous anchors to not repaint properly.
            // fix this. do not just take out the timestamp. it runs a lot faster with
            // the timestamp included.
            var timestamp = _timestamp(), elId;

            for (elId in endpointsByElement) {
                _currentInstance.updateOffset({ elId: elId, recalc: true, timestamp: timestamp });
            }

            for (elId in endpointsByElement) {
                _draw(elId, null, timestamp);
            }

            return this;
        };

        this.removeAllEndpoints = function (el, recurse, affectedElements) {
            affectedElements = affectedElements || [];
            var _one = function (_el) {
                var info = _info(_el),
                    ebe = endpointsByElement[info.id],
                    i, ii;

                if (ebe) {
                    affectedElements.push(info);
                    for (i = 0, ii = ebe.length; i < ii; i++)
                        _currentInstance.deleteEndpoint(ebe[i], false);
                }
                delete endpointsByElement[info.id];

                if (recurse) {
                    if (info.el && info.el.nodeType != 3 && info.el.nodeType != 8) {
                        for (i = 0, ii = info.el.childNodes.length; i < ii; i++) {
                            _one(info.el.childNodes[i]);
                        }
                    }
                }

            };
            _one(el);
            return this;
        };

        var _doRemove = function(info, affectedElements) {
            _currentInstance.removeAllEndpoints(info.id, true, affectedElements);
            var _one = function(_info) {
                _currentInstance.getDragManager().elementRemoved(_info.id);
                _currentInstance.anchorManager.clearFor(_info.id);
                _currentInstance.anchorManager.removeFloatingConnection(_info.id);
                delete _currentInstance.floatingConnections[_info.id];
                delete managedElements[_info.id];
                delete offsets[_info.id];
                if (_info.el) {
                    _currentInstance.removeElement(_info.el);
                    _info.el._jsPlumb = null;
                }
            };

            // remove all affected child elements
            for (var ae = 1; ae < affectedElements.length; ae++) {
                _one(affectedElements[ae]);
            }
            // and always remove the requested one from the dom.
            _one(info);
        };

        /**
         * Remove the given element, including cleaning up all endpoints registered for it.
         * This is exposed in the public API but also used internally by jsPlumb when removing the
         * element associated with a connection drag.
         */
        this.remove = function (el, doNotRepaint) {
            var info = _info(el), affectedElements = [];
            if (info.text) {
                info.el.parentNode.removeChild(info.el);
            }
            else if (info.id) {
                _currentInstance.batch(function () {
                    _doRemove(info, affectedElements);
                }, doNotRepaint === false);
            }
            return _currentInstance;
        };

        this.empty = function (el, doNotRepaint) {
            var affectedElements = [];
            var _one = function(el, dontRemoveFocus) {
                var info = _info(el);
                if (info.text) {
                    info.el.parentNode.removeChild(info.el);
                }
                else if (info.el) {
                    while(info.el.childNodes.length > 0) {
                        _one(info.el.childNodes[0]);
                    }
                    if (!dontRemoveFocus) _doRemove(info, affectedElements);
                }
            };

            _currentInstance.batch(function() {
                _one(el, true);
            }, doNotRepaint === false);

            return _currentInstance;
        };

        this.reset = function () {
            _currentInstance.silently(function() {
                _currentInstance.deleteEveryEndpoint();
                _currentInstance.unbind();
                this.targetEndpointDefinitions = {};
                this.sourceEndpointDefinitions = {};
                connections.length = 0;
                if (this.doReset) this.doReset();
            }.bind(this));
        };

        var _clearObject = function (obj) {
            if (obj.canvas && obj.canvas.parentNode)
                obj.canvas.parentNode.removeChild(obj.canvas);
            obj.cleanup();
            obj.destroy();
        };

        this.clear = function () {
            _currentInstance.select().each(_clearObject);
            _currentInstance.selectEndpoints().each(_clearObject);

            endpointsByElement = {};
            endpointsByUUID = {};
        };

        this.setDefaultScope = function (scope) {
            DEFAULT_SCOPE = scope;
            return _currentInstance;
        };

        // sets whether or not some element should be currently draggable.
        this.setDraggable = _setDraggable;

        this.deriveEndpointAndAnchorSpec = function(type, dontPrependDefault) {
            var bits = ((dontPrependDefault ? "" : "default ") + type).split(/[\s]/), eps = null, ep = null, a = null, as = null;
            for (var i = 0; i < bits.length; i++) {
                var _t = _currentInstance.getType(bits[i], "connection");
                if (_t) {
                    if (_t.endpoints) eps = _t.endpoints;
                    if (_t.endpoint) ep = _t.endpoint;
                    if (_t.anchors) as = _t.anchors;
                    if (_t.anchor) a = _t.anchor;
                }
            }
            return { endpoints: eps ? eps : [ ep, ep ], anchors: as ? as : [a, a ]};
        };

        // sets the id of some element, changing whatever we need to to keep track.
        this.setId = function (el, newId, doNotSetAttribute) {
            //
            var id;

            if (jsPlumbUtil.isString(el)) {
                id = el;
            }
            else {
                el = this.getElement(el);
                id = this.getId(el);
            }

            var sConns = this.getConnections({source: id, scope: '*'}, true),
                tConns = this.getConnections({target: id, scope: '*'}, true);

            newId = "" + newId;

            if (!doNotSetAttribute) {
                el = this.getElement(id);
                this.setAttribute(el, "id", newId);
            }
            else
                el = this.getElement(newId);

            endpointsByElement[newId] = endpointsByElement[id] || [];
            for (var i = 0, ii = endpointsByElement[newId].length; i < ii; i++) {
                endpointsByElement[newId][i].setElementId(newId);
                endpointsByElement[newId][i].setReferenceElement(el);
            }
            delete endpointsByElement[id];

            this.sourceEndpointDefinitions[newId] = this.sourceEndpointDefinitions[id];
            delete this.sourceEndpointDefinitions[id];
            this.targetEndpointDefinitions[newId] = this.targetEndpointDefinitions[id];
            delete this.targetEndpointDefinitions[id];

            this.anchorManager.changeId(id, newId);
            this.getDragManager().changeId(id, newId);
            managedElements[newId] = managedElements[id];
            delete managedElements[id];

            var _conns = function (list, epIdx, type) {
                for (var i = 0, ii = list.length; i < ii; i++) {
                    list[i].endpoints[epIdx].setElementId(newId);
                    list[i].endpoints[epIdx].setReferenceElement(el);
                    list[i][type + "Id"] = newId;
                    list[i][type] = el;
                }
            };
            _conns(sConns, 0, "source");
            _conns(tConns, 1, "target");

            this.repaint(newId);
        };

        this.setDebugLog = function (debugLog) {
            log = debugLog;
        };

        this.setSuspendDrawing = function (val, repaintAfterwards) {
            var curVal = _suspendDrawing;
            _suspendDrawing = val;
            if (val) _suspendedAt = new Date().getTime(); else _suspendedAt = null;
            if (repaintAfterwards) this.repaintEverything();
            return curVal;
        };

        // returns whether or not drawing is currently suspended.
        this.isSuspendDrawing = function () {
            return _suspendDrawing;
        };

        // return timestamp for when drawing was suspended.
        this.getSuspendedAt = function () {
            return _suspendedAt;
        };

        this.batch = function (fn, doNotRepaintAfterwards) {
            var _wasSuspended = this.isSuspendDrawing();
            if (!_wasSuspended)
                this.setSuspendDrawing(true);
            try {
                fn();
            }
            catch (e) {
                _ju.log("Function run while suspended failed", e);
            }
            if (!_wasSuspended)
                this.setSuspendDrawing(false, !doNotRepaintAfterwards);
        };

        this.doWhileSuspended = this.batch;

        this.getCachedData = _getCachedData;
        this.timestamp = _timestamp;
        this.show = function (el, changeEndpoints) {
            _setVisible(el, "block", changeEndpoints);
            return _currentInstance;
        };

        // TODO: update this method to return the current state.
        this.toggleVisible = _toggleVisible;
        this.toggleDraggable = _toggleDraggable;
        this.addListener = this.bind;
    };

    jsPlumbUtil.extend(jsPlumbInstance, jsPlumbUtil.EventGenerator, {
        setAttribute: function (el, a, v) {
            this.setAttribute(el, a, v);
        },
        getAttribute: function (el, a) {
            return this.getAttribute(jsPlumb.getElement(el), a);
        },
        convertToFullOverlaySpec: function(spec) {
            if (jsPlumbUtil.isString(spec)) {
                spec = [ spec, { } ];
            }
            spec[1].id = spec[1].id || jsPlumbUtil.uuid();
            return spec;
        },
        registerConnectionType: function (id, type) {
            this._connectionTypes[id] = jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._connectionTypes[id].overlays = to;
            }
        },
        registerConnectionTypes: function (types) {
            for (var i in types)
                this.registerConnectionType(i, types[i]);
        },
        registerEndpointType: function (id, type) {
            this._endpointTypes[id] = jsPlumb.extend({}, type);
            if (type.overlays) {
                var to = {};
                for (var i = 0; i < type.overlays.length; i++) {
                    // if a string, convert to object representation so that we can store the typeid on it.
                    // also assign an id.
                    var fo = this.convertToFullOverlaySpec(type.overlays[i]);
                    to[fo[1].id] = fo;
                }
                this._endpointTypes[id].overlays = to;
            }
        },
        registerEndpointTypes: function (types) {
            for (var i in types)
                //this._endpointTypes[i] = jsPlumb.extend({}, types[i]);
                this.registerEndpointType(i, types[i]);
        },
        getType: function (id, typeDescriptor) {
            return typeDescriptor === "connection" ? this._connectionTypes[id] : this._endpointTypes[id];
        },
        setIdChanged: function (oldId, newId) {
            this.setId(oldId, newId, true);
        },
        // set parent: change the parent for some node and update all the registrations we need to.
        setParent: function (el, newParent) {
            var _dom = this.getElement(el),
                _id = this.getId(_dom),
                _pdom = this.getElement(newParent),
                _pid = this.getId(_pdom);

            _dom.parentNode.removeChild(_dom);
            _pdom.appendChild(_dom);
            this.getDragManager().setParent(_dom, _id, _pdom, _pid);
        },
        extend: function (o1, o2, names) {
            var i;
            if (names) {
                for (i = 0; i < names.length; i++)
                    o1[names[i]] = o2[names[i]];
            }
            else
                for (i in o2) o1[i] = o2[i];
            return o1;
        },
        floatingConnections: {},
        getFloatingAnchorIndex: function (jpc) {
            return jpc.endpoints[0].isFloating() ? 0 : jpc.endpoints[1].isFloating() ? 1 : -1;
        }
    });

// --------------------- static instance + AMD registration -------------------------------------------	

// create static instance and assign to window if window exists.	
    var jsPlumb = new jsPlumbInstance();
    // register on window if defined (lets us run on server)
    if (typeof window != 'undefined') window.jsPlumb = jsPlumb;
    // add 'getInstance' method to static instance
    jsPlumb.getInstance = function (_defaults) {
        var j = new jsPlumbInstance(_defaults);
        j.init();
        return j;
    };
    jsPlumb.each = function (spec, fn) {
        if (spec == null) return;
        if (typeof spec === "string")
            fn(jsPlumb.getElement(spec));
        else if (spec.length != null) {
            for (var i = 0; i < spec.length; i++)
                fn(jsPlumb.getElement(spec[i]));
        }
        else
            fn(spec); // assume it's an element.
    };
// maybe register static instance as an AMD module, and getInstance method too.
    if (typeof define === "function") {
        define("jsplumb", [], function () {
            return jsPlumb;
        });
        define("jsplumbinstance", [], function () {
            return jsPlumb.getInstance();
        });
    }
    // CommonJS
    if (typeof exports !== 'undefined') {
        exports.jsPlumb = jsPlumb;
    }


// --------------------- end static instance + AMD registration -------------------------------------------		

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains the base functionality for DOM type adapters.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    var root = this, _ju = root.jsPlumbUtil;

    var svgAvailable = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),

    // TODO: remove this once we remove all library adapter versions and have only vanilla jsplumb: this functionality
    // comes from Mottle.
        iev = (function () {
            var rv = -1;
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent,
                    re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
            return rv;
        })(),
        isIELT9 = iev > -1 && iev < 9,
        _genLoc = function (e, prefix) {
            if (e == null) return [ 0, 0 ];
            var ts = _touches(e), t = _getTouch(ts, 0);
            return [t[prefix + "X"], t[prefix + "Y"]];
        },
        _pageLocation = function (e) {
            if (e == null) return [ 0, 0 ];
            if (isIELT9) {
                return [ e.clientX + document.documentElement.scrollLeft, e.clientY + document.documentElement.scrollTop ];
            }
            else {
                return _genLoc(e, "page");
            }
        },
        _screenLocation = function (e) {
            return _genLoc(e, "screen");
        },
        _clientLocation = function (e) {
            return _genLoc(e, "client");
        },
        _getTouch = function (touches, idx) {
            return touches.item ? touches.item(idx) : touches[idx];
        },
        _touches = function (e) {
            return e.touches && e.touches.length > 0 ? e.touches :
                    e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches :
                    e.targetTouches && e.targetTouches.length > 0 ? e.targetTouches :
                [ e ];
        };

    /**
     Manages dragging for some instance of jsPlumb.

     TODO instead of this being accessed directly, it should subscribe to events on the jsPlumb instance: every method
     in here is called directly by jsPlumb. But what should happen is that we have unpublished events that this listens
     to.  The only trick is getting one of these instantiated with every jsPlumb instance: it needs to have a hook somehow.
     Basically the general idea is to pull ALL the drag code out (prototype method registrations plus this) into a
     dedicated drag script), that does not necessarily need to be included.


     */
    var DragManager = function (_currentInstance) {
        var _draggables = {}, _dlist = [], _delements = {}, _elementsWithEndpoints = {},
        // elementids mapped to the draggable to which they belong.
            _draggablesForElements = {};

        /**
         register some element as draggable.  right now the drag init stuff is done elsewhere, and it is
         possible that will continue to be the case.
         */
        this.register = function (el) {
            var id = _currentInstance.getId(el),
                parentOffset = _currentInstance.getOffset(el);

            if (!_draggables[id]) {
                _draggables[id] = el;
                _dlist.push(el);
                _delements[id] = {};
            }

            // look for child elements that have endpoints and register them against this draggable.
            var _oneLevel = function (p) {
                if (p) {
                    for (var i = 0; i < p.childNodes.length; i++) {
                        if (p.childNodes[i].nodeType != 3 && p.childNodes[i].nodeType != 8) {
                            var cEl = jsPlumb.getElement(p.childNodes[i]),
                                cid = _currentInstance.getId(p.childNodes[i], null, true);
                            if (cid && _elementsWithEndpoints[cid] && _elementsWithEndpoints[cid] > 0) {
                                var cOff = _currentInstance.getOffset(cEl);
                                _delements[id][cid] = {
                                    id: cid,
                                    offset: {
                                        left: cOff.left - parentOffset.left,
                                        top: cOff.top - parentOffset.top
                                    }
                                };
                                _draggablesForElements[cid] = id;
                            }
                            _oneLevel(p.childNodes[i]);
                        }
                    }
                }
            };

            _oneLevel(el);
        };

        // refresh the offsets for child elements of this element.
        this.updateOffsets = function (elId) {
            if (elId != null) {
                var domEl = jsPlumb.getElement(elId),
                    id = _currentInstance.getId(domEl),
                    children = _delements[id],
                    parentOffset = _currentInstance.getOffset(domEl);

                if (children) {
                    for (var i in children) {
                        if (children.hasOwnProperty(i)) {
                            var cel = jsPlumb.getElement(i),
                                cOff = _currentInstance.getOffset(cel);

                            _delements[id][i] = {
                                id: i,
                                offset: {
                                    left: cOff.left - parentOffset.left,
                                    top: cOff.top - parentOffset.top
                                }
                            };
                            _draggablesForElements[i] = id;
                        }
                    }
                }
            }
        };

        /**
         notification that an endpoint was added to the given el.  we go up from that el's parent
         node, looking for a parent that has been registered as a draggable. if we find one, we add this
         el to that parent's list of elements to update on drag (if it is not there already)
         */
        this.endpointAdded = function (el, id) {

            id = id || _currentInstance.getId(el);

            var b = document.body,
                p = el.parentNode;

            _elementsWithEndpoints[id] = _elementsWithEndpoints[id] ? _elementsWithEndpoints[id] + 1 : 1;

            while (p != null && p != b) {
                var pid = _currentInstance.getId(p, null, true);
                if (pid && _draggables[pid]) {
                    var pLoc = _currentInstance.getOffset(p);

                    if (_delements[pid][id] == null) {
                        var cLoc = _currentInstance.getOffset(el);
                        _delements[pid][id] = {
                            id: id,
                            offset: {
                                left: cLoc.left - pLoc.left,
                                top: cLoc.top - pLoc.top
                            }
                        };
                        _draggablesForElements[id] = pid;
                    }
                    break;
                }
                p = p.parentNode;
            }
        };

        this.endpointDeleted = function (endpoint) {
            if (_elementsWithEndpoints[endpoint.elementId]) {
                _elementsWithEndpoints[endpoint.elementId]--;
                if (_elementsWithEndpoints[endpoint.elementId] <= 0) {
                    for (var i in _delements) {
                        if (_delements.hasOwnProperty(i) && _delements[i]) {
                            delete _delements[i][endpoint.elementId];
                            delete _draggablesForElements[endpoint.elementId];
                        }
                    }
                }
            }
        };

        this.changeId = function (oldId, newId) {
            _delements[newId] = _delements[oldId];
            _delements[oldId] = {};
            _draggablesForElements[newId] = _draggablesForElements[oldId];
            _draggablesForElements[oldId] = null;
        };

        this.getElementsForDraggable = function (id) {
            return _delements[id];
        };

        this.elementRemoved = function (elementId) {
            var elId = _draggablesForElements[elementId];
            if (elId) {
                delete _delements[elId][elementId];
                delete _draggablesForElements[elementId];
            }
        };

        this.reset = function () {
            _draggables = {};
            _dlist = [];
            _delements = {};
            _elementsWithEndpoints = {};
        };

        //
        // notification drag ended. We check automatically if need to update some
        // ancestor's offsets.
        //
        this.dragEnded = function (el) {
            var id = _currentInstance.getId(el),
                ancestor = _draggablesForElements[id];

            if (ancestor) this.updateOffsets(ancestor);
        };

        this.setParent = function (el, elId, p, pId) {
            var current = _draggablesForElements[elId];
            if (current) {
                if (!_delements[pId])
                    _delements[pId] = {};
                _delements[pId][elId] = _delements[current][elId];
                delete _delements[current][elId];
                var pLoc = _currentInstance.getOffset(p),
                    cLoc = _currentInstance.getOffset(el);
                _delements[pId][elId].offset = {
                    left: cLoc.left - pLoc.left,
                    top: cLoc.top - pLoc.top
                };
                _draggablesForElements[elId] = pId;
            }
        };

        this.getDragAncestor = function (el) {
            var de = jsPlumb.getElement(el),
                id = _currentInstance.getId(de),
                aid = _draggablesForElements[id];

            if (aid)
                return jsPlumb.getElement(aid);
            else
                return null;
        };

    };

    var trim = function (str) {
            return str == null ? null : (str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
        },
        _setClassName = function (el, cn) {
            cn = trim(cn);
            if (typeof el.className.baseVal != "undefined")  // SVG
                el.className.baseVal = cn;
            else
                el.className = cn;
        },
        _getClassName = function (el) {
            return (typeof el.className.baseVal == "undefined") ? el.className : el.className.baseVal;
        },
        _classManip = function (el, classesToAdd, classesToRemove) {
            classesToAdd = classesToAdd == null ? [] : jsPlumbUtil.isArray(classesToAdd) ? classesToAdd : classesToAdd.split(/\s+/);
            classesToRemove = classesToRemove == null ? [] : jsPlumbUtil.isArray(classesToRemove) ? classesToRemove : classesToRemove.split(/\s+/);

            var className = _getClassName(el),
                curClasses = className.split(/\s+/);

            var _oneSet = function (add, classes) {
                for (var i = 0; i < classes.length; i++) {
                    if (add) {
                        if (curClasses.indexOf(classes[i]) == -1)
                            curClasses.push(classes[i]);
                    }
                    else {
                        var idx = curClasses.indexOf(classes[i]);
                        if (idx != -1)
                            curClasses.splice(idx, 1);
                    }
                }
            };

            _oneSet(true, classesToAdd);
            _oneSet(false, classesToRemove);

            _setClassName(el, curClasses.join(" "));
        };

    jsPlumb.extend(jsPlumbInstance.prototype, {

        headless: false,

        pageLocation: _pageLocation,
        screenLocation: _screenLocation,
        clientLocation: _clientLocation,

        getDragManager:function() {
            if (this.dragManager == null)
                this.dragManager = new DragManager(this);

            return this.dragManager;
        },

        recalculateOffsets:function(elId) {
            this.getDragManager().updateOffsets(elId);
        },

        createElement:function(tag, style, clazz, atts) {
            return this.createElementNS(null, tag, style, clazz, atts);
        },

        createElementNS:function(ns, tag, style, clazz, atts) {
            var e = ns == null ? document.createElement(tag) : document.createElementNS(ns, tag);
            var i;
            style = style || {};
            for (i in style)
                e.style[i] = style[i];

            if (clazz)
                e.className = clazz;

            atts = atts || {};
            for (i in atts)
                e.setAttribute(i, "" + atts[i]);

            return e;
        },

        getAttribute: function (el, attName) {
            return el.getAttribute != null ? el.getAttribute(attName) : null;
        },

        setAttribute: function (el, a, v) {
            if (el.setAttribute != null) el.setAttribute(a, v);
        },

        setAttributes: function (el, atts) {
            for (var i in atts)
                if (atts.hasOwnProperty(i)) el.setAttribute(i, atts[i]);
        },
        appendToRoot: function (node) {
            document.body.appendChild(node);
        },
        getRenderModes: function () {
            return [ "svg"  ];
        },
        getClass:_getClassName,
        addClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, clazz);
            });
        },
        hasClass: function (el, clazz) {
            el = jsPlumb.getElement(el);
            if (el.classList) return el.classList.contains(clazz);
            else {
                return _getClassName(el).indexOf(clazz) != -1;
            }
        },
        removeClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _classManip(e, null, clazz);
            });
        },
        updateClasses: function (el, toAdd, toRemove) {
            jsPlumb.each(el, function (e) {
                _classManip(e, toAdd, toRemove);
            });
        },
        setClass: function (el, clazz) {
            jsPlumb.each(el, function (e) {
                _setClassName(e, clazz);
            });
        },
        setPosition: function (el, p) {
            el.style.left = p.left + "px";
            el.style.top = p.top + "px";
        },
        getPosition: function (el) {
            var _one = function (prop) {
                var v = el.style[prop];
                return v ? v.substring(0, v.length - 2) : 0;
            };
            return {
                left: _one("left"),
                top: _one("top")
            };
        },
        getStyle:function(el, prop) {
            if (typeof window.getComputedStyle !== 'undefined') {
                return getComputedStyle(el, null).getPropertyValue(prop);
            } else {
                return el.currentStyle[prop];
            }
        },
        getSelector: function (ctx, spec) {
            var sel = null;
            if (arguments.length == 1) {
                sel = ctx.nodeType != null ? ctx : document.querySelectorAll(ctx);
            }
            else
                sel = ctx.querySelectorAll(spec);

            return sel;
        },
        getOffset:function(el, relativeToRoot) {
            el = jsPlumb.getElement(el);
            var container = this.getContainer();
            var out = {
                    left: el.offsetLeft,
                    top: el.offsetTop
                },
                op = (relativeToRoot  || (container != null && (el != container && el.offsetParent != container))) ?  el.offsetParent : null,
                _maybeAdjustScroll = function(offsetParent) {
                    if (offsetParent != null && offsetParent !== document.body && (offsetParent.scrollTop > 0 || offsetParent.scrollLeft > 0)) {
                        out.left -= offsetParent.scrollLeft;
                        out.top -= offsetParent.scrollTop;
                    }
                }.bind(this);

            while (op != null) {
                out.left += op.offsetLeft;
                out.top += op.offsetTop;
                _maybeAdjustScroll(op);
                op = relativeToRoot ? op.offsetParent :
                        op.offsetParent == container ? null : op.offsetParent;
            }

            // if container is scrolled and the element (or its offset parent) is not absolute or fixed, adjust accordingly.
            if (container != null && !relativeToRoot && (container.scrollTop > 0 || container.scrollLeft > 0)) {
                var pp = el.offsetParent != null ? this.getStyle(el.offsetParent, "position") : "static",
                    p = this.getStyle(el, "position");
                if (p !== "absolute" && p !== "fixed" && pp !== "absolute" && pp != "fixed") {
                    out.left -= container.scrollLeft;
                    out.top -= container.scrollTop;
                }
            }
            return out;
        },
        //
        // return x+y proportion of the given element's size corresponding to the location of the given event.
        //
        getPositionOnElement: function (evt, el, zoom) {
            var box = typeof el.getBoundingClientRect !== "undefined" ? el.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 },
                body = document.body,
                docElem = document.documentElement,
                scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                pst = 0,
                psl = 0,
                top = box.top + scrollTop - clientTop + (pst * zoom),
                left = box.left + scrollLeft - clientLeft + (psl * zoom),
                cl = jsPlumb.pageLocation(evt),
                w = box.width || (el.offsetWidth * zoom),
                h = box.height || (el.offsetHeight * zoom),
                x = (cl[0] - left) / w,
                y = (cl[1] - top) / h;

            return [ x, y ];
        },

        /**
         * Gets the absolute position of some element as read from the left/top properties in its style.
         * @method getAbsolutePosition
         * @param {Element} el The element to retrieve the absolute coordinates from. **Note** this is a DOM element, not a selector from the underlying library.
         * @return {Number[]} [left, top] pixel values.
         */
        getAbsolutePosition: function (el) {
            var _one = function (s) {
                var ss = el.style[s];
                if (ss) return parseFloat(ss.substring(0, ss.length - 2));
            };
            return [ _one("left"), _one("top") ];
        },

        /**
         * Sets the absolute position of some element by setting the left/top properties in its style.
         * @method setAbsolutePosition
         * @param {Element} el The element to set the absolute coordinates on. **Note** this is a DOM element, not a selector from the underlying library.
         * @param {Number[]} xy x and y coordinates
         * @param {Number[]} [animateFrom] Optional previous xy to animate from.
         * @param {Object} [animateOptions] Options for the animation.
         */
        setAbsolutePosition: function (el, xy, animateFrom, animateOptions) {
            if (animateFrom) {
                this.animate(el, {
                    left: "+=" + (xy[0] - animateFrom[0]),
                    top: "+=" + (xy[1] - animateFrom[1])
                }, animateOptions);
            }
            else {
                el.style.left = xy[0] + "px";
                el.style.top = xy[1] + "px";
            }
        },
        /**
         * gets the size for the element, in an array : [ width, height ].
         */
        getSize: function (el) {
            return [ el.offsetWidth, el.offsetHeight ];
        },
        getWidth: function (el) {
            return el.offsetWidth;
        },
        getHeight: function (el) {
            return el.offsetHeight;
        }

    });
}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains code for components that support overlays.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // ------------------------------ BEGIN OverlayCapablejsPlumbUIComponent --------------------------------------------

    var _internalLabelOverlayId = "__label",
    // this is a shortcut helper method to let people add a label as
    // overlay.
        _makeLabelOverlay = function (component, params) {

            var _params = {
                    cssClass: params.cssClass,
                    labelStyle: component.labelStyle,
                    id: _internalLabelOverlayId,
                    component: component,
                    _jsPlumb: component._jsPlumb.instance  // TODO not necessary, since the instance can be accessed through the component.
                },
                mergedParams = jsPlumb.extend(_params, params);

            return new _jp.Overlays[component._jsPlumb.instance.getRenderMode()].Label(mergedParams);
        },
        _processOverlay = function (component, o) {
            var _newOverlay = null;
            if (_ju.isArray(o)) {	// this is for the shorthand ["Arrow", { width:50 }] syntax
                // there's also a three arg version:
                // ["Arrow", { width:50 }, {location:0.7}]
                // which merges the 3rd arg into the 2nd.
                var type = o[0],
                // make a copy of the object so as not to mess up anyone else's reference...
                    p = _jp.extend({component: component, _jsPlumb: component._jsPlumb.instance}, o[1]);
                if (o.length == 3) _jp.extend(p, o[2]);
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][type](p);
            } else if (o.constructor == String) {
                _newOverlay = new _jp.Overlays[component._jsPlumb.instance.getRenderMode()][o]({component: component, _jsPlumb: component._jsPlumb.instance});
            } else {
                _newOverlay = o;
            }

            _newOverlay.id = _newOverlay.id || _ju.uuid();
            component.cacheTypeItem("overlay", _newOverlay, _newOverlay.id);
            //component._jsPlumb.overlays.push(_newOverlay);
            component._jsPlumb.overlays[_newOverlay.id] = _newOverlay;

            return _newOverlay;
        };

    _jp.OverlayCapableJsPlumbUIComponent = function (params) {

        jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.overlays = {};
        this._jsPlumb.overlayPositions = {};

        if (params.label) {
            this.getDefaultType().overlays[_internalLabelOverlayId] = ["Label", {
                label: params.label,
                location: params.labelLocation || this.defaultLabelLocation || 0.5,
                labelStyle: params.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle,
                id:_internalLabelOverlayId
            }];
        }

        this.setListenerComponent = function (c) {
            if (this._jsPlumb) {
                for (var i in this._jsPlumb.overlays)
                    this._jsPlumb.overlays[i].setListenerComponent(c);
            }
        };
    };

    _jp.OverlayCapableJsPlumbUIComponent.applyType = function (component, t) {
        if (t.overlays) {
            // loop through the ones in the type. if already present on the component,
            // dont remove or re-add.
            var keep = {}, i;

            for (i in t.overlays) {

                var existing = component._jsPlumb.overlays[t.overlays[i][1].id];
                if (existing) {
                    // maybe update from data, if there were parameterised values for instance.
                    existing.updateFrom(t.overlays[i][1]);
                    keep[t.overlays[i][1].id] = true;
                }
                else {
                    var c = component.getCachedTypeItem("overlay", t.overlays[i][1].id);
                    if (c != null) {
                        c.reattach(component._jsPlumb.instance);
                        // maybe update from data, if there were parameterised values for instance.
                        c.updateFrom(t.overlays[i][1]);
                        component._jsPlumb.overlays[c.id] = c;
                    }
                    else {
                        c = component.addOverlay(t.overlays[i], true);
                    }
                    keep[c.id] = true;
                }
            }

            // now loop through the full overlays and remove those that we dont want to keep
            for (i in component._jsPlumb.overlays) {
                if (keep[component._jsPlumb.overlays[i].id] == null)
                    component.removeOverlay(component._jsPlumb.overlays[i].id);
            }
        }
    };

    _ju.extend(_jp.OverlayCapableJsPlumbUIComponent, jsPlumbUIComponent, {

        setHover: function (hover, ignoreAttachedElements) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                for (var i in this._jsPlumb.overlays) {
                    this._jsPlumb.overlays[i][hover ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass);
                }
            }
        },
        addOverlay: function (overlay, doNotRepaint) {
            var o = _processOverlay(this, overlay);
            if (!doNotRepaint) this.repaint();
            return o;
        },
        getOverlay: function (id) {
            return this._jsPlumb.overlays[id];
        },
        getOverlays: function () {
            return this._jsPlumb.overlays;
        },
        hideOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) o.hide();
        },
        hideOverlays: function () {
            for (var i in this._jsPlumb.overlays)
                this._jsPlumb.overlays[i].hide();
        },
        showOverlay: function (id) {
            var o = this.getOverlay(id);
            if (o) o.show();
        },
        showOverlays: function () {
            for (var i in this._jsPlumb.overlays)
                this._jsPlumb.overlays[i].show();
        },
        removeAllOverlays: function (doNotRepaint) {
            for (var i in this._jsPlumb.overlays) {
                if (this._jsPlumb.overlays[i].cleanup) this._jsPlumb.overlays[i].cleanup();
            }

            this._jsPlumb.overlays = {};
            this._jsPlumb.overlayPositions = null;
            if (!doNotRepaint)
                this.repaint();
        },
        removeOverlay: function (overlayId) {
            var o = this._jsPlumb.overlays[overlayId];
            if (o) {
                if (o.cleanup) o.cleanup();
                delete this._jsPlumb.overlays[overlayId];
                if (this._jsPlumb.overlayPositions)
                    delete this._jsPlumb.overlayPositions[overlayId];
            }
        },
        removeOverlays: function () {
            for (var i = 0, j = arguments.length; i < j; i++)
                this.removeOverlay(arguments[i]);
        },
        moveParent: function (newParent) {
            if (this.bgCanvas) {
                this.bgCanvas.parentNode.removeChild(this.bgCanvas);
                newParent.appendChild(this.bgCanvas);
            }

            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
                newParent.appendChild(this.canvas);

                for (var i in this._jsPlumb.overlays) {
                    if (this._jsPlumb.overlays[i].isAppendedAtTopLevel) {
                        var el = this._jsPlumb.overlays[i].getElement();
                        el.parentNode.removeChild(el);
                        newParent.appendChild(el);
                    }
                }
            }
        },
        getLabel: function () {
            var lo = this.getOverlay(_internalLabelOverlayId);
            return lo != null ? lo.getLabel() : null;
        },
        getLabelOverlay: function () {
            return this.getOverlay(_internalLabelOverlayId);
        },
        setLabel: function (l) {
            var lo = this.getOverlay(_internalLabelOverlayId);
            if (!lo) {
                var params = l.constructor == String || l.constructor == Function ? { label: l } : l;
                lo = _makeLabelOverlay(this, params);
                this._jsPlumb.overlays[_internalLabelOverlayId] = lo;
            }
            else {
                if (l.constructor == String || l.constructor == Function) lo.setLabel(l);
                else {
                    if (l.label) lo.setLabel(l.label);
                    if (l.location) lo.setLocation(l.location);
                }
            }

            if (!this._jsPlumb.instance.isSuspendDrawing())
                this.repaint();
        },
        cleanup: function (force) {
            for (var i in this._jsPlumb.overlays) {
                this._jsPlumb.overlays[i].cleanup(force);
                this._jsPlumb.overlays[i].destroy(force);
            }
            if (force) {
                this._jsPlumb.overlays = {};
                this._jsPlumb.overlayPositions = null;
            }
        },
        setVisible: function (v) {
            this[v ? "showOverlays" : "hideOverlays"]();
        },
        setAbsoluteOverlayPosition: function (overlay, xy) {
            this._jsPlumb.overlayPositions[overlay.id] = xy;
        },
        getAbsoluteOverlayPosition: function (overlay) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[overlay.id] : null;
        }
    });

// ------------------------------ END OverlayCapablejsPlumbUIComponent --------------------------------------------

}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for Endpoints.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    // create the drag handler for a connection
    var _makeConnectionDragHandler = function (endpoint, placeholder, _jsPlumb) {
        var stopped = false;
        return {
            drag: function () {
                if (stopped) {
                    stopped = false;
                    return true;
                }

                if (placeholder.element) {
                    var _ui = _jp.getUIPosition(arguments, _jsPlumb.getZoom());
                    jsPlumb.setPosition(placeholder.element, _ui);
                    _jsPlumb.repaint(placeholder.element, _ui);
                    // always repaint the source endpoint, because only continuous/dynamic anchors cause the endpoint
                    // to be repainted, so static anchors need to be told (or the endpoint gets dragged around)
                    endpoint.paint({anchorPoint:endpoint.anchor.getCurrentLocation({element:endpoint.element})});
                }
            },
            stopDrag: function () {
                stopped = true;
            }
        };
    };

    // creates a placeholder div for dragging purposes, adds it, and pre-computes its offset.
    var _makeDraggablePlaceholder = function (placeholder, _jsPlumb, ipco, ips) {
        var n = jsPlumb.createElement("div", { position : "absolute" });
        _jsPlumb.appendElement(n);
        var id = _jsPlumb.getId(n);
        jsPlumb.setPosition(n, ipco);
        n.style.width = ips[0] + "px";
        n.style.height = ips[1] + "px";
        _jsPlumb.manage(id, n, true); // TRANSIENT MANAGE
        // create and assign an id, and initialize the offset.
        placeholder.id = id;
        placeholder.element = n;
    };

    // create a floating endpoint (for drag connections)
    var _makeFloatingEndpoint = function (paintStyle, referenceAnchor, endpoint, referenceCanvas, sourceElement, _jsPlumb, _newEndpoint, scope) {
        var floatingAnchor = new _jp.FloatingAnchor({ reference: referenceAnchor, referenceCanvas: referenceCanvas, jsPlumbInstance: _jsPlumb });
        //setting the scope here should not be the way to fix that mootools issue.  it should be fixed by not
        // adding the floating endpoint as a droppable.  that makes more sense anyway!
        // TRANSIENT MANAGE
        return _newEndpoint({
            paintStyle: paintStyle,
            endpoint: endpoint,
            anchor: floatingAnchor,
            source: sourceElement,
            scope: scope
        });
    };

    var typeParameters = [ "connectorStyle", "connectorHoverStyle", "connectorOverlays",
        "connector", "connectionType", "connectorClass", "connectorHoverClass" ];

    // a helper function that tries to find a connection to the given element, and returns it if so. if elementWithPrecedence is null,
    // or no connection to it is found, we return the first connection in our list.
    var findConnectionToUseForDynamicAnchor = function (ep, elementWithPrecedence) {
        var idx = 0;
        if (elementWithPrecedence != null) {
            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == elementWithPrecedence || ep.connections[i].targetId == elementWithPrecedence) {
                    idx = i;
                    break;
                }
            }
        }

        return ep.connections[idx];
    };

    _jp.Endpoint = function (params) {
        var _jsPlumb = params._jsPlumb,
            _newConnection = params.newConnection,
            _newEndpoint = params.newEndpoint;

        this.idPrefix = "_jsplumb_e_";
        this.defaultLabelLocation = [ 0.5, 0.5 ];
        this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

// TYPE

        this.appendToDefaultType({
            connectionType:params.connectionType,
            maxConnections: params.maxConnections == null ? this._jsPlumb.instance.Defaults.MaxConnections : params.maxConnections, // maximum number of connections this endpoint can be the source of.,
            paintStyle: params.endpointStyle || params.paintStyle || params.style || this._jsPlumb.instance.Defaults.EndpointStyle || _jp.Defaults.EndpointStyle,
            hoverPaintStyle: params.endpointHoverStyle || params.hoverPaintStyle || this._jsPlumb.instance.Defaults.EndpointHoverStyle || _jp.Defaults.EndpointHoverStyle,
            connectorStyle: params.connectorStyle,
            connectorHoverStyle: params.connectorHoverStyle,
            connectorClass: params.connectorClass,
            connectorHoverClass: params.connectorHoverClass,
            connectorOverlays: params.connectorOverlays,
            connector: params.connector,
            connectorTooltip: params.connectorTooltip
        });

// END TYPE

        this._jsPlumb.enabled = !(params.enabled === false);
        this._jsPlumb.visible = true;
        this.element = _jp.getElement(params.source);
        this._jsPlumb.uuid = params.uuid;
        this._jsPlumb.floatingEndpoint = null;
        var inPlaceCopy = null;
        if (this._jsPlumb.uuid) params.endpointsByUUID[this._jsPlumb.uuid] = this;
        this.elementId = params.elementId;
        this.dragProxy = params.dragProxy;

        this._jsPlumb.connectionCost = params.connectionCost;
        this._jsPlumb.connectionsDirected = params.connectionsDirected;
        this._jsPlumb.currentAnchorClass = "";
        this._jsPlumb.events = {};

        var _updateAnchorClass = function () {
            // stash old, get new
            var oldAnchorClass = _jsPlumb.endpointAnchorClassPrefix + "-" + this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass();
            var anchorClass = _jsPlumb.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");

            this.removeClass(oldAnchorClass);
            this.addClass(anchorClass);
            // add and remove at the same time to reduce the number of reflows.
            jsPlumb.updateClasses(this.element, anchorClass, oldAnchorClass);
        }.bind(this);

        this.prepareAnchor = function(anchorParams) {
            var a = this._jsPlumb.instance.makeAnchor(anchorParams, this.elementId, _jsPlumb);
            a.bind("anchorChanged", function (currentAnchor) {
                this.fire("anchorChanged", {endpoint: this, anchor: currentAnchor});
                _updateAnchorClass();
            }.bind(this));
            return a;
        };

        this.setPreparedAnchor = function(anchor, doNotRepaint) {
            this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId);
            this.anchor = anchor;
            _updateAnchorClass();

            if (!doNotRepaint)
                this._jsPlumb.instance.repaint(this.elementId);

            return this;
        };

        this.setAnchor = function (anchorParams, doNotRepaint) {
            var a = this.prepareAnchor(anchorParams);
            this.setPreparedAnchor(a, doNotRepaint);
            return this;
        };

        var internalHover = function (state) {
            if (this.connections.length > 0) {
                for (var i = 0; i < this.connections.length; i++)
                    this.connections[i].setHover(state, false);
            }
            else
                this.setHover(state);
        }.bind(this);

        this.bind("mouseover", function () {
            internalHover(true);
        });
        this.bind("mouseout", function () {
            internalHover(false);
        });

        // ANCHOR MANAGER
        if (!params._transient) // in place copies, for example, are transient.  they will never need to be retrieved during a paint cycle, because they dont move, and then they are deleted.
            this._jsPlumb.instance.anchorManager.add(this, this.elementId);

        this.prepareEndpoint = function(ep, typeId) {
            var _e = function (t, p) {
                var rm = _jsPlumb.getRenderMode();
                if (_jp.Endpoints[rm][t]) return new _jp.Endpoints[rm][t](p);
                if (!_jsPlumb.Defaults.DoNotThrowErrors)
                    throw { msg: "jsPlumb: unknown endpoint type '" + t + "'" };
            };

            var endpointArgs = {
                _jsPlumb: this._jsPlumb.instance,
                cssClass: params.cssClass,
                container: params.container,
                tooltip: params.tooltip,
                connectorTooltip: params.connectorTooltip,
                endpoint: this
            };

            var endpoint;

            if (_ju.isString(ep))
                endpoint = _e(ep, endpointArgs);
            else if (_ju.isArray(ep)) {
                endpointArgs = _ju.merge(ep[1], endpointArgs);
                endpoint = _e(ep[0], endpointArgs);
            }
            else {
                endpoint = ep.clone();
            }

            // assign a clone function using a copy of endpointArgs. this is used when a drag starts: the endpoint that was dragged is cloned,
            // and the clone is left in its place while the original one goes off on a magical journey.
            // the copy is to get around a closure problem, in which endpointArgs ends up getting shared by
            // the whole world.
            //var argsForClone = jsPlumb.extend({}, endpointArgs);
            endpoint.clone = function () {
                // TODO this, and the code above, can be refactored to be more dry.
                if (_ju.isString(ep))
                    return _e(ep, endpointArgs);
                else if (_ju.isArray(ep)) {
                    endpointArgs = _ju.merge(ep[1], endpointArgs);
                    return _e(ep[0], endpointArgs);
                }
            }.bind(this);

            endpoint.typeId = typeId;
            return endpoint;
        };

        this.setEndpoint = function(ep, doNotRepaint) {
            var _ep = this.prepareEndpoint(ep);
            this.setPreparedEndpoint(_ep, true);
        };

        this.setPreparedEndpoint = function (ep, doNotRepaint) {
            if (this.endpoint != null) {
                this.endpoint.cleanup();
                this.endpoint.destroy();
            }
            this.endpoint = ep;
            this.type = this.endpoint.type;
            this.canvas = this.endpoint.canvas;
        };

        _jp.extend(this, params, typeParameters);

        this.isSource = params.isSource || false;
        this.isTemporarySource = params.isTemporarySource || false;
        this.isTarget = params.isTarget || false;

        this.connections = params.connections || [];
        this.connectorPointerEvents = params["connector-pointer-events"];

        this.scope = params.scope || _jsPlumb.getDefaultScope();
        this.timestamp = null;
        this.reattachConnections = params.reattach || _jsPlumb.Defaults.ReattachConnections;
        this.connectionsDetachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.connectionsDetachable === false || params.detachable === false)
            this.connectionsDetachable = false;
        this.dragAllowedWhenFull = params.dragAllowedWhenFull !== false;

        if (params.onMaxConnections)
            this.bind("maxConnections", params.onMaxConnections);

        //
        // add a connection. not part of public API.
        //
        this.addConnection = function (connection) {
            this.connections.push(connection);
            this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
            this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
        };

        this.detachFromConnection = function (connection, idx, doNotCleanup) {
            //idx = idx == null ? findConnectionIndex(connection, this) : idx;
            idx = idx == null ? this.connections.indexOf(connection) : idx;
            if (idx >= 0) {
                this.connections.splice(idx, 1);
                this[(this.connections.length > 0 ? "add" : "remove") + "Class"](_jsPlumb.endpointConnectedClass);
                this[(this.isFull() ? "add" : "remove") + "Class"](_jsPlumb.endpointFullClass);
            }

            if (!doNotCleanup && this._deleteOnDetach && this.connections.length === 0) {
                _jsPlumb.deleteObject({
                    endpoint: this,
                    fireEvent: false,
                    deleteAttachedObjects: false
                });
            }
        };

        this.detach = function (connection, ignoreTarget, forceDetach, fireEvent, originalEvent, endpointBeingDeleted, connectionIndex) {

            var idx = connectionIndex == null ? this.connections.indexOf(connection) : connectionIndex,
                actuallyDetached = false;
            fireEvent = (fireEvent !== false);

            if (idx >= 0) {

                if (forceDetach || connection._forceDetach || (connection.isDetachable() && connection.isDetachAllowed(connection) && this.isDetachAllowed(connection) && _jsPlumb.checkCondition("beforeDetach", connection, endpointBeingDeleted) )) {

                    _jsPlumb.deleteObject({
                        connection: connection,
                        fireEvent: (!ignoreTarget && fireEvent),
                        originalEvent: originalEvent,
                        deleteAttachedObjects: false/**/
                    });
                    actuallyDetached = true;
                }
            }
            return actuallyDetached;
        };

        this.detachAll = function (fireEvent, forceDetach) {
            var unaffectedConns = [];
            while (this.connections.length > 0) {
                // TODO this could pass the index in to the detach method to save some time (index will always be zero in this while loop)
                var actuallyDetached = this.detach(this.connections[0], false, forceDetach === true, fireEvent !== false, null, this, 0);
                if (!actuallyDetached) {
                    unaffectedConns.push(this.connections[0]);
                    this.connections.splice(0, 1);
                }
            }
            this.connections = unaffectedConns;
            return this;
        };
        this.detachFrom = function (targetEndpoint, fireEvent, originalEvent) {
            var c = [];
            for (var i = 0; i < this.connections.length; i++) {
                if (this.connections[i].endpoints[1] == targetEndpoint || this.connections[i].endpoints[0] == targetEndpoint) {
                    c.push(this.connections[i]);
                }
            }
            for (var j = 0; j < c.length; j++) {
                this.detach(c[j], false, true, fireEvent, originalEvent);
            }
            return this;
        };

        this.getElement = function () {
            return this.element;
        };

        this.setElement = function (el) {
            var parentId = this._jsPlumb.instance.getId(el),
                curId = this.elementId;
            // remove the endpoint from the list for the current endpoint's element
            _ju.removeWithFunction(params.endpointsByElement[this.elementId], function (e) {
                return e.id == this.id;
            }.bind(this));
            this.element = jsPlumb.getElement(el);
            this.elementId = _jsPlumb.getId(this.element);
            _jsPlumb.anchorManager.rehomeEndpoint(this, curId, this.element);
            _jsPlumb.dragManager.endpointAdded(this.element);
            _ju.addToList(params.endpointsByElement, parentId, this);
            return this;
        };

        /**
         * private but must be exposed.
         */
        this.makeInPlaceCopy = function () {
            var loc = this.anchor.getCurrentLocation({element: this}),
                o = this.anchor.getOrientation(this),
                acc = this.anchor.getCssClass(),
                inPlaceAnchor = {
                    bind: function () {
                    },
                    compute: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getCurrentLocation: function () {
                        return [ loc[0], loc[1] ];
                    },
                    getOrientation: function () {
                        return o;
                    },
                    getCssClass: function () {
                        return acc;
                    }
                };

            return _newEndpoint({
                dropOptions: params.dropOptions,
                anchor: inPlaceAnchor,
                source: this.element,
                paintStyle: this.getPaintStyle(),
                endpoint: params.hideOnDrag ? "Blank" : this.endpoint,
                _transient: true,
                scope: this.scope,
                reference:this
            });
        };

        /**
         * returns a connection from the pool; used when dragging starts.  just gets the head of the array if it can.
         */
        this.connectorSelector = function () {
            var candidate = this.connections[0];
            // SP target source refactor
            if (/*this.isTarget && */candidate) return candidate;
            else {
                return (this.connections.length < this._jsPlumb.maxConnections) || this._jsPlumb.maxConnections == -1 ? null : candidate;
            }
        };

        this.setStyle = this.setPaintStyle;

        this.paint = function (params) {
            params = params || {};
            var timestamp = params.timestamp, recalc = !(params.recalc === false);
            if (!timestamp || this.timestamp !== timestamp) {

                var info = _jsPlumb.updateOffset({ elId: this.elementId, timestamp: timestamp });

                var xy = params.offset ? params.offset.o : info.o;
                if (xy != null) {
                    var ap = params.anchorPoint, connectorPaintStyle = params.connectorPaintStyle;
                    if (ap == null) {
                        var wh = params.dimensions || info.s,
                            anchorParams = { xy: [ xy.left, xy.top ], wh: wh, element: this, timestamp: timestamp };
                        if (recalc && this.anchor.isDynamic && this.connections.length > 0) {
                            var c = findConnectionToUseForDynamicAnchor(this, params.elementWithPrecedence),
                                oIdx = c.endpoints[0] == this ? 1 : 0,
                                oId = oIdx === 0 ? c.sourceId : c.targetId,
                                oInfo = _jsPlumb.getCachedData(oId),
                                oOffset = oInfo.o, oWH = oInfo.s;
                            anchorParams.txy = [ oOffset.left, oOffset.top ];
                            anchorParams.twh = oWH;
                            anchorParams.tElement = c.endpoints[oIdx];
                        }
                        ap = this.anchor.compute(anchorParams);
                    }

                    this.endpoint.compute(ap, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, connectorPaintStyle || this.paintStyleInUse);
                    this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor);
                    this.timestamp = timestamp;

                    // paint overlays
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.endpoint, this._jsPlumb.paintStyleInUse);
                                o.paint(this._jsPlumb.overlayPlacements[i]);
                            }
                        }
                    }
                }
            }
        };

        this.getTypeDescriptor = function () {
            return "endpoint";
        };
        this.isVisible = function () {
            return this._jsPlumb.visible;
        };

        this.repaint = this.paint;

        var draggingInitialised = false;
        this.initDraggable = function () {

            // is this a connection source? we make it draggable and have the
            // drag listener maintain a connection with a floating endpoint.
            if (!draggingInitialised && _jp.isDragSupported(this.element)) {
                var placeholderInfo = { id: null, element: null },
                    jpc = null,
                    existingJpc = false,
                    existingJpcParams = null,
                    _dragHandler = _makeConnectionDragHandler(this, placeholderInfo, _jsPlumb),
                    dragOptions = params.dragOptions || {},
                    defaultOpts = {},
                    startEvent = _jp.dragEvents.start,
                    stopEvent = _jp.dragEvents.stop,
                    dragEvent = _jp.dragEvents.drag,
                    beforeStartEvent = _jp.dragEvents.beforeStart,
                    payload;

                // respond to beforeStart from katavorio; this will have, optionally, a payload of attribute values
                // that were placed there by the makeSource mousedown listener.
                var beforeStart = function(beforeStartParams) {
                    payload = beforeStartParams.e.payload || {};
                };

                var start = function (startParams) {

// -------------   first, get a connection to drag. this may be null, in which case we are dragging a new one.

                    jpc = this.connectorSelector();

// -------------------------------- now a bunch of tests about whether or not to proceed -------------------------

                    var _continue = true;
                    // if not enabled, return
                    if (!this.isEnabled()) _continue = false;
                    // if no connection and we're not a source - or temporarily a source, as is the case with makeSource - return.
                    if (jpc == null && !this.isSource && !this.isTemporarySource) _continue = false;
                    // otherwise if we're full and not allowed to drag, also return false.
                    if (this.isSource && this.isFull() && !(jpc != null && this.dragAllowedWhenFull)) _continue = false;
                    // if the connection was setup as not detachable or one of its endpoints
                    // was setup as connectionsDetachable = false, or Defaults.ConnectionsDetachable
                    // is set to false...
                    if (jpc != null && !jpc.isDetachable(this)) _continue = false;

                    var beforeDrag = _jsPlumb.checkCondition(jpc == null ? "beforeDrag" : "beforeStartDetach", {
                        endpoint:this,
                        source:this.element,
                        sourceId:this.elementId,
                        connection:jpc
                    });
                    if (beforeDrag === false) _continue = false;
                    // else we might have been given some data. we'll pass it in to a new connection as 'data'.
                    // here we also merge in the optional payload we were given on mousedown.
                    else if (typeof beforeDrag === "object") {
                        jsPlumb.extend(beforeDrag, payload || {});
                    }
                    else
                        // or if no beforeDrag data, maybe use the payload on its own.
                        beforeDrag = payload || {};

                    if (_continue === false) {
                        // this is for mootools and yui. returning false from this causes jquery to stop drag.
                        // the events are wrapped in both mootools and yui anyway, but i don't think returning
                        // false from the start callback would stop a drag.
                        if (_jsPlumb.stopDrag) _jsPlumb.stopDrag(this.canvas);
                        _dragHandler.stopDrag();
                        return false;
                    }

// ---------------------------------------------------------------------------------------------------------------------

                    // ok to proceed.

                    // clear hover for all connections for this endpoint before continuing.
                    for (var i = 0; i < this.connections.length; i++)
                        this.connections[i].setHover(false);

                    this.addClass("endpointDrag");
                    _jsPlumb.setConnectionBeingDragged(true);

                    // if we're not full but there was a connection, make it null. we'll create a new one.
                    if (jpc && !this.isFull() && this.isSource) jpc = null;

                    _jsPlumb.updateOffset({ elId: this.elementId });

// ----------------    make the element we will drag around, and position it -----------------------------

                    var ipco = this._jsPlumb.instance.getOffset(this.canvas),
                        canvasElement = this.canvas,
                        ips = this._jsPlumb.instance.getSize(this.canvas);

                    _makeDraggablePlaceholder(placeholderInfo, _jsPlumb, ipco, ips);

                    // store the id of the dragging div and the source element. the drop function will pick these up.                   
                    _jsPlumb.setAttributes(this.canvas, {
                        "dragId": placeholderInfo.id,
                        "elId": this.elementId
                    });

// ------------------- create an endpoint that will be our floating endpoint ------------------------------------

                    var endpointToFloat = this.dragProxy || this.endpoint;
                    if (this.dragProxy == null && this.connectionType != null) {
                        var aae = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(this.connectionType);
                        if (aae.endpoints[1]) endpointToFloat = aae.endpoints[1];
                    }
                    var centerAnchor = this._jsPlumb.instance.makeAnchor("Center");
                    centerAnchor.isFloating = true;
                    this._jsPlumb.floatingEndpoint = _makeFloatingEndpoint(this.getPaintStyle(), centerAnchor, endpointToFloat, this.canvas, placeholderInfo.element, _jsPlumb, _newEndpoint, this.scope);
                    var _savedAnchor = this._jsPlumb.floatingEndpoint.anchor;


                    if (jpc == null) {

                        this.setHover(false, false);
                        // create a connection. one end is this endpoint, the other is a floating endpoint.                    
                        jpc = _newConnection({
                            sourceEndpoint: this,
                            targetEndpoint: this._jsPlumb.floatingEndpoint,
                            source: this.element,  // for makeSource with parent option.  ensure source element is represented correctly.
                            target: placeholderInfo.element,
                            anchors: [ this.anchor, this._jsPlumb.floatingEndpoint.anchor ],
                            paintStyle: params.connectorStyle, // this can be null. Connection will use the default.
                            hoverPaintStyle: params.connectorHoverStyle,
                            connector: params.connector, // this can also be null. Connection will use the default.
                            overlays: params.connectorOverlays,
                            type: this.connectionType,
                            cssClass: this.connectorClass,
                            hoverClass: this.connectorHoverClass,
                            data:beforeDrag
                        });
                        jpc.pending = true;
                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.anchor = _savedAnchor;
                        // fire an event that informs that a connection is being dragged
                        _jsPlumb.fire("connectionDrag", jpc);

                        // register the new connection on the drag manager. This connection, at this point, is 'pending',
                        // and has as its target a temporary element (the 'placeholder'). If the connection subsequently
                        // becomes established, the anchor manager is informed that the target of the connection has
                        // changed.

                        _jsPlumb.anchorManager.newConnection(jpc);

                    } else {
                        existingJpc = true;
                        jpc.setHover(false);
                        // new anchor idx
                        var anchorIdx = jpc.endpoints[0].id == this.id ? 0 : 1;
                        this.detachFromConnection(jpc, null, true);                         // detach from the connection while dragging is occurring. but dont cleanup automatically.

                        // store the original scope (issue 57)
                        var dragScope = _jsPlumb.getDragScope(canvasElement);
                        _jsPlumb.setAttribute(this.canvas, "originalScope", dragScope);

                        // fire an event that informs that a connection is being dragged. we do this before
                        // replacing the original target with the floating element info.
                        _jsPlumb.fire("connectionDrag", jpc);

                        // now we replace ourselves with the temporary div we created above:
                        if (anchorIdx === 0) {
                            existingJpcParams = [ jpc.source, jpc.sourceId, canvasElement, dragScope ];
                            jpc.source = placeholderInfo.element;
                            jpc.sourceId = placeholderInfo.id;

                            _jsPlumb.anchorManager.sourceChanged(jpc.endpoints[anchorIdx].elementId, jpc.sourceId, jpc);

                        } else {
                            existingJpcParams = [ jpc.target, jpc.targetId, canvasElement, dragScope ];
                            jpc.target = placeholderInfo.element;
                            jpc.targetId = placeholderInfo.id;

                            _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.endpoints[anchorIdx].elementId, jpc.targetId, jpc);
                        }

                        // lock the other endpoint; if it is dynamic it will not move while the drag is occurring.
                        // TODO SP i commented this out as part of the rewirte; i think now we want the other endpoint
                        // to behave naturally.
                        // SJP
                        //jpc.endpoints[anchorIdx === 0 ? 1 : 0].anchor.locked = true;


                        // store the original endpoint and assign the new floating endpoint for the drag.
                        jpc.suspendedEndpoint = jpc.endpoints[anchorIdx];

                        // PROVIDE THE SUSPENDED ELEMENT, BE IT A SOURCE OR TARGET (ISSUE 39)
                        jpc.suspendedElement = jpc.endpoints[anchorIdx].getElement();
                        jpc.suspendedElementId = jpc.endpoints[anchorIdx].elementId;
                        jpc.suspendedElementType = anchorIdx === 0 ? "source" : "target";

                        jpc.suspendedEndpoint.setHover(false);
                        this._jsPlumb.floatingEndpoint.referenceEndpoint = jpc.suspendedEndpoint;
                        jpc.endpoints[anchorIdx] = this._jsPlumb.floatingEndpoint;

                        jpc.addClass(_jsPlumb.draggingClass);
                        this._jsPlumb.floatingEndpoint.addClass(_jsPlumb.draggingClass);
                    }

                    // register it and register connection on it.
                    _jsPlumb.floatingConnections[placeholderInfo.id] = jpc;
                    // only register for the target endpoint; we will not be dragging the source at any time
                    // before this connection is either discarded or made into a permanent connection.
                    _ju.addToList(params.endpointsByElement, placeholderInfo.id, this._jsPlumb.floatingEndpoint);
                    // tell jsplumb about it
                    _jsPlumb.currentlyDragging = true;
                }.bind(this);

                var stop = function () {
                    _jsPlumb.setConnectionBeingDragged(false);

                    if (jpc && jpc.endpoints != null) {
                        // get the actual drop event (decode from library args to stop function)
                        var originalEvent = _jsPlumb.getDropEvent(arguments);
                        // unlock the other endpoint (if it is dynamic, it would have been locked at drag start)
                        var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
                        jpc.endpoints[idx === 0 ? 1 : 0].anchor.locked = false;
                        // TODO: Dont want to know about css classes inside jsplumb, ideally.
                        jpc.removeClass(_jsPlumb.draggingClass);

                        // if we have the floating endpoint then the connection has not been dropped
                        // on another endpoint.  If it is a new connection we throw it away. If it is an
                        // existing connection we check to see if we should reattach it, throwing it away
                        // if not.
                        if (this._jsPlumb && (jpc.deleteConnectionNow || jpc.endpoints[idx] == this._jsPlumb.floatingEndpoint)) {
                            // 6a. if the connection was an existing one...
                            if (existingJpc && jpc.suspendedEndpoint) {
                                // fix for issue35, thanks Sylvain Gizard: when firing the detach event make sure the
                                // floating endpoint has been replaced.
                                if (idx === 0) {
                                    jpc.floatingElement = jpc.source;
                                    jpc.floatingId = jpc.sourceId;
                                    jpc.floatingEndpoint = jpc.endpoints[0];
                                    jpc.floatingIndex = 0;
                                    jpc.source = existingJpcParams[0];
                                    jpc.sourceId = existingJpcParams[1];
                                } else {
                                    // keep a copy of the floating element; the anchor manager will want to clean up.
                                    jpc.floatingElement = jpc.target;
                                    jpc.floatingId = jpc.targetId;
                                    jpc.floatingEndpoint = jpc.endpoints[1];
                                    jpc.floatingIndex = 1;
                                    jpc.target = existingJpcParams[0];
                                    jpc.targetId = existingJpcParams[1];
                                }

                                var fe = this._jsPlumb.floatingEndpoint; // store for later removal.
                                // restore the original scope (issue 57)
                                _jsPlumb.setDragScope(existingJpcParams[2], existingJpcParams[3]);
                                jpc.endpoints[idx] = jpc.suspendedEndpoint;
                                // IF the connection should be reattached, or the other endpoint refuses detach, then
                                // reset the connection to its original state
                                if (jpc.isReattach() || jpc._forceReattach || jpc._forceDetach || !jpc.endpoints[idx === 0 ? 1 : 0].detach(jpc, false, false, true, originalEvent, true)) {
                                    jpc.setHover(false);
                                    jpc._forceDetach = null;
                                    jpc._forceReattach = null;
                                    this._jsPlumb.floatingEndpoint.detachFromConnection(jpc);
                                    jpc.suspendedEndpoint.addConnection(jpc);

                                    // TODO this code is duplicated in lots of places...and there is nothing external
                                    // in the code; it all refers to the connection itself. we could add a
                                    // `checkSanity(connection)` method to anchorManager that did this.
                                    if (idx == 1) {
                                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                                    }
                                    else {
                                        _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                                    }

                                    _jsPlumb.repaint(existingJpcParams[1]);
                                }
                                else {
                                    _jsPlumb.deleteObject({endpoint: fe});
                                }
                            }
                        }

                        // makeTargets sets this flag, to tell us we have been replaced and should delete this object.
                        if (this.deleteAfterDragStop) {
                            _jsPlumb.deleteObject({endpoint: this});
                        }
                        else {
                            if (this._jsPlumb) {
                                 this.paint({recalc: false});
                            }
                        }

                        // although the connection is no longer valid, there are use cases where this is useful.
                        _jsPlumb.fire("connectionDragStop", jpc, originalEvent);
                        // tell jsplumb that dragging is finished.
                        _jsPlumb.currentlyDragging = false;
                        jpc = null;
                    }

                    // if no endpoints, jpc already cleaned up. but still we want to ensure we're reset properly.
                    // remove the element associated with the floating endpoint
                    // (and its associated floating endpoint and visual artefacts)
                    if (placeholderInfo && placeholderInfo.element) {
                        _jsPlumb.remove(placeholderInfo.element, false, false);
                    }
                    // remove the inplace copy
                    if (inPlaceCopy) {
                        _jsPlumb.deleteObject({endpoint: inPlaceCopy});
                    }

                    if (this._jsPlumb) {
                        // make our canvas visible (TODO: hand off to library; we should not know about DOM)
                        this.canvas.style.visibility = "visible";
                        // unlock our anchor
                        this.anchor.locked = false;
                        // clear floating anchor.
                        this._jsPlumb.floatingEndpoint = null;
                    }

                }.bind(this);

                dragOptions = _jp.extend(defaultOpts, dragOptions);
                dragOptions.scope = this.scope || dragOptions.scope;
                dragOptions[beforeStartEvent] = _ju.wrap(dragOptions[beforeStartEvent], beforeStart, false);
                dragOptions[startEvent] = _ju.wrap(dragOptions[startEvent], start, false);
                // extracted drag handler function so can be used by makeSource
                dragOptions[dragEvent] = _ju.wrap(dragOptions[dragEvent], _dragHandler.drag);
                dragOptions[stopEvent] = _ju.wrap(dragOptions[stopEvent], stop);
                dragOptions.multipleDrop = false;

                dragOptions.canDrag = function () {
                    return this.isSource || this.isTemporarySource || /*(this.isTarget && */this.connections.length > 0/*)*/;
                }.bind(this);

                _jsPlumb.initDraggable(this.canvas, dragOptions, "internal");

                this.canvas._jsPlumbRelatedElement = this.element;

                draggingInitialised = true;
            }
        };

        var ep = params.endpoint || this._jsPlumb.instance.Defaults.Endpoint || _jp.Defaults.Endpoint;
        this.setEndpoint(ep, true);
        var anchorParamsToUse = params.anchor ? params.anchor : params.anchors ? params.anchors : (_jsPlumb.Defaults.Anchor || "Top");
        this.setAnchor(anchorParamsToUse, true);

        // finally, set type if it was provided
        var type = [ "default", (params.type || "")].join(" ");
        this.addType(type, params.data, true);
        this.canvas = this.endpoint.canvas;
        this.canvas._jsPlumb = this;

        this.initDraggable();

        // pulled this out into a function so we can reuse it for the inPlaceCopy canvas; you can now drop detached connections
        // back onto the endpoint you detached it from.
        var _initDropTarget = function (canvas, isTransient, endpoint, referenceEndpoint) {

            if (_jp.isDropSupported(this.element)) {
                var dropOptions = params.dropOptions || _jsPlumb.Defaults.DropOptions || _jp.Defaults.DropOptions;
                dropOptions = _jp.extend({}, dropOptions);
                dropOptions.scope = dropOptions.scope || this.scope;
                var dropEvent = _jp.dragEvents.drop,
                    overEvent = _jp.dragEvents.over,
                    outEvent = _jp.dragEvents.out,
                    _ep = this,
                    drop = _jsPlumb.EndpointDropHandler({
                        getEndpoint: function () {
                            return _ep;
                        },
                        jsPlumb: _jsPlumb,
                        enabled: function () {
                            return endpoint != null ? endpoint.isEnabled() : true;
                        },
                        isFull: function () {
                            return endpoint.isFull();
                        },
                        element: this.element,
                        elementId: this.elementId,
                        isSource: this.isSource,
                        isTarget: this.isTarget,
                        addClass: function (clazz) {
                            _ep.addClass(clazz);
                        },
                        removeClass: function (clazz) {
                            _ep.removeClass(clazz);
                        },
                        isDropAllowed: function () {
                            return _ep.isDropAllowed.apply(_ep, arguments);
                        },
                        reference:referenceEndpoint,
                        isRedrop:function(jpc, dhParams) {
                            return jpc.suspendedEndpoint && dhParams.reference && (jpc.suspendedEndpoint.id === dhParams.reference.id);
                        }
                    });

                dropOptions[dropEvent] = _ju.wrap(dropOptions[dropEvent], drop, true);
                dropOptions[overEvent] = _ju.wrap(dropOptions[overEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = _jsPlumb.floatingConnections[id];

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        // here we should fire the 'over' event if we are a target and this is a new connection,
                        // or we are the same as the floating endpoint.
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            var bb = _jsPlumb.checkCondition("checkDropAllowed", {
                                sourceEndpoint: _jpc.endpoints[idx],
                                targetEndpoint: this,
                                connection: _jpc
                            });
                            this[(bb ? "add" : "remove") + "Class"](_jsPlumb.endpointDropAllowedClass);
                            this[(bb ? "remove" : "add") + "Class"](_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.over(this.anchor, this);
                        }
                    }
                }.bind(this));

                dropOptions[outEvent] = _ju.wrap(dropOptions[outEvent], function () {
                    var draggable = _jp.getDragObject(arguments),
                        id = draggable == null ? null : _jsPlumb.getAttribute(_jp.getElement(draggable), "dragId"),
                        _jpc = id ? _jsPlumb.floatingConnections[id] : null;

                    if (_jpc != null) {
                        var idx = _jsPlumb.getFloatingAnchorIndex(_jpc);
                        var _cont = (this.isTarget && idx !== 0) || (_jpc.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == _jpc.suspendedEndpoint.id);
                        if (_cont) {
                            this.removeClass(_jsPlumb.endpointDropAllowedClass);
                            this.removeClass(_jsPlumb.endpointDropForbiddenClass);
                            _jpc.endpoints[idx].anchor.out();
                        }
                    }
                }.bind(this));

                _jsPlumb.initDroppable(canvas, dropOptions, "internal", isTransient);
            }
        }.bind(this);

        // Initialise the endpoint's canvas as a drop target. The drop handler will take care of the logic of whether
        // something can actually be dropped.
        if (!this.anchor.isFloating)
            _initDropTarget(this.canvas, !(params._transient || this.anchor.isFloating), this, params.reference);


        return this;
    };

    _ju.extend(_jp.Endpoint, _jp.OverlayCapableJsPlumbUIComponent, {

        setVisible: function (v, doNotChangeConnections, doNotNotifyOtherEndpoint) {
            this._jsPlumb.visible = v;
            if (this.canvas) this.canvas.style.display = v ? "block" : "none";
            this[v ? "showOverlays" : "hideOverlays"]();
            if (!doNotChangeConnections) {
                for (var i = 0; i < this.connections.length; i++) {
                    this.connections[i].setVisible(v);
                    if (!doNotNotifyOtherEndpoint) {
                        var oIdx = this === this.connections[i].endpoints[0] ? 1 : 0;
                        // only change the other endpoint if this is its only connection.
                        if (this.connections[i].endpoints[oIdx].connections.length == 1) this.connections[i].endpoints[oIdx].setVisible(v, true, true);
                    }
                }
            }
        },
        getAttachedElements: function () {
            return this.connections;
        },
        applyType: function (t, doNotRepaint) {
            this.setPaintStyle(t.endpointStyle || t.paintStyle, doNotRepaint);
            this.setHoverPaintStyle(t.endpointHoverStyle || t.hoverPaintStyle, doNotRepaint);
            if (t.maxConnections != null) this._jsPlumb.maxConnections = t.maxConnections;
            if (t.scope) this.scope = t.scope;
            _jp.extend(this, t, typeParameters);
            if (t.cssClass != null && this.canvas) this._jsPlumb.instance.addClass(this.canvas, t.cssClass);
            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        isEnabled: function () {
            return this._jsPlumb.enabled;
        },
        setEnabled: function (e) {
            this._jsPlumb.enabled = e;
        },
        cleanup: function () {
            var anchorClass = this._jsPlumb.instance.endpointAnchorClassPrefix + (this._jsPlumb.currentAnchorClass ? "-" + this._jsPlumb.currentAnchorClass : "");
            jsPlumb.removeClass(this.element, anchorClass);
            this.anchor = null;
            this.endpoint.cleanup(true);
            this.endpoint.destroy();
            this.endpoint = null;
            // drag/drop
            this._jsPlumb.instance.destroyDraggable(this.canvas, "internal");
            this._jsPlumb.instance.destroyDroppable(this.canvas, "internal");
        },
        setHover: function (h) {
            if (this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())
                this.endpoint.setHover(h);
        },
        isFull: function () {
            return this._jsPlumb.maxConnections === 0 ? true : !(this.isFloating() || this._jsPlumb.maxConnections < 0 || this.connections.length < this._jsPlumb.maxConnections);
        },
        /**
         * private but needs to be exposed.
         */
        isFloating: function () {
            return this.anchor != null && this.anchor.isFloating;
        },
        isConnectedTo: function (endpoint) {
            var found = false;
            if (endpoint) {
                for (var i = 0; i < this.connections.length; i++) {
                    if (this.connections[i].endpoints[1] == endpoint || this.connections[i].endpoints[0] == endpoint) {
                        found = true;
                        break;
                    }
                }
            }
            return found;
        },
        getConnectionCost: function () {
            return this._jsPlumb.connectionCost;
        },
        setConnectionCost: function (c) {
            this._jsPlumb.connectionCost = c;
        },
        areConnectionsDirected: function () {
            return this._jsPlumb.connectionsDirected;
        },
        setConnectionsDirected: function (b) {
            this._jsPlumb.connectionsDirected = b;
        },
        setElementId: function (_elId) {
            this.elementId = _elId;
            this.anchor.elementId = _elId;
        },
        setReferenceElement: function (_el) {
            this.element = _jp.getElement(_el);
        },
        setDragAllowedWhenFull: function (allowed) {
            this.dragAllowedWhenFull = allowed;
        },
        equals: function (endpoint) {
            return this.anchor.equals(endpoint.anchor);
        },
        getUuid: function () {
            return this._jsPlumb.uuid;
        },
        computeAnchor: function (params) {
            return this.anchor.compute(params);
        }
    });

    root.jsPlumbInstance.prototype.EndpointDropHandler = function (dhParams) {
        return function (e) {

            var _jsPlumb = dhParams.jsPlumb;

            // remove the classes that are added dynamically. drop is neither forbidden nor allowed now that
            // the drop is finishing.
            dhParams.removeClass(_jsPlumb.endpointDropAllowedClass);
            dhParams.removeClass(_jsPlumb.endpointDropForbiddenClass);

            var originalEvent = _jsPlumb.getDropEvent(arguments),
                draggable = _jsPlumb.getDragObject(arguments),
                id = _jsPlumb.getAttribute(draggable, "dragId"),
                elId = _jsPlumb.getAttribute(draggable, "elId"),
                scope = _jsPlumb.getAttribute(draggable, "originalScope"),
                jpc = _jsPlumb.floatingConnections[id];

            // if no active connection, bail.
            if (jpc == null) return;

            // calculate if this is an existing connection.
            var existingConnection = jpc.suspendedEndpoint != null;

            // if suspended endpoint exists but has been cleaned up, bail. This means it's an existing connection
            // that has been detached and will shortly be discarded.
            if (existingConnection && jpc.suspendedEndpoint._jsPlumb == null) return;

            // get the drop endpoint. for a normal connection this is just the one that would replace the currently
            // floating endpoint. for a makeTarget this is a new endpoint that is created on drop. But we leave that to
            // the handler to figure out.
            var _ep = dhParams.getEndpoint(jpc);

            // If we're not given an endpoint to use, bail.
            if (_ep == null) return;

            // if this is a drop back where the connection came from, mark it force reattach and
            // return; the stop handler will reattach. without firing an event.
            if (dhParams.isRedrop(jpc, dhParams)) {
                jpc._forceReattach = true;
                jpc.setHover(false);
                if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);
                return;
            }

            // ensure we dont bother trying to drop sources on non-source eps, and same for target.
            var idx = _jsPlumb.getFloatingAnchorIndex(jpc);
            if ((idx === 0 && !dhParams.isSource)|| (idx === 1 && !dhParams.isTarget)){
                if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);
                return;
            }

            if (dhParams.onDrop) dhParams.onDrop(jpc);

            // restore the original scope if necessary (issue 57)
            if (scope) _jsPlumb.setDragScope(draggable, scope);

            // if the target of the drop is full, fire an event (we abort below)
            // makeTarget: keep.
            var isFull = dhParams.isFull(e);
            if (isFull) {
                _ep.fire("maxConnections", {
                    endpoint: this,
                    connection: jpc,
                    maxConnections: _ep._jsPlumb.maxConnections
                }, originalEvent);
            }
            //
            // if endpoint enabled, not full, and matches the index of the floating endpoint...
            if (!isFull &&  dhParams.enabled()) {
                var _doContinue = true;

                // before testing for beforeDrop, reset the connection's source/target to be the actual DOM elements
                // involved (that is, stash any temporary stuff used for dragging. but we need to keep it around in
                // order that the anchor manager can clean things up properly).
                if (idx === 0) {
                    jpc.floatingElement = jpc.source;
                    jpc.floatingId = jpc.sourceId;
                    jpc.floatingEndpoint = jpc.endpoints[0];
                    jpc.floatingIndex = 0;
                    jpc.source = dhParams.element;
                    jpc.sourceId = dhParams.elementId;
                } else {
                    jpc.floatingElement = jpc.target;
                    jpc.floatingId = jpc.targetId;
                    jpc.floatingEndpoint = jpc.endpoints[1];
                    jpc.floatingIndex = 1;
                    jpc.target = dhParams.element;
                    jpc.targetId = dhParams.elementId;
                }

                // if this is an existing connection and detach is not allowed we won't continue. The connection's
                // endpoints have been reinstated; everything is back to how it was.
                if (existingConnection && jpc.suspendedEndpoint.id != _ep.id) {

                    if (!jpc.isDetachAllowed(jpc) || !jpc.endpoints[idx].isDetachAllowed(jpc) || !jpc.suspendedEndpoint.isDetachAllowed(jpc) || !_jsPlumb.checkCondition("beforeDetach", jpc))
                        _doContinue = false;
                }

// ------------ wrap the execution path in a function so we can support asynchronous beforeDrop

                var continueFunction = function (optionalData) {
                    // remove this jpc from the current endpoint, which is a floating endpoint that we will
                    // subsequently discard.
                    jpc.endpoints[idx].detachFromConnection(jpc);

                    // if there's a suspended endpoint, detach it from the connection.
                    if (jpc.suspendedEndpoint) jpc.suspendedEndpoint.detachFromConnection(jpc);

                    jpc.endpoints[idx] = _ep;
                    _ep.addConnection(jpc);

                    // copy our parameters in to the connection:
                    var params = _ep.getParameters();
                    for (var aParam in params)
                        jpc.setParameter(aParam, params[aParam]);

                    if (!existingConnection) {
                        // if not an existing connection and
                        if (params.draggable)
                            _jsPlumb.initDraggable(this.element, dragOptions, "internal", _jsPlumb);
                    }
                    else {
                        var suspendedElementId = jpc.suspendedEndpoint.elementId;
                        _jsPlumb.fireMoveEvent({
                            index: idx,
                            originalSourceId: idx === 0 ? suspendedElementId : jpc.sourceId,
                            newSourceId: idx === 0 ? _ep.elementId : jpc.sourceId,
                            originalTargetId: idx == 1 ? suspendedElementId : jpc.targetId,
                            newTargetId: idx == 1 ? _ep.elementId : jpc.targetId,
                            originalSourceEndpoint: idx === 0 ? jpc.suspendedEndpoint : jpc.endpoints[0],
                            newSourceEndpoint: idx === 0 ? _ep : jpc.endpoints[0],
                            originalTargetEndpoint: idx == 1 ? jpc.suspendedEndpoint : jpc.endpoints[1],
                            newTargetEndpoint: idx == 1 ? _ep : jpc.endpoints[1],
                            connection: jpc
                        }, originalEvent);
                    }

                    if (idx == 1) {
                        _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                    }
                    else {
                        _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                    }

                    // when makeSource has uniqueEndpoint:true, we want to create connections with new endpoints
                    // that are subsequently deleted. So makeSource sets `finalEndpoint`, which is the Endpoint to
                    // which the connection should be attached. The `detachFromConnection` call below results in the
                    // temporary endpoint being cleaned up.
                    if (jpc.endpoints[0].finalEndpoint) {
                        var _toDelete = jpc.endpoints[0];
                        _toDelete.detachFromConnection(jpc);
                        jpc.endpoints[0] = jpc.endpoints[0].finalEndpoint;
                        jpc.endpoints[0].addConnection(jpc);
                    }

                    // if optionalData was given, merge it onto the connection's data.
                    if (jsPlumbUtil.isObject(optionalData)) {
                        jpc.mergeData(optionalData);
                    }
                    // finalise will inform the anchor manager and also add to
                    // connectionsByScope if necessary.
                    _jsPlumb.finaliseConnection(jpc, null, originalEvent, false);
                    jpc.setHover(false);

                }.bind(this);

                var dontContinueFunction = function () {
                    // otherwise just put it back on the endpoint it was on before the drag.
                    if (jpc.suspendedEndpoint) {
                        jpc.endpoints[idx] = jpc.suspendedEndpoint;
                        jpc.setHover(false);
                        jpc._forceDetach = true;
                        if (idx === 0) {
                            jpc.source = jpc.suspendedEndpoint.element;
                            jpc.sourceId = jpc.suspendedEndpoint.elementId;
                        } else {
                            jpc.target = jpc.suspendedEndpoint.element;
                            jpc.targetId = jpc.suspendedEndpoint.elementId;
                        }
                        jpc.suspendedEndpoint.addConnection(jpc);

                        // TODO checkSanity
                        if (idx == 1) {
                            _jsPlumb.anchorManager.updateOtherEndpoint(jpc.sourceId, jpc.floatingId, jpc.targetId, jpc);
                        }
                        else {
                            _jsPlumb.anchorManager.sourceChanged(jpc.floatingId, jpc.sourceId, jpc);
                        }

                        _jsPlumb.repaint(jpc.sourceId);
                        jpc._forceDetach = false;
                    }
                };

// --------------------------------------
                // now check beforeDrop.  this will be available only on Endpoints that are setup to
                // have a beforeDrop condition (although, secretly, under the hood all Endpoints and
                // the Connection have them, because they are on jsPlumbUIComponent.  shhh!), because
                // it only makes sense to have it on a target endpoint.
                _doContinue = _doContinue && dhParams.isDropAllowed(jpc.sourceId, jpc.targetId, jpc.scope, jpc, _ep);// && jpc.pending;

                if (_doContinue) {
                    continueFunction(_doContinue);
                    return true;
                }
                else {
                    dontContinueFunction();
                }
            }

            if (dhParams.maybeCleanup) dhParams.maybeCleanup(_ep);

            _jsPlumb.currentlyDragging = false;
        };
    };
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for Connections.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this,
        _jp = root.jsPlumb,
        _ju = root.jsPlumbUtil;


    var makeConnector = function (_jsPlumb, renderMode, connectorName, connectorArgs, forComponent) {
            if (!_jsPlumb.Defaults.DoNotThrowErrors && jsPlumb.Connectors[renderMode][connectorName] == null)
                throw { msg: "jsPlumb: unknown connector type '" + connectorName + "'" };

            return new _jp.Connectors[renderMode][connectorName](connectorArgs, forComponent);
        },
        _makeAnchor = function (anchorParams, elementId, _jsPlumb) {
            return (anchorParams) ? _jsPlumb.makeAnchor(anchorParams, elementId, _jsPlumb) : null;
        },
        _updateConnectedClass = function (conn, element, _jsPlumb, remove) {
            if (element != null) {
                element._jsPlumbConnections = element._jsPlumbConnections || {};
                if (remove)
                    delete element._jsPlumbConnections[conn.id];
                else
                    element._jsPlumbConnections[conn.id] = true;

                if (_ju.isEmpty(element._jsPlumbConnections)) {
                    _jsPlumb.removeClass(element, _jsPlumb.connectedClass);
                }
                else
                    _jsPlumb.addClass(element, _jsPlumb.connectedClass);
            }
        };

    _jp.Connection = function (params) {
        var _newEndpoint = params.newEndpoint;

        this.id = params.id;
        this.connector = null;
        this.idPrefix = "_jsplumb_c_";
        this.defaultLabelLocation = 0.5;
        this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        // if a new connection is the result of moving some existing connection, params.previousConnection
        // will have that Connection in it. listeners for the jsPlumbConnection event can look for that
        // member and take action if they need to.
        this.previousConnection = params.previousConnection;
        this.source = _jp.getElement(params.source);
        this.target = _jp.getElement(params.target);
        // sourceEndpoint and targetEndpoint override source/target, if they are present. but 
        // source is not overridden if the Endpoint has declared it is not the final target of a connection;
        // instead we use the source that the Endpoint declares will be the final source element.
        if (params.sourceEndpoint) this.source = params.sourceEndpoint.getElement();
        if (params.targetEndpoint) this.target = params.targetEndpoint.getElement();

        _jp.OverlayCapableJsPlumbUIComponent.apply(this, arguments);

        this.sourceId = this._jsPlumb.instance.getId(this.source);
        this.targetId = this._jsPlumb.instance.getId(this.target);
        this.scope = params.scope; // scope may have been passed in to the connect call. if it wasn't, we will pull it from the source endpoint, after having initialised the endpoints.            
        this.endpoints = [];
        this.endpointStyles = [];

        var _jsPlumb = this._jsPlumb.instance;

        _jsPlumb.manage(this.sourceId, this.source);
        _jsPlumb.manage(this.targetId, this.target);

        this._jsPlumb.visible = true;
        this._jsPlumb.editable = params.editable === true;
        this._jsPlumb.params = {
            cssClass: params.cssClass,
            container: params.container,
            "pointer-events": params["pointer-events"],
            editorParams: params.editorParams,
            overlays: params.overlays
        };
        this._jsPlumb.lastPaintedAt = null;

        // listen to mouseover and mouseout events passed from the container delegate.
        this.bind("mouseover", function () {
            this.setHover(true);
        }.bind(this));
        this.bind("mouseout", function () {
            this.setHover(false);
        }.bind(this));

// INITIALISATION CODE

        this.makeEndpoint = function (isSource, el, elId, ep) {
            elId = elId || this._jsPlumb.instance.getId(el);
            return this.prepareEndpoint(_jsPlumb, _newEndpoint, this, ep, isSource ? 0 : 1, params, el, elId);
        };

        // if type given, get the endpoint definitions mapping to that type from the jsplumb instance, and use those.
        // we apply types at the end of this constructor but endpoints are only honoured in a type definition at
        // create time.
        if (params.type) {
            params.endpoints = this._jsPlumb.instance.deriveEndpointAndAnchorSpec(params.type).endpoints;
        }

        var eS = this.makeEndpoint(true, this.source, this.sourceId, params.sourceEndpoint),
            eT = this.makeEndpoint(false, this.target, this.targetId, params.targetEndpoint);

        if (eS) _ju.addToList(params.endpointsByElement, this.sourceId, eS);
        if (eT) _ju.addToList(params.endpointsByElement, this.targetId, eT);
        // if scope not set, set it to be the scope for the source endpoint.
        if (!this.scope) this.scope = this.endpoints[0].scope;

        // if explicitly told to (or not to) delete endpoints on detach, override endpoint's preferences
        if (params.deleteEndpointsOnDetach != null) {
            this.endpoints[0]._deleteOnDetach = params.deleteEndpointsOnDetach;
            this.endpoints[1]._deleteOnDetach = params.deleteEndpointsOnDetach;
        }
        else {
            // otherwise, unless the endpoints say otherwise, mark them for deletion.
            if (!this.endpoints[0]._doNotDeleteOnDetach) this.endpoints[0]._deleteOnDetach = true;
            if (!this.endpoints[1]._doNotDeleteOnDetach) this.endpoints[1]._deleteOnDetach = true;
        }

// -------------------------- DEFAULT TYPE ---------------------------------------------

        // DETACHABLE
        var _detachable = _jsPlumb.Defaults.ConnectionsDetachable;
        if (params.detachable === false) _detachable = false;
        if (this.endpoints[0].connectionsDetachable === false) _detachable = false;
        if (this.endpoints[1].connectionsDetachable === false) _detachable = false;
        // REATTACH
        var _reattach = params.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || _jsPlumb.Defaults.ReattachConnections;

        this.appendToDefaultType({
            detachable: _detachable,
            rettach: _reattach,
            paintStyle:this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || params.paintStyle || _jsPlumb.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
            hoverPaintStyle:this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || params.hoverPaintStyle || _jsPlumb.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle
        });


        var _suspendedAt = _jsPlumb.getSuspendedAt();
        if (!_jsPlumb.isSuspendDrawing()) {
            // paint the endpoints
            var myInfo = _jsPlumb.getCachedData(this.sourceId),
                myOffset = myInfo.o, myWH = myInfo.s,
                otherInfo = _jsPlumb.getCachedData(this.targetId),
                otherOffset = otherInfo.o,
                otherWH = otherInfo.s,
                initialTimestamp = _suspendedAt || _jsPlumb.timestamp(),
                anchorLoc = this.endpoints[0].anchor.compute({
                    xy: [ myOffset.left, myOffset.top ], wh: myWH, element: this.endpoints[0],
                    elementId: this.endpoints[0].elementId,
                    txy: [ otherOffset.left, otherOffset.top ], twh: otherWH, tElement: this.endpoints[1],
                    timestamp: initialTimestamp
                });

            this.endpoints[0].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });

            anchorLoc = this.endpoints[1].anchor.compute({
                xy: [ otherOffset.left, otherOffset.top ], wh: otherWH, element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [ myOffset.left, myOffset.top ], twh: myWH, tElement: this.endpoints[0],
                timestamp: initialTimestamp
            });
            this.endpoints[1].paint({ anchorLoc: anchorLoc, timestamp: initialTimestamp });
        }

        this.getTypeDescriptor = function () {
            return "connection";
        };
        this.getAttachedElements = function () {
            return this.endpoints;
        };

        this.isDetachable = function () {
            return this._jsPlumb.detachable === true;
        };
        this.setDetachable = function (detachable) {
            this._jsPlumb.detachable = detachable === true;
        };
        this.isReattach = function () {
            return this._jsPlumb.reattach === true || this.endpoints[0].reattachConnections === true || this.endpoints[1].reattachConnections === true;
        };
        this.setReattach = function (reattach) {
            this._jsPlumb.reattach = reattach === true;
        };

// END INITIALISATION CODE


// COST + DIRECTIONALITY
        // if cost not supplied, try to inherit from source endpoint
        this._jsPlumb.cost = params.cost || this.endpoints[0].getConnectionCost();
        this._jsPlumb.directed = params.directed;
        // inherit directed flag if set no source endpoint
        if (params.directed == null) this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected();
// END COST + DIRECTIONALITY

// PARAMETERS
        // merge all the parameters objects into the connection.  parameters set
        // on the connection take precedence; then source endpoint params, then
        // finally target endpoint params.
        var _p = jsPlumb.extend({}, this.endpoints[1].getParameters());
        _jp.extend(_p, this.endpoints[0].getParameters());
        _jp.extend(_p, this.getParameters());
        this.setParameters(_p);
// END PARAMETERS

// PAINTING

        this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || params.connector || _jsPlumb.Defaults.Connector || _jp.Defaults.Connector, true);
        var data = params.data == null || !jsPlumbUtil.isObject(params.data) ? {} : params.data;
        this.getData = function() { return data; };
        this.setData = function(d) { data = d || {}; };
        this.mergeData = function(d) { data = jsPlumb.extend(data, d); };

        // the very last thing we do is apply types, if there are any.
        var _types = [ "default", this.endpoints[0].connectionType, this.endpoints[1].connectionType,  params.type ].join(" ");
        if (/[^\s]/.test(_types))
            this.addType(_types, params.data, true);

        this.updateConnectedClass();

// END PAINTING    
    };

    _ju.extend(_jp.Connection, _jp.OverlayCapableJsPlumbUIComponent, {
        applyType: function (t, doNotRepaint, typeMap) {

            // none of these things result in the creation of objects so can be ignored.
            if (t.detachable != null) this.setDetachable(t.detachable);
            if (t.reattach != null) this.setReattach(t.reattach);
            if (t.scope) this.scope = t.scope;

            if (t.cssClass != null && this.canvas) this._jsPlumb.instance.addClass(this.canvas, t.cssClass);

            var _anchors = null;
            // this also results in the creation of objects.
            if (t.anchor) {
                // note that even if the param was anchor, we store `anchors`.
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchor);
                if (_anchors == null) {
                    _anchors = [ this._jsPlumb.instance.makeAnchor(t.anchor), this._jsPlumb.instance.makeAnchor(t.anchor) ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchor);
                }
            }
            else if (t.anchors) {
                _anchors = this.getCachedTypeItem("anchors", typeMap.anchors);
                if (_anchors == null) {
                    _anchors = [
                        this._jsPlumb.instance.makeAnchor(t.anchors[0]),
                        this._jsPlumb.instance.makeAnchor(t.anchors[1])
                    ];
                    this.cacheTypeItem("anchors", _anchors, typeMap.anchors);
                }
            }
            if (_anchors != null) {
                this.endpoints[0].anchor = _anchors[0];
                this.endpoints[1].anchor = _anchors[1];
                if (this.endpoints[1].anchor.isDynamic) this._jsPlumb.instance.repaint(this.endpoints[1].elementId);
            }

            _jp.OverlayCapableJsPlumbUIComponent.applyType(this, t);
        },
        addClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].addClass(c);
                this.endpoints[1].addClass(c);
                if (this.suspendedEndpoint) this.suspendedEndpoint.addClass(c);
            }
            if (this.connector) {
                this.connector.addClass(c);
            }
        },
        removeClass: function (c, informEndpoints) {
            if (informEndpoints) {
                this.endpoints[0].removeClass(c);
                this.endpoints[1].removeClass(c);
                if (this.suspendedEndpoint) this.suspendedEndpoint.removeClass(c);
            }
            if (this.connector) {
                this.connector.removeClass(c);
            }
        },
        isVisible: function () {
            return this._jsPlumb.visible;
        },
        setVisible: function (v) {
            this._jsPlumb.visible = v;
            if (this.connector)
                this.connector.setVisible(v);
            this.repaint();
        },
        cleanup: function () {
            this.updateConnectedClass(true);
            this.endpoints = null;
            this.source = null;
            this.target = null;
            if (this.connector != null) {
                this.connector.cleanup(true);
                this.connector.destroy(true);
            }
            this.connector = null;
        },
        updateConnectedClass:function(remove) {
            _updateConnectedClass(this, this.source, this._jsPlumb.instance, remove);
            _updateConnectedClass(this, this.target, this._jsPlumb.instance, remove);
        },
        setHover: function (state) {
            if (this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged()) {
                this.connector.setHover(state);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.source, this._jsPlumb.instance.hoverSourceClass);
                root.jsPlumb[state ? "addClass" : "removeClass"](this.target, this._jsPlumb.instance.hoverTargetClass);
            }
        },
        getUuids:function() {
            return [ this.endpoints[0].getUuid(), this.endpoints[1].getUuid() ];
        },
        getCost: function () {
            return this._jsPlumb.cost;
        },
        setCost: function (c) {
            this._jsPlumb.cost = c;
        },
        isDirected: function () {
            return this._jsPlumb.directed === true;
        },
        getConnector: function () {
            return this.connector;
        },
        prepareConnector:function(connectorSpec, typeId) {
            var connectorArgs = {
                    _jsPlumb: this._jsPlumb.instance,
                    cssClass: this._jsPlumb.params.cssClass,
                    container: this._jsPlumb.params.container,
                    "pointer-events": this._jsPlumb.params["pointer-events"]
                },
                renderMode = this._jsPlumb.instance.getRenderMode(),
                connector;

            if (_ju.isString(connectorSpec))
                connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec, connectorArgs, this); // lets you use a string as shorthand.
            else if (_ju.isArray(connectorSpec)) {
                if (connectorSpec.length == 1)
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], connectorArgs, this);
                else
                    connector = makeConnector(this._jsPlumb.instance, renderMode, connectorSpec[0], _ju.merge(connectorSpec[1], connectorArgs), this);
            }
            if (typeId != null) connector.typeId = typeId;
            return connector;
        },
        setPreparedConnector: function(connector, doNotRepaint, doNotChangeListenerComponent, typeId) {

            var previous, previousClasses = "";
            // the connector will not be cleaned up if it was set as part of a type, because `typeId` will be set on it
            // and we havent passed in `true` for "force" here.
            if (this.connector != null) {
                previous = this.connector;
                previousClasses = previous.getClass();
                this.connector.cleanup();
                this.connector.destroy();
            }

            this.connector = connector;
            if (typeId) {
                this.cacheTypeItem("connector", connector, typeId);
            }

            this.canvas = this.connector.canvas;
            this.bgCanvas = this.connector.bgCanvas;

            // put classes from prior connector onto the canvas
            this.addClass(previousClasses);

            // new: instead of binding listeners per connector, we now just have one delegate on the container.
            // so for that handler we set the connection as the '_jsPlumb' member of the canvas element, and
            // bgCanvas, if it exists, which it does right now in the VML renderer, so it won't from v 2.0.0 onwards.
            if (this.canvas) this.canvas._jsPlumb = this;
            if (this.bgCanvas) this.bgCanvas._jsPlumb = this;

            if (previous != null) {
                var o = this.getOverlays();
                for (var i = 0; i < o.length; i++) {
                    if (o[i].transfer) o[i].transfer(this.connector);
                }
            }

            if (!doNotChangeListenerComponent) this.setListenerComponent(this.connector);
            if (!doNotRepaint) this.repaint();
        },
        setConnector: function (connectorSpec, doNotRepaint, doNotChangeListenerComponent, typeId) {
            var connector = this.prepareConnector(connectorSpec, typeId);
            this.setPreparedConnector(connector, doNotRepaint, doNotChangeListenerComponent, typeId);
        },
        paint: function (params) {

            if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                params = params || {};
                var timestamp = params.timestamp,
                // if the moving object is not the source we must transpose the two references.
                    swap = false,
                    tId = swap ? this.sourceId : this.targetId, sId = swap ? this.targetId : this.sourceId,
                    tIdx = swap ? 0 : 1, sIdx = swap ? 1 : 0;

                if (timestamp == null || timestamp != this._jsPlumb.lastPaintedAt) {
                    var sourceInfo = this._jsPlumb.instance.updateOffset({elId:sId}).o,
                        targetInfo = this._jsPlumb.instance.updateOffset({elId:tId}).o,
                        sE = this.endpoints[sIdx], tE = this.endpoints[tIdx];

                    var sAnchorP = sE.anchor.getCurrentLocation({xy: [sourceInfo.left, sourceInfo.top], wh: [sourceInfo.width, sourceInfo.height], element: sE, timestamp: timestamp}),
                        tAnchorP = tE.anchor.getCurrentLocation({xy: [targetInfo.left, targetInfo.top], wh: [targetInfo.width, targetInfo.height], element: tE, timestamp: timestamp});

                    this.connector.resetBounds();

                    this.connector.compute({
                        sourcePos: sAnchorP,
                        targetPos: tAnchorP,
                        sourceEndpoint: this.endpoints[sIdx],
                        targetEndpoint: this.endpoints[tIdx],
                        lineWidth: this._jsPlumb.paintStyleInUse.lineWidth,
                        sourceInfo: sourceInfo,
                        targetInfo: targetInfo
                    });

                    var overlayExtents = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

                    // compute overlays. we do this first so we can get their placements, and adjust the
                    // container if needs be (if an overlay would be clipped)
                    for (var i in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(i)) {
                            var o = this._jsPlumb.overlays[i];
                            if (o.isVisible()) {
                                this._jsPlumb.overlayPlacements[i] = o.draw(this.connector, this._jsPlumb.paintStyleInUse, this.getAbsoluteOverlayPosition(o));
                                overlayExtents.minX = Math.min(overlayExtents.minX, this._jsPlumb.overlayPlacements[i].minX);
                                overlayExtents.maxX = Math.max(overlayExtents.maxX, this._jsPlumb.overlayPlacements[i].maxX);
                                overlayExtents.minY = Math.min(overlayExtents.minY, this._jsPlumb.overlayPlacements[i].minY);
                                overlayExtents.maxY = Math.max(overlayExtents.maxY, this._jsPlumb.overlayPlacements[i].maxY);
                            }
                        }
                    }

                    var lineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2,
                        outlineWidth = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 0),
                        extents = {
                            xmin: Math.min(this.connector.bounds.minX - (lineWidth + outlineWidth), overlayExtents.minX),
                            ymin: Math.min(this.connector.bounds.minY - (lineWidth + outlineWidth), overlayExtents.minY),
                            xmax: Math.max(this.connector.bounds.maxX + (lineWidth + outlineWidth), overlayExtents.maxX),
                            ymax: Math.max(this.connector.bounds.maxY + (lineWidth + outlineWidth), overlayExtents.maxY)
                        };
                    // paint the connector.
                    this.connector.paint(this._jsPlumb.paintStyleInUse, null, extents);
                    // and then the overlays
                    for (var j in this._jsPlumb.overlays) {
                        if (this._jsPlumb.overlays.hasOwnProperty(j)) {
                            var p = this._jsPlumb.overlays[j];
                            if (p.isVisible()) {
                                p.paint(this._jsPlumb.overlayPlacements[j], extents);
                            }
                        }
                    }
                }
                this._jsPlumb.lastPaintedAt = timestamp;
            }
        },
        repaint: function (params) {
            params = params || {};
            this.paint({ elId: this.sourceId, recalc: !(params.recalc === false), timestamp: params.timestamp});
        },
        prepareEndpoint: function (_jsPlumb, _newEndpoint, conn, existing, index, params, element, elementId) {
            var e;
            if (existing) {
                conn.endpoints[index] = existing;
                existing.addConnection(conn);
            } else {
                if (!params.endpoints) params.endpoints = [ null, null ];
                var ep = params.endpoints[index] || params.endpoint || _jsPlumb.Defaults.Endpoints[index] || jsPlumb.Defaults.Endpoints[index] || _jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                if (!params.endpointStyles) params.endpointStyles = [ null, null ];
                if (!params.endpointHoverStyles) params.endpointHoverStyles = [ null, null ];
                var es = params.endpointStyles[index] || params.endpointStyle || _jsPlumb.Defaults.EndpointStyles[index] || jsPlumb.Defaults.EndpointStyles[index] || _jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                // Endpoints derive their fillStyle from the connector's strokeStyle, if no fillStyle was specified.
                if (es.fillStyle == null && params.paintStyle != null)
                    es.fillStyle = params.paintStyle.strokeStyle;

                if (es.outlineColor == null && params.paintStyle != null)
                    es.outlineColor = params.paintStyle.outlineColor;
                if (es.outlineWidth == null && params.paintStyle != null)
                    es.outlineWidth = params.paintStyle.outlineWidth;

                var ehs = params.endpointHoverStyles[index] || params.endpointHoverStyle || _jsPlumb.Defaults.EndpointHoverStyles[index] || jsPlumb.Defaults.EndpointHoverStyles[index] || _jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                // endpoint hover fill style is derived from connector's hover stroke style
                if (params.hoverPaintStyle != null) {
                    if (ehs == null) ehs = {};
                    if (ehs.fillStyle == null) {
                        ehs.fillStyle = params.hoverPaintStyle.strokeStyle;
                    }
                }
                var a = params.anchors ? params.anchors[index] :
                        params.anchor ? params.anchor :
                            _makeAnchor(_jsPlumb.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchors[index], elementId, _jsPlumb) ||
                            _makeAnchor(_jsPlumb.Defaults.Anchor, elementId, _jsPlumb) ||
                            _makeAnchor(_jp.Defaults.Anchor, elementId, _jsPlumb),
                    u = params.uuids ? params.uuids[index] : null;

                e = _newEndpoint({
                    paintStyle: es, hoverPaintStyle: ehs, endpoint: ep, connections: [ conn ],
                    uuid: u, anchor: a, source: element, scope: params.scope,
                    reattach: params.reattach || _jsPlumb.Defaults.ReattachConnections,
                    detachable: params.detachable || _jsPlumb.Defaults.ConnectionsDetachable
                });
                conn.endpoints[index] = e;

                if (params.drawEndpoints === false) e.setVisible(false, true, true);

            }
            return e;
        }

    }); // END Connection class            
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for creating and manipulating anchors.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";

    var root = this,
        _ju = root.jsPlumbUtil,
        _jp = root.jsPlumb;

    //
    // manages anchors for all elements.
    //
    _jp.AnchorManager = function (params) {
        var _amEndpoints = {},
            continuousAnchorLocations = {},
            userDefinedContinuousAnchorLocations = {},
            continuousAnchorOrientations = {},
            Orientation = { HORIZONTAL: "horizontal", VERTICAL: "vertical", DIAGONAL: "diagonal", IDENTITY: "identity" },
            axes = ["left", "top", "right", "bottom"],
            connectionsByElementId = {},
            self = this,
            anchorLists = {},
            jsPlumbInstance = params.jsPlumbInstance,
            floatingConnections = {},
            calculateOrientation = function (sourceId, targetId, sd, td, sourceAnchor, targetAnchor) {

                if (sourceId === targetId) return {
                    orientation: Orientation.IDENTITY,
                    a: ["top", "top"]
                };

                var theta = Math.atan2((td.centery - sd.centery), (td.centerx - sd.centerx)),
                    theta2 = Math.atan2((sd.centery - td.centery), (sd.centerx - td.centerx));

// --------------------------------------------------------------------------------------

                // improved face calculation. get midpoints of each face for source and target, then put in an array with all combinations of
                // source/target faces. sort this array by distance between midpoints. the entry at index 0 is our preferred option. we can
                // go through the array one by one until we find an entry in which each requested face is supported.
                var candidates = [], midpoints = { };
                (function (types, dim) {
                    for (var i = 0; i < types.length; i++) {
                        midpoints[types[i]] = {
                            "left": [ dim[i].left, dim[i].centery ],
                            "right": [ dim[i].right, dim[i].centery ],
                            "top": [ dim[i].centerx, dim[i].top ],
                            "bottom": [ dim[i].centerx , dim[i].bottom]
                        };
                    }
                })([ "source", "target" ], [ sd, td ]);

                for (var sf = 0; sf < axes.length; sf++) {
                    for (var tf = 0; tf < axes.length; tf++) {
                        if (sf != tf) {
                            candidates.push({
                                source: axes[sf],
                                target: axes[tf],
                                dist: Biltong.lineLength(midpoints.source[axes[sf]], midpoints.target[axes[tf]])
                            });
                        }
                    }
                }

                candidates.sort(function (a, b) {
                    return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0;
                });

                // now go through this list and try to get an entry that satisfies both (there will be one, unless one of the anchors
                // declares no available faces)
                var sourceEdge = candidates[0].source, targetEdge = candidates[0].target;
                for (var i = 0; i < candidates.length; i++) {

                    if (!sourceAnchor.isContinuous || sourceAnchor.isEdgeSupported(candidates[i].source))
                        sourceEdge = candidates[i].source;
                    else
                        sourceEdge = null;

                    if (!targetAnchor.isContinuous || targetAnchor.isEdgeSupported(candidates[i].target))
                        targetEdge = candidates[i].target;
                    else {
                        targetEdge = null;
                    }

                    if (sourceEdge != null && targetEdge != null) break;
                }

// --------------------------------------------------------------------------------------

                return {
                    a: [ sourceEdge, targetEdge ],
                    theta: theta,
                    theta2: theta2
                };
            },
        // used by placeAnchors function
            placeAnchorsOnLine = function (desc, elementDimensions, elementPosition, connections, horizontal, otherMultiplier, reverse) {
                var a = [], step = elementDimensions[horizontal ? 0 : 1] / (connections.length + 1);

                for (var i = 0; i < connections.length; i++) {
                    var val = (i + 1) * step, other = otherMultiplier * elementDimensions[horizontal ? 1 : 0];
                    if (reverse)
                        val = elementDimensions[horizontal ? 0 : 1] - val;

                    var dx = (horizontal ? val : other), x = elementPosition[0] + dx, xp = dx / elementDimensions[0],
                        dy = (horizontal ? other : val), y = elementPosition[1] + dy, yp = dy / elementDimensions[1];

                    a.push([ x, y, xp, yp, connections[i][1], connections[i][2] ]);
                }

                return a;
            },
        // used by edgeSortFunctions
            currySort = function (reverseAngles) {
                return function (a, b) {
                    var r = true;
                    if (reverseAngles) {
                        r = a[0][0] < b[0][0];
                    }
                    else {
                        r = a[0][0] > b[0][0];
                    }
                    return r === false ? -1 : 1;
                };
            },
        // used by edgeSortFunctions
            leftSort = function (a, b) {
                // first get adjusted values
                var p1 = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0],
                    p2 = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                if (p1 > p2) return 1;
                else return a[0][1] > b[0][1] ? 1 : -1;
            },
        // used by placeAnchors
            edgeSortFunctions = {
                "top": function (a, b) {
                    return a[0] > b[0] ? 1 : -1;
                },
                "right": currySort(true),
                "bottom": currySort(true),
                "left": leftSort
            },
        // used by placeAnchors
            _sortHelper = function (_array, _fn) {
                return _array.sort(_fn);
            },
        // used by AnchorManager.redraw
            placeAnchors = function (elementId, _anchorLists) {
                var cd = jsPlumbInstance.getCachedData(elementId), sS = cd.s, sO = cd.o,
                    placeSomeAnchors = function (desc, elementDimensions, elementPosition, unsortedConnections, isHorizontal, otherMultiplier, orientation) {
                        if (unsortedConnections.length > 0) {
                            var sc = _sortHelper(unsortedConnections, edgeSortFunctions[desc]), // puts them in order based on the target element's pos on screen
                                reverse = desc === "right" || desc === "top",
                                anchors = placeAnchorsOnLine(desc, elementDimensions,
                                    elementPosition, sc,
                                    isHorizontal, otherMultiplier, reverse);

                            // takes a computed anchor position and adjusts it for parent offset and scroll, then stores it.
                            var _setAnchorLocation = function (endpoint, anchorPos) {
                                continuousAnchorLocations[endpoint.id] = [ anchorPos[0], anchorPos[1], anchorPos[2], anchorPos[3] ];
                                continuousAnchorOrientations[endpoint.id] = orientation;
                            };

                            for (var i = 0; i < anchors.length; i++) {
                                var c = anchors[i][4], weAreSource = c.endpoints[0].elementId === elementId, weAreTarget = c.endpoints[1].elementId === elementId;
                                if (weAreSource)
                                    _setAnchorLocation(c.endpoints[0], anchors[i]);
                                else if (weAreTarget)
                                    _setAnchorLocation(c.endpoints[1], anchors[i]);
                            }
                        }
                    };

                placeSomeAnchors("bottom", sS, [sO.left, sO.top], _anchorLists.bottom, true, 1, [0, 1]);
                placeSomeAnchors("top", sS, [sO.left, sO.top], _anchorLists.top, true, 0, [0, -1]);
                placeSomeAnchors("left", sS, [sO.left, sO.top], _anchorLists.left, false, 0, [-1, 0]);
                placeSomeAnchors("right", sS, [sO.left, sO.top], _anchorLists.right, false, 1, [1, 0]);
            };

        this.reset = function () {
            _amEndpoints = {};
            connectionsByElementId = {};
            anchorLists = {};
        };
        this.addFloatingConnection = function (key, conn) {
            floatingConnections[key] = conn;
        };
        this.removeFloatingConnection = function (key) {
            delete floatingConnections[key];
        };
        this.newConnection = function (conn) {
            var sourceId = conn.sourceId, targetId = conn.targetId,
                ep = conn.endpoints,
                doRegisterTarget = true,
                registerConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                    if ((sourceId == targetId) && otherAnchor.isContinuous) {
                        // remove the target endpoint's canvas.  we dont need it.
                        conn._jsPlumb.instance.removeElement(ep[1].canvas);
                        doRegisterTarget = false;
                    }
                    _ju.addToList(connectionsByElementId, elId, [c, otherEndpoint, otherAnchor.constructor == _jp.DynamicAnchor]);
                };

            registerConnection(0, ep[0], ep[0].anchor, targetId, conn);
            if (doRegisterTarget)
                registerConnection(1, ep[1], ep[1].anchor, sourceId, conn);
        };
        var removeEndpointFromAnchorLists = function (endpoint) {
            (function (list, eId) {
                if (list) {  // transient anchors dont get entries in this list.
                    var f = function (e) {
                        return e[4] == eId;
                    };
                    _ju.removeWithFunction(list.top, f);
                    _ju.removeWithFunction(list.left, f);
                    _ju.removeWithFunction(list.bottom, f);
                    _ju.removeWithFunction(list.right, f);
                }
            })(anchorLists[endpoint.elementId], endpoint.id);
        };
        this.connectionDetached = function (connInfo, doNotRedraw) {
            var connection = connInfo.connection || connInfo,
                sourceId = connInfo.sourceId,
                targetId = connInfo.targetId,
                ep = connection.endpoints,
                removeConnection = function (otherIndex, otherEndpoint, otherAnchor, elId, c) {
                   _ju.removeWithFunction(connectionsByElementId[elId], function (_c) {
                        return _c[0].id == c.id;
                    });
                };

            removeConnection(1, ep[1], ep[1].anchor, sourceId, connection);
            removeConnection(0, ep[0], ep[0].anchor, targetId, connection);
            if (connection.floatingId) {
                removeConnection(connection.floatingIndex, connection.floatingEndpoint, connection.floatingEndpoint.anchor, connection.floatingId, connection);
                removeEndpointFromAnchorLists(connection.floatingEndpoint);
            }

            // remove from anchorLists            
            removeEndpointFromAnchorLists(connection.endpoints[0]);
            removeEndpointFromAnchorLists(connection.endpoints[1]);

            if (!doNotRedraw) {
                self.redraw(connection.sourceId);
                if (connection.targetId !== connection.sourceId)
                    self.redraw(connection.targetId);
            }
        };
        this.add = function (endpoint, elementId) {
            _ju.addToList(_amEndpoints, elementId, endpoint);
        };
        this.changeId = function (oldId, newId) {
            connectionsByElementId[newId] = connectionsByElementId[oldId];
            _amEndpoints[newId] = _amEndpoints[oldId];
            delete connectionsByElementId[oldId];
            delete _amEndpoints[oldId];
        };
        this.getConnectionsFor = function (elementId) {
            return connectionsByElementId[elementId] || [];
        };
        this.getEndpointsFor = function (elementId) {
            return _amEndpoints[elementId] || [];
        };
        this.deleteEndpoint = function (endpoint) {
            _ju.removeWithFunction(_amEndpoints[endpoint.elementId], function (e) {
                return e.id == endpoint.id;
            });
            removeEndpointFromAnchorLists(endpoint);
        };
        this.clearFor = function (elementId) {
            delete _amEndpoints[elementId];
            _amEndpoints[elementId] = [];
        };
        // updates the given anchor list by either updating an existing anchor's info, or adding it. this function
        // also removes the anchor from its previous list, if the edge it is on has changed.
        // all connections found along the way (those that are connected to one of the faces this function
        // operates on) are added to the connsToPaint list, as are their endpoints. in this way we know to repaint
        // them wthout having to calculate anything else about them.
        var _updateAnchorList = function (lists, theta, order, conn, aBoolean, otherElId, idx, reverse, edgeId, elId, connsToPaint, endpointsToPaint) {
            // first try to find the exact match, but keep track of the first index of a matching element id along the way.s
            var exactIdx = -1,
                firstMatchingElIdx = -1,
                endpoint = conn.endpoints[idx],
                endpointId = endpoint.id,
                oIdx = [1, 0][idx],
                values = [
                    [ theta, order ],
                    conn,
                    aBoolean,
                    otherElId,
                    endpointId
                ],
                listToAddTo = lists[edgeId],
                listToRemoveFrom = endpoint._continuousAnchorEdge ? lists[endpoint._continuousAnchorEdge] : null,
                i,
                candidate;

            if (listToRemoveFrom) {
                var rIdx = _ju.findWithFunction(listToRemoveFrom, function (e) {
                    return e[4] == endpointId;
                });
                if (rIdx != -1) {
                    listToRemoveFrom.splice(rIdx, 1);
                    // get all connections from this list
                    for (i = 0; i < listToRemoveFrom.length; i++) {
                        candidate = listToRemoveFrom[i][1];
                        _ju.addWithFunction(connsToPaint, candidate, function (c) {
                            return c.id == candidate.id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[idx], function (e) {
                            return e.id == candidate.endpoints[idx].id;
                        });
                        _ju.addWithFunction(endpointsToPaint, listToRemoveFrom[i][1].endpoints[oIdx], function (e) {
                            return e.id == candidate.endpoints[oIdx].id;
                        });
                    }
                }
            }

            for (i = 0; i < listToAddTo.length; i++) {
                candidate = listToAddTo[i][1];
                if (params.idx == 1 && listToAddTo[i][3] === otherElId && firstMatchingElIdx == -1)
                    firstMatchingElIdx = i;
                _ju.addWithFunction(connsToPaint, candidate, function (c) {
                    return c.id == candidate.id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[idx], function (e) {
                    return e.id == candidate.endpoints[idx].id;
                });
                _ju.addWithFunction(endpointsToPaint, listToAddTo[i][1].endpoints[oIdx], function (e) {
                    return e.id == candidate.endpoints[oIdx].id;
                });
            }
            if (exactIdx != -1) {
                listToAddTo[exactIdx] = values;
            }
            else {
                var insertIdx = reverse ? firstMatchingElIdx != -1 ? firstMatchingElIdx : 0 : listToAddTo.length; // of course we will get this from having looked through the array shortly.
                listToAddTo.splice(insertIdx, 0, values);
            }

            // store this for next time.
            endpoint._continuousAnchorEdge = edgeId;
        };

        //
        // find the entry in an endpoint's list for this connection and update its target endpoint
        // with the current target in the connection.
        // 
        //
        this.updateOtherEndpoint = function (elId, oldTargetId, newTargetId, connection) {
            var sIndex = _ju.findWithFunction(connectionsByElementId[elId], function (i) {
                    return i[0].id === connection.id;
                }),
                tIndex = _ju.findWithFunction(connectionsByElementId[oldTargetId], function (i) {
                    return i[0].id === connection.id;
                });

            // update or add data for source
            if (sIndex != -1) {
                connectionsByElementId[elId][sIndex][0] = connection;
                connectionsByElementId[elId][sIndex][1] = connection.endpoints[1];
                connectionsByElementId[elId][sIndex][2] = connection.endpoints[1].anchor.constructor == _jp.DynamicAnchor;
            }

            // remove entry for previous target (if there)
            if (tIndex > -1) {
                connectionsByElementId[oldTargetId].splice(tIndex, 1);
                // add entry for new target
                _ju.addToList(connectionsByElementId, newTargetId, [connection, connection.endpoints[0], connection.endpoints[0].anchor.constructor == _jp.DynamicAnchor]);
            }

            connection.updateConnectedClass();
        };

        //
        // notification that the connection given has changed source from the originalId to the newId.
        // This involves:
        // 1. removing the connection from the list of connections stored for the originalId
        // 2. updating the source information for the target of the connection
        // 3. re-registering the connection in connectionsByElementId with the newId
        //
        this.sourceChanged = function (originalId, newId, connection) {
            if (originalId !== newId) {
                // remove the entry that points from the old source to the target
                _ju.removeWithFunction(connectionsByElementId[originalId], function (info) {
                    return info[0].id === connection.id;
                });
                // find entry for target and update it
                var tIdx = _ju.findWithFunction(connectionsByElementId[connection.targetId], function (i) {
                    return i[0].id === connection.id;
                });
                if (tIdx > -1) {
                    connectionsByElementId[connection.targetId][tIdx][0] = connection;
                    connectionsByElementId[connection.targetId][tIdx][1] = connection.endpoints[0];
                    connectionsByElementId[connection.targetId][tIdx][2] = connection.endpoints[0].anchor.constructor == _jp.DynamicAnchor;
                }
                // add entry for new source
                _ju.addToList(connectionsByElementId, newId, [connection, connection.endpoints[1], connection.endpoints[1].anchor.constructor == _jp.DynamicAnchor]);

                // TODO SP not final on this yet. when a user drags an existing connection and it turns into a self
                // loop, then this code hides the target endpoint (by removing it from the DOM) But I think this should
                // occur only if the anchor is Continuous
                if (connection.endpoints[1].anchor.isContinuous) {
                    if (connection.source === connection.target) {
                        connection._jsPlumb.instance.removeElement(connection.endpoints[1].canvas);
                    }
                    else {
                        if (connection.endpoints[1].canvas.parentNode == null) {
                            connection._jsPlumb.instance.appendElement(connection.endpoints[1].canvas);
                        }
                    }
                }

                connection.updateConnectedClass();
            }
        };

        //
        // moves the given endpoint from `currentId` to `element`.
        // This involves:
        //
        // 1. changing the key in _amEndpoints under which the endpoint is stored
        // 2. changing the source or target values in all of the endpoint's connections
        // 3. changing the array in connectionsByElementId in which the endpoint's connections
        //    are stored (done by either sourceChanged or updateOtherEndpoint)
        //
        this.rehomeEndpoint = function (ep, currentId, element) {
            var eps = _amEndpoints[currentId] || [],
                elementId = jsPlumbInstance.getId(element);

            if (elementId !== currentId) {
                var idx = eps.indexOf(ep);
                if (idx > -1) {
                    var _ep = eps.splice(idx, 1)[0];
                    self.add(_ep, elementId);
                }
            }

            for (var i = 0; i < ep.connections.length; i++) {
                if (ep.connections[i].sourceId == currentId) {
                    ep.connections[i].sourceId = ep.elementId;
                    ep.connections[i].source = ep.element;
                    self.sourceChanged(currentId, ep.elementId, ep.connections[i]);
                }
                else if (ep.connections[i].targetId == currentId) {
                    ep.connections[i].targetId = ep.elementId;
                    ep.connections[i].target = ep.element;
                    self.updateOtherEndpoint(ep.connections[i].sourceId, currentId, ep.elementId, ep.connections[i]);
                }
            }
        };

        this.redraw = function (elementId, ui, timestamp, offsetToUI, clearEdits, doNotRecalcEndpoint) {

            if (!jsPlumbInstance.isSuspendDrawing()) {
                // get all the endpoints for this element
                var ep = _amEndpoints[elementId] || [],
                    endpointConnections = connectionsByElementId[elementId] || [],
                    connectionsToPaint = [],
                    endpointsToPaint = [],
                    anchorsToUpdate = [];

                timestamp = timestamp || jsPlumbInstance.timestamp();
                // offsetToUI are values that would have been calculated in the dragManager when registering
                // an endpoint for an element that had a parent (somewhere in the hierarchy) that had been
                // registered as draggable.
                offsetToUI = offsetToUI || {left: 0, top: 0};
                if (ui) {
                    ui = {
                        left: ui.left + offsetToUI.left,
                        top: ui.top + offsetToUI.top
                    };
                }

                // valid for one paint cycle.
                var myOffset = jsPlumbInstance.updateOffset({ elId: elementId, offset: ui, recalc: false, timestamp: timestamp }),
                    orientationCache = {};

                // actually, first we should compute the orientation of this element to all other elements to which
                // this element is connected with a continuous anchor (whether both ends of the connection have
                // a continuous anchor or just one)

                for (var i = 0; i < endpointConnections.length; i++) {
                    var conn = endpointConnections[i][0],
                        sourceId = conn.sourceId,
                        targetId = conn.targetId,
                        sourceContinuous = conn.endpoints[0].anchor.isContinuous,
                        targetContinuous = conn.endpoints[1].anchor.isContinuous;

                    if (sourceContinuous || targetContinuous) {
                        var oKey = sourceId + "_" + targetId,
                            o = orientationCache[oKey],
                            oIdx = conn.sourceId == elementId ? 1 : 0;

                        if (sourceContinuous && !anchorLists[sourceId]) anchorLists[sourceId] = { top: [], right: [], bottom: [], left: [] };
                        if (targetContinuous && !anchorLists[targetId]) anchorLists[targetId] = { top: [], right: [], bottom: [], left: [] };

                        if (elementId != targetId) jsPlumbInstance.updateOffset({ elId: targetId, timestamp: timestamp });
                        if (elementId != sourceId) jsPlumbInstance.updateOffset({ elId: sourceId, timestamp: timestamp });

                        var td = jsPlumbInstance.getCachedData(targetId),
                            sd = jsPlumbInstance.getCachedData(sourceId);

                        if (targetId == sourceId && (sourceContinuous || targetContinuous)) {
                            // here we may want to improve this by somehow determining the face we'd like
                            // to put the connector on.  ideally, when drawing, the face should be calculated
                            // by determining which face is closest to the point at which the mouse button
                            // was released.  for now, we're putting it on the top face.
                            _updateAnchorList(
                                anchorLists[sourceId],
                                    -Math.PI / 2,
                                0,
                                conn,
                                false,
                                targetId,
                                0, false, "top", sourceId, connectionsToPaint, endpointsToPaint);
                        }
                        else {
                            if (!o) {
                                o = calculateOrientation(sourceId, targetId, sd.o, td.o, conn.endpoints[0].anchor, conn.endpoints[1].anchor);
                                orientationCache[oKey] = o;
                                // this would be a performance enhancement, but the computed angles need to be clamped to
                                //the (-PI/2 -> PI/2) range in order for the sorting to work properly.
                                /*  orientationCache[oKey2] = {
                                 orientation:o.orientation,
                                 a:[o.a[1], o.a[0]],
                                 theta:o.theta + Math.PI,
                                 theta2:o.theta2 + Math.PI
                                 };*/
                            }
                            if (sourceContinuous) _updateAnchorList(anchorLists[sourceId], o.theta, 0, conn, false, targetId, 0, false, o.a[0], sourceId, connectionsToPaint, endpointsToPaint);
                            if (targetContinuous) _updateAnchorList(anchorLists[targetId], o.theta2, -1, conn, true, sourceId, 1, true, o.a[1], targetId, connectionsToPaint, endpointsToPaint);
                        }

                        if (sourceContinuous) _ju.addWithFunction(anchorsToUpdate, sourceId, function (a) {
                            return a === sourceId;
                        });
                        if (targetContinuous) _ju.addWithFunction(anchorsToUpdate, targetId, function (a) {
                            return a === targetId;
                        });
                        _ju.addWithFunction(connectionsToPaint, conn, function (c) {
                            return c.id == conn.id;
                        });
                        if ((sourceContinuous && oIdx === 0) || (targetContinuous && oIdx === 1))
                            _ju.addWithFunction(endpointsToPaint, conn.endpoints[oIdx], function (e) {
                                return e.id == conn.endpoints[oIdx].id;
                            });
                    }
                }

                // place Endpoints whose anchors are continuous but have no Connections
                for (i = 0; i < ep.length; i++) {
                    if (ep[i].connections.length === 0 && ep[i].anchor.isContinuous) {
                        if (!anchorLists[elementId]) anchorLists[elementId] = { top: [], right: [], bottom: [], left: [] };
                        _updateAnchorList(anchorLists[elementId], -Math.PI / 2, 0, {endpoints: [ep[i], ep[i]], paint: function () {
                        }}, false, elementId, 0, false, ep[i].anchor.getDefaultFace(), elementId, connectionsToPaint, endpointsToPaint);
                        _ju.addWithFunction(anchorsToUpdate, elementId, function (a) {
                            return a === elementId;
                        });
                    }
                }


                // now place all the continuous anchors we need to;
                for (i = 0; i < anchorsToUpdate.length; i++) {
                    placeAnchors(anchorsToUpdate[i], anchorLists[anchorsToUpdate[i]]);
                }

                // now that continuous anchors have been placed, paint all the endpoints for this element
                // TODO performance: add the endpoint ids to a temp array, and then when iterating in the next
                // loop, check that we didn't just paint that endpoint. we can probably shave off a few more milliseconds this way.
                for (i = 0; i < ep.length; i++) {
                    ep[i].paint({ timestamp: timestamp, offset: myOffset, dimensions: myOffset.s, recalc: doNotRecalcEndpoint !== true });
                }

                // ... and any other endpoints we came across as a result of the continuous anchors.
                for (i = 0; i < endpointsToPaint.length; i++) {
                    var cd = jsPlumbInstance.getCachedData(endpointsToPaint[i].elementId);
                    endpointsToPaint[i].paint({ timestamp: timestamp, offset: cd, dimensions: cd.s });
                }

                // paint all the standard and "dynamic connections", which are connections whose other anchor is
                // static and therefore does need to be recomputed; we make sure that happens only one time.

                // TODO we could have compiled a list of these in the first pass through connections; might save some time.
                for (i = 0; i < endpointConnections.length; i++) {
                    var otherEndpoint = endpointConnections[i][1];
                    if (otherEndpoint.anchor.constructor == _jp.DynamicAnchor) {
                        otherEndpoint.paint({ elementWithPrecedence: elementId, timestamp: timestamp });
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id == endpointConnections[i][0].id;
                        });
                        // all the connections for the other endpoint now need to be repainted
                        for (var k = 0; k < otherEndpoint.connections.length; k++) {
                            if (otherEndpoint.connections[k] !== endpointConnections[i][0])
                                _ju.addWithFunction(connectionsToPaint, otherEndpoint.connections[k], function (c) {
                                    return c.id == otherEndpoint.connections[k].id;
                                });
                        }
                    } else if (otherEndpoint.anchor.constructor == _jp.Anchor) {
                        _ju.addWithFunction(connectionsToPaint, endpointConnections[i][0], function (c) {
                            return c.id == endpointConnections[i][0].id;
                        });
                    }
                }

                // paint current floating connection for this element, if there is one.
                var fc = floatingConnections[elementId];
                if (fc)
                    fc.paint({timestamp: timestamp, recalc: false, elId: elementId});

                // paint all the connections
                for (i = 0; i < connectionsToPaint.length; i++) {
                    connectionsToPaint[i].paint({elId: elementId, timestamp: timestamp, recalc: false, clearEdits: clearEdits});
                }
            }
        };

        var ContinuousAnchor = function (anchorParams) {
            _ju.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var faces = anchorParams.faces || ["top", "right", "bottom", "left"],
                clockwise = !(anchorParams.clockwise === false),
                availableFaces = { },
                opposites = { "top": "bottom", "right": "left", "left": "right", "bottom": "top" },
                clockwiseOptions = { "top": "right", "right": "bottom", "left": "top", "bottom": "left" },
                antiClockwiseOptions = { "top": "left", "right": "top", "left": "bottom", "bottom": "right" },
                secondBest = clockwise ? clockwiseOptions : antiClockwiseOptions,
                lastChoice = clockwise ? antiClockwiseOptions : clockwiseOptions,
                cssClass = anchorParams.cssClass || "";

            for (var i = 0; i < faces.length; i++) {
                availableFaces[faces[i]] = true;
            }

            this.getDefaultFace = function () {
                return faces.length === 0 ? "top" : faces[0];
            };

            // if the given edge is supported, returns it. otherwise looks for a substitute that _is_
            // supported. if none supported we also return the request edge.
            this.verifyEdge = function (edge) {
                if (availableFaces[edge]) return edge;
                else if (availableFaces[opposites[edge]]) return opposites[edge];
                else if (availableFaces[secondBest[edge]]) return secondBest[edge];
                else if (availableFaces[lastChoice[edge]]) return lastChoice[edge];
                return edge; // we have to give them something.
            };

            this.isEdgeSupported = function (edge) {
                return availableFaces[edge] === true;
            };

            this.compute = function (params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getCurrentLocation = function (params) {
                return userDefinedContinuousAnchorLocations[params.element.id] || continuousAnchorLocations[params.element.id] || [0, 0];
            };
            this.getOrientation = function (endpoint) {
                return continuousAnchorOrientations[endpoint.id] || [0, 0];
            };
            this.clearUserDefinedLocation = function () {
                delete userDefinedContinuousAnchorLocations[anchorParams.elementId];
            };
            this.setUserDefinedLocation = function (loc) {
                userDefinedContinuousAnchorLocations[anchorParams.elementId] = loc;
            };
            this.getCssClass = function () {
                return cssClass;
            };
        };

        // continuous anchors
        jsPlumbInstance.continuousAnchorFactory = {
            get: function (params) {
                return new ContinuousAnchor(params);
            },
            clear: function (elementId) {
                delete userDefinedContinuousAnchorLocations[elementId];
                delete continuousAnchorLocations[elementId];
            }
        };
    };

    /**
     * Anchors model a position on some element at which an Endpoint may be located.  They began as a first class citizen of jsPlumb, ie. a user
     * was required to create these themselves, but over time this has been replaced by the concept of referring to them either by name (eg. "TopMiddle"),
     * or by an array describing their coordinates (eg. [ 0, 0.5, 0, -1 ], which is the same as "TopMiddle").  jsPlumb now handles all of the
     * creation of Anchors without user intervention.
     */
    _jp.Anchor = function (params) {
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.elementId = params.elementId;
        this.cssClass = params.cssClass || "";
        this.userDefinedLocation = null;
        this.orientation = params.orientation || [ 0, 0 ];
        this.lastReturnValue = null;
        this.offsets = params.offsets || [ 0, 0 ];
        this.timestamp = null;

        _ju.EventGenerator.apply(this);

        this.compute = function (params) {

            var xy = params.xy, wh = params.wh, timestamp = params.timestamp;

            if (params.clearUserDefinedLocation)
                this.userDefinedLocation = null;

            if (timestamp && timestamp === self.timestamp)
                return this.lastReturnValue;

            if (this.userDefinedLocation != null) {
                this.lastReturnValue = this.userDefinedLocation;
            }
            else {
                this.lastReturnValue = [ xy[0] + (this.x * wh[0]) + this.offsets[0], xy[1] + (this.y * wh[1]) + this.offsets[1] ];
            }

            this.timestamp = timestamp;
            return this.lastReturnValue;
        };

        this.getCurrentLocation = function (params) {
            params = params || {};
            return (this.lastReturnValue == null || (params.timestamp != null && this.timestamp != params.timestamp)) ? this.compute(params) : this.lastReturnValue;
        };
    };
    _ju.extend(_jp.Anchor, _ju.EventGenerator, {
        equals: function (anchor) {
            if (!anchor) return false;
            var ao = anchor.getOrientation(),
                o = this.getOrientation();
            return this.x == anchor.x && this.y == anchor.y && this.offsets[0] == anchor.offsets[0] && this.offsets[1] == anchor.offsets[1] && o[0] == ao[0] && o[1] == ao[1];
        },
        getUserDefinedLocation: function () {
            return this.userDefinedLocation;
        },
        setUserDefinedLocation: function (l) {
            this.userDefinedLocation = l;
        },
        clearUserDefinedLocation: function () {
            this.userDefinedLocation = null;
        },
        getOrientation: function () {
            return this.orientation;
        },
        getCssClass: function () {
            return this.cssClass;
        }
    });

    /**
     * An Anchor that floats. its orientation is computed dynamically from
     * its position relative to the anchor it is floating relative to.  It is used when creating
     * a connection through drag and drop.
     *
     * TODO FloatingAnchor could totally be refactored to extend Anchor just slightly.
     */
    _jp.FloatingAnchor = function (params) {

        _jp.Anchor.apply(this, arguments);

        // this is the anchor that this floating anchor is referenced to for
        // purposes of calculating the orientation.
        var ref = params.reference,
            // the canvas this refers to.
            refCanvas = params.referenceCanvas,
            size = _jp.getSize(refCanvas),
            // these are used to store the current relative position of our
            // anchor wrt the reference anchor. they only indicate
            // direction, so have a value of 1 or -1 (or, very rarely, 0). these
            // values are written by the compute method, and read
            // by the getOrientation method.
            xDir = 0, yDir = 0,
            // temporary member used to store an orientation when the floating
            // anchor is hovering over another anchor.
            orientation = null,
            _lastResult = null;

        // clear from parent. we want floating anchor orientation to always be computed.
        this.orientation = null;

        // set these to 0 each; they are used by certain types of connectors in the loopback case,
        // when the connector is trying to clear the element it is on. but for floating anchor it's not
        // very important.
        this.x = 0;
        this.y = 0;

        this.isFloating = true;

        this.compute = function (params) {
            var xy = params.xy,
                result = [ xy[0] + (size[0] / 2), xy[1] + (size[1] / 2) ]; // return origin of the element. we may wish to improve this so that any object can be the drag proxy.
            _lastResult = result;
            return result;
        };

        this.getOrientation = function (_endpoint) {
            if (orientation) return orientation;
            else {
                var o = ref.getOrientation(_endpoint);
                // here we take into account the orientation of the other
                // anchor: if it declares zero for some direction, we declare zero too. this might not be the most awesome. perhaps we can come
                // up with a better way. it's just so that the line we draw looks like it makes sense. maybe this wont make sense.
                return [ Math.abs(o[0]) * xDir * -1,
                        Math.abs(o[1]) * yDir * -1 ];
            }
        };

        /**
         * notification the endpoint associated with this anchor is hovering
         * over another anchor; we want to assume that anchor's orientation
         * for the duration of the hover.
         */
        this.over = function (anchor, endpoint) {
            orientation = anchor.getOrientation(endpoint);
        };

        /**
         * notification the endpoint associated with this anchor is no
         * longer hovering over another anchor; we should resume calculating
         * orientation as we normally do.
         */
        this.out = function () {
            orientation = null;
        };

        this.getCurrentLocation = function (params) {
            return _lastResult == null ? this.compute(params) : _lastResult;
        };
    };
    _ju.extend(_jp.FloatingAnchor, _jp.Anchor);

    var _convertAnchor = function (anchor, jsPlumbInstance, elementId) {
        return anchor.constructor == _jp.Anchor ? anchor : jsPlumbInstance.makeAnchor(anchor, elementId, jsPlumbInstance);
    };

    /* 
     * A DynamicAnchor is an Anchor that contains a list of other Anchors, which it cycles
     * through at compute time to find the one that is located closest to
     * the center of the target element, and returns that Anchor's compute
     * method result. this causes endpoints to follow each other with
     * respect to the orientation of their target elements, which is a useful
     * feature for some applications.
     * 
     */
    _jp.DynamicAnchor = function (params) {
        _jp.Anchor.apply(this, arguments);

        this.isDynamic = true;
        this.anchors = [];
        this.elementId = params.elementId;
        this.jsPlumbInstance = params.jsPlumbInstance;

        for (var i = 0; i < params.anchors.length; i++)
            this.anchors[i] = _convertAnchor(params.anchors[i], this.jsPlumbInstance, this.elementId);

        this.getAnchors = function () {
            return this.anchors;
        };
        this.locked = false;
        var _curAnchor = this.anchors.length > 0 ? this.anchors[0] : null,
            _lastAnchor = _curAnchor,
            self = this,

        // helper method to calculate the distance between the centers of the two elements.
            _distance = function (anchor, cx, cy, xy, wh) {
                var ax = xy[0] + (anchor.x * wh[0]), ay = xy[1] + (anchor.y * wh[1]),
                    acx = xy[0] + (wh[0] / 2), acy = xy[1] + (wh[1] / 2);
                return (Math.sqrt(Math.pow(cx - ax, 2) + Math.pow(cy - ay, 2)) +
                    Math.sqrt(Math.pow(acx - ax, 2) + Math.pow(acy - ay, 2)));
            },
        // default method uses distance between element centers.  you can provide your own method in the dynamic anchor
        // constructor (and also to jsPlumb.makeDynamicAnchor). the arguments to it are four arrays:
        // xy - xy loc of the anchor's element
        // wh - anchor's element's dimensions
        // txy - xy loc of the element of the other anchor in the connection
        // twh - dimensions of the element of the other anchor in the connection.
        // anchors - the list of selectable anchors
            _anchorSelector = params.selector || function (xy, wh, txy, twh, anchors) {
                var cx = txy[0] + (twh[0] / 2), cy = txy[1] + (twh[1] / 2);
                var minIdx = -1, minDist = Infinity;
                for (var i = 0; i < anchors.length; i++) {
                    var d = _distance(anchors[i], cx, cy, xy, wh);
                    if (d < minDist) {
                        minIdx = i + 0;
                        minDist = d;
                    }
                }
                return anchors[minIdx];
            };

        this.compute = function (params) {
            var xy = params.xy, wh = params.wh, txy = params.txy, twh = params.twh;

            this.timestamp = params.timestamp;

            var udl = self.getUserDefinedLocation();
            if (udl != null) {
                return udl;
            }

            // if anchor is locked or an opposite element was not given, we
            // maintain our state. anchor will be locked
            // if it is the source of a drag and drop.
            if (this.locked || txy == null || twh == null)
                return _curAnchor.compute(params);
            else
                params.timestamp = null; // otherwise clear this, i think. we want the anchor to compute.

            _curAnchor = _anchorSelector(xy, wh, txy, twh, this.anchors);
            this.x = _curAnchor.x;
            this.y = _curAnchor.y;

            if (_curAnchor != _lastAnchor)
                this.fire("anchorChanged", _curAnchor);

            _lastAnchor = _curAnchor;

            return _curAnchor.compute(params);
        };

        this.getCurrentLocation = function (params) {
            return this.getUserDefinedLocation() || (_curAnchor != null ? _curAnchor.getCurrentLocation(params) : null);
        };

        this.getOrientation = function (_endpoint) {
            return _curAnchor != null ? _curAnchor.getOrientation(_endpoint) : [ 0, 0 ];
        };
        this.over = function (anchor, endpoint) {
            if (_curAnchor != null) _curAnchor.over(anchor, endpoint);
        };
        this.out = function () {
            if (_curAnchor != null) _curAnchor.out();
        };

        this.getCssClass = function () {
            return (_curAnchor && _curAnchor.getCssClass()) || "";
        };
    };
    _ju.extend(_jp.DynamicAnchor, _jp.Anchor);

// -------- basic anchors ------------------    
    var _curryAnchor = function (x, y, ox, oy, type, fnInit) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor([ x, y, ox, oy, 0, 0 ], params.elementId, params.jsPlumbInstance);
            a.type = type;
            if (fnInit) fnInit(a, params);
            return a;
        };
    };

    _curryAnchor(0.5, 0, 0, -1, "TopCenter");
    _curryAnchor(0.5, 1, 0, 1, "BottomCenter");
    _curryAnchor(0, 0.5, -1, 0, "LeftMiddle");
    _curryAnchor(1, 0.5, 1, 0, "RightMiddle");

    _curryAnchor(0.5, 0, 0, -1, "Top");
    _curryAnchor(0.5, 1, 0, 1, "Bottom");
    _curryAnchor(0, 0.5, -1, 0, "Left");
    _curryAnchor(1, 0.5, 1, 0, "Right");
    _curryAnchor(0.5, 0.5, 0, 0, "Center");
    _curryAnchor(1, 0, 0, -1, "TopRight");
    _curryAnchor(1, 1, 0, 1, "BottomRight");
    _curryAnchor(0, 0, 0, -1, "TopLeft");
    _curryAnchor(0, 1, 0, 1, "BottomLeft");

// ------- dynamic anchors -------------------    

    // default dynamic anchors chooses from Top, Right, Bottom, Left
    _jp.Defaults.DynamicAnchors = function (params) {
        return params.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], params.elementId, params.jsPlumbInstance);
    };

    // default dynamic anchors bound to name 'AutoDefault'
    _jp.Anchors.AutoDefault = function (params) {
        var a = params.jsPlumbInstance.makeDynamicAnchor(_jp.Defaults.DynamicAnchors(params));
        a.type = "AutoDefault";
        return a;
    };

// ------- continuous anchors -------------------    

    var _curryContinuousAnchor = function (type, faces) {
        _jp.Anchors[type] = function (params) {
            var a = params.jsPlumbInstance.makeAnchor(["Continuous", { faces: faces }], params.elementId, params.jsPlumbInstance);
            a.type = type;
            return a;
        };
    };

    _jp.Anchors.Continuous = function (params) {
        return params.jsPlumbInstance.continuousAnchorFactory.get(params);
    };

    _curryContinuousAnchor("ContinuousLeft", ["left"]);
    _curryContinuousAnchor("ContinuousTop", ["top"]);
    _curryContinuousAnchor("ContinuousBottom", ["bottom"]);
    _curryContinuousAnchor("ContinuousRight", ["right"]);

// ------- position assign anchors -------------------    

    // this anchor type lets you assign the position at connection time.
    _curryAnchor(0, 0, 0, 0, "Assign", function (anchor, params) {
        // find what to use as the "position finder". the user may have supplied a String which represents
        // the id of a position finder in jsPlumb.AnchorPositionFinders, or the user may have supplied the
        // position finder as a function.  we find out what to use and then set it on the anchor.
        var pf = params.position || "Fixed";
        anchor.positionFinder = pf.constructor == String ? params.jsPlumbInstance.AnchorPositionFinders[pf] : pf;
        // always set the constructor params; the position finder might need them later (the Grid one does,
        // for example)
        anchor.constructorParams = params;
    });

    // these are the default anchor positions finders, which are used by the makeTarget function.  supplying
    // a position finder argument to that function allows you to specify where the resulting anchor will
    // be located
    jsPlumbInstance.prototype.AnchorPositionFinders = {
        "Fixed": function (dp, ep, es) {
            return [ (dp.left - ep.left) / es[0], (dp.top - ep.top) / es[1] ];
        },
        "Grid": function (dp, ep, es, params) {
            var dx = dp.left - ep.left, dy = dp.top - ep.top,
                gx = es[0] / (params.grid[0]), gy = es[1] / (params.grid[1]),
                mx = Math.floor(dx / gx), my = Math.floor(dy / gy);
            return [ ((mx * gx) + (gx / 2)) / es[0], ((my * gy) + (gy / 2)) / es[1] ];
        }
    };

// ------- perimeter anchors -------------------    

    _jp.Anchors.Perimeter = function (params) {
        params = params || {};
        var anchorCount = params.anchorCount || 60,
            shape = params.shape;

        if (!shape) throw new Error("no shape supplied to Perimeter Anchor type");

        var _circle = function () {
                var r = 0.5, step = Math.PI * 2 / anchorCount, current = 0, a = [];
                for (var i = 0; i < anchorCount; i++) {
                    var x = r + (r * Math.sin(current)),
                        y = r + (r * Math.cos(current));
                    a.push([ x, y, 0, 0 ]);
                    current += step;
                }
                return a;
            },
            _path = function (segments) {
                var anchorsPerFace = anchorCount / segments.length, a = [],
                    _computeFace = function (x1, y1, x2, y2, fractionalLength) {
                        anchorsPerFace = anchorCount * fractionalLength;
                        var dx = (x2 - x1) / anchorsPerFace, dy = (y2 - y1) / anchorsPerFace;
                        for (var i = 0; i < anchorsPerFace; i++) {
                            a.push([
                                    x1 + (dx * i),
                                    y1 + (dy * i),
                                0,
                                0
                            ]);
                        }
                    };

                for (var i = 0; i < segments.length; i++)
                    _computeFace.apply(null, segments[i]);

                return a;
            },
            _shape = function (faces) {
                var s = [];
                for (var i = 0; i < faces.length; i++) {
                    s.push([faces[i][0], faces[i][1], faces[i][2], faces[i][3], 1 / faces.length]);
                }
                return _path(s);
            },
            _rectangle = function () {
                return _shape([
                    [ 0, 0, 1, 0 ],
                    [ 1, 0, 1, 1 ],
                    [ 1, 1, 0, 1 ],
                    [ 0, 1, 0, 0 ]
                ]);
            };

        var _shapes = {
                "Circle": _circle,
                "Ellipse": _circle,
                "Diamond": function () {
                    return _shape([
                        [ 0.5, 0, 1, 0.5 ],
                        [ 1, 0.5, 0.5, 1 ],
                        [ 0.5, 1, 0, 0.5 ],
                        [ 0, 0.5, 0.5, 0 ]
                    ]);
                },
                "Rectangle": _rectangle,
                "Square": _rectangle,
                "Triangle": function () {
                    return _shape([
                        [ 0.5, 0, 1, 1 ],
                        [ 1, 1, 0, 1 ],
                        [ 0, 1, 0.5, 0]
                    ]);
                },
                "Path": function (params) {
                    var points = params.points, p = [], tl = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        var l = Math.sqrt(Math.pow(points[i][2] - points[i][0]) + Math.pow(points[i][3] - points[i][1]));
                        tl += l;
                        p.push([points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], l]);
                    }
                    for (var j = 0; j < p.length; j++) {
                        p[j][4] = p[j][4] / tl;
                    }
                    return _path(p);
                }
            },
            _rotate = function (points, amountInDegrees) {
                var o = [], theta = amountInDegrees / 180 * Math.PI;
                for (var i = 0; i < points.length; i++) {
                    var _x = points[i][0] - 0.5,
                        _y = points[i][1] - 0.5;

                    o.push([
                            0.5 + ((_x * Math.cos(theta)) - (_y * Math.sin(theta))),
                            0.5 + ((_x * Math.sin(theta)) + (_y * Math.cos(theta))),
                        points[i][2],
                        points[i][3]
                    ]);
                }
                return o;
            };

        if (!_shapes[shape]) throw new Error("Shape [" + shape + "] is unknown by Perimeter Anchor type");

        var da = _shapes[shape](params);
        if (params.rotation) da = _rotate(da, params.rotation);
        var a = params.jsPlumbInstance.makeDynamicAnchor(da);
        a.type = "Perimeter";
        return a;
    };
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the default Connectors, Endpoint and Overlay definitions.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil, _jg = root.Biltong;

    _jp.Segments = {

        /*
         * Class: AbstractSegment
         * A Connector is made up of 1..N Segments, each of which has a Type, such as 'Straight', 'Arc',
         * 'Bezier'. This is new from 1.4.2, and gives us a lot more flexibility when drawing connections: things such
         * as rounded corners for flowchart connectors, for example, or a straight line stub for Bezier connections, are
         * much easier to do now.
         *
         * A Segment is responsible for providing coordinates for painting it, and also must be able to report its length.
         * 
         */
        AbstractSegment: function (params) {
            this.params = params;

            /**
             * Function: findClosestPointOnPath
             * Finds the closest point on this segment to the given [x, y],
             * returning both the x and y of the point plus its distance from
             * the supplied point, and its location along the length of the
             * path inscribed by the segment.  This implementation returns
             * Infinity for distance and null values for everything else;
             * subclasses are expected to override.
             */
            this.findClosestPointOnPath = function (x, y) {
                return {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null
                };
            };

            this.getBounds = function () {
                return {
                    minX: Math.min(params.x1, params.x2),
                    minY: Math.min(params.y1, params.y2),
                    maxX: Math.max(params.x1, params.x2),
                    maxY: Math.max(params.y1, params.y2)
                };
            };
        },
        Straight: function (params) {
            var _super = _jp.Segments.AbstractSegment.apply(this, arguments),
                length, m, m2, x1, x2, y1, y2,
                _recalc = function () {
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    m = _jg.gradient({x: x1, y: y1}, {x: x2, y: y2});
                    m2 = -1 / m;
                };

            this.type = "Straight";

            this.getLength = function () {
                return length;
            };
            this.getGradient = function () {
                return m;
            };

            this.getCoordinates = function () {
                return { x1: x1, y1: y1, x2: x2, y2: y2 };
            };
            this.setCoordinates = function (coords) {
                x1 = coords.x1;
                y1 = coords.y1;
                x2 = coords.x2;
                y2 = coords.y2;
                _recalc();
            };
            this.setCoordinates({x1: params.x1, y1: params.y1, x2: params.x2, y2: params.y2});

            this.getBounds = function () {
                return {
                    minX: Math.min(x1, x2),
                    minY: Math.min(y1, y2),
                    maxX: Math.max(x1, x2),
                    maxY: Math.max(y1, y2)
                };
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive. for the straight line segment this is simple maths.
             */
            this.pointOnPath = function (location, absolute) {
                if (location === 0 && !absolute)
                    return { x: x1, y: y1 };
                else if (location == 1 && !absolute)
                    return { x: x2, y: y2 };
                else {
                    var l = absolute ? location > 0 ? location : length + location : location * length;
                    return _jg.pointOnLine({x: x1, y: y1}, {x: x2, y: y2}, l);
                }
            };

            /**
             * returns the gradient of the segment at the given point - which for us is constant.
             */
            this.gradientAtPoint = function (_) {
                return m;
            };

            /**
             * returns the point on the segment's path that is 'distance' along the length of the path from 'location', where
             * 'location' is a decimal from 0 to 1 inclusive, and 'distance' is a number of pixels.
             * this hands off to jsPlumbUtil to do the maths, supplying two points and the distance.
             */
            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    farAwayPoint = distance <= 0 ? {x: x1, y: y1} : {x: x2, y: y2 };

                /*
                 location == 1 ? {
                 x:x1 + ((x2 - x1) * 10),
                 y:y1 + ((y1 - y2) * 10)
                 } :
                 */

                if (distance <= 0 && Math.abs(distance) > 1) distance *= -1;

                return _jg.pointOnLine(p, farAwayPoint, distance);
            };

            // is c between a and b?
            var within = function (a, b, c) {
                return c >= Math.min(a, b) && c <= Math.max(a, b);
            };
            // find which of a and b is closest to c
            var closest = function (a, b, c) {
                return Math.abs(c - a) < Math.abs(c - b) ? a : b;
            };

            /**
             Function: findClosestPointOnPath
             Finds the closest point on this segment to [x,y]. See
             notes on this method in AbstractSegment.
             */
            this.findClosestPointOnPath = function (x, y) {
                var out = {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null,
                    x1: x1,
                    x2: x2,
                    y1: y1,
                    y2: y2
                };

                if (m === 0) {
                    out.y = y1;
                    out.x = within(x1, x2, x) ? x : closest(x1, x2, x);
                }
                else if (m == Infinity || m == -Infinity) {
                    out.x = x1;
                    out.y = within(y1, y2, y) ? y : closest(y1, y2, y);
                }
                else {
                    // closest point lies on normal from given point to this line.  
                    var b = y1 - (m * x1),
                        b2 = y - (m2 * x),
                    // y1 = m.x1 + b and y1 = m2.x1 + b2
                    // so m.x1 + b = m2.x1 + b2
                    // x1(m - m2) = b2 - b
                    // x1 = (b2 - b) / (m - m2)
                        _x1 = (b2 - b) / (m - m2),
                        _y1 = (m * _x1) + b;

                    out.x = within(x1, x2, _x1) ? _x1 : closest(x1, x2, _x1);//_x1;
                    out.y = within(y1, y2, _y1) ? _y1 : closest(y1, y2, _y1);//_y1;
                }

                var fractionInSegment = _jg.lineLength([ out.x, out.y ], [ x1, y1 ]);
                out.d = _jg.lineLength([x, y], [out.x, out.y]);
                out.l = fractionInSegment / length;
                return out;
            };
        },

        /*
         Arc Segment. You need to supply:

         r   -   radius
         cx  -   center x for the arc
         cy  -   center y for the arc
         ac  -   whether the arc is anticlockwise or not. default is clockwise.

         and then either:

         startAngle  -   startAngle for the arc.
         endAngle    -   endAngle for the arc.

         or:

         x1          -   x for start point
         y1          -   y for start point
         x2          -   x for end point
         y2          -   y for end point

         */
        Arc: function (params) {
            var _super = _jp.Segments.AbstractSegment.apply(this, arguments),
                _calcAngle = function (_x, _y) {
                    return _jg.theta([params.cx, params.cy], [_x, _y]);
                },
                _calcAngleForLocation = function (segment, location) {
                    if (segment.anticlockwise) {
                        var sa = segment.startAngle < segment.endAngle ? segment.startAngle + TWO_PI : segment.startAngle,
                            s = Math.abs(sa - segment.endAngle);
                        return sa - (s * location);
                    }
                    else {
                        var ea = segment.endAngle < segment.startAngle ? segment.endAngle + TWO_PI : segment.endAngle,
                            ss = Math.abs(ea - segment.startAngle);

                        return segment.startAngle + (ss * location);
                    }
                },
                TWO_PI = 2 * Math.PI;

            this.radius = params.r;
            this.anticlockwise = params.ac;
            this.type = "Arc";

            if (params.startAngle && params.endAngle) {
                this.startAngle = params.startAngle;
                this.endAngle = params.endAngle;
                this.x1 = params.cx + (this.radius * Math.cos(params.startAngle));
                this.y1 = params.cy + (this.radius * Math.sin(params.startAngle));
                this.x2 = params.cx + (this.radius * Math.cos(params.endAngle));
                this.y2 = params.cy + (this.radius * Math.sin(params.endAngle));
            }
            else {
                this.startAngle = _calcAngle(params.x1, params.y1);
                this.endAngle = _calcAngle(params.x2, params.y2);
                this.x1 = params.x1;
                this.y1 = params.y1;
                this.x2 = params.x2;
                this.y2 = params.y2;
            }

            if (this.endAngle < 0) this.endAngle += TWO_PI;
            if (this.startAngle < 0) this.startAngle += TWO_PI;

            // segment is used by vml     
            //this.segment = _jg.quadrant([this.x1, this.y1], [this.x2, this.y2]);

            // we now have startAngle and endAngle as positive numbers, meaning the
            // absolute difference (|d|) between them is the sweep (s) of this arc, unless the
            // arc is 'anticlockwise' in which case 's' is given by 2PI - |d|.

            var ea = this.endAngle < this.startAngle ? this.endAngle + TWO_PI : this.endAngle;
            this.sweep = Math.abs(ea - this.startAngle);
            if (this.anticlockwise) this.sweep = TWO_PI - this.sweep;
            var circumference = 2 * Math.PI * this.radius,
                frac = this.sweep / TWO_PI,
                length = circumference * frac;

            this.getLength = function () {
                return length;
            };

            this.getBounds = function () {
                return {
                    minX: params.cx - params.r,
                    maxX: params.cx + params.r,
                    minY: params.cy - params.r,
                    maxY: params.cy + params.r
                };
            };

            var VERY_SMALL_VALUE = 0.0000000001,
                gentleRound = function (n) {
                    var f = Math.floor(n), r = Math.ceil(n);
                    if (n - f < VERY_SMALL_VALUE)
                        return f;
                    else if (r - n < VERY_SMALL_VALUE)
                        return r;
                    return n;
                };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {

                if (location === 0) {
                    return { x: this.x1, y: this.y1, theta: this.startAngle };
                }
                else if (location == 1) {
                    return { x: this.x2, y: this.y2, theta: this.endAngle };
                }

                if (absolute) {
                    location = location / length;
                }

                var angle = _calcAngleForLocation(this, location),
                    _x = params.cx + (params.r * Math.cos(angle)),
                    _y = params.cy + (params.r * Math.sin(angle));

                return { x: gentleRound(_x), y: gentleRound(_y), theta: angle };
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                var p = this.pointOnPath(location, absolute);
                var m = _jg.normal([ params.cx, params.cy ], [p.x, p.y ]);
                if (!this.anticlockwise && (m == Infinity || m == -Infinity)) m *= -1;
                return m;
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                var p = this.pointOnPath(location, absolute),
                    arcSpan = distance / circumference * 2 * Math.PI,
                    dir = this.anticlockwise ? -1 : 1,
                    startAngle = p.theta + (dir * arcSpan),
                    startX = params.cx + (this.radius * Math.cos(startAngle)),
                    startY = params.cy + (this.radius * Math.sin(startAngle));

                return {x: startX, y: startY};
            };
        },

        Bezier: function (params) {
            this.curve = [
                { x: params.x1, y: params.y1},
                { x: params.cp1x, y: params.cp1y },
                { x: params.cp2x, y: params.cp2y },
                { x: params.x2, y: params.y2 }
            ];

            var _super = _jp.Segments.AbstractSegment.apply(this, arguments);
            // although this is not a strictly rigorous determination of bounds
            // of a bezier curve, it works for the types of curves that this segment
            // type produces.
            this.bounds = {
                minX: Math.min(params.x1, params.x2, params.cp1x, params.cp2x),
                minY: Math.min(params.y1, params.y2, params.cp1y, params.cp2y),
                maxX: Math.max(params.x1, params.x2, params.cp1x, params.cp2x),
                maxY: Math.max(params.y1, params.y2, params.cp1y, params.cp2y)
            };

            this.type = "Bezier";

            var _translateLocation = function (_curve, location, absolute) {
                if (absolute)
                    location = root.jsBezier.locationAlongCurveFrom(_curve, location > 0 ? 0 : 1, location);

                return location;
            };

            /**
             * returns the point on the segment's path that is 'location' along the length of the path, where 'location' is a decimal from
             * 0 to 1 inclusive.
             */
            this.pointOnPath = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointOnCurve(this.curve, location);
            };

            /**
             * returns the gradient of the segment at the given point.
             */
            this.gradientAtPoint = function (location, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.gradientAtPoint(this.curve, location);
            };

            this.pointAlongPathFrom = function (location, distance, absolute) {
                location = _translateLocation(this.curve, location, absolute);
                return root.jsBezier.pointAlongCurveFrom(this.curve, location, distance);
            };

            this.getLength = function () {
                return root.jsBezier.getLength(this.curve);
            };

            this.getBounds = function () {
                return this.bounds;
            };
        }
    };

    /*
     Class: AbstractComponent
     Superclass for AbstractConnector and AbstractEndpoint.
     */
    var AbstractComponent = function () {
        this.resetBounds = function () {
            this.bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
        };
        this.resetBounds();
    };

    /*
     * Class: AbstractConnector
     * Superclass for all Connectors; here is where Segments are managed.  This is exposed on jsPlumb just so it
     * can be accessed from other files. You should not try to instantiate one of these directly.
     *
     * When this class is asked for a pointOnPath, or gradient etc, it must first figure out which segment to dispatch
     * that request to. This is done by keeping track of the total connector length as segments are added, and also
     * their cumulative ratios to the total length.  Then when the right segment is found it is a simple case of dispatching
     * the request to it (and adjusting 'location' so that it is relative to the beginning of that segment.)
     */
    _jp.Connectors.AbstractConnector = function (params) {

        AbstractComponent.apply(this, arguments);

        var segments = [],
            totalLength = 0,
            segmentProportions = [],
            segmentProportionalLengths = [],
            stub = params.stub || 0,
            sourceStub = _ju.isArray(stub) ? stub[0] : stub,
            targetStub = _ju.isArray(stub) ? stub[1] : stub,
            gap = params.gap || 0,
            sourceGap = _ju.isArray(gap) ? gap[0] : gap,
            targetGap = _ju.isArray(gap) ? gap[1] : gap,
            userProvidedSegments = null,
            edited = false,
            paintInfo = null;

        // to be overridden by subclasses.
        this.getPath = function () {
        };
        this.setPath = function (path) {
        };

        /**
         * Function: findSegmentForPoint
         * Returns the segment that is closest to the given [x,y],
         * null if nothing found.  This function returns a JS
         * object with:
         *
         *   d   -   distance from segment
         *   l   -   proportional location in segment
         *   x   -   x point on the segment
         *   y   -   y point on the segment
         *   s   -   the segment itself.
         */
        this.findSegmentForPoint = function (x, y) {
            var out = { d: Infinity, s: null, x: null, y: null, l: null };
            for (var i = 0; i < segments.length; i++) {
                var _s = segments[i].findClosestPointOnPath(x, y);
                if (_s.d < out.d) {
                    out.d = _s.d;
                    out.l = _s.l;
                    out.x = _s.x;
                    out.y = _s.y;
                    out.s = segments[i];
                    out.x1 = _s.x1;
                    out.x2 = _s.x2;
                    out.y1 = _s.y1;
                    out.y2 = _s.y2;
                    out.index = i;
                }
            }

            return out;
        };

        var _updateSegmentProportions = function () {
                var curLoc = 0;
                for (var i = 0; i < segments.length; i++) {
                    var sl = segments[i].getLength();
                    segmentProportionalLengths[i] = sl / totalLength;
                    segmentProportions[i] = [curLoc, (curLoc += (sl / totalLength)) ];
                }
            },

            /**
             * returns [segment, proportion of travel in segment, segment index] for the segment
             * that contains the point which is 'location' distance along the entire path, where
             * 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
             * are made up of a list of segments, each of which contributes some fraction to
             * the total length.
             * From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
             * as the absolute distance in pixels, rather than a proportion of the total path.
             */
            _findSegmentForLocation = function (location, absolute) {
                if (absolute) {
                    location = location > 0 ? location / totalLength : (totalLength + location) / totalLength;
                }
                var idx = segmentProportions.length - 1, inSegmentProportion = 1;
                for (var i = 0; i < segmentProportions.length; i++) {
                    if (segmentProportions[i][1] >= location) {
                        idx = i;
                        // todo is this correct for all connector path types?
                        inSegmentProportion = location == 1 ? 1 : location === 0 ? 0 : (location - segmentProportions[i][0]) / segmentProportionalLengths[i];
                        break;
                    }
                }
                return { segment: segments[idx], proportion: inSegmentProportion, index: idx };
            },
            _addSegment = function (conn, type, params) {
                if (params.x1 == params.x2 && params.y1 == params.y2) return;
                var s = new _jp.Segments[type](params);
                segments.push(s);
                totalLength += s.getLength();
                conn.updateBounds(s);
            },
            _clearSegments = function () {
                totalLength = segments.length = segmentProportions.length = segmentProportionalLengths.length = 0;
            };

        this.setSegments = function (_segs) {
            userProvidedSegments = [];
            totalLength = 0;
            for (var i = 0; i < _segs.length; i++) {
                userProvidedSegments.push(_segs[i]);
                totalLength += _segs[i].getLength();
            }
        };

        this.getLength = function() {
            return totalLength;
        };

        var _prepareCompute = function (params) {
            this.lineWidth = params.lineWidth;
            var segment = _jg.quadrant(params.sourcePos, params.targetPos),
                swapX = params.targetPos[0] < params.sourcePos[0],
                swapY = params.targetPos[1] < params.sourcePos[1],
                lw = params.lineWidth || 1,
                so = params.sourceEndpoint.anchor.getOrientation(params.sourceEndpoint),
                to = params.targetEndpoint.anchor.getOrientation(params.targetEndpoint),
                x = swapX ? params.targetPos[0] : params.sourcePos[0],
                y = swapY ? params.targetPos[1] : params.sourcePos[1],
                w = Math.abs(params.targetPos[0] - params.sourcePos[0]),
                h = Math.abs(params.targetPos[1] - params.sourcePos[1]);

            // if either anchor does not have an orientation set, we derive one from their relative
            // positions.  we fix the axis to be the one in which the two elements are further apart, and
            // point each anchor at the other element.  this is also used when dragging a new connection.
            if (so[0] === 0 && so[1] === 0 || to[0] === 0 && to[1] === 0) {
                var index = w > h ? 0 : 1, oIndex = [1, 0][index];
                so = [];
                to = [];
                so[index] = params.sourcePos[index] > params.targetPos[index] ? -1 : 1;
                to[index] = params.sourcePos[index] > params.targetPos[index] ? 1 : -1;
                so[oIndex] = 0;
                to[oIndex] = 0;
            }

            var sx = swapX ? w + (sourceGap * so[0]) : sourceGap * so[0],
                sy = swapY ? h + (sourceGap * so[1]) : sourceGap * so[1],
                tx = swapX ? targetGap * to[0] : w + (targetGap * to[0]),
                ty = swapY ? targetGap * to[1] : h + (targetGap * to[1]),
                oProduct = ((so[0] * to[0]) + (so[1] * to[1]));

            var result = {
                sx: sx, sy: sy, tx: tx, ty: ty, lw: lw,
                xSpan: Math.abs(tx - sx),
                ySpan: Math.abs(ty - sy),
                mx: (sx + tx) / 2,
                my: (sy + ty) / 2,
                so: so, to: to, x: x, y: y, w: w, h: h,
                segment: segment,
                startStubX: sx + (so[0] * sourceStub),
                startStubY: sy + (so[1] * sourceStub),
                endStubX: tx + (to[0] * targetStub),
                endStubY: ty + (to[1] * targetStub),
                isXGreaterThanStubTimes2: Math.abs(sx - tx) > (sourceStub + targetStub),
                isYGreaterThanStubTimes2: Math.abs(sy - ty) > (sourceStub + targetStub),
                opposite: oProduct == -1,
                perpendicular: oProduct === 0,
                orthogonal: oProduct == 1,
                sourceAxis: so[0] === 0 ? "y" : "x",
                points: [x, y, w, h, sx, sy, tx, ty ]
            };
            result.anchorOrientation = result.opposite ? "opposite" : result.orthogonal ? "orthogonal" : "perpendicular";
            return result;
        };

        this.getSegments = function () {
            return segments;
        };

        this.updateBounds = function (segment) {
            var segBounds = segment.getBounds();
            this.bounds.minX = Math.min(this.bounds.minX, segBounds.minX);
            this.bounds.maxX = Math.max(this.bounds.maxX, segBounds.maxX);
            this.bounds.minY = Math.min(this.bounds.minY, segBounds.minY);
            this.bounds.maxY = Math.max(this.bounds.maxY, segBounds.maxY);
        };

        var dumpSegmentsToConsole = function () {
            console.log("SEGMENTS:");
            for (var i = 0; i < segments.length; i++) {
                console.log(segments[i].type, segments[i].getLength(), segmentProportions[i]);
            }
        };

        this.pointOnPath = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.pointOnPath(seg.proportion, false) || [0, 0];
        };

        this.gradientAtPoint = function (location, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            return seg.segment && seg.segment.gradientAtPoint(seg.proportion, false) || 0;
        };

        this.pointAlongPathFrom = function (location, distance, absolute) {
            var seg = _findSegmentForLocation(location, absolute);
            // TODO what happens if this crosses to the next segment?
            return seg.segment && seg.segment.pointAlongPathFrom(seg.proportion, distance, false) || [0, 0];
        };

        this.compute = function (params) {
            if (!edited)
                paintInfo = _prepareCompute.call(this, params);

            _clearSegments();
            this._compute(paintInfo, params);
            this.x = paintInfo.points[0];
            this.y = paintInfo.points[1];
            this.w = paintInfo.points[2];
            this.h = paintInfo.points[3];
            this.segment = paintInfo.segment;
            _updateSegmentProportions();
        };

        return {
            addSegment: _addSegment,
            prepareCompute: _prepareCompute,
            sourceStub: sourceStub,
            targetStub: targetStub,
            maxStub: Math.max(sourceStub, targetStub),
            sourceGap: sourceGap,
            targetGap: targetGap,
            maxGap: Math.max(sourceGap, targetGap)
        };
    };
    _ju.extend(_jp.Connectors.AbstractConnector, AbstractComponent);

    /**
     * Class: Connectors.Straight
     * The Straight connector draws a simple straight line between the two anchor points.  It does not have any constructor parameters.
     */
    var Straight = _jp.Connectors.Straight = function () {
        this.type = "Straight";
        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments);

        this._compute = function (paintInfo, _) {
            _super.addSegment(this, "Straight", {x1: paintInfo.sx, y1: paintInfo.sy, x2: paintInfo.startStubX, y2: paintInfo.startStubY});
            _super.addSegment(this, "Straight", {x1: paintInfo.startStubX, y1: paintInfo.startStubY, x2: paintInfo.endStubX, y2: paintInfo.endStubY});
            _super.addSegment(this, "Straight", {x1: paintInfo.endStubX, y1: paintInfo.endStubY, x2: paintInfo.tx, y2: paintInfo.ty});
        };
    };
    _ju.extend(_jp.Connectors.Straight, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Straight, "Straight");


    // ********************************* END OF CONNECTOR TYPES *******************************************************************

    // ********************************* ENDPOINT TYPES *******************************************************************

    _jp.Endpoints.AbstractEndpoint = function (params) {
        AbstractComponent.apply(this, arguments);
        var compute = this.compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var out = this._compute.apply(this, arguments);
            this.x = out[0];
            this.y = out[1];
            this.w = out[2];
            this.h = out[3];
            this.bounds.minX = this.x;
            this.bounds.minY = this.y;
            this.bounds.maxX = this.x + this.w;
            this.bounds.maxY = this.y + this.h;
            return out;
        };
        return {
            compute: compute,
            cssClass: params.cssClass
        };
    };
    _ju.extend(_jp.Endpoints.AbstractEndpoint, AbstractComponent);

    /**
     * Class: Endpoints.Dot
     * A round endpoint, with default radius 10 pixels.
     */

    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    radius    -    radius of the endpoint.  defaults to 10 pixels.
     */
    _jp.Endpoints.Dot = function (params) {
        this.type = "Dot";
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.radius = params.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.radius = endpointStyle.radius || this.radius;
            var x = anchorPoint[0] - this.radius,
                y = anchorPoint[1] - this.radius,
                w = this.radius * 2,
                h = this.radius * 2;

            if (endpointStyle.strokeStyle) {
                var lw = endpointStyle.lineWidth || 1;
                x -= lw;
                y -= lw;
                w += (lw * 2);
                h += (lw * 2);
            }
            return [ x, y, w, h, this.radius ];
        };
    };
    _ju.extend(_jp.Endpoints.Dot, _jp.Endpoints.AbstractEndpoint);

    _jp.Endpoints.Rectangle = function (params) {
        this.type = "Rectangle";
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {};
        this.width = params.width || 20;
        this.height = params.height || 20;

        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || this.width,
                height = endpointStyle.height || this.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);

            return [ x, y, width, height];
        };
    };
    _ju.extend(_jp.Endpoints.Rectangle, _jp.Endpoints.AbstractEndpoint);

    var DOMElementEndpoint = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this._jsPlumb.displayElements = [];
    };
    _ju.extend(DOMElementEndpoint, _jp.jsPlumbUIComponent, {
        getDisplayElements: function () {
            return this._jsPlumb.displayElements;
        },
        appendDisplayElement: function (el) {
            this._jsPlumb.displayElements.push(el);
        }
    });

    /**
     * Class: Endpoints.Image
     * Draws an image as the Endpoint.
     */
    /**
     * Function: Constructor
     *
     * Parameters:
     *
     *    src    -    location of the image to use.

     TODO: multiple references to self. not sure quite how to get rid of them entirely. perhaps self = null in the cleanup
     function will suffice

     TODO this class still might leak memory.

     */
    _jp.Endpoints.Image = function (params) {

        this.type = "Image";
        DOMElementEndpoint.apply(this, arguments);
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);

        var _onload = params.onload,
            src = params.src || params.url,
            clazz = params.cssClass ? " " + params.cssClass : "";

        this._jsPlumb.img = new Image();
        this._jsPlumb.ready = false;
        this._jsPlumb.initialized = false;
        this._jsPlumb.deleted = false;
        this._jsPlumb.widthToUse = params.width;
        this._jsPlumb.heightToUse = params.height;
        this._jsPlumb.endpoint = params.endpoint;

        this._jsPlumb.img.onload = function () {
            if (this._jsPlumb != null) {
                this._jsPlumb.ready = true;
                this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width;
                this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height;
                if (_onload) {
                    _onload(this);
                }
            }
        }.bind(this);

        /*
         Function: setImage
         Sets the Image to use in this Endpoint.

         Parameters:
         img         -   may be a URL or an Image object
         onload      -   optional; a callback to execute once the image has loaded.
         */
        this._jsPlumb.endpoint.setImage = function (_img, onload) {
            var s = _img.constructor == String ? _img : _img.src;
            _onload = onload;
            this._jsPlumb.img.src = s;

            if (this.canvas != null)
                this.canvas.setAttribute("src", this._jsPlumb.img.src);
        }.bind(this);

        this._jsPlumb.endpoint.setImage(src, _onload);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            this.anchorPoint = anchorPoint;
            if (this._jsPlumb.ready) return [anchorPoint[0] - this._jsPlumb.widthToUse / 2, anchorPoint[1] - this._jsPlumb.heightToUse / 2,
                this._jsPlumb.widthToUse, this._jsPlumb.heightToUse];
            else return [0, 0, 0, 0];
        };

        this.canvas = jsPlumb.createElement("img", {
            position:"absolute",
            margin:0,
            padding:0,
            outline:0
        }, this._jsPlumb.instance.endpointClass + clazz);

        if (this._jsPlumb.widthToUse) this.canvas.setAttribute("width", this._jsPlumb.widthToUse);
        if (this._jsPlumb.heightToUse) this.canvas.setAttribute("height", this._jsPlumb.heightToUse);
        this._jsPlumb.instance.appendElement(this.canvas);

        this.actuallyPaint = function (d, style, anchor) {
            if (!this._jsPlumb.deleted) {
                if (!this._jsPlumb.initialized) {
                    this.canvas.setAttribute("src", this._jsPlumb.img.src);
                    this.appendDisplayElement(this.canvas);
                    this._jsPlumb.initialized = true;
                }
                var x = this.anchorPoint[0] - (this._jsPlumb.widthToUse / 2),
                    y = this.anchorPoint[1] - (this._jsPlumb.heightToUse / 2);
                _ju.sizeElement(this.canvas, x, y, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse);
            }
        };

        this.paint = function (style, anchor) {
            if (this._jsPlumb != null) {  // may have been deleted
                if (this._jsPlumb.ready) {
                    this.actuallyPaint(style, anchor);
                }
                else {
                    root.setTimeout(function () {
                        this.paint(style, anchor);
                    }.bind(this), 200);
                }
            }
        };
    };
    _ju.extend(_jp.Endpoints.Image, [ DOMElementEndpoint, _jp.Endpoints.AbstractEndpoint ], {
        cleanup: function (force) {
            if (force) {
                this._jsPlumb.deleted = true;
                if (this.canvas) this.canvas.parentNode.removeChild(this.canvas);
                this.canvas = null;
            }
        }
    });

    /*
     * Class: Endpoints.Blank
     * An Endpoint that paints nothing (visible) on the screen.  Supports cssClass and hoverClass parameters like all Endpoints.
     */
    _jp.Endpoints.Blank = function (params) {
        var _super = _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank";
        DOMElementEndpoint.apply(this, arguments);
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            return [anchorPoint[0], anchorPoint[1], 10, 0];
        };

        var clazz = params.cssClass ? " " + params.cssClass : "";

        this.canvas = jsPlumb.createElement("div", {
            display: "block",
            width: "1px",
            height: "1px",
            background: "transparent",
            position: "absolute"
        }, this._jsPlumb.instance.endpointClass + clazz);

        this._jsPlumb.instance.appendElement(this.canvas);

        this.paint = function (style, anchor) {
            _ju.sizeElement(this.canvas, this.x, this.y, this.w, this.h);
        };
    };
    _ju.extend(_jp.Endpoints.Blank, [_jp.Endpoints.AbstractEndpoint, DOMElementEndpoint], {
        cleanup: function () {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    });

    /*
     * Class: Endpoints.Triangle
     * A triangular Endpoint.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * 	width	-	width of the triangle's base.  defaults to 55 pixels.
     * 	height	-	height of the triangle from base to apex.  defaults to 55 pixels.
     */
    _jp.Endpoints.Triangle = function (params) {
        this.type = "Triangle";
        _jp.Endpoints.AbstractEndpoint.apply(this, arguments);
        params = params || {  };
        params.width = params.width || 55;
        params.height = params.height || 55;
        this.width = params.width;
        this.height = params.height;
        this._compute = function (anchorPoint, orientation, endpointStyle, connectorPaintStyle) {
            var width = endpointStyle.width || self.width,
                height = endpointStyle.height || self.height,
                x = anchorPoint[0] - (width / 2),
                y = anchorPoint[1] - (height / 2);
            return [ x, y, width, height ];
        };
    };
// ********************************* END OF ENDPOINT TYPES *******************************************************************


// ********************************* OVERLAY DEFINITIONS ***********************************************************************    

    var AbstractOverlay = _jp.Overlays.AbstractOverlay = function (params) {
        this.visible = true;
        this.isAppendedAtTopLevel = true;
        this.component = params.component;
        this.loc = params.location == null ? 0.5 : params.location;
        this.endpointLoc = params.endpointLocation == null ? [ 0.5, 0.5] : params.endpointLocation;
    };
    AbstractOverlay.prototype = {
        cleanup: function (force) {
            if (force) {
                this.component = null;
                this.canvas = null;
                this.endpointLoc = null;
            }
        },
        reattach:function(instance) {

        },
        setVisible: function (val) {
            this.visible = val;
            this.component.repaint();
        },
        isVisible: function () {
            return this.visible;
        },
        hide: function () {
            this.setVisible(false);
        },
        show: function () {
            this.setVisible(true);
        },
        incrementLocation: function (amount) {
            this.loc += amount;
            this.component.repaint();
        },
        setLocation: function (l) {
            this.loc = l;
            this.component.repaint();
        },
        getLocation: function () {
            return this.loc;
        },
        updateFrom:function() { }
    };


    /*
     * Class: Overlays.Arrow
     *
     * An arrow overlay, defined by four points: the head, the two sides of the tail, and a 'foldback' point at some distance along the length
     * of the arrow that lines from each tail point converge into.  The foldback point is defined using a decimal that indicates some fraction
     * of the length of the arrow and has a default value of 0.623.  A foldback point value of 1 would mean that the arrow had a straight line
     * across the tail.
     */
    /*
     * Function: Constructor
     *
     * Parameters:
     *
     * 	length - distance in pixels from head to tail baseline. default 20.
     * 	width - width in pixels of the tail baseline. default 20.
     * 	fillStyle - style to use when filling the arrow.  defaults to "black".
     * 	strokeStyle - style to use when stroking the arrow. defaults to null, which means the arrow is not stroked.
     * 	lineWidth - line width to use when stroking the arrow. defaults to 1, but only used if strokeStyle is not null.
     * 	foldback - distance (as a decimal from 0 to 1 inclusive) along the length of the arrow marking the point the tail points should fold back to.  defaults to 0.623.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the arrow should sit on the connector. defaults to 0.5.
     * 	direction - indicates the direction the arrow points in. valid values are -1 and 1; 1 is default.
     */
    _jp.Overlays.Arrow = function (params) {
        this.type = "Arrow";
        AbstractOverlay.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
        params = params || {};

        this.length = params.length || 20;
        this.width = params.width || 20;
        this.id = params.id;
        var direction = (params.direction || 1) < 0 ? -1 : 1,
            paintStyle = params.paintStyle || { lineWidth: 1 },
        // how far along the arrow the lines folding back in come to. default is 62.3%.
            foldback = params.foldback || 0.623;

        this.computeMaxSize = function () {
            return self.width * 1.5;
        };

        this.draw = function (component, currentConnectionPaintStyle) {

            var hxy, mid, txy, tail, cxy;
            if (component.pointAlongPathFrom) {

                if (_ju.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                    var l = parseInt(this.loc, 10),
                        fromLoc = this.loc < 0 ? 1 : 0;
                    hxy = component.pointAlongPathFrom(fromLoc, l, false);
                    mid = component.pointAlongPathFrom(fromLoc, l - (direction * this.length / 2), false);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }
                else if (this.loc == 1) {
                    hxy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, -(this.length));
                    txy = _jg.pointOnLine(hxy, mid, this.length);

                    if (direction == -1) {
                        var _ = txy;
                        txy = hxy;
                        hxy = _;
                    }
                }
                else if (this.loc === 0) {
                    txy = component.pointOnPath(this.loc);
                    mid = component.pointAlongPathFrom(this.loc, this.length);
                    hxy = _jg.pointOnLine(txy, mid, this.length);
                    if (direction == -1) {
                        var __ = txy;
                        txy = hxy;
                        hxy = __;
                    }
                }
                else {
                    hxy = component.pointAlongPathFrom(this.loc, direction * this.length / 2);
                    mid = component.pointOnPath(this.loc);
                    txy = _jg.pointOnLine(hxy, mid, this.length);
                }

                tail = _jg.perpendicularLineTo(hxy, txy, this.width);
                cxy = _jg.pointOnLine(hxy, txy, foldback * this.length);

                var d = { hxy: hxy, tail: tail, cxy: cxy },
                    strokeStyle = paintStyle.strokeStyle || currentConnectionPaintStyle.strokeStyle,
                    fillStyle = paintStyle.fillStyle || currentConnectionPaintStyle.strokeStyle,
                    lineWidth = paintStyle.lineWidth || currentConnectionPaintStyle.lineWidth;

                return {
                    component: component,
                    d: d,
                    lineWidth: lineWidth,
                    strokeStyle: strokeStyle,
                    fillStyle: fillStyle,
                    minX: Math.min(hxy.x, tail[0].x, tail[1].x),
                    maxX: Math.max(hxy.x, tail[0].x, tail[1].x),
                    minY: Math.min(hxy.y, tail[0].y, tail[1].y),
                    maxY: Math.max(hxy.y, tail[0].y, tail[1].y)
                };
            }
            else return {component: component, minX: 0, maxX: 0, minY: 0, maxY: 0};
        };
    };
    _ju.extend(_jp.Overlays.Arrow, AbstractOverlay, {
        updateFrom:function(d) {
            this.length = d.length || this.length;
            this.width = d.width|| this.width;
            this.direction = d.direction != null ? d.direction : this.direction;
            this.foldback = d.foldback|| this.foldback;
        }
    });

    /*
     * Class: Overlays.PlainArrow
     *
     * A basic arrow.  This is in fact just one instance of the more generic case in which the tail folds back on itself to some
     * point along the length of the arrow: in this case, that foldback point is the full length of the arrow.  so it just does
     * a 'call' to Arrow with foldback set appropriately.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.PlainArrow = function (params) {
        params = params || {};
        var p = _jp.extend(params, {foldback: 1});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "PlainArrow";
    };
    _ju.extend(_jp.Overlays.PlainArrow, _jp.Overlays.Arrow);

    /*
     * Class: Overlays.Diamond
     * 
     * A diamond. Like PlainArrow, this is a concrete case of the more generic case of the tail points converging on some point...it just
     * happens that in this case, that point is greater than the length of the the arrow.
     *
     *      this could probably do with some help with positioning...due to the way it reuses the Arrow paint code, what Arrow thinks is the
     *      center is actually 1/4 of the way along for this guy.  but we don't have any knowledge of pixels at this point, so we're kind of
     *      stuck when it comes to helping out the Arrow class. possibly we could pass in a 'transpose' parameter or something. the value
     *      would be -l/4 in this case - move along one quarter of the total length.
     */
    /*
     * Function: Constructor
     * See <Overlays.Arrow> for allowed parameters for this overlay.
     */
    _jp.Overlays.Diamond = function (params) {
        params = params || {};
        var l = params.length || 40,
            p = jsPlumb.extend(params, {length: l / 2, foldback: 2});
        _jp.Overlays.Arrow.call(this, p);
        this.type = "Diamond";
    };
    _ju.extend(_jp.Overlays.Diamond, _jp.Overlays.Arrow);

    var _getDimensions = function (component, forceRefresh) {
        if (component._jsPlumb.cachedDimensions == null || forceRefresh)
            component._jsPlumb.cachedDimensions = component.getDimensions();
        return component._jsPlumb.cachedDimensions;
    };

    // abstract superclass for overlays that add an element to the DOM.
    var AbstractDOMOverlay = function (params) {
        _jp.jsPlumbUIComponent.apply(this, arguments);
        AbstractOverlay.apply(this, arguments);

        // hand off fired events to associated component.
        var _f = this.fire;
        this.fire = function () {
            _f.apply(this, arguments);
            if (this.component) this.component.fire.apply(this.component, arguments);
        };

        this.detached=false;
        this.id = params.id;
        this._jsPlumb.div = null;
        this._jsPlumb.initialised = false;
        this._jsPlumb.component = params.component;
        this._jsPlumb.cachedDimensions = null;
        this._jsPlumb.create = params.create;
        this._jsPlumb.initiallyInvisible = params.visible === false;

        this.getElement = function () {
            if (this._jsPlumb.div == null) {
                var div = this._jsPlumb.div = jsPlumb.getElement(this._jsPlumb.create(this._jsPlumb.component));
                div.style.position = "absolute";
                div.className = this._jsPlumb.instance.overlayClass + " " +
                    (this.cssClass ? this.cssClass :
                        params.cssClass ? params.cssClass : "");
                this._jsPlumb.instance.appendElement(div);
                this._jsPlumb.instance.getId(div);
                this.canvas = div;

                // in IE the top left corner is what it placed at the desired location.  This will not
                // be fixed. IE8 is not going to be supported for much longer.
                var ts = "translate(-50%, -50%)";
                div.style.webkitTransform = ts;
                div.style.mozTransform = ts;
                div.style.msTransform = ts;
                div.style.oTransform = ts;
                div.style.transform = ts;

                // write the related component into the created element
                div._jsPlumb = this;

                if (params.visible === false)
                    div.style.display = "none";
            }
            return this._jsPlumb.div;
        };

        this.draw = function (component, currentConnectionPaintStyle, absolutePosition) {
            var td = _getDimensions(this);
            if (td != null && td.length == 2) {
                var cxy = { x: 0, y: 0 };

                // absolutePosition would have been set by a call to connection.setAbsoluteOverlayPosition.
                if (absolutePosition) {
                    cxy = { x: absolutePosition[0], y: absolutePosition[1] };
                }
                else if (component.pointOnPath) {
                    var loc = this.loc, absolute = false;
                    if (_ju.isString(this.loc) || this.loc < 0 || this.loc > 1) {
                        loc = parseInt(this.loc, 10);
                        absolute = true;
                    }
                    cxy = component.pointOnPath(loc, absolute);  // a connection
                }
                else {
                    var locToUse = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                    cxy = { x: locToUse[0] * component.w,
                        y: locToUse[1] * component.h };
                }

                var minx = cxy.x - (td[0] / 2),
                    miny = cxy.y - (td[1] / 2);

                return {
                    component: component,
                    d: { minx: minx, miny: miny, td: td, cxy: cxy },
                    minX: minx,
                    maxX: minx + td[0],
                    minY: miny,
                    maxY: miny + td[1]
                };
            }
            else return {minX: 0, maxX: 0, minY: 0, maxY: 0};
        };
    };
    _ju.extend(AbstractDOMOverlay, [_jp.jsPlumbUIComponent, AbstractOverlay], {
        getDimensions: function () {
            return [1,1];
        },
        setVisible: function (state) {
            if (this._jsPlumb.div) {
                this._jsPlumb.div.style.display = state ? "block" : "none";
                // if initially invisible, dimensions are 0,0 and never get updated
                if (state && this._jsPlumb.initiallyInvisible) {
                    _getDimensions(this, true);
                    this.component.repaint();
                    this._jsPlumb.initiallyInvisible = false;
                }
            }
        },
        /*
         * Function: clearCachedDimensions
         * Clears the cached dimensions for the label. As a performance enhancement, label dimensions are
         * cached from 1.3.12 onwards. The cache is cleared when you change the label text, of course, but
         * there are other reasons why the text dimensions might change - if you make a change through CSS, for
         * example, you might change the font size.  in that case you should explicitly call this method.
         */
        clearCachedDimensions: function () {
            this._jsPlumb.cachedDimensions = null;
        },
        cleanup: function (force) {
            if (force) {
                if (this._jsPlumb.div != null) {
                    this._jsPlumb.div._jsPlumb = null;
                    this._jsPlumb.instance.removeElement(this._jsPlumb.div);
                }
            }
            else {
                // if not a forced cleanup, just detach child from parent for now.
                if (this._jsPlumb && this._jsPlumb.div && this._jsPlumb.div.parentNode)
                    this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
                this.detached = true;
            }

        },
        reattach:function(instance) {
            if (this._jsPlumb.div != null) instance.getContainer().appendChild(this._jsPlumb.div);
            this.detached = false;
        },
        computeMaxSize: function () {
            var td = _getDimensions(this);
            return Math.max(td[0], td[1]);
        },
        paint: function (p, containerExtents) {
            if (!this._jsPlumb.initialised) {
                this.getElement();
                p.component.appendDisplayElement(this._jsPlumb.div);
                this._jsPlumb.initialised = true;
                if (this.detached) this._jsPlumb.div.parentNode.removeChild(this._jsPlumb.div);
            }
            this._jsPlumb.div.style.left = (p.component.x + p.d.minx) + "px";
            this._jsPlumb.div.style.top = (p.component.y + p.d.miny) + "px";
        }
    });

    /*
     * Class: Overlays.Custom
     * A Custom overlay. You supply a 'create' function which returns some DOM element, and jsPlumb positions it.
     * The 'create' function is passed a Connection or Endpoint.
     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	create - function for jsPlumb to call that returns a DOM element.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 	
     */
    _jp.Overlays.Custom = function (params) {
        this.type = "Custom";
        AbstractDOMOverlay.apply(this, arguments);
    };
    _ju.extend(_jp.Overlays.Custom, AbstractDOMOverlay);

    _jp.Overlays.GuideLines = function () {
        var self = this;
        self.length = 50;
        self.lineWidth = 5;
        this.type = "GuideLines";
        AbstractOverlay.apply(this, arguments);
        _jp.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function (connector, currentConnectionPaintStyle) {

            var head = connector.pointAlongPathFrom(self.loc, self.length / 2),
                mid = connector.pointOnPath(self.loc),
                tail = _jg.pointOnLine(head, mid, self.length),
                tailLine = _jg.perpendicularLineTo(head, tail, 40),
                headLine = _jg.perpendicularLineTo(tail, head, 20);

            return {
                connector: connector,
                head: head,
                tail: tail,
                headLine: headLine,
                tailLine: tailLine,
                minX: Math.min(head.x, tail.x, headLine[0].x, headLine[1].x),
                minY: Math.min(head.y, tail.y, headLine[0].y, headLine[1].y),
                maxX: Math.max(head.x, tail.x, headLine[0].x, headLine[1].x),
                maxY: Math.max(head.y, tail.y, headLine[0].y, headLine[1].y)
            };
        };

        // this.cleanup = function() { };  // nothing to clean up for GuideLines
    };

    /*
     * Class: Overlays.Label

     */
    /*
     * Function: Constructor
     * 
     * Parameters:
     * 	cssClass - optional css class string to append to css class. This string is appended "as-is", so you can of course have multiple classes
     *             defined.  This parameter is preferred to using labelStyle, borderWidth and borderStyle.
     * 	label - the label to paint.  May be a string or a function that returns a string.  Nothing will be painted if your label is null or your
     *         label function returns null.  empty strings _will_ be painted.
     * 	location - distance (as a decimal from 0 to 1 inclusive) marking where the label should sit on the connector. defaults to 0.5.
     * 	id - optional id to use for later retrieval of this overlay.
     * 
     * 	
     */
    _jp.Overlays.Label = function (params) {
        this.labelStyle = params.labelStyle;

        var labelWidth = null, labelHeight = null, labelText = null, labelPadding = null;
        this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
        var p = _jp.extend({
            create: function () {
                return jsPlumb.createElement("div");
            }}, params);
        _jp.Overlays.Custom.call(this, p);
        this.type = "Label";
        this.label = params.label || "";
        this.labelText = null;
        if (this.labelStyle) {
            var el = this.getElement();
            this.labelStyle.font = this.labelStyle.font || "12px sans-serif";
            el.style.font = this.labelStyle.font;
            el.style.color = this.labelStyle.color || "black";
            if (this.labelStyle.fillStyle) el.style.background = this.labelStyle.fillStyle;
            if (this.labelStyle.borderWidth > 0) {
                var dStyle = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                el.style.border = this.labelStyle.borderWidth + "px solid " + dStyle;
            }
            if (this.labelStyle.padding) el.style.padding = this.labelStyle.padding;
        }

    };
    _ju.extend(_jp.Overlays.Label, _jp.Overlays.Custom, {
        cleanup: function (force) {
            if (force) {
                this.div = null;
                this.label = null;
                this.labelText = null;
                this.cssClass = null;
                this.labelStyle = null;
            }
        },
        getLabel: function () {
            return this.label;
        },
        /*
         * Function: setLabel
         * sets the label's, um, label.  you would think i'd call this function
         * 'setText', but you can pass either a Function or a String to this, so
         * it makes more sense as 'setLabel'. This uses innerHTML on the label div, so keep
         * that in mind if you need escaped HTML.
         */
        setLabel: function (l) {
            this.label = l;
            this.labelText = null;
            this.clearCachedDimensions();
            this.update();
            this.component.repaint();
        },
        getDimensions: function () {
            this.update();
            return AbstractDOMOverlay.prototype.getDimensions.apply(this, arguments);
        },
        update: function () {
            if (typeof this.label == "function") {
                var lt = this.label(this);
                this.getElement().innerHTML = lt.replace(/\r\n/g, "<br/>");
            }
            else {
                if (this.labelText == null) {
                    this.labelText = this.label;
                    this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>");
                }
            }
        },
        updateFrom:function(d) {
            if(d.label) this.setLabel(d.label);
        }
    });

    // ********************************* END OF OVERLAY DEFINITIONS ***********************************************************************

}).call(this);

/*
 * jsPlumb
 *
 * Title:jsPlumb 2.0.2
 *
 * Provides a way to visually connect elements on an HTML page, using SVG.
 *
 * This file contains the base class for library adapters.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 *
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 *
 * Dual licensed under the MIT and GPL2 licenses.
 */
;(function() {
    "use strict";
    var root = this,
        _jp = root.jsPlumb;

    var _getEventManager = function(instance) {
        var e = instance._mottle;
        if (!e) {
            e = instance._mottle = new root.Mottle();
        }
        return e;
    };

    _jp.extend(root.jsPlumbInstance.prototype, {
        getEventManager:function() {
            return _getEventManager(this);
        },
        on : function(el, event, callback) {
            // TODO: here we would like to map the tap event if we know its
            // an internal bind to a click. we have to know its internal because only
            // then can we be sure that the UP event wont be consumed (tap is a synthesized
            // event from a mousedown followed by a mouseup).
            //event = { "click":"tap", "dblclick":"dbltap"}[event] || event;
            this.getEventManager().on.apply(this, arguments);
            return this;
        },
        off : function(el, event, callback) {
            this.getEventManager().off.apply(this, arguments);
            return this;
        }
    });


}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the 'flowchart' connectors, consisting of vertical and horizontal line segments.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var Flowchart = function (params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub == null ? 30 : params.stub;
        var segments,
            _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            midpoint = params.midpoint == null ? 0.5 : params.midpoint,
            alwaysRespectStubs = params.alwaysRespectStubs === true,
            userSuppliedSegments = null,
            lastx = null, lasty = null, lastOrientation,
            cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0,
            sgn = function (n) {
                return n < 0 ? -1 : n === 0 ? 0 : 1;
            },
            /**
             * helper method to add a segment.
             */
            addSegment = function (segments, x, y, paintInfo) {
                if (lastx == x && lasty == y) return;
                var lx = lastx == null ? paintInfo.sx : lastx,
                    ly = lasty == null ? paintInfo.sy : lasty,
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                lastx = x;
                lasty = y;
                segments.push([lx, ly, x, y, o, sgnx, sgny]);
            },
            segLength = function (s) {
                return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2));
            },
            _cloneArray = function (a) {
                var _a = [];
                _a.push.apply(_a, a);
                return _a;
            },
            writeSegments = function (conn, segments, paintInfo) {
                var current = null, next;
                for (var i = 0; i < segments.length - 1; i++) {

                    current = current || _cloneArray(segments[i]);
                    next = _cloneArray(segments[i + 1]);
                    if (cornerRadius > 0 && current[4] != next[4]) {
                        var radiusToUse = Math.min(cornerRadius, segLength(current), segLength(next));
                        // right angle. adjust current segment's end point, and next segment's start point.
                        current[2] -= current[5] * radiusToUse;
                        current[3] -= current[6] * radiusToUse;
                        next[0] += next[5] * radiusToUse;
                        next[1] += next[6] * radiusToUse;
                        var ac = (current[6] == next[5] && next[5] == 1) ||
                                ((current[6] == next[5] && next[5] === 0) && current[5] != next[6]) ||
                                (current[6] == next[5] && next[5] == -1),
                            sgny = next[1] > current[3] ? 1 : -1,
                            sgnx = next[0] > current[2] ? 1 : -1,
                            sgnEqual = sgny == sgnx,
                            cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2],
                            cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];

                        _super.addSegment(conn, "Straight", {
                            x1: current[0], y1: current[1], x2: current[2], y2: current[3]
                        });

                        _super.addSegment(conn, "Arc", {
                            r: radiusToUse,
                            x1: current[2],
                            y1: current[3],
                            x2: next[0],
                            y2: next[1],
                            cx: cx,
                            cy: cy,
                            ac: ac
                        });
                    }
                    else {
                        // dx + dy are used to adjust for line width.
                        var dx = (current[2] == current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2),
                            dy = (current[3] == current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);
                        _super.addSegment(conn, "Straight", {
                            x1: current[0] - dx, y1: current[1] - dy, x2: current[2] + dx, y2: current[3] + dy
                        });
                    }
                    current = next;
                }
                if (next != null) {
                    // last segment
                    _super.addSegment(conn, "Straight", {
                        x1: next[0], y1: next[1], x2: next[2], y2: next[3]
                    });
                }
            };

        this.setSegments = function (s) {
            userSuppliedSegments = s;
        };

        this.isEditable = function () {
            return true;
        };

        /*
         Function: getOriginalSegments
         Gets the segments before the addition of rounded corners. This is used by the flowchart
         connector editor, since it only wants to concern itself with the original segments.
         */
        this.getOriginalSegments = function () {
            return userSuppliedSegments || segments;
        };

        this._compute = function (paintInfo, params) {

            if (params.clearEdits)
                userSuppliedSegments = null;

            if (userSuppliedSegments != null) {
                writeSegments(this, userSuppliedSegments, paintInfo);
                return;
            }

            segments = [];
            lastx = null;
            lasty = null;
            lastOrientation = null;

            var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint),
                midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);

            var orientations = { x: [ 0, 1 ], y: [ 1, 0 ] },
                commonStubCalculator = function () {
                    return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];
                },
                stubCalculators = {
                    perpendicular: commonStubCalculator,
                    orthogonal: commonStubCalculator,
                    opposite: function (axis) {
                        var pi = paintInfo,
                            idx = axis == "x" ? 0 : 1,
                            areInProximity = {
                                "x": function () {
                                    return ( (pi.so[idx] == 1 && (
                                        ( (pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX) ) ||
                                        ( (pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) ||

                                        ( (pi.so[idx] == -1 && (
                                            ( (pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX) ) ||
                                            ( (pi.sx < pi.endStubX) && (pi.tx < pi.sx)))));
                                },
                                "y": function () {
                                    return ( (pi.so[idx] == 1 && (
                                        ( (pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY) ) ||
                                        ( (pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) ||

                                        ( (pi.so[idx] == -1 && (
                                            ( (pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY) ) ||
                                            ( (pi.sy < pi.endStubY) && (pi.ty < pi.sy)))));
                                }
                            };

                        if (!alwaysRespectStubs && areInProximity[axis]()) {
                            return {
                                "x": [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                                "y": [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                            }[axis];
                        }
                        else {
                            return [ paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY ];
                        }
                    }
                },
                lineCalculators = {
                    perpendicular: function (axis) {
                        var pi = paintInfo,
                            sis = {
                                x: [
                                    [ [ 1, 2, 3, 4 ], null, [ 2, 1, 4, 3 ] ],
                                    null,
                                    [ [ 4, 3, 2, 1 ], null, [ 3, 4, 1, 2 ] ]
                                ],
                                y: [
                                    [ [ 3, 2, 1, 4 ], null, [ 2, 3, 4, 1 ] ],
                                    null,
                                    [ [ 4, 1, 2, 3 ], null, [ 1, 4, 3, 2 ] ]
                                ]
                            },
                            stubs = {
                                x: [ [ pi.startStubX, pi.endStubX ], null, [ pi.endStubX, pi.startStubX ] ],
                                y: [ [ pi.startStubY, pi.endStubY ], null, [ pi.endStubY, pi.startStubY ] ]
                            },
                            midLines = {
                                x: [ [ midx, pi.startStubY ], [ midx, pi.endStubY ] ],
                                y: [ [ pi.startStubX, midy ], [ pi.endStubX, midy ] ]
                            },
                            linesToEnd = {
                                x: [ [ pi.endStubX, pi.startStubY ] ],
                                y: [ [ pi.startStubX, pi.endStubY ] ]
                            },
                            startToEnd = {
                                x: [ [ pi.startStubX, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ],
                                y: [ [ pi.endStubX, pi.startStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            startToMidToEnd = {
                                x: [ [ pi.startStubX, midy ], [ pi.endStubX, midy ], [ pi.endStubX, pi.endStubY ] ],
                                y: [ [ midx, pi.startStubY ], [ midx, pi.endStubY ], [ pi.endStubX, pi.endStubY ] ]
                            },
                            otherStubs = {
                                x: [ pi.startStubY, pi.endStubY ],
                                y: [ pi.startStubX, pi.endStubX ]
                            },
                            soIdx = orientations[axis][0], toIdx = orientations[axis][1],
                            _so = pi.so[soIdx] + 1,
                            _to = pi.to[toIdx] + 1,
                            otherFlipped = (pi.to[toIdx] == -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (pi.to[toIdx] == 1 && (otherStubs[axis][1] > otherStubs[axis][0])),
                            stub1 = stubs[axis][_so][0],
                            stub2 = stubs[axis][_so][1],
                            segmentIndexes = sis[axis][_so][_to];

                        if (pi.segment == segmentIndexes[3] || (pi.segment == segmentIndexes[2] && otherFlipped)) {
                            return midLines[axis];
                        }
                        else if (pi.segment == segmentIndexes[2] && stub2 < stub1) {
                            return linesToEnd[axis];
                        }
                        else if ((pi.segment == segmentIndexes[2] && stub2 >= stub1) || (pi.segment == segmentIndexes[1] && !otherFlipped)) {
                            return startToMidToEnd[axis];
                        }
                        else if (pi.segment == segmentIndexes[0] || (pi.segment == segmentIndexes[1] && otherFlipped)) {
                            return startToEnd[axis];
                        }
                    },
                    orthogonal: function (axis, startStub, otherStartStub, endStub, otherEndStub) {
                        var pi = paintInfo,
                            extent = {
                                "x": pi.so[0] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                                "y": pi.so[1] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                            }[axis];

                        return {
                            "x": [
                                [ extent, otherStartStub ],
                                [ extent, otherEndStub ],
                                [ endStub, otherEndStub ]
                            ],
                            "y": [
                                [ otherStartStub, extent ],
                                [ otherEndStub, extent ],
                                [ otherEndStub, endStub ]
                            ]
                        }[axis];
                    },
                    opposite: function (axis, ss, oss, es) {
                        var pi = paintInfo,
                            otherAxis = {"x": "y", "y": "x"}[axis],
                            dim = {"x": "height", "y": "width"}[axis],
                            comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];

                        if (params.sourceEndpoint.elementId == params.targetEndpoint.elementId) {
                            var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                            return {
                                "x": [
                                    [ ss, _val ],
                                    [ es, _val ]
                                ],
                                "y": [
                                    [ _val, ss ],
                                    [ _val, es ]
                                ]
                            }[axis];

                        }
                        else if (!comparator || (pi.so[idx] == 1 && ss > es) || (pi.so[idx] == -1 && ss < es)) {
                            return {
                                "x": [
                                    [ ss, midy ],
                                    [ es, midy ]
                                ],
                                "y": [
                                    [ midx, ss ],
                                    [ midx, es ]
                                ]
                            }[axis];
                        }
                        else if ((pi.so[idx] == 1 && ss < es) || (pi.so[idx] == -1 && ss > es)) {
                            return {
                                "x": [
                                    [ midx, pi.sy ],
                                    [ midx, pi.ty ]
                                ],
                                "y": [
                                    [ pi.sx, midy ],
                                    [ pi.tx, midy ]
                                ]
                            }[axis];
                        }
                    }
                };

            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
                idx = paintInfo.sourceAxis == "x" ? 0 : 1,
                oidx = paintInfo.sourceAxis == "x" ? 1 : 0,
                ss = stubs[idx],
                oss = stubs[oidx],
                es = stubs[idx + 2],
                oes = stubs[oidx + 2];

            // add the start stub segment.
            addSegment(segments, stubs[0], stubs[1], paintInfo);

            // compute the rest of the line
            var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
            if (p) {
                for (var i = 0; i < p.length; i++) {
                    addSegment(segments, p[i][0], p[i][1], paintInfo);
                }
            }

            // line to end stub
            addSegment(segments, stubs[2], stubs[3], paintInfo);

            // end stub to end
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);

            writeSegments(this, segments, paintInfo);
        };

        this.getPath = function () {
            var _last = null, _lastAxis = null, s = [], segs = userSuppliedSegments || segments;
            for (var i = 0; i < segs.length; i++) {
                var seg = segs[i], axis = seg[4], axisIndex = (axis == "v" ? 3 : 2);
                if (_last != null && _lastAxis === axis) {
                    _last[axisIndex] = seg[axisIndex];
                }
                else {
                    if (seg[0] != seg[2] || seg[1] != seg[3]) {
                        s.push({
                            start: [ seg[0], seg[1] ],
                            end: [ seg[2], seg[3] ]
                        });
                        _last = seg;
                        _lastAxis = seg[4];
                    }
                }
            }
            return s;
        };

        this.setPath = function (path) {
            userSuppliedSegments = [];
            for (var i = 0; i < path.length; i++) {
                var lx = path[i].start[0],
                    ly = path[i].start[1],
                    x = path[i].end[0],
                    y = path[i].end[1],
                    o = lx == x ? "v" : "h",
                    sgnx = sgn(x - lx),
                    sgny = sgn(y - ly);

                userSuppliedSegments.push([lx, ly, x, y, o, sgnx, sgny]);
            }
        };
    };

    _ju.extend(Flowchart, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Flowchart, "Flowchart");
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the state machine connectors.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var _segment = function (x1, y1, x2, y2) {
            if (x1 <= x2 && y2 <= y1) return 1;
            else if (x1 <= x2 && y1 <= y2) return 2;
            else if (x2 <= x1 && y2 >= y1) return 3;
            return 4;
        },

    // the control point we will use depends on the faces to which each end of the connection is assigned, specifically whether or not the
    // two faces are parallel or perpendicular.  if they are parallel then the control point lies on the midpoint of the axis in which they
    // are parellel and varies only in the other axis; this variation is proportional to the distance that the anchor points lie from the
    // center of that face.  if the two faces are perpendicular then the control point is at some distance from both the midpoints; the amount and
    // direction are dependent on the orientation of the two elements. 'seg', passed in to this method, tells you which segment the target element
    // lies in with respect to the source: 1 is top right, 2 is bottom right, 3 is bottom left, 4 is top left.
    //
    // sourcePos and targetPos are arrays of info about where on the source and target each anchor is located.  their contents are:
    //
    // 0 - absolute x
    // 1 - absolute y
    // 2 - proportional x in element (0 is left edge, 1 is right edge)
    // 3 - proportional y in element (0 is top edge, 1 is bottom edge)
    //
        _findControlPoint = function (midx, midy, segment, sourceEdge, targetEdge, dx, dy, distance, proximityLimit) {
            // TODO (maybe)
            // - if anchor pos is 0.5, make the control point take into account the relative position of the elements.
            if (distance <= proximityLimit) return [midx, midy];

            if (segment === 1) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
            }
            else if (segment === 2) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] >= 1 && targetEdge[2] <= 0) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + dx, midy + (-1 * dy) ];
            }
            else if (segment === 3) {
                if (sourceEdge[3] >= 1 && targetEdge[3] <= 0) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + (-1 * dx) , midy + (-1 * dy) ];
            }
            else if (segment === 4) {
                if (sourceEdge[3] <= 0 && targetEdge[3] >= 1) return [ midx + (sourceEdge[2] < 0.5 ? -1 * dx : dx), midy ];
                else if (sourceEdge[2] <= 0 && targetEdge[2] >= 1) return [ midx, midy + (sourceEdge[3] < 0.5 ? -1 * dy : dy) ];
                else return [ midx + dx , midy + (-1 * dy) ];
            }

        };

    var StateMachine = function (params) {
        params = params || {};
        this.type = "StateMachine";

        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            curviness = params.curviness || 10,
            margin = params.margin || 5,
            proximityLimit = params.proximityLimit || 80,
            clockwise = params.orientation && params.orientation === "clockwise",
            loopbackRadius = params.loopbackRadius || 25,
            showLoopback = params.showLoopback !== false;

        this._compute = function (paintInfo, params) {
            var w = Math.abs(params.sourcePos[0] - params.targetPos[0]),
                h = Math.abs(params.sourcePos[1] - params.targetPos[1]);

            if (!showLoopback || (params.sourceEndpoint.elementId !== params.targetEndpoint.elementId)) {
                var _sx = params.sourcePos[0] < params.targetPos[0] ? 0 : w,
                    _sy = params.sourcePos[1] < params.targetPos[1] ? 0 : h,
                    _tx = params.sourcePos[0] < params.targetPos[0] ? w : 0,
                    _ty = params.sourcePos[1] < params.targetPos[1] ? h : 0;

                // now adjust for the margin
                if (params.sourcePos[2] === 0) _sx -= margin;
                if (params.sourcePos[2] === 1) _sx += margin;
                if (params.sourcePos[3] === 0) _sy -= margin;
                if (params.sourcePos[3] === 1) _sy += margin;
                if (params.targetPos[2] === 0) _tx -= margin;
                if (params.targetPos[2] === 1) _tx += margin;
                if (params.targetPos[3] === 0) _ty -= margin;
                if (params.targetPos[3] === 1) _ty += margin;

                //
                // these connectors are quadratic bezier curves, having a single control point. if both anchors
                // are located at 0.5 on their respective faces, the control point is set to the midpoint and you
                // get a straight line.  this is also the case if the two anchors are within 'proximityLimit', since
                // it seems to make good aesthetic sense to do that. outside of that, the control point is positioned
                // at 'curviness' pixels away along the normal to the straight line connecting the two anchors.
                //
                // there may be two improvements to this.  firstly, we might actually support the notion of avoiding nodes
                // in the UI, or at least making a good effort at doing so.  if a connection would pass underneath some node,
                // for example, we might increase the distance the control point is away from the midpoint in a bid to
                // steer it around that node.  this will work within limits, but i think those limits would also be the likely
                // limits for, once again, aesthetic good sense in the layout of a chart using these connectors.
                //
                // the second possible change is actually two possible changes: firstly, it is possible we should gradually
                // decrease the 'curviness' as the distance between the anchors decreases; start tailing it off to 0 at some
                // point (which should be configurable).  secondly, we might slightly increase the 'curviness' for connectors
                // with respect to how far their anchor is from the center of its respective face. this could either look cool,
                // or stupid, and may indeed work only in a way that is so subtle as to have been a waste of time.
                //

                var _midx = (_sx + _tx) / 2,
                    _midy = (_sy + _ty) / 2,
                    segment = _segment(_sx, _sy, _tx, _ty),
                    distance = Math.sqrt(Math.pow(_tx - _sx, 2) + Math.pow(_ty - _sy, 2)),
                    // calculate the control point.  this code will be where we'll put in a rudimentary element avoidance scheme; it
                    // will work by extending the control point to force the curve to be, um, curvier.
                    _controlPoint = _findControlPoint(_midx,
                        _midy,
                        segment,
                        params.sourcePos,
                        params.targetPos,
                        curviness, curviness,
                        distance,
                        proximityLimit);

                _super.addSegment(this, "Bezier", {
                    x1: _tx, y1: _ty, x2: _sx, y2: _sy,
                    cp1x: _controlPoint[0], cp1y: _controlPoint[1],
                    cp2x: _controlPoint[0], cp2y: _controlPoint[1]
                });
            }
            else {
                // a loopback connector.  draw an arc from one anchor to the other.
                var x1 = params.sourcePos[0], y1 = params.sourcePos[1] - margin,
                    cx = x1, cy = y1 - loopbackRadius,
                // canvas sizing stuff, to ensure the whole painted area is visible.
                    _w = 2 * loopbackRadius,
                    _h = 2 * loopbackRadius,
                    _x = cx - loopbackRadius,
                    _y = cy - loopbackRadius;

                paintInfo.points[0] = _x;
                paintInfo.points[1] = _y;
                paintInfo.points[2] = _w;
                paintInfo.points[3] = _h;

                // ADD AN ARC SEGMENT.
                _super.addSegment(this, "Arc", {
                    loopback: true,
                    x1: (x1 - _x) + 4,
                    y1: y1 - _y,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: loopbackRadius,
                    ac: !clockwise,
                    x2: (x1 - _x) - 4,
                    y2: y1 - _y,
                    cx: cx - _x,
                    cy: cy - _y
                });
            }
        };
    };
    _ju.extend(StateMachine, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(StateMachine, "StateMachine");
}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the code for the Bezier connector type.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var Bezier = function (params) {
        params = params || {};

        var _super = _jp.Connectors.AbstractConnector.apply(this, arguments),
            majorAnchor = params.curviness || 150,
            minorAnchor = 10;

        this.type = "Bezier";
        this.getCurviness = function () {
            return majorAnchor;
        };

        this._findControlPoint = function (point, sourceAnchorPosition, targetAnchorPosition, sourceEndpoint, targetEndpoint, soo, too) {
            // determine if the two anchors are perpendicular to each other in their orientation.  we swap the control
            // points around if so (code could be tightened up)
            var perpendicular = soo[0] != too[0] || soo[1] == too[1],
                p = [];

            if (!perpendicular) {
                if (soo[0] === 0) // X
                    p.push(sourceAnchorPosition[0] < targetAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] - (majorAnchor * soo[0]));

                if (soo[1] === 0) // Y
                    p.push(sourceAnchorPosition[1] < targetAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * too[1]));
            }
            else {
                if (too[0] === 0) // X
                    p.push(targetAnchorPosition[0] < sourceAnchorPosition[0] ? point[0] + minorAnchor : point[0] - minorAnchor);
                else p.push(point[0] + (majorAnchor * too[0]));

                if (too[1] === 0) // Y
                    p.push(targetAnchorPosition[1] < sourceAnchorPosition[1] ? point[1] + minorAnchor : point[1] - minorAnchor);
                else p.push(point[1] + (majorAnchor * soo[1]));
            }

            return p;
        };

        this._compute = function (paintInfo, p) {
            var sp = p.sourcePos,
                tp = p.targetPos,
                _w = Math.abs(sp[0] - tp[0]),
                _h = Math.abs(sp[1] - tp[1]),
                _sx = sp[0] < tp[0] ? _w : 0,
                _sy = sp[1] < tp[1] ? _h : 0,
                _tx = sp[0] < tp[0] ? 0 : _w,
                _ty = sp[1] < tp[1] ? 0 : _h,
                _CP = this._findControlPoint([_sx, _sy], sp, tp, p.sourceEndpoint, p.targetEndpoint, paintInfo.so, paintInfo.to),
                _CP2 = this._findControlPoint([_tx, _ty], tp, sp, p.targetEndpoint, p.sourceEndpoint, paintInfo.to, paintInfo.so);

            _super.addSegment(this, "Bezier", {
                x1: _sx, y1: _sy, x2: _tx, y2: _ty,
                cp1x: _CP[0], cp1y: _CP[1], cp2x: _CP2[0], cp2y: _CP2[1]
            });
        };
    };

    _ju.extend(Bezier, _jp.Connectors.AbstractConnector);
    _jp.registerConnectorType(Bezier, "Bezier");

}).call(this);
/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the SVG renderers.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

// ************************** SVG utility methods ********************************************	

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil;

    var svgAttributeMap = {
            "stroke-linejoin": "stroke-linejoin",
            "stroke-dashoffset": "stroke-dashoffset",
            "stroke-linecap": "stroke-linecap"
        },
        STROKE_DASHARRAY = "stroke-dasharray",
        DASHSTYLE = "dashstyle",
        LINEAR_GRADIENT = "linearGradient",
        RADIAL_GRADIENT = "radialGradient",
        DEFS = "defs",
        FILL = "fill",
        STOP = "stop",
        STROKE = "stroke",
        STROKE_WIDTH = "stroke-width",
        STYLE = "style",
        NONE = "none",
        JSPLUMB_GRADIENT = "jsplumb_gradient_",
        LINE_WIDTH = "lineWidth",
        ns = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml"
        },
        _attr = function (node, attributes) {
            for (var i in attributes)
                node.setAttribute(i, "" + attributes[i]);
        },
        _node = function (name, attributes) {
            attributes = attributes || {};
            attributes.version = "1.1";
            attributes.xmlns = ns.xhtml;
            return jsPlumb.createElementNS(ns.svg, name, null, null, attributes);
        },
        _pos = function (d) {
            return "position:absolute;left:" + d[0] + "px;top:" + d[1] + "px";
        },
        _clearGradient = function (parent) {
            var els = parent.querySelectorAll(" defs,linearGradient,radialGradient");
            for (var i = 0; i < els.length; i++)
                els[i].parentNode.removeChild(els[i]);
        },
        _updateGradient = function (parent, node, style, dimensions, uiComponent) {
            var id = JSPLUMB_GRADIENT + uiComponent._jsPlumb.instance.idstamp();
            // first clear out any existing gradient
            _clearGradient(parent);
            // this checks for an 'offset' property in the gradient, and in the absence of it, assumes
            // we want a linear gradient. if it's there, we create a radial gradient.
            // it is possible that a more explicit means of defining the gradient type would be
            // better. relying on 'offset' means that we can never have a radial gradient that uses
            // some default offset, for instance.
            // issue 244 suggested the 'gradientUnits' attribute; without this, straight/flowchart connectors with gradients would
            // not show gradients when the line was perfectly horizontal or vertical.
            var g;
            if (!style.gradient.offset)
                g = _node(LINEAR_GRADIENT, {id: id, gradientUnits: "userSpaceOnUse"});
            else
                g = _node(RADIAL_GRADIENT, { id: id });

            var defs = _node(DEFS);
            parent.appendChild(defs);
            defs.appendChild(g);

            // the svg radial gradient seems to treat stops in the reverse
            // order to how canvas does it.  so we want to keep all the maths the same, but
            // iterate the actual style declarations in reverse order, if the x indexes are not in order.
            for (var i = 0; i < style.gradient.stops.length; i++) {
                var styleToUse = uiComponent.segment == 1 || uiComponent.segment == 2 ? i : style.gradient.stops.length - 1 - i,
                    //stopColor = _ju.convertStyle(style.gradient.stops[styleToUse][1], true),
                    stopColor = style.gradient.stops[styleToUse][1],
                    s = _node(STOP, {"offset": Math.floor(style.gradient.stops[i][0] * 100) + "%", "stop-color": stopColor});

                g.appendChild(s);
            }
            var applyGradientTo = style.strokeStyle ? STROKE : FILL;
            node.setAttribute(applyGradientTo, "url(#" + id + ")");
        },
        _applyStyles = function (parent, node, style, dimensions, uiComponent) {

            node.setAttribute(FILL, style.fillStyle ? style.fillStyle : NONE);
            node.setAttribute(STROKE, style.strokeStyle ? style.strokeStyle : NONE);

            if (style.gradient) {
                _updateGradient(parent, node, style, dimensions, uiComponent);
            }
            else {
                // make sure we clear any existing gradient
                _clearGradient(parent);
                node.setAttribute(STYLE, "");
            }

            if (style.lineWidth) {
                node.setAttribute(STROKE_WIDTH, style.lineWidth);
            }

            // in SVG there is a stroke-dasharray attribute we can set, and its syntax looks like
            // the syntax in VML but is actually kind of nasty: values are given in the pixel
            // coordinate space, whereas in VML they are multiples of the width of the stroked
            // line, which makes a lot more sense.  for that reason, jsPlumb is supporting both
            // the native svg 'stroke-dasharray' attribute, and also the 'dashstyle' concept from
            // VML, which will be the preferred method.  the code below this converts a dashstyle
            // attribute given in terms of stroke width into a pixel representation, by using the
            // stroke's lineWidth.
            if (style[DASHSTYLE] && style[LINE_WIDTH] && !style[STROKE_DASHARRAY]) {
                var sep = style[DASHSTYLE].indexOf(",") == -1 ? " " : ",",
                    parts = style[DASHSTYLE].split(sep),
                    styleToUse = "";
                parts.forEach(function (p) {
                    styleToUse += (Math.floor(p * style.lineWidth) + sep);
                });
                node.setAttribute(STROKE_DASHARRAY, styleToUse);
            }
            else if (style[STROKE_DASHARRAY]) {
                node.setAttribute(STROKE_DASHARRAY, style[STROKE_DASHARRAY]);
            }

            // extra attributes such as join type, dash offset.
            for (var i in svgAttributeMap) {
                if (style[i]) {
                    node.setAttribute(svgAttributeMap[i], style[i]);
                }
            }
        },
        _appendAtIndex = function (svg, path, idx) {
            if (svg.childNodes.length > idx) {
                svg.insertBefore(path, svg.childNodes[idx]);
            }
            else svg.appendChild(path);
        };

    /**
     utility methods for other objects to use.
     */
    _ju.svg = {
        node: _node,
        attr: _attr,
        pos: _pos
    };

    // ************************** / SVG utility methods ********************************************

    /*
     * Base class for SVG components.
     */
    var SvgComponent = function (params) {
        var pointerEventsSpec = params.pointerEventsSpec || "all", renderer = {};

        _jp.jsPlumbUIComponent.apply(this, params.originalArgs);
        this.canvas = null;
        this.path = null;
        this.svg = null;
        this.bgCanvas = null;

        var clazz = params.cssClass + " " + (params.originalArgs[0].cssClass || ""),
            svgParams = {
                "style": "",
                "width": 0,
                "height": 0,
                "pointer-events": pointerEventsSpec,
                "position": "absolute"
            };

        this.svg = _node("svg", svgParams);

        if (params.useDivWrapper) {
            this.canvas = jsPlumb.createElement("div", { position : "absolute" });
            _ju.sizeElement(this.canvas, 0, 0, 1, 1);
            this.canvas.className = clazz;
        }
        else {
            _attr(this.svg, { "class": clazz });
            this.canvas = this.svg;
        }

        params._jsPlumb.appendElement(this.canvas, params.originalArgs[0].parent);
        if (params.useDivWrapper) this.canvas.appendChild(this.svg);

        var displayElements = [ this.canvas ];
        this.getDisplayElements = function () {
            return displayElements;
        };

        this.appendDisplayElement = function (el) {
            displayElements.push(el);
        };

        this.paint = function (style, anchor, extents) {
            if (style != null) {

                var xy = [ this.x, this.y ], wh = [ this.w, this.h ], p;
                if (extents != null) {
                    if (extents.xmin < 0) xy[0] += extents.xmin;
                    if (extents.ymin < 0) xy[1] += extents.ymin;
                    wh[0] = extents.xmax + ((extents.xmin < 0) ? -extents.xmin : 0);
                    wh[1] = extents.ymax + ((extents.ymin < 0) ? -extents.ymin : 0);
                }

                if (params.useDivWrapper) {
                    _ju.sizeElement(this.canvas, xy[0], xy[1], wh[0], wh[1]);
                    xy[0] = 0;
                    xy[1] = 0;
                    p = _pos([ 0, 0 ]);
                }
                else
                    p = _pos([ xy[0], xy[1] ]);

                renderer.paint.apply(this, arguments);

                _attr(this.svg, {
                    "style": p,
                    "width": wh[0] || 0,
                    "height": wh[1] || 0
                });
            }
        };

        return {
            renderer: renderer
        };
    };

    _ju.extend(SvgComponent, _jp.jsPlumbUIComponent, {
        cleanup: function (force) {
            if (force || this.typeId == null) {
                if (this.canvas) this.canvas._jsPlumb = null;
                if (this.svg) this.svg._jsPlumb = null;
                if (this.bgCanvas) this.bgCanvas._jsPlumb = null;

                if (this.canvas && this.canvas.parentNode)
                    this.canvas.parentNode.removeChild(this.canvas);
                if (this.bgCanvas && this.bgCanvas.parentNode)
                    this.canvas.parentNode.removeChild(this.canvas);

                this.svg = null;
                this.canvas = null;
                this.path = null;
                this.group = null;
            }
            else {
                // if not a forced cleanup, just detach from DOM for now.
                if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
                if (this.bgCanvas && this.bgCanvas.parentNode) this.bgCanvas.parentNode.removeChild(this.bgCanvas);
            }
        },
        reattach:function(instance) {
            var c = instance.getContainer();
            if (this.canvas && this.canvas.parentNode == null) c.appendChild(this.canvas);
            if (this.bgCanvas && this.bgCanvas.parentNode == null) c.appendChild(this.bgCanvas);
        },
        setVisible: function (v) {
            if (this.canvas) {
                this.canvas.style.display = v ? "block" : "none";
            }
        }
    });

    /*
     * Base class for SVG connectors.
     */
    _jp.ConnectorRenderers.svg = function (params) {
        var self = this,
            _super = SvgComponent.apply(this, [
                {
                    cssClass: params._jsPlumb.connectorClass,
                    originalArgs: arguments,
                    pointerEventsSpec: "none",
                    _jsPlumb: params._jsPlumb
                }
            ]);

        _super.renderer.paint = function (style, anchor, extents) {

            var segments = self.getSegments(), p = "", offset = [0, 0];
            if (extents.xmin < 0) offset[0] = -extents.xmin;
            if (extents.ymin < 0) offset[1] = -extents.ymin;

            if (segments.length > 0) {

                // create path from segments.
                for (var i = 0; i < segments.length; i++) {
                    p += _jp.Segments.svg.SegmentRenderer.getPath(segments[i]);
                    p += " ";
                }

                var a = {
                        d: p,
                        transform: "translate(" + offset[0] + "," + offset[1] + ")",
                        "pointer-events": params["pointer-events"] || "visibleStroke"
                    },
                    outlineStyle = null,
                    d = [self.x, self.y, self.w, self.h];

                // outline style.  actually means drawing an svg object underneath the main one.
                if (style.outlineColor) {
                    var outlineWidth = style.outlineWidth || 1,
                        outlineStrokeWidth = style.lineWidth + (2 * outlineWidth);
                    outlineStyle = _jp.extend({}, style);
                    delete outlineStyle.gradient;
                    outlineStyle.strokeStyle = style.outlineColor;
                    outlineStyle.lineWidth = outlineStrokeWidth;

                    if (self.bgPath == null) {
                        self.bgPath = _node("path", a);
                        _jp.addClass(self.bgPath, _jp.connectorOutlineClass);
                        _appendAtIndex(self.svg, self.bgPath, 0);
                    }
                    else {
                        _attr(self.bgPath, a);
                    }

                    _applyStyles(self.svg, self.bgPath, outlineStyle, d, self);
                }

                if (self.path == null) {
                    self.path = _node("path", a);
                    _appendAtIndex(self.svg, self.path, style.outlineColor ? 1 : 0);
                }
                else {
                    _attr(self.path, a);
                }

                _applyStyles(self.svg, self.path, style, d, self);
            }
        };
    };
    _ju.extend(_jp.ConnectorRenderers.svg, SvgComponent);

// ******************************* svg segment renderer *****************************************************	

    _jp.Segments.svg = {
        SegmentRenderer: {
            getPath: function (segment) {
                return ({
                    "Straight": function () {
                        var d = segment.getCoordinates();
                        return "M " + d.x1 + " " + d.y1 + " L " + d.x2 + " " + d.y2;
                    },
                    "Bezier": function () {
                        var d = segment.params;
                        return "M " + d.x1 + " " + d.y1 +
                            " C " + d.cp1x + " " + d.cp1y + " " + d.cp2x + " " + d.cp2y + " " + d.x2 + " " + d.y2;
                    },
                    "Arc": function () {
                        var d = segment.params,
                            laf = segment.sweep > Math.PI ? 1 : 0,
                            sf = segment.anticlockwise ? 0 : 1;

                        return "M" + segment.x1 + " " + segment.y1 + " A " + segment.radius + " " + d.r + " 0 " + laf + "," + sf + " " + segment.x2 + " " + segment.y2;
                    }
                })[segment.type]();
            }
        }
    };

// ******************************* /svg segments *****************************************************

    /*
     * Base class for SVG endpoints.
     */
    var SvgEndpoint = _jp.SvgEndpoint = function (params) {
        var _super = SvgComponent.apply(this, [
            {
                cssClass: params._jsPlumb.endpointClass,
                originalArgs: arguments,
                pointerEventsSpec: "all",
                useDivWrapper: true,
                _jsPlumb: params._jsPlumb
            }
        ]);

        _super.renderer.paint = function (style) {
            var s = _jp.extend({}, style);
            if (s.outlineColor) {
                s.strokeWidth = s.outlineWidth;
                s.strokeStyle = s.outlineColor;
            }

            if (this.node == null) {
                this.node = this.makeNode(s);
                this.svg.appendChild(this.node);
            }
            else if (this.updateNode != null) {
                this.updateNode(this.node);
            }
            _applyStyles(this.svg, this.node, s, [ this.x, this.y, this.w, this.h ], this);
            _pos(this.node, [ this.x, this.y ]);
        }.bind(this);

    };
    _ju.extend(SvgEndpoint, SvgComponent);

    /*
     * SVG Dot Endpoint
     */
    _jp.Endpoints.svg.Dot = function () {
        _jp.Endpoints.Dot.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("circle", {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "cx": this.w / 2,
                "cy": this.h / 2,
                "r": this.radius
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Dot, [_jp.Endpoints.Dot, SvgEndpoint]);

    /*
     * SVG Rectangle Endpoint
     */
    _jp.Endpoints.svg.Rectangle = function () {
        _jp.Endpoints.Rectangle.apply(this, arguments);
        SvgEndpoint.apply(this, arguments);
        this.makeNode = function (style) {
            return _node("rect", {
                "width": this.w,
                "height": this.h
            });
        };
        this.updateNode = function (node) {
            _attr(node, {
                "width": this.w,
                "height": this.h
            });
        };
    };
    _ju.extend(_jp.Endpoints.svg.Rectangle, [_jp.Endpoints.Rectangle, SvgEndpoint]);

    /*
     * SVG Image Endpoint is the default image endpoint.
     */
    _jp.Endpoints.svg.Image = _jp.Endpoints.Image;
    /*
     * Blank endpoint in svg renderer is the default Blank endpoint.
     */
    _jp.Endpoints.svg.Blank = _jp.Endpoints.Blank;
    /*
     * Label overlay in svg renderer is the default Label overlay.
     */
    _jp.Overlays.svg.Label = _jp.Overlays.Label;
    /*
     * Custom overlay in svg renderer is the default Custom overlay.
     */
    _jp.Overlays.svg.Custom = _jp.Overlays.Custom;

    var AbstractSvgArrowOverlay = function (superclass, originalArgs) {
        superclass.apply(this, originalArgs);
        _jp.jsPlumbUIComponent.apply(this, originalArgs);
        this.isAppendedAtTopLevel = false;
        var self = this;
        this.path = null;
        this.paint = function (params, containerExtents) {
            // only draws on connections, not endpoints.
            if (params.component.svg && containerExtents) {
                if (this.path == null) {
                    this.path = _node("path", {
                        "pointer-events": "all"
                    });
                    params.component.svg.appendChild(this.path);

                    this.canvas = params.component.svg; // for the sake of completeness; this behaves the same as other overlays
                }
                var clazz = originalArgs && (originalArgs.length == 1) ? (originalArgs[0].cssClass || "") : "",
                    offset = [0, 0];

                if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
                if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

                _attr(this.path, {
                    "d": makePath(params.d),
                    "class": clazz,
                    stroke: params.strokeStyle ? params.strokeStyle : null,
                    fill: params.fillStyle ? params.fillStyle : null,
                    transform: "translate(" + offset[0] + "," + offset[1] + ")"
                });
            }
        };
        var makePath = function (d) {
            return (isNaN(d.cxy.x) || isNaN(d.cxy.y)) ? "" : "M" + d.hxy.x + "," + d.hxy.y +
                " L" + d.tail[0].x + "," + d.tail[0].y +
                " L" + d.cxy.x + "," + d.cxy.y +
                " L" + d.tail[1].x + "," + d.tail[1].y +
                " L" + d.hxy.x + "," + d.hxy.y;
        };
        this.transfer = function(target) {
            if (target.canvas && this.path && this.path.parentNode) {
                this.path.parentNode.removeChild(this.path);
                target.canvas.appendChild(this.path);
            }
        };
    };
    _ju.extend(AbstractSvgArrowOverlay, [_jp.jsPlumbUIComponent, _jp.Overlays.AbstractOverlay], {
        cleanup: function (force) {
            if (this.path != null) {
                if (force)
                    this._jsPlumb.instance.removeElement(this.path);
                else
                    if (this.path.parentNode)
                        this.path.parentNode.removeChild(this.path);
            }
        },
        reattach:function(instance) {
            if (this.path && this.canvas && this.path.parentNode == null)
                this.canvas.appendChild(this.path);
        },
        setVisible: function (v) {
            if (this.path != null) (this.path.style.display = (v ? "block" : "none"));
        }
    });

    _jp.Overlays.svg.Arrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Arrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Arrow, [ _jp.Overlays.Arrow, AbstractSvgArrowOverlay ]);

    _jp.Overlays.svg.PlainArrow = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.PlainArrow, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.PlainArrow, [ _jp.Overlays.PlainArrow, AbstractSvgArrowOverlay ]);

    _jp.Overlays.svg.Diamond = function () {
        AbstractSvgArrowOverlay.apply(this, [_jp.Overlays.Diamond, arguments]);
    };
    _ju.extend(_jp.Overlays.svg.Diamond, [ _jp.Overlays.Diamond, AbstractSvgArrowOverlay ]);

    // a test
    _jp.Overlays.svg.GuideLines = function () {
        var path = null, self = this, p1_1, p1_2;
        _jp.Overlays.GuideLines.apply(this, arguments);
        this.paint = function (params, containerExtents) {
            if (path == null) {
                path = _node("path");
                params.connector.svg.appendChild(path);
                self.attachListeners(path, params.connector);
                self.attachListeners(path, self);

                p1_1 = _node("path");
                params.connector.svg.appendChild(p1_1);
                self.attachListeners(p1_1, params.connector);
                self.attachListeners(p1_1, self);

                p1_2 = _node("path");
                params.connector.svg.appendChild(p1_2);
                self.attachListeners(p1_2, params.connector);
                self.attachListeners(p1_2, self);
            }

            var offset = [0, 0];
            if (containerExtents.xmin < 0) offset[0] = -containerExtents.xmin;
            if (containerExtents.ymin < 0) offset[1] = -containerExtents.ymin;

            _attr(path, {
                "d": makePath(params.head, params.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_1, {
                "d": makePath(params.tailLine[0], params.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });

            _attr(p1_2, {
                "d": makePath(params.headLine[0], params.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + offset[0] + "," + offset[1] + ")"
            });
        };

        var makePath = function (d1, d2) {
            return "M " + d1.x + "," + d1.y +
                " L" + d2.x + "," + d2.y;
        };
    };
    _ju.extend(_jp.Overlays.svg.GuideLines, _jp.Overlays.GuideLines);
}).call(this);

/*
 * jsPlumb
 * 
 * Title:jsPlumb 2.0.2
 * 
 * Provides a way to visually connect elements on an HTML page, using SVG.
 * 
 * This file contains the 'vanilla' adapter - having no external dependencies other than bundled libs.
 *
 * Copyright (c) 2010 - 2015 jsPlumb (hello@jsplumbtoolkit.com)
 * 
 * http://jsplumbtoolkit.com
 * http://github.com/sporritt/jsplumb
 * 
 * Dual licensed under the MIT and GPL2 licenses.
 */
;
(function () {

    "use strict";
    var root = this, _jp = root.jsPlumb, _ju = root.jsPlumbUtil,
        _jk = root.Katavorio, _jg = root.Biltong;

    var _getDragManager = function (instance, category) {

        category = category || "main";
        var key = "_katavorio_" + category;
        var k = instance[key],
            e = instance.getEventManager();

        if (!k) {
            k = new _jk({
                bind: e.on,
                unbind: e.off,
                getSize: jsPlumb.getSize,
                getPosition: function (el) {
                    var o = instance.getOffset(el);
                    return [o.left, o.top];
                },
                setPosition: function (el, xy) {
                    el.style.left = xy[0] + "px";
                    el.style.top = xy[1] + "px";
                },
                addClass: jsPlumb.addClass,
                removeClass: jsPlumb.removeClass,
                intersects: _jg.intersects,
                indexOf: function(l, i) { return l.indexOf(i); },
                css: {
                    noSelect: instance.dragSelectClass,
                    droppable: "jsplumb-droppable",
                    draggable: "jsplumb-draggable",
                    drag: "jsplumb-drag",
                    selected: "jsplumb-drag-selected",
                    active: "jsplumb-drag-active",
                    hover: "jsplumb-drag-hover"
                }
            });
            instance[key] = k;
            instance.bind("zoom", k.setZoom);
        }
        return k;
    };

    var _animProps = function (o, p) {
        var _one = function (pName) {
            if (p[pName] != null) {
                if (_ju.isString(p[pName])) {
                    var m = p[pName].match(/-=/) ? -1 : 1,
                        v = p[pName].substring(2);
                    return o[pName] + (m * v);
                }
                else return p[pName];
            }
            else
                return o[pName];
        };
        return [ _one("left"), _one("top") ];
    };

    _jp.extend(root.jsPlumbInstance.prototype, {

        animationSupported:true,
        getElement: function (el) {
            if (el == null) return null;
            // here we pluck the first entry if el was a list of entries.
            // this is not my favourite thing to do, but previous versions of
            // jsplumb supported jquery selectors, and it is possible a selector
            // will be passed in here.
            el = typeof el === "string" ? el : el.length != null && el.enctype == null ? el[0] : el;
            return typeof el === "string" ? document.getElementById(el) : el;
        },
        removeElement: function (element) {
            _getDragManager(this).elementRemoved(element);
            this.getEventManager().remove(element);
        },
        //
        // this adapter supports a rudimentary animation function. no easing is supported.  only
        // left/top properties are supported. property delta args are expected to be in the form
        //
        // +=x.xxxx
        //
        // or
        //
        // -=x.xxxx
        //
        doAnimate: function (el, properties, options) {
            options = options || {};
            var o = this.getOffset(el),
                ap = _animProps(o, properties),
                ldist = ap[0] - o.left,
                tdist = ap[1] - o.top,
                d = options.duration || 250,
                step = 15, steps = d / step,
                linc = (step / d) * ldist,
                tinc = (step / d) * tdist,
                idx = 0,
                int = setInterval(function () {
                    jsPlumb.setPosition(el, {
                        left: o.left + (linc * (idx + 1)),
                        top: o.top + (tinc * (idx + 1))
                    });
                    if (options.step != null) options.step(idx, Math.ceil(steps));
                    idx++;
                    if (idx >= steps) {
                        window.clearInterval(int);
                        if (options.complete != null) options.complete();
                    }
                }, step);
        },
        // DRAG/DROP
        destroyDraggable: function (el, category) {
            _getDragManager(this, category).destroyDraggable(el);
        },
        destroyDroppable: function (el, category) {
            _getDragManager(this, category).destroyDroppable(el);
        },
        initDraggable: function (el, options, category) {
            _getDragManager(this, category).draggable(el, options);
        },
        initDroppable: function (el, options, category) {
            _getDragManager(this, category).droppable(el, options);
        },
        isAlreadyDraggable: function (el) {
            return el._katavorioDrag != null;
        },
        isDragSupported: function (el, options) {
            return true;
        },
        isDropSupported: function (el, options) {
            return true;
        },
        isElementDraggable: function (el) {
            el = jsPlumb.getElement(el);
            return el._katavorioDrag && el._katavorioDrag.isEnabled();
        },
        getDragObject: function (eventArgs) {
            return eventArgs[0].drag.getDragElement();
        },
        getDragScope: function (el) {
            return el._katavorioDrag && el._katavorioDrag.scopes.join(" ") || "";
        },
        getDropEvent: function (args) {
            return args[0].e;
        },
        getUIPosition: function (eventArgs, zoom) {
            return {
                left: eventArgs[0].pos[0],
                top: eventArgs[0].pos[1]
            };
        },
        setDragFilter: function (el, filter, _exclude) {
            if (el._katavorioDrag) {
                el._katavorioDrag.setFilter(filter, _exclude);
            }
        },
        setElementDraggable: function (el, draggable) {
            el = jsPlumb.getElement(el);
            if (el._katavorioDrag)
                el._katavorioDrag.setEnabled(draggable);
        },
        setDragScope: function (el, scope) {
            if (el._katavorioDrag)
                el._katavorioDrag.k.setDragScope(el, scope);
        },
        setDropScope:function(el, scope) {
            if (el._katavorioDrop && el._katavorioDrop.length > 0) {
                el._katavorioDrop[0].k.setDropScope(el, scope);
            }
        },
        addToPosse:function(el, spec) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) {
                _el = [ jsPlumb.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.addToPosse.apply(dm, _el);
            });
        },
        removeFromPosse:function(el, posseId) {
            var specs = Array.prototype.slice.call(arguments, 1);
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) {
                _el = [ jsPlumb.getElement(_el) ];
                _el.push.apply(_el, specs );
                dm.removeFromPosse.apply(dm, _el);
            });
        },
        removeFromAllPosses:function(el) {
            var dm = _getDragManager(this);
            jsPlumb.each(el, function(_el) { dm.removeFromAllPosses(jsPlumb.getElement(_el)); });
        },
        dragEvents: {
            'start': 'start', 'stop': 'stop', 'drag': 'drag', 'step': 'step',
            'over': 'over', 'out': 'out', 'drop': 'drop', 'complete': 'complete',
            'beforeStart':'beforeStart'
        },
        animEvents: {
            'step': "step", 'complete': 'complete'
        },
        stopDrag: function (el) {
            if (el._katavorioDrag)
                el._katavorioDrag.abort();
        },
        addToDragSelection: function (spec) {
            _getDragManager(this).select(spec);
        },
        removeFromDragSelection: function (spec) {
            _getDragManager(this).deselect(spec);
        },
        clearDragSelection: function () {
            _getDragManager(this).deselectAll();
        },
        trigger: function (el, event, originalEvent, payload) {
            this.getEventManager().trigger(el, event, originalEvent, payload);
        },
        doReset:function() {
            // look for katavorio instances and reset each one if found.
            for (var key in this) {
                if (key.indexOf("_katavorio_") === 0) {
                    this[key].reset();
                }
            }
        }
    });

    var ready = function (f) {
        var _do = function () {
            if (/complete|loaded|interactive/.test(document.readyState) && typeof(document.body) != "undefined" && document.body != null)
                f();
            else
                setTimeout(_do, 9);
        };

        _do();
    };
    ready(_jp.init);

}).call(this);
