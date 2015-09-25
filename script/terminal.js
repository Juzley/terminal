var Terminal = {
    init: function() {
        var main = $('#main');
        $('<div>').attr('id', 'money').appendTo(main);
        $('<div>').attr('id', 'emails').appendTo(main);
        $('<div>').attr('id', 'servers').appendTo(main);
        
        GameState.init();
        this.refresh();
    },

    refresh: function() {
        $('#money').text("$" + GameState.money);

        $('#emails').empty();
        $('<h1>').text('Email').appendTo('#emails');
        for (var i = 0; i < GameState.emails.length; i++) {
            email = GameState.emails[i];
            $('<div>')
                .addClass('email')
                .text(email.subject + "-" + email.body)
                .click(email.onRead)
                .appendTo('#emails');
        }

        $('#servers').empty();
        $('<h1>').text('Servers').appendTo('#servers');
        for (var i = 0; i < GameState.servers.length; i++) {
            server = GameState.servers[i];
            if (server instanceof ServerGroup) {
                $('<div>')
                    .addClass('servergroup')
                    .text(server.name)
                    .appendTo('#servers');
            } else {
                $('<div>')
                    .addClass('server')
                    .text(server.name)
                    .click(server.onAccess)
                    .appendTo('#servers');
            }
        }
    }
};

$(function() {
    Terminal.init();
});
