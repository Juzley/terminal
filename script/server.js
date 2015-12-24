var Terminal = Terminal || {};
Terminal.Server = function(name, options) {
    this.name = name || "";
    this.accessed = false;
    this.hack_screen = null;
    this.password_known = false;

    options = options || {};
    
    this.requires_hack = 'requires_hack' in options ?
        options['requires_hack'] : false;

    this.requires_password = 'requires_password' in options ?
        options['requires_password'] : false;

    this.requires_social_engineer = 'requires_social_engineer' in options ?
        options['requires_social_engineer'] : false;

    this.firewall = 'firewall' in options ?
        options['firewall'] : null;
};

Terminal.Server.prototype.onAccess = function() {
    if (this.accessed) {
        return;
    }

    if (this.firewall !== null && !this.firewall.accessed) {
        // Have to disable the firewall first.
        $('.popup').empty().show()
            .append($('<p>').text('@@@Firewall Text@@@'))
            .append($('<a>')
                .text('OK').click(function() { $('.popup').hide(); }));
        return;
    }

    if (this.requires_social_engineer && !this.password_known) {
        // Need the social engineer to get the password
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
};

Terminal.Server.prototype.onHack = function() {
    if (this.requires_hack) {
        this.requires_hack = false;
        this.accessed = true;
    }
};


Terminal.ServerGroup = function(name, servers) {
    this.name = name || "";
    this.servers = servers || [];
};
