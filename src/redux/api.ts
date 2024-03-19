import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Board, ServerResponse, Task, TaskResponse } from "../types";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://taskboard-api-l42f.onrender.com/",
  }),
  tagTypes: ["Boards"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    getAllBoards: build.query<Board[], void>({
      query: () => `boards`,
      transformResponse: (response: ServerResponse) => response.data,
    }),
    getBoardById: build.query<Board, string>({
      query: (id: string) => `/boards/${id}`,
      transformResponse: (response: { data: Board }) => response.data,
    }),
    getBoardTasks: build.query<Task[] | [], string | null>({
      query: (id: string | null) => `/boards/${id}/tasks`,
    }),
    addBoard: build.mutation<Board, Partial<Board>>({
      query(body) {
        return {
          url: `boards`,
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: Board }) => response.data,
    }),
    deleteBoard: build.mutation<{message:string},string>({
      query(id) {
        return {
          url: `/boards/${id}`,
          method: "DELETE",
        };
      },
    }),
    addTask: build.mutation<Task, { id: string | number; body: Partial<Task> }>(
      {
        query({ id, body }) {
          return {
            url: `/boards/${id}/tasks`,
            method: "POST",
            body,
          };
        },
        transformResponse: (response: TaskResponse) => response.task
      }
    ),
    updateTask: build.mutation<Task,{ id: string | number; body: Partial<Task>}>({
      query({ id, body }) {
        return {
          url: `/tasks/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    deleteTask: build.mutation<Task,{ id: string | number}>({
      query({id}) {
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetBoardByIdQuery,
  useGetBoardTasksQuery,
  useAddBoardMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useDeleteBoardMutation
} = boardApi;
