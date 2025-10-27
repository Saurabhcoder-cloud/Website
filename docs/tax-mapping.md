# Tax Form Mapping

The demo wizard highlights the canonical flow between wage and gig-income documents and the returns that TaxHelp AI prepares. The following table documents each mapping used in the mock compute output and UI.

| Source | Field | Destination | Line | Notes |
| --- | --- | --- | --- | --- |
| W-2 | Box 1 — Wages, tips, other compensation | Form 1040 | Line 1 | Drives federal wages for the primary filer. |
| W-2 | Box 2 — Federal income tax withheld | Form 1040 | Line 25a | Applied to the payments section of the federal return. |
| 1099-NEC | Box 1 — Nonemployee compensation | Schedule C | Line 1 | Imported as gross receipts for gig work. |
| Schedule C | Line 31 — Net profit or loss | Schedule SE | Line 2 | Net earnings are multiplied by 92.35% per IRS rules. |
| Schedule SE | Line 12 — Self-employment tax | Form 1040 | Line 23 | Self-employment tax adds to total federal tax. |
| Form 1040 | Line 11 — Adjusted gross income | CA Form 540 | Line 13 | California AGI starts with federal AGI before adjustments. |
| W-2 | Box 17 — State income tax | CA Form 540 | Payments section | Captures California wage withholding credits. |

## Validation rules referenced in the demo

- Social Security tax should be approximately 6.2% of W-2 Box 3 wages.
- Medicare tax should be approximately 1.45% of W-2 Box 5 wages (plus 0.9% for wages above $200,000).
- Schedule SE uses net earnings of 92.35% of Schedule C profit; Social Security tax applies up to the wage base and Medicare at 2.9%.
- Refunds are computed as total payments minus liabilities; negative values surface as amounts due.
