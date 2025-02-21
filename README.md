# Version Bumpify

![Version](https://img.shields.io/badge/version-v1.2.1-blue.svg)
![npm](https://img.shields.io/npm/v/version-bumpify)
![npm](https://img.shields.io/npm/dm/version-bumpify)
![License](https://img.shields.io/npm/l/version-bumpify)

A **Node.js CLI tool** to automatically update:
- `package.json` and `package-lock.json` versions
- **Multiple version badges** in `README.md` (supports Shields.io, Badgen.net, Fury.io, and Nodei.co)

## Features 🚀

✔ **Semantic Versioning**: Ensures valid version updates (e.g., `1.2.3`, `2.0.0-alpha`)  
✔ **Automatic Updates**: Updates `package.json`, `package-lock.json`, and README badges  
✔ **Multi-Badge Support**: Works with Shields.io, Badgen.net, Fury.io, and Nodei.co  
✔ **Simple CLI Usage**: Run a single command to bump the version  

---

## Installation

Install globally via npm:

```bash
npm install -g version-bumpify
```

---

## Usage 🛠️

Run the following command to bump your project version:

```bash
bumpify <new_version>
```

Example:

```bash
bumpify 2.0.2
```

This will:
✅ Update **`package.json`** and **`package-lock.json`** to `2.0.2`  
✅ Update **multiple version badges** in `README.md`

---

## Contributing 🤝

Contributions are welcome!  
Please check the [CONTRIBUTING](CONTRIBUTING.md) file before submitting a pull request.

---

## License 📜

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## Bugs & Issues 🐞

If you find a bug or issue, report it via [GitHub Issues](https://github.com/AmJaradat01/version-bumpify/issues).

---

🚀 **Happy Version Bumping!**
