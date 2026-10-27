---

name: pinegrow-development
description: Use this skill when creating, developing, refactoring, debugging, or maintaining websites and web projects intended to be developed with Pinegrow Web Editor. It guides the agent on Pinegrow project structure, HTML-first development, CSS and Tailwind integration, reusable components, responsive layouts, accessibility, JavaScript/Alpine.js integration, WordPress themes, source-code preservation, and safe editing practices that keep projects compatible with Pinegrow.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Pinegrow Development

## When to Use

Use this skill when:

* Creating a new website intended to be edited in Pinegrow.
* Modifying an existing Pinegrow project.
* Creating or refactoring HTML, CSS, JavaScript, or Alpine.js used by a Pinegrow project.
* Building responsive layouts that will be visually edited in Pinegrow.
* Working with Tailwind CSS inside Pinegrow.
* Creating reusable HTML components, sections, layouts, or templates.
* Creating or modifying Pinegrow WordPress themes.
* Preparing static HTML projects for later integration with WordPress.
* Debugging visual or structural problems in a Pinegrow project.
* Refactoring generated HTML while preserving visual editing compatibility.
* Reviewing whether code follows Pinegrow-friendly development practices.

Do not use this skill for projects where Pinegrow is completely irrelevant to the development workflow.

---

# Core Principle

Treat Pinegrow as a **visual HTML development environment**, not as a framework or runtime.

The source files remain the source of truth.

Prefer:

1. Semantic HTML
2. Clean document structure
3. Predictable CSS
4. Explicit responsive behavior
5. Minimal JavaScript
6. Reusable components
7. Accessibility
8. Maintainability
9. Pinegrow compatibility

Do not generate code merely because it looks correct in the browser.

The resulting project must remain understandable and editable in Pinegrow.

---

# 1. Understand the Project Before Editing

Before making significant changes:

1. Inspect the project structure.
2. Identify the main HTML files.
3. Identify stylesheets.
4. Identify JavaScript files.
5. Identify images, fonts, icons, and other assets.
6. Check for Tailwind configuration or generated CSS.
7. Check for Alpine.js or other JavaScript dependencies.
8. Check whether the project contains Pinegrow metadata such as `project.pgml`.
9. Determine whether the project is:

   * Static HTML
   * Tailwind HTML
   * Alpine.js application
   * WordPress theme
   * WooCommerce theme
   * Hybrid project

Never assume the framework or build process.

Inspect first.

---

# 2. Pinegrow Project Structure

A typical project can contain:

```text
project/
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── images/
├── fonts/
└── project.pgml
```

The exact structure may differ.

Do not reorganize a project merely for aesthetic reasons.

Preserve an existing structure unless there is a concrete technical reason to change it.

---

# 3. HTML Is the Primary Structure

Pinegrow works directly with HTML documents.

Write clear, semantic HTML.

Prefer:

```html
<header>
    <nav>
        ...
    </nav>
</header>

<main>
    <section>
        ...
    </section>
</main>

<footer>
    ...
</footer>
```

Avoid unnecessarily deep nesting.

Do not create wrapper elements without a structural or styling purpose.

Prefer meaningful elements:

* `header`
* `nav`
* `main`
* `section`
* `article`
* `aside`
* `footer`
* `figure`
* `form`
* `button`

Use `<div>` when there is no more appropriate semantic element.

---

# 4. Preserve HTML Editability

Code generated for Pinegrow should remain easy to select and modify in the visual editor.

Avoid:

* Extremely complex selectors
* Excessive nesting
* Generated class-name hashes
* Unnecessary inline styles
* Massive one-line HTML documents
* HTML generated entirely through JavaScript
* DOM structures that are impossible to understand visually

Prefer readable markup:

```html
<article class="card">
    <img
        src="images/product.jpg"
        alt="Product description"
        class="card__image"
    >

    <div class="card__content">
        <h2 class="card__title">Product name</h2>

        <p class="card__description">
            Product description.
        </p>

        <a href="#" class="card__link">
            Learn more
        </a>
    </div>
</article>
```

