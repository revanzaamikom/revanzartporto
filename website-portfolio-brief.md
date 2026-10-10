# MASTER PORTFOLIO BRIEF  -  REVANZART

**Purpose:** Complete content and implementation brief for a personal portfolio and website development service business.

**Portfolio repository:** `https://github.com/revanzaamikom/revanzartporto`

**Known project repository:** `https://github.com/revanzaamikom/camp-plan`

**Primary goal:** Position the portfolio as a professional personal brand that demonstrates web development capability, showcases real projects, and generates potential website development clients.

---

# 1. PERSONAL BRAND

## Brand Name

Revanza / Revanzart

Use the existing brand identity from the current portfolio repository where available. Do not invent a new logo, brand name, or visual identity without inspecting the existing implementation first.

## Professional Positioning

A multidisciplinary digital creator with interests and experience across web development, visual design, and digital production.

The portfolio should communicate two complementary strengths:

1. **Web development:** Building modern websites and interactive web applications.
2. **Visual creativity:** Understanding composition, interface presentation, visual hierarchy, and digital experiences.

The overall positioning should prioritize website development as the main commercial service while preserving the creative background as a differentiator.

## Suggested Hero Copy

### Headline

**Websites Built with Purpose. Designed to Make an Impact.**

### Supporting Description

I build modern, responsive websites and digital experiences that help businesses establish their online presence, present their products, and connect with their audiences.

Combining technical implementation with a visual-first approach, I focus on creating websites that are practical, engaging, and ready to grow.

### Primary CTA

Let's Build Your Website

### Secondary CTA

Explore My Projects

Use Indonesian or English consistently throughout the site. English is suitable for an international-facing portfolio, while an Indonesian version may help reach local businesses.

---

# 2. PORTFOLIO OBJECTIVES

The portfolio must accomplish five things:

1. Explain who I am and what I do within the first few seconds.
2. Demonstrate actual development work through credible project case studies.
3. Explain website development services in terms that nontechnical clients understand.
4. Establish trust through clear processes, realistic claims, and project documentation.
5. Make it easy for prospective clients to contact me.

The portfolio should function as both a personal developer portfolio and a client acquisition website.

It should not look like a generic template filled with meaningless statistics, fabricated testimonials, or exaggerated technical claims.

---

# 3. WEBSITE STRUCTURE

Recommended routes:

- `/`  -  Home
- `/web`  -  Website development services
- `/web/projects`  -  Project portfolio
- `/web/projects/camp-plan`  -  Camp Plan case study
- `/web/projects/konveksikampus`  -  KonveksiKampus case study
- `/web/contact`  -  Contact and project inquiry

These routes are proposed architecture, not a claim that they already exist. Inspect the repository before creating or changing routes.

If the current site already uses a different structure, preserve the existing architecture where practical.

## 3.1 Home Page

Recommended sections:

1. Navigation
2. Hero
3. Selected projects
4. Services overview
5. Development approach
6. Technology overview
7. About
8. Contact CTA
9. Footer

### Hero

Use a clear headline, concise supporting text, and two obvious actions.

Avoid generic claims such as “the best developer” or “world-class expert.”

### Selected Projects

Feature the strongest real projects first.

Initial candidates:

- Camp Plan
- KonveksiKampus

Add other projects only after confirming their current state and available evidence.

Each project card should contain:

- Project name
- Project category
- Short description
- Relevant visual or screenshot
- Current project status where appropriate
- Link to the detailed case study

Do not show a live-demo button if the deployment is unavailable.

### Services Overview

Present the main service categories:

- Landing page development
- Business websites
- Product catalog websites
- Custom web applications
- Website improvements and redesigns

### Development Approach

Explain how projects move from requirements to planning, design, development, testing, and delivery.

### Technology Overview

Show technologies only when supported by actual project experience.

Do not use a technology logo wall merely to make the portfolio appear more advanced.

---

