var Terminal = Terminal || {};
Terminal.Render = (function(Terminal, $) {
"use strict";

function update() {
    $('#money').html('$' + Terminal.GameState.money);
    $('#cpu').html(Terminal.GameState.cpu + ' core' +
                   (Terminal.GameState.cpu > 1 ? 's' : ''));
    $('#ram').html(Terminal.GameState.ram + ' gb');

    $('#emaillist').empty();
    var emails = Terminal.GameState.emails;
    for (var i = 0; i < emails.length; i++) {
        var email = emails[i];
        var emailItem = $('<li>')
            .addClass('email')
            .appendTo('#emaillist');

        var onClick = function(_email, _item) {
            return function() {
                _email.read();
                $('.emailbody', _item).toggle();
                $('.emailsubject', _item).removeClass('unread');
            }
        }(email, emailItem);

        $('<div>')
            .addClass('emailsubject')
            .addClass('unread')
            .text(email.subject)
            .click(onClick)
            .appendTo(emailItem);
        $('<div>')
            .addClass('emailbody')
            .text(email.body)
            //.attr('style', 'display: none')
            .appendTo(emailItem);
    }

    $('#serverlist').empty();
    var servers = Terminal.GameState.servers;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i] instanceof Terminal.ServerGroup) {
            var group = servers[i];
            var toggleVis = function (_group) {
                return function(e) {
                    if (this === e.target) {
                        $('#' + _group.name + ' ul.servers').toggle();
                    }
                }
            }(group);

            var groupItem = $('<li>')
                    .addClass('servergroup')
                    .attr('id', group.name)
                    .text(group.name)
                    .click(toggleVis)
                    .appendTo('#serverlist');
            var serversList = $('<ul>')
                .addClass('servers')
                .attr('style', 'display: none')
                .appendTo(groupItem);
    
            for (var j = 0; j < group.servers.length; j++) {
                var server = group.servers[j];
                var accessServer = function(_server) {
                    return function() {
                        _server.onAccess();
                    }
                }(server);

                $('<li>')
                    .addClass('server')
                    .text(server.name)
                    .click(accessServer)
                    .appendTo(serversList);
            }
        } else {
            var accessServer = function(_server) {
                return function() {
                    _server.onAccess();
                }
            }(servers[i]);

            $('<li>')
                .addClass('server')
                .text(servers[i].name)
                .click(accessServer)
                .appendTo('#serverlist');
        }
    }
}

function init() {
}

return {
    "update": update,
    "init": init
};

})(Terminal, $);

