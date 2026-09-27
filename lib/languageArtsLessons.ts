import fs from "fs";
import path from "path";

export type LanguageArtsResource = {
  title: string;
  file: string;
};

export type LanguageArtsLessonResources = {
  reading?: LanguageArtsResource[];
  grammar?: LanguageArtsResource[];
  writing?: LanguageArtsResource[];
  spelling?: LanguageArtsResource[];
  vocabulary?: LanguageArtsResource[];
  handwriting?: LanguageArtsResource[];
  teacher?: LanguageArtsResource[];
};

export type LanguageArtsLesson = {
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

  literature?: string;
  reading?: string;
  grammar?: string;
  writing?: string;
  spelling?: string;
  vocabulary?: string;
  handwriting?: string;
  skillFocus?: string;

  theme: string;

  resources?: LanguageArtsLessonResources;
};

export function getLanguageArtsLesson(
  lessonId: string
): LanguageArtsLesson | null {
  const parts = lessonId.split("-");

  /*
    Expected lesson ID:

    week-01-monday
  */
  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    console.error(
      "Invalid Language Arts lesson ID:",
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
      "Invalid Language Arts lesson day:",
      day
    );

    return null;
  }

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "language-arts",
    "semester-1",
    `week-${weekNumber}`,
    day,
    "lesson.json"
  );

  console.log(
    "Loading Language Arts lesson:",
    lessonPath
  );

  /*
    No lesson.json means the day's
    Language Arts lesson has not
    been published yet.
  */
  if (!fs.existsSync(lessonPath)) {
    console.log(
      "Language Arts lesson not published:",
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
      JSON.parse(raw) as LanguageArtsLesson;

    return lesson;
  } catch (error) {
    console.error(
      "Error reading Language Arts lesson:",
      error
    );

    return null;
  }
}

/*
  Determine whether a Language Arts
  lesson has been published for a
  particular week and day.
*/
export function languageArtsLessonExists(
  week: number,
  day: string
): boolean {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "language-arts",
    "semester-1",
    `week-${weekNumber}`,
    day.toLowerCase(),
    "lesson.json"
  );

  return fs.existsSync(lessonPath);
}

/*
  Create the standard Language Arts
  lesson ID.

  Example:

  Week 1 + Monday

  becomes:

  week-01-monday
*/
export function createLanguageArtsLessonId(
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
  a Language Arts lesson package.

  Example:

  content/
    language-arts/
      semester-1/
        week-01/
          monday/
*/
export function getLanguageArtsLessonDirectory(
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
    "language-arts",
    "semester-1",
    `week-${weekNumber}`,
    day
  );
}