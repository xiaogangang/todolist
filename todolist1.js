$(function () {
    let lis = $('nav > ul >li');
    let content = $('.content');

    let todolist = [
        {id:1, content:'哒哒哒哒哒哒', time:'2019/6/4', status:false},
        {id:2, content:'哦的欧克', time:'2019/6/4', status:true},
        {id:3, content:'在一个际遇下', time:'2019/6/4', status:true},
        {id:4, content:'三生三世三生三世', time:'2019/6/4', status:false},
        {id:5, content:'嘎嘎嘎嘎嘎咕咕咕咕', time:'2019/6/11', status:false},
    ];

    // let str = localStorage.getItem(todolist);
    // if(!str){
    //     localStorage.setItem('todolist',JSON.stringify(todolist));
    // }
    // todolist = JSON.parse(str);

    lis.on('click',function () {
        $(this).addClass('hot').siblings().removeClass('hot');
        let type = $(this).attr('type');
        let arr = filterData(type);
        render(arr);
    })
    lis.triggerHandler('click');

    function filterData(type) {
        let arr = [];
        switch (type) {
            case 'all':
                arr = todolist;break;
            case 'done':
                arr = todolist.filter(elem=>elem.status);break;
            case 'doing':
                arr = todolist.filter(elem=>!elem.status);break;
        }
        return arr;
    }

    function render(arr) {
        let html = '';
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
        content.html(html);
    }


    //事件委派   把事件处理添加到父元素
    content.on('click','input',function () {
        let _this = $(this);
        let id = _this.closest('li').attr('id');
        let elem = todolist.filter(elem=>elem.id == id)[0];
        elem.status = !elem.status;
    })
    content.on('click','del',function () {
        let _this = $(this);
        // let id = _this.parent().attr('id');
        let id = _this.closest('li').attr('id');
        let index = todolist.findIndex(elem=>elem.id == id);
        todolist.splice(index,1);
        render(todolist);
    })
})