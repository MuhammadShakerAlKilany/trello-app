"use client";
import React, { use, useEffect } from "react";
import Task from "@/componant/Task/Task";
import { useApiAuth } from "../../../hooks/api";
import { useQuery } from "react-query";
import FormAddTask from "@/componant/FormAddTask/FormAddTask";
import FormUpdateTask from "@/componant/FormUpdateTask/FormUpdateTask";
import { setRefetch } from "@/tsakesSlice/tsakesSlice";
import styles from "./tsking.module.css";
import { useDispatch } from "react-redux";
import {useRouter} from "next/navigation"
export default function Tasks() {
  const dispatch = useDispatch();
  let tasks = [];
  let taskJsx;

  const api = useApiAuth();
  const router = useRouter()
useEffect(()=>{

  if(!localStorage?.getItem("token")){
  
    router.push("/login")
  }
})

  
  
  const { isLoading, data, error, refetch } = useQuery(
    "tasks",
    async () => await api.get("/tasks/task")
  );
  dispatch(setRefetch(refetch));
  const deleteTask = async (id) => {
    await api.delete(`/tasks/task/${id}`);
    refetch();
  };
  if (data?.data?.data) {
    tasks = data.data.data;
    if (tasks?.length == 0) {
    } else {
      taskJsx = tasks.map((task) => {
        // console.log(task)
        return (
          <div className="container"  key={task._id}>
            <div className="row">
              <div className="col-md-6 mt-5">
                <div className={styles.deletedTask}>
                  <Task
                    task={task}
                    key={task._id}
                    deleteTask={deleteTask}
                    refetch={refetch}
                  />
                </div>
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
            <div className="d-flex flex-column-reverse">

            {isLoading || (data && taskJsx)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
