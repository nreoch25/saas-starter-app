"use client";

import { useActionState } from "react";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { passwordReset } from "@/features/password/actions/password-reset";
import PasswordStrength from "@/features/password/components/password-strength";
import { usePasswordStrength } from "@/features/password/hooks/use-password-strength";

type PasswordResetFormProps = {
  tokenId: string;
};

const PasswordResetForm = ({ tokenId }: PasswordResetFormProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    EMPTY_ACTION_STATE
  );

  const { password, strength, setPassword } = usePasswordStrength();

  return (
    <Form action={action} actionState={actionState}>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        defaultValue={actionState.payload?.get("password") as string}
      />
      <PasswordStrength strength={strength} />
      <FieldError actionState={actionState} name="password" />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Reset Password" />
    </Form>
  );
};

export { PasswordResetForm };
