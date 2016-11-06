var StorageTest = TestCase('StorageTest');

StorageTest.prototype.testVendors = function(){
	assertTrue('suport localStorage', !!localStorage);
};

StorageTest.prototype.testSetItem = function(){
	localStorage.setItem('name', 'value');
	assertEquals('value', localStorage.getItem('name'));
};

