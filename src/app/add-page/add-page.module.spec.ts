import { AddPageModule } from './add-page.module';

describe('AddPageModule', () => {
  let addPageModule: AddPageModule;

  beforeEach(() => {
    addPageModule = new AddPageModule();
  });

  it('should create an instance', () => {
    expect(addPageModule).toBeTruthy();
  });
});
