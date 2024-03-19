export type Id = string | number;

export type Board = {
    _id:string;
    name?: string
    description?: string
    tasks?: string[],
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  _id: Id;
  title:string;
  description?: string
  columnId?: string|number;
  createdAt?: string
  updatedAt?: string
  status?:string
  __v?: number
  boardId?: string
};

export type ServerResponse = {
    data: Board[]
}



export interface TaskResponse {
  message: string;
  task: Task;
}

export interface CreateTaskResponse {
  data: TaskResponse;
}