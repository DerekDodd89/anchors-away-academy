import fs from "fs";
import path from "path";

export type ScienceResource = {
  title: string;
  file: string;
};

export type ScienceLessonResources = {
  elementary?: ScienceResource[];
  middleSchool?: ScienceResource[];
  teacher?: ScienceResource[];
  experiments?: ScienceResource[];
  journal?: ScienceResource[];
};

export type ScienceLesson = {
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
  field?: string;
  bigIdea?: string;
  question?: string;

  theme: string;

  resources?: ScienceLessonResources;
};

export function getScienceLesson(
  lessonId: string
): ScienceLesson | null {
  const parts = lessonId.split("-");

  /*
    Expected lesson ID:

    week-01-wednesday
  */
  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    console.error(
      "Invalid Science lesson ID:",
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
      "Invalid Science lesson day:",
      day
    );

    return null;
  }

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "science",
    "semester-1",
    `week-${weekNumber}`,
    day,
    "lesson.json"
  );

  console.log(
    "Loading Science lesson:",
    lessonPath
  );

  /*
    No lesson.json means the day has
    not been published yet.
  */
  if (!fs.existsSync(lessonPath)) {
    console.log(
      "Science lesson not published:",
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
      JSON.parse(raw) as ScienceLesson;

    return lesson;
  } catch (error) {
    console.error(
      "Error reading Science lesson:",
      error
    );

    return null;
  }
}

/*
  Determine whether a Science lesson
  has been published for a particular
  week and day.
*/
export function scienceLessonExists(
  week: number,
  day: string
): boolean {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "science",
    "semester-1",
    `week-${weekNumber}`,
    day.toLowerCase(),
    "lesson.json"
  );

  return fs.existsSync(lessonPath);
}

/*
  Create the standard Science lesson ID.

  Example:

  Week 1 + Wednesday

  becomes:

  week-01-wednesday
*/
export function createScienceLessonId(
  week: number,
  day: string
): string {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  return `week-${weekNumber}-${day.toLowerCase()}`;
}

/*
  Return the server directory containing
  a Science lesson package.

  Example:

  content/
    science/
      semester-1/
        week-01/
          wednesday/
*/
export function getScienceLessonDirectory(
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
    "science",
    "semester-1",
    `week-${weekNumber}`,
    day
  );
}