# 4. WEBSITE DEVELOPMENT SERVICES

## Service 1  -  Landing Page Development

### Description

A focused website designed to introduce a business, communicate its value, and guide visitors toward a clear action.

### Suitable For

- Small businesses
- Personal brands
- Event promotions
- Product campaigns
- Service providers

### Potential Deliverables

- Responsive landing page
- Hero and value proposition sections
- Service or product information
- Contact and WhatsApp CTA
- Basic search-engine metadata
- Deployment configuration

Final scope depends on project requirements.

## Service 2  -  Business Website

### Description

A multi-page website that presents a business professionally and makes important information accessible to potential customers.

### Suitable For

- Service businesses
- Local companies
- Studios and creative businesses
- Organizations
- Professional service providers

### Potential Deliverables

- Home page
- About page
- Services page
- Contact page
- Responsive navigation
- Contact form or WhatsApp integration
- Basic SEO configuration

## Service 3  -  Product Catalog Website

### Description

A digital catalog that allows customers to browse products, explore categories, and contact a business for additional information or orders.

### Potential Deliverables

- Product catalog
- Category filtering
- Product detail presentation
- Product imagery
- WhatsApp inquiry flow
- Optional administrative dashboard

A static catalog and a database-powered catalog must be described as different implementations.

## Service 4  -  Custom Web Application

### Description

Interactive web applications built around a particular workflow, business requirement, or user problem.

### Potential Examples

- Planning tools
- Budget calculators
- Data-driven interfaces
- Location-based discovery
- Custom dashboards

Only offer specific integrations or advanced features after reviewing technical requirements and estimating implementation effort.

## Service 5  -  Website Improvements

### Description

Improvements to an existing website focused on presentation, usability, responsive behavior, and maintainability.

### Potential Deliverables

- Responsive layout improvements
- Interface refinements
- Navigation improvements
- Performance investigation
- Bug fixes
- Existing feature updates

Do not guarantee specific performance scores before auditing the website.

---

# 5. WEBSITE SERVICE PACKAGES

These are proposed commercial packages. Prices, timelines, and final scope must be determined separately.

## BASIC  -  Digital Presence

Designed for businesses that need a simple professional online presence.

Potential scope:

- Single-page landing website
- Business introduction
- Services or product overview
- Contact information
- WhatsApp CTA
- Responsive design
- Basic SEO metadata
- Deployment assistance

Best suited for small businesses and service providers.

## BUSINESS  -  Managed Product Catalog

Designed for businesses that need a more structured product catalog.

Potential scope:

- Features included in Basic where applicable
- Multi-section or multi-page structure
- Product catalog and categories
- Administrative dashboard
- Product CRUD operations
- Category CRUD operations
- Product image uploads
- Database integration where required

The dashboard, database, authentication, and upload implementation must be included in the agreed scope and verified before being advertised as an available product.

## PRO  -  Content Management

Designed for businesses that need greater control over their website content.

Potential scope:

- Features included in Business where applicable
- Expanded content management
- Editable website sections
- More flexible content structure
- Additional integrations based on requirements
- Handover documentation

This is a proposed service tier, not proof that a production-ready CMS already exists.

## Optional Add-ons

- Domain setup
- Hosting and deployment setup
- Additional pages
- Additional product categories
- Content migration
- Website maintenance
- Analytics integration
- Additional form integrations
- Custom product configuration tools

Explain recurring expenses separately from development fees.

Domain registration, paid hosting, third-party services, and maintenance may involve additional costs.

---

# 6. PROJECT CASE STUDY  -  CAMP PLAN

## Project Title

Camp Plan  -  Outdoor Equipment Rental & Camping Planning Platform

## Project Category

Web application / outdoor services platform

## Overview

Camp Plan is a web application project intended to make camping preparation more convenient by bringing outdoor equipment discovery, rental-provider information, trip budgeting, and vendor communication into a more centralized experience.

