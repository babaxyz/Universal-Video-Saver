# Universal Video Saver — Final Starter

A lightweight, mobile-friendly frontend for saving **authorized direct public media files**.

## What works
- URL validation
- Direct media-file detection
- MP4/WebM/MOV/M4V/OGV/MP3/M4A/WAV/OGG support
- Browser save button
- Responsive UI
- No login
- No database
- No permanent user-data storage

## Important limitation
Social-platform page URLs are detected but are not extracted or converted. This package does not bypass platform protections or DRM.

## Deploy
Upload all files so that `index.html` is at the repository root, then deploy to GitHub Pages or Vercel.

## Production backend
If you later add server-side processing, restrict it to authorized/direct media sources, validate content types, protect against SSRF, use rate limits, and avoid permanent storage unless required.
