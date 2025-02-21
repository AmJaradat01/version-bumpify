const fs = require('fs');
const path = require('path');

/**
 * Validates if the given version follows Semantic Versioning (semver) and removes any leading 'v'.
 * @param {string} version - The version string to validate and sanitize.
 * @returns {string|null} - Returns sanitized version if valid, otherwise null.
 */
const sanitizeAndValidateSemver = (version) => {
    const semverRegex = /^v?(\d+\.\d+\.\d+(-[\da-zA-Z-.]+)?)$/;
    const match = version.match(semverRegex);
    return match ? match[1] : null;
};

/**
 * Updates the version in a given package file (package.json or package-lock.json).
 * @param {string} file - The package file name.
 * @param {string} newVersion - The new version string.
 */
const updatePackageFile = (file, newVersion) => {
    const sanitizedVersion = sanitizeAndValidateSemver(newVersion);
    if (!sanitizedVersion) {
        console.error(`Invalid semantic version: ${newVersion}. Skipping update.`);
        return;
    }

    const packagePath = path.resolve(process.cwd(), file);
    if (fs.existsSync(packagePath)) {
        const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
        packageContent.version = sanitizedVersion;
        fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2));
        console.log(`${file} updated to version ${sanitizedVersion}`);
    } else {
        console.error(`${file} not found. Skipping...`);
    }
};

/**
 * Updates the version badges in README.md from multiple sources.
 * @param {string} newVersion - The new version string.
 */
const updateReadme = (newVersion) => {
    const sanitizedVersion = sanitizeAndValidateSemver(newVersion);
    if (!sanitizedVersion) {
        console.error(`Invalid semantic version: ${newVersion}. Skipping update.`);
        return;
    }

    const readmePath = path.resolve(process.cwd(), 'README.md');
    if (!fs.existsSync(readmePath)) {
        console.log('README.md not found. Skipping...');
        return;
    }

    let readmeContent = fs.readFileSync(readmePath, 'utf-8');

    const badgeSources = [
        {
            regex: /(!\[Version\]\(https:\/\/img\.shields\.io\/badge\/version-v[\d.]+-blue\.svg\))/,
            replace: `![Version](https://img.shields.io/badge/version-v${sanitizedVersion}-blue.svg)`
        },
        {
            regex: /(!\[npm version\]\(https:\/\/badgen\.net\/npm\/v\/[-\w.]+\))/,
            replace: `![npm version](https://badgen.net/npm/v/version-bumpify)`
        },
        {
            regex: /(!\[npm version\]\(https:\/\/badge\.fury\.io\/js\/[-\w.]+\.svg\))/,
            replace: `![npm version](https://badge.fury.io/js/version-bumpify.svg)`
        },
        {
            regex: /(!\[Nodei.co\]\(https:\/\/nodei\.co\/npm\/[-\w.]+\.png\))/,
            replace: `![Nodei.co](https://nodei.co/npm/version-bumpify.png)`
        }
    ];

    let updated = false;
    badgeSources.forEach(({ regex, replace }) => {
        if (regex.test(readmeContent)) {
            readmeContent = readmeContent.replace(regex, replace);
            updated = true;
        }
    });

    if (updated) {
        fs.writeFileSync(readmePath, readmeContent);
        console.log(`README.md version badges updated to version ${sanitizedVersion}`);
    } else {
        console.log('No version badges found in README.md. Skipping update for README.md.');
    }
};

module.exports = {
    updatePackageFile,
    updateReadme
};