// Accordions
export function accordion(parent, triggers, content) {
    Array.from(parent.querySelectorAll(triggers)).forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (trigger.classList.contains('active')) {
                trigger.classList.remove('active');
                trigger.parentElement.querySelector(content).classList.remove('active');
            } else {
                for (let item of document.querySelectorAll(triggers)) {
                    item.classList.remove('active');
                }
                for (let item of document.querySelectorAll(content)) {
                    item.classList.remove('active');
                }
                trigger.classList.add('active');
                trigger.parentElement.querySelector(content).classList.add('active');
            }
        });
    });
}

// Dropdown
export function dropDown(parent, triggers, content) {
    Array.from(parent.querySelectorAll(triggers)).forEach(trigger => {
        trigger.addEventListener('click', () => {
            Array.from(trigger.querySelectorAll('span')).forEach(text => {
                text.classList.toggle('hidden');
            });
            
            if (trigger.classList.contains('active')) {
                trigger.classList.remove('active');
                trigger.parentElement.querySelector(content).classList.remove('active');
            } else {
                trigger.classList.add('active');
                trigger.parentElement.querySelector(content).classList.add('active');
            }
        });
    });
}