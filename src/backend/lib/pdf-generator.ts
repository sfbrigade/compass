import puppeteer from "puppeteer";
import { Goal, Student } from "@/types/global";

interface TrialDataWithUser {
  trial_data_id: string;
  created_at: Date;
  success: number;
  unsuccess: number;
  notes: string | null;
  first_name: string;
  last_name: string;
}

interface BenchmarkData {
  benchmark_id: string;
  number: number;
  description: string;
  target_level: number | null;
  created_at: Date;
  due_date: Date | null;
  goal_id: string;
  assignees?: unknown[];
}

interface BenchmarkReportData {
  student: Student;
  goal: Goal;
  benchmark: BenchmarkData;
  trialData: TrialDataWithUser[];
  successRates: Array<{
    date: string;
    rate: number;
    staffNames: string[];
    numberOfTrials: number;
  }>;
}

export async function generateBenchmarkReport(
  data: BenchmarkReportData
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Generate HTML content for the report
    const htmlContent = generateReportHTML(data);

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

function generateReportHTML(data: BenchmarkReportData): string {
  const { student, goal, benchmark, trialData, successRates } = data;

  // Calculate summary statistics
  const totalTrials = trialData.length;
  const totalSuccess = trialData.reduce((sum, trial) => sum + trial.success, 0);
  const totalUnsuccess = trialData.reduce(
    (sum, trial) => sum + trial.unsuccess,
    0
  );
  const overallSuccessRate =
    totalTrials > 0
      ? ((totalSuccess / (totalSuccess + totalUnsuccess)) * 100).toFixed(1)
      : "0.0";

  // Get unique staff members
  const staffMembers = new Set<string>();
  trialData.forEach((trial) => {
    staffMembers.add(`${trial.first_name} ${trial.last_name}`);
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Benchmark Report - ${student?.first_name || ""} ${student?.last_name || ""}</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #1976d2;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #1976d2;
          margin: 0;
          font-size: 28px;
        }
        .header h2 {
          color: #666;
          margin: 10px 0 0 0;
          font-size: 18px;
          font-weight: normal;
        }
        .section {
          margin-bottom: 30px;
        }
        .section h3 {
          color: #1976d2;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .info-item {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #1976d2;
        }
        .info-label {
          font-weight: bold;
          color: #555;
          margin-bottom: 5px;
        }
        .info-value {
          font-size: 16px;
        }
        .table-container {
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #1976d2;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .success-rate {
          font-weight: bold;
          color: #2e7d32;
        }
        .target-level {
          background-color: #fff3e0;
          border-left-color: #ff9800;
        }
        .summary-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 20px 0;
        }
        .stat-card {
          background: #e3f2fd;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #1976d2;
        }
        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #1976d2;
          margin-bottom: 5px;
        }
        .stat-label {
          color: #555;
          font-size: 14px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #e0e0e0;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Benchmark Progress Report</h1>
        <h2>${student?.first_name || ""} ${student?.last_name || ""}</h2>
        <h2>Generated on ${new Date().toLocaleDateString()}</h2>
      </div>

      <div class="section">
        <h3>Student Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Student Name</div>
            <div class="info-value">${student?.first_name || ""} ${student?.last_name || ""}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Student ID</div>
            <div class="info-value">${student?.student_id || ""}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Goal Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Goal Number</div>
            <div class="info-value">Goal #${goal?.number || ""}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Created Date</div>
            <div class="info-value">${goal?.created_at ? new Date(goal.created_at).toLocaleDateString() : ""}</div>
          </div>
        </div>
        <div class="info-item" style="grid-column: 1 / -1;">
          <div class="info-label">Goal Description</div>
          <div class="info-value">${goal?.description || ""}</div>
        </div>
      </div>

      <div class="section">
        <h3>Benchmark Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Benchmark Number</div>
            <div class="info-value">Benchmark #${benchmark?.number || ""}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Target Level</div>
            <div class="info-value">${benchmark?.target_level ? benchmark.target_level + "%" : "Not set"}</div>
          </div>
        </div>
        ${
          benchmark?.target_level
            ? `
        <div class="info-item target-level" style="grid-column: 1 / -1;">
          <div class="info-label">Target Achievement</div>
          <div class="info-value">Students should achieve ${benchmark.target_level}% success rate consistently</div>
        </div>
        `
            : ""
        }
      </div>

      <div class="section">
        <h3>Summary Statistics</h3>
        <div class="summary-stats">
          <div class="stat-card">
            <div class="stat-number">${totalTrials}</div>
            <div class="stat-label">Total Trials</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${overallSuccessRate}%</div>
            <div class="stat-label">Overall Success Rate</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${staffMembers.size}</div>
            <div class="stat-label">Staff Members</div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>Success Rate Progress</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Success Rate</th>
                <th>Staff Members</th>
                <th>Number of Trials</th>
              </tr>
            </thead>
            <tbody>
              ${successRates
                .map(
                  (rate) => `
                <tr>
                  <td>${rate.date}</td>
                  <td class="success-rate">${rate.rate.toFixed(1)}%</td>
                  <td>${rate.staffNames.join(", ")}</td>
                  <td>${rate.numberOfTrials}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <h3>Detailed Trial Data</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Staff Member</th>
                <th>Success</th>
                <th>Unsuccess</th>
                <th>Success Rate</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${trialData
                .map((trial) => {
                  const successRate =
                    trial.success + trial.unsuccess > 0
                      ? (
                          (trial.success / (trial.success + trial.unsuccess)) *
                          100
                        ).toFixed(1)
                      : "0.0";
                  return `
                  <tr>
                    <td>${new Date(trial.created_at).toLocaleDateString()}</td>
                    <td>${trial.first_name} ${trial.last_name}</td>
                    <td>${trial.success}</td>
                    <td>${trial.unsuccess}</td>
                    <td class="success-rate">${successRate}%</td>
                    <td>${trial.notes || "-"}</td>
                  </tr>
                `;
                })
                .join("")}
            </tbody>
          </table>
        </div>
      </div>

      <div class="footer">
        <p>This report was automatically generated by the Compass system.</p>
        <p>For questions or concerns, please contact your educational team.</p>
      </div>
    </body>
    </html>
  `;
}