---

# 5. Do Not Destroy Existing Design

When modifying an existing page:

1. Understand the current layout.
2. Identify the existing design system.
3. Identify reusable classes.
4. Identify responsive rules.
5. Identify dependencies.
6. Make the smallest change that solves the problem.

Do not rewrite an entire page when only one component needs modification.

Do not replace an existing CSS architecture with Tailwind merely because Tailwind is available.

Do not introduce a new framework without explicit justification.

---

# 6. CSS Strategy

Use the project's existing CSS architecture whenever possible.

For traditional CSS:

* Prefer classes over IDs for styling.
* Avoid excessive specificity.
* Avoid `!important` unless genuinely necessary.
* Keep responsive rules predictable.
* Group related styles logically.
* Use CSS variables for design tokens when appropriate.

Example:

```css
:root {
    --color-primary: #2563eb;
    --color-text: #111827;
    --color-muted: #6b7280;
    --radius-md: 0.5rem;
}
```

Prefer:

```css
.button {
    ...
}
```

over:

```css
main > div:nth-child(2) > div:first-child a {
    ...
}
```

Selectors should describe the component rather than its accidental DOM position.

---

# 7. Tailwind CSS in Pinegrow

When a project uses Tailwind CSS, follow the existing Tailwind version and configuration.

Do not assume Tailwind v3 or v4.

Inspect the project before modifying Tailwind code.

Pinegrow supports Tailwind Visual Editor, including Tailwind projects and visual controls. Current Pinegrow versions support Tailwind CSS 4 as well as 3.x projects.

Use utility classes directly in HTML when the project follows the standard Tailwind approach:

```html
<button
    class="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
>
    Continue
</button>
```

Do not introduce arbitrary custom CSS when a suitable existing Tailwind utility already exists.

However, do not blindly convert every existing CSS rule into Tailwind utilities.

Preserve the project's established architecture.

---

# 8. Tailwind Component Styles

When the project uses Pinegrow Component Styles, understand that they are different from ordinary inline Tailwind classes.

Pinegrow supports Component Styles that use Tailwind to generate regular CSS selectors.

Example concept:

```css
.button {
    @apply rounded-lg px-4 py-2 font-medium;
}
```

Use Component Styles when:

* A visual component is reused extensively.
* Styling should be centralized.
* HTML should remain cleaner.
* The project already uses Pinegrow Component Styles.

Use regular Tailwind classes when:

* Building isolated blocks.
* Creating self-contained components.
* The project follows utility-first HTML.
* The component needs to be copied independently.

Do not mix both approaches arbitrarily.

Pinegrow stores project style information in its project metadata, so avoid deleting or corrupting project metadata during automated edits.

---

# 9. Pinegrow Metadata

If `project.pgml` exists:

* Treat it as project metadata.
* Do not delete it.
* Do not rewrite it unnecessarily.
* Do not manually modify it unless there is a clear reason.
* Preserve it in version control.

If the agent does not understand the structure of a Pinegrow metadata file, it must not make speculative modifications to it.

The source HTML/CSS should normally be modified directly.

---

# 10. Responsive Design

Use a mobile-first approach unless the existing project clearly follows another strategy.

Before implementing responsive behavior, identify:

* Mobile layout
* Tablet layout
* Desktop layout
* Navigation behavior
* Grid behavior
* Typography scaling
* Spacing changes
* Image behavior
* Overflow behavior

Avoid arbitrary breakpoints.

Use the project's existing breakpoints when available.

For Tailwind:

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
```

Prefer simple responsive rules over many breakpoint-specific overrides.

---

# 11. Layout Strategy

Prefer modern CSS layout systems:

* Flexbox
* CSS Grid
* Container queries when justified
* Logical sizing
* `gap`
* `minmax()`
* `clamp()`

Avoid using:

* Tables for layout
* Excessive absolute positioning
* Fixed pixel dimensions for responsive containers
* Spacer elements
* Empty elements used only to create visual gaps

Example:

```css
.cards {
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(16rem, 1fr)
    );
    gap: 1.5rem;
}
```

---

# 12. Images

Always use meaningful `alt` text for informative images.

Decorative images should normally use:

```html
<img src="decorative.svg" alt="">
```

Prefer responsive images when appropriate:

```html
<img
    src="images/hero.webp"
    alt="Description"
    width="1200"
    height="700"
    loading="lazy"
