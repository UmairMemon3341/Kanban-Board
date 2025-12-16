const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

const tasks = document.querySelectorAll('.task')

tasks.forEach(tasks=>{
    tasks.addEventListener('drag',(e)=>{
        console.log('dragging', e);
        
    })
})