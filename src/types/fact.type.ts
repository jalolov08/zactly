export interface IFact {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category: string | { _id: string; name: string };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
