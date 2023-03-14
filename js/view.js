const viewController = (function() {
    
    const DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expenseLabel: '#expense-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
        }
    }

    function formatNumber(num, type) {

        let numSplit, int, dec, newInt, resultNumber;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3) {
            newInt = ''

            for (let i = 0; i < int.length / 3; i++) {
                newInt = ',' + int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + newInt;
            }

            if (newInt[0] === ',') {
                newInt = newInt.substring(1);
            }
            
        } else if (int === '0') {
            newInt = '0'
        } else {
            newInt = int;
        }

        resultNumber = newInt + '.' + dec;

        if (type === 'exp') {
            resultNumber = '- ' + resultNumber;
        } else if (type === 'inc') {
            resultNumber = '+ ' + resultNumber;
        }

        return resultNumber;
    }

    function renderListItem(obj, type) {

        let containerElement, html;

        if (type === 'inc') {
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-${obj.id}" class="budget-list__item item item--income">
                        <div class="item__title">${obj.desc}</div>
                        <div class="item__right">
                            <div class="item__amount">${formatNumber(obj.value, type)}</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        } else {
            containerElement = DOMstrings.expenseContainer;
            html = `<li id="exp-${obj.id}" class="budget-list__item item item--expense">
                        <div class="item__title">${obj.desc}</div>
                        <div class="item__right">
                            <div class="item__amount">
                                ${formatNumber(obj.value, type)}
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', html)
    }

    function clearInput() {
        let inputDesc, inputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputDesc.value = ''
        inputDesc.focus();
        inputVal = document.querySelector(DOMstrings.inputValue).value = '';

    }

    function updateBudget(obj) {

        let type;

        if (obj.budget > 0) {
            type = 'inc'
        } else if (obj.budget < 0) {
            type = 'exp'
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
    }

    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();
    }

    function displayDate() {

        let month;

        const now = new Date();
        const year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        month = monthArr[month];

        document.querySelector(DOMstrings.monthLabel).textContent = month;
        document.querySelector(DOMstrings.yearLabel).textContent = year;
    }

    return {
        getInput: getInput,
        renderListItem: renderListItem,
        clearInput: clearInput,
        updateBudget: updateBudget,
        deleteListItem: deleteListItem,
        displayDate: displayDate,
        getDomStrings: function() {
            return DOMstrings
        }
    }

}());