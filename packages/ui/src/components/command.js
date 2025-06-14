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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/dialog";
function Command(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive, Object.assign({ "data-slot": "command", className: cn("bg-secondary text-accent flex h-full w-full flex-col overflow-hidden rounded-md", className) }, props)));
}
function CommandDialog(_a) {
    var { title = "Command Palette", description = "Search for a command to run...", children } = _a, props = __rest(_a, ["title", "description", "children"]);
    return (_jsxs(Dialog, Object.assign({}, props, { children: [_jsxs(DialogHeader, { className: "sr-only", children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsx(DialogContent, { className: "overflow-hidden p-0", children: _jsx(Command, { className: "[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: children }) })] })));
}
function CommandInput(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs("div", { "data-slot": "command-input-wrapper", className: "flex h-9 items-center gap-2 border-b border-secondary-foreground px-3", children: [_jsx(SearchIcon, { className: "size-4 shrink-0 opacity-50" }), _jsx(CommandPrimitive.Input, Object.assign({ "data-slot": "command-input", className: cn("placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-secondary py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className) }, props))] }));
}
function CommandList(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.List, Object.assign({ "data-slot": "command-list", className: cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className) }, props)));
}
function CommandEmpty(_a) {
    var props = __rest(_a, []);
    return (_jsx(CommandPrimitive.Empty, Object.assign({ "data-slot": "command-empty", className: "py-6 text-center text-sm" }, props)));
}
function CommandGroup(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Group, Object.assign({ "data-slot": "command-group", className: cn("text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium", className) }, props)));
}
function CommandSeparator(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Separator, Object.assign({ "data-slot": "command-separator", className: cn("bg-secondary -mx-1 h-px", className) }, props)));
}
function CommandItem(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Item, Object.assign({ "data-slot": "command-item", className: cn("data-[selected=true]:bg-secondary-foreground text-accent cursor-pointer [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className) }, props)));
}
function CommandShortcut(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("span", Object.assign({ "data-slot": "command-shortcut", className: cn("text-muted-foreground ml-auto text-xs tracking-widest", className) }, props)));
}
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
