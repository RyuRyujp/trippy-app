import { supabaseServer } from "@/lib/supabase/server";
import type { Memo, Task } from "@/types/memoTask";
import type { ISODate } from "@/types/common";

type MemoRow = { id: string; trip_id: string; content: string; created_at: string };
type TaskRow = { id: string; trip_id: string; title: string; done: boolean; due_date: string | null; created_at: string };

function toMemo(r: MemoRow): Memo {
  return { id: r.id, tripId: r.trip_id, content: r.content, createdAt: r.created_at };
}
function toTask(r: TaskRow): Task {
  return { id: r.id, tripId: r.trip_id, title: r.title, done: r.done, dueDate: (r.due_date as ISODate | null), createdAt: r.created_at };
}

export async function listMemos(tripId: string): Promise<Memo[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("memos")
    .select("id,trip_id,content,created_at")
    .eq("trip_id", tripId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => toMemo(r as MemoRow));
}

export async function addMemo(tripId: string, content: string): Promise<void> {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error("Not authenticated");

  const { error } = await supabase.from("memos").insert({ trip_id: tripId, user_id: u.user.id, content });
  if (error) throw new Error(error.message);
}

export async function listTasks(tripId: string): Promise<Task[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("tasks")
    .select("id,trip_id,title,done,due_date,created_at")
    .eq("trip_id", tripId)
    .order("done", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => toTask(r as TaskRow));
}

export async function addTask(input: { tripId: string; title: string; dueDate: ISODate | null }): Promise<void> {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error("Not authenticated");

  const { error } = await supabase.from("tasks").insert({
    trip_id: input.tripId,
    user_id: u.user.id,
    title: input.title,
    due_date: input.dueDate,
  });

  if (error) throw new Error(error.message);
}

export async function toggleTaskDone(taskId: string, done: boolean): Promise<void> {
  const supabase = await supabaseServer();
  const { error } = await supabase.from("tasks").update({ done }).eq("id", taskId);
  if (error) throw new Error(error.message);
}