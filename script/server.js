function Server(hostname) {
    this.hostname = hostname || "";
};

function ServerGroup(name, servers) {
    this.name = name || "";
    this.servers = servers || [];
}
