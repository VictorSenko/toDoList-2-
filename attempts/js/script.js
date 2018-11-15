function init() {
    let taskArr;
    if (localStorage.getItem('task') !== null) {
        taskArr = JSON.parse(localStorage.getItem('task'));
    }
    else
        taskArr = [];
    $('.main__table-curent').addClass('main__table-active');
    $('.navigation__curent-task').addClass('navigation-active');
    actions();
    return taskArr;
}
taskArr = init();
function modalMuve(e) {
    if ($(e.target).hasClass('modal__move')) {
        let leftOffset = e.offsetX;
        let topOffset = e.offsetY;
        $('body').on('mousemove', function (e) {

            if ($(e.target).hasClass('modal__move')) {
                let x = e.pageX - leftOffset;
                let y = e.pageY - topOffset;

                $('.modal__add-task').css({
                    'transform': 'translateX(0)',
                    'left': x + 'px',
                    'top': y + 'px'
                });
            }
        });
    }
}
function taskDrow() {

}
class TaskCreator {
    constructor() {
        this.name = $('.task__name-input').val();
        this.description = $('.task__description-input').val();
        this.priority = $("input:checked").val();
        this.status = 'curent';
    }
}
function actions() {
    //navigation switcher
    $('.navigation__item').on('click', function (e) {
        $('.main__table').removeClass('main__table-active');
        $('.navigation__item').removeClass('navigation-active');
        $('.navigation__item').eq($(e.target).index()).addClass('navigation-active');
        $('.main__table').eq($(e.target).index()).addClass('main__table-active');
    });
    //Add Task button
    $('.open__modal-add').on('click', function () {
        $('.modal__wrapper').css('display','block');
    });
    $('body').on('click', function (e) {
        if ($(e.target).hasClass('modal__exit-button') || $(e.target).hasClass('modal__wrapper')) {
            $('.modal__wrapper').css('display', 'none');
        }
    });

    //modal movement
    
    $('body').on('mousedown', function (e) {
        modalMuve(e);
    });
    $('body').on('mouseup', function (e) {
        $('body').unbind('mousemove');
    });

    //create task
    $('.create__task-button').on('click', function () {
        let newTask = new TaskCreator();
        $('.task__name-input').val('');
        $('.task__description-input').val('');
        $('.modal__wrapper').css('display', 'none');
        taskArr.push(newTask);
        localStorage.setItem('task', JSON.stringify(taskArr));
        taskDrow();
        console.log(taskArr);
    });
}


