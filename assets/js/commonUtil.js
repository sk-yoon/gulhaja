const g_showContent = 5;
const g_maxButtonCount = 10;

var g_eBookMaxPage = 0;
var g_writerMaxPage = 0;

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

const renderButton = (page, objName) => {
    const buttons = document.querySelector("#" + objName);
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    if (objName == "eBookPage") {
        for (let id = page; id < page + g_maxButtonCount && id <= g_eBookMaxPage; id++) {
            buttons.appendChild(makeButton(id, buttons, objName));
        }
    } else if (objName == "writersPage") {
        for (let id = page; id < page + g_maxButtonCount && id <= g_writerMaxPage; id++) {
            buttons.appendChild(makeButton(id, buttons, objName));
        }
    }
    
    let next = document.createElement("button");
    next.classList.add("button", "next");
    next.innerHTML = '&gt;&gt;';
    next.addEventListener("click", goNextPage);

    const prev = document.createElement("button");
    prev.classList.add("button", "prev");
    prev.innerHTML = '&lt;&lt;';
    prev.addEventListener("click", goPrevPage);
    
    // 첫 버튼 활성화(class="active")
    buttons.children[0].classList.add("active");

    buttons.prepend(prev);
    buttons.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - g_maxButtonCount < 1) buttons.removeChild(prev);
    if (page + g_maxButtonCount > g_eBookMaxPage) buttons.removeChild(next);
};

const makeButton = (id, buttons, objName) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
        Array.prototype.forEach.call(buttons.children, (button) => {
            if (button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");

        if(objName == "eBookPage") {
            getEbookList(id);
        } else if (objName == "writersPage") {
            getWriter(id);
        }
    });
    return button;
};
  
const goPrevPage = (e) => {
    let parent = e.target.parentElement;
    l_curPageNo = Number(parent.getAttribute("curPageNo")) - g_maxButtonCount;
    parent.setAttribute("curPageNo", l_curPageNo);

    render(l_curPageNo, e.target.parentElement.id);
};

const goNextPage = (e) => {
    let parent = e.target.parentElement;
    l_curPageNo = Number(parent.getAttribute("curPageNo")) + g_maxButtonCount;
    parent.setAttribute("curPageNo", l_curPageNo);

    render(l_curPageNo, parent.id);
};

const render = (page, objName) => {
    renderButton(page, objName);

    if(objName == "eBookPage") {
        getEbookList(page);
    } else if (objName == "writersPage") {
        getWriter(page);
    }
};
