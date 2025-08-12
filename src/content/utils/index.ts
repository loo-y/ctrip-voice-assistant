
export const getInfoFromUrl = (url: string) => {
	const urlObj = new URL(url);
	const pathname = urlObj.pathname;
    const productId = pathname.match(/\/p\d+/)?.[0]?.replace('/p', '');
	const searchParams = urlObj.searchParams;
	const params = Object.fromEntries(searchParams.entries());
	return {pathname, productId, params};
}