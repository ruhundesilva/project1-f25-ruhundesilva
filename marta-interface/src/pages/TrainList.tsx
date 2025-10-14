import React from "react";
import "./TrainList.css";

type Props = {
  color: string;
  data: any[];
};

export default function TrainList({ color, data }: Props) {
  return (
    <section className="trainlist">
      <div className="trainlist-header">
        Showing trains for: <strong>{color.toUpperCase()}</strong>
      </div>
      <div className="trainlist-placeholder">Train list placeholder</div>
    </section>
  );
}
