(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : (global.keeper = factory());
}(this, function () {
  var listeners = new Array();
  var constant = new Object();


  //注册
  function register(listener, event, fn) {
    if (isConstantExist(event)) {
      listeners.push({
        listener: listener,
        event: event,
        fn: fn
      });
    } else {
      constant[event] = event + "vue";
      register(listener, event, fn);
    }
  }

  //注销
  function unRegister(listener) {
    var size = listeners.length - 1;
    for (var i = size; i >= 0; i--) {
      if (listener == listeners[i].listener) {
        listeners.splice(i, 1);
      }
    }
  }


  function eachUnRegister() {
    var temp = [];
    listeners.forEach(function (item) {
      if (!item.once) {
        temp.push(item);
      }
    });
    listeners = temp;
  }

  function onceNotify(event, info, delay) {
    if (isConstantExist(event)) {
      if (typeof delay == "undefined") {
        delay = 0;
      }
      setTimeout(
        function () {
          for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].event == event) {
              if (listeners[i].fn && typeof listeners[i].fn === 'function') {
                listeners[i].fn(event,info);
                listeners[i].once = true;
              }
            }
          }
          eachUnRegister();
        },
        delay
      );
    }
  }
  /**
   * 执行通知
   * 参数:event 事件名   类型:constant常量
   * 参数:info  事件数据 类型:Object
   * 参数:delay 延迟执行时间 类型:int
   * 返回值类型:无
   */
  function doNotify(event, info, delay) {
    if (isConstantExist(event)) {
      if (typeof delay == "undefined") {
        delay = 0;
      }
      setTimeout(
        function () {
          for (var i = 0; i < listeners.length; i++) {
            if (listeners[i].event == event) {
              if (listeners[i].fn && typeof listeners[i].fn === 'function') {
                listeners[i].fn(event,info);
              }
            }
          }
        },
        delay
      );

    } else {
      //事件未定义
      console.error("doNotify event is not exist:" + event);
    }
  }

  //检查常量是否定义
  function isConstantExist(key) {
    var isExist = false;
    for (var item in constant) {
      if (key == item) {
        isExist = true;
      }
    }
    return isExist;
  }


  var keeperInstall = function (Vue) {
    var keeper = {
      on: register,
      off: unRegister,
      emit: doNotify,
      once: onceNotify
    }

    Vue.prototype.keeper = keeper;
    Vue.keeper = keeper;
  }

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(keeperInstall);
  }

  return keeperInstall;
}));