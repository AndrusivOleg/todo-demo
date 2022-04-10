const {I} = inject();

class CreateItemPO {
    constructor() {
        this.newItemFiledByCSS = ".new-todo",
        this.newItemFiledByText = "What needs to be done?",
        this.todoList = ".todo-list",
        this.todoCounter = ".todo-count strong",

        this.completedTab = "a[href='#/completed']",
        this.completedList = "li.completed label"

        this.activeTab = "a[href='#/active']",
        this.activeList = "li label",

        this.allTab = "a[href='#/']",
        this.clearCompleted = ".clear-completed"
    }

    createNewItemFieldByCSS(itemText) {
        I.fillField(this.newItemFiledByCSS, itemText);
        I.pressKey('Enter');
        I.see(itemText, this.todoList);
    }
    
    createNewItemFieldByText(itemText) {
        I.fillField(this.newItemFiledByText, itemText);
        I.pressKey('Enter');
        I.see(itemText, this.todoList);
    }

    async getItemsCount() {
        const numTodos = await I.grabTextFrom(this.todoCounter);
        return parseInt(numTodos);
    }

    checkItemByItemName(itemName) {
        I.click(`//label[text()="${itemName}"]/parent::*/input`);
        I.seeAttributesOnElements(`//label[text()="${itemName}"]/ancestor::li`, { class: "completed"});
    }

    clickDeleteBtnByName(itemName) {
        const deleteBtnSel = `//label[text()="${itemName}"]/following-sibling::button`
        I.moveCursorTo(deleteBtnSel)
        I.click(deleteBtnSel);
        I.dontSeeElement(this.todoList);
    }

    clickCompletedTab() {
        I.click(this.completedTab);
    }

    async grabListOfCompletedItems() {
        return await I.grabTextFromAll(this.completedList);
    }

    clickActiveTab() {
        I.click(this.activeTab);
    }

    async grabListOfItems() {
        return await I.grabTextFromAll(this.activeList);
    }

    clickAllTab() {
        I.click(this.allTab);
    }

    clickClearCompleted() {
        I.click(this.clearCompleted);
    }

}
module.exports = new CreateItemPO;
module.exports.CreateItemPO = CreateItemPO;