The project explores how digital tools can reduce friction during the process of planning an outdoor trip.

## Problem Context

Preparing a camping trip can require users to perform several tasks separately:

- Discover suitable equipment rental options.
- Find relevant providers.
- Estimate the cost of a trip.
- Calculate expenses among participants.
- Contact providers to discuss availability and arrangements.

Camp Plan aims to connect these activities within a more convenient user experience.

This is the intended problem context. Do not claim that user research has proven these pain points unless supporting research exists.

## Intended Solution

A web platform that combines rental discovery with practical trip-planning tools.

## Features Previously Discussed

### Equipment Rental Discovery

A platform concept for exploring camping and outdoor equipment rental options.

### Vendor Discovery

A way for users to discover relevant rental providers.

### Camping Budget Calculator

A calculator intended to help users estimate trip expenses, including per-person costs.

### WhatsApp-Based Contact

A direct communication flow intended to make it easier to contact rental providers.

### Location-Oriented Discovery

Location-related functionality intended to support the discovery of relevant providers.

**Important:** Verify every feature against the source code before describing it as implemented. Distinguish working features from prototypes, planned features, and incomplete implementations.

## Technical Stack Previously Identified

The following technologies were previously associated with the project, but each must be verified against the repository before publication:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Leaflet
- Upstash Redis
- Zod
- Sentry

Do not imply that every technology powers a production feature simply because it appears in a dependency file.

## Engineering Discussion

Potential case-study topics, if supported by the implementation:

- Structuring an interactive web application
- Handling application data
- Designing responsive user interfaces
- Integrating location-related functionality
- Building practical calculation workflows
- Organizing validation and error handling
- Considering reliability and application performance

Only document actual implementation decisions and challenges after reviewing the source code.

## Project Status

The live deployment was reported as temporarily unavailable because of hosting-credit limitations.

Therefore:

- Label the project as unavailable or not currently deployed.
- Do not represent the project as an operational live service.
- Do not invent performance metrics or user statistics.
- Use real screenshots, source-code references, or recorded demonstrations when available.

Repository:

https://github.com/revanzaamikom/camp-plan

Live demo:

Temporarily unavailable; update this field if the application is redeployed.

---

# 7. PROJECT CASE STUDY  -  KONVEKSIKAMPUS

## Project Title

KonveksiKampus  -  Digital Catalog and Website Solution for Campus Apparel Businesses

## Project Category

Business website / product catalog / potential website service product

## Overview

KonveksiKampus is a website project concept focused on helping campus apparel and garment businesses present their products through a structured digital catalog.

The project also serves as an exploration of a reusable website service model that can accommodate businesses with different requirements and budgets.

## Problem Context

Garment and campus apparel businesses may need a more structured way to:

- Present their business online.
- Organize product categories.
- Display product images and descriptions.
- Help customers explore available offerings.
- Receive product inquiries.

These points are the intended business use cases, not verified research findings.

## Proposed Solution

A website structure that can grow from a simple business landing page into a managed product catalog and a more flexible content management solution.

## Proposed Service Levels

### Basic

- Business landing page
- Static product catalog
- Business information
- Contact details
- WhatsApp inquiry CTA

### Business

- Catalog management
- Category management
- Administrative interface
- Product image upload
- Database-backed content, if implemented

### Pro

- Expanded content management
- Editable content sections
- Additional functionality based on requirements

## Technical Direction

Astro was previously being considered for the project.

The final framework, database, hosting, authentication, upload provider, and deployment architecture must be confirmed before the technology section is published.

The implementation should favor an appropriate balance between:

- Development and maintenance costs
- Loading performance
- Ease of content updates
- Security
- Client usability
- Future extensibility

## Potential Business Value

The project can demonstrate the ability to translate a business requirement into a structured website offering with clearly differentiated functionality.

It may also become a reusable foundation for similar businesses, provided the architecture supports the intended reuse.

## Project Status

In development or planning, depending on the current repository state.

