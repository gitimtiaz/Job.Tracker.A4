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

function countChild() {
    total.innerText = allCardBox.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

}
countChild();

function toggleTo(id) {
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
    }
    if (id == 'rejected-nav') {
        allCardBox.classList.add('hidden');
        filterSection.classList.remove('hidden');
    }
    if (id == 'all-nav') {
        allCardBox.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
}
function extractCardData(parentNode) {
    return {
        boxName: parentNode.querySelector('.card-title').innerText,
        boxSub: parentNode.querySelector('.card-sub').innerText,
        boxSubSub: parentNode.querySelector('.sub-sub').innerText,
        boxNotApplied: parentNode.querySelector('.not-applied').innerText,
        boxSubBlew: parentNode.querySelector('.blew-sub').innerText
    };
}


mainContainer.addEventListener('click', function (event) {

    const interviewBtn = event.target.closest('.interview-btn');
    if (interviewBtn) {
        const parentNode = interviewBtn.closest('.card-container');

        const boxName = parentNode.querySelector('.card-title').innerText;
        const boxSub = parentNode.querySelector('.card-sub').innerText;
        const boxDelete = parentNode.querySelector('.delete').innerText;
        const boxSubSub = parentNode.querySelector('.sub-sub').innerText;
        const boxNotApplied = parentNode.querySelector('.not-applied').innerText;
        const boxSubBlew = parentNode.querySelector('.blew-sub').innerText;

        const cardInfo = {
            boxName,
            boxSub,
            boxDelete,
            boxSubSub,
            boxNotApplied,
            boxSubBlew
        }

        const cardExist = interviewList.find(item => item.boxName == cardInfo.boxName);

        if (!cardExist) {
            interviewList.push(cardInfo);
        }

        renderInterview();

    }
})

function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center py-10">
                <h3 class="font-bold text-2xl">No interview jobs</h3>
            </div>
        `;
        return;
    }

    for (let part of interviewList) {
        let div = document.createElement('div');
        div.className = "card-container card space-y-4 bg-white rounded-lg p-6 border border-gray-200";

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