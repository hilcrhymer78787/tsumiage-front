import { useEffect, useState } from "react";
import TaskHeader from "@/components/pages/task/TaskHeader";
import TaskList from "@/components/pages/task/TaskList";
import dayjs from "dayjs";
import { useLoginInfo } from "@/data/common/useLoginInfo";
import { useReadTasks } from "@/data/task/useReadTasks";
import ApiHandle from "@/components/common/ApiHandle";
import { Stack } from "@mui/material";

const TaskMain = () => {
  const date = dayjs().format("YYYY-MM-DD");
  const { loginInfo } = useLoginInfo();
  const { tasks, notDoneTasks, doneTasks, notNecessaryTasks, readTasks, isFirstLoading, error } =
    useReadTasks();

  const apiTaskRead = () => readTasks({ date, user_id: loginInfo?.id ?? 0 });

  useEffect(() => {
    apiTaskRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TaskHeader apiTaskRead={apiTaskRead} />
      <ApiHandle
        isLoading={isFirstLoading}
        isError={!!error}
        isNoData={tasks?.length === 0}
        errorTxt={error}
        noDataTxt="登録されているタスクはありません"
        p={5}
      >
        <Stack gap={5}>
          <TaskList
            title="未達成のタスク"
            tasks={notDoneTasks}
            date={date}
            apiTaskRead={apiTaskRead}
          />
          <TaskList
            title="達成したタスク"
            tasks={doneTasks}
            date={date}
            apiTaskRead={apiTaskRead}
          />
          <TaskList
            title="達成不要のタスク"
            tasks={notNecessaryTasks}
            date={date}
            apiTaskRead={apiTaskRead}
          />
        </Stack>
      </ApiHandle>
      {process.env.NODE_ENV === "development" && <pre>{JSON.stringify(tasks, null, 4)}</pre>}
    </>
  );
};

export default TaskMain;