Do not label it a completed commercial product until the implementation, deployment, and supported features have been verified.

---

# 8. ABOUT SECTION

## Suggested Copy

I'm a multidisciplinary digital creator interested in building useful and visually engaging digital experiences.

My work brings together web development and visual creativity, with an emphasis on clear presentation, practical functionality, and user-focused design.

I enjoy exploring how digital products can solve real problems, from business websites and product catalogs to interactive web applications.

Through each project, I aim to improve my technical skills, refine my design judgment, and develop solutions that are useful beyond their visual appearance.

The goal is to keep learning while building projects with a clear purpose.

This copy should be adjusted to reflect actual experience, education, and completed work. Do not invent professional employment history, client names, awards, or years of experience.

---

# 9. DEVELOPMENT WORKFLOW

## Step 1  -  Discovery

Understand the client's business, target audience, goals, and required functionality.

Deliverable: project brief and initial scope.

## Step 2  -  Planning

Define the page structure, user journeys, functionality, and technical requirements.

Deliverable: sitemap and feature list.

## Step 3  -  Design

Establish the visual direction, hierarchy, spacing, responsive behavior, and interaction patterns.

Deliverable: approved design direction or interface mockups, depending on scope.

## Step 4  -  Development

Implement the website and agreed functionality.

Deliverable: working development build.

## Step 5  -  Testing

Check navigation, responsiveness, forms, interactive features, and supported browsers.

Deliverable: tested release candidate.

## Step 6  -  Deployment and Handover

Deploy the website using the agreed infrastructure and provide the agreed documentation or handover.

Deliverable: deployed website and handover materials, where included in scope.

Do not promise unlimited revisions, perpetual support, or free lifetime hosting unless explicitly included in the agreement.

---

# 10. TECHNOLOGY SECTION

Technology should be grouped by its actual role rather than displayed as an undifferentiated list.

Potential categories:

### Frontend

Frameworks and interface technologies actually used in completed projects.

### Styling and UI

CSS frameworks, design systems, and component approaches actually used.

### Backend and Data

Databases, server-side tools, APIs, and authentication systems actually implemented.

### Deployment and Tools

Hosting, version control, monitoring, and development tools actually used.

## Verification Rules

Before publishing:

1. Inspect the source code and dependency files.
2. Confirm which technologies are directly used.
3. Distinguish personal familiarity from production experience.
4. Remove unused dependencies and speculative integrations from project descriptions.
5. Avoid assigning proficiency ratings without a meaningful basis.

The portfolio must not imply mastery of a technology merely because it was used in a tutorial or included in a package file.

---

# 11. CONTACT PAGE

## Suggested Heading

Have a Website Project in Mind?

## Supporting Copy

Whether you need a landing page, a business website, a product catalog, or a custom web application, let's discuss your requirements and find an approach that fits your goals.

## Suggested Contact Actions

- WhatsApp
- Email
- GitHub
- Other professional profiles that are actually maintained

Use real contact details from the existing repository or information explicitly supplied by the owner. Do not fabricate contact information.

## Project Inquiry Fields

If a contact form is implemented, consider:

- Name
- Email or preferred contact method
- Business or project name
- Type of website
- Required features
- Budget range, optional
- Target completion date, optional
- Additional notes

Use appropriate validation, error feedback, spam protection, and privacy-conscious data handling.

---

# 12. DESIGN DIRECTION

The visual identity should feel modern, technical, clean, and creative without sacrificing readability.

## Design Principles

- Strong typography hierarchy
- Consistent spacing
- Clear content grouping
- Restrained use of accent colors
- High-quality project visuals
- Subtle motion where useful
- Clear CTA placement
- Accessible contrast
- Responsive layouts

## Suggested Visual Direction

A refined, developer-oriented visual system with a dark or neutral base, one controlled accent color, clean typography, and strong project imagery.

This is a proposed direction. Inspect the existing portfolio before changing the established design system.

