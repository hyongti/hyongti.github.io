import React from "react";

type CalloutProps = {
  icon?: string;
  children: React.ReactNode;
};

export function Callout({ icon, children }: CalloutProps) {
  return (
    <div className="not-prose my-6 flex gap-3 rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-gray-700">
      {icon ? <div className="shrink-0 text-xl leading-7">{icon}</div> : null}
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0 [&>p]:my-2">
        {children}
      </div>
    </div>
  );
}
