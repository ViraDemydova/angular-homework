export interface CoursesListItem {
  id: number;
  title: string;
  createDate: object;
  duration: number;
  description: string;
}

export class CourseModel implements CoursesListItem {
  constructor(public id: number,
              public title: string,
              public createDate: object,
              public duration: number,
              public description: string) {}
}
