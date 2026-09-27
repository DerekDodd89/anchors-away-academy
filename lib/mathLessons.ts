import fs from "fs";
import path from "path";

export type MathResource = {
  title: string;
  file: string;
};

export type MathLessonResources = {
  elementary?: MathResource[];
  middleSchool?: MathResource[];
  practice?: MathResource[];
  activities?: MathResource[];
  assessments?: MathResource[];
  teacher?: MathResource[];
};

export type MathStudentAssignment = {
  student: string;
  level?: string;
  assignment: string;
};

export type MathLesson = {
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

  concept?: string;
  skill?: string;
  review?: string;
  practice?: string;
  application?: string;
  challenge?: string;

  studentAssignments?: MathStudentAssignment[];

  theme: string;

  resources?: MathLessonResources;
};

const validDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export function getMathLesson(
  lessonId: string
): MathLesson | null {
  const parts = lessonId.split("-");

  /*
    Expected:

    week-01-monday
  */
  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    console.error(
      "Invalid Math lesson ID:",
      lessonId
    );

    return null;
  }

  const weekNumber = parts[1];
  const day = parts[2].toLowerCase();

  if (!validDays.includes(day)) {
    console.error(
      "Invalid Math lesson day:",
      day
    );

    return null;
  }

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "math",
    "semester-1",
    `week-${weekNumber}`,
    day,
    "lesson.json"
  );

  /*
    No lesson.json means the day's
    Math lesson has not been published.
  */
  if (!fs.existsSync(lessonPath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(
      lessonPath,
      "utf8"
    );

    return JSON.parse(raw) as MathLesson;
  } catch (error) {
    console.error(
      "Error reading Math lesson:",
      error
    );

    return null;
  }
}

/*
  Check whether a Math lesson has
  been published for a given day.
*/
export function mathLessonExists(
  week: number,
  day: string
): boolean {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "math",
    "semester-1",
    `week-${weekNumber}`,
    day.toLowerCase(),
    "lesson.json"
  );

  return fs.existsSync(lessonPath);
}

/*
  Create the standard Math lesson ID.

  Example:

  Week 1 + Monday

  becomes:

  week-01-monday
*/
export function createMathLessonId(
  week: number,
  day: string
): string {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  return `week-${weekNumber}-${day.toLowerCase()}`;
}

/*
  Return the directory containing
  a Math lesson package.

  Example:

  content/
    math/
      semester-1/
        week-01/
          monday/
*/
export function getMathLessonDirectory(
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

  if (!validDays.includes(day)) {
    return null;
  }

  return path.join(
    process.cwd(),
    "content",
    "math",
    "semester-1",
    `week-${weekNumber}`,
    day
  );
}