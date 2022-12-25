                               // ФУНКЦИЯ СОЗДАНИЯ ЭЛЕМЕНТОВ
    function createElement (html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.firstElementChild;
    };