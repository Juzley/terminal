var Terminal = Terminal || {};
Terminal.Email = {
    intro: {
        subject: "Introduction email",
        body: "This email will introduce the player to the game",
        onRead: function() {
            Terminal.GameState.addServer(new Terminal.Server("TestServer"));
        }
    },

    software_engineer: {
        subject: "Software Engineer email",
        body: "This email will introduce the software engineer",
        onRead: function() {
            Terminal.GameState.addSoftwareEngineer();
        }
    },

    group: {
        subject: "Server group email",
        body: "This email adds a server group",
        onRead: function() {
            var firewall = new Terminal.Server(
                                    "Firewall", { requires_hack: true });
            var server = new Terminal.Server(
                                    "MainServer", { firewall: firewall });
            var group = new Terminal.ServerGroup(
                                    "TestServerGroup", [firewall, server]);
            Terminal.GameState.addServer(group);
        }
    },
};
