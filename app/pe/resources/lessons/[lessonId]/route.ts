import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

type RouteProps = {
  params: Promise<{
    lessonId: string;
    fileName: string;
  }>;
};

const validDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

function getContentType(
  fileName: string
): string {
  const extension = path
    .extname(fileName)
    .toLowerCase();

  switch (extension) {
    case ".pdf":
      return "application/pdf";

    case ".doc":
      return "application/msword";

    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    case ".xls":
      return "application/vnd.ms-excel";

    case ".xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    case ".ppt":
      return "application/vnd.ms-powerpoint";

    case ".pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";

    case ".png":
      return "image/png";

    case ".jpg":
    case ".jpeg":
      return "image/jpeg";

    case ".webp":
      return "image/webp";

    case ".txt":
      return "text/plain; charset=utf-8";

    case ".csv":
      return "text/csv; charset=utf-8";

    default:
      return "application/octet-stream";
  }
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  const {
    lessonId,
    fileName,
  } = await params;

  /*
    Expected lesson ID:

    week-01-monday
  */
  const parts =
    lessonId.split("-");

  if (
    parts.length !== 3 ||
    parts[0] !== "week"
  ) {
    return new NextResponse(
      "Invalid lesson ID.",
      {
        status: 400,
      }
    );
  }

  const weekNumber =
    Number(parts[1]);

  const day =
    parts[2].toLowerCase();

  /*
    Validate week.
  */
  if (
    !Number.isInteger(weekNumber) ||
    weekNumber < 1 ||
    weekNumber > 12
  ) {
    return new NextResponse(
      "Invalid week.",
      {
        status: 400,
      }
    );
  }

  /*
    Validate weekday.
  */
  if (!validDays.includes(day)) {
    return new NextResponse(
      "Invalid lesson day.",
      {
        status: 400,
      }
    );
  }

  /*
    Decode the filename and remove
    any directory information.
  */
  const decodedFileName =
    decodeURIComponent(fileName);

  const safeFileName =
    path.basename(decodedFileName);

  if (
    !safeFileName ||
    safeFileName !== decodedFileName
  ) {
    return new NextResponse(
      "Invalid filename.",
      {
        status: 400,
      }
    );
  }

  const paddedWeek =
    String(weekNumber).padStart(
      2,
      "0"
    );

  /*
    P.E. resources live beside
    lesson.json.

    Example:

    content/
      pe/
        semester-1/
          week-01/
            monday/
              lesson.json
              activity-sheet.pdf
              fitness-log.pdf
  */
  const filePath = path.join(
    process.cwd(),
    "content",
    "pe",
    "semester-1",
    `week-${paddedWeek}`,
    day,
    safeFileName
  );

  /*
    Resource does not exist.
  */
  if (!fs.existsSync(filePath)) {
    return new NextResponse(
      "Resource not found.",
      {
        status: 404,
      }
    );
  }

  try {
    const fileBuffer =
      fs.readFileSync(filePath);

    const contentType =
      getContentType(
        safeFileName
      );

    return new NextResponse(
      fileBuffer,
      {
        status: 200,

        headers: {
          "Content-Type":
            contentType,

          "Content-Disposition":
            `inline; filename="${safeFileName}"`,

          "Cache-Control":
            "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error serving P.E. resource:",
      error
    );

    return new NextResponse(
      "Unable to load resource.",
      {
        status: 500,
      }
    );
  }
}