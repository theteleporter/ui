import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";
import { useId } from "react";

export default function Component() {
  const id = useId();
  return (
    <div
      className="*:not-first:mt-2"
      // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
      style={{ "--ring": "var(--color-indigo-500)" } as React.CSSProperties}
    >
      <Label htmlFor={id}>Textarea with colored border and ring</Label>
      <Textarea
        id={id}
        placeholder="Leave a comment"
      />
    </div>
  );
}