>
```

Do not lazy-load the primary above-the-fold hero image by default.

Avoid unnecessarily large images.

---

# 13. Accessibility

Accessibility is part of the implementation, not an optional enhancement.

Check:

* Semantic HTML
* Heading hierarchy
* Form labels
* Button semantics
* Keyboard navigation
* Focus states
* Color contrast
* Alternative text
* Link purpose
* ARIA only when necessary

Prefer native HTML semantics over unnecessary ARIA.

Bad:

```html
<div role="button">
    Submit
</div>
```

Good:

```html
<button type="submit">
    Submit
</button>
```

---

# 14. Alpine.js

When Alpine.js is present, preserve the existing Alpine architecture.

Prefer declarative Alpine directives:

```html
<div x-data="{ open: false }">
    <button
        type="button"
        @click="open = !open"
        :aria-expanded="open"
    >
        Menu
    </button>

    <div x-show="open">
        ...
    </div>
</div>
```

Prefer:

* `x-data`
* `x-show`
* `x-if`
* `x-for`
* `x-model`
* `x-bind`
* `x-text`
* `x-html` only when necessary
* `x-init`
* event modifiers

Avoid unnecessary custom JavaScript when Alpine can express the behavior clearly.

Do not introduce React, Vue, jQuery, or another frontend framework into an Alpine project unless explicitly requested.

---

# 15. Alpine.js and Pinegrow

Remember that Pinegrow is editing the HTML source while Alpine may modify the runtime DOM.

Therefore:

* Keep the source HTML understandable.
* Do not depend on runtime-generated DOM for the page's fundamental structure.
* Avoid building entire pages dynamically with Alpine.
* Keep static content in HTML whenever possible.
* Use Alpine for behavior and interactivity.

Good:

```html
<section x-data="{ open: false }">
    <button @click="open = !open">
        Details
    </button>

    <div x-show="open">
        Static content remains in the HTML.
    </div>
</section>
```

Avoid:

```html
<div x-data x-init="generateEntirePage()"></div>
```

The second approach makes visual editing and maintenance unnecessarily difficult.

---

# 16. Components and Reusability

Identify repeated UI patterns.

Typical reusable components include:

* Header
* Navigation
* Footer
* Button
* Card
* Alert
* Modal
* Form field
* Hero section
* Pricing card
* Feature block
* Testimonial
* CTA
* Breadcrumb
* Pagination

Before creating a reusable component, verify that repetition actually exists.

Do not create an abstraction for a single simple element.

Prefer practical reuse over theoretical componentization.

---

# 17. Page Architecture

A typical page should follow:

```text
HTML
├── Document
│   ├── Head
│   │   ├── Metadata
│   │   ├── Fonts
│   │   └── Styles
│   │
│   └── Body
│       ├── Header
│       ├── Main
│       │   ├── Hero
│       │   ├── Content sections
│       │   └── CTA
│       └── Footer
```

Keep page-level structure obvious.

---

# 18. WordPress Projects

When Pinegrow is being used to create or maintain a WordPress theme:

First identify:

* Theme structure
* Template hierarchy
* `functions.php`
* `style.css`
* Template parts
* `header.php`
* `footer.php`
* `single.php`
* `page.php`
* `archive.php`
* `index.php`
* Custom post type templates
* ACF integration
* WooCommerce templates

Do not convert PHP templates into static HTML unless explicitly requested.

Preserve WordPress functions and template tags.

Example:

```php
<?php get_header(); ?>

<main>
    <?php if (have_posts()) : ?>

        <?php while (have_posts()) : the_post(); ?>

            <article>
                <h1><?php the_title(); ?></h1>

                <?php the_content(); ?>
            </article>

        <?php endwhile; ?>

    <?php endif; ?>
