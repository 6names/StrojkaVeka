(function uiIcons() {
    const icons = document.getElementById('ui-icons');
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'images/ui/ui-icons.svg', true);
    
    xhr.onload = function () {
        if (this.status === 200) {
            icons.innerHTML = this.responseText;
        }
    };
    
    xhr.send();
})();

/*
(function uiIcons() {
    const icons = document.getElementById('ui-icons');
    fetch('../images/ui/ui-icons.svg').then(res => {
        return res.text();
    }).then(data => {
        icons.innerHTML = data;
    })
})();*/
