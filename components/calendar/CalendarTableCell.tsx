import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import { Calendar } from "@/data/types/calendar";
import WorkStateIcon from "@/components/calendar/WorkStateIcon";
import dayjs from "dayjs";
import { useCreateWork } from "@/data/work/useCreateWork";

/**
 * カレンダーテーブルのセルコンポーネント
 * 各タスクの日付ごとの作業状態を表示・更新する
 */
const CalendarTableCell = ({
  taskId,
  calendar,
  readonly,
}: {
  taskId: number;
  calendar: Calendar;
  readonly?: boolean;
}) => {
  // カレンダーから対象のタスクを取得
  const task = calendar.tasks.find((task) => task.id === taskId);
  const { date } = calendar;
  const createdAt = task?.createdAt;

  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);
  // 作業状態（0: 未作業, 1: 作業中, 2: 完了）
  const [state, setState] = useState(task?.work.state ?? 0);

  const { createWork } = useCreateWork();

  /**
   * 作業状態を更新するAPI呼び出し
   * 状態は 0 → 1 → 2 → 0 の順で循環する
   */
  const apiWorkCreate = async () => {
    if (!task) return;
    setIsLoading(true);
    // 次の状態を計算（0 → 1 → 2 → 0）
    const newState = state === 0 ? 1 : state === 1 ? 2 : 0;
    const res = await createWork({
      date,
      state: newState,
      task_id: task.id,
    });
    // API呼び出しが成功したら状態を更新
    if (res) setState(newState);
    setIsLoading(false);
  };

  // タスクの作業状態が変更されたら、ローカルの状態も同期
  useEffect(() => {
    setState(task?.work.state ?? 0);
  }, [task?.work.state]);

  // 未来の日付の場合は空のボックスを表示
  if (dayjs(date).isAfter(dayjs(), "day")) return <Box />;
  // タスクの作成日よりも前の日付の場合は空のボックスを表示
  if (dayjs(createdAt).isAfter(dayjs(date), "day")) return <Box />;
  // ローディング中はスピナーを表示
  if (isLoading)
    return (
      <Box className="flexCenter">
        <CircularProgress size={24} />
      </Box>
    );

  // 作業状態アイコンをボタンとして表示
  return (
    <Button
      onClick={apiWorkCreate}
      disabled={readonly}
      sx={{
        p: 0,
        borderRadius: 0,
        minWidth: "100%",
        height: "100%",
      }}
    >
      <WorkStateIcon state={state} />
    </Button>
  );
};
export default CalendarTableCell;