</main>

<?php get_footer(); ?>
```

Pinegrow has dedicated documentation for WordPress themes, blocks and plugins, so WordPress work should be treated as a separate development mode rather than assuming every Pinegrow project is static HTML.

---

# 19. WordPress + Tailwind

When working with WordPress and Tailwind:

* Verify how Tailwind is compiled.
* Do not assume Pinegrow's built-in compiler is responsible for production CSS.
* Inspect `package.json`, Tailwind configuration, build scripts and generated CSS.
* Preserve the existing build pipeline.
* Ensure WordPress-generated markup can actually receive the intended styles.

For dynamic WordPress content, be especially careful with selectors and utility classes because the final HTML may not be completely controlled by the static template.

---

# 20. Forms

Use semantic HTML:

```html
<form>
    <div>
        <label for="name">Name</label>

        <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            required
        >
    </div>

    <button type="submit">
        Send
    </button>
</form>
```

Do not use placeholder text as a replacement for labels.

For Alpine forms, keep state close to the form:

```html
<form
    x-data="{ loading: false }"
    @submit="loading = true"
>
    ...
</form>
```

---

# 21. JavaScript

Use JavaScript only when necessary.

Prefer:

```text
HTML
↓
CSS / Tailwind
↓
Alpine.js
↓
Custom JavaScript only when necessary
```

Avoid adding dependencies for simple functionality.

Do not introduce a bundler solely to solve a problem that can be solved with the existing project structure.

If a build system already exists, use it instead of creating a second one.

---

# 22. Performance

Consider:

* Image dimensions
* Image formats
* Font loading
* CSS size
* JavaScript size
* Third-party scripts
* DOM complexity
* Layout shifts
* Above-the-fold resources

Avoid unnecessary JavaScript.

Avoid loading entire libraries for one small feature.

Prefer native browser capabilities whenever practical.

---

# 23. SEO

Every page should have:

* Meaningful `<title>`
* Meta description when appropriate
* Correct heading hierarchy
* Canonical URL where relevant
* Descriptive links
* Proper image alt text
* Semantic structure

Example:

```html
<head>
    <title>Page Title | Site Name</title>

    <meta
        name="description"
        content="Concise description of the page."
    >

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >
</head>
```

Do not add SEO markup merely for the sake of adding markup.

---

# 24. Design System

When building a new project, establish a small design system before creating dozens of components.

Define:

* Primary color
* Secondary color
* Text colors
* Background colors
* Border colors
* Typography
* Font sizes
* Spacing
* Border radius
* Shadows
* Breakpoints
* Container widths

For Tailwind projects, prefer using the Tailwind theme/design configuration rather than scattering arbitrary values throughout the HTML.

---

# 25. Naming

Use predictable names.

Examples:

```text
hero
hero__title
hero__description
hero__actions

card
card__image
card__content
card__title

