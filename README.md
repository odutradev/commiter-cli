# Commiter CLI

### Commit Standardization Tool

[![NPM Downloads](https://img.shields.io/npm/dm/commiter-cli.svg?style=flat)](https://npmcharts.com/compare/commiter-cli?minimal=true)  
[![Install Size](https://packagephobia.now.sh/badge?p=commiter-cli)](https://packagephobia.now.sh/result?p=commiter-cli)  
[![Version](https://img.shields.io/npm/v/commiter-cli.svg)](https://npmjs.org/package/commiter-cli)  
[![License](https://img.shields.io/npm/l/commiter-cli.svg)](https://github.com/lite-technology/commiter-cli/blob/main/package.json)  

---

## Contents
- [Key Features](#key-features)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Quick Start](#quick-start)  
- [Commands](#commands)  
  - [config](#config)  
  - [use](#use)  
  - [help](#help)  
  - [version](#version)  

---

## Key Features
- Automatic translation of commit messages  
- Enforced commit message standardization  
- Support for multiple commit pattern styles  

---

## Installation
```bash
npm install -g commiter-cli
```

---

## Usage
```bash
# Run any supported command
commiter <COMMAND> [...args]
```

---

## Quick Start
To list all commands:
```bash
commiter --help
# or
commiter help
```

To show the current version:
```bash
commiter --version
# or
commiter version
```

---

## Commands

### config
Manage your CLI settings:
```bash
# List all available settings
commiter config list

# Show current configuration
commiter config get

# Reset all settings to their defaults
commiter config reset

# Update a specific setting
commiter config update <configName>
```

### use
Generate a standardized commit:
```bash
# Follow the interactive prompts
commiter use
```

### help
Display help information:
```bash
commiter help
```

### version
Display the CLI version:
```bash
commiter version
```
