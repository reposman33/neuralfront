import { MLShowcasePage } from './app.po';

describe('neuralFront App', () => {
  let page: MLShowcasePage;

  beforeEach(() => {
    page = new MLShowcasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
