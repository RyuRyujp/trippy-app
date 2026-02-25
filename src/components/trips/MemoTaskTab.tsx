import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { listMemos, listTasks } from "@/lib/data/memoTask";
import AddMemoForm from "@/components/trips/forms/AddMemoForm";
import AddTaskForm from "@/components/trips/forms/AddTaskForm";
import TaskToggle from "@/components/trips/forms/TaskToggle";

export default async function MemoTaskTab({ tripId }: { tripId: string }) {
  const [memos, tasks] = await Promise.all([listMemos(tripId), listTasks(tripId)]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>メモ</div>
        <div style={{ marginTop: 10 }}>
          <AddMemoForm tripId={tripId} />
        </div>
      </Card>

      {memos.map((m) => (
        <Card key={m.id}>
          <div style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
          <div style={{ marginTop: 8, fontSize: 12, color: theme.colors.subtext }}>
            {new Date(m.createdAt).toLocaleString()}
          </div>
        </Card>
      ))}

      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>タスク</div>
        <div style={{ marginTop: 10 }}>
          <AddTaskForm tripId={tripId} />
        </div>
      </Card>

      {tasks.map((t) => (
        <Card key={t.id}>
          <TaskToggle taskId={t.id} done={t.done} title={t.title} dueDate={t.dueDate} />
        </Card>
      ))}
    </div>
  );
}