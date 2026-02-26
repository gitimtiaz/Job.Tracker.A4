//All variable
let interviewList = [];
let rejectedList = [];

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectedCount = document.getElementById('rejected');

const allCardBox = document.getElementById('cardParent');
const mainContainer = document.querySelector('main');
const filterSection = document.querySelector('.filter-section');

const allNav = document.getElementById('all-nav');
const interviewNav = document.getElementById('interview-nav');
const rejectedNav = document.getElementById('rejected-nav');

const emptyTemplate = `
    <div class="flex justify-center">
        <img src="./assets/jobs.png">
    </div>

    <div class="text-center mt-5">
        <h3 class="font-bold text-2xl text-[#002C5C]">No jobs available</h3>
        <p class="text-gray-500">Check back soon for new job opportunities</p>
    </div>
`;
let currentTab = 'all-nav';

//Functions starts
function setFilterEmptyStyle() {
    filterSection.classList.remove('pt-0', 'bg-[#F8FAFC]');
    filterSection.classList.add('py-20', 'bg-white');
}

function setFilterFilledStyle() {
    filterSection.classList.remove('py-20', 'bg-white');
    filterSection.classList.add('pt-0', 'bg-[#F8FAFC]');
}

function countChild() {
    total.innerText = allCardBox.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
countChild();

function refreshCurrentView() {
    if (currentTab === 'interview-nav') {
        renderInterview();
    } else if (currentTab === 'rejected-nav') {
        renderRejected();
    }
}

function toggleTo(id) {
    currentTab = id;
    allNav.classList.remove('bg-blue-500', 'text-white');
    interviewNav.classList.remove('bg-blue-500', 'text-white');
    rejectedNav.classList.remove('bg-blue-500', 'text-white');

    allNav.classList.add('bg-white', 'text-gray-500');
    interviewNav.classList.add('bg-white', 'text-gray-500');
    rejectedNav.classList.add('bg-white', 'text-gray-500');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-gray-500');
    selected.classList.add('bg-blue-500', 'text-white');

    if (id == 'interview-nav') {
        allCardBox.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }

    if (id == 'rejected-nav') {
        allCardBox.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }

    if (id == 'all-nav') {
        allCardBox.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
}

//Event Listener function
mainContainer.addEventListener('click', function (event) {

    const interviewBtn = event.target.closest('.interview-btn');
    const rejectedBtn = event.target.closest('.rejected-btn');
    const deleteBtn = event.target.closest('.delete');

    if (!interviewBtn && !rejectedBtn && !deleteBtn) return;

    const parentNode = event.target.closest('.card-container');
    if (!parentNode) return;
    const cardInfo = {
        boxName: parentNode.querySelector('.card-title')?.innerText,
        boxSub: parentNode.querySelector('.card-sub')?.innerText,
        boxSubSub: parentNode.querySelector('.sub-sub')?.innerText,
        boxNotApplied: parentNode.querySelector('.not-applied')?.innerText,
        boxSubBlew: parentNode.querySelector('.blew-sub')?.innerText
    };

    if (interviewBtn) {

        rejectedList = rejectedList.filter(item => item.boxName !== cardInfo.boxName);

        const exists = interviewList.find(item => item.boxName === cardInfo.boxName);
        if (!exists) interviewList.push(cardInfo);

        refreshCurrentView();
        countChild();
    }

    if (rejectedBtn) {


        interviewList = interviewList.filter(item => item.boxName !== cardInfo.boxName);


        const exists = rejectedList.find(item => item.boxName === cardInfo.boxName);
        if (!exists) rejectedList.push(cardInfo);


        refreshCurrentView();
        countChild();
    }

    if (deleteBtn) {
        interviewList = interviewList.filter(item => item.boxName !== cardInfo.boxName);
        rejectedList = rejectedList.filter(item => item.boxName !== cardInfo.boxName);

        const allCards = allCardBox.querySelectorAll('.card-container');

        allCards.forEach(card => {
            const title = card.querySelector('.card-title')?.innerText;
            if (title === cardInfo.boxName) {
                card.remove();
            }
        });


        refreshCurrentView();
        countChild();
        return;
    }
});

//Interview section 
function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        setFilterEmptyStyle();
        filterSection.innerHTML = emptyTemplate;
        return;
    }

    setFilterFilledStyle();
    for (let part of interviewList) {
        let div = document.createElement('div');
        div.className = "card-container card space-y-4 bg-white rounded-lg p-6 border border-gray-200 mt-0 mb-7";
        div.innerHTML = `
            <div class="top-text-icon flex justify-between">
                <span>
                    <h3 class="card-title text-2xl font-bold text-[#002C5C]">${part.boxName}</h3>
                    <p class="card-sub text-[1.1rem]">${part.boxSub}</p>
                </span>
                <button class="delete cursor-pointer">
                    <span class="border border-gray-500 rounded-full p-1 text-gray-500">
                        <i class="fa-regular fa-trash-can"></i>
                    </span>
                </button>
            </div>

            <span>
                <p class="sub-sub">${part.boxSubSub}</p>
            </span>

            <button class="not-applied btn btn-soft text-[#002C5C] font-bold bg-gray-200 px-4 py-2 w-30">
                ${part.boxNotApplied}
            </button>

            <p class="blew-sub text-gray-700">${part.boxSubBlew}</p>

            <div class="btn-part flex gap-4">
                <button class="interview-btn btn btn-soft text-green-500 bg-white px-4 py-2 border-2 border-green-500">
                    INTERVIEW
                </button>
                <button class="rejected-btn btn btn-soft text-red-500 bg-white px-4 py-2 border-2 border-red-500">
                    REJECTED
                </button>
            </div>
        `;
        filterSection.appendChild(div);
    }

    countChild();
}

//Render Rejected section
function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedList.length === 0) {
        setFilterEmptyStyle();
        filterSection.innerHTML = emptyTemplate;
        return;
    }

    setFilterFilledStyle();
    for (let part of rejectedList) {
        const div = document.createElement('div');
        div.className = "card-container card space-y-4 bg-white rounded-lg p-6 border border-gray-200 mt-0 mb-7";

        div.innerHTML = `
            <div class="top-text-icon flex justify-between">
                <span>
                    <h3 class="card-title text-2xl font-bold text-[#002C5C]">${part.boxName}</h3>
                    <p class="card-sub text-[1.1rem]">${part.boxSub}</p>
                </span>
                <button class="delete cursor-pointer">
                    <span class="border border-gray-500 rounded-full p-1 text-gray-500">
                        <i class="fa-regular fa-trash-can"></i>
                    </span>
                </button>
            </div>

            <span>
                <p class="sub-sub">${part.boxSubSub}</p>
            </span>

            <button class="not-applied btn btn-soft text-[#002C5C] font-bold bg-gray-200 px-4 py-2 w-30">
                ${part.boxNotApplied}
            </button>

            <p class="blew-sub text-gray-700">${part.boxSubBlew}</p>
            <div class="btn-part flex gap-4">
                <button class="interview-btn btn btn-soft text-green-500 bg-white px-4 py-2 border-2 border-green-500">
                    INTERVIEW
                </button>
                <button class="rejected-btn btn btn-soft text-red-500 bg-white px-4 py-2 border-2 border-red-500">
                    REJECTED
                </button>
            </div>
        `;
        filterSection.appendChild(div);
    }
}