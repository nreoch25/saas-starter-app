import { useState } from "react";
import zxcvbn from "zxcvbn";

import { PASSWORD_STRENGTH_CONFIG } from "../constants";

type PasswordStrengthHook = {
  password: string;
  strength: number;
  isWeakPassword: boolean;
  setPassword: (value: string) => void;
};

const usePasswordStrength = (): PasswordStrengthHook => {
  const [password, setPassword] = useState<string>("");

  const calculateStrength = (pwd: string) => {
    return pwd ? zxcvbn(pwd).score : 0;
  };

  const strength = calculateStrength(password);
  const isWeakPassword = strength < PASSWORD_STRENGTH_CONFIG.WEAK_THRESHOLD;

  return {
    password,
    strength,
    isWeakPassword,
    setPassword,
  };
};

export { usePasswordStrength };
