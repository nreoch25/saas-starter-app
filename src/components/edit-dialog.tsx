import { cloneElement, ReactElement, useActionState, useState } from "react";

import { SubmitButton } from "./form/submit-button";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { ActionState, EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

type UseEditDialogProps = {
  title?: string;
  description?: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  trigger: ReactElement<{ onClick?: () => void }>;
  initialValue?: string;
  onSuccess?: (content: string) => void;
};

const useEditDialog = ({
  title = "Edit comment",
  description = "Edit an existing comment",
  action,
  trigger,
  initialValue = "",
  onSuccess,
}: UseEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      setIsOpen((state) => !state);
    },
  });

  const handleSuccess = (actionState: ActionState) => {
    setIsOpen(false);
    const content = (actionState.payload?.get("content") as string) ?? "";
    onSuccess?.(content);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <Form action={formAction} actionState={actionState} onSuccess={handleSuccess}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full space-y-2">
            <Textarea
              id="content"
              name="content"
              defaultValue={(actionState.payload?.get("content") as string) ?? initialValue}
              className="w-full"
            />
            <FieldError actionState={actionState} name="content" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <SubmitButton label="Submit" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useEditDialog };
