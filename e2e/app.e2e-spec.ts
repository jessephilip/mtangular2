import { MtgAppPage } from './app.po';

describe('mtg-app App', () => {
  let page: MtgAppPage;

  beforeEach(() => {
    page = new MtgAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
