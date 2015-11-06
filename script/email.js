var Terminal = Terminal || {};
Terminal.Email = function(subject, body, onRead) {
    this.subject = subject || "";
    this.body = body || "";
    this.unread = true;
    this.onRead = onRead || null;
}

Terminal.Email.prototype.read = function() {
    if (this.unread) {
        this.unread = false;
        if (this.onRead !== null) {
            this.onRead();
        }
    }
};
