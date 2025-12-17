const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const tasks = document.querySelectorAll('.task')

tasks.forEach(tasks=>{
    tasks.addEventListener('drag',(e)=>{
        console.log('dragging', e);
        
    })
})

function addDragEventsOnColumn(column){
    column.addEventListener('dragenter',(e)=>{
        e.preventDefault();
        column.classList.add('hover-over');
    })
    column.addEventListener('dragleave',(e)=>{
        e.preventDefault();
        column.classList.remove('hover-over')
    })
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);