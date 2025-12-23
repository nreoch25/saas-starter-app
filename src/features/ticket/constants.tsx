import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

const TICKET_ICONS = {
  OPEN: <LucideCircleCheck />,
  DONE: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
};

const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
};

export { TICKET_ICONS, TICKET_STATUS_LABELS };
