# Youtube better subscriptions - Hiding Old Videos
This is a fork of a fork. 
That fork added functionality to hide old videos based on the date. This has SIGNIFICANT performance improvements for the original no longer actively maintained package. 
Youtube loads 99 videos at once. If Youtube Better Subscriptions has several hundred hidden videos... well... you're loading 99 videos over... and over... and over....

In effect, the Hiding Old Videos actually hides them, not removes them. Therefore, just 1 singular video call is made to Youtube. 

My fork in particular fixes issues with the CSS so it actually does as intended (wasn't hiding / was clashing) and is keeping up to date with Youtube Layout changes. 

It is, by extension of the original fork, scuffed. And a little jank. 
The space is blank and empty.... that's... by design to block Youtube from loading new videos. 

Just. Just take the Performance Improvements. It's significant. Plus, it helps compact videos into a nice small block.
Nerd.



# ORIGINAL README. Youtube better subscriptions
This plugin aims to make navigating YouTube's subscription grid easier by allowing users to hide watched videos.
This plugin is in early development and will often change and (hopefully) include new features.

Available for Firefox: https://addons.mozilla.org/cs/firefox/addon/youtube-better-subscriptions/

Available for Chrome: https://chrome.google.com/webstore/detail/better-subscriptions-for/fkchdogohkjpnhfkganifkbbjcjofbjf


The icon for the marked watched Button is based on: https://commons.wikimedia.org/wiki/File:OOjs_UI_icon_eye.svg published under the CC-BY-SA-3.0, the modified version is licensed under CC-BY-SA-4.0

The icon for the settings Button is taken based on: https://commons.wikimedia.org/wiki/File:OOjs_UI_icon_settings.svg published under the MIT licence, , the modified version is licensed under MIT

The addon as a whole is still licensed under the GPLv3

## Contribution guidelines
- Please follow code style conventions set across the project. Ie, use `let` instead of `var`, use proper opening and closing curly braces for `if`s, etc
  - If your IDE doesnt automatically apply settings from .editorconfig, please take care that you indent using spaces, not tabs.
- Branch off and create Pull Requests from the master branch
