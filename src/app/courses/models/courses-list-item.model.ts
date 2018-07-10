export interface CoursesListItem {
  id: number;
  title: string;
  createDate: object;
  duration: number;
  description: string;
  topRated?: boolean;
}

export class CourseModel implements CoursesListItem {
  constructor(public id: number,
              public title: string,
              public createDate: object,
              public duration: number,
              public description: string,
              public topRated?: boolean) {}
}
