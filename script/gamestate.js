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
        if ($('.emailsubject', item).hasClass('unread')) {
            onRead();
        }
        $('.emailbody', item).toggle();
        $('.emailsubject', item).removeClass('unread');
    };

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

function addServer(server) {
    servers.push(server);

    if (server instanceof Terminal.ServerGroup) {
        var toggleVis = function(ev) {
            if (this === ev.target) {
                $('#' + server.name + ' ul.servers').toggle();
            }
        };

        var item = $('<li>')
            .addClass('servergroup')
            .attr('id', server.name)
            .text(server.name)
            .click(toggleVis)
            .appendTo('#serverlist');
        var children = $('<ul>')
            .addClass('servers')
            .attr('style', 'display: none')
            .appendTo(item);

        for (var i = 0; i < server.servers.length; i++) {
            var child = server.servers[i];
            var accessChild = function(_server) {
                return function() {
                    _server.onAccess();
                };
            }(child);

            $('<li>')
                .addClass('server')
                .text(child.name)
                .click(accessChild)
                .appendTo(children);
        }
    } else {
        var accessServer = function() {
            server.onAccess();
        };

        $('<li>')
            .addClass('server')
            .text(server.name)
            .click(accessServer)
            .appendTo('#serverlist');
    }
}

function init() {
    $('#money').html('$' + money);
    $('#cpu').html(cpu + ' core' + (cpu > 1 ? 's' : ''));
    $('#ram').html(ram + ' gb');

    addEmail(Terminal.Email.intro.subject,
             Terminal.Email.intro.body,
             Terminal.Email.intro.onRead);
    addEmail(Terminal.Email.group.subject,
             Terminal.Email.group.body,
             Terminal.Email.group.onRead);
}

return {
    "addEmail": addEmail,
    "addServer": addServer,
    "init": init
};

})(Terminal);
