# Universal Video Saver

A clean, mobile-first starter website for a public-media saving workflow.

## Important
This project intentionally does **not** bypass DRM, authentication, access controls, paywalls, platform restrictions, or other technical protections.

The current frontend:
- detects common media-source domains
- provides a responsive UI
- contains Terms, Privacy, Contact and Supported Sources pages
- does not send the entered URL to a server

## Run
Open `index.html` directly, or deploy the folder to Vercel/GitHub Pages.

## Production backend
If a permitted media endpoint is added later, keep the frontend separate from the processing service. Do not store user URLs unnecessarily, and only support content/download flows authorized by the source and applicable law/policies.

## Google Drive content
Google Drive can be used for non-user-facing content/configuration, but public browser fetching should be tested for access permissions and CORS before relying on it as a production content source.

## Version 2
URL validation, supported-domain detection, source preview, and direct-media URL handling have been added. Platform-protected media extraction is intentionally not included.
