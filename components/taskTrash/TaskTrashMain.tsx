import { useEffect, useState } from "react";
import { useReadTasks } from "@/data/task/useReadTasks";

import Sortable from "@/components/common/Sortable";
import TaskSortHeader from "@/components/task/TaskSortHeader";
import dayjs from "dayjs";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useSortTasks } from "@/data/task/useSortTasks";
import { Task } from "@/data/types/task";
import ApiHandle from "../common/ApiHandle";
import { Card, CardContent, CardHeader } from "@mui/material";
import TrashTaskItem from "./TrashTaskItem";

const TaskTrashMain = () => {
  const { loginInfo } = useLoginInfo();
  const { isFirstLoading, tasks, readTasks, error } = useReadTasks();
  const { sortTasks } = useSortTasks();

  const apiTaskRead = async () => {
    await readTasks({
      date: dayjs().format("YYYY-MM-DD"),
      user_id: loginInfo?.id ?? 0,
      is_only_trashed: true,
    });
  };

  const apiTaskSort = async (tasks: Task[]) => {
    const ids = tasks.map(({ id }) => id);
    sortTasks({ ids });
  };

  useEffect(() => {
    apiTaskRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TaskSortHeader />
      <ApiHandle
        isLoading={isFirstLoading}
        isError={!!error}
        isNoData={tasks?.length === 0}
        errorTxt={error}
        noDataTxt="登録されているタスクはありません"
        p={5}
      >
        <Card>
          <CardHeader title="削除されたタスク" />
          <CardContent sx={{ p: "0 !important" }}>
            {tasks?.map((task) => (
              <TrashTaskItem task={task} apiTaskRead={apiTaskRead} key={task.id} />
            ))}
          </CardContent>
        </Card>
        {process.env.NODE_ENV === "development" && <pre>{JSON.stringify(tasks, null, 4)}</pre>}
      </ApiHandle>
    </>
  );
};
export default TaskTrashMain;
