export const findByTestAttributes = (wrapper, value) => {
	return wrapper.find(`[data-test="${value}"]`);
};

export const resizeWindow = (x, y) => {
	window.innerWidth = x;
	window.innerHeight = y;
	window.dispatchEvent(new Event('resize'));
}