var Terminal = Terminal || {};
Terminal.Render = (function(Terminal, $) {
"use strict";

function addEmail(email) {
    var emailDiv = $('<div>')
        .addClass('email')
        .appendTo('#emails');

    var onClick = function() {
        email.onRead();
        $('.emailbody', emailDiv).toggle();
        $('.emailsubject', emailDiv).removeClass('unread')
    }

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

function addServer(server) {
    $('<div>')
        .addClass('server')
        .text(server.name)
        .click(server.onAccess)
        .appendTo('#servers');
}

function addServerGroup(group) {
    var toggleVis = function () {
        $('#' + group.name + ' div.servers').toggle();
    }

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
    
    for (var i = 0; i < group.servers.length; i++) {
        var server = group.servers[i];
        $('<div>')
            .addClass('server')
            .text(server.name)
            .click(server.onAccess)
            .appendTo(serversDiv);
    }
}

function update() {
    console.log(Terminal.GameState.emails);
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
    "addEmail": addEmail,
    "addServer": addServer,
    "addServerGroup": addServerGroup,
    "update": update,
    "init": init
};

})(Terminal, $);

