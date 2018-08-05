export interface CoursesListItem {
  id: number;
  title: string;
  createDate: string;
  duration: number;
  description: string;
  author?: string[];
  topRated?: boolean;
}

export class CourseModel implements CoursesListItem {
  constructor(
    public id: number,
    public title: string,
    public createDate: string,
    public duration: number,
    public description: string,
    public author?: string[],
    public topRated?: boolean
  ) {}
}
