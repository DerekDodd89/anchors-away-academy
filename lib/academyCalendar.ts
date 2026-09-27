import fs from "fs";
import path from "path";

/* =========================================================
   ANCHORS AWAY HOMESCHOOL ACADEMY
   ACADEMY CALENDAR ENGINE

   Purpose:
   - Convert a calendar date into Semester / Week / Day
   - Find each subject's lesson.json for that day
   - Normalize different subject lesson formats
   - Supply one common structure to the Daily Dashboard
   ========================================================= */


/* =========================================================
   TYPES
   ========================================================= */

export type AcademySubjectSlug =
  | "bible"
  | "history"
  | "science"
  | "foreign-languages"
  | "art"
  | "language-arts"
  | "math"
  | "pe";


export type AcademyResource = {
  title: string;
  file: string;
  category?: string;
};


export type DailySubject = {
  slug: AcademySubjectSlug;

  name: string;

  image: string;

  href: string;

  lessonId: string | null;

  published: boolean;

  title: string | null;

  subtitle: string | null;

  summary: string | null;

  resources: AcademyResource[];

  resourceCount: number;
};


export type AcademyCalendarDay = {
  date: string;

  displayDate: string;

  dayName: string;

  daySlug: string;

  schoolYear: string;

  semester: number | null;

  week: number | null;

  isSchoolDay: boolean;

  isWithinSemester: boolean;

  subjects: DailySubject[];

  publishedSubjectCount: number;

  resourceCount: number;
};


/* =========================================================
   SUBJECT CONFIGURATION
   ========================================================= */

const subjects: {
  slug: AcademySubjectSlug;
  name: string;
  image: string;
}[] = [
  {
    slug: "bible",
    name: "Bible",
    image: "/images/subjects/bible.png",
  },
  {
    slug: "history",
    name: "History",
    image: "/images/subjects/history.png",
  },
  {
    slug: "science",
    name: "Science",
    image: "/images/subjects/science.png",
  },
  {
    slug: "foreign-languages",
    name: "Foreign Languages",
    image:
      "/images/subjects/foreign-languages.png",
  },
  {
    slug: "art",
    name: "Art",
    image: "/images/subjects/art.png",
  },
  {
    slug: "language-arts",
    name: "Language Arts",
    image:
      "/images/subjects/language-arts.png",
  },
  {
    slug: "math",
    name: "Math",
    image: "/images/subjects/math.png",
  },
  {
    slug: "pe",
    name: "P.E.",
    image: "/images/subjects/pe.png",
  },
];


/* =========================================================
   SEMESTER 1 CALENDAR

   Week 1 begins:
   Monday, August 17, 2026

   Week 12 ends:
   Friday, November 6, 2026
   ========================================================= */

const semesterOneWeeks = [
  {
    week: 1,
    start: "2026-08-17",
    end: "2026-08-21",
  },
  {
    week: 2,
    start: "2026-08-24",
    end: "2026-08-28",
  },
  {
    week: 3,
    start: "2026-08-31",
    end: "2026-09-04",
  },
  {
    week: 4,
    start: "2026-09-07",
    end: "2026-09-11",
  },
  {
    week: 5,
    start: "2026-09-14",
    end: "2026-09-18",
  },
  {
    week: 6,
    start: "2026-09-21",
    end: "2026-09-25",
  },
  {
    week: 7,
    start: "2026-09-28",
    end: "2026-10-02",
  },
  {
    week: 8,
    start: "2026-10-05",
    end: "2026-10-09",
  },
  {
    week: 9,
    start: "2026-10-12",
    end: "2026-10-16",
  },
  {
    week: 10,
    start: "2026-10-19",
    end: "2026-10-23",
  },
  {
    week: 11,
    start: "2026-10-26",
    end: "2026-10-30",
  },
  {
    week: 12,
    start: "2026-11-02",
    end: "2026-11-06",
  },
];


/* =========================================================
   DATE HELPERS

   We intentionally treat YYYY-MM-DD as a calendar date,
   rather than relying on browser/local timezone conversion.
   ========================================================= */

function parseDateParts(dateString: string) {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(
      dateString
    );

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(
    Date.UTC(year, month - 1, day)
  );

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return {
    year,
    month,
    day,
    date,
  };
}


