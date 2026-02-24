let interviewList=[];
let rejectedList=[];

let total=document.getElementById('total');
let interviewCount=document.getElementById('interview');
let rejectedCount=document.getElementById('rejected');

const allCardBox= document.getElementById('cardParent');
const mainContainer=document.querySelector('main');

const allNav=document.getElementById('all-nav');
const interviewNav=document.getElementById('interview-nav');
const rejectedNav=document.getElementById('rejected-nav');

function countChild(){
    total.innerText=allCardBox.children.length;
    interviewCount.innerText=interviewList.length;
    rejectedCount.innerText=rejectedList.length;

}
countChild();

function toggleTo(id){
    allNav.classList.remove('bg-blue-500',  'text-white');
    interviewNav.classList.remove('bg-blue-500', 'text-white');
    rejectedNav.classList.remove('bg-blue-500', 'text-white');

    allNav.classList.add('bg-white', 'text-gray-500');
    interviewNav.classList.add('bg-white', 'text-gray-500');
    rejectedNav.classList.add('bg-white', 'text-gray-500');

    const selected=document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-500');
    selected.classList.add('bg-blue-500', 'text-white');
}

mainContainer.addEventListener('click', function(event){
    const parentNode=event.target.parentNode.parentNode;
    const boxName=parentNode.querySelector('h3').innerText;
    console.log(boxName);
})

