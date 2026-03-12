# Language Switching Implementation Plan

Add a robust language switching mechanism (EN/FR) to the portfolio using React Context.

## Proposed Changes

### [Component] Language Context

#### [NEW] [LanguageContext.jsx](file:///d:/dev201/portfolio/src/context/LanguageContext.jsx)
Create a context to hold the current language state and provide a translation function [t()](file:///d:/dev201/portfolio/src/components/Footer.jsx#5-140).

#### [NEW] [translations.js](file:///d:/dev201/portfolio/src/constants/translations.js)
Store all UI strings for English and French.

### [Component] Core Application

#### [MODIFY] [App.jsx](file:///d:/dev201/portfolio/src/App.jsx)
Wrap the application with `LanguageProvider`.

### [Component] UI Components

#### [MODIFY] [Nav.jsx](file:///d:/dev201/portfolio/src/components/Nav.jsx)
Connect the existing language dropdown to the `LanguageContext`. Translate navigation links.

#### [MODIFY] [HeroComponent.jsx](file:///d:/dev201/portfolio/src/components/HeroComponent.jsx)
(Currently only images, but if there's text in the future it'll be ready).

#### [MODIFY] [SelectedWorks.jsx](file:///d:/dev201/portfolio/src/components/SelectedWorks.jsx)
Translate the section title and project categories.

#### [MODIFY] [Skills.jsx](file:///d:/dev201/portfolio/src/components/Skils.jsx)
Translate the section title, description, and category headers.

#### [MODIFY] [Footer.jsx](file:///d:/dev201/portfolio/src/components/Footer.jsx)
Translate the call-to-action text and button labels.

## Verification Plan

### Manual Verification
1. Open the portfolio in the browser.
2. Locate the language dropdown in the navbar (desktop and mobile).
3. Switch from **EN** to **FR**.
4. Verify that:
    - Navigation links change (e.g., "Home" -> "Accueil").
    - "Selected Works" changes to "Projets Sélectionnés".
    - "Skills" description changes to French.
    - Footer text "Let's work together" changes to "Travaillons ensemble".
5. Refresh the page and ensure the language preference persists (I'll implement `localStorage` support).
6. Check the mobile menu to ensure the language switcher there also works.
