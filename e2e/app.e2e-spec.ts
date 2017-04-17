import { TrialPage } from './app.po';

describe('trial App', () => {
	let page: TrialPage;

	beforeEach(() => {
		page = new TrialPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
