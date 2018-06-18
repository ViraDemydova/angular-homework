export interface CoursesListItem {
  id: number;
  title: string;
  createDate: string;
  duration: string;
  description: string;
}

export class CourseModel implements CoursesListItem {
  constructor(public id: number,
              public title: string,
              public createDate: string,
              public duration: string,
              public description: string) {}
}