function formatDate(
  dateString: string
) {
  const parsed =
    parseDateParts(dateString);

  if (!parsed) {
    return dateString;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(parsed.date);
}


function getDayInformation(
  dateString: string
) {
  const parsed =
    parseDateParts(dateString);

  if (!parsed) {
    return {
      dayName: "",
      daySlug: "",
      isSchoolDay: false,
    };
  }

  const dayNumber =
    parsed.date.getUTCDay();

  const dayMap: Record<
    number,
    {
      name: string;
      slug: string;
    }
  > = {
    0: {
      name: "Sunday",
      slug: "sunday",
    },
    1: {
      name: "Monday",
      slug: "monday",
    },
    2: {
      name: "Tuesday",
      slug: "tuesday",
    },
    3: {
      name: "Wednesday",
      slug: "wednesday",
    },
    4: {
      name: "Thursday",
      slug: "thursday",
    },
    5: {
      name: "Friday",
      slug: "friday",
    },
    6: {
      name: "Saturday",
      slug: "saturday",
    },
  };

  const day = dayMap[dayNumber];

  return {
    dayName: day.name,
    daySlug: day.slug,

    isSchoolDay:
      dayNumber >= 1 &&
      dayNumber <= 5,
  };
}


/* =========================================================
   SCHOOL WEEK LOOKUP
   ========================================================= */

export function getAcademyWeekForDate(
  dateString: string
) {
  const week =
    semesterOneWeeks.find(
      (item) =>
        dateString >= item.start &&
        dateString <= item.end
    );

  if (!week) {
    return null;
  }

  return {
    schoolYear: "2026-2027",
    semester: 1,
    week: week.week,
  };
}


/* =========================================================
   LESSON DIRECTORY
   ========================================================= */

function getLessonDirectory(
  subject: AcademySubjectSlug,
  week: number,
  daySlug: string
) {
  return path.join(
    process.cwd(),
    "content",
    subject,
    "semester-1",
    `week-${String(week).padStart(
      2,
      "0"
    )}`,
    daySlug
  );
}


/* =========================================================
   LESSON ID
   ========================================================= */

function createLessonId(
  week: number,
  daySlug: string
) {
  return `week-${String(
    week
  ).padStart(2, "0")}-${daySlug}`;
}


/* =========================================================
   RESOURCE NORMALIZATION

   Different subject modules may have different resource
   categories. The calendar does not need to understand
   those differences.

   It simply gathers every resource array it finds.
   ========================================================= */

function normalizeResources(
  lesson: Record<string, unknown>
): AcademyResource[] {
  const resources =
    lesson.resources;

  if (
    !resources ||
    typeof resources !== "object" ||
    Array.isArray(resources)
  ) {
    return [];
  }

  const normalized:
    AcademyResource[] = [];

  for (const [
    category,
    value,
  ] of Object.entries(
    resources as Record<
      string,
      unknown
    >
  )) {
    if (!Array.isArray(value)) {
      continue;
    }

    for (const item of value) {
      if (
        !item ||
        typeof item !== "object"
      ) {
        continue;
      }

      const resource =
        item as Record<
          string,
          unknown
        >;

      if (
        typeof resource.title !==
          "string" ||
        typeof resource.file !==
          "string"
      ) {
        continue;
      }

      normalized.push({
        title: resource.title,
        file: resource.file,
        category,
      });
    }
  }

  return normalized;
}


/* =========================================================
   LESSON SUMMARY

   Because subject lesson.json files have different fields,
   this selects the first useful descriptive field.
   ========================================================= */

function getLessonSummary(
  lesson: Record<string, unknown>
) {
  const candidates = [
    lesson.summary,
    lesson.bigIdea,
    lesson.focus,
    lesson.activity,
    lesson.skillFocus,
    lesson.concept,
    lesson.theme,
    lesson.topic,
  ];

  for (const candidate of candidates) {
    if (
      typeof candidate ===
        "string" &&
      candidate.trim()
    ) {
      return candidate;
    }
  }

  return null;
}


/* =========================================================
   READ ONE SUBJECT FOR ONE DAY
   ========================================================= */

function getDailySubject(
  subject: {
    slug: AcademySubjectSlug;
    name: string;
    image: string;
  },
  week: number | null,
  daySlug: string
): DailySubject {
  /*
   * No valid school week means there cannot
   * be a published lesson for this date.
   */

  if (!week) {
    return {
      slug: subject.slug,
      name: subject.name,
      image: subject.image,

      href: `/${subject.slug}`,

      lessonId: null,

      published: false,

      title: null,

      subtitle: null,

      summary: null,

      resources: [],

      resourceCount: 0,
    };
  }

  const lessonId =
    createLessonId(
      week,
      daySlug
    );

  const lessonDirectory =
    getLessonDirectory(
      subject.slug,
      week,
      daySlug
    );

  const lessonPath =
    path.join(
      lessonDirectory,
      "lesson.json"
    );

  if (
    !fs.existsSync(lessonPath)
  ) {
    return {
      slug: subject.slug,
      name: subject.name,
      image: subject.image,

      href: `/${subject.slug}`,

      lessonId,

      published: false,

      title: null,

      subtitle: null,

      summary: null,

      resources: [],

      resourceCount: 0,
    };
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
      ) as Record<
        string,
        unknown
      >;

    const resources =
      normalizeResources(
        lesson
      );

    const title =
      typeof lesson.title ===
      "string"
        ? lesson.title
        : "Today's Lesson";

    const subtitle =
      typeof lesson.subtitle ===
      "string"
        ? lesson.subtitle
        : null;

    return {
      slug: subject.slug,

      name: subject.name,

      image: subject.image,

      href: `/${subject.slug}/lessons/${lessonId}`,

      lessonId,

      published: true,

      title,

      subtitle,

      summary:
        getLessonSummary(
          lesson
        ),

      resources,

      resourceCount:
        resources.length,
    };
  } catch (error) {
    console.error(
      `Unable to read ${subject.name} lesson:`,
      lessonPath,
      error
    );

    return {
      slug: subject.slug,
      name: subject.name,
      image: subject.image,

      href: `/${subject.slug}`,

      lessonId,

      published: false,

      title: null,

      subtitle: null,

      summary: null,

      resources: [],

      resourceCount: 0,
    };
  }
}


