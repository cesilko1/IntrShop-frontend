class GoodsSorting {
	revert(array: any[]): any[] {
		console.log(array);
		array.reverse();
		console.log(array);
		return array;
	}
}

export default new GoodsSorting;