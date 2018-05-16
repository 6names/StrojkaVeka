export const modalHolder = document.getElementById('modal-holder');

// Scrollbar width
function getScrollBarWidth() {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    
    document.body.appendChild(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    
    return w1 - w2;
}

// Get modal
export function getModal(target, callBack) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', target, true);
    
    xhr.onload = function () {
        if (this.status === 200) {
            modalHolder.innerHTML = `
                <div class="modal" tabindex="-1">
                    <div class="modal__row">
                        <div class="modal__cell">
                            ${this.responseText}
                            <div class="modal__close modal__close_wide"></div>
                        </div>
                    </div>
                </div>
            `;
            modalHolder.classList.add('modal-holder_active');
            document.body.classList.add('modal-open');
            document.body.style.paddingRight = `${getScrollBarWidth()}px`;
            
            callBack();
        }
    };
    
    xhr.send();
}

// Remove modal
export function removeModal() {
    document.querySelector('.modal').remove();
    modalHolder.classList.remove('modal-holder_active');
    document.body.classList.remove('modal-open');
    document.body.removeAttribute('style');
}