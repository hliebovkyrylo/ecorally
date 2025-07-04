var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { uk } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/button";
function Calendar(_a) {
    var { className, classNames, showOutsideDays = true } = _a, props = __rest(_a, ["className", "classNames", "showOutsideDays"]);
    return (_jsx(DayPicker, Object.assign({ showOutsideDays: showOutsideDays, locale: uk, className: cn("p-3 bg-accent-foreground text-accent", className), classNames: Object.assign({ months: "flex flex-col sm:flex-row gap-2", month: "flex flex-col gap-4", caption: "flex justify-center pt-1 relative items-center w-full", caption_label: "text-sm font-medium", nav: "flex items-center gap-1", nav_button: cn(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"), nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-x-1", head_row: "flex", head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", row: "flex w-full mt-2", cell: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md", props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"), day: cn(buttonVariants({ variant: "ghost" }), "size-8 p-0 font-normal aria-selected:opacity-100"), day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground", day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground", day_selected: "bg-accent hover:bg-primary focus:bg-accent focus:text-black", day_today: "bg-secondary-foreground", day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground", day_disabled: "text-muted-foreground opacity-50", day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground", day_hidden: "invisible" }, classNames), components: {
            IconLeft: (_a) => {
                var { className } = _a, props = __rest(_a, ["className"]);
                return (_jsx(ChevronLeft, Object.assign({ className: cn("size-4 text-accent", className) }, props)));
            },
            IconRight: (_a) => {
                var { className } = _a, props = __rest(_a, ["className"]);
                return (_jsx(ChevronRight, Object.assign({ className: cn("size-4 text-accent", className) }, props)));
            },
        } }, props)));
}
export { Calendar };
