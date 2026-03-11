import { Project, type TaskModel } from "@/models/Project";

export const Table1 = new Map<string, TaskModel>([
  ["a", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: [], nextTasks: [] }],
  ["b", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: ["a"], nextTasks: [] }],
  ["c", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: ["b"], nextTasks: [] }],
  ["d", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["c"], nextTasks: [] }],
  ["e", { duration: 45, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["d"], nextTasks: [] }],
  ["f", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["e"], nextTasks: [] }],
  ["g", { duration: 45, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["d"], nextTasks: [] }],
  ["h", { duration: 60, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["d"], nextTasks: [] }],
  ["i", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["h"], nextTasks: [] }],
  ["j", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["i"], nextTasks: [] }],
  ["k", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["f"], nextTasks: [] }],
  ["l", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["k"], nextTasks: [] }],
  ["m", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["g", "j", "l"], nextTasks: [] }],
  ["n", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["m"], nextTasks: [] }],
  ["o", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["n"], nextTasks: [] }],
  ["p", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["m"], nextTasks: [] }],
  ["q", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["o"], nextTasks: [] }],
  ["r", { duration: 15, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["q"], nextTasks: [] }],
  ["s", { duration: 30, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["q"], nextTasks: [] }],
  ["t", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["p"], nextTasks: [] }],
  ["u", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["r", "t"], nextTasks: [] }],
  ["v", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["s", "t"], nextTasks: [] }],
  ["w", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["r", "s"], nextTasks: [] }],
]);

export const Table2 = new Map<string, TaskModel>([
    ["A", { duration: 6, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: ["P"], nextTasks: [] }],
    ["B", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["G"], nextTasks: [] }],
    ["C", { duration: 6, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["K"], nextTasks: [] }],
    ["D", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["N"], nextTasks: [] }],
    ["E", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["K"], nextTasks: [] }],
    ["F", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "J"], nextTasks: [] }],
    ["G", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["H", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "G"], nextTasks: [] }],
    ["I", { duration: 2, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["M", "J"], nextTasks: [] }],
    ["J", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "E", "G"], nextTasks: [] }],
    ["K", { duration: 5, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["L", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["O", "Q"], nextTasks: [] }],
    ["M", { duration: 7, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B", "C"], nextTasks: [] }],
    ["N", { duration: 3, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["I"], nextTasks: [] }],
    ["O", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A", "F", "I"], nextTasks: [] }],
    ["P", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "N"], nextTasks: [] }],
    ["Q", { duration: 1, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
])

export const Table3 = new Map<string, TaskModel>([
    ["A", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false,  previousTasks: [], nextTasks: [] }],
    ["B", { duration: 12, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: [], nextTasks: [] }],
    ["C", { duration: 8, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["D", { duration: 4, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["E", { duration: 16, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["A"], nextTasks: [] }],
    ["F", { duration: 24, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["B"], nextTasks: [] }],
    ["G", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }],
    ["H", { duration: 16, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["I", { duration: 12, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["C", "D"], nextTasks: [] }],
    ["J", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["E", "F", "G"], nextTasks: [] }],
    ["K", { duration: 20, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "I", "J"], nextTasks: [] }],
    ["L", { duration: 24, earlyDate: 0, lateDate: 0, isCritical: false, previousTasks: ["H", "I", "J"], nextTasks: [] }],
])

const DefaultTable1 = new Project(
    "Test 1",
    Table1
)

const DefaultTable2 = new Project(
    "Test 2",
    Table2
)

const DefaultTable3 = new Project(
    "Test 3",
    Table3
)

export {
    DefaultTable1,
    DefaultTable2,
    DefaultTable3
}

