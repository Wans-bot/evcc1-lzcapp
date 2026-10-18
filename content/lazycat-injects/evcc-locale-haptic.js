/**
 * 懒猫微服适配脚本（browser 阶段 inject，不修改上游镜像与上游源码）
 *
 * 1) 界面语言
 *    evcc 前端用文档的 <html lang> 推导默认语言（assets/js/i18n.ts：只有长度等于 2 的
 *    lang 才被采用，否则回退 en），而服务端 HTML 固定输出 <html lang="en">，
 *    因此浏览器语言为中文时界面仍然显示英文。这里按浏览器语言补写 evcc 自己的偏好键
 *    localStorage["settings_locale"]，取值必须是它 LOCALES 里的 "zh-Hans"。
 *    只在该键为空时写入，用户手动切换过的语言不会被覆盖。
 *
 * 2) 触感反馈
 *    上游 assets/js/utils/haptic.ts 注释写明“原生 App 会 shim navigator.vibrate”，
 *    路由切换时会调用它。浏览器在发生用户手势之前调用 navigator.vibrate 会被策略拦截，
 *    控制台出现 "Blocked call to navigator.vibrate" 报错。这里只在尚无手势时静默跳过，
 *    手势之后仍调用真实实现，不改变正常的触感行为。
 */
(function () {
  "use strict";

  try {
    var KEY = "settings_locale";
    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    var preferZh = langs.some(function (l) {
      return /^zh\b/i.test(String(l || ""));
    });
    if (preferZh && !window.localStorage.getItem(KEY)) {
      window.localStorage.setItem(KEY, "zh-Hans");
    }
  } catch (e) {
    /* 隐私模式等场景下 localStorage 不可用，保持 evcc 默认行为 */
  }

  try {
    var nativeVibrate = navigator.vibrate && navigator.vibrate.bind(navigator);
    if (nativeVibrate) {
      var hasGesture = false;
      var mark = function () {
        hasGesture = true;
      };
      ["pointerdown", "touchstart", "keydown"].forEach(function (type) {
        window.addEventListener(type, mark, { once: true, capture: true });
      });
      navigator.vibrate = function () {
        if (!hasGesture) return false;
        try {
          return nativeVibrate.apply(null, arguments);
        } catch (e) {
          return false;
        }
      };
    }
  } catch (e) {
    /* 忽略：不因适配脚本影响页面其它逻辑 */
  }
})();
