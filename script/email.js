var Terminal = Terminal || {};
Terminal.Email = function(subject, body, onRead) {
    this.subject = subject || "";
    this.body = body || "";
    this.read = false;
    this.onRead = onRead || null;
}

Terminal.Email.prototype.onRead = function() {
    if (!this.read) {
        this.read = true;
        if (this.onRead !== null) {
            this.onRead();
        }
    }
};
