import { mkdirSync, existsSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import path from "path";
import os from "os";

import localPath from "./localPath.js";


const APPDATA_DIR = process.env.APPDATA || path.join(os.homedir(), ".config");
const CONFIG_DIR = path.join(APPDATA_DIR, "commiter-cli", "current");
const DEFAULT_CONFIG_PATH = "../data/default/config.json";
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function hasFile(p, { returnContent = false, createFile = false } = {}) {
  const file = localPath.absolutePath(p);
  if (!existsSync(file)) {
    if (createFile) {
      ensureDir(path.dirname(file));
      writeFileSync(file, JSON.stringify({}, null, 2));
      return { status: false, content: {} };
    }
    return { status: false, content: {} };
  }
  if (!returnContent) return { status: true };
  const content = JSON.parse(readFileSync(file, "utf-8"));
  return { status: true, content };
}

function updateFile(p, content, { rewrite = false, new: isNew = false } = {}) {
  const file = localPath.absolutePath(p);
  ensureDir(path.dirname(file));
  hasFile(p, { createFile: true });
  const current = rewrite ? {} : JSON.parse(readFileSync(file, "utf-8"));
  const output = rewrite ? content : { ...current, ...content };
  writeFileSync(file, JSON.stringify(output, null, 2));
  return isNew ? output : {};
}

function loadFile(p, { update = false } = {}) {
  const file = localPath.absolutePath(p);
  hasFile(p, { createFile: true });
  const content = JSON.parse(readFileSync(file, "utf-8"));
  if (!update) return content;
  return { content, update: (data, opts) => updateFile(p, data, opts) };
}

function get() {
  ensureDir(CONFIG_DIR);
  if (!existsSync(CONFIG_FILE)) {
    const def = loadFile(DEFAULT_CONFIG_PATH);
    updateFile(CONFIG_FILE, def, { rewrite: true, new: true });
    return def;
  }
  return loadFile(CONFIG_FILE);
}

function update(data) {
  try {
    ensureDir(CONFIG_DIR);
    const current = get();
    updateFile(CONFIG_FILE, { ...current, ...data }, { rewrite: true, new: true });
    return { status: true };
  } catch {
    return { status: false };
  }
}

function reset() {
  try {
    if (existsSync(CONFIG_FILE)) {
      unlinkSync(CONFIG_FILE);
    }
    return { status: true };
  } catch {
    return { status: false };
  }
}

export default { get, update, reset };
