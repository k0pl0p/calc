const generateTestData = (function() {

    class ExampleItem {
        constructor(type, desc, sum) {
            this.type = type,
            this.desc = desc,
            this.sum = sum
        }
    }
    
    const testData = [
        new ExampleItem('inc', 'Зарплата', 10000),
        new ExampleItem('inc', 'Фриланс', 2000),
        new ExampleItem('inc', 'Продажи', 1000),
        new ExampleItem('exp', 'Развлечения', 2500),
        new ExampleItem('exp', 'Бензин', 1000),
        new ExampleItem('exp', 'Продукты', 2000),
    ]
    
    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)] 
    }
    
    function insertItem() {
        const randomItem = getRandom(testData);
    
        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.desc;
        document.querySelector('#input__value').value = randomItem.sum;
    }

    return {
        init: insertItem
    }

}());

generateTestData.init()