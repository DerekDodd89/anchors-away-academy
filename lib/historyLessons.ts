import fs from "fs";
import path from "path";

export type HistoryResource = {
  title: string;
  file: string;
};

export type HistoryLessonResources = {
  elementary?: HistoryResource[];
  middleSchool?: HistoryResource[];
  teacher?: HistoryResource[];
  maps?: HistoryResource[];
  activities?: HistoryResource[];
};

export type HistoryLesson = {
  id: string;
  subject: string;

  course?: string;
  unit?: string;
  lessonNumber?: number;

  schoolYear: string;
  semester: number;
  week: number;
  day: string;
  date: string;

  title: string;
  subtitle: string;
  topic?: string;
  period?: string;
  theme: string;

  resources?: HistoryLessonResources;
};

export function getHistoryLesson(
  lessonId: string
): HistoryLesson | null {
  const parts = lessonId.split("-");

  // Expected:
  // week-01-monday
  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    console.error(
      "Invalid History lesson ID:",
      lessonId
    );

    return null;
  }

  const weekNumber = parts[1];
  const day = parts[2].toLowerCase();

  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  if (!validDays.includes(day)) {
    console.error(
      "Invalid History lesson day:",
      day
    );

    return null;
  }

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "history",
    "semester-1",
    `week-${weekNumber}`,
    day,
    "lesson.json"
  );

  console.log(
    "Loading History lesson:",
    lessonPath
  );

  if (!fs.existsSync(lessonPath)) {
    console.log(
      "History lesson not published:",
      lessonId
    );

    return null;
  }

  try {
    const raw = fs.readFileSync(
      lessonPath,
      "utf8"
    );

    const lesson =
      JSON.parse(raw) as HistoryLesson;

    return lesson;
  } catch (error) {
    console.error(
      "Error reading History lesson:",
      error
    );

    return null;
  }
}

/*
  Checks whether a History lesson
  has been published for a given day.
*/
export function historyLessonExists(
  week: number,
  day: string
): boolean {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "history",
    "semester-1",
    `week-${weekNumber}`,
    day.toLowerCase(),
    "lesson.json"
  );

  return fs.existsSync(lessonPath);
}

/*
  Creates the standard History
  lesson ID.

  Example:

  Week 1 + Tuesday
  becomes:

  week-01-tuesday
*/
export function createHistoryLessonId(
  week: number,
  day: string
): string {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  return `week-${weekNumber}-${day.toLowerCase()}`;
}

/*
  Returns the server location of
  a History lesson package.

  This is used by the resource
  serving system.
*/
export function getHistoryLessonDirectory(
  lessonId: string
): string | null {
  const parts = lessonId.split("-");

  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    return null;
  }

  const weekNumber = parts[1];
  const day = parts[2].toLowerCase();

  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  if (!validDays.includes(day)) {
    return null;
  }

  return path.join(
    process.cwd(),
    "content",
    "history",
    "semester-1",
    `week-${weekNumber}`,
    day
  );
}