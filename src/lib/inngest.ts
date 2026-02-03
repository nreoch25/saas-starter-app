import { EventSchemas, Inngest } from "inngest";

import { SignupEventArgs } from "@/features/auth/events/event-welcome-email";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.signup": SignupEventArgs;
};

export const inngest = new Inngest({
  id: "saas-starter-app",
  schemas: new EventSchemas().fromRecord<Events>(),
  eventKey: process.env.INNGEST_EVENT_KEY,
  isDev: process.env.NODE_ENV === "development",
});
