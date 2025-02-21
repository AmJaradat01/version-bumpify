#!/usr/bin/env node

const { updatePackageFile, updateReadme } = require('../lib/helpers');

const newVersion = process.argv[2];

if (!newVersion) {
    console.error('Error: Please provide a new version (e.g., bumpify 2.0.2)');
    process.exit(1);
}

// Validate semantic versioning
const semverRegex = /^\d+\.\d+\.\d+(-[\da-zA-Z-.]+)?$/;
if (!semverRegex.test(newVersion)) {
    console.error(`Error: Invalid semantic version "${newVersion}". Expected format: MAJOR.MINOR.PATCH (e.g., 1.2.3)`);
    process.exit(1);
}

// Run updates
updatePackageFile('package.json', newVersion);
updatePackageFile('package-lock.json', newVersion);
updateReadme(newVersion);

console.log(`Version bump complete! Updated to ${newVersion}.`);
