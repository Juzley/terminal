var Render = {
    init: function() {
        var main = $('#main');
        $('<div>').attr('id', 'money').appendTo(main);

        $('<div>').attr('id', 'emails').appendTo(main);
        $('<h1>').text('Email').appendTo('#emails');

        $('<div>').attr('id', 'servers').appendTo(main);
        $('<h1>').text('Servers').appendTo('#servers');
    },

    addEmail: function(email) {
        $('<div>')
            .addClass('email')
            .text(email.subject + "-" + email.body)
            .click(email.onRead)
            .appendTo('#emails');
    },

    addServer: function(server) {
        $('<div>')
            .addClass('server')
            .text(server.name)
            .click(server.onAccess)
            .appendTo('#servers');
    },

    toggleServerGroup: function(group) {
        
    }

    addServerGroup: function(group) {
        groupDiv = $('<div>')
                        .addClass('servergroup')
                        .text(group.name)
                        .appendTo('#servers');
        for (var i = 0; i < group.servers.length; i++) {
            server = group.servers[i];
            $('<div>')
                .addClass('server')
                .text(server.name)
                .click(server.onAccess)
                .appendTo(groupDiv);
        }
    }
};
