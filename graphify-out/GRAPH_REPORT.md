# Graph Report - portfolio  (2026-09-20)

## Corpus Check
- 73 files · ~66,275 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 424 nodes · 582 edges · 23 communities (18 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `94d40453`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 19 edges
2. `siteConfig` - 16 edges
3. `compilerOptions` - 16 edges
4. `Button()` - 11 edges
5. `Portfolite` - 9 edges
6. `getSystemStatus()` - 8 edges
7. `Priority Issues` - 8 edges
8. `Product` - 8 edges
9. `Laravel on the Edge: A Stateless-First Employee Management Platform on Vercel Serverless PHP` - 8 edges
10. `getGitActivity()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `getGitActivity()`  [EXTRACTED]
  app/api/activity/route.ts → lib/activity.ts
- `GET()` --calls--> `getSystemStatus()`  [EXTRACTED]
  app/api/status/route.ts → lib/status.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  components/ui/button.tsx → lib/utils.ts
- `SelectGroup()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts
- `SelectLabel()` --calls--> `cn()`  [EXTRACTED]
  components/ui/select.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (23 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (27): FeaturedProjects(), Footer(), Hero(), ProjectProps, SchematicBox(), SchematicFlow(), SchematicGlobe(), SchematicNodes() (+19 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (39): dependencies, class-variance-authority, clsx, @hookform/resolvers, lucide-animated, lucide-react, motion, next (+31 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (20): EpochFilter, lifetime, Camera, EASE, Gesture, Pointer, TopologyCanvasProps, CAREER_CANVAS (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (21): contactFormSchema, ContactFormValues, cardVariants, gridVariants, ContactProtocol, RequestProtocolDetail, serviceProtocolToContact, cn() (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.16
Nodes (21): dotColor, pingColor, SystemStatusStrip(), timeAgo(), useSystemStatus(), env(), fromLocalGit(), fromVercelApi() (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (16): GET(), CommitRow(), GitActivity(), useGitActivity(), env(), fromGitHubApi(), fromGitRemote(), getGitActivity() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (24): 1. Executive Summary / Overview, 2.1 The deployment topology, 2.2 The custom serverless entrypoint: `api/index.php`, 2.3 Statelessness: moving every framework default off the filesystem, 2.4 TLS termination behind the CDN, 2.5 Trimmed cold-start surface, 2. Architecture & Serverless Engineering, 3. Tech Stack & Tooling Matrix (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (12): geistMono, geistSans, metadata, shortcuts, MotionProvider(), Navbar(), NavigationWrapper(), MotionLink (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (21): 1. Overview, 2. Colors, 3. Typography, 4. Elevation, 5. Components, 6. Do's and Don'ts, Buttons, Cards / Containers (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (8): flatlinePoints, NotFound(), CaseStudyBlock, CaseStudySection, firstOnwHrCaseStudy, caseStudies, CaseStudyPage(), ProjectCaseStudy()

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (18): Alex (Power User), Anti-Patterns Verdict, Design Health Score, Jordan (First-Timer), Minor Observations, Overall Impression, P0 — Auto-playing tab filter takes control from the user, P0 — Box-shadows violate The Flat Rest Rule (+10 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (11): CAM_EASE, connections, Frame, NodeId, PACKET_SAMPLES, PACKET_SPECS, PacketSpec, Phase (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.13
Nodes (14): 1. Server-side rendering & SEO, 2. Fluid UI / UX (Motion), 3. Performance & responsiveness, 4. Semantic HTML & accessibility, Architecture Rationale, Core Architecture, Hexagonal SVG node system, Key Features (+6 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (8): Accessibility & Inclusion, Anti-references, Brand Personality, Design Principles, Product, Product Purpose, Register, Users

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (4): COURSE_BREAKDOWN, Slide, SLIDES, TOTAL_HOURS

## Knowledge Gaps
- **194 isolated node(s):** `caseStudies`, `geistSans`, `geistMono`, `metadata`, `flatlinePoints` (+189 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `siteConfig` connect `Community 0` to `Community 3`, `Community 2`, `Community 11`, `Community 7`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 0` to `Community 3`, `Community 11`, `Community 7`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 3` to `Community 0`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `caseStudies`, `geistSans`, `geistMono` to the rest of the system?**
  _194 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06966618287373004 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07807807807807808 - nodes in this community are weakly interconnected._