/* =========================================================
   MAIN DAILY CALENDAR FUNCTION

   This is the function the Daily Dashboard will use.
   ========================================================= */

export function getAcademyDay(
  dateString: string
): AcademyCalendarDay {
  const day =
    getDayInformation(
      dateString
    );

  const schoolWeek =
    getAcademyWeekForDate(
      dateString
    );

  const subjectsForDay =
    subjects.map(
      (subject) =>
        getDailySubject(
          subject,
          schoolWeek?.week ??
            null,
          day.daySlug
        )
    );

  const publishedSubjectCount =
    subjectsForDay.filter(
      (subject) =>
        subject.published
    ).length;

  const resourceCount =
    subjectsForDay.reduce(
      (total, subject) =>
        total +
        subject.resourceCount,
      0
    );

  return {
    date: dateString,

    displayDate:
      formatDate(
        dateString
      ),

    dayName:
      day.dayName,

    daySlug:
      day.daySlug,

    schoolYear:
      schoolWeek?.schoolYear ??
      "2026-2027",

    semester:
      schoolWeek?.semester ??
      null,

    week:
      schoolWeek?.week ??
      null,

    isSchoolDay:
      day.isSchoolDay,

    isWithinSemester:
      Boolean(schoolWeek),

    subjects:
      subjectsForDay,

    publishedSubjectCount,

    resourceCount,
  };
}


/* =========================================================
   DOES DATE HAVE PUBLISHED CONTENT?

   MonthCalendar will eventually use this to put a small
   indicator on dates containing lessons.
   ========================================================= */

export function academyDateHasContent(
  dateString: string
) {
  const day =
    getAcademyDay(
      dateString
    );

  return (
    day.publishedSubjectCount >
    0
  );
}


/* =========================================================
   EXPORTED SUBJECT LIST

   Useful later for parent/student filtering.
   ========================================================= */

export function getAcademySubjects() {
  return [...subjects];
}