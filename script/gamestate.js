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
            GameState.servers.push(new Server("Test Server"));
            Terminal.refresh();
        }
        this.emails.push(new Email("Test", "Test", addServer));
        this.emails.push(new Email("Test2", "Test2"));
    },

    update: function() {
        this.money += 100;
        Terminal.refresh();
    }
};
