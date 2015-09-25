function Server(name, requires_hack, requires_password, firewall) {
    this.name = name || "";
    this.accessed = false;
    this.requires_hack = requires_hack || false; 
    this.requires_password = requires_password || false;
    this.password_known = false;
    this.firewall = firewall || null;

    self = this;
    this.onAccess = function() {
        if (self.accessed) {
            return;
        }

        if (!self.firewall && self.filewall.accessed) {
            // Have to disable the firewall first.
            return;
        }

        if (self.requires_password && !self.password_known) {
            // Need a password that we don't have.
            return;
        }

        if (self.requires_hack) {
            // Need to trigger the hacking screen.
        }
    }
}


function ServerGroup(name, servers) {
    this.name = name || "";
    this.servers = servers || [];
}
