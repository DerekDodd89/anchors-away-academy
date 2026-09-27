import fs from "fs";
import path from "path";

export type BibleResource = {
  title: string;
  file: string;
};

export type BibleLessonResources = {
  elementary?: BibleResource[];
  middleSchool?: BibleResource[];
  teacher?: BibleResource[];
};

export type BibleLesson = {
  id: string;
  subject: string;

  course?: string;
  lessonNumber?: number;

  schoolYear: string;
  semester: number;
  week: number;
  day: string;
  date: string;

  title: string;
  subtitle: string;
  passage: string;
  theme: string;
  memoryVerse: string;

  resources?: BibleLessonResources;
};

export function getBibleLesson(
  lessonId: string
): BibleLesson | null {
  const parts = lessonId.split("-");

  // Expected format:
  // week-01-monday
  // week-06-wednesday
  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    console.error(
      "Invalid Bible lesson ID:",
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
      "Invalid Bible lesson day:",
      day
    );

    return null;
  }

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "bible",
    "semester-1",
    `week-${weekNumber}`,
    day,
    "lesson.json"
  );

  console.log(
    "Loading Bible lesson:",
    lessonPath
  );

  if (!fs.existsSync(lessonPath)) {
    console.log(
      "Bible lesson not published:",
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
      JSON.parse(raw) as BibleLesson;

    return lesson;
  } catch (error) {
    console.error(
      "Error reading Bible lesson:",
      error
    );

    return null;
  }
}

/*
  Checks whether a particular day has
  a published lesson.json file.
*/
export function bibleLessonExists(
  week: number,
  day: string
): boolean {
  const weekNumber = String(week).padStart(
    2,
    "0"
  );

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "bible",
    "semester-1",
    `week-${weekNumber}`,
    day.toLowerCase(),
    "lesson.json"
  );

  return fs.existsSync(lessonPath);
}

/*
  Creates the standard lesson ID used
  throughout the Bible module.

  Example:
  week 1 + monday
  becomes:

  week-01-monday
*/
export function createBibleLessonId(
  week: number,
  day: string
): string {
  const weekNumber = String(week).padStart(
    2,
    "0"
  );

  return `week-${weekNumber}-${day.toLowerCase()}`;
}

/*
  Returns the absolute location of a
  lesson's folder on the server.

  This will be useful when we build the
  resource/download system.
*/
export function getBibleLessonDirectory(
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

  return path.join(
    process.cwd(),
    "content",
    "bible",
    "semester-1",
    `week-${weekNumber}`,
    day
  );
}