const { CreateItemPO } = require("../pageObject/createItemPO");
const faker = require('faker');


const createItemPO = new CreateItemPO();
const {I} = inject();


Feature('ToDo demo');

Before(() => { 
    I.amOnPage('/');
  });

Scenario('check that create, check, delete item works properly.', async () => {
  const TEST_ITEM_NAME = faker.name.title();

  //Create new item
  createItemPO.createNewItemFieldByText(TEST_ITEM_NAME);
  const AFTER_CREATION_ITEM_COUNT = await createItemPO.getItemsCount();
  I.assertEqual(1, AFTER_CREATION_ITEM_COUNT, "Incorrect number of items are showing after adding new item");

  //Check created item
  createItemPO.checkItemByItemName(TEST_ITEM_NAME);
  const AFTER_CHECKED_ITEM_COUNT = await createItemPO.getItemsCount();
  I.assertEqual(AFTER_CREATION_ITEM_COUNT - 1, AFTER_CHECKED_ITEM_COUNT, `Incorrect number of items are shown after checked as complete ${TEST_ITEM_NAME}`);

  //Delete completed item
  createItemPO.clickDeleteBtnByName(TEST_ITEM_NAME);
});

Scenario('check that filtering functions (All, Active, Completed and Clear completed) are working properly', async () => {

  //Create 5 new ToDo items
  let listOfItems = []
  for(let i = 0; i < 5; i++) {
    listOfItems = [...listOfItems, faker.name.title()];
    createItemPO.createNewItemFieldByCSS(listOfItems[i]);
  }

  //Verifying that items marked as done are filtering as completed
  const TEST_ITEM_NAME_COMPLETED = listOfItems.slice(0, 2);
  for(item of TEST_ITEM_NAME_COMPLETED) {
    createItemPO.checkItemByItemName(item);
  }
  createItemPO.clickCompletedTab();
  const LIST_OF_COMPLETED_ITEMS = await createItemPO.grabListOfCompletedItems();
  I.assertTrue(LIST_OF_COMPLETED_ITEMS.every((item, index) => item === TEST_ITEM_NAME_COMPLETED[index]), `Complete tab does not contains "${TEST_ITEM_NAME_COMPLETED}" as completed items`);

  //Verifying that uncompleted items are filtering as active
  const TEST_ITEM_NAME_ACTIVE = listOfItems.slice(-3);
  console.log(TEST_ITEM_NAME_ACTIVE);
  createItemPO.clickActiveTab();
  const LIST_OF_ACTIVE_ITEMS = await createItemPO.grabListOfItems();
  I.assertTrue(LIST_OF_ACTIVE_ITEMS.every((item, index) => item === TEST_ITEM_NAME_ACTIVE[index]), `Active tab does not contains "${TEST_ITEM_NAME_ACTIVE}" as active items`);

  //Verifying that all items filtering as all
  createItemPO.clickAllTab();
  const LIST_OF_ALL_ITEMS = await createItemPO.grabListOfItems();
  I.assertTrue(LIST_OF_ALL_ITEMS.every((item, index) => item === listOfItems[index]), `All tab does not contains "${listOfItems}" as all items`);

  //Verifying that completed items are clearing by clear completed button
  createItemPO.clickClearCompleted();
  const LIST_OF_ALL_ITEMS_AFTER_CLEARING = await createItemPO.grabListOfItems();
  I.assertTrue(LIST_OF_ALL_ITEMS_AFTER_CLEARING.every((item, index) => item === TEST_ITEM_NAME_ACTIVE[index]), `All tab does not contains "${TEST_ITEM_NAME_ACTIVE}" as all items, after clearing completed items`);

});
