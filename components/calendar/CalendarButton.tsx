"use client";

import { useState } from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function dateString(
  year: number,
  month: number,
  day: number
) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}

export default function CalendarButton() {
  const today = new Date();

  const [open, setOpen] = useState(false);

  const [year, setYear] = useState(
    today.getFullYear()
  );

  const [month, setMonth] = useState(
    today.getMonth()
  );

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarCells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
    } else {
      setMonth((current) => current + 1);
    }
  }

  function goToToday() {
    const now = new Date();

    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }

  function selectDay(day: number) {
    const selectedDate = dateString(
      year,
      month,
      day
    );

    window.location.href =
      `/calendar/${selectedDate}`;
  }

  function openCalendar() {
    setOpen(true);
  }

  return (
    <>
      {/* =========================================
          CALENDAR BUTTON
         ========================================= */}

      <button
        type="button"
        onClick={openCalendar}
        className="flex items-center gap-3 rounded-xl border border-[#d8c8a7] bg-white px-4 py-3 shadow-sm transition hover:border-[#9b6a2e] hover:shadow-md"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#082f52] text-2xl text-white">
          📅
        </span>

        <span className="text-left">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6a2e]">
            Academy
          </span>

          <span className="block font-serif text-lg font-bold text-[#082f52]">
            Calendar
          </span>
        </span>
      </button>

      {/* =========================================
          CALENDAR MODAL
         ========================================= */}

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-[#f4f1e9] shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* =====================================
                HEADER
               ===================================== */}

            <div className="flex items-center justify-between bg-[#082f52] px-6 py-5 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f4e7c9]">
                  Anchors Away
                </p>

                <h2 className="font-serif text-2xl font-bold">
                  Academy Calendar
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close calendar"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl transition hover:bg-white/20"
              >
                ×
              </button>
            </div>

            {/* =====================================
                MONTH NAVIGATION
               ===================================== */}

            <div className="flex items-center justify-between border-b border-[#d8c8a7] px-5 py-5">
              <button
                type="button"
                onClick={previousMonth}
                aria-label="Previous month"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8c8a7] bg-white font-bold text-[#082f52] transition hover:border-[#9b6a2e]"
              >
                ←
              </button>

              <div className="text-center">
                <h3 className="font-serif text-3xl font-bold text-[#082f52]">
                  {MONTH_NAMES[month]} {year}
                </h3>

                <button
                  type="button"
                  onClick={goToToday}
                  className="mt-1 text-xs font-bold uppercase tracking-wider text-[#9b6a2e] hover:text-[#082f52]"
                >
                  Go to Today
                </button>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8c8a7] bg-white font-bold text-[#082f52] transition hover:border-[#9b6a2e]"
              >
                →
              </button>
            </div>

            {/* =====================================
                CALENDAR BODY
               ===================================== */}

            <div className="p-5 sm:p-7">

              {/* WEEKDAY HEADERS */}

              <div className="grid grid-cols-7">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    className="pb-3 text-center text-xs font-bold uppercase text-slate-500"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              {/* CALENDAR DAYS */}

              <div className="grid grid-cols-7 gap-1">
                {calendarCells.map(
                  (day, index) => {
                    if (day === null) {
                      return (
                        <div
                          key={`blank-${index}`}
                          className="aspect-square"
                        />
                      );
                    }

                    const isToday =
                      day === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();

                    const weekday = new Date(
                      year,
                      month,
                      day
                    ).getDay();

                    const isWeekend =
                      weekday === 0 ||
                      weekday === 6;

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() =>
                          selectDay(day)
                        }
                        className={[
                          "relative aspect-square rounded-xl border text-sm font-bold transition",
                          isToday
                            ? "border-[#9b6a2e] bg-[#082f52] text-white shadow-md"
                            : isWeekend
                              ? "border-transparent bg-[#ebe7de] text-slate-400 hover:border-[#9b6a2e]"
                              : "border-[#ded7ca] bg-white text-[#082f52] hover:border-[#9b6a2e] hover:bg-[#fffaf0]",
                        ].join(" ")}
                      >
                        {day}

                        {isToday && (
                          <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#f4e7c9]" />
                        )}
                      </button>
                    );
                  }
                )}
              </div>

              {/* =====================================
                  FOOTER
                 ===================================== */}

              <div className="mt-6 border-t border-[#d8c8a7] pt-5 text-center">
                <p className="font-serif text-lg font-bold text-[#082f52]">
                  Select a School Day
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Choose a date to open that
                  day&apos;s Anchors Away Academy
                  dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}