# flowsnip–better-background-video

## Overview

This project **improves native Background Video** element in **Webflow**:

- It enhances the autoplay experience on mobile devices with autoplay disabled. The video element is hidden before the playback stars, avoiding the ugly default UI (large play button), while attempting to autoplay the video when the user interacts with the page.
- Also adds a smooth fade-in animation on playback start for all videos.
- Is configurable via data attributes.

## Problem

When background videos are embedded in a web page, videos do not autoplay in power-saving mode and a large default play button appears (often not clickable, because we're autoplaying a background video), cluttering the interface, negatively affecting the overall design & user experience.

Also, it often takes a while before the video playback, causing a "jumpy" feeling when the video finally starts.

## Solution

- When there is an autoplaying video that is paused, we add an event listener to the page, waiting for a click event. When the user interacts with the page, the video will play (iOS only accepts clicks within the area of the video element itself).
- When the video is not yet playing, we hide it and display the poster image, so that the ugly default play button never appears.
- On playback start, the video element element gets `is-playing` class, which is used for the default fade-in animation, or can possibly be used to add custom CSS animations.

## How to Use

### Embedding the Script

`Site settings` > `Custom Code` > `Head code`

```
<script src="https://cdn.jsdelivr.net/npm/flowsnip–better-background-video@1.0.0/dist/flowsnip–better-background-video.min.js" async></script>
```

### Basic Usage

No further setup is needed. By default, the autoplay will be taken care of, as well as the fade-in animation.

### Configuration

On the `Background Video` module settings, you can add the following data attributes:

- `data-no-poster` - **Don't use the default video poster image, that Webflow generates aka. keep the video transparent until the playback starts.** Allows you to use a custom poster image – just add an image to your markup so that is displayed beneth the video element.
- `data-no-fadein` - **Don't use the default styling that hides the video before playback and animates it in.** It's up to you then to handle the css, if you want – you can still make use of the `is-playing` class to add custom animations.

<br>

---

<br>

_This project was bootstrapped with [Finsweet Developer Starter](https://github.com/finsweet/developer-starter)._
