import fs from "fs";
import path from "path";

import {
  NextRequest,
  NextResponse,
} from "next/server";

type RouteContext = {
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

    default:
      return "application/octet-stream";
  }
}

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const {
    lessonId,
    fileName,
  } = await context.params;

  /*
    Expected lesson ID:

    week-01-friday
  */
  const parts = lessonId.split("-");

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

  const weekNumber = parts[1];
  const day = parts[2].toLowerCase();

  /*
    Validate week.
  */
  const parsedWeek =
    Number(weekNumber);

  if (
    !Number.isInteger(parsedWeek) ||
    parsedWeek < 1 ||
    parsedWeek > 12
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
    Prevent directory traversal.
  */
  const safeFileName =
    path.basename(fileName);

  const filePath = path.join(
    process.cwd(),
    "content",
    "art",
    "semester-1",
    `week-${weekNumber}`,
    day,
    safeFileName
  );

  /*
    Requested Art resource
    must exist.
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
      getContentType(safeFileName);

    return new NextResponse(
      fileBuffer,
      {
        status: 200,

        headers: {
          "Content-Type":
            contentType,

          /*
            PDFs and images open in the
            browser instead of forcing
            an immediate download.
          */
          "Content-Disposition":
            `inline; filename="${safeFileName}"`,

          "Cache-Control":
            "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error serving Art resource:",
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