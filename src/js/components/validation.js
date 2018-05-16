export function validateName(target) {
    const name = target;
    const re = /^[a-zA-Z]{3,20}$/;
    
    if (!re.test(name.value)) {
        name.classList.add('error');
    } else {
        name.classList.remove('error');
        return true;
    }
}

export function validateEmail(target) {
    const email = target;
    const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    
    if (!re.test(email.value)) {
        email.classList.add('error');
    } else {
        email.classList.remove('error');
        return true;
    }
}

export function validatePhone(target) {
    const phone = target;
    const re = /^(\+7|\+8|7|8)+\(?\d{3}\)?\d{3}\-?\d{2}-?\d{2}$/;
    
    if (!re.test(phone.value)) {
        phone.classList.add('error');
    } else {
        phone.classList.remove('error');
        return true;
    }
}