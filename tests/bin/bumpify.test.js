// tests/bin/bumpify.test.js

const path = require('path');
const fs = require('fs');
jest.mock('fs');

describe('bumpify CLI tool', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock the current working directory
        jest.spyOn(process, 'cwd').mockReturnValue('/fake/path');

        // Mock fs.existsSync
        fs.existsSync.mockImplementation((filePath) => {
            const fileName = path.basename(filePath);
            return ['package.json', 'package-lock.json', 'README.md'].includes(fileName);
        });

        // Mock fs.readFileSync
        fs.readFileSync.mockImplementation((filePath) => {
            const fileName = path.basename(filePath);
            if (['package.json', 'package-lock.json'].includes(fileName)) {
                return JSON.stringify({ version: '1.0.0' });
            }
            if (fileName === 'README.md') {
                return '![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)\nProject Description';
            }
            return '';
        });

        // Mock console methods
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetModules(); // Important to reset modules
    });

    test('updates package files and README with new version', () => {
        const newVersion = '2.0.0';

        // Set process.argv before requiring the module
        process.argv = ['node', 'bumpify.js', newVersion];

        // Require the CLI script after setting up mocks
        require('../../bin/bumpify.js');

        // Verify that package files are updated
        const expectedPackageContent = JSON.stringify({ version: newVersion }, null, 2);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.resolve('/fake/path', 'package.json'),
            expectedPackageContent
        );
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.resolve('/fake/path', 'package-lock.json'),
            expectedPackageContent
        );

        // Verify that README.md is updated
        const expectedReadmeContent =
            '![Version](https://img.shields.io/badge/version-v2.0.0-blue.svg)\nProject Description';
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            path.resolve('/fake/path', 'README.md'),
            expectedReadmeContent
        );

        // Verify console logs
        expect(console.log).toHaveBeenCalledWith(`package.json updated to version ${newVersion}`);
        expect(console.log).toHaveBeenCalledWith(`package-lock.json updated to version ${newVersion}`);
        expect(console.log).toHaveBeenCalledWith(
            `README.md version badge updated to version ${newVersion}`
        );
    });
});
