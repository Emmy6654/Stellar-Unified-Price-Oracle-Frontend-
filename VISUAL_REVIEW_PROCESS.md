# Visual Review Process

This project uses [Storybook](https://storybook.js.org/) with [Chromatic](https://www.chromatic.com/) for visual regression testing on every pull request.

## Setup

Before Chromatic runs in CI, a one-time setup is required:

1. Go to [chromatic.com](https://www.chromatic.com/) and sign in with GitHub
2. Create a new project linked to this repository
3. Copy the **project token** from the Chromatic project settings
4. Add it as `CHROMATIC_PROJECT_TOKEN` in GitHub repo: Settings → Secrets and variables → Actions
5. The `.github/workflows/chromatic.yml` workflow will run automatically on every PR

## How It Works

1. **Every PR triggers a Chromatic build** via the `.github/workflows/chromatic.yml` workflow
2. Chromatic takes screenshots of every story and compares them against the baseline
3. Visual changes are flagged for review in the Chromatic UI
4. A link to the Chromatic build is posted as a PR check

## Reviewing Visual Changes

### 1. Find the Chromatic Check

After the Chromatic workflow completes, look for the "chromatic" check in your PR:

- **Green checkmark** — No visual changes detected
- **Yellow indicator** — Visual changes detected, needs review
- **Red X** — Build failed or errors occurred

### 2. Open the Chromatic Build

Click the "Details" link next to the Chromatic check, or find the build URL in the workflow run output.

### 3. Review Changes

In the Chromatic UI:

- **Changed stories** are grouped by component
- Toggle between **baseline** (previous accepted) and **current** (this PR) screenshots
- Use the **diff view** to highlight pixel-level differences
- Inspected stories can be:
  - **Accepted** — change is intentional, becomes new baseline
  - **Denied** — change is a regression, needs fixing

### 4. Take Action

| Decision | Action |
|----------|--------|
| Change is intentional | Click **Accept** in Chromatic |
| Change is a regression | Fix the component code, push a new commit — Chromatic re-runs automatically |
| Unsure | Leave un-reviewed and discuss in the PR |

## Running Storybook Locally

```bash
npm run storybook
```

Opens Storybook at `http://localhost:6006`.

## Adding New Stories

1. Create a `*.stories.tsx` file next to the component (e.g., `Button.stories.tsx` for `Button.tsx`)
2. Follow the existing story patterns — one default story per component, plus variants for loading/error/empty states
3. Run `npm run build-storybook` to verify the story compiles

## Best Practices

- **Cover all visual states** for every component: default, loading, empty, error, edge cases
- **Use decorators** for shared layout or context providers (routers, state providers)
- **Keep stories focused** — one story per visual variant
- **Accept baselines** only after verifying the change is correct in the PR review
- **Deny unexpected changes** and fix regressions before merging

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Chromatic build fails | Check the workflow logs in GitHub Actions |
| Screenshots look wrong | Verify the component renders correctly in local Storybook |
| Baseline comparison is off | Ensure `fetch-depth: 0` is set in the checkout step (it is in our workflow) |
| Story not appearing | Check the file name matches `*.stories.tsx` and is inside `src/` |
| "Project token not found" error | Verify `CHROMATIC_PROJECT_TOKEN` is set in GitHub repo secrets |
