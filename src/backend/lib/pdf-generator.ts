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

// HTML escaping function to prevent XSS
function escapeHtmlServer(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Get performance color based on success rate and target
function getPerformanceColor(rate: number, target?: number | null): string {
  if (!target) {
    return rate >= 80 ? "#10b981" : rate >= 60 ? "#f59e0b" : "#ef4444";
  }

  if (rate >= target) return "#10b981"; // Green - meets target
  if (rate >= target * 0.8) return "#f59e0b"; // Amber - close to target
  return "#ef4444"; // Red - below target
}

// Calculate trend indicator
function getTrendIndicator(rates: number[]): string {
  if (rates.length < 2) return "";

  const recent = rates.slice(-3); // Last 3 data points
  const older = rates.slice(-6, -3); // Previous 3 data points

  if (recent.length === 0 || older.length === 0) return "";

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

  const difference = recentAvg - olderAvg;

  if (difference > 5) return "↗"; // Improving
  if (difference < -5) return "↘"; // Declining
  return "→"; // Stable
}

export async function generateBenchmarkReport(
  data: BenchmarkReportData
): Promise<Buffer> {
  if (!data || !data.student || !data.goal || !data.benchmark) {
    throw new Error("Invalid report data: missing required fields");
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    const htmlContent = generateReportHTML(data);

    await page.setContent(htmlContent, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    await page.setExtraHTTPHeaders({
      "Content-Security-Policy":
        "default-src 'self'; script-src 'none'; object-src 'none';",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error(
      `Failed to generate benchmark report: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  } finally {
    await browser.close();
  }
}

function generateReportHTML(
  data: BenchmarkReportData,
  clientTimeZone: string = "America/Los_Angeles"
): string {
  const { student, goal, benchmark, trialData = [], successRates = [] } = data;

  // Safe data processing with fallbacks
  const totalTrials = trialData.length;
  const totalSuccess = trialData.reduce(
    (sum, trial) => sum + (trial.success || 0),
    0
  );
  const totalUnsuccess = trialData.reduce(
    (sum, trial) => sum + (trial.unsuccess || 0),
    0
  );
  const totalAttempts = totalSuccess + totalUnsuccess;
  const overallSuccessRate =
    totalAttempts > 0 ? (totalSuccess / totalAttempts) * 100 : 0;

  // Get unique staff members
  const staffMembers = new Set<string>();
  trialData.forEach((trial) => {
    if (trial.first_name && trial.last_name) {
      staffMembers.add(`${trial.first_name} ${trial.last_name}`);
    }
  });

  // Calculate trend
  const rates = successRates.map((r) => r.rate);
  const trendIndicator = getTrendIndicator(rates);

  // Get performance color
  const performanceColor = getPerformanceColor(
    overallSuccessRate,
    benchmark?.target_level
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Benchmark Report - ${escapeHtmlServer(student?.first_name)} ${escapeHtmlServer(student?.last_name)}</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #1e293b;
          background: #f1f5f9;
          font-size: 14px;
        }
        
        .page {
          max-width: 210mm;
          margin: 0 auto;
          background: white;
          min-height: 297mm;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          display: flex;
          min-height: 120px;
          flex: 1;
          padding: 16px;
          flex-direction: column;
          justify-content: center;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 4px;
        }
        
        .header .subtitle {
          color: #64748b;
          font-size: 14px;
          margin-bottom: 8px;
        }
        
        .header-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
          color: #64748b; 
          align-items: baseline;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .meta-label {
          min-width: 70px;
          font-weight: 500;
          color: #64748b;
        }

        .meta-value {
          color: #1e293b;
        }
        
        /* Content area */
        .content {
          padding: 16px;
        }
        
        /* Overview banner */
        .overview {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-left: 4px solid #4f46e5;
          border-radius: 0 8px 8px 0;
          padding: 20px 24px;
          margin-bottom: 32px;
          display: flex;
          flex-direction: row;
          gap: 24px;
          align-items: stretch;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        
        .overview-stat {
          flex: 0 0 150px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .overview-stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        
        .overview-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 2px;
        }
        
        /* Performance badge */
        .performance-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: white;
          margin-left: 8px;
        }
        
        /* Sections */
        .section {
          margin-bottom: 24px;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }
        
        .section-meta {
          font-size: 12px;
          color: #64748b;
        }
        
        /* Benchmark info cards */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .info-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }
        
        .info-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
        
        .info-card-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .info-card-value {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
        }
        
        /* Tables */
        .table-wrapper {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          background: #f8fafc;
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
        }
        
        tr:hover {
          background: #f8fafc;
        }
        
        .success-rate-cell {
          font-weight: 600;
          color: white;
          text-align: center;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        /* Target indicator */
        .target-indicator {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 1px solid #f59e0b;
          border-radius: 8px;
          padding: 12px 16px;
          margin: 16px 0;
          font-size: 13px;
          color: #92400e;
        }
        
        .target-indicator strong {
          color: #92400e;
        }

        .target-meta {
          margin-top: 6px;
          font-size: 12px;
          color: #78350f;
        }
        
        /* Empty states */
        .empty-state {
          text-align: center;
          padding: 48px 24px;
          color: #64748b;
          background: #f8fafc;
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
        }
        
        .empty-icon {
          font-size: 32px;
          margin-bottom: 8px;
          opacity: 0.5;
        }
        
        /* Footer */
        .footer {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
          font-size: 11px;
          color: #64748b;
        }
        
        /* Print styles */
        @media print {
          body {
            background: white;
          }
          
          .page {
            box-shadow: none;
          }
          
          .section {
            break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="page">
        <!-- Header -->
        <div class="header">
            <h1>${escapeHtmlServer(student?.first_name)} ${escapeHtmlServer(student?.last_name)}</h1>
            <div class="subtitle">Progress Assessment Report - ${new Date().toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: clientTimeZone,
              }
            )}</div>
            <div class="header-meta">
              <div class="meta-item">
                <span class="meta-label">Goal #${escapeHtmlServer(goal?.number?.toString()) || "N/A"}:</span>
                <span class="meta-value">${escapeHtmlServer(goal?.description) || "N/A"}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Benchmark #${escapeHtmlServer(benchmark?.number?.toString()) || "N/A"}:</span>
                <span class="meta-value">${escapeHtmlServer(benchmark?.description) || "N/A"}</span>
              </div>
            </div>
        </div>

        <div class="content">
          <!-- Overview Banner -->
          <div class="overview">
            <div class="overview-stat">
              <div class="overview-stat-number">${totalTrials}</div>
              <div class="overview-stat-label">Total Trials</div>
            </div>
            <div class="overview-stat">
              <div class="overview-stat-number" style="color: ${performanceColor}">
                ${overallSuccessRate.toFixed(1)}% <span style="font-size: 16px;">${trendIndicator}</span>
              </div>
              <div class="overview-stat-label">Success Rate</div>
              <div class="performance-status" style="color: ${performanceColor}; margin-top: 4px; font-weight: 600;">
               ${
                 benchmark?.target_level
                   ? `${
                       overallSuccessRate >= benchmark.target_level
                         ? "MEETS TARGET"
                         : overallSuccessRate >= benchmark.target_level * 0.8
                           ? "APPROACHING TARGET"
                           : "BELOW TARGET"
                     }`
                   : ""
               }
              </div>
            </div>
            <div class="overview-stat">
              <div class="overview-stat-number">${staffMembers.size}</div>
              <div class="overview-stat-label">Staff Members</div>
            </div>
          </div>

          <!-- Benchmark Details -->
          <div class="section">
            <div class="section-header">
              <div class="section-title">Benchmark Information</div>
              <div class="section-meta">Created on ${
                benchmark?.created_at
                  ? new Date(benchmark.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"
              }</div>
            </div>
            
            <div class="info-cards">
              <div class="info-card">
                <div class="info-card-label">Target Level</div>
                <div class="info-card-value">${benchmark?.target_level ? benchmark.target_level + "%" : "Not set"}</div>
              </div>
              ${
                benchmark?.due_date
                  ? `
              <div class="info-card">
                <div class="info-card-label">Due Date</div>
                <div class="info-card-value">${new Date(
                  benchmark.due_date
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}</div>
              </div>
              `
                  : ""
              }
            </div>
          </div>

          <!-- Progress Data -->
          ${
            successRates.length > 0
              ? `
          <div class="section">
            <div class="section-header">
              <div class="section-title">Success Rate Progress</div>
            </div>
            
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Success Rate</th>
                    <th>Staff Members</th>
                    <th>Trials</th>
                  </tr>
                </thead>
                <tbody>
                  ${successRates
                    .map(
                      (rate) => `
                    <tr>
                      <td>${escapeHtmlServer(rate.date)}</td>
                      <td>
                        <span class="success-rate-cell" style="background-color: ${getPerformanceColor(rate.rate, benchmark?.target_level)}">
                          ${rate.rate.toFixed(1)}%
                        </span>
                      </td>
                      <td>${escapeHtmlServer(rate.staffNames.join(", "))}</td>
                      <td>${rate.numberOfTrials}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
          `
              : `
          <div class="section">
            <div class="section-header">
              <div class="section-title">Success Rate Progress</div>
            </div>
            <div class="empty-state">
              <div class="empty-icon">📈</div>
              <div>No progress data available yet</div>
            </div>
          </div>
          `
          }

          <!-- Trial Details -->
          ${
            trialData.length > 0
              ? `
          <div class="section">
            <div class="section-header">
              <div class="section-title">Detailed Trial Data</div>
              <div class="section-meta">${trialData.length} trials recorded</div>
            </div>
            
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Staff Member</th>
                    <th>Success</th>
                    <th>Unsuccessful</th>
                    <th>Success Rate</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  ${trialData
                    .map((trial) => {
                      const total =
                        (trial.success || 0) + (trial.unsuccess || 0);
                      const successRate =
                        total > 0 ? ((trial.success || 0) / total) * 100 : 0;
                      return `
                      <tr>
                        <td>${new Date(trial.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}</td>
                        <td>${escapeHtmlServer(trial.first_name)} ${escapeHtmlServer(trial.last_name)}</td>
                        <td>${trial.success || 0}</td>
                        <td>${trial.unsuccess || 0}</td>
                        <td>
                          <span class="success-rate-cell" style="background-color: ${getPerformanceColor(successRate, benchmark?.target_level)}">
                            ${successRate.toFixed(1)}%
                          </span>
                        </td>
                        <td>${escapeHtmlServer(trial.notes) || "—"}</td>
                      </tr>
                    `;
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
          `
              : `
          <div class="section">
            <div class="section-header">
              <div class="section-title">Detailed Trial Data</div>
            </div>
            <div class="empty-state">
              <div class="empty-icon">📋</div>
              <div>No trial data recorded yet</div>
            </div>
          </div>
          `
          }

          <div class="footer">
            <p>This report was automatically generated by the Compass system on ${new Date().toLocaleString("en-US", { timeZone: clientTimeZone })}.</p>
            <p>For questions or concerns, please contact your educational team.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
