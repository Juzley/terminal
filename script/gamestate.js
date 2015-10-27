var Terminal = Terminal || {};
Terminal.GameState = (function(Terminal) {
"use strict";

var money = 100;
var money = 100;
var cpu_level = 1;
var ram_level = 1;
var emails = [];
var servers = [];
var has_social_engineer = false;
var has_developer = false;

function update() {
    money += 100;
}

function init() {
    // Set up some dummy data.
    var addServer = function() {
        var server = new Server("TestServer");
        servers.push(server);
        Terminal.Render.update();
    }
    var email = new Email("Subject", "Body", addServer);
    emails.push(email);

    var addGroup = function() {
        var firewall = new Server("Firewall", true, false, null);
        var server = new Server("MainServer", false, false, firewall);
        var group = new ServerGroup("TestServerGroup", [firewall, server]);
        servers.push(group);
        Terminal.Render.update();
    }
    email = new Email("Subject 2", "Body 2", addGroup);
    emails.push(email);

    Terminal.Render.update();
}

return {
    "emails": emails,
    "servers": servers,
    "init": init
};

})(Terminal);
