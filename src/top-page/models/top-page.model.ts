export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export class TopPageModel {
  _id: string;
  firstCategory: TopLevelCategory;
  SecondCategory: string;
  title: string;
  category: string;
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
  hh?: Record<"count" | "juniorSalary" | "middleSalary" | "SeniorSalary", number>;
}
