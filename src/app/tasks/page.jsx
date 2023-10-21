"use client";
import React, { use, useEffect } from "react";
import Task from "../../componant/Task/task";
import { useApiAuth } from "../../../hooks/api";
import { useQuery } from "react-query";
import FormAddTask from "@/componant/FormAddTask/FormAddTask";
import FormUpdateTask from "@/componant/FormUpdateTask/FormUpdateTask";
import { setRefetch } from "@/tsakesSlice/tsakesSlice";
import styles from "./tsking.module.css";
import { useDispatch } from "react-redux";
// export const metadata = {
//   title: "Tasks",
//   description: "Tasks page",
// };
// let tasks = [{
//   _id: "652c2a7387eef38df1deefcb",
//   title: "string",
//   description: "ljljlk;lrk;lklfjldflhkdf;lhfd",
//   status: "toDo",
//   userId: "652c0605dd35e2fe7c97d37a",
//   assignTo: "652c0605dd35e2fe7c97d37a",
//   deadline: "2020-10-01T00:00:00.000Z",
//   createdAt: "2023-10-15T18:07:47.616Z",
//   updatedAt: "2023-10-15T18:07:47.616Z",
// }];
export default function Tasks() {
  const dispatch = useDispatch();
  let tasks = [];
  let taskJsx;
  const api = useApiAuth();

  const { isLoading, data, error, refetch } = useQuery(
    "tasks",
    async () => await api.get("/tasks/task")
  );
  dispatch(setRefetch(refetch));
  const deleteTask = async (id) => {
    await api.delete(`/tasks/task/${id}`);
    refetch();
  };
  if (data) {
    tasks = data.data.data;
    if (tasks.length == 0) {
    } else {
      taskJsx = tasks.map((task) => {
        return (
          <div className="container">
            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-6 mt-5">
                <div className={styles.deletedTask}>
                  <Task
                    task={task}
                    key={task._id}
                    deleteTask={deleteTask}
                    refetch={refetch}
                  />
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  return (
    <div className={styles.body}>
      <div className="container ">
        <div className="row">
          <div>
            <FormAddTask refetch={refetch} />
            {isLoading || (data && taskJsx)}
          </div>
        </div>
      </div>
    </div>
  );
}
