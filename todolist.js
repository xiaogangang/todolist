window.addEventListener('load',function () {
    let tab = document.querySelectorAll('.tab>li');
    let prev = 0;
    let type;
    let content = document.querySelector('.content');
    let todolist = [
        {
            id:1, content:'哒哒哒哒哒哒', time:'2019/6/4', status:false
        },
        {
            id:2, content:'哦的欧克', time:'2019/6/4', status:true
        },
        {
            id:3, content:'在一个际遇下', time:'2019/6/4', status:true
        },
        {
            id:4, content:'端午来了', time:'2019/6/4', status:false
        },
    ];

    // let str = localStorage.getItem('todolist');
    // if(!str){
    //     saveData();
    //     str = localStorage.getItem('todolist');
    // }
    // todolist = JSON.parse(str);
    //
    // function saveDate(){
    //     localStorage.setItem('todolist',JSON.stringify(todolist));
    // }


    tab.forEach(function (elem,index) {
        elem.onclick = function () {
            tab[prev].classList.remove('hot');
            this.classList.add('hot');
            prev = index;
            type = this.getAttribute('type');
            render(filterData(type));
        }
    });
    tab[0].onclick();
    content.onclick = function (e) {
        let target = e.target;
        let id = target.parentNode.id;
        if(target.nodeName === 'INPUT'){
            let elem = todolist.filter(elem=>elem.id == id)[0];
            elem.status = target.checked;
        }else if(target.nodeName === 'DEL'){
            let index = todolist.findIndex(elem=>elem.id == id);
            todolist.splice(index,1);
        }
        render(filterData(type));
    }


    function filterData(){
        let arr = [];
        switch (type) {
            case 'all':
                arr = todolist;
                break;
            case 'done':
                // arr = todolist.filter(function (elem) {
                //     return elem.status;
                // })
                arr = todolist.filter(elem=>elem.status);
                break;
            case 'doing':
                // arr = todolist.filter(function (elem) {
                //     return !elem.status;
                // })
                arr = todolist.filter(elem=>!elem.status);
                break;
        }
        return arr;
    }

    //渲染列表

    render(todolist);
    function render(arr) {
        let html =  ``;
        arr.forEach(function (elem) {
            if(elem.status){
                html +=`
                    <li id="${elem.id}">
                        <input type="checkbox" checked><p>${elem.content}</p><del>×</del><time>${elem.time}</time>
                    </li>                
                `;
            }else{
                html +=`
                    <li id="${elem.id}">
                        <input type="checkbox" ><p>${elem.content}</p><del>×</del><time>${elem.time}</time>
                    </li>                
                `;
            }
        })
        content.innerHTML = html;
    }

    let checkboxs = document.querySelectorAll('input[type=checkbox]');
    console.log(checkboxs);
    checkboxs.forEach(elem=>{
        elem.onclick = function () {
            let id = this.parentElement.id;
            let arr = todolist.filter(elem=>elem.id==id)[0];
            arr.status = !arr.status;
        }
    })

    let form = document.myform;
    let button = document.querySelector('input[type=submit]');
    let mess = document.querySelector('input[type=text]');

    button.onclick = function (e) {
        e.preventDefault();
        let obj = createObj();
        todolist.push(obj);
        form.reset();
        render(filterData(type));
    }

    function createObj() {
        let content = mess.value;
        let id = todolist[todolist.length-1].id + 1;
        let status = false;
        let time = new Date().toLocaleDateString();
        return {id,content,time,status}
    }

})
