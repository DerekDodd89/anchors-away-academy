import fs from "fs";
import path from "path";

/* =========================================================
   FOREIGN LANGUAGE TYPES
   ========================================================= */

export type ForeignLanguageSlug =
  | "english"
  | "spanish"
  | "french"
  | "german"
  | "latin"
  | "koine-greek"
  | "modern-greek"
  | "biblical-hebrew"
  | "chinese";

export type ForeignLanguageLevel =
  | "elementary"
  | "middle-school"
  | "advanced";

export type ForeignLanguageResource = {
  title: string;
  file: string;
  category?: string;
  level?: ForeignLanguageLevel;
};

export type LanguageMemoryWork = {
  title?: string;
  prompt?: string;
  text?: string;
  translation?: string;
};

export type LanguageGame = {
  title: string;
  instructions?: string;
  materials?: string[];
};

export type LanguagePractice = {
  title: string;
  instructions?: string;
};

export type LanguageQuizItem = {
  question: string;
  answer?: string;
  options?: string[];
};

export type LanguageLevelContent = {
  title?: string;
  focus?: string;

  vocabulary?: string[];
  grammar?: string[];
  conversation?: string[];
  reading?: string[];
  writing?: string[];
  translation?: string[];

  lesson?: string[];
  memoryWork?: LanguageMemoryWork[];
  games?: LanguageGame[];
  practice?: LanguagePractice[];
  quiz?: LanguageQuizItem[];
};

export type ForeignLanguageLesson = {
  id: string;

  language: ForeignLanguageSlug;

  semester: number;
  week: number;

  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday";

  title: string;
  subtitle?: string;
  focus?: string;
  summary?: string;

  levels?: {
    elementary?: LanguageLevelContent;
    "middle-school"?: LanguageLevelContent;
    advanced?: LanguageLevelContent;
  };

  resources?: {
    student?: ForeignLanguageResource[];
    teacher?: ForeignLanguageResource[];
    printables?: ForeignLanguageResource[];
    audio?: ForeignLanguageResource[];
    games?: ForeignLanguageResource[];
    quizzes?: ForeignLanguageResource[];
  };
};

/* =========================================================
   LANGUAGE INFORMATION
   ========================================================= */

export const FOREIGN_LANGUAGES = [
  {
    slug: "english",
    name: "English",
    shortName: "English",
    type: "modern",
    description:
      "Strengthen English vocabulary, grammar, communication, and language awareness.",
  },

  {
    slug: "spanish",
    name: "Spanish",
    shortName: "Spanish",
    type: "modern",
    description:
      "Build practical Spanish vocabulary, conversation, reading, and writing skills.",
  },

  {
    slug: "french",
    name: "French",
    shortName: "French",
    type: "modern",
    description:
      "Explore French through vocabulary, conversation, reading, writing, and culture.",
  },

  {
    slug: "german",
    name: "German",
    shortName: "German",
    type: "modern",
    description:
      "Develop German vocabulary, grammar, conversation, reading, and writing skills.",
  },

  {
    slug: "latin",
    name: "Latin",
    shortName: "Latin",
    type: "classical",
    description:
      "Study Latin vocabulary, grammar, roots, translation, and classical language structure.",
  },

  {
    slug: "koine-greek",
    name: "Koine Greek",
    shortName: "Koine Greek",
    type: "biblical",
    description:
      "Learn the vocabulary, grammar, morphology, and reading skills of New Testament Greek.",
  },

  {
    slug: "modern-greek",
    name: "Modern Greek",
    shortName: "Modern Greek",
    type: "modern",
    description:
      "Develop practical Modern Greek vocabulary, reading, writing, and conversation.",
  },

  {
    slug: "biblical-hebrew",
    name: "Biblical Hebrew",
    shortName: "Bible Hebrew",
    type: "biblical",
    description:
      "Learn the alphabet, vocabulary, grammar, and reading skills of Biblical Hebrew.",
  },

  {
    slug: "chinese",
    name: "Chinese",
    shortName: "Chinese",
    type: "modern",
    description:
      "Develop foundational Chinese listening, speaking, vocabulary, characters, and reading skills.",
  },
] as const;

/* =========================================================
   LEVEL INFORMATION
   ========================================================= */

export const FOREIGN_LANGUAGE_LEVELS = [
  {
    slug: "elementary",
    name: "Elementary",
    ages: "Ages 7–10",
    description:
      "Vocabulary, listening, speaking, memory work, games, and introductory reading and writing.",
  },

  {
    slug: "middle-school",
    name: "Middle School",
    ages: "Ages 11–14",
    description:
      "Vocabulary, grammar, conversation, reading, writing, exercises, and quizzes.",
  },

  {
    slug: "advanced",
    name: "Advanced",
    ages: "Ages 15+",
    description:
      "Deeper grammar, composition, translation, conversation, reading, and assessment.",
  },
] as const;

/* =========================================================
   WEEK INFORMATION
   ========================================================= */

export const FOREIGN_LANGUAGE_WEEKS = [
  {
    week: 1,
    label: "Week 1",
    dates: "August 17–21",
  },
  {
    week: 2,
    label: "Week 2",
    dates: "August 24–28",
  },
  {
    week: 3,
    label: "Week 3",
    dates: "August 31–September 4",
  },
  {
    week: 4,
    label: "Week 4",
    dates: "September 7–11",
  },
  {
    week: 5,
    label: "Week 5",
    dates: "September 14–18",
  },
  {
    week: 6,
    label: "Week 6",
    dates: "September 21–25",
  },
  {
    week: 7,
    label: "Week 7",
    dates: "September 28–October 2",
  },
  {
    week: 8,
    label: "Week 8",
    dates: "October 5–9",
  },
  {
    week: 9,
    label: "Week 9",
    dates: "October 12–16",
  },
  {
    week: 10,
    label: "Week 10",
    dates: "October 19–23",
  },
  {
    week: 11,
    label: "Week 11",
    dates: "October 26–30",
  },
  {
    week: 12,
    label: "Week 12",
    dates: "November 2–6",
  },
] as const;

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

