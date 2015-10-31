var Terminal = Terminal || {};
Terminal.Render = (function(Terminal, $) {
"use strict";

function update() {
    $('#emaillist').empty();
    var emails = Terminal.GameState.emails;
    for (var i = 0; i < emails.length; i++) {
        var email = emails[i];
        var emailItem = $('<li>')
            .addClass('email')
            .appendTo('#emaillist');

        var onClick = function(_email, _item) {
            return function() {
                _email.onRead();
                $('.emailbody', _item).toggle();
                $('.emailsubject', _item).removeClass('unread')
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
            .attr('style', 'display: none')
            .appendTo(emailItem);
    }

    $('#serverlist').empty();
    var servers = Terminal.GameState.servers;
    for (var i = 0; i < servers.length; i++) {
        if (servers[i] instanceof ServerGroup) {
            var group = servers[i];
            var toggleVis = function (_group) {
                return function() {
                    $('#' + _group.name + ' div.servers').toggle();
                }
            }(group);

            var groupItem = $('<li>')
                    .addClass('servergroup')
                    .attr('id', group.name)
                    .text(group.name)
                    .click(toggleVis)
                    .appendTo('#serverlist');
            var serversDiv = $('<div>')
                            .addClass('servers')
                            .attr('style', 'display: none')
                            .appendTo(groupItem);
    
            for (var j = 0; j < group.servers.length; i++) {
                var server = group.servers[i];
                $('<div>')
                    .addClass('server')
                    .text(server.name)
                    .click(server.onAccess)
                    .appendTo(serversDiv);
            }
        } else {
            $('<li>')
                .addClass('server')
                .text(servers[i].name)
                .click(servers[i].onAccess)
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

