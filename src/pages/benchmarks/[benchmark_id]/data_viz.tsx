import React from "react";
import { LineChart } from "@mui/x-charts";

import styles from "./data_viz.module.css";

const DataVizPage: React.FC = () => {
  return (
    <div className={styles.datacontainer}>
      <div className={styles.title}>Viewing Data for student name</div>
      {/* make dynamic to specify student name */}
      <div className={styles.graphcontainer}>
        <LineChart
          xAxis={[{ dataKey: "x" }]}
          yAxis={[{ min: 0, max: 30 }]}
          series={[{ dataKey: "y" }]}
          dataset={[
            { x: "1/1", y: 10 },
            { x: "2/15", yield: 15 },
          ]}
          width={500}
          height={300}
        />
      </div>
      <div className={styles.goalbenchmarkcontainer}>
        <div className={styles.goalcontainer}>
          <div className={styles.goaltitle}>
            {/* make dynamic goal number and added date */}
            <div className={styles.goal}>Goal</div>
            <div className={styles.goal}>|</div>
            <div className={styles.addeddate}>Added Date</div>
          </div>
          <div className={styles.goalbody}>Goal information </div>
        </div>
        <div className={styles.benchmarkcontainer}>
          {/* make dynamic to specific benchmark */}
          <div className={styles.benchmarktitle}>Benchmark</div>
          <div className={styles.benchmarkbody}>Benchmark Body</div>
          <div className={styles.benchmarkinfo}>
            {/* make dynamic bench info */}
            <div className={styles.benchitem}>
              <div className={styles.benchtitle}>BASENAME</div>
              <div>0%</div>
            </div>
            <div className={styles.benchitem}>
              <div className={styles.benchtitle}>CURRENT LEVEL</div>
              <div>38%</div>
            </div>
            <div className={styles.benchitem}>
              <div className={styles.benchtitle}>BENCHMARK OBJECTIVE</div>
              <div>60%</div>
            </div>
            <div className={styles.benchitem}>
              <div className={styles.benchtitle}>START DATE</div>
              <div>10-05-2023</div>
            </div>
            <div className={styles.benchitem}>
              <div className={styles.benchtitle}>STAFF</div>
              <div>staff name</div>
              <div>Due:11-08-2023</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVizPage;
