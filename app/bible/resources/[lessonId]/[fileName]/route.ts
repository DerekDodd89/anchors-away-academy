import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      lessonId: string;
      fileName: string;
    }>;
  }
) {
  const { lessonId, fileName } = await params;

  /*
    Expected lesson ID:
    week-01-monday
  */
  const lessonParts = lessonId.split("-");

  if (
    lessonParts.length !== 3 ||
    lessonParts[0] !== "week"
  ) {
    return new NextResponse(
      "Invalid lesson ID",
      {
        status: 400,
      }
    );
  }

  const weekNumber = lessonParts[1];
  const day = lessonParts[2].toLowerCase();

  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  if (!validDays.includes(day)) {
    return new NextResponse(
      "Invalid lesson day",
      {
        status: 400,
      }
    );
  }

  /*
    Security:
    Only allow the actual filename.
    This prevents paths such as ../../
    from being passed through the URL.
  */
  const safeFileName = path.basename(fileName);

  if (safeFileName !== fileName) {
    return new NextResponse(
      "Invalid file name",
      {
        status: 400,
      }
    );
  }

  const filePath = path.join(
    process.cwd(),
    "content",
    "bible",
    "semester-1",
    `week-${weekNumber}`,
    day,
    safeFileName
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse(
      "Resource not found",
      {
        status: 404,
      }
    );
  }

  try {
    const fileBuffer =
      fs.readFileSync(filePath);

    const extension = path
      .extname(safeFileName)
      .toLowerCase();

    let contentType =
      "application/octet-stream";

    switch (extension) {
      case ".pdf":
        contentType =
          "application/pdf";
        break;

      case ".docx":
        contentType =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;

      case ".pptx":
        contentType =
          "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        break;

      case ".png":
        contentType = "image/png";
        break;

      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
    }

    return new NextResponse(fileBuffer, {
      status: 200,

      headers: {
        "Content-Type": contentType,

        /*
          inline means PDFs normally open
          in the browser.

          The browser can then download
          them normally if desired.
        */
        "Content-Disposition":
          `inline; filename="${safeFileName}"`,

        "Cache-Control":
          "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error(
      "Error serving Bible resource:",
      error
    );

    return new NextResponse(
      "Unable to load resource",
      {
        status: 500,
      }
    );
  }
}