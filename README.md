# Commiter CLI

### Commit Standardization Tool

<nobr>

  [![NPM Downloads](https://img.shields.io/npm/dm/commiter-cli.svg?style=flat)](https://npmcharts.com/compare/commiter-cli?minimal=true)&nbsp;
  [![Install Size](https://packagephobia.now.sh/badge?p=commiter-cli)](https://packagephobia.now.sh/result?p=commiter-cli)&nbsp;
  [![Version](https://img.shields.io/npm/v/commiter-cli.svg)](https://npmjs.org/package/commiter-cli)&nbsp;
  [![License](https://img.shields.io/npm/l/commiter-cli.svg)](https://github.com/odutradev/commiter-cli/blob/master/LICENSE)

</nobr>


**Repository:** https://github.com/odutradev/commiter-cli  
**Creator & Main Contributor:** [João Dutra (@odutradev)](https://github.com/odutradev)

---

## 🚀 Key Features

- **Automatic translation** of commit messages  
- **Standardized commit prefixes** with emojis and keywords  
- **Multiple pattern styles** configurable via JSON  
- **Auto-add files** before committing (optional)  

---

## 💾 Installation

```bash
npm install -g commiter-cli
```

---

## Usage

```bash
commiter <command> [options]
```

Run `commiter --help` or `commiter help` to see all commands and flags.

---

## ⚡ Quick Start

- **List commands**  
  ```bash
  commiter help
  ```
- **Show version**  
  ```bash
  commiter version
  ```
- **Generate a commit**  
  ```bash
  commiter use
  ```

---

## 📦 Commands

### config  
Manage your CLI settings:
```bash
# Show all settings
commiter config list

# View current configuration
commiter config get

# Update a setting
commiter config update <key> <value>

# Reset to defaults
commiter config reset
```

### use  
Interactively create a standardized commit:
```bash
commiter use
```

### help  
Display usage information:
```bash
commiter help
```

### version  
Display the installed version:
```bash
commiter version
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
1. Fork the repo  
2. Create a branch (`git checkout -b feature/XYZ`)  
3. Commit your changes (`git commit -m "feat: add XYZ"`)  
4. Push to the branch (`git push origin feature/XYZ`)  
5. Open a Pull Request

Please read [CONTRIBUTING.md](https://github.com/odutradev/commiter-cli/blob/master/CONTRIBUTING.md)

---

## 📜 License

This project is licensed under the MIT License. See [LICENSE](https://github.com/odutradev/commiter-cli/blob/master/LICENSE) for details.
