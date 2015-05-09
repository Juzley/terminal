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
        $('#money').text(GameState.money);

        for (var i = 0; i < GameState.emails.length; i++) {
            email = GameState.emails[i];
            $('<div>')
                .addClass('email')
                .text(email.subject)
                .click(email.onRead)
                .appendTo('#emails');
        }

        for (var i = 0; i < GameState.servers.length; i++) {
            server = GameState.servers[i];
            $('<div>')
                .addClass('server')
                .text(server.hostname)
                .appendTo('#servers');
        }
    }
};

$(function() {
    Terminal.init();
});
