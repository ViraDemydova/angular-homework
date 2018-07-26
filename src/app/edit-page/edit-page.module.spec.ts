import { EditPageModule } from './edit-page.module';

describe('EditPageModule', () => {
  let editPageModule: EditPageModule;

  beforeEach(() => {
    editPageModule = new EditPageModule();
  });

  it('should create an instance', () => {
    expect(editPageModule).toBeTruthy();
  });
});
