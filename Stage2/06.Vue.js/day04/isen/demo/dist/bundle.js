(() => {
  "use strict";
  !(function () {
    let o = [];
    for (let t = 0; t < 10; t++)
      o[t] = function () {
        console.log(t);
      };
    o[2]();
  })();
})();
