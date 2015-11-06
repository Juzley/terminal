var Terminal = Terminal || {};
Terminal.GameState = (function(Terminal) {
"use strict";

var money = 100;
var cpu = 1;
var ram = 1;
var zombies = 0;
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
        var server = new Terminal.Server("TestServer");
        servers.push(server);
        Terminal.Render.update();
    }
    var email = new Terminal.Email("Subject", "Body", addServer);
    emails.push(email);

    var addGroup = function() {
        var firewall = new Terminal.Server("Firewall", true, false, null);
        var server = new Terminal.Server("MainServer", false, false, firewall);
        var group = new Terminal.ServerGroup("TestServerGroup", [firewall, server]);
        servers.push(group);
        Terminal.Render.update();
    }
    email = new Terminal.Email("Subject 2", "Body 2", addGroup);
    emails.push(email);

    Terminal.Render.update();
}

return {
    "money": money,
    "cpu": cpu,
    "ram": ram,
    "emails": emails,
    "servers": servers,
    "init": init
};

})(Terminal);
