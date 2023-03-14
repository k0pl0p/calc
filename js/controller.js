const controller = (function(model, view) {

    const setupEventListeners = () => {
        const DOM = view.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
    }

    function ctrlAddItem (e) {
        e.preventDefault();
        const input = view.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            const newItem = model.addItem(input.type, input.description, input.value);
    
            view.renderListItem(newItem, input.type);
            view.clearInput();
            generateTestData.init()

            updateBudget()
        }

    }

    function ctrlDeleteItem(e) {

        if (e.target.closest('.item__remove')) {
            const itemID = e.target.closest('li.budget-list__item').id;
            const splitID = itemID.split('-');

            const type = splitID[0];
            const ID = parseInt(splitID[1]);

            model.deleteItem(type, ID);
            view.deleteListItem(itemID);

            updateBudget();
        }
    }

    function updateBudget() {
        model.calculateBudget();
        const budgetObj = model.getBudget();
        view.updateBudget(budgetObj);
    }
    
    return {
        init: function() {
            view.displayDate();
            setupEventListeners();
            view.updateBudget({
                totalInc: 0,
                totalExp: 0,
                budget: 0
            });
        }
    }

}(modelController, viewController));


controller.init();