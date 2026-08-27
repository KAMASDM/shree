# PageSpeed Insights Baseline — 2026-08-27

Tested URL: https://shreedhargroup.com/

These measurements were captured from Google PageSpeed Insights on August 27,
2026. They measure the public deployment that existed before the homepage SSR
changes in this working tree are deployed. PageSpeed results can vary between
runs, so this file records the test context as well as the scores.

## Field data (Chrome UX Report)

PageSpeed Insights reported **No Data** for both mobile and desktop. Therefore,
there is currently no origin-level or URL-level Core Web Vitals field assessment
to report. The measurements below are Lighthouse lab results, not real-user
75th-percentile field data.

## Mobile lab result

- Preserved report: https://pagespeed.web.dev/analysis/https-shreedhargroup-com/6g5xb0b9xs?form_factor=mobile
- Report time: August 27, 2026, 1:33 PM GMT+5:30
- Mode: Mobile
- Environment: Emulated Moto G Power, Lighthouse 13.4.1, Slow 4G throttling
- Performance score: 63
- First Contentful Paint: 2.6 s
- Largest Contentful Paint: 5.2 s
- Total Blocking Time: 420 ms
- Cumulative Layout Shift: 0.009
- Speed Index: 5.0 s

## Desktop lab result

- Preserved report: https://pagespeed.web.dev/analysis/https-shreedhargroup-com/49fb18rs0x?form_factor=desktop
- Report time: August 27, 2026, 1:30 PM GMT+5:30
- Mode: Desktop
- Environment: Emulated Desktop, Lighthouse 13.4.1, custom throttling
- Performance score: 98
- First Contentful Paint: 0.2 s
- Largest Contentful Paint: 0.4 s
- Total Blocking Time: 120 ms
- Cumulative Layout Shift: 0.015
- Speed Index: 0.9 s

## Interpretation

The preserved mobile run shows poor LCP, while CLS remains good. A preceding
mobile run in the same session scored 65 with 1.9 s LCP and 4,810 ms TBT,
demonstrating the normal run-to-run variability of throttled Lighthouse lab
tests. Deployment decisions should therefore use repeated runs and, when the
site becomes eligible, Chrome UX Report field data.

Run fresh mobile and desktop analyses after deployment to create a valid
before/after comparison for the homepage SSR change. The preserved links above
remain the pre-deployment evidence.
