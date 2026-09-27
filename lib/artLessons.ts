import fs from "fs";
import path from "path";

export type ArtResource = {
  title: string;
  file: string;
};

export type ArtLessonResources = {
  elementary?: ArtResource[];
  middleSchool?: ArtResource[];
  teacher?: ArtResource[];
  projects?: ArtResource[];
  artistStudy?: ArtResource[];
};

export type ArtLesson = {
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

  artist?: string;
  artForm?: string;
  medium?: string;
  technique?: string;
  project?: string;
  materials?: string[];
  creativeFocus?: string;

  theme: string;

  resources?: ArtLessonResources;
};

export function getArtLesson(
  lessonId: string
): ArtLesson | null {
  const parts = lessonId.split("-");

  /*
    Expected lesson ID:

    week-01-friday
  */
  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    console.error(
      "Invalid Art lesson ID:",
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
      "Invalid Art lesson day:",
      day
    );

    return null;
  }

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "art",
    "semester-1",
    `week-${weekNumber}`,
    day,
    "lesson.json"
  );

  console.log(
    "Loading Art lesson:",
    lessonPath
  );

  /*
    No lesson.json means the day's
    Art lesson has not been published.
  */
  if (!fs.existsSync(lessonPath)) {
    console.log(
      "Art lesson not published:",
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
      JSON.parse(raw) as ArtLesson;

    return lesson;
  } catch (error) {
    console.error(
      "Error reading Art lesson:",
      error
    );

    return null;
  }
}

/*
  Determine whether an Art lesson
  has been published for a particular
  week and day.
*/
export function artLessonExists(
  week: number,
  day: string
): boolean {
  const weekNumber = String(
    week
  ).padStart(2, "0");

  const lessonPath = path.join(
    process.cwd(),
    "content",
    "art",
    "semester-1",
    `week-${weekNumber}`,
    day.toLowerCase(),
    "lesson.json"
  );

  return fs.existsSync(lessonPath);
}

/*
  Create the standard Art lesson ID.

  Example:

  Week 1 + Friday

  becomes:

  week-01-friday
*/
export function createArtLessonId(
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
  an Art lesson package.

  Example:

  content/
    art/
      semester-1/
        week-01/
          friday/
*/
export function getArtLessonDirectory(
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
    "art",
    "semester-1",
    `week-${weekNumber}`,
    day
  );
}