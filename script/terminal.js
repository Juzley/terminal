var Terminal = Terminal || {};
Terminal.Main = (function(Terminal) {
"use strict";

(function () {
    window.addEventListener("load", function() {
        Terminal.Render.init();
        Terminal.GameState.init();
    });
})();
})(Terminal);
