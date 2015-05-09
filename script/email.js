function Email(subject, text, onRead) {
    this.subject = subject || "";
    this.text = text || "";
    this.read = false;

    self = this;
    this.onRead = function() {
        self.read = true;
        if (onRead) { onRead(); }
    }
};