navigation
navigation__item
navigation__link
```

If the project already uses another naming convention, preserve it.

Do not rename an entire project's classes without a concrete reason.

---

# 26. Editing Existing Code

When modifying code:

1. Read the surrounding code.
2. Understand dependencies.
3. Identify whether the element is reused.
4. Check responsive behavior.
5. Make the smallest safe modification.
6. Verify syntax.
7. Verify references.
8. Check for regressions.

Do not blindly replace matching strings across the project.

Use structural/context-aware changes whenever possible.

---

# 27. Refactoring

Refactor only when there is a measurable or obvious benefit.

Good reasons:

* Duplicate code
* Broken responsive behavior
* Excessive specificity
* Accessibility problems
* Performance problems
* Unmaintainable JavaScript
* Repeated components
* Dead CSS
* Inconsistent naming

Bad reason:

> "This code could be cleaner."

Existing working code does not need to be rewritten simply because another architecture looks more elegant.

---

# 28. Validation

After making changes, verify:

### HTML

* Valid structure
* Correct nesting
* Correct attributes
* No accidental duplicate IDs

### CSS

* Selectors resolve correctly
* Responsive rules work
* No unexpected specificity conflicts

### Tailwind

* Correct Tailwind version
* Classes are available
* Build process still works

### Alpine

* Expressions are valid
* State is correctly scoped
* Events work
* No unnecessary DOM generation

### Assets

* Images exist
* CSS files exist
* JavaScript files exist
* Font paths are correct

### Pinegrow

* HTML remains editable
* Project metadata remains intact
* Visual editing should remain predictable

---

# 29. Browser Testing

When possible:

1. Run the project's existing development/build command.
2. Open the affected page.
3. Test desktop layout.
4. Test mobile layout.
5. Test interactive elements.
6. Check browser console.
7. Check network errors.
8. Verify forms and links.

Do not claim that a visual problem is fixed without testing when browser testing is available.

---

# 30. Git

Treat the Pinegrow project as a normal software project.

Prefer:

```text
git
├── HTML
├── CSS
├── JavaScript
├── assets
└── Pinegrow project metadata
```

Keep Pinegrow project metadata under version control when it is part of the project's editing workflow.

Make focused commits.

Avoid committing generated files unless the project's build/deployment workflow requires them.

---

# 31. Do Not Do These Things

Never:

* Delete `project.pgml` without understanding its purpose.
* Rewrite the entire project unnecessarily.
* Replace a working CSS system without justification.
* Add React/Vue/jQuery just because a feature is interactive.
* Generate entire pages through JavaScript.
* Use absolute positioning for ordinary layout.
* Use `<div>` for everything.
* Ignore accessibility.
* Ignore mobile layouts.
* Introduce unnecessary dependencies.
* Modify build configuration without inspecting it first.
* Assume the project uses the latest Tailwind version.
* Assume Pinegrow's built-in compiler is responsible for production builds.
* Modify WordPress template logic without understanding the template hierarchy.
* Remove Pinegrow-specific metadata or attributes blindly.
* Optimize code at the expense of visual editability.

---

# 32. Preferred Development Workflow

For a new project:

```text
1. Inspect requirements
        ↓
2. Define page structure
        ↓
3. Define design system
        ↓
4. Create semantic HTML
        ↓
5. Build layout
        ↓
6. Implement responsive behavior
        ↓
7. Add reusable components
        ↓
8. Add Alpine.js behavior if necessary
        ↓
9. Validate accessibility
        ↓
10. Validate performance
        ↓
11. Test in browser
        ↓
12. Verify Pinegrow compatibility
```

For an existing project:

```text
1. Inspect
        ↓
2. Understand architecture
        ↓
3. Identify affected components
        ↓
4. Make minimal change
        ↓
5. Test
        ↓
6. Check responsive behavior
        ↓
7. Check Pinegrow compatibility
```

---

# 33. Decision Rules

When there are multiple possible implementations, prefer:

### HTML vs JavaScript

Choose HTML when content can be static.

### CSS vs JavaScript

Choose CSS for visual behavior.

### Alpine.js vs custom JavaScript

Choose Alpine.js when the behavior is interactive UI state.

### Tailwind vs custom CSS

Follow the project's existing styling architecture.

### Component vs duplicated markup

Create a component when reuse is real and maintenance benefits from it.

### Abstraction vs simplicity

Choose the simpler solution unless abstraction provides a clear maintenance benefit.

### Pinegrow visual editing vs code cleverness

Prefer code that remains easy to understand and visually edit in Pinegrow.

---

# 34. Output Expectations

When implementing changes, explain briefly:

* What was changed.
* Which files were modified.
* Why the implementation was chosen.
* Any assumptions.
* Any remaining issues.

Do not provide long explanations for straightforward changes.

When a technical decision has meaningful trade-offs, explicitly state them.

---

# 35. Project-Specific Priority

If project instructions conflict with this skill:

1. Explicit user requirements
2. Project-specific instructions
3. Existing project architecture
4. This skill
5. General conventions

Never force this skill's preferred architecture onto an existing project.

The goal is to produce maintainable code that works with the project's actual architecture and remains practical to develop in Pinegrow.
