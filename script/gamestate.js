var Terminal = Terminal || {};
Terminal.GameState = (function(Terminal) {
"use strict";

var money = 100;
var cpu = 1;
var ram = 1;
var zombies = 0;
var servers = [];
var has_social_engineer = false;
var has_developer = false;

function update() {
    money += 100;
}

function addEmail(subject, body, onRead) {
    var item = $('<li>').addClass('email').appendTo('#emaillist');
    var onClick = function() {
        onRead();
        $('.emailbody', item).toggle();
        $('.emailsubject', item).removeClass('unread');
    }

    $('<div>')
        .addClass('emailsubject')
        .addClass('unread')
        .text(subject)
        .click(onClick)
        .appendTo(item);
    $('<div>')
        .addClass('emailbody')
        .text(body)
        .attr('style', 'display: none')
        .appendTo(item);
}

function init() {
    $('#money').html('$' + money);
    $('#cpu').html(cpu + ' core' + (cpu > 1 ? 's' : ''));
    $('#ram').html(ram + ' gb');

    // Set up some dummy data.
    var addServer = function() {
        var server = new Terminal.Server("TestServer");
        servers.push(server);
        Terminal.Render.update();
    }
    addEmail("@@@Introduction@@@",
             "@@@This email will introduce the player to the game," +
             " and potentially add the first server?@@@",
             addServer);
    
    var addGroup = function() {
        var firewall = new Terminal.Server("Firewall", true, false, null);
        var server = new Terminal.Server("MainServer", false, false, firewall);
        var group = new Terminal.ServerGroup("TestServerGroup", [firewall, server]);
        servers.push(group);
        Terminal.Render.update();
    }
    addEmail("@@@Server Group@@@",
             "@@@This email adds a server group@@@",
             addGroup);
}

return {
    "servers": servers,
    "init": init
};

})(Terminal);