## Motion

Use animation to support hierarchy and transitions rather than distract from the content.

Prefer restrained entrance transitions, hover feedback, and purposeful interface movement.

Respect reduced-motion preferences.

## Project Visuals

Prioritize real assets:

- Screenshots of working pages
- Actual application interfaces
- Real responsive layouts
- Relevant implementation details
- Diagrams of real architecture, where useful

Do not use fabricated product screenshots as evidence of completed functionality.

---

# 13. TRUST AND CREDIBILITY

The portfolio should demonstrate credibility through evidence rather than unsupported claims.

Useful evidence includes:

- Public source repositories
- Real screenshots
- Clearly documented project goals
- Verified feature descriptions
- Actual implementation decisions
- Honest project status
- Clear contact information

Do not fabricate:

- Client testimonials
- Number of customers
- Revenue generated
- Website traffic
- Performance scores
- Conversion improvements
- Project completion dates
- Awards or certifications

Where results are unavailable, describe the work completed and what the project demonstrates instead.

---

# 14. SEO AND METADATA

Each public page should have an appropriate:

- Page title
- Meta description
- Canonical URL, where appropriate
- Social-sharing metadata
- Favicon
- Heading hierarchy
- Descriptive image alt text

Suggested home-page title:

**Revanza  -  Web Developer & Digital Creator**

Suggested description:

**Explore Revanza's web development projects, business website solutions, product catalog websites, and custom digital experiences.**

Adjust metadata to match the actual site content and language.

Do not add structured data that claims unverified business details, ratings, reviews, or professional credentials.

---

# 15. IMPLEMENTATION REQUIREMENTS FOR OPENCODE

Before changing files, inspect the entire existing repository and identify:

- Framework and version
- Routing structure
- Main page components
- Existing design system
- Styling approach
- Asset locations
- Package dependencies
- Existing contact links
- Current deployment configuration
- Existing responsive behavior

Then implement the portfolio improvements in the existing architecture.

## Requirements

1. Preserve working functionality.
2. Reuse existing components where appropriate.
3. Avoid unnecessary dependency additions.
4. Keep the design responsive.
5. Ensure all internal routes work.
6. Ensure CTA links point to real destinations.
7. Do not invent project features.
8. Do not expose secrets, environment variables, or private credentials.
9. Do not hardcode private keys into frontend code.
10. Provide accessible focus states and sensible semantic HTML.
11. Test the production build.
12. Report any incomplete sections or features that require manual configuration.

## Project Content Verification

For each case study, separate information into:

- Implemented and verified
- Implemented but not fully tested
- Planned
- Not implemented
- Unknown

Only the first category should be presented as a confirmed working feature without qualification.

For Camp Plan, check the current code before publishing the previously identified technology stack or functionality.

For KonveksiKampus, verify the current implementation before presenting planned package features as available services.

## Final Quality Checklist

- [ ] Home page clearly communicates the service.
- [ ] Project cards contain accurate information.
- [ ] Case studies distinguish goals from implemented features.
- [ ] Unavailable demos are labeled correctly.
- [ ] Contact links work.
- [ ] Responsive layouts are checked.
- [ ] Navigation works across all routes.
- [ ] No fabricated testimonials or statistics.
- [ ] No exposed credentials.
- [ ] Build and lint checks pass where configured.
- [ ] SEO metadata is present and accurate.
- [ ] The final implementation summary lists what changed and what remains incomplete.

---

# 16. CONTENT PRIORITY

If implementation time is limited, prioritize in this order:

1. A strong home page and clear service positioning.
2. Two detailed project case studies.
3. Working contact and inquiry flow.
4. Accurate project screenshots and status labels.
5. Responsive polish and accessibility.
6. SEO and social-sharing metadata.
7. Additional content and decorative animation.

The objective is not to make the portfolio appear larger than it is. The objective is to make the existing work easier to understand, more credible, and more effective at attracting suitable projects.
