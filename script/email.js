function Email(subject, body, onRead) {
    this.subject = subject || "";
    this.body = body || "";
    this.read = false;

    var self = this;
    this.onRead = function() {
        if (!self.read) {
            self.read = true;
            if (onRead) {
                onRead();
            }
        }
    }
};
