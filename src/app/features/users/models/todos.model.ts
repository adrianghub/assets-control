export type Todo = TodoDto;

export interface TodoDto {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
