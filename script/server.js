var Terminal = Terminal || {};
Terminal.Server = function(name, requires_hack, requires_password, firewall) {
    this.name = name || "";
    this.accessed = false;
    this.requires_hack = requires_hack || false; 
    this.requires_password = requires_password || false;
    this.password_known = false;
    this.firewall = firewall || null;
    this.hack_screen = null;
}

Terminal.Server.prototype.onAccess = function() {
    if (this.accessed) {
        return;
    }

    if (this.firewall !== null && !this.firewall.accessed) {
        // Have to disable the firewall first.
        $('.popup').empty().show()
            .append($('<p>').text('@@@Firewall Text@@@'))
            .append($('<a>')
                .text('OK').click(function() { $('.popup').hide() }));
        return;
    }

    if (this.requires_password && !this.password_known) {
        // Need a password that we don't have.
        return;
    }

    if (this.requires_hack) {
        // Need to trigger the hacking screen.
        this.hack_screen = new Terminal.Hacks.PasswordGuess(this);
        this.hack_screen.start();
    }
}

Terminal.Server.prototype.onHack = function() {
    if (this.requires_hack) {
        this.requires_hack = false;
        this.accessed = true;
    }
}


Terminal.ServerGroup = function(name, servers) {
    this.name = name || "";
    this.servers = servers || [];
}
