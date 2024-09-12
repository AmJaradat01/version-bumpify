const fs = require('fs');
const path = require('path');
const helpers = require('../../lib/helpers.js');

jest.mock('fs');

describe('Helper Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('updatePackageFile', () => {
        test('updates the version in the package file when the file exists', () => {
            const mockFileName = 'package.json';
            const mockNewVersion = '2.0.0';
            const mockPackageContent = { version: '1.0.0' };
            const mockPackagePath = '/fake/path/package.json';

            // Mock functions
            jest.spyOn(process, 'cwd').mockReturnValue('/fake/path');
            jest.spyOn(path, 'resolve').mockReturnValue(mockPackagePath);
            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify(mockPackageContent));

            // Spy on console.log
            jest.spyOn(console, 'log').mockImplementation(() => {});

            helpers.updatePackageFile(mockFileName, mockNewVersion);

            expect(fs.existsSync).toHaveBeenCalledWith(mockPackagePath);
            expect(fs.readFileSync).toHaveBeenCalledWith(mockPackagePath, 'utf-8');
            expect(fs.writeFileSync).toHaveBeenCalledWith(
                mockPackagePath,
                JSON.stringify({ version: mockNewVersion }, null, 2)
            );
            expect(console.log).toHaveBeenCalledWith(`${mockFileName} updated to version ${mockNewVersion}`);

            // Restore mocks
            jest.restoreAllMocks();
        });

        test('logs an error when the package file does not exist', () => {
            const mockFileName = 'package.json';
            const mockNewVersion = '2.0.0';
            const mockPackagePath = '/fake/path/package.json';

            jest.spyOn(process, 'cwd').mockReturnValue('/fake/path');
            jest.spyOn(path, 'resolve').mockReturnValue(mockPackagePath);
            fs.existsSync.mockReturnValue(false);

            jest.spyOn(console, 'error').mockImplementation(() => {});

            helpers.updatePackageFile(mockFileName, mockNewVersion);

            expect(fs.existsSync).toHaveBeenCalledWith(mockPackagePath);
            expect(console.error).toHaveBeenCalledWith(`${mockFileName} not found. Skipping...`);

            jest.restoreAllMocks();
        });
    });

    describe('updateReadme', () => {
        test('updates the version badge in README.md when it exists', () => {
            const mockNewVersion = '2.0.0';
            const mockReadmePath = '/fake/path/README.md';
            const mockReadmeContent = '![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)\nProject Description';

            jest.spyOn(process, 'cwd').mockReturnValue('/fake/path');
            jest.spyOn(path, 'resolve').mockReturnValue(mockReadmePath);
            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(mockReadmeContent);

            jest.spyOn(console, 'log').mockImplementation(() => {});

            helpers.updateReadme(mockNewVersion);

            const expectedContent = '![Version](https://img.shields.io/badge/version-v2.0.0-blue.svg)\nProject Description';

            expect(fs.existsSync).toHaveBeenCalledWith(mockReadmePath);
            expect(fs.readFileSync).toHaveBeenCalledWith(mockReadmePath, 'utf-8');
            expect(fs.writeFileSync).toHaveBeenCalledWith(mockReadmePath, expectedContent);
            expect(console.log).toHaveBeenCalledWith(`README.md version badge updated to version ${mockNewVersion}`);

            jest.restoreAllMocks();
        });

        test('skips updating README.md when version badge does not exist', () => {
            const mockNewVersion = '2.0.0';
            const mockReadmePath = '/fake/path/README.md';
            const mockReadmeContent = 'Project Description without version badge';

            jest.spyOn(process, 'cwd').mockReturnValue('/fake/path');
            jest.spyOn(path, 'resolve').mockReturnValue(mockReadmePath);
            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(mockReadmeContent);

            jest.spyOn(console, 'log').mockImplementation(() => {});

            helpers.updateReadme(mockNewVersion);

            expect(fs.existsSync).toHaveBeenCalledWith(mockReadmePath);
            expect(fs.readFileSync).toHaveBeenCalledWith(mockReadmePath, 'utf-8');
            expect(fs.writeFileSync).not.toHaveBeenCalled();
            expect(console.log).toHaveBeenCalledWith('README.md does not contain a version badge. Skipping update for README.md.');

            jest.restoreAllMocks();
        });

        test('skips updating README.md when the file does not exist', () => {
            const mockNewVersion = '2.0.0';
            const mockReadmePath = '/fake/path/README.md';

            jest.spyOn(process, 'cwd').mockReturnValue('/fake/path');
            jest.spyOn(path, 'resolve').mockReturnValue(mockReadmePath);
            fs.existsSync.mockReturnValue(false);

            jest.spyOn(console, 'log').mockImplementation(() => {});

            helpers.updateReadme(mockNewVersion);

            expect(fs.existsSync).toHaveBeenCalledWith(mockReadmePath);
            expect(fs.readFileSync).not.toHaveBeenCalled();
            expect(fs.writeFileSync).not.toHaveBeenCalled();
            expect(console.log).toHaveBeenCalledWith('README.md not found. Skipping...');

            jest.restoreAllMocks();
        });
    });
});
