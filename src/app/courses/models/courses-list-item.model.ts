export interface CoursesListItem {
  id: number;
  title: string;
  createDate: string;
  duration: number;
  description: string;
  authors: string[];
  topRated?: boolean;
}

export class CourseModel implements CoursesListItem {
  constructor(
    public id: number,
    public title: string,
    public createDate: string,
    public duration: number,
    public description: string,
    public authors: string[] = [],
    public topRated?: boolean
  ) {}
}
