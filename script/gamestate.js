var GameState = {
    init: function() {
        this.money = 100;
        this.cpu_level = 1;
        this.ram_level = 1;
        this.emails = [];
        this.servers = [];
        this.has_social_engineer = false;
        this.has_developer = false;

        // Set up some dummy data.
        addServer = function() {
            var server = new Server("Test Server");
            GameState.servers.push(server);
            Render.addServer(server);
        }
        var email = new Email("Test", "Test", addServer);
        this.emails.push(email);
        Render.addEmail(email);

        email = new Email("Test2", "Test2");
        this.emails.push(email);
        Render.addEmail(email);
    },

    update: function() {
        this.money += 100;
    }
};
