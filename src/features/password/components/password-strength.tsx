import { CustomProgress } from "@/components/custom-progress";
import { PASSWORD_STRENGTH_CONFIG } from "@/features/password/constants";

const getStrengthMessage = (strength: number) => {
  if (strength === 0) return PASSWORD_STRENGTH_CONFIG.MESSAGES.EMPTY;
  if (strength === 1) return PASSWORD_STRENGTH_CONFIG.MESSAGES.VERY_WEAK;
  if (strength === 2) return PASSWORD_STRENGTH_CONFIG.MESSAGES.WEAK;
  if (strength === 3) return PASSWORD_STRENGTH_CONFIG.MESSAGES.STRONG;
  return PASSWORD_STRENGTH_CONFIG.MESSAGES.VERY_STRONG;
};

const getProgressColor = (value: number) => {
  if (value <= PASSWORD_STRENGTH_CONFIG.COLOR_THRESHOLDS.WEAK) return "bg-red-500";
  if (value <= PASSWORD_STRENGTH_CONFIG.COLOR_THRESHOLDS.MEDIUM) return "bg-yellow-500";
  return "bg-green-500";
};

type PasswordStrengthProps = {
  strength: number;
};

export default function PasswordStrength({ strength }: PasswordStrengthProps) {
  const progress = (strength / PASSWORD_STRENGTH_CONFIG.MAX_STRENGTH) * 100;

  return (
    <div className="space-y-2">
      <CustomProgress
        value={progress}
        ariaLabel="Password strength indicator"
        className={`h-2 ${getProgressColor(progress)}`}
      />
      <p className="text-sm text-gray-500">{getStrengthMessage(strength)}</p>
    </div>
  );
}
