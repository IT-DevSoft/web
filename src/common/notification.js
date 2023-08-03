export class Notification {

    constructor(duration) {
        this.duration = duration;
        this.id = 0;
    }

    show(message) {
        clearTimeout(this.id);

        const rooBlock = document.getElementById("root");
        const block_id = "notification_block";

        const notifiBlock = document.getElementById(block_id);

        if (notifiBlock) {
            rooBlock.removeChild(notifiBlock);
        }

        const notifi = document.createElement('div');
        const notifiMessage = document.createElement('p');

        notifi.classList.add("notification", "ui", "negative", "message");
        notifi.setAttribute("id", block_id);
        notifiMessage.innerText = message;

        notifi.appendChild(notifiMessage);
        rooBlock.appendChild(notifi);

        notifi.classList.add("show");

        this.id = setTimeout(() => {
            const notifiBlock = document.getElementById(block_id);
            if (notifiBlock) {
                notifiBlock.classList.add("remove");
            }
        }, this.duration)
    }
}