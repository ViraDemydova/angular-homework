// Считаю, что эта модель лишняя, так как есть модель
// CoursesListItem. Почему бы ее не использовать?
export interface AddCourse {
  title: string;
  description: string;
  createDate: object;
  duration: number;
  author: string;
}

export class AddPageModel implements AddCourse {
  constructor(public title: string,
              public description: string,
              public createDate: object,
              public duration: number,
              public author: string) {}
}