/* =========================================================
   VALIDATION
   ========================================================= */

export function isForeignLanguageSlug(
  value: string
): value is ForeignLanguageSlug {
  return FOREIGN_LANGUAGES.some(
    (language) =>
      language.slug === value
  );
}

export function isForeignLanguageLevel(
  value: string
): value is ForeignLanguageLevel {
  return FOREIGN_LANGUAGE_LEVELS.some(
    (level) =>
      level.slug === value
  );
}

export function getForeignLanguage(
  slug: string
) {
  return FOREIGN_LANGUAGES.find(
    (language) =>
      language.slug === slug
  );
}

/* =========================================================
   FILESYSTEM HELPERS
   ========================================================= */

function getLanguageRoot(
  language: ForeignLanguageSlug
) {
  return path.join(
    process.cwd(),
    "content",
    "foreign-languages",
    language
  );
}

function getLessonDirectory(
  language: ForeignLanguageSlug,
  week: number,
  day: string
) {
  return path.join(
    getLanguageRoot(language),
    "semester-1",
    `week-${String(week).padStart(
      2,
      "0"
    )}`,
    day
  );
}

function getLessonFile(
  language: ForeignLanguageSlug,
  week: number,
  day: string
) {
  return path.join(
    getLessonDirectory(
      language,
      week,
      day
    ),
    "lesson.json"
  );
}

/* =========================================================
   LESSON ID
   ========================================================= */

export function buildForeignLanguageLessonId(
  language: ForeignLanguageSlug,
  week: number,
  day: string
) {
  return `${language}-week-${String(
    week
  ).padStart(2, "0")}-${day}`;
}

/* =========================================================
   READ LESSON
   ========================================================= */

export function getForeignLanguageLesson(
  language: ForeignLanguageSlug,
  week: number,
  day: string
): ForeignLanguageLesson | null {
  if (
    week < 1 ||
    week > 12 ||
    !DAYS.includes(
      day as (typeof DAYS)[number]
    )
  ) {
    return null;
  }

  const lessonFile =
    getLessonFile(
      language,
      week,
      day
    );

  if (
    !fs.existsSync(lessonFile)
  ) {
    return null;
  }

  try {
    const raw =
      fs.readFileSync(
        lessonFile,
        "utf8"
      );

    const parsed =
      JSON.parse(raw) as ForeignLanguageLesson;

    return {
      ...parsed,

      id:
        parsed.id ||
        buildForeignLanguageLessonId(
          language,
          week,
          day
        ),

      language,

      semester:
        parsed.semester || 1,

      week,

      day:
        day as ForeignLanguageLesson["day"],
    };
  } catch (error) {
    console.error(
      `Unable to read Foreign Languages lesson: ${lessonFile}`,
      error
    );

    return null;
  }
}

/* =========================================================
   WEEK LESSONS
   ========================================================= */

export function getForeignLanguageWeekLessons(
  language: ForeignLanguageSlug,
  week: number
) {
  return DAYS.map((day) => ({
    day,
    lessonId:
      buildForeignLanguageLessonId(
        language,
        week,
        day
      ),

    lesson:
      getForeignLanguageLesson(
        language,
        week,
        day
      ),
  }));
}

/* =========================================================
   LEVEL CONTENT
   ========================================================= */

export function getForeignLanguageLevelContent(
  lesson: ForeignLanguageLesson,
  level: ForeignLanguageLevel
) {
  return (
    lesson.levels?.[level] ??
    null
  );
}

/* =========================================================
   RESOURCES
   ========================================================= */

export function getForeignLanguageResources(
  lesson: ForeignLanguageLesson
) {
  const resources =
    lesson.resources;

  if (!resources) {
    return [];
  }

  return [
    ...(resources.student ?? []),
    ...(resources.teacher ?? []),
    ...(resources.printables ?? []),
    ...(resources.audio ?? []),
    ...(resources.games ?? []),
    ...(resources.quizzes ?? []),
  ];
}

/* =========================================================
   RESOURCE COUNTS
   ========================================================= */

export function getForeignLanguageResourceCount(
  lesson: ForeignLanguageLesson
) {
  return getForeignLanguageResources(
    lesson
  ).length;
}

/* =========================================================
   AVAILABLE LEVELS
   ========================================================= */

export function getAvailableLanguageLevels(
  lesson: ForeignLanguageLesson
) {
  return FOREIGN_LANGUAGE_LEVELS.filter(
    (level) =>
      Boolean(
        lesson.levels?.[
          level.slug
        ]
      )
  );
}

/* =========================================================
   LANGUAGE STATISTICS
   ========================================================= */

export function getForeignLanguageStats(
  language: ForeignLanguageSlug
) {
  let publishedLessons = 0;
  let resources = 0;

  for (
    let week = 1;
    week <= 12;
    week++
  ) {
    for (const day of DAYS) {
      const lesson =
        getForeignLanguageLesson(
          language,
          week,
          day
        );

      if (!lesson) {
        continue;
      }

      publishedLessons++;

      resources +=
        getForeignLanguageResourceCount(
          lesson
        );
    }
  }

  return {
    publishedLessons,
    resources,
  };
}

/* =========================================================
   ALL LANGUAGE STATISTICS
   ========================================================= */

export function getAllForeignLanguageStats() {
  return FOREIGN_LANGUAGES.map(
    (language) => ({
      ...language,
      ...getForeignLanguageStats(
        language.slug
      ),
    })
  );
}