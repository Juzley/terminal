var Terminal = Terminal || {};
Terminal.Main = (function(Terminal) {
"use strict";

(function () {
    window.addEventListener("load", function() {
        Terminal.GameState.init();
    });
})();
})(Terminal);
