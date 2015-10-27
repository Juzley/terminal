var Terminal = Terminal || {};
Terminal.Render = (function(Terminal, $) {
"use strict";

function update() {
    $('#emails').empty();
    var emails = Terminal.GameState.emails;
    for (var i = 0; i < emails.length; i++) {
        var email = emails[i];
        var emailDiv = $('<div>')
            .addClass('email')
            .appendTo('#emails');

        var onClick = function(_email, _div) {
            return function() {
                _email.onRead();
                $('.emailbody', _div).toggle();
                $('.emailsubject', _div).removeClass('unread')
            }
        }(email, emailDiv);

        $('<div>')
            .addClass('emailsubject')
            .addClass('unread')
            .text(email.subject)
            .click(onClick)
            .appendTo(emailDiv);
        $('<div>')
            .addClass('emailbody')
            .text(email.body)
            .attr('hidden', true)
            .appendTo(emailDiv);
    }

    $('#servers').empty();
    var servers = Terminal.GameState.servers;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i] instanceof ServerGroup) {
            var group = servers[i];
            var toggleVis = function (_group) {
                return function() {
                    $('#' + _group.name + ' div.servers').toggle();
                }
            }(group);

            var groupDiv = $('<div>')
                    .addClass('servergroup')
                    .attr('id', group.name)
                    .text(group.name)
                    .click(toggleVis)
                    .appendTo('#servers');
            var serversDiv = $('<div>')
                            .addClass('servers')
                            .attr('hidden', true)
                            .appendTo(groupDiv);
    
            for (var j = 0; j < group.servers.length; i++) {
                var server = group.servers[i];
                $('<div>')
                    .addClass('server')
                    .text(server.name)
                    .click(server.onAccess)
                    .appendTo(serversDiv);
            }
        } else {
            $('<div>')
                .addClass('server')
                .text(servers[i].name)
                .click(servers[i].onAccess)
                .appendTo('#servers');
        }
    }
}

function init() {
    var main = $('#main');
    $('<div>').attr('id', 'money').appendTo(main);

    $('<div>').attr('id', 'emails').appendTo(main);
    $('<h1>').text('Email').appendTo('#emails');

    $('<div>').attr('id', 'servers').appendTo(main);
    $('<h1>').text('Servers').appendTo('#servers');
}

return {
    "update": update,
    "init": init
};

})(Terminal, $);

