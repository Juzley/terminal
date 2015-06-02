function Email(subject, body, onRead) {
    this.subject = subject || "";
    this.body = body || "";
    this.read = false;

    self = this;
    this.onRead = function() {
        if (!self.read) {
            self.read = true;
            if (onRead) {
                onRead();
            }
        }
    }
};
