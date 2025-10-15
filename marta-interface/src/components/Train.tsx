import React from "react";
import "./Train.css";

export type TrainRecord = {
  LINE?: string;
  STATION?: string;
  DIRECTION?: string;
  WAITING_TIME?: string;
  DELAY?: string;
  DESTINATION?: string;
};

type Props = {
  item: TrainRecord;
  color: string;
};

export default function Train({ item, color }: Props) {
  const line = (item.LINE ?? "").toUpperCase();
  const station = item.STATION ?? "";
  const dest = item.DESTINATION ?? "";
  const dir = (item.DIRECTION ?? "").toUpperCase();
  const eta = item.WAITING_TIME ?? "";
  const onTime = (item.DELAY ?? "") === "T0S";
  const statusText = onTime ? "On Time" : "Delayed";

  return (
    <div className="train-row">
      <div className="train-logo">M</div>

      <div className="train-main">
        <div className="train-title">
          {station} <span className="arrow">--&gt;</span> {dest}
        </div>
        <div className="train-meta">
          <span className={`pill ${color}`}>{line}</span>
          <span className={`status ${onTime ? "ok" : "late"}`}>
            {statusText}
          </span>
        </div>
      </div>
      <div className="train-eta">{eta}</div>
    </div>
  );
}
