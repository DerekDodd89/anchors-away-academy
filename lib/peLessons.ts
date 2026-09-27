import fs from "fs";
import path from "path";

export type PEResource = {
  title: string;
  file: string;
};

export type PELessonResources = {
  student?: PEResource[];
  activities?: PEResource[];
  fitness?: PEResource[];
  games?: PEResource[];
  assessments?: PEResource[];
  teacher?: PEResource[];
};

export type PEStudentModification = {
  student: string;
  modification: string;
};

export type PELesson = {
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

  activity?: string;
  warmUp?: string;
  skillFocus?: string;
  workout?: string;
  game?: string;
  duration?: string;
  equipment?: string;
  fitnessFocus?: string;
  outdoorActivity?: string;
  coolDown?: string;

  studentModifications?: PEStudentModification[];

  theme: string;

  resources?: PELessonResources;
};

const validDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

function parsePELessonId(
  lessonId: string
) {
  const match = lessonId.match(
    /^week-(\d{2})-(monday|tuesday|wednesday|thursday|friday)$/
  );

  if (!match) {
    return null;
  }

  const week = Number(
    match[1]
  );

  const day = match[2];

  if (
    !Number.isInteger(week) ||
    week < 1 ||
    week > 12 ||
    !validDays.includes(day)
  ) {
    return null;
  }

  return {
    week,
    day,
  };
}

export function getPELessonDirectory(
  lessonId: string
) {
  const parsed =
    parsePELessonId(
      lessonId
    );

  if (!parsed) {
    return null;
  }

  const paddedWeek =
    String(parsed.week).padStart(
      2,
      "0"
    );

  return path.join(
    process.cwd(),
    "content",
    "pe",
    "semester-1",
    `week-${paddedWeek}`,
    parsed.day
  );
}

export function getPELesson(
  lessonId: string
): PELesson | null {
  const lessonDirectory =
    getPELessonDirectory(
      lessonId
    );

  if (!lessonDirectory) {
    return null;
  }

  const lessonPath =
    path.join(
      lessonDirectory,
      "lesson.json"
    );

  if (
    !fs.existsSync(
      lessonPath
    )
  ) {
    return null;
  }

  try {
    const file =
      fs.readFileSync(
        lessonPath,
        "utf8"
      );

    const lesson =
      JSON.parse(
        file
      ) as PELesson;

    return lesson;
  } catch (error) {
    console.error(
      `Unable to read P.E. lesson: ${lessonId}`,
      error
    );

    return null;
  }
}

export function peLessonExists(
  week: number,
  day: string
) {
  const lessonId =
    createPELessonId(
      week,
      day
    );

  return (
    getPELesson(
      lessonId
    ) !== null
  );
}

export function createPELessonId(
  week: number,
  day: string
) {
  const normalizedDay =
    day.toLowerCase();

  if (
    !Number.isInteger(week) ||
    week < 1 ||
    week > 12 ||
    !validDays.includes(
      normalizedDay
    )
  ) {
    throw new Error(
      "Invalid P.E. week or day."
    );
  }

  return `week-${String(
    week
  ).padStart(
    2,
    "0"
  )}-${normalizedDay}`;
}