import React from "react";

export default function ProgressBar(props: {
    steps: number[];
    progresses: number[];
}) {
    return (
        <div className="h-fit flex items-center justify-center gap-3">
          {props.steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className={`min-w-6 min-h-6 text-sm flex items-center justify-center rounded-full ${props.progresses[index] > 0 ? "text-white bg-primary animate-pulse" : "text-black bg-gray"}`}>
                {step}
              </div>
              {index < props.steps.length - 1 && (
                <div className="w-full bg-gray rounded-full h-2">
                  <div className={`bg-primary h-2 rounded-full animate-pulse`} style={{ width: `${props.progresses[index]}%` }}></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
}
