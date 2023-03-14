const modelController = (function() {

    class Income {
        constructor(id, desc, value) {
            this.id = id,
            this.desc = desc,
            this.value = value
        }
    }

    class Expense {
        constructor(id, desc, value) {
            this.id = id,
            this.desc = desc,
            this.value = value
        }
    }

    function addItem(type, desc, val) {

        let newItem, ID;

        ID = data.allItems[type].length > 0 
        ? data.allItems[type][data.allItems[type].length - 1]['id'] + 1 
        : ID = 0;

        if (type === 'inc') {
            newItem = new Income(ID, desc, parseFloat(val));
        } else if (type === 'exp') {
            newItem = new Expense(ID, desc, parseFloat(val));
        }

        data.allItems[type].push(newItem);

        return newItem;
    }

    function deleteItem(type, id) {
        const ids = data.allItems[type].map(item => item.id);
        const index = ids.indexOf(id);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
    }

    function calculateTotalSum(type) {
        let sum = 0;
        data.allItems[type].forEach(item => sum = sum + item.value);

        return sum;
    }

    function calculateBudget() {
        const allTotalsInc = data.totals.inc = calculateTotalSum('inc');
        const allTotalsExp = data.totals.exp = calculateTotalSum('exp');
        data.budget = allTotalsInc - allTotalsExp;
    }

    function getBudget() {
        return {
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            budget: data.budget
        }
    }

    const data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0
    }

    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        deleteItem: deleteItem,
    }

}());