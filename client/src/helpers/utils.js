import { useState, useEffect } from "react";
export function Debounce(fn, delay) {
  const [state, setState] = useState(null);
  useEffect(function () {
    setState(() => {
      let timer;
      return function () {
        let context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, delay);
      };
    });
  }, []);
  return state;
}

export function Throttle(context, func, delay) {
  const [state, setState] = useState(null);
  useEffect(function () {
    setState(function () {
      let lastCall = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          func.apply(context, args);
        }
      };
    });
  }, []);
  return state;
}
export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return jsonPayload;
}
