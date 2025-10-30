import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCreateWork } from "@/data/work/useCreateWork";

import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDeleteWork } from "@/data/work/useDeleteWork";
import { useState } from "react";
import { Task } from "@/data/types/task";
import { WorkState } from "@/data/types/work";
import RStack from "../common/RStack";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteTask } from "@/data/task/useDeleteTask";
import { useRestoreTask } from "@/data/task/useRestoreTask";

const TrashTaskItem = ({ task, apiTaskRead }: { task: Task; apiTaskRead: () => void }) => {
  const { deleteTask } = useDeleteTask();
  const { restoreTask } = useRestoreTask();
  return (
    <ListItem
      secondaryAction={
        <RStack>
          <IconButton
            onClick={async () => {
              if (!confirm("タスクを復元しますか？")) return;
              await restoreTask({ id: task.id });
              apiTaskRead();
            }}
          >
            <RestoreFromTrashIcon />
          </IconButton>
          <IconButton
            onClick={async () => {
              if (!confirm("タスク情報を完全に削除しますか？")) return;
              if (!confirm("本当によろしいですか？")) return;
              await deleteTask({ id: task.id, is_hard_delete: true });
              apiTaskRead();
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </RStack>
      }
    >
      <ListItemText primary={task.name} secondary={`削除日時：${task.deletedAt}`} />
    </ListItem>
  );
};
export default TrashTaskItem;
