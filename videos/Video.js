function getVideoIdFromUrl(url) {
    if (url.includes("shorts")) {
        return url.split("shorts/")[1].split("&")[0];
    } else {
        return url.split("=")[1].split("&")[0];
    }
}

function getVideoId(item) {
    let videoUrl = item.querySelectorAll("a")[0].getAttribute("href");
    if (videoUrl != null) {
        return getVideoIdFromUrl(videoUrl);
    } else {
        log("Video URL is null - ad.");
    }
}

function getVideoFuzzyDate(item) {
    let videoFuzzyDate = item.querySelectorAll(fuzzyDateQuery())[1];
    if (videoFuzzyDate != null) {
        return videoFuzzyDate.innerText;
    }
    else {
        log("Unable to determine video date")
    }
}

function changeMarkWatchedToMarkUnwatched(item) {
    // find Mark as watched button and change it to Unmark as watched
    let metaDataLine = item.querySelector("#" + METADATA_LINE);
    if (metaDataLine != null) {
        let dismissibleDiv = metaDataLine.parentNode;
        dismissibleDiv.removeChild(metaDataLine);

        let markUnwatchedBtn = buildMarkWatchedButton(dismissibleDiv, item, getVideoId(item), false);
        dismissibleDiv.appendChild(markUnwatchedBtn);
    }
}

class Video {
    constructor(containingDiv) {
        this.containingDiv = containingDiv;
        this.videoId = getVideoId(containingDiv);
        this.isStored = watchedVideos['w' + this.videoId];
        this.buttonId = this.isStored ? MARK_UNWATCHED_BTN : MARK_WATCHED_BTN;
        this.fuzzyDate = getVideoFuzzyDate(containingDiv);

        // Check if video is a premiere or a short
        let thumbOverlay = containingDiv.querySelector("ytd-thumbnail-overlay-time-status-renderer");
        this.isPremiere = thumbOverlay ? thumbOverlay.getAttribute("overlay-style") === "UPCOMING" : false;
        let videoHref = containingDiv.querySelectorAll("a")[0]?.getAttribute("href");
        this.isShort = videoHref ? videoHref.includes("shorts") || videoHref.includes("adurl") : true;

        // Determine if the video is older than the cutoff period
        this.isOlder = this.determineIfOlder();
        
        // Apply visibility logic
        this.manageVisibility();
    }

    determineIfOlder() {
        if (!this.fuzzyDate) return null;

        if (this.fuzzyDate.includes("month") || this.fuzzyDate.includes("year")) {
            return true;
        } else if (this.fuzzyDate.includes("weeks") && hideOlderCutoff !== "1 Month") {
            return true;
        } else if (this.fuzzyDate.includes("day")) {
            const daysAgo = Number(this.fuzzyDate.match(/\d+/)[0]);
            if (hideOlderCutoff === "Today") return true;
            if (hideOlderCutoff === "1 Week" && daysAgo >= 7) return true;
        }
        return false;
    }

    manageVisibility() {
        // Skip clearing styles if this is a YouTube Short or Premiere
        if (!this.isShort && !this.isPremiere) {
            this.clearVisibilityStyles();
        }

        if (this.isOlder) {
            this.hideOlder();  // Hide older videos with visibility:hidden
        } else if (this.isStored && hideWatched) {
            this.hide();  // Hide watched videos with display:none
        }

        // Additional visibility handling for Shorts and Premieres
        if (this.isShort || this.isPremiere) {
            this.hide();  // Explicitly hide Shorts and Premieres with display: none
        }
    }

    clearVisibilityStyles() {
        // Reset any visibility-related styles on the video container
        this.containingDiv.style.display = '';
        this.containingDiv.style.visibility = '';
    }

    hide() {
        hidden.push(this.containingDiv);
        this.containingDiv.style.display = 'none';
        this.containingDiv.classList.add(HIDDEN_CLASS);
    }

    hideOlder() {
        older.push(this.containingDiv);
        this.containingDiv.style.visibility = 'hidden';
        this.containingDiv.classList.add(OLDER_CLASS);
        // If on home page, apply display:none to prevent layout shift
        if (getCurrentPage() == PAGES.home) this.containingDiv.style.display = 'none';
    }

    markWatched() {
        changeMarkWatchedToMarkUnwatched(this.containingDiv);

        if (hideWatched) {
            this.hide();
            processSections();
        }

        this.isStored = true;
        watchVideo(this.videoId);
        syncWatchedVideos();
    }

    markUnwatched() {
        unwatchVideo(this.videoId);
        syncWatchedVideos();
    }
}
