# 📦 Release Process & Versioning

## Complete Guide for Design System Releases

This document defines the versioning strategy, release process, and deployment procedures for the design system.

---

## 🎯 Overview

Our release process ensures:
- **Predictable releases** - Regular release schedule
- **Semantic versioning** - Clear version meaning
- **Zero downtime** - Smooth deployments
- **Full traceability** - Complete changelog
- **Quality assurance** - Automated testing

---

## 📋 Table of Contents
1. [Versioning Strategy](#versioning-strategy)
2. [Release Types](#release-types)
3. [Release Schedule](#release-schedule)
4. [Release Process](#release-process)
5. [Automation Scripts](#automation-scripts)
6. [Rollback Procedures](#rollback-procedures)
7. [Communication Plan](#communication-plan)

---

## 🔢 Versioning Strategy

### Semantic Versioning (SemVer)
We follow [Semantic Versioning 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH-PRERELEASE+BUILD
  1  .  2  .  3  -  beta.1   + 20231025
```

#### Version Components

| Component | When to Increment | Example |
|-----------|------------------|---------|
| **MAJOR** | Breaking changes | 1.0.0 → 2.0.0 |
| **MINOR** | New features (backwards compatible) | 1.0.0 → 1.1.0 |
| **PATCH** | Bug fixes | 1.0.0 → 1.0.1 |
| **PRERELEASE** | Pre-production versions | 1.0.0-alpha.1 |
| **BUILD** | Build metadata | 1.0.0+20231025 |

### Examples

```bash
# Breaking change: Removed prop
1.5.3 → 2.0.0

# New component added
1.5.3 → 1.6.0

# Bug fix in Button
1.5.3 → 1.5.4

# Beta release
1.6.0-beta.1

# Release candidate
2.0.0-rc.1
```

---

## 📅 Release Types

### 1. **Regular Releases** (Bi-weekly)
- Every 2 weeks on Tuesday
- Includes new features and fixes
- Version: MINOR or PATCH

### 2. **Hotfix Releases** (As needed)
- Critical bug fixes only
- Released immediately
- Version: PATCH

### 3. **Major Releases** (Quarterly)
- Breaking changes
- Major new features
- Version: MAJOR

### 4. **Pre-releases** (As needed)
- Beta/RC versions
- Testing new features
- Version: PRERELEASE

---

## 📆 Release Schedule

### Regular Release Calendar

| Week | Monday | Tuesday | Wednesday | Thursday | Friday |
|------|--------|---------|-----------|----------|--------|
| 1 | Code freeze | **RELEASE** 🚀 | | | |
| 2 | Development | Development | Development | Development | Development |
| 3 | Code freeze | **RELEASE** 🚀 | | | |
| 4 | Development | Development | Development | Development | Development |

### Release Timeline (Tuesday)

```
09:00 - Final testing
10:00 - Create release branch
11:00 - Generate changelog
12:00 - Lunch break
13:00 - Deploy to staging
14:00 - Smoke tests
15:00 - Deploy to production
16:00 - Announce release
17:00 - Monitor
```

---

## 🚀 Release Process

### Phase 1: Preparation (Monday)

#### 1.1 Code Freeze
```bash
# No new features after this point
git checkout main
git pull origin main
git checkout -b release/v1.2.0
```

#### 1.2 Release Checklist
```markdown
## Release v1.2.0 Checklist

### Pre-release
- [ ] All PRs merged
- [ ] Tests passing in main
- [ ] No critical issues
- [ ] Documentation updated
- [ ] Migration guide ready (if needed)

### Components
- [ ] Component A - ready
- [ ] Component B - ready
- [ ] Token updates - ready

### Quality
- [ ] Unit tests: ✅ 95%
- [ ] Integration tests: ✅
- [ ] Visual tests: ✅
- [ ] A11y tests: ✅
- [ ] Performance: ✅
```

### Phase 2: Release Creation (Tuesday Morning)

#### 2.1 Version Bump
```bash
# Determine version type
npm run release:analyze

# Bump version (auto-determines type)
npm version minor -m "chore(release): v%s"

# Or manually
npm version 1.2.0 -m "chore(release): v1.2.0"
```

#### 2.2 Generate Changelog
```bash
# Auto-generate from commits
npm run changelog:generate

# Review and edit
code CHANGELOG.md

# Commit changelog
git add CHANGELOG.md
git commit -m "docs: update changelog for v1.2.0"
```

#### 2.3 Create Release Notes
```markdown
# 🎉 Release v1.2.0

## ✨ New Features
- Added DataGrid component (#123)
- New animation tokens (#124)
- Enhanced Button with loading state (#125)

## 🐛 Bug Fixes
- Fixed Input focus issue (#126)
- Corrected Card padding in mobile (#127)

## 💔 Breaking Changes
None in this release

## 📦 Dependencies
- Updated React to 18.2.1
- Added new animation library

## 📝 Documentation
- New DataGrid examples
- Updated Button documentation
- Added animation guide

## 🙏 Contributors
@developer1, @developer2, @designer1

---
[Full Changelog](./CHANGELOG.md)
```

### Phase 3: Build & Test (Tuesday Midday)

#### 3.1 Build Release
```bash
# Clean build
rm -rf dist
npm run build:production

# Verify build
npm run build:verify

# Check bundle size
npm run size-limit
```

#### 3.2 Run Release Tests
```bash
# Full test suite
npm run test:all

# Release-specific tests
npm run test:release

# Smoke tests
npm run test:smoke
```

### Phase 4: Deployment (Tuesday Afternoon)

#### 4.1 Deploy to Staging
```bash
# Deploy to staging
npm run deploy:staging

# Run staging tests
npm run test:staging

# Verify in staging
open https://staging.design-system.com
```

#### 4.2 Deploy to Production
```bash
# Final safety check
npm run release:preflight

# Deploy to production
npm run deploy:production

# Verify deployment
npm run test:production
```

#### 4.3 Publish to npm
```bash
# Publish to npm
npm publish

# Or with tags
npm publish --tag latest
npm publish --tag beta  # for pre-releases
```

#### 4.4 Create GitHub Release
```bash
# Create and push tag
git tag v1.2.0
git push origin v1.2.0

# Create GitHub release
gh release create v1.2.0 \
  --title "v1.2.0" \
  --notes-file RELEASE_NOTES.md \
  --target main
```

### Phase 5: Post-Release (Tuesday Late Afternoon)

#### 5.1 Merge Release Branch
```bash
# Merge back to main
git checkout main
git merge release/v1.2.0
git push origin main

# Delete release branch
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

#### 5.2 Update Documentation
```bash
# Update docs site
npm run docs:deploy

# Update Storybook
npm run storybook:deploy
```

#### 5.3 Announcements
- Post in #design-system Slack channel
- Send email to stakeholders
- Update internal wiki
- Tweet from company account (if public)

---

## 🤖 Automation Scripts

### Release Scripts

```json
// package.json scripts
{
  "scripts": {
    "release": "npm run release:prepare && npm run release:build && npm run release:publish",
    "release:prepare": "node scripts/prepare-release.js",
    "release:analyze": "node scripts/analyze-commits.js",
    "release:build": "npm run build:production",
    "release:test": "npm run test:all && npm run test:release",
    "release:publish": "node scripts/publish-release.js",
    "release:rollback": "node scripts/rollback-release.js",
    
    "version": "npm run changelog:generate && git add CHANGELOG.md",
    "postversion": "git push && git push --tags",
    
    "changelog:generate": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "changelog:full": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```

### Prepare Release Script
```javascript
// scripts/prepare-release.js
const { exec } = require('child_process');
const fs = require('fs');

async function prepareRelease() {
  console.log('🚀 Preparing release...');
  
  // 1. Check branch
  const branch = await getBranch();
  if (!branch.startsWith('release/')) {
    throw new Error('Must be on release branch');
  }
  
  // 2. Run tests
  console.log('🧪 Running tests...');
  await runCommand('npm test');
  
  // 3. Build
  console.log('🔨 Building...');
  await runCommand('npm run build');
  
  // 4. Check bundle size
  console.log('📦 Checking bundle size...');
  await runCommand('npm run size-limit');
  
  // 5. Generate stats
  const stats = await generateStats();
  console.log('📊 Release Stats:', stats);
  
  console.log('✅ Release preparation complete!');
}

prepareRelease().catch(console.error);
```

### Version Analyzer
```javascript
// scripts/analyze-commits.js
const { exec } = require('child_process');

async function analyzeCommits() {
  // Get commits since last tag
  const commits = await getCommitsSinceLastTag();
  
  let major = false;
  let minor = false;
  let patch = false;
  
  commits.forEach(commit => {
    if (commit.includes('BREAKING CHANGE')) major = true;
    else if (commit.startsWith('feat:')) minor = true;
    else if (commit.startsWith('fix:')) patch = true;
  });
  
  if (major) console.log('Next version: MAJOR');
  else if (minor) console.log('Next version: MINOR');
  else if (patch) console.log('Next version: PATCH');
  else console.log('No version bump needed');
}

analyzeCommits();
```

---

## ↩️ Rollback Procedures

### Emergency Rollback

```bash
# 1. Immediate rollback in production
npm run deploy:rollback

# 2. Revert npm package
npm deprecate design-system@1.2.0 "Critical bug - use 1.1.0"
npm publish --tag latest  # Re-publish previous version

# 3. Revert git tag
git tag -d v1.2.0
git push origin :refs/tags/v1.2.0

# 4. Create hotfix
git checkout -b hotfix/v1.2.1
# Fix issue
git commit -m "fix: critical bug in v1.2.0"

# 5. Release hotfix
npm version patch
npm publish
```

### Rollback Checklist
- [ ] Rollback production deployment
- [ ] Deprecate npm package
- [ ] Notify all teams immediately
- [ ] Create incident report
- [ ] Schedule post-mortem
- [ ] Fix and re-release

---

## 📢 Communication Plan

### Release Announcement Template

```markdown
## 🎉 Design System v1.2.0 Released!

Hello team!

We're excited to announce the release of Design System v1.2.0!

### What's New
- 🆕 DataGrid component for complex data tables
- ✨ Enhanced Button with loading states
- 🎨 New animation tokens for smooth transitions
- 🐛 Fixed focus issues in Input component
- 📚 Improved documentation with more examples

### Migration Guide
No breaking changes in this release. Simply update your package:
\```bash
npm install @company/design-system@1.2.0
\```

### Resources
- 📖 [Documentation](https://docs.design-system.com)
- 🎨 [Storybook](https://storybook.design-system.com)
- 📝 [Changelog](https://github.com/company/design-system/blob/main/CHANGELOG.md)
- 💬 [Support Channel](#design-system)

### Next Release
Our next release (v1.3.0) is scheduled for [Date].

Questions? Reach out in #design-system!

Happy building! 🚀
The Design System Team
```

### Communication Channels

| Channel | When | Message Type |
|---------|------|--------------|
| Slack #design-system | Immediately after release | Full announcement |
| Email to stakeholders | Within 1 hour | Summary + links |
| Team meeting | Next standup | Quick mention |
| Company newsletter | Monthly | Updates summary |
| Blog post | Major releases | Detailed article |

---

## 📊 Release Metrics

### Track These Metrics

```javascript
// Release metrics to monitor
const metrics = {
  // Quality
  testsPassingRate: '100%',
  codeCoverage: '>80%',
  bundleSize: '<100KB',
  
  // Adoption
  downloadsPostRelease: 'Track for 7 days',
  issuesReported: 'Monitor for 48h',
  slackQuestions: 'Count for 1 week',
  
  // Performance
  buildTime: '<5 minutes',
  deployTime: '<10 minutes',
  rollbackTime: '<2 minutes'
};
```

### Release Dashboard

```markdown
## Release v1.2.0 Dashboard

### Health Status: 🟢 Healthy

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Tests Passing | 100% | 100% | ✅ |
| Coverage | >80% | 85% | ✅ |
| Bundle Size | <100KB | 92KB | ✅ |
| npm Downloads | >1000/week | 1,250 | ✅ |
| Open Issues | <10 | 7 | ✅ |
| Response Time | <4h | 2.5h | ✅ |
```

---

## 🚨 Emergency Procedures

### Critical Bug in Production

1. **Assess Impact** (5 mins)
   - How many users affected?
   - Which components broken?
   - Can it be worked around?

2. **Decide Action** (5 mins)
   - Hotfix: If fixable in <1 hour
   - Rollback: If complex or breaking

3. **Execute** (10-60 mins)
   - Hotfix: Fix → Test → Release
   - Rollback: Run rollback procedure

4. **Communicate** (Immediately)
   - Post in #design-system-urgent
   - Email stakeholders
   - Update status page

5. **Post-Mortem** (Within 48h)
   - Root cause analysis
   - Prevention measures
   - Process improvements

---

## 📝 Appendix

### Release Tools

| Tool | Purpose | Documentation |
|------|---------|--------------|
| semantic-release | Automated versioning | [Docs](https://semantic-release.gitbook.io/) |
| conventional-changelog | Changelog generation | [Docs](https://github.com/conventional-changelog) |
| np | npm publishing | [Docs](https://github.com/sindresorhus/np) |
| release-it | Release automation | [Docs](https://github.com/release-it/release-it) |

### Useful Commands

```bash
# Check what will be released
npm run dry-run

# See commit history since last release
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Check package versions in use
npm view @company/design-system versions

# Find who's using what version
npm view @company/design-system@1.2.0

# Deprecate a version
npm deprecate @company/design-system@1.2.0 "Use 1.2.1 instead"
```

---

*Release Process v1.0 | October 2025*
*Last Updated: Today*
*Next Review: Quarterly*